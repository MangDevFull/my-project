import API from "../../contants/API"
import { APIUrls } from "../../enums/apiUrl.enum"
const prefix: string = APIUrls.CATEGORY
API.getCategoryListforCustomer = (limit: number,page:number): void => {
  return API.instance.get(`/customer/${prefix}?limit=${limit}&page=${page}`);
};


export default API