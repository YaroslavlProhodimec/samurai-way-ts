import Header, {DispatchPropsType, MapPropsType} from "./Header";
import React from 'react';
import {connect} from "react-redux";
import {logout,} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";

class HeaderContainer extends React.Component <MapPropsType & DispatchPropsType> {
    render() {
        return (
            <Header {...this.props}/>
        )
    }
}
const mapStateToProps = (state:AppStateType) =>( {
isAuth: state.auth.isAuth,
    login:state.auth.login,

}as MapPropsType)

export default connect <MapPropsType,DispatchPropsType,{},AppStateType>(
    (mapStateToProps),{logout}) (HeaderContainer)