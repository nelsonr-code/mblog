import axios from 'axios';
import logger from '../../infraestructure/logger';


export default (() => {

  axios.interceptors.request.use(config => {
    logger.info('axios_request_config', config.url);
    return config;
  });

  axios.interceptors.response.use(config => {
    return config;
  });

  return {
    get,
    post,
    put,
    delete: _delete
  };

  function get(url, options) {
    return axios.get(url, options || {});
  }

  function post(url, body, options) {
    return axios.post(url, body, options || {});
  }

  function put(url, body, options) {
    return axios.put(url, body, options || {});
  }

  function _delete(url, options) { 
    return axios.delete(url, options || {});
  }
})();