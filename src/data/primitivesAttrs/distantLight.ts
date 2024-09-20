import {NumberInputData, PrimitiveAttributes} from "../types";

interface InputsData {
  azimuth: NumberInputData;
  elevation: NumberInputData;
}

export interface DistantLightPrimitiveAttributes extends PrimitiveAttributes<InputsData> {
  oneOf: string
}

const attributes: DistantLightPrimitiveAttributes = {
  "name": "feDistantLight",
  "oneOf": "lightSource",
  "inputsData": {
    "azimuth": {
      "type": "number"
    },
    "elevation" : {
      "type": "number"
    }
  }
};

export default attributes;
