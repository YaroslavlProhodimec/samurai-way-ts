import axios from "axios";
import {UserType} from "../types/types";

export const instance = axios.create({
        withCredentials:true,
        baseURL: `https://social-network.samuraijs.com/api/1.0/`,
        headers:{
            "API-KEY": "a4e56366-fe3d-4e5d-8c7b-0714b5ffdb22"
        },

    }

)

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}
export enum ResultCodeForCapcthaEnum {
    CaptchaIsRequired = 10
}

export type GetItemsType = {
    items:Array<UserType>
    totalCount:number
    error:string | null
}

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}