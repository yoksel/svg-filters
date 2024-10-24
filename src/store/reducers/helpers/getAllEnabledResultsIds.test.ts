import { blurMock, mergeMock, turbulenceMock } from '../mocks';
import getAllEnabledResultsIds from './getAllEnabledResultsIds';

describe('getAllEnabledResultsIds()', () => {
  it('returns set with IDS', () => {
    const stateBefore = [blurMock, { ...turbulenceMock, disabled: true }, mergeMock];
    const stateAfter = new Set(['blur', 'merge']);

    expect(getAllEnabledResultsIds(stateBefore)).toEqual(stateAfter);
  });

  it('returns empty set for empty state', () => {
    const stateAfter = new Set();

    expect(getAllEnabledResultsIds(undefined)).toEqual(stateAfter);
  });

  it('returns empty set for state without items', () => {
    const stateAfter = new Set();

    expect(getAllEnabledResultsIds([])).toEqual(stateAfter);
  });
});
