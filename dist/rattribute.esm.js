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
    function e(t) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", () => t());
        } else {
            t();
        }
    }
    t.onContentLoaded = e;
})(o || (o = {}));

var r;

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
    let l = false;
    function a() {
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
            if (!l) {
                window.addEventListener(r.Event.RESIZE, S);
                l = true;
            }
            if (f) {
                p();
            }
        }
    }
    function d(e) {
        let n = false;
        const o = e.getAttribute(r.CustomAttribute.RATTRIBUTE_JS_SM);
        const i = e.getAttribute(r.CustomAttribute.RATTRIBUTE_JS_MD);
        const s = e.getAttribute(r.CustomAttribute.RATTRIBUTE_JS_LG);
        const u = e.getAttribute(r.CustomAttribute.RATTRIBUTE_JS_XL);
        const c = e.getAttribute(r.CustomAttribute.RATTRIBUTE_JS_XXL);
        if (t.definedString(o)) {
            T(576, e, o, r.CustomAttribute.RATTRIBUTE_JS_SM);
            n = true;
        }
        if (t.definedString(i)) {
            T(768, e, i, r.CustomAttribute.RATTRIBUTE_JS_MD);
            n = true;
        }
        if (t.definedString(s)) {
            T(992, e, s, r.CustomAttribute.RATTRIBUTE_JS_LG);
            n = true;
        }
        if (t.definedString(u)) {
            T(1200, e, u, r.CustomAttribute.RATTRIBUTE_JS_XL);
            n = true;
        }
        if (t.definedString(c)) {
            T(1400, e, c, r.CustomAttribute.RATTRIBUTE_JS_XXL);
            n = true;
        }
        b(e);
        return n;
    }
    function b(n) {
        const o = n.attributes;
        const i = o.length;
        for (let s = 0; s < i; s++) {
            const i = o[s];
            const u = i.name;
            if (u.startsWith(r.CustomAttribute.RATTRIBUTE_JS_CUSTOM)) {
                const o = u.split("-");
                const r = e.getNumber(parseInt(o[o.length - 1]), 0);
                const s = i.value;
                if (r > 0 && t.definedString(s)) {
                    T(r, n, s, u);
                } else {
                    g(n, u);
                }
            }
        }
    }
    function T(t, e, n, o) {
        if (!Object.prototype.hasOwnProperty.call(u, t.toString())) {
            u[t.toString()] = [];
        }
        u[t.toString()].push({
            element: e,
            attributes: m(n),
            originalAttributes: A(e)
        });
        g(e, o);
    }
    function g(t, e) {
        if (s.removeAttributes) {
            t.removeAttribute(e);
        }
    }
    function m(t) {
        const e = {};
        const n = t.split(";");
        for (const t of n) {
            const [n, o] = t.split("=");
            e[n] = o;
        }
        return e;
    }
    function A(t) {
        const e = {};
        const n = t.attributes;
        const o = n.length;
        for (let t = 0; t < o; t++) {
            const o = n[t];
            const i = o.name;
            const s = o.value;
            if (!i.startsWith(r.CustomAttribute.RATTRIBUTE_JS_CUSTOM)) {
                e[i] = s;
            }
        }
        return e;
    }
    function S() {
        if (f) {
            if (c !== 0) {
                clearTimeout(c);
            }
            c = setTimeout(() => p(), s.responsiveDelay);
        }
    }
    function p() {
        _(R());
    }
    function R() {
        const t = {
            screenWidths: [],
            elements: []
        };
        const e = v();
        const n = e.length;
        for (let o = 0; o < n; o++) {
            const n = e[o];
            if (Object.prototype.hasOwnProperty.call(u, n)) {
                const e = window.innerWidth;
                const o = parseInt(n);
                if (e >= o) {
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
    function _(t) {
        const e = v();
        const n = e.length;
        for (let o = 0; o < n; o++) {
            const n = e[o];
            if (Object.prototype.hasOwnProperty.call(u, n)) {
                if (t.screenWidths.indexOf(n) === -1) {
                    const e = u[n];
                    const o = e.length;
                    for (let n = 0; n < o; n++) {
                        const o = e[n];
                        if (t.elements.indexOf(o.element) === -1) {
                            for (const t in o.originalAttributes) {
                                o.element.setAttribute(t, o.originalAttributes[t]);
                            }
                        }
                    }
                }
            }
        }
    }
    function v() {
        return Object.keys(u).sort((t, e) => e.toLowerCase().localeCompare(t.toLowerCase()));
    }
    const E = {
        start: function() {
            if (!f) {
                f = true;
                p();
            }
            return E;
        },
        stop: function() {
            f = false;
            return E;
        },
        fetch: function() {
            if (!s.removeAttributes) {
                u = {};
            }
            a();
            return E;
        },
        refresh: function() {
            if (f) {
                p();
            }
            return E;
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
                    i.setup(s, () => a());
                }
            }
            return E;
        },
        getVersion: () => "1.0.0"
    };
    (() => {
        s = n.Options.get();
        f = s.enabled;
        o.onContentLoaded(() => {
            a();
            i.setup(s, () => a());
        });
        if (!t.defined(window.$rattribute)) {
            window.$rattribute = E;
        }
    })();
})();//# sourceMappingURL=rattribute.esm.js.map