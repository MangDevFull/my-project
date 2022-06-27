import { genderEnum } from "../enums/gender.enum"
type AccountInfor = {
  profile: {
    name: string,
    phone: string,
    dateOfBirth: string,
    avatar: string,
    biography: string,
    gender: genderEnum
  },
  email: string,
  type: string,
  authenticate?: {
    isLock: boolean,
    isVerified: boolean,
  },
  username: string,
  createdAt?: string,
  updatedAt?: string,
}
export type initStateType = {
  accountInfor?: AccountInfor,
  userId: string,
}