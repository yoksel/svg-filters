import deepClone from '../../helpers/deepClone';
import {
  updateUnicalProps,
  resetIdKeeperSection,
  purgeIdKeeperSection,
  swap,
  getFilteredWithIndex,
  getIn
} from './helpers';

const primitive = (state, action) => {
  const {section} = action;

  switch (action.type) {
  case 'ADD_PRIMITIVE':
    const newAction = updateUnicalProps({
      state,
      primitive: action,
      section
    });

    return {
      id: newAction.id,
      params: newAction.params,
      groupName: newAction.groupName,
      children: newAction.children,
      disabled: false
    };

  case 'DISCOVERY_PRIMITIVE':
    const newPrimitiveDiscovery = updateUnicalProps({
      state,
      primitive: action,
      section
    });

    return {
      id: newPrimitiveDiscovery.id,
      params: newPrimitiveDiscovery.params,
      groupName: newPrimitiveDiscovery.groupName,
      children: newPrimitiveDiscovery.children,
      disabled: false
    };

  case 'DUPLICATE_PRIMITIVE':
    let filteredWithIndex = getFilteredWithIndex(state, action.id);

    if (action.childId) {
      const children = filteredWithIndex.filtered.children;
      filteredWithIndex = getFilteredWithIndex(children, action.childId);
    }

    const duplAction = updateUnicalProps({
      state,
      primitive: filteredWithIndex.filtered,
      actionType: action.type,
      section
    });

    return {
      pos: filteredWithIndex.pos,
      newPrimitive: duplAction
    };

  default:
    return state;
  }
};

const initialState = {
  playground: [],
  presets: [],
  docs: [],
  swapSnapshot: '',
  playgroundType: 'image-and-text',
  filter: {
    x: '-20%',
    y: '-20%',
    width: '140%',
    height: '140%',
    filterUnits: 'objectBoundingBox',
    primitiveUnits: 'userSpaceOnUse',
    colorInterpolationFilters: 'linearRGB'
  }
};

