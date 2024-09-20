import {BasicInputsData, PrimitiveAttributes, SelectInputData, TextInputData} from "../types";

interface InputsData extends BasicInputsData {
  mode: SelectInputData;
  in2: SelectInputData;
}

type Mode =  "normal" | "multiply" | "screen" | "overlay" | "darken" | "lighten" | "color-dodge" | "color-burn" | "hard-light" | "soft-light" | "difference" | "exclusion" | "hue" | "saturation" | "color" | "luminosity";

export interface BlendPrimitiveAttributes extends PrimitiveAttributes<InputsData> {
  mode: Mode[]
}

const attributes: BlendPrimitiveAttributes =  {
  "name": "feBlend",
  "inputsData": {
    "mode": {
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
  "mode": [
    "normal",
    "multiply",
    "screen",
    "overlay",
    "darken",
    "lighten",
    "color-dodge",
    "color-burn",
    "hard-light",
    "soft-light",
    "difference",
    "exclusion",
    "hue",
    "saturation",
    "color",
    "luminosity"
  ]
};

export default attributes;
