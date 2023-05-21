import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {profileAPI} from "../api/profile-api";
import {BaseThunkType, InferActionsTypes} from "./redux-store";


let initialState = {
    posts: [
        {id: 1, message: 'Hi,how are you?', likesCount: 12},
        {id: 2, message: 'My first project?', likesCount: 11},

    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: "",

}

const profileReducer = (state:InitialStateType= initialState, action: ActionsType):InitialStateType => {

    switch (action.type) {
        case 'ADD_POST': {

            let newPost =  {
                id:5,
                message:action.updateNewPostText,
                likesCount:0
            }
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
        case 'SET_USER_PROFILE': {
            return {
                ...state,
                profile: action.profile
            }
        }
        case 'SET_STATUS': {
            return {
                ...state,
                status: action.status
            }
        }
        case 'DELETE_POST':
            return {...state,posts:state.posts.filter(p => p.id!= action.postId)}
        case 'SAVE_PHOTO_SUCCESS': {
            return {...state, profile: {...state.profile, photos:action.photos} as ProfileType}
        }
        default:
            return state;
    }
}


export const actions =  {

    addPostCreator: (updateNewPostText:any) => ({type: 'ADD_POST',updateNewPostText}) as const,

    setUserProfile : (profile: any) => ({type: 'SET_USER_PROFILE', profile})as const,

    setStatus : (status:any) => ({type: 'SET_STATUS', status})as const,

    setPhotoSuccess : (photos:PhotosType) => ({type: 'SAVE_PHOTO_SUCCESS',photos})as const,


    deletePost :(postId:number)=> ({type:'DELETE_POST',postId})as const
}





export let getUserProfile = (userId: number | null):ThunkType => async (dispatch) => {
    profileAPI.getProfile(userId).then((response) => {
        dispatch(actions.setUserProfile(response.data));
    })
}

export let getUserStatus = (userId: number):ThunkType  => async (dispatch:any) => {
    profileAPI.getStatus(userId).then(response => {
        dispatch(actions.setStatus(response.data));
    })
}
export let updateStatus = (status: string):ThunkType => async (dispatch:any) => {
    profileAPI.updateStatus(status).then(response => {
        if(response.data.resultCode === 0) {
            dispatch(actions.setStatus(response.data));
        }
    })
}
export let savePhoto = (file: File):ThunkType => async (dispatch:any) => {
    let response = await  profileAPI.savePhoto(file)
    if(response.data.resultCode === 0) {
        dispatch(actions.setPhotoSuccess(response.data.data.photos));
    }

}
export let saveProfile = (profile: ProfileType):ThunkType => async (dispatch,getState) => {
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

type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>

export default profileReducer