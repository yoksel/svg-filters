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

  it('should update IN if first one is disabled', () => {
    const blurDisabledMock: PrimitiveItem = {
      ...blurMock,
      disabled: true,
    };
    const turbulenceMockWithIn: PrimitiveItem = {
      ...turbulenceMock,
      params: {
        ...turbulenceMock.params,
        in: {
          value: 'blur',
        },
      },
    };

    const list = [blurDisabledMock, turbulenceMockWithIn, mergeMock];
    const stateBefore = { list, item: turbulenceMockWithIn, index: 1, isChild: false };

    const expectedResult = {
      ...turbulenceMock,
      params: {
        ...turbulenceMock.params,
        in: {
          prevValue: 'blur',
          value: 'SourceGraphic',
        },
      },
    };

    expect(updateInPropInPrimitiveItem(stateBefore)).toEqual(expectedResult);
  });

  it('should update IN if first one is enabled again', () => {
    const turbulenceMockWithIn: PrimitiveItem = {
      ...turbulenceMock,
      params: {
        ...turbulenceMock.params,
        in: {
          value: 'SourceGraphic',
          prevValue: 'blur',
        },
      },
    };

    const mergeMockWithIn: PrimitiveItem = {
      ...mergeMock,
      params: {
        ...mergeMock.params,
        in: {
          value: 'turbulence',
          prevValue: 'blur',
        },
      },
    };

    const list = [blurMock, turbulenceMockWithIn, mergeMockWithIn];
    const stateBefore = { list, item: turbulenceMockWithIn, index: 1, isChild: false };

    const expectedResult = {
      ...turbulenceMock,
      params: {
        ...turbulenceMock.params,
        in: {
          value: 'blur',
        },
      },
    };

    expect(updateInPropInPrimitiveItem(stateBefore)).toEqual(expectedResult);
  });

  it('should keep IN values if they are custom', () => {
    const blurDisabledMock: PrimitiveItem = {
      ...blurMock,
      params: {
        ...blurMock.params,
        in: {
          value: 'SourceGraphic',
        },
      },
    };
    const turbulenceMockWithIn: PrimitiveItem = {
      ...turbulenceMock,
      params: {
        ...turbulenceMock.params,
        in: {
          value: 'blur',
        },
      },
    };
    const mergeMockWithIn: PrimitiveItem = {
      ...mergeMock,
      params: {
        ...mergeMock.params,
        in: {
          value: 'blur',
        },
      },
    };

    const list = [blurDisabledMock, turbulenceMockWithIn, mergeMockWithIn];
    const stateBeforeWithTurbulence = {
      list,
      item: turbulenceMockWithIn,
      index: 1,
      isChild: false,
    };

    const expectedResultTurbulence = {
      ...turbulenceMock,
      params: {
        ...turbulenceMock.params,
        in: {
          value: 'blur',
        },
      },
    };

    expect(updateInPropInPrimitiveItem(stateBeforeWithTurbulence)).toEqual(
      expectedResultTurbulence,
    );

    const stateBeforeWithMerge = { list, item: mergeMockWithIn, index: 2, isChild: false };
    const expectedResultMerge = {
      ...mergeMock,
      params: {
        ...mergeMock.params,
        in: {
          value: 'blur',
        },
      },
    };

    expect(updateInPropInPrimitiveItem(stateBeforeWithMerge)).toEqual(expectedResultMerge);
  });
});
