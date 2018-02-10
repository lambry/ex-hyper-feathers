import client from '../index'
import { defaultChannels, defaultMessages } from '../config'

// Setup hyperapp actions
const actions = {
    init: () => (state, actions) => {
        // Authenticate user
        client.authenticate().then(actions.signInSuccess).catch(() => actions.signInError({ message: null }))

        // Add service 'listeners'
        client.service('users').on('created', actions.addUser);
        client.service('messages').on('created', actions.addMessage);
        client.service('channels').on('created', actions.addChannel);

        return { loading: false }
    },
    signUpUser: (e) => ({ email, password }, actions) => {
        e.preventDefault()
        
        client.service('users').create({
            email, password
        })
        .then(actions.signInUser)
        .catch(actions.signInError)
        
        return { signInPending: true, signInError: false }
    },
    signInUser: (e) => ({ email, password }, actions) => {
        e.type && e.preventDefault()

        client.authenticate({
            email, password,
            strategy: 'local'
        })
        .then(actions.signInSuccess)
        .catch(actions.signInError)

        return { signInPending: true, signInError: false }
    },
    signInToggle: () => ({ signIn }) => ({
        signIn: ! signIn
    }),
    signInError: (e) => () => ({
        signInPending: false,
        signInError: e.message
    }),
    signInSuccess: (payload) => (state, actions) => {
        actions.updateToken(payload)
        actions.fetchUsers()
        actions.fetchChannels()
        actions.fetchMessages()

        return { email: '', password: '' }
    },
    updateToken: ({ accessToken }) => () => ({
        token: accessToken,
        loading: false,
        signInPending: false,
        signInError: false
    }),
    fetchUsers: () => (state, actions) => {
        client.service('users').find().then((users) => {
            users.data.forEach(actions.addUser)
        })
    },
    fetchMessages: () => (state, actions) => {
        client.service('messages').find({
            query: {
                $sort: {
                    createdAt: -1
                },
                $limit: 50
            }
        }).then((messages) => {
            messages.data.reverse().forEach(actions.addMessage)
        })
    },
    fetchChannels: () => (state, actions) => {
        client.service('channels').find().then((channels) => {
            channels.data.forEach(actions.addChannel)
        })
    },
    updateEmail: (email) => () => ({
        email
    }),
    updatePassword: (password) => () => ({
        password
    }),
    addUser: (user) => ({ users }) => ({
        users: [...users, user]
    }),
    updateMessage: (messageText) => () => ({
        messageText
    }),
    sendMessage: (e) => ({ messageText, channelActive }, actions) => {
        e.preventDefault()

        client.service('messages').create({
            text: messageText,
            channel: channelActive
        }).then(actions.messageSuccess).catch(actions.messageError)

        return { messagePending: true, messageError: false }
    },
    messageSuccess: () => () => ({
        messagePending: false,
        messageError: false,
        messageText: ''
    }),
    messageError: (e) => () => ({
        messagePending: false,
        messageError: e.message
    }),
    addMessage: (message) => ({ messages }) => ({
        messages: [...messages, message]
    }),
    updateChannel: (channelActive) => () => ({
        channelActive
    }),
    updateChannelName: (channelName) => () => ({
        channelName
    }),
    submitChannel: (e) => ({ channelName }, actions) => {
        e.preventDefault()

        client.service('channels').create({
            name: channelName
        }).then(actions.channelSuccess).catch(actions.channelError)

        return { channelPending: true, channelError: false }
    },
    channelSuccess: () => () => ({
        channelPending: false,
        channelError: false,
        channelForm: false,
        channelName: ''
    }),
    channelError: (e) => () => ({
        channelPending: false,
        channelError: e.message
    }),
    addChannel: (channel) => ({ channels }) => ({
        channels: [...channels, channel]
    }),
    toggleChannelForm: () => (state) => ({
        channelForm: ! state.channelForm
    }),
    logout: () => (state, actions) => {
        client.logout().then(() => actions.updateToken({ accessToken: null }))

        return {
            users: [],
            channels: defaultChannels,
            messsages: defaultMessages
        }
    }
}

window.suu = actions.signUpUser

export default actions
