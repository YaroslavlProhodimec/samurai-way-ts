import {InferActionsTypes} from "./redux-store";


type MessageType = {
    id:number
    message:string
}
type DialogType = {
    id:number
    name:string
}
let initialState = {
    messages: [
        {id: 1, message: 'Hi bro'},
        {id: 2, message: 'Yo  ?'},
        {id: 3, message: 'Yo '},
        {id: 4, message: 'Yo '},
        {id: 5, message: 'Hello'},

    ] as Array<MessageType>,

    dialogs: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Andrew'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Sasha'},
        {id: 5, name: 'Viktor'},
        {id: 6, name: 'Valera'}
    ] as Array<DialogType>,
}
export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>



const dialogsReduser = (state:InitialStateType = initialState, action: ActionsType):InitialStateType => {


    switch (action.type)  {


    case 'SEND_MASSAGE':
        let body = action.updateNewPostText;
      return {
            ...state,

            messages: [...state.messages, {id: 6, message: body}]
        }
        default:
    return state;
}
}
export const actions = {
    sendMessage : (updateNewPostText:string ) => ({type: 'SEND_MASSAGE',updateNewPostText}as const)

}

export default dialogsReduser