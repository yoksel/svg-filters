import { Preset } from '../../store/types';

const coloredStripesVert: Preset = {
  id: 'colored-stripes-vertical',
  name: 'Colored Stripes',
  primitives: [
    {
      id: 'turbulence',
      params: {
        type: {
          value: 'turbulence',
        },
        baseFrequency: {
          value: '0.03 0',
        },
        numOctaves: {
          value: '10',
        },
        seed: {
          value: '3',
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
          value: 'saturate',
        },
        values: {
          value: '20',
          variants: {
            key: 'type',
          },
        },
        in: {
          value: 'morphology1',
        },
        result: {
          value: 'colormatrix',
        },
      },
      groupName: 'colormatrix',
    },
    {
      id: 'flood',
      params: {
        floodColor: {
          value: '#ffeb00',
        },
        floodOpacity: {
          value: '1',
        },
        result: {
          value: 'flood',
        },
      },
      groupName: 'flood',
    },
    {
      id: 'composite',
      params: {
        in: {
          value: 'flood',
        },
        in2: {
          value: 'SourceGraphic',
        },
        operator: {
          value: 'in',
        },
        result: {
          value: 'composite',
        },
      },
      groupName: 'composite',
    },
    {
      id: 'composite1',
      params: {
        in: {
          value: 'colormatrix',
        },
        in2: {
          value: 'SourceGraphic',
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
              value: 'composite',
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
              value: 'composite1',
            },
            result: {
              value: 'mergeNode1',
            },
          },
        },
        {
          id: 'mergeNode2',
          groupName: 'mergeNode',
          params: {
            in: {
              value: 'composite1',
            },
            result: {
              value: 'mergeNode2',
            },
          },
        },
        {
          id: 'mergeNode3',
          groupName: 'mergeNode',
          params: {
            in: {
              value: 'composite1',
            },
            result: {
              value: 'mergeNode3',
            },
          },
        },
        {
          id: 'mergeNode4',
          groupName: 'mergeNode',
          params: {
            in: {
              value: 'composite1',
            },
            result: {
              value: 'mergeNode4',
            },
          },
        },
        {
          id: 'mergeNode5',
          groupName: 'mergeNode',
          params: {
            in: {
              value: 'composite1',
            },
            result: {
              value: 'mergeNode5',
            },
          },
        },
        {
          id: 'mergeNode6',
          groupName: 'mergeNode',
          params: {
            in: {
              value: 'composite1',
            },
            result: {
              value: 'mergeNode6',
            },
          },
        },
      ],
    },
  ],
};

export default coloredStripesVert;
