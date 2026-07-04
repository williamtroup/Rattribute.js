/**
 * Rattribute.js
 * 
 * A JavaScript library that generates responsive attribute setters for any HTML element.
 * 
 * @file        document-element.ts
 * @version     v1.2.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2026
 */


import { Constant } from "../constant";


export namespace DocumentElement {
    export function onContentLoaded( onLoadFunc: Function ) : void {
        if ( document.readyState === "loading" ) {
            document.addEventListener( Constant.Event.DOM_CONTENT_LOADED, () : void => onLoadFunc() );
        } else {
            onLoadFunc();
        }
    }
}