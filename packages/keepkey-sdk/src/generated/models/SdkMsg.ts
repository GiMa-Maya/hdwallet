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
/**
 * 
 * @export
 * @interface SdkMsg
 */
export interface SdkMsg {
    /**
     * 
     * @type {string}
     * @memberof SdkMsg
     */
    type: string;
    /**
     * 
     * @type {any}
     * @memberof SdkMsg
     */
    value: any | null;
}

/**
 * Check if a given object implements the SdkMsg interface.
 */
export function instanceOfSdkMsg(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "type" in value;
    isInstance = isInstance && "value" in value;

    return isInstance;
}

export function SdkMsgFromJSON(json: any): SdkMsg {
    return SdkMsgFromJSONTyped(json, false);
}

export function SdkMsgFromJSONTyped(json: any, ignoreDiscriminator: boolean): SdkMsg {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'type': json['type'],
        'value': json['value'],
    };
}

export function SdkMsgToJSON(value?: SdkMsg | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'type': value.type,
        'value': value.value,
    };
}

