import axios from "axios";
import URL from "./ApiUrl";
const getInstance = () => {
  const instance = axios.create({
    baseURL: URL.baseUrl,
    timeout: 30000,
  });
  instance.interceptors.request.use(
    (config) => {
      let token = localStorage.getItem("token");
      if (!token) {
        return config;
      }
      let header = {
        ...config.headers,
        Authorization:"Bearer " +JSON.parse(token),
      };
      config.headers = header;

      return config;
    },
    (err) => {
      console.log("err: " + err);
      return Promise.reject(err);
    }
  );
  instance.interceptors.response.use(
    (response) => {
      if (response.status === 401) {
        //add your code
        window.replace('/signin');
      }
      return response;
    },
    (error) => {
      if (error.response.status === 401 && localStorage.getItem('token')) {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        // window.location.reload()
        window.replace('/signin');
      }
      if (error.response && error.response.data) {
        //add your code
        return Promise.reject(error.response.data);
      }
      return Promise.reject(error.message);
    }
  );

  return instance;
};

const API = {
  instance: getInstance(),
};

export default API;