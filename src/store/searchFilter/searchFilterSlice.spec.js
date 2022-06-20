import reducer, { searchChange } from './searchFilterSlice';

describe('store/searchFilter', () => {
  it('should return initial value', () => {
    expect(reducer(undefined, {})).toEqual({
      text: '',
    });
  });

  it('should return a new search text', () => {
    const prevState = {
      text: '',
    };
    expect(reducer(prevState, searchChange('hello world'))).toEqual({
      text: 'hello world',
    });
  });
});
