import API from '../api-service';

const baseUrl = 'content';

export default {
  content() {
    return API.get(`${baseUrl}`);
  },
};
