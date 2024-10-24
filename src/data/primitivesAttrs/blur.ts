import {BasicInputsData, NumberWithDoubleInputData, PrimitiveAttributes, SelectInputData, TextInputData} from "../types";

interface InputsData extends BasicInputsData {
  stdDeviation: NumberWithDoubleInputData;
  edgeMode: SelectInputData;
}

type EdgeMode = "none" | "duplicate" | "wrap";

export interface BlurPrimitiveAttributes extends PrimitiveAttributes<InputsData> {
  edgeMode: EdgeMode[]
}

const attributes: BlurPrimitiveAttributes = {
  "name": "feGaussianBlur",
  "inputsData": {
    "stdDeviation": {
      "min": 0,
      "step": 1,
      "type": "number",
      "double": true
    },
    "edgeMode": {
      "type": "select"
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
  },
  "edgeMode": [
    "none",
    "duplicate",
    "wrap"
  ]
};

export default attributes;
