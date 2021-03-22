const db = require('pouchdb')
var accounts = new db('accounts')

module.exports = () => {
return new Promise((resolve, reject) => {
accounts.allDocs({
  include_docs: true,
  attachments: true
}).then(function (result) {
  var doct = {}
  
  for (user in result.rows) {
  user1 = result.rows[user]

   doc = user1.doc
    delete doc.authorization
    delete doc.pword
    doct[user1.id] = doc
  }
const sorted = Object.values(doct).sort((a, b) => a.bal - b.bal).reverse()
resolve({leaderboard: sorted})

// with ids

})
})
}