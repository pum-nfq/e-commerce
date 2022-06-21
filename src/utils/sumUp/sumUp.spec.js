import sumUp from './sumUp';

describe('utils/sumUp', () => {
  it('should return an array of product without duplicated', () => {
    const input = [
      {
        total: 3,
        sizes: {
          id: '1',
          quantity: 10,
        },
      },
      {
        total: 5,
        sizes: {
          id: '1',
          quantity: 10,
        },
      },
    ];

    const output = [
      {
        total: 8,
        sizes: {
          id: '1',
          quantity: 10,
        },
      },
    ];
    expect(sumUp(input)).toEqual(output);
  });
  it('should return an array of product without over the quantity', () => {
    const input = [
      {
        total: 6,
        sizes: {
          id: '1',
          quantity: 10,
        },
      },
      {
        total: 5,
        sizes: {
          id: '1',
          quantity: 10,
        },
      },
    ];

    const output = [
      {
        total: 10,
        sizes: {
          id: '1',
          quantity: 10,
        },
      },
    ];
    expect(sumUp(input)).toEqual(output);
  });
});
