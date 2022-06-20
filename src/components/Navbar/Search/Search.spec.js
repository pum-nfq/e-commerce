import ReactTestRenderer from 'react-test-renderer';

import Search from './Search';

describe('Navbar/Search', () => {
  it('Should render correctly', () => {
    const renderer = ReactTestRenderer.create(<Search />).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
