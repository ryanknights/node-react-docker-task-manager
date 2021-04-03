import { render } from '@testing-library/react';
import { list as mockList } from '../__fixtures__/lists';
import { List, Props } from './List';

let props: Props;
let instance: any;

beforeEach(() => {
  props = {
    lists: [mockList],
    list: mockList,
    getLists: jest.fn(),
  };

  instance = render(<List {...props} />);
});

describe('<List>', () => {
  it('should render', () => {
    expect(instance).toBeTruthy();
  });
});