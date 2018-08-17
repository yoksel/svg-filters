/* eslint-disable max-len */

import blend from './blend.json';
import blur from './blur.json';
import image from './image.json';
import inProp from './in.json';
import result from './result.json';

const in2 = {
  desc: 'See <b>in</b>'
};

const href = {
  value: '<url>',
  desc: 'An <url> to an image resource or to an element. If both, the <code>xlink:href</code> and the href attribute are specified, the latter overrides the first definition.'
};

export default {
  in: inProp,
  in2: in2,
  result,

  blend,
  blur,
  image,
  'xlink:href': href
};
