const newacc = require("./newacc")
const checkdata = require("./checkdata")
const login = require("./login")
const earn = require("./earn")
const getuser = require("./getuser")
const sell = require("./sell")
const leaderboard = require("./leaderboard")
const chat = require("./chat")
const typing = require("./typing")
module.exports = {
    newacc: newacc,
    checkdata: checkdata,
    login: login,
    earn: earn.yee,
    getuser: getuser,
    candy: earn.candy,
    sell: sell,
  leaderboard: leaderboard,
  chat: chat,
  typing: typing
}

