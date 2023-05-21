import {GetItemsType, instance} from "./api";


// const countLength  = (term:string) => (term !== '' ? term : null )
export const userAPI = {
    getUsers(page = 1, pageSize = 10,term='',friend: null | boolean = null) {
        return instance.get<GetItemsType>(`users?page=${page}&count=${pageSize}&term=${term}` +(friend === null ? '' : `&friend=${friend}`),
        )
    },
    follow(userId: number) {
        return instance.post<ResponseType>(`follow/${userId}`,)
    },
    unfollow(userId: number) {

        return instance.delete(`follow/${userId}`,)as Promise<ResponseType>
    }

}