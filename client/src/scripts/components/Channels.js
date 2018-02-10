import { h } from 'hyperapp'

const Channels = ({ channels, active, update, toggle }) => (
    <section class="channels">
        {channels.map(({ _id, name }) => (
            <div class="channel container" onclick={() => update(_id)} data-active={_id === active}>
                {name}
            </div>
        ))}
        <a href="#" class="channel-toggle" onclick={() => toggle()}>Add new channel</a>
    </section>
)

export default Channels
