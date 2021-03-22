const checkdata = require("./checkdata")

var history = []
module.exports = 
(data, io, socket) => {
          if(typeof data.msg !== "string") return socket.emit("error", "Msg has to be a string")
    var authorization = data.authorization
    var msg = data.msg.substr(0, 256)
    var uname = data.uname.toLowerCase()

    checkdata(authorization, uname)
    .then((valid) => {
        if(!valid) return socket.emit("error", "Invalid Authorization or Uname")
        var message = {
            msg: msg,
            uname: uname,
            time: new Date().toLocaleString()
        }
        history.push(message)
        io.emit("msg", message)

        


    })
    .catch((e) => {
        return socket.emit("error", e.toString())
    })

}

module.exports.history = (socket) => {
  socket.emit("history", history)
}