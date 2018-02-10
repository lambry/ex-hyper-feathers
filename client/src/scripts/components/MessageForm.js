import { h } from 'hyperapp'

const MessageForm = ({ value, update, send, pending, error}) => (
    <form class="message-form" onsubmit={(e) => send(e)}>
        <div class="container">
            <input type="text" value={value} onkeyup={(e) => update(e.target.value)} />
            <button type="submit" disabled={!value}>Send</button>
            {pending && <p class="info">Sending message...</p>}
            {error && <p class="error">{error}</p>}
        </div>
    </form>
)

export default MessageForm
