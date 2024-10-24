import {NumberInputData, PrimitiveAttributes, SelectInputData} from "../types";

interface InputsData {
  x: NumberInputData;
  y: NumberInputData;
  width: NumberInputData;
  height: NumberInputData;
  in: SelectInputData;
}

export type TilePrimitiveAttributes = PrimitiveAttributes<InputsData>;

const attributes: TilePrimitiveAttributes = {
  "name": "feTile",
  "inputsData": {
    "x":{
      "type": "number"
    },
    "y":{
      "type": "number"
    },
    "width":{
      "type": "number"
    },
    "height":{
      "type": "number"
    },
    "in": {
      "type": "select"
    }
  }
};

export default attributes;
