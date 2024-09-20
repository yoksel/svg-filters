import {BasicInputsData, ColorInputData, NumberInputData, NumberWithDoubleInputData, PrimitiveAttributes} from "../types";

interface InputsData extends BasicInputsData {
  surfaceScale: NumberInputData;
  specularConstant: NumberInputData;
  specularExponent: NumberInputData;
  kernelUnitLength: NumberWithDoubleInputData;
  lightingColor: ColorInputData;
}

export type SpecularLightingPrimitiveAttributes = PrimitiveAttributes<InputsData>;

const attributes: SpecularLightingPrimitiveAttributes  = {
  "name": "feSpecularLighting",
  "hasSingleChild": true,
  "inputsData": {
    "surfaceScale": {
      "type": "number"
    },
    "specularConstant": {
      "type": "number",
      "step": 0.1,
      "min": 0
    },
    "specularExponent": {
      "type": "number"
    },
    "kernelUnitLength": {
      "type": "number",
      "double": true
    },
    "lightingColor": {
      "type": "color",
      "name": "lighting-color"
    },
    "x": {
      "type": "text"
    },
    "y": {
      "type": "text"
    },
    "width": {
      "type": "text"
    },
    "height": {
      "type": "text"
    },
    "in": {
      "type": "select"
    }
  }
};

export default attributes;
