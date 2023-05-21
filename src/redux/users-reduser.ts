import {updateObjectInArray} from "../utils/objects-helper/objects-helpers";
import {UserType} from "../types/types";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {Dispatch} from "redux";
import {userAPI} from "../api/user-api";


let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>,
    filter:{
        term:'',
        friend: null as null | boolean
    }
}
  const usersReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case 'FOLLOW' :
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            }

        case 'UNFOLLOW' :
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
            }
        case  'SET_USERS' : {

            return {
                ...state, users: action.users
            }
        }
        case 'SET_CURRENT_PAGES': {
            return {...state, currentPage: action.currentPage}
        }
        case 'SET_TOTAL_USER_COUNT': {
            return {...state, totalUsersCount: action.totalUsersCount}
        }
        case 'TOGGLE_IS_FETCHING': {
            return {...state, isFetching: action.isFetching}
        }
        case 'SET_FILTER': {
            return {
                ...state,filter:action.payload
            }
            }

        case 'TOGGLE_IS_FOLLOWING_FETCHING': {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(u => u != action.userId)
            }
        }
        default:
            return state;
    }
}


export  const actions = {
     followSuccess:  (userId: number) => ({type: 'FOLLOW', userId}) as const,

    unfollowSuccess: (userId: number) => ({type: 'UNFOLLOW', userId})as const,

    setUsers: (users: Array<UserType>) => ({type: 'SET_USERS', users})as const,

    setCurrentPages: (currentPage: number) => ({type: 'SET_CURRENT_PAGES', currentPage})as const,
    setFilter: (filter: FilterType) => ({type: 'SET_FILTER',payload: filter})as const,

    setTotalUsersCount: (totalUsersCount: number) => ({type: 'SET_TOTAL_USER_COUNT',totalUsersCount})as const,
    toggleIsFetching: (isFetching: boolean) => ({type: 'TOGGLE_IS_FETCHING', isFetching})as const,

    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({
        type: 'TOGGLE_IS_FOLLOWING_FETCHING',
        isFetching,
        userId
    })as const
}



type DispatchType = Dispatch<ActionsTypes>

export const getUsers = (page: number, pageSize: number, filter:FilterType): ThunkType => {
    return async (dispatch, getState) => {

        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setCurrentPages(page))
        dispatch(actions.setFilter(filter))
        let data = await userAPI.getUsers(page, pageSize,filter.term,filter.friend)
        dispatch(actions.toggleIsFetching(false));
        console.log(data,'USERS')
        dispatch(actions.setUsers(data.data.items));
        dispatch(actions.setTotalUsersCount(data.data.totalCount))

    }

}

const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: (userId:number) => Promise<any>,
                                   actionCreator:(userId:number)=>ActionsTypes)=> {
    dispatch(actions.toggleFollowingProgress(true, userId))
    let response = await apiMethod(userId)

    if (response.data.resultCode == 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleFollowingProgress(false, userId))
}
export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        let apiMethod = userAPI.follow.bind(userId)
        let actionMethod = actions.followSuccess

        await _followUnfollowFlow(dispatch, userId, apiMethod, actionMethod)
    }
}
export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, userAPI.unfollow.bind(userId),actions.unfollowSuccess)
    }
}
type ThunkType = BaseThunkType<ActionsTypes>
export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter
type ActionsTypes = InferActionsTypes<typeof actions>

export default  usersReducer