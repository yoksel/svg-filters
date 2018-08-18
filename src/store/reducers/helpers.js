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

// Fill counter with state for section
const fillCounter = (state) => {
  let counterObj = {};

  if (state) {
    counterObj = reduceStateToCounterObj(state);
  }

  return counterObj;
};

export const idKeeper = () => {
  const groupIdCounter = {};

  const addSection = (state, section) => {
    // If state was filled from localStorage,
    // need fill groupIdCounter with existed IDs
    groupIdCounter[section] = fillCounter(state, section);
  };

  const purgeSection = (section) => {
    // Drop counters after purging section
    groupIdCounter[section] = {};
  };

  const checkSection = (section) => {
    return Boolean(groupIdCounter[section]);
  };

  const getId = (groupName, section) => {
    let newId = groupName;

    if (!groupIdCounter[section]) {
      groupIdCounter[section] = {};
    }

    if (groupIdCounter[section][groupName] !== undefined) {
      newId += ++groupIdCounter[section][groupName];
    } else {
      groupIdCounter[section][groupName] = 0;
    }

    return newId;
  };

  return {
    addSection,
    checkSection,
    purgeSection,
    getId
  };
};

const keeperTools = idKeeper();

export const resetIdKeeperSection = (state, section) => {
  keeperTools.addSection(state, section);
};

export const purgeIdKeeperSection = (section) => {
  keeperTools.purgeSection(section);
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

export const updateUnicalProps = ({state, primitive, actionType, section}) => {
  if (!keeperTools.checkSection(section)) {
    keeperTools.addSection(state, section);
  }

  const newPrimitive = deepClone(primitive);
  let newIn = getLastResult(state);
  let newIdAdd = newPrimitive.id;

  if (section !== 'docs') {
    newIdAdd = keeperTools.getId(newPrimitive.groupName, section);
  }

  newPrimitive.id = newIdAdd;

  if (newPrimitive.params) {
    if (newPrimitive.params.result) {
      newPrimitive.params.result.value = newIdAdd;
    }

    if (actionType !== 'DUPLICATE_PRIMITIVE') {
      if (newPrimitive.params.in2) {
        // In + In2
        newPrimitive.params.in.value = 'SourceGraphic';
        newPrimitive.params.in2.value = newIn;

        if (newPrimitive.groupName === 'composite') {
          newPrimitive.params.in.value = newIn;
          newPrimitive.params.in2.value = 'SourceAlpha';
        }

      } else if (newPrimitive.params.in) {
        // In only
        newPrimitive.params.in.value = newIn;
      }
    }
  }

  if (newPrimitive.children) {
    newPrimitive.children = newPrimitive.children.map(item => {
      return updateUnicalProps({
        state,
        primitive: item,
        section
      });
    });
  }

  return newPrimitive;
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

export const getIn = (state, section) => {
  const list = state[section];
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
