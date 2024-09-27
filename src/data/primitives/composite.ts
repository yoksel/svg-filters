import { PrimitiveItem } from '../../store/types';

const composite: PrimitiveItem = {
  id: 'composite',
  groupName: 'composite',
  params: {
    in: {
      value: 'SourceGraphic',
    },
    in2: {
      value: 'SourceGraphic',
    },
    operator: {
      value: 'in',
    },
    k1: {
      value: 0,
      disabled: true,
    },
    k2: {
      value: 8,
      disabled: true,
    },
    k3: {
      value: -0.5,
      disabled: true,
    },
    k4: {
      value: -0.5,
      disabled: true,
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
      value: 'composite',
    },
  },
};

export default composite;
