import React, {useEffect, useState} from 'react';

const ProfileStatusWithHooks = (props:any) =>
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
    const onStatusChange = (e:any) =>{

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