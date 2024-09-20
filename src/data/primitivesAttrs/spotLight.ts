import {CoordsInputsData, NumberInputData, PrimitiveAttributes} from "../types";

interface InputsData extends CoordsInputsData {
  pointsAtX: NumberInputData;
  pointsAtY: NumberInputData;
  pointsAtZ: NumberInputData;
  specularExponent: NumberInputData;
  limitingConeAngle: NumberInputData;
}

export type SpotLightPrimitiveAttributes = PrimitiveAttributes<InputsData>;

const attributes: PrimitiveAttributes<InputsData>  = {
  "name": "feSpotLight",
  "inputsData": {
    "x": {
      "type": "number"
    },
    "y": {
      "type": "number"
    },
    "z": {
      "type": "number"
    },
    "pointsAtX": {
      "type": "number"
    },
    "pointsAtY": {
      "type": "number"
    },
    "pointsAtZ": {
      "type": "number"
    },
    "specularExponent": {
      "type": "number"
    },
    "limitingConeAngle": {
      "type": "number"
    }
  }
};

export default attributes;
