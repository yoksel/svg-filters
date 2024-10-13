import { blurMock } from '../store/reducers/mocks';
import deepFreeze from './deepFreeze';

describe('deepFreeze()', () => {
  it('should prevent object mutation', () => {
    const stateBefore = blurMock;

    deepFreeze(stateBefore);

    const changeProp = () => {
      try {
        stateBefore.params.in.value = 'darken';
      } catch (err) {
        throw new Error();
      }
    };

    /* eslint-disable-next-line new-cap */
    expect(changeProp).toThrow(Error());
  });
});
