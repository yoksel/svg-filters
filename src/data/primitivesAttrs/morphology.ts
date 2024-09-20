import {BasicInputsData, NumberWithDoubleInputData, PrimitiveAttributes, SelectInputData} from "../types";

interface InputsData extends BasicInputsData {
  operator: SelectInputData;
  radius: NumberWithDoubleInputData;
}

type Operator = "erode" | "dilate";

export interface MorphologyPrimitiveAttributes extends PrimitiveAttributes<InputsData> {
  operator: Operator[]
}

const attributes: MorphologyPrimitiveAttributes = {
  "name": "feMorphology",
  "inputsData": {
    "operator": {
      "type": "select"
    },
    "radius" : {
      "min": 0,
      "type": "number",
      "double": true
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
  "operator": [
    "erode",
    "dilate"
  ]
};

export default attributes;
