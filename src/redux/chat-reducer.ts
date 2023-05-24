import {InferActionsTypes} from "./redux-store";
import {chatApi, ChatMessageAPIType, StatusType} from "../api/chat-api";
import {Dispatch} from "redux";
import {v1} from "uuid";

export type ChatMessageType = ChatMessageAPIType & {id:string}

let initialState= {
    messages: [] as ChatMessageType[],
    status : 'pending' as StatusType
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

const chatReducer = (state = initialState, action: ActionsType):InitialStateType => {

    switch (action.type) {
        case 'SET_MESSAGES' :
            console.log(action.payload.messages)
            return {

                ...state,
                messages: [...state.messages, ...action.payload.messages.map(m => ({...m,id:v1()}))]
                    .filter((el,index,array)=>index >= array.length - 100 )
            }
            case 'STATUS_CHANGES' :
            return {
                ...state,
                 status:action.payload.status
            }
        default :
            return state;
    }
}
export const actions = {
    setReceived: (messages: ChatMessageAPIType[]) =>  ({type:'SET_MESSAGES',payload:{messages}})as const,
    setStatus: (status: StatusType ) =>  ({type:'STATUS_CHANGES',payload:{status}})as const
}

let _newMessageHandler : ((messages:ChatMessageAPIType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch:Dispatch) => {
    if(_newMessageHandler === null ) {
        _newMessageHandler = (messages) => {
            console.log(messages)
            dispatch(actions.setReceived(messages))
        }
    }
    return _newMessageHandler
}
let _statusChangedHandler : ((status:StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch:Dispatch) => {
    if(_statusChangedHandler === null ) {
        _statusChangedHandler = (status) => {
            dispatch(actions.setStatus(status))
        }
    }
    return _statusChangedHandler
}
export const startMessagesListening  = () => async (dispatch: any) => {
    chatApi.start()
     chatApi.subscribe('message-received',newMessageHandlerCreator(dispatch))
     chatApi.subscribe('status-changed',statusChangedHandlerCreator(dispatch))
}
export const stopMessagesListening  = () => async (dispatch: any) => {
     chatApi.unsubscribe('message-received',newMessageHandlerCreator(dispatch))
     chatApi.unsubscribe('status-changed',statusChangedHandlerCreator(dispatch))
    chatApi.stop()
}


export const sendMessageThunk = (message:string) => async () => {
      chatApi.sendMessage(message)
}
export default chatReducer;