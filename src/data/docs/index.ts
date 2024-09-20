/* eslint-disable max-len */

import blend from './blend.json';
import blur from './blur.json';
import colormatrix from './colormatrix.json';
import componentTransfer from './componentTransfer.json';
import composite from './composite.json';
import convolveMatrix from './convolveMatrix.json';
import diffuseLighting from './diffuseLighting.json';
import displacementMap from './displacementMap.json';
import dropShadow from './dropShadow.json';
import flood from './flood.json';
import image from './image.json';
import merge from './merge.json';
import morphology from './morphology.json';
import offset from './offset.json';
import specularLighting from './specularLighting.json';
import tile from './tile.json';
import turbulence from './turbulence.json';

import distantLightLS from './distantLight.json';
import pointLightLS from './pointLight.json';
import spotLightLS from './spotLight.json';

import funcRGBA from './funcRGBA.json';

import inProp from './in.json';
import result from './result.json';
import x from './x.json';
import y from './y.json';
import width from './width.json';
import height from './height.json';

const in2 = {
  desc: 'The second input image. See <code>in</code>.'
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

  funcRGBA,
  distantLightLS,
  pointLightLS,
  spotLightLS,

  blend,
  blur,
  colormatrix,
  composite,
  componentTransfer,
  convolveMatrix,
  diffuseLighting,
  displacementMap,
  dropShadow,
  flood,
  image,
  merge,
  morphology,
  offset,
  specularLighting,
  tile,
  turbulence,
  'xlink:href': href
};
