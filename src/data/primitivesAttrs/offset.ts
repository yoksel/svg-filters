import {BasicInputsData, NumberInputData, PrimitiveAttributes, SelectInputData} from "../types";

interface InputsData extends BasicInputsData {
  dx: NumberInputData;
  dy: NumberInputData;
  in2?: SelectInputData;
}

export type OffsetPrimitiveAttributes = PrimitiveAttributes<InputsData>;

const attributes: OffsetPrimitiveAttributes = {
  "name": "feOffset",
  "inputsData": {
    "dx": {
      "type": "number"
    },
    "dy": {
      "type": "number"
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
  }
};

export default attributes;
