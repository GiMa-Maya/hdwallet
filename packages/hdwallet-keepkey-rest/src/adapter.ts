import * as core from "@keepkey/hdwallet-core";

import { KeepKeyRestHDWallet } from "./kkrest";

export class KkRestAdapter {
  keyring: core.Keyring;

  // wallet id to remove from the keyring when the active wallet changes
  currentDeviceID?: string;

  private constructor(keyring: core.Keyring) {
    this.keyring = keyring;
  }

  public static useKeyring(keyring: core.Keyring) {
    console.log("WINNING BRO!")
    return new KkRestAdapter(keyring);
  }

  public async initialize(): Promise<number> {
    return Object.keys(this.keyring.wallets).length;
  }

  public async pairDevice(): Promise<core.HDWallet> {
    console.log("WINNING BRO!!!!!!!! 2")
    const wallet = new KeepKeyRestHDWallet();
    console.log("wallet: ",wallet)
    const deviceID = await wallet.getDeviceID();
    console.log("deviceID: ",deviceID)
    this.keyring.add(wallet, deviceID);
    this.currentDeviceID = deviceID;
    this.keyring.emit(["kkrest", deviceID, core.Events.CONNECT], deviceID);
    return wallet;
  }
}
