import deepClone from '../../helpers/deepClone';

export const idKeeper = (state) => {
  // If state was filled from localStorage,
  // need fill groupIdCounter with existed IDs
  const fillCounter = () => {
    let counterObj = {};
    if (state.length > 0) {
      counterObj = state.reduce((prev, item) => {
        const groupName = item.groupName;

        if (prev[groupName] !== undefined) {
          prev[groupName] = ++prev[groupName];
        } else {
          const orderNum = Number(item.id.replace(groupName, ''));
          prev[groupName] = orderNum;
        }

        return prev;
      }, {});
    }
    return counterObj;
  };

  const groupIdCounter = fillCounter();

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