export const primitives = (state = initialState, action) => {
  switch (action.type) {
  case 'ADD_PRIMITIVE':
    const addPrimitiveSection = action.section;
    const addPrimitiveData = {
      type: action.type,
      ...action.item,
      section: addPrimitiveSection
    };
    const addPrimitiveNew = primitive(state[addPrimitiveSection], addPrimitiveData);
    addPrimitiveNew.justAdded = true;
    addPrimitiveNew.nativeEvent = action.nativeEvent;

    const addPrimitiveResult = {...state};
    addPrimitiveResult[addPrimitiveSection] = [
      ...state[addPrimitiveSection],
      addPrimitiveNew
    ];

    return addPrimitiveResult;

  case 'DISCOVERY_PRIMITIVE':
    const discoverPrimitiveSection = 'docs';
    const discoverPrimitiveList = [
      ...action.primitives
    ];

    resetIdKeeperSection(discoverPrimitiveList, discoverPrimitiveSection);

    return {
      ...state,
      docs: discoverPrimitiveList
    };

  case 'DUPLICATE_PRIMITIVE':
    const duplicateSection = action.section;
    const duplicateStateList = state[duplicateSection];
    const {newPrimitive, pos} = primitive(duplicateStateList, action);
    let duplicateList = [];

    if (action.childId !== undefined) {
      // Inner list
      duplicateList = state[duplicateSection].map(item => {
        if (item.id === action.id) {
          item.children = [
            ...item.children.slice(0, pos + 1),
            newPrimitive,
            ...item.children.slice(pos + 1)
          ];
        }

        return item;
      });
    } else {
      // Top level list
      duplicateList = [
        ...duplicateStateList.slice(0, pos + 1),
        newPrimitive,
        ...duplicateStateList.slice(pos + 1)
      ];
    }

    const duplicateResult = {...state};
    duplicateResult[duplicateSection] = duplicateList;

    return duplicateResult;

  case 'TOGGLE_PRIMITIVE':
    const toggleSection = action.section;
    let togglePrimitiveList = state[toggleSection].map(item => {

      // Edit prop of child
      if (item.id === action.id) {
        item = deepClone(item);

        if (action.childId !== undefined) {
          item.children = item.children.map(child => {
            if (child.id === action.childId) {
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

    const toggleResult = {...state};
    toggleResult[toggleSection] = togglePrimitiveList;

    return toggleResult;

  case 'UPDATE_INS':
    const updateInsSection = action.section;
    const newIn = getIn(state, updateInsSection);

    let updateInsList = state[updateInsSection].map((item, index) => {

      if (item.disabled) {
        return item;
      }

      if (item.params.in) {
        item = newIn.updateItem({item, index});
      }
      if (item.children) {
        const children = deepClone(item.children);
        item.children = children.map((child, childIndex) => {
          if (!child.params.in) {
            return child;
          }

          return newIn.updateItem({
            item: child,
            iindex: childIndex,
            idChild: true
          });
        });
      }

      return item;
    });

    const updateInsResult = {...state};
    updateInsResult[updateInsSection] = updateInsList;

    return updateInsResult;

  case 'DELETE_PRIMITIVE':
    const deleteSection = action.section;
    const deleteStateList = state[deleteSection];
    let deleteList = [];

    if (action.childId) {
      // Inner list
      deleteList = deleteStateList.map(item => {
        if (item.id === action.id) {
          item = deepClone(item);
          item.children = item.children.filter(child => child.id !== action.childId);
        }

        return item;
      });
    } else {
      // Top level list
      deleteList = deleteStateList.filter(item => item.id !== action.id);
    }

    const deleteResult = {...state};
    deleteResult[deleteSection] = deleteList;

    return deleteResult;

  case 'PURGE_PRIMITIVES':
    const purgeSection = action.section;

    const purgeResult = {...state};
    purgeResult[purgeSection] = [];

    if (purgeSection !== 'docs') {
      // Docs not using unical Id
      purgeIdKeeperSection(purgeSection);
    }

    return purgeResult;

  case 'CHANGE_PRIMITIVE_PROP':
    const changePrimitivePropSection = action.section;
    let changePrimitivePropList = state[changePrimitivePropSection].map(item => {

      // Edit prop of child
      if (item.id === action.parentId) {
        item = deepClone(item);

        item.children = item.children.map(child => {
          const childParam = child.params[action.param];
          if (child.id === action.id && childParam) {
            child.params[action.param].value = action.value;
          }

          return child;
        });
      } else if (item.id === action.id) {
        item = deepClone(item);
        const param = item.params[action.param];

        if (param) {
          param.value = action.value;

          // Save value to variants (feColorMatrix, for example)
          if (param.variants) {
            const propByKey = item.params[param.variants.key];
            const keyValue = propByKey.value;
            if (!param.variants.values) {
              param.variants.values = {};
            }
            param.variants.values[keyValue] = action.value;
          }
        }
      }

      return item;
    });

    const changePrimitivePropResult = {...state};
    changePrimitivePropResult[changePrimitivePropSection] = changePrimitivePropList;

    return changePrimitivePropResult;

  case 'TOGGLE_PROP':
    const togglePropSection = action.section;
    let togglePropList = state[togglePropSection].map(item => {

      // Edit prop of child
      if (item.id === action.parentId) {
        item = deepClone(item);

        item.children = item.children.map(child => {
          const childParam = child.params[action.param];
          if (child.id === action.id && childParam) {
            childParam.disabled = action.disabled;
          }

          return child;
        });
      } else if (item.id === action.id) {
        item = deepClone(item);
        const param = item.params[action.param];

        if (param) {
          param.disabled = action.disabled;
        }
      }

      return item;
    });

    const togglePropResult = {...state};
    togglePropResult[togglePropSection] = togglePropList;

    return togglePropResult;

  case 'CHANGE_PROP_TYPE':
    const changePropTypeSection = action.section;
    let changePropTypeList = state[changePropTypeSection].map(item => {

      if (item.id === action.parentId) {
        // Edit prop type of child
        item = deepClone(item);

        item.children = item.children.map(child => {
          const childParam = child.params[action.param];
          if (child.id === action.id && childParam) {
            childParam.type = action.propType;
          }

          return child;
        });
      } else if (item.id === action.id) {
        item = deepClone(item);
        const param = item.params[action.param];

        if (param) {
          param.type = action.propType;
        }
      }

      return item;
    });

    const changePropTypeResult = {...state};
    changePropTypeResult[changePropTypeSection] = changePropTypeList;

    return changePropTypeResult;

  case 'ADD_PRESET':
    const addPresetSection = 'presets';
    const addPresetList = [
      ...action.primitives
    ];

    let colorInterpolationFilters = 'linearRGB';

    if (action.colorInterpolationFilters) {
      colorInterpolationFilters = action.colorInterpolationFilters;
    }

    const addPresetFilter = {
      ...state.filter,
      colorInterpolationFilters
    };

    resetIdKeeperSection(addPresetList, addPresetSection);

    return {
      ...state,
      filter: addPresetFilter,
      presets: addPresetList
    };

  case 'SWAP_PRIMITIVES':
    const parentId = action.parentId;
    const swapSection = action.section;
    let swapPrimitivesList = Array.from(state[swapSection]);

    if (state.swapSnapshot && state.swapSnapshot === action.swapSnapshot) {
      return state;
    }

    if (parentId) {
      swapPrimitivesList = swapPrimitivesList.map(item => {
        if (item.id === parentId) {
          const children = deepClone(item).children;
          item.children = swap(children, action.indexes);
        }

        return item;
      });
    } else {
      swapPrimitivesList = swap(swapPrimitivesList, action.indexes);
    }

    swapPrimitivesList = swapPrimitivesList.filter(item => item);

    const swapResult = {
      ...state,
      swapSnapshot: action.swapSnapshot
    };

    swapResult[swapSection] = swapPrimitivesList;

    return swapResult;

  case 'SWITCH_OFF_LAST_ADDED':
    let switchOffLastList = [];
    const switchOffLastSection = action.section;

    switchOffLastList = state[switchOffLastSection].map(item => {
      if (item.id === action.id) {
        item = deepClone(item);
        item.justAdded = false;
        item.nativeEvent = null;
      }

      return item;
    });

    const switchOffLastResult = {...state};
    switchOffLastResult[switchOffLastSection] = switchOffLastList;

    return switchOffLastResult;

  case 'SWITCH_CHILD':
    const {section: switchChildSection} = action;
    let switchChildList = state[switchChildSection].map(item => {
      if (item.id === action.parentId) {
        item = deepClone(item);

        item.children = item.children.map(child => {
          child = deepClone(child);
          child.disabled = !(child.id === action.id);

          return child;
        });
      }

      return item;
    });

    const switchChildResult = {...state};
    switchChildResult[switchChildSection] = switchChildList;

    return switchChildResult;

  case 'MOVE_TO_PLAYGROUND':
    const {section: moveSetSection} = action;
    let moveSetList = state[moveSetSection];

    const moveSetResult = {...state};
    moveSetResult['playground'] = moveSetList;

    resetIdKeeperSection(moveSetList, 'playground');

    return moveSetResult;

  case 'TOGGLE_DOCS':
    const {section: toggleDocsSection} = action;
    let toggleDocsList = state[toggleDocsSection].map(item => {
      if (item.id === action.id) {
        item = deepClone(item);

        if (action.childId) {
          item.children = item.children.map(child => {
            if (child.id === action.childId) {
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

    const toggleDocsResult = {...state};
    toggleDocsResult[toggleDocsSection] = toggleDocsList;

    return toggleDocsResult;

  case 'SET_PLAYGROUND_TYPE':
    const setPlaygroundTypeResult = {
      ...state,
      playgroundType: action.playgroundType
    };

    return setPlaygroundTypeResult;

  case 'SET_COLOR_INTERPOL_FILTERS':
    const setColorInterpolFilter = {
      ...state.filter,
      colorInterpolationFilters: action.colorInterpolationFilters
    };

    const setColorInterpolResult = {
      ...state,
      filter: setColorInterpolFilter
    };

    return setColorInterpolResult;

  default:
    return state;
  }
};

export default primitives;
