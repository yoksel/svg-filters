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

    if (newAction.params.in2) {
      // In + In2
      newAction.params.in.value = 'SourceGraphic';
      newAction.params.in2.value = newIn;
    } else if (newAction.params.in) {
      // In only
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

