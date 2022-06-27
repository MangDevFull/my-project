import { AccountConstants } from "../constants/account.constant"
import { initStateType } from "../../interfaces/account"
const initState: initStateType = {
  accountInfor: undefined,
  userId: ""
}
const accountReducer = (state: initStateType = initState, action: any) => {
  switch (action.type) {
    case AccountConstants.ADD_INFO_ACCOUNT: {
      return {
        ...state,
        accountInfor: {
          ...action.payload.accountInfor
        },
        userId: action.payload.userId
      }
    }
    default: {
      return { ...state }
    }
  }
}
export default accountReducer