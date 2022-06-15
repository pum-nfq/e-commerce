import { axiosClient } from "./axiosClient";

export const productAPI = {
  getAll() {
    const url = `/sneakers/`;
    return axiosClient.get(url);
  },

  getById(id) {
    const url = `/sneakers/${id}/`;
    return axiosClient.get(url);
  },

  create(data) {
    const url = `/sneakers/`;
    return axiosClient.post(url, data);
  },

  update(data) {
    const url = `/sneakers/${data.id}/`;
    return axiosClient.put(url, data);
  },

  delete(id) {
    const url = `/sneakers/${id}/`;
    return axiosClient.delete(url);
  },
};
