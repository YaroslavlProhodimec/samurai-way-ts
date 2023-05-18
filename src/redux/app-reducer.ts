import {getUserData,} from "./auth-reducer";

const SET_INITIALIZED = 'SET_INITIALIZED';

type InitializedStateType = {
    initialized: boolean

}
let initialState:InitializedStateType = {
    initialized: false,

}
const appReducer = (state = initialState, action: any):InitializedStateType => {

    switch (action.type) {
        case SET_INITIALIZED :
            return {
                ...state,
                initialized: true

            }

        default :
            return state;
    }
}
type SetInitializedType = {
type: typeof SET_INITIALIZED
}
export const setInitialized = ():SetInitializedType => ({
    type:  SET_INITIALIZED,

})
export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getUserData())
    Promise.all([promise])
        .then(() => {
            dispatch(setInitialized())
        })
}
export default appReducer;