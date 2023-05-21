import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input,  } from "../Components/common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../utils/validators/validators";
import s from "../Components/common/FormsControls/FormsControls.module.css";
import {connect, useDispatch, useSelector} from "react-redux";
import {login} from "../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../redux/redux-store";

let maxLength50 = maxLengthCreator(50)
type LoginFormOwnProps = {
    captchaUrl:string | null
}


type LoginFormValuesTypeKeys =Extract<keyof LoginFormValuesType, string>


export const LoginForm:React.FC<InjectedFormProps<LoginFormValuesType,LoginFormOwnProps>&LoginFormOwnProps> = ({handleSubmit,error,captchaUrl})=> {



    return (
        <div>

            <form onSubmit={handleSubmit}>
                {createField<LoginFormValuesTypeKeys>(s.text, 'email', 'email', [required, maxLength50], Input)}
                {createField<LoginFormValuesTypeKeys>(s.text, 'Password', "password", [required, maxLength50], Input, {type: 'password'})}
                {createField<LoginFormValuesTypeKeys>(null, undefined, "rememberMe", [ ], Input, {type: 'checkbox'}, 'remember me')}

                {captchaUrl && < img src={captchaUrl}/>}
                {captchaUrl && createField<LoginFormValuesTypeKeys>(null, null, "captcha", [required], Input, {} )}
                <div>
                    <button>Login</button>
                </div>
                {error && <div className={s.error}>
                    {error} </div>}
            </form>
        </div>
    )
}
export const createField =<FormKeysType extends string> (className: any, placeholder: any, name:FormKeysType
    , validate: any, component: any, props = {}, text = '') => (
    <div>
        <Field
            className={className}
            placeholder={placeholder}
            name={name}
            validate={validate}
            component={component}
            {...props}
        /> {text}</div>
)

const LoginReduxForm = reduxForm<LoginFormValuesType,LoginFormOwnProps>({form: 'login'})(LoginForm)


type LoginFormValuesType = {
    captcha:string
    rememberMe:boolean
    password:string
    email:string
}
export const LoginPage:React.FC = (props) => {

    const captchaUrl = useSelector((state:AppStateType) => state.auth.captchaUrl)
    const isAuth = useSelector((state:AppStateType) => state.auth.isAuth)
    const dispatch = useDispatch()
    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe,formData.captcha))
    }
    if (isAuth) {
        return <Redirect to={"/profile"}/>
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}  />
    </div>
}



