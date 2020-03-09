const Web3 = require('web3')
const fs = require('fs')
const path = require('path')
var web3 = new Web3();

const filePath = path.join(__dirname, '../.secret');

function getAccount() {
    return new Promise(resolve => {
        fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) => {
            if(data.length == 0){
                let randomAccount = web3.eth.accounts.create()
        
                fs.writeFile(filePath, randomAccount.privateKey, (err) => {
                    if(err) {
                        return console.log(err);
                    }
                })

                resolve(randomAccount)
            } else {
                resolve(web3.eth.accounts.privateKeyToAccount(data))
            }
        })
    })
}

module.exports = {
    getAccount
}