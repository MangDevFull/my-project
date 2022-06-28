import axios from "axios";
import URL from "./ApiUrl";
let window: any;

const getInstance = () => {
  const instance = axios.create({
    baseURL: URL.baseUrl,
    timeout: 30000,
  });
  function refreshToken() {
    const ref: string = localStorage.getItem('myProjectrefreshToken') || ""
    return instance.post(`${URL.baseUrl}/authen/token`, {
      refreshToken: JSON.parse(ref)
    })
  }
  instance.interceptors.request.use(
    (config: any) => {
      let token = localStorage.getItem("myProjectToken");
      if (!token) {
        return config;
      }
      let header = {
        ...config.headers,
        Authorization: "Bearer " + JSON.parse(token),
      };
      config.headers = header;

      return config;
    },
    (err: any) => {
      console.error("hahahah", err);
      return Promise.reject(err);
    }
  );
  instance.interceptors.response.use(
    (response: any) => {
      if (response.status === 401) {
        //add your code
        window.replace('/login');
      }
      return response;
    },
    (error: any) => {
      if (error.response.status === 401 && localStorage.getItem('myProjectToken')) {
        localStorage.removeItem("myProjectToken")
        localStorage.removeItem("myProjectuserId")
        return refreshToken().then(rs => {
          console.log('get token refreshToken>>', rs)
          if (rs.status === 200) {
            localStorage.removeItem('myProjectrefreshToken')
            const { data } = rs
            const { token, userId, refreshToken } = data.data
            localStorage.setItem("myProjectToken", JSON.stringify(token))
            localStorage.setItem("myProjectuserId", JSON.stringify(userId))
            localStorage.setItem("myProjectrefreshToken", JSON.stringify(refreshToken))
            const config = error.response.config
            let header = {
              ...config.headers,
              Authorization: "Bearer " + JSON.parse(token),
            };
            config.headers = header;
            return axios(config)
          }
        })
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