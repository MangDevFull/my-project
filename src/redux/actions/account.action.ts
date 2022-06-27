import { AccountConstants } from "../constants/account.constant"
import { initStateType } from "../../interfaces/account"
export const Add_Infor_Account_Action = (payload: initStateType) => {
  return {
    type: AccountConstants.ADD_INFO_ACCOUNT,
    payload
  }
}