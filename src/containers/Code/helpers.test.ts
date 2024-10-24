import { blurMock, mergeMock } from '../../store/reducers/mocks';
import { getAllPrimitivesCode, getPrimitiveCode } from './helpers';

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
    expect(getAllPrimitivesCode([blurMock, mergeMock])).toEqual(expectedResult);
  });
});
