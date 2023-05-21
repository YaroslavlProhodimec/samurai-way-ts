import s from "./Dialogs.module.css"
import * as React from "react"
import DialogsItem from "./DialogsItem/DialogsItem";
import Message from "./Message/Message";
import AddMessageForm from "./addMessageForm/AddMessageForm";
import {InitialStateType} from "../../redux/dialogs-reduser";

type  OwnPropsType = {
    dialogsPage:InitialStateType
    sendMessage:(updateNewPostText:string)=>void

}

export type NewMessageFormValuesType = {
    updateNewPostText:string
}

const Dialogs : React.FC<OwnPropsType> =(props)  => {
    debugger
     let state = props.dialogsPage

   let dialogsElement = state.dialogs.map((dialog: any) => <DialogsItem  id={dialog.id} name={dialog.name}  />)
    let messagesElement = state.messages.map((m: any) => <Message message={m.message}  />)
let updateNewPostText = props.dialogsPage
        let addNewMessage = (values: NewMessageFormValuesType) => {
        props.sendMessage(values.updateNewPostText)
        }

    return (
        <div className={s.wrapper}>

            <div className={s.items}>

                <div className={s.item}>
                    {dialogsElement}
                </div>


            </div>
            <div className={s.flex}>
                <AddMessageForm onSubmit={addNewMessage}/>
            </div>
            <div className={s.message}>
                {messagesElement}
            </div>




        </div>
    );
};


export default Dialogs;
