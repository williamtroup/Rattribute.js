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
    function o(t) {
        return e(t) && typeof t === "number";
    }
    t.definedNumber = o;
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
    function r(e, n) {
        return t.definedNumber(e) ? e : n;
    }
    e.getNumber = r;
    function o(e, n) {
        return t.definedObject(e) ? e : n;
    }
    e.getObject = o;
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

var o;

(t => {
    function e(t) {
        if (document.readyState === "loading") {
            document.addEventListener(r.Event.DOM_CONTENT_LOADED, () => t());
        } else {
            t();
        }
    }
    t.onContentLoaded = e;
})(o || (o = {}));

var i;

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
    function o(e) {
        if (e.observationMode && t.defined(n)) {
            n.disconnect();
            n = null;
        }
    }
    e.destroy = o;
})(i || (i = {}));

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
        const o = n.length;
        for (let e = 0; e < o; e++) {
            if (d(n[e])) {
                t = true;
            }
        }
        if (t) {
            if (!a) {
                window.addEventListener(r.Event.RESIZE, _);
                a = true;
            }
            if (c) {
                m();
            }
        }
    }
    function d(e) {
        let n = false;
        const o = e.getAttribute(r.CustomAttribute.RATTRIBUTE_JS_XS);
        const i = e.getAttribute(r.CustomAttribute.RATTRIBUTE_JS_SM);
        const s = e.getAttribute(r.CustomAttribute.RATTRIBUTE_JS_MD);
        const u = e.getAttribute(r.CustomAttribute.RATTRIBUTE_JS_LG);
        const f = e.getAttribute(r.CustomAttribute.RATTRIBUTE_JS_XL);
        const c = e.getAttribute(r.CustomAttribute.RATTRIBUTE_JS_XXL);
        const a = e.getAttribute(r.CustomAttribute.RATTRIBUTE_JS_XXXL);
        const l = e.getAttribute(r.CustomAttribute.RATTRIBUTE_JS_IGNORE);
        const d = t.definedString(l) && l.toLowerCase() === "true";
        if (!d) {
            if (t.definedString(o)) {
                T(0, e, o, r.CustomAttribute.RATTRIBUTE_JS_XS);
                n = true;
            }
            if (t.definedString(i)) {
                T(576, e, i, r.CustomAttribute.RATTRIBUTE_JS_SM);
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
        let o = false;
        const i = n.attributes;
        const s = i.length;
        for (let u = 0; u < s; u++) {
            const s = i[u];
            if (t.defined(s)) {
                const i = s.name;
                if (i.startsWith(r.CustomAttribute.RATTRIBUTE_JS_CUSTOM)) {
                    const r = i.split("-");
                    const u = e.getNumber(parseInt(r[r.length - 1]), 0);
                    const f = s.value;
                    if (u > 0 && t.definedString(f)) {
                        T(u, n, f, i);
                        o = true;
                    } else {
                        A(n, i);
                    }
                }
            }
        }
        return o;
    }
    function T(t, e, n, r) {
        if (!Object.prototype.hasOwnProperty.call(u, t.toString())) {
            u[t.toString()] = [];
        }
        const o = g(n);
        const i = R(e, o);
        u[t.toString()].push({
            element: e,
            attributes: o,
            originalAttributes: i
        });
        A(e, r);
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
    function R(e, n) {
        const o = {};
        const i = e.attributes;
        const s = i.length;
        for (let e = 0; e < s; e++) {
            const n = i[e];
            if (t.defined(n)) {
                const t = n.name;
                const e = n.value;
                if (!t.startsWith(r.CustomAttribute.RATTRIBUTE_JS_CUSTOM)) {
                    o[t] = e;
                }
            }
        }
        for (const t in n) {
            if (Object.prototype.hasOwnProperty.call(n, t) && !Object.prototype.hasOwnProperty.call(o, t)) {
                o[t] = "";
            }
        }
        return o;
    }
    function _() {
        if (c) {
            if (f !== 0) {
                clearTimeout(f);
            }
            f = setTimeout(() => m(), s.responsiveDelay);
        }
    }
    function m() {
        p(S());
    }
    function S() {
        const t = {
            screenWidths: [],
            elements: []
        };
        const e = E();
        const n = e.length;
        for (let r = 0; r < n; r++) {
            const n = e[r];
            if (Object.prototype.hasOwnProperty.call(u, n)) {
                const e = window.innerWidth;
                const r = parseInt(n);
                if (r > 0 && e >= r || r === 0 && e < 576) {
                    const e = u[n];
                    const r = e.length;
                    t.screenWidths.push(n);
                    for (let n = 0; n < r; n++) {
                        const r = e[n];
                        if (t.elements.indexOf(r.element) === -1) {
                            t.elements.push(r.element);
                            for (const t in r.attributes) {
                                r.element.setAttribute(t, r.attributes[t]);
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
        const r = n.length;
        for (let o = 0; o < r; o++) {
            const r = n[o];
            if (Object.prototype.hasOwnProperty.call(u, r)) {
                if (e.screenWidths.indexOf(r) === -1) {
                    const n = u[r];
                    const o = n.length;
                    for (let r = 0; r < o; r++) {
                        const o = n[r];
                        if (e.elements.indexOf(o.element) === -1) {
                            for (const e in o.originalAttributes) {
                                const n = o.originalAttributes[e];
                                if (t.definedString(n)) {
                                    o.element.setAttribute(e, n);
                                } else {
                                    o.element.removeAttribute(e);
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
                m();
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
                m();
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
                    i.setup(s, () => l());
                }
            }
            return O;
        },
        getVersion: () => "1.2.0"
    };
    (() => {
        s = n.Options.get();
        c = s.enabled;
        o.onContentLoaded(() => {
            l();
            i.setup(s, () => l());
        });
        if (!t.defined(window.$rattribute)) {
            window.$rattribute = O;
        }
    })();
})();//# sourceMappingURL=rattribute.esm.js.map