import React from "react";

import Profile from "./Profile";
import {getUserProfile, getUserStatus, savePhoto, saveProfile, updateStatus,} from "../../redux/profile-reducer";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {compose} from "redux";

class ProfileContainer extends React.Component<any, any> {

    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId
        }
        if (!userId) {
            userId = this.props.history.push('/login')
        }
        this.props.getUserProfile(userId)
        this.props.getUserStatus(userId)
    }
    componentDidMount() {
this.refreshProfile()
    }
    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any) {
        if(this.props.match.params.userId != prevProps.match.params.userId )
        this.refreshProfile()

    }

    render() {

        return (<div>
                <Profile {...this.props}
                    isOwner={!this.props.match.params.userId}
                         profile={this.props.profile}
                         status={this.props.status}
                         updateStatus={this.props.updateStatus}
                         saveProfile={this.props.saveProfile}
                savePhoto={this.props.savePhoto}
                />
            </div>
        )
    };
}





let mapStateToProps = (state: any) => ({
    profile: state.profilePage.profile,
status:state.profilePage.status,
    authorizedUserId:state.auth.userId,
    isAuth:state.auth.isAuth
})

export default compose (
    connect(mapStateToProps, {getUserProfile,getUserStatus,updateStatus,savePhoto,saveProfile}),
    withRouter,

)
(ProfileContainer);