import {BasicInputsData, PrimitiveAttributes} from "../types";


export type ComponentTransferPrimitiveAttributes = PrimitiveAttributes<BasicInputsData>;

const attributes: ComponentTransferPrimitiveAttributes = {
  "name": "feComponentTransfer",
  "noChangesForChildren": true,
  "inputsData": {
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
    }
  }
};

export default attributes;
