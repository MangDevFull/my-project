import axios from "axios";
import URL from "./ApiUrl";
let window: any;
const getInstance = () => {
  const instance = axios.create({
    baseURL: URL.baseUrl,
    timeout: 30000,
  });
  instance.interceptors.request.use(
    (config :any) => {
      let token = localStorage.getItem("myProjectToken");
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
    (err:any) => {
      console.log("err: " + err);
      return Promise.reject(err);
    }
  );
  instance.interceptors.response.use(
    (response : any) => {
      if (response.status === 401) {
        //add your code
        window.replace('/login');
      }
      return response;
    },
    (error: any) => {
      console.log(error);
      if (error.response.status === 401 && localStorage.getItem('myProjectToken')) {
        localStorage.removeItem('myProjectToken')
        localStorage.removeItem('myProjectuserId')
        // window.location.reload()
        window.replace('/login');
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

const API: any = {
  instance: getInstance(),
};

API.getMe = (): any => {
  return API.instance.get(`/`);
};

export default API;