import { loadBooks } from './book.actions';
import { reducer, initialState, State } from './book.reducer';

describe('Book Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });

    it('should set loading to true for loadBooks', () => {
      const action = loadBooks();
      const state: State = { ...initialState, loading: false };

      const result = reducer(state, action);
      expect(result.loading).toBe(true);
    });
  });
});
