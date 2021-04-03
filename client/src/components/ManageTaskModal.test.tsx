import { render } from '@testing-library/react';
import { ManageTaskModal, Props } from './ManageTaskModal';

let props: Props;
let instance: any;

beforeEach(() => {
  props = {
    onCancel: jest.fn(),
    onSubmit: jest.fn(),
  };

  instance = render(<ManageTaskModal {...props} />);
});

describe('<ManageTaskModal>', () => {
  it('should render', () => {
    expect(instance).toBeTruthy();
  });
});