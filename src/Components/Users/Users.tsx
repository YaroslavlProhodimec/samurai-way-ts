import React, {useEffect} from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {FilterType, follow, getUsers, unfollow} from "../../redux/users-reduser";
import {UsersSearchForm} from "./UsersSearchForm";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsersFilter,
    getUsersSel
} from "../../redux/users-selectoors";
import {useHistory} from "react-router-dom";
import * as queryString from "querystring";

type QueryParamsType = {term?:string; page?:string; friend?:string}


export const Users: React.FC = (props) => {
    const users = useSelector(getUsersSel)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)


    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        const search = history.location.search
        const params = new URLSearchParams(search)
        const parsedTerm = params.get('term')
        const parsedPage = params.get('page')
        const parsedFriend = params.get('friend')
        let actualPage = currentPage
        let actualFilter = filter

        if (parsedPage !== null) {
            actualPage = Number(parsedPage)
        }
        if (parsedTerm !== null) {
            actualFilter = { ...actualFilter, term: parsedTerm }
        }
        switch (parsedFriend) {
            case 'null':
                actualFilter = { ...actualFilter, friend: null }
                break
            case 'true':
                actualFilter = { ...actualFilter, friend: true }
                break
            case 'false':
                actualFilter = { ...actualFilter, friend: false }
                break
        }
        dispatch(getUsers(actualPage, pageSize, actualFilter))
    }, [])
    useEffect(() => {
        const query: { term?: string; friend?: string; page?: string } = {}

        if (filter.term) query.term = filter.term
        if (filter.friend !== null) query.friend = String(filter.friend)
      if (currentPage !== 1) query.page = String(currentPage)

        const queryToString = new URLSearchParams(query)

        history.push({
            pathname: '/users',
            search: queryToString.toString(),
        })
    }, [filter, currentPage])




    const onPageChanged = (pageNumber: number) => {
        dispatch(getUsers(pageNumber, pageSize, filter))
    }
    const onFilterChanged = (filter:FilterType) => {
        dispatch(getUsers(1, pageSize, filter))
    }
    const followClick = (userId:number) => {
        dispatch(follow(userId))
    }
    const unfollowClick = (userId:number) => {
        dispatch(unfollow(userId))
    }
    return <div>
        <UsersSearchForm onFilterChanged={onFilterChanged}/>
        <Paginator currentPage={currentPage} onPageChange={onPageChanged}
                   totalItemsCount={totalUsersCount} pageSize={pageSize}
        />
        <div>
            {
                users.map((u: any) => <User user={u}
                                            followingInProgress={followingInProgress}
                                            key={u.id}
                                            unfollow={unfollowClick}
                                            follow={followClick}
                />)
            }
        </div>
    </div>
}


