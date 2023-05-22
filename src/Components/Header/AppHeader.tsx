import React from 'react';
import {Link} from "react-router-dom";
import {Avatar, Button, Col, Layout, Menu, Row} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {Header} from "antd/es/layout/layout";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth} from "../../redux/auth-selectors";
import {logout} from "../../redux/auth-reducer";



export  const AppHeader:React.FC = (props) => {
    const {isAuth,login} = useSelector(selectAuth)
const dispatch = useDispatch()
    const logoutCallback = () => {
        dispatch(logout())
    }
    const {Header} = Layout
    return (
        <Header className='header'>
                <Row>
                    <Col span={18}>
                        <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['2']}>
                            <Menu.Item key='1'><Link to="/developers" >
                                Users
                            </Link></Menu.Item>

                        </Menu>
                    </Col>


                            {isAuth
                              ? <> <Col span={1}>
                                    <Avatar style={{backgroundColor: '#87d068'}} icon={< UserOutlined rev={undefined}/>}/>
            </Col>
                                <Col span={5}>
                              <span style={{color:'white',marginRight:'9px'}}>  {login} </span>    <Button onClick={logoutCallback}>Log out</Button>
                                </Col>
                                </>
                             :
                                <Col span={6}>
                                <Link to={'/login'}>Login</Link>
                                </Col>
                            }

                </Row>
        </Header>
    );
};

