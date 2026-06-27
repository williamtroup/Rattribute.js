/**
 * Rattribute.js

 * 
 * A JavaScript library that generates responsive attribute setters for any HTML element.
 * 
 * @file        rattribute.ts
 * @version     v1.0.0
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
import { Observation } from "./ts/data/observation";
import { Default } from "./ts/data/default";


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

        const attributeSmData: string = element.getAttribute( Constant.CustomAttribute.RATTRIBUTE_JS_SM )!;
        const attributeMdData: string = element.getAttribute( Constant.CustomAttribute.RATTRIBUTE_JS_MD )!;
        const attributeLgData: string = element.getAttribute( Constant.CustomAttribute.RATTRIBUTE_JS_LG )!;
        const attributeXlData: string = element.getAttribute( Constant.CustomAttribute.RATTRIBUTE_JS_XL )!;
        const attributeXxlData: string = element.getAttribute( Constant.CustomAttribute.RATTRIBUTE_JS_XXL )!;

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

        findCustomSizeAttributes( element );

        return added;
    }

    function findCustomSizeAttributes( element: HTMLElement ) : void {
        const elementAttributes: NamedNodeMap = element.attributes;
        const elementAttributesLength: number = elementAttributes.length;

        for ( let elementAttributeIndex = 0; elementAttributeIndex < elementAttributesLength; elementAttributeIndex++ ) {
            const attribute: Attr = elementAttributes[ elementAttributeIndex ];
            const attributeName: string = attribute.name;

            if ( attributeName.startsWith( Constant.CustomAttribute.RATTRIBUTE_JS_CUSTOM ) ) {
                const attributeNameParts: string[] = attributeName.split( Char.dash );
                const attributeWidth: number = Default.getNumber( parseInt( attributeNameParts[ attributeNameParts.length - 1 ] ), 0 );
                const attributeValue: string = attribute.value;

                if ( attributeWidth > 0 && Is.definedString( attributeValue ) ) {
                    addElementToScreenWidthElements( attributeWidth, element, attributeValue, attributeName );
                } else {
                    removeAttributesFromElement( element, attributeName );
                }
            }
        }
    }

    function addElementToScreenWidthElements( screenSize: number, element: HTMLElement, attributeValue: string, attributeName: string ) : void {
        if ( !Object.prototype.hasOwnProperty.call( _screenWidthElements, screenSize.toString() ) ) {
            _screenWidthElements[ screenSize.toString() ] = [];
        }

        _screenWidthElements[ screenSize.toString() ].push( {
            element: element,
            attributes: getNewAttributes( attributeValue ),
            originalAttributes: getOriginalAttributes( element ),
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

    function getOriginalAttributes( element: HTMLElement ) : Record<string, string> {
        const result: Record<string, string> = {};
        const attributes: NamedNodeMap = element.attributes;
        const attributesLength: number = attributes.length;

        for ( let attributeIndex = 0; attributeIndex < attributesLength; attributeIndex++ ) {
            const attribute: Attr = attributes[ attributeIndex ];
            const attributeName: string = attribute.name;
            const attributeValue: string = attribute.value;

            result[ attributeName ] = attributeValue;
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

        for ( let screenWidthIndex = 0; screenWidthIndex < screenWidthsLength; screenWidthIndex++ ) {
            const screenWidth: string = screenWidths[ screenWidthIndex ];

            if ( Object.prototype.hasOwnProperty.call( _screenWidthElements, screenWidth ) ) {
                const windowWidth: number = window.innerWidth;
                const windowCheckWidth: number = parseInt( screenWidth );

                if ( windowWidth >= windowCheckWidth ) {
                    const allElementOptions: ElementOptions[] = _screenWidthElements[ screenWidth ];
                    const allElementOptionsLength: number = allElementOptions.length;

                    elementsProcessed.screenWidths.push( screenWidth );

                    for ( let elementOptionIndex = 0; elementOptionIndex < allElementOptionsLength; elementOptionIndex++ ) {
                        const elementOptions: ElementOptions = allElementOptions[ elementOptionIndex ];

                        if ( elementsProcessed.elements.indexOf( elementOptions.element ) === Value.notFound ) {
                            elementsProcessed.elements.push( elementOptions.element );
                            //elementOptions.element.setAttribute( Constant.Attribute.TARGET, elementOptions.newTarget! );
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

        for ( let screenWidthIndex = 0; screenWidthIndex < screenWidthsLength; screenWidthIndex++ ) {
            const screenWidth: string = screenWidths[ screenWidthIndex ];

            if ( Object.prototype.hasOwnProperty.call( _screenWidthElements, screenWidth ) ) {
                if ( elementsProcessed.screenWidths.indexOf( screenWidth ) === Value.notFound ) {
                    const allElementOptions: ElementOptions[] = _screenWidthElements[ screenWidth ];
                    const allElementOptionsLength: number = allElementOptions.length;

                    for ( let elementOptionIndex = 0; elementOptionIndex < allElementOptionsLength; elementOptionIndex++ ) {
                        const elementOptions: ElementOptions = allElementOptions[ elementOptionIndex ];

                        if ( elementsProcessed.elements.indexOf( elementOptions.element ) === Value.notFound ) {
                            /*let originalTarget: string | null = elementOptions.originalTarget!;

                            if ( !Is.definedString( originalTarget ) ) {
                                originalTarget = _configurationOptions.defaultTarget!;
                            }

                            elementOptions.element.setAttribute( Constant.Attribute.TARGET, originalTarget );*/
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
        * Public API Functions:  Control
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
            return "1.0.0";
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