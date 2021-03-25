import axios from 'axios';
import qs from 'qs';
import router from '../router/router';

const baseUrl = process.env.VUE_APP_API_URL;

axios.interceptors.request.use(
  config => {
    const key = 'CognitoIdentityServiceProvider';
    const idToken = localStorage.getItem(`${key}.idToken`);

    if (idToken) {
      config.headers['Authorization'] = 'Bearer ' + idToken;
    }
    return config;
  });

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401) {
      router.push({ name: 'login' });
    }
    return error;
  });

export default {
  get(path, params = {}) {
    return axios.get(`${baseUrl}/${path}`, {
      params,
      paramsSerializer: () => {
        return qs.stringify(params, { arrayFormat: 'indices' });
      },
    }).then(res => res.data);
  },
  put(path, body = {}) {
    return axios.put(`${baseUrl}/${path}`, body).then(res => res.data);
  },
  post(path, body = {}, headers = {}) {
    return axios.post(`${baseUrl}/${path}`, body, { headers }).then(res => res.data);
  },
  patch(path, body = {}, headers = {}) {
    return axios.patch(`${baseUrl}/${path}`, body, { headers }).then(res => res.data);
  },
  delete(path, data) {
    return axios.delete(`${baseUrl}/${path}`, { data }).then(res => res.data);
  },
};
