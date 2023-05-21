import React from 'react';
import './App.css';
import 'antd/dist/antd.css'
import Navbar from "./Components/Navbar/Navbar";
import {BrowserRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";
import HeaderContainer from "./Components/Header/HeaderContainer";
import {LoginPage} from "./Login/LoginPage";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import {Prealoder} from "./Components/common/Prealoder/Preloader";
import {withSuspense} from "./hoc/withSuspense";
import store, {AppStateType} from "./redux/redux-store";
import {UsersPage} from "./Components/Users/UsersPage";

const DialogsContainer = React.lazy(() => import("./Components/Dialogs/DialogsContainer"))

// @ts-ignore
const ProfileContainer = React.lazy(() => import("./Components/Profile/ProfileContainer"))


// @ts-ignore
const UsersContainer = React.lazy(() => import("./Components/Users/UsersPage"))

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp:() => void
}

const SuspenseDialogsContainer = withSuspense(DialogsContainer)
const SuspenseProfileContainer = withSuspense(ProfileContainer)
const SuspenseUsersContainer = withSuspense(UsersContainer)
class App extends React.Component<MapPropsType & DispatchPropsType,any> {
    catchAllUnhandledErrors = (promiseRejectionEvent:PromiseRejectionEvent) => {
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

        return (

            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Switch>
                        <Route exact path='/'
                               render={ () => <Redirect to={'/profile'} /> } />
                    <Route path="/dialogs/"
                           render={() => <SuspenseDialogsContainer/>}/>
                    <Route path='/profile/:userId?'
                           render={() => <SuspenseProfileContainer/>}/>
                    <Route path='/users'
                           render={() =>  <UsersPage pageTitle={'title'}/>}/>
                    <Route path='/login'
                           render={() =>
                               <LoginPage/>}/>
                        <Route path='*'
                               render={() => <div>Not found</div>} />
                    </Switch>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})

let AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps,{initializeApp}))(App)

const SamuraiJSApp:React.FC = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}
export default SamuraiJSApp
