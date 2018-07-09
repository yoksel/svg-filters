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
    let newIdAdd = getId(action.groupName);

    action.params = {
      ...action.params,
      result: {
        value: newIdAdd
      }
    };

    return {
      id: newIdAdd,
      name: action.name,
      params: action.params,
      groupName: action.groupName,
      paramsValues: action.paramsValues,
      children: action.children
    };

  case 'DUPLICATE_PRIMITIVE':
    const source = state.filter(item => item.id === action.id);
    const duplicate = {...source[0]};
    let newIdDupl = getId(duplicate.groupName);

    duplicate.id = newIdDupl;
    duplicate.params = {
      ...duplicate.params,
      result: {
        value: newIdDupl
      }
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
    const filteredDel = state.filter(item => item.id !== action.id);

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

        item.params[action.param].value = action.value;
      }

      return item;
    });

    return newState;

  default:
    return state;
  }
};

export default primitives;

