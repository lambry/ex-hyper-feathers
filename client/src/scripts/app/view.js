import { h } from 'hyperapp'
import SignIn from '../components/SignIn'
import Users from '../components/Users'
import Channels from '../components/Channels'
import ChannelForm from '../components/ChannelForm'
import Messages from '../components/Messages'
import MessageForm from '../components/MessageForm'

// Setup hyperapp view
const view = (state, actions) => (
    <main class="main" oncreate={(actions.init)} data-loading={state.loading}>
        {!state.token && <SignIn 
            email={state.email} 
            password={state.password} 
            updateEmail={actions.updateEmail} 
            updatePassword={actions.updatePassword}
            submit={state.signIn ? actions.signInUser : actions.signUpUser} 
            button={state.signIn ? 'Sign in' : 'Sign up'} 
            message={state.signIn ? 'Sign up here' : 'Sign in here'} 
            toggle={actions.signInToggle} 
            pending={state.signInPending}
            error={state.signInError} />}
        <Users
            users={state.users}
            active={state.token}
            logout={actions.logout} />
        <Channels 
            channels={state.channels} 
            active={state.channelActive} 
            update={actions.updateChannel}
            toggle={actions.toggleChannelForm} />
        <ChannelForm 
            value={state.channelName} 
            update={actions.updateChannelName} 
            submit={actions.submitChannel} 
            visible={state.channelForm}
            toggle={actions.toggleChannelForm} 
            pending={state.channelPending}
            error={state.channelError} />
        <Messages 
            messages={state.messages.filter(m => m.channel === state.channelActive)} />
        <MessageForm 
            value={state.messageText} 
            update={actions.updateMessage} 
            send={actions.sendMessage}
            pending={state.messagePending}
            error={state.messageError} />
    </main>
)

export default view
