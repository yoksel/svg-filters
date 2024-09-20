import {BasicInputsData, NumberInputData, PrimitiveAttributes, SelectInputData} from "../types";

interface InputsData extends BasicInputsData {
  in2: SelectInputData;
  operator: SelectInputData;
  k1: NumberInputData;
  k2: NumberInputData;
  k3: NumberInputData;
  k4: NumberInputData;
}

type Operator =  "over" | "in" | "out" | "atop" | "xor" | "lighter" | "arithmetic";

export interface CompositePrimitiveAttributes extends PrimitiveAttributes<InputsData> {
  operator: Operator[]
}

const attributes: CompositePrimitiveAttributes = {
  "name": "feComposite",
  "inputsData": {
    "in": {
      "type": "select"
    },
    "in2": {
      "type": "select"
    },
    "operator": {
      "type": "select",
      "dependencies": [
        {
          "value": "arithmetic",
          "enable": ["k1", "k2", "k3", "k4"]
        }
      ]
    },
    "k1": {
      "type": "number",
      "step": 0.1
    },
    "k2": {
      "type": "number",
      "step": 0.1
    },
    "k3": {
      "type": "number",
      "step": 0.1
    },
    "k4": {
      "type": "number",
      "step": 0.1
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
  },
  "operator": [
    "over",
    "in",
    "out",
    "atop",
    "xor",
    "lighter",
    "arithmetic"
  ]
};

export default attributes;
