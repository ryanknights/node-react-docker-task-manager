import { render } from '@testing-library/react';
import { list as mockList } from '../__fixtures__/lists';
import { task as mockTask } from '../__fixtures__/tasks';
import { MoveTasksModal, Props } from './MoveTasksModal';

let props: Props;
let instance: any;

beforeEach(() => {
  props = {
    lists: [mockList],
    currentList: mockList,
    taskIds: [mockTask.id],
    onCancel: jest.fn(),
    onSubmit: jest.fn(),
  };

  instance = render(<MoveTasksModal {...props} />);
});

describe('<MoveTasksModal>', () => {
  it('should render', () => {
    expect(instance).toBeTruthy();
  });
});