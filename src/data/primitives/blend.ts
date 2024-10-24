import { PrimitiveItem } from '../../store/types';

const blend: PrimitiveItem = {
  id: 'blend',
  groupName: 'blend',
  params: {
    mode: {
      value: 'multiply',
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
    in2: {
      value: 'SourceGraphic',
    },
    result: {
      value: 'blend',
    },
  },
};

export default blend;
