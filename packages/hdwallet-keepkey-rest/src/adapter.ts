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
    return new KkRestAdapter(keyring);
  }

  public async initialize(): Promise<number> {
    return Object.keys(this.keyring.wallets).length;
  }

  public async pairDevice(): Promise<core.HDWallet> {
    const wallet = new KeepKeyRestHDWallet();
    // eslint-disable-next-line no-console
    console.log("wallet: ", wallet);
    let features = await wallet.getFeatures();
    // eslint-disable-next-line no-console
    console.log("features: ", features);
    if (typeof features === "string") features = JSON.parse(features);
    const deviceID = await features.deviceId;
    // eslint-disable-next-line no-console
    console.log("deviceID: ", deviceID);
    this.keyring.add(wallet, deviceID);
    this.currentDeviceID = deviceID;
    this.keyring.emit(["kkrest", deviceID, core.Events.CONNECT], deviceID);
    return wallet;
  }
}
