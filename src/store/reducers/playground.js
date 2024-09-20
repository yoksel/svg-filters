const initialState = {
  svgCode: '',
  type: 'image-and-text',
};

export const playGround = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PLAYGROUND_TYPE':
      const setPlaygroundTypeResult = {
        ...state,
        type: action.playgroundType,
      };

      return setPlaygroundTypeResult;

    case 'UPDATE_SVG':
      const updateSvg = {
        ...state,
        svgCode: action.value,
      };

      return updateSvg;

    default:
      return state;
  }
};

export default playGround;
