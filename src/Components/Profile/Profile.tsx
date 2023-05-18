import Profileinfo from "./Profileinfo/Profileinfo";
import MyPostsContainer from "./MyPost/MyPostsContainer";
import * as React from "react";


const Profile = (props:any) => {



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
