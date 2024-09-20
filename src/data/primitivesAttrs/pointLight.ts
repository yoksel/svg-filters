import {BasicInputsData, CoordsInputsData, NumberInputData, PrimitiveAttributes} from "../types";

export interface PointLightPrimitiveAttributes extends PrimitiveAttributes<CoordsInputsData> {
  oneOf: string
}

const attributes: PointLightPrimitiveAttributes = {
  "name": "fePointLight",
  "oneOf": "lightSource",
  "inputsData": {
    "x": {
      "type": "number"
    },
    "y" : {
      "type": "number"
    },
    "z" : {
      "type": "number"
    }
  }
};

export default attributes;
