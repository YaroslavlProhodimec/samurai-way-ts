import Profileinfo from "./Profileinfo/Profileinfo";
import MyPostsContainer from "./MyPost/MyPostsContainer";
import * as React from "react";
import {ProfileType} from "../../types/types";

type PropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}
const Profile:React.FC<PropsType> = (props) => {



    return (
        <div >
            <Profileinfo savePhoto={props.savePhoto} profile={props.profile} status={props.status}
                         updateStatus={props.updateStatus} isOwner={props.isOwner}
                         saveProfile={props.saveProfile}
            />

            <MyPostsContainer   />
        </div>
    );
};
export default Profile;
