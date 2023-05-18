const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';
const SEND_MASSAGE = 'SEND_MESSAGE';
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


const dialogsReduser = (state:InitialStateType = initialState, action: any):InitialStateType => {

switch (action.type)  {


    case SEND_MASSAGE:
        let body = action.updateNewPostText;
      return {
            ...state,

            messages: [...state.messages, {id: 6, message: body}]
        }
        default:
    return state;
}
}
type SendMessageType = {
    type: typeof SEND_MASSAGE
    updateNewPostText : string
}
export let sendMessage = (updateNewPostText:string ):SendMessageType => ({type: SEND_MASSAGE,updateNewPostText})

export default dialogsReduser