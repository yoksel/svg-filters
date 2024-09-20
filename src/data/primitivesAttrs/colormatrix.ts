import {BasicInputsData, NumberInputData, PrimitiveAttributes, SelectInputData} from "../types";

type Variant = "saturate" | "hueRotate" | "matrix" | "luminanceToAlpha";

interface BlendValues {
  saturate: number;
  hueRotate: number;
  matrix: string;
}

interface BlendInputTypes {
  saturate: "number",
  hueRotate: "number",
  matrix: "textarea"
}

interface Values extends NumberInputData {
  variants: {
    key: "type",
    values: BlendValues,
    types: BlendInputTypes
  }
}

interface InputsData extends BasicInputsData {
  type: SelectInputData;
  values: Values;
}

export interface ColormatrixPrimitiveAttributes extends PrimitiveAttributes<InputsData> {
  type: Variant[];
}

const attributes: ColormatrixPrimitiveAttributes = {
  "name": "feColorMatrix",
  "inputsData": {
    "type": {
      "type": "select",
      "dependencies": [
        {
          "value": "luminanceToAlpha",
          "disable": ["values"]
        }
      ]
    },
    "values": {
      "type": "number",
      "variants": {
        "key": "type",
        "values": {
          "saturate": 5,
          "hueRotate": 180,
          "matrix": "1 0 0 0 0\n0 1 0 0 0\n0 0 1 0 0\n0 0 0 500 -20"
        },
        "types": {
          "saturate": "number",
          "hueRotate": "number",
          "matrix": "textarea"
        }
      }
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
  "type": [
    "saturate",
    "hueRotate",
    "matrix",
    "luminanceToAlpha"
  ]
};

export default attributes;
