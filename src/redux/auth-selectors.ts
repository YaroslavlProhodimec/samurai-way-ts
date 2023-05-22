import {AppStateType} from "./redux-store";

export const selectAuth = (state:AppStateType) => {
    return state.auth
}