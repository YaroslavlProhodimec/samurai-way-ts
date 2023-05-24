export type ChatMessageAPIType = {
    message: string
    photo: string
    userId: number
    userName: string
}

type MessagesReceivedSubscriberType = (messages: ChatMessageAPIType[]) => void
 type StatusChangedSubscriberType = (status: StatusType) => void


let subcribers = {
    'message-received' : [] as MessagesReceivedSubscriberType[],
    'status-changed':[] as StatusChangedSubscriberType[]
}

let ws: WebSocket

type EventsNamesType  = 'message-received' | 'status-changed'
const closeHandler = () => {
    console.log('CLOSE')
    notifyStatus('pending')
    setTimeout(createChannel, 3000)
}

const messageHandler = (e: MessageEvent) => {
    console.log(e.data)
    const newMessages = JSON.parse(e.data)
    subcribers['message-received'].forEach(s => s(newMessages))
}
const openHandler = () => {
    console.log('OPEN')
    notifyStatus('ready')
}
const cleanUp = () => {
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)
}

const notifyStatus = (status:StatusType) => {
    subcribers['status-changed'].forEach(s => s(status))

}

const errorHandler = () => {
    notifyStatus('error')

}
function createChannel() {

    cleanUp()
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    notifyStatus('pending')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('open', openHandler)
    ws.addEventListener('error', errorHandler)
}

export const chatApi = {
    start() {
        createChannel()
    },
    stop() {
        subcribers['message-received'] = []
        subcribers['status-changed'] = []
        cleanUp()
        ws?.close()
    },
    subscribe(eventName:EventsNamesType,callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subcribers[eventName].push(callback)
        return () => {
            // @ts-ignore
            subcribers[eventName] = subcribers[eventName].filter(s => s !== callback)
        }
    },
    unsubscribe(eventName:EventsNamesType,callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subcribers[eventName] = subcribers[eventName].filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    }
}

export type StatusType = 'pending' | 'ready' | 'error'