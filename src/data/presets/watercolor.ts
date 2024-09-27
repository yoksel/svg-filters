import { Preset } from '../../store/types';

const watercolor: Preset = {
  id: 'watercolor',
  colorInterpolationFilters: 'sRGB',
  name: 'Watercolor',
  primitives: [
    {
      id: 'turbulence',
      params: {
        type: {
          value: 'fractalNoise',
        },
        baseFrequency: {
          value: '0.05 0.05',
        },
        numOctaves: {
          value: '5',
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
      id: 'diffuseLighting',
      params: {
        surfaceScale: {
          value: '0.5',
        },
        diffuseConstant: {
          value: '3.2',
        },
        lightingColor: {
          value: '#ffffff',
        },
        in: {
          value: 'turbulence',
        },
        result: {
          value: 'diffuseLighting',
        },
      },
      groupName: 'diffuseLighting',
      children: [
        {
          id: 'distantLight',
          groupName: 'distantLight',
          params: {
            azimuth: {
              value: '150',
            },
            elevation: {
              value: '16',
            },
          },
        },
        {
          id: 'pointLight',
          groupName: 'pointLight',
          disabled: true,
          params: {
            x: {
              value: '123',
            },
            y: {
              value: '20',
            },
            z: {
              value: '50',
            },
          },
        },
        {
          id: 'spotLight',
          groupName: 'spotLight',
          disabled: true,
          params: {
            x: {
              value: '200',
            },
            y: {
              value: '100',
            },
            z: {
              value: '220',
            },
            pointsAtX: {
              value: 0,
            },
            pointsAtY: {
              value: '0',
            },
            pointsAtZ: {
              value: '-200',
            },
            specularExponent: {
              value: 1,
            },
            limitingConeAngle: {
              value: '51',
            },
          },
        },
      ],
    },
    {
      id: 'turbulence1',
      params: {
        type: {
          value: 'fractalNoise',
        },
        baseFrequency: {
          value: '0.011 0.004',
        },
        numOctaves: {
          value: '2',
        },
        seed: {
          value: '3',
        },
        stitchTiles: {
          value: 'noStitch',
        },
        result: {
          value: 'turbulence1',
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
          value: '3',
          variants: {
            key: 'type',
            values: {
              saturate: '3',
            },
          },
        },
        in: {
          value: 'turbulence1',
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
          value: '2 0 0 0 0\n0 1.5 0 0 0\n0 0 2 0 0\n0 0 0 2 0',
          variants: {
            key: 'type',
            values: {
              saturate: '8',
              matrix: '2 0 0 0 0\n0 1.5 0 0 0\n0 0 2 0 0\n0 0 0 2 0',
            },
          },
          type: 'textarea',
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
      id: 'blend',
      params: {
        mode: {
          value: 'multiply',
        },
        in: {
          value: 'diffuseLighting',
        },
        in2: {
          value: 'colormatrix1',
        },
        result: {
          value: 'blend',
        },
      },
      groupName: 'blend',
    },
    {
      id: 'composite1',
      params: {
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
        in: {
          value: 'blend',
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

export default watercolor;
