/**
 * Rattribute.js
 * 
 * A JavaScript library that generates responsive attribute setters for any HTML element.
 * 
 * @file        type.ts
 * @version     v1.3.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2026
 */


export type ConfigurationOptions = {
    responsiveDelay?: number;
    removeAttributes?: boolean;
    enabled?: boolean;
    observationMode?: boolean;
    assignMissingIds?: boolean;
    elementIdPrefix?: string;
};

export type ElementOptions = {
    element: HTMLElement;
    attributes: Record<string, string>;
    originalAttributes: Record<string, string>;
};

export type ElementsProcessed = {
    screenWidths: string[];
    elements: HTMLElement[];
}