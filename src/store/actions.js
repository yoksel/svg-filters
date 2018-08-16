export const createAction = (type, propNames = []) => {
  const action = (props, value) => {
    const result = {
      type: type
    };

    if (value) {
      result.value = value;
    }

    if (!propNames) {
      return result;
    }

    propNames.forEach(propName => {
      if (props[propName] !== undefined) {
        result[propName] = props[propName];
      }
    });

    return result;
  };
  return action;
};

const ADD_PRIMITIVE = 'ADD_PRIMITIVE';
const DISCOVERY_PRIMITIVE = 'DISCOVERY_PRIMITIVE';
const DELETE_PRIMITIVE = 'DELETE_PRIMITIVE';
const PURGE_PRIMITIVES = 'PURGE_PRIMITIVES';
const DUPLICATE_PRIMITIVE = 'DUPLICATE_PRIMITIVE';
const TOGGLE_PRIMITIVE = 'TOGGLE_PRIMITIVE';
const UPDATE_INS = 'UPDATE_INS';
const CHANGE_PRIMITIVE_PROP = 'CHANGE_PRIMITIVE_PROP';
const SWAP_PRIMITIVES = 'SWAP_PRIMITIVES';

const ADD_PRESET = 'ADD_PRESET';

const START_DRAG = 'START_DRAG';
const MOVE_DRAG = 'MOVE_DRAG';
const STOP_DRAG = 'STOP_DRAG';
const SWITCH_OFF_LAST_ADDED = 'SWITCH_OFF_LAST_ADDED';

export const addPrimitive = createAction(
  ADD_PRIMITIVE,
  ['item', 'nativeEvent', 'section']
);

export const discoveryPrimitive = createAction(
  DISCOVERY_PRIMITIVE,
  ['item']
);

export const deletePrimitive = createAction(
  DELETE_PRIMITIVE,
  ['id', 'childId']
);

export const purgePrimitives = createAction(
  PURGE_PRIMITIVES,
  ['section']
);

export const duplicatePrimitive = createAction(
  DUPLICATE_PRIMITIVE,
  ['id', 'childId', 'section']
);

export const togglePrimitive = createAction(
  TOGGLE_PRIMITIVE,
  ['id', 'childId', 'disabled', 'section']
);

export const updateIns = createAction(
  UPDATE_INS,
  ['section']
);

export const changePrimitiveProp = createAction(
  CHANGE_PRIMITIVE_PROP,
  ['id', 'param', 'parentId', 'tiedValues']
);

export const addPreset = createAction(
  ADD_PRESET,
  ['id', 'name', 'primitives']
);

export const startDrag = createAction(
  START_DRAG,
  ['id', 'index', 'parentId', 'listId', 'elemClientRect', 'offset']
);

export const moveDrag = createAction(
  MOVE_DRAG,
  ['coords']
);

export const stopDrag = createAction(
  STOP_DRAG
);

export const switchOffLastAdded = createAction(
  SWITCH_OFF_LAST_ADDED,
  ['id', 'section']
);

export const swapPrimitives = createAction(
  SWAP_PRIMITIVES,
  ['parentId', 'indexes', 'swapSnapshot', 'section']
);
