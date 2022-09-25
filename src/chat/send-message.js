import styles from './styles.module.css'
import React, { useState } from 'react'


const SendMessage = ({ socket, username, room}) => {
    const [message, setMessage] = useState('')

    const sendMessage = () => {
        if (!message == '') {
            const timeStamp = Date.now()
            socket.emit('send_message', { username, room, message, timeStamp})
            setMessage('')
        }
    }

    return (
        <div className={styles.sendMessageContainer}>
            <input
                className={styles.messageInput}
                placeholder='...'
                onChange={(e) => setMessage(e.target.value)}
                value={message}
            />
            <button className='btn btn-primary' onClick={sendMessage}>
                Send
            </button>
        </div>
    )
}

export default SendMessage