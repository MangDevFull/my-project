import API from "../../contants/API"
import { APIUrls } from "../../enums/apiUrl.enum"
import { AddNewCategoryIf } from "../../interfaces/payloadCategory"
const prefix: string = APIUrls.CATEGORY
API.getCategoryListforCustomer = (limit: number,page:number): void => {
  return API.instance.get(`/customer/${prefix}?limit=${limit}&page=${page}`);
};

API.createCategoryForCustomer = (params:AddNewCategoryIf): void => {
  return API.instance.post(`/customer/${prefix}`,params);
};


export default API