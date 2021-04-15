import * as fromBook from './book.reducer';
import { selectBooksLoading, selectBookState } from './book.selectors';

describe('Book Selectors', () => {
  it('should select the feature state', () => {
    const result = selectBookState({
      [fromBook.bookFeatureKey]: {}
    });

    expect(result).toEqual({});
  });

  it('should select the loading flag', () => {
    const state = {
      [fromBook.bookFeatureKey]: { loading: true }
    };

    const result = selectBooksLoading(state);
    expect(result).toBe(true);
  })
});
