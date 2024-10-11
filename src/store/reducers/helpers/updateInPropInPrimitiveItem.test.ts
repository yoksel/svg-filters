import { PrimitiveItem } from '../../types';
import { blendMock, blurMock, mergeMock, turbulenceMock } from '../mocks';
import updateInPropInPrimitiveItem from './updateInPropInPrimitiveItem';

describe('updateInPropInPrimitiveItem()', () => {
  it('should not change IN for the first item on the first level', () => {
    const list = [blurMock, turbulenceMock, mergeMock];
    const stateBefore = { list, item: blurMock, index: 0, isChild: false };

    expect(updateInPropInPrimitiveItem(stateBefore)).toEqual(blurMock);
  });

  it('should not change IN if it equal to SourceGraphic', () => {
    const blendMockWithCustomIn: PrimitiveItem = {
      ...blendMock,
      params: { ...blendMock.params, in: { value: 'SourceGraphic' } },
    };
    const list = [blurMock, blendMockWithCustomIn, turbulenceMock, mergeMock];
    const stateBefore = { list, item: blendMockWithCustomIn, index: 1, isChild: false };

    expect(updateInPropInPrimitiveItem(stateBefore)).toEqual(blendMockWithCustomIn);
  });

  it('should not change IN if it equal to SourceAlpha', () => {
    const blendMockWithCustomIn: PrimitiveItem = {
      ...blendMock,
      params: { ...blendMock.params, in: { value: 'SourceAlpha' } },
    };
    const list = [blurMock, blendMockWithCustomIn, turbulenceMock, mergeMock];
    const stateBefore = { list, item: blendMockWithCustomIn, index: 1, isChild: false };

    expect(updateInPropInPrimitiveItem(stateBefore)).toEqual(blendMockWithCustomIn);
  });

  it('add proper IN prop to given item', () => {
    const list = [blurMock, turbulenceMock, mergeMock];
    const stateBefore = { list, item: turbulenceMock, index: 1, isChild: false };
    const stateAfter = {
      ...turbulenceMock,
      params: {
        ...turbulenceMock.params,
        in: {
          value: 'blur',
        },
      },
    };

    expect(updateInPropInPrimitiveItem(stateBefore)).toEqual(stateAfter);
  });

  it('update IN prop in given item', () => {
    const blendMockWithCustomResult: PrimitiveItem = {
      ...blendMock,
      params: { ...blendMock.params, result: { value: 'new-id' } },
    };
    const turbulenceMockWithIn: PrimitiveItem = {
      ...turbulenceMock,
      params: {
        ...turbulenceMock.params,
        in: {
          value: 'SourceGraphic',
        },
      },
    };
    const list = [blendMockWithCustomResult, turbulenceMockWithIn, mergeMock];
    const stateBefore = { list, item: turbulenceMockWithIn, index: 1, isChild: false };
    const stateAfter = {
      ...turbulenceMockWithIn,
      params: {
        ...turbulenceMockWithIn.params,
        in: {
          prevValue: 'SourceGraphic',
          value: 'new-id',
        },
      },
    };

    expect(updateInPropInPrimitiveItem(stateBefore)).toEqual(stateAfter);
  });
});
