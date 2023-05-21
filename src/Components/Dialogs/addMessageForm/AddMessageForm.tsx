import {Field, InjectedFormProps, reduxForm} from "redux-form";
import s from "../../Profile/MyPost/MyPosts.module.css";
import {Input, Textarea} from "../../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import React from "react";
import {createField} from "../../../Login/LoginPage";
import {NewMessageFormValuesType} from "../Dialogs";
const maxLength50 = maxLengthCreator(50)
type NewMessageFormTypeKeys = Extract<keyof NewMessageFormValuesType, string>
type PropsType = {}
const AddMessageForm:React.FC<InjectedFormProps<NewMessageFormValuesType,PropsType>&PropsType> = (props:any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<NewMessageFormTypeKeys >(s.text, 'Enter your message', 'updateNewPostText', [required, maxLength50],Textarea)}

            </div>
            <button  className={s.button}>Send</button>
        </form>
    )
}
export default  reduxForm<NewMessageFormValuesType,PropsType>({form:"addPost"})(AddMessageForm)