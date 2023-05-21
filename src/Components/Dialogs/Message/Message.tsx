import s from ".././Dialogs.module.css"
import * as React from "react"



type PropsType = {
   message:string
}
const  Message:React.FC<PropsType> = (props) => {
   return <div className={s.message}>{props.message}

   </div>
}

export default Message;

