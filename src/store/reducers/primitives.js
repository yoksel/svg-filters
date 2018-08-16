import deepClone from '../../helpers/deepClone';
import {
  updateUnicalProps,
  resetIdKeeper,
  swap,
  getFilteredWithIndex,
  getIn
} from './helpers';

const primitive = (state, action) => {
  switch (action.type) {
  case 'ADD_PRIMITIVE':
    const newAction = updateUnicalProps(state, action);

    return {
      id: newAction.id,
      params: newAction.params,
      groupName: newAction.groupName,
      children: newAction.children,
      disabled: false
    };

  case 'DISCOVERY_PRIMITIVE':
    const newPrimitiveDiscovery = updateUnicalProps(state, action);

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

    const duplAction = updateUnicalProps(state, filteredWithIndex.filtered, action.type);

    return {
      pos: filteredWithIndex.pos,
      newPrimitive: duplAction
    };

  default:
    return state;
  }
};

const initialState = {
  list: [],
  swapSnapshot: '',
  filter: {
    x: '-10%',
    y: '-10%',
    width: '120%',
    height: '120%',
    filterUnits: 'userSpaceOnUse',
    primitiveUnits: 'userSpaceOnUse'
  }
};

export const primitives = (state = initialState, action) => {
  switch (action.type) {
  case 'ADD_PRIMITIVE':
    const addPrimitiveData = {
      type: action.type,
      ...action.item
    };
    const addPrimitiveNew = primitive(state.list, addPrimitiveData);
    addPrimitiveNew.justAdded = true;
    addPrimitiveNew.nativeEvent = action.nativeEvent;

    return {
      ...state,
      list: [
        ...state.list,
        addPrimitiveNew
      ]
    };

  case 'DISCOVERY_PRIMITIVE':
    const discoverPrimitiveData = {
      type: action.type,
      ...action.item
    };
    const discoverPrimitiveNew = primitive(state.list, discoverPrimitiveData);

    return {
      ...state,
      list: [
        discoverPrimitiveNew
      ]
    };

  case 'DUPLICATE_PRIMITIVE':
    const {newPrimitive, pos} = primitive(state.list, action);
    let duplicatePrimitiveList = [];

    if (action.childId !== undefined) {
      // Inner list
      duplicatePrimitiveList = state.list.map(item => {
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
      duplicatePrimitiveList = [
        ...state.list.slice(0, pos + 1),
        newPrimitive,
        ...state.list.slice(pos + 1)
      ];
    }

    return {
      ...state,
      list: duplicatePrimitiveList
    };

  case 'TOGGLE_PRIMITIVE':
    let togglePrimitiveList = state.list.map(item => {

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

    return {
      ...state,
      list: togglePrimitiveList
    };

  case 'UPDATE_INS':
    const newIn = getIn(state);

    let updateInsList = state.list.map((item, index) => {

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

    return {
      ...state,
      list: updateInsList
    };

  case 'DELETE_PRIMITIVE':
    let deletePrimitiveList = [];

    if (action.childId) {
      // Inner list
      deletePrimitiveList = state.list.map(item => {
        if (item.id === action.id) {
          item = deepClone(item);
          item.children = item.children.filter(child => child.id !== action.childId);
        }

        return item;
      });
    } else {
      // Top level list
      deletePrimitiveList = state.list.filter(item => item.id !== action.id);
    }

    return {
      ...state,
      list: deletePrimitiveList
    };

  case 'PURGE_PRIMITIVES':
    return {
      ...state,
      list: []
    };

  case 'CHANGE_PRIMITIVE_PROP':
    let changePrimitivePropList = state.list.map(item => {

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

    return {
      ...state,
      list: changePrimitivePropList
    };

  case 'TOGGLE_PROP':
    let togglePropList = state.list.map(item => {

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

    return {
      ...state,
      list: togglePropList
    };

  case 'CHANGE_PROP_TYPE':
    let chahgePropTypeList = state.list.map(item => {

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

    return {
      ...state,
      list: chahgePropTypeList
    };

  case 'ADD_PRESET':
    const addPresetList = [
      ...action.primitives
    ];

    resetIdKeeper(addPresetList);

    return {
      ...state,
      list: addPresetList
    };

  case 'SWAP_PRIMITIVES':
    const parentId = action.parentId;
    let swapPrimitivesList = Array.from(state.list);

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

    return {
      list: swapPrimitivesList,
      swapSnapshot: action.swapSnapshot
    };

  case 'SWITCH_OFF_LAST_ADDED':
    let switchOffLastList = [];
    const {section} = action;

    switchOffLastList = state[section].map(item => {
      if (item.id === action.id) {
        item = deepClone(item);
        item.justAdded = false;
        item.nativeEvent = null;
      }

      return item;
    });

    const switchOffLastResult = {...state};
    switchOffLastResult[section] = switchOffLastList;

    return switchOffLastResult;

  default:
    return state;
  }
};

export default primitives;
