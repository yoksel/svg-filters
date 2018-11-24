const initialState = {
  svgCode: '',
  playgroundType: 'image-and-text'
};

export const playGround = (state = initialState, action) => {

  switch (action.type) {

  case 'UPDATE_SVG':
    const updateSvgResult = {
      ...state,
      svgCode: action.value
    };

    return updateSvgResult;

  default:
    return state;
  }
};

export default playGround;
