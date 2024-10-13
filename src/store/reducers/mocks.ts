import { PrimitiveItem } from '../types';

export const blendMock: PrimitiveItem = {
  id: 'blend',
  groupName: 'blend',
  params: {
    mode: {
      value: 'multiply',
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
      value: 'SourceGraphic',
    },
    in2: {
      value: 'SourceGraphic',
    },
    result: {
      value: 'blend',
    },
  },
};

export const blurMock: PrimitiveItem = {
  id: 'blur',
  groupName: 'blur',
  params: {
    stdDeviation: {
      value: '3 10',
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
      value: 'SourceGraphic',
    },
    edgeMode: {
      value: 'none',
    },
    result: {
      value: 'blur',
    },
  },
};

export const mergeMock: PrimitiveItem = {
  id: 'merge',
  groupName: 'merge',
  params: {
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
    result: {
      value: 'merge',
    },
  },
  children: [
    {
      id: 'mergeNode',
      groupName: 'mergeNode',
      params: {
        in: {
          value: 'SourceGraphic',
        },
      },
    },
    {
      id: 'mergeNode1',
      groupName: 'mergeNode',
      params: {
        in: {
          value: 'SourceGraphic',
        },
      },
    },
  ],
};

export const turbulenceMock: PrimitiveItem = {
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
};

export const floodMock: PrimitiveItem = {
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
};

export const displacementMapMock: PrimitiveItem = {
  id: 'displacementMap',
  params: {
    in: {
      value: 'SourceGraphic',
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
};

export const compositeMock: PrimitiveItem = {
  id: 'composite',
  params: {
    in: {
      value: 'SourceGraphic',
    },
    in2: {
      value: 'SourceAlpha',
    },
    operator: {
      value: 'in',
    },
    result: {
      value: 'composite',
    },
  },
  groupName: 'composite',
};
