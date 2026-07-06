/**
 * Rattribute.js
 * 
 * A lightweight JavaScript library for automatically changing HTML element attributes based on responsive screen sizes.
 * 
 * @file        type.ts
 * @version     v1.3.1
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
};