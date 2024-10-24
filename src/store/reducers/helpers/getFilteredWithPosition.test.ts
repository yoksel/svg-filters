import { blurMock, mergeMock, turbulenceMock } from '../mocks';
import getFilteredWithPosition from './getFilteredWithPosition';

describe('getFilteredWithPosition()', () => {
  it('returns position and item', () => {
    const list = [blurMock, turbulenceMock, mergeMock];
    const result = { pos: 1, filtered: turbulenceMock };

    expect(getFilteredWithPosition(list, 'turbulence')).toEqual(result);
  });

  it('returns null if item not found', () => {
    const list = [blurMock, turbulenceMock, mergeMock];

    expect(getFilteredWithPosition(list, 'blend')).toEqual({ pos: -1 });
  });
});
