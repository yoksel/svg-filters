import { PrimitiveItem } from '../../store/types';

const morphology: PrimitiveItem = {
  id: 'morphology',
  groupName: 'morphology',
  params: {
    operator: {
      value: 'erode',
    },
    radius: {
      value: '3 3',
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
      value: 'morphology',
    },
  },
};

export default morphology;
