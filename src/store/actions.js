export const createAction = (type, propNames) => {
  const action = (props, value) => {
    const result = {
      type: type,
      value: value
    };

    propNames.forEach(propName => {
      if (props[propName]) {
        result[propName] = props[propName];
      }
    });

    return result;
  };
  return action;
};

const ADD_PRIMITIVE = 'ADD_PRIMITIVE';
const DELETE_PRIMITIVE = 'DELETE_PRIMITIVE';
const DUPLICATE_PRIMITIVE = 'DUPLICATE_PRIMITIVE';
const CHANGE_PRIMITIVE_PROP = 'CHANGE_PRIMITIVE_PROP';
const ADD_PRESET = 'ADD_PRESET';

export const addPrimitive = createAction(
  ADD_PRIMITIVE,
  ['id', 'name', 'groupName', 'params', 'paramsValues', 'children']
);

export const deletePrimitive = createAction(
  DELETE_PRIMITIVE,
  ['id', 'childId']
);

export const duplicatePrimitive = createAction(
  DUPLICATE_PRIMITIVE,
  ['id', 'childId']
);

export const changePrimitiveProp = createAction(
  CHANGE_PRIMITIVE_PROP,
  ['id', 'param', 'parentId']
);

export const addPreset = createAction(
  ADD_PRESET,
  ['id', 'name', 'primitives']
);
