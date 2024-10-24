import { Preset } from '../../store/types';

const paintDrops: Preset = {
  id: 'paintDrops',
  name: 'Paint drops',
  primitives: [
    {
      id: 'turbulence',
      params: {
        type: {
          value: 'turbulence',
        },
        baseFrequency: {
          value: '0.07 0.04',
        },
        numOctaves: {
          value: '1',
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
          value: '1 0 0 0 0\n0 1 0 0 0\n0 0 1 0 0\n0 0 0 25 -4',
          variants: {
            key: 'type',
            values: {
              matrix: '1 0 0 0 0\n0 1 0 0 0\n0 0 1 0 0\n0 0 0 25 -4',
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
      id: 'blur',
      params: {
        stdDeviation: {
          value: '2 7',
        },
        in: {
          value: 'colormatrix',
        },
        edgeMode: {
          value: 'none',
        },
        result: {
          value: 'blur',
        },
      },
      groupName: 'blur',
    },
    {
      id: 'composite',
      params: {
        in: {
          value: 'blur',
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
      id: 'specularLighting',
      params: {
        surfaceScale: {
          value: '25',
        },
        specularConstant: {
          value: '1',
        },
        specularExponent: {
          value: '20',
        },
        kernelUnitLength: {
          value: '3 5',
          disabled: true,
        },
        lightingColor: {
          value: '#ffffff',
        },
        in: {
          value: 'composite',
        },
        result: {
          value: 'specularLighting',
        },
      },
      groupName: 'specularLighting',
      children: [
        {
          id: 'distantLight',
          groupName: 'distantLight',
          params: {
            azimuth: {
              value: '45',
            },
            elevation: {
              value: '150',
            },
          },
          disabled: false,
        },
        {
          id: 'pointLight',
          groupName: 'pointLight',
          disabled: true,
          params: {
            x: {
              value: 200,
            },
            y: {
              value: 150,
            },
            z: {
              value: 200,
            },
          },
        },
        {
          id: 'spotLight',
          groupName: 'spotLight',
          disabled: true,
          params: {
            x: {
              value: 350,
            },
            y: {
              value: 250,
            },
            z: {
              value: 200,
            },
            pointsAtX: {
              value: 0,
            },
            pointsAtY: {
              value: 0,
            },
            pointsAtZ: {
              value: 0,
            },
            specularExponent: {
              value: 1,
            },
            limitingConeAngle: {
              value: 60,
            },
          },
        },
      ],
    },
    {
      id: 'composite1',
      params: {
        in: {
          value: 'specularLighting',
        },
        in2: {
          value: 'colormatrix',
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
          value: 'SourceGraphic',
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
          value: 'composite2',
        },
      },
      groupName: 'composite',
    },
    {
      id: 'flood',
      params: {
        floodColor: {
          value: '#003897',
        },
        floodOpacity: {
          value: 1,
        },
        result: {
          value: 'flood',
        },
      },
      groupName: 'flood',
    },
    {
      id: 'composite3',
      params: {
        in: {
          value: 'flood',
        },
        in2: {
          value: 'colormatrix',
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
          value: 'composite3',
        },
      },
      groupName: 'composite',
    },
    {
      id: 'composite4',
      params: {
        in: {
          value: 'composite3',
        },
        in2: {
          value: 'SourceGraphic',
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
          value: 'composite4',
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
          id: 'mergeNode8',
          groupName: 'mergeNode',
          params: {
            in: {
              value: 'composite4',
            },
          },
        },
        {
          id: 'mergeNode6',
          groupName: 'mergeNode',
          params: {
            in: {
              value: 'composite2',
            },
          },
        },
      ],
    },
  ],
};

export default paintDrops;
