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
    function o(t) {
        return e(t) && typeof t === "string";
    }
    t.definedString = o;
    function r(t) {
        return e(t) && typeof t === "number";
    }
    t.definedNumber = r;
    function i(t) {
        return e(t) && typeof t === "boolean";
    }
    t.definedBoolean = i;
})(t || (t = {}));

var e;

(e => {
    function n(e, n) {
        return t.definedString(e) ? e : n;
    }
    e.getString = n;
    function o(e, n) {
        return t.definedNumber(e) ? e : n;
    }
    e.getNumber = o;
    function r(e, n) {
        return t.definedObject(e) ? e : n;
    }
    e.getObject = r;
    function i(e, n) {
        return t.definedBoolean(e) ? e : n;
    }
    e.getBoolean = i;
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
            return n;
        }
        t.get = n;
    })(n = t.Options || (t.Options = {}));
})(n || (n = {}));

var o;

(t => {
    let e;
    (t => {
        t.RATTRIBUTE_JS_XS = "data-rattribute-js-xs";
        t.RATTRIBUTE_JS_SM = "data-rattribute-js-sm";
        t.RATTRIBUTE_JS_MD = "data-rattribute-js-md";
        t.RATTRIBUTE_JS_LG = "data-rattribute-js-lg";
        t.RATTRIBUTE_JS_XL = "data-rattribute-js-xl";
        t.RATTRIBUTE_JS_XXL = "data-rattribute-js-xxl";
        t.RATTRIBUTE_JS_CUSTOM = "data-rattribute-js";
        t.RATTRIBUTE_JS_IGNORE = "data-rattribute-js-ignore";
    })(e = t.CustomAttribute || (t.CustomAttribute = {}));
    let n;
    (t => {
        t.RESIZE = "resize";
        t.DOM_CONTENT_LOADED = "DOMContentLoaded";
    })(n = t.Event || (t.Event = {}));
})(o || (o = {}));

var r;

(t => {
    function e(t) {
        if (document.readyState === "loading") {
            document.addEventListener(o.Event.DOM_CONTENT_LOADED, () => t());
        } else {
            t();
        }
    }
    t.onContentLoaded = e;
})(r || (r = {}));

var i;

