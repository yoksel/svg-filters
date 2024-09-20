import {BasicInputsData, PrimitiveAttributes} from "../types";

interface InputsData {
  in: BasicInputsData['in'];
}

export type MergeNodePrimitiveAttributes = PrimitiveAttributes<InputsData>;

const attributes: MergeNodePrimitiveAttributes =  {
  "name": "feMergeNode",
  "inputsData": {
    "in": {
      "type": "select"
    }
  }
};

export default attributes;
