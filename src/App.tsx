import React, {useEffect} from 'react';
import './App.css';
import {UserOutlined} from '@ant-design/icons';
import {Breadcrumb, Layout, Menu} from 'antd';
import {BrowserRouter, Link, Redirect, Route, Switch} from "react-router-dom";
import {LoginPage} from "./Login/LoginPage";
import {Provider, useDispatch, useSelector} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import {Prealoder} from "./Components/common/Prealoder/Preloader";
import {withSuspense} from "./hoc/withSuspense";
import store, {AppStateType} from "./redux/redux-store";
import {Content, Footer} from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import SubMenu from "antd/es/menu/SubMenu";
import s from "./Components/Navbar/Navbar.module.css";
import {AppHeader} from "./Components/Header/AppHeader";

const DialogsContainer = React.lazy(() => import("./Components/Dialogs/DialogsContainer"))

const ProfileContainer = React.lazy(() => import("./Components/Profile/ProfileContainer"))

const UsersContainer = React.lazy(() => import("./Components/Users/UsersPage"))

const ChatPageContainer = React.lazy(() => import('./pages/Chat/ChatPage'))



const SuspenseDialogsContainer = withSuspense(DialogsContainer)
const SuspenseProfileContainer = withSuspense(ProfileContainer)
const SuspenseChatPage = withSuspense(ChatPageContainer)
const SuspenseUserContainer = withSuspense(UsersContainer);


export const App: React.FC = () => {
    const   initialized = useSelector((state:AppStateType)=> state.app.initialized)

    useEffect(() => {
        dispatch(initializeApp())
        window.addEventListener("unhandledrejection", catchAllUnhandledErrors )
        return () => {
            window.addEventListener("unhandledrejection", catchAllUnhandledErrors )
        }
    },[])
    const dispatch = useDispatch()
 const    catchAllUnhandledErrors = (promiseRejectionEvent:PromiseRejectionEvent) => {
        alert('some error')
        console.error(promiseRejectionEvent)
    }





        if (!initialized) {
   return <Prealoder/>
        }


        return (
            <Layout>
                <AppHeader />
                <Content style={{padding:'0 50px '}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>Item</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout className='site-layout-background' style={{padding: '24px 0'}}>
                        <Sider className='site-layout-background' width={200}>
                            <Menu mode='inline'
                            defaultSelectedKeys={['1']}
                            // defaultOpenKeys={['sub1']}
                                  style={{height:'100%'}}
                            >

                                <div className={`${s.item} ${s.active}`}>
                                       </div>
                                 <SubMenu key='sub1' icon={<UserOutlined rev={undefined} />} title='My Profile'>
                                     <Menu.Item key='1'><Link to='/profile' >Profile</Link></Menu.Item>
                                     <Menu.Item key='2'> <Link to="/dialogs" >Messages</Link></Menu.Item>


                                 </SubMenu>
                                <SubMenu key='sub2' icon={<UserOutlined rev={undefined} />} title='Developers'>
                                    <Menu.Item key='3'> <Link to="/developers" >
                                        Developers
                                    </Link></Menu.Item>
                                </SubMenu>
                                <SubMenu key='sub3' icon={<UserOutlined rev={undefined} />} title='Chat'>
                                    <Menu.Item key='4'> <Link to="/chat" >
                                        Chat-Users
                                    </Link></Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                         <Content style={{padding : '0 24px',minHeight:280}}>
                             <Switch>
                                                  <Route exact path='/'
                                                    render={ () => <Redirect to={'/profile'} /> } />
                                         <Route path="/dialogs/"
                                                render={() => <SuspenseDialogsContainer/>}/>
                                         <Route path='/profile/:userId?'
                                                render={() => <SuspenseProfileContainer/>}/>
                                         <Route path='/developers'
                                                render={() =>  <SuspenseUserContainer pageTitle={'title'}/>}/>
                                         <Route path='/login'
                                                render={() =>
                                                    <LoginPage/>}/>
                                           <Route path='/chat' render={()=> <SuspenseChatPage/>}/>


                                             <Route path='*'
                                                    render={() => <div>Not found</div>} />
                                         </Switch>
                         </Content>
                    </Layout>
                </Content>
                <Footer style={{textAlign:'center'}}>Created by Yaroslav Leonidovich </Footer>
                    </Layout>

        );

}




const SamuraiJSApp:React.FC = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
}
export default SamuraiJSApp
