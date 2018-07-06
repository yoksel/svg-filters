import deepClone from '../../helpers/deepClone';

export const idKeeper = () => {
  const groupIdCounter = {};

  const getId = (groupName) => {
    let id = groupName;

    if (groupIdCounter[groupName] !== undefined) {
      id += ++groupIdCounter[groupName];
    } else {
      groupIdCounter[groupName] = 0;
    }

    return id;
  };

  return getId;
};

const getId = idKeeper();

const primitive = (state, action) => {
  switch (action.type) {
  case 'ADD_PRIMITIVE':
    let newId = getId(action.groupName);

    action.params = {
      ...action.params,
      result: newId
    };
    return {
      id: newId,
      name: action.name,
      params: action.params,
      groupName: action.groupName,
      paramsValues: action.paramsValues
    };

  case 'DUPLICATE_PRIMITIVE':
    const source = state.filter(item => item.id === action.id);
    const duplicate = {...source[0]};
    newId = getId(duplicate.groupName);

    duplicate.id = newId;
    duplicate.params = {
      ...duplicate.params,
      result: newId
    };

    return duplicate;

  default:
    return state;
  }
};

export const primitives = (state = [], action) => {
  switch (action.type) {
  case 'ADD_PRIMITIVE':
    return [
      ...state,
      primitive(undefined, action)
    ];

  case 'DUPLICATE_PRIMITIVE':
    return [
      ...state,
      primitive(state, action)
    ];

  case 'DELETE_PRIMITIVE':
    const filtered = state.filter(item => item.id !== action.id);

    return filtered;

  case 'CHANGE_PRIMITIVE_PROP':
    const newState = state.map(item => {
      if (item.id === action.id) {
        item = deepClone(item);
        // item.params = {...item.params};
        // item.params[action.param] = {...item.params[action.param]}
        if (item.params[action.param].value) {
          item.params[action.param].value = action.value;
        } else {
          item.params[action.param] = action.value;
        }
      }

      return item;
    });

    return newState;

  default:
    return state;
  }
};

export default primitives;

