import logo from './logo.svg';
import './App.css';
import {
  useEffect
} from 'react';
//wallet
import * as core from "@keepkey/hdwallet-core";
import * as keepkeyTcp from "@keepkey/hdwallet-keepkey-tcp";
import * as keepkey from "@keepkey/hdwallet-keepkey";
const keyring = new core.Keyring();
const kkbridgeAdapter = keepkeyTcp.TCPKeepKeyAdapter.useKeyring(keyring);



function App() {


  let onStart = async function(){
    try{
      console.log("onStart")
    }catch(e){
      console.error(e)
    }
  }

  // onStart()
  useEffect(() => {
    onStart()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
