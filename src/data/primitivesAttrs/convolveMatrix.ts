import {BasicInputsData, NumberInputData, NumberWithDoubleInputData, PrimitiveAttributes, SelectInputData, TextareaInputData} from "../types";

interface InputsData extends BasicInputsData {
  order: NumberWithDoubleInputData;
  kernelMatrix: TextareaInputData;
  divisor: NumberInputData;
  bias: NumberInputData;
  targetX: NumberInputData;
  targetY: NumberInputData;
  edgeMode: SelectInputData;
  preserveAlpha: SelectInputData;
  in2: SelectInputData;
}

type BoolStrings = 'true' | 'false';
type EdgeMode = "none" | "duplicate" | "wrap";

export interface ConvolveMatrixPrimitiveAttributes extends PrimitiveAttributes<InputsData> {
  preserveAlpha: BoolStrings[], edgeMode: EdgeMode[]
}

const attributes: ConvolveMatrixPrimitiveAttributes =  {
  "name": "feConvolveMatrix",
  "inputsData": {
    "order": {
      "type": "number",
      "double": true,
      "min": 1
    },
    "kernelMatrix": {
      "type": "textarea"
    },
    "divisor": {
      "type": "number"
    },
    "bias": {
      "type": "number",
      "step": 0.1
    },
    "targetX": {
      "type": "number"
    },
    "targetY": {
      "type": "number"
    },
    "edgeMode": {
      "type": "select"
    },
    "preserveAlpha": {
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
    },
    "in2": {
      "type": "select"
    }
  },
  "edgeMode": [
    "wrap",
    "duplicate",
    "none"
  ],
  "preserveAlpha": [
    "false",
    "true"
  ]
};

export default attributes;
