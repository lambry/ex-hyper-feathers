import { app } from 'hyperapp'
import io from 'socket.io-client'
import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import authentication from '@feathersjs/authentication-client'
import state from './app/state'
import actions from './app/actions'
import view from './app/view'
import { api } from './config'
import '../styles/index.scss'

// Create a websocket connecting to the Feathers server
const socket = io(api)
// Create a Feathers application intance
const client = feathers()
// Configure Socket.io client services to use that socket
client.configure(socketio(socket))
// Configure client authentication storage
client.configure(authentication({
    storage: window.localStorage
}))

// Render the hyerpapp app
app(state, actions, view, document.body)

// Export client for use within hyperapp
export default client
