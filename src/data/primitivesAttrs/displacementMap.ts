import {BasicInputsData, NumberInputData, PrimitiveAttributes, SelectInputData} from "../types";

interface InputsData extends BasicInputsData {
  scale: NumberInputData;
  in2: SelectInputData;
  xChannelSelector: SelectInputData;
  yChannelSelector: SelectInputData;
}

type Channel = "R" | "G" | "B" | "A";

export interface DisplacementMapPrimitiveAttributes extends PrimitiveAttributes<InputsData> {
  xChannelSelector: Channel[];
  yChannelSelector: Channel[];
}

const attributes: DisplacementMapPrimitiveAttributes = {
  "name": "feDisplacementMap",
  "inputsData": {
    "in": {
      "type": "select"
    },
    "in2": {
      "type": "select"
    },
    "scale": {
      "min": 0,
      "type": "number"
    },
    "xChannelSelector": {
      "type": "select"
    },
    "yChannelSelector": {
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
  },
  "xChannelSelector": [
    "R",
    "G",
    "B",
    "A"
  ],
  "yChannelSelector": [
    "R",
    "G",
    "B",
    "A"
  ]
};

export default attributes;
