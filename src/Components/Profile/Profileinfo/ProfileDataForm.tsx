import React from "react";
import {createField, } from "../../../Login/Login";
import {Input, Textarea} from "../../common/FormsControls/FormsControls";
import {reduxForm} from "redux-form";
import s from "./Profileinfo.module.css";

const DataForm = ({error,profile,isOwner,handleSubmit}:any) => {



    return <form onSubmit={handleSubmit}>
        {error && <div className={s.error}>
            {error} </div>}
        {!isOwner &&
            <div><button >Save</button></div>}

        <div>
            <b>Full name</b> : {createField(null,"FullName","fullName",[],Input )}
        </div>
        <div>
            <b>Looking for a job</b> :  {createField(null,"FullName","lookingForAJob",[],Input, {type:'checkbox'},)}
        </div>

            <div>
                <b>My professional skills</b> :   {createField(null,"My professional skills","lookingForAJobDescription",[],Textarea, )}
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
const  ProfileDataForm = reduxForm({form:'edit-profile'})(DataForm)
export default ProfileDataForm