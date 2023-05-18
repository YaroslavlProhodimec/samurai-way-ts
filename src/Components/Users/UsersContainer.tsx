import React from 'react'
import {connect} from "react-redux";
import {follow, getUsers, setCurrentPages, toggleFollowingProgress, unfollow} from "../../redux/users-reduser";
import Users from "./Users";
import {Prealoder} from '../common/Prealoder/Preloader';
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount, getUsersSuper,

} from "../../redux/users-selectoors";
import {UserType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";

type MapPropsUserContainerType ={
    currentPage:number
    pageSize:number
    isFetching:boolean
    totalUsersCount:number
    users:Array<UserType>
    followingInProgress:Array<number>

}
type MapDispatchPropsType ={
    follow:(userId:number)=>void
    unfollow:(userId:number)=>void
    getUsers:(currentPage:number,pageSize:number)=>void


}
type OwnPropsUserContainerType ={
   pageTitle:string
}


type PropsType = MapPropsUserContainerType &  MapDispatchPropsType & OwnPropsUserContainerType
class UsersContainer extends React.Component<PropsType, any> {
    componentDidMount() {
        let{currentPage,pageSize,} = this.props
        this.props.getUsers(currentPage, pageSize)
    }
    onPageChanged = (pageNumber: number) => {
        const {pageSize} = this.props
        this.props.getUsers(pageNumber, pageSize)

    }

    render() {


        return <>
           <h2>{this.props.pageTitle}</h2>
            {this.props.isFetching ? <Prealoder/> : null}
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}

                followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        users: getUsersSuper(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress:getFollowingInProgress(state)
    }

}
export default compose (connect<MapPropsUserContainerType,MapDispatchPropsType,OwnPropsUserContainerType,AppStateType>(mapStateToProps,{
    follow, unfollow,
    getUsers
}),withAuthRedirect)(UsersContainer)