import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    ChatMessageType,
    sendMessageThunk,
    startMessagesListening,
    stopMessagesListening
} from "../../redux/chat-reducer";
import {AppStateType} from "../../redux/redux-store";



  const ChatPage:React.FC = () => {
    return (
        <div>
<Chat/>
        </div>
    );
};
export const Chat:React.FC = () => {

   const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())

        }
    })



    return <div>
        <Messages />
        <AddMessageFormChat />
    </div>
}
export const Messages:React.FC = () => {
    const messages = useSelector((state:AppStateType) =>state.chat.messages)
    const status = useSelector((state:AppStateType) =>state.chat.status)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
const [autoScrollIsActive,setAutoScrollIsActive] = useState(true)

    console.log(status,'status')
    useEffect(() => {
        if(autoScrollIsActive) {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    },[messages])
const scrollHandler = (e:React.UIEvent<HTMLDivElement, UIEvent>) => {
      const {scrollHeight,scrollTop,clientHeight} = e.currentTarget
      if(Math.abs((scrollHeight - scrollTop) - clientHeight ) < 300 ) {
          !autoScrollIsActive && setAutoScrollIsActive(true)
      } else {
          autoScrollIsActive && setAutoScrollIsActive(false)
      }
}

    return <div style={{height:'400px',overflowY:'auto'}} onScroll={scrollHandler}>
        {messages.map((m)=> <Message key={m.id} message={m}/>)}
          <div ref={messagesAnchorRef}></div>
    </div>
}

export const Message:React.FC<{message:ChatMessageType}> = React.memo(({message}) => {


    return <div>
        <img src={message.photo} alt={'photo'} /> <b>{message.userName}</b>
        <br/>
        {message.message}
        <hr/>
    </div>
})

export const AddMessageFormChat:React.FC = () => {
    const [message,setMessage] = useState('')
const status = useSelector((state:AppStateType) => state.chat.status)
    const dispatch = useDispatch()


    const sendMessage = () => {
        if(!message) {
            return
        }
      dispatch(sendMessageThunk(message))
        setMessage('')
    }

    return <div>
        {status === 'error' ? <div>Some Error occured. Please refresh the page</div> :
      <>
        <div>
        <textarea value={message} onChange={(e) =>setMessage(e.currentTarget.value)} name="" ></textarea></div>
        <div>
        <button disabled={status !== 'ready'}  onClick={sendMessage}>Send</button></div></>
}
    </div>
}
export default ChatPage