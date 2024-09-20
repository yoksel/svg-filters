import {BasicInputsData, NumberInputData, NumberWithDoubleInputData, PrimitiveAttributes, SelectInputData} from "../types";

interface InputsData extends BasicInputsData {
  type: SelectInputData;
  baseFrequency: NumberWithDoubleInputData;
  numOctaves: NumberInputData;
  seed: NumberInputData;
  stitchTiles: SelectInputData;
}

type Type = "turbulence" | "fractalNoise";
type StitchTiles = "stitch" | "noStitch";

export interface TurbulencePrimitiveAttributes extends PrimitiveAttributes<InputsData> {
  type: Type[], stitchTiles: StitchTiles[]
}

const attributes: TurbulencePrimitiveAttributes = {
  "name": "feTurbulence",
  "type": [
    "turbulence",
    "fractalNoise"
  ],
  "stitchTiles": [
    "stitch",
    "noStitch"
  ],
  "inputsData": {
    "type": {
      "type": "select"
    },
    "baseFrequency": {
      "min": 0,
      "step": 0.001,
      "type": "number",
      "double": true
    },
    "numOctaves": {
      "min": 1,
      "type": "number"
    },
    "seed": {
      "min": 1,
      "type": "number"
    },
    "stitchTiles": {
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
    }
  }
};

export default attributes;
