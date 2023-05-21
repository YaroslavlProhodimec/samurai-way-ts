import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import s from './Navbar.module.css';

//

const Navbar:React.FC = () => {
    return (
        < nav className={s.nav}>

             <div className={s.item}>
                 <NavLink to='/profile' activeClassName={s.activeLink}>Profile
            </NavLink>
             </div>
            <div className={`${s.item} ${s.active}`}>
                <NavLink to="/dialogs" activeClassName={s.activeLink}>
                Messages
            </NavLink>
                <div className={`${s.item} ${s.active}`}>
                    <NavLink to="/users" activeClassName={s.activeLink}>
                        Users
                    </NavLink></div>
            </div>
            <div className={s.item}><NavLink to="/news" activeClassName={s.activeLink}>
                News
            </NavLink>
            </div>
            <div className={s.item}><a>Music</a>
            </div>
            <div className={s.item}><a>Settings</a>
            </div>

        </nav>
    );
};
export default Navbar;
