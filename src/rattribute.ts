/**
 * Rattribute.js
 * 
 * A JavaScript library that generates responsive attribute setters for any HTML element.
 * 
 * @file        rattribute.ts
 * @version     v1.2.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2026
 */


import {
    type ElementsProcessed,
    type ElementOptions,
    type ConfigurationOptions } from "./ts/type";

import { type PublicApi } from "./ts/api";

import { Is } from "./ts/data/is";
import { Configuration } from "./ts/options/config";
import { DocumentElement } from "./ts/dom/document-element";
import { Constant } from "./ts/constant";
import { Char, ScreenSize, Value } from "./ts/data/enum";
import { Default } from "./ts/data/default";
import { Observation } from "./ts/data/observation";


( () : void => {
    // Variables: Configuration
    let _configurationOptions: ConfigurationOptions = {} as ConfigurationOptions;

    // Variables: Elements
    let _screenWidthElements: Record<string, ElementOptions[]> = {};
    let _screenWidthChangeTimer: number = 0;
    let _enabled: boolean = true;
    let _windowEventListenerAdded: boolean = false;
    

    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Fetching
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function fetchAll() : void {
        let elementsFound: boolean = false;

        const domElements: HTMLCollectionOf<Element> = document.getElementsByTagName( "*" );
        const elements: HTMLElement[] = [].slice.call( domElements );
        const elementsLength: number = elements.length;

        for ( let elementIndex: number = 0; elementIndex < elementsLength; elementIndex++ ) {
            if ( processElement( elements[ elementIndex ] as HTMLElement ) ) {
                elementsFound = true;
            }
        }

        if ( elementsFound ) {
            if ( !_windowEventListenerAdded ) {
                window.addEventListener( Constant.Event.RESIZE, onWindowResize );

                _windowEventListenerAdded = true;
            }

            if ( _enabled ) {
                updateElements();
            }
        }
    }

    function processElement( element: HTMLElement ) : boolean {
        let added: boolean = false;

        const attributeXsData: string = element.getAttribute( Constant.CustomAttribute.RATTRIBUTE_JS_XS )!;
        const attributeSmData: string = element.getAttribute( Constant.CustomAttribute.RATTRIBUTE_JS_SM )!;
        const attributeMdData: string = element.getAttribute( Constant.CustomAttribute.RATTRIBUTE_JS_MD )!;
        const attributeLgData: string = element.getAttribute( Constant.CustomAttribute.RATTRIBUTE_JS_LG )!;
        const attributeXlData: string = element.getAttribute( Constant.CustomAttribute.RATTRIBUTE_JS_XL )!;
        const attributeXxlData: string = element.getAttribute( Constant.CustomAttribute.RATTRIBUTE_JS_XXL )!;
        const attributeXxxlData: string = element.getAttribute( Constant.CustomAttribute.RATTRIBUTE_JS_XXXL )!;
        const attributeIgnoreData: string = element.getAttribute( Constant.CustomAttribute.RATTRIBUTE_JS_IGNORE )!;

        const ignore: boolean = Is.definedString( attributeIgnoreData ) && attributeIgnoreData.toLowerCase() === true.toString().toLowerCase();

        if ( !ignore ) {
            if ( Is.definedString( attributeXsData ) ) {
                addElementToScreenWidthElements( ScreenSize.xs, element, attributeXsData, Constant.CustomAttribute.RATTRIBUTE_JS_XS );
                added = true;
            }

            if ( Is.definedString( attributeSmData ) ) {
                addElementToScreenWidthElements( ScreenSize.sm, element, attributeSmData, Constant.CustomAttribute.RATTRIBUTE_JS_SM );
                added = true;
            }

            if ( Is.definedString( attributeMdData ) ) {
                addElementToScreenWidthElements( ScreenSize.md, element, attributeMdData, Constant.CustomAttribute.RATTRIBUTE_JS_MD );
                added = true;
            }

            if ( Is.definedString( attributeLgData ) ) {
                addElementToScreenWidthElements( ScreenSize.lg, element, attributeLgData, Constant.CustomAttribute.RATTRIBUTE_JS_LG );
                added = true;
            }

            if ( Is.definedString( attributeXlData ) ) {
                addElementToScreenWidthElements( ScreenSize.xl, element, attributeXlData, Constant.CustomAttribute.RATTRIBUTE_JS_XL );
                added = true;
            }

            if ( Is.definedString( attributeXxlData ) ) {
                addElementToScreenWidthElements( ScreenSize.xxl, element, attributeXxlData, Constant.CustomAttribute.RATTRIBUTE_JS_XXL );
                added = true;
            }

            if ( Is.definedString( attributeXxxlData ) ) {
                addElementToScreenWidthElements( ScreenSize.xxxl, element, attributeXxxlData, Constant.CustomAttribute.RATTRIBUTE_JS_XXXL );
                added = true;
            }

            const hasCustomSizeAttributesBeenFound: boolean = findCustomSizeAttributes( element );

            if ( hasCustomSizeAttributesBeenFound && !added ) {
                added = true;
            }
        }

        return added;
    }

    function findCustomSizeAttributes( element: HTMLElement ) : boolean {
        let added: boolean = false;
        const elementAttributes: NamedNodeMap = element.attributes;
        const elementAttributesLength: number = elementAttributes.length;

        for ( let elementAttributeIndex: number = 0; elementAttributeIndex < elementAttributesLength; elementAttributeIndex++ ) {
            const attribute: Attr = elementAttributes[ elementAttributeIndex ];

            if ( Is.defined( attribute ) ) {
                const attributeName: string = attribute.name;

                if ( attributeName.startsWith( Constant.CustomAttribute.RATTRIBUTE_JS_CUSTOM ) ) {
                    const attributeNameParts: string[] = attributeName.split( Char.dash );
                    const attributeWidth: number = Default.getNumber( parseInt( attributeNameParts[ attributeNameParts.length - 1 ] ), 0 );
                    const attributeValue: string = attribute.value;

                    if ( attributeWidth > 0 && Is.definedString( attributeValue ) ) {
                        addElementToScreenWidthElements( attributeWidth, element, attributeValue, attributeName );
                        added = true;

                    } else {
                        removeAttributesFromElement( element, attributeName );
                    }
                }
            }
        }

        return added;
    }

    function addElementToScreenWidthElements( screenSize: number, element: HTMLElement, attributeValue: string, attributeName: string ) : void {
        if ( !Object.prototype.hasOwnProperty.call( _screenWidthElements, screenSize.toString() ) ) {
            _screenWidthElements[ screenSize.toString() ] = [];
        }

        const newAttributes: Record<string, string> = getNewAttributes( attributeValue );
        const originalAttributes: Record<string, string> = getOriginalAttributes( element, newAttributes );

        if ( _configurationOptions.assignMissingIds && !Is.definedString( element.id ) ) {
            element.id = `reattribute-${crypto.randomUUID().replaceAll( Char.dash, Char.empty )}`;
        }

        _screenWidthElements[ screenSize.toString() ].push( {
            element: element,
            attributes: newAttributes,
            originalAttributes: originalAttributes,
        } as ElementOptions );

        removeAttributesFromElement( element, attributeName );
    }

    function removeAttributesFromElement( element: HTMLElement, attributeName: string ) : void {
        if ( _configurationOptions.removeAttributes ) {
            element.removeAttribute( attributeName );
        }
    }

    function getNewAttributes( newAttributes: string ) : Record<string, string> {
        const result: Record<string, string> = {};
        const newAttributesSetters: string[] = newAttributes.split( Char.semiColon );

        for ( const newAttributeSetter of newAttributesSetters ) {
            const [ attributeName, attributeValue ] = newAttributeSetter.split( Char.equals );
            
            result[ attributeName ] = attributeValue;
        }

        return result;
    }

    function getOriginalAttributes( element: HTMLElement, newAttributes: Record<string, string> ) : Record<string, string> {
        const result: Record<string, string> = {};
        const attributes: NamedNodeMap = element.attributes;
        const attributesLength: number = attributes.length;

        for ( let attributeIndex: number = 0; attributeIndex < attributesLength; attributeIndex++ ) {
            const attribute: Attr = attributes[ attributeIndex ];

            if ( Is.defined( attribute ) ) {
                const attributeName: string = attribute.name;
                const attributeValue: string = attribute.value;

                if ( !attributeName.startsWith( Constant.CustomAttribute.RATTRIBUTE_JS_CUSTOM ) ) {
                    result[ attributeName ] = attributeValue;
                }
            }    
        }

        for ( const newAttributeName in newAttributes ) {
            if ( Object.prototype.hasOwnProperty.call( newAttributes, newAttributeName ) && !Object.prototype.hasOwnProperty.call( result, newAttributeName ) ) {
                result[ newAttributeName ] = Char.empty;
            }
        }

        return result;
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Window Resizing
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function onWindowResize() : void {
        if ( _enabled ) {
            if ( _screenWidthChangeTimer !== 0 ) {
                clearTimeout( _screenWidthChangeTimer );
            }

            _screenWidthChangeTimer = setTimeout( () => updateElements(), _configurationOptions.responsiveDelay! );
        }
    }

    function updateElements() : void {
        updateElementAttributesNotProcessed( updateElementAttributes() );
    }

    function updateElementAttributes() : ElementsProcessed {
        const elementsProcessed: ElementsProcessed = {
            screenWidths: [],
            elements: [],
        };

        const screenWidths: string[] = getSortedScreenWidths();
        const screenWidthsLength: number = screenWidths.length;

        for ( let screenWidthIndex: number = 0; screenWidthIndex < screenWidthsLength; screenWidthIndex++ ) {
            const screenWidth: string = screenWidths[ screenWidthIndex ];

            if ( Object.prototype.hasOwnProperty.call( _screenWidthElements, screenWidth ) ) {
                const windowWidth: number = window.innerWidth;
                const windowCheckWidth: number = parseInt( screenWidth );

                if ( ( windowCheckWidth > 0 && windowWidth >= windowCheckWidth ) || ( windowCheckWidth === 0 && windowWidth < ScreenSize.sm ) ) {
                    const allElementOptions: ElementOptions[] = _screenWidthElements[ screenWidth ];
                    const allElementOptionsLength: number = allElementOptions.length;

                    elementsProcessed.screenWidths.push( screenWidth );

                    for ( let elementOptionIndex: number = 0; elementOptionIndex < allElementOptionsLength; elementOptionIndex++ ) {
                        const elementOptions: ElementOptions = allElementOptions[ elementOptionIndex ];

                        if ( Is.defined( elementOptions.element ) && elementsProcessed.elements.indexOf( elementOptions.element ) === Value.notFound ) {
                            elementsProcessed.elements.push( elementOptions.element );

                            for ( const attribute in elementOptions.attributes ) {
                                let attributeValue: string = elementOptions.attributes[ attribute ];

                                if ( attributeValue.indexOf( Char.openParenthesis ) > Value.notFound && attributeValue.endsWith( Char.closeParenthesis ) ) {
                                    attributeValue = Default.getObjectFromFunction( attributeValue );
                                }

                                elementOptions.element.setAttribute( attribute, attributeValue );
                            }
                        }
                    }
                }
            }
        }

        return elementsProcessed;
    }

    function updateElementAttributesNotProcessed( elementsProcessed: ElementsProcessed ) : void {
        const screenWidths: string[] = getSortedScreenWidths();
        const screenWidthsLength: number = screenWidths.length;

        for ( let screenWidthIndex: number = 0; screenWidthIndex < screenWidthsLength; screenWidthIndex++ ) {
            const screenWidth: string = screenWidths[ screenWidthIndex ];

            if ( Object.prototype.hasOwnProperty.call( _screenWidthElements, screenWidth ) ) {
                if ( elementsProcessed.screenWidths.indexOf( screenWidth ) === Value.notFound ) {
                    const allElementOptions: ElementOptions[] = _screenWidthElements[ screenWidth ];
                    const allElementOptionsLength: number = allElementOptions.length;

                    for ( let elementOptionIndex: number = 0; elementOptionIndex < allElementOptionsLength; elementOptionIndex++ ) {
                        const elementOptions: ElementOptions = allElementOptions[ elementOptionIndex ];

                        if ( Is.defined( elementOptions.element ) && elementsProcessed.elements.indexOf( elementOptions.element ) === Value.notFound ) {
                            for ( const attribute in elementOptions.originalAttributes ) {
                                let originalAttributeValue: string = elementOptions.originalAttributes[ attribute ];

                                if ( originalAttributeValue.indexOf( Char.openParenthesis ) > Value.notFound && originalAttributeValue.endsWith( Char.closeParenthesis ) ) {
                                    originalAttributeValue = Default.getObjectFromFunction( originalAttributeValue );
                                }

                                if ( Is.definedString( originalAttributeValue ) ) {
                                    elementOptions.element.setAttribute( attribute, originalAttributeValue );
                                } else {
                                    elementOptions.element.removeAttribute( attribute );
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    function getSortedScreenWidths() : string[] {
        return Object.keys( _screenWidthElements ).sort( ( optionA: string, optionB: string ) : number => 
            optionB.toLowerCase().localeCompare( optionA.toLowerCase() )
        );
    }


	/*
	 * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 * Public API Functions:
	 * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 */

    const _public: PublicApi = {
        /*
        * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        * Public API Functions:  Automation
        * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        */

        start: function () : PublicApi {
            if ( !_enabled ) {
                _enabled = true;

                updateElements();
            }

            return _public;
        },
        
        stop: function () : PublicApi {
            _enabled = false;

            return _public;
        },

        fetch: function () : PublicApi {
            if ( !_configurationOptions.removeAttributes ) {
                _screenWidthElements = {} as Record<string, ElementOptions[]>;
            }

            fetchAll();

            return _public;
        },

        refresh: function () : PublicApi {
            if ( _enabled ) {
                updateElements();
            }

            return _public;
        },


        /*
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         * Public API Functions:  Configuration
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         */

        setConfiguration: ( configurationOptions: ConfigurationOptions ) : PublicApi => {
            if ( Is.definedObject( configurationOptions ) ) {
                const existingConfigurationOptions: ConfigurationOptions = _configurationOptions;
                let configurationOptionsHaveChanged: boolean = false;

                for ( const propertyName in configurationOptions ) {
                    if ( Object.prototype.hasOwnProperty.call( configurationOptions, propertyName ) && Object.prototype.hasOwnProperty.call( existingConfigurationOptions, propertyName ) && existingConfigurationOptions[ propertyName ] !== configurationOptions[ propertyName ] ) {
                        existingConfigurationOptions[ propertyName ] = configurationOptions[ propertyName ];
                        configurationOptionsHaveChanged = true;
                    }
                }

                if ( configurationOptionsHaveChanged ) {
                    _configurationOptions = Configuration.Options.get( existingConfigurationOptions );
                    _enabled = _configurationOptions.enabled!;

                    Observation.setup( _configurationOptions, () : void => fetchAll() );
                }
            }

            return _public;
        },


        /*
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         * Public API Functions:  Additional Data
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         */

        getVersion: () : string => {
            return "1.2.0";
        }
    };

    
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Initialize Rattribute.js

     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    ( () : void => {
        _configurationOptions = Configuration.Options.get();
        _enabled = _configurationOptions.enabled!;
        
        DocumentElement.onContentLoaded( () : void => {
            fetchAll();
            
            Observation.setup( _configurationOptions, () : void => fetchAll() );
        } );

        if ( !Is.defined( window.$rattribute ) ) {
            window.$rattribute = _public;
        }
    } )();
} )();