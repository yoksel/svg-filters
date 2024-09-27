import { PrimitiveItem } from '../../store/types';

const diffuseLighting: PrimitiveItem = {
  id: 'diffuseLighting',
  groupName: 'diffuseLighting',
  params: {
    surfaceScale: {
      value: 5,
    },
    diffuseConstant: {
      value: 0.75,
    },
    lightingColor: {
      value: '#BBF900',
    },
    x: {
      value: '0%',
    },
    y: {
      value: '0%',
    },
    width: {
      value: '100%',
    },
    height: {
      value: '100%',
    },
    in: {
      value: 'SourceAlpha',
    },
    result: {
      value: 'diffuseLighting',
    },
  },
  children: [
    {
      id: 'distantLight',
      groupName: 'distantLight',
      params: {
        azimuth: {
          value: 3,
        },
        elevation: {
          value: 100,
        },
      },
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
          value: 100,
        },
        pointsAtX: {
          value: 100,
        },
        pointsAtY: {
          value: 100,
        },
        pointsAtZ: {
          value: 100,
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
};

export default diffuseLighting;
