const db = require('pouchdb')
var accounts = new db('accounts')
module.exports = (uname) => {
  var uname = uname.toLowerCase()
return new Promise((resolve, reject) => {
        
    accounts.get(uname) 
    .then((doc) => {
        delete doc.authorization
       delete doc.pword
        resolve({success: true, user: doc})
    })
    .catch((err) =>{
       //acc not found
       resolve({success: false, errormsg: "This account doesn't exist"})
    })


})
}