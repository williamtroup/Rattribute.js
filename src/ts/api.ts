/**
 * Rattribute.js
 * 
 * A lightweight JavaScript library for automatically changing HTML element attributes based on responsive screen sizes.
 * 
 * @file        api.ts
 * @version     v1.3.1
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2026
 */


import { type ConfigurationOptions } from "./type";


export type PublicApi = {
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Public API:  Automation
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

    /**
     * getIgnoredElements().
     * 
     * Gets all the ignored elements.
     * 
     * @public
     * 
     * @returns     {Object[]}                                              The array of ignored elements.
     */
    getIgnoredElements: () => HTMLElement[];

    /**
     * enableIgnoredElements().
     * 
     * Enables all the ignored elements.
     * 
     * @public
     * 
     * @returns     {Object}                                                The Rattribute.js class instance.
     */
    enableIgnoredElements: () => PublicApi;


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Public API:  Configuration
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
     * Public API:  Additional Data
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