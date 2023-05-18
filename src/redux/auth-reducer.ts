import {authAPI, securityAPI} from "../api/api";
import {AxiosResponse} from "axios";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';


let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl:null as string | null // if null, then captchaUrl is not required
}
export type  InitialStateType = typeof initialState
const authReducer = (state:InitialStateType = initialState, action: any):InitialStateType => {

    switch (action.type) {
        case SET_USER_DATA :
        case GET_CAPTCHA_URL_SUCCESS :
            return {
                ...state,
                ...action.payload,

            }


        default :
            return state;
    }
}
type SetAuthUserDataActionPayloadType = {
    userId: null | number
    email:string | null
    login:string | null
    isAuth:boolean
}
type SetAuthUserDataType = {
    type: typeof SET_USER_DATA
    payload:SetAuthUserDataActionPayloadType
}
export const setAuthUserData = (userId: number | null, email: string | null, login: string | null,isAuth:boolean):SetAuthUserDataType =>
    ({type: SET_USER_DATA,
    payload: {userId, email, login,isAuth}
})
type GetCaptchaUrlSuccess = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: {
        captchaUrl:null | string
    }
}
export const getCaptchaUrlSuccess = (captchaUrl:null |string):GetCaptchaUrlSuccess => ({type: GET_CAPTCHA_URL_SUCCESS,payload: {captchaUrl}})
 export const  getUserData = () => async (dispatch:any) => {
   let response =  await authAPI.me()

    if (response.data.resultCode === 0){
        let {id, login, email, } = response.data.data
        dispatch(setAuthUserData(id,  email, login,true))}
}

export const  login = (email:string ,password:string,rememberMe:boolean,captchaUrl:string | null ) => (dispatch:any) => {
    authAPI.login(email,password,rememberMe,captchaUrl)
        .then(response => {
            if (response.data.resultCode === 0){
                dispatch(getUserData())
            }else {
                if(response.data.resultCode === 10){
                    dispatch(getCaptchaUrl())
                }

                let message = response.data.messages.length > 0 ? response.data.messages[0] :"SOME error"
                dispatch(stopSubmit('edit-profile',{_error: message}))
            }
        })}
export const  logout = () => (dispatch:any) => {
    authAPI.logout()
        .then((response: AxiosResponse) => {
            if (response.data.resultCode === 0){
                dispatch(setAuthUserData(null,  null, null,false))
            }
        })}
export const  getCaptchaUrl = () => async (dispatch:any) => {

    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
        }
export default authReducer;