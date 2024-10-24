import {NumberInputData, PrimitiveAttributes, SelectInputData, SelectInputDataWithDouble, TextInputData} from "../types";

interface InputsData {
  x: NumberInputData;
  y: NumberInputData;
  width: NumberInputData;
  height: NumberInputData;
  xlinkHref: TextInputData;
  preserveAspectRatio: SelectInputDataWithDouble;
  crossOrigin: SelectInputData;
}

type Align = "xMinYMin" | "xMinYMid" | "xMinYMax" | "xMidYMin" | "xMidYMid" | "xMidYMax" | "xMaxYMin" | "xMaxYMid" | "xMaxYMax";
type CrossOrigin = | "anonymous" | "use-credentials";
type meetOrSlice ="meet" | "slice";

export interface ImagePrimitiveAttributes extends PrimitiveAttributes<InputsData> {
   align: Align[],
  crossOrigin: CrossOrigin[],
  meetOrSlice: meetOrSlice[]
}

const attributes: ImagePrimitiveAttributes = {
  "name": "feImage",
  "inputsData": {
    "xlinkHref": {
      "type": "text",
      "name": "xlink:href"
    },
    "preserveAspectRatio": {
      "type": "select",
      "double": true,
      "valuesKeys": [
        "align",
        "meetOrSlice"
      ]
    },
    "crossOrigin": {
      "type": "select"
    },
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
    }
  },
  "align": [
    "xMinYMin",
    "xMinYMid",
    "xMinYMax",

    "xMidYMin",
    "xMidYMid",
    "xMidYMax",

    "xMaxYMin",
    "xMaxYMid",
    "xMaxYMax"
  ],
  "crossOrigin": [
    "anonymous",
    "use-credentials"
  ],
  "meetOrSlice": [
    "meet",
    "slice"
  ]
};

export default attributes;
