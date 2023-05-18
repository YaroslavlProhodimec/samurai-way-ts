import {profileAPI, userAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";

const ADD_POST = 'ADD_POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS'
const  SAVE_PHOTO_SUCCESS = ' SAVE_PHOTO_SUCCESS'
const DELETE_POST = 'DELETE_POST'

let initialState = {
    posts: [
        {id: 1, message: 'Hi,how are you?', likesCount: 12},
        {id: 2, message: 'My first project?', likesCount: 11},

    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: "",
    newPostText: ''
}
type InitialStateType = typeof initialState
const profileReducer = (state:InitialStateType= initialState, action: any):InitialStateType => {

    switch (action.type) {
        case ADD_POST: {
            let newPost =  action.updateNewPostText
            return {
                ...state,
                posts: [...state.posts, newPost],

            }
        }
        // case UPDATE_NEW_POST_TEXT: {
        //     return {
        //         ...state,
        //         newPostsText: action.text
        //     }
        // }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case DELETE_POST:
            return {...state,posts:state.posts.filter(p => p.id!= action.postId)}
        case SAVE_PHOTO_SUCCESS: {
            return {...state, profile: {...state.profile, photos:action.photos} as ProfileType}
        }
        default:
            return state;
    }
}
type AddPostActionCreatorActionType = {
    type: typeof ADD_POST
    updateNewPostText:string
}
export let addPostCreator = (updateNewPostText:any):AddPostActionCreatorActionType => ({type: ADD_POST,updateNewPostText})
type SetUserProfile = {
    type: typeof  SET_USER_PROFILE
    profile:ProfileType
}
let setUserProfile = (profile: any):SetUserProfile => ({type: SET_USER_PROFILE, profile})
type SetStatusType = {
    type: typeof  SET_STATUS
    status:string
}
let setStatus = (status:any):SetStatusType => ({type: SET_STATUS, status})
type SetPhotoSuccessType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos:PhotosType
}
let setPhotoSuccess = (photos:PhotosType):SetPhotoSuccessType => ({type: SAVE_PHOTO_SUCCESS, photos})
type DeletePostType = {
    type: typeof DELETE_POST
    postId: number
}
export const deletePost =(postId:number):DeletePostType=> ({type:DELETE_POST,postId})

export let getUserProfile = (userId: number) => (dispatch:any) => {
    userAPI.getProfile(userId).then((response) => {
        dispatch(setUserProfile(response.data));
    })
}

export let getUserStatus = (userId: number) => (dispatch:any) => {
    profileAPI.getStatus(userId).then(response => {
        dispatch(setStatus(response.data));
    })
}
export let updateStatus = (status: string) => (dispatch:any) => {
    profileAPI.updateStatus(status).then(response => {
        if(response.data.resultCode === 0) {
            dispatch(setStatus(response.data));
        }
    })
}
export let savePhoto = (file: any) => async (dispatch:any) => {
    let response = await  profileAPI.savePhoto(file)
    if(response.data.resultCode === 0) {
        dispatch(setPhotoSuccess(response.data.data.photos));
    }

}
export let saveProfile = (profile: ProfileType) => async (dispatch:any,getState:any) => {
    const userId = getState().auth.userId
    let response = await profileAPI.saveProfile(profile)
    if(response.data.resultCode === 0) {
        dispatch(getUserProfile(userId))
    }
    else{
        dispatch(stopSubmit('edit-profile',{"_error": response.data.messages[0]}))
        return Promise.reject(response.data.messages[0])
    }

}


// export let updateNewPostTextCreator = (text: string) => ({type: 'UPDATE_NEW_POST_TEXT', text: text})




export default profileReducer