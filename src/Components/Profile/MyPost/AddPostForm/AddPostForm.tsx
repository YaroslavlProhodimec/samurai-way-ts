import {InjectedFormProps, reduxForm} from "redux-form";
import s from "../MyPosts.module.css";
import {Input} from "../../../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../../../utils/validators/validators";
import React from "react";
import {createField} from "../../../../Login/LoginPage";


type PropsType = {

}
export type AddPostFormValuesType = {
    newPostText:string
}
type AddPostFormValuesTypeKeys =Extract<keyof AddPostFormValuesType, string>
const maxLength10 = maxLengthCreator(10)

export const AddPost:React.FC<InjectedFormProps<AddPostFormValuesType,PropsType>&PropsType>= (props:any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<AddPostFormValuesTypeKeys>(s.text, 'email', 'newPostText', [required], Input)}

            </div>
            <div>
            <button  className={s.button}>Add post</button></div>
        </form>
    )
}

export  default  reduxForm<AddPostFormValuesType,PropsType >({form:"addPost"})(AddPost)