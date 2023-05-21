export type FieldValidatorType = (value:string) => string | undefined

export const required:FieldValidatorType = (value)  => {
    if (value)    return undefined

    return 'Field is required'
}
export const maxLengthCreator = (maxLength:number):FieldValidatorType=> (value) => {
    if (value && value.length > maxLength )    return `Max ${maxLength} is 50 symbols `

    return undefined
}
