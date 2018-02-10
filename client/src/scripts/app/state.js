import { defaultChannels, defaultMessages } from '../config'

// Setup hyperapp state
const state = {
    loading: true,
    token: null,
    email: '',
    password: '',
    signIn: true,
    signInPending: false,
    signInError: false,
    users: [],
    messages: defaultMessages,
    messageText: '',
    messagePending: false,
    messageError: false,
    channels: defaultChannels,
    channelActive: 'general',
    channelName: '',
    channelPending: false,
    channelError: false,
    channelForm: false
}

export default state
