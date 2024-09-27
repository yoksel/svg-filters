import primitivesAttrs from '../../data/primitivesAttrs';
import { PrimitiveItem } from '../../store/types';
import { getAllPrimitivesCode, getPrimitiveCode } from './helpers';

global.structuredClone = (val) => JSON.parse(JSON.stringify(val));

const blurMock: PrimitiveItem = {
  id: 'blur',
  groupName: 'blur' as keyof typeof primitivesAttrs,
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

const mergeMock: PrimitiveItem = {
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

describe('getPrimitiveCode()', () => {
  it('for blur', () => {
    const expectedResult =
      '	<feGaussianBlur stdDeviation="3 10" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" edgeMode="none" result="blur"/>';
    expect(getPrimitiveCode(blurMock)).toEqual(expectedResult);
  });

  it('for merge with children', () => {
    const expectedResult = `\t<feMerge x="0%" y="0%" width="100%" height="100%" result="merge">
\t\t<feMergeNode in="SourceGraphic"/>
\t\t<feMergeNode in="SourceGraphic"/>
\t</feMerge>`;
    console.log(getPrimitiveCode(mergeMock));
    expect(getPrimitiveCode(mergeMock)).toEqual(expectedResult);
  });
});

describe('getAllPrimitivesCode()', () => {
  it('for merge with children', () => {
    const expectedResult = [
      '	<feGaussianBlur stdDeviation="3 10" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" edgeMode="none" result="blur"/>',
      `	<feMerge x="0%" y="0%" width="100%" height="100%" result="merge">
		<feMergeNode in="SourceGraphic"/>
		<feMergeNode in="SourceGraphic"/>
	</feMerge>`,
    ];
    console.log(getAllPrimitivesCode([blurMock, mergeMock]));
    expect(getAllPrimitivesCode([blurMock, mergeMock])).toEqual(expectedResult);
  });
});
