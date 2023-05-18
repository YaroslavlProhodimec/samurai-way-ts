import {userAPI} from "../api/api";
import {AxiosResponse} from "axios";
import {updateObjectInArray} from "../utils/objects-helper/objects-helpers";
import {PhotosType, UserType} from "../types/types";
import User from "../Components/Users/User";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGES = 'SET_CURRENT_PAGES'
const SET_TOTAL_USER_COUNT = 'SET_TOTAL_USER_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_FETCHING = 'TOGGLE_IS_FOLLOWING_FETCHING'

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching : true,
    followingInProgress:[] as Array<number>
}
type InitialStateType = typeof initialState
const usersReducer = (state:InitialStateType = initialState, action: any):InitialStateType => {

    switch (action.type) {
        case FOLLOW :
            return {
                ...state,

             users: updateObjectInArray(state.users,action.userId,'id',{followed: true})
                }


        //     Смотри ниже рефакторинг через деструктуризацию в папке objects-helpers
        case UNFOLLOW :
            return {
                ...state,
                users: updateObjectInArray(state.users,action.userId,'id',{followed: false})
            }

        case  SET_USERS : {
            return {
                ...state, users: action.users
            }

        }


        case SET_CURRENT_PAGES: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USER_COUNT: {
            console.log(action.totalUsersCount)
            return {...state, totalUsersCount: action.totalUsersCount}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }

        case TOGGLE_IS_FOLLOWING_FETCHING: {
            return {...state,
                followingInProgress: action.isFetching
                   ? [...state.followingInProgress, action.userId ]
                : state.followingInProgress.filter(u=>u != action.userId)

            }
        }
default:
return state;
}
}
type FollowSuccessType = {
    type:typeof FOLLOW
    userId:number
}
export const followSuccess = (userId: number):FollowSuccessType => ({type: FOLLOW, userId})
type UnFollowSuccessType = {
    type:typeof UNFOLLOW
    userId:number
}
export const unfollowSuccess = (userId: number):UnFollowSuccessType => ({type: UNFOLLOW, userId})
type SetUsersType = {
    type:typeof SET_USERS
    users:UserType[]
}
    export const setUsers = (users: Array<UserType>):SetUsersType => ({type: SET_USERS, users})
type SetCurrentPages = {
    type:typeof SET_CURRENT_PAGES
    currentPage:number
}
export const setCurrentPages= (currentPage: number):SetCurrentPages => ({type: SET_CURRENT_PAGES, currentPage})
type SetTotalUsersCount = {
    type:typeof SET_TOTAL_USER_COUNT
    totalUsersCount:number
}
export const setTotalUsersCount=(totalUsersCount:number):SetTotalUsersCount => ({type: SET_TOTAL_USER_COUNT, totalUsersCount})
type ToggleIsFetching = {
    type:typeof TOGGLE_IS_FETCHING
    isFetching:boolean
}

export const toggleIsFetching = (isFetching:boolean):ToggleIsFetching => ({type: TOGGLE_IS_FETCHING, isFetching})
type ToggleFollowingProgress = {
    type:typeof TOGGLE_IS_FOLLOWING_FETCHING
    isFetching:boolean
    userId:number
}
export const toggleFollowingProgress = (isFetching:boolean,userId:number):ToggleFollowingProgress => ({type: TOGGLE_IS_FOLLOWING_FETCHING, isFetching,userId})


export const getUsers = (page:number,pageSize:number) => {
    return async (dispatch: any) => {

            dispatch(toggleIsFetching(true));
        dispatch(setCurrentPages(page))
          let data = await userAPI.getUsers(page, pageSize)
        console.log(data)
                dispatch(toggleIsFetching(false));
                dispatch(setUsers(data.data.items));
        console.log(data.data.totalCount)
                dispatch(setTotalUsersCount(data.data.totalCount))

        }

}

// Ниже делаем рефакторинг смотри внимательнее
// Немножко разные вариации
const followUnfollowFlow = async (dispatch:any,userId:number,apiMethod:any,actionMethod:any) => {
    dispatch(toggleFollowingProgress(true,userId))
    let response = await apiMethod(userId)

    if (response.data.resultCode == 0) {
        dispatch(actionMethod(userId))
    }
    dispatch(toggleFollowingProgress(false,userId))
}
export const follow = (userId:number) => {
    debugger
    return async (dispatch: any) => {
        let apiMethod = userAPI.follow.bind(userId)
        let actionMethod = followSuccess

        await followUnfollowFlow(dispatch, userId, apiMethod, actionMethod)

    }}
export const unfollow = (userId:number) => {
    debugger

    return async (dispatch: any) => {

        await followUnfollowFlow(dispatch, userId, userAPI.unfollow.bind(userId), unfollowSuccess)
}}

export default usersReducer;