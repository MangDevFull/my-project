import API from "../../contants/API"
import {APIUrls} from "../../enums/apiUrl.enum"
import {payloadSubmitLogin} from "../../interfaces/payloadSubmitLogin"
import {payloadSignup} from "../../interfaces/payloadSignup"
const prefix : string = APIUrls.AUTHEN
API.login = (param:payloadSubmitLogin): any => {
  return API.instance.post(`${prefix}/login`, param);
};
API.signup = (param:payloadSignup): any => {
  return API.instance.post(`${prefix}/register`, param);
};


export default API