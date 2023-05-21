import React from 'react';
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import AddPostForm, {AddPostFormValuesType} from "./AddPostForm/AddPostForm";
import {PostType} from "../../../types/types";

export type MapPropsType = {
    posts:Array<PostType>

}
export type DispatchPropsType = {
    addPost: (newPostText:string) => void
}



const  MyPosts:React.FC<MapPropsType & DispatchPropsType > = React.memo((props) => {

    let posts = props.posts

    let postElements =
        [...posts]
            .reverse()
            .map((p: any) => (<Post
                    key={p.id}
                id={p.id}
                message={p.message}
                likesCount={p.likesCount}/>
        ))

    let addNewMessage = (values: AddPostFormValuesType) => {
        props.addPost(values.newPostText)
    }
    return <div>

        <div className={s.content}>
            <div className={s.my}>My Posts</div>
            <div>
                <AddPostForm onSubmit={addNewMessage}/>
            </div>
            <div className={s.new}>New Post</div>

            <div className={s.posts}>
                {postElements}


            </div>
        </div>

    </div>
})

const MyPostsMemorized = React.memo(MyPosts)
export default MyPostsMemorized;
