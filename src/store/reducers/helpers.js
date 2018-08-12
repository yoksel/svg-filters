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

export const getAllEnabledResultsObj = (state) => {
  const results = state.reduce((prev, item) => {
    if (item.disabled) {
      return prev;
    }

    prev[item.id] = item.id;
    return prev;
  }, {});

  return results;
};

export const getLastResult = (state) => {
  let result = 'SourceGraphic';
  const newState = state.filter(item => !item.disabled);
  const last = newState[newState.length - 1];

  if (last) {
    result = last.id;
  }
  return result;
};

export const updateUnicalProps = (state, action, actionType) => {
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

    if (actionType === 'DUPLICATE_PRIMITIVE') {
      // Don't change in & in2
      newIn = newAction.params.in.value;
    } else {
      if (newAction.params.in2) {
        // In + In2
        newAction.params.in.value = 'SourceGraphic';
        newAction.params.in2.value = newIn;
      } else if (newAction.params.in) {
        // In only
        newAction.params.in.value = newIn;
      }
    }
  }

  if (newAction.children) {
    newAction.children = newAction.children.map(item => updateUnicalProps(state, item));
  }

  return newAction;
};

export const swap = (items, positions) => {
  const {from, to} = positions;
  const itemFrom = items.splice(from, 1)[0];
  items.splice(to, 0, itemFrom);

  return items;
};

export const getFilteredWithIndex = (list, id) => {
  let pos = 0;
  const filteredList = list.filter((item, index) => {
    if (item.id === id) {
      pos = index;
      return true;
    }
    return false;
  });

  const filtered = filteredList[0];

  return {
    pos,
    filtered
  };
};

export const getIn = (state) => {
  const list = state.list;
  const allEnabledResultsObj = getAllEnabledResultsObj(list);

  const defaultSources = {
    SourceGraphic: 'SourceGraphic',
    SourceAlpha: 'SourceAlpha'
  };

  const updateItem = ({item, index, isChild}) => {
    item = deepClone(item);
    const previousItems = list.slice(0, index);
    const initialValue = item.params.in.value;
    const prevValue = item.params.in.prevValue;
    const lastResult = getLastResult(previousItems);
    let newValue = lastResult;

    // SAVE
    // Value not inherited, need to keep
    if (index === 0) {
      // First primitive in list
      if (!isChild) {
        newValue = initialValue;
      }
    } else {
      // SourceGraphic || SourceAlpha
      if (defaultSources[initialValue]) {
        newValue = initialValue;
      } else {
        if (!allEnabledResultsObj[initialValue]) {
          // in-elem not available
          item.params.in.prevValue = initialValue;
        } else {
          newValue = initialValue;
        }
      }
    }

    // SET BACK
    // Use prev value if it available
    if (prevValue && allEnabledResultsObj[prevValue]) {
      newValue = prevValue;
      delete item.params.in.prevValue;
    }

    item.params.in.value = newValue;
    return item;
  };

  return {
    updateItem
  };
};
