import deepClone from '../../helpers/deepClone';

const reduceStateToCounterObj = (state) => {
  return state.reduce((prev, item) => {
    const groupName = item.groupName;
    const orderNum = Number(item.id.replace(groupName, ''));

    if (prev[groupName] !== undefined) {
      if (prev[groupName] > orderNum) {
        prev[groupName] = ++prev[groupName];
      } else {
        prev[groupName] = orderNum;
      }

    } else {
      prev[groupName] = orderNum;
    }

    if (item.children) {
      const childrenReduce = reduceStateToCounterObj(item.children);
      prev = Object.assign(prev, childrenReduce);
    }

    return prev;
  }, {});
};

// Fill counter with state from storage
const fillCounter = (state) => {
  let counterObj = {};

  if (state) {
    counterObj = reduceStateToCounterObj(state);
  }

  return counterObj;
};

export const idKeeper = (state) => {
  // If state was filled from localStorage,
  // need fill groupIdCounter with existed IDs
  const groupIdCounter = fillCounter(state);

  const getId = (groupName) => {
    let newId = groupName;

    if (groupIdCounter[groupName] !== undefined) {
      newId += ++groupIdCounter[groupName];
    } else {
      groupIdCounter[groupName] = 0;
    }

    return newId;
  };

  return getId;
};

let getId;

export const resetIdKeeper = (state) => {
  getId = idKeeper(state);
};

export const getLastResult = (state) => {
  let result = 'SourceGraphic';
  const last = state[state.length - 1];

  if (last) {
    result = last.id;
  }
  return result;
};

export const updateUnicalProps = (state, action) => {
  if (!getId) {
    getId = idKeeper(state);
  }

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

export const swap = (items, positions) => {
  const {from, to} = positions;
  const item1 = items[from];
  const item2 = items[to];

  if (item1 && item2) {
    items[from] = item2;
    items[to] = item1;
  }

  return items;
};
