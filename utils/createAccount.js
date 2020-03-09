const getAccount = require('./getAccount').getAccount

async function awaitWrapper(){
    let account = await getAccount()
    console.log(`Account address: ${account.address}`)
}

awaitWrapper()