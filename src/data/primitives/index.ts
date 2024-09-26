import blur from './blur.json';
import blend from './blend.json';
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
import { PrimitiveItem } from '../../components/molecules/Primitive';

const primitives: PrimitiveItem[] = [
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

export default primitives;
