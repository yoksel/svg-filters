import { PayloadAction } from '@reduxjs/toolkit';
import { PrimitivesState, Section, SectionState } from '../types';
import { getFilteredWithIndex, purgeIdKeeperSection, updateUniqueProps } from './helpers';
import primitives from '../../data/primitives';
import { PrimitiveItem } from '../../components/molecules/Primitive';
import { ReactNode } from 'react';

const primitive = (
  sectionState: SectionState,
  action: { type: string; item: PrimitiveItem; section: Section; childId?: string; id?: string },
) => {
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
        id: newAction.id,
        params: newAction.params,
        groupName: newAction.groupName,
        children: newAction.children,
        disabled: false,
      };

    case 'DISCOVERY_PRIMITIVE':
      const newPrimitiveDiscovery = updateUniqueProps({
        sectionState,
        primitive: action.item,
        section,
        actionType: action.type,
      });

      return {
        id: newPrimitiveDiscovery.id,
        params: newPrimitiveDiscovery.params,
        groupName: newPrimitiveDiscovery.groupName,
        children: newPrimitiveDiscovery.children,
        disabled: false,
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
  // setPrimitivesTypeResult: (state: PrimitivesState, action: PayloadAction<string>) => {
  //   state.type = action.payload;
  // },
  addPrimitive: (
    state: PrimitivesState,
    action: PayloadAction<{
      type: string;
      section: Section;
      nativeEvent: Event;
      item: PrimitiveItem;
    }>,
  ) => {
    const { section, item, nativeEvent, type } = action.payload;
    const primitiveData = {
      type,
      item,
      section,
    };
    const addPrimitiveNew = primitive(state[section], primitiveData);
    addPrimitiveNew.justAdded = true;
    addPrimitiveNew.nativeEvent = nativeEvent;

    state[section] = [...state[section], addPrimitiveNew];
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
    let duplicateList = [];

    if (childId !== undefined) {
      // Inner list
      duplicateList = state[section].map((item: PrimitiveItem) => {
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
    const togglePrimitiveList = sectionStateList.map((item: PrimitiveItem) => {
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
  purgePrimitives: (state: PrimitivesState, action: PayloadAction<{ section: Section }>) => {
    const purgeSection = action.payload.section;

    if (purgeSection !== 'docs') {
      // Docs not using unique Id
      purgeIdKeeperSection(purgeSection);
    }

    state[purgeSection] = [];
  },
  setColorInterpolFilters: (state: PrimitivesState, action: PayloadAction<string>) => {
    state.filter = {
      colorInterpolationFilters: action.payload,
    };
  },

  // switch (action.type) {

  // case 'UPDATE_INS':
  //   const updateInsSection = action.section;
  //   const newIn = getIn(state: PrimitivesState, updateInsSection);

  //   let updateInsList = state[updateInsSection].map((item, index) => {
  //     if (item.disabled) {
  //       return item;
  //     }

  //     if (item.params.in) {
  //       item = newIn.updateItem({ item, index });
  //     }
  //     if (item.children) {
  //       const children = structuredClone(item.children);
  //       item.children = children.map((child, childIndex) => {
  //         if (!child.params.in) {
  //           return child;
  //         }

  //         return newIn.updateItem({
  //           item: child,
  //           iindex: childIndex,
  //           idChild: true,
  //         });
  //       });
  //     }

  //     return item;
  //   });

  //   const updateInsResult = { ...state };
  //   updateInsResult[updateInsSection] = updateInsList;

  //   return updateInsResult;

  // case 'PURGE_PRIMITIVES':
  //   const purgeSection = action.section;

  //   const purgeResult = { ...state };
  //   purgeResult[purgeSection] = [];

  //   if (purgeSection !== 'docs') {
  //     // Docs not using unique Id
  //     purgeIdKeeperSection(purgeSection);
  //   }

  //   return purgeResult;

  // case 'CHANGE_PRIMITIVE_PROP':
  //   const changePrimitivePropSection = action.section;
  //   let changePrimitivePropList = state[changePrimitivePropSection].map((item) => {
  //     // Edit prop of child
  //     if (item.id === .parentId) {
  //       item = structuredClone(item);

  //       item.children = item.children.map((child) => {
  //         const childParam = child.params[action.param];
  //         if (child.id === action.id && childParam) {
  //           child.params[action.param].value = action.value;
  //         }

  //         return child;
  //       });
  //     } else if (item.id === action.id) {
  //       item = structuredClone(item);
  //       const param = item.params[action.param];

  //       if (param) {
  //         param.value = action.value;

  //         // Save value to variants (feColorMatrix, for example)
  //         if (param.variants) {
  //           const propByKey = item.params[param.variants.key];
  //           const keyValue = propByKey.value;
  //           if (!param.variants.values) {
  //             param.variants.values = {};
  //           }
  //           param.variants.values[keyValue] = action.value;
  //         }
  //       }
  //     }

  //     return item;
  //   });

  //   const changePrimitivePropResult = { ...state };
  //   changePrimitivePropResult[changePrimitivePropSection] = changePrimitivePropList;

  //   return changePrimitivePropResult;

  // case 'CHANGE_PROP_TYPE':
  //   const changePropTypeSection = action.section;
  //   let changePropTypeList = state[changePropTypeSection].map((item) => {
  //     if (item.id === action.parentId) {
  //       // Edit prop type of child
  //       item = structuredClone(item);

  //       item.children = item.children.map((child) => {
  //         const childParam = child.params[action.param];
  //         if (child.id === action.id && childParam) {
  //           childParam.type = action.propType;
  //         }

  //         return child;
  //       });
  //     } else if (item.id === action.id) {
  //       item = structuredClone(item);
  //       const param = item.params[action.param];

  //       if (param) {
  //         param.type = action.propType;
  //       }
  //     }

  //     return item;
  //   });

  //   const changePropTypeResult = { ...state };
  //   changePropTypeResult[changePropTypeSection] = changePropTypeList;

  //   return changePropTypeResult;

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
  //     ...state: PrimitivesState,
  //     filter: addPresetFilter,
  //     presets: addPresetList,
  //   };

  // case 'SWAP_PRIMITIVES':
  //   const parentId = action.parentId;
  //   const swapSection = action.section;
  //   let swapPrimitivesList = Array.from(state[swapSection]);

  //   if (state.swapSnapshot && state.swapSnapshot === action.swapSnapshot) {
  //     return state;
  //   }

  //   if (parentId) {
  //     swapPrimitivesList = swapPrimitivesList.map((item) => {
  //       if (item.id === parentId) {
  //         const children = structuredClone(item).children;
  //         item.children = swap(children, action.indexes);
  //       }

  //       return item;
  //     });
  //   } else {
  //     swapPrimitivesList = swap(swapPrimitivesList, action.indexes);
  //   }

  //   swapPrimitivesList = swapPrimitivesList.filter((item) => item);

  //   const swapResult = {
  //     ...state: PrimitivesState,
  //     swapSnapshot: action.swapSnapshot,
  //   };

  //   swapResult[swapSection] = swapPrimitivesList;

  //   return swapResult;

  // case 'SWITCH_OFF_LAST_ADDED':
  //   let switchOffLastList = [];
  //   const switchOffLastSection = action.section;

  //   switchOffLastList = state[switchOffLastSection].map((item) => {
  //     if (item.id === action.id) {
  //       item = structuredClone(item);
  //       item.justAdded = false;
  //       item.nativeEvent = null;
  //     }

  //     return item;
  //   });

  //   const switchOffLastResult = { ...state };
  //   switchOffLastResult[switchOffLastSection] = switchOffLastList;

  //   return switchOffLastResult;

  // case 'SWITCH_CHILD':
  //   const { section: switchChildSection } = action;
  //   let switchChildList = state[switchChildSection].map((item) => {
  //     if (item.id === action.parentId) {
  //       item = structuredClone(item);

  //       item.children = item.children.map((child) => {
  //         child = structuredClone(child);
  //         child.disabled = !(child.id === action.id);

  //         return child;
  //       });
  //     }

  //     return item;
  //   });

  //   const switchChildResult = { ...state };
  //   switchChildResult[switchChildSection] = switchChildList;

  //   return switchChildResult;

  // case 'MOVE_TO_PLAYGROUND':
  //   const { section: moveSetSection } = action;
  //   let moveSetList = state[moveSetSection];

  //   const moveSetResult = { ...state };
  //   moveSetResult['playground'] = moveSetList;

  //   resetIdKeeperSection(moveSetList, 'playground');

  //   return moveSetResult;

  // case 'TOGGLE_DOCS':
  //   const { section: toggleDocsSection } = action;
  //   let toggleDocsList = state[toggleDocsSection].map((item) => {
  //     if (item.id === action.id) {
  //       item = structuredClone(item);

  //       if (action.childId) {
  //         item.children = item.children.map((child) => {
  //           if (child.id === action.childId) {
  //             child = structuredClone(child);
  //             child.showDocs = !child.showDocs;
  //           }

  //           return child;
  //         });
  //       } else {
  //         item.showDocs = !item.showDocs;
  //       }
  //     }

  //     return item;
  //   });

  //   const toggleDocsResult = { ...state };
  //   toggleDocsResult[toggleDocsSection] = toggleDocsList;

  //   return toggleDocsResult;

  // default:
  //   return state;
  // },
};

export default reducers;
