import { Preset } from '../../store/types';

const dust: Preset = {
  id: 'dust',
  name: 'Dust',
  primitives: [
    {
      id: 'turbulence',
      params: {
        type: {
          value: 'turbulence',
        },
        baseFrequency: {
          value: '0.8 0.8',
        },
        numOctaves: {
          value: '4',
        },
        seed: {
          value: '4',
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
      id: 'colormatrix',
      params: {
        type: {
          value: 'matrix',
        },
        values: {
          value: '0 0 0 0 0\n0 0 0 0 0\n0 0 0 0 0\n0 0 0 -40 10',
          variants: {
            key: 'type',
            values: {
              matrix: '0 0 0 0 0\n0 0 0 0 0\n0 0 0 0 0\n0 0 0 -40 10',
            },
          },
          disabled: false,
          type: 'textarea',
        },
        in: {
          value: 'turbulence',
        },
        result: {
          value: 'colormatrix',
        },
      },
      groupName: 'colormatrix',
    },
    {
      id: 'composite',
      params: {
        in: {
          value: 'colormatrix',
        },
        in2: {
          value: 'SourceAlpha',
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
        result: {
          value: 'composite',
        },
      },
      groupName: 'composite',
    },
    {
      id: 'turbulence1',
      params: {
        type: {
          value: 'turbulence',
        },
        baseFrequency: {
          value: '0.1 0.1',
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
          value: 'turbulence1',
        },
      },
      groupName: 'turbulence',
    },
    {
      id: 'displacementMap',
      params: {
        in: {
          value: 'composite',
        },
        in2: {
          value: 'turbulence1',
        },
        scale: {
          value: 20,
        },
        xChannelSelector: {
          value: 'R',
        },
        yChannelSelector: {
          value: 'B',
        },
        result: {
          value: 'displacementMap',
        },
      },
      groupName: 'displacementMap',
    },
  ],
};

export default dust;
