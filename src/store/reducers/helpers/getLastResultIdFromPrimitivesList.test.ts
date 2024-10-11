import { blurMock, mergeMock, turbulenceMock } from '../mocks';
import getLastResultIdFromPrimitivesList from './getLastResultIdFromPrimitivesList';

describe('getLastResultIdFromPrimitivesList()', () => {
  it('returns id of the last enabled item', () => {
    const stateBefore = [blurMock, mergeMock, { ...turbulenceMock, disabled: true }];

    expect(getLastResultIdFromPrimitivesList(stateBefore)).toEqual('merge');
  });

  it('returns empty set for empty state', () => {
    expect(getLastResultIdFromPrimitivesList(undefined)).toEqual('SourceGraphic');
  });

  it('returns empty set for state without items', () => {
    expect(getLastResultIdFromPrimitivesList([])).toEqual('SourceGraphic');
  });
});
