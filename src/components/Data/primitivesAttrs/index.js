import blend from './blend.json';
import blur from './blur.json';
import colormatrix from './colormatrix.json';
import composite from './composite.json';
import diffuseLighting from './diffuseLighting.json';
import displacementMap from './displacementMap.json';
import distantLight from './distantLight.json';
import dropShadow from './dropShadow.json';
import flood from './flood.json';
import image from './image.json';
import merge from './merge.json';
import mergeNode from './mergeNode.json';
import morphology from './morphology.json';
import offset from './offset.json';
import pointLight from './pointLight.json';
import specularLighting from './specularLighting.json';
import spotLight from './spotLight.json';
import tile from './tile.json';
import turbulence from './turbulence.json';

export default {
  'x': 0,
  'y': 0,
  'width': '100%',
  'height': '100%',
  'in': [
    'SourceGraphic',
    'SourceAlpha'
  ],
  'in2': [
    'SourceGraphic',
    'SourceAlpha'
  ],
  blend,
  blur,
  colormatrix,
  composite,
  diffuseLighting,
  displacementMap,
  distantLight,
  dropShadow,
  flood,
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
