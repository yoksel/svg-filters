import {combineReducers} from 'redux';

import primitives from './primitives';
import primitiveControls from './primitiveControls.js';
import presetControls from './presetControls.js';

export default combineReducers({
  primitives,
  primitiveControls,
  presetControls
});
