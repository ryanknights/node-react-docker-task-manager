import axios from 'axios';
import { ManageTaskPayload } from '../components/ManageTaskModal';

const BASE_URL = 'http://localhost:8000/tasks';

const ListService = {
  create(listId: string, data: ManageTaskPayload) {
    return axios.post(`${BASE_URL}`, {
      title: data.title,
      description: data.description,
      deadline: data.deadline,
      complete: false,
      listId,
    }).then((response) => response.data);
  },

  update(taskId: string, data: ManageTaskPayload) {
    return axios.put(`${BASE_URL}/${taskId}`, {
      title: data.title,
      description: data.description,
      deadline: data.deadline,
    }).then((response) => response.data);
  },

  complete(taskId: string) {
    return axios.put(`${BASE_URL}/${taskId}/complete`)
      .then((response) => response.data);
  },

  move(listId: string, taskIds: string[]) {
    return axios.put(`${BASE_URL}/move`, {
      listId,
      taskIds: JSON.stringify(taskIds),
    }).then((response) => response.data);
  },

  bulkDelete(taskIds: string[]) {
    return axios.delete(`${BASE_URL}`, {
      data: {
        taskIds: JSON.stringify(taskIds),
      },
    }).then((response) => response.data);
  },
}

export default ListService;