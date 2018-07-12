const presetControl = (state, action) => {
  switch (action.type) {
  case 'ADD_PRESET_CONTROL':
    return {
      id: action.id,
      name: action.name,
      params: action.params,
      groupName: action.groupName,
      paramsValues: action.paramsValues,
      children: action.children
    };

  default:
    return state;
  }
};

export const presetControls = (state = [], action) => {
  switch (action.type) {
  case 'ADD_All_PRESET_CONTROLS':
    return [
      ...action.data
    ];

  case 'ADD_PRESET_CONTROL':
    return [
      ...state,
      presetControl(undefined, action)
    ];

  default:
    return state;
  }
};

export default presetControls;
