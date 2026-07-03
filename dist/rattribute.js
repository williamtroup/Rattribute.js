"use strict";

var t;

(t => {
    function e(t) {
        return t !== null && t !== void 0 && t.toString() !== "";
    }
    t.defined = e;
    function n(t) {
        return e(t) && typeof t === "object";
    }
    t.definedObject = n;
    function r(t) {
        return e(t) && typeof t === "string";
    }
    t.definedString = r;
    function i(t) {
        return e(t) && typeof t === "number";
    }
    t.definedNumber = i;
    function o(t) {
        return e(t) && typeof t === "boolean";
    }
    t.definedBoolean = o;
})(t || (t = {}));

var e;

(e => {
    function n(e, n) {
        return t.definedString(e) ? e : n;
    }
    e.getString = n;
    function r(e, n) {
        return t.definedNumber(e) ? e : n;
    }
    e.getNumber = r;
    function i(e, n) {
        return t.definedObject(e) ? e : n;
    }
    e.getObject = i;
    function o(e, n) {
        return t.definedBoolean(e) ? e : n;
    }
    e.getBoolean = o;
})(e || (e = {}));

var n;

(t => {
    let n;
    (t => {
        function n(t = null) {
            const n = e.getObject(t, {});
            n.responsiveDelay = e.getNumber(n.responsiveDelay, 250);
            n.removeAttributes = e.getBoolean(n.removeAttributes, true);
            n.enabled = e.getBoolean(n.enabled, true);
            n.observationMode = e.getBoolean(n.observationMode, true);
            n.assignMissingIds = e.getBoolean(n.assignMissingIds, false);
            return n;
        }
        t.get = n;
    })(n = t.Options || (t.Options = {}));
})(n || (n = {}));

var r;

(t => {
    let e;
    (t => {
        t.RATTRIBUTE_JS_XS = "data-rattribute-js-xs";
        t.RATTRIBUTE_JS_SM = "data-rattribute-js-sm";
        t.RATTRIBUTE_JS_MD = "data-rattribute-js-md";
        t.RATTRIBUTE_JS_LG = "data-rattribute-js-lg";
        t.RATTRIBUTE_JS_XL = "data-rattribute-js-xl";
        t.RATTRIBUTE_JS_XXL = "data-rattribute-js-xxl";
        t.RATTRIBUTE_JS_XXXL = "data-rattribute-js-xxxl";
        t.RATTRIBUTE_JS_CUSTOM = "data-rattribute-js";
        t.RATTRIBUTE_JS_IGNORE = "data-rattribute-js-ignore";
    })(e = t.CustomAttribute || (t.CustomAttribute = {}));
    let n;
    (t => {
        t.RESIZE = "resize";
        t.DOM_CONTENT_LOADED = "DOMContentLoaded";
    })(n = t.Event || (t.Event = {}));
})(r || (r = {}));

var i;

(t => {
    function e(t) {
        if (document.readyState === "loading") {
            document.addEventListener(r.Event.DOM_CONTENT_LOADED, () => t());
        } else {
            t();
        }
    }
    t.onContentLoaded = e;
})(i || (i = {}));

var o;

(e => {
    let n = null;
    function r(e, r) {
        if (e.observationMode) {
            if (!t.defined(n)) {
                n = new MutationObserver(() => r());
                const t = {
                    attributes: false,
                    childList: true,
                    subtree: true
                };
                n.observe(document.body, t);
            }
        } else {
            n.disconnect();
            n = null;
        }
    }
    e.setup = r;
    function i(e) {
        if (e.observationMode && t.defined(n)) {
            n.disconnect();
            n = null;
        }
    }
    e.destroy = i;
})(o || (o = {}));

