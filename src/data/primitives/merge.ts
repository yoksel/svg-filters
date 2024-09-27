import { PrimitiveItem } from '../../store/types';

const merge: PrimitiveItem = {
  id: 'merge',
  groupName: 'merge',
  params: {
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
      value: 'merge',
    },
  },
  children: [
    {
      id: 'mergeNode',
      groupName: 'mergeNode',
      params: {
        in: {
          value: 'SourceGraphic',
        },
      },
    },
    {
      id: 'mergeNode1',
      groupName: 'mergeNode',
      params: {
        in: {
          value: 'SourceGraphic',
        },
      },
    },
  ],
};

export default merge;
