import { blendMock, blurMock, floodMock, turbulenceMock } from '../mocks';
import swapPrimitives from './swapPrimitives';

describe('swapPrimitives()', () => {
  it('should move elements by indexes: 2 -> 0', () => {
    const stateBefore = [blurMock, turbulenceMock, blendMock, floodMock];

    const positions = {
      from: 2,
      to: 0,
    };

    const stateAfter = [blendMock, blurMock, turbulenceMock, floodMock];

    expect(swapPrimitives(stateBefore, positions)).toEqual(stateAfter);
  });

  it('should move elements by indexes: 0 -> 2', () => {
    const stateBefore = [blurMock, turbulenceMock, blendMock, floodMock];

    const positions = {
      from: 0,
      to: 2,
    };

    const stateAfter = [turbulenceMock, blendMock, blurMock, floodMock];

    expect(swapPrimitives(stateBefore, positions)).toEqual(stateAfter);
  });

  it('should return items if there is nothing to move', () => {
    const stateBefore = [blurMock];

    const positions = {
      from: 2,
      to: 0,
    };

    expect(swapPrimitives(stateBefore, positions)).toEqual(stateBefore);
  });
});
