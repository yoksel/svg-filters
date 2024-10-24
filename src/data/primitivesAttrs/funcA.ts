import {FuncRGBAPrimitiveAttributes} from "../types";

const attributes: FuncRGBAPrimitiveAttributes = {
  "name": "feFuncA",
  "inputsData": {
    "type": {
      "type": "select",
      "dependencies": [
        {
          "value": "table",
          "enable": ["tableValues"]
        },
        {
          "value": "discrete",
          "enable": ["tableValues"]
        },
        {
          "value": "linear",
          "enable": ["slope", "intercept"]
        },
        {
          "value": "gamma",
          "enable": ["amplitude", "exponent", "offset"]
        }
      ]
    },
    "tableValues": {
      "type": "text"
    },
    "slope": {
      "type": "number",
      "step": 0.1
    },
    "intercept": {
      "type": "number",
      "step": 0.1
    },
    "amplitude": {
      "type": "number",
      "step": 0.1
    },
    "exponent": {
      "type": "number",
      "step": 0.1
    },
    "offset": {
      "type": "number",
      "step": 0.1
    }
  },
  "type": [
    "identity",
    "table",
    "discrete",
    "linear",
    "gamma"
  ]
};

export default attributes;
