import {BasicInputsData, ColorInputData, NumberInputData, PrimitiveAttributes} from "../types";

interface InputsData extends BasicInputsData {
  surfaceScale: NumberInputData;
  diffuseConstant: NumberInputData;
  lightingColor: ColorInputData;
}

export type DiffuseLightingPrimitiveAttributes = PrimitiveAttributes<InputsData>;

const attributes: DiffuseLightingPrimitiveAttributes = {
  "name": "feDiffuseLighting",
  "hasSingleChild": true,
  "inputsData": {
    "surfaceScale": {
      "type": "number",
      "step": 0.1
    },
    "diffuseConstant" : {
      "type": "number",
      "step": 0.1,
      "min": 0
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
