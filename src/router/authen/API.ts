import API from "../../contants/API"
import {payloadSubmitLogin} from "../../interfaces/payloadSubmitLogin"
const prefix : string = "authen"
API.login = (param:payloadSubmitLogin): any => {
  return API.instance.post(`${prefix}/login`, param);
};


export default API