import {ResultCodeForCapcthaEnum, ResultCodesEnum} from "../api/api";
import {stopSubmit} from "redux-form";
import {authAPI} from "../api/auth-api";
import {securityAPI} from "../api/security-api";
import {BaseThunkType, InferActionsTypes} from "./redux-store";


let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case 'SET_USER_DATA' :
        case 'GET_CAPTCHA_URL_SUCCESS' :
            return {
                ...state,
                ...action.payload,

            }
        default :
            return state;
    }
}


export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'SET_USER_DATA',
        payload: {userId, email, login, isAuth}
    } as const),
    getCaptchaUrlSuccess: (captchaUrl: null | string) => ({
        type: 'GET_CAPTCHA_URL_SUCCESS',
        payload: {captchaUrl}
    } as const)
}

export const getUserData = (): ThunkType => async (dispatch: any) => {
    let response = await authAPI.me()

    if (response.data.resultCode === ResultCodesEnum.Success) {
        let {id, login, email} = response.data.data
        dispatch(actions.setAuthUserData(id, email, login, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captchaUrl: string | null): ThunkType => async (dispatch: any) => {
    let data = await authAPI.login(email, password, rememberMe, captchaUrl)

    if (data.data.resultCode === ResultCodesEnum.Success) {
        dispatch(getUserData())
    } else {
        if (data.data.resultCode === ResultCodeForCapcthaEnum.CaptchaIsRequired) {
            dispatch(getCaptchaUrl())
        }

        let message = data.data.messages.length > 0 ? data.data.messages[0] : "SOME error"
        dispatch(stopSubmit('edit-profile', {_error: message}))

    }
}
export const logout = (): ThunkType => async (dispatch: any) => {
    let data = await authAPI.logout()
    if (data.data.resultCode === 0) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}
export const getCaptchaUrl = (): ThunkType => async (dispatch: any) => {

    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}
type ActionsTypes = InferActionsTypes<typeof actions>
export type  InitialStateType = typeof initialState
type ThunkType = BaseThunkType<ActionsTypes & ReturnType<typeof stopSubmit>>
