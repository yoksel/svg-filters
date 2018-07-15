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

export const getLastResult = (state) => {
  let result = 'SourceGraphic';
  const last = state[state.length - 1];

  if (last) {
    result = last.id;
  }
  return result;
};

export const updateUnicalProps = (state, action) => {
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
