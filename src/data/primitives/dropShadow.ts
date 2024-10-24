import { PrimitiveItem } from '../../store/types';

const dropShadow: PrimitiveItem = {
  id: 'dropShadow',
  groupName: 'dropShadow',
  params: {
    stdDeviation: {
      value: '5 5',
    },
    in: {
      value: 'SourceGraphic',
    },
    dx: {
      value: '10',
    },
    dy: {
      value: '10',
    },
    floodColor: {
      value: '#1F3646',
    },
    floodOpacity: {
      value: 1,
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
    result: {
      value: 'dropShadow',
    },
  },
};

export default dropShadow;
