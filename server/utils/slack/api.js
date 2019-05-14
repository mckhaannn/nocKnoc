var Slack = require('slack')
require('dotenv').config()
let {acceptDeclineMessage} = require('../../resources/blocks.js')

const botToken = process.env.Bot_User_OAuth_Access_Token
const userToken = process.env.User_OAuth_Access_Token
// const botToken = process.env.Bot_Meridium_OAuth_Access_Token
// const userToken = process.env.User_Meridium_OAuth_Access_Token

let bot = new Slack({botToken})
let user = new Slack({userToken})
module.exports = {
  testSlack: () => {
    return bot.api.test({hyper: 'card', hej: 'bye'})
  },
  getAllUsers: () => {
    return bot.users.list({token: botToken})
  },
  getAllChannels: () => {
    return bot.channels.list({token: botToken})
  },
  getUserById: (userId) => {
    return bot.users.info({token: botToken, userId})
  },
  getChannelById: (channel) => {
    return bot.channels.info({token: botToken, channel})
  },
  getAllTeams: () => {
    return user.usergroups.list({token: userToken})
  },
  getTeamUsersByTeamId: (usergroup) => {
    return user.usergroups.users.list({token: userToken, usergroup})
  },
  sendMessageToChannel: (channel, message) => {
    return bot.chat.postMessage({token: botToken, channel: channel, text: message})
  },
  sendFormToChannel: (channel, text) => {
    let blocks = acceptDeclineMessage(text)
    return bot.chat.postMessage({token: botToken, channel, text, blocks})
  },
  botInfo: () => {
    return bot.bots.info({token: botToken})
  },

  sendTeamsToChannel: (channel, blocks) => {
    console.log(blocks)
    return bot.chat.postMessage({token: botToken, channel: "CHK464ERK", text: "teamsetting", blocks: JSON.stringify(blocks)})
  },

  updateMessage: (channel, name, ts) => {
    let text = `${name} är på väg att öppna.`
    return bot.chat.update({token: botToken, channel, text, ts, as_user: true, blocks: []})
  }
}
