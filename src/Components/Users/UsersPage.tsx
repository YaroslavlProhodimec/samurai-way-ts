import React from 'react'
import {useSelector} from "react-redux";
import {Users} from "./Users";
import {Prealoder} from '../common/Prealoder/Preloader';
import {getIsFetching,} from "../../redux/users-selectoors";


type OwnPropsUserContainerType ={
   pageTitle:string
}
export const UsersPage:React.FC<OwnPropsUserContainerType> =
    (props) => {
    const isFetching  = useSelector(getIsFetching)
    return <>
        <h2>{props.pageTitle}</h2>
        {isFetching ? <Prealoder/> : null}
        <Users/>
    </>
}
