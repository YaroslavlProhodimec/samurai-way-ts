import React, {ChangeEvent, useEffect, useState} from 'react';



type PropsType ={
status:string
    updateStatus:(status:string) => void
}
const ProfileStatusWithHooks:React.FC<PropsType> = (props) =>
{

        let [editMode,setEditMode] = useState(false)
    let [status,setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    },[props.status])
   let deactivateEditMode =()=>{
       setEditMode(
           false
       )
       props.updateStatus(status)
   }
  const activateMode = () => {
      setEditMode(
          true
      )

  }
    const onStatusChange = (e:ChangeEvent<HTMLInputElement>) =>{

        setStatus(e.currentTarget.value)
    }
    return(
    <div>

        { !editMode &&
            <div>
              <b>Status:</b>  <span onDoubleClick={activateMode} >{props.status || 'No Status'}</span>
            </div>}
        {editMode &&
            <div>
                <input onChange={onStatusChange}
                    onBlur={deactivateEditMode}
                       autoFocus={true}
                       />
            </div>}
    </div>)
}

export default ProfileStatusWithHooks;