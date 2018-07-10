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

const getLastResult = (state) => {
  let result = 'SourceGraphic';
  const last = state[state.length - 1];

  if (last) {
    result = last.id;
  }
  return result;
};

const updateUnicalProps = (state, action) => {
  const newAction = deepClone(action);
  let newIdAdd = getId(newAction.groupName);
  let newIn = getLastResult(state);

  newAction.id = newIdAdd;

  if (newAction.params) {
    if (newAction.params.result) {
      newAction.params.result.value = newIdAdd;
    }

    if (newAction.params.in) {
      newAction.params.in.value = newIn;
    }
  }

  if (newAction.children) {
    newAction.children = newAction.children.map(item => updateUnicalProps(state, item));
  }

  return newAction;
};

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
    const source = state.filter(item => item.id === action.id);
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

