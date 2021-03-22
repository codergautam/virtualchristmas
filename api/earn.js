const db = require('pouchdb')
var accounts = new db('accounts')

var candy = [
{name: "Book", percent: 20, sell: 10, rarity: "common"},
{name: "Charging cable", percent: 10, sell: 10, rarity: "common"}, 
{name: "Calculator", percent: 10, sell: 10, rarity: "common"},
{name: "Apple Pencil", percent: 10, sell: 100, rarity: "uncommon"},  
{name: "Smart Light Bulb", percent: 10, sell: 100, rarity: "uncommon"}, 
{name: "Fitbit", percent: 7, sell: 100, rarity: "uncommon"},
 {name: "iPad Pro", percent: 7, sell: 1000, rarity: "rare"}, 
 {name: "MacBook Air", percent: 7, sell: 1000, rarity: "rare"}, 
 {name: "Gaming Pc", percent: 5, sell: 1000, rarity: "rare"},  
 {name: "Gaming Pc", percent: 4, sell: 5000, rarity: "epic"}, 
  {name: "Airpods Pro max", percent: 3, sell: 5000, rarity: "epic"},  
  {name: "Macbook Pro", percent: 3, sell: 5000, rarity: "epic"},
  {name: "MrBeast shirt", percent: 2, sell: 5000, rarity: "epic"}, 
  {name: "Solid Gold Ring", percent: 1, sell: 50000, rarity: "legendary"}, 
  {name: "Tesla Model 3", percent: 1, sell: 50000, rarity: "legendary"}
]

var candyarr = []
i=0
for (candi in candy) {
    for(var il=0; il < candy[candi].percent; il++){
        candyarr[i] = candy[candi]
        i++
    }
  
}
function random() {
    return candyarr[Math.floor(Math.random() * candyarr.length)]
}


module.exports ={
    candy: candy,
   yee: (uname, authorization) => {
                   resolve({success: false, errormsg: "game is over"})
                   /*
     var uname = uname.toLowerCase()
        return new Promise((resolve, reject) => {
            accounts.get(uname) 
            .then((doc) => {
                if(doc.authorization == authorization) {
                    if(doc.hasOwnProperty("cooldown")) {
                        if(doc.cooldown+2000>=Date.now()) {
                            var msleft = doc.cooldown+2000-Date.now()
                            resolve({success: true,cooldown: true, msleft: msleft})
                        } else {
                            var candy = random()
                            if(doc.inv.hasOwnProperty(candy.name)) {
                                doc.inv[candy.name] = {amount: doc.inv[candy.name].amount+1}
                            } else {
                                doc.inv[candy.name] = {amount:1}
                            }
                            
                            
                            doc.cooldown = Date.now()
                            accounts.put(doc)
                            .then(() => {
                                resolve({success: true, cooldown:false, candy: candy, amount: 1, inv: doc.inv})
                            })
                        }
                    } else {
                        var candy = random()
        if(doc.inv.hasOwnProperty(candy.name)) {
            doc.inv[candy.name] = {amount: doc.inv[candy.name].amount+1}
        } else {
            doc.inv[candy.name] = {amount:1}
        }
        
        
        doc.cooldown = Date.now()
        
        accounts.put(doc)
        .then(() => {
            resolve({success: true, cooldown:false, candy: candy, amount: 1, inv: doc.inv})
        })
                }
                } else {
                    resolve({success: false, errormsg: "Invalid Authorization"})
                }
            })
            .catch((err) =>{
               //acc not found
               resolve({success: false, errormsg: "This account doesn't exist"})
            })
        })
        */
        }
} 