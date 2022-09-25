import styles from './styles.module.css'
import { useState, useEffect } from 'react'

const Messages = ({ socket }) => {
    const [messagesRecieved, setMessagesRecieved] = useState([])

    // Triggers when a event is sent from server
    useEffect(() => {
        socket.on('recieve_message', (data) => {
            console.log(data)
            setMessagesRecieved((state) => [
                ...state,
                {
                    message: data.message,
                    username: data.username,
                    timeStamp: data.timeStamp,
                },
            ])
        })

        return () => socket.off('recieve_message')
    }, [socket])

    useEffect(() => {
        // Get the last 20 messages that was sent in the chat room that the user joined from harperDb
        socket.on('last_20_messages', (last20Messages) => {
            console.log('Last 20 messages: ', JSON.parse(last20Messages))
            last20Messages = JSON.parse(last20Messages)
            last20Messages = dateSortMessages(last20Messages)
            setMessagesRecieved((state) => [...last20Messages, ...state])
        })

        return () => socket.off('last_20_messages')
    })

    // makes you scroll to the most recent message
    useEffect(() => {
        messagesColumnRef.current.scrollTop =
            messagesColumnRef.current.scrollHeight
    }, [messagesRecieved])

    // sort the messages show the most recent last
    function dateSortMessages(messages) {
        return messages.sort(
            (a, b) => parseInt(a.timeStamp) - parseInt(b.timeStamp)
        )
    }


    // d/m/y, h:m:s
    function formatTimeStampDates(timeStamp) {
        const theDate = new Date(timeStamp)
        return theDate.toLocaleString()
    }

    return (
        <div className={styles.messagesColumn}>
            {messagesRecieved.map((msg, i) => (
                <div className={styles.message} key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                    <span className={styles.msgMeta}>{msg.username}</span>
                    <span className={styles.msgMeta}>
                        {formatTimeStampDates(msg.timeStamp)}
                    </span>
                </div>
                <p className={styles.msgText}>{msg.message}</p>
                <br />
                </div>
            ))}
        </div>
    )
}

export default Messages