import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UserType} from "../../types/types";


type PropsPaginator = {

    totalUsersCount:number
    pageSize:number
    currentPage:number
    onPageChanged:(pageNumber:number)=>void
    users:Array<UserType>
    followingInProgress:Array<number>
    follow:(userId:number)=>void
    unfollow:(userId:number)=>void
}
let Users = ({currentPage,totalUsersCount,onPageChanged,pageSize,users,...props}:PropsPaginator) => {

     return <div>

             <Paginator currentPage={currentPage} onPageChange={onPageChanged}
                        totalItemsCount={totalUsersCount} pageSize={pageSize}
             />
         <div>
    {
        users.map((u: any) => <User user={u}
                                    followingInProgress={props.followingInProgress}
                                    key={u.id}
                                    unfollow={props.unfollow}
                                    follow={props.follow}
                                   />)
    }
     </div>
     </div>
}
export default Users;