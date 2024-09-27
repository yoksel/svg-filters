import { Preset } from '../../store/types';

const coloredFlame: Preset = {
  id: 'colored-flame',
  name: 'Colored flame',
  primitives: [
    {
      id: 'turbulence',
      params: {
        type: {
          value: 'fractalNoise',
        },
        baseFrequency: {
          value: '0.035 0.008',
        },
        numOctaves: {
          value: '1',
        },
        seed: {
          value: '2',
        },
        stitchTiles: {
          value: 'stitch',
        },
        result: {
          value: 'turbulence',
        },
      },
      groupName: 'turbulence',
    },
    {
      id: 'turbulence1',
      params: {
        type: {
          value: 'fractalNoise',
        },
        baseFrequency: {
          value: '0.035 0.012',
        },
        numOctaves: {
          value: '1',
        },
        seed: {
          value: '1',
        },
        stitchTiles: {
          value: 'stitch',
        },
        result: {
          value: 'turbulence1',
        },
      },
      groupName: 'turbulence',
    },
    {
      id: 'merge',
      params: {
        result: {
          value: 'merge',
        },
      },
      groupName: 'merge',
      children: [
        {
          id: 'mergeNode',
          groupName: 'mergeNode',
          params: {
            in: {
              value: 'turbulence1',
            },
            result: {
              value: 'mergeNode',
            },
          },
        },
        {
          id: 'mergeNode1',
          groupName: 'mergeNode',
          params: {
            in: {
              value: 'turbulence',
            },
            result: {
              value: 'mergeNode1',
            },
          },
        },
      ],
    },
    {
      id: 'colormatrix',
      params: {
        type: {
          value: 'saturate',
        },
        values: {
          value: '10',
          variants: {
            key: 'type',
          },
        },
        in: {
          value: 'merge',
        },
        result: {
          value: 'colormatrix',
        },
      },
      groupName: 'colormatrix',
    },
    {
      id: 'colormatrix1',
      params: {
        type: {
          value: 'matrix',
        },
        values: {
          value: '1 0 0 0 0\n0 1 0 0 0\n0 0 1 0 0\n0 0 0 10 0',
          type: 'textarea',
          variants: {
            key: 'type',
          },
        },
        in: {
          value: 'colormatrix',
        },
        result: {
          value: 'colormatrix1',
        },
      },
      groupName: 'colormatrix',
    },
    {
      id: 'displacementMap',
      params: {
        in: {
          value: 'colormatrix1',
        },
        in2: {
          value: 'colormatrix',
        },
        scale: {
          value: '40',
        },
        xChannelSelector: {
          value: 'R',
        },
        yChannelSelector: {
          value: 'G',
        },
        result: {
          value: 'displacementMap',
        },
      },
      groupName: 'displacementMap',
    },
    {
      id: 'composite1',
      params: {
        in: {
          value: 'displacementMap',
        },
        in2: {
          value: 'SourceAlpha',
        },
        operator: {
          value: 'in',
        },
        result: {
          value: 'composite1',
        },
      },
      groupName: 'composite',
    },
  ],
};

export default coloredFlame;
