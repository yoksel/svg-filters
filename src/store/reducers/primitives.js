import deepClone from '../../helpers/deepClone';
import {idKeeper, getLastResult, updateUnicalProps} from './helpers';

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

export const primitives = (state = [], action) => {
  switch (action.type) {
  case 'ADD_PRIMITIVE':
    return [
      ...state,
      primitive(state, action)
    ];

  case 'DUPLICATE_PRIMITIVE':
    const newPrimitive = primitive(state, action);

    if (action.childId !== undefined) {
      return state.map(item => {
        if (item.id === action.id) {
          item = deepClone(item);
          item.children.push(newPrimitive);
        }

        return item;
      });
    }

    return [
      ...state,
      newPrimitive
    ];

  case 'DELETE_PRIMITIVE':
    let filteredDel = {};

    if (action.childId) {
      filteredDel = state.map(item => {
        if (item.id === action.id) {
          item = deepClone(item);
          item.children = item.children.filter(child => child.id !== action.childId);
        }

        return item;
      });
    } else {
      filteredDel = state.filter(item => item.id !== action.id);
    }

    return filteredDel;

  case 'CHANGE_PRIMITIVE_PROP':
    const newState = state.map(item => {

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

    return newState;

  case 'ADD_PRESET':
    return [
      ...action.primitives
    ];

  default:
    return state;
  }
};

export default primitives;

