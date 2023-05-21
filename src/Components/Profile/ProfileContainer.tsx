import React from "react";
import Profile from "./Profile";
import {getUserProfile, getUserStatus, savePhoto, saveProfile, updateStatus,} from "../../redux/profile-reducer";
import {connect} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {ProfileType} from "../../types/types";


type MapStateType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    getUserProfile:(userId:number)=>void
    getUserStatus:(userId:number)=>void
    updateStatus:(status:string)=> void
    saveProfile:(profile: ProfileType)=> Promise<any>
    savePhoto:(file: File) => void

}

type PathParamsType =  {
    userId:string
}
type PropsType = DispatchPropsType & MapStateType & RouteComponentProps<PathParamsType>
class ProfileContainer extends React.Component<PropsType> {

    refreshProfile() {
        let userId:number | null = +this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId
        }
        if (!userId) {
             this.props.history.push('/login')
        }
        if(!userId){
            throw new Error('ID should exists in URI params or in state ')
        } else {
            this.props.getUserProfile(userId)
            this.props.getUserStatus(userId)
        }
    }
    componentDidMount() {
this.refreshProfile()
    }
    componentDidUpdate(prevProps:PropsType, prevState: PropsType) {
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





let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
status:state.profilePage.status,
    authorizedUserId:state.auth.userId,
    isAuth:state.auth.isAuth
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile,getUserStatus,updateStatus,savePhoto,saveProfile}),
    withRouter,

)
(ProfileContainer);