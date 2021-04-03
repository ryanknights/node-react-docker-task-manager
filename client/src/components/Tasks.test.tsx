import { render } from '@testing-library/react';
import { task as mockTask } from '../__fixtures__/tasks';
import { Tasks, Props } from './Tasks';

let props: Props;
let instance: any;

beforeEach(() => {
  props = {
    tasks: [mockTask],
    tasksToAction: [mockTask.id],
    getLists: jest.fn(),
    onMarkToAction: jest.fn(),
  };

  instance = render(<Tasks {...props } />);
});

describe('<Tasks>', () => {
  it('should render', () => {
    expect(instance).toBeTruthy();
  });
});