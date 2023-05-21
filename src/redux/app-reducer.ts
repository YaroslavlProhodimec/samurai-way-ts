import {getUserData,} from "./auth-reducer";
import {InferActionsTypes} from "./redux-store";


let initialState= {
    initialized: false,

}
export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

const appReducer = (state = initialState, action: ActionsType):InitialStateType => {

    switch (action.type) {
        case 'SET_INITIALIZED' :
            return {
                ...state,
                initialized: true

            }

        default :
            return state;
    }
}
export const actions = {
    setInitialized: () =>  ({type:'SET_INITIALIZED'})as const
}

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getUserData())
    Promise.all([promise])
        .then(() => {
            dispatch(actions. setInitialized())
        })
}
export default appReducer;