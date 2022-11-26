/* tslint:disable */
/* eslint-disable */
/**
 * keepkey-desktop
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.1.112
 * Contact: bithighlander@gmail.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { RipplePayment } from './RipplePayment';
import {
    RipplePaymentFromJSON,
    RipplePaymentFromJSONTyped,
    RipplePaymentToJSON,
} from './RipplePayment';
import type { RippleTx } from './RippleTx';
import {
    RippleTxFromJSON,
    RippleTxFromJSONTyped,
    RippleTxToJSON,
} from './RippleTx';

/**
 * 
 * @export
 * @interface RippleSignTx
 */
export interface RippleSignTx {
    /**
     * 
     * @type {Array<number>}
     * @memberof RippleSignTx
     */
    addressNList: Array<number>;
    /**
     * 
     * @type {RippleTx}
     * @memberof RippleSignTx
     */
    tx: RippleTx;
    /**
     * 
     * @type {string}
     * @memberof RippleSignTx
     */
    flags?: string;
    /**
     * 
     * @type {string}
     * @memberof RippleSignTx
     */
    sequence: string;
    /**
     * 
     * @type {string}
     * @memberof RippleSignTx
     */
    lastLedgerSequence: string;
    /**
     * 
     * @type {RipplePayment}
     * @memberof RippleSignTx
     */
    payment: RipplePayment;
}

/**
 * Check if a given object implements the RippleSignTx interface.
 */
export function instanceOfRippleSignTx(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "addressNList" in value;
    isInstance = isInstance && "tx" in value;
    isInstance = isInstance && "sequence" in value;
    isInstance = isInstance && "lastLedgerSequence" in value;
    isInstance = isInstance && "payment" in value;

    return isInstance;
}

export function RippleSignTxFromJSON(json: any): RippleSignTx {
    return RippleSignTxFromJSONTyped(json, false);
}

export function RippleSignTxFromJSONTyped(json: any, ignoreDiscriminator: boolean): RippleSignTx {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'addressNList': json['addressNList'],
        'tx': RippleTxFromJSON(json['tx']),
        'flags': !exists(json, 'flags') ? undefined : json['flags'],
        'sequence': json['sequence'],
        'lastLedgerSequence': json['lastLedgerSequence'],
        'payment': RipplePaymentFromJSON(json['payment']),
    };
}

export function RippleSignTxToJSON(value?: RippleSignTx | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'addressNList': value.addressNList,
        'tx': RippleTxToJSON(value.tx),
        'flags': value.flags,
        'sequence': value.sequence,
        'lastLedgerSequence': value.lastLedgerSequence,
        'payment': RipplePaymentToJSON(value.payment),
    };
}

