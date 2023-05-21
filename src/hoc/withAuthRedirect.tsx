import {Redirect} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";

let mapStateToPropsForRedirect = (state: AppStateType) => {
    return {

        isAuth: state.auth.isAuth
    }
}
type MapPropsType = {
    isAuth:boolean
}
type DispatchPropType = {

}
export function withAuthRedirect <WCP> (WrappedComponent:React.ComponentType<WCP>)  {
    const RedirectComponent:React.FC<MapPropsType & DispatchPropType> = (props) =>{
        let {isAuth,...restProps} = props

    if (props.isAuth )      return   <Redirect to={"/login"} /> ;
        return <WrappedComponent {...restProps as WCP}/>

}

   let  ConnectedAuthRedirectComponent =
       connect<MapPropsType,DispatchPropType,WCP,AppStateType>(mapStateToPropsForRedirect,{})(RedirectComponent)
return ConnectedAuthRedirectComponent
}

