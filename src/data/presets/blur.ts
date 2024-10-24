import { Preset } from '../../store/types';

const blur: Preset = {
  id: 'blur',
  name: 'Blur',
  primitives: [
    {
      id: 'blur',
      groupName: 'blur',
      params: {
        stdDeviation: {
          value: '3 10',
        },
        in: {
          value: 'SourceGraphic',
        },
        result: {
          value: 'blur',
        },
      },
    },
  ],
};

export default blur;
