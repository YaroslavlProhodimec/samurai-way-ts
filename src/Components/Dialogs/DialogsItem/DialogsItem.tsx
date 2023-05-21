import {NavLink} from "react-router-dom";
import * as React from "react"
import s from ".././Dialogs.module.css";


type PropsType = {
    id:string
    name:string
}
const DialogsItem:React.FC<PropsType> = ({id,name})  => {
    debugger
    let path = '/dialogs/' + id;
    return     <div className={s.item+ ' '+ s.active}>
        <NavLink to={path} activeClassName={s.activeLink}> {name}
            <div className={s.content}>
                <div className={s.item}>
                    <img
                        src="https://images.all-free-download.com/images/graphicwebp/user_alt_1_sign_icon_silhouette_geometric_rounded_shapes_6923673.webp"
                        alt=""
                    />

                </div>


            </div>
        </NavLink>
    </div>
}


export default DialogsItem;
