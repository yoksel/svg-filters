import { Preset } from '../../store/types';

const smoke: Preset = {
  id: 'smoke',
  name: 'Smoke/cloud',
  primitives: [
    {
      id: 'turbulence',
      params: {
        type: {
          value: 'turbulence',
        },
        baseFrequency: {
          value: '0.013 0.01',
        },
        numOctaves: {
          value: '2',
        },
        seed: {
          value: '1',
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
      id: 'flood',
      params: {
        floodColor: {
          value: '#38252f',
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
      id: 'composite1',
      params: {
        in: {
          value: 'flood',
        },
        in2: {
          value: 'turbulence',
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
      id: 'composite2',
      params: {
        in: {
          value: 'composite1',
        },
        in2: {
          value: 'SourceAlpha',
        },
        operator: {
          value: 'in',
        },
        result: {
          value: 'composite2',
        },
      },
      groupName: 'composite',
    },
  ],
};

export default smoke;
