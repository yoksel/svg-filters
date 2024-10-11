import { blurMock, mergeMock, turbulenceMock } from '../mocks';
import countItemsInGroups from './countItemsInGroups';

describe('countItemsInGroups()', () => {
  it('returns object with counters', () => {
    const stateBefore = [blurMock, turbulenceMock, mergeMock];
    const stateAfter = {
      blur: 0,
      merge: 0,
      mergeNode: 1,
      turbulence: 0,
    };

    expect(countItemsInGroups(stateBefore)).toEqual(stateAfter);
  });

  it('returns empty object if state is empty', () => {
    expect(countItemsInGroups([])).toEqual({});
  });

  it('returns empty object if state was not provided', () => {
    expect(countItemsInGroups(undefined)).toEqual({});
  });
});
