// export interface InputData {
//   type: text | number | "select"
// }

import {BlendPrimitiveAttributes} from "./primitivesAttrs/blend";
import {BlurPrimitiveAttributes} from "./primitivesAttrs/blur";
import {ColormatrixPrimitiveAttributes} from "./primitivesAttrs/colormatrix";
import {ComponentTransferPrimitiveAttributes} from "./primitivesAttrs/componentTransfer";
import {CompositePrimitiveAttributes} from "./primitivesAttrs/composite";
import {ConvolveMatrixPrimitiveAttributes} from "./primitivesAttrs/convolveMatrix";
import {DiffuseLightingPrimitiveAttributes} from "./primitivesAttrs/diffuseLighting";
import {DistantLightPrimitiveAttributes} from "./primitivesAttrs/distantLight";
import {DropShadowPrimitiveAttributes} from "./primitivesAttrs/dropShadow";
import {FloodPrimitiveAttributes} from "./primitivesAttrs/flood";
import {ImagePrimitiveAttributes} from "./primitivesAttrs/image";
import {MergeNodePrimitiveAttributes} from "./primitivesAttrs/mergeNode";
import {MorphologyPrimitiveAttributes} from "./primitivesAttrs/morphology";
import {OffsetPrimitiveAttributes} from "./primitivesAttrs/offset";
import {PointLightPrimitiveAttributes} from "./primitivesAttrs/pointLight";
import {SpecularLightingPrimitiveAttributes} from "./primitivesAttrs/specularLighting";
import {SpotLightPrimitiveAttributes} from "./primitivesAttrs/spotLight";
import {TilePrimitiveAttributes} from "./primitivesAttrs/tile";
import {TurbulencePrimitiveAttributes} from "./primitivesAttrs/turbulence";

export interface InputData {
  type: string;
  name?: string;
}

export interface TextInputData {
  type: 'text',
  name?: string;
}

export interface TextareaInputData {
  type: 'textarea',
}

export interface SelectInputData {
  type: 'select',
  dependencies?: Dependency[];
}

export interface SelectInputDataWithDouble extends SelectInputData {
  double: boolean;
  valuesKeys: string[];
}

export interface ColorInputData {
  type: 'color',
  name?: string;
}

export interface NumberInputData {
  type: 'number',
  min?: number;
  max?: number;
  step?: number;
  name?: string;
}

export interface NumberWithDoubleInputData extends NumberInputData {
  double: boolean;
}

interface Dependency {
  value: string;
  enable?: string[];
  disable?: string[];
}

export interface BasicInputsData {
  x: TextInputData;
  y: TextInputData;
  width: TextInputData;
  height: TextInputData;
  in?: SelectInputData;
}

export interface InputsData extends BasicInputsData {
  in2?: InputData;
}

export type PrimitiveType =
  'blend' |
  'blur' |
  'colormatrix' |
  'componentTransfer' |
  'convolveMatrix' |
  'composite' |
  'diffuseLighting' |
  'displacementMap' |
  'distantLight' |
  'dropShadow' |
  'flood' |
  'funcR' |
  'funcG' |
  'funcB' |
  'funcA' |
  'image' |
  'tile' |
  'merge' |
  'mergeNode' |
  'morphology' |
  'offset' |
  'pointLight' |
  'specularLighting' |
  'spotLight' |
  'turbulence';

  export type FilterEffect =
'feBlend' |
'feColorMatrix' |
'feComponentTransfer' |
'feComposite' |
'feConvolveMatrix' |
'feDiffuseLighting' |
'feDisplacementMap' |
'feDistantLight' |
'feDropShadow' |
'feFlood' |
'feFuncA' |
'feFuncB' |
'feFuncG' |
'feFuncR' |
'feGaussianBlur' |
'feImage' |
'feMerge' |
'feMergeNode' |
'feMorphology' |
'feOffset' |
'fePointLight' |
'feSpecularLighting' |
'feSpotLight' |
'feTile' |
'feTurbulence';

export type FeFuncType = "identity" | "table" | "discrete" | "linear" | "gamma";

export interface FeFuncTypeInputsData {
  type: SelectInputData;
  tableValues: TextInputData;
  slope: NumberInputData;
  intercept: NumberInputData;
  amplitude: NumberInputData;
  exponent: NumberInputData;
  offset: NumberInputData;
}

export interface FuncRGBAPrimitiveAttributes extends PrimitiveAttributes<FeFuncTypeInputsData> {
  type: FeFuncType[]
}

export interface CoordsInputsData {
  x: NumberInputData;
  y: NumberInputData;
  z: NumberInputData;
}

export interface PrimitiveAttributes<T = InputsData> {
  name: FilterEffect;
  inputsData: T;
  hasSingleChild?: boolean;
  noChangesForChildren?: boolean;
}

export type PrimitiveAttributesType = BlendPrimitiveAttributes | BlurPrimitiveAttributes | ColormatrixPrimitiveAttributes | ComponentTransferPrimitiveAttributes | CompositePrimitiveAttributes | ConvolveMatrixPrimitiveAttributes | DiffuseLightingPrimitiveAttributes | DistantLightPrimitiveAttributes | DistantLightPrimitiveAttributes | DropShadowPrimitiveAttributes | FloodPrimitiveAttributes | FuncRGBAPrimitiveAttributes | ImagePrimitiveAttributes | MergeNodePrimitiveAttributes | MorphologyPrimitiveAttributes | OffsetPrimitiveAttributes | PointLightPrimitiveAttributes |SpecularLightingPrimitiveAttributes | SpotLightPrimitiveAttributes | TilePrimitiveAttributes | TurbulencePrimitiveAttributes;
