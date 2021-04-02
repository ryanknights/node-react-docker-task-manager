import axios from 'axios';

const BASE_URL = 'http://localhost:8000/lists';

const ListService = {
  getAll () {
    return axios.get(`${BASE_URL}`)
      .then((response) => response.data);
  },

  create (name: string) {
    return axios.post(`${BASE_URL}`, {
      name,
    }).then((response) => response.data);
  },

  delete (listId: string) {
    return axios.delete(`${BASE_URL}/${listId}`)
      .then((response) => response.data);
  },
}

export default ListService;