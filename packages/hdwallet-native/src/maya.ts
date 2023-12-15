import type { StdTx } from "@cosmjs/amino";
import type { SignerData } from "@cosmjs/stargate";
import * as core from "@shapeshiftoss/hdwallet-core";
import * as bech32 from "bech32";
import CryptoJS from "crypto-js";
import PLazy from "p-lazy";

import * as Isolation from "./crypto/isolation";
import { NativeHDWalletBase } from "./native";
import * as util from "./util";

const MAYA_CHAIN = "maya-mainnet-v1";

const protoTxBuilder = PLazy.from(() => import("@shapeshiftoss/proto-tx-builder"));

export function MixinNativeMayaWalletInfo<TBase extends core.Constructor<core.HDWalletInfo>>(Base: TBase) {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  return class MixinNativeMayaWalletInfo extends Base implements core.MayaWalletInfo {
    readonly _supportsMayaInfo = true;
    async mayaSupportsNetwork(): Promise<boolean> {
      return true;
    }

    async mayaSupportsSecureTransfer(): Promise<boolean> {
      return false;
    }

    mayaSupportsNativeShapeShift(): boolean {
      return false;
    }

    mayaGetAccountPaths(msg: core.MayaGetAccountPaths): Array<core.MayaAccountPath> {
      const slip44 = core.slip44ByCoin("Maya");
      return [
        {
          addressNList: [0x80000000 + 44, 0x80000000 + slip44, 0x80000000 + msg.accountIdx, 0, 0],
        },
      ];
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mayaNextAccountPath(msg: core.MayaAccountPath): core.MayaAccountPath | undefined {
      // Only support one account for now (like portis).
      return undefined;
    }
  };
}

export function MixinNativeMayaWallet<TBase extends core.Constructor<NativeHDWalletBase>>(Base: TBase) {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  return class MixinNativeMayaWallet extends Base {
    readonly _supportsMaya = true;

    #masterKey: Isolation.Core.BIP32.Node | undefined;

    async mayaInitializeWallet(masterKey: Isolation.Core.BIP32.Node): Promise<void> {
      this.#masterKey = masterKey;
    }

    mayaWipe(): void {
      this.#masterKey = undefined;
    }

    mayaBech32ify(address: ArrayLike<number>, prefix: string): string {
      const words = bech32.toWords(address);
      return bech32.encode(prefix, words);
    }

    createMayaAddress(publicKey: string) {
      const message = CryptoJS.SHA256(CryptoJS.enc.Hex.parse(publicKey));
      const hash = CryptoJS.RIPEMD160(message as any).toString();
      const address = Buffer.from(hash, `hex`);
      return this.mayaBech32ify(address, `maya`);
    }

    async mayaGetAddress(msg: core.MayaGetAddress): Promise<string | null> {
      return this.needsMnemonic(!!this.#masterKey, async () => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const keyPair = await util.getKeyPair(this.#masterKey!, msg.addressNList, "maya");
        return this.createMayaAddress(keyPair.publicKey.toString("hex"));
      });
    }

    async mayaSignTx(msg: core.MayaSignTx): Promise<core.MayaSignedTx | null> {
      return this.needsMnemonic(!!this.#masterKey, async () => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const keyPair = await util.getKeyPair(this.#masterKey!, msg.addressNList, "maya");
        const adapter = await Isolation.Adapters.CosmosDirect.create(keyPair.node, "maya");

        const signerData: SignerData = {
          sequence: Number(msg.sequence),
          accountNumber: Number(msg.account_number),
          chainId: MAYA_CHAIN,
        };

        return (await protoTxBuilder).sign(adapter.address, msg.tx as StdTx, adapter, signerData, "maya");
      });
    }
  };
}
