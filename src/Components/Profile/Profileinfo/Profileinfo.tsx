import React, {ChangeEvent, useState} from 'react';
import {Prealoder} from "../../common/Prealoder/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import {ImageProfile} from "./ProfileImage";
import s from './Profileinfo.module.css'
import ProfileDataForm from "./ProfileDataForm";
import {InjectedFormProps, reduxForm} from "redux-form";
import {ContactsType, ProfileType} from "../../../types/types";

type PropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>

}
const Profileinfo: React.FC<PropsType> = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile,}) => {
    let [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <div><Prealoder/></div>
    }
    const mainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files !== null) {
            if (e.target.files.length) {
                savePhoto(e.target.files[0])
            }
        } else {
            alert('Error,files null')
        }
    }
    const onSubmit = (formData: any) => {

        saveProfile(formData).then(
            () => {
                setEditMode(false)
            }
        )
    }


    return (
        <>
            <div>
                <ImageProfile/>

                <img src={profile.photos.small}/>
                {<div>
                    !isOwner &&
                    <input type={"file"} onChange={mainPhotoSelected}/>

                </div>

                }
                {editMode ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit}/>
                    : <ProfileData goToEditMode={() => {
                        setEditMode(true)
                    }} profile={profile} isOwner={isOwner}/>}


                {<ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>}
            </div>
        </>)
}
type ProfileDataType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}
type PropsDataFormTypeKeys = Extract<keyof ProfileDataType, string>
const DataProfile:React.FC<ProfileDataType> =
    ({profile, isOwner, goToEditMode}) => {
    return <div>

        {isOwner && <div>
            <button onClick={goToEditMode}>edit</button>
        </div>}
        <div>
            <b>Full name</b> : {profile.fullName}
        </div>
        <div>
            <b>Looking for a job</b> : {profile.lookingForAJob ? 'yes' : 'no'}
        </div>
        {profile.lookingForAJob &&
            <div>
                <b>My professional skills</b> : {profile.lookingForAJobDescription}
            </div>}
        <div>
            <b>
                About me
            </b>: {profile.aboutMe}
        </div>

        <div>
            <b>Contacts</b>:
            {Object
                .keys(profile.contacts)
                .map((key: any) => {
                    return <div key={key} className={s.contact}>
                        <b>
                            <Contact contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType ] }/>
                        </b>

                    </div>
                })

            }
        </div>
    </div>
}

const ProfileData: any = reduxForm<PropsDataFormTypeKeys,ProfileDataType>({form: 'edit-profile'})(DataProfile)

type ContactsPropsType = {
    contactTitle:string
    contactValue:string
}
const Contact:React.FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
    return <div className={s.contact}>
        <b>{contactTitle}:</b>{contactValue}
    </div>
}
export default Profileinfo;