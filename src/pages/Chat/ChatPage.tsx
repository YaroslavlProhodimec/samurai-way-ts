import React, {useEffect, useState} from 'react';

const wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
export type ChatMessageType = {
    message:string
    photo:string
    userId:number
    userName:string
}

  const ChatPage:React.FC = () => {
    return (
        <div>
<Chat/>
        </div>
    );
};
export const Chat:React.FC = () => {
    return <div>
        <Messages/>
        <AddMessageFormChat/>
    </div>
}
export const Messages:React.FC = () => {
    const  [messages,setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        wsChannel.addEventListener('message',(e:MessageEvent) => {
            let newMessaages = JSON.parse(e.data)
            setMessages((prevMessages) => [...prevMessages,...newMessaages])

        })
    },[])


    return <div style={{height:'400px',overflow:'auto'}}>
        {messages.map((m,index)=><Message key={index} message={m}/>)}

    </div>
}

export const Message:React.FC<{message:ChatMessageType}> = ({message}) => {


    return <div>
        <img src={message.photo} /> <b>{message.userName}</b>
        <br/>
        {message.message}
        <hr/>
    </div>
}

export const AddMessageFormChat:React.FC = () => {
    const [message,setMessage] = useState('')
    const sendMessage = () => {
        if(!message) {
            return
        }
        wsChannel.send(message)
        setMessage('')
    }

    return <div>
        <div>
        <textarea onChange={(e) =>setMessage(e.currentTarget.value) } name="" ></textarea></div>
        <div>
        <button onClick={sendMessage}>Send</button></div>
    </div>
}
export default ChatPage