import { PrimitiveItem } from '../../store/types';

const image: PrimitiveItem = {
  id: 'image',
  groupName: 'image',
  params: {
    xlinkHref: {
      value: 'https://placekitten.com/500/500',
    },
    x: {
      value: 0,
    },
    y: {
      value: 0,
    },
    width: {
      value: 500,
    },
    height: {
      value: 500,
    },
    preserveAspectRatio: {
      value: 'xMidYMid meet',
    },
    crossOrigin: {
      value: 'anonymous',
    },
    result: {
      value: 'image',
    },
  },
};

export default image;
