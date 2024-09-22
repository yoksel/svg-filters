import { PayloadAction } from '@reduxjs/toolkit';
import { NativeEventCoords, PrimitivesState, Section, SectionState } from '../types';
import {
  getFilteredWithIndex,
  getIn,
  purgeIdKeeperSection,
  resetIdKeeperSection,
  swap,
  updateUniqueProps,
} from './helpers';
import primitives from '../../data/primitives';
import { PrimitiveItem } from '../../components/molecules/Primitive';

const primitive = (
  sectionState: SectionState,
  action: { type: string; item: PrimitiveItem; section: Section; childId?: string; id?: string },
): { newPrimitive: PrimitiveItem } | { newPrimitive: PrimitiveItem; pos: number } => {
  const { section } = action;

  switch (action.type) {
    case 'ADD_PRIMITIVE':
      const newAction = updateUniqueProps({
        sectionState,
        primitive: action.item,
        section,
        actionType: action.type,
      });

      return {
        newPrimitive: {
          id: newAction.id,
          params: newAction.params,
          groupName: newAction.groupName,
          children: newAction.children,
          disabled: false,
        },
      };

    case 'DISCOVERY_PRIMITIVE':
      const newPrimitiveDiscovery = updateUniqueProps({
        sectionState,
        primitive: action.item,
        section,
        actionType: action.type,
      });

      return {
        newPrimitive: {
          id: newPrimitiveDiscovery.id,
          params: newPrimitiveDiscovery.params,
          groupName: newPrimitiveDiscovery.groupName,
          children: newPrimitiveDiscovery.children,
          disabled: false,
        },
      };

    case 'DUPLICATE_PRIMITIVE':
      let filteredWithIndex = getFilteredWithIndex(sectionState, action.id);

      if (action.childId) {
        const children = filteredWithIndex.filtered.children;
        filteredWithIndex = getFilteredWithIndex(children, action.childId);
      }

      const duplicatedAction = updateUniqueProps({
        sectionState,
        primitive: filteredWithIndex.filtered,
        actionType: 'DUPLICATE_PRIMITIVE',
        section,
      });

      return {
        pos: filteredWithIndex.pos,
        newPrimitive: duplicatedAction,
      };

    default:
      return sectionState;
  }
};

