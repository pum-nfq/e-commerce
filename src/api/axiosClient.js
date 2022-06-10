import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: 'https://62a02da2a9866630f8086b03.mockapi.io/',
  headers: {
    'content-type': 'application/json',
  },
});
