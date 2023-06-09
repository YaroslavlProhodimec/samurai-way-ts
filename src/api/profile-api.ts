import {PhotosType, ProfileType} from "../types/types";
import {instance, APIResponseType} from "./api";



type SavePhotoResponseDataType ={
    photos:PhotosType
}
export const profileAPI = {

    getProfile(userId: number | null) {
        return instance.get<ProfileType>(`profile/` + userId)

    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/` + userId)
    },
    updateStatus(status: string) {
        return instance.put<APIResponseType>(`profile/status`, {status: status})
    },
    savePhoto(photoFile: any) {
        const formData = new FormData()
        formData.append("image", photoFile);
        return instance.put<APIResponseType<SavePhotoResponseDataType>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile: ProfileType) {
        return instance.put<APIResponseType>(`profile`, profile)
    }
}