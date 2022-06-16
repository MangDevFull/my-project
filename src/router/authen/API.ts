import API from "../../contants/API"
import {payloadSubmitLogin} from "../../interfaces/payloadSubmitLogin"
import {payloadSignup} from "../../interfaces/payloadSignup"
const prefix : string = "authen"
API.login = (param:payloadSubmitLogin): any => {
  return API.instance.post(`${prefix}/login`, param);
};
API.signup = (param:payloadSignup): any => {
  return API.instance.post(`${prefix}/register`, param);
};


export default API