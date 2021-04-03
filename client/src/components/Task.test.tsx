import { render } from '@testing-library/react';
import { task as mockTask } from '../__fixtures__/tasks';
import { Task, Props } from './Task';

let props: Props;
let instance: any;

beforeEach(() => {
  props = {
    task: mockTask,
    tasksToAction: [mockTask.id],
    getLists: jest.fn(),
    onMarkToAction: jest.fn(),
  };

  instance = render(<Task {...props} />);
});

describe('<Task>', () => {
  it('should render', () => {
    expect(instance).toBeTruthy();
  });
});