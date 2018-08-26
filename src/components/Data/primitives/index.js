import blur from './blur';
import blend from './blend';
import colormatrix from './colormatrix';
import componentTransfer from './componentTransfer';
import composite from './composite';
import convolveMatrix from './convolveMatrix';
import diffuseLighting from './diffuseLighting.json';
import displacementMap from './displacementMap';
import dropShadow from './dropShadow';
import flood from './flood';
import image from './image';
import merge from './merge';
import morphology from './morphology';
import offset from './offset';
import specularLighting from './specularLighting.json';
import tile from './tile';
import turbulence from './turbulence';

export default [
  blur,
  dropShadow,
  morphology,
  displacementMap,

  blend,
  colormatrix,
  convolveMatrix,
  componentTransfer,

  specularLighting,
  diffuseLighting,

  flood,
  turbulence,
  image,
  tile,

  offset,
  composite,
  merge,
];
