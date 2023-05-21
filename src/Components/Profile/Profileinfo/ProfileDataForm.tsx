import React from "react";
import {createField, } from "../../../Login/LoginPage";
import {Input, Textarea} from "../../common/FormsControls/FormsControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import s from "./Profileinfo.module.css";
import {ProfileType} from "../../../types/types";

type PropsDataFormType = {
    error:string
    profile:ProfileType
    isOwner:boolean
    handleSubmit:()=>void
}
type PropsType = {
    profile:ProfileType
    isOwner:boolean
}
type PropsDataFormTypeKeys = Extract<keyof ProfileType, string>
const DataForm:React.FC<InjectedFormProps<PropsDataFormType,PropsType>&PropsType> = ({error,profile,isOwner,handleSubmit}) => {



    return <form onSubmit={handleSubmit}>
        {error && <div className={s.error}>
            {error} </div>}
        {!isOwner &&
            <div><button >Save</button></div>}

        <div>
            <b>Full name</b> : {createField<PropsDataFormTypeKeys>(null,"FullName","fullName",[],Input )}
        </div>
        <div>
            <b>Looking for a job</b> :  {createField<PropsDataFormTypeKeys>(null,"FullName","lookingForAJob",[],Input, {type:'checkbox'},)}
        </div>

            <div>
                <b>My professional skills</b> :   {createField<PropsDataFormTypeKeys>(null,"My professional skills","lookingForAJobDescription",[],Textarea, )}
            </div>
        <div>
            <b> About me </b>:  {createField(null,"About me","aboutMe",[],Textarea, )}
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map((key:any)=>{
            return  <div key={key} className={s.contact}>
                <b>
                    {key}: {createField(null,key,"contacts." + key,[],Input )}
                </b>

            </div>
        })

        }
        </div>
        <div>

        )


        </div>
    </form>
}
const  ProfileDataForm:any = reduxForm<PropsDataFormType,PropsType>({form:'edit-profile'})(DataForm)
export default ProfileDataForm