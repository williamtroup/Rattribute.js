/**
 * Rattribute.js
 * 
 * A lightweight JavaScript library for automatically changing HTML element attributes based on responsive screen sizes.
 * 
 * @file        observation.ts
 * @version     v1.3.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2026
 */


import { type ConfigurationOptions } from "../type";
import { Is } from "../data/is";


export namespace Observation {
    let _mutationObserver: MutationObserver = null! as MutationObserver;

    export function setup( configurationOptions: ConfigurationOptions, mutationFunc: Function ) : void {
        if ( configurationOptions.observationMode ) {
            if ( !Is.defined( _mutationObserver ) ) {
                _mutationObserver = new MutationObserver( () : void => mutationFunc() );

                const observeConfig: MutationObserverInit = {
                    attributes: false,
                    childList: true,
                    subtree: true,
                } as MutationObserverInit;

                _mutationObserver.observe( document.body, observeConfig );
            }
            
        } else {
            disconnect()
        }
    }

    export function destroy( configurationOptions: ConfigurationOptions ) : void {
        if ( configurationOptions.observationMode && Is.defined( _mutationObserver ) ) {
            disconnect();
        }
    }

    function disconnect() : void {
        _mutationObserver.disconnect();
        _mutationObserver = null!;
    }
}