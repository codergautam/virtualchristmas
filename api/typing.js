const checkdata = require("./checkdata")

module.exports = 
(data, io, socket) => {
    var authorization = data.authorization
    var uname = data.uname.toLowerCase()
    var typing = data.typing

    checkdata(authorization, uname)
    .then((valid) => {
        if(!valid) return socket.emit("error", "Invalid Authorization or Uname")
        if(typeof typing !== "boolean") return socket.emit("error", "Typing has to be a boolean")
        socket.broadcast.emit("typing", {
          uname: uname,
          typing: typing
        })

        


    })
    .catch((e) => {
        return socket.emit("error", e.toString())
    })

}