const reducers = {
  addPrimitive: (
    state: PrimitivesState,
    action: PayloadAction<{
      section: Section;
      nativeEvent: NativeEventCoords;
      item: PrimitiveItem;
    }>,
  ) => {
    const { section, item, nativeEvent } = action.payload;
    const primitiveData = {
      type: 'ADD_PRIMITIVE',
      item,
      section,
    };
    const { newPrimitive } = primitive(state[section], primitiveData);
    newPrimitive.justAdded = true;
    newPrimitive.nativeEvent = nativeEvent;

    state[section] = [...state[section], newPrimitive];
  },
  discoverPrimitive: (
    state: PrimitivesState,
    action: PayloadAction<{ primitives: typeof primitives; type: string }>,
  ) => {
    // const discoverPrimitiveSection = 'docs';
    // resetIdKeeperSection(discoverPrimitiveList, discoverPrimitiveSection);

    state.docs = action.payload.primitives;
  },
  duplicatePrimitive: (
    state: PrimitivesState,
    action: PayloadAction<{
      item: PrimitiveItem;
      type: string;
      section: Section;
      id?: string;
      childId?: string;
    }>,
  ) => {
    const { section, item, type, childId, id } = action.payload;
    const sectionStateList = state[section];
    const primitiveData = {
      type,
      item,
      section,
      childId,
      id,
    };
    const { newPrimitive, pos } = primitive(sectionStateList, primitiveData);
    let duplicateList: PrimitiveItem[] = [];

    if (childId !== undefined) {
      // Inner list
      duplicateList = state[section]?.map((item: PrimitiveItem) => {
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

    state[section] = duplicateList;
  },
  togglePrimitive: (
    state: PrimitivesState,
    action: PayloadAction<{
      item: PrimitiveItem;
      type: string;
      section: Section;
      id?: string;
      childId?: string;
    }>,
  ) => {
    const { section, id, childId } = action.payload;
    const sectionStateList = state[section];
    const togglePrimitiveList = sectionStateList?.map((item: PrimitiveItem) => {
      // Edit prop of child
      if (item?.id === id) {
        item = structuredClone(item);

        if (childId !== undefined) {
          item.children = item.children?.map((child: PrimitiveItem) => {
            if (child.id === childId) {
              child = structuredClone(child);
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

    state[section] = togglePrimitiveList;
  },
  deletePrimitive: (
    state: PrimitivesState,
    action: PayloadAction<{
      item: PrimitiveItem;
      type: string;
      section: Section;
      id?: string;
      childId?: string;
    }>,
  ) => {
    const { section, id, childId } = action.payload;
    const sectionStateList = state[section];
    let updatedList = [];

    if (childId) {
      // Inner list
      updatedList = sectionStateList.map((item: PrimitiveItem) => {
        if (item.id === id) {
          item = structuredClone(item);
          item.children = item.children?.filter((child) => child.id !== childId);
        }

        return item;
      });
    } else {
      // Top level list
      updatedList = sectionStateList.filter((item: PrimitiveItem) => item.id !== id);
    }

    state[section] = updatedList;
  },
  togglePrimitiveProp: (
    state: PrimitivesState,
    action: PayloadAction<{
      section: Section;
      param: string;
      disabled: boolean;
      id?: string;
      parentId?: string;
    }>,
  ) => {
    const { section, id, parentId, disabled, param } = action.payload;
    let updatedList = state[section].map((item: PrimitiveItem) => {
      // Edit prop of child
      if (item.id === parentId) {
        item = structuredClone(item);

        item.children = item.children?.map((child) => {
          const childParam = child.params[param];
          if (child.id === id && childParam) {
            childParam.disabled = disabled;
          }

          return child;
        });
      } else if (item.id === id) {
        item = structuredClone(item);
        // does it work?
        const paramByKey = item.params[param];

        if (paramByKey) {
          paramByKey.disabled = disabled;
        }
      }

      return item;
    });

    state[section] = updatedList;
  },
  changePrimitiveProp: (
    state: PrimitivesState,
    action: PayloadAction<{
      section: Section;
      param: string;
      disabled: boolean;
      id?: string;
      parentId?: string;
      value: string | number;
    }>,
  ) => {
    const { section, id, parentId, param, value } = action.payload;
    let updatedList = state[section].map((item: PrimitiveItem) => {
      // Edit prop of child
      if (item.id === parentId) {
        item = structuredClone(item);

        item.children = item.children?.map((child: PrimitiveItem) => {
          const childParam = child.params[param];
          if (child.id === id && childParam) {
            child.params[param].value = value;
          }

          return child;
        });
      } else if (item.id === id) {
        item = structuredClone(item);
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

    state[section] = updatedList;
  },
  changePrimitivePropType: (
    state: PrimitivesState,
    action: PayloadAction<{
      section: Section;
      param: string;
      id?: string;
      parentId?: string;
      propType?: string;
    }>,
  ) => {
    const { section, id, parentId, param, propType } = action.payload;
    let changePropTypeList = state[section].map((item: PrimitiveItem) => {
      if (item.id === parentId) {
        // Edit prop type of child
        item = structuredClone(item);

        item.children = item.children?.map((child: PrimitiveItem) => {
          const childParam = child.params[param];
          if (child.id === id && childParam) {
            childParam.type = propType;
          }

          return child;
        });
      } else if (item.id === id) {
        item = structuredClone(item);
        // does it work?
        const paramByKey = item.params[param];

        if (paramByKey) {
          paramByKey.type = propType;
        }
      }

      return item;
    });

    state[section] = changePropTypeList;
  },
  changeInProps: (
    state: PrimitivesState,
    action: PayloadAction<{
      section: Section;
    }>,
  ) => {
    const { section } = action.payload;
    const newIn = getIn(state, section);

    let updatedList = state[section].map((item: PrimitiveItem, index: number) => {
      if (item.disabled) {
        return item;
      }

      if (item.params.in) {
        item = newIn.updateItem({ item, index });
      }
      if (item.children) {
        const children = structuredClone(item?.children);
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

    state[section] = updatedList;
  },
  switchOffLastAdded: (
    state: PrimitivesState,
    action: PayloadAction<{
      section: Section;
      id: string;
    }>,
  ) => {
    const { section, id } = action.payload;
    const updatedList = state[section].map((item: PrimitiveItem) => {
      if (item.id === id) {
        item = structuredClone(item);
        item.justAdded = false;
        item.nativeEvent = null;
      }

      return item;
    });

    state[section] = updatedList;
  },
  swapPrimitives: (
    state: PrimitivesState,
    action: PayloadAction<{
      section: Section;
      id: string;
      parentId: string;
      swapSnapshot?: string;
      indexes: { from: number; to: number };
    }>,
  ) => {
    const { section, id, parentId, swapSnapshot, indexes } = action.payload;
    let swapPrimitivesList = [...state[section]];

    if (state.swapSnapshot && state.swapSnapshot === swapSnapshot) {
      return;
    }

    if (parentId) {
      swapPrimitivesList = swapPrimitivesList.map((item: PrimitiveItem) => {
        if (item.id === parentId) {
          const children = structuredClone(item).children;
          item.children = swap(children, indexes);
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

    state[section] = swapPrimitivesList;
    state.swapSnapshot = swapSnapshot;
  },
  purgePrimitives: (state: PrimitivesState, action: PayloadAction<{ section: Section }>) => {
    const purgeSection = action.payload.section;

    if (purgeSection !== 'docs') {
      // Docs not using unique Id
      purgeIdKeeperSection(purgeSection);
    }

    state[purgeSection] = [];
  },
  switchChild: (
    state: PrimitivesState,
    action: PayloadAction<{
      section: Section;
      id: string;
      parentId: string;
    }>,
  ) => {
    const { section, id, parentId } = action.payload;
    const updatedList = state[section].map((item: PrimitiveItem) => {
      if (item.id === parentId) {
        item = structuredClone(item);

        item.children = item.children?.map((child: PrimitiveItem) => {
          child = structuredClone(child);
          child.disabled = !(child.id === id);

          return child;
        });
      }

      return item;
    });

    state[section] = updatedList;
  },
  moveToPlayground: (
    state: PrimitivesState,
    action: PayloadAction<{
      section: Section;
    }>,
  ) => {
    const { section } = action.payload;
    let listToMove = state[section];

    resetIdKeeperSection(listToMove, 'playground');
    state['playground'] = listToMove;
  },
  toggleDocs: (
    state: PrimitivesState,
    action: PayloadAction<{
      section: Section;
      id: string;
      childId?: string;
    }>,
  ) => {
    const { section, id, childId } = action.payload;
    const updatedList = state[section].map((item: PrimitiveItem) => {
      if (item.id === id) {
        item = structuredClone(item);

        if (childId) {
          item.children = item.children?.map((child: PrimitiveItem) => {
            if (child.id === childId) {
              child = structuredClone(child);
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

    state[section] = updatedList;
  },
  // TODO: CHECK THIS REDUCER
  addPreset: (
    state: PrimitivesState,
    action: PayloadAction<{
      primitives: PrimitiveItem[];
      colorInterpolationFilters?: string;
    }>,
  ) => {
    const { primitives, colorInterpolationFilters = 'linearRGB' } = action.payload;
    const addPresetList = [...primitives];

    resetIdKeeperSection(addPresetList, 'presets' as Section);

    state['filter'] = {
      ...state.filter,
      colorInterpolationFilters,
    };
    state['presets'] = addPresetList;
  },
  setColorInterpolFilters: (state: PrimitivesState, action: PayloadAction<string>) => {
    state.filter = {
      colorInterpolationFilters: action.payload,
    };
  },

  // switch (action.type) {

  // case 'ADD_PRESET':
  //   const addPresetSection = 'presets';
  //   const addPresetList = [...action.primitives];

  //   let colorInterpolationFilters = 'linearRGB';

  //   if (action.colorInterpolationFilters) {
  //     colorInterpolationFilters = action.colorInterpolationFilters;
  //   }

  //   const addPresetFilter = {
  //     ...state.filter,
  //     colorInterpolationFilters,
  //   };

  //   resetIdKeeperSection(addPresetList, addPresetSection);

  //   return {
  //     ...state,
  //     filter: addPresetFilter,
  //     presets: addPresetList,
  //   };
};

export default reducers;
