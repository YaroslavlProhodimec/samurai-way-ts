import s from "./Users.module.css";
import Vladik from "./Vladik.png";
import React from "react";
import {NavLink} from "react-router-dom";
import {UserType} from "../../types/types";


type PropsType = {
    user:UserType
        followingInProgress:Array<number>
        unfollow:(userId:number)=>void
        follow:(userId:number)=>void
}

export const User:React.FC<PropsType> = ({user,followingInProgress,unfollow,follow}) => {

return (
        <div>
            <span>
                <div className={s.flex}>
                <div>
                    <NavLink to={'/profile/' + user.id }>
                    <img src={user.photos.small != null  ? user.photos.small : Vladik} className={s.img}  />
                    </NavLink>
                </div>

                <div>

                   {user.followed
                       ? <button disabled={followingInProgress.some((id:any)=>id === user.id)}
                                 onClick={(e) =>{unfollow(user.id)}}> Unfollow </button>
                       : <button disabled={followingInProgress.some((id:any)=>id === user.id)}
                                 onClick={(e) => {follow(user.id)}}> Follow </button>}
                </div>
                </div>

            </span>
            <span>
                <span>
                <div>{user.name}</div>
                    <div>{user.status}</div>
                </span>
            </span>
            {/*<div>{'u.location.country'}</div>*/}
            {/*<div>{'u.location.city'}</div>*/}


        </div>



     )


}
export default User;