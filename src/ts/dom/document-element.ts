/**
 * Rattribute.js
 * 
 * A lightweight JavaScript library for automatically changing HTML element attributes based on responsive screen sizes.
 * 
 * @file        document-element.ts
 * @version     v1.3.0
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