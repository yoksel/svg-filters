import deepClone from '../../helpers/deepClone';
import {updateUnicalProps, resetIdKeeper, swap} from './helpers';

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
    let source = state.filter(item => item.id === action.id);

    if (action.childId) {
      source = source[0].children.filter(item => item.id === action.childId);
    }
    const duplAction = updateUnicalProps(state, source[0]);

    return duplAction;

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

    return {
      ...state,
      list: [
        ...state.list,
        primitive(state.list, action)
      ]
    };

  case 'DUPLICATE_PRIMITIVE':
    const newPrimitive = primitive(state.list, action);
    let newStateDuplList = [];

    if (action.childId !== undefined) {
      newStateDuplList = state.list.map(item => {
        if (item.id === action.id) {
          item = deepClone(item);
          item.children.push(newPrimitive);
        }

        return item;
      });
    } else {
      newStateDuplList = [
        ...state.list,
        newPrimitive
      ];
    }

    return {
      ...state,
      list: newStateDuplList
    };

  case 'DELETE_PRIMITIVE':
    let filteredDel = {};

    if (action.childId) {
      filteredDel = state.list.map(item => {
        if (item.id === action.id) {
          item = deepClone(item);
          item.children = item.children.filter(child => child.id !== action.childId);
        }

        return item;
      });
    } else {
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
          if (child.id === action.id) {
            child.params[action.param].value = action.value;
          }

          return child;
        });
      } else if (item.id === action.id) {
        item = deepClone(item);
        const param = item.params[action.param];
        param.value = action.value;

        // Save value to variants (feColorMatrix, for example)
        if (param.variants) {
          const propByKey = item.params[param.variants.key];
          const keyValue = propByKey.value;
          param.variants.values[keyValue] = action.value;
        }
      }

      return item;
    });

    return {
      ...state,
      list: newStateChangPropList
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

  default:
    return state;
  }
};

export default primitives;
