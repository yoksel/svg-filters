import deepClone from '../../helpers/deepClone';
import {updateUnicalProps, resetIdKeeper, swap, getFilteredWithIndex} from './helpers';

const primitive = (state, action) => {
  switch (action.type) {
  case 'ADD_PRIMITIVE':
    const newAction = updateUnicalProps(state, action);

    return {
      id: newAction.id,
      name: newAction.name,
      params: newAction.params,
      groupName: newAction.groupName,
      paramsValues: newAction.paramsValues,
      children: newAction.children
    };

  case 'DUPLICATE_PRIMITIVE':
    let filteredWithIndex = getFilteredWithIndex(state, action.id);

    if (action.childId) {
      const children = filteredWithIndex.filtered.children;
      filteredWithIndex = getFilteredWithIndex(children, action.childId);
    }

    const duplAction = updateUnicalProps(state, filteredWithIndex.filtered);

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
  swapSnapshot: ''
};

export const primitives = (state = initialState, action) => {
  switch (action.type) {
  case 'ADD_PRIMITIVE':
    const actionToNewPrimitive = {
      type: action.type,
      ...action.item
    };
    const newPrimitiveAdded = primitive(state.list, actionToNewPrimitive);
    newPrimitiveAdded.justAdded = true;
    newPrimitiveAdded.nativeEvent = action.nativeEvent;

    return {
      ...state,
      list: [
        ...state.list,
        newPrimitiveAdded
      ]
    };

  case 'DUPLICATE_PRIMITIVE':
    const {newPrimitive, pos} = primitive(state.list, action);
    let newStateDuplList = [];

    if (action.childId !== undefined) {
      // Inner list
      newStateDuplList = state.list.map(item => {
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
      newStateDuplList = [
        ...state.list.slice(0, pos + 1),
        newPrimitive,
        ...state.list.slice(pos + 1)
      ];
    }

    return {
      ...state,
      list: newStateDuplList
    };

  case 'DELETE_PRIMITIVE':
    let filteredDel = {};

    if (action.childId) {
      // Inner list
      filteredDel = state.list.map(item => {
        if (item.id === action.id) {
          item = deepClone(item);
          item.children = item.children.filter(child => child.id !== action.childId);
        }

        return item;
      });
    } else {
      // Top level list
      filteredDel = state.list.filter(item => item.id !== action.id);
    }

    return {
      ...state,
      list: filteredDel
    };

  case 'CHANGE_PRIMITIVE_PROP':
    let newStateChangPropList = state.list.map(item => {

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
            param.variants.values[keyValue] = action.value;
          }
        }
      }

      return item;
    });

    return {
      ...state,
      list: newStateChangPropList
    };

  case 'TOGGLE_PROP':
    let newStateDisablePropList = state.list.map(item => {

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
      list: newStateDisablePropList
    };

  case 'CHANGE_PROP_TYPE':
    let newStateChangePropTypeList = state.list.map(item => {

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
      list: newStateChangePropTypeList
    };

  case 'ADD_PRESET':
    const newPresetList = [
      ...action.primitives
    ];

    resetIdKeeper(newPresetList);

    return {
      ...state,
      list: newPresetList
    };

  case 'SWAP_PRIMITIVES':
    const parentId = action.parentId;
    let newSwapList = Array.from(state.list);

    if (state.swapSnapshot && state.swapSnapshot === action.swapSnapshot) {
      return state;
    }

    if (parentId) {
      newSwapList = newSwapList.map(item => {
        if (item.id === parentId) {
          const children = deepClone(item).children;
          item.children = swap(children, action.indexes);
        }

        return item;
      });
    } else {
      newSwapList = swap(newSwapList, action.indexes);
    }

    return {
      list: newSwapList,
      swapSnapshot: action.swapSnapshot
    };

  case 'SWITCH_OFF_LAST_ADDED':
    let newSwitchList = {};

    newSwitchList = state.list.map(item => {
      if (item.id === action.id) {
        item = deepClone(item);
        item.justAdded = false;
        item.nativeEvent = null;
      }

      return item;
    });

    return {
      ...state,
      list: newSwitchList
    };

  default:
    return state;
  }
};

export default primitives;
