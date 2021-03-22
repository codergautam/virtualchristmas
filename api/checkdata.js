const db = require('pouchdb')
var accounts = new db('accounts')
module.exports = (authorization, uname) => {
  var uname = uname.toLowerCase()
return new Promise((resolve, reject) => {

        
    accounts.get(uname) 
    .then((doc) => {
        if(doc.authorization == authorization) {
            resolve(true)
        } else {
 resolve(false)
        }
    })
    .catch((err) =>{
        resolve(false)
    })
})
}