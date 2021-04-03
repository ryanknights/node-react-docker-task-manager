import { render } from '@testing-library/react';
import { list as mockList } from '../__fixtures__/lists';
import { Lists, Props } from './Lists';

let props: Props;
let instance: any;

beforeEach(() => {
  props = {
    lists: [mockList],
    getLists: jest.fn(),
  };

  instance = render(<Lists {...props} />);
});

describe('<Lists>', () => {
  it('should render', () => {
    expect(instance).toBeTruthy();
  });
});