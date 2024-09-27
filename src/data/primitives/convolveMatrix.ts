import { PrimitiveItem } from '../../store/types';

const convolveMatrix: PrimitiveItem = {
  id: 'convolveMatrix',
  groupName: 'convolveMatrix',
  params: {
    order: {
      value: '3 3',
    },
    kernelMatrix: {
      value: '-3 0 0 \n0 -3 0 \n0 0 4',
    },
    divisor: {
      value: 1,
    },
    bias: {
      value: 1,
    },
    targetX: {
      value: 0,
    },
    targetY: {
      value: 0,
    },
    edgeMode: {
      value: 'duplicate',
    },
    preserveAlpha: {
      value: 'true',
    },
    x: {
      value: '0%',
    },
    y: {
      value: '0%',
    },
    width: {
      value: '100%',
    },
    height: {
      value: '100%',
    },
    in: {
      value: 'SourceGraphic',
    },
    result: {
      value: 'convolveMatrix',
    },
  },
};

export default convolveMatrix;
