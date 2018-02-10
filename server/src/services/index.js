const messages = require('./messages/messages.service.js');
const users = require('./users/users.service.js');
const channels = require('./channels/channels.service.js');
module.exports = function (app) {
  app.configure(messages);
  app.configure(users);
  app.configure(channels);
};
