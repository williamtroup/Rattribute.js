/**
 * Rattribute.js
 * 
 * A lightweight JavaScript library for automatically changing HTML element attributes based on responsive screen sizes.
 * 
 * @file        enum.ts
 * @version     v1.3.1
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2026
 */


export enum Char {
    empty = "",
    dash = "-",
    semiColon = ";",
    equals = "=",
    dot = ".",
    comma = ",",
    openParenthesis = "(",
    closeParenthesis = ")",
}

export enum Value {
    notFound = -1,
}

export enum ScreenSize {
    xs = 0,
    sm = 576,
    md = 768,
    lg = 992,
    xl = 1200,
    xxl = 1400,
    xxxl = 1600,
}