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
    function e(t) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", () => t());
        } else {
            t();
        }
    }
    t.onContentLoaded = e;
})(r || (r = {}));

var o;

(t => {
    let e;
    (t => {
        t.RATTRIBUTE_JS_SM = "data-rattribute-js-sm";
        t.RATTRIBUTE_JS_MD = "data-rattribute-js-md";
        t.RATTRIBUTE_JS_LG = "data-rattribute-js-lg";
        t.RATTRIBUTE_JS_XL = "data-rattribute-js-xl";
        t.RATTRIBUTE_JS_XXL = "data-rattribute-js-xxl";
        t.RATTRIBUTE_JS_CUSTOM = "data-rattribute-js";
    })(e = t.CustomAttribute || (t.CustomAttribute = {}));
    let n;
    (t => {
        t.RESIZE = "resize";
    })(n = t.Event || (t.Event = {}));
})(o || (o = {}));

(() => {
    let i = {};
    let s = {};
    let u = 0;
    let c = true;
    let f = false;
    function a() {
        let t = false;
        const e = document.getElementsByTagName("*");
        const n = [].slice.call(e);
        const r = n.length;
        for (let e = 0; e < r; e++) {
            if (l(n[e])) {
                t = true;
            }
        }
        if (t) {
            if (!f) {
                window.addEventListener(o.Event.RESIZE, A);
                f = true;
            }
            if (c) {
                S();
            }
        }
    }
    function l(e) {
        let n = false;
        const r = e.getAttribute(o.CustomAttribute.RATTRIBUTE_JS_SM);
        const i = e.getAttribute(o.CustomAttribute.RATTRIBUTE_JS_MD);
        const s = e.getAttribute(o.CustomAttribute.RATTRIBUTE_JS_LG);
        const u = e.getAttribute(o.CustomAttribute.RATTRIBUTE_JS_XL);
        const c = e.getAttribute(o.CustomAttribute.RATTRIBUTE_JS_XXL);
        if (t.definedString(r)) {
            b(576, e, r, o.CustomAttribute.RATTRIBUTE_JS_SM);
            n = true;
        }
        if (t.definedString(i)) {
            b(768, e, i, o.CustomAttribute.RATTRIBUTE_JS_MD);
            n = true;
        }
        if (t.definedString(s)) {
            b(992, e, s, o.CustomAttribute.RATTRIBUTE_JS_LG);
            n = true;
        }
        if (t.definedString(u)) {
            b(1200, e, u, o.CustomAttribute.RATTRIBUTE_JS_XL);
            n = true;
        }
        if (t.definedString(c)) {
            b(1400, e, c, o.CustomAttribute.RATTRIBUTE_JS_XXL);
            n = true;
        }
        d(e);
        return n;
    }
    function d(n) {
        const r = n.attributes;
        const i = r.length;
        for (let s = 0; s < i; s++) {
            const i = r[s];
            const u = i.name;
            if (u.startsWith(o.CustomAttribute.RATTRIBUTE_JS_CUSTOM)) {
                const r = u.split("-");
                const o = e.getNumber(parseInt(r[r.length - 1]), 0);
                const s = i.value;
                if (o > 0 && t.definedString(s)) {
                    b(o, n, s, u);
                } else {
                    T(n, u);
                }
            }
        }
    }
    function b(t, e, n, r) {
        if (!Object.prototype.hasOwnProperty.call(s, t.toString())) {
            s[t.toString()] = [];
        }
        s[t.toString()].push({
            element: e,
            attributes: g(n),
            originalAttributes: m(e)
        });
        T(e, r);
    }
    function T(t, e) {
        if (i.removeAttributes) {
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
    function m(t) {
        const e = {};
        const n = t.attributes;
        const r = n.length;
        for (let t = 0; t < r; t++) {
            const r = n[t];
            const i = r.name;
            const s = r.value;
            if (!i.startsWith(o.CustomAttribute.RATTRIBUTE_JS_CUSTOM)) {
                e[i] = s;
            }
        }
        return e;
    }
    function A() {
        if (c) {
            if (u !== 0) {
                clearTimeout(u);
            }
            u = setTimeout(() => S(), i.responsiveDelay);
        }
    }
    function S() {
        p(R());
    }
    function R() {
        const t = {
            screenWidths: [],
            elements: []
        };
        const e = _();
        const n = e.length;
        for (let r = 0; r < n; r++) {
            const n = e[r];
            if (Object.prototype.hasOwnProperty.call(s, n)) {
                const e = window.innerWidth;
                const r = parseInt(n);
                if (e >= r) {
                    const e = s[n];
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
    function p(t) {
        const e = _();
        const n = e.length;
        for (let r = 0; r < n; r++) {
            const n = e[r];
            if (Object.prototype.hasOwnProperty.call(s, n)) {
                if (t.screenWidths.indexOf(n) === -1) {
                    const e = s[n];
                    const r = e.length;
                    for (let n = 0; n < r; n++) {
                        const r = e[n];
                        if (t.elements.indexOf(r.element) === -1) {
                            for (const t in r.originalAttributes) {
                                r.element.setAttribute(t, r.originalAttributes[t]);
                            }
                        }
                    }
                }
            }
        }
    }
    function _() {
        return Object.keys(s).sort((t, e) => e.toLowerCase().localeCompare(t.toLowerCase()));
    }
    const E = {
        start: function() {
            if (!c) {
                c = true;
                S();
            }
            return E;
        },
        stop: function() {
            c = false;
            return E;
        },
        fetch: function() {
            if (!i.removeAttributes) {
                s = {};
            }
            a();
            return E;
        },
        refresh: function() {
            if (c) {
                S();
            }
            return E;
        },
        setConfiguration: e => {
            if (t.definedObject(e)) {
                const t = i;
                let r = false;
                for (const n in e) {
                    if (Object.prototype.hasOwnProperty.call(e, n) && Object.prototype.hasOwnProperty.call(t, n) && t[n] !== e[n]) {
                        t[n] = e[n];
                        r = true;
                    }
                }
                if (r) {
                    i = n.Options.get(t);
                    c = i.enabled;
                }
            }
            return E;
        },
        getVersion: () => "1.0.0"
    };
    (() => {
        i = n.Options.get();
        c = i.enabled;
        r.onContentLoaded(() => a());
        if (!t.defined(window.$rattribute)) {
            window.$rattribute = E;
        }
    })();
})();//# sourceMappingURL=rattribute.esm.js.map