import { h } from 'hyperapp'

const ChannelForm = ({ value, update, submit, toggle, visible, pending, error }) => (
    <form class="channel-form" onsubmit={(e) => submit(e)} data-visible={visible}>
        <button type="button" class="channel-close" onclick={() => toggle()}>x</button>
        <div class="channel-form-fields">
            <input type="text" value={value} onkeyup={(e) => update(e.target.value)} />
            <button type="submit" disabled={!value}>Add channel</button>
        </div>
        {(!pending && !error) && <p class="info"><a onclick={() => toggle()}>Close</a></p>}
        {pending && <p class="info">Adding channel...</p>}
        {error && <p class="error">{error}</p>}
    </form>
)

export default ChannelForm
