import { PayloadAction } from '@reduxjs/toolkit';
import {
  Interpolation,
  NativeEventCoords,
  PrimitiveActionArgs,
  PrimitiveItem,
  PrimitivesSections,
  PrimitivesState,
  Section,
  SectionState,
  ToggleDocsArgs,
} from '../types';
import {
  getFilteredWithIndex,
  getIn,
  purgeIdKeeperSection,
  resetIdKeeperSection,
  swap,
  updateUniqueProps,
} from './helpers';

import deepClone from '../../helpers/deepClone';

interface Action {
  type: string;
  primitive: PrimitiveItem;
  section: Section;
  childId?: string;
  id: string;
}

const updateDuplicatedPrimitive = (
  sectionState: PrimitiveItem[],
  action: Action,
): { newPrimitive: PrimitiveItem; pos: number } => {
  const { section } = action;

  let filteredWithIndex = getFilteredWithIndex(sectionState, action.id);

  if (action.childId) {
    const children = filteredWithIndex?.filtered?.children;
    if (children) {
      filteredWithIndex = getFilteredWithIndex(children, action.childId);
    }
  }

  const duplicatedAction = updateUniqueProps({
    sectionState,
    primitive: { ...filteredWithIndex.filtered, showDocs: false },
    actionType: 'DUPLICATE_PRIMITIVE',
    section,
  });

  return {
    pos: filteredWithIndex?.pos,
    newPrimitive: duplicatedAction,
  };
};

