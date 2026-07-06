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
    function i(t) {
        return e(t) && typeof t === "string";
    }
    t.definedString = i;
    function r(t) {
        return e(t) && typeof t === "number";
    }
    t.definedNumber = r;
    function o(t) {
        return e(t) && typeof t === "boolean";
    }
    t.definedBoolean = o;
    function s(t) {
        return e(t) && typeof t === "function";
    }
    t.definedFunction = s;
})(t || (t = {}));

var e;

(e => {
    function n(t, e) {
        return typeof t === "string" ? t : e;
    }
    e.getAnyString = n;
    function i(e, n) {
        return t.definedString(e) ? e : n;
    }
    e.getString = i;
    function r(e, n) {
        return t.definedNumber(e) ? e : n;
    }
    e.getNumber = r;
    function o(e, n) {
        return t.definedObject(e) ? e : n;
    }
    e.getObject = o;
    function s(e, n) {
        return t.definedBoolean(e) ? e : n;
    }
    e.getBoolean = s;
    function u(e) {
        let n = null;
        const i = e.split("(");
        let r = [];
        if (i.length > 1) {
            r = i[1].replace(")", "").replace(";", "").trim().split(",");
            if (r.length === 1 && r[0] === "") {
                r = [];
            }
            if (r.length > 0) {
                const t = r.length;
                for (let e = 0; e < t; e++) {
                    r[e] = JSON.parse(r[e].trim());
                }
            }
        }
        const o = i[0].split(".");
        const s = o.pop();
        let u = globalThis;
        let f = true;
        for (const e of o) {
            u = u[e];
            if (!t.defined(u)) {
                f = false;
                break;
            }
        }
        if (f && t.definedFunction(u[s])) {
            n = u[s].apply(u, r);
        }
        return n;
    }
    e.getObjectFromFunction = u;
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
            n.elementIdPrefix = e.getAnyString(n.elementIdPrefix, "rattribute");
            return n;
        }
        t.get = n;
    })(n = t.Options || (t.Options = {}));
})(n || (n = {}));

var i;

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
})(i || (i = {}));

var r;

(t => {
    function e(t) {
        if (document.readyState === "loading") {
            document.addEventListener(i.Event.DOM_CONTENT_LOADED, () => t());
        } else {
            t();
        }
    }
    t.onContentLoaded = e;
})(r || (r = {}));

var o;

(e => {
    let n = null;
    function i(e, i) {
        if (e.observationMode) {
            if (!t.defined(n)) {
                n = new MutationObserver(() => i());
                const t = {
                    attributes: false,
                    childList: true,
                    subtree: true
                };
                n.observe(document.body, t);
            }
        } else {
            o();
        }
    }
    e.setup = i;
    function r(e) {
        if (e.observationMode && t.defined(n)) {
            o();
        }
    }
    e.destroy = r;
    function o() {
        n.disconnect();
        n = null;
    }
})(o || (o = {}));

