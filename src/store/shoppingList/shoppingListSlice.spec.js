import reducer, {
  addShoppingItem,
  deleteAllItem,
  deleteShoppingItem,
  updateShoppingItem,
} from './shoppingListSlice';

describe('store/shoppingList', () => {
  it('should return initial value', () => {
    expect(reducer(undefined, {})).toEqual({
      list: [],
    });
  });

  it('should return an array with added item', () => {
    const prevState = { list: [] };
    const addedItem = {
      id: 1,
      total: 30,
      size: 36,
      name: 'ABC',
      brand: 'XYZ',
    };
    expect(reducer(prevState, addShoppingItem(addedItem))).toEqual({
      list: [{ ...addedItem }],
    });
  });

  it('should return an array with deleted item', () => {
    const prevState = {
      list: [
        {
          id: 1,
          total: 30,
          size: 36,
          name: 'ABC',
          brand: 'XYZ',
        },
        {
          id: 2,
          total: 10,
          size: 37,
          name: 'ABC2',
          brand: 'XYZ2',
        },
      ],
    };
    expect(reducer(prevState, deleteShoppingItem(1))).toEqual({
      list: [
        {
          id: 1,
          total: 30,
          size: 36,
          name: 'ABC',
          brand: 'XYZ',
        },
      ],
    });
  });

  it('should return an array with updated item in total', () => {
    const prevState = {
      list: [
        {
          id: 1,
          total: 30,
          size: 36,
          name: 'ABC',
          brand: 'XYZ',
        },
        {
          id: 2,
          total: 10,
          size: 37,
          name: 'ABC2',
          brand: 'XYZ2',
        },
      ],
    };
    expect(
      reducer(prevState, updateShoppingItem({ index: 0, value: 10 })),
    ).toEqual({
      list: [
        {
          id: 1,
          total: 10,
          size: 36,
          name: 'ABC',
          brand: 'XYZ',
        },
        {
          id: 2,
          total: 10,
          size: 37,
          name: 'ABC2',
          brand: 'XYZ2',
        },
      ],
    });
  });

  it('should return an empty array', () => {
    const prevState = {
      list: [
        {
          id: 1,
          total: 30,
          size: 36,
          name: 'ABC',
          brand: 'XYZ',
        },
        {
          id: 2,
          total: 10,
          size: 37,
          name: 'ABC2',
          brand: 'XYZ2',
        },
      ],
    };
    expect(reducer(prevState, deleteAllItem())).toEqual({
      list: [],
    });
  });
});