(e => {
    let n = null;
    function o(e, o) {
        if (e.observationMode) {
            if (!t.defined(n)) {
                n = new MutationObserver(() => o());
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
    e.setup = o;
    function r(e) {
        if (e.observationMode && t.defined(n)) {
            n.disconnect();
            n = null;
        }
    }
    e.destroy = r;
})(i || (i = {}));

(() => {
    let s = {};
    let u = {};
    let c = 0;
    let f = true;
    let a = false;
    function l() {
        let t = false;
        const e = document.getElementsByTagName("*");
        const n = [].slice.call(e);
        const r = n.length;
        for (let e = 0; e < r; e++) {
            if (d(n[e])) {
                t = true;
            }
        }
        if (t) {
            if (!a) {
                window.addEventListener(o.Event.RESIZE, S);
                a = true;
            }
            if (f) {
                R();
            }
        }
    }
    function d(e) {
        let n = false;
        const r = e.getAttribute(o.CustomAttribute.RATTRIBUTE_JS_XS);
        const i = e.getAttribute(o.CustomAttribute.RATTRIBUTE_JS_SM);
        const s = e.getAttribute(o.CustomAttribute.RATTRIBUTE_JS_MD);
        const u = e.getAttribute(o.CustomAttribute.RATTRIBUTE_JS_LG);
        const c = e.getAttribute(o.CustomAttribute.RATTRIBUTE_JS_XL);
        const f = e.getAttribute(o.CustomAttribute.RATTRIBUTE_JS_XXL);
        const a = e.getAttribute(o.CustomAttribute.RATTRIBUTE_JS_IGNORE);
        const l = t.definedString(a) && a.toLowerCase() === "true";
        if (!l) {
            if (t.definedString(r)) {
                T(0, e, r, o.CustomAttribute.RATTRIBUTE_JS_XS);
                n = true;
            }
            if (t.definedString(i)) {
                T(576, e, i, o.CustomAttribute.RATTRIBUTE_JS_SM);
                n = true;
            }
            if (t.definedString(s)) {
                T(768, e, s, o.CustomAttribute.RATTRIBUTE_JS_MD);
                n = true;
            }
            if (t.definedString(u)) {
                T(992, e, u, o.CustomAttribute.RATTRIBUTE_JS_LG);
                n = true;
            }
            if (t.definedString(c)) {
                T(1200, e, c, o.CustomAttribute.RATTRIBUTE_JS_XL);
                n = true;
            }
            if (t.definedString(f)) {
                T(1400, e, f, o.CustomAttribute.RATTRIBUTE_JS_XXL);
                n = true;
            }
            b(e);
        }
        return n;
    }
    function b(n) {
        const r = n.attributes;
        const i = r.length;
        for (let s = 0; s < i; s++) {
            const i = r[s];
            if (t.defined(i)) {
                const r = i.name;
                if (r.startsWith(o.CustomAttribute.RATTRIBUTE_JS_CUSTOM)) {
                    const o = r.split("-");
                    const s = e.getNumber(parseInt(o[o.length - 1]), 0);
                    const u = i.value;
                    if (s > 0 && t.definedString(u)) {
                        T(s, n, u, r);
                    } else {
                        A(n, r);
                    }
                }
            }
        }
    }
    function T(t, e, n, o) {
        if (!Object.prototype.hasOwnProperty.call(u, t.toString())) {
            u[t.toString()] = [];
        }
        const r = g(n);
        const i = m(e, r);
        u[t.toString()].push({
            element: e,
            attributes: r,
            originalAttributes: i
        });
        A(e, o);
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
            const [n, o] = t.split("=");
            e[n] = o;
        }
        return e;
    }
    function m(e, n) {
        const r = {};
        const i = e.attributes;
        const s = i.length;
        for (let e = 0; e < s; e++) {
            const n = i[e];
            if (t.defined(n)) {
                const t = n.name;
                const e = n.value;
                if (!t.startsWith(o.CustomAttribute.RATTRIBUTE_JS_CUSTOM)) {
                    r[t] = e;
                }
            }
        }
        for (const t in n) {
            if (Object.prototype.hasOwnProperty.call(n, t) && !Object.prototype.hasOwnProperty.call(r, t)) {
                r[t] = "";
            }
        }
        return r;
    }
    function S() {
        if (f) {
            if (c !== 0) {
                clearTimeout(c);
            }
            c = setTimeout(() => R(), s.responsiveDelay);
        }
    }
    function R() {
        p(_());
    }
    function _() {
        const t = {
            screenWidths: [],
            elements: []
        };
        const e = E();
        const n = e.length;
        for (let o = 0; o < n; o++) {
            const n = e[o];
            if (Object.prototype.hasOwnProperty.call(u, n)) {
                const e = window.innerWidth;
                const o = parseInt(n);
                if (o > 0 && e >= o || o === 0 && e < 576) {
                    const e = u[n];
                    const o = e.length;
                    t.screenWidths.push(n);
                    for (let n = 0; n < o; n++) {
                        const o = e[n];
                        if (t.elements.indexOf(o.element) === -1) {
                            t.elements.push(o.element);
                            for (const t in o.attributes) {
                                o.element.setAttribute(t, o.attributes[t]);
                            }
                        }
                    }
                }
            }
        }
        return t;
    }
    function p(e) {
        const n = E();
        const o = n.length;
        for (let r = 0; r < o; r++) {
            const o = n[r];
            if (Object.prototype.hasOwnProperty.call(u, o)) {
                if (e.screenWidths.indexOf(o) === -1) {
                    const n = u[o];
                    const r = n.length;
                    for (let o = 0; o < r; o++) {
                        const r = n[o];
                        if (e.elements.indexOf(r.element) === -1) {
                            for (const e in r.originalAttributes) {
                                const n = r.originalAttributes[e];
                                if (t.definedString(n)) {
                                    r.element.setAttribute(e, n);
                                } else {
                                    r.element.removeAttribute(e);
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
            if (!f) {
                f = true;
                R();
            }
            return O;
        },
        stop: function() {
            f = false;
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
            if (f) {
                R();
            }
            return O;
        },
        setConfiguration: e => {
            if (t.definedObject(e)) {
                const t = s;
                let o = false;
                for (const n in e) {
                    if (Object.prototype.hasOwnProperty.call(e, n) && Object.prototype.hasOwnProperty.call(t, n) && t[n] !== e[n]) {
                        t[n] = e[n];
                        o = true;
                    }
                }
                if (o) {
                    s = n.Options.get(t);
                    f = s.enabled;
                    i.setup(s, () => l());
                }
            }
            return O;
        },
        getVersion: () => "1.1.0"
    };
    (() => {
        s = n.Options.get();
        f = s.enabled;
        r.onContentLoaded(() => {
            l();
            i.setup(s, () => l());
        });
        if (!t.defined(window.$rattribute)) {
            window.$rattribute = O;
        }
    })();
})();//# sourceMappingURL=rattribute.esm.js.map