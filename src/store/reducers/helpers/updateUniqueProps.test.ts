import { blendMock, blurMock, compositeMock, displacementMapMock } from '../mocks';
import { updateUniqueProps, UpdateUniquePropsArgs } from './updateUniqueProps';

describe('updateUniqueProps()', () => {
  it('should set proper IN for newly added primitive', () => {
    const args: UpdateUniquePropsArgs = {
      sectionState: [blendMock],
      primitive: blurMock,
      section: 'playground',
      isDuplication: false,
    };

    const result = {
      ...blurMock,
      params: {
        ...blurMock.params,
        in: {
          value: 'blend',
        },
      },
    };

    expect(updateUniqueProps(args)).toEqual(result);
  });

  it('should set proper ID and result for newly added primitive', () => {
    const args: UpdateUniquePropsArgs = {
      sectionState: [blurMock, blendMock],
      primitive: blurMock,
      section: 'playground',
      isDuplication: false,
    };

    const result = {
      ...blurMock,
      // because we have blur primitive already
      id: 'blur1',
      params: {
        ...blurMock.params,
        in: {
          value: 'blend',
        },
        result: {
          value: 'blur1',
        },
      },
    };

    expect(updateUniqueProps(args)).toEqual(result);
  });

  it('should set proper IN2 and result for newly added primitive', () => {
    const args: UpdateUniquePropsArgs = {
      sectionState: [blurMock, blendMock],
      primitive: displacementMapMock,
      section: 'playground',
      isDuplication: false,
    };

    const result = {
      ...displacementMapMock,
      params: {
        ...displacementMapMock.params,
        in2: {
          value: 'blend',
        },
      },
    };

    expect(updateUniqueProps(args)).toEqual(result);
  });

  it('should set proper IN and IN2 and result for newly added composite primitive', () => {
    const args: UpdateUniquePropsArgs = {
      sectionState: [blurMock, blendMock],
      primitive: compositeMock,
      section: 'playground',
      isDuplication: false,
    };

    const result = {
      ...compositeMock,
      params: {
        ...compositeMock.params,
        in: {
          value: 'blend',
        },
        in2: {
          value: 'SourceAlpha',
        },
      },
    };

    expect(updateUniqueProps(args)).toEqual(result);
  });

  it('should keep ID for primitive in Docs section', () => {
    const args: UpdateUniquePropsArgs = {
      sectionState: [blurMock],
      primitive: blurMock,
      section: 'docs',
      isDuplication: false,
    };

    expect(updateUniqueProps(args)).toEqual(blurMock);
  });
});