(() => {
    let s = {};
    let u = {};
    let f = 0;
    let c = true;
    let a = false;
    function l() {
        let t = false;
        const e = document.getElementsByTagName("*");
        const n = [].slice.call(e);
        const i = n.length;
        for (let e = 0; e < i; e++) {
            if (d(n[e])) {
                t = true;
            }
        }
        if (t) {
            if (!a) {
                window.addEventListener(r.Event.RESIZE, S);
                a = true;
            }
            if (c) {
                R();
            }
        }
    }
    function d(e) {
        let n = false;
        const i = e.getAttribute(r.CustomAttribute.RATTRIBUTE_JS_XS);
        const o = e.getAttribute(r.CustomAttribute.RATTRIBUTE_JS_SM);
        const s = e.getAttribute(r.CustomAttribute.RATTRIBUTE_JS_MD);
        const u = e.getAttribute(r.CustomAttribute.RATTRIBUTE_JS_LG);
        const f = e.getAttribute(r.CustomAttribute.RATTRIBUTE_JS_XL);
        const c = e.getAttribute(r.CustomAttribute.RATTRIBUTE_JS_XXL);
        const a = e.getAttribute(r.CustomAttribute.RATTRIBUTE_JS_XXXL);
        const l = e.getAttribute(r.CustomAttribute.RATTRIBUTE_JS_IGNORE);
        const d = t.definedString(l) && l.toLowerCase() === true.toString().toLowerCase();
        if (!d) {
            if (t.definedString(i)) {
                T(0, e, i, r.CustomAttribute.RATTRIBUTE_JS_XS);
                n = true;
            }
            if (t.definedString(o)) {
                T(576, e, o, r.CustomAttribute.RATTRIBUTE_JS_SM);
                n = true;
            }
            if (t.definedString(s)) {
                T(768, e, s, r.CustomAttribute.RATTRIBUTE_JS_MD);
                n = true;
            }
            if (t.definedString(u)) {
                T(992, e, u, r.CustomAttribute.RATTRIBUTE_JS_LG);
                n = true;
            }
            if (t.definedString(f)) {
                T(1200, e, f, r.CustomAttribute.RATTRIBUTE_JS_XL);
                n = true;
            }
            if (t.definedString(c)) {
                T(1400, e, c, r.CustomAttribute.RATTRIBUTE_JS_XXL);
                n = true;
            }
            if (t.definedString(a)) {
                T(1600, e, a, r.CustomAttribute.RATTRIBUTE_JS_XXXL);
                n = true;
            }
            const l = b(e);
            if (l && !n) {
                n = true;
            }
        }
        return n;
    }
    function b(n) {
        let i = false;
        const o = n.attributes;
        const s = o.length;
        for (let u = 0; u < s; u++) {
            const s = o[u];
            if (t.defined(s)) {
                const o = s.name;
                if (o.startsWith(r.CustomAttribute.RATTRIBUTE_JS_CUSTOM)) {
                    const r = o.split("-");
                    const u = e.getNumber(parseInt(r[r.length - 1]), 0);
                    const f = s.value;
                    if (u > 0 && t.definedString(f)) {
                        T(u, n, f, o);
                        i = true;
                    } else {
                        A(n, o);
                    }
                }
            }
        }
        return i;
    }
    function T(e, n, r, i) {
        if (!Object.prototype.hasOwnProperty.call(u, e.toString())) {
            u[e.toString()] = [];
        }
        const o = g(r);
        const f = m(n, o);
        if (s.assignMissingIds && !t.definedString(n.id)) {
            n.id = `reattribute-${crypto.randomUUID().replaceAll("-", "")}`;
        }
        u[e.toString()].push({
            element: n,
            attributes: o,
            originalAttributes: f
        });
        A(n, i);
    }
    function A(t, e) {
        if (s.removeAttributes) {
            t.removeAttribute(e);
        }
    }
    function g(t) {
        const e = {};
        const n = t.split(";");
        for (const t of n) {
            const [n, r] = t.split("=");
            e[n] = r;
        }
        return e;
    }
    function m(e, n) {
        const i = {};
        const o = e.attributes;
        const s = o.length;
        for (let e = 0; e < s; e++) {
            const n = o[e];
            if (t.defined(n)) {
                const t = n.name;
                const e = n.value;
                if (!t.startsWith(r.CustomAttribute.RATTRIBUTE_JS_CUSTOM)) {
                    i[t] = e;
                }
            }
        }
        for (const t in n) {
            if (Object.prototype.hasOwnProperty.call(n, t) && !Object.prototype.hasOwnProperty.call(i, t)) {
                i[t] = "";
            }
        }
        return i;
    }
    function S() {
        if (c) {
            if (f !== 0) {
                clearTimeout(f);
            }
            f = setTimeout(() => R(), s.responsiveDelay);
        }
    }
    function R() {
        p(_());
    }
    function _() {
        const e = {
            screenWidths: [],
            elements: []
        };
        const n = E();
        const r = n.length;
        for (let i = 0; i < r; i++) {
            const r = n[i];
            if (Object.prototype.hasOwnProperty.call(u, r)) {
                const n = window.innerWidth;
                const i = parseInt(r);
                if (i > 0 && n >= i || i === 0 && n < 576) {
                    const n = u[r];
                    const i = n.length;
                    e.screenWidths.push(r);
                    for (let r = 0; r < i; r++) {
                        const i = n[r];
                        if (t.defined(i.element) && e.elements.indexOf(i.element) === -1) {
                            e.elements.push(i.element);
                            for (const t in i.attributes) {
                                i.element.setAttribute(t, i.attributes[t]);
                            }
                        }
                    }
                }
            }
        }
        return e;
    }
    function p(e) {
        const n = E();
        const r = n.length;
        for (let i = 0; i < r; i++) {
            const r = n[i];
            if (Object.prototype.hasOwnProperty.call(u, r)) {
                if (e.screenWidths.indexOf(r) === -1) {
                    const n = u[r];
                    const i = n.length;
                    for (let r = 0; r < i; r++) {
                        const i = n[r];
                        if (t.defined(i.element) && e.elements.indexOf(i.element) === -1) {
                            for (const e in i.originalAttributes) {
                                const n = i.originalAttributes[e];
                                if (t.definedString(n)) {
                                    i.element.setAttribute(e, n);
                                } else {
                                    i.element.removeAttribute(e);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    function E() {
        return Object.keys(u).sort((t, e) => e.toLowerCase().localeCompare(t.toLowerCase()));
    }
    const O = {
        start: function() {
            if (!c) {
                c = true;
                R();
            }
            return O;
        },
        stop: function() {
            c = false;
            return O;
        },
        fetch: function() {
            if (!s.removeAttributes) {
                u = {};
            }
            l();
            return O;
        },
        refresh: function() {
            if (c) {
                R();
            }
            return O;
        },
        setConfiguration: e => {
            if (t.definedObject(e)) {
                const t = s;
                let r = false;
                for (const n in e) {
                    if (Object.prototype.hasOwnProperty.call(e, n) && Object.prototype.hasOwnProperty.call(t, n) && t[n] !== e[n]) {
                        t[n] = e[n];
                        r = true;
                    }
                }
                if (r) {
                    s = n.Options.get(t);
                    c = s.enabled;
                    o.setup(s, () => l());
                }
            }
            return O;
        },
        getVersion: () => "1.2.0"
    };
    (() => {
        s = n.Options.get();
        c = s.enabled;
        i.onContentLoaded(() => {
            l();
            o.setup(s, () => l());
        });
        if (!t.defined(window.$rattribute)) {
            window.$rattribute = O;
        }
    })();
})();//# sourceMappingURL=rattribute.js.map