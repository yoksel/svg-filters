import blend from './blend.json';
import blur from './blur.json';
import colormatrix from './colormatrix.json';
import composite from './composite.json';
import displacementMap from './displacementMap.json';
import flood from './flood.json';
import image from './image.json';
import mergeNode from './mergeNode.json';
import morphology from './morphology.json';
import offset from './offset.json';
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
  'blend': blend,
  'blur': blur,
  'colormatrix': colormatrix,
  'composite': composite,
  'displacementMap': displacementMap,
  'flood': flood,
  'image': image,
  'mergeNode': mergeNode,
  'morphology': morphology,
  'offset': offset,
  'turbulence': turbulence
};
