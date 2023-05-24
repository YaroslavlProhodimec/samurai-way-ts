import {Action, applyMiddleware, combineReducers, createStore} from "redux"
import profileReducer from "./profile-reducer";
import dialogsReduser from "./dialogs-reduser";
import usersReducer from "./users-reduser";
import {authReducer} from "./auth-reducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk"
import { reducer as formReducer } from 'redux-form'
import appReducer from "./app-reducer";
import chatReducer from "./chat-reducer";

let rootReducer = combineReducers({
    profilePage:profileReducer,
    dialogsPage:dialogsReduser,
    usersPage:usersReducer,
    auth:authReducer,
    form:formReducer,
    app:appReducer,
    chat:chatReducer
});

export type AppStateType = ReturnType<typeof rootReducer>



export  type InferActionsTypes<T> = T extends {[key:string]:(...args:any[])=> infer U } ? U : never


export type BaseThunkType<A extends Action, R= Promise<void>> = ThunkAction<R, AppStateType, unknown,  A>


let store = createStore(rootReducer,applyMiddleware(thunkMiddleware));


// window.store = store
export default store