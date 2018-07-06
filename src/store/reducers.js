export const idKeeper = () => {
  const groupIdCounter = {};

  const getId = (groupName) => {
    let id = groupName;

    if(groupIdCounter[groupName] !== undefined) {
      id += ++groupIdCounter[groupName];
    }
    else {
      groupIdCounter[groupName] = 0;
    }

    return id;
  }

  return getId;
}

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
        groupName: action.groupName
      }

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

    case 'DELETE_PRIMITIVE':
      console.log('del');
      return state;

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
      return [
        ...state
      ];

    default:
      return state;
  }
};

const primitiveControl = (state, action) => {
  switch (action.type) {
    case 'ADD_PRIMITIVE_CONTROL':
      return {
        id: action.id,
        name: action.name,
        params: action.params,
        groupName: action.groupName
      }

    default:
      return state;
  }
};

export const primitiveControls = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PRIMITIVE_CONTROL':
      return [
        ...state,
        primitiveControl(undefined, action)
      ];
    default:
      return state;
  }
};
