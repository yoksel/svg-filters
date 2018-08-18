/* eslint-disable max-len */

import blend from './blend.json';
import blur from './blur.json';
import colormatrix from './colormatrix.json';
import flood from './flood.json';
import image from './image.json';
import morphology from './morphology.json';
import offset from './offset.json';
import tile from './tile.json';
import inProp from './in.json';
import result from './result.json';
import x from './x.json';
import y from './y.json';
import width from './width.json';
import height from './height.json';

const in2 = {
  desc: 'See <code>in</code>.'
};

const href = {
  value: '<url>',
  desc: 'An <url> to an image resource or to an element. If both, the <code>xlink:href</code> and the href attribute are specified, the latter overrides the first definition.'
};

export default {
  in: inProp,
  in2: in2,
  x,
  y,
  width,
  height,
  result,

  blend,
  blur,
  colormatrix,
  flood,
  image,
  morphology,
  offset,
  tile,
  'xlink:href': href
};
