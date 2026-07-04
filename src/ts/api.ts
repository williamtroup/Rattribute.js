/**
 * Rattribute.js
 * 
 * A JavaScript library that generates responsive attribute setters for any HTML element.
 * 
 * @file        api.ts
 * @version     v1.3.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2026
 */


import { type ConfigurationOptions } from "./type";


export type PublicApi = {
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Public API Functions:  Automation
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    /**
     * start().
     * 
     * Starts the automation.
     * 
     * @public
     * 
     * @returns     {Object}                                                The Rattribute.js class instance.
     */
    start: () => PublicApi;

    /**
     * stop().
     * 
     * Stops the automation.
     * 
     * @public
     * 
     * @returns     {Object}                                                The Rattribute.js class instance.
     */
    stop: () => PublicApi;

    /**
     * fetch().
     * 
     * Fetches all new elements added to the DOM and sets them up.
     * 
     * @public
     * 
     * @returns     {Object}                                                The Rattribute.js class instance.
     */
    fetch: () => PublicApi;

    /**
     * refresh().
     * 
     * Refreshes all the elements.
     * 
     * @public
     * 
     * @returns     {Object}                                                The Rattribute.js class instance.
     */
    refresh: () => PublicApi;

    /**
     * getElements().
     * 
     * Gets all the elements setup.
     * 
     * @public
     * 
     * @returns     {Object[]}                                              The array of elements.
     */
    getElements: () => HTMLElement[];


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Public API Functions:  Configuration
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    /**
     * setConfiguration().
     * 
     * Sets the specific configuration options that should be used.
     * 
     * @public
     * 
     * @param       {Object}    configurationOptions                        All the configuration options that should be set (refer to "Configuration Options" documentation for properties).
     * 
     * @returns     {Object}                                                The Rattribute.js class instance.
     */
    setConfiguration: ( configurationOptions: ConfigurationOptions ) => PublicApi;


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Public API Functions:  Additional Data
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    /**
     * getVersion().
     * 
     * Returns the version of Rattribute.js.
     * 
     * @public
     * 
     * @returns     {string}                                                The version number.
     */
    getVersion: () => string;
};

declare global {
	interface Window {
		$rattribute: PublicApi;
	}
}