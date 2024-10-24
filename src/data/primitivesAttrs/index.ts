import blend from './blend';
import blur from './blur';
import colormatrix from './colormatrix';
import componentTransfer from './componentTransfer';
import composite from './composite';
import convolveMatrix from './convolveMatrix';
import diffuseLighting from './diffuseLighting';
import displacementMap from './displacementMap';
import distantLight from './distantLight';
import dropShadow from './dropShadow';
import flood from './flood';
import funcR from './funcR';
import funcG from './funcG';
import funcB from './funcB';
import funcA from './funcA';
import image from './image';
import merge from './merge';
import mergeNode from './mergeNode';
import morphology from './morphology';
import offset from './offset';
import pointLight from './pointLight';
import specularLighting from './specularLighting';
import spotLight from './spotLight';
import tile from './tile';
import turbulence from './turbulence';

const primitivesByName =  {
  // 'x': 0,
  // 'y': 0,
  // 'width': '100%',
  // 'height': '100%',
  // 'in': [
  //   'SourceGraphic',
  //   'SourceAlpha'
  // ],
  // 'in2': [
  //   'SourceGraphic',
  //   'SourceAlpha'
  // ],
  blend,
  blur,
  colormatrix,
  componentTransfer,
  convolveMatrix,
  composite,
  diffuseLighting,
  displacementMap,
  distantLight,
  dropShadow,
  flood,
  funcR,
  funcG,
  funcB,
  funcA,
  image,
  tile,
  merge,
  mergeNode,
  morphology,
  offset,
  pointLight,
  specularLighting,
  spotLight,
  turbulence
};

export default primitivesByName;
