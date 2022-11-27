
let keepkeyRest = require("../dist")
const core = require("@keepkey/hdwallet-core");
const keepkeyTcp = require("@keepkey/hdwallet-keepkey-tcp");
const keyring = new core.Keyring();
let run_test = async function(){
    try{
        core
        // console.log(keepkeyRest)
        console.log(keepkeyRest.KeepKeyRestHDWallet)
        // console.log(keepkeyRest.KeepKeyRestHDWallet.pairDevice)

        const kkbridgeAdapter = keepkeyRest.KeepKeyRestHDWallet.useKeyring(keyring);
        const wallet = await kkbridgeAdapter.pairDevice('http://localhost:1646')
        console.log(wallet)
    }catch(e){
        console.error(e)
    }
}

run_test()