import * as fromCounter from './counter.reducer';
import { selectCounterState } from './counter.selectors';

describe('Counter Selectors', () => {
  it('should select the feature state', () => {
    const result = selectCounterState({
      [fromCounter.counterFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
