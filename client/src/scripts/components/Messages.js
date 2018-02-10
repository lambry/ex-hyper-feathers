import { h } from 'hyperapp'

const Messages = ({ messages }) => (
    <section class="messages container">
        {messages.map(({ text, user: { email, avatar } }) => (
            <div class="message">
                <div class="message-bubble">{text}</div>
                <div class="message-user">
                    {avatar && <img src={avatar} alt="avatar" class="message-avatar" />}
                    <span class="message-email">{email}</span>
                </div>
            </div>
        ))}
    </section>
)

export default Messages
