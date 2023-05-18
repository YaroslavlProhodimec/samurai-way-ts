import {applyMiddleware, combineReducers, createStore} from "redux"
import profileReducer from "./profile-reducer";
import dialogsReduser from "./dialogs-reduser";
import usersReducer from "./users-reduser";
import authReducer from "./auth-reducer";
import  thunkMiddleware from "redux-thunk"
import { reducer as formReducer } from 'redux-form'
import appReducer from "./app-reducer";

let rootReducer = combineReducers({
    profilePage:profileReducer,
    dialogsPage:dialogsReduser,
    usersPage:usersReducer,
    auth:authReducer,
    form:formReducer,
    app:appReducer
});
export type AppStateType = ReturnType<typeof rootReducer>

 let store = createStore(rootReducer,applyMiddleware(thunkMiddleware));


// window.store = store
export default store