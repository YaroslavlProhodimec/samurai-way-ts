export type PostType = {
    id:number
    message:string
    likesCount:number
}

export type ContactsType = {
    github:string
    vk:string
    facebook:string
    instagram:string
    twitter:string
    youtube:string
    mainLink:string
}
export type PhotosType = {
    small:string |  undefined
    large:string | null | undefined
}
export type ProfileType = {
    userId:number
    lookingForAJob:boolean
    lookingForAJobDescription:string
    fullName:string
    contacts:ContactsType
    photos:PhotosType
    messages?:Array<string>
    aboutMe:string
}
export type UserType = {
    id:number
    name:string
    status:string
    photos:PhotosType
    followed:boolean
}