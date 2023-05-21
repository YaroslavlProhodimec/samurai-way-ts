import profileReducer, {actions} from "./profile-reducer";
import {PostType, ProfileType} from "../types/types";

it('length of posts should be incremented', () => {
    //1. test data
    let action = actions.addPostCreator('it-kamasutraa')
    let state = {
        posts: [
            {id: 1, message: 'Hi,how are you?', likesCount: 12},
            {id: 2, message: 'My first project?', likesCount: 11},

        ] as Array<PostType>,
        profile: null as ProfileType | null,
        status: "",
        newPostText: ''
    }

    let newState = profileReducer(state,action)


    //3 expectation
    expect(newState.posts.length) .toBe(3)
 })
it('message of new post should be corred', () => {
    //1. test data
    let action = actions.addPostCreator('it-kamasutraa')
    let state = {
        posts: [
            {id: 1, message: 'Hi,how are you?', likesCount: 12},
            {id: 2, message: 'My first project?', likesCount: 11},

        ] as Array<PostType>,
        profile: null as ProfileType | null,
        status: "",
        newPostText: ''
    }

    let newState = profileReducer(state,action)




    expect(newState.posts[2].message) .toBe('it-kamasutraa')
})
it('after deleting length of messages should be decrement', () => {
    //1. test data
    let action = actions.deletePost(1)
    let state = {
        posts: [
            {id: 1, message: 'Hi,how are you?', likesCount: 12},
            {id: 2, message: 'My first project?', likesCount: 11},

        ] as Array<PostType>,
        profile: null as ProfileType | null,
        status: "",
        newPostText: ''
    }
    //2 action
    let newState = profileReducer(state,action)


    //3 expectation

    expect(newState.posts.length) .toBe(1)
})
it('after deleting length of messages should be decrement', () => {
    //1. test data
    let action = actions.deletePost(1000)
    let state = {
        posts: [
            {id: 1, message: 'Hi,how are you?', likesCount: 12},
            {id: 2, message: 'My first project?', likesCount: 11},

        ] as Array<PostType>,
        profile: null as ProfileType | null,
        status: "",
        newPostText: ''
    }
    //2 action
    let newState = profileReducer(state,action)


    //3 expectation

    expect(newState.posts.length) .toBe(1)
})