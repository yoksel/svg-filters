import {BasicInputsData, ColorInputData, NumberInputData, NumberWithDoubleInputData, PrimitiveAttributes} from "../types";

interface InputsData extends BasicInputsData {
  stdDeviation: NumberWithDoubleInputData;
  dx: NumberInputData;
  dy: NumberInputData;
  floodColor: ColorInputData;
  floodOpacity: NumberInputData;
}

export type DropShadowPrimitiveAttributes = PrimitiveAttributes<InputsData>;

const attributes: DropShadowPrimitiveAttributes = {
  "name": "feDropShadow",
  "inputsData": {
    "stdDeviation": {
      "min": 0,
      "step": 1,
      "type": "number",
      "double": true
    },
    "dx": {
      "type": "number"
    },
    "dy": {
      "type": "number"
    },
    "floodColor": {
      "type": "color",
      "name": "flood-color"
    },
    "floodOpacity": {
      "type": "number",
      "step": 0.1,
      "min": 0,
      "max": 1,
      "name": "flood-opacity"
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
