/**
 * Rattribute.js
 * 
 * A lightweight JavaScript library for automatically changing HTML element attributes based on responsive screen sizes.
 * 
 * @file        default.ts
 * @version     v1.3.1
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2026
 */


import { Char } from "./enum";
import { Is } from "./is";


export namespace Default {
    export function getAnyString( value: any, defaultValue: string ) : string {
        return typeof value === "string" ? value : defaultValue;
    }
    
    export function getString( value: any, defaultValue: string ) : string {
        return Is.definedString( value ) ? value : defaultValue;
    }

    export function getNumber( value: any, defaultValue: number ) : number {
        return Is.definedNumber( value ) ? value : defaultValue;
    }

    export function getObject( value: any, defaultValue: object ) : any {
        return Is.definedObject( value ) ? value : defaultValue;
    }

    export function getBoolean( value: any, defaultValue: boolean ) : boolean {
        return Is.definedBoolean( value ) ? value : defaultValue;
    }

    export function getObjectFromFunction( functionName: string ) : any {
        let result: any = null;

        const functionNameParts: string[] = functionName.split( Char.openParenthesis );
        let functionNameArguments: string[] = [];

        if ( functionNameParts.length > 1 ) {
            functionNameArguments = functionNameParts[ 1 ]
                .replace( Char.closeParenthesis, Char.empty )
                .replace( Char.semiColon, Char.empty )
                .trim()
                .split( Char.comma );

            if ( functionNameArguments.length === 1 && functionNameArguments[ 0 ] === Char.empty ) {
                functionNameArguments = [];
            }

            if ( functionNameArguments.length > 0 ) {
                const functionNameArgumentsLength: number = functionNameArguments.length;

                for ( let functionNameArgumentIndex = 0; functionNameArgumentIndex < functionNameArgumentsLength; functionNameArgumentIndex++ ) {
                    functionNameArguments[ functionNameArgumentIndex ] = JSON.parse( functionNameArguments[ functionNameArgumentIndex ].trim() );
                }
            }
        }

        const namespaces: string[] = functionNameParts[ 0 ].split( Char.dot );
        const onlyFunctionName: string = namespaces.pop()!;
        let context: any = globalThis;
        let contextFound: boolean = true;

        for ( const namespace of namespaces ) {
            context = context[ namespace ];
            
            if ( !Is.defined( context ) ) {
                contextFound = false;
                break;
            }
        }

        if ( contextFound && Is.definedFunction( context[ onlyFunctionName ] ) ) {
            result = context[ onlyFunctionName ].apply( context, functionNameArguments );
        }

        return result;
    }
}