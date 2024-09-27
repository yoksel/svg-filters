import { PrimitiveItem } from '../../store/types';

const colormatrix: PrimitiveItem = {
  id: 'colormatrix',
  groupName: 'colormatrix',
  params: {
    type: {
      value: 'saturate',
    },
    values: {
      value: 5,
      variants: {
        key: 'type',
      },
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
      value: 'colormatrix',
    },
  },
};

export default colormatrix;
