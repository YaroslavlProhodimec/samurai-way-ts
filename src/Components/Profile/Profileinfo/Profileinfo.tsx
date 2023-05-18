import React, {useState} from 'react';
import {Prealoder} from "../../common/Prealoder/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import {ImageProfile} from "./ProfileImage";
import {Hover} from "../../../utils/Hover/Hover"
import s from './Profileinfo.module.css'
import ProfileDataForm from "./ProfileDataForm";
import {reduxForm} from "redux-form";


const Profileinfo = ({profile, status, updateStatus,isOwner,savePhoto,saveProfile,}:any) => {
    let [editMode,setEditMode] = useState(false)

    if (!profile) {
        return <div><Prealoder/></div>
    }
    const mainPhotoSelected = (e: any) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }
const onSubmit =  (formData:any) => {
    let promise =  saveProfile(formData)
    promise.then(
          () =>{    setEditMode(false)
          }
      )
    }


        return (
            <>
                <div><Hover/></div>
                <div>
                    <ImageProfile/>

                        <img src={profile.photos.small}/>
                        {<div>
                            !isOwner &&
                            <input   type={"file"} onChange={mainPhotoSelected}/>

                        </div>

                        }
                    { editMode ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit}/>
                        : <ProfileData goToEditMode={() => {setEditMode(true)} } profile={profile} isOwner={isOwner}/> }


                    {  <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>}
                </div>
            </>)
    }

    const DataProfile= ({profile,isOwner,goToEditMode}:any) => {
    return <div>

        {isOwner && <div><button onClick={goToEditMode}>edit</button></div>}
        <div>
            <b>Full name</b> : {profile.fullName}
        </div>
        <div>
            <b>Looking for a job</b> : {profile.lookingForAJob ? 'yes' : 'no'}
        </div>
        {profile.lookingForAJob &&
            <div>
                <b>My professional skills</b> : {profile.lookingForAJobDescribtion}
            </div>}
        <div>
            <b>
                About me
            </b>: {profile.aboutMe}
        </div>

        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map((key:any)=>{
            return  <div className={s.contact}>
            <b>
                <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}  />
            </b>

            </div>
        })

        }
        </div>
    </div>
    }
const  ProfileData = reduxForm({form:'edit-profile'})(DataProfile)

//     Чуть выше смотри вот вариация с  keys  ключом мы вызываем константу <Contact key={key}
//     contactTitle={key} contactValue={profile.contacts[key]}  />
const Contact = ({contactTitle,contactValue}:any) => {
    return <div className={s.contact}>
        <b>{contactTitle}:</b>{contactValue}
    </div>
}
export default Profileinfo;