const reducers = {
  addPrimitive: (
    state: PrimitivesState,
    action: PayloadAction<{
      section: keyof PrimitivesSections;
      nativeEvent: NativeEventCoords;
      primitive: PrimitiveItem;
    }>,
  ) => {
    const { section, primitive, nativeEvent } = action.payload;
    const stateBySection = state.sections[section];
    if (!stateBySection) return;

    const newPrimitive = updateUniqueProps({
      sectionState: stateBySection,
      primitive: primitive,
      section,
      actionType: action.type,
    });
    newPrimitive.justAdded = true;
    newPrimitive.nativeEvent = nativeEvent;

    // @ts-expect-error
    state.sections[section] = [...state.sections[section], newPrimitive];
  },
  discoverPrimitive: (
    state: PrimitivesState,
    action: PayloadAction<{ primitives: PrimitiveItem[] }>,
  ) => {
    const primitives = action.payload.primitives;
    resetIdKeeperSection(primitives, 'docs');

    state.sections.docs = primitives;
  },
  duplicatePrimitive: (state: PrimitivesState, action: PayloadAction<PrimitiveActionArgs>) => {
    const { section, primitive, childId, id } = action.payload;
    const sectionStateList = state.sections[section];
    const primitiveData = {
      type: 'DUPLICATE_PRIMITIVE',
      primitive,
      section,
      childId,
      id,
    };

    if (!sectionStateList) return;

    // @ts-expect-error
    const { newPrimitive, pos } = updateDuplicatedPrimitive(sectionStateList, primitiveData);
    let duplicateList: PrimitiveItem[] = [];

    if (childId !== undefined) {
      // Inner list
      // @ts-expect-error
      duplicateList = state.sections[section]?.map((item: PrimitiveItem) => {
        if (item.id === id && item.children) {
          item.children = [
            ...item.children?.slice(0, pos + 1),
            newPrimitive,
            ...item.children?.slice(pos + 1),
          ];
        }

        return item;
      });
    } else {
      // Top level list
      duplicateList = [
        ...sectionStateList.slice(0, pos + 1),
        newPrimitive,
        ...sectionStateList.slice(pos + 1),
      ];
    }

    state.sections[section] = duplicateList;
  },
  togglePrimitive: (state: PrimitivesState, action: PayloadAction<PrimitiveActionArgs>) => {
    const { section, id, childId } = action.payload;
    const sectionStateList = state.sections[section];
    console.log('===togglePrimitive===');
    console.log({ state });
    console.log({ section });
    console.log({ sectionStateList });
    console.log({ length: sectionStateList?.length });

    if (!sectionStateList?.length) return;

    console.log('Checked, Ok');

    const togglePrimitiveList = [...sectionStateList]?.map((item: PrimitiveItem) => {
      // Edit prop of child
      if (item && item.id === id) {
        console.log({ item, id });
        item = deepClone(item);

        if (childId !== undefined) {
          item.children = item.children?.map((child: PrimitiveItem) => {
            if (child.id === childId) {
              child = deepClone(child);
              child.disabled = !child.disabled;
            }

            return child;
          });
        } else {
          item.disabled = !item.disabled;
        }
      }

      return item;
    });

    state.sections[section] = togglePrimitiveList;
  },
  deletePrimitive: (state: PrimitivesState, action: PayloadAction<PrimitiveActionArgs>) => {
    const { section, id, childId } = action.payload;
    const sectionStateList = state.sections[section];
    let updatedList = [];

    if (childId) {
      // Inner list
      // @ts-expect-error
      updatedList = sectionStateList.map((item: PrimitiveItem) => {
        if (item.id === id) {
          item = deepClone(item);
          item.children = item.children?.filter((child) => child.id !== childId);
        }

        return item;
      });
    } else {
      // Top level list
      // @ts-expect-error
      updatedList = sectionStateList.filter((item: PrimitiveItem) => item.id !== id);
    }

    state.sections[section] = updatedList;
  },
  togglePrimitiveProp: (
    state: PrimitivesState,
    action: PayloadAction<{
      section: keyof PrimitivesSections;
      param: string;
      disabled: boolean;
      id?: string;
      parentId?: string;
    }>,
  ) => {
    const { section, id, parentId, disabled, param } = action.payload;
    // @ts-expect-error
    let updatedList = state.sections[section].map((item: PrimitiveItem) => {
      // Edit prop of child
      if (item.id === parentId) {
        item = deepClone(item);

        item.children = item.children?.map((child) => {
          const childParam = child.params[param];
          if (child.id === id && childParam) {
            childParam.disabled = disabled;
          }

          return child;
        });
      } else if (item.id === id) {
        item = deepClone(item);
        // does it work?
        const paramByKey = item.params[param];

        if (paramByKey) {
          paramByKey.disabled = disabled;
        }
      }

      return item;
    });

    state.sections[section] = updatedList;
  },
  changePrimitiveProp: (
    state: PrimitivesState,
    action: PayloadAction<{
      section: keyof PrimitivesSections;
      param: string;
      disabled?: boolean;
      id?: string;
      parentId?: string;
      value: string | number;
    }>,
  ) => {
    const { section, id, parentId, param, value } = action.payload;
    // @ts-expect-error
    let updatedList = state.sections[section].map((item: PrimitiveItem) => {
      // Edit prop of child
      if (item.id === parentId) {
        item = deepClone(item);

        item.children = item.children?.map((child: PrimitiveItem) => {
          const childParam = child.params[param];
          if (child.id === id && childParam) {
            child.params[param].value = value;
          }

          return child;
        });
      } else if (item.id === id) {
        item = deepClone(item);
        // does it work?
        const paramBKey = item.params[param];

        if (paramBKey) {
          paramBKey.value = value;

          // Save value to variants (feColorMatrix, for example)
          if (paramBKey.variants) {
            const propByKey = item.params[paramBKey.variants.key];
            const keyValue = propByKey.value;
            if (!paramBKey.variants.values) {
              paramBKey.variants.values = {};
            }
            paramBKey.variants.values[keyValue] = value;
          }
        }
      }

      return item;
    });

    state.sections[section] = updatedList;
  },
  changePrimitivePropType: (
    state: PrimitivesState,
    action: PayloadAction<{
      section: keyof PrimitivesSections;
      param: string;
      id?: string;
      parentId?: string;
      propType?: string;
    }>,
  ) => {
    const { section, id, parentId, param, propType } = action.payload;
    // @ts-expect-error
    let changePropTypeList = state.sections[section].map((item: PrimitiveItem) => {
      if (item.id === parentId) {
        // Edit prop type of child
        item = deepClone(item);

        item.children = item.children?.map((child: PrimitiveItem) => {
          const childParam = child.params[param];
          if (child.id === id && childParam) {
            childParam.type = propType;
          }

          return child;
        });
      } else if (item.id === id) {
        item = deepClone(item);
        // does it work?
        const paramByKey = item.params[param];

        if (paramByKey) {
          paramByKey.type = propType;
        }
      }

      return item;
    });
    state.sections[section] = changePropTypeList;
  },
  changeInProps: (
    state: PrimitivesState,
    action: PayloadAction<{
      section: keyof PrimitivesSections;
    }>,
  ) => {
    const { section } = action.payload;
    const newIn = getIn(state, section);
    // @ts-expect-error
    let updatedList = state.sections[section].map((item: PrimitiveItem, index: number) => {
      if (item.disabled) {
        return item;
      }

      if (item.params.in) {
        item = newIn.updateItem({ item, index });
      }
      if (item.children) {
        const children = deepClone(item?.children);
        item.children = children.map((child: PrimitiveItem, childIndex: number) => {
          if (!child.params.in) {
            return child;
          }

          return newIn.updateItem({
            item: child,
            index: childIndex,
            isChild: true,
          });
        });
      }

      return item;
    });
    state.sections[section] = updatedList;
  },
  switchOffLastAdded: (
    state: PrimitivesState,
    action: PayloadAction<{
      section: keyof PrimitivesSections;
      id: string;
    }>,
  ) => {
    const { section, id } = action.payload;
    // @ts-expect-error
    const updatedList = state.sections[section].map((item: PrimitiveItem) => {
      if (item.id === id) {
        item = deepClone(item);
        item.justAdded = false;
        item.nativeEvent = null;
      }

      return item;
    });

    state.sections[section] = updatedList;
  },
  swapPrimitives: (
    state: PrimitivesState,
    action: PayloadAction<{
      section: keyof PrimitivesSections;
      id: string;
      parentId: string;
      swapSnapshot?: string;
      indexes: { from: number; to: number };
    }>,
  ) => {
    const { section, parentId, swapSnapshot, indexes } = action.payload;
    // @ts-expect-error
    let swapPrimitivesList = [...state.sections[section]];

    if (state.swapSnapshot && state.swapSnapshot === swapSnapshot) {
      return;
    }

    if (parentId) {
      swapPrimitivesList = swapPrimitivesList.map((item: PrimitiveItem) => {
        if (item.id === parentId) {
          const children = deepClone(item).children;
          if (children) {
            item.children = swap(children, indexes);
          }
        }

        return item;
      });
    } else {
      swapPrimitivesList = swap(swapPrimitivesList, indexes);
    }

    swapPrimitivesList = swapPrimitivesList.filter((item) => item);

    // const swapResult = {
    //   ...state: PrimitivesState,
    //   swapSnapshot: action.swapSnapshot,
    // };

    // swapResult[swapSection] = swapPrimitivesList;

    // return swapResult;

    state.sections[section] = swapPrimitivesList;
    state.swapSnapshot = swapSnapshot;
  },
  purgePrimitives: (
    state: PrimitivesState,
    action: PayloadAction<{ section: keyof PrimitivesSections }>,
  ) => {
    const purgeSection = action.payload.section;

    if (purgeSection !== 'docs') {
      // Docs not using unique Id
      purgeIdKeeperSection(purgeSection);
    }

    state.sections[purgeSection] = [];
  },
  switchChild: (
    state: PrimitivesState,
    action: PayloadAction<{
      section: keyof PrimitivesSections;
      id: string;
      parentId: string;
    }>,
  ) => {
    const { section, id, parentId } = action.payload;
    // @ts-expect-error
    const updatedList = state.sections[section].map((item: PrimitiveItem) => {
      if (item.id === parentId) {
        item = deepClone(item);

        item.children = item.children?.map((child: PrimitiveItem) => {
          child = deepClone(child);
          child.disabled = !(child.id === id);

          return child;
        });
      }

      return item;
    });

    state.sections[section] = updatedList;
  },
  moveToPlayground: (
    state: PrimitivesState,
    action: PayloadAction<{
      section: keyof PrimitivesSections;
    }>,
  ) => {
    const { section } = action.payload;
    let listToMove = state.sections[section];
    // @ts-expect-error
    resetIdKeeperSection(listToMove, 'playground');
    // @ts-expect-error
    state.sections['playground'] = listToMove;
  },
  toggleDocs: (state: PrimitivesState, action: PayloadAction<ToggleDocsArgs>) => {
    const { section, id, childId } = action.payload;
    // @ts-expect-error
    const updatedList = state.sections[section].map((item: PrimitiveItem) => {
      if (item.id === id) {
        item = deepClone(item);

        if (childId) {
          item.children = item.children?.map((child: PrimitiveItem) => {
            if (child.id === childId) {
              child = deepClone(child);
              child.showDocs = !child.showDocs;
            }

            return child;
          });
        } else {
          item.showDocs = !item.showDocs;
        }
      }

      return item;
    });
    state.sections[section] = updatedList;
  },
  // TODO: CHECK THIS REDUCER, add tests
  addPresetPrimitivesToStage: (
    state: PrimitivesState,
    action: PayloadAction<{
      primitives: PrimitiveItem[];
      colorInterpolationFilters?: Interpolation;
    }>,
  ) => {
    const { primitives, colorInterpolationFilters = 'linearRGB' } = action.payload;

    resetIdKeeperSection(primitives, 'presets' as Section);

    state['filter'].colorInterpolationFilters = colorInterpolationFilters;
    state.sections['presets'] = primitives;
  },
  setColorInterpolFilters: (state: PrimitivesState, action: PayloadAction<Interpolation>) => {
    state['filter'].colorInterpolationFilters = action.payload;
  },
};

export default reducers;
