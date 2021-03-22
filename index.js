const express = require('express')
const app = express()
const port = process.env.PORT|| 3000
const bodyParser = require('body-parser');
const api = require("./api/api")
var cookieParser = require('cookie-parser');

var http = require("http").Server(app)
app.use(cookieParser())
app.use(express.static(__dirname+"/client"))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs')


const io = require('socket.io')(http, {
    cors: { origin: "https://virtualchristmas.codergautamyt.repl.co/*" }
});

io.on('connection', (socket) => {
  io.emit("users", io.sockets.sockets.size)
  api.chat.history(socket)

    socket.on("earn", (data) => {
      api.earn(data.uname, data.authorization)
      .then((lol) => {
        socket.emit("earn",lol)
      })
    })

    socket.on("msg", (data) => {
      api.chat(data, io, socket)
    })
    socket.on("typing", (data) => {
       api.typing(data, io, socket)
    })
    socket.on("disconnect", () => {
      io.emit("users", io.sockets.sockets.size)
    })

});





app.use(express.static(__dirname+"/css"))
app.get('/logout', (req, res) => {
  res.cookie('session', 'false')
  res.redirect("/")
})
/*
app.get('/', (req, res) => {
  res.end("The game is now over! The winner was mini!")
})*/

app.get('/', (req, res) => {
  //res.end("Lol")
if(req.cookies.session == "true") {
  api.checkdata(req.cookies.authorization, req.cookies.uname)
  .then((acc) => {
    if(!acc) {
      res.cookie('session', 'false')
    }
    res.render('index', {session: acc, uname: req.cookies.uname})
  })
 
} else {
  res.render('index', {session: false})
}

})
app.get('/inventory/:uname', (req, res) => {
  //res.end("Lol")
  var uname = req.params.uname
if(req.cookies.session == "true") {
  api.checkdata(req.cookies.authorization, req.cookies.uname)
  .then((acc) => {
    if(!acc) {
      res.cookie('session', 'false')
    }

      api.getuser(uname)
  .then((p) => {
    if(p.success) {
      var p = p.user
    res.render('player', {session: acc, uname: req.cookies.uname, p:p, candy: api.candy})
    } else {
       res.end("player doesnt exist")
    }
  })
  .catch(() => {
    res.end("err")
  })
  })
 
} else {
  api.getuser(uname)
  .then((p) => {
    if(p.success) {
      var p = p.user
  res.render('player', {session: false, p:p, candy: api.candy})
    } else {
         res.end("player doesnt exist")
    }

  })
  .catch(() => {
    res.end("err")
  })

}

})
app.get('/leaderboard', (req, res) => {
if(req.cookies.session == "true") {
  api.checkdata(req.cookies.authorization, req.cookies.uname)
  .then((acc) => {
    if(!acc) {
      res.cookie('session', 'false')
    }
    res.render('leaderboard', {session: acc, uname: req.cookies.uname, yeet:true})
  })
 
} else {
  res.render('leaderboard', {session: false, yeet: true})
}

})
app.get('/leaderboardyeet', (req, res) => {
if(req.cookies.session == "true") {
  api.checkdata(req.cookies.authorization, req.cookies.uname)
  .then((acc) => {
    if(!acc) {
      res.cookie('session', 'false')
    }
    res.render('leaderboard', {session: acc, uname: req.cookies.uname, yeet:false})
  })
 
} else {
  res.render('leaderboard', {session: false, yeet: false})
}

})
app.get('/create', (req, res) => {
  if(req.cookies.session == "true") {
    api.checkdata(req.cookies.authorization, req.cookies.uname)
    .then((acc) => {
      if(!acc) {
        res.render('create')
      } else {
        res.redirect('/')
      }

    })
   
  } else {
    res.render('create')
  }
  })
  app.get('/login', (req, res) => {
    if(req.cookies.session == "true") {
      api.checkdata(req.cookies.authorization, req.cookies.uname)
      .then((acc) => {
        if(!acc) {
          res.render('login')
        } else {
          res.redirect('/')
        }

      })
     
    } else {
      res.render('login')
    }
  })
  app.get('/play', (req, res) => {
    if(req.cookies.session == "true") {
      api.checkdata(req.cookies.authorization, req.cookies.uname)
      .then((acc) => {
        if(!acc) {
          res.redirect('/')
        } else {
          res.render('play', {uname: req.cookies.uname, authorization: req.cookies.authorization})
        }

      })
     
    } else {
      res.redirect('/')
    }
  })
  app.get('/chat', (req, res) => {
    if(req.cookies.session == "true") {
      api.checkdata(req.cookies.authorization, req.cookies.uname)
      .then((acc) => {
        if(!acc) {
          res.redirect('/')
        } else {
          res.render('chat', {uname: req.cookies.uname, authorization: req.cookies.authorization})
        }

      })
     
    } else {
      res.redirect('/')
    }
  })
  app.get('/inventory', (req, res) => {
    if(req.cookies.session == "true") {
      api.checkdata(req.cookies.authorization, req.cookies.uname)
      .then((acc) => {
        if(!acc) {
          res.redirect('/')
        } else {
          api.getuser(req.cookies.uname)
          .then((data) => {
            if(data.success) {
              res.render('inv', {uname: req.cookies.uname, inv: data.user.inv, candy: api.candy, bal: data.user.bal})
            } else {
              res.redirect('/')
            }
          })
          
        }

      })
     
    } else {
      res.redirect('/')
    }
  })
  app.get('/sell', (req, res) => {
    if(req.cookies.session == "true") {
      api.checkdata(req.cookies.authorization, req.cookies.uname)
      .then((acc) => {
        if(!acc) {
          res.redirect('/')
        } else {
          api.getuser(req.cookies.uname)
          .then((data) => {
            if(data.success) {
              res.render('sell', {uname: req.cookies.uname, inv: data.user.inv, candy: api.candy, authorization: req.cookies.authorization})
            } else {
              res.redirect('/')
            }
          })
          
        }

      })
     
    } else {
      res.redirect('/')
    }
  })
app.get('/api', (req, res) => {
    res.redirect('/')
})

app.post('/api/newacc',  (req, res) => {
    api.newacc(req.body.uname, req.body.pword)
    .then((data) => {
        res.end(JSON.stringify(data))
    })
    .catch((err) => {
        res.end({success: false, errormsg: err.toString()})
    })
 
})
app.post('/api/login',  (req, res) => {
  api.login(req.body.uname, req.body.pword)
  .then((data) => {
      res.end(JSON.stringify(data))
  })
  .catch((err) => {
      res.end(JSON.stringify({success: false, errormsg: err.toString()}))
  })

})
app.post('/api/sell',  (req, res) => {
  api.sell(req.body.uname, req.body.authorization, req.body.candy, req.body.amount)
  .then((data) => {
      res.end(JSON.stringify(data))
  })
  .catch((err) => {
      res.end(JSON.stringify({success: false, errormsg: err.toString()}))
  })

})
app.get('/api/leaderboard',  (req, res) => {
  api.leaderboard()
  .then((data) => {
      res.end(JSON.stringify(data))
  })
  .catch((err) => {
      res.end({success: false, errormsg: err.toString()})
  })

})
http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)

  
})

