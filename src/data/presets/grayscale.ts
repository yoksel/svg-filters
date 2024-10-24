import { Preset } from '../../store/types';

const grayscale: Preset = {
  id: 'grayscale',
  name: 'Grayscale',
  primitives: [
    {
      id: 'colormatrix',
      params: {
        type: {
          value: 'saturate',
        },
        values: {
          value: '0',
          variants: {
            key: 'type',
          },
        },
        in: {
          value: 'SourceGraphic',
        },
        result: {
          value: 'colormatrix',
        },
      },
      groupName: 'colormatrix',
    },
  ],
};

export default grayscale;
