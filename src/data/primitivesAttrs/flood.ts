import {BasicInputsData, ColorInputData, NumberInputData, PrimitiveAttributes} from "../types";

interface InputsData extends BasicInputsData {
  floodColor: ColorInputData;
  floodOpacity: NumberInputData;
}

export type FloodPrimitiveAttributes = PrimitiveAttributes<InputsData>;

const attributes: FloodPrimitiveAttributes = {
  "name": "feFlood",
  "inputsData": {
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
    }
  }
};

export default attributes;