(() => {
    let s = {};
    let u = {};
    let f = 0;
    let l = true;
    let c = false;
    let d = [];
    function a() {
        let t = false;
        const e = document.getElementsByTagName("*");
        const n = [].slice.call(e);
        const r = n.length;
        if (!s.removeAttributes) {
            u = {};
        }
        for (let e = 0; e < r; e++) {
            if (b(n[e])) {
                t = true;
            }
        }
        if (t) {
            if (!c) {
                window.addEventListener(i.Event.RESIZE, S);
                c = true;
            }
            if (l) {
                R();
            }
        }
    }
    function b(e) {
        let n = false;
        const r = e.getAttribute(i.CustomAttribute.RATTRIBUTE_JS_XS);
        const o = e.getAttribute(i.CustomAttribute.RATTRIBUTE_JS_SM);
        const s = e.getAttribute(i.CustomAttribute.RATTRIBUTE_JS_MD);
        const u = e.getAttribute(i.CustomAttribute.RATTRIBUTE_JS_LG);
        const f = e.getAttribute(i.CustomAttribute.RATTRIBUTE_JS_XL);
        const l = e.getAttribute(i.CustomAttribute.RATTRIBUTE_JS_XXL);
        const c = e.getAttribute(i.CustomAttribute.RATTRIBUTE_JS_XXXL);
        const a = e.getAttribute(i.CustomAttribute.RATTRIBUTE_JS_IGNORE);
        const b = t.definedString(a) && a.toLowerCase() === true.toString().toLowerCase();
        if (!b) {
            m(e, i.CustomAttribute.RATTRIBUTE_JS_IGNORE);
            if (t.definedString(r)) {
                g(0, e, r, i.CustomAttribute.RATTRIBUTE_JS_XS);
                n = true;
            }
            if (t.definedString(o)) {
                g(576, e, o, i.CustomAttribute.RATTRIBUTE_JS_SM);
                n = true;
            }
            if (t.definedString(s)) {
                g(768, e, s, i.CustomAttribute.RATTRIBUTE_JS_MD);
                n = true;
            }
            if (t.definedString(u)) {
                g(992, e, u, i.CustomAttribute.RATTRIBUTE_JS_LG);
                n = true;
            }
            if (t.definedString(f)) {
                g(1200, e, f, i.CustomAttribute.RATTRIBUTE_JS_XL);
                n = true;
            }
            if (t.definedString(l)) {
                g(1400, e, l, i.CustomAttribute.RATTRIBUTE_JS_XXL);
                n = true;
            }
            if (t.definedString(c)) {
                g(1600, e, c, i.CustomAttribute.RATTRIBUTE_JS_XXXL);
                n = true;
            }
            if (T(e) && !n) {
                n = true;
            }
        } else {
            if (d.indexOf(e) === -1) {
                d.push(e);
            }
        }
        return n;
    }
    function T(n) {
        let r = false;
        const o = n.attributes;
        const s = o.length;
        for (let u = 0; u < s; u++) {
            const s = o[u];
            if (t.defined(s)) {
                const o = s.name;
                if (o.startsWith(i.CustomAttribute.RATTRIBUTE_JS_CUSTOM)) {
                    let i = false;
                    const u = o.match(/\d+(\.\d+)?/g);
                    if (t.defined(u) && u.length === 1) {
                        const f = e.getNumber(parseInt(u[0]), 0);
                        const l = s.value;
                        if (f > 0 && t.definedString(l)) {
                            g(f, n, l, o);
                            r = true;
                        } else {
                            i = true;
                        }
                    } else {
                        i = true;
                    }
                    if (i) {
                        m(n, o);
                    }
                }
            }
        }
        return r;
    }
    function g(e, n, i, r) {
        if (!Object.prototype.hasOwnProperty.call(u, e.toString())) {
            u[e.toString()] = [];
        }
        const o = A(i);
        const f = p(n, o);
        if (s.assignMissingIds && !t.definedString(n.id)) {
            let e = s.elementIdPrefix;
            if (t.definedString(e)) {
                e = `${e.trim()}${"-"}`;
            }
            n.id = `${e}${crypto.randomUUID().replaceAll("-", "")}`;
        }
        u[e.toString()].push({
            element: n,
            attributes: o,
            originalAttributes: f
        });
        m(n, r);
    }
    function m(t, e) {
        if (s.removeAttributes) {
            t.removeAttribute(e);
        }
    }
    function A(t) {
        const e = {};
        const n = t.split(";");
        for (const t of n) {
            const [n, i] = t.split("=");
            e[n] = i;
        }
        return e;
    }
    function p(e, n) {
        const r = {};
        const o = e.attributes;
        const s = o.length;
        for (let e = 0; e < s; e++) {
            const n = o[e];
            if (t.defined(n)) {
                const t = n.name;
                const e = n.value;
                if (!t.startsWith(i.CustomAttribute.RATTRIBUTE_JS_CUSTOM)) {
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
        if (l) {
            if (f !== 0) {
                clearTimeout(f);
            }
            f = setTimeout(() => R(), s.responsiveDelay);
        }
    }
    function R() {
        O(_());
    }
    function _() {
        const n = {
            screenWidths: [],
            elements: []
        };
        const i = E();
        const r = i.length;
        for (let o = 0; o < r; o++) {
            const r = i[o];
            if (Object.prototype.hasOwnProperty.call(u, r)) {
                const i = window.innerWidth;
                const o = parseInt(r);
                if (o > 0 && i >= o || o === 0 && i < 576) {
                    const i = u[r];
                    const o = i.length;
                    n.screenWidths.push(r);
                    for (let r = 0; r < o; r++) {
                        const o = i[r];
                        if (t.defined(o.element) && n.elements.indexOf(o.element) === -1) {
                            n.elements.push(o.element);
                            for (const t in o.attributes) {
                                let n = o.attributes[t];
                                if (n.indexOf("(") > -1 && n.endsWith(")")) {
                                    n = e.getObjectFromFunction(n);
                                }
                                o.element.setAttribute(t, n);
                            }
                        }
                    }
                }
            }
        }
        return n;
    }
    function O(n) {
        const i = E();
        const r = i.length;
        for (let o = 0; o < r; o++) {
            const r = i[o];
            if (Object.prototype.hasOwnProperty.call(u, r)) {
                if (n.screenWidths.indexOf(r) === -1) {
                    const i = u[r];
                    const o = i.length;
                    for (let r = 0; r < o; r++) {
                        const o = i[r];
                        if (t.defined(o.element) && n.elements.indexOf(o.element) === -1) {
                            for (const n in o.originalAttributes) {
                                let i = o.originalAttributes[n];
                                if (i.indexOf("(") > -1 && i.endsWith(")")) {
                                    i = e.getObjectFromFunction(i);
                                }
                                if (t.definedString(i)) {
                                    o.element.setAttribute(n, i);
                                } else {
                                    o.element.removeAttribute(n);
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
    const I = {
        start: function() {
            if (!l) {
                l = true;
                R();
            }
            return I;
        },
        stop: function() {
            l = false;
            return I;
        },
        fetch: function() {
            a();
            return I;
        },
        refresh: function() {
            if (l) {
                R();
            }
            return I;
        },
        getElements: function() {
            const e = [];
            const n = E();
            const i = n.length;
            for (let r = 0; r < i; r++) {
                const i = n[r];
                if (Object.prototype.hasOwnProperty.call(u, i)) {
                    const n = u[i];
                    const r = n.length;
                    for (let i = 0; i < r; i++) {
                        const r = n[i];
                        if (t.defined(r.element) && e.indexOf(r.element) === -1) {
                            e.push(r.element);
                        }
                    }
                }
            }
            return e;
        },
        getIgnoredElements: function() {
            return d;
        },
        enableIgnoredElements: function() {
            const e = d.length;
            for (let n = 0; n < e; n++) {
                const e = d[n];
                if (t.defined(e)) {
                    e.removeAttribute(i.CustomAttribute.RATTRIBUTE_JS_IGNORE);
                    b(e);
                }
            }
            if (d.length > 0 && l) {
                R();
            }
            d = [];
            return I;
        },
        setConfiguration: e => {
            if (t.definedObject(e)) {
                const t = s;
                let i = false;
                for (const n in e) {
                    if (Object.prototype.hasOwnProperty.call(e, n) && Object.prototype.hasOwnProperty.call(t, n) && t[n] !== e[n]) {
                        t[n] = e[n];
                        i = true;
                    }
                }
                if (i) {
                    s = n.Options.get(t);
                    l = s.enabled;
                    o.setup(s, () => a());
                }
            }
            return I;
        },
        getVersion: () => "1.3.1"
    };
    (() => {
        s = n.Options.get();
        l = s.enabled;
        r.onContentLoaded(() => {
            a();
            o.setup(s, () => a());
        });
        if (!t.defined(window.$rattribute)) {
            window.$rattribute = I;
        }
    })();
})();//# sourceMappingURL=rattribute.esm.js.map