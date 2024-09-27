import { Preset } from '../../store/types';

const contour: Preset = {
  id: 'contour',
  name: 'Contour',
  primitives: [
    {
      id: 'morphology',
      params: {
        operator: {
          value: 'dilate',
        },
        radius: {
          value: '2 2',
        },
        in: {
          value: 'SourceAlpha',
        },
        result: {
          value: 'morphology',
        },
      },
      groupName: 'morphology',
    },
    {
      id: 'flood',
      params: {
        floodColor: {
          value: '#476dff',
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
          value: 'morphology',
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
          value: 'composite',
        },
        in2: {
          value: 'SourceAlpha',
        },
        operator: {
          value: 'out',
        },
        result: {
          value: 'composite1',
        },
      },
      groupName: 'composite',
    },
  ],
};

export default contour;
