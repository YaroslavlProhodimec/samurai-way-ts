import React from 'react';
import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
// import UsersContainer from "./Components/Users/UsersContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";
import Login from "./Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import {Prealoder} from "./Components/common/Prealoder/Preloader";
import {withSuspense} from "./hoc/withSuspense";
// import {News} from "./Components/News/News";

// @ts-ignore
const DialogsContainer = React.lazy(() => import("./Components/Dialogs/DialogsContainer"))
// @ts-ignore
const ProfileContainer = React.lazy(() => import("./Components/Profile/ProfileContainer"))

// @ts-ignore
const UsersContainer = React.lazy(() => import("./Components/Users/UsersContainer"))

class App extends React.Component<any> {
    catchAllUnhandledErrors = (promiseRejectionEvent:any) => {
        alert('some error')
        console.error(promiseRejectionEvent)
    }

    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors )
    }
       componentWillUnmount(){
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors )
}
    render() {
        if (!this.props.initialized) {
   return <Prealoder/>
        }

        // @ts-ignore
        return (

            <div className="app-wrapper">
                <HeaderContainer/>

                <Navbar/>
                <div className="app-wrapper-content">
                    <Switch>
                        <Route exact path='/'
                               render={ () => <Redirect to={'/profile'} /> } />
                    <Route path="/dialogs/"
                           render={withSuspense(DialogsContainer)}/>
                    <Route path='/profile/:userId?'
                           render={withSuspense(ProfileContainer)}/>
                    <Route path='/users'
                           render={() => <UsersContainer pageTitle={'Самурай'} />}/>
                    <Route path='/login'
                           render={() =>
                               <Login/>}/>
                        <Route path='*'
                               render={() => <div>Not found</div>} />
                    </Switch>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state: any) => ({
    initialized: state.app.initialized
})

export default compose(
    withRouter,
    connect(mapStateToProps,{initializeApp}))(App)
