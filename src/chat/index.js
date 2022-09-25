import styles from './styles.module.css'
import MessagesRecieved from './messages'
import SendMessage from './send-message'
import RoomAndUsersColumn from './room-and-users'

const Chat = ({ username, room, socket }) => {
    return (
        <div className={styles.chatContainer}>
            <RoomAndUsersColumn socket={socket} username={username} room={room} />

            <div>
                <MessagesRecieved socket={socket} />
                <SendMessage socket={socket} username={username} room={room} />
            </div>
        </div>
    )
}

export default Chat