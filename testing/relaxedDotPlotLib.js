/*
This library makes use of code from other sources:

Mulberry32
    https://gist.github.com/tommyettinger/46a874533244883189143505d203312c
    License: public domain

Gaussian Squared Integral error function
    https://hewgill.com/picomath/javascript/erf.js.html
    License: public domain

d3 v5.9.7
    https://d3js.org
    Copyright 2019 Mike Bostock
    Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
    1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
    2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
    3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

The display of dot position offsets uses a divergent color map
    "Diverging Color Maps for Scientific Visualization." Kenneth Moreland. In Proceedings of the 5th International Symposium on Visual Computing, December 2009. DOI 10.1007/978-3-642-10520-3_9.

*/ 
// https://d3js.org v5.9.7 Copyright 2019 Mike Bostock
!function (t, n) { "object" == typeof exports && "undefined" != typeof module ? n(exports) : "function" == typeof define && define.amd ? define(["exports"], n) : n(t.d3 = t.d3 || {}); }(this, function (t) {
    "use strict";
    function n(t, n) { return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN; }
    function e(t) { var e; return 1 === t.length && (e = t, t = function (t, r) { return n(e(t), r); }), { left: function (n, e, r, i) { for (null == r && (r = 0), null == i && (i = n.length); r < i;) {
            var o = r + i >>> 1;
            t(n[o], e) < 0 ? r = o + 1 : i = o;
        } return r; }, right: function (n, e, r, i) { for (null == r && (r = 0), null == i && (i = n.length); r < i;) {
            var o = r + i >>> 1;
            t(n[o], e) > 0 ? i = o : r = o + 1;
        } return r; } }; }
    var r = e(n), i = r.right, o = r.left;
    function a(t, n) { return [t, n]; }
    function u(t) { return null === t ? NaN : +t; }
    function c(t, n) { var e, r, i = t.length, o = 0, a = -1, c = 0, f = 0; if (null == n)
        for (; ++a < i;)
            isNaN(e = u(t[a])) || (f += (r = e - c) * (e - (c += r / ++o)));
    else
        for (; ++a < i;)
            isNaN(e = u(n(t[a], a, t))) || (f += (r = e - c) * (e - (c += r / ++o))); if (o > 1)
        return f / (o - 1); }
    function f(t, n) { var e = c(t, n); return e ? Math.sqrt(e) : e; }
    function s(t, n) { var e, r, i, o = t.length, a = -1; if (null == n) {
        for (; ++a < o;)
            if (null != (e = t[a]) && e >= e)
                for (r = i = e; ++a < o;)
                    null != (e = t[a]) && (r > e && (r = e), i < e && (i = e));
    }
    else
        for (; ++a < o;)
            if (null != (e = n(t[a], a, t)) && e >= e)
                for (r = i = e; ++a < o;)
                    null != (e = n(t[a], a, t)) && (r > e && (r = e), i < e && (i = e)); return [r, i]; }
    var l = Array.prototype, h = l.slice, d = l.map;
    function p(t) { return function () { return t; }; }
    function v(t) { return t; }
    function g(t, n, e) { t = +t, n = +n, e = (i = arguments.length) < 2 ? (n = t, t = 0, 1) : i < 3 ? 1 : +e; for (var r = -1, i = 0 | Math.max(0, Math.ceil((n - t) / e)), o = new Array(i); ++r < i;)
        o[r] = t + r * e; return o; }
    var y = Math.sqrt(50), _ = Math.sqrt(10), b = Math.sqrt(2);
    function m(t, n, e) { var r, i, o, a, u = -1; if (e = +e, (t = +t) === (n = +n) && e > 0)
        return [t]; if ((r = n < t) && (i = t, t = n, n = i), 0 === (a = x(t, n, e)) || !isFinite(a))
        return []; if (a > 0)
        for (t = Math.ceil(t / a), n = Math.floor(n / a), o = new Array(i = Math.ceil(n - t + 1)); ++u < i;)
            o[u] = (t + u) * a;
    else
        for (t = Math.floor(t * a), n = Math.ceil(n * a), o = new Array(i = Math.ceil(t - n + 1)); ++u < i;)
            o[u] = (t - u) / a; return r && o.reverse(), o; }
    function x(t, n, e) { var r = (n - t) / Math.max(0, e), i = Math.floor(Math.log(r) / Math.LN10), o = r / Math.pow(10, i); return i >= 0 ? (o >= y ? 10 : o >= _ ? 5 : o >= b ? 2 : 1) * Math.pow(10, i) : -Math.pow(10, -i) / (o >= y ? 10 : o >= _ ? 5 : o >= b ? 2 : 1); }
    function w(t, n, e) { var r = Math.abs(n - t) / Math.max(0, e), i = Math.pow(10, Math.floor(Math.log(r) / Math.LN10)), o = r / i; return o >= y ? i *= 10 : o >= _ ? i *= 5 : o >= b && (i *= 2), n < t ? -i : i; }
    function M(t) { return Math.ceil(Math.log(t.length) / Math.LN2) + 1; }
    function N(t, n, e) { if (null == e && (e = u), r = t.length) {
        if ((n = +n) <= 0 || r < 2)
            return +e(t[0], 0, t);
        if (n >= 1)
            return +e(t[r - 1], r - 1, t);
        var r, i = (r - 1) * n, o = Math.floor(i), a = +e(t[o], o, t);
        return a + (+e(t[o + 1], o + 1, t) - a) * (i - o);
    } }
    function A(t, n) { var e, r, i = t.length, o = -1; if (null == n) {
        for (; ++o < i;)
            if (null != (e = t[o]) && e >= e)
                for (r = e; ++o < i;)
                    null != (e = t[o]) && e > r && (r = e);
    }
    else
        for (; ++o < i;)
            if (null != (e = n(t[o], o, t)) && e >= e)
                for (r = e; ++o < i;)
                    null != (e = n(t[o], o, t)) && e > r && (r = e); return r; }
    function T(t) { for (var n, e, r, i = t.length, o = -1, a = 0; ++o < i;)
        a += t[o].length; for (e = new Array(a); --i >= 0;)
        for (n = (r = t[i]).length; --n >= 0;)
            e[--a] = r[n]; return e; }
    function S(t, n) { var e, r, i = t.length, o = -1; if (null == n) {
        for (; ++o < i;)
            if (null != (e = t[o]) && e >= e)
                for (r = e; ++o < i;)
                    null != (e = t[o]) && r > e && (r = e);
    }
    else
        for (; ++o < i;)
            if (null != (e = n(t[o], o, t)) && e >= e)
                for (r = e; ++o < i;)
                    null != (e = n(t[o], o, t)) && r > e && (r = e); return r; }
    function k(t) { if (!(i = t.length))
        return []; for (var n = -1, e = S(t, E), r = new Array(e); ++n < e;)
        for (var i, o = -1, a = r[n] = new Array(i); ++o < i;)
            a[o] = t[o][n]; return r; }
    function E(t) { return t.length; }
    var C = Array.prototype.slice;
    function P(t) { return t; }
    var z = 1, R = 2, D = 3, q = 4, L = 1e-6;
    function U(t) { return "translate(" + (t + .5) + ",0)"; }
    function O(t) { return "translate(0," + (t + .5) + ")"; }
    function B() { return !this.__axis; }
    function Y(t, n) { var e = [], r = null, i = null, o = 6, a = 6, u = 3, c = t === z || t === q ? -1 : 1, f = t === q || t === R ? "x" : "y", s = t === z || t === D ? U : O; function l(l) { var h = null == r ? n.ticks ? n.ticks.apply(n, e) : n.domain() : r, d = null == i ? n.tickFormat ? n.tickFormat.apply(n, e) : P : i, p = Math.max(o, 0) + u, v = n.range(), g = +v[0] + .5, y = +v[v.length - 1] + .5, _ = (n.bandwidth ? function (t) { var n = Math.max(0, t.bandwidth() - 1) / 2; return t.round() && (n = Math.round(n)), function (e) { return +t(e) + n; }; } : function (t) { return function (n) { return +t(n); }; })(n.copy()), b = l.selection ? l.selection() : l, m = b.selectAll(".domain").data([null]), x = b.selectAll(".tick").data(h, n).order(), w = x.exit(), M = x.enter().append("g").attr("class", "tick"), N = x.select("line"), A = x.select("text"); m = m.merge(m.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor")), x = x.merge(M), N = N.merge(M.append("line").attr("stroke", "currentColor").attr(f + "2", c * o)), A = A.merge(M.append("text").attr("fill", "currentColor").attr(f, c * p).attr("dy", t === z ? "0em" : t === D ? "0.71em" : "0.32em")), l !== b && (m = m.transition(l), x = x.transition(l), N = N.transition(l), A = A.transition(l), w = w.transition(l).attr("opacity", L).attr("transform", function (t) { return isFinite(t = _(t)) ? s(t) : this.getAttribute("transform"); }), M.attr("opacity", L).attr("transform", function (t) { var n = this.parentNode.__axis; return s(n && isFinite(n = n(t)) ? n : _(t)); })), w.remove(), m.attr("d", t === q || t == R ? a ? "M" + c * a + "," + g + "H0.5V" + y + "H" + c * a : "M0.5," + g + "V" + y : a ? "M" + g + "," + c * a + "V0.5H" + y + "V" + c * a : "M" + g + ",0.5H" + y), x.attr("opacity", 1).attr("transform", function (t) { return s(_(t)); }), N.attr(f + "2", c * o), A.attr(f, c * p).text(d), b.filter(B).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", t === R ? "start" : t === q ? "end" : "middle"), b.each(function () { this.__axis = _; }); } return l.scale = function (t) { return arguments.length ? (n = t, l) : n; }, l.ticks = function () { return e = C.call(arguments), l; }, l.tickArguments = function (t) { return arguments.length ? (e = null == t ? [] : C.call(t), l) : e.slice(); }, l.tickValues = function (t) { return arguments.length ? (r = null == t ? null : C.call(t), l) : r && r.slice(); }, l.tickFormat = function (t) { return arguments.length ? (i = t, l) : i; }, l.tickSize = function (t) { return arguments.length ? (o = a = +t, l) : o; }, l.tickSizeInner = function (t) { return arguments.length ? (o = +t, l) : o; }, l.tickSizeOuter = function (t) { return arguments.length ? (a = +t, l) : a; }, l.tickPadding = function (t) { return arguments.length ? (u = +t, l) : u; }, l; }
    var F = { value: function () { } };
    function I() { for (var t, n = 0, e = arguments.length, r = {}; n < e; ++n) {
        if (!(t = arguments[n] + "") || t in r)
            throw new Error("illegal type: " + t);
        r[t] = [];
    } return new j(r); }
    function j(t) { this._ = t; }
    function H(t, n) { for (var e, r = 0, i = t.length; r < i; ++r)
        if ((e = t[r]).name === n)
            return e.value; }
    function X(t, n, e) { for (var r = 0, i = t.length; r < i; ++r)
        if (t[r].name === n) {
            t[r] = F, t = t.slice(0, r).concat(t.slice(r + 1));
            break;
        } return null != e && t.push({ name: n, value: e }), t; }
    j.prototype = I.prototype = { constructor: j, on: function (t, n) { var e, r, i = this._, o = (r = i, (t + "").trim().split(/^|\s+/).map(function (t) { var n = "", e = t.indexOf("."); if (e >= 0 && (n = t.slice(e + 1), t = t.slice(0, e)), t && !r.hasOwnProperty(t))
            throw new Error("unknown type: " + t); return { type: t, name: n }; })), a = -1, u = o.length; if (!(arguments.length < 2)) {
            if (null != n && "function" != typeof n)
                throw new Error("invalid callback: " + n);
            for (; ++a < u;)
                if (e = (t = o[a]).type)
                    i[e] = X(i[e], t.name, n);
                else if (null == n)
                    for (e in i)
                        i[e] = X(i[e], t.name, null);
            return this;
        } for (; ++a < u;)
            if ((e = (t = o[a]).type) && (e = H(i[e], t.name)))
                return e; }, copy: function () { var t = {}, n = this._; for (var e in n)
            t[e] = n[e].slice(); return new j(t); }, call: function (t, n) { if ((e = arguments.length - 2) > 0)
            for (var e, r, i = new Array(e), o = 0; o < e; ++o)
                i[o] = arguments[o + 2]; if (!this._.hasOwnProperty(t))
            throw new Error("unknown type: " + t); for (o = 0, e = (r = this._[t]).length; o < e; ++o)
            r[o].value.apply(n, i); }, apply: function (t, n, e) { if (!this._.hasOwnProperty(t))
            throw new Error("unknown type: " + t); for (var r = this._[t], i = 0, o = r.length; i < o; ++i)
            r[i].value.apply(n, e); } };
    var G = "http://www.w3.org/1999/xhtml", V = { svg: "http://www.w3.org/2000/svg", xhtml: G, xlink: "http://www.w3.org/1999/xlink", xml: "http://www.w3.org/XML/1998/namespace", xmlns: "http://www.w3.org/2000/xmlns/" };
    function $(t) { var n = t += "", e = n.indexOf(":"); return e >= 0 && "xmlns" !== (n = t.slice(0, e)) && (t = t.slice(e + 1)), V.hasOwnProperty(n) ? { space: V[n], local: t } : t; }
    function W(t) { var n = $(t); return (n.local ? function (t) { return function () { return this.ownerDocument.createElementNS(t.space, t.local); }; } : function (t) { return function () { var n = this.ownerDocument, e = this.namespaceURI; return e === G && n.documentElement.namespaceURI === G ? n.createElement(t) : n.createElementNS(e, t); }; })(n); }
    function Z() { }
    function Q(t) { return null == t ? Z : function () { return this.querySelector(t); }; }
    function J() { return []; }
    function K(t) { return null == t ? J : function () { return this.querySelectorAll(t); }; }
    function tt(t) { return function () { return this.matches(t); }; }
    function nt(t) { return new Array(t.length); }
    function et(t, n) { this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = n; }
    et.prototype = { constructor: et, appendChild: function (t) { return this._parent.insertBefore(t, this._next); }, insertBefore: function (t, n) { return this._parent.insertBefore(t, n); }, querySelector: function (t) { return this._parent.querySelector(t); }, querySelectorAll: function (t) { return this._parent.querySelectorAll(t); } };
    var rt = "$";
    function it(t, n, e, r, i, o) { for (var a, u = 0, c = n.length, f = o.length; u < f; ++u)
        (a = n[u]) ? (a.__data__ = o[u], r[u] = a) : e[u] = new et(t, o[u]); for (; u < c; ++u)
        (a = n[u]) && (i[u] = a); }
    function ot(t, n, e, r, i, o, a) { var u, c, f, s = {}, l = n.length, h = o.length, d = new Array(l); for (u = 0; u < l; ++u)
        (c = n[u]) && (d[u] = f = rt + a.call(c, c.__data__, u, n), f in s ? i[u] = c : s[f] = c); for (u = 0; u < h; ++u)
        (c = s[f = rt + a.call(t, o[u], u, o)]) ? (r[u] = c, c.__data__ = o[u], s[f] = null) : e[u] = new et(t, o[u]); for (u = 0; u < l; ++u)
        (c = n[u]) && s[d[u]] === c && (i[u] = c); }
    function at(t, n) { return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN; }
    function ut(t) { return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView; }
    function ct(t, n) { return t.style.getPropertyValue(n) || ut(t).getComputedStyle(t, null).getPropertyValue(n); }
    function ft(t) { return t.trim().split(/^|\s+/); }
    function st(t) { return t.classList || new lt(t); }
    function lt(t) { this._node = t, this._names = ft(t.getAttribute("class") || ""); }
    function ht(t, n) { for (var e = st(t), r = -1, i = n.length; ++r < i;)
        e.add(n[r]); }
    function dt(t, n) { for (var e = st(t), r = -1, i = n.length; ++r < i;)
        e.remove(n[r]); }
    function pt() { this.textContent = ""; }
    function vt() { this.innerHTML = ""; }
    function gt() { this.nextSibling && this.parentNode.appendChild(this); }
    function yt() { this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild); }
    function _t() { return null; }
    function bt() { var t = this.parentNode; t && t.removeChild(this); }
    function mt() { return this.parentNode.insertBefore(this.cloneNode(!1), this.nextSibling); }
    function xt() { return this.parentNode.insertBefore(this.cloneNode(!0), this.nextSibling); }
    lt.prototype = { add: function (t) { this._names.indexOf(t) < 0 && (this._names.push(t), this._node.setAttribute("class", this._names.join(" "))); }, remove: function (t) { var n = this._names.indexOf(t); n >= 0 && (this._names.splice(n, 1), this._node.setAttribute("class", this._names.join(" "))); }, contains: function (t) { return this._names.indexOf(t) >= 0; } };
    var wt = {};
    (t.event = null, "undefined" != typeof document) && ("onmouseenter" in document.documentElement || (wt = { mouseenter: "mouseover", mouseleave: "mouseout" }));
    function Mt(t, n, e) { return t = Nt(t, n, e), function (n) { var e = n.relatedTarget; e && (e === this || 8 & e.compareDocumentPosition(this)) || t.call(this, n); }; }
    function Nt(n, e, r) { return function (i) { var o = t.event; t.event = i; try {
        n.call(this, this.__data__, e, r);
    }
    finally {
        t.event = o;
    } }; }
    function At(t) { return function () { var n = this.__on; if (n) {
        for (var e, r = 0, i = -1, o = n.length; r < o; ++r)
            e = n[r], t.type && e.type !== t.type || e.name !== t.name ? n[++i] = e : this.removeEventListener(e.type, e.listener, e.capture);
        ++i ? n.length = i : delete this.__on;
    } }; }
    function Tt(t, n, e) { var r = wt.hasOwnProperty(t.type) ? Mt : Nt; return function (i, o, a) { var u, c = this.__on, f = r(n, o, a); if (c)
        for (var s = 0, l = c.length; s < l; ++s)
            if ((u = c[s]).type === t.type && u.name === t.name)
                return this.removeEventListener(u.type, u.listener, u.capture), this.addEventListener(u.type, u.listener = f, u.capture = e), void (u.value = n); this.addEventListener(t.type, f, e), u = { type: t.type, name: t.name, value: n, listener: f, capture: e }, c ? c.push(u) : this.__on = [u]; }; }
    function St(n, e, r, i) { var o = t.event; n.sourceEvent = t.event, t.event = n; try {
        return e.apply(r, i);
    }
    finally {
        t.event = o;
    } }
    function kt(t, n, e) { var r = ut(t), i = r.CustomEvent; "function" == typeof i ? i = new i(n, e) : (i = r.document.createEvent("Event"), e ? (i.initEvent(n, e.bubbles, e.cancelable), i.detail = e.detail) : i.initEvent(n, !1, !1)), t.dispatchEvent(i); }
    var Et = [null];
    function Ct(t, n) { this._groups = t, this._parents = n; }
    function Pt() { return new Ct([[document.documentElement]], Et); }
    function zt(t) { return "string" == typeof t ? new Ct([[document.querySelector(t)]], [document.documentElement]) : new Ct([[t]], Et); }
    Ct.prototype = Pt.prototype = { constructor: Ct, select: function (t) { "function" != typeof t && (t = Q(t)); for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
            for (var o, a, u = n[i], c = u.length, f = r[i] = new Array(c), s = 0; s < c; ++s)
                (o = u[s]) && (a = t.call(o, o.__data__, s, u)) && ("__data__" in o && (a.__data__ = o.__data__), f[s] = a); return new Ct(r, this._parents); }, selectAll: function (t) { "function" != typeof t && (t = K(t)); for (var n = this._groups, e = n.length, r = [], i = [], o = 0; o < e; ++o)
            for (var a, u = n[o], c = u.length, f = 0; f < c; ++f)
                (a = u[f]) && (r.push(t.call(a, a.__data__, f, u)), i.push(a)); return new Ct(r, i); }, filter: function (t) { "function" != typeof t && (t = tt(t)); for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
            for (var o, a = n[i], u = a.length, c = r[i] = [], f = 0; f < u; ++f)
                (o = a[f]) && t.call(o, o.__data__, f, a) && c.push(o); return new Ct(r, this._parents); }, data: function (t, n) { if (!t)
            return p = new Array(this.size()), s = -1, this.each(function (t) { p[++s] = t; }), p; var e, r = n ? ot : it, i = this._parents, o = this._groups; "function" != typeof t && (e = t, t = function () { return e; }); for (var a = o.length, u = new Array(a), c = new Array(a), f = new Array(a), s = 0; s < a; ++s) {
            var l = i[s], h = o[s], d = h.length, p = t.call(l, l && l.__data__, s, i), v = p.length, g = c[s] = new Array(v), y = u[s] = new Array(v);
            r(l, h, g, y, f[s] = new Array(d), p, n);
            for (var _, b, m = 0, x = 0; m < v; ++m)
                if (_ = g[m]) {
                    for (m >= x && (x = m + 1); !(b = y[x]) && ++x < v;)
                        ;
                    _._next = b || null;
                }
        } return (u = new Ct(u, i))._enter = c, u._exit = f, u; }, enter: function () { return new Ct(this._enter || this._groups.map(nt), this._parents); }, exit: function () { return new Ct(this._exit || this._groups.map(nt), this._parents); }, join: function (t, n, e) { var r = this.enter(), i = this, o = this.exit(); return r = "function" == typeof t ? t(r) : r.append(t + ""), null != n && (i = n(i)), null == e ? o.remove() : e(o), r && i ? r.merge(i).order() : i; }, merge: function (t) { for (var n = this._groups, e = t._groups, r = n.length, i = e.length, o = Math.min(r, i), a = new Array(r), u = 0; u < o; ++u)
            for (var c, f = n[u], s = e[u], l = f.length, h = a[u] = new Array(l), d = 0; d < l; ++d)
                (c = f[d] || s[d]) && (h[d] = c); for (; u < r; ++u)
            a[u] = n[u]; return new Ct(a, this._parents); }, order: function () { for (var t = this._groups, n = -1, e = t.length; ++n < e;)
            for (var r, i = t[n], o = i.length - 1, a = i[o]; --o >= 0;)
                (r = i[o]) && (a && 4 ^ r.compareDocumentPosition(a) && a.parentNode.insertBefore(r, a), a = r); return this; }, sort: function (t) { function n(n, e) { return n && e ? t(n.__data__, e.__data__) : !n - !e; } t || (t = at); for (var e = this._groups, r = e.length, i = new Array(r), o = 0; o < r; ++o) {
            for (var a, u = e[o], c = u.length, f = i[o] = new Array(c), s = 0; s < c; ++s)
                (a = u[s]) && (f[s] = a);
            f.sort(n);
        } return new Ct(i, this._parents).order(); }, call: function () { var t = arguments[0]; return arguments[0] = this, t.apply(null, arguments), this; }, nodes: function () { var t = new Array(this.size()), n = -1; return this.each(function () { t[++n] = this; }), t; }, node: function () { for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
            for (var r = t[n], i = 0, o = r.length; i < o; ++i) {
                var a = r[i];
                if (a)
                    return a;
            } return null; }, size: function () { var t = 0; return this.each(function () { ++t; }), t; }, empty: function () { return !this.node(); }, each: function (t) { for (var n = this._groups, e = 0, r = n.length; e < r; ++e)
            for (var i, o = n[e], a = 0, u = o.length; a < u; ++a)
                (i = o[a]) && t.call(i, i.__data__, a, o); return this; }, attr: function (t, n) { var e = $(t); if (arguments.length < 2) {
            var r = this.node();
            return e.local ? r.getAttributeNS(e.space, e.local) : r.getAttribute(e);
        } return this.each((null == n ? e.local ? function (t) { return function () { this.removeAttributeNS(t.space, t.local); }; } : function (t) { return function () { this.removeAttribute(t); }; } : "function" == typeof n ? e.local ? function (t, n) { return function () { var e = n.apply(this, arguments); null == e ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, e); }; } : function (t, n) { return function () { var e = n.apply(this, arguments); null == e ? this.removeAttribute(t) : this.setAttribute(t, e); }; } : e.local ? function (t, n) { return function () { this.setAttributeNS(t.space, t.local, n); }; } : function (t, n) { return function () { this.setAttribute(t, n); }; })(e, n)); }, style: function (t, n, e) { return arguments.length > 1 ? this.each((null == n ? function (t) { return function () { this.style.removeProperty(t); }; } : "function" == typeof n ? function (t, n, e) { return function () { var r = n.apply(this, arguments); null == r ? this.style.removeProperty(t) : this.style.setProperty(t, r, e); }; } : function (t, n, e) { return function () { this.style.setProperty(t, n, e); }; })(t, n, null == e ? "" : e)) : ct(this.node(), t); }, property: function (t, n) { return arguments.length > 1 ? this.each((null == n ? function (t) { return function () { delete this[t]; }; } : "function" == typeof n ? function (t, n) { return function () { var e = n.apply(this, arguments); null == e ? delete this[t] : this[t] = e; }; } : function (t, n) { return function () { this[t] = n; }; })(t, n)) : this.node()[t]; }, classed: function (t, n) { var e = ft(t + ""); if (arguments.length < 2) {
            for (var r = st(this.node()), i = -1, o = e.length; ++i < o;)
                if (!r.contains(e[i]))
                    return !1;
            return !0;
        } return this.each(("function" == typeof n ? function (t, n) { return function () { (n.apply(this, arguments) ? ht : dt)(this, t); }; } : n ? function (t) { return function () { ht(this, t); }; } : function (t) { return function () { dt(this, t); }; })(e, n)); }, text: function (t) { return arguments.length ? this.each(null == t ? pt : ("function" == typeof t ? function (t) { return function () { var n = t.apply(this, arguments); this.textContent = null == n ? "" : n; }; } : function (t) { return function () { this.textContent = t; }; })(t)) : this.node().textContent; }, html: function (t) { return arguments.length ? this.each(null == t ? vt : ("function" == typeof t ? function (t) { return function () { var n = t.apply(this, arguments); this.innerHTML = null == n ? "" : n; }; } : function (t) { return function () { this.innerHTML = t; }; })(t)) : this.node().innerHTML; }, raise: function () { return this.each(gt); }, lower: function () { return this.each(yt); }, append: function (t) { var n = "function" == typeof t ? t : W(t); return this.select(function () { return this.appendChild(n.apply(this, arguments)); }); }, insert: function (t, n) { var e = "function" == typeof t ? t : W(t), r = null == n ? _t : "function" == typeof n ? n : Q(n); return this.select(function () { return this.insertBefore(e.apply(this, arguments), r.apply(this, arguments) || null); }); }, remove: function () { return this.each(bt); }, clone: function (t) { return this.select(t ? xt : mt); }, datum: function (t) { return arguments.length ? this.property("__data__", t) : this.node().__data__; }, on: function (t, n, e) { var r, i, o = function (t) { return t.trim().split(/^|\s+/).map(function (t) { var n = "", e = t.indexOf("."); return e >= 0 && (n = t.slice(e + 1), t = t.slice(0, e)), { type: t, name: n }; }); }(t + ""), a = o.length; if (!(arguments.length < 2)) {
            for (u = n ? Tt : At, null == e && (e = !1), r = 0; r < a; ++r)
                this.each(u(o[r], n, e));
            return this;
        } var u = this.node().__on; if (u)
            for (var c, f = 0, s = u.length; f < s; ++f)
                for (r = 0, c = u[f]; r < a; ++r)
                    if ((i = o[r]).type === c.type && i.name === c.name)
                        return c.value; }, dispatch: function (t, n) { return this.each(("function" == typeof n ? function (t, n) { return function () { return kt(this, t, n.apply(this, arguments)); }; } : function (t, n) { return function () { return kt(this, t, n); }; })(t, n)); } };
    var Rt = 0;
    function Dt() { return new qt; }
    function qt() { this._ = "@" + (++Rt).toString(36); }
    function Lt() { for (var n, e = t.event; n = e.sourceEvent;)
        e = n; return e; }
    function Ut(t, n) { var e = t.ownerSVGElement || t; if (e.createSVGPoint) {
        var r = e.createSVGPoint();
        return r.x = n.clientX, r.y = n.clientY, [(r = r.matrixTransform(t.getScreenCTM().inverse())).x, r.y];
    } var i = t.getBoundingClientRect(); return [n.clientX - i.left - t.clientLeft, n.clientY - i.top - t.clientTop]; }
    function Ot(t) { var n = Lt(); return n.changedTouches && (n = n.changedTouches[0]), Ut(t, n); }
    function Bt(t, n, e) { arguments.length < 3 && (e = n, n = Lt().changedTouches); for (var r, i = 0, o = n ? n.length : 0; i < o; ++i)
        if ((r = n[i]).identifier === e)
            return Ut(t, r); return null; }
    function Yt() { t.event.stopImmediatePropagation(); }
    function Ft() { t.event.preventDefault(), t.event.stopImmediatePropagation(); }
    function It(t) { var n = t.document.documentElement, e = zt(t).on("dragstart.drag", Ft, !0); "onselectstart" in n ? e.on("selectstart.drag", Ft, !0) : (n.__noselect = n.style.MozUserSelect, n.style.MozUserSelect = "none"); }
    function jt(t, n) { var e = t.document.documentElement, r = zt(t).on("dragstart.drag", null); n && (r.on("click.drag", Ft, !0), setTimeout(function () { r.on("click.drag", null); }, 0)), "onselectstart" in e ? r.on("selectstart.drag", null) : (e.style.MozUserSelect = e.__noselect, delete e.__noselect); }
    function Ht(t) { return function () { return t; }; }
    function Xt(t, n, e, r, i, o, a, u, c, f) { this.target = t, this.type = n, this.subject = e, this.identifier = r, this.active = i, this.x = o, this.y = a, this.dx = u, this.dy = c, this._ = f; }
    function Gt() { return !t.event.button; }
    function Vt() { return this.parentNode; }
    function $t(n) { return null == n ? { x: t.event.x, y: t.event.y } : n; }
    function Wt() { return "ontouchstart" in this; }
    function Zt(t, n, e) { t.prototype = n.prototype = e, e.constructor = t; }
    function Qt(t, n) { var e = Object.create(t.prototype); for (var r in n)
        e[r] = n[r]; return e; }
    function Jt() { }
    qt.prototype = Dt.prototype = { constructor: qt, get: function (t) { for (var n = this._; !(n in t);)
            if (!(t = t.parentNode))
                return; return t[n]; }, set: function (t, n) { return t[this._] = n; }, remove: function (t) { return this._ in t && delete t[this._]; }, toString: function () { return this._; } }, Xt.prototype.on = function () { var t = this._.on.apply(this._, arguments); return t === this._ ? this : t; };
    var Kt = "\\s*([+-]?\\d+)\\s*", tn = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*", nn = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*", en = /^#([0-9a-f]{3})$/, rn = /^#([0-9a-f]{6})$/, on = new RegExp("^rgb\\(" + [Kt, Kt, Kt] + "\\)$"), an = new RegExp("^rgb\\(" + [nn, nn, nn] + "\\)$"), un = new RegExp("^rgba\\(" + [Kt, Kt, Kt, tn] + "\\)$"), cn = new RegExp("^rgba\\(" + [nn, nn, nn, tn] + "\\)$"), fn = new RegExp("^hsl\\(" + [tn, nn, nn] + "\\)$"), sn = new RegExp("^hsla\\(" + [tn, nn, nn, tn] + "\\)$"), ln = { aliceblue: 15792383, antiquewhite: 16444375, aqua: 65535, aquamarine: 8388564, azure: 15794175, beige: 16119260, bisque: 16770244, black: 0, blanchedalmond: 16772045, blue: 255, blueviolet: 9055202, brown: 10824234, burlywood: 14596231, cadetblue: 6266528, chartreuse: 8388352, chocolate: 13789470, coral: 16744272, cornflowerblue: 6591981, cornsilk: 16775388, crimson: 14423100, cyan: 65535, darkblue: 139, darkcyan: 35723, darkgoldenrod: 12092939, darkgray: 11119017, darkgreen: 25600, darkgrey: 11119017, darkkhaki: 12433259, darkmagenta: 9109643, darkolivegreen: 5597999, darkorange: 16747520, darkorchid: 10040012, darkred: 9109504, darksalmon: 15308410, darkseagreen: 9419919, darkslateblue: 4734347, darkslategray: 3100495, darkslategrey: 3100495, darkturquoise: 52945, darkviolet: 9699539, deeppink: 16716947, deepskyblue: 49151, dimgray: 6908265, dimgrey: 6908265, dodgerblue: 2003199, firebrick: 11674146, floralwhite: 16775920, forestgreen: 2263842, fuchsia: 16711935, gainsboro: 14474460, ghostwhite: 16316671, gold: 16766720, goldenrod: 14329120, gray: 8421504, green: 32768, greenyellow: 11403055, grey: 8421504, honeydew: 15794160, hotpink: 16738740, indianred: 13458524, indigo: 4915330, ivory: 16777200, khaki: 15787660, lavender: 15132410, lavenderblush: 16773365, lawngreen: 8190976, lemonchiffon: 16775885, lightblue: 11393254, lightcoral: 15761536, lightcyan: 14745599, lightgoldenrodyellow: 16448210, lightgray: 13882323, lightgreen: 9498256, lightgrey: 13882323, lightpink: 16758465, lightsalmon: 16752762, lightseagreen: 2142890, lightskyblue: 8900346, lightslategray: 7833753, lightslategrey: 7833753, lightsteelblue: 11584734, lightyellow: 16777184, lime: 65280, limegreen: 3329330, linen: 16445670, magenta: 16711935, maroon: 8388608, mediumaquamarine: 6737322, mediumblue: 205, mediumorchid: 12211667, mediumpurple: 9662683, mediumseagreen: 3978097, mediumslateblue: 8087790, mediumspringgreen: 64154, mediumturquoise: 4772300, mediumvioletred: 13047173, midnightblue: 1644912, mintcream: 16121850, mistyrose: 16770273, moccasin: 16770229, navajowhite: 16768685, navy: 128, oldlace: 16643558, olive: 8421376, olivedrab: 7048739, orange: 16753920, orangered: 16729344, orchid: 14315734, palegoldenrod: 15657130, palegreen: 10025880, paleturquoise: 11529966, palevioletred: 14381203, papayawhip: 16773077, peachpuff: 16767673, peru: 13468991, pink: 16761035, plum: 14524637, powderblue: 11591910, purple: 8388736, rebeccapurple: 6697881, red: 16711680, rosybrown: 12357519, royalblue: 4286945, saddlebrown: 9127187, salmon: 16416882, sandybrown: 16032864, seagreen: 3050327, seashell: 16774638, sienna: 10506797, silver: 12632256, skyblue: 8900331, slateblue: 6970061, slategray: 7372944, slategrey: 7372944, snow: 16775930, springgreen: 65407, steelblue: 4620980, tan: 13808780, teal: 32896, thistle: 14204888, tomato: 16737095, turquoise: 4251856, violet: 15631086, wheat: 16113331, white: 16777215, whitesmoke: 16119285, yellow: 16776960, yellowgreen: 10145074 };
    function hn(t) { var n; return t = (t + "").trim().toLowerCase(), (n = en.exec(t)) ? new yn((n = parseInt(n[1], 16)) >> 8 & 15 | n >> 4 & 240, n >> 4 & 15 | 240 & n, (15 & n) << 4 | 15 & n, 1) : (n = rn.exec(t)) ? dn(parseInt(n[1], 16)) : (n = on.exec(t)) ? new yn(n[1], n[2], n[3], 1) : (n = an.exec(t)) ? new yn(255 * n[1] / 100, 255 * n[2] / 100, 255 * n[3] / 100, 1) : (n = un.exec(t)) ? pn(n[1], n[2], n[3], n[4]) : (n = cn.exec(t)) ? pn(255 * n[1] / 100, 255 * n[2] / 100, 255 * n[3] / 100, n[4]) : (n = fn.exec(t)) ? bn(n[1], n[2] / 100, n[3] / 100, 1) : (n = sn.exec(t)) ? bn(n[1], n[2] / 100, n[3] / 100, n[4]) : ln.hasOwnProperty(t) ? dn(ln[t]) : "transparent" === t ? new yn(NaN, NaN, NaN, 0) : null; }
    function dn(t) { return new yn(t >> 16 & 255, t >> 8 & 255, 255 & t, 1); }
    function pn(t, n, e, r) { return r <= 0 && (t = n = e = NaN), new yn(t, n, e, r); }
    function vn(t) { return t instanceof Jt || (t = hn(t)), t ? new yn((t = t.rgb()).r, t.g, t.b, t.opacity) : new yn; }
    function gn(t, n, e, r) { return 1 === arguments.length ? vn(t) : new yn(t, n, e, null == r ? 1 : r); }
    function yn(t, n, e, r) { this.r = +t, this.g = +n, this.b = +e, this.opacity = +r; }
    function _n(t) { return ((t = Math.max(0, Math.min(255, Math.round(t) || 0))) < 16 ? "0" : "") + t.toString(16); }
    function bn(t, n, e, r) { return r <= 0 ? t = n = e = NaN : e <= 0 || e >= 1 ? t = n = NaN : n <= 0 && (t = NaN), new xn(t, n, e, r); }
    function mn(t, n, e, r) { return 1 === arguments.length ? function (t) { if (t instanceof xn)
        return new xn(t.h, t.s, t.l, t.opacity); if (t instanceof Jt || (t = hn(t)), !t)
        return new xn; if (t instanceof xn)
        return t; var n = (t = t.rgb()).r / 255, e = t.g / 255, r = t.b / 255, i = Math.min(n, e, r), o = Math.max(n, e, r), a = NaN, u = o - i, c = (o + i) / 2; return u ? (a = n === o ? (e - r) / u + 6 * (e < r) : e === o ? (r - n) / u + 2 : (n - e) / u + 4, u /= c < .5 ? o + i : 2 - o - i, a *= 60) : u = c > 0 && c < 1 ? 0 : a, new xn(a, u, c, t.opacity); }(t) : new xn(t, n, e, null == r ? 1 : r); }
    function xn(t, n, e, r) { this.h = +t, this.s = +n, this.l = +e, this.opacity = +r; }
    function wn(t, n, e) { return 255 * (t < 60 ? n + (e - n) * t / 60 : t < 180 ? e : t < 240 ? n + (e - n) * (240 - t) / 60 : n); }
    Zt(Jt, hn, { displayable: function () { return this.rgb().displayable(); }, hex: function () { return this.rgb().hex(); }, toString: function () { return this.rgb() + ""; } }), Zt(yn, gn, Qt(Jt, { brighter: function (t) { return t = null == t ? 1 / .7 : Math.pow(1 / .7, t), new yn(this.r * t, this.g * t, this.b * t, this.opacity); }, darker: function (t) { return t = null == t ? .7 : Math.pow(.7, t), new yn(this.r * t, this.g * t, this.b * t, this.opacity); }, rgb: function () { return this; }, displayable: function () { return -.5 <= this.r && this.r < 255.5 && -.5 <= this.g && this.g < 255.5 && -.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1; }, hex: function () { return "#" + _n(this.r) + _n(this.g) + _n(this.b); }, toString: function () { var t = this.opacity; return (1 === (t = isNaN(t) ? 1 : Math.max(0, Math.min(1, t))) ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (1 === t ? ")" : ", " + t + ")"); } })), Zt(xn, mn, Qt(Jt, { brighter: function (t) { return t = null == t ? 1 / .7 : Math.pow(1 / .7, t), new xn(this.h, this.s, this.l * t, this.opacity); }, darker: function (t) { return t = null == t ? .7 : Math.pow(.7, t), new xn(this.h, this.s, this.l * t, this.opacity); }, rgb: function () { var t = this.h % 360 + 360 * (this.h < 0), n = isNaN(t) || isNaN(this.s) ? 0 : this.s, e = this.l, r = e + (e < .5 ? e : 1 - e) * n, i = 2 * e - r; return new yn(wn(t >= 240 ? t - 240 : t + 120, i, r), wn(t, i, r), wn(t < 120 ? t + 240 : t - 120, i, r), this.opacity); }, displayable: function () { return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1; } }));
    var Mn = Math.PI / 180, Nn = 180 / Math.PI, An = .96422, Tn = 1, Sn = .82521, kn = 4 / 29, En = 6 / 29, Cn = 3 * En * En, Pn = En * En * En;
    function zn(t) { if (t instanceof Dn)
        return new Dn(t.l, t.a, t.b, t.opacity); if (t instanceof Fn)
        return In(t); t instanceof yn || (t = vn(t)); var n, e, r = On(t.r), i = On(t.g), o = On(t.b), a = qn((.2225045 * r + .7168786 * i + .0606169 * o) / Tn); return r === i && i === o ? n = e = a : (n = qn((.4360747 * r + .3850649 * i + .1430804 * o) / An), e = qn((.0139322 * r + .0971045 * i + .7141733 * o) / Sn)), new Dn(116 * a - 16, 500 * (n - a), 200 * (a - e), t.opacity); }
    function Rn(t, n, e, r) { return 1 === arguments.length ? zn(t) : new Dn(t, n, e, null == r ? 1 : r); }
    function Dn(t, n, e, r) { this.l = +t, this.a = +n, this.b = +e, this.opacity = +r; }
    function qn(t) { return t > Pn ? Math.pow(t, 1 / 3) : t / Cn + kn; }
    function Ln(t) { return t > En ? t * t * t : Cn * (t - kn); }
    function Un(t) { return 255 * (t <= .0031308 ? 12.92 * t : 1.055 * Math.pow(t, 1 / 2.4) - .055); }
    function On(t) { return (t /= 255) <= .04045 ? t / 12.92 : Math.pow((t + .055) / 1.055, 2.4); }
    function Bn(t) { if (t instanceof Fn)
        return new Fn(t.h, t.c, t.l, t.opacity); if (t instanceof Dn || (t = zn(t)), 0 === t.a && 0 === t.b)
        return new Fn(NaN, 0 < t.l && t.l < 100 ? 0 : NaN, t.l, t.opacity); var n = Math.atan2(t.b, t.a) * Nn; return new Fn(n < 0 ? n + 360 : n, Math.sqrt(t.a * t.a + t.b * t.b), t.l, t.opacity); }
    function Yn(t, n, e, r) { return 1 === arguments.length ? Bn(t) : new Fn(t, n, e, null == r ? 1 : r); }
    function Fn(t, n, e, r) { this.h = +t, this.c = +n, this.l = +e, this.opacity = +r; }
    function In(t) { if (isNaN(t.h))
        return new Dn(t.l, 0, 0, t.opacity); var n = t.h * Mn; return new Dn(t.l, Math.cos(n) * t.c, Math.sin(n) * t.c, t.opacity); }
    Zt(Dn, Rn, Qt(Jt, { brighter: function (t) { return new Dn(this.l + 18 * (null == t ? 1 : t), this.a, this.b, this.opacity); }, darker: function (t) { return new Dn(this.l - 18 * (null == t ? 1 : t), this.a, this.b, this.opacity); }, rgb: function () { var t = (this.l + 16) / 116, n = isNaN(this.a) ? t : t + this.a / 500, e = isNaN(this.b) ? t : t - this.b / 200; return new yn(Un(3.1338561 * (n = An * Ln(n)) - 1.6168667 * (t = Tn * Ln(t)) - .4906146 * (e = Sn * Ln(e))), Un(-.9787684 * n + 1.9161415 * t + .033454 * e), Un(.0719453 * n - .2289914 * t + 1.4052427 * e), this.opacity); } })), Zt(Fn, Yn, Qt(Jt, { brighter: function (t) { return new Fn(this.h, this.c, this.l + 18 * (null == t ? 1 : t), this.opacity); }, darker: function (t) { return new Fn(this.h, this.c, this.l - 18 * (null == t ? 1 : t), this.opacity); }, rgb: function () { return In(this).rgb(); } }));
    var jn = -.14861, Hn = 1.78277, Xn = -.29227, Gn = -.90649, Vn = 1.97294, $n = Vn * Gn, Wn = Vn * Hn, Zn = Hn * Xn - Gn * jn;
    function Qn(t, n, e, r) { return 1 === arguments.length ? function (t) { if (t instanceof Jn)
        return new Jn(t.h, t.s, t.l, t.opacity); t instanceof yn || (t = vn(t)); var n = t.r / 255, e = t.g / 255, r = t.b / 255, i = (Zn * r + $n * n - Wn * e) / (Zn + $n - Wn), o = r - i, a = (Vn * (e - i) - Xn * o) / Gn, u = Math.sqrt(a * a + o * o) / (Vn * i * (1 - i)), c = u ? Math.atan2(a, o) * Nn - 120 : NaN; return new Jn(c < 0 ? c + 360 : c, u, i, t.opacity); }(t) : new Jn(t, n, e, null == r ? 1 : r); }
    function Jn(t, n, e, r) { this.h = +t, this.s = +n, this.l = +e, this.opacity = +r; }
    function Kn(t, n, e, r, i) { var o = t * t, a = o * t; return ((1 - 3 * t + 3 * o - a) * n + (4 - 6 * o + 3 * a) * e + (1 + 3 * t + 3 * o - 3 * a) * r + a * i) / 6; }
    function te(t) { var n = t.length - 1; return function (e) { var r = e <= 0 ? e = 0 : e >= 1 ? (e = 1, n - 1) : Math.floor(e * n), i = t[r], o = t[r + 1], a = r > 0 ? t[r - 1] : 2 * i - o, u = r < n - 1 ? t[r + 2] : 2 * o - i; return Kn((e - r / n) * n, a, i, o, u); }; }
    function ne(t) { var n = t.length; return function (e) { var r = Math.floor(((e %= 1) < 0 ? ++e : e) * n), i = t[(r + n - 1) % n], o = t[r % n], a = t[(r + 1) % n], u = t[(r + 2) % n]; return Kn((e - r / n) * n, i, o, a, u); }; }
    function ee(t) { return function () { return t; }; }
    function re(t, n) { return function (e) { return t + e * n; }; }
    function ie(t, n) { var e = n - t; return e ? re(t, e > 180 || e < -180 ? e - 360 * Math.round(e / 360) : e) : ee(isNaN(t) ? n : t); }
    function oe(t) { return 1 == (t = +t) ? ae : function (n, e) { return e - n ? function (t, n, e) { return t = Math.pow(t, e), n = Math.pow(n, e) - t, e = 1 / e, function (r) { return Math.pow(t + r * n, e); }; }(n, e, t) : ee(isNaN(n) ? e : n); }; }
    function ae(t, n) { var e = n - t; return e ? re(t, e) : ee(isNaN(t) ? n : t); }
    Zt(Jn, Qn, Qt(Jt, { brighter: function (t) { return t = null == t ? 1 / .7 : Math.pow(1 / .7, t), new Jn(this.h, this.s, this.l * t, this.opacity); }, darker: function (t) { return t = null == t ? .7 : Math.pow(.7, t), new Jn(this.h, this.s, this.l * t, this.opacity); }, rgb: function () { var t = isNaN(this.h) ? 0 : (this.h + 120) * Mn, n = +this.l, e = isNaN(this.s) ? 0 : this.s * n * (1 - n), r = Math.cos(t), i = Math.sin(t); return new yn(255 * (n + e * (jn * r + Hn * i)), 255 * (n + e * (Xn * r + Gn * i)), 255 * (n + e * (Vn * r)), this.opacity); } }));
    var ue = function t(n) { var e = oe(n); function r(t, n) { var r = e((t = gn(t)).r, (n = gn(n)).r), i = e(t.g, n.g), o = e(t.b, n.b), a = ae(t.opacity, n.opacity); return function (n) { return t.r = r(n), t.g = i(n), t.b = o(n), t.opacity = a(n), t + ""; }; } return r.gamma = t, r; }(1);
    function ce(t) { return function (n) { var e, r, i = n.length, o = new Array(i), a = new Array(i), u = new Array(i); for (e = 0; e < i; ++e)
        r = gn(n[e]), o[e] = r.r || 0, a[e] = r.g || 0, u[e] = r.b || 0; return o = t(o), a = t(a), u = t(u), r.opacity = 1, function (t) { return r.r = o(t), r.g = a(t), r.b = u(t), r + ""; }; }; }
    var fe = ce(te), se = ce(ne);
    function le(t, n) { var e, r = n ? n.length : 0, i = t ? Math.min(r, t.length) : 0, o = new Array(i), a = new Array(r); for (e = 0; e < i; ++e)
        o[e] = _e(t[e], n[e]); for (; e < r; ++e)
        a[e] = n[e]; return function (t) { for (e = 0; e < i; ++e)
        a[e] = o[e](t); return a; }; }
    function he(t, n) { var e = new Date; return n -= t = +t, function (r) { return e.setTime(t + n * r), e; }; }
    function de(t, n) { return n -= t = +t, function (e) { return t + n * e; }; }
    function pe(t, n) { var e, r = {}, i = {}; for (e in null !== t && "object" == typeof t || (t = {}), null !== n && "object" == typeof n || (n = {}), n)
        e in t ? r[e] = _e(t[e], n[e]) : i[e] = n[e]; return function (t) { for (e in r)
        i[e] = r[e](t); return i; }; }
    var ve = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, ge = new RegExp(ve.source, "g");
    function ye(t, n) { var e, r, i, o = ve.lastIndex = ge.lastIndex = 0, a = -1, u = [], c = []; for (t += "", n += ""; (e = ve.exec(t)) && (r = ge.exec(n));)
        (i = r.index) > o && (i = n.slice(o, i), u[a] ? u[a] += i : u[++a] = i), (e = e[0]) === (r = r[0]) ? u[a] ? u[a] += r : u[++a] = r : (u[++a] = null, c.push({ i: a, x: de(e, r) })), o = ge.lastIndex; return o < n.length && (i = n.slice(o), u[a] ? u[a] += i : u[++a] = i), u.length < 2 ? c[0] ? function (t) { return function (n) { return t(n) + ""; }; }(c[0].x) : function (t) { return function () { return t; }; }(n) : (n = c.length, function (t) { for (var e, r = 0; r < n; ++r)
        u[(e = c[r]).i] = e.x(t); return u.join(""); }); }
    function _e(t, n) { var e, r = typeof n; return null == n || "boolean" === r ? ee(n) : ("number" === r ? de : "string" === r ? (e = hn(n)) ? (n = e, ue) : ye : n instanceof hn ? ue : n instanceof Date ? he : Array.isArray(n) ? le : "function" != typeof n.valueOf && "function" != typeof n.toString || isNaN(n) ? pe : de)(t, n); }
    function be(t, n) { return n -= t = +t, function (e) { return Math.round(t + n * e); }; }
    var me, xe, we, Me, Ne = 180 / Math.PI, Ae = { translateX: 0, translateY: 0, rotate: 0, skewX: 0, scaleX: 1, scaleY: 1 };
    function Te(t, n, e, r, i, o) { var a, u, c; return (a = Math.sqrt(t * t + n * n)) && (t /= a, n /= a), (c = t * e + n * r) && (e -= t * c, r -= n * c), (u = Math.sqrt(e * e + r * r)) && (e /= u, r /= u, c /= u), t * r < n * e && (t = -t, n = -n, c = -c, a = -a), { translateX: i, translateY: o, rotate: Math.atan2(n, t) * Ne, skewX: Math.atan(c) * Ne, scaleX: a, scaleY: u }; }
    function Se(t, n, e, r) { function i(t) { return t.length ? t.pop() + " " : ""; } return function (o, a) { var u = [], c = []; return o = t(o), a = t(a), function (t, r, i, o, a, u) { if (t !== i || r !== o) {
        var c = a.push("translate(", null, n, null, e);
        u.push({ i: c - 4, x: de(t, i) }, { i: c - 2, x: de(r, o) });
    }
    else
        (i || o) && a.push("translate(" + i + n + o + e); }(o.translateX, o.translateY, a.translateX, a.translateY, u, c), function (t, n, e, o) { t !== n ? (t - n > 180 ? n += 360 : n - t > 180 && (t += 360), o.push({ i: e.push(i(e) + "rotate(", null, r) - 2, x: de(t, n) })) : n && e.push(i(e) + "rotate(" + n + r); }(o.rotate, a.rotate, u, c), function (t, n, e, o) { t !== n ? o.push({ i: e.push(i(e) + "skewX(", null, r) - 2, x: de(t, n) }) : n && e.push(i(e) + "skewX(" + n + r); }(o.skewX, a.skewX, u, c), function (t, n, e, r, o, a) { if (t !== e || n !== r) {
        var u = o.push(i(o) + "scale(", null, ",", null, ")");
        a.push({ i: u - 4, x: de(t, e) }, { i: u - 2, x: de(n, r) });
    }
    else
        1 === e && 1 === r || o.push(i(o) + "scale(" + e + "," + r + ")"); }(o.scaleX, o.scaleY, a.scaleX, a.scaleY, u, c), o = a = null, function (t) { for (var n, e = -1, r = c.length; ++e < r;)
        u[(n = c[e]).i] = n.x(t); return u.join(""); }; }; }
    var ke = Se(function (t) { return "none" === t ? Ae : (me || (me = document.createElement("DIV"), xe = document.documentElement, we = document.defaultView), me.style.transform = t, t = we.getComputedStyle(xe.appendChild(me), null).getPropertyValue("transform"), xe.removeChild(me), Te(+(t = t.slice(7, -1).split(","))[0], +t[1], +t[2], +t[3], +t[4], +t[5])); }, "px, ", "px)", "deg)"), Ee = Se(function (t) { return null == t ? Ae : (Me || (Me = document.createElementNS("http://www.w3.org/2000/svg", "g")), Me.setAttribute("transform", t), (t = Me.transform.baseVal.consolidate()) ? Te((t = t.matrix).a, t.b, t.c, t.d, t.e, t.f) : Ae); }, ", ", ")", ")"), Ce = Math.SQRT2, Pe = 2, ze = 4, Re = 1e-12;
    function De(t) { return ((t = Math.exp(t)) + 1 / t) / 2; }
    function qe(t, n) { var e, r, i = t[0], o = t[1], a = t[2], u = n[0], c = n[1], f = n[2], s = u - i, l = c - o, h = s * s + l * l; if (h < Re)
        r = Math.log(f / a) / Ce, e = function (t) { return [i + t * s, o + t * l, a * Math.exp(Ce * t * r)]; };
    else {
        var d = Math.sqrt(h), p = (f * f - a * a + ze * h) / (2 * a * Pe * d), v = (f * f - a * a - ze * h) / (2 * f * Pe * d), g = Math.log(Math.sqrt(p * p + 1) - p), y = Math.log(Math.sqrt(v * v + 1) - v);
        r = (y - g) / Ce, e = function (t) { var n, e = t * r, u = De(g), c = a / (Pe * d) * (u * (n = Ce * e + g, ((n = Math.exp(2 * n)) - 1) / (n + 1)) - function (t) { return ((t = Math.exp(t)) - 1 / t) / 2; }(g)); return [i + c * s, o + c * l, a * u / De(Ce * e + g)]; };
    } return e.duration = 1e3 * r, e; }
    function Le(t) { return function (n, e) { var r = t((n = mn(n)).h, (e = mn(e)).h), i = ae(n.s, e.s), o = ae(n.l, e.l), a = ae(n.opacity, e.opacity); return function (t) { return n.h = r(t), n.s = i(t), n.l = o(t), n.opacity = a(t), n + ""; }; }; }
    var Ue = Le(ie), Oe = Le(ae);
    function Be(t) { return function (n, e) { var r = t((n = Yn(n)).h, (e = Yn(e)).h), i = ae(n.c, e.c), o = ae(n.l, e.l), a = ae(n.opacity, e.opacity); return function (t) { return n.h = r(t), n.c = i(t), n.l = o(t), n.opacity = a(t), n + ""; }; }; }
    var Ye = Be(ie), Fe = Be(ae);
    function Ie(t) { return function n(e) { function r(n, r) { var i = t((n = Qn(n)).h, (r = Qn(r)).h), o = ae(n.s, r.s), a = ae(n.l, r.l), u = ae(n.opacity, r.opacity); return function (t) { return n.h = i(t), n.s = o(t), n.l = a(Math.pow(t, e)), n.opacity = u(t), n + ""; }; } return e = +e, r.gamma = n, r; }(1); }
    var je = Ie(ie), He = Ie(ae);
    var Xe, Ge, Ve = 0, $e = 0, We = 0, Ze = 1e3, Qe = 0, Je = 0, Ke = 0, tr = "object" == typeof performance && performance.now ? performance : Date, nr = "object" == typeof window && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function (t) { setTimeout(t, 17); };
    function er() { return Je || (nr(rr), Je = tr.now() + Ke); }
    function rr() { Je = 0; }
    function ir() { this._call = this._time = this._next = null; }
    function or(t, n, e) { var r = new ir; return r.restart(t, n, e), r; }
    function ar() { er(), ++Ve; for (var t, n = Xe; n;)
        (t = Je - n._time) >= 0 && n._call.call(null, t), n = n._next; --Ve; }
    function ur() { Je = (Qe = tr.now()) + Ke, Ve = $e = 0; try {
        ar();
    }
    finally {
        Ve = 0, function () { var t, n, e = Xe, r = 1 / 0; for (; e;)
            e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : Xe = n); Ge = t, fr(r); }(), Je = 0;
    } }
    function cr() { var t = tr.now(), n = t - Qe; n > Ze && (Ke -= n, Qe = t); }
    function fr(t) { Ve || ($e && ($e = clearTimeout($e)), t - Je > 24 ? (t < 1 / 0 && ($e = setTimeout(ur, t - tr.now() - Ke)), We && (We = clearInterval(We))) : (We || (Qe = tr.now(), We = setInterval(cr, Ze)), Ve = 1, nr(ur))); }
    function sr(t, n, e) { var r = new ir; return n = null == n ? 0 : +n, r.restart(function (e) { r.stop(), t(e + n); }, n, e), r; }
    ir.prototype = or.prototype = { constructor: ir, restart: function (t, n, e) { if ("function" != typeof t)
            throw new TypeError("callback is not a function"); e = (null == e ? er() : +e) + (null == n ? 0 : +n), this._next || Ge === this || (Ge ? Ge._next = this : Xe = this, Ge = this), this._call = t, this._time = e, fr(); }, stop: function () { this._call && (this._call = null, this._time = 1 / 0, fr()); } };
    var lr = I("start", "end", "cancel", "interrupt"), hr = [], dr = 0, pr = 1, vr = 2, gr = 3, yr = 4, _r = 5, br = 6;
    function mr(t, n, e, r, i, o) { var a = t.__transition; if (a) {
        if (e in a)
            return;
    }
    else
        t.__transition = {}; !function (t, n, e) { var r, i = t.__transition; function o(c) { var f, s, l, h; if (e.state !== pr)
        return u(); for (f in i)
        if ((h = i[f]).name === e.name) {
            if (h.state === gr)
                return sr(o);
            h.state === yr ? (h.state = br, h.timer.stop(), h.on.call("interrupt", t, t.__data__, h.index, h.group), delete i[f]) : +f < n && (h.state = br, h.timer.stop(), h.on.call("cancel", t, t.__data__, h.index, h.group), delete i[f]);
        } if (sr(function () { e.state === gr && (e.state = yr, e.timer.restart(a, e.delay, e.time), a(c)); }), e.state = vr, e.on.call("start", t, t.__data__, e.index, e.group), e.state === vr) {
        for (e.state = gr, r = new Array(l = e.tween.length), f = 0, s = -1; f < l; ++f)
            (h = e.tween[f].value.call(t, t.__data__, e.index, e.group)) && (r[++s] = h);
        r.length = s + 1;
    } } function a(n) { for (var i = n < e.duration ? e.ease.call(null, n / e.duration) : (e.timer.restart(u), e.state = _r, 1), o = -1, a = r.length; ++o < a;)
        r[o].call(t, i); e.state === _r && (e.on.call("end", t, t.__data__, e.index, e.group), u()); } function u() { for (var r in e.state = br, e.timer.stop(), delete i[n], i)
        return; delete t.__transition; } i[n] = e, e.timer = or(function (t) { e.state = pr, e.timer.restart(o, e.delay, e.time), e.delay <= t && o(t - e.delay); }, 0, e.time); }(t, e, { name: n, index: r, group: i, on: lr, tween: hr, time: o.time, delay: o.delay, duration: o.duration, ease: o.ease, timer: null, state: dr }); }
    function xr(t, n) { var e = Mr(t, n); if (e.state > dr)
        throw new Error("too late; already scheduled"); return e; }
    function wr(t, n) { var e = Mr(t, n); if (e.state > gr)
        throw new Error("too late; already running"); return e; }
    function Mr(t, n) { var e = t.__transition; if (!e || !(e = e[n]))
        throw new Error("transition not found"); return e; }
    function Nr(t, n) { var e, r, i, o = t.__transition, a = !0; if (o) {
        for (i in n = null == n ? null : n + "", o)
            (e = o[i]).name === n ? (r = e.state > vr && e.state < _r, e.state = br, e.timer.stop(), e.on.call(r ? "interrupt" : "cancel", t, t.__data__, e.index, e.group), delete o[i]) : a = !1;
        a && delete t.__transition;
    } }
    function Ar(t, n, e) { var r = t._id; return t.each(function () { var t = wr(this, r); (t.value || (t.value = {}))[n] = e.apply(this, arguments); }), function (t) { return Mr(t, r).value[n]; }; }
    function Tr(t, n) { var e; return ("number" == typeof n ? de : n instanceof hn ? ue : (e = hn(n)) ? (n = e, ue) : ye)(t, n); }
    var Sr = Pt.prototype.constructor;
    function kr(t) { return function () { this.style.removeProperty(t); }; }
    var Er = 0;
    function Cr(t, n, e, r) { this._groups = t, this._parents = n, this._name = e, this._id = r; }
    function Pr(t) { return Pt().transition(t); }
    function zr() { return ++Er; }
    var Rr = Pt.prototype;
    function Dr(t) { return ((t *= 2) <= 1 ? t * t : --t * (2 - t) + 1) / 2; }
    function qr(t) { return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2; }
    Cr.prototype = Pr.prototype = { constructor: Cr, select: function (t) { var n = this._name, e = this._id; "function" != typeof t && (t = Q(t)); for (var r = this._groups, i = r.length, o = new Array(i), a = 0; a < i; ++a)
            for (var u, c, f = r[a], s = f.length, l = o[a] = new Array(s), h = 0; h < s; ++h)
                (u = f[h]) && (c = t.call(u, u.__data__, h, f)) && ("__data__" in u && (c.__data__ = u.__data__), l[h] = c, mr(l[h], n, e, h, l, Mr(u, e))); return new Cr(o, this._parents, n, e); }, selectAll: function (t) { var n = this._name, e = this._id; "function" != typeof t && (t = K(t)); for (var r = this._groups, i = r.length, o = [], a = [], u = 0; u < i; ++u)
            for (var c, f = r[u], s = f.length, l = 0; l < s; ++l)
                if (c = f[l]) {
                    for (var h, d = t.call(c, c.__data__, l, f), p = Mr(c, e), v = 0, g = d.length; v < g; ++v)
                        (h = d[v]) && mr(h, n, e, v, d, p);
                    o.push(d), a.push(c);
                } return new Cr(o, a, n, e); }, filter: function (t) { "function" != typeof t && (t = tt(t)); for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
            for (var o, a = n[i], u = a.length, c = r[i] = [], f = 0; f < u; ++f)
                (o = a[f]) && t.call(o, o.__data__, f, a) && c.push(o); return new Cr(r, this._parents, this._name, this._id); }, merge: function (t) { if (t._id !== this._id)
            throw new Error; for (var n = this._groups, e = t._groups, r = n.length, i = e.length, o = Math.min(r, i), a = new Array(r), u = 0; u < o; ++u)
            for (var c, f = n[u], s = e[u], l = f.length, h = a[u] = new Array(l), d = 0; d < l; ++d)
                (c = f[d] || s[d]) && (h[d] = c); for (; u < r; ++u)
            a[u] = n[u]; return new Cr(a, this._parents, this._name, this._id); }, selection: function () { return new Sr(this._groups, this._parents); }, transition: function () { for (var t = this._name, n = this._id, e = zr(), r = this._groups, i = r.length, o = 0; o < i; ++o)
            for (var a, u = r[o], c = u.length, f = 0; f < c; ++f)
                if (a = u[f]) {
                    var s = Mr(a, n);
                    mr(a, t, e, f, u, { time: s.time + s.delay + s.duration, delay: 0, duration: s.duration, ease: s.ease });
                } return new Cr(r, this._parents, t, e); }, call: Rr.call, nodes: Rr.nodes, node: Rr.node, size: Rr.size, empty: Rr.empty, each: Rr.each, on: function (t, n) { var e = this._id; return arguments.length < 2 ? Mr(this.node(), e).on.on(t) : this.each(function (t, n, e) { var r, i, o = function (t) { return (t + "").trim().split(/^|\s+/).every(function (t) { var n = t.indexOf("."); return n >= 0 && (t = t.slice(0, n)), !t || "start" === t; }); }(n) ? xr : wr; return function () { var a = o(this, t), u = a.on; u !== r && (i = (r = u).copy()).on(n, e), a.on = i; }; }(e, t, n)); }, attr: function (t, n) { var e = $(t), r = "transform" === e ? Ee : Tr; return this.attrTween(t, "function" == typeof n ? (e.local ? function (t, n, e) { var r, i, o; return function () { var a, u, c = e(this); if (null != c)
            return (a = this.getAttributeNS(t.space, t.local)) === (u = c + "") ? null : a === r && u === i ? o : (i = u, o = n(r = a, c)); this.removeAttributeNS(t.space, t.local); }; } : function (t, n, e) { var r, i, o; return function () { var a, u, c = e(this); if (null != c)
            return (a = this.getAttribute(t)) === (u = c + "") ? null : a === r && u === i ? o : (i = u, o = n(r = a, c)); this.removeAttribute(t); }; })(e, r, Ar(this, "attr." + t, n)) : null == n ? (e.local ? function (t) { return function () { this.removeAttributeNS(t.space, t.local); }; } : function (t) { return function () { this.removeAttribute(t); }; })(e) : (e.local ? function (t, n, e) { var r, i, o = e + ""; return function () { var a = this.getAttributeNS(t.space, t.local); return a === o ? null : a === r ? i : i = n(r = a, e); }; } : function (t, n, e) { var r, i, o = e + ""; return function () { var a = this.getAttribute(t); return a === o ? null : a === r ? i : i = n(r = a, e); }; })(e, r, n)); }, attrTween: function (t, n) { var e = "attr." + t; if (arguments.length < 2)
            return (e = this.tween(e)) && e._value; if (null == n)
            return this.tween(e, null); if ("function" != typeof n)
            throw new Error; var r = $(t); return this.tween(e, (r.local ? function (t, n) { var e, r; function i() { var i = n.apply(this, arguments); return i !== r && (e = (r = i) && function (t, n) { return function (e) { this.setAttributeNS(t.space, t.local, n(e)); }; }(t, i)), e; } return i._value = n, i; } : function (t, n) { var e, r; function i() { var i = n.apply(this, arguments); return i !== r && (e = (r = i) && function (t, n) { return function (e) { this.setAttribute(t, n(e)); }; }(t, i)), e; } return i._value = n, i; })(r, n)); }, style: function (t, n, e) { var r = "transform" == (t += "") ? ke : Tr; return null == n ? this.styleTween(t, function (t, n) { var e, r, i; return function () { var o = ct(this, t), a = (this.style.removeProperty(t), ct(this, t)); return o === a ? null : o === e && a === r ? i : i = n(e = o, r = a); }; }(t, r)).on("end.style." + t, kr(t)) : "function" == typeof n ? this.styleTween(t, function (t, n, e) { var r, i, o; return function () { var a = ct(this, t), u = e(this), c = u + ""; return null == u && (this.style.removeProperty(t), c = u = ct(this, t)), a === c ? null : a === r && c === i ? o : (i = c, o = n(r = a, u)); }; }(t, r, Ar(this, "style." + t, n))).each(function (t, n) { var e, r, i, o, a = "style." + n, u = "end." + a; return function () { var c = wr(this, t), f = c.on, s = null == c.value[a] ? o || (o = kr(n)) : void 0; f === e && i === s || (r = (e = f).copy()).on(u, i = s), c.on = r; }; }(this._id, t)) : this.styleTween(t, function (t, n, e) { var r, i, o = e + ""; return function () { var a = ct(this, t); return a === o ? null : a === r ? i : i = n(r = a, e); }; }(t, r, n), e).on("end.style." + t, null); }, styleTween: function (t, n, e) { var r = "style." + (t += ""); if (arguments.length < 2)
            return (r = this.tween(r)) && r._value; if (null == n)
            return this.tween(r, null); if ("function" != typeof n)
            throw new Error; return this.tween(r, function (t, n, e) { var r, i; function o() { var o = n.apply(this, arguments); return o !== i && (r = (i = o) && function (t, n, e) { return function (r) { this.style.setProperty(t, n(r), e); }; }(t, o, e)), r; } return o._value = n, o; }(t, n, null == e ? "" : e)); }, text: function (t) { return this.tween("text", "function" == typeof t ? function (t) { return function () { var n = t(this); this.textContent = null == n ? "" : n; }; }(Ar(this, "text", t)) : function (t) { return function () { this.textContent = t; }; }(null == t ? "" : t + "")); }, remove: function () { return this.on("end.remove", (t = this._id, function () { var n = this.parentNode; for (var e in this.__transition)
            if (+e !== t)
                return; n && n.removeChild(this); })); var t; }, tween: function (t, n) { var e = this._id; if (t += "", arguments.length < 2) {
            for (var r, i = Mr(this.node(), e).tween, o = 0, a = i.length; o < a; ++o)
                if ((r = i[o]).name === t)
                    return r.value;
            return null;
        } return this.each((null == n ? function (t, n) { var e, r; return function () { var i = wr(this, t), o = i.tween; if (o !== e)
            for (var a = 0, u = (r = e = o).length; a < u; ++a)
                if (r[a].name === n) {
                    (r = r.slice()).splice(a, 1);
                    break;
                } i.tween = r; }; } : function (t, n, e) { var r, i; if ("function" != typeof e)
            throw new Error; return function () { var o = wr(this, t), a = o.tween; if (a !== r) {
            i = (r = a).slice();
            for (var u = { name: n, value: e }, c = 0, f = i.length; c < f; ++c)
                if (i[c].name === n) {
                    i[c] = u;
                    break;
                }
            c === f && i.push(u);
        } o.tween = i; }; })(e, t, n)); }, delay: function (t) { var n = this._id; return arguments.length ? this.each(("function" == typeof t ? function (t, n) { return function () { xr(this, t).delay = +n.apply(this, arguments); }; } : function (t, n) { return n = +n, function () { xr(this, t).delay = n; }; })(n, t)) : Mr(this.node(), n).delay; }, duration: function (t) { var n = this._id; return arguments.length ? this.each(("function" == typeof t ? function (t, n) { return function () { wr(this, t).duration = +n.apply(this, arguments); }; } : function (t, n) { return n = +n, function () { wr(this, t).duration = n; }; })(n, t)) : Mr(this.node(), n).duration; }, ease: function (t) { var n = this._id; return arguments.length ? this.each(function (t, n) { if ("function" != typeof n)
            throw new Error; return function () { wr(this, t).ease = n; }; }(n, t)) : Mr(this.node(), n).ease; }, end: function () { var t, n, e = this, r = e._id, i = e.size(); return new Promise(function (o, a) { var u = { value: a }, c = { value: function () { 0 == --i && o(); } }; e.each(function () { var e = wr(this, r), i = e.on; i !== t && ((n = (t = i).copy())._.cancel.push(u), n._.interrupt.push(u), n._.end.push(c)), e.on = n; }); }); } };
    var Lr = function t(n) { function e(t) { return Math.pow(t, n); } return n = +n, e.exponent = t, e; }(3), Ur = function t(n) { function e(t) { return 1 - Math.pow(1 - t, n); } return n = +n, e.exponent = t, e; }(3), Or = function t(n) { function e(t) { return ((t *= 2) <= 1 ? Math.pow(t, n) : 2 - Math.pow(2 - t, n)) / 2; } return n = +n, e.exponent = t, e; }(3), Br = Math.PI, Yr = Br / 2;
    function Fr(t) { return (1 - Math.cos(Br * t)) / 2; }
    function Ir(t) { return ((t *= 2) <= 1 ? Math.pow(2, 10 * t - 10) : 2 - Math.pow(2, 10 - 10 * t)) / 2; }
    function jr(t) { return ((t *= 2) <= 1 ? 1 - Math.sqrt(1 - t * t) : Math.sqrt(1 - (t -= 2) * t) + 1) / 2; }
    var Hr = 4 / 11, Xr = 6 / 11, Gr = 8 / 11, Vr = .75, $r = 9 / 11, Wr = 10 / 11, Zr = .9375, Qr = 21 / 22, Jr = 63 / 64, Kr = 1 / Hr / Hr;
    function ti(t) { return (t = +t) < Hr ? Kr * t * t : t < Gr ? Kr * (t -= Xr) * t + Vr : t < Wr ? Kr * (t -= $r) * t + Zr : Kr * (t -= Qr) * t + Jr; }
    var ni = function t(n) { function e(t) { return t * t * ((n + 1) * t - n); } return n = +n, e.overshoot = t, e; }(1.70158), ei = function t(n) { function e(t) { return --t * t * ((n + 1) * t + n) + 1; } return n = +n, e.overshoot = t, e; }(1.70158), ri = function t(n) { function e(t) { return ((t *= 2) < 1 ? t * t * ((n + 1) * t - n) : (t -= 2) * t * ((n + 1) * t + n) + 2) / 2; } return n = +n, e.overshoot = t, e; }(1.70158), ii = 2 * Math.PI, oi = function t(n, e) { var r = Math.asin(1 / (n = Math.max(1, n))) * (e /= ii); function i(t) { return n * Math.pow(2, 10 * --t) * Math.sin((r - t) / e); } return i.amplitude = function (n) { return t(n, e * ii); }, i.period = function (e) { return t(n, e); }, i; }(1, .3), ai = function t(n, e) { var r = Math.asin(1 / (n = Math.max(1, n))) * (e /= ii); function i(t) { return 1 - n * Math.pow(2, -10 * (t = +t)) * Math.sin((t + r) / e); } return i.amplitude = function (n) { return t(n, e * ii); }, i.period = function (e) { return t(n, e); }, i; }(1, .3), ui = function t(n, e) { var r = Math.asin(1 / (n = Math.max(1, n))) * (e /= ii); function i(t) { return ((t = 2 * t - 1) < 0 ? n * Math.pow(2, 10 * t) * Math.sin((r - t) / e) : 2 - n * Math.pow(2, -10 * t) * Math.sin((r + t) / e)) / 2; } return i.amplitude = function (n) { return t(n, e * ii); }, i.period = function (e) { return t(n, e); }, i; }(1, .3), ci = { time: null, delay: 0, duration: 250, ease: qr };
    function fi(t, n) { for (var e; !(e = t.__transition) || !(e = e[n]);)
        if (!(t = t.parentNode))
            return ci.time = er(), ci; return e; }
    Pt.prototype.interrupt = function (t) { return this.each(function () { Nr(this, t); }); }, Pt.prototype.transition = function (t) { var n, e; t instanceof Cr ? (n = t._id, t = t._name) : (n = zr(), (e = ci).time = er(), t = null == t ? null : t + ""); for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
        for (var a, u = r[o], c = u.length, f = 0; f < c; ++f)
            (a = u[f]) && mr(a, t, n, f, u, e || fi(a, n)); return new Cr(r, this._parents, t, n); };
    var si = [null];
    function li(t) { return function () { return t; }; }
    function hi(t, n, e) { this.target = t, this.type = n, this.selection = e; }
    function di() { t.event.stopImmediatePropagation(); }
    function pi() { t.event.preventDefault(), t.event.stopImmediatePropagation(); }
    var vi = { name: "drag" }, gi = { name: "space" }, yi = { name: "handle" }, _i = { name: "center" }, bi = { name: "x", handles: ["e", "w"].map(Si), input: function (t, n) { return t && [[t[0], n[0][1]], [t[1], n[1][1]]]; }, output: function (t) { return t && [t[0][0], t[1][0]]; } }, mi = { name: "y", handles: ["n", "s"].map(Si), input: function (t, n) { return t && [[n[0][0], t[0]], [n[1][0], t[1]]]; }, output: function (t) { return t && [t[0][1], t[1][1]]; } }, xi = { name: "xy", handles: ["n", "e", "s", "w", "nw", "ne", "se", "sw"].map(Si), input: function (t) { return t; }, output: function (t) { return t; } }, wi = { overlay: "crosshair", selection: "move", n: "ns-resize", e: "ew-resize", s: "ns-resize", w: "ew-resize", nw: "nwse-resize", ne: "nesw-resize", se: "nwse-resize", sw: "nesw-resize" }, Mi = { e: "w", w: "e", nw: "ne", ne: "nw", se: "sw", sw: "se" }, Ni = { n: "s", s: "n", nw: "sw", ne: "se", se: "ne", sw: "nw" }, Ai = { overlay: 1, selection: 1, n: null, e: 1, s: null, w: -1, nw: -1, ne: 1, se: 1, sw: -1 }, Ti = { overlay: 1, selection: 1, n: -1, e: null, s: 1, w: null, nw: -1, ne: -1, se: 1, sw: 1 };
    function Si(t) { return { type: t }; }
    function ki() { return !t.event.button; }
    function Ei() { var t = this.ownerSVGElement || this; return [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]; }
    function Ci(t) { for (; !t.__brush;)
        if (!(t = t.parentNode))
            return; return t.__brush; }
    function Pi(t) { return t[0][0] === t[1][0] || t[0][1] === t[1][1]; }
    function zi(n) { var e, r = Ei, i = ki, o = I(u, "start", "brush", "end"), a = 6; function u(t) { var e = t.property("__brush", h).selectAll(".overlay").data([Si("overlay")]); e.enter().append("rect").attr("class", "overlay").attr("pointer-events", "all").attr("cursor", wi.overlay).merge(e).each(function () { var t = Ci(this).extent; zt(this).attr("x", t[0][0]).attr("y", t[0][1]).attr("width", t[1][0] - t[0][0]).attr("height", t[1][1] - t[0][1]); }), t.selectAll(".selection").data([Si("selection")]).enter().append("rect").attr("class", "selection").attr("cursor", wi.selection).attr("fill", "#777").attr("fill-opacity", .3).attr("stroke", "#fff").attr("shape-rendering", "crispEdges"); var r = t.selectAll(".handle").data(n.handles, function (t) { return t.type; }); r.exit().remove(), r.enter().append("rect").attr("class", function (t) { return "handle handle--" + t.type; }).attr("cursor", function (t) { return wi[t.type]; }), t.each(c).attr("fill", "none").attr("pointer-events", "all").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)").on("mousedown.brush touchstart.brush", l); } function c() { var t = zt(this), n = Ci(this).selection; n ? (t.selectAll(".selection").style("display", null).attr("x", n[0][0]).attr("y", n[0][1]).attr("width", n[1][0] - n[0][0]).attr("height", n[1][1] - n[0][1]), t.selectAll(".handle").style("display", null).attr("x", function (t) { return "e" === t.type[t.type.length - 1] ? n[1][0] - a / 2 : n[0][0] - a / 2; }).attr("y", function (t) { return "s" === t.type[0] ? n[1][1] - a / 2 : n[0][1] - a / 2; }).attr("width", function (t) { return "n" === t.type || "s" === t.type ? n[1][0] - n[0][0] + a : a; }).attr("height", function (t) { return "e" === t.type || "w" === t.type ? n[1][1] - n[0][1] + a : a; })) : t.selectAll(".selection,.handle").style("display", "none").attr("x", null).attr("y", null).attr("width", null).attr("height", null); } function f(t, n) { return t.__brush.emitter || new s(t, n); } function s(t, n) { this.that = t, this.args = n, this.state = t.__brush, this.active = 0; } function l() { if (t.event.touches) {
        if (t.event.changedTouches.length < t.event.touches.length)
            return pi();
    }
    else if (e)
        return; if (i.apply(this, arguments)) {
        var r, o, a, u, s, l, h, d, p, v, g, y, _, b = this, m = t.event.target.__data__.type, x = "selection" === (t.event.metaKey ? m = "overlay" : m) ? vi : t.event.altKey ? _i : yi, w = n === mi ? null : Ai[m], M = n === bi ? null : Ti[m], N = Ci(b), A = N.extent, T = N.selection, S = A[0][0], k = A[0][1], E = A[1][0], C = A[1][1], P = w && M && t.event.shiftKey, z = Ot(b), R = z, D = f(b, arguments).beforestart();
        "overlay" === m ? N.selection = T = [[r = n === mi ? S : z[0], a = n === bi ? k : z[1]], [s = n === mi ? E : r, h = n === bi ? C : a]] : (r = T[0][0], a = T[0][1], s = T[1][0], h = T[1][1]), o = r, u = a, l = s, d = h;
        var q = zt(b).attr("pointer-events", "none"), L = q.selectAll(".overlay").attr("cursor", wi[m]);
        if (t.event.touches)
            q.on("touchmove.brush", O, !0).on("touchend.brush touchcancel.brush", Y, !0);
        else {
            var U = zt(t.event.view).on("keydown.brush", function () { switch (t.event.keyCode) {
                case 16:
                    P = w && M;
                    break;
                case 18:
                    x === yi && (w && (s = l - p * w, r = o + p * w), M && (h = d - v * M, a = u + v * M), x = _i, B());
                    break;
                case 32:
                    x !== yi && x !== _i || (w < 0 ? s = l - p : w > 0 && (r = o - p), M < 0 ? h = d - v : M > 0 && (a = u - v), x = gi, L.attr("cursor", wi.selection), B());
                    break;
                default: return;
            } pi(); }, !0).on("keyup.brush", function () { switch (t.event.keyCode) {
                case 16:
                    P && (y = _ = P = !1, B());
                    break;
                case 18:
                    x === _i && (w < 0 ? s = l : w > 0 && (r = o), M < 0 ? h = d : M > 0 && (a = u), x = yi, B());
                    break;
                case 32:
                    x === gi && (t.event.altKey ? (w && (s = l - p * w, r = o + p * w), M && (h = d - v * M, a = u + v * M), x = _i) : (w < 0 ? s = l : w > 0 && (r = o), M < 0 ? h = d : M > 0 && (a = u), x = yi), L.attr("cursor", wi[m]), B());
                    break;
                default: return;
            } pi(); }, !0).on("mousemove.brush", O, !0).on("mouseup.brush", Y, !0);
            It(t.event.view);
        }
        di(), Nr(b), c.call(b), D.start();
    } function O() { var t = Ot(b); !P || y || _ || (Math.abs(t[0] - R[0]) > Math.abs(t[1] - R[1]) ? _ = !0 : y = !0), R = t, g = !0, pi(), B(); } function B() { var t; switch (p = R[0] - z[0], v = R[1] - z[1], x) {
        case gi:
        case vi:
            w && (p = Math.max(S - r, Math.min(E - s, p)), o = r + p, l = s + p), M && (v = Math.max(k - a, Math.min(C - h, v)), u = a + v, d = h + v);
            break;
        case yi:
            w < 0 ? (p = Math.max(S - r, Math.min(E - r, p)), o = r + p, l = s) : w > 0 && (p = Math.max(S - s, Math.min(E - s, p)), o = r, l = s + p), M < 0 ? (v = Math.max(k - a, Math.min(C - a, v)), u = a + v, d = h) : M > 0 && (v = Math.max(k - h, Math.min(C - h, v)), u = a, d = h + v);
            break;
        case _i: w && (o = Math.max(S, Math.min(E, r - p * w)), l = Math.max(S, Math.min(E, s + p * w))), M && (u = Math.max(k, Math.min(C, a - v * M)), d = Math.max(k, Math.min(C, h + v * M)));
    } l < o && (w *= -1, t = r, r = s, s = t, t = o, o = l, l = t, m in Mi && L.attr("cursor", wi[m = Mi[m]])), d < u && (M *= -1, t = a, a = h, h = t, t = u, u = d, d = t, m in Ni && L.attr("cursor", wi[m = Ni[m]])), N.selection && (T = N.selection), y && (o = T[0][0], l = T[1][0]), _ && (u = T[0][1], d = T[1][1]), T[0][0] === o && T[0][1] === u && T[1][0] === l && T[1][1] === d || (N.selection = [[o, u], [l, d]], c.call(b), D.brush()); } function Y() { if (di(), t.event.touches) {
        if (t.event.touches.length)
            return;
        e && clearTimeout(e), e = setTimeout(function () { e = null; }, 500), q.on("touchmove.brush touchend.brush touchcancel.brush", null);
    }
    else
        jt(t.event.view, g), U.on("keydown.brush keyup.brush mousemove.brush mouseup.brush", null); q.attr("pointer-events", "all"), L.attr("cursor", wi.overlay), N.selection && (T = N.selection), Pi(T) && (N.selection = null, c.call(b)), D.end(); } } function h() { var t = this.__brush || { selection: null }; return t.extent = r.apply(this, arguments), t.dim = n, t; } return u.move = function (t, e) { t.selection ? t.on("start.brush", function () { f(this, arguments).beforestart().start(); }).on("interrupt.brush end.brush", function () { f(this, arguments).end(); }).tween("brush", function () { var t = this, r = t.__brush, i = f(t, arguments), o = r.selection, a = n.input("function" == typeof e ? e.apply(this, arguments) : e, r.extent), u = _e(o, a); function s(n) { r.selection = 1 === n && Pi(a) ? null : u(n), c.call(t), i.brush(); } return o && a ? s : s(1); }) : t.each(function () { var t = arguments, r = this.__brush, i = n.input("function" == typeof e ? e.apply(this, t) : e, r.extent), o = f(this, t).beforestart(); Nr(this), r.selection = null == i || Pi(i) ? null : i, c.call(this), o.start().brush().end(); }); }, s.prototype = { beforestart: function () { return 1 == ++this.active && (this.state.emitter = this, this.starting = !0), this; }, start: function () { return this.starting && (this.starting = !1, this.emit("start")), this; }, brush: function () { return this.emit("brush"), this; }, end: function () { return 0 == --this.active && (delete this.state.emitter, this.emit("end")), this; }, emit: function (t) { St(new hi(u, t, n.output(this.state.selection)), o.apply, o, [t, this.that, this.args]); } }, u.extent = function (t) { return arguments.length ? (r = "function" == typeof t ? t : li([[+t[0][0], +t[0][1]], [+t[1][0], +t[1][1]]]), u) : r; }, u.filter = function (t) { return arguments.length ? (i = "function" == typeof t ? t : li(!!t), u) : i; }, u.handleSize = function (t) { return arguments.length ? (a = +t, u) : a; }, u.on = function () { var t = o.on.apply(o, arguments); return t === o ? u : t; }, u; }
    var Ri = Math.cos, Di = Math.sin, qi = Math.PI, Li = qi / 2, Ui = 2 * qi, Oi = Math.max;
    var Bi = Array.prototype.slice;
    function Yi(t) { return function () { return t; }; }
    var Fi = Math.PI, Ii = 2 * Fi, ji = Ii - 1e-6;
    function Hi() { this._x0 = this._y0 = this._x1 = this._y1 = null, this._ = ""; }
    function Xi() { return new Hi; }
    function Gi(t) { return t.source; }
    function Vi(t) { return t.target; }
    function $i(t) { return t.radius; }
    function Wi(t) { return t.startAngle; }
    function Zi(t) { return t.endAngle; }
    Hi.prototype = Xi.prototype = { constructor: Hi, moveTo: function (t, n) { this._ += "M" + (this._x0 = this._x1 = +t) + "," + (this._y0 = this._y1 = +n); }, closePath: function () { null !== this._x1 && (this._x1 = this._x0, this._y1 = this._y0, this._ += "Z"); }, lineTo: function (t, n) { this._ += "L" + (this._x1 = +t) + "," + (this._y1 = +n); }, quadraticCurveTo: function (t, n, e, r) { this._ += "Q" + +t + "," + +n + "," + (this._x1 = +e) + "," + (this._y1 = +r); }, bezierCurveTo: function (t, n, e, r, i, o) { this._ += "C" + +t + "," + +n + "," + +e + "," + +r + "," + (this._x1 = +i) + "," + (this._y1 = +o); }, arcTo: function (t, n, e, r, i) { t = +t, n = +n, e = +e, r = +r, i = +i; var o = this._x1, a = this._y1, u = e - t, c = r - n, f = o - t, s = a - n, l = f * f + s * s; if (i < 0)
            throw new Error("negative radius: " + i); if (null === this._x1)
            this._ += "M" + (this._x1 = t) + "," + (this._y1 = n);
        else if (l > 1e-6)
            if (Math.abs(s * u - c * f) > 1e-6 && i) {
                var h = e - o, d = r - a, p = u * u + c * c, v = h * h + d * d, g = Math.sqrt(p), y = Math.sqrt(l), _ = i * Math.tan((Fi - Math.acos((p + l - v) / (2 * g * y))) / 2), b = _ / y, m = _ / g;
                Math.abs(b - 1) > 1e-6 && (this._ += "L" + (t + b * f) + "," + (n + b * s)), this._ += "A" + i + "," + i + ",0,0," + +(s * h > f * d) + "," + (this._x1 = t + m * u) + "," + (this._y1 = n + m * c);
            }
            else
                this._ += "L" + (this._x1 = t) + "," + (this._y1 = n);
        else
            ; }, arc: function (t, n, e, r, i, o) { t = +t, n = +n; var a = (e = +e) * Math.cos(r), u = e * Math.sin(r), c = t + a, f = n + u, s = 1 ^ o, l = o ? r - i : i - r; if (e < 0)
            throw new Error("negative radius: " + e); null === this._x1 ? this._ += "M" + c + "," + f : (Math.abs(this._x1 - c) > 1e-6 || Math.abs(this._y1 - f) > 1e-6) && (this._ += "L" + c + "," + f), e && (l < 0 && (l = l % Ii + Ii), l > ji ? this._ += "A" + e + "," + e + ",0,1," + s + "," + (t - a) + "," + (n - u) + "A" + e + "," + e + ",0,1," + s + "," + (this._x1 = c) + "," + (this._y1 = f) : l > 1e-6 && (this._ += "A" + e + "," + e + ",0," + +(l >= Fi) + "," + s + "," + (this._x1 = t + e * Math.cos(i)) + "," + (this._y1 = n + e * Math.sin(i)))); }, rect: function (t, n, e, r) { this._ += "M" + (this._x0 = this._x1 = +t) + "," + (this._y0 = this._y1 = +n) + "h" + +e + "v" + +r + "h" + -e + "Z"; }, toString: function () { return this._; } };
    function Qi() { }
    function Ji(t, n) { var e = new Qi; if (t instanceof Qi)
        t.each(function (t, n) { e.set(n, t); });
    else if (Array.isArray(t)) {
        var r, i = -1, o = t.length;
        if (null == n)
            for (; ++i < o;)
                e.set(i, t[i]);
        else
            for (; ++i < o;)
                e.set(n(r = t[i], i, t), r);
    }
    else if (t)
        for (var a in t)
            e.set(a, t[a]); return e; }
    function Ki() { return {}; }
    function to(t, n, e) { t[n] = e; }
    function no() { return Ji(); }
    function eo(t, n, e) { t.set(n, e); }
    function ro() { }
    Qi.prototype = Ji.prototype = { constructor: Qi, has: function (t) { return "$" + t in this; }, get: function (t) { return this["$" + t]; }, set: function (t, n) { return this["$" + t] = n, this; }, remove: function (t) { var n = "$" + t; return n in this && delete this[n]; }, clear: function () { for (var t in this)
            "$" === t[0] && delete this[t]; }, keys: function () { var t = []; for (var n in this)
            "$" === n[0] && t.push(n.slice(1)); return t; }, values: function () { var t = []; for (var n in this)
            "$" === n[0] && t.push(this[n]); return t; }, entries: function () { var t = []; for (var n in this)
            "$" === n[0] && t.push({ key: n.slice(1), value: this[n] }); return t; }, size: function () { var t = 0; for (var n in this)
            "$" === n[0] && ++t; return t; }, empty: function () { for (var t in this)
            if ("$" === t[0])
                return !1; return !0; }, each: function (t) { for (var n in this)
            "$" === n[0] && t(this[n], n.slice(1), this); } };
    var io = Ji.prototype;
    function oo(t, n) { var e = new ro; if (t instanceof ro)
        t.each(function (t) { e.add(t); });
    else if (t) {
        var r = -1, i = t.length;
        if (null == n)
            for (; ++r < i;)
                e.add(t[r]);
        else
            for (; ++r < i;)
                e.add(n(t[r], r, t));
    } return e; }
    ro.prototype = oo.prototype = { constructor: ro, has: io.has, add: function (t) { return this["$" + (t += "")] = t, this; }, remove: io.remove, clear: io.clear, values: io.keys, size: io.size, empty: io.empty, each: io.each };
    var ao = Array.prototype.slice;
    function uo(t, n) { return t - n; }
    function co(t) { return function () { return t; }; }
    function fo(t, n) { for (var e, r = -1, i = n.length; ++r < i;)
        if (e = so(t, n[r]))
            return e; return 0; }
    function so(t, n) { for (var e = n[0], r = n[1], i = -1, o = 0, a = t.length, u = a - 1; o < a; u = o++) {
        var c = t[o], f = c[0], s = c[1], l = t[u], h = l[0], d = l[1];
        if (lo(c, l, n))
            return 0;
        s > r != d > r && e < (h - f) * (r - s) / (d - s) + f && (i = -i);
    } return i; }
    function lo(t, n, e) { var r, i, o, a; return function (t, n, e) { return (n[0] - t[0]) * (e[1] - t[1]) == (e[0] - t[0]) * (n[1] - t[1]); }(t, n, e) && (i = t[r = +(t[0] === n[0])], o = e[r], a = n[r], i <= o && o <= a || a <= o && o <= i); }
    function ho() { }
    var po = [[], [[[1, 1.5], [.5, 1]]], [[[1.5, 1], [1, 1.5]]], [[[1.5, 1], [.5, 1]]], [[[1, .5], [1.5, 1]]], [[[1, 1.5], [.5, 1]], [[1, .5], [1.5, 1]]], [[[1, .5], [1, 1.5]]], [[[1, .5], [.5, 1]]], [[[.5, 1], [1, .5]]], [[[1, 1.5], [1, .5]]], [[[.5, 1], [1, .5]], [[1.5, 1], [1, 1.5]]], [[[1.5, 1], [1, .5]]], [[[.5, 1], [1.5, 1]]], [[[1, 1.5], [1.5, 1]]], [[[.5, 1], [1, 1.5]]], []];
    function vo() { var t = 1, n = 1, e = M, r = u; function i(t) { var n = e(t); if (Array.isArray(n))
        n = n.slice().sort(uo);
    else {
        var r = s(t), i = r[0], a = r[1];
        n = w(i, a, n), n = g(Math.floor(i / n) * n, Math.floor(a / n) * n, n);
    } return n.map(function (n) { return o(t, n); }); } function o(e, i) { var o = [], u = []; return function (e, r, i) { var o, u, c, f, s, l, h = new Array, d = new Array; o = u = -1, f = e[0] >= r, po[f << 1].forEach(p); for (; ++o < t - 1;)
        c = f, f = e[o + 1] >= r, po[c | f << 1].forEach(p); po[f << 0].forEach(p); for (; ++u < n - 1;) {
        for (o = -1, f = e[u * t + t] >= r, s = e[u * t] >= r, po[f << 1 | s << 2].forEach(p); ++o < t - 1;)
            c = f, f = e[u * t + t + o + 1] >= r, l = s, s = e[u * t + o + 1] >= r, po[c | f << 1 | s << 2 | l << 3].forEach(p);
        po[f | s << 3].forEach(p);
    } o = -1, s = e[u * t] >= r, po[s << 2].forEach(p); for (; ++o < t - 1;)
        l = s, s = e[u * t + o + 1] >= r, po[s << 2 | l << 3].forEach(p); function p(t) { var n, e, r = [t[0][0] + o, t[0][1] + u], c = [t[1][0] + o, t[1][1] + u], f = a(r), s = a(c); (n = d[f]) ? (e = h[s]) ? (delete d[n.end], delete h[e.start], n === e ? (n.ring.push(c), i(n.ring)) : h[n.start] = d[e.end] = { start: n.start, end: e.end, ring: n.ring.concat(e.ring) }) : (delete d[n.end], n.ring.push(c), d[n.end = s] = n) : (n = h[s]) ? (e = d[f]) ? (delete h[n.start], delete d[e.end], n === e ? (n.ring.push(c), i(n.ring)) : h[e.start] = d[n.end] = { start: e.start, end: n.end, ring: e.ring.concat(n.ring) }) : (delete h[n.start], n.ring.unshift(r), h[n.start = f] = n) : h[f] = d[s] = { start: f, end: s, ring: [r, c] }; } po[s << 3].forEach(p); }(e, i, function (t) { r(t, e, i), function (t) { for (var n = 0, e = t.length, r = t[e - 1][1] * t[0][0] - t[e - 1][0] * t[0][1]; ++n < e;)
        r += t[n - 1][1] * t[n][0] - t[n - 1][0] * t[n][1]; return r; }(t) > 0 ? o.push([t]) : u.push(t); }), u.forEach(function (t) { for (var n, e = 0, r = o.length; e < r; ++e)
        if (-1 !== fo((n = o[e])[0], t))
            return void n.push(t); }), { type: "MultiPolygon", value: i, coordinates: o }; } function a(n) { return 2 * n[0] + n[1] * (t + 1) * 4; } function u(e, r, i) { e.forEach(function (e) { var o, a = e[0], u = e[1], c = 0 | a, f = 0 | u, s = r[f * t + c]; a > 0 && a < t && c === a && (o = r[f * t + c - 1], e[0] = a + (i - o) / (s - o) - .5), u > 0 && u < n && f === u && (o = r[(f - 1) * t + c], e[1] = u + (i - o) / (s - o) - .5); }); } return i.contour = o, i.size = function (e) { if (!arguments.length)
        return [t, n]; var r = Math.ceil(e[0]), o = Math.ceil(e[1]); if (!(r > 0 && o > 0))
        throw new Error("invalid size"); return t = r, n = o, i; }, i.thresholds = function (t) { return arguments.length ? (e = "function" == typeof t ? t : Array.isArray(t) ? co(ao.call(t)) : co(t), i) : e; }, i.smooth = function (t) { return arguments.length ? (r = t ? u : ho, i) : r === u; }, i; }
    function go(t, n, e) { for (var r = t.width, i = t.height, o = 1 + (e << 1), a = 0; a < i; ++a)
        for (var u = 0, c = 0; u < r + e; ++u)
            u < r && (c += t.data[u + a * r]), u >= e && (u >= o && (c -= t.data[u - o + a * r]), n.data[u - e + a * r] = c / Math.min(u + 1, r - 1 + o - u, o)); }
    function yo(t, n, e) { for (var r = t.width, i = t.height, o = 1 + (e << 1), a = 0; a < r; ++a)
        for (var u = 0, c = 0; u < i + e; ++u)
            u < i && (c += t.data[a + u * r]), u >= e && (u >= o && (c -= t.data[a + (u - o) * r]), n.data[a + (u - e) * r] = c / Math.min(u + 1, i - 1 + o - u, o)); }
    function _o(t) { return t[0]; }
    function bo(t) { return t[1]; }
    function mo() { return 1; }
    var xo = {}, wo = {}, Mo = 34, No = 10, Ao = 13;
    function To(t) { return new Function("d", "return {" + t.map(function (t, n) { return JSON.stringify(t) + ": d[" + n + "]"; }).join(",") + "}"); }
    function So(t) { var n = Object.create(null), e = []; return t.forEach(function (t) { for (var r in t)
        r in n || e.push(n[r] = r); }), e; }
    function ko(t, n) { var e = t + "", r = e.length; return r < n ? new Array(n - r + 1).join(0) + e : e; }
    function Eo(t) { var n, e = t.getUTCHours(), r = t.getUTCMinutes(), i = t.getUTCSeconds(), o = t.getUTCMilliseconds(); return isNaN(t) ? "Invalid Date" : ((n = t.getUTCFullYear()) < 0 ? "-" + ko(-n, 6) : n > 9999 ? "+" + ko(n, 6) : ko(n, 4)) + "-" + ko(t.getUTCMonth() + 1, 2) + "-" + ko(t.getUTCDate(), 2) + (o ? "T" + ko(e, 2) + ":" + ko(r, 2) + ":" + ko(i, 2) + "." + ko(o, 3) + "Z" : i ? "T" + ko(e, 2) + ":" + ko(r, 2) + ":" + ko(i, 2) + "Z" : r || e ? "T" + ko(e, 2) + ":" + ko(r, 2) + "Z" : ""); }
    function Co(t) { var n = new RegExp('["' + t + "\n\r]"), e = t.charCodeAt(0); function r(t, n) { var r, i = [], o = t.length, a = 0, u = 0, c = o <= 0, f = !1; function s() { if (c)
        return wo; if (f)
        return f = !1, xo; var n, r, i = a; if (t.charCodeAt(i) === Mo) {
        for (; a++ < o && t.charCodeAt(a) !== Mo || t.charCodeAt(++a) === Mo;)
            ;
        return (n = a) >= o ? c = !0 : (r = t.charCodeAt(a++)) === No ? f = !0 : r === Ao && (f = !0, t.charCodeAt(a) === No && ++a), t.slice(i + 1, n - 1).replace(/""/g, '"');
    } for (; a < o;) {
        if ((r = t.charCodeAt(n = a++)) === No)
            f = !0;
        else if (r === Ao)
            f = !0, t.charCodeAt(a) === No && ++a;
        else if (r !== e)
            continue;
        return t.slice(i, n);
    } return c = !0, t.slice(i, o); } for (t.charCodeAt(o - 1) === No && --o, t.charCodeAt(o - 1) === Ao && --o; (r = s()) !== wo;) {
        for (var l = []; r !== xo && r !== wo;)
            l.push(r), r = s();
        n && null == (l = n(l, u++)) || i.push(l);
    } return i; } function i(n, e) { return n.map(function (n) { return e.map(function (t) { return a(n[t]); }).join(t); }); } function o(n) { return n.map(a).join(t); } function a(t) { return null == t ? "" : t instanceof Date ? Eo(t) : n.test(t += "") ? '"' + t.replace(/"/g, '""') + '"' : t; } return { parse: function (t, n) { var e, i, o = r(t, function (t, r) { if (e)
            return e(t, r - 1); i = t, e = n ? function (t, n) { var e = To(t); return function (r, i) { return n(e(r), i, t); }; }(t, n) : To(t); }); return o.columns = i || [], o; }, parseRows: r, format: function (n, e) { return null == e && (e = So(n)), [e.map(a).join(t)].concat(i(n, e)).join("\n"); }, formatBody: function (t, n) { return null == n && (n = So(t)), i(t, n).join("\n"); }, formatRows: function (t) { return t.map(o).join("\n"); } }; }
    var Po = Co(","), zo = Po.parse, Ro = Po.parseRows, Do = Po.format, qo = Po.formatBody, Lo = Po.formatRows, Uo = Co("\t"), Oo = Uo.parse, Bo = Uo.parseRows, Yo = Uo.format, Fo = Uo.formatBody, Io = Uo.formatRows;
    function jo(t) { if (!t.ok)
        throw new Error(t.status + " " + t.statusText); return t.blob(); }
    function Ho(t) { if (!t.ok)
        throw new Error(t.status + " " + t.statusText); return t.arrayBuffer(); }
    function Xo(t) { if (!t.ok)
        throw new Error(t.status + " " + t.statusText); return t.text(); }
    function Go(t, n) { return fetch(t, n).then(Xo); }
    function Vo(t) { return function (n, e, r) { return 2 === arguments.length && "function" == typeof e && (r = e, e = void 0), Go(n, e).then(function (n) { return t(n, r); }); }; }
    var $o = Vo(zo), Wo = Vo(Oo);
    function Zo(t) { if (!t.ok)
        throw new Error(t.status + " " + t.statusText); return t.json(); }
    function Qo(t) { return function (n, e) { return Go(n, e).then(function (n) { return (new DOMParser).parseFromString(n, t); }); }; }
    var Jo = Qo("application/xml"), Ko = Qo("text/html"), ta = Qo("image/svg+xml");
    function na(t) { return function () { return t; }; }
    function ea() { return 1e-6 * (Math.random() - .5); }
    function ra(t, n, e, r) { if (isNaN(n) || isNaN(e))
        return t; var i, o, a, u, c, f, s, l, h, d = t._root, p = { data: r }, v = t._x0, g = t._y0, y = t._x1, _ = t._y1; if (!d)
        return t._root = p, t; for (; d.length;)
        if ((f = n >= (o = (v + y) / 2)) ? v = o : y = o, (s = e >= (a = (g + _) / 2)) ? g = a : _ = a, i = d, !(d = d[l = s << 1 | f]))
            return i[l] = p, t; if (u = +t._x.call(null, d.data), c = +t._y.call(null, d.data), n === u && e === c)
        return p.next = d, i ? i[l] = p : t._root = p, t; do {
        i = i ? i[l] = new Array(4) : t._root = new Array(4), (f = n >= (o = (v + y) / 2)) ? v = o : y = o, (s = e >= (a = (g + _) / 2)) ? g = a : _ = a;
    } while ((l = s << 1 | f) == (h = (c >= a) << 1 | u >= o)); return i[h] = d, i[l] = p, t; }
    function ia(t, n, e, r, i) { this.node = t, this.x0 = n, this.y0 = e, this.x1 = r, this.y1 = i; }
    function oa(t) { return t[0]; }
    function aa(t) { return t[1]; }
    function ua(t, n, e) { var r = new ca(null == n ? oa : n, null == e ? aa : e, NaN, NaN, NaN, NaN); return null == t ? r : r.addAll(t); }
    function ca(t, n, e, r, i, o) { this._x = t, this._y = n, this._x0 = e, this._y0 = r, this._x1 = i, this._y1 = o, this._root = void 0; }
    function fa(t) { for (var n = { data: t.data }, e = n; t = t.next;)
        e = e.next = { data: t.data }; return n; }
    var sa = ua.prototype = ca.prototype;
    function la(t) { return t.x + t.vx; }
    function ha(t) { return t.y + t.vy; }
    function da(t) { return t.index; }
    function pa(t, n) { var e = t.get(n); if (!e)
        throw new Error("missing: " + n); return e; }
    function va(t) { return t.x; }
    function ga(t) { return t.y; }
    sa.copy = function () { var t, n, e = new ca(this._x, this._y, this._x0, this._y0, this._x1, this._y1), r = this._root; if (!r)
        return e; if (!r.length)
        return e._root = fa(r), e; for (t = [{ source: r, target: e._root = new Array(4) }]; r = t.pop();)
        for (var i = 0; i < 4; ++i)
            (n = r.source[i]) && (n.length ? t.push({ source: n, target: r.target[i] = new Array(4) }) : r.target[i] = fa(n)); return e; }, sa.add = function (t) { var n = +this._x.call(null, t), e = +this._y.call(null, t); return ra(this.cover(n, e), n, e, t); }, sa.addAll = function (t) { var n, e, r, i, o = t.length, a = new Array(o), u = new Array(o), c = 1 / 0, f = 1 / 0, s = -1 / 0, l = -1 / 0; for (e = 0; e < o; ++e)
        isNaN(r = +this._x.call(null, n = t[e])) || isNaN(i = +this._y.call(null, n)) || (a[e] = r, u[e] = i, r < c && (c = r), r > s && (s = r), i < f && (f = i), i > l && (l = i)); if (c > s || f > l)
        return this; for (this.cover(c, f).cover(s, l), e = 0; e < o; ++e)
        ra(this, a[e], u[e], t[e]); return this; }, sa.cover = function (t, n) { if (isNaN(t = +t) || isNaN(n = +n))
        return this; var e = this._x0, r = this._y0, i = this._x1, o = this._y1; if (isNaN(e))
        i = (e = Math.floor(t)) + 1, o = (r = Math.floor(n)) + 1;
    else {
        for (var a, u, c = i - e, f = this._root; e > t || t >= i || r > n || n >= o;)
            switch (u = (n < r) << 1 | t < e, (a = new Array(4))[u] = f, f = a, c *= 2, u) {
                case 0:
                    i = e + c, o = r + c;
                    break;
                case 1:
                    e = i - c, o = r + c;
                    break;
                case 2:
                    i = e + c, r = o - c;
                    break;
                case 3: e = i - c, r = o - c;
            }
        this._root && this._root.length && (this._root = f);
    } return this._x0 = e, this._y0 = r, this._x1 = i, this._y1 = o, this; }, sa.data = function () { var t = []; return this.visit(function (n) { if (!n.length)
        do {
            t.push(n.data);
        } while (n = n.next); }), t; }, sa.extent = function (t) { return arguments.length ? this.cover(+t[0][0], +t[0][1]).cover(+t[1][0], +t[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]]; }, sa.find = function (t, n, e) { var r, i, o, a, u, c, f, s = this._x0, l = this._y0, h = this._x1, d = this._y1, p = [], v = this._root; for (v && p.push(new ia(v, s, l, h, d)), null == e ? e = 1 / 0 : (s = t - e, l = n - e, h = t + e, d = n + e, e *= e); c = p.pop();)
        if (!(!(v = c.node) || (i = c.x0) > h || (o = c.y0) > d || (a = c.x1) < s || (u = c.y1) < l))
            if (v.length) {
                var g = (i + a) / 2, y = (o + u) / 2;
                p.push(new ia(v[3], g, y, a, u), new ia(v[2], i, y, g, u), new ia(v[1], g, o, a, y), new ia(v[0], i, o, g, y)), (f = (n >= y) << 1 | t >= g) && (c = p[p.length - 1], p[p.length - 1] = p[p.length - 1 - f], p[p.length - 1 - f] = c);
            }
            else {
                var _ = t - +this._x.call(null, v.data), b = n - +this._y.call(null, v.data), m = _ * _ + b * b;
                if (m < e) {
                    var x = Math.sqrt(e = m);
                    s = t - x, l = n - x, h = t + x, d = n + x, r = v.data;
                }
            } return r; }, sa.remove = function (t) { if (isNaN(o = +this._x.call(null, t)) || isNaN(a = +this._y.call(null, t)))
        return this; var n, e, r, i, o, a, u, c, f, s, l, h, d = this._root, p = this._x0, v = this._y0, g = this._x1, y = this._y1; if (!d)
        return this; if (d.length)
        for (;;) {
            if ((f = o >= (u = (p + g) / 2)) ? p = u : g = u, (s = a >= (c = (v + y) / 2)) ? v = c : y = c, n = d, !(d = d[l = s << 1 | f]))
                return this;
            if (!d.length)
                break;
            (n[l + 1 & 3] || n[l + 2 & 3] || n[l + 3 & 3]) && (e = n, h = l);
        } for (; d.data !== t;)
        if (r = d, !(d = d.next))
            return this; return (i = d.next) && delete d.next, r ? (i ? r.next = i : delete r.next, this) : n ? (i ? n[l] = i : delete n[l], (d = n[0] || n[1] || n[2] || n[3]) && d === (n[3] || n[2] || n[1] || n[0]) && !d.length && (e ? e[h] = d : this._root = d), this) : (this._root = i, this); }, sa.removeAll = function (t) { for (var n = 0, e = t.length; n < e; ++n)
        this.remove(t[n]); return this; }, sa.root = function () { return this._root; }, sa.size = function () { var t = 0; return this.visit(function (n) { if (!n.length)
        do {
            ++t;
        } while (n = n.next); }), t; }, sa.visit = function (t) { var n, e, r, i, o, a, u = [], c = this._root; for (c && u.push(new ia(c, this._x0, this._y0, this._x1, this._y1)); n = u.pop();)
        if (!t(c = n.node, r = n.x0, i = n.y0, o = n.x1, a = n.y1) && c.length) {
            var f = (r + o) / 2, s = (i + a) / 2;
            (e = c[3]) && u.push(new ia(e, f, s, o, a)), (e = c[2]) && u.push(new ia(e, r, s, f, a)), (e = c[1]) && u.push(new ia(e, f, i, o, s)), (e = c[0]) && u.push(new ia(e, r, i, f, s));
        } return this; }, sa.visitAfter = function (t) { var n, e = [], r = []; for (this._root && e.push(new ia(this._root, this._x0, this._y0, this._x1, this._y1)); n = e.pop();) {
        var i = n.node;
        if (i.length) {
            var o, a = n.x0, u = n.y0, c = n.x1, f = n.y1, s = (a + c) / 2, l = (u + f) / 2;
            (o = i[0]) && e.push(new ia(o, a, u, s, l)), (o = i[1]) && e.push(new ia(o, s, u, c, l)), (o = i[2]) && e.push(new ia(o, a, l, s, f)), (o = i[3]) && e.push(new ia(o, s, l, c, f));
        }
        r.push(n);
    } for (; n = r.pop();)
        t(n.node, n.x0, n.y0, n.x1, n.y1); return this; }, sa.x = function (t) { return arguments.length ? (this._x = t, this) : this._x; }, sa.y = function (t) { return arguments.length ? (this._y = t, this) : this._y; };
    var ya = 10, _a = Math.PI * (3 - Math.sqrt(5));
    function ba(t, n) { if ((e = (t = n ? t.toExponential(n - 1) : t.toExponential()).indexOf("e")) < 0)
        return null; var e, r = t.slice(0, e); return [r.length > 1 ? r[0] + r.slice(2) : r, +t.slice(e + 1)]; }
    function ma(t) { return (t = ba(Math.abs(t))) ? t[1] : NaN; }
    var xa, wa = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
    function Ma(t) { return new Na(t); }
    function Na(t) { if (!(n = wa.exec(t)))
        throw new Error("invalid format: " + t); var n; this.fill = n[1] || " ", this.align = n[2] || ">", this.sign = n[3] || "-", this.symbol = n[4] || "", this.zero = !!n[5], this.width = n[6] && +n[6], this.comma = !!n[7], this.precision = n[8] && +n[8].slice(1), this.trim = !!n[9], this.type = n[10] || ""; }
    function Aa(t, n) { var e = ba(t, n); if (!e)
        return t + ""; var r = e[0], i = e[1]; return i < 0 ? "0." + new Array(-i).join("0") + r : r.length > i + 1 ? r.slice(0, i + 1) + "." + r.slice(i + 1) : r + new Array(i - r.length + 2).join("0"); }
    Ma.prototype = Na.prototype, Na.prototype.toString = function () { return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (null == this.width ? "" : Math.max(1, 0 | this.width)) + (this.comma ? "," : "") + (null == this.precision ? "" : "." + Math.max(0, 0 | this.precision)) + (this.trim ? "~" : "") + this.type; };
    var Ta = { "%": function (t, n) { return (100 * t).toFixed(n); }, b: function (t) { return Math.round(t).toString(2); }, c: function (t) { return t + ""; }, d: function (t) { return Math.round(t).toString(10); }, e: function (t, n) { return t.toExponential(n); }, f: function (t, n) { return t.toFixed(n); }, g: function (t, n) { return t.toPrecision(n); }, o: function (t) { return Math.round(t).toString(8); }, p: function (t, n) { return Aa(100 * t, n); }, r: Aa, s: function (t, n) { var e = ba(t, n); if (!e)
            return t + ""; var r = e[0], i = e[1], o = i - (xa = 3 * Math.max(-8, Math.min(8, Math.floor(i / 3)))) + 1, a = r.length; return o === a ? r : o > a ? r + new Array(o - a + 1).join("0") : o > 0 ? r.slice(0, o) + "." + r.slice(o) : "0." + new Array(1 - o).join("0") + ba(t, Math.max(0, n + o - 1))[0]; }, X: function (t) { return Math.round(t).toString(16).toUpperCase(); }, x: function (t) { return Math.round(t).toString(16); } };
    function Sa(t) { return t; }
    var ka, Ea = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
    function Ca(t) { var n, e, r = t.grouping && t.thousands ? (n = t.grouping, e = t.thousands, function (t, r) { for (var i = t.length, o = [], a = 0, u = n[0], c = 0; i > 0 && u > 0 && (c + u + 1 > r && (u = Math.max(1, r - c)), o.push(t.substring(i -= u, i + u)), !((c += u + 1) > r));)
        u = n[a = (a + 1) % n.length]; return o.reverse().join(e); }) : Sa, i = t.currency, o = t.decimal, a = t.numerals ? function (t) { return function (n) { return n.replace(/[0-9]/g, function (n) { return t[+n]; }); }; }(t.numerals) : Sa, u = t.percent || "%"; function c(t) { var n = (t = Ma(t)).fill, e = t.align, c = t.sign, f = t.symbol, s = t.zero, l = t.width, h = t.comma, d = t.precision, p = t.trim, v = t.type; "n" === v ? (h = !0, v = "g") : Ta[v] || (null == d && (d = 12), p = !0, v = "g"), (s || "0" === n && "=" === e) && (s = !0, n = "0", e = "="); var g = "$" === f ? i[0] : "#" === f && /[boxX]/.test(v) ? "0" + v.toLowerCase() : "", y = "$" === f ? i[1] : /[%p]/.test(v) ? u : "", _ = Ta[v], b = /[defgprs%]/.test(v); function m(t) { var i, u, f, m = g, x = y; if ("c" === v)
        x = _(t) + x, t = "";
    else {
        var w = (t = +t) < 0;
        if (t = _(Math.abs(t), d), p && (t = function (t) { t: for (var n, e = t.length, r = 1, i = -1; r < e; ++r)
            switch (t[r]) {
                case ".":
                    i = n = r;
                    break;
                case "0":
                    0 === i && (i = r), n = r;
                    break;
                default: if (i > 0) {
                    if (!+t[r])
                        break t;
                    i = 0;
                }
            } return i > 0 ? t.slice(0, i) + t.slice(n + 1) : t; }(t)), w && 0 == +t && (w = !1), m = (w ? "(" === c ? c : "-" : "-" === c || "(" === c ? "" : c) + m, x = ("s" === v ? Ea[8 + xa / 3] : "") + x + (w && "(" === c ? ")" : ""), b)
            for (i = -1, u = t.length; ++i < u;)
                if (48 > (f = t.charCodeAt(i)) || f > 57) {
                    x = (46 === f ? o + t.slice(i + 1) : t.slice(i)) + x, t = t.slice(0, i);
                    break;
                }
    } h && !s && (t = r(t, 1 / 0)); var M = m.length + t.length + x.length, N = M < l ? new Array(l - M + 1).join(n) : ""; switch (h && s && (t = r(N + t, N.length ? l - x.length : 1 / 0), N = ""), e) {
        case "<":
            t = m + t + x + N;
            break;
        case "=":
            t = m + N + t + x;
            break;
        case "^":
            t = N.slice(0, M = N.length >> 1) + m + t + x + N.slice(M);
            break;
        default: t = N + m + t + x;
    } return a(t); } return d = null == d ? 6 : /[gprs]/.test(v) ? Math.max(1, Math.min(21, d)) : Math.max(0, Math.min(20, d)), m.toString = function () { return t + ""; }, m; } return { format: c, formatPrefix: function (t, n) { var e = c(((t = Ma(t)).type = "f", t)), r = 3 * Math.max(-8, Math.min(8, Math.floor(ma(n) / 3))), i = Math.pow(10, -r), o = Ea[8 + r / 3]; return function (t) { return e(i * t) + o; }; } }; }
    function Pa(n) { return ka = Ca(n), t.format = ka.format, t.formatPrefix = ka.formatPrefix, ka; }
    function za(t) { return Math.max(0, -ma(Math.abs(t))); }
    function Ra(t, n) { return Math.max(0, 3 * Math.max(-8, Math.min(8, Math.floor(ma(n) / 3))) - ma(Math.abs(t))); }
    function Da(t, n) { return t = Math.abs(t), n = Math.abs(n) - t, Math.max(0, ma(n) - ma(t)) + 1; }
    function qa() { return new La; }
    function La() { this.reset(); }
    Pa({ decimal: ".", thousands: ",", grouping: [3], currency: ["$", ""] }), La.prototype = { constructor: La, reset: function () { this.s = this.t = 0; }, add: function (t) { Oa(Ua, t, this.t), Oa(this, Ua.s, this.s), this.s ? this.t += Ua.t : this.s = Ua.t; }, valueOf: function () { return this.s; } };
    var Ua = new La;
    function Oa(t, n, e) { var r = t.s = n + e, i = r - n, o = r - i; t.t = n - o + (e - i); }
    var Ba = 1e-6, Ya = 1e-12, Fa = Math.PI, Ia = Fa / 2, ja = Fa / 4, Ha = 2 * Fa, Xa = 180 / Fa, Ga = Fa / 180, Va = Math.abs, $a = Math.atan, Wa = Math.atan2, Za = Math.cos, Qa = Math.ceil, Ja = Math.exp, Ka = Math.log, tu = Math.pow, nu = Math.sin, eu = Math.sign || function (t) { return t > 0 ? 1 : t < 0 ? -1 : 0; }, ru = Math.sqrt, iu = Math.tan;
    function ou(t) { return t > 1 ? 0 : t < -1 ? Fa : Math.acos(t); }
    function au(t) { return t > 1 ? Ia : t < -1 ? -Ia : Math.asin(t); }
    function uu(t) { return (t = nu(t / 2)) * t; }
    function cu() { }
    function fu(t, n) { t && lu.hasOwnProperty(t.type) && lu[t.type](t, n); }
    var su = { Feature: function (t, n) { fu(t.geometry, n); }, FeatureCollection: function (t, n) { for (var e = t.features, r = -1, i = e.length; ++r < i;)
            fu(e[r].geometry, n); } }, lu = { Sphere: function (t, n) { n.sphere(); }, Point: function (t, n) { t = t.coordinates, n.point(t[0], t[1], t[2]); }, MultiPoint: function (t, n) { for (var e = t.coordinates, r = -1, i = e.length; ++r < i;)
            t = e[r], n.point(t[0], t[1], t[2]); }, LineString: function (t, n) { hu(t.coordinates, n, 0); }, MultiLineString: function (t, n) { for (var e = t.coordinates, r = -1, i = e.length; ++r < i;)
            hu(e[r], n, 0); }, Polygon: function (t, n) { du(t.coordinates, n); }, MultiPolygon: function (t, n) { for (var e = t.coordinates, r = -1, i = e.length; ++r < i;)
            du(e[r], n); }, GeometryCollection: function (t, n) { for (var e = t.geometries, r = -1, i = e.length; ++r < i;)
            fu(e[r], n); } };
    function hu(t, n, e) { var r, i = -1, o = t.length - e; for (n.lineStart(); ++i < o;)
        r = t[i], n.point(r[0], r[1], r[2]); n.lineEnd(); }
    function du(t, n) { var e = -1, r = t.length; for (n.polygonStart(); ++e < r;)
        hu(t[e], n, 1); n.polygonEnd(); }
    function pu(t, n) { t && su.hasOwnProperty(t.type) ? su[t.type](t, n) : fu(t, n); }
    var vu, gu, yu, _u, bu, mu = qa(), xu = qa(), wu = { point: cu, lineStart: cu, lineEnd: cu, polygonStart: function () { mu.reset(), wu.lineStart = Mu, wu.lineEnd = Nu; }, polygonEnd: function () { var t = +mu; xu.add(t < 0 ? Ha + t : t), this.lineStart = this.lineEnd = this.point = cu; }, sphere: function () { xu.add(Ha); } };
    function Mu() { wu.point = Au; }
    function Nu() { Tu(vu, gu); }
    function Au(t, n) { wu.point = Tu, vu = t, gu = n, yu = t *= Ga, _u = Za(n = (n *= Ga) / 2 + ja), bu = nu(n); }
    function Tu(t, n) { var e = (t *= Ga) - yu, r = e >= 0 ? 1 : -1, i = r * e, o = Za(n = (n *= Ga) / 2 + ja), a = nu(n), u = bu * a, c = _u * o + u * Za(i), f = u * r * nu(i); mu.add(Wa(f, c)), yu = t, _u = o, bu = a; }
    function Su(t) { return [Wa(t[1], t[0]), au(t[2])]; }
    function ku(t) { var n = t[0], e = t[1], r = Za(e); return [r * Za(n), r * nu(n), nu(e)]; }
    function Eu(t, n) { return t[0] * n[0] + t[1] * n[1] + t[2] * n[2]; }
    function Cu(t, n) { return [t[1] * n[2] - t[2] * n[1], t[2] * n[0] - t[0] * n[2], t[0] * n[1] - t[1] * n[0]]; }
    function Pu(t, n) { t[0] += n[0], t[1] += n[1], t[2] += n[2]; }
    function zu(t, n) { return [t[0] * n, t[1] * n, t[2] * n]; }
    function Ru(t) { var n = ru(t[0] * t[0] + t[1] * t[1] + t[2] * t[2]); t[0] /= n, t[1] /= n, t[2] /= n; }
    var Du, qu, Lu, Uu, Ou, Bu, Yu, Fu, Iu, ju, Hu, Xu, Gu, Vu, $u, Wu, Zu, Qu, Ju, Ku, tc, nc, ec, rc, ic, oc, ac = qa(), uc = { point: cc, lineStart: sc, lineEnd: lc, polygonStart: function () { uc.point = hc, uc.lineStart = dc, uc.lineEnd = pc, ac.reset(), wu.polygonStart(); }, polygonEnd: function () { wu.polygonEnd(), uc.point = cc, uc.lineStart = sc, uc.lineEnd = lc, mu < 0 ? (Du = -(Lu = 180), qu = -(Uu = 90)) : ac > Ba ? Uu = 90 : ac < -Ba && (qu = -90), ju[0] = Du, ju[1] = Lu; }, sphere: function () { Du = -(Lu = 180), qu = -(Uu = 90); } };
    function cc(t, n) { Iu.push(ju = [Du = t, Lu = t]), n < qu && (qu = n), n > Uu && (Uu = n); }
    function fc(t, n) { var e = ku([t * Ga, n * Ga]); if (Fu) {
        var r = Cu(Fu, e), i = Cu([r[1], -r[0], 0], r);
        Ru(i), i = Su(i);
        var o, a = t - Ou, u = a > 0 ? 1 : -1, c = i[0] * Xa * u, f = Va(a) > 180;
        f ^ (u * Ou < c && c < u * t) ? (o = i[1] * Xa) > Uu && (Uu = o) : f ^ (u * Ou < (c = (c + 360) % 360 - 180) && c < u * t) ? (o = -i[1] * Xa) < qu && (qu = o) : (n < qu && (qu = n), n > Uu && (Uu = n)), f ? t < Ou ? vc(Du, t) > vc(Du, Lu) && (Lu = t) : vc(t, Lu) > vc(Du, Lu) && (Du = t) : Lu >= Du ? (t < Du && (Du = t), t > Lu && (Lu = t)) : t > Ou ? vc(Du, t) > vc(Du, Lu) && (Lu = t) : vc(t, Lu) > vc(Du, Lu) && (Du = t);
    }
    else
        Iu.push(ju = [Du = t, Lu = t]); n < qu && (qu = n), n > Uu && (Uu = n), Fu = e, Ou = t; }
    function sc() { uc.point = fc; }
    function lc() { ju[0] = Du, ju[1] = Lu, uc.point = cc, Fu = null; }
    function hc(t, n) { if (Fu) {
        var e = t - Ou;
        ac.add(Va(e) > 180 ? e + (e > 0 ? 360 : -360) : e);
    }
    else
        Bu = t, Yu = n; wu.point(t, n), fc(t, n); }
    function dc() { wu.lineStart(); }
    function pc() { hc(Bu, Yu), wu.lineEnd(), Va(ac) > Ba && (Du = -(Lu = 180)), ju[0] = Du, ju[1] = Lu, Fu = null; }
    function vc(t, n) { return (n -= t) < 0 ? n + 360 : n; }
    function gc(t, n) { return t[0] - n[0]; }
    function yc(t, n) { return t[0] <= t[1] ? t[0] <= n && n <= t[1] : n < t[0] || t[1] < n; }
    var _c = { sphere: cu, point: bc, lineStart: xc, lineEnd: Nc, polygonStart: function () { _c.lineStart = Ac, _c.lineEnd = Tc; }, polygonEnd: function () { _c.lineStart = xc, _c.lineEnd = Nc; } };
    function bc(t, n) { t *= Ga; var e = Za(n *= Ga); mc(e * Za(t), e * nu(t), nu(n)); }
    function mc(t, n, e) { Gu += (t - Gu) / ++Hu, Vu += (n - Vu) / Hu, $u += (e - $u) / Hu; }
    function xc() { _c.point = wc; }
    function wc(t, n) { t *= Ga; var e = Za(n *= Ga); rc = e * Za(t), ic = e * nu(t), oc = nu(n), _c.point = Mc, mc(rc, ic, oc); }
    function Mc(t, n) { t *= Ga; var e = Za(n *= Ga), r = e * Za(t), i = e * nu(t), o = nu(n), a = Wa(ru((a = ic * o - oc * i) * a + (a = oc * r - rc * o) * a + (a = rc * i - ic * r) * a), rc * r + ic * i + oc * o); Xu += a, Wu += a * (rc + (rc = r)), Zu += a * (ic + (ic = i)), Qu += a * (oc + (oc = o)), mc(rc, ic, oc); }
    function Nc() { _c.point = bc; }
    function Ac() { _c.point = Sc; }
    function Tc() { kc(nc, ec), _c.point = bc; }
    function Sc(t, n) { nc = t, ec = n, t *= Ga, n *= Ga, _c.point = kc; var e = Za(n); rc = e * Za(t), ic = e * nu(t), oc = nu(n), mc(rc, ic, oc); }
    function kc(t, n) { t *= Ga; var e = Za(n *= Ga), r = e * Za(t), i = e * nu(t), o = nu(n), a = ic * o - oc * i, u = oc * r - rc * o, c = rc * i - ic * r, f = ru(a * a + u * u + c * c), s = au(f), l = f && -s / f; Ju += l * a, Ku += l * u, tc += l * c, Xu += s, Wu += s * (rc + (rc = r)), Zu += s * (ic + (ic = i)), Qu += s * (oc + (oc = o)), mc(rc, ic, oc); }
    function Ec(t) { return function () { return t; }; }
    function Cc(t, n) { function e(e, r) { return e = t(e, r), n(e[0], e[1]); } return t.invert && n.invert && (e.invert = function (e, r) { return (e = n.invert(e, r)) && t.invert(e[0], e[1]); }), e; }
    function Pc(t, n) { return [Va(t) > Fa ? t + Math.round(-t / Ha) * Ha : t, n]; }
    function zc(t, n, e) { return (t %= Ha) ? n || e ? Cc(Dc(t), qc(n, e)) : Dc(t) : n || e ? qc(n, e) : Pc; }
    function Rc(t) { return function (n, e) { return [(n += t) > Fa ? n - Ha : n < -Fa ? n + Ha : n, e]; }; }
    function Dc(t) { var n = Rc(t); return n.invert = Rc(-t), n; }
    function qc(t, n) { var e = Za(t), r = nu(t), i = Za(n), o = nu(n); function a(t, n) { var a = Za(n), u = Za(t) * a, c = nu(t) * a, f = nu(n), s = f * e + u * r; return [Wa(c * i - s * o, u * e - f * r), au(s * i + c * o)]; } return a.invert = function (t, n) { var a = Za(n), u = Za(t) * a, c = nu(t) * a, f = nu(n), s = f * i - c * o; return [Wa(c * i + f * o, u * e + s * r), au(s * e - u * r)]; }, a; }
    function Lc(t) { function n(n) { return (n = t(n[0] * Ga, n[1] * Ga))[0] *= Xa, n[1] *= Xa, n; } return t = zc(t[0] * Ga, t[1] * Ga, t.length > 2 ? t[2] * Ga : 0), n.invert = function (n) { return (n = t.invert(n[0] * Ga, n[1] * Ga))[0] *= Xa, n[1] *= Xa, n; }, n; }
    function Uc(t, n, e, r, i, o) { if (e) {
        var a = Za(n), u = nu(n), c = r * e;
        null == i ? (i = n + r * Ha, o = n - c / 2) : (i = Oc(a, i), o = Oc(a, o), (r > 0 ? i < o : i > o) && (i += r * Ha));
        for (var f, s = i; r > 0 ? s > o : s < o; s -= c)
            f = Su([a, -u * Za(s), -u * nu(s)]), t.point(f[0], f[1]);
    } }
    function Oc(t, n) { (n = ku(n))[0] -= t, Ru(n); var e = ou(-n[1]); return ((-n[2] < 0 ? -e : e) + Ha - Ba) % Ha; }
    function Bc() { var t, n = []; return { point: function (n, e) { t.push([n, e]); }, lineStart: function () { n.push(t = []); }, lineEnd: cu, rejoin: function () { n.length > 1 && n.push(n.pop().concat(n.shift())); }, result: function () { var e = n; return n = [], t = null, e; } }; }
    function Yc(t, n) { return Va(t[0] - n[0]) < Ba && Va(t[1] - n[1]) < Ba; }
    function Fc(t, n, e, r) { this.x = t, this.z = n, this.o = e, this.e = r, this.v = !1, this.n = this.p = null; }
    function Ic(t, n, e, r, i) { var o, a, u = [], c = []; if (t.forEach(function (t) { if (!((n = t.length - 1) <= 0)) {
        var n, e, r = t[0], a = t[n];
        if (Yc(r, a)) {
            for (i.lineStart(), o = 0; o < n; ++o)
                i.point((r = t[o])[0], r[1]);
            i.lineEnd();
        }
        else
            u.push(e = new Fc(r, t, null, !0)), c.push(e.o = new Fc(r, null, e, !1)), u.push(e = new Fc(a, t, null, !1)), c.push(e.o = new Fc(a, null, e, !0));
    } }), u.length) {
        for (c.sort(n), jc(u), jc(c), o = 0, a = c.length; o < a; ++o)
            c[o].e = e = !e;
        for (var f, s, l = u[0];;) {
            for (var h = l, d = !0; h.v;)
                if ((h = h.n) === l)
                    return;
            f = h.z, i.lineStart();
            do {
                if (h.v = h.o.v = !0, h.e) {
                    if (d)
                        for (o = 0, a = f.length; o < a; ++o)
                            i.point((s = f[o])[0], s[1]);
                    else
                        r(h.x, h.n.x, 1, i);
                    h = h.n;
                }
                else {
                    if (d)
                        for (f = h.p.z, o = f.length - 1; o >= 0; --o)
                            i.point((s = f[o])[0], s[1]);
                    else
                        r(h.x, h.p.x, -1, i);
                    h = h.p;
                }
                f = (h = h.o).z, d = !d;
            } while (!h.v);
            i.lineEnd();
        }
    } }
    function jc(t) { if (n = t.length) {
        for (var n, e, r = 0, i = t[0]; ++r < n;)
            i.n = e = t[r], e.p = i, i = e;
        i.n = e = t[0], e.p = i;
    } }
    Pc.invert = Pc;
    var Hc = qa();
    function Xc(t) { return Va(t[0]) <= Fa ? t[0] : eu(t[0]) * ((Va(t[0]) + Fa) % Ha - Fa); }
    function Gc(t, n) { var e = Xc(n), r = n[1], i = nu(r), o = [nu(e), -Za(e), 0], a = 0, u = 0; Hc.reset(), 1 === i ? r = Ia + Ba : -1 === i && (r = -Ia - Ba); for (var c = 0, f = t.length; c < f; ++c)
        if (l = (s = t[c]).length)
            for (var s, l, h = s[l - 1], d = Xc(h), p = h[1] / 2 + ja, v = nu(p), g = Za(p), y = 0; y < l; ++y, d = b, v = x, g = w, h = _) {
                var _ = s[y], b = Xc(_), m = _[1] / 2 + ja, x = nu(m), w = Za(m), M = b - d, N = M >= 0 ? 1 : -1, A = N * M, T = A > Fa, S = v * x;
                if (Hc.add(Wa(S * N * nu(A), g * w + S * Za(A))), a += T ? M + N * Ha : M, T ^ d >= e ^ b >= e) {
                    var k = Cu(ku(h), ku(_));
                    Ru(k);
                    var E = Cu(o, k);
                    Ru(E);
                    var C = (T ^ M >= 0 ? -1 : 1) * au(E[2]);
                    (r > C || r === C && (k[0] || k[1])) && (u += T ^ M >= 0 ? 1 : -1);
                }
            } return (a < -Ba || a < Ba && Hc < -Ba) ^ 1 & u; }
    function Vc(t, n, e, r) { return function (i) { var o, a, u, c = n(i), f = Bc(), s = n(f), l = !1, h = { point: d, lineStart: v, lineEnd: g, polygonStart: function () { h.point = y, h.lineStart = _, h.lineEnd = b, a = [], o = []; }, polygonEnd: function () { h.point = d, h.lineStart = v, h.lineEnd = g, a = T(a); var t = Gc(o, r); a.length ? (l || (i.polygonStart(), l = !0), Ic(a, Wc, t, e, i)) : t && (l || (i.polygonStart(), l = !0), i.lineStart(), e(null, null, 1, i), i.lineEnd()), l && (i.polygonEnd(), l = !1), a = o = null; }, sphere: function () { i.polygonStart(), i.lineStart(), e(null, null, 1, i), i.lineEnd(), i.polygonEnd(); } }; function d(n, e) { t(n, e) && i.point(n, e); } function p(t, n) { c.point(t, n); } function v() { h.point = p, c.lineStart(); } function g() { h.point = d, c.lineEnd(); } function y(t, n) { u.push([t, n]), s.point(t, n); } function _() { s.lineStart(), u = []; } function b() { y(u[0][0], u[0][1]), s.lineEnd(); var t, n, e, r, c = s.clean(), h = f.result(), d = h.length; if (u.pop(), o.push(u), u = null, d)
        if (1 & c) {
            if ((n = (e = h[0]).length - 1) > 0) {
                for (l || (i.polygonStart(), l = !0), i.lineStart(), t = 0; t < n; ++t)
                    i.point((r = e[t])[0], r[1]);
                i.lineEnd();
            }
        }
        else
            d > 1 && 2 & c && h.push(h.pop().concat(h.shift())), a.push(h.filter($c)); } return h; }; }
    function $c(t) { return t.length > 1; }
    function Wc(t, n) { return ((t = t.x)[0] < 0 ? t[1] - Ia - Ba : Ia - t[1]) - ((n = n.x)[0] < 0 ? n[1] - Ia - Ba : Ia - n[1]); }
    var Zc = Vc(function () { return !0; }, function (t) { var n, e = NaN, r = NaN, i = NaN; return { lineStart: function () { t.lineStart(), n = 1; }, point: function (o, a) { var u = o > 0 ? Fa : -Fa, c = Va(o - e); Va(c - Fa) < Ba ? (t.point(e, r = (r + a) / 2 > 0 ? Ia : -Ia), t.point(i, r), t.lineEnd(), t.lineStart(), t.point(u, r), t.point(o, r), n = 0) : i !== u && c >= Fa && (Va(e - i) < Ba && (e -= i * Ba), Va(o - u) < Ba && (o -= u * Ba), r = function (t, n, e, r) { var i, o, a = nu(t - e); return Va(a) > Ba ? $a((nu(n) * (o = Za(r)) * nu(e) - nu(r) * (i = Za(n)) * nu(t)) / (i * o * a)) : (n + r) / 2; }(e, r, o, a), t.point(i, r), t.lineEnd(), t.lineStart(), t.point(u, r), n = 0), t.point(e = o, r = a), i = u; }, lineEnd: function () { t.lineEnd(), e = r = NaN; }, clean: function () { return 2 - n; } }; }, function (t, n, e, r) { var i; if (null == t)
        i = e * Ia, r.point(-Fa, i), r.point(0, i), r.point(Fa, i), r.point(Fa, 0), r.point(Fa, -i), r.point(0, -i), r.point(-Fa, -i), r.point(-Fa, 0), r.point(-Fa, i);
    else if (Va(t[0] - n[0]) > Ba) {
        var o = t[0] < n[0] ? Fa : -Fa;
        i = e * o / 2, r.point(-o, i), r.point(0, i), r.point(o, i);
    }
    else
        r.point(n[0], n[1]); }, [-Fa, -Ia]);
    function Qc(t) { var n = Za(t), e = 6 * Ga, r = n > 0, i = Va(n) > Ba; function o(t, e) { return Za(t) * Za(e) > n; } function a(t, e, r) { var i = [1, 0, 0], o = Cu(ku(t), ku(e)), a = Eu(o, o), u = o[0], c = a - u * u; if (!c)
        return !r && t; var f = n * a / c, s = -n * u / c, l = Cu(i, o), h = zu(i, f); Pu(h, zu(o, s)); var d = l, p = Eu(h, d), v = Eu(d, d), g = p * p - v * (Eu(h, h) - 1); if (!(g < 0)) {
        var y = ru(g), _ = zu(d, (-p - y) / v);
        if (Pu(_, h), _ = Su(_), !r)
            return _;
        var b, m = t[0], x = e[0], w = t[1], M = e[1];
        x < m && (b = m, m = x, x = b);
        var N = x - m, A = Va(N - Fa) < Ba;
        if (!A && M < w && (b = w, w = M, M = b), A || N < Ba ? A ? w + M > 0 ^ _[1] < (Va(_[0] - m) < Ba ? w : M) : w <= _[1] && _[1] <= M : N > Fa ^ (m <= _[0] && _[0] <= x)) {
            var T = zu(d, (-p + y) / v);
            return Pu(T, h), [_, Su(T)];
        }
    } } function u(n, e) { var i = r ? t : Fa - t, o = 0; return n < -i ? o |= 1 : n > i && (o |= 2), e < -i ? o |= 4 : e > i && (o |= 8), o; } return Vc(o, function (t) { var n, e, c, f, s; return { lineStart: function () { f = c = !1, s = 1; }, point: function (l, h) { var d, p = [l, h], v = o(l, h), g = r ? v ? 0 : u(l, h) : v ? u(l + (l < 0 ? Fa : -Fa), h) : 0; if (!n && (f = c = v) && t.lineStart(), v !== c && (!(d = a(n, p)) || Yc(n, d) || Yc(p, d)) && (p[0] += Ba, p[1] += Ba, v = o(p[0], p[1])), v !== c)
            s = 0, v ? (t.lineStart(), d = a(p, n), t.point(d[0], d[1])) : (d = a(n, p), t.point(d[0], d[1]), t.lineEnd()), n = d;
        else if (i && n && r ^ v) {
            var y;
            g & e || !(y = a(p, n, !0)) || (s = 0, r ? (t.lineStart(), t.point(y[0][0], y[0][1]), t.point(y[1][0], y[1][1]), t.lineEnd()) : (t.point(y[1][0], y[1][1]), t.lineEnd(), t.lineStart(), t.point(y[0][0], y[0][1])));
        } !v || n && Yc(n, p) || t.point(p[0], p[1]), n = p, c = v, e = g; }, lineEnd: function () { c && t.lineEnd(), n = null; }, clean: function () { return s | (f && c) << 1; } }; }, function (n, r, i, o) { Uc(o, t, e, i, n, r); }, r ? [0, -t] : [-Fa, t - Fa]); }
    var Jc = 1e9, Kc = -Jc;
    function tf(t, n, e, r) { function i(i, o) { return t <= i && i <= e && n <= o && o <= r; } function o(i, o, u, f) { var s = 0, l = 0; if (null == i || (s = a(i, u)) !== (l = a(o, u)) || c(i, o) < 0 ^ u > 0)
        do {
            f.point(0 === s || 3 === s ? t : e, s > 1 ? r : n);
        } while ((s = (s + u + 4) % 4) !== l);
    else
        f.point(o[0], o[1]); } function a(r, i) { return Va(r[0] - t) < Ba ? i > 0 ? 0 : 3 : Va(r[0] - e) < Ba ? i > 0 ? 2 : 1 : Va(r[1] - n) < Ba ? i > 0 ? 1 : 0 : i > 0 ? 3 : 2; } function u(t, n) { return c(t.x, n.x); } function c(t, n) { var e = a(t, 1), r = a(n, 1); return e !== r ? e - r : 0 === e ? n[1] - t[1] : 1 === e ? t[0] - n[0] : 2 === e ? t[1] - n[1] : n[0] - t[0]; } return function (a) { var c, f, s, l, h, d, p, v, g, y, _, b = a, m = Bc(), x = { point: w, lineStart: function () { x.point = M, f && f.push(s = []); y = !0, g = !1, p = v = NaN; }, lineEnd: function () { c && (M(l, h), d && g && m.rejoin(), c.push(m.result())); x.point = w, g && b.lineEnd(); }, polygonStart: function () { b = m, c = [], f = [], _ = !0; }, polygonEnd: function () { var n = function () { for (var n = 0, e = 0, i = f.length; e < i; ++e)
            for (var o, a, u = f[e], c = 1, s = u.length, l = u[0], h = l[0], d = l[1]; c < s; ++c)
                o = h, a = d, l = u[c], h = l[0], d = l[1], a <= r ? d > r && (h - o) * (r - a) > (d - a) * (t - o) && ++n : d <= r && (h - o) * (r - a) < (d - a) * (t - o) && --n; return n; }(), e = _ && n, i = (c = T(c)).length; (e || i) && (a.polygonStart(), e && (a.lineStart(), o(null, null, 1, a), a.lineEnd()), i && Ic(c, u, n, o, a), a.polygonEnd()); b = a, c = f = s = null; } }; function w(t, n) { i(t, n) && b.point(t, n); } function M(o, a) { var u = i(o, a); if (f && s.push([o, a]), y)
        l = o, h = a, d = u, y = !1, u && (b.lineStart(), b.point(o, a));
    else if (u && g)
        b.point(o, a);
    else {
        var c = [p = Math.max(Kc, Math.min(Jc, p)), v = Math.max(Kc, Math.min(Jc, v))], m = [o = Math.max(Kc, Math.min(Jc, o)), a = Math.max(Kc, Math.min(Jc, a))];
        !function (t, n, e, r, i, o) { var a, u = t[0], c = t[1], f = 0, s = 1, l = n[0] - u, h = n[1] - c; if (a = e - u, l || !(a > 0)) {
            if (a /= l, l < 0) {
                if (a < f)
                    return;
                a < s && (s = a);
            }
            else if (l > 0) {
                if (a > s)
                    return;
                a > f && (f = a);
            }
            if (a = i - u, l || !(a < 0)) {
                if (a /= l, l < 0) {
                    if (a > s)
                        return;
                    a > f && (f = a);
                }
                else if (l > 0) {
                    if (a < f)
                        return;
                    a < s && (s = a);
                }
                if (a = r - c, h || !(a > 0)) {
                    if (a /= h, h < 0) {
                        if (a < f)
                            return;
                        a < s && (s = a);
                    }
                    else if (h > 0) {
                        if (a > s)
                            return;
                        a > f && (f = a);
                    }
                    if (a = o - c, h || !(a < 0)) {
                        if (a /= h, h < 0) {
                            if (a > s)
                                return;
                            a > f && (f = a);
                        }
                        else if (h > 0) {
                            if (a < f)
                                return;
                            a < s && (s = a);
                        }
                        return f > 0 && (t[0] = u + f * l, t[1] = c + f * h), s < 1 && (n[0] = u + s * l, n[1] = c + s * h), !0;
                    }
                }
            }
        } }(c, m, t, n, e, r) ? u && (b.lineStart(), b.point(o, a), _ = !1) : (g || (b.lineStart(), b.point(c[0], c[1])), b.point(m[0], m[1]), u || b.lineEnd(), _ = !1);
    } p = o, v = a, g = u; } return x; }; }
    var nf, ef, rf, of = qa(), af = { sphere: cu, point: cu, lineStart: function () { af.point = cf, af.lineEnd = uf; }, lineEnd: cu, polygonStart: cu, polygonEnd: cu };
    function uf() { af.point = af.lineEnd = cu; }
    function cf(t, n) { nf = t *= Ga, ef = nu(n *= Ga), rf = Za(n), af.point = ff; }
    function ff(t, n) { t *= Ga; var e = nu(n *= Ga), r = Za(n), i = Va(t - nf), o = Za(i), a = r * nu(i), u = rf * e - ef * r * o, c = ef * e + rf * r * o; of.add(Wa(ru(a * a + u * u), c)), nf = t, ef = e, rf = r; }
    function sf(t) { return of.reset(), pu(t, af), +of; }
    var lf = [null, null], hf = { type: "LineString", coordinates: lf };
    function df(t, n) { return lf[0] = t, lf[1] = n, sf(hf); }
    var pf = { Feature: function (t, n) { return gf(t.geometry, n); }, FeatureCollection: function (t, n) { for (var e = t.features, r = -1, i = e.length; ++r < i;)
            if (gf(e[r].geometry, n))
                return !0; return !1; } }, vf = { Sphere: function () { return !0; }, Point: function (t, n) { return yf(t.coordinates, n); }, MultiPoint: function (t, n) { for (var e = t.coordinates, r = -1, i = e.length; ++r < i;)
            if (yf(e[r], n))
                return !0; return !1; }, LineString: function (t, n) { return _f(t.coordinates, n); }, MultiLineString: function (t, n) { for (var e = t.coordinates, r = -1, i = e.length; ++r < i;)
            if (_f(e[r], n))
                return !0; return !1; }, Polygon: function (t, n) { return bf(t.coordinates, n); }, MultiPolygon: function (t, n) { for (var e = t.coordinates, r = -1, i = e.length; ++r < i;)
            if (bf(e[r], n))
                return !0; return !1; }, GeometryCollection: function (t, n) { for (var e = t.geometries, r = -1, i = e.length; ++r < i;)
            if (gf(e[r], n))
                return !0; return !1; } };
    function gf(t, n) { return !(!t || !vf.hasOwnProperty(t.type)) && vf[t.type](t, n); }
    function yf(t, n) { return 0 === df(t, n); }
    function _f(t, n) { for (var e, r, i, o = 0, a = t.length; o < a; o++) {
        if (0 === (r = df(t[o], n)))
            return !0;
        if (o > 0 && (i = df(t[o], t[o - 1])) > 0 && e <= i && r <= i && (e + r - i) * (1 - Math.pow((e - r) / i, 2)) < Ya * i)
            return !0;
        e = r;
    } return !1; }
    function bf(t, n) { return !!Gc(t.map(mf), xf(n)); }
    function mf(t) { return (t = t.map(xf)).pop(), t; }
    function xf(t) { return [t[0] * Ga, t[1] * Ga]; }
    function wf(t, n, e) { var r = g(t, n - Ba, e).concat(n); return function (t) { return r.map(function (n) { return [t, n]; }); }; }
    function Mf(t, n, e) { var r = g(t, n - Ba, e).concat(n); return function (t) { return r.map(function (n) { return [n, t]; }); }; }
    function Nf() { var t, n, e, r, i, o, a, u, c, f, s, l, h = 10, d = h, p = 90, v = 360, y = 2.5; function _() { return { type: "MultiLineString", coordinates: b() }; } function b() { return g(Qa(r / p) * p, e, p).map(s).concat(g(Qa(u / v) * v, a, v).map(l)).concat(g(Qa(n / h) * h, t, h).filter(function (t) { return Va(t % p) > Ba; }).map(c)).concat(g(Qa(o / d) * d, i, d).filter(function (t) { return Va(t % v) > Ba; }).map(f)); } return _.lines = function () { return b().map(function (t) { return { type: "LineString", coordinates: t }; }); }, _.outline = function () { return { type: "Polygon", coordinates: [s(r).concat(l(a).slice(1), s(e).reverse().slice(1), l(u).reverse().slice(1))] }; }, _.extent = function (t) { return arguments.length ? _.extentMajor(t).extentMinor(t) : _.extentMinor(); }, _.extentMajor = function (t) { return arguments.length ? (r = +t[0][0], e = +t[1][0], u = +t[0][1], a = +t[1][1], r > e && (t = r, r = e, e = t), u > a && (t = u, u = a, a = t), _.precision(y)) : [[r, u], [e, a]]; }, _.extentMinor = function (e) { return arguments.length ? (n = +e[0][0], t = +e[1][0], o = +e[0][1], i = +e[1][1], n > t && (e = n, n = t, t = e), o > i && (e = o, o = i, i = e), _.precision(y)) : [[n, o], [t, i]]; }, _.step = function (t) { return arguments.length ? _.stepMajor(t).stepMinor(t) : _.stepMinor(); }, _.stepMajor = function (t) { return arguments.length ? (p = +t[0], v = +t[1], _) : [p, v]; }, _.stepMinor = function (t) { return arguments.length ? (h = +t[0], d = +t[1], _) : [h, d]; }, _.precision = function (h) { return arguments.length ? (y = +h, c = wf(o, i, 90), f = Mf(n, t, y), s = wf(u, a, 90), l = Mf(r, e, y), _) : y; }, _.extentMajor([[-180, -90 + Ba], [180, 90 - Ba]]).extentMinor([[-180, -80 - Ba], [180, 80 + Ba]]); }
    function Af(t) { return t; }
    var Tf, Sf, kf, Ef, Cf = qa(), Pf = qa(), zf = { point: cu, lineStart: cu, lineEnd: cu, polygonStart: function () { zf.lineStart = Rf, zf.lineEnd = Lf; }, polygonEnd: function () { zf.lineStart = zf.lineEnd = zf.point = cu, Cf.add(Va(Pf)), Pf.reset(); }, result: function () { var t = Cf / 2; return Cf.reset(), t; } };
    function Rf() { zf.point = Df; }
    function Df(t, n) { zf.point = qf, Tf = kf = t, Sf = Ef = n; }
    function qf(t, n) { Pf.add(Ef * t - kf * n), kf = t, Ef = n; }
    function Lf() { qf(Tf, Sf); }
    var Uf = 1 / 0, Of = Uf, Bf = -Uf, Yf = Bf, Ff = { point: function (t, n) { t < Uf && (Uf = t); t > Bf && (Bf = t); n < Of && (Of = n); n > Yf && (Yf = n); }, lineStart: cu, lineEnd: cu, polygonStart: cu, polygonEnd: cu, result: function () { var t = [[Uf, Of], [Bf, Yf]]; return Bf = Yf = -(Of = Uf = 1 / 0), t; } };
    var If, jf, Hf, Xf, Gf = 0, Vf = 0, $f = 0, Wf = 0, Zf = 0, Qf = 0, Jf = 0, Kf = 0, ts = 0, ns = { point: es, lineStart: rs, lineEnd: as, polygonStart: function () { ns.lineStart = us, ns.lineEnd = cs; }, polygonEnd: function () { ns.point = es, ns.lineStart = rs, ns.lineEnd = as; }, result: function () { var t = ts ? [Jf / ts, Kf / ts] : Qf ? [Wf / Qf, Zf / Qf] : $f ? [Gf / $f, Vf / $f] : [NaN, NaN]; return Gf = Vf = $f = Wf = Zf = Qf = Jf = Kf = ts = 0, t; } };
    function es(t, n) { Gf += t, Vf += n, ++$f; }
    function rs() { ns.point = is; }
    function is(t, n) { ns.point = os, es(Hf = t, Xf = n); }
    function os(t, n) { var e = t - Hf, r = n - Xf, i = ru(e * e + r * r); Wf += i * (Hf + t) / 2, Zf += i * (Xf + n) / 2, Qf += i, es(Hf = t, Xf = n); }
    function as() { ns.point = es; }
    function us() { ns.point = fs; }
    function cs() { ss(If, jf); }
    function fs(t, n) { ns.point = ss, es(If = Hf = t, jf = Xf = n); }
    function ss(t, n) { var e = t - Hf, r = n - Xf, i = ru(e * e + r * r); Wf += i * (Hf + t) / 2, Zf += i * (Xf + n) / 2, Qf += i, Jf += (i = Xf * t - Hf * n) * (Hf + t), Kf += i * (Xf + n), ts += 3 * i, es(Hf = t, Xf = n); }
    function ls(t) { this._context = t; }
    ls.prototype = { _radius: 4.5, pointRadius: function (t) { return this._radius = t, this; }, polygonStart: function () { this._line = 0; }, polygonEnd: function () { this._line = NaN; }, lineStart: function () { this._point = 0; }, lineEnd: function () { 0 === this._line && this._context.closePath(), this._point = NaN; }, point: function (t, n) { switch (this._point) {
            case 0:
                this._context.moveTo(t, n), this._point = 1;
                break;
            case 1:
                this._context.lineTo(t, n);
                break;
            default: this._context.moveTo(t + this._radius, n), this._context.arc(t, n, this._radius, 0, Ha);
        } }, result: cu };
    var hs, ds, ps, vs, gs, ys = qa(), _s = { point: cu, lineStart: function () { _s.point = bs; }, lineEnd: function () { hs && ms(ds, ps), _s.point = cu; }, polygonStart: function () { hs = !0; }, polygonEnd: function () { hs = null; }, result: function () { var t = +ys; return ys.reset(), t; } };
    function bs(t, n) { _s.point = ms, ds = vs = t, ps = gs = n; }
    function ms(t, n) { vs -= t, gs -= n, ys.add(ru(vs * vs + gs * gs)), vs = t, gs = n; }
    function xs() { this._string = []; }
    function ws(t) { return "m0," + t + "a" + t + "," + t + " 0 1,1 0," + -2 * t + "a" + t + "," + t + " 0 1,1 0," + 2 * t + "z"; }
    function Ms(t) { return function (n) { var e = new Ns; for (var r in t)
        e[r] = t[r]; return e.stream = n, e; }; }
    function Ns() { }
    function As(t, n, e) { var r = t.clipExtent && t.clipExtent(); return t.scale(150).translate([0, 0]), null != r && t.clipExtent(null), pu(e, t.stream(Ff)), n(Ff.result()), null != r && t.clipExtent(r), t; }
    function Ts(t, n, e) { return As(t, function (e) { var r = n[1][0] - n[0][0], i = n[1][1] - n[0][1], o = Math.min(r / (e[1][0] - e[0][0]), i / (e[1][1] - e[0][1])), a = +n[0][0] + (r - o * (e[1][0] + e[0][0])) / 2, u = +n[0][1] + (i - o * (e[1][1] + e[0][1])) / 2; t.scale(150 * o).translate([a, u]); }, e); }
    function Ss(t, n, e) { return Ts(t, [[0, 0], n], e); }
    function ks(t, n, e) { return As(t, function (e) { var r = +n, i = r / (e[1][0] - e[0][0]), o = (r - i * (e[1][0] + e[0][0])) / 2, a = -i * e[0][1]; t.scale(150 * i).translate([o, a]); }, e); }
    function Es(t, n, e) { return As(t, function (e) { var r = +n, i = r / (e[1][1] - e[0][1]), o = -i * e[0][0], a = (r - i * (e[1][1] + e[0][1])) / 2; t.scale(150 * i).translate([o, a]); }, e); }
    xs.prototype = { _radius: 4.5, _circle: ws(4.5), pointRadius: function (t) { return (t = +t) !== this._radius && (this._radius = t, this._circle = null), this; }, polygonStart: function () { this._line = 0; }, polygonEnd: function () { this._line = NaN; }, lineStart: function () { this._point = 0; }, lineEnd: function () { 0 === this._line && this._string.push("Z"), this._point = NaN; }, point: function (t, n) { switch (this._point) {
            case 0:
                this._string.push("M", t, ",", n), this._point = 1;
                break;
            case 1:
                this._string.push("L", t, ",", n);
                break;
            default: null == this._circle && (this._circle = ws(this._radius)), this._string.push("M", t, ",", n, this._circle);
        } }, result: function () { if (this._string.length) {
            var t = this._string.join("");
            return this._string = [], t;
        } return null; } }, Ns.prototype = { constructor: Ns, point: function (t, n) { this.stream.point(t, n); }, sphere: function () { this.stream.sphere(); }, lineStart: function () { this.stream.lineStart(); }, lineEnd: function () { this.stream.lineEnd(); }, polygonStart: function () { this.stream.polygonStart(); }, polygonEnd: function () { this.stream.polygonEnd(); } };
    var Cs = 16, Ps = Za(30 * Ga);
    function zs(t, n) { return +n ? function (t, n) { function e(r, i, o, a, u, c, f, s, l, h, d, p, v, g) { var y = f - r, _ = s - i, b = y * y + _ * _; if (b > 4 * n && v--) {
        var m = a + h, x = u + d, w = c + p, M = ru(m * m + x * x + w * w), N = au(w /= M), A = Va(Va(w) - 1) < Ba || Va(o - l) < Ba ? (o + l) / 2 : Wa(x, m), T = t(A, N), S = T[0], k = T[1], E = S - r, C = k - i, P = _ * E - y * C;
        (P * P / b > n || Va((y * E + _ * C) / b - .5) > .3 || a * h + u * d + c * p < Ps) && (e(r, i, o, a, u, c, S, k, A, m /= M, x /= M, w, v, g), g.point(S, k), e(S, k, A, m, x, w, f, s, l, h, d, p, v, g));
    } } return function (n) { var r, i, o, a, u, c, f, s, l, h, d, p, v = { point: g, lineStart: y, lineEnd: b, polygonStart: function () { n.polygonStart(), v.lineStart = m; }, polygonEnd: function () { n.polygonEnd(), v.lineStart = y; } }; function g(e, r) { e = t(e, r), n.point(e[0], e[1]); } function y() { s = NaN, v.point = _, n.lineStart(); } function _(r, i) { var o = ku([r, i]), a = t(r, i); e(s, l, f, h, d, p, s = a[0], l = a[1], f = r, h = o[0], d = o[1], p = o[2], Cs, n), n.point(s, l); } function b() { v.point = g, n.lineEnd(); } function m() { y(), v.point = x, v.lineEnd = w; } function x(t, n) { _(r = t, n), i = s, o = l, a = h, u = d, c = p, v.point = _; } function w() { e(s, l, f, h, d, p, i, o, r, a, u, c, Cs, n), v.lineEnd = b, b(); } return v; }; }(t, n) : function (t) { return Ms({ point: function (n, e) { n = t(n, e), this.stream.point(n[0], n[1]); } }); }(t); }
    var Rs = Ms({ point: function (t, n) { this.stream.point(t * Ga, n * Ga); } });
    function Ds(t, n, e, r) { var i = Za(r), o = nu(r), a = i * t, u = o * t, c = i / t, f = o / t, s = (o * e - i * n) / t, l = (o * n + i * e) / t; function h(t, r) { return [a * t - u * r + n, e - u * t - a * r]; } return h.invert = function (t, n) { return [c * t - f * n + s, l - f * t - c * n]; }, h; }
    function qs(t) { return Ls(function () { return t; })(); }
    function Ls(t) { var n, e, r, i, o, a, u, c, f, s, l = 150, h = 480, d = 250, p = 0, v = 0, g = 0, y = 0, _ = 0, b = 0, m = null, x = Zc, w = null, M = Af, N = .5; function A(t) { return c(t[0] * Ga, t[1] * Ga); } function T(t) { return (t = c.invert(t[0], t[1])) && [t[0] * Xa, t[1] * Xa]; } function S() { var t = Ds(l, 0, 0, b).apply(null, n(p, v)), r = (b ? Ds : function (t, n, e) { function r(r, i) { return [n + t * r, e - t * i]; } return r.invert = function (r, i) { return [(r - n) / t, (e - i) / t]; }, r; })(l, h - t[0], d - t[1], b); return e = zc(g, y, _), u = Cc(n, r), c = Cc(e, u), a = zs(u, N), k(); } function k() { return f = s = null, A; } return A.stream = function (t) { return f && s === t ? f : f = Rs(function (t) { return Ms({ point: function (n, e) { var r = t(n, e); return this.stream.point(r[0], r[1]); } }); }(e)(x(a(M(s = t))))); }, A.preclip = function (t) { return arguments.length ? (x = t, m = void 0, k()) : x; }, A.postclip = function (t) { return arguments.length ? (M = t, w = r = i = o = null, k()) : M; }, A.clipAngle = function (t) { return arguments.length ? (x = +t ? Qc(m = t * Ga) : (m = null, Zc), k()) : m * Xa; }, A.clipExtent = function (t) { return arguments.length ? (M = null == t ? (w = r = i = o = null, Af) : tf(w = +t[0][0], r = +t[0][1], i = +t[1][0], o = +t[1][1]), k()) : null == w ? null : [[w, r], [i, o]]; }, A.scale = function (t) { return arguments.length ? (l = +t, S()) : l; }, A.translate = function (t) { return arguments.length ? (h = +t[0], d = +t[1], S()) : [h, d]; }, A.center = function (t) { return arguments.length ? (p = t[0] % 360 * Ga, v = t[1] % 360 * Ga, S()) : [p * Xa, v * Xa]; }, A.rotate = function (t) { return arguments.length ? (g = t[0] % 360 * Ga, y = t[1] % 360 * Ga, _ = t.length > 2 ? t[2] % 360 * Ga : 0, S()) : [g * Xa, y * Xa, _ * Xa]; }, A.angle = function (t) { return arguments.length ? (b = t % 360 * Ga, S()) : b * Xa; }, A.precision = function (t) { return arguments.length ? (a = zs(u, N = t * t), k()) : ru(N); }, A.fitExtent = function (t, n) { return Ts(A, t, n); }, A.fitSize = function (t, n) { return Ss(A, t, n); }, A.fitWidth = function (t, n) { return ks(A, t, n); }, A.fitHeight = function (t, n) { return Es(A, t, n); }, function () { return n = t.apply(this, arguments), A.invert = n.invert && T, S(); }; }
    function Us(t) { var n = 0, e = Fa / 3, r = Ls(t), i = r(n, e); return i.parallels = function (t) { return arguments.length ? r(n = t[0] * Ga, e = t[1] * Ga) : [n * Xa, e * Xa]; }, i; }
    function Os(t, n) { var e = nu(t), r = (e + nu(n)) / 2; if (Va(r) < Ba)
        return function (t) { var n = Za(t); function e(t, e) { return [t * n, nu(e) / n]; } return e.invert = function (t, e) { return [t / n, au(e * n)]; }, e; }(t); var i = 1 + e * (2 * r - e), o = ru(i) / r; function a(t, n) { var e = ru(i - 2 * r * nu(n)) / r; return [e * nu(t *= r), o - e * Za(t)]; } return a.invert = function (t, n) { var e = o - n; return [Wa(t, Va(e)) / r * eu(e), au((i - (t * t + e * e) * r * r) / (2 * r))]; }, a; }
    function Bs() { return Us(Os).scale(155.424).center([0, 33.6442]); }
    function Ys() { return Bs().parallels([29.5, 45.5]).scale(1070).translate([480, 250]).rotate([96, 0]).center([-.6, 38.7]); }
    function Fs(t) { return function (n, e) { var r = Za(n), i = Za(e), o = t(r * i); return [o * i * nu(n), o * nu(e)]; }; }
    function Is(t) { return function (n, e) { var r = ru(n * n + e * e), i = t(r), o = nu(i), a = Za(i); return [Wa(n * o, r * a), au(r && e * o / r)]; }; }
    var js = Fs(function (t) { return ru(2 / (1 + t)); });
    js.invert = Is(function (t) { return 2 * au(t / 2); });
    var Hs = Fs(function (t) { return (t = ou(t)) && t / nu(t); });
    function Xs(t, n) { return [t, Ka(iu((Ia + n) / 2))]; }
    function Gs(t) { var n, e, r, i = qs(t), o = i.center, a = i.scale, u = i.translate, c = i.clipExtent, f = null; function s() { var o = Fa * a(), u = i(Lc(i.rotate()).invert([0, 0])); return c(null == f ? [[u[0] - o, u[1] - o], [u[0] + o, u[1] + o]] : t === Xs ? [[Math.max(u[0] - o, f), n], [Math.min(u[0] + o, e), r]] : [[f, Math.max(u[1] - o, n)], [e, Math.min(u[1] + o, r)]]); } return i.scale = function (t) { return arguments.length ? (a(t), s()) : a(); }, i.translate = function (t) { return arguments.length ? (u(t), s()) : u(); }, i.center = function (t) { return arguments.length ? (o(t), s()) : o(); }, i.clipExtent = function (t) { return arguments.length ? (null == t ? f = n = e = r = null : (f = +t[0][0], n = +t[0][1], e = +t[1][0], r = +t[1][1]), s()) : null == f ? null : [[f, n], [e, r]]; }, s(); }
    function Vs(t) { return iu((Ia + t) / 2); }
    function $s(t, n) { var e = Za(t), r = t === n ? nu(t) : Ka(e / Za(n)) / Ka(Vs(n) / Vs(t)), i = e * tu(Vs(t), r) / r; if (!r)
        return Xs; function o(t, n) { i > 0 ? n < -Ia + Ba && (n = -Ia + Ba) : n > Ia - Ba && (n = Ia - Ba); var e = i / tu(Vs(n), r); return [e * nu(r * t), i - e * Za(r * t)]; } return o.invert = function (t, n) { var e = i - n, o = eu(r) * ru(t * t + e * e); return [Wa(t, Va(e)) / r * eu(e), 2 * $a(tu(i / o, 1 / r)) - Ia]; }, o; }
    function Ws(t, n) { return [t, n]; }
    function Zs(t, n) { var e = Za(t), r = t === n ? nu(t) : (e - Za(n)) / (n - t), i = e / r + t; if (Va(r) < Ba)
        return Ws; function o(t, n) { var e = i - n, o = r * t; return [e * nu(o), i - e * Za(o)]; } return o.invert = function (t, n) { var e = i - n; return [Wa(t, Va(e)) / r * eu(e), i - eu(r) * ru(t * t + e * e)]; }, o; }
    Hs.invert = Is(function (t) { return t; }), Xs.invert = function (t, n) { return [t, 2 * $a(Ja(n)) - Ia]; }, Ws.invert = Ws;
    var Qs = 1.340264, Js = -.081106, Ks = 893e-6, tl = .003796, nl = ru(3) / 2;
    function el(t, n) { var e = au(nl * nu(n)), r = e * e, i = r * r * r; return [t * Za(e) / (nl * (Qs + 3 * Js * r + i * (7 * Ks + 9 * tl * r))), e * (Qs + Js * r + i * (Ks + tl * r))]; }
    function rl(t, n) { var e = Za(n), r = Za(t) * e; return [e * nu(t) / r, nu(n) / r]; }
    function il(t, n, e, r) { return 1 === t && 1 === n && 0 === e && 0 === r ? Af : Ms({ point: function (i, o) { this.stream.point(i * t + e, o * n + r); } }); }
    function ol(t, n) { var e = n * n, r = e * e; return [t * (.8707 - .131979 * e + r * (r * (.003971 * e - .001529 * r) - .013791)), n * (1.007226 + e * (.015085 + r * (.028874 * e - .044475 - .005916 * r)))]; }
    function al(t, n) { return [Za(n) * nu(t), nu(n)]; }
    function ul(t, n) { var e = Za(n), r = 1 + Za(t) * e; return [e * nu(t) / r, nu(n) / r]; }
    function cl(t, n) { return [Ka(iu((Ia + n) / 2)), -t]; }
    function fl(t, n) { return t.parent === n.parent ? 1 : 2; }
    function sl(t, n) { return t + n.x; }
    function ll(t, n) { return Math.max(t, n.y); }
    function hl(t) { var n = 0, e = t.children, r = e && e.length; if (r)
        for (; --r >= 0;)
            n += e[r].value;
    else
        n = 1; t.value = n; }
    function dl(t, n) { var e, r, i, o, a, u = new yl(t), c = +t.value && (u.value = t.value), f = [u]; for (null == n && (n = pl); e = f.pop();)
        if (c && (e.value = +e.data.value), (i = n(e.data)) && (a = i.length))
            for (e.children = new Array(a), o = a - 1; o >= 0; --o)
                f.push(r = e.children[o] = new yl(i[o])), r.parent = e, r.depth = e.depth + 1; return u.eachBefore(gl); }
    function pl(t) { return t.children; }
    function vl(t) { t.data = t.data.data; }
    function gl(t) { var n = 0; do {
        t.height = n;
    } while ((t = t.parent) && t.height < ++n); }
    function yl(t) { this.data = t, this.depth = this.height = 0, this.parent = null; }
    el.invert = function (t, n) { for (var e, r = n, i = r * r, o = i * i * i, a = 0; a < 12 && (o = (i = (r -= e = (r * (Qs + Js * i + o * (Ks + tl * i)) - n) / (Qs + 3 * Js * i + o * (7 * Ks + 9 * tl * i))) * r) * i * i, !(Va(e) < Ya)); ++a)
        ; return [nl * t * (Qs + 3 * Js * i + o * (7 * Ks + 9 * tl * i)) / Za(r), au(nu(r) / nl)]; }, rl.invert = Is($a), ol.invert = function (t, n) { var e, r = n, i = 25; do {
        var o = r * r, a = o * o;
        r -= e = (r * (1.007226 + o * (.015085 + a * (.028874 * o - .044475 - .005916 * a))) - n) / (1.007226 + o * (.045255 + a * (.259866 * o - .311325 - .005916 * 11 * a)));
    } while (Va(e) > Ba && --i > 0); return [t / (.8707 + (o = r * r) * (o * (o * o * o * (.003971 - .001529 * o) - .013791) - .131979)), r]; }, al.invert = Is(au), ul.invert = Is(function (t) { return 2 * $a(t); }), cl.invert = function (t, n) { return [-n, 2 * $a(Ja(t)) - Ia]; }, yl.prototype = dl.prototype = { constructor: yl, count: function () { return this.eachAfter(hl); }, each: function (t) { var n, e, r, i, o = this, a = [o]; do {
            for (n = a.reverse(), a = []; o = n.pop();)
                if (t(o), e = o.children)
                    for (r = 0, i = e.length; r < i; ++r)
                        a.push(e[r]);
        } while (a.length); return this; }, eachAfter: function (t) { for (var n, e, r, i = this, o = [i], a = []; i = o.pop();)
            if (a.push(i), n = i.children)
                for (e = 0, r = n.length; e < r; ++e)
                    o.push(n[e]); for (; i = a.pop();)
            t(i); return this; }, eachBefore: function (t) { for (var n, e, r = this, i = [r]; r = i.pop();)
            if (t(r), n = r.children)
                for (e = n.length - 1; e >= 0; --e)
                    i.push(n[e]); return this; }, sum: function (t) { return this.eachAfter(function (n) { for (var e = +t(n.data) || 0, r = n.children, i = r && r.length; --i >= 0;)
            e += r[i].value; n.value = e; }); }, sort: function (t) { return this.eachBefore(function (n) { n.children && n.children.sort(t); }); }, path: function (t) { for (var n = this, e = function (t, n) { if (t === n)
            return t; var e = t.ancestors(), r = n.ancestors(), i = null; for (t = e.pop(), n = r.pop(); t === n;)
            i = t, t = e.pop(), n = r.pop(); return i; }(n, t), r = [n]; n !== e;)
            n = n.parent, r.push(n); for (var i = r.length; t !== e;)
            r.splice(i, 0, t), t = t.parent; return r; }, ancestors: function () { for (var t = this, n = [t]; t = t.parent;)
            n.push(t); return n; }, descendants: function () { var t = []; return this.each(function (n) { t.push(n); }), t; }, leaves: function () { var t = []; return this.eachBefore(function (n) { n.children || t.push(n); }), t; }, links: function () { var t = this, n = []; return t.each(function (e) { e !== t && n.push({ source: e.parent, target: e }); }), n; }, copy: function () { return dl(this).eachBefore(vl); } };
    var _l = Array.prototype.slice;
    function bl(t) { for (var n, e, r = 0, i = (t = function (t) { for (var n, e, r = t.length; r;)
        e = Math.random() * r-- | 0, n = t[r], t[r] = t[e], t[e] = n; return t; }(_l.call(t))).length, o = []; r < i;)
        n = t[r], e && wl(e, n) ? ++r : (e = Nl(o = ml(o, n)), r = 0); return e; }
    function ml(t, n) { var e, r; if (Ml(n, t))
        return [n]; for (e = 0; e < t.length; ++e)
        if (xl(n, t[e]) && Ml(Al(t[e], n), t))
            return [t[e], n]; for (e = 0; e < t.length - 1; ++e)
        for (r = e + 1; r < t.length; ++r)
            if (xl(Al(t[e], t[r]), n) && xl(Al(t[e], n), t[r]) && xl(Al(t[r], n), t[e]) && Ml(Tl(t[e], t[r], n), t))
                return [t[e], t[r], n]; throw new Error; }
    function xl(t, n) { var e = t.r - n.r, r = n.x - t.x, i = n.y - t.y; return e < 0 || e * e < r * r + i * i; }
    function wl(t, n) { var e = t.r - n.r + 1e-6, r = n.x - t.x, i = n.y - t.y; return e > 0 && e * e > r * r + i * i; }
    function Ml(t, n) { for (var e = 0; e < n.length; ++e)
        if (!wl(t, n[e]))
            return !1; return !0; }
    function Nl(t) { switch (t.length) {
        case 1: return { x: (n = t[0]).x, y: n.y, r: n.r };
        case 2: return Al(t[0], t[1]);
        case 3: return Tl(t[0], t[1], t[2]);
    } var n; }
    function Al(t, n) { var e = t.x, r = t.y, i = t.r, o = n.x, a = n.y, u = n.r, c = o - e, f = a - r, s = u - i, l = Math.sqrt(c * c + f * f); return { x: (e + o + c / l * s) / 2, y: (r + a + f / l * s) / 2, r: (l + i + u) / 2 }; }
    function Tl(t, n, e) { var r = t.x, i = t.y, o = t.r, a = n.x, u = n.y, c = n.r, f = e.x, s = e.y, l = e.r, h = r - a, d = r - f, p = i - u, v = i - s, g = c - o, y = l - o, _ = r * r + i * i - o * o, b = _ - a * a - u * u + c * c, m = _ - f * f - s * s + l * l, x = d * p - h * v, w = (p * m - v * b) / (2 * x) - r, M = (v * g - p * y) / x, N = (d * b - h * m) / (2 * x) - i, A = (h * y - d * g) / x, T = M * M + A * A - 1, S = 2 * (o + w * M + N * A), k = w * w + N * N - o * o, E = -(T ? (S + Math.sqrt(S * S - 4 * T * k)) / (2 * T) : k / S); return { x: r + w + M * E, y: i + N + A * E, r: E }; }
    function Sl(t, n, e) { var r, i, o, a, u = t.x - n.x, c = t.y - n.y, f = u * u + c * c; f ? (i = n.r + e.r, i *= i, a = t.r + e.r, i > (a *= a) ? (r = (f + a - i) / (2 * f), o = Math.sqrt(Math.max(0, a / f - r * r)), e.x = t.x - r * u - o * c, e.y = t.y - r * c + o * u) : (r = (f + i - a) / (2 * f), o = Math.sqrt(Math.max(0, i / f - r * r)), e.x = n.x + r * u - o * c, e.y = n.y + r * c + o * u)) : (e.x = n.x + e.r, e.y = n.y); }
    function kl(t, n) { var e = t.r + n.r - 1e-6, r = n.x - t.x, i = n.y - t.y; return e > 0 && e * e > r * r + i * i; }
    function El(t) { var n = t._, e = t.next._, r = n.r + e.r, i = (n.x * e.r + e.x * n.r) / r, o = (n.y * e.r + e.y * n.r) / r; return i * i + o * o; }
    function Cl(t) { this._ = t, this.next = null, this.previous = null; }
    function Pl(t) { if (!(i = t.length))
        return 0; var n, e, r, i, o, a, u, c, f, s, l; if ((n = t[0]).x = 0, n.y = 0, !(i > 1))
        return n.r; if (e = t[1], n.x = -e.r, e.x = n.r, e.y = 0, !(i > 2))
        return n.r + e.r; Sl(e, n, r = t[2]), n = new Cl(n), e = new Cl(e), r = new Cl(r), n.next = r.previous = e, e.next = n.previous = r, r.next = e.previous = n; t: for (u = 3; u < i; ++u) {
        Sl(n._, e._, r = t[u]), r = new Cl(r), c = e.next, f = n.previous, s = e._.r, l = n._.r;
        do {
            if (s <= l) {
                if (kl(c._, r._)) {
                    e = c, n.next = e, e.previous = n, --u;
                    continue t;
                }
                s += c._.r, c = c.next;
            }
            else {
                if (kl(f._, r._)) {
                    (n = f).next = e, e.previous = n, --u;
                    continue t;
                }
                l += f._.r, f = f.previous;
            }
        } while (c !== f.next);
        for (r.previous = n, r.next = e, n.next = e.previous = e = r, o = El(n); (r = r.next) !== e;)
            (a = El(r)) < o && (n = r, o = a);
        e = n.next;
    } for (n = [e._], r = e; (r = r.next) !== e;)
        n.push(r._); for (r = bl(n), u = 0; u < i; ++u)
        (n = t[u]).x -= r.x, n.y -= r.y; return r.r; }
    function zl(t) { if ("function" != typeof t)
        throw new Error; return t; }
    function Rl() { return 0; }
    function Dl(t) { return function () { return t; }; }
    function ql(t) { return Math.sqrt(t.value); }
    function Ll(t) { return function (n) { n.children || (n.r = Math.max(0, +t(n) || 0)); }; }
    function Ul(t, n) { return function (e) { if (r = e.children) {
        var r, i, o, a = r.length, u = t(e) * n || 0;
        if (u)
            for (i = 0; i < a; ++i)
                r[i].r += u;
        if (o = Pl(r), u)
            for (i = 0; i < a; ++i)
                r[i].r -= u;
        e.r = o + u;
    } }; }
    function Ol(t) { return function (n) { var e = n.parent; n.r *= t, e && (n.x = e.x + t * n.x, n.y = e.y + t * n.y); }; }
    function Bl(t) { t.x0 = Math.round(t.x0), t.y0 = Math.round(t.y0), t.x1 = Math.round(t.x1), t.y1 = Math.round(t.y1); }
    function Yl(t, n, e, r, i) { for (var o, a = t.children, u = -1, c = a.length, f = t.value && (r - n) / t.value; ++u < c;)
        (o = a[u]).y0 = e, o.y1 = i, o.x0 = n, o.x1 = n += o.value * f; }
    var Fl = "$", Il = { depth: -1 }, jl = {};
    function Hl(t) { return t.id; }
    function Xl(t) { return t.parentId; }
    function Gl(t, n) { return t.parent === n.parent ? 1 : 2; }
    function Vl(t) { var n = t.children; return n ? n[0] : t.t; }
    function $l(t) { var n = t.children; return n ? n[n.length - 1] : t.t; }
    function Wl(t, n, e) { var r = e / (n.i - t.i); n.c -= r, n.s += e, t.c += r, n.z += e, n.m += e; }
    function Zl(t, n, e) { return t.a.parent === n.parent ? t.a : e; }
    function Ql(t, n) { this._ = t, this.parent = null, this.children = null, this.A = null, this.a = this, this.z = 0, this.m = 0, this.c = 0, this.s = 0, this.t = null, this.i = n; }
    function Jl(t, n, e, r, i) { for (var o, a = t.children, u = -1, c = a.length, f = t.value && (i - e) / t.value; ++u < c;)
        (o = a[u]).x0 = n, o.x1 = r, o.y0 = e, o.y1 = e += o.value * f; }
    Ql.prototype = Object.create(yl.prototype);
    var Kl = (1 + Math.sqrt(5)) / 2;
    function th(t, n, e, r, i, o) { for (var a, u, c, f, s, l, h, d, p, v, g, y = [], _ = n.children, b = 0, m = 0, x = _.length, w = n.value; b < x;) {
        c = i - e, f = o - r;
        do {
            s = _[m++].value;
        } while (!s && m < x);
        for (l = h = s, g = s * s * (v = Math.max(f / c, c / f) / (w * t)), p = Math.max(h / g, g / l); m < x; ++m) {
            if (s += u = _[m].value, u < l && (l = u), u > h && (h = u), g = s * s * v, (d = Math.max(h / g, g / l)) > p) {
                s -= u;
                break;
            }
            p = d;
        }
        y.push(a = { value: s, dice: c < f, children: _.slice(b, m) }), a.dice ? Yl(a, e, r, i, w ? r += f * s / w : o) : Jl(a, e, r, w ? e += c * s / w : i, o), w -= s, b = m;
    } return y; }
    var nh = function t(n) { function e(t, e, r, i, o) { th(n, t, e, r, i, o); } return e.ratio = function (n) { return t((n = +n) > 1 ? n : 1); }, e; }(Kl);
    var eh = function t(n) { function e(t, e, r, i, o) { if ((a = t._squarify) && a.ratio === n)
        for (var a, u, c, f, s, l = -1, h = a.length, d = t.value; ++l < h;) {
            for (c = (u = a[l]).children, f = u.value = 0, s = c.length; f < s; ++f)
                u.value += c[f].value;
            u.dice ? Yl(u, e, r, i, r += (o - r) * u.value / d) : Jl(u, e, r, e += (i - e) * u.value / d, o), d -= u.value;
        }
    else
        t._squarify = a = th(n, t, e, r, i, o), a.ratio = n; } return e.ratio = function (n) { return t((n = +n) > 1 ? n : 1); }, e; }(Kl);
    function rh(t, n) { return t[0] - n[0] || t[1] - n[1]; }
    function ih(t) { for (var n, e, r, i = t.length, o = [0, 1], a = 2, u = 2; u < i; ++u) {
        for (; a > 1 && (n = t[o[a - 2]], e = t[o[a - 1]], r = t[u], (e[0] - n[0]) * (r[1] - n[1]) - (e[1] - n[1]) * (r[0] - n[0]) <= 0);)
            --a;
        o[a++] = u;
    } return o.slice(0, a); }
    function oh() { return Math.random(); }
    var ah = function t(n) { function e(t, e) { return t = null == t ? 0 : +t, e = null == e ? 1 : +e, 1 === arguments.length ? (e = t, t = 0) : e -= t, function () { return n() * e + t; }; } return e.source = t, e; }(oh), uh = function t(n) { function e(t, e) { var r, i; return t = null == t ? 0 : +t, e = null == e ? 1 : +e, function () { var o; if (null != r)
        o = r, r = null;
    else
        do {
            r = 2 * n() - 1, o = 2 * n() - 1, i = r * r + o * o;
        } while (!i || i > 1); return t + e * o * Math.sqrt(-2 * Math.log(i) / i); }; } return e.source = t, e; }(oh), ch = function t(n) { function e() { var t = uh.source(n).apply(this, arguments); return function () { return Math.exp(t()); }; } return e.source = t, e; }(oh), fh = function t(n) { function e(t) { return function () { for (var e = 0, r = 0; r < t; ++r)
        e += n(); return e; }; } return e.source = t, e; }(oh), sh = function t(n) { function e(t) { var e = fh.source(n)(t); return function () { return e() / t; }; } return e.source = t, e; }(oh), lh = function t(n) { function e(t) { return function () { return -Math.log(1 - n()) / t; }; } return e.source = t, e; }(oh);
    function hh(t, n) { switch (arguments.length) {
        case 0: break;
        case 1:
            this.range(t);
            break;
        default: this.range(n).domain(t);
    } return this; }
    function dh(t, n) { switch (arguments.length) {
        case 0: break;
        case 1:
            this.interpolator(t);
            break;
        default: this.interpolator(n).domain(t);
    } return this; }
    var ph = Array.prototype, vh = ph.map, gh = ph.slice, yh = { name: "implicit" };
    function _h() { var t = Ji(), n = [], e = [], r = yh; function i(i) { var o = i + "", a = t.get(o); if (!a) {
        if (r !== yh)
            return r;
        t.set(o, a = n.push(i));
    } return e[(a - 1) % e.length]; } return i.domain = function (e) { if (!arguments.length)
        return n.slice(); n = [], t = Ji(); for (var r, o, a = -1, u = e.length; ++a < u;)
        t.has(o = (r = e[a]) + "") || t.set(o, n.push(r)); return i; }, i.range = function (t) { return arguments.length ? (e = gh.call(t), i) : e.slice(); }, i.unknown = function (t) { return arguments.length ? (r = t, i) : r; }, i.copy = function () { return _h(n, e).unknown(r); }, hh.apply(i, arguments), i; }
    function bh() { var t, n, e = _h().unknown(void 0), r = e.domain, i = e.range, o = [0, 1], a = !1, u = 0, c = 0, f = .5; function s() { var e = r().length, s = o[1] < o[0], l = o[s - 0], h = o[1 - s]; t = (h - l) / Math.max(1, e - u + 2 * c), a && (t = Math.floor(t)), l += (h - l - t * (e - u)) * f, n = t * (1 - u), a && (l = Math.round(l), n = Math.round(n)); var d = g(e).map(function (n) { return l + t * n; }); return i(s ? d.reverse() : d); } return delete e.unknown, e.domain = function (t) { return arguments.length ? (r(t), s()) : r(); }, e.range = function (t) { return arguments.length ? (o = [+t[0], +t[1]], s()) : o.slice(); }, e.rangeRound = function (t) { return o = [+t[0], +t[1]], a = !0, s(); }, e.bandwidth = function () { return n; }, e.step = function () { return t; }, e.round = function (t) { return arguments.length ? (a = !!t, s()) : a; }, e.padding = function (t) { return arguments.length ? (u = Math.min(1, c = +t), s()) : u; }, e.paddingInner = function (t) { return arguments.length ? (u = Math.min(1, t), s()) : u; }, e.paddingOuter = function (t) { return arguments.length ? (c = +t, s()) : c; }, e.align = function (t) { return arguments.length ? (f = Math.max(0, Math.min(1, t)), s()) : f; }, e.copy = function () { return bh(r(), o).round(a).paddingInner(u).paddingOuter(c).align(f); }, hh.apply(s(), arguments); }
    function mh(t) { return +t; }
    var xh = [0, 1];
    function wh(t) { return t; }
    function Mh(t, n) { return (n -= t = +t) ? function (e) { return (e - t) / n; } : (e = isNaN(n) ? NaN : .5, function () { return e; }); var e; }
    function Nh(t) { var n, e = t[0], r = t[t.length - 1]; return e > r && (n = e, e = r, r = n), function (t) { return Math.max(e, Math.min(r, t)); }; }
    function Ah(t, n, e) { var r = t[0], i = t[1], o = n[0], a = n[1]; return i < r ? (r = Mh(i, r), o = e(a, o)) : (r = Mh(r, i), o = e(o, a)), function (t) { return o(r(t)); }; }
    function Th(t, n, e) { var r = Math.min(t.length, n.length) - 1, o = new Array(r), a = new Array(r), u = -1; for (t[r] < t[0] && (t = t.slice().reverse(), n = n.slice().reverse()); ++u < r;)
        o[u] = Mh(t[u], t[u + 1]), a[u] = e(n[u], n[u + 1]); return function (n) { var e = i(t, n, 1, r) - 1; return a[e](o[e](n)); }; }
    function Sh(t, n) { return n.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown()); }
    function kh() { var t, n, e, r, i, o, a = xh, u = xh, c = _e, f = wh; function s() { return r = Math.min(a.length, u.length) > 2 ? Th : Ah, i = o = null, l; } function l(n) { return isNaN(n = +n) ? e : (i || (i = r(a.map(t), u, c)))(t(f(n))); } return l.invert = function (e) { return f(n((o || (o = r(u, a.map(t), de)))(e))); }, l.domain = function (t) { return arguments.length ? (a = vh.call(t, mh), f === wh || (f = Nh(a)), s()) : a.slice(); }, l.range = function (t) { return arguments.length ? (u = gh.call(t), s()) : u.slice(); }, l.rangeRound = function (t) { return u = gh.call(t), c = be, s(); }, l.clamp = function (t) { return arguments.length ? (f = t ? Nh(a) : wh, l) : f !== wh; }, l.interpolate = function (t) { return arguments.length ? (c = t, s()) : c; }, l.unknown = function (t) { return arguments.length ? (e = t, l) : e; }, function (e, r) { return t = e, n = r, s(); }; }
    function Eh(t, n) { return kh()(t, n); }
    function Ch(n, e, r, i) { var o, a = w(n, e, r); switch ((i = Ma(null == i ? ",f" : i)).type) {
        case "s":
            var u = Math.max(Math.abs(n), Math.abs(e));
            return null != i.precision || isNaN(o = Ra(a, u)) || (i.precision = o), t.formatPrefix(i, u);
        case "":
        case "e":
        case "g":
        case "p":
        case "r":
            null != i.precision || isNaN(o = Da(a, Math.max(Math.abs(n), Math.abs(e)))) || (i.precision = o - ("e" === i.type));
            break;
        case "f":
        case "%": null != i.precision || isNaN(o = za(a)) || (i.precision = o - 2 * ("%" === i.type));
    } return t.format(i); }
    function Ph(t) { var n = t.domain; return t.ticks = function (t) { var e = n(); return m(e[0], e[e.length - 1], null == t ? 10 : t); }, t.tickFormat = function (t, e) { var r = n(); return Ch(r[0], r[r.length - 1], null == t ? 10 : t, e); }, t.nice = function (e) { null == e && (e = 10); var r, i = n(), o = 0, a = i.length - 1, u = i[o], c = i[a]; return c < u && (r = u, u = c, c = r, r = o, o = a, a = r), (r = x(u, c, e)) > 0 ? r = x(u = Math.floor(u / r) * r, c = Math.ceil(c / r) * r, e) : r < 0 && (r = x(u = Math.ceil(u * r) / r, c = Math.floor(c * r) / r, e)), r > 0 ? (i[o] = Math.floor(u / r) * r, i[a] = Math.ceil(c / r) * r, n(i)) : r < 0 && (i[o] = Math.ceil(u * r) / r, i[a] = Math.floor(c * r) / r, n(i)), t; }, t; }
    function zh(t, n) { var e, r = 0, i = (t = t.slice()).length - 1, o = t[r], a = t[i]; return a < o && (e = r, r = i, i = e, e = o, o = a, a = e), t[r] = n.floor(o), t[i] = n.ceil(a), t; }
    function Rh(t) { return Math.log(t); }
    function Dh(t) { return Math.exp(t); }
    function qh(t) { return -Math.log(-t); }
    function Lh(t) { return -Math.exp(-t); }
    function Uh(t) { return isFinite(t) ? +("1e" + t) : t < 0 ? 0 : t; }
    function Oh(t) { return function (n) { return -t(-n); }; }
    function Bh(n) { var e, r, i = n(Rh, Dh), o = i.domain, a = 10; function u() { return e = function (t) { return t === Math.E ? Math.log : 10 === t && Math.log10 || 2 === t && Math.log2 || (t = Math.log(t), function (n) { return Math.log(n) / t; }); }(a), r = function (t) { return 10 === t ? Uh : t === Math.E ? Math.exp : function (n) { return Math.pow(t, n); }; }(a), o()[0] < 0 ? (e = Oh(e), r = Oh(r), n(qh, Lh)) : n(Rh, Dh), i; } return i.base = function (t) { return arguments.length ? (a = +t, u()) : a; }, i.domain = function (t) { return arguments.length ? (o(t), u()) : o(); }, i.ticks = function (t) { var n, i = o(), u = i[0], c = i[i.length - 1]; (n = c < u) && (h = u, u = c, c = h); var f, s, l, h = e(u), d = e(c), p = null == t ? 10 : +t, v = []; if (!(a % 1) && d - h < p) {
        if (h = Math.round(h) - 1, d = Math.round(d) + 1, u > 0) {
            for (; h < d; ++h)
                for (s = 1, f = r(h); s < a; ++s)
                    if (!((l = f * s) < u)) {
                        if (l > c)
                            break;
                        v.push(l);
                    }
        }
        else
            for (; h < d; ++h)
                for (s = a - 1, f = r(h); s >= 1; --s)
                    if (!((l = f * s) < u)) {
                        if (l > c)
                            break;
                        v.push(l);
                    }
    }
    else
        v = m(h, d, Math.min(d - h, p)).map(r); return n ? v.reverse() : v; }, i.tickFormat = function (n, o) { if (null == o && (o = 10 === a ? ".0e" : ","), "function" != typeof o && (o = t.format(o)), n === 1 / 0)
        return o; null == n && (n = 10); var u = Math.max(1, a * n / i.ticks().length); return function (t) { var n = t / r(Math.round(e(t))); return n * a < a - .5 && (n *= a), n <= u ? o(t) : ""; }; }, i.nice = function () { return o(zh(o(), { floor: function (t) { return r(Math.floor(e(t))); }, ceil: function (t) { return r(Math.ceil(e(t))); } })); }, i; }
    function Yh(t) { return function (n) { return Math.sign(n) * Math.log1p(Math.abs(n / t)); }; }
    function Fh(t) { return function (n) { return Math.sign(n) * Math.expm1(Math.abs(n)) * t; }; }
    function Ih(t) { var n = 1, e = t(Yh(n), Fh(n)); return e.constant = function (e) { return arguments.length ? t(Yh(n = +e), Fh(n)) : n; }, Ph(e); }
    function jh(t) { return function (n) { return n < 0 ? -Math.pow(-n, t) : Math.pow(n, t); }; }
    function Hh(t) { return t < 0 ? -Math.sqrt(-t) : Math.sqrt(t); }
    function Xh(t) { return t < 0 ? -t * t : t * t; }
    function Gh(t) { var n = t(wh, wh), e = 1; return n.exponent = function (n) { return arguments.length ? 1 === (e = +n) ? t(wh, wh) : .5 === e ? t(Hh, Xh) : t(jh(e), jh(1 / e)) : e; }, Ph(n); }
    function Vh() { var t = Gh(kh()); return t.copy = function () { return Sh(t, Vh()).exponent(t.exponent()); }, hh.apply(t, arguments), t; }
    var $h = new Date, Wh = new Date;
    function Zh(t, n, e, r) { function i(n) { return t(n = new Date(+n)), n; } return i.floor = i, i.ceil = function (e) { return t(e = new Date(e - 1)), n(e, 1), t(e), e; }, i.round = function (t) { var n = i(t), e = i.ceil(t); return t - n < e - t ? n : e; }, i.offset = function (t, e) { return n(t = new Date(+t), null == e ? 1 : Math.floor(e)), t; }, i.range = function (e, r, o) { var a, u = []; if (e = i.ceil(e), o = null == o ? 1 : Math.floor(o), !(e < r && o > 0))
        return u; do {
        u.push(a = new Date(+e)), n(e, o), t(e);
    } while (a < e && e < r); return u; }, i.filter = function (e) { return Zh(function (n) { if (n >= n)
        for (; t(n), !e(n);)
            n.setTime(n - 1); }, function (t, r) { if (t >= t)
        if (r < 0)
            for (; ++r <= 0;)
                for (; n(t, -1), !e(t);)
                    ;
        else
            for (; --r >= 0;)
                for (; n(t, 1), !e(t);)
                    ; }); }, e && (i.count = function (n, r) { return $h.setTime(+n), Wh.setTime(+r), t($h), t(Wh), Math.floor(e($h, Wh)); }, i.every = function (t) { return t = Math.floor(t), isFinite(t) && t > 0 ? t > 1 ? i.filter(r ? function (n) { return r(n) % t == 0; } : function (n) { return i.count(0, n) % t == 0; }) : i : null; }), i; }
    var Qh = Zh(function () { }, function (t, n) { t.setTime(+t + n); }, function (t, n) { return n - t; });
    Qh.every = function (t) { return t = Math.floor(t), isFinite(t) && t > 0 ? t > 1 ? Zh(function (n) { n.setTime(Math.floor(n / t) * t); }, function (n, e) { n.setTime(+n + e * t); }, function (n, e) { return (e - n) / t; }) : Qh : null; };
    var Jh = Qh.range, Kh = 6e4, td = 6048e5, nd = Zh(function (t) { t.setTime(t - t.getMilliseconds()); }, function (t, n) { t.setTime(+t + 1e3 * n); }, function (t, n) { return (n - t) / 1e3; }, function (t) { return t.getUTCSeconds(); }), ed = nd.range, rd = Zh(function (t) { t.setTime(t - t.getMilliseconds() - 1e3 * t.getSeconds()); }, function (t, n) { t.setTime(+t + n * Kh); }, function (t, n) { return (n - t) / Kh; }, function (t) { return t.getMinutes(); }), id = rd.range, od = Zh(function (t) { t.setTime(t - t.getMilliseconds() - 1e3 * t.getSeconds() - t.getMinutes() * Kh); }, function (t, n) { t.setTime(+t + 36e5 * n); }, function (t, n) { return (n - t) / 36e5; }, function (t) { return t.getHours(); }), ad = od.range, ud = Zh(function (t) { t.setHours(0, 0, 0, 0); }, function (t, n) { t.setDate(t.getDate() + n); }, function (t, n) { return (n - t - (n.getTimezoneOffset() - t.getTimezoneOffset()) * Kh) / 864e5; }, function (t) { return t.getDate() - 1; }), cd = ud.range;
    function fd(t) { return Zh(function (n) { n.setDate(n.getDate() - (n.getDay() + 7 - t) % 7), n.setHours(0, 0, 0, 0); }, function (t, n) { t.setDate(t.getDate() + 7 * n); }, function (t, n) { return (n - t - (n.getTimezoneOffset() - t.getTimezoneOffset()) * Kh) / td; }); }
    var sd = fd(0), ld = fd(1), hd = fd(2), dd = fd(3), pd = fd(4), vd = fd(5), gd = fd(6), yd = sd.range, _d = ld.range, bd = hd.range, md = dd.range, xd = pd.range, wd = vd.range, Md = gd.range, Nd = Zh(function (t) { t.setDate(1), t.setHours(0, 0, 0, 0); }, function (t, n) { t.setMonth(t.getMonth() + n); }, function (t, n) { return n.getMonth() - t.getMonth() + 12 * (n.getFullYear() - t.getFullYear()); }, function (t) { return t.getMonth(); }), Ad = Nd.range, Td = Zh(function (t) { t.setMonth(0, 1), t.setHours(0, 0, 0, 0); }, function (t, n) { t.setFullYear(t.getFullYear() + n); }, function (t, n) { return n.getFullYear() - t.getFullYear(); }, function (t) { return t.getFullYear(); });
    Td.every = function (t) { return isFinite(t = Math.floor(t)) && t > 0 ? Zh(function (n) { n.setFullYear(Math.floor(n.getFullYear() / t) * t), n.setMonth(0, 1), n.setHours(0, 0, 0, 0); }, function (n, e) { n.setFullYear(n.getFullYear() + e * t); }) : null; };
    var Sd = Td.range, kd = Zh(function (t) { t.setUTCSeconds(0, 0); }, function (t, n) { t.setTime(+t + n * Kh); }, function (t, n) { return (n - t) / Kh; }, function (t) { return t.getUTCMinutes(); }), Ed = kd.range, Cd = Zh(function (t) { t.setUTCMinutes(0, 0, 0); }, function (t, n) { t.setTime(+t + 36e5 * n); }, function (t, n) { return (n - t) / 36e5; }, function (t) { return t.getUTCHours(); }), Pd = Cd.range, zd = Zh(function (t) { t.setUTCHours(0, 0, 0, 0); }, function (t, n) { t.setUTCDate(t.getUTCDate() + n); }, function (t, n) { return (n - t) / 864e5; }, function (t) { return t.getUTCDate() - 1; }), Rd = zd.range;
    function Dd(t) { return Zh(function (n) { n.setUTCDate(n.getUTCDate() - (n.getUTCDay() + 7 - t) % 7), n.setUTCHours(0, 0, 0, 0); }, function (t, n) { t.setUTCDate(t.getUTCDate() + 7 * n); }, function (t, n) { return (n - t) / td; }); }
    var qd = Dd(0), Ld = Dd(1), Ud = Dd(2), Od = Dd(3), Bd = Dd(4), Yd = Dd(5), Fd = Dd(6), Id = qd.range, jd = Ld.range, Hd = Ud.range, Xd = Od.range, Gd = Bd.range, Vd = Yd.range, $d = Fd.range, Wd = Zh(function (t) { t.setUTCDate(1), t.setUTCHours(0, 0, 0, 0); }, function (t, n) { t.setUTCMonth(t.getUTCMonth() + n); }, function (t, n) { return n.getUTCMonth() - t.getUTCMonth() + 12 * (n.getUTCFullYear() - t.getUTCFullYear()); }, function (t) { return t.getUTCMonth(); }), Zd = Wd.range, Qd = Zh(function (t) { t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0); }, function (t, n) { t.setUTCFullYear(t.getUTCFullYear() + n); }, function (t, n) { return n.getUTCFullYear() - t.getUTCFullYear(); }, function (t) { return t.getUTCFullYear(); });
    Qd.every = function (t) { return isFinite(t = Math.floor(t)) && t > 0 ? Zh(function (n) { n.setUTCFullYear(Math.floor(n.getUTCFullYear() / t) * t), n.setUTCMonth(0, 1), n.setUTCHours(0, 0, 0, 0); }, function (n, e) { n.setUTCFullYear(n.getUTCFullYear() + e * t); }) : null; };
    var Jd = Qd.range;
    function Kd(t) { if (0 <= t.y && t.y < 100) {
        var n = new Date(-1, t.m, t.d, t.H, t.M, t.S, t.L);
        return n.setFullYear(t.y), n;
    } return new Date(t.y, t.m, t.d, t.H, t.M, t.S, t.L); }
    function tp(t) { if (0 <= t.y && t.y < 100) {
        var n = new Date(Date.UTC(-1, t.m, t.d, t.H, t.M, t.S, t.L));
        return n.setUTCFullYear(t.y), n;
    } return new Date(Date.UTC(t.y, t.m, t.d, t.H, t.M, t.S, t.L)); }
    function np(t) { return { y: t, m: 0, d: 1, H: 0, M: 0, S: 0, L: 0 }; }
    function ep(t) { var n = t.dateTime, e = t.date, r = t.time, i = t.periods, o = t.days, a = t.shortDays, u = t.months, c = t.shortMonths, f = sp(i), s = lp(i), l = sp(o), h = lp(o), d = sp(a), p = lp(a), v = sp(u), g = lp(u), y = sp(c), _ = lp(c), b = { a: function (t) { return a[t.getDay()]; }, A: function (t) { return o[t.getDay()]; }, b: function (t) { return c[t.getMonth()]; }, B: function (t) { return u[t.getMonth()]; }, c: null, d: Pp, e: Pp, f: Lp, H: zp, I: Rp, j: Dp, L: qp, m: Up, M: Op, p: function (t) { return i[+(t.getHours() >= 12)]; }, Q: hv, s: dv, S: Bp, u: Yp, U: Fp, V: Ip, w: jp, W: Hp, x: null, X: null, y: Xp, Y: Gp, Z: Vp, "%": lv }, m = { a: function (t) { return a[t.getUTCDay()]; }, A: function (t) { return o[t.getUTCDay()]; }, b: function (t) { return c[t.getUTCMonth()]; }, B: function (t) { return u[t.getUTCMonth()]; }, c: null, d: $p, e: $p, f: Kp, H: Wp, I: Zp, j: Qp, L: Jp, m: tv, M: nv, p: function (t) { return i[+(t.getUTCHours() >= 12)]; }, Q: hv, s: dv, S: ev, u: rv, U: iv, V: ov, w: av, W: uv, x: null, X: null, y: cv, Y: fv, Z: sv, "%": lv }, x = { a: function (t, n, e) { var r = d.exec(n.slice(e)); return r ? (t.w = p[r[0].toLowerCase()], e + r[0].length) : -1; }, A: function (t, n, e) { var r = l.exec(n.slice(e)); return r ? (t.w = h[r[0].toLowerCase()], e + r[0].length) : -1; }, b: function (t, n, e) { var r = y.exec(n.slice(e)); return r ? (t.m = _[r[0].toLowerCase()], e + r[0].length) : -1; }, B: function (t, n, e) { var r = v.exec(n.slice(e)); return r ? (t.m = g[r[0].toLowerCase()], e + r[0].length) : -1; }, c: function (t, e, r) { return N(t, n, e, r); }, d: xp, e: xp, f: Sp, H: Mp, I: Mp, j: wp, L: Tp, m: mp, M: Np, p: function (t, n, e) { var r = f.exec(n.slice(e)); return r ? (t.p = s[r[0].toLowerCase()], e + r[0].length) : -1; }, Q: Ep, s: Cp, S: Ap, u: dp, U: pp, V: vp, w: hp, W: gp, x: function (t, n, r) { return N(t, e, n, r); }, X: function (t, n, e) { return N(t, r, n, e); }, y: _p, Y: yp, Z: bp, "%": kp }; function w(t, n) { return function (e) { var r, i, o, a = [], u = -1, c = 0, f = t.length; for (e instanceof Date || (e = new Date(+e)); ++u < f;)
        37 === t.charCodeAt(u) && (a.push(t.slice(c, u)), null != (i = ip[r = t.charAt(++u)]) ? r = t.charAt(++u) : i = "e" === r ? " " : "0", (o = n[r]) && (r = o(e, i)), a.push(r), c = u + 1); return a.push(t.slice(c, u)), a.join(""); }; } function M(t, n) { return function (e) { var r, i, o = np(1900); if (N(o, t, e += "", 0) != e.length)
        return null; if ("Q" in o)
        return new Date(o.Q); if ("p" in o && (o.H = o.H % 12 + 12 * o.p), "V" in o) {
        if (o.V < 1 || o.V > 53)
            return null;
        "w" in o || (o.w = 1), "Z" in o ? (i = (r = tp(np(o.y))).getUTCDay(), r = i > 4 || 0 === i ? Ld.ceil(r) : Ld(r), r = zd.offset(r, 7 * (o.V - 1)), o.y = r.getUTCFullYear(), o.m = r.getUTCMonth(), o.d = r.getUTCDate() + (o.w + 6) % 7) : (i = (r = n(np(o.y))).getDay(), r = i > 4 || 0 === i ? ld.ceil(r) : ld(r), r = ud.offset(r, 7 * (o.V - 1)), o.y = r.getFullYear(), o.m = r.getMonth(), o.d = r.getDate() + (o.w + 6) % 7);
    }
    else
        ("W" in o || "U" in o) && ("w" in o || (o.w = "u" in o ? o.u % 7 : "W" in o ? 1 : 0), i = "Z" in o ? tp(np(o.y)).getUTCDay() : n(np(o.y)).getDay(), o.m = 0, o.d = "W" in o ? (o.w + 6) % 7 + 7 * o.W - (i + 5) % 7 : o.w + 7 * o.U - (i + 6) % 7); return "Z" in o ? (o.H += o.Z / 100 | 0, o.M += o.Z % 100, tp(o)) : n(o); }; } function N(t, n, e, r) { for (var i, o, a = 0, u = n.length, c = e.length; a < u;) {
        if (r >= c)
            return -1;
        if (37 === (i = n.charCodeAt(a++))) {
            if (i = n.charAt(a++), !(o = x[i in ip ? n.charAt(a++) : i]) || (r = o(t, e, r)) < 0)
                return -1;
        }
        else if (i != e.charCodeAt(r++))
            return -1;
    } return r; } return b.x = w(e, b), b.X = w(r, b), b.c = w(n, b), m.x = w(e, m), m.X = w(r, m), m.c = w(n, m), { format: function (t) { var n = w(t += "", b); return n.toString = function () { return t; }, n; }, parse: function (t) { var n = M(t += "", Kd); return n.toString = function () { return t; }, n; }, utcFormat: function (t) { var n = w(t += "", m); return n.toString = function () { return t; }, n; }, utcParse: function (t) { var n = M(t, tp); return n.toString = function () { return t; }, n; } }; }
    var rp, ip = { "-": "", _: " ", 0: "0" }, op = /^\s*\d+/, ap = /^%/, up = /[\\^$*+?|[\]().{}]/g;
    function cp(t, n, e) { var r = t < 0 ? "-" : "", i = (r ? -t : t) + "", o = i.length; return r + (o < e ? new Array(e - o + 1).join(n) + i : i); }
    function fp(t) { return t.replace(up, "\\$&"); }
    function sp(t) { return new RegExp("^(?:" + t.map(fp).join("|") + ")", "i"); }
    function lp(t) { for (var n = {}, e = -1, r = t.length; ++e < r;)
        n[t[e].toLowerCase()] = e; return n; }
    function hp(t, n, e) { var r = op.exec(n.slice(e, e + 1)); return r ? (t.w = +r[0], e + r[0].length) : -1; }
    function dp(t, n, e) { var r = op.exec(n.slice(e, e + 1)); return r ? (t.u = +r[0], e + r[0].length) : -1; }
    function pp(t, n, e) { var r = op.exec(n.slice(e, e + 2)); return r ? (t.U = +r[0], e + r[0].length) : -1; }
    function vp(t, n, e) { var r = op.exec(n.slice(e, e + 2)); return r ? (t.V = +r[0], e + r[0].length) : -1; }
    function gp(t, n, e) { var r = op.exec(n.slice(e, e + 2)); return r ? (t.W = +r[0], e + r[0].length) : -1; }
    function yp(t, n, e) { var r = op.exec(n.slice(e, e + 4)); return r ? (t.y = +r[0], e + r[0].length) : -1; }
    function _p(t, n, e) { var r = op.exec(n.slice(e, e + 2)); return r ? (t.y = +r[0] + (+r[0] > 68 ? 1900 : 2e3), e + r[0].length) : -1; }
    function bp(t, n, e) { var r = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(n.slice(e, e + 6)); return r ? (t.Z = r[1] ? 0 : -(r[2] + (r[3] || "00")), e + r[0].length) : -1; }
    function mp(t, n, e) { var r = op.exec(n.slice(e, e + 2)); return r ? (t.m = r[0] - 1, e + r[0].length) : -1; }
    function xp(t, n, e) { var r = op.exec(n.slice(e, e + 2)); return r ? (t.d = +r[0], e + r[0].length) : -1; }
    function wp(t, n, e) { var r = op.exec(n.slice(e, e + 3)); return r ? (t.m = 0, t.d = +r[0], e + r[0].length) : -1; }
    function Mp(t, n, e) { var r = op.exec(n.slice(e, e + 2)); return r ? (t.H = +r[0], e + r[0].length) : -1; }
    function Np(t, n, e) { var r = op.exec(n.slice(e, e + 2)); return r ? (t.M = +r[0], e + r[0].length) : -1; }
    function Ap(t, n, e) { var r = op.exec(n.slice(e, e + 2)); return r ? (t.S = +r[0], e + r[0].length) : -1; }
    function Tp(t, n, e) { var r = op.exec(n.slice(e, e + 3)); return r ? (t.L = +r[0], e + r[0].length) : -1; }
    function Sp(t, n, e) { var r = op.exec(n.slice(e, e + 6)); return r ? (t.L = Math.floor(r[0] / 1e3), e + r[0].length) : -1; }
    function kp(t, n, e) { var r = ap.exec(n.slice(e, e + 1)); return r ? e + r[0].length : -1; }
    function Ep(t, n, e) { var r = op.exec(n.slice(e)); return r ? (t.Q = +r[0], e + r[0].length) : -1; }
    function Cp(t, n, e) { var r = op.exec(n.slice(e)); return r ? (t.Q = 1e3 * +r[0], e + r[0].length) : -1; }
    function Pp(t, n) { return cp(t.getDate(), n, 2); }
    function zp(t, n) { return cp(t.getHours(), n, 2); }
    function Rp(t, n) { return cp(t.getHours() % 12 || 12, n, 2); }
    function Dp(t, n) { return cp(1 + ud.count(Td(t), t), n, 3); }
    function qp(t, n) { return cp(t.getMilliseconds(), n, 3); }
    function Lp(t, n) { return qp(t, n) + "000"; }
    function Up(t, n) { return cp(t.getMonth() + 1, n, 2); }
    function Op(t, n) { return cp(t.getMinutes(), n, 2); }
    function Bp(t, n) { return cp(t.getSeconds(), n, 2); }
    function Yp(t) { var n = t.getDay(); return 0 === n ? 7 : n; }
    function Fp(t, n) { return cp(sd.count(Td(t), t), n, 2); }
    function Ip(t, n) { var e = t.getDay(); return t = e >= 4 || 0 === e ? pd(t) : pd.ceil(t), cp(pd.count(Td(t), t) + (4 === Td(t).getDay()), n, 2); }
    function jp(t) { return t.getDay(); }
    function Hp(t, n) { return cp(ld.count(Td(t), t), n, 2); }
    function Xp(t, n) { return cp(t.getFullYear() % 100, n, 2); }
    function Gp(t, n) { return cp(t.getFullYear() % 1e4, n, 4); }
    function Vp(t) { var n = t.getTimezoneOffset(); return (n > 0 ? "-" : (n *= -1, "+")) + cp(n / 60 | 0, "0", 2) + cp(n % 60, "0", 2); }
    function $p(t, n) { return cp(t.getUTCDate(), n, 2); }
    function Wp(t, n) { return cp(t.getUTCHours(), n, 2); }
    function Zp(t, n) { return cp(t.getUTCHours() % 12 || 12, n, 2); }
    function Qp(t, n) { return cp(1 + zd.count(Qd(t), t), n, 3); }
    function Jp(t, n) { return cp(t.getUTCMilliseconds(), n, 3); }
    function Kp(t, n) { return Jp(t, n) + "000"; }
    function tv(t, n) { return cp(t.getUTCMonth() + 1, n, 2); }
    function nv(t, n) { return cp(t.getUTCMinutes(), n, 2); }
    function ev(t, n) { return cp(t.getUTCSeconds(), n, 2); }
    function rv(t) { var n = t.getUTCDay(); return 0 === n ? 7 : n; }
    function iv(t, n) { return cp(qd.count(Qd(t), t), n, 2); }
    function ov(t, n) { var e = t.getUTCDay(); return t = e >= 4 || 0 === e ? Bd(t) : Bd.ceil(t), cp(Bd.count(Qd(t), t) + (4 === Qd(t).getUTCDay()), n, 2); }
    function av(t) { return t.getUTCDay(); }
    function uv(t, n) { return cp(Ld.count(Qd(t), t), n, 2); }
    function cv(t, n) { return cp(t.getUTCFullYear() % 100, n, 2); }
    function fv(t, n) { return cp(t.getUTCFullYear() % 1e4, n, 4); }
    function sv() { return "+0000"; }
    function lv() { return "%"; }
    function hv(t) { return +t; }
    function dv(t) { return Math.floor(+t / 1e3); }
    function pv(n) { return rp = ep(n), t.timeFormat = rp.format, t.timeParse = rp.parse, t.utcFormat = rp.utcFormat, t.utcParse = rp.utcParse, rp; }
    pv({ dateTime: "%x, %X", date: "%-m/%-d/%Y", time: "%-I:%M:%S %p", periods: ["AM", "PM"], days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] });
    var vv = Date.prototype.toISOString ? function (t) { return t.toISOString(); } : t.utcFormat("%Y-%m-%dT%H:%M:%S.%LZ");
    var gv = +new Date("2000-01-01T00:00:00.000Z") ? function (t) { var n = new Date(t); return isNaN(n) ? null : n; } : t.utcParse("%Y-%m-%dT%H:%M:%S.%LZ"), yv = 1e3, _v = 60 * yv, bv = 60 * _v, mv = 24 * bv, xv = 7 * mv, wv = 30 * mv, Mv = 365 * mv;
    function Nv(t) { return new Date(t); }
    function Av(t) { return t instanceof Date ? +t : +new Date(+t); }
    function Tv(t, n, r, i, o, a, u, c, f) { var s = Eh(wh, wh), l = s.invert, h = s.domain, d = f(".%L"), p = f(":%S"), v = f("%I:%M"), g = f("%I %p"), y = f("%a %d"), _ = f("%b %d"), b = f("%B"), m = f("%Y"), x = [[u, 1, yv], [u, 5, 5 * yv], [u, 15, 15 * yv], [u, 30, 30 * yv], [a, 1, _v], [a, 5, 5 * _v], [a, 15, 15 * _v], [a, 30, 30 * _v], [o, 1, bv], [o, 3, 3 * bv], [o, 6, 6 * bv], [o, 12, 12 * bv], [i, 1, mv], [i, 2, 2 * mv], [r, 1, xv], [n, 1, wv], [n, 3, 3 * wv], [t, 1, Mv]]; function M(e) { return (u(e) < e ? d : a(e) < e ? p : o(e) < e ? v : i(e) < e ? g : n(e) < e ? r(e) < e ? y : _ : t(e) < e ? b : m)(e); } function N(n, r, i, o) { if (null == n && (n = 10), "number" == typeof n) {
        var a = Math.abs(i - r) / n, u = e(function (t) { return t[2]; }).right(x, a);
        u === x.length ? (o = w(r / Mv, i / Mv, n), n = t) : u ? (o = (u = x[a / x[u - 1][2] < x[u][2] / a ? u - 1 : u])[1], n = u[0]) : (o = Math.max(w(r, i, n), 1), n = c);
    } return null == o ? n : n.every(o); } return s.invert = function (t) { return new Date(l(t)); }, s.domain = function (t) { return arguments.length ? h(vh.call(t, Av)) : h().map(Nv); }, s.ticks = function (t, n) { var e, r = h(), i = r[0], o = r[r.length - 1], a = o < i; return a && (e = i, i = o, o = e), e = (e = N(t, i, o, n)) ? e.range(i, o + 1) : [], a ? e.reverse() : e; }, s.tickFormat = function (t, n) { return null == n ? M : f(n); }, s.nice = function (t, n) { var e = h(); return (t = N(t, e[0], e[e.length - 1], n)) ? h(zh(e, t)) : s; }, s.copy = function () { return Sh(s, Tv(t, n, r, i, o, a, u, c, f)); }, s; }
    function Sv() { var t, n, e, r, i, o = 0, a = 1, u = wh, c = !1; function f(n) { return isNaN(n = +n) ? i : u(0 === e ? .5 : (n = (r(n) - t) * e, c ? Math.max(0, Math.min(1, n)) : n)); } return f.domain = function (i) { return arguments.length ? (t = r(o = +i[0]), n = r(a = +i[1]), e = t === n ? 0 : 1 / (n - t), f) : [o, a]; }, f.clamp = function (t) { return arguments.length ? (c = !!t, f) : c; }, f.interpolator = function (t) { return arguments.length ? (u = t, f) : u; }, f.unknown = function (t) { return arguments.length ? (i = t, f) : i; }, function (i) { return r = i, t = i(o), n = i(a), e = t === n ? 0 : 1 / (n - t), f; }; }
    function kv(t, n) { return n.domain(t.domain()).interpolator(t.interpolator()).clamp(t.clamp()).unknown(t.unknown()); }
    function Ev() { var t = Gh(Sv()); return t.copy = function () { return kv(t, Ev()).exponent(t.exponent()); }, dh.apply(t, arguments); }
    function Cv() { var t, n, e, r, i, o, a, u = 0, c = .5, f = 1, s = wh, l = !1; function h(t) { return isNaN(t = +t) ? a : (t = .5 + ((t = +o(t)) - n) * (t < n ? r : i), s(l ? Math.max(0, Math.min(1, t)) : t)); } return h.domain = function (a) { return arguments.length ? (t = o(u = +a[0]), n = o(c = +a[1]), e = o(f = +a[2]), r = t === n ? 0 : .5 / (n - t), i = n === e ? 0 : .5 / (e - n), h) : [u, c, f]; }, h.clamp = function (t) { return arguments.length ? (l = !!t, h) : l; }, h.interpolator = function (t) { return arguments.length ? (s = t, h) : s; }, h.unknown = function (t) { return arguments.length ? (a = t, h) : a; }, function (a) { return o = a, t = a(u), n = a(c), e = a(f), r = t === n ? 0 : .5 / (n - t), i = n === e ? 0 : .5 / (e - n), h; }; }
    function Pv() { var t = Gh(Cv()); return t.copy = function () { return kv(t, Pv()).exponent(t.exponent()); }, dh.apply(t, arguments); }
    function zv(t) { for (var n = t.length / 6 | 0, e = new Array(n), r = 0; r < n;)
        e[r] = "#" + t.slice(6 * r, 6 * ++r); return e; }
    var Rv = zv("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf"), Dv = zv("7fc97fbeaed4fdc086ffff99386cb0f0027fbf5b17666666"), qv = zv("1b9e77d95f027570b3e7298a66a61ee6ab02a6761d666666"), Lv = zv("a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d66a3d9affff99b15928"), Uv = zv("fbb4aeb3cde3ccebc5decbe4fed9a6ffffcce5d8bdfddaecf2f2f2"), Ov = zv("b3e2cdfdcdaccbd5e8f4cae4e6f5c9fff2aef1e2cccccccc"), Bv = zv("e41a1c377eb84daf4a984ea3ff7f00ffff33a65628f781bf999999"), Yv = zv("66c2a5fc8d628da0cbe78ac3a6d854ffd92fe5c494b3b3b3"), Fv = zv("8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69fccde5d9d9d9bc80bdccebc5ffed6f");
    function Iv(t) { return fe(t[t.length - 1]); }
    var jv = new Array(3).concat("d8b365f5f5f55ab4ac", "a6611adfc27d80cdc1018571", "a6611adfc27df5f5f580cdc1018571", "8c510ad8b365f6e8c3c7eae55ab4ac01665e", "8c510ad8b365f6e8c3f5f5f5c7eae55ab4ac01665e", "8c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e", "8c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e", "5430058c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e003c30", "5430058c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e003c30").map(zv), Hv = Iv(jv), Xv = new Array(3).concat("af8dc3f7f7f77fbf7b", "7b3294c2a5cfa6dba0008837", "7b3294c2a5cff7f7f7a6dba0008837", "762a83af8dc3e7d4e8d9f0d37fbf7b1b7837", "762a83af8dc3e7d4e8f7f7f7d9f0d37fbf7b1b7837", "762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b7837", "762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b7837", "40004b762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b783700441b", "40004b762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b783700441b").map(zv), Gv = Iv(Xv), Vv = new Array(3).concat("e9a3c9f7f7f7a1d76a", "d01c8bf1b6dab8e1864dac26", "d01c8bf1b6daf7f7f7b8e1864dac26", "c51b7de9a3c9fde0efe6f5d0a1d76a4d9221", "c51b7de9a3c9fde0eff7f7f7e6f5d0a1d76a4d9221", "c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221", "c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221", "8e0152c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221276419", "8e0152c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221276419").map(zv), $v = Iv(Vv), Wv = new Array(3).concat("998ec3f7f7f7f1a340", "5e3c99b2abd2fdb863e66101", "5e3c99b2abd2f7f7f7fdb863e66101", "542788998ec3d8daebfee0b6f1a340b35806", "542788998ec3d8daebf7f7f7fee0b6f1a340b35806", "5427888073acb2abd2d8daebfee0b6fdb863e08214b35806", "5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b35806", "2d004b5427888073acb2abd2d8daebfee0b6fdb863e08214b358067f3b08", "2d004b5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b358067f3b08").map(zv), Zv = Iv(Wv), Qv = new Array(3).concat("ef8a62f7f7f767a9cf", "ca0020f4a58292c5de0571b0", "ca0020f4a582f7f7f792c5de0571b0", "b2182bef8a62fddbc7d1e5f067a9cf2166ac", "b2182bef8a62fddbc7f7f7f7d1e5f067a9cf2166ac", "b2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac", "b2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac", "67001fb2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac053061", "67001fb2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac053061").map(zv), Jv = Iv(Qv), Kv = new Array(3).concat("ef8a62ffffff999999", "ca0020f4a582bababa404040", "ca0020f4a582ffffffbababa404040", "b2182bef8a62fddbc7e0e0e09999994d4d4d", "b2182bef8a62fddbc7ffffffe0e0e09999994d4d4d", "b2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d", "b2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d", "67001fb2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d1a1a1a", "67001fb2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d1a1a1a").map(zv), tg = Iv(Kv), ng = new Array(3).concat("fc8d59ffffbf91bfdb", "d7191cfdae61abd9e92c7bb6", "d7191cfdae61ffffbfabd9e92c7bb6", "d73027fc8d59fee090e0f3f891bfdb4575b4", "d73027fc8d59fee090ffffbfe0f3f891bfdb4575b4", "d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4", "d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4", "a50026d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4313695", "a50026d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4313695").map(zv), eg = Iv(ng), rg = new Array(3).concat("fc8d59ffffbf91cf60", "d7191cfdae61a6d96a1a9641", "d7191cfdae61ffffbfa6d96a1a9641", "d73027fc8d59fee08bd9ef8b91cf601a9850", "d73027fc8d59fee08bffffbfd9ef8b91cf601a9850", "d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850", "d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850", "a50026d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850006837", "a50026d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850006837").map(zv), ig = Iv(rg), og = new Array(3).concat("fc8d59ffffbf99d594", "d7191cfdae61abdda42b83ba", "d7191cfdae61ffffbfabdda42b83ba", "d53e4ffc8d59fee08be6f59899d5943288bd", "d53e4ffc8d59fee08bffffbfe6f59899d5943288bd", "d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd", "d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd", "9e0142d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd5e4fa2", "9e0142d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd5e4fa2").map(zv), ag = Iv(og), ug = new Array(3).concat("e5f5f999d8c92ca25f", "edf8fbb2e2e266c2a4238b45", "edf8fbb2e2e266c2a42ca25f006d2c", "edf8fbccece699d8c966c2a42ca25f006d2c", "edf8fbccece699d8c966c2a441ae76238b45005824", "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45005824", "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45006d2c00441b").map(zv), cg = Iv(ug), fg = new Array(3).concat("e0ecf49ebcda8856a7", "edf8fbb3cde38c96c688419d", "edf8fbb3cde38c96c68856a7810f7c", "edf8fbbfd3e69ebcda8c96c68856a7810f7c", "edf8fbbfd3e69ebcda8c96c68c6bb188419d6e016b", "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d6e016b", "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d810f7c4d004b").map(zv), sg = Iv(fg), lg = new Array(3).concat("e0f3dba8ddb543a2ca", "f0f9e8bae4bc7bccc42b8cbe", "f0f9e8bae4bc7bccc443a2ca0868ac", "f0f9e8ccebc5a8ddb57bccc443a2ca0868ac", "f0f9e8ccebc5a8ddb57bccc44eb3d32b8cbe08589e", "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe08589e", "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe0868ac084081").map(zv), hg = Iv(lg), dg = new Array(3).concat("fee8c8fdbb84e34a33", "fef0d9fdcc8afc8d59d7301f", "fef0d9fdcc8afc8d59e34a33b30000", "fef0d9fdd49efdbb84fc8d59e34a33b30000", "fef0d9fdd49efdbb84fc8d59ef6548d7301f990000", "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301f990000", "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301fb300007f0000").map(zv), pg = Iv(dg), vg = new Array(3).concat("ece2f0a6bddb1c9099", "f6eff7bdc9e167a9cf02818a", "f6eff7bdc9e167a9cf1c9099016c59", "f6eff7d0d1e6a6bddb67a9cf1c9099016c59", "f6eff7d0d1e6a6bddb67a9cf3690c002818a016450", "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016450", "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016c59014636").map(zv), gg = Iv(vg), yg = new Array(3).concat("ece7f2a6bddb2b8cbe", "f1eef6bdc9e174a9cf0570b0", "f1eef6bdc9e174a9cf2b8cbe045a8d", "f1eef6d0d1e6a6bddb74a9cf2b8cbe045a8d", "f1eef6d0d1e6a6bddb74a9cf3690c00570b0034e7b", "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0034e7b", "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0045a8d023858").map(zv), _g = Iv(yg), bg = new Array(3).concat("e7e1efc994c7dd1c77", "f1eef6d7b5d8df65b0ce1256", "f1eef6d7b5d8df65b0dd1c77980043", "f1eef6d4b9dac994c7df65b0dd1c77980043", "f1eef6d4b9dac994c7df65b0e7298ace125691003f", "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125691003f", "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125698004367001f").map(zv), mg = Iv(bg), xg = new Array(3).concat("fde0ddfa9fb5c51b8a", "feebe2fbb4b9f768a1ae017e", "feebe2fbb4b9f768a1c51b8a7a0177", "feebe2fcc5c0fa9fb5f768a1c51b8a7a0177", "feebe2fcc5c0fa9fb5f768a1dd3497ae017e7a0177", "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a0177", "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a017749006a").map(zv), wg = Iv(xg), Mg = new Array(3).concat("edf8b17fcdbb2c7fb8", "ffffcca1dab441b6c4225ea8", "ffffcca1dab441b6c42c7fb8253494", "ffffccc7e9b47fcdbb41b6c42c7fb8253494", "ffffccc7e9b47fcdbb41b6c41d91c0225ea80c2c84", "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea80c2c84", "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea8253494081d58").map(zv), Ng = Iv(Mg), Ag = new Array(3).concat("f7fcb9addd8e31a354", "ffffccc2e69978c679238443", "ffffccc2e69978c67931a354006837", "ffffccd9f0a3addd8e78c67931a354006837", "ffffccd9f0a3addd8e78c67941ab5d238443005a32", "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443005a32", "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443006837004529").map(zv), Tg = Iv(Ag), Sg = new Array(3).concat("fff7bcfec44fd95f0e", "ffffd4fed98efe9929cc4c02", "ffffd4fed98efe9929d95f0e993404", "ffffd4fee391fec44ffe9929d95f0e993404", "ffffd4fee391fec44ffe9929ec7014cc4c028c2d04", "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c028c2d04", "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c02993404662506").map(zv), kg = Iv(Sg), Eg = new Array(3).concat("ffeda0feb24cf03b20", "ffffb2fecc5cfd8d3ce31a1c", "ffffb2fecc5cfd8d3cf03b20bd0026", "ffffb2fed976feb24cfd8d3cf03b20bd0026", "ffffb2fed976feb24cfd8d3cfc4e2ae31a1cb10026", "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cb10026", "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cbd0026800026").map(zv), Cg = Iv(Eg), Pg = new Array(3).concat("deebf79ecae13182bd", "eff3ffbdd7e76baed62171b5", "eff3ffbdd7e76baed63182bd08519c", "eff3ffc6dbef9ecae16baed63182bd08519c", "eff3ffc6dbef9ecae16baed64292c62171b5084594", "f7fbffdeebf7c6dbef9ecae16baed64292c62171b5084594", "f7fbffdeebf7c6dbef9ecae16baed64292c62171b508519c08306b").map(zv), zg = Iv(Pg), Rg = new Array(3).concat("e5f5e0a1d99b31a354", "edf8e9bae4b374c476238b45", "edf8e9bae4b374c47631a354006d2c", "edf8e9c7e9c0a1d99b74c47631a354006d2c", "edf8e9c7e9c0a1d99b74c47641ab5d238b45005a32", "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45005a32", "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45006d2c00441b").map(zv), Dg = Iv(Rg), qg = new Array(3).concat("f0f0f0bdbdbd636363", "f7f7f7cccccc969696525252", "f7f7f7cccccc969696636363252525", "f7f7f7d9d9d9bdbdbd969696636363252525", "f7f7f7d9d9d9bdbdbd969696737373525252252525", "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525", "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525000000").map(zv), Lg = Iv(qg), Ug = new Array(3).concat("efedf5bcbddc756bb1", "f2f0f7cbc9e29e9ac86a51a3", "f2f0f7cbc9e29e9ac8756bb154278f", "f2f0f7dadaebbcbddc9e9ac8756bb154278f", "f2f0f7dadaebbcbddc9e9ac8807dba6a51a34a1486", "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a34a1486", "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a354278f3f007d").map(zv), Og = Iv(Ug), Bg = new Array(3).concat("fee0d2fc9272de2d26", "fee5d9fcae91fb6a4acb181d", "fee5d9fcae91fb6a4ade2d26a50f15", "fee5d9fcbba1fc9272fb6a4ade2d26a50f15", "fee5d9fcbba1fc9272fb6a4aef3b2ccb181d99000d", "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181d99000d", "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181da50f1567000d").map(zv), Yg = Iv(Bg), Fg = new Array(3).concat("fee6cefdae6be6550d", "feeddefdbe85fd8d3cd94701", "feeddefdbe85fd8d3ce6550da63603", "feeddefdd0a2fdae6bfd8d3ce6550da63603", "feeddefdd0a2fdae6bfd8d3cf16913d948018c2d04", "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d948018c2d04", "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d94801a636037f2704").map(zv), Ig = Iv(Fg), jg = He(Qn(300, .5, 0), Qn(-240, .5, 1)), Hg = He(Qn(-100, .75, .35), Qn(80, 1.5, .8)), Xg = He(Qn(260, .75, .35), Qn(80, 1.5, .8)), Gg = Qn();
    var Vg = gn(), $g = Math.PI / 3, Wg = 2 * Math.PI / 3;
    function Zg(t) { var n = t.length; return function (e) { return t[Math.max(0, Math.min(n - 1, Math.floor(e * n)))]; }; }
    var Qg = Zg(zv("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725")), Jg = Zg(zv("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf")), Kg = Zg(zv("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4")), ty = Zg(zv("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921"));
    function ny(t) { return function () { return t; }; }
    var ey = Math.abs, ry = Math.atan2, iy = Math.cos, oy = Math.max, ay = Math.min, uy = Math.sin, cy = Math.sqrt, fy = 1e-12, sy = Math.PI, ly = sy / 2, hy = 2 * sy;
    function dy(t) { return t >= 1 ? ly : t <= -1 ? -ly : Math.asin(t); }
    function py(t) { return t.innerRadius; }
    function vy(t) { return t.outerRadius; }
    function gy(t) { return t.startAngle; }
    function yy(t) { return t.endAngle; }
    function _y(t) { return t && t.padAngle; }
    function by(t, n, e, r, i, o, a) { var u = t - e, c = n - r, f = (a ? o : -o) / cy(u * u + c * c), s = f * c, l = -f * u, h = t + s, d = n + l, p = e + s, v = r + l, g = (h + p) / 2, y = (d + v) / 2, _ = p - h, b = v - d, m = _ * _ + b * b, x = i - o, w = h * v - p * d, M = (b < 0 ? -1 : 1) * cy(oy(0, x * x * m - w * w)), N = (w * b - _ * M) / m, A = (-w * _ - b * M) / m, T = (w * b + _ * M) / m, S = (-w * _ + b * M) / m, k = N - g, E = A - y, C = T - g, P = S - y; return k * k + E * E > C * C + P * P && (N = T, A = S), { cx: N, cy: A, x01: -s, y01: -l, x11: N * (i / x - 1), y11: A * (i / x - 1) }; }
    function my(t) { this._context = t; }
    function xy(t) { return new my(t); }
    function wy(t) { return t[0]; }
    function My(t) { return t[1]; }
    function Ny() { var t = wy, n = My, e = ny(!0), r = null, i = xy, o = null; function a(a) { var u, c, f, s = a.length, l = !1; for (null == r && (o = i(f = Xi())), u = 0; u <= s; ++u)
        !(u < s && e(c = a[u], u, a)) === l && ((l = !l) ? o.lineStart() : o.lineEnd()), l && o.point(+t(c, u, a), +n(c, u, a)); if (f)
        return o = null, f + "" || null; } return a.x = function (n) { return arguments.length ? (t = "function" == typeof n ? n : ny(+n), a) : t; }, a.y = function (t) { return arguments.length ? (n = "function" == typeof t ? t : ny(+t), a) : n; }, a.defined = function (t) { return arguments.length ? (e = "function" == typeof t ? t : ny(!!t), a) : e; }, a.curve = function (t) { return arguments.length ? (i = t, null != r && (o = i(r)), a) : i; }, a.context = function (t) { return arguments.length ? (null == t ? r = o = null : o = i(r = t), a) : r; }, a; }
    function Ay() { var t = wy, n = null, e = ny(0), r = My, i = ny(!0), o = null, a = xy, u = null; function c(c) { var f, s, l, h, d, p = c.length, v = !1, g = new Array(p), y = new Array(p); for (null == o && (u = a(d = Xi())), f = 0; f <= p; ++f) {
        if (!(f < p && i(h = c[f], f, c)) === v)
            if (v = !v)
                s = f, u.areaStart(), u.lineStart();
            else {
                for (u.lineEnd(), u.lineStart(), l = f - 1; l >= s; --l)
                    u.point(g[l], y[l]);
                u.lineEnd(), u.areaEnd();
            }
        v && (g[f] = +t(h, f, c), y[f] = +e(h, f, c), u.point(n ? +n(h, f, c) : g[f], r ? +r(h, f, c) : y[f]));
    } if (d)
        return u = null, d + "" || null; } function f() { return Ny().defined(i).curve(a).context(o); } return c.x = function (e) { return arguments.length ? (t = "function" == typeof e ? e : ny(+e), n = null, c) : t; }, c.x0 = function (n) { return arguments.length ? (t = "function" == typeof n ? n : ny(+n), c) : t; }, c.x1 = function (t) { return arguments.length ? (n = null == t ? null : "function" == typeof t ? t : ny(+t), c) : n; }, c.y = function (t) { return arguments.length ? (e = "function" == typeof t ? t : ny(+t), r = null, c) : e; }, c.y0 = function (t) { return arguments.length ? (e = "function" == typeof t ? t : ny(+t), c) : e; }, c.y1 = function (t) { return arguments.length ? (r = null == t ? null : "function" == typeof t ? t : ny(+t), c) : r; }, c.lineX0 = c.lineY0 = function () { return f().x(t).y(e); }, c.lineY1 = function () { return f().x(t).y(r); }, c.lineX1 = function () { return f().x(n).y(e); }, c.defined = function (t) { return arguments.length ? (i = "function" == typeof t ? t : ny(!!t), c) : i; }, c.curve = function (t) { return arguments.length ? (a = t, null != o && (u = a(o)), c) : a; }, c.context = function (t) { return arguments.length ? (null == t ? o = u = null : u = a(o = t), c) : o; }, c; }
    function Ty(t, n) { return n < t ? -1 : n > t ? 1 : n >= t ? 0 : NaN; }
    function Sy(t) { return t; }
    my.prototype = { areaStart: function () { this._line = 0; }, areaEnd: function () { this._line = NaN; }, lineStart: function () { this._point = 0; }, lineEnd: function () { (this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(), this._line = 1 - this._line; }, point: function (t, n) { switch (t = +t, n = +n, this._point) {
            case 0:
                this._point = 1, this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
                break;
            case 1: this._point = 2;
            default: this._context.lineTo(t, n);
        } } };
    var ky = Cy(xy);
    function Ey(t) { this._curve = t; }
    function Cy(t) { function n(n) { return new Ey(t(n)); } return n._curve = t, n; }
    function Py(t) { var n = t.curve; return t.angle = t.x, delete t.x, t.radius = t.y, delete t.y, t.curve = function (t) { return arguments.length ? n(Cy(t)) : n()._curve; }, t; }
    function zy() { return Py(Ny().curve(ky)); }
    function Ry() { var t = Ay().curve(ky), n = t.curve, e = t.lineX0, r = t.lineX1, i = t.lineY0, o = t.lineY1; return t.angle = t.x, delete t.x, t.startAngle = t.x0, delete t.x0, t.endAngle = t.x1, delete t.x1, t.radius = t.y, delete t.y, t.innerRadius = t.y0, delete t.y0, t.outerRadius = t.y1, delete t.y1, t.lineStartAngle = function () { return Py(e()); }, delete t.lineX0, t.lineEndAngle = function () { return Py(r()); }, delete t.lineX1, t.lineInnerRadius = function () { return Py(i()); }, delete t.lineY0, t.lineOuterRadius = function () { return Py(o()); }, delete t.lineY1, t.curve = function (t) { return arguments.length ? n(Cy(t)) : n()._curve; }, t; }
    function Dy(t, n) { return [(n = +n) * Math.cos(t -= Math.PI / 2), n * Math.sin(t)]; }
    Ey.prototype = { areaStart: function () { this._curve.areaStart(); }, areaEnd: function () { this._curve.areaEnd(); }, lineStart: function () { this._curve.lineStart(); }, lineEnd: function () { this._curve.lineEnd(); }, point: function (t, n) { this._curve.point(n * Math.sin(t), n * -Math.cos(t)); } };
    var qy = Array.prototype.slice;
    function Ly(t) { return t.source; }
    function Uy(t) { return t.target; }
    function Oy(t) { var n = Ly, e = Uy, r = wy, i = My, o = null; function a() { var a, u = qy.call(arguments), c = n.apply(this, u), f = e.apply(this, u); if (o || (o = a = Xi()), t(o, +r.apply(this, (u[0] = c, u)), +i.apply(this, u), +r.apply(this, (u[0] = f, u)), +i.apply(this, u)), a)
        return o = null, a + "" || null; } return a.source = function (t) { return arguments.length ? (n = t, a) : n; }, a.target = function (t) { return arguments.length ? (e = t, a) : e; }, a.x = function (t) { return arguments.length ? (r = "function" == typeof t ? t : ny(+t), a) : r; }, a.y = function (t) { return arguments.length ? (i = "function" == typeof t ? t : ny(+t), a) : i; }, a.context = function (t) { return arguments.length ? (o = null == t ? null : t, a) : o; }, a; }
    function By(t, n, e, r, i) { t.moveTo(n, e), t.bezierCurveTo(n = (n + r) / 2, e, n, i, r, i); }
    function Yy(t, n, e, r, i) { t.moveTo(n, e), t.bezierCurveTo(n, e = (e + i) / 2, r, e, r, i); }
    function Fy(t, n, e, r, i) { var o = Dy(n, e), a = Dy(n, e = (e + i) / 2), u = Dy(r, e), c = Dy(r, i); t.moveTo(o[0], o[1]), t.bezierCurveTo(a[0], a[1], u[0], u[1], c[0], c[1]); }
    var Iy = { draw: function (t, n) { var e = Math.sqrt(n / sy); t.moveTo(e, 0), t.arc(0, 0, e, 0, hy); } }, jy = { draw: function (t, n) { var e = Math.sqrt(n / 5) / 2; t.moveTo(-3 * e, -e), t.lineTo(-e, -e), t.lineTo(-e, -3 * e), t.lineTo(e, -3 * e), t.lineTo(e, -e), t.lineTo(3 * e, -e), t.lineTo(3 * e, e), t.lineTo(e, e), t.lineTo(e, 3 * e), t.lineTo(-e, 3 * e), t.lineTo(-e, e), t.lineTo(-3 * e, e), t.closePath(); } }, Hy = Math.sqrt(1 / 3), Xy = 2 * Hy, Gy = { draw: function (t, n) { var e = Math.sqrt(n / Xy), r = e * Hy; t.moveTo(0, -e), t.lineTo(r, 0), t.lineTo(0, e), t.lineTo(-r, 0), t.closePath(); } }, Vy = Math.sin(sy / 10) / Math.sin(7 * sy / 10), $y = Math.sin(hy / 10) * Vy, Wy = -Math.cos(hy / 10) * Vy, Zy = { draw: function (t, n) { var e = Math.sqrt(.8908130915292852 * n), r = $y * e, i = Wy * e; t.moveTo(0, -e), t.lineTo(r, i); for (var o = 1; o < 5; ++o) {
            var a = hy * o / 5, u = Math.cos(a), c = Math.sin(a);
            t.lineTo(c * e, -u * e), t.lineTo(u * r - c * i, c * r + u * i);
        } t.closePath(); } }, Qy = { draw: function (t, n) { var e = Math.sqrt(n), r = -e / 2; t.rect(r, r, e, e); } }, Jy = Math.sqrt(3), Ky = { draw: function (t, n) { var e = -Math.sqrt(n / (3 * Jy)); t.moveTo(0, 2 * e), t.lineTo(-Jy * e, -e), t.lineTo(Jy * e, -e), t.closePath(); } }, t_ = Math.sqrt(3) / 2, n_ = 1 / Math.sqrt(12), e_ = 3 * (n_ / 2 + 1), r_ = { draw: function (t, n) { var e = Math.sqrt(n / e_), r = e / 2, i = e * n_, o = r, a = e * n_ + e, u = -o, c = a; t.moveTo(r, i), t.lineTo(o, a), t.lineTo(u, c), t.lineTo(-.5 * r - t_ * i, t_ * r + -.5 * i), t.lineTo(-.5 * o - t_ * a, t_ * o + -.5 * a), t.lineTo(-.5 * u - t_ * c, t_ * u + -.5 * c), t.lineTo(-.5 * r + t_ * i, -.5 * i - t_ * r), t.lineTo(-.5 * o + t_ * a, -.5 * a - t_ * o), t.lineTo(-.5 * u + t_ * c, -.5 * c - t_ * u), t.closePath(); } }, i_ = [Iy, jy, Gy, Qy, Zy, Ky, r_];
    function o_() { }
    function a_(t, n, e) { t._context.bezierCurveTo((2 * t._x0 + t._x1) / 3, (2 * t._y0 + t._y1) / 3, (t._x0 + 2 * t._x1) / 3, (t._y0 + 2 * t._y1) / 3, (t._x0 + 4 * t._x1 + n) / 6, (t._y0 + 4 * t._y1 + e) / 6); }
    function u_(t) { this._context = t; }
    function c_(t) { this._context = t; }
    function f_(t) { this._context = t; }
    function s_(t, n) { this._basis = new u_(t), this._beta = n; }
    u_.prototype = { areaStart: function () { this._line = 0; }, areaEnd: function () { this._line = NaN; }, lineStart: function () { this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0; }, lineEnd: function () { switch (this._point) {
            case 3: a_(this, this._x1, this._y1);
            case 2: this._context.lineTo(this._x1, this._y1);
        } (this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(), this._line = 1 - this._line; }, point: function (t, n) { switch (t = +t, n = +n, this._point) {
            case 0:
                this._point = 1, this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
                break;
            case 1:
                this._point = 2;
                break;
            case 2: this._point = 3, this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
            default: a_(this, t, n);
        } this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = n; } }, c_.prototype = { areaStart: o_, areaEnd: o_, lineStart: function () { this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN, this._point = 0; }, lineEnd: function () { switch (this._point) {
            case 1:
                this._context.moveTo(this._x2, this._y2), this._context.closePath();
                break;
            case 2:
                this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3), this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3), this._context.closePath();
                break;
            case 3: this.point(this._x2, this._y2), this.point(this._x3, this._y3), this.point(this._x4, this._y4);
        } }, point: function (t, n) { switch (t = +t, n = +n, this._point) {
            case 0:
                this._point = 1, this._x2 = t, this._y2 = n;
                break;
            case 1:
                this._point = 2, this._x3 = t, this._y3 = n;
                break;
            case 2:
                this._point = 3, this._x4 = t, this._y4 = n, this._context.moveTo((this._x0 + 4 * this._x1 + t) / 6, (this._y0 + 4 * this._y1 + n) / 6);
                break;
            default: a_(this, t, n);
        } this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = n; } }, f_.prototype = { areaStart: function () { this._line = 0; }, areaEnd: function () { this._line = NaN; }, lineStart: function () { this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0; }, lineEnd: function () { (this._line || 0 !== this._line && 3 === this._point) && this._context.closePath(), this._line = 1 - this._line; }, point: function (t, n) { switch (t = +t, n = +n, this._point) {
            case 0:
                this._point = 1;
                break;
            case 1:
                this._point = 2;
                break;
            case 2:
                this._point = 3;
                var e = (this._x0 + 4 * this._x1 + t) / 6, r = (this._y0 + 4 * this._y1 + n) / 6;
                this._line ? this._context.lineTo(e, r) : this._context.moveTo(e, r);
                break;
            case 3: this._point = 4;
            default: a_(this, t, n);
        } this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = n; } }, s_.prototype = { lineStart: function () { this._x = [], this._y = [], this._basis.lineStart(); }, lineEnd: function () { var t = this._x, n = this._y, e = t.length - 1; if (e > 0)
            for (var r, i = t[0], o = n[0], a = t[e] - i, u = n[e] - o, c = -1; ++c <= e;)
                r = c / e, this._basis.point(this._beta * t[c] + (1 - this._beta) * (i + r * a), this._beta * n[c] + (1 - this._beta) * (o + r * u)); this._x = this._y = null, this._basis.lineEnd(); }, point: function (t, n) { this._x.push(+t), this._y.push(+n); } };
    var l_ = function t(n) { function e(t) { return 1 === n ? new u_(t) : new s_(t, n); } return e.beta = function (n) { return t(+n); }, e; }(.85);
    function h_(t, n, e) { t._context.bezierCurveTo(t._x1 + t._k * (t._x2 - t._x0), t._y1 + t._k * (t._y2 - t._y0), t._x2 + t._k * (t._x1 - n), t._y2 + t._k * (t._y1 - e), t._x2, t._y2); }
    function d_(t, n) { this._context = t, this._k = (1 - n) / 6; }
    d_.prototype = { areaStart: function () { this._line = 0; }, areaEnd: function () { this._line = NaN; }, lineStart: function () { this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._point = 0; }, lineEnd: function () { switch (this._point) {
            case 2:
                this._context.lineTo(this._x2, this._y2);
                break;
            case 3: h_(this, this._x1, this._y1);
        } (this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(), this._line = 1 - this._line; }, point: function (t, n) { switch (t = +t, n = +n, this._point) {
            case 0:
                this._point = 1, this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
                break;
            case 1:
                this._point = 2, this._x1 = t, this._y1 = n;
                break;
            case 2: this._point = 3;
            default: h_(this, t, n);
        } this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = n; } };
    var p_ = function t(n) { function e(t) { return new d_(t, n); } return e.tension = function (n) { return t(+n); }, e; }(0);
    function v_(t, n) { this._context = t, this._k = (1 - n) / 6; }
    v_.prototype = { areaStart: o_, areaEnd: o_, lineStart: function () { this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN, this._point = 0; }, lineEnd: function () { switch (this._point) {
            case 1:
                this._context.moveTo(this._x3, this._y3), this._context.closePath();
                break;
            case 2:
                this._context.lineTo(this._x3, this._y3), this._context.closePath();
                break;
            case 3: this.point(this._x3, this._y3), this.point(this._x4, this._y4), this.point(this._x5, this._y5);
        } }, point: function (t, n) { switch (t = +t, n = +n, this._point) {
            case 0:
                this._point = 1, this._x3 = t, this._y3 = n;
                break;
            case 1:
                this._point = 2, this._context.moveTo(this._x4 = t, this._y4 = n);
                break;
            case 2:
                this._point = 3, this._x5 = t, this._y5 = n;
                break;
            default: h_(this, t, n);
        } this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = n; } };
    var g_ = function t(n) { function e(t) { return new v_(t, n); } return e.tension = function (n) { return t(+n); }, e; }(0);
    function y_(t, n) { this._context = t, this._k = (1 - n) / 6; }
    y_.prototype = { areaStart: function () { this._line = 0; }, areaEnd: function () { this._line = NaN; }, lineStart: function () { this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._point = 0; }, lineEnd: function () { (this._line || 0 !== this._line && 3 === this._point) && this._context.closePath(), this._line = 1 - this._line; }, point: function (t, n) { switch (t = +t, n = +n, this._point) {
            case 0:
                this._point = 1;
                break;
            case 1:
                this._point = 2;
                break;
            case 2:
                this._point = 3, this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
                break;
            case 3: this._point = 4;
            default: h_(this, t, n);
        } this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = n; } };
    var __ = function t(n) { function e(t) { return new y_(t, n); } return e.tension = function (n) { return t(+n); }, e; }(0);
    function b_(t, n, e) { var r = t._x1, i = t._y1, o = t._x2, a = t._y2; if (t._l01_a > fy) {
        var u = 2 * t._l01_2a + 3 * t._l01_a * t._l12_a + t._l12_2a, c = 3 * t._l01_a * (t._l01_a + t._l12_a);
        r = (r * u - t._x0 * t._l12_2a + t._x2 * t._l01_2a) / c, i = (i * u - t._y0 * t._l12_2a + t._y2 * t._l01_2a) / c;
    } if (t._l23_a > fy) {
        var f = 2 * t._l23_2a + 3 * t._l23_a * t._l12_a + t._l12_2a, s = 3 * t._l23_a * (t._l23_a + t._l12_a);
        o = (o * f + t._x1 * t._l23_2a - n * t._l12_2a) / s, a = (a * f + t._y1 * t._l23_2a - e * t._l12_2a) / s;
    } t._context.bezierCurveTo(r, i, o, a, t._x2, t._y2); }
    function m_(t, n) { this._context = t, this._alpha = n; }
    m_.prototype = { areaStart: function () { this._line = 0; }, areaEnd: function () { this._line = NaN; }, lineStart: function () { this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0; }, lineEnd: function () { switch (this._point) {
            case 2:
                this._context.lineTo(this._x2, this._y2);
                break;
            case 3: this.point(this._x2, this._y2);
        } (this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(), this._line = 1 - this._line; }, point: function (t, n) { if (t = +t, n = +n, this._point) {
            var e = this._x2 - t, r = this._y2 - n;
            this._l23_a = Math.sqrt(this._l23_2a = Math.pow(e * e + r * r, this._alpha));
        } switch (this._point) {
            case 0:
                this._point = 1, this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
                break;
            case 1:
                this._point = 2;
                break;
            case 2: this._point = 3;
            default: b_(this, t, n);
        } this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = n; } };
    var x_ = function t(n) { function e(t) { return n ? new m_(t, n) : new d_(t, 0); } return e.alpha = function (n) { return t(+n); }, e; }(.5);
    function w_(t, n) { this._context = t, this._alpha = n; }
    w_.prototype = { areaStart: o_, areaEnd: o_, lineStart: function () { this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN, this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0; }, lineEnd: function () { switch (this._point) {
            case 1:
                this._context.moveTo(this._x3, this._y3), this._context.closePath();
                break;
            case 2:
                this._context.lineTo(this._x3, this._y3), this._context.closePath();
                break;
            case 3: this.point(this._x3, this._y3), this.point(this._x4, this._y4), this.point(this._x5, this._y5);
        } }, point: function (t, n) { if (t = +t, n = +n, this._point) {
            var e = this._x2 - t, r = this._y2 - n;
            this._l23_a = Math.sqrt(this._l23_2a = Math.pow(e * e + r * r, this._alpha));
        } switch (this._point) {
            case 0:
                this._point = 1, this._x3 = t, this._y3 = n;
                break;
            case 1:
                this._point = 2, this._context.moveTo(this._x4 = t, this._y4 = n);
                break;
            case 2:
                this._point = 3, this._x5 = t, this._y5 = n;
                break;
            default: b_(this, t, n);
        } this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = n; } };
    var M_ = function t(n) { function e(t) { return n ? new w_(t, n) : new v_(t, 0); } return e.alpha = function (n) { return t(+n); }, e; }(.5);
    function N_(t, n) { this._context = t, this._alpha = n; }
    N_.prototype = { areaStart: function () { this._line = 0; }, areaEnd: function () { this._line = NaN; }, lineStart: function () { this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0; }, lineEnd: function () { (this._line || 0 !== this._line && 3 === this._point) && this._context.closePath(), this._line = 1 - this._line; }, point: function (t, n) { if (t = +t, n = +n, this._point) {
            var e = this._x2 - t, r = this._y2 - n;
            this._l23_a = Math.sqrt(this._l23_2a = Math.pow(e * e + r * r, this._alpha));
        } switch (this._point) {
            case 0:
                this._point = 1;
                break;
            case 1:
                this._point = 2;
                break;
            case 2:
                this._point = 3, this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
                break;
            case 3: this._point = 4;
            default: b_(this, t, n);
        } this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = n; } };
    var A_ = function t(n) { function e(t) { return n ? new N_(t, n) : new y_(t, 0); } return e.alpha = function (n) { return t(+n); }, e; }(.5);
    function T_(t) { this._context = t; }
    function S_(t) { return t < 0 ? -1 : 1; }
    function k_(t, n, e) { var r = t._x1 - t._x0, i = n - t._x1, o = (t._y1 - t._y0) / (r || i < 0 && -0), a = (e - t._y1) / (i || r < 0 && -0), u = (o * i + a * r) / (r + i); return (S_(o) + S_(a)) * Math.min(Math.abs(o), Math.abs(a), .5 * Math.abs(u)) || 0; }
    function E_(t, n) { var e = t._x1 - t._x0; return e ? (3 * (t._y1 - t._y0) / e - n) / 2 : n; }
    function C_(t, n, e) { var r = t._x0, i = t._y0, o = t._x1, a = t._y1, u = (o - r) / 3; t._context.bezierCurveTo(r + u, i + u * n, o - u, a - u * e, o, a); }
    function P_(t) { this._context = t; }
    function z_(t) { this._context = new R_(t); }
    function R_(t) { this._context = t; }
    function D_(t) { this._context = t; }
    function q_(t) { var n, e, r = t.length - 1, i = new Array(r), o = new Array(r), a = new Array(r); for (i[0] = 0, o[0] = 2, a[0] = t[0] + 2 * t[1], n = 1; n < r - 1; ++n)
        i[n] = 1, o[n] = 4, a[n] = 4 * t[n] + 2 * t[n + 1]; for (i[r - 1] = 2, o[r - 1] = 7, a[r - 1] = 8 * t[r - 1] + t[r], n = 1; n < r; ++n)
        e = i[n] / o[n - 1], o[n] -= e, a[n] -= e * a[n - 1]; for (i[r - 1] = a[r - 1] / o[r - 1], n = r - 2; n >= 0; --n)
        i[n] = (a[n] - i[n + 1]) / o[n]; for (o[r - 1] = (t[r] + i[r - 1]) / 2, n = 0; n < r - 1; ++n)
        o[n] = 2 * t[n + 1] - i[n + 1]; return [i, o]; }
    function L_(t, n) { this._context = t, this._t = n; }
    function U_(t, n) { if ((i = t.length) > 1)
        for (var e, r, i, o = 1, a = t[n[0]], u = a.length; o < i; ++o)
            for (r = a, a = t[n[o]], e = 0; e < u; ++e)
                a[e][1] += a[e][0] = isNaN(r[e][1]) ? r[e][0] : r[e][1]; }
    function O_(t) { for (var n = t.length, e = new Array(n); --n >= 0;)
        e[n] = n; return e; }
    function B_(t, n) { return t[n]; }
    function Y_(t) { var n = t.map(F_); return O_(t).sort(function (t, e) { return n[t] - n[e]; }); }
    function F_(t) { for (var n, e = -1, r = 0, i = t.length, o = -1 / 0; ++e < i;)
        (n = +t[e][1]) > o && (o = n, r = e); return r; }
    function I_(t) { var n = t.map(j_); return O_(t).sort(function (t, e) { return n[t] - n[e]; }); }
    function j_(t) { for (var n, e = 0, r = -1, i = t.length; ++r < i;)
        (n = +t[r][1]) && (e += n); return e; }
    function H_(t) { return function () { return t; }; }
    function X_(t) { return t[0]; }
    function G_(t) { return t[1]; }
    function V_() { this._ = null; }
    function $_(t) { t.U = t.C = t.L = t.R = t.P = t.N = null; }
    function W_(t, n) { var e = n, r = n.R, i = e.U; i ? i.L === e ? i.L = r : i.R = r : t._ = r, r.U = i, e.U = r, e.R = r.L, e.R && (e.R.U = e), r.L = e; }
    function Z_(t, n) { var e = n, r = n.L, i = e.U; i ? i.L === e ? i.L = r : i.R = r : t._ = r, r.U = i, e.U = r, e.L = r.R, e.L && (e.L.U = e), r.R = e; }
    function Q_(t) { for (; t.L;)
        t = t.L; return t; }
    function J_(t, n, e, r) { var i = [null, null], o = wb.push(i) - 1; return i.left = t, i.right = n, e && tb(i, t, n, e), r && tb(i, n, t, r), mb[t.index].halfedges.push(o), mb[n.index].halfedges.push(o), i; }
    function K_(t, n, e) { var r = [n, e]; return r.left = t, r; }
    function tb(t, n, e, r) { t[0] || t[1] ? t.left === e ? t[1] = r : t[0] = r : (t[0] = r, t.left = n, t.right = e); }
    function nb(t, n, e, r, i) { var o, a = t[0], u = t[1], c = a[0], f = a[1], s = 0, l = 1, h = u[0] - c, d = u[1] - f; if (o = n - c, h || !(o > 0)) {
        if (o /= h, h < 0) {
            if (o < s)
                return;
            o < l && (l = o);
        }
        else if (h > 0) {
            if (o > l)
                return;
            o > s && (s = o);
        }
        if (o = r - c, h || !(o < 0)) {
            if (o /= h, h < 0) {
                if (o > l)
                    return;
                o > s && (s = o);
            }
            else if (h > 0) {
                if (o < s)
                    return;
                o < l && (l = o);
            }
            if (o = e - f, d || !(o > 0)) {
                if (o /= d, d < 0) {
                    if (o < s)
                        return;
                    o < l && (l = o);
                }
                else if (d > 0) {
                    if (o > l)
                        return;
                    o > s && (s = o);
                }
                if (o = i - f, d || !(o < 0)) {
                    if (o /= d, d < 0) {
                        if (o > l)
                            return;
                        o > s && (s = o);
                    }
                    else if (d > 0) {
                        if (o < s)
                            return;
                        o < l && (l = o);
                    }
                    return !(s > 0 || l < 1) || (s > 0 && (t[0] = [c + s * h, f + s * d]), l < 1 && (t[1] = [c + l * h, f + l * d]), !0);
                }
            }
        }
    } }
    function eb(t, n, e, r, i) { var o = t[1]; if (o)
        return !0; var a, u, c = t[0], f = t.left, s = t.right, l = f[0], h = f[1], d = s[0], p = s[1], v = (l + d) / 2, g = (h + p) / 2; if (p === h) {
        if (v < n || v >= r)
            return;
        if (l > d) {
            if (c) {
                if (c[1] >= i)
                    return;
            }
            else
                c = [v, e];
            o = [v, i];
        }
        else {
            if (c) {
                if (c[1] < e)
                    return;
            }
            else
                c = [v, i];
            o = [v, e];
        }
    }
    else if (u = g - (a = (l - d) / (p - h)) * v, a < -1 || a > 1)
        if (l > d) {
            if (c) {
                if (c[1] >= i)
                    return;
            }
            else
                c = [(e - u) / a, e];
            o = [(i - u) / a, i];
        }
        else {
            if (c) {
                if (c[1] < e)
                    return;
            }
            else
                c = [(i - u) / a, i];
            o = [(e - u) / a, e];
        }
    else if (h < p) {
        if (c) {
            if (c[0] >= r)
                return;
        }
        else
            c = [n, a * n + u];
        o = [r, a * r + u];
    }
    else {
        if (c) {
            if (c[0] < n)
                return;
        }
        else
            c = [r, a * r + u];
        o = [n, a * n + u];
    } return t[0] = c, t[1] = o, !0; }
    function rb(t, n) { var e = t.site, r = n.left, i = n.right; return e === i && (i = r, r = e), i ? Math.atan2(i[1] - r[1], i[0] - r[0]) : (e === r ? (r = n[1], i = n[0]) : (r = n[0], i = n[1]), Math.atan2(r[0] - i[0], i[1] - r[1])); }
    function ib(t, n) { return n[+(n.left !== t.site)]; }
    function ob(t, n) { return n[+(n.left === t.site)]; }
    T_.prototype = { areaStart: o_, areaEnd: o_, lineStart: function () { this._point = 0; }, lineEnd: function () { this._point && this._context.closePath(); }, point: function (t, n) { t = +t, n = +n, this._point ? this._context.lineTo(t, n) : (this._point = 1, this._context.moveTo(t, n)); } }, P_.prototype = { areaStart: function () { this._line = 0; }, areaEnd: function () { this._line = NaN; }, lineStart: function () { this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN, this._point = 0; }, lineEnd: function () { switch (this._point) {
            case 2:
                this._context.lineTo(this._x1, this._y1);
                break;
            case 3: C_(this, this._t0, E_(this, this._t0));
        } (this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(), this._line = 1 - this._line; }, point: function (t, n) { var e = NaN; if (n = +n, (t = +t) !== this._x1 || n !== this._y1) {
            switch (this._point) {
                case 0:
                    this._point = 1, this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
                    break;
                case 1:
                    this._point = 2;
                    break;
                case 2:
                    this._point = 3, C_(this, E_(this, e = k_(this, t, n)), e);
                    break;
                default: C_(this, this._t0, e = k_(this, t, n));
            }
            this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = n, this._t0 = e;
        } } }, (z_.prototype = Object.create(P_.prototype)).point = function (t, n) { P_.prototype.point.call(this, n, t); }, R_.prototype = { moveTo: function (t, n) { this._context.moveTo(n, t); }, closePath: function () { this._context.closePath(); }, lineTo: function (t, n) { this._context.lineTo(n, t); }, bezierCurveTo: function (t, n, e, r, i, o) { this._context.bezierCurveTo(n, t, r, e, o, i); } }, D_.prototype = { areaStart: function () { this._line = 0; }, areaEnd: function () { this._line = NaN; }, lineStart: function () { this._x = [], this._y = []; }, lineEnd: function () { var t = this._x, n = this._y, e = t.length; if (e)
            if (this._line ? this._context.lineTo(t[0], n[0]) : this._context.moveTo(t[0], n[0]), 2 === e)
                this._context.lineTo(t[1], n[1]);
            else
                for (var r = q_(t), i = q_(n), o = 0, a = 1; a < e; ++o, ++a)
                    this._context.bezierCurveTo(r[0][o], i[0][o], r[1][o], i[1][o], t[a], n[a]); (this._line || 0 !== this._line && 1 === e) && this._context.closePath(), this._line = 1 - this._line, this._x = this._y = null; }, point: function (t, n) { this._x.push(+t), this._y.push(+n); } }, L_.prototype = { areaStart: function () { this._line = 0; }, areaEnd: function () { this._line = NaN; }, lineStart: function () { this._x = this._y = NaN, this._point = 0; }, lineEnd: function () { 0 < this._t && this._t < 1 && 2 === this._point && this._context.lineTo(this._x, this._y), (this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(), this._line >= 0 && (this._t = 1 - this._t, this._line = 1 - this._line); }, point: function (t, n) { switch (t = +t, n = +n, this._point) {
            case 0:
                this._point = 1, this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
                break;
            case 1: this._point = 2;
            default: if (this._t <= 0)
                this._context.lineTo(this._x, n), this._context.lineTo(t, n);
            else {
                var e = this._x * (1 - this._t) + t * this._t;
                this._context.lineTo(e, this._y), this._context.lineTo(e, n);
            }
        } this._x = t, this._y = n; } }, V_.prototype = { constructor: V_, insert: function (t, n) { var e, r, i; if (t) {
            if (n.P = t, n.N = t.N, t.N && (t.N.P = n), t.N = n, t.R) {
                for (t = t.R; t.L;)
                    t = t.L;
                t.L = n;
            }
            else
                t.R = n;
            e = t;
        }
        else
            this._ ? (t = Q_(this._), n.P = null, n.N = t, t.P = t.L = n, e = t) : (n.P = n.N = null, this._ = n, e = null); for (n.L = n.R = null, n.U = e, n.C = !0, t = n; e && e.C;)
            e === (r = e.U).L ? (i = r.R) && i.C ? (e.C = i.C = !1, r.C = !0, t = r) : (t === e.R && (W_(this, e), e = (t = e).U), e.C = !1, r.C = !0, Z_(this, r)) : (i = r.L) && i.C ? (e.C = i.C = !1, r.C = !0, t = r) : (t === e.L && (Z_(this, e), e = (t = e).U), e.C = !1, r.C = !0, W_(this, r)), e = t.U; this._.C = !1; }, remove: function (t) { t.N && (t.N.P = t.P), t.P && (t.P.N = t.N), t.N = t.P = null; var n, e, r, i = t.U, o = t.L, a = t.R; if (e = o ? a ? Q_(a) : o : a, i ? i.L === t ? i.L = e : i.R = e : this._ = e, o && a ? (r = e.C, e.C = t.C, e.L = o, o.U = e, e !== a ? (i = e.U, e.U = t.U, t = e.R, i.L = t, e.R = a, a.U = e) : (e.U = i, i = e, t = e.R)) : (r = t.C, t = e), t && (t.U = i), !r)
            if (t && t.C)
                t.C = !1;
            else {
                do {
                    if (t === this._)
                        break;
                    if (t === i.L) {
                        if ((n = i.R).C && (n.C = !1, i.C = !0, W_(this, i), n = i.R), n.L && n.L.C || n.R && n.R.C) {
                            n.R && n.R.C || (n.L.C = !1, n.C = !0, Z_(this, n), n = i.R), n.C = i.C, i.C = n.R.C = !1, W_(this, i), t = this._;
                            break;
                        }
                    }
                    else if ((n = i.L).C && (n.C = !1, i.C = !0, Z_(this, i), n = i.L), n.L && n.L.C || n.R && n.R.C) {
                        n.L && n.L.C || (n.R.C = !1, n.C = !0, W_(this, n), n = i.L), n.C = i.C, i.C = n.L.C = !1, Z_(this, i), t = this._;
                        break;
                    }
                    n.C = !0, t = i, i = i.U;
                } while (!t.C);
                t && (t.C = !1);
            } } };
    var ab, ub = [];
    function cb() { $_(this), this.x = this.y = this.arc = this.site = this.cy = null; }
    function fb(t) { var n = t.P, e = t.N; if (n && e) {
        var r = n.site, i = t.site, o = e.site;
        if (r !== o) {
            var a = i[0], u = i[1], c = r[0] - a, f = r[1] - u, s = o[0] - a, l = o[1] - u, h = 2 * (c * l - f * s);
            if (!(h >= -Nb)) {
                var d = c * c + f * f, p = s * s + l * l, v = (l * d - f * p) / h, g = (c * p - s * d) / h, y = ub.pop() || new cb;
                y.arc = t, y.site = i, y.x = v + a, y.y = (y.cy = g + u) + Math.sqrt(v * v + g * g), t.circle = y;
                for (var _ = null, b = xb._; b;)
                    if (y.y < b.y || y.y === b.y && y.x <= b.x) {
                        if (!b.L) {
                            _ = b.P;
                            break;
                        }
                        b = b.L;
                    }
                    else {
                        if (!b.R) {
                            _ = b;
                            break;
                        }
                        b = b.R;
                    }
                xb.insert(_, y), _ || (ab = y);
            }
        }
    } }
    function sb(t) { var n = t.circle; n && (n.P || (ab = n.N), xb.remove(n), ub.push(n), $_(n), t.circle = null); }
    var lb = [];
    function hb() { $_(this), this.edge = this.site = this.circle = null; }
    function db(t) { var n = lb.pop() || new hb; return n.site = t, n; }
    function pb(t) { sb(t), bb.remove(t), lb.push(t), $_(t); }
    function vb(t) { var n = t.circle, e = n.x, r = n.cy, i = [e, r], o = t.P, a = t.N, u = [t]; pb(t); for (var c = o; c.circle && Math.abs(e - c.circle.x) < Mb && Math.abs(r - c.circle.cy) < Mb;)
        o = c.P, u.unshift(c), pb(c), c = o; u.unshift(c), sb(c); for (var f = a; f.circle && Math.abs(e - f.circle.x) < Mb && Math.abs(r - f.circle.cy) < Mb;)
        a = f.N, u.push(f), pb(f), f = a; u.push(f), sb(f); var s, l = u.length; for (s = 1; s < l; ++s)
        f = u[s], c = u[s - 1], tb(f.edge, c.site, f.site, i); c = u[0], (f = u[l - 1]).edge = J_(c.site, f.site, null, i), fb(c), fb(f); }
    function gb(t) { for (var n, e, r, i, o = t[0], a = t[1], u = bb._; u;)
        if ((r = yb(u, a) - o) > Mb)
            u = u.L;
        else {
            if (!((i = o - _b(u, a)) > Mb)) {
                r > -Mb ? (n = u.P, e = u) : i > -Mb ? (n = u, e = u.N) : n = e = u;
                break;
            }
            if (!u.R) {
                n = u;
                break;
            }
            u = u.R;
        } !function (t) { mb[t.index] = { site: t, halfedges: [] }; }(t); var c = db(t); if (bb.insert(n, c), n || e) {
        if (n === e)
            return sb(n), e = db(n.site), bb.insert(c, e), c.edge = e.edge = J_(n.site, c.site), fb(n), void fb(e);
        if (e) {
            sb(n), sb(e);
            var f = n.site, s = f[0], l = f[1], h = t[0] - s, d = t[1] - l, p = e.site, v = p[0] - s, g = p[1] - l, y = 2 * (h * g - d * v), _ = h * h + d * d, b = v * v + g * g, m = [(g * _ - d * b) / y + s, (h * b - v * _) / y + l];
            tb(e.edge, f, p, m), c.edge = J_(f, t, null, m), e.edge = J_(t, p, null, m), fb(n), fb(e);
        }
        else
            c.edge = J_(n.site, c.site);
    } }
    function yb(t, n) { var e = t.site, r = e[0], i = e[1], o = i - n; if (!o)
        return r; var a = t.P; if (!a)
        return -1 / 0; var u = (e = a.site)[0], c = e[1], f = c - n; if (!f)
        return u; var s = u - r, l = 1 / o - 1 / f, h = s / f; return l ? (-h + Math.sqrt(h * h - 2 * l * (s * s / (-2 * f) - c + f / 2 + i - o / 2))) / l + r : (r + u) / 2; }
    function _b(t, n) { var e = t.N; if (e)
        return yb(e, n); var r = t.site; return r[1] === n ? r[0] : 1 / 0; }
    var bb, mb, xb, wb, Mb = 1e-6, Nb = 1e-12;
    function Ab(t, n) { return n[1] - t[1] || n[0] - t[0]; }
    function Tb(t, n) { var e, r, i, o = t.sort(Ab).pop(); for (wb = [], mb = new Array(t.length), bb = new V_, xb = new V_;;)
        if (i = ab, o && (!i || o[1] < i.y || o[1] === i.y && o[0] < i.x))
            o[0] === e && o[1] === r || (gb(o), e = o[0], r = o[1]), o = t.pop();
        else {
            if (!i)
                break;
            vb(i.arc);
        } if (function () { for (var t, n, e, r, i = 0, o = mb.length; i < o; ++i)
        if ((t = mb[i]) && (r = (n = t.halfedges).length)) {
            var a = new Array(r), u = new Array(r);
            for (e = 0; e < r; ++e)
                a[e] = e, u[e] = rb(t, wb[n[e]]);
            for (a.sort(function (t, n) { return u[n] - u[t]; }), e = 0; e < r; ++e)
                u[e] = n[a[e]];
            for (e = 0; e < r; ++e)
                n[e] = u[e];
        } }(), n) {
        var a = +n[0][0], u = +n[0][1], c = +n[1][0], f = +n[1][1];
        !function (t, n, e, r) { for (var i, o = wb.length; o--;)
            eb(i = wb[o], t, n, e, r) && nb(i, t, n, e, r) && (Math.abs(i[0][0] - i[1][0]) > Mb || Math.abs(i[0][1] - i[1][1]) > Mb) || delete wb[o]; }(a, u, c, f), function (t, n, e, r) { var i, o, a, u, c, f, s, l, h, d, p, v, g = mb.length, y = !0; for (i = 0; i < g; ++i)
            if (o = mb[i]) {
                for (a = o.site, u = (c = o.halfedges).length; u--;)
                    wb[c[u]] || c.splice(u, 1);
                for (u = 0, f = c.length; u < f;)
                    p = (d = ob(o, wb[c[u]]))[0], v = d[1], l = (s = ib(o, wb[c[++u % f]]))[0], h = s[1], (Math.abs(p - l) > Mb || Math.abs(v - h) > Mb) && (c.splice(u, 0, wb.push(K_(a, d, Math.abs(p - t) < Mb && r - v > Mb ? [t, Math.abs(l - t) < Mb ? h : r] : Math.abs(v - r) < Mb && e - p > Mb ? [Math.abs(h - r) < Mb ? l : e, r] : Math.abs(p - e) < Mb && v - n > Mb ? [e, Math.abs(l - e) < Mb ? h : n] : Math.abs(v - n) < Mb && p - t > Mb ? [Math.abs(h - n) < Mb ? l : t, n] : null)) - 1), ++f);
                f && (y = !1);
            } if (y) {
            var _, b, m, x = 1 / 0;
            for (i = 0, y = null; i < g; ++i)
                (o = mb[i]) && (m = (_ = (a = o.site)[0] - t) * _ + (b = a[1] - n) * b) < x && (x = m, y = o);
            if (y) {
                var w = [t, n], M = [t, r], N = [e, r], A = [e, n];
                y.halfedges.push(wb.push(K_(a = y.site, w, M)) - 1, wb.push(K_(a, M, N)) - 1, wb.push(K_(a, N, A)) - 1, wb.push(K_(a, A, w)) - 1);
            }
        } for (i = 0; i < g; ++i)
            (o = mb[i]) && (o.halfedges.length || delete mb[i]); }(a, u, c, f);
    } this.edges = wb, this.cells = mb, bb = xb = wb = mb = null; }
    function Sb(t) { return function () { return t; }; }
    function kb(t, n, e) { this.target = t, this.type = n, this.transform = e; }
    function Eb(t, n, e) { this.k = t, this.x = n, this.y = e; }
    Tb.prototype = { constructor: Tb, polygons: function () { var t = this.edges; return this.cells.map(function (n) { var e = n.halfedges.map(function (e) { return ib(n, t[e]); }); return e.data = n.site.data, e; }); }, triangles: function () { var t = [], n = this.edges; return this.cells.forEach(function (e, r) { if (o = (i = e.halfedges).length)
            for (var i, o, a, u, c, f, s = e.site, l = -1, h = n[i[o - 1]], d = h.left === s ? h.right : h.left; ++l < o;)
                a = d, d = (h = n[i[l]]).left === s ? h.right : h.left, a && d && r < a.index && r < d.index && (c = a, f = d, ((u = s)[0] - f[0]) * (c[1] - u[1]) - (u[0] - c[0]) * (f[1] - u[1]) < 0) && t.push([s.data, a.data, d.data]); }), t; }, links: function () { return this.edges.filter(function (t) { return t.right; }).map(function (t) { return { source: t.left.data, target: t.right.data }; }); }, find: function (t, n, e) { for (var r, i, o = this, a = o._found || 0, u = o.cells.length; !(i = o.cells[a]);)
            if (++a >= u)
                return null; var c = t - i.site[0], f = n - i.site[1], s = c * c + f * f; do {
            i = o.cells[r = a], a = null, i.halfedges.forEach(function (e) { var r = o.edges[e], u = r.left; if (u !== i.site && u || (u = r.right)) {
                var c = t - u[0], f = n - u[1], l = c * c + f * f;
                l < s && (s = l, a = u.index);
            } });
        } while (null !== a); return o._found = r, null == e || s <= e * e ? i.site : null; } }, Eb.prototype = { constructor: Eb, scale: function (t) { return 1 === t ? this : new Eb(this.k * t, this.x, this.y); }, translate: function (t, n) { return 0 === t & 0 === n ? this : new Eb(this.k, this.x + this.k * t, this.y + this.k * n); }, apply: function (t) { return [t[0] * this.k + this.x, t[1] * this.k + this.y]; }, applyX: function (t) { return t * this.k + this.x; }, applyY: function (t) { return t * this.k + this.y; }, invert: function (t) { return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k]; }, invertX: function (t) { return (t - this.x) / this.k; }, invertY: function (t) { return (t - this.y) / this.k; }, rescaleX: function (t) { return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t)); }, rescaleY: function (t) { return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t)); }, toString: function () { return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")"; } };
    var Cb = new Eb(1, 0, 0);
    function Pb(t) { return t.__zoom || Cb; }
    function zb() { t.event.stopImmediatePropagation(); }
    function Rb() { t.event.preventDefault(), t.event.stopImmediatePropagation(); }
    function Db() { return !t.event.button; }
    function qb() { var t, n, e = this; return e instanceof SVGElement ? (t = (e = e.ownerSVGElement || e).width.baseVal.value, n = e.height.baseVal.value) : (t = e.clientWidth, n = e.clientHeight), [[0, 0], [t, n]]; }
    function Lb() { return this.__zoom || Cb; }
    function Ub() { return -t.event.deltaY * (t.event.deltaMode ? 120 : 1) / 500; }
    function Ob() { return "ontouchstart" in this; }
    function Bb(t, n, e) { var r = t.invertX(n[0][0]) - e[0][0], i = t.invertX(n[1][0]) - e[1][0], o = t.invertY(n[0][1]) - e[0][1], a = t.invertY(n[1][1]) - e[1][1]; return t.translate(i > r ? (r + i) / 2 : Math.min(0, r) || Math.max(0, i), a > o ? (o + a) / 2 : Math.min(0, o) || Math.max(0, a)); }
    Pb.prototype = Eb.prototype, t.version = "5.9.7", t.bisect = i, t.bisectRight = i, t.bisectLeft = o, t.ascending = n, t.bisector = e, t.cross = function (t, n, e) { var r, i, o, u, c = t.length, f = n.length, s = new Array(c * f); for (null == e && (e = a), r = o = 0; r < c; ++r)
        for (u = t[r], i = 0; i < f; ++i, ++o)
            s[o] = e(u, n[i]); return s; }, t.descending = function (t, n) { return n < t ? -1 : n > t ? 1 : n >= t ? 0 : NaN; }, t.deviation = f, t.extent = s, t.histogram = function () { var t = v, n = s, e = M; function r(r) { var o, a, u = r.length, c = new Array(u); for (o = 0; o < u; ++o)
        c[o] = t(r[o], o, r); var f = n(c), s = f[0], l = f[1], h = e(c, s, l); Array.isArray(h) || (h = w(s, l, h), h = g(Math.ceil(s / h) * h, l, h)); for (var d = h.length; h[0] <= s;)
        h.shift(), --d; for (; h[d - 1] > l;)
        h.pop(), --d; var p, v = new Array(d + 1); for (o = 0; o <= d; ++o)
        (p = v[o] = []).x0 = o > 0 ? h[o - 1] : s, p.x1 = o < d ? h[o] : l; for (o = 0; o < u; ++o)
        s <= (a = c[o]) && a <= l && v[i(h, a, 0, d)].push(r[o]); return v; } return r.value = function (n) { return arguments.length ? (t = "function" == typeof n ? n : p(n), r) : t; }, r.domain = function (t) { return arguments.length ? (n = "function" == typeof t ? t : p([t[0], t[1]]), r) : n; }, r.thresholds = function (t) { return arguments.length ? (e = "function" == typeof t ? t : Array.isArray(t) ? p(h.call(t)) : p(t), r) : e; }, r; }, t.thresholdFreedmanDiaconis = function (t, e, r) { return t = d.call(t, u).sort(n), Math.ceil((r - e) / (2 * (N(t, .75) - N(t, .25)) * Math.pow(t.length, -1 / 3))); }, t.thresholdScott = function (t, n, e) { return Math.ceil((e - n) / (3.5 * f(t) * Math.pow(t.length, -1 / 3))); }, t.thresholdSturges = M, t.max = A, t.mean = function (t, n) { var e, r = t.length, i = r, o = -1, a = 0; if (null == n)
        for (; ++o < r;)
            isNaN(e = u(t[o])) ? --i : a += e;
    else
        for (; ++o < r;)
            isNaN(e = u(n(t[o], o, t))) ? --i : a += e; if (i)
        return a / i; }, t.median = function (t, e) { var r, i = t.length, o = -1, a = []; if (null == e)
        for (; ++o < i;)
            isNaN(r = u(t[o])) || a.push(r);
    else
        for (; ++o < i;)
            isNaN(r = u(e(t[o], o, t))) || a.push(r); return N(a.sort(n), .5); }, t.merge = T, t.min = S, t.pairs = function (t, n) { null == n && (n = a); for (var e = 0, r = t.length - 1, i = t[0], o = new Array(r < 0 ? 0 : r); e < r;)
        o[e] = n(i, i = t[++e]); return o; }, t.permute = function (t, n) { for (var e = n.length, r = new Array(e); e--;)
        r[e] = t[n[e]]; return r; }, t.quantile = N, t.range = g, t.scan = function (t, e) { if (r = t.length) {
        var r, i, o = 0, a = 0, u = t[a];
        for (null == e && (e = n); ++o < r;)
            (e(i = t[o], u) < 0 || 0 !== e(u, u)) && (u = i, a = o);
        return 0 === e(u, u) ? a : void 0;
    } }, t.shuffle = function (t, n, e) { for (var r, i, o = (null == e ? t.length : e) - (n = null == n ? 0 : +n); o;)
        i = Math.random() * o-- | 0, r = t[o + n], t[o + n] = t[i + n], t[i + n] = r; return t; }, t.sum = function (t, n) { var e, r = t.length, i = -1, o = 0; if (null == n)
        for (; ++i < r;)
            (e = +t[i]) && (o += e);
    else
        for (; ++i < r;)
            (e = +n(t[i], i, t)) && (o += e); return o; }, t.ticks = m, t.tickIncrement = x, t.tickStep = w, t.transpose = k, t.variance = c, t.zip = function () { return k(arguments); }, t.axisTop = function (t) { return Y(z, t); }, t.axisRight = function (t) { return Y(R, t); }, t.axisBottom = function (t) { return Y(D, t); }, t.axisLeft = function (t) { return Y(q, t); }, t.brush = function () { return zi(xi); }, t.brushX = function () { return zi(bi); }, t.brushY = function () { return zi(mi); }, t.brushSelection = function (t) { var n = t.__brush; return n ? n.dim.output(n.selection) : null; }, t.chord = function () { var t = 0, n = null, e = null, r = null; function i(i) { var o, a, u, c, f, s, l = i.length, h = [], d = g(l), p = [], v = [], y = v.groups = new Array(l), _ = new Array(l * l); for (o = 0, f = -1; ++f < l;) {
        for (a = 0, s = -1; ++s < l;)
            a += i[f][s];
        h.push(a), p.push(g(l)), o += a;
    } for (n && d.sort(function (t, e) { return n(h[t], h[e]); }), e && p.forEach(function (t, n) { t.sort(function (t, r) { return e(i[n][t], i[n][r]); }); }), c = (o = Oi(0, Ui - t * l) / o) ? t : Ui / l, a = 0, f = -1; ++f < l;) {
        for (u = a, s = -1; ++s < l;) {
            var b = d[f], m = p[b][s], x = i[b][m], w = a, M = a += x * o;
            _[m * l + b] = { index: b, subindex: m, startAngle: w, endAngle: M, value: x };
        }
        y[b] = { index: b, startAngle: u, endAngle: a, value: h[b] }, a += c;
    } for (f = -1; ++f < l;)
        for (s = f - 1; ++s < l;) {
            var N = _[s * l + f], A = _[f * l + s];
            (N.value || A.value) && v.push(N.value < A.value ? { source: A, target: N } : { source: N, target: A });
        } return r ? v.sort(r) : v; } return i.padAngle = function (n) { return arguments.length ? (t = Oi(0, n), i) : t; }, i.sortGroups = function (t) { return arguments.length ? (n = t, i) : n; }, i.sortSubgroups = function (t) { return arguments.length ? (e = t, i) : e; }, i.sortChords = function (t) { return arguments.length ? (null == t ? r = null : (n = t, r = function (t, e) { return n(t.source.value + t.target.value, e.source.value + e.target.value); })._ = t, i) : r && r._; var n; }, i; }, t.ribbon = function () { var t = Gi, n = Vi, e = $i, r = Wi, i = Zi, o = null; function a() { var a, u = Bi.call(arguments), c = t.apply(this, u), f = n.apply(this, u), s = +e.apply(this, (u[0] = c, u)), l = r.apply(this, u) - Li, h = i.apply(this, u) - Li, d = s * Ri(l), p = s * Di(l), v = +e.apply(this, (u[0] = f, u)), g = r.apply(this, u) - Li, y = i.apply(this, u) - Li; if (o || (o = a = Xi()), o.moveTo(d, p), o.arc(0, 0, s, l, h), l === g && h === y || (o.quadraticCurveTo(0, 0, v * Ri(g), v * Di(g)), o.arc(0, 0, v, g, y)), o.quadraticCurveTo(0, 0, d, p), o.closePath(), a)
        return o = null, a + "" || null; } return a.radius = function (t) { return arguments.length ? (e = "function" == typeof t ? t : Yi(+t), a) : e; }, a.startAngle = function (t) { return arguments.length ? (r = "function" == typeof t ? t : Yi(+t), a) : r; }, a.endAngle = function (t) { return arguments.length ? (i = "function" == typeof t ? t : Yi(+t), a) : i; }, a.source = function (n) { return arguments.length ? (t = n, a) : t; }, a.target = function (t) { return arguments.length ? (n = t, a) : n; }, a.context = function (t) { return arguments.length ? (o = null == t ? null : t, a) : o; }, a; }, t.nest = function () { var t, n, e, r = [], i = []; function o(e, i, a, u) { if (i >= r.length)
        return null != t && e.sort(t), null != n ? n(e) : e; for (var c, f, s, l = -1, h = e.length, d = r[i++], p = Ji(), v = a(); ++l < h;)
        (s = p.get(c = d(f = e[l]) + "")) ? s.push(f) : p.set(c, [f]); return p.each(function (t, n) { u(v, n, o(t, i, a, u)); }), v; } return e = { object: function (t) { return o(t, 0, Ki, to); }, map: function (t) { return o(t, 0, no, eo); }, entries: function (t) { return function t(e, o) { if (++o > r.length)
            return e; var a, u = i[o - 1]; return null != n && o >= r.length ? a = e.entries() : (a = [], e.each(function (n, e) { a.push({ key: e, values: t(n, o) }); })), null != u ? a.sort(function (t, n) { return u(t.key, n.key); }) : a; }(o(t, 0, no, eo), 0); }, key: function (t) { return r.push(t), e; }, sortKeys: function (t) { return i[r.length - 1] = t, e; }, sortValues: function (n) { return t = n, e; }, rollup: function (t) { return n = t, e; } }; }, t.set = oo, t.map = Ji, t.keys = function (t) { var n = []; for (var e in t)
        n.push(e); return n; }, t.values = function (t) { var n = []; for (var e in t)
        n.push(t[e]); return n; }, t.entries = function (t) { var n = []; for (var e in t)
        n.push({ key: e, value: t[e] }); return n; }, t.color = hn, t.rgb = gn, t.hsl = mn, t.lab = Rn, t.hcl = Yn, t.lch = function (t, n, e, r) { return 1 === arguments.length ? Bn(t) : new Fn(e, n, t, null == r ? 1 : r); }, t.gray = function (t, n) { return new Dn(t, 0, 0, null == n ? 1 : n); }, t.cubehelix = Qn, t.contours = vo, t.contourDensity = function () { var t = _o, n = bo, e = mo, r = 960, i = 500, o = 20, a = 2, u = 3 * o, c = r + 2 * u >> a, f = i + 2 * u >> a, s = co(20); function l(r) { var i = new Float32Array(c * f), l = new Float32Array(c * f); r.forEach(function (r, o, s) { var l = +t(r, o, s) + u >> a, h = +n(r, o, s) + u >> a, d = +e(r, o, s); l >= 0 && l < c && h >= 0 && h < f && (i[l + h * c] += d); }), go({ width: c, height: f, data: i }, { width: c, height: f, data: l }, o >> a), yo({ width: c, height: f, data: l }, { width: c, height: f, data: i }, o >> a), go({ width: c, height: f, data: i }, { width: c, height: f, data: l }, o >> a), yo({ width: c, height: f, data: l }, { width: c, height: f, data: i }, o >> a), go({ width: c, height: f, data: i }, { width: c, height: f, data: l }, o >> a), yo({ width: c, height: f, data: l }, { width: c, height: f, data: i }, o >> a); var d = s(i); if (!Array.isArray(d)) {
        var p = A(i);
        d = w(0, p, d), (d = g(0, Math.floor(p / d) * d, d)).shift();
    } return vo().thresholds(d).size([c, f])(i).map(h); } function h(t) { return t.value *= Math.pow(2, -2 * a), t.coordinates.forEach(d), t; } function d(t) { t.forEach(p); } function p(t) { t.forEach(v); } function v(t) { t[0] = t[0] * Math.pow(2, a) - u, t[1] = t[1] * Math.pow(2, a) - u; } function y() { return c = r + 2 * (u = 3 * o) >> a, f = i + 2 * u >> a, l; } return l.x = function (n) { return arguments.length ? (t = "function" == typeof n ? n : co(+n), l) : t; }, l.y = function (t) { return arguments.length ? (n = "function" == typeof t ? t : co(+t), l) : n; }, l.weight = function (t) { return arguments.length ? (e = "function" == typeof t ? t : co(+t), l) : e; }, l.size = function (t) { if (!arguments.length)
        return [r, i]; var n = Math.ceil(t[0]), e = Math.ceil(t[1]); if (!(n >= 0 || n >= 0))
        throw new Error("invalid size"); return r = n, i = e, y(); }, l.cellSize = function (t) { if (!arguments.length)
        return 1 << a; if (!((t = +t) >= 1))
        throw new Error("invalid cell size"); return a = Math.floor(Math.log(t) / Math.LN2), y(); }, l.thresholds = function (t) { return arguments.length ? (s = "function" == typeof t ? t : Array.isArray(t) ? co(ao.call(t)) : co(t), l) : s; }, l.bandwidth = function (t) { if (!arguments.length)
        return Math.sqrt(o * (o + 1)); if (!((t = +t) >= 0))
        throw new Error("invalid bandwidth"); return o = Math.round((Math.sqrt(4 * t * t + 1) - 1) / 2), y(); }, l; }, t.dispatch = I, t.drag = function () { var n, e, r, i, o = Gt, a = Vt, u = $t, c = Wt, f = {}, s = I("start", "drag", "end"), l = 0, h = 0; function d(t) { t.on("mousedown.drag", p).filter(c).on("touchstart.drag", y).on("touchmove.drag", _).on("touchend.drag touchcancel.drag", b).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)"); } function p() { if (!i && o.apply(this, arguments)) {
        var u = m("mouse", a.apply(this, arguments), Ot, this, arguments);
        u && (zt(t.event.view).on("mousemove.drag", v, !0).on("mouseup.drag", g, !0), It(t.event.view), Yt(), r = !1, n = t.event.clientX, e = t.event.clientY, u("start"));
    } } function v() { if (Ft(), !r) {
        var i = t.event.clientX - n, o = t.event.clientY - e;
        r = i * i + o * o > h;
    } f.mouse("drag"); } function g() { zt(t.event.view).on("mousemove.drag mouseup.drag", null), jt(t.event.view, r), Ft(), f.mouse("end"); } function y() { if (o.apply(this, arguments)) {
        var n, e, r = t.event.changedTouches, i = a.apply(this, arguments), u = r.length;
        for (n = 0; n < u; ++n)
            (e = m(r[n].identifier, i, Bt, this, arguments)) && (Yt(), e("start"));
    } } function _() { var n, e, r = t.event.changedTouches, i = r.length; for (n = 0; n < i; ++n)
        (e = f[r[n].identifier]) && (Ft(), e("drag")); } function b() { var n, e, r = t.event.changedTouches, o = r.length; for (i && clearTimeout(i), i = setTimeout(function () { i = null; }, 500), n = 0; n < o; ++n)
        (e = f[r[n].identifier]) && (Yt(), e("end")); } function m(n, e, r, i, o) { var a, c, h, p = r(e, n), v = s.copy(); if (St(new Xt(d, "beforestart", a, n, l, p[0], p[1], 0, 0, v), function () { return null != (t.event.subject = a = u.apply(i, o)) && (c = a.x - p[0] || 0, h = a.y - p[1] || 0, !0); }))
        return function t(u) { var s, g = p; switch (u) {
            case "start":
                f[n] = t, s = l++;
                break;
            case "end": delete f[n], --l;
            case "drag": p = r(e, n), s = l;
        } St(new Xt(d, u, a, n, s, p[0] + c, p[1] + h, p[0] - g[0], p[1] - g[1], v), v.apply, v, [u, i, o]); }; } return d.filter = function (t) { return arguments.length ? (o = "function" == typeof t ? t : Ht(!!t), d) : o; }, d.container = function (t) { return arguments.length ? (a = "function" == typeof t ? t : Ht(t), d) : a; }, d.subject = function (t) { return arguments.length ? (u = "function" == typeof t ? t : Ht(t), d) : u; }, d.touchable = function (t) { return arguments.length ? (c = "function" == typeof t ? t : Ht(!!t), d) : c; }, d.on = function () { var t = s.on.apply(s, arguments); return t === s ? d : t; }, d.clickDistance = function (t) { return arguments.length ? (h = (t = +t) * t, d) : Math.sqrt(h); }, d; }, t.dragDisable = It, t.dragEnable = jt, t.dsvFormat = Co, t.csvParse = zo, t.csvParseRows = Ro, t.csvFormat = Do, t.csvFormatBody = qo, t.csvFormatRows = Lo, t.tsvParse = Oo, t.tsvParseRows = Bo, t.tsvFormat = Yo, t.tsvFormatBody = Fo, t.tsvFormatRows = Io, t.autoType = function (t) { for (var n in t) {
        var e, r = t[n].trim();
        if (r)
            if ("true" === r)
                r = !0;
            else if ("false" === r)
                r = !1;
            else if ("NaN" === r)
                r = NaN;
            else if (isNaN(e = +r)) {
                if (!/^([-+]\d{2})?\d{4}(-\d{2}(-\d{2})?)?(T\d{2}:\d{2}(:\d{2}(\.\d{3})?)?(Z|[-+]\d{2}:\d{2})?)?$/.test(r))
                    continue;
                r = new Date(r);
            }
            else
                r = e;
        else
            r = null;
        t[n] = r;
    } return t; }, t.easeLinear = function (t) { return +t; }, t.easeQuad = Dr, t.easeQuadIn = function (t) { return t * t; }, t.easeQuadOut = function (t) { return t * (2 - t); }, t.easeQuadInOut = Dr, t.easeCubic = qr, t.easeCubicIn = function (t) { return t * t * t; }, t.easeCubicOut = function (t) { return --t * t * t + 1; }, t.easeCubicInOut = qr, t.easePoly = Or, t.easePolyIn = Lr, t.easePolyOut = Ur, t.easePolyInOut = Or, t.easeSin = Fr, t.easeSinIn = function (t) { return 1 - Math.cos(t * Yr); }, t.easeSinOut = function (t) { return Math.sin(t * Yr); }, t.easeSinInOut = Fr, t.easeExp = Ir, t.easeExpIn = function (t) { return Math.pow(2, 10 * t - 10); }, t.easeExpOut = function (t) { return 1 - Math.pow(2, -10 * t); }, t.easeExpInOut = Ir, t.easeCircle = jr, t.easeCircleIn = function (t) { return 1 - Math.sqrt(1 - t * t); }, t.easeCircleOut = function (t) { return Math.sqrt(1 - --t * t); }, t.easeCircleInOut = jr, t.easeBounce = ti, t.easeBounceIn = function (t) { return 1 - ti(1 - t); }, t.easeBounceOut = ti, t.easeBounceInOut = function (t) { return ((t *= 2) <= 1 ? 1 - ti(1 - t) : ti(t - 1) + 1) / 2; }, t.easeBack = ri, t.easeBackIn = ni, t.easeBackOut = ei, t.easeBackInOut = ri, t.easeElastic = ai, t.easeElasticIn = oi, t.easeElasticOut = ai, t.easeElasticInOut = ui, t.blob = function (t, n) { return fetch(t, n).then(jo); }, t.buffer = function (t, n) { return fetch(t, n).then(Ho); }, t.dsv = function (t, n, e, r) { 3 === arguments.length && "function" == typeof e && (r = e, e = void 0); var i = Co(t); return Go(n, e).then(function (t) { return i.parse(t, r); }); }, t.csv = $o, t.tsv = Wo, t.image = function (t, n) { return new Promise(function (e, r) { var i = new Image; for (var o in n)
        i[o] = n[o]; i.onerror = r, i.onload = function () { e(i); }, i.src = t; }); }, t.json = function (t, n) { return fetch(t, n).then(Zo); }, t.text = Go, t.xml = Jo, t.html = Ko, t.svg = ta, t.forceCenter = function (t, n) { var e; function r() { var r, i, o = e.length, a = 0, u = 0; for (r = 0; r < o; ++r)
        a += (i = e[r]).x, u += i.y; for (a = a / o - t, u = u / o - n, r = 0; r < o; ++r)
        (i = e[r]).x -= a, i.y -= u; } return null == t && (t = 0), null == n && (n = 0), r.initialize = function (t) { e = t; }, r.x = function (n) { return arguments.length ? (t = +n, r) : t; }, r.y = function (t) { return arguments.length ? (n = +t, r) : n; }, r; }, t.forceCollide = function (t) { var n, e, r = 1, i = 1; function o() { for (var t, o, u, c, f, s, l, h = n.length, d = 0; d < i; ++d)
        for (o = ua(n, la, ha).visitAfter(a), t = 0; t < h; ++t)
            u = n[t], s = e[u.index], l = s * s, c = u.x + u.vx, f = u.y + u.vy, o.visit(p); function p(t, n, e, i, o) { var a = t.data, h = t.r, d = s + h; if (!a)
        return n > c + d || i < c - d || e > f + d || o < f - d; if (a.index > u.index) {
        var p = c - a.x - a.vx, v = f - a.y - a.vy, g = p * p + v * v;
        g < d * d && (0 === p && (g += (p = ea()) * p), 0 === v && (g += (v = ea()) * v), g = (d - (g = Math.sqrt(g))) / g * r, u.vx += (p *= g) * (d = (h *= h) / (l + h)), u.vy += (v *= g) * d, a.vx -= p * (d = 1 - d), a.vy -= v * d);
    } } } function a(t) { if (t.data)
        return t.r = e[t.data.index]; for (var n = t.r = 0; n < 4; ++n)
        t[n] && t[n].r > t.r && (t.r = t[n].r); } function u() { if (n) {
        var r, i, o = n.length;
        for (e = new Array(o), r = 0; r < o; ++r)
            i = n[r], e[i.index] = +t(i, r, n);
    } } return "function" != typeof t && (t = na(null == t ? 1 : +t)), o.initialize = function (t) { n = t, u(); }, o.iterations = function (t) { return arguments.length ? (i = +t, o) : i; }, o.strength = function (t) { return arguments.length ? (r = +t, o) : r; }, o.radius = function (n) { return arguments.length ? (t = "function" == typeof n ? n : na(+n), u(), o) : t; }, o; }, t.forceLink = function (t) { var n, e, r, i, o, a = da, u = function (t) { return 1 / Math.min(i[t.source.index], i[t.target.index]); }, c = na(30), f = 1; function s(r) { for (var i = 0, a = t.length; i < f; ++i)
        for (var u, c, s, l, h, d, p, v = 0; v < a; ++v)
            c = (u = t[v]).source, l = (s = u.target).x + s.vx - c.x - c.vx || ea(), h = s.y + s.vy - c.y - c.vy || ea(), l *= d = ((d = Math.sqrt(l * l + h * h)) - e[v]) / d * r * n[v], h *= d, s.vx -= l * (p = o[v]), s.vy -= h * p, c.vx += l * (p = 1 - p), c.vy += h * p; } function l() { if (r) {
        var u, c, f = r.length, s = t.length, l = Ji(r, a);
        for (u = 0, i = new Array(f); u < s; ++u)
            (c = t[u]).index = u, "object" != typeof c.source && (c.source = pa(l, c.source)), "object" != typeof c.target && (c.target = pa(l, c.target)), i[c.source.index] = (i[c.source.index] || 0) + 1, i[c.target.index] = (i[c.target.index] || 0) + 1;
        for (u = 0, o = new Array(s); u < s; ++u)
            c = t[u], o[u] = i[c.source.index] / (i[c.source.index] + i[c.target.index]);
        n = new Array(s), h(), e = new Array(s), d();
    } } function h() { if (r)
        for (var e = 0, i = t.length; e < i; ++e)
            n[e] = +u(t[e], e, t); } function d() { if (r)
        for (var n = 0, i = t.length; n < i; ++n)
            e[n] = +c(t[n], n, t); } return null == t && (t = []), s.initialize = function (t) { r = t, l(); }, s.links = function (n) { return arguments.length ? (t = n, l(), s) : t; }, s.id = function (t) { return arguments.length ? (a = t, s) : a; }, s.iterations = function (t) { return arguments.length ? (f = +t, s) : f; }, s.strength = function (t) { return arguments.length ? (u = "function" == typeof t ? t : na(+t), h(), s) : u; }, s.distance = function (t) { return arguments.length ? (c = "function" == typeof t ? t : na(+t), d(), s) : c; }, s; }, t.forceManyBody = function () { var t, n, e, r, i = na(-30), o = 1, a = 1 / 0, u = .81; function c(r) { var i, o = t.length, a = ua(t, va, ga).visitAfter(s); for (e = r, i = 0; i < o; ++i)
        n = t[i], a.visit(l); } function f() { if (t) {
        var n, e, o = t.length;
        for (r = new Array(o), n = 0; n < o; ++n)
            e = t[n], r[e.index] = +i(e, n, t);
    } } function s(t) { var n, e, i, o, a, u = 0, c = 0; if (t.length) {
        for (i = o = a = 0; a < 4; ++a)
            (n = t[a]) && (e = Math.abs(n.value)) && (u += n.value, c += e, i += e * n.x, o += e * n.y);
        t.x = i / c, t.y = o / c;
    }
    else {
        (n = t).x = n.data.x, n.y = n.data.y;
        do {
            u += r[n.data.index];
        } while (n = n.next);
    } t.value = u; } function l(t, i, c, f) { if (!t.value)
        return !0; var s = t.x - n.x, l = t.y - n.y, h = f - i, d = s * s + l * l; if (h * h / u < d)
        return d < a && (0 === s && (d += (s = ea()) * s), 0 === l && (d += (l = ea()) * l), d < o && (d = Math.sqrt(o * d)), n.vx += s * t.value * e / d, n.vy += l * t.value * e / d), !0; if (!(t.length || d >= a)) {
        (t.data !== n || t.next) && (0 === s && (d += (s = ea()) * s), 0 === l && (d += (l = ea()) * l), d < o && (d = Math.sqrt(o * d)));
        do {
            t.data !== n && (h = r[t.data.index] * e / d, n.vx += s * h, n.vy += l * h);
        } while (t = t.next);
    } } return c.initialize = function (n) { t = n, f(); }, c.strength = function (t) { return arguments.length ? (i = "function" == typeof t ? t : na(+t), f(), c) : i; }, c.distanceMin = function (t) { return arguments.length ? (o = t * t, c) : Math.sqrt(o); }, c.distanceMax = function (t) { return arguments.length ? (a = t * t, c) : Math.sqrt(a); }, c.theta = function (t) { return arguments.length ? (u = t * t, c) : Math.sqrt(u); }, c; }, t.forceRadial = function (t, n, e) { var r, i, o, a = na(.1); function u(t) { for (var a = 0, u = r.length; a < u; ++a) {
        var c = r[a], f = c.x - n || 1e-6, s = c.y - e || 1e-6, l = Math.sqrt(f * f + s * s), h = (o[a] - l) * i[a] * t / l;
        c.vx += f * h, c.vy += s * h;
    } } function c() { if (r) {
        var n, e = r.length;
        for (i = new Array(e), o = new Array(e), n = 0; n < e; ++n)
            o[n] = +t(r[n], n, r), i[n] = isNaN(o[n]) ? 0 : +a(r[n], n, r);
    } } return "function" != typeof t && (t = na(+t)), null == n && (n = 0), null == e && (e = 0), u.initialize = function (t) { r = t, c(); }, u.strength = function (t) { return arguments.length ? (a = "function" == typeof t ? t : na(+t), c(), u) : a; }, u.radius = function (n) { return arguments.length ? (t = "function" == typeof n ? n : na(+n), c(), u) : t; }, u.x = function (t) { return arguments.length ? (n = +t, u) : n; }, u.y = function (t) { return arguments.length ? (e = +t, u) : e; }, u; }, t.forceSimulation = function (t) { var n, e = 1, r = .001, i = 1 - Math.pow(r, 1 / 300), o = 0, a = .6, u = Ji(), c = or(s), f = I("tick", "end"); function s() { l(), f.call("tick", n), e < r && (c.stop(), f.call("end", n)); } function l(r) { var c, f, s = t.length; void 0 === r && (r = 1); for (var l = 0; l < r; ++l)
        for (e += (o - e) * i, u.each(function (t) { t(e); }), c = 0; c < s; ++c)
            null == (f = t[c]).fx ? f.x += f.vx *= a : (f.x = f.fx, f.vx = 0), null == f.fy ? f.y += f.vy *= a : (f.y = f.fy, f.vy = 0); return n; } function h() { for (var n, e = 0, r = t.length; e < r; ++e) {
        if ((n = t[e]).index = e, null != n.fx && (n.x = n.fx), null != n.fy && (n.y = n.fy), isNaN(n.x) || isNaN(n.y)) {
            var i = ya * Math.sqrt(e), o = e * _a;
            n.x = i * Math.cos(o), n.y = i * Math.sin(o);
        }
        (isNaN(n.vx) || isNaN(n.vy)) && (n.vx = n.vy = 0);
    } } function d(n) { return n.initialize && n.initialize(t), n; } return null == t && (t = []), h(), n = { tick: l, restart: function () { return c.restart(s), n; }, stop: function () { return c.stop(), n; }, nodes: function (e) { return arguments.length ? (t = e, h(), u.each(d), n) : t; }, alpha: function (t) { return arguments.length ? (e = +t, n) : e; }, alphaMin: function (t) { return arguments.length ? (r = +t, n) : r; }, alphaDecay: function (t) { return arguments.length ? (i = +t, n) : +i; }, alphaTarget: function (t) { return arguments.length ? (o = +t, n) : o; }, velocityDecay: function (t) { return arguments.length ? (a = 1 - t, n) : 1 - a; }, force: function (t, e) { return arguments.length > 1 ? (null == e ? u.remove(t) : u.set(t, d(e)), n) : u.get(t); }, find: function (n, e, r) { var i, o, a, u, c, f = 0, s = t.length; for (null == r ? r = 1 / 0 : r *= r, f = 0; f < s; ++f)
            (a = (i = n - (u = t[f]).x) * i + (o = e - u.y) * o) < r && (c = u, r = a); return c; }, on: function (t, e) { return arguments.length > 1 ? (f.on(t, e), n) : f.on(t); } }; }, t.forceX = function (t) { var n, e, r, i = na(.1); function o(t) { for (var i, o = 0, a = n.length; o < a; ++o)
        (i = n[o]).vx += (r[o] - i.x) * e[o] * t; } function a() { if (n) {
        var o, a = n.length;
        for (e = new Array(a), r = new Array(a), o = 0; o < a; ++o)
            e[o] = isNaN(r[o] = +t(n[o], o, n)) ? 0 : +i(n[o], o, n);
    } } return "function" != typeof t && (t = na(null == t ? 0 : +t)), o.initialize = function (t) { n = t, a(); }, o.strength = function (t) { return arguments.length ? (i = "function" == typeof t ? t : na(+t), a(), o) : i; }, o.x = function (n) { return arguments.length ? (t = "function" == typeof n ? n : na(+n), a(), o) : t; }, o; }, t.forceY = function (t) { var n, e, r, i = na(.1); function o(t) { for (var i, o = 0, a = n.length; o < a; ++o)
        (i = n[o]).vy += (r[o] - i.y) * e[o] * t; } function a() { if (n) {
        var o, a = n.length;
        for (e = new Array(a), r = new Array(a), o = 0; o < a; ++o)
            e[o] = isNaN(r[o] = +t(n[o], o, n)) ? 0 : +i(n[o], o, n);
    } } return "function" != typeof t && (t = na(null == t ? 0 : +t)), o.initialize = function (t) { n = t, a(); }, o.strength = function (t) { return arguments.length ? (i = "function" == typeof t ? t : na(+t), a(), o) : i; }, o.y = function (n) { return arguments.length ? (t = "function" == typeof n ? n : na(+n), a(), o) : t; }, o; }, t.formatDefaultLocale = Pa, t.formatLocale = Ca, t.formatSpecifier = Ma, t.precisionFixed = za, t.precisionPrefix = Ra, t.precisionRound = Da, t.geoArea = function (t) { return xu.reset(), pu(t, wu), 2 * xu; }, t.geoBounds = function (t) { var n, e, r, i, o, a, u; if (Uu = Lu = -(Du = qu = 1 / 0), Iu = [], pu(t, uc), e = Iu.length) {
        for (Iu.sort(gc), n = 1, o = [r = Iu[0]]; n < e; ++n)
            yc(r, (i = Iu[n])[0]) || yc(r, i[1]) ? (vc(r[0], i[1]) > vc(r[0], r[1]) && (r[1] = i[1]), vc(i[0], r[1]) > vc(r[0], r[1]) && (r[0] = i[0])) : o.push(r = i);
        for (a = -1 / 0, n = 0, r = o[e = o.length - 1]; n <= e; r = i, ++n)
            i = o[n], (u = vc(r[1], i[0])) > a && (a = u, Du = i[0], Lu = r[1]);
    } return Iu = ju = null, Du === 1 / 0 || qu === 1 / 0 ? [[NaN, NaN], [NaN, NaN]] : [[Du, qu], [Lu, Uu]]; }, t.geoCentroid = function (t) { Hu = Xu = Gu = Vu = $u = Wu = Zu = Qu = Ju = Ku = tc = 0, pu(t, _c); var n = Ju, e = Ku, r = tc, i = n * n + e * e + r * r; return i < Ya && (n = Wu, e = Zu, r = Qu, Xu < Ba && (n = Gu, e = Vu, r = $u), (i = n * n + e * e + r * r) < Ya) ? [NaN, NaN] : [Wa(e, n) * Xa, au(r / ru(i)) * Xa]; }, t.geoCircle = function () { var t, n, e = Ec([0, 0]), r = Ec(90), i = Ec(6), o = { point: function (e, r) { t.push(e = n(e, r)), e[0] *= Xa, e[1] *= Xa; } }; function a() { var a = e.apply(this, arguments), u = r.apply(this, arguments) * Ga, c = i.apply(this, arguments) * Ga; return t = [], n = zc(-a[0] * Ga, -a[1] * Ga, 0).invert, Uc(o, u, c, 1), a = { type: "Polygon", coordinates: [t] }, t = n = null, a; } return a.center = function (t) { return arguments.length ? (e = "function" == typeof t ? t : Ec([+t[0], +t[1]]), a) : e; }, a.radius = function (t) { return arguments.length ? (r = "function" == typeof t ? t : Ec(+t), a) : r; }, a.precision = function (t) { return arguments.length ? (i = "function" == typeof t ? t : Ec(+t), a) : i; }, a; }, t.geoClipAntimeridian = Zc, t.geoClipCircle = Qc, t.geoClipExtent = function () { var t, n, e, r = 0, i = 0, o = 960, a = 500; return e = { stream: function (e) { return t && n === e ? t : t = tf(r, i, o, a)(n = e); }, extent: function (u) { return arguments.length ? (r = +u[0][0], i = +u[0][1], o = +u[1][0], a = +u[1][1], t = n = null, e) : [[r, i], [o, a]]; } }; }, t.geoClipRectangle = tf, t.geoContains = function (t, n) { return (t && pf.hasOwnProperty(t.type) ? pf[t.type] : gf)(t, n); }, t.geoDistance = df, t.geoGraticule = Nf, t.geoGraticule10 = function () { return Nf()(); }, t.geoInterpolate = function (t, n) { var e = t[0] * Ga, r = t[1] * Ga, i = n[0] * Ga, o = n[1] * Ga, a = Za(r), u = nu(r), c = Za(o), f = nu(o), s = a * Za(e), l = a * nu(e), h = c * Za(i), d = c * nu(i), p = 2 * au(ru(uu(o - r) + a * c * uu(i - e))), v = nu(p), g = p ? function (t) { var n = nu(t *= p) / v, e = nu(p - t) / v, r = e * s + n * h, i = e * l + n * d, o = e * u + n * f; return [Wa(i, r) * Xa, Wa(o, ru(r * r + i * i)) * Xa]; } : function () { return [e * Xa, r * Xa]; }; return g.distance = p, g; }, t.geoLength = sf, t.geoPath = function (t, n) { var e, r, i = 4.5; function o(t) { return t && ("function" == typeof i && r.pointRadius(+i.apply(this, arguments)), pu(t, e(r))), r.result(); } return o.area = function (t) { return pu(t, e(zf)), zf.result(); }, o.measure = function (t) { return pu(t, e(_s)), _s.result(); }, o.bounds = function (t) { return pu(t, e(Ff)), Ff.result(); }, o.centroid = function (t) { return pu(t, e(ns)), ns.result(); }, o.projection = function (n) { return arguments.length ? (e = null == n ? (t = null, Af) : (t = n).stream, o) : t; }, o.context = function (t) { return arguments.length ? (r = null == t ? (n = null, new xs) : new ls(n = t), "function" != typeof i && r.pointRadius(i), o) : n; }, o.pointRadius = function (t) { return arguments.length ? (i = "function" == typeof t ? t : (r.pointRadius(+t), +t), o) : i; }, o.projection(t).context(n); }, t.geoAlbers = Ys, t.geoAlbersUsa = function () { var t, n, e, r, i, o, a = Ys(), u = Bs().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]), c = Bs().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]), f = { point: function (t, n) { o = [t, n]; } }; function s(t) { var n = t[0], a = t[1]; return o = null, e.point(n, a), o || (r.point(n, a), o) || (i.point(n, a), o); } function l() { return t = n = null, s; } return s.invert = function (t) { var n = a.scale(), e = a.translate(), r = (t[0] - e[0]) / n, i = (t[1] - e[1]) / n; return (i >= .12 && i < .234 && r >= -.425 && r < -.214 ? u : i >= .166 && i < .234 && r >= -.214 && r < -.115 ? c : a).invert(t); }, s.stream = function (e) { return t && n === e ? t : (r = [a.stream(n = e), u.stream(e), c.stream(e)], i = r.length, t = { point: function (t, n) { for (var e = -1; ++e < i;)
            r[e].point(t, n); }, sphere: function () { for (var t = -1; ++t < i;)
            r[t].sphere(); }, lineStart: function () { for (var t = -1; ++t < i;)
            r[t].lineStart(); }, lineEnd: function () { for (var t = -1; ++t < i;)
            r[t].lineEnd(); }, polygonStart: function () { for (var t = -1; ++t < i;)
            r[t].polygonStart(); }, polygonEnd: function () { for (var t = -1; ++t < i;)
            r[t].polygonEnd(); } }); var r, i; }, s.precision = function (t) { return arguments.length ? (a.precision(t), u.precision(t), c.precision(t), l()) : a.precision(); }, s.scale = function (t) { return arguments.length ? (a.scale(t), u.scale(.35 * t), c.scale(t), s.translate(a.translate())) : a.scale(); }, s.translate = function (t) { if (!arguments.length)
        return a.translate(); var n = a.scale(), o = +t[0], s = +t[1]; return e = a.translate(t).clipExtent([[o - .455 * n, s - .238 * n], [o + .455 * n, s + .238 * n]]).stream(f), r = u.translate([o - .307 * n, s + .201 * n]).clipExtent([[o - .425 * n + Ba, s + .12 * n + Ba], [o - .214 * n - Ba, s + .234 * n - Ba]]).stream(f), i = c.translate([o - .205 * n, s + .212 * n]).clipExtent([[o - .214 * n + Ba, s + .166 * n + Ba], [o - .115 * n - Ba, s + .234 * n - Ba]]).stream(f), l(); }, s.fitExtent = function (t, n) { return Ts(s, t, n); }, s.fitSize = function (t, n) { return Ss(s, t, n); }, s.fitWidth = function (t, n) { return ks(s, t, n); }, s.fitHeight = function (t, n) { return Es(s, t, n); }, s.scale(1070); }, t.geoAzimuthalEqualArea = function () { return qs(js).scale(124.75).clipAngle(179.999); }, t.geoAzimuthalEqualAreaRaw = js, t.geoAzimuthalEquidistant = function () { return qs(Hs).scale(79.4188).clipAngle(179.999); }, t.geoAzimuthalEquidistantRaw = Hs, t.geoConicConformal = function () { return Us($s).scale(109.5).parallels([30, 30]); }, t.geoConicConformalRaw = $s, t.geoConicEqualArea = Bs, t.geoConicEqualAreaRaw = Os, t.geoConicEquidistant = function () { return Us(Zs).scale(131.154).center([0, 13.9389]); }, t.geoConicEquidistantRaw = Zs, t.geoEqualEarth = function () { return qs(el).scale(177.158); }, t.geoEqualEarthRaw = el, t.geoEquirectangular = function () { return qs(Ws).scale(152.63); }, t.geoEquirectangularRaw = Ws, t.geoGnomonic = function () { return qs(rl).scale(144.049).clipAngle(60); }, t.geoGnomonicRaw = rl, t.geoIdentity = function () { var t, n, e, r, i, o, a = 1, u = 0, c = 0, f = 1, s = 1, l = Af, h = null, d = Af; function p() { return r = i = null, o; } return o = { stream: function (t) { return r && i === t ? r : r = l(d(i = t)); }, postclip: function (r) { return arguments.length ? (d = r, h = t = n = e = null, p()) : d; }, clipExtent: function (r) { return arguments.length ? (d = null == r ? (h = t = n = e = null, Af) : tf(h = +r[0][0], t = +r[0][1], n = +r[1][0], e = +r[1][1]), p()) : null == h ? null : [[h, t], [n, e]]; }, scale: function (t) { return arguments.length ? (l = il((a = +t) * f, a * s, u, c), p()) : a; }, translate: function (t) { return arguments.length ? (l = il(a * f, a * s, u = +t[0], c = +t[1]), p()) : [u, c]; }, reflectX: function (t) { return arguments.length ? (l = il(a * (f = t ? -1 : 1), a * s, u, c), p()) : f < 0; }, reflectY: function (t) { return arguments.length ? (l = il(a * f, a * (s = t ? -1 : 1), u, c), p()) : s < 0; }, fitExtent: function (t, n) { return Ts(o, t, n); }, fitSize: function (t, n) { return Ss(o, t, n); }, fitWidth: function (t, n) { return ks(o, t, n); }, fitHeight: function (t, n) { return Es(o, t, n); } }; }, t.geoProjection = qs, t.geoProjectionMutator = Ls, t.geoMercator = function () { return Gs(Xs).scale(961 / Ha); }, t.geoMercatorRaw = Xs, t.geoNaturalEarth1 = function () { return qs(ol).scale(175.295); }, t.geoNaturalEarth1Raw = ol, t.geoOrthographic = function () { return qs(al).scale(249.5).clipAngle(90 + Ba); }, t.geoOrthographicRaw = al, t.geoStereographic = function () { return qs(ul).scale(250).clipAngle(142); }, t.geoStereographicRaw = ul, t.geoTransverseMercator = function () { var t = Gs(cl), n = t.center, e = t.rotate; return t.center = function (t) { return arguments.length ? n([-t[1], t[0]]) : [(t = n())[1], -t[0]]; }, t.rotate = function (t) { return arguments.length ? e([t[0], t[1], t.length > 2 ? t[2] + 90 : 90]) : [(t = e())[0], t[1], t[2] - 90]; }, e([0, 0, 90]).scale(159.155); }, t.geoTransverseMercatorRaw = cl, t.geoRotation = Lc, t.geoStream = pu, t.geoTransform = function (t) { return { stream: Ms(t) }; }, t.cluster = function () { var t = fl, n = 1, e = 1, r = !1; function i(i) { var o, a = 0; i.eachAfter(function (n) { var e = n.children; e ? (n.x = function (t) { return t.reduce(sl, 0) / t.length; }(e), n.y = function (t) { return 1 + t.reduce(ll, 0); }(e)) : (n.x = o ? a += t(n, o) : 0, n.y = 0, o = n); }); var u = function (t) { for (var n; n = t.children;)
        t = n[0]; return t; }(i), c = function (t) { for (var n; n = t.children;)
        t = n[n.length - 1]; return t; }(i), f = u.x - t(u, c) / 2, s = c.x + t(c, u) / 2; return i.eachAfter(r ? function (t) { t.x = (t.x - i.x) * n, t.y = (i.y - t.y) * e; } : function (t) { t.x = (t.x - f) / (s - f) * n, t.y = (1 - (i.y ? t.y / i.y : 1)) * e; }); } return i.separation = function (n) { return arguments.length ? (t = n, i) : t; }, i.size = function (t) { return arguments.length ? (r = !1, n = +t[0], e = +t[1], i) : r ? null : [n, e]; }, i.nodeSize = function (t) { return arguments.length ? (r = !0, n = +t[0], e = +t[1], i) : r ? [n, e] : null; }, i; }, t.hierarchy = dl, t.pack = function () { var t = null, n = 1, e = 1, r = Rl; function i(i) { return i.x = n / 2, i.y = e / 2, t ? i.eachBefore(Ll(t)).eachAfter(Ul(r, .5)).eachBefore(Ol(1)) : i.eachBefore(Ll(ql)).eachAfter(Ul(Rl, 1)).eachAfter(Ul(r, i.r / Math.min(n, e))).eachBefore(Ol(Math.min(n, e) / (2 * i.r))), i; } return i.radius = function (n) { return arguments.length ? (t = null == (e = n) ? null : zl(e), i) : t; var e; }, i.size = function (t) { return arguments.length ? (n = +t[0], e = +t[1], i) : [n, e]; }, i.padding = function (t) { return arguments.length ? (r = "function" == typeof t ? t : Dl(+t), i) : r; }, i; }, t.packSiblings = function (t) { return Pl(t), t; }, t.packEnclose = bl, t.partition = function () { var t = 1, n = 1, e = 0, r = !1; function i(i) { var o = i.height + 1; return i.x0 = i.y0 = e, i.x1 = t, i.y1 = n / o, i.eachBefore(function (t, n) { return function (r) { r.children && Yl(r, r.x0, t * (r.depth + 1) / n, r.x1, t * (r.depth + 2) / n); var i = r.x0, o = r.y0, a = r.x1 - e, u = r.y1 - e; a < i && (i = a = (i + a) / 2), u < o && (o = u = (o + u) / 2), r.x0 = i, r.y0 = o, r.x1 = a, r.y1 = u; }; }(n, o)), r && i.eachBefore(Bl), i; } return i.round = function (t) { return arguments.length ? (r = !!t, i) : r; }, i.size = function (e) { return arguments.length ? (t = +e[0], n = +e[1], i) : [t, n]; }, i.padding = function (t) { return arguments.length ? (e = +t, i) : e; }, i; }, t.stratify = function () { var t = Hl, n = Xl; function e(e) { var r, i, o, a, u, c, f, s = e.length, l = new Array(s), h = {}; for (i = 0; i < s; ++i)
        r = e[i], u = l[i] = new yl(r), null != (c = t(r, i, e)) && (c += "") && (h[f = Fl + (u.id = c)] = f in h ? jl : u); for (i = 0; i < s; ++i)
        if (u = l[i], null != (c = n(e[i], i, e)) && (c += "")) {
            if (!(a = h[Fl + c]))
                throw new Error("missing: " + c);
            if (a === jl)
                throw new Error("ambiguous: " + c);
            a.children ? a.children.push(u) : a.children = [u], u.parent = a;
        }
        else {
            if (o)
                throw new Error("multiple roots");
            o = u;
        } if (!o)
        throw new Error("no root"); if (o.parent = Il, o.eachBefore(function (t) { t.depth = t.parent.depth + 1, --s; }).eachBefore(gl), o.parent = null, s > 0)
        throw new Error("cycle"); return o; } return e.id = function (n) { return arguments.length ? (t = zl(n), e) : t; }, e.parentId = function (t) { return arguments.length ? (n = zl(t), e) : n; }, e; }, t.tree = function () { var t = Gl, n = 1, e = 1, r = null; function i(i) { var c = function (t) { for (var n, e, r, i, o, a = new Ql(t, 0), u = [a]; n = u.pop();)
        if (r = n._.children)
            for (n.children = new Array(o = r.length), i = o - 1; i >= 0; --i)
                u.push(e = n.children[i] = new Ql(r[i], i)), e.parent = n; return (a.parent = new Ql(null, 0)).children = [a], a; }(i); if (c.eachAfter(o), c.parent.m = -c.z, c.eachBefore(a), r)
        i.eachBefore(u);
    else {
        var f = i, s = i, l = i;
        i.eachBefore(function (t) { t.x < f.x && (f = t), t.x > s.x && (s = t), t.depth > l.depth && (l = t); });
        var h = f === s ? 1 : t(f, s) / 2, d = h - f.x, p = n / (s.x + h + d), v = e / (l.depth || 1);
        i.eachBefore(function (t) { t.x = (t.x + d) * p, t.y = t.depth * v; });
    } return i; } function o(n) { var e = n.children, r = n.parent.children, i = n.i ? r[n.i - 1] : null; if (e) {
        !function (t) { for (var n, e = 0, r = 0, i = t.children, o = i.length; --o >= 0;)
            (n = i[o]).z += e, n.m += e, e += n.s + (r += n.c); }(n);
        var o = (e[0].z + e[e.length - 1].z) / 2;
        i ? (n.z = i.z + t(n._, i._), n.m = n.z - o) : n.z = o;
    }
    else
        i && (n.z = i.z + t(n._, i._)); n.parent.A = function (n, e, r) { if (e) {
        for (var i, o = n, a = n, u = e, c = o.parent.children[0], f = o.m, s = a.m, l = u.m, h = c.m; u = $l(u), o = Vl(o), u && o;)
            c = Vl(c), (a = $l(a)).a = n, (i = u.z + l - o.z - f + t(u._, o._)) > 0 && (Wl(Zl(u, n, r), n, i), f += i, s += i), l += u.m, f += o.m, h += c.m, s += a.m;
        u && !$l(a) && (a.t = u, a.m += l - s), o && !Vl(c) && (c.t = o, c.m += f - h, r = n);
    } return r; }(n, i, n.parent.A || r[0]); } function a(t) { t._.x = t.z + t.parent.m, t.m += t.parent.m; } function u(t) { t.x *= n, t.y = t.depth * e; } return i.separation = function (n) { return arguments.length ? (t = n, i) : t; }, i.size = function (t) { return arguments.length ? (r = !1, n = +t[0], e = +t[1], i) : r ? null : [n, e]; }, i.nodeSize = function (t) { return arguments.length ? (r = !0, n = +t[0], e = +t[1], i) : r ? [n, e] : null; }, i; }, t.treemap = function () { var t = nh, n = !1, e = 1, r = 1, i = [0], o = Rl, a = Rl, u = Rl, c = Rl, f = Rl; function s(t) { return t.x0 = t.y0 = 0, t.x1 = e, t.y1 = r, t.eachBefore(l), i = [0], n && t.eachBefore(Bl), t; } function l(n) { var e = i[n.depth], r = n.x0 + e, s = n.y0 + e, l = n.x1 - e, h = n.y1 - e; l < r && (r = l = (r + l) / 2), h < s && (s = h = (s + h) / 2), n.x0 = r, n.y0 = s, n.x1 = l, n.y1 = h, n.children && (e = i[n.depth + 1] = o(n) / 2, r += f(n) - e, s += a(n) - e, (l -= u(n) - e) < r && (r = l = (r + l) / 2), (h -= c(n) - e) < s && (s = h = (s + h) / 2), t(n, r, s, l, h)); } return s.round = function (t) { return arguments.length ? (n = !!t, s) : n; }, s.size = function (t) { return arguments.length ? (e = +t[0], r = +t[1], s) : [e, r]; }, s.tile = function (n) { return arguments.length ? (t = zl(n), s) : t; }, s.padding = function (t) { return arguments.length ? s.paddingInner(t).paddingOuter(t) : s.paddingInner(); }, s.paddingInner = function (t) { return arguments.length ? (o = "function" == typeof t ? t : Dl(+t), s) : o; }, s.paddingOuter = function (t) { return arguments.length ? s.paddingTop(t).paddingRight(t).paddingBottom(t).paddingLeft(t) : s.paddingTop(); }, s.paddingTop = function (t) { return arguments.length ? (a = "function" == typeof t ? t : Dl(+t), s) : a; }, s.paddingRight = function (t) { return arguments.length ? (u = "function" == typeof t ? t : Dl(+t), s) : u; }, s.paddingBottom = function (t) { return arguments.length ? (c = "function" == typeof t ? t : Dl(+t), s) : c; }, s.paddingLeft = function (t) { return arguments.length ? (f = "function" == typeof t ? t : Dl(+t), s) : f; }, s; }, t.treemapBinary = function (t, n, e, r, i) { var o, a, u = t.children, c = u.length, f = new Array(c + 1); for (f[0] = a = o = 0; o < c; ++o)
        f[o + 1] = a += u[o].value; !function t(n, e, r, i, o, a, c) { if (n >= e - 1) {
        var s = u[n];
        return s.x0 = i, s.y0 = o, s.x1 = a, void (s.y1 = c);
    } for (var l = f[n], h = r / 2 + l, d = n + 1, p = e - 1; d < p;) {
        var v = d + p >>> 1;
        f[v] < h ? d = v + 1 : p = v;
    } h - f[d - 1] < f[d] - h && n + 1 < d && --d; var g = f[d] - l, y = r - g; if (a - i > c - o) {
        var _ = (i * y + a * g) / r;
        t(n, d, g, i, o, _, c), t(d, e, y, _, o, a, c);
    }
    else {
        var b = (o * y + c * g) / r;
        t(n, d, g, i, o, a, b), t(d, e, y, i, b, a, c);
    } }(0, c, t.value, n, e, r, i); }, t.treemapDice = Yl, t.treemapSlice = Jl, t.treemapSliceDice = function (t, n, e, r, i) { (1 & t.depth ? Jl : Yl)(t, n, e, r, i); }, t.treemapSquarify = nh, t.treemapResquarify = eh, t.interpolate = _e, t.interpolateArray = le, t.interpolateBasis = te, t.interpolateBasisClosed = ne, t.interpolateDate = he, t.interpolateDiscrete = function (t) { var n = t.length; return function (e) { return t[Math.max(0, Math.min(n - 1, Math.floor(e * n)))]; }; }, t.interpolateHue = function (t, n) { var e = ie(+t, +n); return function (t) { var n = e(t); return n - 360 * Math.floor(n / 360); }; }, t.interpolateNumber = de, t.interpolateObject = pe, t.interpolateRound = be, t.interpolateString = ye, t.interpolateTransformCss = ke, t.interpolateTransformSvg = Ee, t.interpolateZoom = qe, t.interpolateRgb = ue, t.interpolateRgbBasis = fe, t.interpolateRgbBasisClosed = se, t.interpolateHsl = Ue, t.interpolateHslLong = Oe, t.interpolateLab = function (t, n) { var e = ae((t = Rn(t)).l, (n = Rn(n)).l), r = ae(t.a, n.a), i = ae(t.b, n.b), o = ae(t.opacity, n.opacity); return function (n) { return t.l = e(n), t.a = r(n), t.b = i(n), t.opacity = o(n), t + ""; }; }, t.interpolateHcl = Ye, t.interpolateHclLong = Fe, t.interpolateCubehelix = je, t.interpolateCubehelixLong = He, t.piecewise = function (t, n) { for (var e = 0, r = n.length - 1, i = n[0], o = new Array(r < 0 ? 0 : r); e < r;)
        o[e] = t(i, i = n[++e]); return function (t) { var n = Math.max(0, Math.min(r - 1, Math.floor(t *= r))); return o[n](t - n); }; }, t.quantize = function (t, n) { for (var e = new Array(n), r = 0; r < n; ++r)
        e[r] = t(r / (n - 1)); return e; }, t.path = Xi, t.polygonArea = function (t) { for (var n, e = -1, r = t.length, i = t[r - 1], o = 0; ++e < r;)
        n = i, i = t[e], o += n[1] * i[0] - n[0] * i[1]; return o / 2; }, t.polygonCentroid = function (t) { for (var n, e, r = -1, i = t.length, o = 0, a = 0, u = t[i - 1], c = 0; ++r < i;)
        n = u, u = t[r], c += e = n[0] * u[1] - u[0] * n[1], o += (n[0] + u[0]) * e, a += (n[1] + u[1]) * e; return [o / (c *= 3), a / c]; }, t.polygonHull = function (t) { if ((e = t.length) < 3)
        return null; var n, e, r = new Array(e), i = new Array(e); for (n = 0; n < e; ++n)
        r[n] = [+t[n][0], +t[n][1], n]; for (r.sort(rh), n = 0; n < e; ++n)
        i[n] = [r[n][0], -r[n][1]]; var o = ih(r), a = ih(i), u = a[0] === o[0], c = a[a.length - 1] === o[o.length - 1], f = []; for (n = o.length - 1; n >= 0; --n)
        f.push(t[r[o[n]][2]]); for (n = +u; n < a.length - c; ++n)
        f.push(t[r[a[n]][2]]); return f; }, t.polygonContains = function (t, n) { for (var e, r, i = t.length, o = t[i - 1], a = n[0], u = n[1], c = o[0], f = o[1], s = !1, l = 0; l < i; ++l)
        e = (o = t[l])[0], (r = o[1]) > u != f > u && a < (c - e) * (u - r) / (f - r) + e && (s = !s), c = e, f = r; return s; }, t.polygonLength = function (t) { for (var n, e, r = -1, i = t.length, o = t[i - 1], a = o[0], u = o[1], c = 0; ++r < i;)
        n = a, e = u, n -= a = (o = t[r])[0], e -= u = o[1], c += Math.sqrt(n * n + e * e); return c; }, t.quadtree = ua, t.randomUniform = ah, t.randomNormal = uh, t.randomLogNormal = ch, t.randomBates = sh, t.randomIrwinHall = fh, t.randomExponential = lh, t.scaleBand = bh, t.scalePoint = function () { return function t(n) { var e = n.copy; return n.padding = n.paddingOuter, delete n.paddingInner, delete n.paddingOuter, n.copy = function () { return t(e()); }, n; }(bh.apply(null, arguments).paddingInner(1)); }, t.scaleIdentity = function t(n) { var e; function r(t) { return isNaN(t = +t) ? e : t; } return r.invert = r, r.domain = r.range = function (t) { return arguments.length ? (n = vh.call(t, mh), r) : n.slice(); }, r.unknown = function (t) { return arguments.length ? (e = t, r) : e; }, r.copy = function () { return t(n).unknown(e); }, n = arguments.length ? vh.call(n, mh) : [0, 1], Ph(r); }, t.scaleLinear = function t() { var n = Eh(wh, wh); return n.copy = function () { return Sh(n, t()); }, hh.apply(n, arguments), Ph(n); }, t.scaleLog = function t() { var n = Bh(kh()).domain([1, 10]); return n.copy = function () { return Sh(n, t()).base(n.base()); }, hh.apply(n, arguments), n; }, t.scaleSymlog = function t() { var n = Ih(kh()); return n.copy = function () { return Sh(n, t()).constant(n.constant()); }, hh.apply(n, arguments); }, t.scaleOrdinal = _h, t.scaleImplicit = yh, t.scalePow = Vh, t.scaleSqrt = function () { return Vh.apply(null, arguments).exponent(.5); }, t.scaleQuantile = function t() { var e, r = [], o = [], a = []; function u() { var t = 0, n = Math.max(1, o.length); for (a = new Array(n - 1); ++t < n;)
        a[t - 1] = N(r, t / n); return c; } function c(t) { return isNaN(t = +t) ? e : o[i(a, t)]; } return c.invertExtent = function (t) { var n = o.indexOf(t); return n < 0 ? [NaN, NaN] : [n > 0 ? a[n - 1] : r[0], n < a.length ? a[n] : r[r.length - 1]]; }, c.domain = function (t) { if (!arguments.length)
        return r.slice(); r = []; for (var e, i = 0, o = t.length; i < o; ++i)
        null == (e = t[i]) || isNaN(e = +e) || r.push(e); return r.sort(n), u(); }, c.range = function (t) { return arguments.length ? (o = gh.call(t), u()) : o.slice(); }, c.unknown = function (t) { return arguments.length ? (e = t, c) : e; }, c.quantiles = function () { return a.slice(); }, c.copy = function () { return t().domain(r).range(o).unknown(e); }, hh.apply(c, arguments); }, t.scaleQuantize = function t() { var n, e = 0, r = 1, o = 1, a = [.5], u = [0, 1]; function c(t) { return t <= t ? u[i(a, t, 0, o)] : n; } function f() { var t = -1; for (a = new Array(o); ++t < o;)
        a[t] = ((t + 1) * r - (t - o) * e) / (o + 1); return c; } return c.domain = function (t) { return arguments.length ? (e = +t[0], r = +t[1], f()) : [e, r]; }, c.range = function (t) { return arguments.length ? (o = (u = gh.call(t)).length - 1, f()) : u.slice(); }, c.invertExtent = function (t) { var n = u.indexOf(t); return n < 0 ? [NaN, NaN] : n < 1 ? [e, a[0]] : n >= o ? [a[o - 1], r] : [a[n - 1], a[n]]; }, c.unknown = function (t) { return arguments.length ? (n = t, c) : c; }, c.thresholds = function () { return a.slice(); }, c.copy = function () { return t().domain([e, r]).range(u).unknown(n); }, hh.apply(Ph(c), arguments); }, t.scaleThreshold = function t() { var n, e = [.5], r = [0, 1], o = 1; function a(t) { return t <= t ? r[i(e, t, 0, o)] : n; } return a.domain = function (t) { return arguments.length ? (e = gh.call(t), o = Math.min(e.length, r.length - 1), a) : e.slice(); }, a.range = function (t) { return arguments.length ? (r = gh.call(t), o = Math.min(e.length, r.length - 1), a) : r.slice(); }, a.invertExtent = function (t) { var n = r.indexOf(t); return [e[n - 1], e[n]]; }, a.unknown = function (t) { return arguments.length ? (n = t, a) : n; }, a.copy = function () { return t().domain(e).range(r).unknown(n); }, hh.apply(a, arguments); }, t.scaleTime = function () { return hh.apply(Tv(Td, Nd, sd, ud, od, rd, nd, Qh, t.timeFormat).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments); }, t.scaleUtc = function () { return hh.apply(Tv(Qd, Wd, qd, zd, Cd, kd, nd, Qh, t.utcFormat).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]), arguments); }, t.scaleSequential = function t() { var n = Ph(Sv()(wh)); return n.copy = function () { return kv(n, t()); }, dh.apply(n, arguments); }, t.scaleSequentialLog = function t() { var n = Bh(Sv()).domain([1, 10]); return n.copy = function () { return kv(n, t()).base(n.base()); }, dh.apply(n, arguments); }, t.scaleSequentialPow = Ev, t.scaleSequentialSqrt = function () { return Ev.apply(null, arguments).exponent(.5); }, t.scaleSequentialSymlog = function t() { var n = Ih(Sv()); return n.copy = function () { return kv(n, t()).constant(n.constant()); }, dh.apply(n, arguments); }, t.scaleSequentialQuantile = function t() { var e = [], r = wh; function o(t) { if (!isNaN(t = +t))
        return r((i(e, t) - 1) / (e.length - 1)); } return o.domain = function (t) { if (!arguments.length)
        return e.slice(); e = []; for (var r, i = 0, a = t.length; i < a; ++i)
        null == (r = t[i]) || isNaN(r = +r) || e.push(r); return e.sort(n), o; }, o.interpolator = function (t) { return arguments.length ? (r = t, o) : r; }, o.copy = function () { return t(r).domain(e); }, dh.apply(o, arguments); }, t.scaleDiverging = function t() { var n = Ph(Cv()(wh)); return n.copy = function () { return kv(n, t()); }, dh.apply(n, arguments); }, t.scaleDivergingLog = function t() { var n = Bh(Cv()).domain([.1, 1, 10]); return n.copy = function () { return kv(n, t()).base(n.base()); }, dh.apply(n, arguments); }, t.scaleDivergingPow = Pv, t.scaleDivergingSqrt = function () { return Pv.apply(null, arguments).exponent(.5); }, t.scaleDivergingSymlog = function t() { var n = Ih(Cv()); return n.copy = function () { return kv(n, t()).constant(n.constant()); }, dh.apply(n, arguments); }, t.tickFormat = Ch, t.schemeCategory10 = Rv, t.schemeAccent = Dv, t.schemeDark2 = qv, t.schemePaired = Lv, t.schemePastel1 = Uv, t.schemePastel2 = Ov, t.schemeSet1 = Bv, t.schemeSet2 = Yv, t.schemeSet3 = Fv, t.interpolateBrBG = Hv, t.schemeBrBG = jv, t.interpolatePRGn = Gv, t.schemePRGn = Xv, t.interpolatePiYG = $v, t.schemePiYG = Vv, t.interpolatePuOr = Zv, t.schemePuOr = Wv, t.interpolateRdBu = Jv, t.schemeRdBu = Qv, t.interpolateRdGy = tg, t.schemeRdGy = Kv, t.interpolateRdYlBu = eg, t.schemeRdYlBu = ng, t.interpolateRdYlGn = ig, t.schemeRdYlGn = rg, t.interpolateSpectral = ag, t.schemeSpectral = og, t.interpolateBuGn = cg, t.schemeBuGn = ug, t.interpolateBuPu = sg, t.schemeBuPu = fg, t.interpolateGnBu = hg, t.schemeGnBu = lg, t.interpolateOrRd = pg, t.schemeOrRd = dg, t.interpolatePuBuGn = gg, t.schemePuBuGn = vg, t.interpolatePuBu = _g, t.schemePuBu = yg, t.interpolatePuRd = mg, t.schemePuRd = bg, t.interpolateRdPu = wg, t.schemeRdPu = xg, t.interpolateYlGnBu = Ng, t.schemeYlGnBu = Mg, t.interpolateYlGn = Tg, t.schemeYlGn = Ag, t.interpolateYlOrBr = kg, t.schemeYlOrBr = Sg, t.interpolateYlOrRd = Cg, t.schemeYlOrRd = Eg, t.interpolateBlues = zg, t.schemeBlues = Pg, t.interpolateGreens = Dg, t.schemeGreens = Rg, t.interpolateGreys = Lg, t.schemeGreys = qg, t.interpolatePurples = Og, t.schemePurples = Ug, t.interpolateReds = Yg, t.schemeReds = Bg, t.interpolateOranges = Ig, t.schemeOranges = Fg, t.interpolateCubehelixDefault = jg, t.interpolateRainbow = function (t) { (t < 0 || t > 1) && (t -= Math.floor(t)); var n = Math.abs(t - .5); return Gg.h = 360 * t - 100, Gg.s = 1.5 - 1.5 * n, Gg.l = .8 - .9 * n, Gg + ""; }, t.interpolateWarm = Hg, t.interpolateCool = Xg, t.interpolateSinebow = function (t) { var n; return t = (.5 - t) * Math.PI, Vg.r = 255 * (n = Math.sin(t)) * n, Vg.g = 255 * (n = Math.sin(t + $g)) * n, Vg.b = 255 * (n = Math.sin(t + Wg)) * n, Vg + ""; }, t.interpolateViridis = Qg, t.interpolateMagma = Jg, t.interpolateInferno = Kg, t.interpolatePlasma = ty, t.create = function (t) { return zt(W(t).call(document.documentElement)); }, t.creator = W, t.local = Dt, t.matcher = tt, t.mouse = Ot, t.namespace = $, t.namespaces = V, t.clientPoint = Ut, t.select = zt, t.selectAll = function (t) { return "string" == typeof t ? new Ct([document.querySelectorAll(t)], [document.documentElement]) : new Ct([null == t ? [] : t], Et); }, t.selection = Pt, t.selector = Q, t.selectorAll = K, t.style = ct, t.touch = Bt, t.touches = function (t, n) { null == n && (n = Lt().touches); for (var e = 0, r = n ? n.length : 0, i = new Array(r); e < r; ++e)
        i[e] = Ut(t, n[e]); return i; }, t.window = ut, t.customEvent = St, t.arc = function () { var t = py, n = vy, e = ny(0), r = null, i = gy, o = yy, a = _y, u = null; function c() { var c, f, s, l = +t.apply(this, arguments), h = +n.apply(this, arguments), d = i.apply(this, arguments) - ly, p = o.apply(this, arguments) - ly, v = ey(p - d), g = p > d; if (u || (u = c = Xi()), h < l && (f = h, h = l, l = f), h > fy)
        if (v > hy - fy)
            u.moveTo(h * iy(d), h * uy(d)), u.arc(0, 0, h, d, p, !g), l > fy && (u.moveTo(l * iy(p), l * uy(p)), u.arc(0, 0, l, p, d, g));
        else {
            var y, _, b = d, m = p, x = d, w = p, M = v, N = v, A = a.apply(this, arguments) / 2, T = A > fy && (r ? +r.apply(this, arguments) : cy(l * l + h * h)), S = ay(ey(h - l) / 2, +e.apply(this, arguments)), k = S, E = S;
            if (T > fy) {
                var C = dy(T / l * uy(A)), P = dy(T / h * uy(A));
                (M -= 2 * C) > fy ? (x += C *= g ? 1 : -1, w -= C) : (M = 0, x = w = (d + p) / 2), (N -= 2 * P) > fy ? (b += P *= g ? 1 : -1, m -= P) : (N = 0, b = m = (d + p) / 2);
            }
            var z = h * iy(b), R = h * uy(b), D = l * iy(w), q = l * uy(w);
            if (S > fy) {
                var L, U = h * iy(m), O = h * uy(m), B = l * iy(x), Y = l * uy(x);
                if (v < sy && (L = function (t, n, e, r, i, o, a, u) { var c = e - t, f = r - n, s = a - i, l = u - o, h = l * c - s * f; if (!(h * h < fy))
                    return [t + (h = (s * (n - o) - l * (t - i)) / h) * c, n + h * f]; }(z, R, B, Y, U, O, D, q))) {
                    var F = z - L[0], I = R - L[1], j = U - L[0], H = O - L[1], X = 1 / uy(((s = (F * j + I * H) / (cy(F * F + I * I) * cy(j * j + H * H))) > 1 ? 0 : s < -1 ? sy : Math.acos(s)) / 2), G = cy(L[0] * L[0] + L[1] * L[1]);
                    k = ay(S, (l - G) / (X - 1)), E = ay(S, (h - G) / (X + 1));
                }
            }
            N > fy ? E > fy ? (y = by(B, Y, z, R, h, E, g), _ = by(U, O, D, q, h, E, g), u.moveTo(y.cx + y.x01, y.cy + y.y01), E < S ? u.arc(y.cx, y.cy, E, ry(y.y01, y.x01), ry(_.y01, _.x01), !g) : (u.arc(y.cx, y.cy, E, ry(y.y01, y.x01), ry(y.y11, y.x11), !g), u.arc(0, 0, h, ry(y.cy + y.y11, y.cx + y.x11), ry(_.cy + _.y11, _.cx + _.x11), !g), u.arc(_.cx, _.cy, E, ry(_.y11, _.x11), ry(_.y01, _.x01), !g))) : (u.moveTo(z, R), u.arc(0, 0, h, b, m, !g)) : u.moveTo(z, R), l > fy && M > fy ? k > fy ? (y = by(D, q, U, O, l, -k, g), _ = by(z, R, B, Y, l, -k, g), u.lineTo(y.cx + y.x01, y.cy + y.y01), k < S ? u.arc(y.cx, y.cy, k, ry(y.y01, y.x01), ry(_.y01, _.x01), !g) : (u.arc(y.cx, y.cy, k, ry(y.y01, y.x01), ry(y.y11, y.x11), !g), u.arc(0, 0, l, ry(y.cy + y.y11, y.cx + y.x11), ry(_.cy + _.y11, _.cx + _.x11), g), u.arc(_.cx, _.cy, k, ry(_.y11, _.x11), ry(_.y01, _.x01), !g))) : u.arc(0, 0, l, w, x, g) : u.lineTo(D, q);
        }
    else
        u.moveTo(0, 0); if (u.closePath(), c)
        return u = null, c + "" || null; } return c.centroid = function () { var e = (+t.apply(this, arguments) + +n.apply(this, arguments)) / 2, r = (+i.apply(this, arguments) + +o.apply(this, arguments)) / 2 - sy / 2; return [iy(r) * e, uy(r) * e]; }, c.innerRadius = function (n) { return arguments.length ? (t = "function" == typeof n ? n : ny(+n), c) : t; }, c.outerRadius = function (t) { return arguments.length ? (n = "function" == typeof t ? t : ny(+t), c) : n; }, c.cornerRadius = function (t) { return arguments.length ? (e = "function" == typeof t ? t : ny(+t), c) : e; }, c.padRadius = function (t) { return arguments.length ? (r = null == t ? null : "function" == typeof t ? t : ny(+t), c) : r; }, c.startAngle = function (t) { return arguments.length ? (i = "function" == typeof t ? t : ny(+t), c) : i; }, c.endAngle = function (t) { return arguments.length ? (o = "function" == typeof t ? t : ny(+t), c) : o; }, c.padAngle = function (t) { return arguments.length ? (a = "function" == typeof t ? t : ny(+t), c) : a; }, c.context = function (t) { return arguments.length ? (u = null == t ? null : t, c) : u; }, c; }, t.area = Ay, t.line = Ny, t.pie = function () { var t = Sy, n = Ty, e = null, r = ny(0), i = ny(hy), o = ny(0); function a(a) { var u, c, f, s, l, h = a.length, d = 0, p = new Array(h), v = new Array(h), g = +r.apply(this, arguments), y = Math.min(hy, Math.max(-hy, i.apply(this, arguments) - g)), _ = Math.min(Math.abs(y) / h, o.apply(this, arguments)), b = _ * (y < 0 ? -1 : 1); for (u = 0; u < h; ++u)
        (l = v[p[u] = u] = +t(a[u], u, a)) > 0 && (d += l); for (null != n ? p.sort(function (t, e) { return n(v[t], v[e]); }) : null != e && p.sort(function (t, n) { return e(a[t], a[n]); }), u = 0, f = d ? (y - h * b) / d : 0; u < h; ++u, g = s)
        c = p[u], s = g + ((l = v[c]) > 0 ? l * f : 0) + b, v[c] = { data: a[c], index: u, value: l, startAngle: g, endAngle: s, padAngle: _ }; return v; } return a.value = function (n) { return arguments.length ? (t = "function" == typeof n ? n : ny(+n), a) : t; }, a.sortValues = function (t) { return arguments.length ? (n = t, e = null, a) : n; }, a.sort = function (t) { return arguments.length ? (e = t, n = null, a) : e; }, a.startAngle = function (t) { return arguments.length ? (r = "function" == typeof t ? t : ny(+t), a) : r; }, a.endAngle = function (t) { return arguments.length ? (i = "function" == typeof t ? t : ny(+t), a) : i; }, a.padAngle = function (t) { return arguments.length ? (o = "function" == typeof t ? t : ny(+t), a) : o; }, a; }, t.areaRadial = Ry, t.radialArea = Ry, t.lineRadial = zy, t.radialLine = zy, t.pointRadial = Dy, t.linkHorizontal = function () { return Oy(By); }, t.linkVertical = function () { return Oy(Yy); }, t.linkRadial = function () { var t = Oy(Fy); return t.angle = t.x, delete t.x, t.radius = t.y, delete t.y, t; }, t.symbol = function () { var t = ny(Iy), n = ny(64), e = null; function r() { var r; if (e || (e = r = Xi()), t.apply(this, arguments).draw(e, +n.apply(this, arguments)), r)
        return e = null, r + "" || null; } return r.type = function (n) { return arguments.length ? (t = "function" == typeof n ? n : ny(n), r) : t; }, r.size = function (t) { return arguments.length ? (n = "function" == typeof t ? t : ny(+t), r) : n; }, r.context = function (t) { return arguments.length ? (e = null == t ? null : t, r) : e; }, r; }, t.symbols = i_, t.symbolCircle = Iy, t.symbolCross = jy, t.symbolDiamond = Gy, t.symbolSquare = Qy, t.symbolStar = Zy, t.symbolTriangle = Ky, t.symbolWye = r_, t.curveBasisClosed = function (t) { return new c_(t); }, t.curveBasisOpen = function (t) { return new f_(t); }, t.curveBasis = function (t) { return new u_(t); }, t.curveBundle = l_, t.curveCardinalClosed = g_, t.curveCardinalOpen = __, t.curveCardinal = p_, t.curveCatmullRomClosed = M_, t.curveCatmullRomOpen = A_, t.curveCatmullRom = x_, t.curveLinearClosed = function (t) { return new T_(t); }, t.curveLinear = xy, t.curveMonotoneX = function (t) { return new P_(t); }, t.curveMonotoneY = function (t) { return new z_(t); }, t.curveNatural = function (t) { return new D_(t); }, t.curveStep = function (t) { return new L_(t, .5); }, t.curveStepAfter = function (t) { return new L_(t, 1); }, t.curveStepBefore = function (t) { return new L_(t, 0); }, t.stack = function () { var t = ny([]), n = O_, e = U_, r = B_; function i(i) { var o, a, u = t.apply(this, arguments), c = i.length, f = u.length, s = new Array(f); for (o = 0; o < f; ++o) {
        for (var l, h = u[o], d = s[o] = new Array(c), p = 0; p < c; ++p)
            d[p] = l = [0, +r(i[p], h, p, i)], l.data = i[p];
        d.key = h;
    } for (o = 0, a = n(s); o < f; ++o)
        s[a[o]].index = o; return e(s, a), s; } return i.keys = function (n) { return arguments.length ? (t = "function" == typeof n ? n : ny(qy.call(n)), i) : t; }, i.value = function (t) { return arguments.length ? (r = "function" == typeof t ? t : ny(+t), i) : r; }, i.order = function (t) { return arguments.length ? (n = null == t ? O_ : "function" == typeof t ? t : ny(qy.call(t)), i) : n; }, i.offset = function (t) { return arguments.length ? (e = null == t ? U_ : t, i) : e; }, i; }, t.stackOffsetExpand = function (t, n) { if ((r = t.length) > 0) {
        for (var e, r, i, o = 0, a = t[0].length; o < a; ++o) {
            for (i = e = 0; e < r; ++e)
                i += t[e][o][1] || 0;
            if (i)
                for (e = 0; e < r; ++e)
                    t[e][o][1] /= i;
        }
        U_(t, n);
    } }, t.stackOffsetDiverging = function (t, n) { if ((u = t.length) > 0)
        for (var e, r, i, o, a, u, c = 0, f = t[n[0]].length; c < f; ++c)
            for (o = a = 0, e = 0; e < u; ++e)
                (i = (r = t[n[e]][c])[1] - r[0]) >= 0 ? (r[0] = o, r[1] = o += i) : i < 0 ? (r[1] = a, r[0] = a += i) : r[0] = o; }, t.stackOffsetNone = U_, t.stackOffsetSilhouette = function (t, n) { if ((e = t.length) > 0) {
        for (var e, r = 0, i = t[n[0]], o = i.length; r < o; ++r) {
            for (var a = 0, u = 0; a < e; ++a)
                u += t[a][r][1] || 0;
            i[r][1] += i[r][0] = -u / 2;
        }
        U_(t, n);
    } }, t.stackOffsetWiggle = function (t, n) { if ((i = t.length) > 0 && (r = (e = t[n[0]]).length) > 0) {
        for (var e, r, i, o = 0, a = 1; a < r; ++a) {
            for (var u = 0, c = 0, f = 0; u < i; ++u) {
                for (var s = t[n[u]], l = s[a][1] || 0, h = (l - (s[a - 1][1] || 0)) / 2, d = 0; d < u; ++d) {
                    var p = t[n[d]];
                    h += (p[a][1] || 0) - (p[a - 1][1] || 0);
                }
                c += l, f += h * l;
            }
            e[a - 1][1] += e[a - 1][0] = o, c && (o -= f / c);
        }
        e[a - 1][1] += e[a - 1][0] = o, U_(t, n);
    } }, t.stackOrderAppearance = Y_, t.stackOrderAscending = I_, t.stackOrderDescending = function (t) { return I_(t).reverse(); }, t.stackOrderInsideOut = function (t) { var n, e, r = t.length, i = t.map(j_), o = Y_(t), a = 0, u = 0, c = [], f = []; for (n = 0; n < r; ++n)
        e = o[n], a < u ? (a += i[e], c.push(e)) : (u += i[e], f.push(e)); return f.reverse().concat(c); }, t.stackOrderNone = O_, t.stackOrderReverse = function (t) { return O_(t).reverse(); }, t.timeInterval = Zh, t.timeMillisecond = Qh, t.timeMilliseconds = Jh, t.utcMillisecond = Qh, t.utcMilliseconds = Jh, t.timeSecond = nd, t.timeSeconds = ed, t.utcSecond = nd, t.utcSeconds = ed, t.timeMinute = rd, t.timeMinutes = id, t.timeHour = od, t.timeHours = ad, t.timeDay = ud, t.timeDays = cd, t.timeWeek = sd, t.timeWeeks = yd, t.timeSunday = sd, t.timeSundays = yd, t.timeMonday = ld, t.timeMondays = _d, t.timeTuesday = hd, t.timeTuesdays = bd, t.timeWednesday = dd, t.timeWednesdays = md, t.timeThursday = pd, t.timeThursdays = xd, t.timeFriday = vd, t.timeFridays = wd, t.timeSaturday = gd, t.timeSaturdays = Md, t.timeMonth = Nd, t.timeMonths = Ad, t.timeYear = Td, t.timeYears = Sd, t.utcMinute = kd, t.utcMinutes = Ed, t.utcHour = Cd, t.utcHours = Pd, t.utcDay = zd, t.utcDays = Rd, t.utcWeek = qd, t.utcWeeks = Id, t.utcSunday = qd, t.utcSundays = Id, t.utcMonday = Ld, t.utcMondays = jd, t.utcTuesday = Ud, t.utcTuesdays = Hd, t.utcWednesday = Od, t.utcWednesdays = Xd, t.utcThursday = Bd, t.utcThursdays = Gd, t.utcFriday = Yd, t.utcFridays = Vd, t.utcSaturday = Fd, t.utcSaturdays = $d, t.utcMonth = Wd, t.utcMonths = Zd, t.utcYear = Qd, t.utcYears = Jd, t.timeFormatDefaultLocale = pv, t.timeFormatLocale = ep, t.isoFormat = vv, t.isoParse = gv, t.now = er, t.timer = or, t.timerFlush = ar, t.timeout = sr, t.interval = function (t, n, e) { var r = new ir, i = n; return null == n ? (r.restart(t, n, e), r) : (n = +n, e = null == e ? er() : +e, r.restart(function o(a) { a += i, r.restart(o, i += n, e), t(a); }, n, e), r); }, t.transition = Pr, t.active = function (t, n) { var e, r, i = t.__transition; if (i)
        for (r in n = null == n ? null : n + "", i)
            if ((e = i[r]).state > pr && e.name === n)
                return new Cr([[t]], si, n, +r); return null; }, t.interrupt = Nr, t.voronoi = function () { var t = X_, n = G_, e = null; function r(r) { return new Tb(r.map(function (e, i) { var o = [Math.round(t(e, i, r) / Mb) * Mb, Math.round(n(e, i, r) / Mb) * Mb]; return o.index = i, o.data = e, o; }), e); } return r.polygons = function (t) { return r(t).polygons(); }, r.links = function (t) { return r(t).links(); }, r.triangles = function (t) { return r(t).triangles(); }, r.x = function (n) { return arguments.length ? (t = "function" == typeof n ? n : H_(+n), r) : t; }, r.y = function (t) { return arguments.length ? (n = "function" == typeof t ? t : H_(+t), r) : n; }, r.extent = function (t) { return arguments.length ? (e = null == t ? null : [[+t[0][0], +t[0][1]], [+t[1][0], +t[1][1]]], r) : e && [[e[0][0], e[0][1]], [e[1][0], e[1][1]]]; }, r.size = function (t) { return arguments.length ? (e = null == t ? null : [[0, 0], [+t[0], +t[1]]], r) : e && [e[1][0] - e[0][0], e[1][1] - e[0][1]]; }, r; }, t.zoom = function () { var n, e, r = Db, i = qb, o = Bb, a = Ub, u = Ob, c = [0, 1 / 0], f = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], s = 250, l = qe, h = [], d = I("start", "zoom", "end"), p = 500, v = 150, g = 0; function y(t) { t.property("__zoom", Lb).on("wheel.zoom", N).on("mousedown.zoom", A).on("dblclick.zoom", T).filter(u).on("touchstart.zoom", S).on("touchmove.zoom", k).on("touchend.zoom touchcancel.zoom", E).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)"); } function _(t, n) { return (n = Math.max(c[0], Math.min(c[1], n))) === t.k ? t : new Eb(n, t.x, t.y); } function b(t, n, e) { var r = n[0] - e[0] * t.k, i = n[1] - e[1] * t.k; return r === t.x && i === t.y ? t : new Eb(t.k, r, i); } function m(t) { return [(+t[0][0] + +t[1][0]) / 2, (+t[0][1] + +t[1][1]) / 2]; } function x(t, n, e) { t.on("start.zoom", function () { w(this, arguments).start(); }).on("interrupt.zoom end.zoom", function () { w(this, arguments).end(); }).tween("zoom", function () { var t = arguments, r = w(this, t), o = i.apply(this, t), a = e || m(o), u = Math.max(o[1][0] - o[0][0], o[1][1] - o[0][1]), c = this.__zoom, f = "function" == typeof n ? n.apply(this, t) : n, s = l(c.invert(a).concat(u / c.k), f.invert(a).concat(u / f.k)); return function (t) { if (1 === t)
        t = f;
    else {
        var n = s(t), e = u / n[2];
        t = new Eb(e, a[0] - n[0] * e, a[1] - n[1] * e);
    } r.zoom(null, t); }; }); } function w(t, n) { for (var e, r = 0, i = h.length; r < i; ++r)
        if ((e = h[r]).that === t)
            return e; return new M(t, n); } function M(t, n) { this.that = t, this.args = n, this.index = -1, this.active = 0, this.extent = i.apply(t, n); } function N() { if (r.apply(this, arguments)) {
        var t = w(this, arguments), n = this.__zoom, e = Math.max(c[0], Math.min(c[1], n.k * Math.pow(2, a.apply(this, arguments)))), i = Ot(this);
        if (t.wheel)
            t.mouse[0][0] === i[0] && t.mouse[0][1] === i[1] || (t.mouse[1] = n.invert(t.mouse[0] = i)), clearTimeout(t.wheel);
        else {
            if (n.k === e)
                return;
            t.mouse = [i, n.invert(i)], Nr(this), t.start();
        }
        Rb(), t.wheel = setTimeout(function () { t.wheel = null, t.end(); }, v), t.zoom("mouse", o(b(_(n, e), t.mouse[0], t.mouse[1]), t.extent, f));
    } } function A() { if (!e && r.apply(this, arguments)) {
        var n = w(this, arguments), i = zt(t.event.view).on("mousemove.zoom", function () { if (Rb(), !n.moved) {
            var e = t.event.clientX - u, r = t.event.clientY - c;
            n.moved = e * e + r * r > g;
        } n.zoom("mouse", o(b(n.that.__zoom, n.mouse[0] = Ot(n.that), n.mouse[1]), n.extent, f)); }, !0).on("mouseup.zoom", function () { i.on("mousemove.zoom mouseup.zoom", null), jt(t.event.view, n.moved), Rb(), n.end(); }, !0), a = Ot(this), u = t.event.clientX, c = t.event.clientY;
        It(t.event.view), zb(), n.mouse = [a, this.__zoom.invert(a)], Nr(this), n.start();
    } } function T() { if (r.apply(this, arguments)) {
        var n = this.__zoom, e = Ot(this), a = n.invert(e), u = n.k * (t.event.shiftKey ? .5 : 2), c = o(b(_(n, u), e, a), i.apply(this, arguments), f);
        Rb(), s > 0 ? zt(this).transition().duration(s).call(x, c, e) : zt(this).call(y.transform, c);
    } } function S() { if (r.apply(this, arguments)) {
        var e, i, o, a, u = w(this, arguments), c = t.event.changedTouches, f = c.length;
        for (zb(), i = 0; i < f; ++i)
            a = [a = Bt(this, c, (o = c[i]).identifier), this.__zoom.invert(a), o.identifier], u.touch0 ? u.touch1 || (u.touch1 = a) : (u.touch0 = a, e = !0);
        if (n && (n = clearTimeout(n), !u.touch1))
            return u.end(), void ((a = zt(this).on("dblclick.zoom")) && a.apply(this, arguments));
        e && (n = setTimeout(function () { n = null; }, p), Nr(this), u.start());
    } } function k() { var e, r, i, a, u = w(this, arguments), c = t.event.changedTouches, s = c.length; for (Rb(), n && (n = clearTimeout(n)), e = 0; e < s; ++e)
        i = Bt(this, c, (r = c[e]).identifier), u.touch0 && u.touch0[2] === r.identifier ? u.touch0[0] = i : u.touch1 && u.touch1[2] === r.identifier && (u.touch1[0] = i); if (r = u.that.__zoom, u.touch1) {
        var l = u.touch0[0], h = u.touch0[1], d = u.touch1[0], p = u.touch1[1], v = (v = d[0] - l[0]) * v + (v = d[1] - l[1]) * v, g = (g = p[0] - h[0]) * g + (g = p[1] - h[1]) * g;
        r = _(r, Math.sqrt(v / g)), i = [(l[0] + d[0]) / 2, (l[1] + d[1]) / 2], a = [(h[0] + p[0]) / 2, (h[1] + p[1]) / 2];
    }
    else {
        if (!u.touch0)
            return;
        i = u.touch0[0], a = u.touch0[1];
    } u.zoom("touch", o(b(r, i, a), u.extent, f)); } function E() { var n, r, i = w(this, arguments), o = t.event.changedTouches, a = o.length; for (zb(), e && clearTimeout(e), e = setTimeout(function () { e = null; }, p), n = 0; n < a; ++n)
        r = o[n], i.touch0 && i.touch0[2] === r.identifier ? delete i.touch0 : i.touch1 && i.touch1[2] === r.identifier && delete i.touch1; i.touch1 && !i.touch0 && (i.touch0 = i.touch1, delete i.touch1), i.touch0 ? i.touch0[1] = this.__zoom.invert(i.touch0[0]) : i.end(); } return y.transform = function (t, n) { var e = t.selection ? t.selection() : t; e.property("__zoom", Lb), t !== e ? x(t, n) : e.interrupt().each(function () { w(this, arguments).start().zoom(null, "function" == typeof n ? n.apply(this, arguments) : n).end(); }); }, y.scaleBy = function (t, n) { y.scaleTo(t, function () { return this.__zoom.k * ("function" == typeof n ? n.apply(this, arguments) : n); }); }, y.scaleTo = function (t, n) { y.transform(t, function () { var t = i.apply(this, arguments), e = this.__zoom, r = m(t), a = e.invert(r), u = "function" == typeof n ? n.apply(this, arguments) : n; return o(b(_(e, u), r, a), t, f); }); }, y.translateBy = function (t, n, e) { y.transform(t, function () { return o(this.__zoom.translate("function" == typeof n ? n.apply(this, arguments) : n, "function" == typeof e ? e.apply(this, arguments) : e), i.apply(this, arguments), f); }); }, y.translateTo = function (t, n, e) { y.transform(t, function () { var t = i.apply(this, arguments), r = this.__zoom, a = m(t); return o(Cb.translate(a[0], a[1]).scale(r.k).translate("function" == typeof n ? -n.apply(this, arguments) : -n, "function" == typeof e ? -e.apply(this, arguments) : -e), t, f); }); }, M.prototype = { start: function () { return 1 == ++this.active && (this.index = h.push(this) - 1, this.emit("start")), this; }, zoom: function (t, n) { return this.mouse && "mouse" !== t && (this.mouse[1] = n.invert(this.mouse[0])), this.touch0 && "touch" !== t && (this.touch0[1] = n.invert(this.touch0[0])), this.touch1 && "touch" !== t && (this.touch1[1] = n.invert(this.touch1[0])), this.that.__zoom = n, this.emit("zoom"), this; }, end: function () { return 0 == --this.active && (h.splice(this.index, 1), this.index = -1, this.emit("end")), this; }, emit: function (t) { St(new kb(y, t, this.that.__zoom), d.apply, d, [t, this.that, this.args]); } }, y.wheelDelta = function (t) { return arguments.length ? (a = "function" == typeof t ? t : Sb(+t), y) : a; }, y.filter = function (t) { return arguments.length ? (r = "function" == typeof t ? t : Sb(!!t), y) : r; }, y.touchable = function (t) { return arguments.length ? (u = "function" == typeof t ? t : Sb(!!t), y) : u; }, y.extent = function (t) { return arguments.length ? (i = "function" == typeof t ? t : Sb([[+t[0][0], +t[0][1]], [+t[1][0], +t[1][1]]]), y) : i; }, y.scaleExtent = function (t) { return arguments.length ? (c[0] = +t[0], c[1] = +t[1], y) : [c[0], c[1]]; }, y.translateExtent = function (t) { return arguments.length ? (f[0][0] = +t[0][0], f[1][0] = +t[1][0], f[0][1] = +t[0][1], f[1][1] = +t[1][1], y) : [[f[0][0], f[0][1]], [f[1][0], f[1][1]]]; }, y.constrain = function (t) { return arguments.length ? (o = t, y) : o; }, y.duration = function (t) { return arguments.length ? (s = +t, y) : s; }, y.interpolate = function (t) { return arguments.length ? (l = t, y) : l; }, y.on = function () { var t = d.on.apply(d, arguments); return t === d ? y : t; }, y.clickDistance = function (t) { return arguments.length ? (g = (t = +t) * t, y) : Math.sqrt(g); }, y; }, t.zoomTransform = Pb, t.zoomIdentity = Cb, Object.defineProperty(t, "__esModule", { value: !0 });
});
/**
 * dat-gui JavaScript Controller Library
 * http://code.google.com/p/dat-gui
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */
!function (e, t) { "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t(e.dat = {}); }(this, function (e) {
    "use strict";
    function t(e, t) { var n = e.__state.conversionName.toString(), o = Math.round(e.r), i = Math.round(e.g), r = Math.round(e.b), s = e.a, a = Math.round(e.h), l = e.s.toFixed(1), d = e.v.toFixed(1); if (t || "THREE_CHAR_HEX" === n || "SIX_CHAR_HEX" === n) {
        for (var c = e.hex.toString(16); c.length < 6;)
            c = "0" + c;
        return "#" + c;
    } return "CSS_RGB" === n ? "rgb(" + o + "," + i + "," + r + ")" : "CSS_RGBA" === n ? "rgba(" + o + "," + i + "," + r + "," + s + ")" : "HEX" === n ? "0x" + e.hex.toString(16) : "RGB_ARRAY" === n ? "[" + o + "," + i + "," + r + "]" : "RGBA_ARRAY" === n ? "[" + o + "," + i + "," + r + "," + s + "]" : "RGB_OBJ" === n ? "{r:" + o + ",g:" + i + ",b:" + r + "}" : "RGBA_OBJ" === n ? "{r:" + o + ",g:" + i + ",b:" + r + ",a:" + s + "}" : "HSV_OBJ" === n ? "{h:" + a + ",s:" + l + ",v:" + d + "}" : "HSVA_OBJ" === n ? "{h:" + a + ",s:" + l + ",v:" + d + ",a:" + s + "}" : "unknown format"; }
    function n(e, t, n) { Object.defineProperty(e, t, { get: function () { return "RGB" === this.__state.space ? this.__state[t] : (I.recalculateRGB(this, t, n), this.__state[t]); }, set: function (e) { "RGB" !== this.__state.space && (I.recalculateRGB(this, t, n), this.__state.space = "RGB"), this.__state[t] = e; } }); }
    function o(e, t) { Object.defineProperty(e, t, { get: function () { return "HSV" === this.__state.space ? this.__state[t] : (I.recalculateHSV(this), this.__state[t]); }, set: function (e) { "HSV" !== this.__state.space && (I.recalculateHSV(this), this.__state.space = "HSV"), this.__state[t] = e; } }); }
    function i(e) { if ("0" === e || S.isUndefined(e))
        return 0; var t = e.match(U); return S.isNull(t) ? 0 : parseFloat(t[1]); }
    function r(e) { var t = e.toString(); return t.indexOf(".") > -1 ? t.length - t.indexOf(".") - 1 : 0; }
    function s(e, t) { var n = Math.pow(10, t); return Math.round(e * n) / n; }
    function a(e, t, n, o, i) { return o + (e - t) / (n - t) * (i - o); }
    function l(e, t, n, o) { e.style.background = "", S.each(ee, function (i) { e.style.cssText += "background: " + i + "linear-gradient(" + t + ", " + n + " 0%, " + o + " 100%); "; }); }
    function d(e) { e.style.background = "", e.style.cssText += "background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);", e.style.cssText += "background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);", e.style.cssText += "background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);", e.style.cssText += "background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);", e.style.cssText += "background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);"; }
    function c(e, t, n) { var o = document.createElement("li"); return t && o.appendChild(t), n ? e.__ul.insertBefore(o, n) : e.__ul.appendChild(o), e.onResize(), o; }
    function u(e) { X.unbind(window, "resize", e.__resizeHandler), e.saveToLocalStorageIfPossible && X.unbind(window, "unload", e.saveToLocalStorageIfPossible); }
    function _(e, t) { var n = e.__preset_select[e.__preset_select.selectedIndex]; n.innerHTML = t ? n.value + "*" : n.value; }
    function h(e, t, n) { if (n.__li = t, n.__gui = e, S.extend(n, { options: function (t) { if (arguments.length > 1) {
            var o = n.__li.nextElementSibling;
            return n.remove(), f(e, n.object, n.property, { before: o, factoryArgs: [S.toArray(arguments)] });
        } if (S.isArray(t) || S.isObject(t)) {
            var i = n.__li.nextElementSibling;
            return n.remove(), f(e, n.object, n.property, { before: i, factoryArgs: [t] });
        } }, name: function (e) { return n.__li.firstElementChild.firstElementChild.innerHTML = e, n; }, listen: function () { return n.__gui.listen(n), n; }, remove: function () { return n.__gui.remove(n), n; } }), n instanceof q) {
        var o = new Q(n.object, n.property, { min: n.__min, max: n.__max, step: n.__step });
        S.each(["updateDisplay", "onChange", "onFinishChange", "step", "min", "max"], function (e) { var t = n[e], i = o[e]; n[e] = o[e] = function () { var e = Array.prototype.slice.call(arguments); return i.apply(o, e), t.apply(n, e); }; }), X.addClass(t, "has-slider"), n.domElement.insertBefore(o.domElement, n.domElement.firstElementChild);
    }
    else if (n instanceof Q) {
        var i = function (t) { if (S.isNumber(n.__min) && S.isNumber(n.__max)) {
            var o = n.__li.firstElementChild.firstElementChild.innerHTML, i = n.__gui.__listening.indexOf(n) > -1;
            n.remove();
            var r = f(e, n.object, n.property, { before: n.__li.nextElementSibling, factoryArgs: [n.__min, n.__max, n.__step] });
            return r.name(o), i && r.listen(), r;
        } return t; };
        n.min = S.compose(i, n.min), n.max = S.compose(i, n.max);
    }
    else
        n instanceof K ? (X.bind(t, "click", function () { X.fakeEvent(n.__checkbox, "click"); }), X.bind(n.__checkbox, "click", function (e) { e.stopPropagation(); })) : n instanceof Z ? (X.bind(t, "click", function () { X.fakeEvent(n.__button, "click"); }), X.bind(t, "mouseover", function () { X.addClass(n.__button, "hover"); }), X.bind(t, "mouseout", function () { X.removeClass(n.__button, "hover"); })) : n instanceof $ && (X.addClass(t, "color"), n.updateDisplay = S.compose(function (e) { return t.style.borderLeftColor = n.__color.toString(), e; }, n.updateDisplay), n.updateDisplay()); n.setValue = S.compose(function (t) { return e.getRoot().__preset_select && n.isModified() && _(e.getRoot(), !0), t; }, n.setValue); }
    function p(e, t) { var n = e.getRoot(), o = n.__rememberedObjects.indexOf(t.object); if (-1 !== o) {
        var i = n.__rememberedObjectIndecesToControllers[o];
        if (void 0 === i && (i = {}, n.__rememberedObjectIndecesToControllers[o] = i), i[t.property] = t, n.load && n.load.remembered) {
            var r = n.load.remembered, s = void 0;
            if (r[e.preset])
                s = r[e.preset];
            else {
                if (!r[se])
                    return;
                s = r[se];
            }
            if (s[o] && void 0 !== s[o][t.property]) {
                var a = s[o][t.property];
                t.initialValue = a, t.setValue(a);
            }
        }
    } }
    function f(e, t, n, o) { if (void 0 === t[n])
        throw new Error('Object "' + t + '" has no property "' + n + '"'); var i = void 0; if (o.color)
        i = new $(t, n);
    else {
        var r = [t, n].concat(o.factoryArgs);
        i = ne.apply(e, r);
    } o.before instanceof z && (o.before = o.before.__li), p(e, i), X.addClass(i.domElement, "c"); var s = document.createElement("span"); X.addClass(s, "property-name"), s.innerHTML = i.property; var a = document.createElement("div"); a.appendChild(s), a.appendChild(i.domElement); var l = c(e, a, o.before); return X.addClass(l, he.CLASS_CONTROLLER_ROW), i instanceof $ ? X.addClass(l, "color") : X.addClass(l, H(i.getValue())), h(e, l, i), e.__controllers.push(i), i; }
    function m(e, t) { return document.location.href + "." + t; }
    function g(e, t, n) { var o = document.createElement("option"); o.innerHTML = t, o.value = t, e.__preset_select.appendChild(o), n && (e.__preset_select.selectedIndex = e.__preset_select.length - 1); }
    function b(e, t) { t.style.display = e.useLocalStorage ? "block" : "none"; }
    function v(e) { var t = e.__save_row = document.createElement("li"); X.addClass(e.domElement, "has-save"), e.__ul.insertBefore(t, e.__ul.firstChild), X.addClass(t, "save-row"); var n = document.createElement("span"); n.innerHTML = "&nbsp;", X.addClass(n, "button gears"); var o = document.createElement("span"); o.innerHTML = "Save", X.addClass(o, "button"), X.addClass(o, "save"); var i = document.createElement("span"); i.innerHTML = "New", X.addClass(i, "button"), X.addClass(i, "save-as"); var r = document.createElement("span"); r.innerHTML = "Revert", X.addClass(r, "button"), X.addClass(r, "revert"); var s = e.__preset_select = document.createElement("select"); if (e.load && e.load.remembered ? S.each(e.load.remembered, function (t, n) { g(e, n, n === e.preset); }) : g(e, se, !1), X.bind(s, "change", function () { for (var t = 0; t < e.__preset_select.length; t++)
        e.__preset_select[t].innerHTML = e.__preset_select[t].value; e.preset = this.value; }), t.appendChild(s), t.appendChild(n), t.appendChild(o), t.appendChild(i), t.appendChild(r), ae) {
        var a = document.getElementById("dg-local-explain"), l = document.getElementById("dg-local-storage");
        document.getElementById("dg-save-locally").style.display = "block", "true" === localStorage.getItem(m(e, "isLocal")) && l.setAttribute("checked", "checked"), b(e, a), X.bind(l, "change", function () { e.useLocalStorage = !e.useLocalStorage, b(e, a); });
    } var d = document.getElementById("dg-new-constructor"); X.bind(d, "keydown", function (e) { !e.metaKey || 67 !== e.which && 67 !== e.keyCode || le.hide(); }), X.bind(n, "click", function () { d.innerHTML = JSON.stringify(e.getSaveObject(), void 0, 2), le.show(), d.focus(), d.select(); }), X.bind(o, "click", function () { e.save(); }), X.bind(i, "click", function () { var t = prompt("Enter a new preset name."); t && e.saveAs(t); }), X.bind(r, "click", function () { e.revert(); }); }
    function y(e) { function t(t) { return t.preventDefault(), e.width += i - t.clientX, e.onResize(), i = t.clientX, !1; } function n() { X.removeClass(e.__closeButton, he.CLASS_DRAG), X.unbind(window, "mousemove", t), X.unbind(window, "mouseup", n); } function o(o) { return o.preventDefault(), i = o.clientX, X.addClass(e.__closeButton, he.CLASS_DRAG), X.bind(window, "mousemove", t), X.bind(window, "mouseup", n), !1; } var i = void 0; e.__resize_handle = document.createElement("div"), S.extend(e.__resize_handle.style, { width: "6px", marginLeft: "-3px", height: "200px", cursor: "ew-resize", position: "absolute" }), X.bind(e.__resize_handle, "mousedown", o), X.bind(e.__closeButton, "mousedown", o), e.domElement.insertBefore(e.__resize_handle, e.domElement.firstElementChild); }
    function w(e, t) { e.domElement.style.width = t + "px", e.__save_row && e.autoPlace && (e.__save_row.style.width = t + "px"), e.__closeButton && (e.__closeButton.style.width = t + "px"); }
    function x(e, t) { var n = {}; return S.each(e.__rememberedObjects, function (o, i) { var r = {}, s = e.__rememberedObjectIndecesToControllers[i]; S.each(s, function (e, n) { r[n] = t ? e.initialValue : e.getValue(); }), n[i] = r; }), n; }
    function E(e) { for (var t = 0; t < e.__preset_select.length; t++)
        e.__preset_select[t].value === e.preset && (e.__preset_select.selectedIndex = t); }
    function C(e) { 0 !== e.length && oe.call(window, function () { C(e); }), S.each(e, function (e) { e.updateDisplay(); }); }
    var A = Array.prototype.forEach, k = Array.prototype.slice, S = { BREAK: {}, extend: function (e) { return this.each(k.call(arguments, 1), function (t) { (this.isObject(t) ? Object.keys(t) : []).forEach(function (n) { this.isUndefined(t[n]) || (e[n] = t[n]); }.bind(this)); }, this), e; }, defaults: function (e) { return this.each(k.call(arguments, 1), function (t) { (this.isObject(t) ? Object.keys(t) : []).forEach(function (n) { this.isUndefined(e[n]) && (e[n] = t[n]); }.bind(this)); }, this), e; }, compose: function () { var e = k.call(arguments); return function () { for (var t = k.call(arguments), n = e.length - 1; n >= 0; n--)
            t = [e[n].apply(this, t)]; return t[0]; }; }, each: function (e, t, n) { if (e)
            if (A && e.forEach && e.forEach === A)
                e.forEach(t, n);
            else if (e.length === e.length + 0) {
                var o = void 0, i = void 0;
                for (o = 0, i = e.length; o < i; o++)
                    if (o in e && t.call(n, e[o], o) === this.BREAK)
                        return;
            }
            else
                for (var r in e)
                    if (t.call(n, e[r], r) === this.BREAK)
                        return; }, defer: function (e) { setTimeout(e, 0); }, debounce: function (e, t, n) { var o = void 0; return function () { var i = this, r = arguments, s = n || !o; clearTimeout(o), o = setTimeout(function () { o = null, n || e.apply(i, r); }, t), s && e.apply(i, r); }; }, toArray: function (e) { return e.toArray ? e.toArray() : k.call(e); }, isUndefined: function (e) { return void 0 === e; }, isNull: function (e) { return null === e; }, isNaN: function (e) { function t(t) { return e.apply(this, arguments); } return t.toString = function () { return e.toString(); }, t; }(function (e) { return isNaN(e); }), isArray: Array.isArray || function (e) { return e.constructor === Array; }, isObject: function (e) { return e === Object(e); }, isNumber: function (e) { return e === e + 0; }, isString: function (e) { return e === e + ""; }, isBoolean: function (e) { return !1 === e || !0 === e; }, isFunction: function (e) { return e instanceof Function; } }, O = [{ litmus: S.isString, conversions: { THREE_CHAR_HEX: { read: function (e) { var t = e.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i); return null !== t && { space: "HEX", hex: parseInt("0x" + t[1].toString() + t[1].toString() + t[2].toString() + t[2].toString() + t[3].toString() + t[3].toString(), 0) }; }, write: t }, SIX_CHAR_HEX: { read: function (e) { var t = e.match(/^#([A-F0-9]{6})$/i); return null !== t && { space: "HEX", hex: parseInt("0x" + t[1].toString(), 0) }; }, write: t }, CSS_RGB: { read: function (e) { var t = e.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/); return null !== t && { space: "RGB", r: parseFloat(t[1]), g: parseFloat(t[2]), b: parseFloat(t[3]) }; }, write: t }, CSS_RGBA: { read: function (e) { var t = e.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/); return null !== t && { space: "RGB", r: parseFloat(t[1]), g: parseFloat(t[2]), b: parseFloat(t[3]), a: parseFloat(t[4]) }; }, write: t } } }, { litmus: S.isNumber, conversions: { HEX: { read: function (e) { return { space: "HEX", hex: e, conversionName: "HEX" }; }, write: function (e) { return e.hex; } } } }, { litmus: S.isArray, conversions: { RGB_ARRAY: { read: function (e) { return 3 === e.length && { space: "RGB", r: e[0], g: e[1], b: e[2] }; }, write: function (e) { return [e.r, e.g, e.b]; } }, RGBA_ARRAY: { read: function (e) { return 4 === e.length && { space: "RGB", r: e[0], g: e[1], b: e[2], a: e[3] }; }, write: function (e) { return [e.r, e.g, e.b, e.a]; } } } }, { litmus: S.isObject, conversions: { RGBA_OBJ: { read: function (e) { return !!(S.isNumber(e.r) && S.isNumber(e.g) && S.isNumber(e.b) && S.isNumber(e.a)) && { space: "RGB", r: e.r, g: e.g, b: e.b, a: e.a }; }, write: function (e) { return { r: e.r, g: e.g, b: e.b, a: e.a }; } }, RGB_OBJ: { read: function (e) { return !!(S.isNumber(e.r) && S.isNumber(e.g) && S.isNumber(e.b)) && { space: "RGB", r: e.r, g: e.g, b: e.b }; }, write: function (e) { return { r: e.r, g: e.g, b: e.b }; } }, HSVA_OBJ: { read: function (e) { return !!(S.isNumber(e.h) && S.isNumber(e.s) && S.isNumber(e.v) && S.isNumber(e.a)) && { space: "HSV", h: e.h, s: e.s, v: e.v, a: e.a }; }, write: function (e) { return { h: e.h, s: e.s, v: e.v, a: e.a }; } }, HSV_OBJ: { read: function (e) { return !!(S.isNumber(e.h) && S.isNumber(e.s) && S.isNumber(e.v)) && { space: "HSV", h: e.h, s: e.s, v: e.v }; }, write: function (e) { return { h: e.h, s: e.s, v: e.v }; } } } }], T = void 0, L = void 0, R = function () { L = !1; var e = arguments.length > 1 ? S.toArray(arguments) : arguments[0]; return S.each(O, function (t) { if (t.litmus(e))
        return S.each(t.conversions, function (t, n) { if (T = t.read(e), !1 === L && !1 !== T)
            return L = T, T.conversionName = n, T.conversion = t, S.BREAK; }), S.BREAK; }), L; }, B = void 0, N = { hsv_to_rgb: function (e, t, n) { var o = Math.floor(e / 60) % 6, i = e / 60 - Math.floor(e / 60), r = n * (1 - t), s = n * (1 - i * t), a = n * (1 - (1 - i) * t), l = [[n, a, r], [s, n, r], [r, n, a], [r, s, n], [a, r, n], [n, r, s]][o]; return { r: 255 * l[0], g: 255 * l[1], b: 255 * l[2] }; }, rgb_to_hsv: function (e, t, n) { var o = Math.min(e, t, n), i = Math.max(e, t, n), r = i - o, s = void 0, a = void 0; return 0 === i ? { h: NaN, s: 0, v: 0 } : (a = r / i, s = e === i ? (t - n) / r : t === i ? 2 + (n - e) / r : 4 + (e - t) / r, (s /= 6) < 0 && (s += 1), { h: 360 * s, s: a, v: i / 255 }); }, rgb_to_hex: function (e, t, n) { var o = this.hex_with_component(0, 2, e); return o = this.hex_with_component(o, 1, t), o = this.hex_with_component(o, 0, n); }, component_from_hex: function (e, t) { return e >> 8 * t & 255; }, hex_with_component: function (e, t, n) { return n << (B = 8 * t) | e & ~(255 << B); } }, H = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) { return typeof e; } : function (e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e; }, F = function (e, t) { if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function"); }, P = function () { function e(e, t) { for (var n = 0; n < t.length; n++) {
        var o = t[n];
        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);
    } } return function (t, n, o) { return n && e(t.prototype, n), o && e(t, o), t; }; }(), D = function e(t, n, o) { null === t && (t = Function.prototype); var i = Object.getOwnPropertyDescriptor(t, n); if (void 0 === i) {
        var r = Object.getPrototypeOf(t);
        return null === r ? void 0 : e(r, n, o);
    } if ("value" in i)
        return i.value; var s = i.get; if (void 0 !== s)
        return s.call(o); }, j = function (e, t) { if ("function" != typeof t && null !== t)
        throw new TypeError("Super expression must either be null or a function, not " + typeof t); e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t); }, V = function (e, t) { if (!e)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t; }, I = function () { function e() { if (F(this, e), this.__state = R.apply(this, arguments), !1 === this.__state)
        throw new Error("Failed to interpret color arguments"); this.__state.a = this.__state.a || 1; } return P(e, [{ key: "toString", value: function () { return t(this); } }, { key: "toHexString", value: function () { return t(this, !0); } }, { key: "toOriginal", value: function () { return this.__state.conversion.write(this); } }]), e; }();
    I.recalculateRGB = function (e, t, n) { if ("HEX" === e.__state.space)
        e.__state[t] = N.component_from_hex(e.__state.hex, n);
    else {
        if ("HSV" !== e.__state.space)
            throw new Error("Corrupted color state");
        S.extend(e.__state, N.hsv_to_rgb(e.__state.h, e.__state.s, e.__state.v));
    } }, I.recalculateHSV = function (e) { var t = N.rgb_to_hsv(e.r, e.g, e.b); S.extend(e.__state, { s: t.s, v: t.v }), S.isNaN(t.h) ? S.isUndefined(e.__state.h) && (e.__state.h = 0) : e.__state.h = t.h; }, I.COMPONENTS = ["r", "g", "b", "h", "s", "v", "hex", "a"], n(I.prototype, "r", 2), n(I.prototype, "g", 1), n(I.prototype, "b", 0), o(I.prototype, "h"), o(I.prototype, "s"), o(I.prototype, "v"), Object.defineProperty(I.prototype, "a", { get: function () { return this.__state.a; }, set: function (e) { this.__state.a = e; } }), Object.defineProperty(I.prototype, "hex", { get: function () { return "HEX" !== this.__state.space && (this.__state.hex = N.rgb_to_hex(this.r, this.g, this.b), this.__state.space = "HEX"), this.__state.hex; }, set: function (e) { this.__state.space = "HEX", this.__state.hex = e; } });
    var z = function () { function e(t, n) { F(this, e), this.initialValue = t[n], this.domElement = document.createElement("div"), this.object = t, this.property = n, this.__onChange = void 0, this.__onFinishChange = void 0; } return P(e, [{ key: "onChange", value: function (e) { return this.__onChange = e, this; } }, { key: "onFinishChange", value: function (e) { return this.__onFinishChange = e, this; } }, { key: "setValue", value: function (e) { return this.object[this.property] = e, this.__onChange && this.__onChange.call(this, e), this.updateDisplay(), this; } }, { key: "getValue", value: function () { return this.object[this.property]; } }, { key: "updateDisplay", value: function () { return this; } }, { key: "isModified", value: function () { return this.initialValue !== this.getValue(); } }]), e; }(), M = { HTMLEvents: ["change"], MouseEvents: ["click", "mousemove", "mousedown", "mouseup", "mouseover"], KeyboardEvents: ["keydown"] }, G = {};
    S.each(M, function (e, t) { S.each(e, function (e) { G[e] = t; }); });
    var U = /(\d+(\.\d+)?)px/, X = { makeSelectable: function (e, t) { void 0 !== e && void 0 !== e.style && (e.onselectstart = t ? function () { return !1; } : function () { }, e.style.MozUserSelect = t ? "auto" : "none", e.style.KhtmlUserSelect = t ? "auto" : "none", e.unselectable = t ? "on" : "off"); }, makeFullscreen: function (e, t, n) { var o = n, i = t; S.isUndefined(i) && (i = !0), S.isUndefined(o) && (o = !0), e.style.position = "absolute", i && (e.style.left = 0, e.style.right = 0), o && (e.style.top = 0, e.style.bottom = 0); }, fakeEvent: function (e, t, n, o) { var i = n || {}, r = G[t]; if (!r)
            throw new Error("Event type " + t + " not supported."); var s = document.createEvent(r); switch (r) {
            case "MouseEvents":
                var a = i.x || i.clientX || 0, l = i.y || i.clientY || 0;
                s.initMouseEvent(t, i.bubbles || !1, i.cancelable || !0, window, i.clickCount || 1, 0, 0, a, l, !1, !1, !1, !1, 0, null);
                break;
            case "KeyboardEvents":
                var d = s.initKeyboardEvent || s.initKeyEvent;
                S.defaults(i, { cancelable: !0, ctrlKey: !1, altKey: !1, shiftKey: !1, metaKey: !1, keyCode: void 0, charCode: void 0 }), d(t, i.bubbles || !1, i.cancelable, window, i.ctrlKey, i.altKey, i.shiftKey, i.metaKey, i.keyCode, i.charCode);
                break;
            default: s.initEvent(t, i.bubbles || !1, i.cancelable || !0);
        } S.defaults(s, o), e.dispatchEvent(s); }, bind: function (e, t, n, o) { var i = o || !1; return e.addEventListener ? e.addEventListener(t, n, i) : e.attachEvent && e.attachEvent("on" + t, n), X; }, unbind: function (e, t, n, o) { var i = o || !1; return e.removeEventListener ? e.removeEventListener(t, n, i) : e.detachEvent && e.detachEvent("on" + t, n), X; }, addClass: function (e, t) { if (void 0 === e.className)
            e.className = t;
        else if (e.className !== t) {
            var n = e.className.split(/ +/);
            -1 === n.indexOf(t) && (n.push(t), e.className = n.join(" ").replace(/^\s+/, "").replace(/\s+$/, ""));
        } return X; }, removeClass: function (e, t) { if (t)
            if (e.className === t)
                e.removeAttribute("class");
            else {
                var n = e.className.split(/ +/), o = n.indexOf(t);
                -1 !== o && (n.splice(o, 1), e.className = n.join(" "));
            }
        else
            e.className = void 0; return X; }, hasClass: function (e, t) { return new RegExp("(?:^|\\s+)" + t + "(?:\\s+|$)").test(e.className) || !1; }, getWidth: function (e) { var t = getComputedStyle(e); return i(t["border-left-width"]) + i(t["border-right-width"]) + i(t["padding-left"]) + i(t["padding-right"]) + i(t.width); }, getHeight: function (e) { var t = getComputedStyle(e); return i(t["border-top-width"]) + i(t["border-bottom-width"]) + i(t["padding-top"]) + i(t["padding-bottom"]) + i(t.height); }, getOffset: function (e) { var t = e, n = { left: 0, top: 0 }; if (t.offsetParent)
            do {
                n.left += t.offsetLeft, n.top += t.offsetTop, t = t.offsetParent;
            } while (t); return n; }, isActive: function (e) { return e === document.activeElement && (e.type || e.href); } }, K = function (e) { function t(e, n) { F(this, t); var o = V(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n)), i = o; return o.__prev = o.getValue(), o.__checkbox = document.createElement("input"), o.__checkbox.setAttribute("type", "checkbox"), X.bind(o.__checkbox, "change", function () { i.setValue(!i.__prev); }, !1), o.domElement.appendChild(o.__checkbox), o.updateDisplay(), o; } return j(t, z), P(t, [{ key: "setValue", value: function (e) { var n = D(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "setValue", this).call(this, e); return this.__onFinishChange && this.__onFinishChange.call(this, this.getValue()), this.__prev = this.getValue(), n; } }, { key: "updateDisplay", value: function () { return !0 === this.getValue() ? (this.__checkbox.setAttribute("checked", "checked"), this.__checkbox.checked = !0, this.__prev = !0) : (this.__checkbox.checked = !1, this.__prev = !1), D(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "updateDisplay", this).call(this); } }]), t; }(), Y = function (e) { function t(e, n, o) { F(this, t); var i = V(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n)), r = o, s = i; if (i.__select = document.createElement("select"), S.isArray(r)) {
        var a = {};
        S.each(r, function (e) { a[e] = e; }), r = a;
    } return S.each(r, function (e, t) { var n = document.createElement("option"); n.innerHTML = t, n.setAttribute("value", e), s.__select.appendChild(n); }), i.updateDisplay(), X.bind(i.__select, "change", function () { var e = this.options[this.selectedIndex].value; s.setValue(e); }), i.domElement.appendChild(i.__select), i; } return j(t, z), P(t, [{ key: "setValue", value: function (e) { var n = D(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "setValue", this).call(this, e); return this.__onFinishChange && this.__onFinishChange.call(this, this.getValue()), n; } }, { key: "updateDisplay", value: function () { return X.isActive(this.__select) ? this : (this.__select.value = this.getValue(), D(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "updateDisplay", this).call(this)); } }]), t; }(), J = function (e) { function t(e, n) { function o() { r.setValue(r.__input.value); } F(this, t); var i = V(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n)), r = i; return i.__input = document.createElement("input"), i.__input.setAttribute("type", "text"), X.bind(i.__input, "keyup", o), X.bind(i.__input, "change", o), X.bind(i.__input, "blur", function () { r.__onFinishChange && r.__onFinishChange.call(r, r.getValue()); }), X.bind(i.__input, "keydown", function (e) { 13 === e.keyCode && this.blur(); }), i.updateDisplay(), i.domElement.appendChild(i.__input), i; } return j(t, z), P(t, [{ key: "updateDisplay", value: function () { return X.isActive(this.__input) || (this.__input.value = this.getValue()), D(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "updateDisplay", this).call(this); } }]), t; }(), W = function (e) { function t(e, n, o) { F(this, t); var i = V(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n)), s = o || {}; return i.__min = s.min, i.__max = s.max, i.__step = s.step, S.isUndefined(i.__step) ? 0 === i.initialValue ? i.__impliedStep = 1 : i.__impliedStep = Math.pow(10, Math.floor(Math.log(Math.abs(i.initialValue)) / Math.LN10)) / 10 : i.__impliedStep = i.__step, i.__precision = r(i.__impliedStep), i; } return j(t, z), P(t, [{ key: "setValue", value: function (e) { var n = e; return void 0 !== this.__min && n < this.__min ? n = this.__min : void 0 !== this.__max && n > this.__max && (n = this.__max), void 0 !== this.__step && n % this.__step != 0 && (n = Math.round(n / this.__step) * this.__step), D(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "setValue", this).call(this, n); } }, { key: "min", value: function (e) { return this.__min = e, this; } }, { key: "max", value: function (e) { return this.__max = e, this; } }, { key: "step", value: function (e) { return this.__step = e, this.__impliedStep = e, this.__precision = r(e), this; } }]), t; }(), Q = function (e) { function t(e, n, o) { function i() { l.__onFinishChange && l.__onFinishChange.call(l, l.getValue()); } function r(e) { var t = d - e.clientY; l.setValue(l.getValue() + t * l.__impliedStep), d = e.clientY; } function s() { X.unbind(window, "mousemove", r), X.unbind(window, "mouseup", s), i(); } F(this, t); var a = V(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n, o)); a.__truncationSuspended = !1; var l = a, d = void 0; return a.__input = document.createElement("input"), a.__input.setAttribute("type", "text"), X.bind(a.__input, "change", function () { var e = parseFloat(l.__input.value); S.isNaN(e) || l.setValue(e); }), X.bind(a.__input, "blur", function () { i(); }), X.bind(a.__input, "mousedown", function (e) { X.bind(window, "mousemove", r), X.bind(window, "mouseup", s), d = e.clientY; }), X.bind(a.__input, "keydown", function (e) { 13 === e.keyCode && (l.__truncationSuspended = !0, this.blur(), l.__truncationSuspended = !1, i()); }), a.updateDisplay(), a.domElement.appendChild(a.__input), a; } return j(t, W), P(t, [{ key: "updateDisplay", value: function () { return this.__input.value = this.__truncationSuspended ? this.getValue() : s(this.getValue(), this.__precision), D(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "updateDisplay", this).call(this); } }]), t; }(), q = function (e) { function t(e, n, o, i, r) { function s(e) { e.preventDefault(); var t = _.__background.getBoundingClientRect(); return _.setValue(a(e.clientX, t.left, t.right, _.__min, _.__max)), !1; } function l() { X.unbind(window, "mousemove", s), X.unbind(window, "mouseup", l), _.__onFinishChange && _.__onFinishChange.call(_, _.getValue()); } function d(e) { var t = e.touches[0].clientX, n = _.__background.getBoundingClientRect(); _.setValue(a(t, n.left, n.right, _.__min, _.__max)); } function c() { X.unbind(window, "touchmove", d), X.unbind(window, "touchend", c), _.__onFinishChange && _.__onFinishChange.call(_, _.getValue()); } F(this, t); var u = V(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n, { min: o, max: i, step: r })), _ = u; return u.__background = document.createElement("div"), u.__foreground = document.createElement("div"), X.bind(u.__background, "mousedown", function (e) { document.activeElement.blur(), X.bind(window, "mousemove", s), X.bind(window, "mouseup", l), s(e); }), X.bind(u.__background, "touchstart", function (e) { 1 === e.touches.length && (X.bind(window, "touchmove", d), X.bind(window, "touchend", c), d(e)); }), X.addClass(u.__background, "slider"), X.addClass(u.__foreground, "slider-fg"), u.updateDisplay(), u.__background.appendChild(u.__foreground), u.domElement.appendChild(u.__background), u; } return j(t, W), P(t, [{ key: "updateDisplay", value: function () { var e = (this.getValue() - this.__min) / (this.__max - this.__min); return this.__foreground.style.width = 100 * e + "%", D(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "updateDisplay", this).call(this); } }]), t; }(), Z = function (e) { function t(e, n, o) { F(this, t); var i = V(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n)), r = i; return i.__button = document.createElement("div"), i.__button.innerHTML = void 0 === o ? "Fire" : o, X.bind(i.__button, "click", function (e) { return e.preventDefault(), r.fire(), !1; }), X.addClass(i.__button, "button"), i.domElement.appendChild(i.__button), i; } return j(t, z), P(t, [{ key: "fire", value: function () { this.__onChange && this.__onChange.call(this), this.getValue().call(this.object), this.__onFinishChange && this.__onFinishChange.call(this, this.getValue()); } }]), t; }(), $ = function (e) { function t(e, n) { function o(e) { u(e), X.bind(window, "mousemove", u), X.bind(window, "touchmove", u), X.bind(window, "mouseup", r), X.bind(window, "touchend", r); } function i(e) { _(e), X.bind(window, "mousemove", _), X.bind(window, "touchmove", _), X.bind(window, "mouseup", s), X.bind(window, "touchend", s); } function r() { X.unbind(window, "mousemove", u), X.unbind(window, "touchmove", u), X.unbind(window, "mouseup", r), X.unbind(window, "touchend", r), c(); } function s() { X.unbind(window, "mousemove", _), X.unbind(window, "touchmove", _), X.unbind(window, "mouseup", s), X.unbind(window, "touchend", s), c(); } function a() { var e = R(this.value); !1 !== e ? (p.__color.__state = e, p.setValue(p.__color.toOriginal())) : this.value = p.__color.toString(); } function c() { p.__onFinishChange && p.__onFinishChange.call(p, p.__color.toOriginal()); } function u(e) { -1 === e.type.indexOf("touch") && e.preventDefault(); var t = p.__saturation_field.getBoundingClientRect(), n = e.touches && e.touches[0] || e, o = n.clientX, i = n.clientY, r = (o - t.left) / (t.right - t.left), s = 1 - (i - t.top) / (t.bottom - t.top); return s > 1 ? s = 1 : s < 0 && (s = 0), r > 1 ? r = 1 : r < 0 && (r = 0), p.__color.v = s, p.__color.s = r, p.setValue(p.__color.toOriginal()), !1; } function _(e) { -1 === e.type.indexOf("touch") && e.preventDefault(); var t = p.__hue_field.getBoundingClientRect(), n = 1 - ((e.touches && e.touches[0] || e).clientY - t.top) / (t.bottom - t.top); return n > 1 ? n = 1 : n < 0 && (n = 0), p.__color.h = 360 * n, p.setValue(p.__color.toOriginal()), !1; } F(this, t); var h = V(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n)); h.__color = new I(h.getValue()), h.__temp = new I(0); var p = h; h.domElement = document.createElement("div"), X.makeSelectable(h.domElement, !1), h.__selector = document.createElement("div"), h.__selector.className = "selector", h.__saturation_field = document.createElement("div"), h.__saturation_field.className = "saturation-field", h.__field_knob = document.createElement("div"), h.__field_knob.className = "field-knob", h.__field_knob_border = "2px solid ", h.__hue_knob = document.createElement("div"), h.__hue_knob.className = "hue-knob", h.__hue_field = document.createElement("div"), h.__hue_field.className = "hue-field", h.__input = document.createElement("input"), h.__input.type = "text", h.__input_textShadow = "0 1px 1px ", X.bind(h.__input, "keydown", function (e) { 13 === e.keyCode && a.call(this); }), X.bind(h.__input, "blur", a), X.bind(h.__selector, "mousedown", function () { X.addClass(this, "drag").bind(window, "mouseup", function () { X.removeClass(p.__selector, "drag"); }); }), X.bind(h.__selector, "touchstart", function () { X.addClass(this, "drag").bind(window, "touchend", function () { X.removeClass(p.__selector, "drag"); }); }); var f = document.createElement("div"); return S.extend(h.__selector.style, { width: "122px", height: "102px", padding: "3px", backgroundColor: "#222", boxShadow: "0px 1px 3px rgba(0,0,0,0.3)" }), S.extend(h.__field_knob.style, { position: "absolute", width: "12px", height: "12px", border: h.__field_knob_border + (h.__color.v < .5 ? "#fff" : "#000"), boxShadow: "0px 1px 3px rgba(0,0,0,0.5)", borderRadius: "12px", zIndex: 1 }), S.extend(h.__hue_knob.style, { position: "absolute", width: "15px", height: "2px", borderRight: "4px solid #fff", zIndex: 1 }), S.extend(h.__saturation_field.style, { width: "100px", height: "100px", border: "1px solid #555", marginRight: "3px", display: "inline-block", cursor: "pointer" }), S.extend(f.style, { width: "100%", height: "100%", background: "none" }), l(f, "top", "rgba(0,0,0,0)", "#000"), S.extend(h.__hue_field.style, { width: "15px", height: "100px", border: "1px solid #555", cursor: "ns-resize", position: "absolute", top: "3px", right: "3px" }), d(h.__hue_field), S.extend(h.__input.style, { outline: "none", textAlign: "center", color: "#fff", border: 0, fontWeight: "bold", textShadow: h.__input_textShadow + "rgba(0,0,0,0.7)" }), X.bind(h.__saturation_field, "mousedown", o), X.bind(h.__saturation_field, "touchstart", o), X.bind(h.__field_knob, "mousedown", o), X.bind(h.__field_knob, "touchstart", o), X.bind(h.__hue_field, "mousedown", i), X.bind(h.__hue_field, "touchstart", i), h.__saturation_field.appendChild(f), h.__selector.appendChild(h.__field_knob), h.__selector.appendChild(h.__saturation_field), h.__selector.appendChild(h.__hue_field), h.__hue_field.appendChild(h.__hue_knob), h.domElement.appendChild(h.__input), h.domElement.appendChild(h.__selector), h.updateDisplay(), h; } return j(t, z), P(t, [{ key: "updateDisplay", value: function () { var e = R(this.getValue()); if (!1 !== e) {
                var t = !1;
                S.each(I.COMPONENTS, function (n) { if (!S.isUndefined(e[n]) && !S.isUndefined(this.__color.__state[n]) && e[n] !== this.__color.__state[n])
                    return t = !0, {}; }, this), t && S.extend(this.__color.__state, e);
            } S.extend(this.__temp.__state, this.__color.__state), this.__temp.a = 1; var n = this.__color.v < .5 || this.__color.s > .5 ? 255 : 0, o = 255 - n; S.extend(this.__field_knob.style, { marginLeft: 100 * this.__color.s - 7 + "px", marginTop: 100 * (1 - this.__color.v) - 7 + "px", backgroundColor: this.__temp.toHexString(), border: this.__field_knob_border + "rgb(" + n + "," + n + "," + n + ")" }), this.__hue_knob.style.marginTop = 100 * (1 - this.__color.h / 360) + "px", this.__temp.s = 1, this.__temp.v = 1, l(this.__saturation_field, "left", "#fff", this.__temp.toHexString()), this.__input.value = this.__color.toString(), S.extend(this.__input.style, { backgroundColor: this.__color.toHexString(), color: "rgb(" + n + "," + n + "," + n + ")", textShadow: this.__input_textShadow + "rgba(" + o + "," + o + "," + o + ",.7)" }); } }]), t; }(), ee = ["-moz-", "-o-", "-webkit-", "-ms-", ""], te = { load: function (e, t) { var n = t || document, o = n.createElement("link"); o.type = "text/css", o.rel = "stylesheet", o.href = e, n.getElementsByTagName("head")[0].appendChild(o); }, inject: function (e, t) { var n = t || document, o = document.createElement("style"); o.type = "text/css", o.innerHTML = e; var i = n.getElementsByTagName("head")[0]; try {
            i.appendChild(o);
        }
        catch (e) { } } }, ne = function (e, t) { var n = e[t]; return S.isArray(arguments[2]) || S.isObject(arguments[2]) ? new Y(e, t, arguments[2]) : S.isNumber(n) ? S.isNumber(arguments[2]) && S.isNumber(arguments[3]) ? S.isNumber(arguments[4]) ? new q(e, t, arguments[2], arguments[3], arguments[4]) : new q(e, t, arguments[2], arguments[3]) : S.isNumber(arguments[4]) ? new Q(e, t, { min: arguments[2], max: arguments[3], step: arguments[4] }) : new Q(e, t, { min: arguments[2], max: arguments[3] }) : S.isString(n) ? new J(e, t) : S.isFunction(n) ? new Z(e, t, "") : S.isBoolean(n) ? new K(e, t) : null; }, oe = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (e) { setTimeout(e, 1e3 / 60); }, ie = function () { function e() { F(this, e), this.backgroundElement = document.createElement("div"), S.extend(this.backgroundElement.style, { backgroundColor: "rgba(0,0,0,0.8)", top: 0, left: 0, display: "none", zIndex: "1000", opacity: 0, WebkitTransition: "opacity 0.2s linear", transition: "opacity 0.2s linear" }), X.makeFullscreen(this.backgroundElement), this.backgroundElement.style.position = "fixed", this.domElement = document.createElement("div"), S.extend(this.domElement.style, { position: "fixed", display: "none", zIndex: "1001", opacity: 0, WebkitTransition: "-webkit-transform 0.2s ease-out, opacity 0.2s linear", transition: "transform 0.2s ease-out, opacity 0.2s linear" }), document.body.appendChild(this.backgroundElement), document.body.appendChild(this.domElement); var t = this; X.bind(this.backgroundElement, "click", function () { t.hide(); }); } return P(e, [{ key: "show", value: function () { var e = this; this.backgroundElement.style.display = "block", this.domElement.style.display = "block", this.domElement.style.opacity = 0, this.domElement.style.webkitTransform = "scale(1.1)", this.layout(), S.defer(function () { e.backgroundElement.style.opacity = 1, e.domElement.style.opacity = 1, e.domElement.style.webkitTransform = "scale(1)"; }); } }, { key: "hide", value: function () { var e = this, t = function t() { e.domElement.style.display = "none", e.backgroundElement.style.display = "none", X.unbind(e.domElement, "webkitTransitionEnd", t), X.unbind(e.domElement, "transitionend", t), X.unbind(e.domElement, "oTransitionEnd", t); }; X.bind(this.domElement, "webkitTransitionEnd", t), X.bind(this.domElement, "transitionend", t), X.bind(this.domElement, "oTransitionEnd", t), this.backgroundElement.style.opacity = 0, this.domElement.style.opacity = 0, this.domElement.style.webkitTransform = "scale(1.1)"; } }, { key: "layout", value: function () { this.domElement.style.left = window.innerWidth / 2 - X.getWidth(this.domElement) / 2 + "px", this.domElement.style.top = window.innerHeight / 2 - X.getHeight(this.domElement) / 2 + "px"; } }]), e; }(), re = function (e) { if (e && "undefined" != typeof window) {
        var t = document.createElement("style");
        return t.setAttribute("type", "text/css"), t.innerHTML = e, document.head.appendChild(t), e;
    } }(".dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear;border:0;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button.close-top{position:relative}.dg.main .close-button.close-bottom{position:absolute}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-y:visible}.dg.a.has-save>ul.close-top{margin-top:0}.dg.a.has-save>ul.close-bottom{margin-top:27px}.dg.a.has-save>ul.closed{margin-top:0}.dg.a .save-row{top:0;z-index:1002}.dg.a .save-row.close-top{position:relative}.dg.a .save-row.close-bottom{position:fixed}.dg li{-webkit-transition:height .1s ease-out;-o-transition:height .1s ease-out;-moz-transition:height .1s ease-out;transition:height .1s ease-out;-webkit-transition:overflow .1s linear;-o-transition:overflow .1s linear;-moz-transition:overflow .1s linear;transition:overflow .1s linear}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li>*{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px;overflow:hidden}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .c{float:left;width:60%;position:relative}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:7px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .cr.color{overflow:visible}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.color{border-left:3px solid}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2FA1D6}.dg .cr.number input[type=text]{color:#2FA1D6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2FA1D6;max-width:100%}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}\n");
    te.inject(re);
    var se = "Default", ae = function () { try {
        return !!window.localStorage;
    }
    catch (e) {
        return !1;
    } }(), le = void 0, de = !0, ce = void 0, ue = !1, _e = [], he = function e(t) { var n = this, o = t || {}; this.domElement = document.createElement("div"), this.__ul = document.createElement("ul"), this.domElement.appendChild(this.__ul), X.addClass(this.domElement, "dg"), this.__folders = {}, this.__controllers = [], this.__rememberedObjects = [], this.__rememberedObjectIndecesToControllers = [], this.__listening = [], o = S.defaults(o, { closeOnTop: !1, autoPlace: !0, width: e.DEFAULT_WIDTH }), o = S.defaults(o, { resizable: o.autoPlace, hideable: o.autoPlace }), S.isUndefined(o.load) ? o.load = { preset: se } : o.preset && (o.load.preset = o.preset), S.isUndefined(o.parent) && o.hideable && _e.push(this), o.resizable = S.isUndefined(o.parent) && o.resizable, o.autoPlace && S.isUndefined(o.scrollable) && (o.scrollable = !0); var i = ae && "true" === localStorage.getItem(m(this, "isLocal")), r = void 0, s = void 0; if (Object.defineProperties(this, { parent: { get: function () { return o.parent; } }, scrollable: { get: function () { return o.scrollable; } }, autoPlace: { get: function () { return o.autoPlace; } }, closeOnTop: { get: function () { return o.closeOnTop; } }, preset: { get: function () { return n.parent ? n.getRoot().preset : o.load.preset; }, set: function (e) { n.parent ? n.getRoot().preset = e : o.load.preset = e, E(this), n.revert(); } }, width: { get: function () { return o.width; }, set: function (e) { o.width = e, w(n, e); } }, name: { get: function () { return o.name; }, set: function (e) { o.name = e, s && (s.innerHTML = o.name); } }, closed: { get: function () { return o.closed; }, set: function (t) { o.closed = t, o.closed ? X.addClass(n.__ul, e.CLASS_CLOSED) : X.removeClass(n.__ul, e.CLASS_CLOSED), this.onResize(), n.__closeButton && (n.__closeButton.innerHTML = t ? e.TEXT_OPEN : e.TEXT_CLOSED); } }, load: { get: function () { return o.load; } }, useLocalStorage: { get: function () { return i; }, set: function (e) { ae && (i = e, e ? X.bind(window, "unload", r) : X.unbind(window, "unload", r), localStorage.setItem(m(n, "isLocal"), e)); } } }), S.isUndefined(o.parent)) {
        if (this.closed = o.closed || !1, X.addClass(this.domElement, e.CLASS_MAIN), X.makeSelectable(this.domElement, !1), ae && i) {
            n.useLocalStorage = !0;
            var a = localStorage.getItem(m(this, "gui"));
            a && (o.load = JSON.parse(a));
        }
        this.__closeButton = document.createElement("div"), this.__closeButton.innerHTML = e.TEXT_CLOSED, X.addClass(this.__closeButton, e.CLASS_CLOSE_BUTTON), o.closeOnTop ? (X.addClass(this.__closeButton, e.CLASS_CLOSE_TOP), this.domElement.insertBefore(this.__closeButton, this.domElement.childNodes[0])) : (X.addClass(this.__closeButton, e.CLASS_CLOSE_BOTTOM), this.domElement.appendChild(this.__closeButton)), X.bind(this.__closeButton, "click", function () { n.closed = !n.closed; });
    }
    else {
        void 0 === o.closed && (o.closed = !0);
        var l = document.createTextNode(o.name);
        X.addClass(l, "controller-name"), s = c(n, l);
        X.addClass(this.__ul, e.CLASS_CLOSED), X.addClass(s, "title"), X.bind(s, "click", function (e) { return e.preventDefault(), n.closed = !n.closed, !1; }), o.closed || (this.closed = !1);
    } o.autoPlace && (S.isUndefined(o.parent) && (de && (ce = document.createElement("div"), X.addClass(ce, "dg"), X.addClass(ce, e.CLASS_AUTO_PLACE_CONTAINER), document.body.appendChild(ce), de = !1), ce.appendChild(this.domElement), X.addClass(this.domElement, e.CLASS_AUTO_PLACE)), this.parent || w(n, o.width)), this.__resizeHandler = function () { n.onResizeDebounced(); }, X.bind(window, "resize", this.__resizeHandler), X.bind(this.__ul, "webkitTransitionEnd", this.__resizeHandler), X.bind(this.__ul, "transitionend", this.__resizeHandler), X.bind(this.__ul, "oTransitionEnd", this.__resizeHandler), this.onResize(), o.resizable && y(this), r = function () { ae && "true" === localStorage.getItem(m(n, "isLocal")) && localStorage.setItem(m(n, "gui"), JSON.stringify(n.getSaveObject())); }, this.saveToLocalStorageIfPossible = r, o.parent || function () { var e = n.getRoot(); e.width += 1, S.defer(function () { e.width -= 1; }); }(); };
    he.toggleHide = function () { ue = !ue, S.each(_e, function (e) { e.domElement.style.display = ue ? "none" : ""; }); }, he.CLASS_AUTO_PLACE = "a", he.CLASS_AUTO_PLACE_CONTAINER = "ac", he.CLASS_MAIN = "main", he.CLASS_CONTROLLER_ROW = "cr", he.CLASS_TOO_TALL = "taller-than-window", he.CLASS_CLOSED = "closed", he.CLASS_CLOSE_BUTTON = "close-button", he.CLASS_CLOSE_TOP = "close-top", he.CLASS_CLOSE_BOTTOM = "close-bottom", he.CLASS_DRAG = "drag", he.DEFAULT_WIDTH = 245, he.TEXT_CLOSED = "Close Controls", he.TEXT_OPEN = "Open Controls", he._keydownHandler = function (e) { "text" === document.activeElement.type || 72 !== e.which && 72 !== e.keyCode || he.toggleHide(); }, X.bind(window, "keydown", he._keydownHandler, !1), S.extend(he.prototype, { add: function (e, t) { return f(this, e, t, { factoryArgs: Array.prototype.slice.call(arguments, 2) }); }, addColor: function (e, t) { return f(this, e, t, { color: !0 }); }, remove: function (e) { this.__ul.removeChild(e.__li), this.__controllers.splice(this.__controllers.indexOf(e), 1); var t = this; S.defer(function () { t.onResize(); }); }, destroy: function () { if (this.parent)
            throw new Error("Only the root GUI should be removed with .destroy(). For subfolders, use gui.removeFolder(folder) instead."); this.autoPlace && ce.removeChild(this.domElement); var e = this; S.each(this.__folders, function (t) { e.removeFolder(t); }), X.unbind(window, "keydown", he._keydownHandler, !1), u(this); }, addFolder: function (e) { if (void 0 !== this.__folders[e])
            throw new Error('You already have a folder in this GUI by the name "' + e + '"'); var t = { name: e, parent: this }; t.autoPlace = this.autoPlace, this.load && this.load.folders && this.load.folders[e] && (t.closed = this.load.folders[e].closed, t.load = this.load.folders[e]); var n = new he(t); this.__folders[e] = n; var o = c(this, n.domElement); return X.addClass(o, "folder"), n; }, removeFolder: function (e) { this.__ul.removeChild(e.domElement.parentElement), delete this.__folders[e.name], this.load && this.load.folders && this.load.folders[e.name] && delete this.load.folders[e.name], u(e); var t = this; S.each(e.__folders, function (t) { e.removeFolder(t); }), S.defer(function () { t.onResize(); }); }, open: function () { this.closed = !1; }, close: function () { this.closed = !0; }, hide: function () { this.domElement.style.display = "none"; }, show: function () { this.domElement.style.display = ""; }, onResize: function () { var e = this.getRoot(); if (e.scrollable) {
            var t = X.getOffset(e.__ul).top, n = 0;
            S.each(e.__ul.childNodes, function (t) { e.autoPlace && t === e.__save_row || (n += X.getHeight(t)); }), window.innerHeight - t - 20 < n ? (X.addClass(e.domElement, he.CLASS_TOO_TALL), e.__ul.style.height = window.innerHeight - t - 20 + "px") : (X.removeClass(e.domElement, he.CLASS_TOO_TALL), e.__ul.style.height = "auto");
        } e.__resize_handle && S.defer(function () { e.__resize_handle.style.height = e.__ul.offsetHeight + "px"; }), e.__closeButton && (e.__closeButton.style.width = e.width + "px"); }, onResizeDebounced: S.debounce(function () { this.onResize(); }, 50), remember: function () { if (S.isUndefined(le) && ((le = new ie).domElement.innerHTML = '<div id="dg-save" class="dg dialogue">\n\n  Here\'s the new load parameter for your <code>GUI</code>\'s constructor:\n\n  <textarea id="dg-new-constructor"></textarea>\n\n  <div id="dg-save-locally">\n\n    <input id="dg-local-storage" type="checkbox"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id="dg-local-explain">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>\'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n\n    </div>\n\n  </div>\n\n</div>'), this.parent)
            throw new Error("You can only call remember on a top level GUI."); var e = this; S.each(Array.prototype.slice.call(arguments), function (t) { 0 === e.__rememberedObjects.length && v(e), -1 === e.__rememberedObjects.indexOf(t) && e.__rememberedObjects.push(t); }), this.autoPlace && w(this, this.width); }, getRoot: function () { for (var e = this; e.parent;)
            e = e.parent; return e; }, getSaveObject: function () { var e = this.load; return e.closed = this.closed, this.__rememberedObjects.length > 0 && (e.preset = this.preset, e.remembered || (e.remembered = {}), e.remembered[this.preset] = x(this)), e.folders = {}, S.each(this.__folders, function (t, n) { e.folders[n] = t.getSaveObject(); }), e; }, save: function () { this.load.remembered || (this.load.remembered = {}), this.load.remembered[this.preset] = x(this), _(this, !1), this.saveToLocalStorageIfPossible(); }, saveAs: function (e) { this.load.remembered || (this.load.remembered = {}, this.load.remembered[se] = x(this, !0)), this.load.remembered[e] = x(this), this.preset = e, g(this, e, !0), this.saveToLocalStorageIfPossible(); }, revert: function (e) { S.each(this.__controllers, function (t) { this.getRoot().load.remembered ? p(e || this.getRoot(), t) : t.setValue(t.initialValue), t.__onFinishChange && t.__onFinishChange.call(t, t.getValue()); }, this), S.each(this.__folders, function (e) { e.revert(e); }), e || _(this.getRoot(), !1); }, listen: function (e) { var t = 0 === this.__listening.length; this.__listening.push(e), t && C(this.__listening); }, updateDisplay: function () { S.each(this.__controllers, function (e) { e.updateDisplay(); }), S.each(this.__folders, function (e) { e.updateDisplay(); }); } });
    var pe = { Color: I, math: N, interpret: R }, fe = { Controller: z, BooleanController: K, OptionController: Y, StringController: J, NumberController: W, NumberControllerBox: Q, NumberControllerSlider: q, FunctionController: Z, ColorController: $ }, me = { dom: X }, ge = { GUI: he }, be = he, ve = { color: pe, controllers: fe, dom: me, gui: ge, GUI: be };
    e.color = pe, e.controllers = fe, e.dom = me, e.gui = ge, e.GUI = be, e.default = ve, Object.defineProperty(e, "__esModule", { value: !0 });
});
// https://github.com/d3/d3-delaunay v6.0.2 Copyright 2018-2021 Observable, Inc., 2021 Mapbox
!function (t, i) { "object" == typeof exports && "undefined" != typeof module ? i(exports) : "function" == typeof define && define.amd ? define(["exports"], i) : i((t = "undefined" != typeof globalThis ? globalThis : t || self).d3 = t.d3 || {}); }(this, (function (t) {
    "use strict";
    const i = 134217729;
    function e(t, i, e, n, s) { let l, h, r, o, a = i[0], c = n[0], u = 0, f = 0; c > a == c > -a ? (l = a, a = i[++u]) : (l = c, c = n[++f]); let _ = 0; if (u < t && f < e)
        for (c > a == c > -a ? (h = a + l, r = l - (h - a), a = i[++u]) : (h = c + l, r = l - (h - c), c = n[++f]), l = h, 0 !== r && (s[_++] = r); u < t && f < e;)
            c > a == c > -a ? (h = l + a, o = h - l, r = l - (h - o) + (a - o), a = i[++u]) : (h = l + c, o = h - l, r = l - (h - o) + (c - o), c = n[++f]), l = h, 0 !== r && (s[_++] = r); for (; u < t;)
        h = l + a, o = h - l, r = l - (h - o) + (a - o), a = i[++u], l = h, 0 !== r && (s[_++] = r); for (; f < e;)
        h = l + c, o = h - l, r = l - (h - o) + (c - o), c = n[++f], l = h, 0 !== r && (s[_++] = r); return 0 === l && 0 !== _ || (s[_++] = l), _; }
    function n(t) { return new Float64Array(t); }
    const s = n(4), l = n(8), h = n(12), r = n(16), o = n(4);
    function a(t, n, a, c, u, f) { const _ = (n - f) * (a - u), d = (t - u) * (c - f), g = _ - d; if (0 === _ || 0 === d || _ > 0 != d > 0)
        return g; const y = Math.abs(_ + d); return Math.abs(g) >= 33306690738754716e-32 * y ? g : -function (t, n, a, c, u, f, _) { let d, g, y, m, x, p, w, v, b, T, M, A, k, $, P, S, I, z; const F = t - u, U = a - u, K = n - f, L = c - f; $ = F * L, p = i * F, w = p - (p - F), v = F - w, p = i * L, b = p - (p - L), T = L - b, P = v * T - ($ - w * b - v * b - w * T), S = K * U, p = i * K, w = p - (p - K), v = K - w, p = i * U, b = p - (p - U), T = U - b, I = v * T - (S - w * b - v * b - w * T), M = P - I, x = P - M, s[0] = P - (M + x) + (x - I), A = $ + M, x = A - $, k = $ - (A - x) + (M - x), M = k - S, x = k - M, s[1] = k - (M + x) + (x - S), z = A + M, x = z - A, s[2] = A - (z - x) + (M - x), s[3] = z; let j = function (t, i) { let e = i[0]; for (let n = 1; n < t; n++)
        e += i[n]; return e; }(4, s), H = 22204460492503146e-32 * _; if (j >= H || -j >= H)
        return j; if (x = t - F, d = t - (F + x) + (x - u), x = a - U, y = a - (U + x) + (x - u), x = n - K, g = n - (K + x) + (x - f), x = c - L, m = c - (L + x) + (x - f), 0 === d && 0 === g && 0 === y && 0 === m)
        return j; if (H = 11093356479670487e-47 * _ + 33306690738754706e-32 * Math.abs(j), j += F * m + L * d - (K * y + U * g), j >= H || -j >= H)
        return j; $ = d * L, p = i * d, w = p - (p - d), v = d - w, p = i * L, b = p - (p - L), T = L - b, P = v * T - ($ - w * b - v * b - w * T), S = g * U, p = i * g, w = p - (p - g), v = g - w, p = i * U, b = p - (p - U), T = U - b, I = v * T - (S - w * b - v * b - w * T), M = P - I, x = P - M, o[0] = P - (M + x) + (x - I), A = $ + M, x = A - $, k = $ - (A - x) + (M - x), M = k - S, x = k - M, o[1] = k - (M + x) + (x - S), z = A + M, x = z - A, o[2] = A - (z - x) + (M - x), o[3] = z; const E = e(4, s, 4, o, l); $ = F * m, p = i * F, w = p - (p - F), v = F - w, p = i * m, b = p - (p - m), T = m - b, P = v * T - ($ - w * b - v * b - w * T), S = K * y, p = i * K, w = p - (p - K), v = K - w, p = i * y, b = p - (p - y), T = y - b, I = v * T - (S - w * b - v * b - w * T), M = P - I, x = P - M, o[0] = P - (M + x) + (x - I), A = $ + M, x = A - $, k = $ - (A - x) + (M - x), M = k - S, x = k - M, o[1] = k - (M + x) + (x - S), z = A + M, x = z - A, o[2] = A - (z - x) + (M - x), o[3] = z; const C = e(E, l, 4, o, h); $ = d * m, p = i * d, w = p - (p - d), v = d - w, p = i * m, b = p - (p - m), T = m - b, P = v * T - ($ - w * b - v * b - w * T), S = g * y, p = i * g, w = p - (p - g), v = g - w, p = i * y, b = p - (p - y), T = y - b, I = v * T - (S - w * b - v * b - w * T), M = P - I, x = P - M, o[0] = P - (M + x) + (x - I), A = $ + M, x = A - $, k = $ - (A - x) + (M - x), M = k - S, x = k - M, o[1] = k - (M + x) + (x - S), z = A + M, x = z - A, o[2] = A - (z - x) + (M - x), o[3] = z; const N = e(C, h, 4, o, r); return r[N - 1]; }(t, n, a, c, u, f, y); }
    const c = Math.pow(2, -52), u = new Uint32Array(512);
    class f {
        static from(t, i = x, e = p) { const n = t.length, s = new Float64Array(2 * n); for (let l = 0; l < n; l++) {
            const n = t[l];
            s[2 * l] = i(n), s[2 * l + 1] = e(n);
        } return new f(s); }
        constructor(t) { const i = t.length >> 1; if (i > 0 && "number" != typeof t[0])
            throw new Error("Expected coords to contain numbers."); this.coords = t; const e = Math.max(2 * i - 5, 0); this._triangles = new Uint32Array(3 * e), this._halfedges = new Int32Array(3 * e), this._hashSize = Math.ceil(Math.sqrt(i)), this._hullPrev = new Uint32Array(i), this._hullNext = new Uint32Array(i), this._hullTri = new Uint32Array(i), this._hullHash = new Int32Array(this._hashSize).fill(-1), this._ids = new Uint32Array(i), this._dists = new Float64Array(i), this.update(); }
        update() { const { coords: t, _hullPrev: i, _hullNext: e, _hullTri: n, _hullHash: s } = this, l = t.length >> 1; let h = 1 / 0, r = 1 / 0, o = -1 / 0, u = -1 / 0; for (let i = 0; i < l; i++) {
            const e = t[2 * i], n = t[2 * i + 1];
            e < h && (h = e), n < r && (r = n), e > o && (o = e), n > u && (u = n), this._ids[i] = i;
        } const f = (h + o) / 2, d = (r + u) / 2; let m, x, p, w = 1 / 0; for (let i = 0; i < l; i++) {
            const e = _(f, d, t[2 * i], t[2 * i + 1]);
            e < w && (m = i, w = e);
        } const v = t[2 * m], b = t[2 * m + 1]; w = 1 / 0; for (let i = 0; i < l; i++) {
            if (i === m)
                continue;
            const e = _(v, b, t[2 * i], t[2 * i + 1]);
            e < w && e > 0 && (x = i, w = e);
        } let T = t[2 * x], M = t[2 * x + 1], A = 1 / 0; for (let i = 0; i < l; i++) {
            if (i === m || i === x)
                continue;
            const e = g(v, b, T, M, t[2 * i], t[2 * i + 1]);
            e < A && (p = i, A = e);
        } let k = t[2 * p], $ = t[2 * p + 1]; if (A === 1 / 0) {
            for (let i = 0; i < l; i++)
                this._dists[i] = t[2 * i] - t[0] || t[2 * i + 1] - t[1];
            y(this._ids, this._dists, 0, l - 1);
            const i = new Uint32Array(l);
            let e = 0;
            for (let t = 0, n = -1 / 0; t < l; t++) {
                const s = this._ids[t];
                this._dists[s] > n && (i[e++] = s, n = this._dists[s]);
            }
            return this.hull = i.subarray(0, e), this.triangles = new Uint32Array(0), void (this.halfedges = new Uint32Array(0));
        } if (a(v, b, T, M, k, $) < 0) {
            const t = x, i = T, e = M;
            x = p, T = k, M = $, p = t, k = i, $ = e;
        } const P = function (t, i, e, n, s, l) { const h = e - t, r = n - i, o = s - t, a = l - i, c = h * h + r * r, u = o * o + a * a, f = .5 / (h * a - r * o); return { x: t + (a * c - r * u) * f, y: i + (h * u - o * c) * f }; }(v, b, T, M, k, $); this._cx = P.x, this._cy = P.y; for (let i = 0; i < l; i++)
            this._dists[i] = _(t[2 * i], t[2 * i + 1], P.x, P.y); y(this._ids, this._dists, 0, l - 1), this._hullStart = m; let S = 3; e[m] = i[p] = x, e[x] = i[m] = p, e[p] = i[x] = m, n[m] = 0, n[x] = 1, n[p] = 2, s.fill(-1), s[this._hashKey(v, b)] = m, s[this._hashKey(T, M)] = x, s[this._hashKey(k, $)] = p, this.trianglesLen = 0, this._addTriangle(m, x, p, -1, -1, -1); for (let l, h, r = 0; r < this._ids.length; r++) {
            const o = this._ids[r], u = t[2 * o], f = t[2 * o + 1];
            if (r > 0 && Math.abs(u - l) <= c && Math.abs(f - h) <= c)
                continue;
            if (l = u, h = f, o === m || o === x || o === p)
                continue;
            let _ = 0;
            for (let t = 0, i = this._hashKey(u, f); t < this._hashSize && (_ = s[(i + t) % this._hashSize], -1 === _ || _ === e[_]); t++)
                ;
            _ = i[_];
            let d, g = _;
            for (; d = e[g], a(u, f, t[2 * g], t[2 * g + 1], t[2 * d], t[2 * d + 1]) >= 0;)
                if (g = d, g === _) {
                    g = -1;
                    break;
                }
            if (-1 === g)
                continue;
            let y = this._addTriangle(g, o, e[g], -1, -1, n[g]);
            n[o] = this._legalize(y + 2), n[g] = y, S++;
            let w = e[g];
            for (; d = e[w], a(u, f, t[2 * w], t[2 * w + 1], t[2 * d], t[2 * d + 1]) < 0;)
                y = this._addTriangle(w, o, d, n[o], -1, n[w]), n[o] = this._legalize(y + 2), e[w] = w, S--, w = d;
            if (g === _)
                for (; d = i[g], a(u, f, t[2 * d], t[2 * d + 1], t[2 * g], t[2 * g + 1]) < 0;)
                    y = this._addTriangle(d, o, g, -1, n[g], n[d]), this._legalize(y + 2), n[d] = y, e[g] = g, S--, g = d;
            this._hullStart = i[o] = g, e[g] = i[w] = o, e[o] = w, s[this._hashKey(u, f)] = o, s[this._hashKey(t[2 * g], t[2 * g + 1])] = g;
        } this.hull = new Uint32Array(S); for (let t = 0, i = this._hullStart; t < S; t++)
            this.hull[t] = i, i = e[i]; this.triangles = this._triangles.subarray(0, this.trianglesLen), this.halfedges = this._halfedges.subarray(0, this.trianglesLen); }
        _hashKey(t, i) { return Math.floor(function (t, i) { const e = t / (Math.abs(t) + Math.abs(i)); return (i > 0 ? 3 - e : 1 + e) / 4; }(t - this._cx, i - this._cy) * this._hashSize) % this._hashSize; }
        _legalize(t) { const { _triangles: i, _halfedges: e, coords: n } = this; let s = 0, l = 0; for (;;) {
            const h = e[t], r = t - t % 3;
            if (l = r + (t + 2) % 3, -1 === h) {
                if (0 === s)
                    break;
                t = u[--s];
                continue;
            }
            const o = h - h % 3, a = r + (t + 1) % 3, c = o + (h + 2) % 3, f = i[l], _ = i[t], g = i[a], y = i[c];
            if (d(n[2 * f], n[2 * f + 1], n[2 * _], n[2 * _ + 1], n[2 * g], n[2 * g + 1], n[2 * y], n[2 * y + 1])) {
                i[t] = y, i[h] = f;
                const n = e[c];
                if (-1 === n) {
                    let i = this._hullStart;
                    do {
                        if (this._hullTri[i] === c) {
                            this._hullTri[i] = t;
                            break;
                        }
                        i = this._hullPrev[i];
                    } while (i !== this._hullStart);
                }
                this._link(t, n), this._link(h, e[l]), this._link(l, c);
                const r = o + (h + 1) % 3;
                s < u.length && (u[s++] = r);
            }
            else {
                if (0 === s)
                    break;
                t = u[--s];
            }
        } return l; }
        _link(t, i) { this._halfedges[t] = i, -1 !== i && (this._halfedges[i] = t); }
        _addTriangle(t, i, e, n, s, l) { const h = this.trianglesLen; return this._triangles[h] = t, this._triangles[h + 1] = i, this._triangles[h + 2] = e, this._link(h, n), this._link(h + 1, s), this._link(h + 2, l), this.trianglesLen += 3, h; }
    }
    function _(t, i, e, n) { const s = t - e, l = i - n; return s * s + l * l; }
    function d(t, i, e, n, s, l, h, r) { const o = t - h, a = i - r, c = e - h, u = n - r, f = s - h, _ = l - r, d = c * c + u * u, g = f * f + _ * _; return o * (u * g - d * _) - a * (c * g - d * f) + (o * o + a * a) * (c * _ - u * f) < 0; }
    function g(t, i, e, n, s, l) { const h = e - t, r = n - i, o = s - t, a = l - i, c = h * h + r * r, u = o * o + a * a, f = .5 / (h * a - r * o), _ = (a * c - r * u) * f, d = (h * u - o * c) * f; return _ * _ + d * d; }
    function y(t, i, e, n) { if (n - e <= 20)
        for (let s = e + 1; s <= n; s++) {
            const n = t[s], l = i[n];
            let h = s - 1;
            for (; h >= e && i[t[h]] > l;)
                t[h + 1] = t[h--];
            t[h + 1] = n;
        }
    else {
        let s = e + 1, l = n;
        m(t, e + n >> 1, s), i[t[e]] > i[t[n]] && m(t, e, n), i[t[s]] > i[t[n]] && m(t, s, n), i[t[e]] > i[t[s]] && m(t, e, s);
        const h = t[s], r = i[h];
        for (;;) {
            do {
                s++;
            } while (i[t[s]] < r);
            do {
                l--;
            } while (i[t[l]] > r);
            if (l < s)
                break;
            m(t, s, l);
        }
        t[e + 1] = t[l], t[l] = h, n - s + 1 >= l - e ? (y(t, i, s, n), y(t, i, e, l - 1)) : (y(t, i, e, l - 1), y(t, i, s, n));
    } }
    function m(t, i, e) { const n = t[i]; t[i] = t[e], t[e] = n; }
    function x(t) { return t[0]; }
    function p(t) { return t[1]; }
    const w = 1e-6;
    class v {
        constructor() { this._x0 = this._y0 = this._x1 = this._y1 = null, this._ = ""; }
        moveTo(t, i) { this._ += `M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +i}`; }
        closePath() { null !== this._x1 && (this._x1 = this._x0, this._y1 = this._y0, this._ += "Z"); }
        lineTo(t, i) { this._ += `L${this._x1 = +t},${this._y1 = +i}`; }
        arc(t, i, e) { const n = (t = +t) + (e = +e), s = i = +i; if (e < 0)
            throw new Error("negative radius"); null === this._x1 ? this._ += `M${n},${s}` : (Math.abs(this._x1 - n) > w || Math.abs(this._y1 - s) > w) && (this._ += "L" + n + "," + s), e && (this._ += `A${e},${e},0,1,1,${t - e},${i}A${e},${e},0,1,1,${this._x1 = n},${this._y1 = s}`); }
        rect(t, i, e, n) { this._ += `M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +i}h${+e}v${+n}h${-e}Z`; }
        value() { return this._ || null; }
    }
    class b {
        constructor() { this._ = []; }
        moveTo(t, i) { this._.push([t, i]); }
        closePath() { this._.push(this._[0].slice()); }
        lineTo(t, i) { this._.push([t, i]); }
        value() { return this._.length ? this._ : null; }
    }
    class T {
        constructor(t, [i, e, n, s] = [0, 0, 960, 500]) { if (!((n = +n) >= (i = +i) && (s = +s) >= (e = +e)))
            throw new Error("invalid bounds"); this.delaunay = t, this._circumcenters = new Float64Array(2 * t.points.length), this.vectors = new Float64Array(2 * t.points.length), this.xmax = n, this.xmin = i, this.ymax = s, this.ymin = e, this._init(); }
        update() { return this.delaunay.update(), this._init(), this; }
        _init() { const { delaunay: { points: t, hull: i, triangles: e }, vectors: n } = this, s = this.circumcenters = this._circumcenters.subarray(0, e.length / 3 * 2); for (let i, n, l = 0, h = 0, r = e.length; l < r; l += 3, h += 2) {
            const r = 2 * e[l], o = 2 * e[l + 1], a = 2 * e[l + 2], c = t[r], u = t[r + 1], f = t[o], _ = t[o + 1], d = t[a], g = t[a + 1], y = f - c, m = _ - u, x = d - c, p = g - u, w = 2 * (y * p - m * x);
            if (Math.abs(w) < 1e-9) {
                let s = 1e9;
                const l = 2 * e[0];
                s *= Math.sign((t[l] - c) * p - (t[l + 1] - u) * x), i = (c + d) / 2 - s * p, n = (u + g) / 2 + s * x;
            }
            else {
                const t = 1 / w, e = y * y + m * m, s = x * x + p * p;
                i = c + (p * e - m * s) * t, n = u + (y * s - x * e) * t;
            }
            s[h] = i, s[h + 1] = n;
        } let l, h, r, o = i[i.length - 1], a = 4 * o, c = t[2 * o], u = t[2 * o + 1]; n.fill(0); for (let e = 0; e < i.length; ++e)
            o = i[e], l = a, h = c, r = u, a = 4 * o, c = t[2 * o], u = t[2 * o + 1], n[l + 2] = n[a] = r - u, n[l + 3] = n[a + 1] = c - h; }
        render(t) { const i = null == t ? t = new v : void 0, { delaunay: { halfedges: e, inedges: n, hull: s }, circumcenters: l, vectors: h } = this; if (s.length <= 1)
            return null; for (let i = 0, n = e.length; i < n; ++i) {
            const n = e[i];
            if (n < i)
                continue;
            const s = 2 * Math.floor(i / 3), h = 2 * Math.floor(n / 3), r = l[s], o = l[s + 1], a = l[h], c = l[h + 1];
            this._renderSegment(r, o, a, c, t);
        } let r, o = s[s.length - 1]; for (let i = 0; i < s.length; ++i) {
            r = o, o = s[i];
            const e = 2 * Math.floor(n[o] / 3), a = l[e], c = l[e + 1], u = 4 * r, f = this._project(a, c, h[u + 2], h[u + 3]);
            f && this._renderSegment(a, c, f[0], f[1], t);
        } return i && i.value(); }
        renderBounds(t) { const i = null == t ? t = new v : void 0; return t.rect(this.xmin, this.ymin, this.xmax - this.xmin, this.ymax - this.ymin), i && i.value(); }
        renderCell(t, i) { const e = null == i ? i = new v : void 0, n = this._clip(t); if (null === n || !n.length)
            return; i.moveTo(n[0], n[1]); let s = n.length; for (; n[0] === n[s - 2] && n[1] === n[s - 1] && s > 1;)
            s -= 2; for (let t = 2; t < s; t += 2)
            n[t] === n[t - 2] && n[t + 1] === n[t - 1] || i.lineTo(n[t], n[t + 1]); return i.closePath(), e && e.value(); }
        *cellPolygons() { const { delaunay: { points: t } } = this; for (let i = 0, e = t.length / 2; i < e; ++i) {
            const t = this.cellPolygon(i);
            t && (t.index = i, yield t);
        } }
        cellPolygon(t) { const i = new b; return this.renderCell(t, i), i.value(); }
        _renderSegment(t, i, e, n, s) { let l; const h = this._regioncode(t, i), r = this._regioncode(e, n); 0 === h && 0 === r ? (s.moveTo(t, i), s.lineTo(e, n)) : (l = this._clipSegment(t, i, e, n, h, r)) && (s.moveTo(l[0], l[1]), s.lineTo(l[2], l[3])); }
        contains(t, i, e) { return (i = +i) == i && (e = +e) == e && this.delaunay._step(t, i, e) === t; }
        *neighbors(t) { const i = this._clip(t); if (i)
            for (const e of this.delaunay.neighbors(t)) {
                const t = this._clip(e);
                if (t)
                    t: for (let n = 0, s = i.length; n < s; n += 2)
                        for (let l = 0, h = t.length; l < h; l += 2)
                            if (i[n] == t[l] && i[n + 1] == t[l + 1] && i[(n + 2) % s] == t[(l + h - 2) % h] && i[(n + 3) % s] == t[(l + h - 1) % h]) {
                                yield e;
                                break t;
                            }
            } }
        _cell(t) { const { circumcenters: i, delaunay: { inedges: e, halfedges: n, triangles: s } } = this, l = e[t]; if (-1 === l)
            return null; const h = []; let r = l; do {
            const e = Math.floor(r / 3);
            if (h.push(i[2 * e], i[2 * e + 1]), r = r % 3 == 2 ? r - 2 : r + 1, s[r] !== t)
                break;
            r = n[r];
        } while (r !== l && -1 !== r); return h; }
        _clip(t) { if (0 === t && 1 === this.delaunay.hull.length)
            return [this.xmax, this.ymin, this.xmax, this.ymax, this.xmin, this.ymax, this.xmin, this.ymin]; const i = this._cell(t); if (null === i)
            return null; const { vectors: e } = this, n = 4 * t; return e[n] || e[n + 1] ? this._clipInfinite(t, i, e[n], e[n + 1], e[n + 2], e[n + 3]) : this._clipFinite(t, i); }
        _clipFinite(t, i) { const e = i.length; let n, s, l, h, r = null, o = i[e - 2], a = i[e - 1], c = this._regioncode(o, a), u = 0; for (let f = 0; f < e; f += 2)
            if (n = o, s = a, o = i[f], a = i[f + 1], l = c, c = this._regioncode(o, a), 0 === l && 0 === c)
                h = u, u = 0, r ? r.push(o, a) : r = [o, a];
            else {
                let i, e, f, _, d;
                if (0 === l) {
                    if (null === (i = this._clipSegment(n, s, o, a, l, c)))
                        continue;
                    [e, f, _, d] = i;
                }
                else {
                    if (null === (i = this._clipSegment(o, a, n, s, c, l)))
                        continue;
                    [_, d, e, f] = i, h = u, u = this._edgecode(e, f), h && u && this._edge(t, h, u, r, r.length), r ? r.push(e, f) : r = [e, f];
                }
                h = u, u = this._edgecode(_, d), h && u && this._edge(t, h, u, r, r.length), r ? r.push(_, d) : r = [_, d];
            } if (r)
            h = u, u = this._edgecode(r[0], r[1]), h && u && this._edge(t, h, u, r, r.length);
        else if (this.contains(t, (this.xmin + this.xmax) / 2, (this.ymin + this.ymax) / 2))
            return [this.xmax, this.ymin, this.xmax, this.ymax, this.xmin, this.ymax, this.xmin, this.ymin]; return r; }
        _clipSegment(t, i, e, n, s, l) { for (;;) {
            if (0 === s && 0 === l)
                return [t, i, e, n];
            if (s & l)
                return null;
            let h, r, o = s || l;
            8 & o ? (h = t + (e - t) * (this.ymax - i) / (n - i), r = this.ymax) : 4 & o ? (h = t + (e - t) * (this.ymin - i) / (n - i), r = this.ymin) : 2 & o ? (r = i + (n - i) * (this.xmax - t) / (e - t), h = this.xmax) : (r = i + (n - i) * (this.xmin - t) / (e - t), h = this.xmin), s ? (t = h, i = r, s = this._regioncode(t, i)) : (e = h, n = r, l = this._regioncode(e, n));
        } }
        _clipInfinite(t, i, e, n, s, l) { let h, r = Array.from(i); if ((h = this._project(r[0], r[1], e, n)) && r.unshift(h[0], h[1]), (h = this._project(r[r.length - 2], r[r.length - 1], s, l)) && r.push(h[0], h[1]), r = this._clipFinite(t, r))
            for (let i, e = 0, n = r.length, s = this._edgecode(r[n - 2], r[n - 1]); e < n; e += 2)
                i = s, s = this._edgecode(r[e], r[e + 1]), i && s && (e = this._edge(t, i, s, r, e), n = r.length);
        else
            this.contains(t, (this.xmin + this.xmax) / 2, (this.ymin + this.ymax) / 2) && (r = [this.xmin, this.ymin, this.xmax, this.ymin, this.xmax, this.ymax, this.xmin, this.ymax]); return r; }
        _edge(t, i, e, n, s) { for (; i !== e;) {
            let e, l;
            switch (i) {
                case 5:
                    i = 4;
                    continue;
                case 4:
                    i = 6, e = this.xmax, l = this.ymin;
                    break;
                case 6:
                    i = 2;
                    continue;
                case 2:
                    i = 10, e = this.xmax, l = this.ymax;
                    break;
                case 10:
                    i = 8;
                    continue;
                case 8:
                    i = 9, e = this.xmin, l = this.ymax;
                    break;
                case 9:
                    i = 1;
                    continue;
                case 1: i = 5, e = this.xmin, l = this.ymin;
            }
            n[s] === e && n[s + 1] === l || !this.contains(t, e, l) || (n.splice(s, 0, e, l), s += 2);
        } if (n.length > 4)
            for (let t = 0; t < n.length; t += 2) {
                const i = (t + 2) % n.length, e = (t + 4) % n.length;
                (n[t] === n[i] && n[i] === n[e] || n[t + 1] === n[i + 1] && n[i + 1] === n[e + 1]) && (n.splice(i, 2), t -= 2);
            } return s; }
        _project(t, i, e, n) { let s, l, h, r = 1 / 0; if (n < 0) {
            if (i <= this.ymin)
                return null;
            (s = (this.ymin - i) / n) < r && (h = this.ymin, l = t + (r = s) * e);
        }
        else if (n > 0) {
            if (i >= this.ymax)
                return null;
            (s = (this.ymax - i) / n) < r && (h = this.ymax, l = t + (r = s) * e);
        } if (e > 0) {
            if (t >= this.xmax)
                return null;
            (s = (this.xmax - t) / e) < r && (l = this.xmax, h = i + (r = s) * n);
        }
        else if (e < 0) {
            if (t <= this.xmin)
                return null;
            (s = (this.xmin - t) / e) < r && (l = this.xmin, h = i + (r = s) * n);
        } return [l, h]; }
        _edgecode(t, i) { return (t === this.xmin ? 1 : t === this.xmax ? 2 : 0) | (i === this.ymin ? 4 : i === this.ymax ? 8 : 0); }
        _regioncode(t, i) { return (t < this.xmin ? 1 : t > this.xmax ? 2 : 0) | (i < this.ymin ? 4 : i > this.ymax ? 8 : 0); }
    }
    const M = 2 * Math.PI, A = Math.pow;
    function k(t) { return t[0]; }
    function $(t) { return t[1]; }
    function P(t, i, e) { return [t + Math.sin(t + i) * e, i + Math.cos(t - i) * e]; }
    class S {
        static from(t, i = k, e = $, n) { return new S("length" in t ? function (t, i, e, n) { const s = t.length, l = new Float64Array(2 * s); for (let h = 0; h < s; ++h) {
            const s = t[h];
            l[2 * h] = i.call(n, s, h, t), l[2 * h + 1] = e.call(n, s, h, t);
        } return l; }(t, i, e, n) : Float64Array.from(function* (t, i, e, n) { let s = 0; for (const l of t)
            yield i.call(n, l, s, t), yield e.call(n, l, s, t), ++s; }(t, i, e, n))); }
        constructor(t) { this._delaunator = new f(t), this.inedges = new Int32Array(t.length / 2), this._hullIndex = new Int32Array(t.length / 2), this.points = this._delaunator.coords, this._init(); }
        update() { return this._delaunator.update(), this._init(), this; }
        _init() { const t = this._delaunator, i = this.points; if (t.hull && t.hull.length > 2 && function (t) { const { triangles: i, coords: e } = t; for (let t = 0; t < i.length; t += 3) {
            const n = 2 * i[t], s = 2 * i[t + 1], l = 2 * i[t + 2];
            if ((e[l] - e[n]) * (e[s + 1] - e[n + 1]) - (e[s] - e[n]) * (e[l + 1] - e[n + 1]) > 1e-10)
                return !1;
        } return !0; }(t)) {
            this.collinear = Int32Array.from({ length: i.length / 2 }, ((t, i) => i)).sort(((t, e) => i[2 * t] - i[2 * e] || i[2 * t + 1] - i[2 * e + 1]));
            const t = this.collinear[0], e = this.collinear[this.collinear.length - 1], n = [i[2 * t], i[2 * t + 1], i[2 * e], i[2 * e + 1]], s = 1e-8 * Math.hypot(n[3] - n[1], n[2] - n[0]);
            for (let t = 0, e = i.length / 2; t < e; ++t) {
                const e = P(i[2 * t], i[2 * t + 1], s);
                i[2 * t] = e[0], i[2 * t + 1] = e[1];
            }
            this._delaunator = new f(i);
        }
        else
            delete this.collinear; const e = this.halfedges = this._delaunator.halfedges, n = this.hull = this._delaunator.hull, s = this.triangles = this._delaunator.triangles, l = this.inedges.fill(-1), h = this._hullIndex.fill(-1); for (let t = 0, i = e.length; t < i; ++t) {
            const i = s[t % 3 == 2 ? t - 2 : t + 1];
            -1 !== e[t] && -1 !== l[i] || (l[i] = t);
        } for (let t = 0, i = n.length; t < i; ++t)
            h[n[t]] = t; n.length <= 2 && n.length > 0 && (this.triangles = new Int32Array(3).fill(-1), this.halfedges = new Int32Array(3).fill(-1), this.triangles[0] = n[0], l[n[0]] = 1, 2 === n.length && (l[n[1]] = 0, this.triangles[1] = n[1], this.triangles[2] = n[1])); }
        voronoi(t) { return new T(this, t); }
        *neighbors(t) { const { inedges: i, hull: e, _hullIndex: n, halfedges: s, triangles: l, collinear: h } = this; if (h) {
            const i = h.indexOf(t);
            return i > 0 && (yield h[i - 1]), void (i < h.length - 1 && (yield h[i + 1]));
        } const r = i[t]; if (-1 === r)
            return; let o = r, a = -1; do {
            if (yield a = l[o], o = o % 3 == 2 ? o - 2 : o + 1, l[o] !== t)
                return;
            if (o = s[o], -1 === o) {
                const i = e[(n[t] + 1) % e.length];
                return void (i !== a && (yield i));
            }
        } while (o !== r); }
        find(t, i, e = 0) { if ((t = +t) != t || (i = +i) != i)
            return -1; const n = e; let s; for (; (s = this._step(e, t, i)) >= 0 && s !== e && s !== n;)
            e = s; return s; }
        _step(t, i, e) { const { inedges: n, hull: s, _hullIndex: l, halfedges: h, triangles: r, points: o } = this; if (-1 === n[t] || !o.length)
            return (t + 1) % (o.length >> 1); let a = t, c = A(i - o[2 * t], 2) + A(e - o[2 * t + 1], 2); const u = n[t]; let f = u; do {
            let n = r[f];
            const u = A(i - o[2 * n], 2) + A(e - o[2 * n + 1], 2);
            if (u < c && (c = u, a = n), f = f % 3 == 2 ? f - 2 : f + 1, r[f] !== t)
                break;
            if (f = h[f], -1 === f) {
                if (f = s[(l[t] + 1) % s.length], f !== n && A(i - o[2 * f], 2) + A(e - o[2 * f + 1], 2) < c)
                    return f;
                break;
            }
        } while (f !== u); return a; }
        render(t) { const i = null == t ? t = new v : void 0, { points: e, halfedges: n, triangles: s } = this; for (let i = 0, l = n.length; i < l; ++i) {
            const l = n[i];
            if (l < i)
                continue;
            const h = 2 * s[i], r = 2 * s[l];
            t.moveTo(e[h], e[h + 1]), t.lineTo(e[r], e[r + 1]);
        } return this.renderHull(t), i && i.value(); }
        renderPoints(t, i) { void 0 !== i || t && "function" == typeof t.moveTo || (i = t, t = null), i = null == i ? 2 : +i; const e = null == t ? t = new v : void 0, { points: n } = this; for (let e = 0, s = n.length; e < s; e += 2) {
            const s = n[e], l = n[e + 1];
            t.moveTo(s + i, l), t.arc(s, l, i, 0, M);
        } return e && e.value(); }
        renderHull(t) { const i = null == t ? t = new v : void 0, { hull: e, points: n } = this, s = 2 * e[0], l = e.length; t.moveTo(n[s], n[s + 1]); for (let i = 1; i < l; ++i) {
            const s = 2 * e[i];
            t.lineTo(n[s], n[s + 1]);
        } return t.closePath(), i && i.value(); }
        hullPolygon() { const t = new b; return this.renderHull(t), t.value(); }
        renderTriangle(t, i) { const e = null == i ? i = new v : void 0, { points: n, triangles: s } = this, l = 2 * s[t *= 3], h = 2 * s[t + 1], r = 2 * s[t + 2]; return i.moveTo(n[l], n[l + 1]), i.lineTo(n[h], n[h + 1]), i.lineTo(n[r], n[r + 1]), i.closePath(), e && e.value(); }
        *trianglePolygons() { const { triangles: t } = this; for (let i = 0, e = t.length / 3; i < e; ++i)
            yield this.trianglePolygon(i); }
        trianglePolygon(t) { const i = new b; return this.renderTriangle(t, i), i.value(); }
    }
    t.Delaunay = S, t.Voronoi = T, Object.defineProperty(t, "__esModule", { value: !0 });
}));
let tesoi = "hello";
/**
gives out the object saved in InputConfig without any functions
*/
class dotscaling {
    // function for a linear dotplot
    static linear() {
        return {
            name: "linear",
            oneDotMode: "normal",
            scaleInput: -1,
            columnToDiamDom: (c, dSingle) => dSingle,
            scaleDensityDom: (density, dSingle) => density * dSingle * dSingle,
            scaleDensDiamDom: (density, dSingle) => dSingle
        };
    }
    /** root function */
    static root(r, oneDotMode = "constant") {
        if (r < 0 || 1 <= r) {
            throw new Error("Input for a root dotscale must be within [0, 1), is: " + r);
        }
        let scaleDensityRoot = (density, dSingle) => (Math.pow(density * dSingle, (1 - r) / (1 + r)) * dSingle);
        const scaleDensityRootFinal = dotscaling.changeOneDotMode(scaleDensityRoot, oneDotMode);
        return {
            name: "root",
            oneDotMode: oneDotMode,
            scaleInput: r,
            columnToDiamDom: (c, dSingle) => dSingle / Math.pow(c, r),
            scaleDensityDom: scaleDensityRootFinal,
            scaleDensDiamDom: (density, dSingle) => { return Math.sqrt(scaleDensityRoot(density, dSingle) / density); }
        };
    }
    /** log function with boundary search to get result height */
    static log(b, oneDotMode = "constant") {
        if (b < 2) {
            // base can't be smaller than 2, since root would become negative
            throw new Error("Base for a log dotscale must be greater or equal 2, is: " + b);
        }
        const scaleDensityLog = (density, dSingle) => {
            // formula does not work for density of 0
            if (density === 0) {
                return 0;
            }
            let startValue;
            let boundary = getNewSearchBoundary();
            // one known point at density === 1/dSingle -> scaled value === dSingle
            if (density === 1 / dSingle) {
                // density is equal to known point
                return dSingle;
            }
            else if (density < 1 / dSingle) {
                // density is lower than known point: new upperBoundary found
                boundary.upperBoundary = dSingle;
                boundary.hasUpperBoundary = true;
                startValue = (boundary.lowerBoundary + boundary.upperBoundary) / 2;
            }
            else {
                // density is higher than known point: new lowerBoundary found
                boundary.lowerBoundary = dSingle;
                startValue = 2 * dSingle;
            }
            // root (zero point) of function:
            let root = (dSingle * Math.log(b - 1)) / Math.log(b);
            // Formula from "density scale idea - log.pdf"
            let origLogFormula = (height) => { return Math.pow(Math.pow(b, height / dSingle) - b + 1, 2) / height; };
            let densityTestFunction;
            // Density around 1/dSingle has special cases
            if (density === 1 / dSingle) {
                // resulting scaled dens is always dSingle
                return dSingle;
            }
            else if (density < 1 / dSingle) {
                // special log function
                // see desmos plot in "Info/Stuff"
                densityTestFunction = (height) => { return origLogFormula(height + root) / (origLogFormula(dSingle + root) * dSingle); };
            }
            else {
                // standart log function
                densityTestFunction = origLogFormula;
            }
            return boundarySearch(density, densityTestFunction, true, boundary, startValue);
        };
        const scaleDensityLogFinal = dotscaling.changeOneDotMode(scaleDensityLog, oneDotMode);
        return {
            name: "log",
            oneDotMode: oneDotMode,
            scaleInput: b,
            columnToDiamDom: (c, dSingle) => ((Math.log(c + b - 1) / Math.log(b)) / c) * dSingle,
            scaleDensityDom: scaleDensityLogFinal,
            scaleDensDiamDom: (density, dSingle) => { return Math.sqrt(scaleDensityLogFinal(density, dSingle) / density); }
        };
    }
    /**
        Change the effect when dens < 1/dSingle
    */
    static changeOneDotMode(scaleDensityDom, oneDotMode) {
        // if oneDotMode is not normal we change the behavious below 1/dSingle
        switch (oneDotMode) {
            case "normal":
                return scaleDensityDom;
            case "linear":
                return (density, dSingle) => {
                    if (density <= 1 / dSingle) {
                        return density * dSingle * dSingle;
                    }
                    else {
                        return scaleDensityDom(density, dSingle);
                    }
                };
            case "constant":
                return (density, dSingle) => {
                    if (density === 0) {
                        return 0;
                    }
                    else if (density <= 1 / dSingle) {
                        return dSingle;
                    }
                    else {
                        return scaleDensityDom(density, dSingle);
                    }
                };
            default:
                break;
        }
    }
}
/**
Provides premade Kernel for density computing
*/
class kernel {
    /** Gaussian Kernel Bandwidth INSIDE Kernel */
    static gaussian() {
        // factor = 3 -> 99,73% of kernel area
        // factor = 3.5 -> 99,95% of kernel area
        // factor = 4 => 99,98% of kernel area
        const SIGMA_FACTOR = 3;
        return {
            name: "gaus",
            kernelFunction: (u, bandwidth) => {
                if (Math.abs(u) <= bandwidth) {
                    let sigma = (bandwidth / SIGMA_FACTOR);
                    return ((1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.pow(Math.E, (-1 / 2) * Math.pow((u / sigma), 2)));
                }
                else {
                    return 0;
                }
            },
            kernelSquaredIntegral: (bandwidth) => {
                return SIGMA_FACTOR * erf(SIGMA_FACTOR) / (2 * Math.sqrt(Math.PI) * bandwidth);
            }
        };
    }
    ;
    /** Uniform Kernel Bandwidth INSIDE Kernel */
    static uniform() {
        return {
            name: "uni",
            kernelFunction: (u, bandwidth) => {
                if (Math.abs(u) <= bandwidth) {
                    return (1 / (2 * bandwidth));
                }
                else {
                    return 0;
                }
            },
            kernelSquaredIntegral: (bandwidth) => {
                return 1 / (2 * bandwidth);
            }
        };
    }
    ;
    /** Epanechnikov (parabolic) Kernel (changed to incoorporate bandwidth) */
    static epanechnikov() {
        return {
            name: "epa",
            kernelFunction: (u, bandwidth) => {
                if (Math.abs(u) <= bandwidth) {
                    return (3 / (4 * bandwidth)) * (1 - Math.pow(u / bandwidth, 2));
                }
                else {
                    return 0;
                }
            },
            kernelSquaredIntegral: (bandwidth) => {
                return (9 * Math.pow(bandwidth, 2) + 3) / (8 * Math.pow(bandwidth, 3));
            }
        };
    }
    ;
    /** Kernel based of the area of a circle with the bandwisth as radius */
    static circleArea() {
        return {
            name: "cir",
            kernelFunction: (u, bandwidth) => {
                if (Math.abs(u) <= bandwidth) {
                    return (2 * Math.sqrt((bandwidth * bandwidth) - (u * u))) / (Math.PI * bandwidth * bandwidth);
                }
                else {
                    return 0;
                }
            },
            kernelSquaredIntegral: (bandwidth) => {
                return -1;
            }
        };
    }
    ;
}
/**  error function, License: public domain */
function erf(x) {
    // constants
    var a1 = 0.254829592;
    var a2 = -0.284496736;
    var a3 = 1.421413741;
    var a4 = -1.453152027;
    var a5 = 1.061405429;
    var p = 0.3275911;
    // Save the sign of x
    var sign = 1;
    if (x < 0) {
        sign = -1;
    }
    x = Math.abs(x);
    // A&S formula 7.1.26
    var t = 1.0 / (1.0 + p * x);
    var y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    return sign * y;
}
/**
Download @param text as a file with the name @param filename
*/
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
/** returns the euclidean deistance between two circles*/
function euclidDist(c1, c2) {
    return Math.sqrt((c1.xPix - c2.xPix) * (c1.xPix - c2.xPix) + (c1.yPix - c2.yPix) * (c1.yPix - c2.yPix));
}
/** creates a .txt file that can be read by the original Jacobian-creation programm */
function _exportLayoutToTxt(inputConfig, circleData, plotParam) {
    let content = "";
    let biggerSide = (plotParam.width > plotParam.height) ? plotParam.width : plotParam.height;
    let firstRun = true;
    circleData.forEach((circle) => {
        // every line is: `radius x-pos y-pos`
        // positions are divided by width or height (bigger one) to map numbers between [0,1] but also keep the aspectratio
        if (firstRun) {
            content += `${circle.radiusPix * (1 - inputConfig.dots.circlePadding) / biggerSide} ${circle.xPix / biggerSide} ${circle.yPix / biggerSide}`;
            firstRun = false;
        }
        else {
            content += `\n${circle.radiusPix * (1 - inputConfig.dots.circlePadding) / biggerSide} ${circle.xPix / biggerSide} ${circle.yPix / biggerSide}`;
        }
    });
    // saving the content as file
    let blob = new Blob([content], { type: "text/plain;charset=utf-16" });
    saveAs(blob, "blueNoiseInput.txt");
}
/* interfaces */
var StudyModeEnum;
(function (StudyModeEnum) {
    StudyModeEnum[StudyModeEnum["pick"] = 0] = "pick";
    StudyModeEnum[StudyModeEnum["compare"] = 1] = "compare";
    StudyModeEnum[StudyModeEnum["density"] = 2] = "density";
})(StudyModeEnum || (StudyModeEnum = {}));
var DotsColorModeEnum;
(function (DotsColorModeEnum) {
    DotsColorModeEnum[DotsColorModeEnum["normal"] = 0] = "normal";
    DotsColorModeEnum[DotsColorModeEnum["error"] = 1] = "error";
})(DotsColorModeEnum || (DotsColorModeEnum = {}));
var OneDotModeEnum;
(function (OneDotModeEnum) {
    OneDotModeEnum[OneDotModeEnum["normal"] = 0] = "normal";
    OneDotModeEnum[OneDotModeEnum["linear"] = 1] = "linear";
    OneDotModeEnum[OneDotModeEnum["constant"] = 2] = "constant";
})(OneDotModeEnum || (OneDotModeEnum = {}));
var RadiusModeEnum;
(function (RadiusModeEnum) {
    RadiusModeEnum[RadiusModeEnum["column"] = 0] = "column";
    RadiusModeEnum[RadiusModeEnum["kde"] = 1] = "kde";
})(RadiusModeEnum || (RadiusModeEnum = {}));
// all usable dotscaling names
var DotscaleNameEnum;
(function (DotscaleNameEnum) {
    DotscaleNameEnum[DotscaleNameEnum["linear"] = 0] = "linear";
    DotscaleNameEnum[DotscaleNameEnum["root"] = 1] = "root";
    DotscaleNameEnum[DotscaleNameEnum["log"] = 2] = "log";
})(DotscaleNameEnum || (DotscaleNameEnum = {}));
;
// all usable kernel names
var KernelNameEnum;
(function (KernelNameEnum) {
    KernelNameEnum[KernelNameEnum["gaus"] = 0] = "gaus";
    KernelNameEnum[KernelNameEnum["uni"] = 1] = "uni";
    KernelNameEnum[KernelNameEnum["epa"] = 2] = "epa";
    KernelNameEnum[KernelNameEnum["cir"] = 3] = "cir";
})(KernelNameEnum || (KernelNameEnum = {}));
;
// enum for all possible functions usable via webworker postmessage
var WwFunctionNameEnum;
(function (WwFunctionNameEnum) {
})(WwFunctionNameEnum || (WwFunctionNameEnum = {}));
var VoronoiColorModeEnum;
(function (VoronoiColorModeEnum) {
    VoronoiColorModeEnum[VoronoiColorModeEnum["normal"] = 0] = "normal";
    VoronoiColorModeEnum[VoronoiColorModeEnum["error"] = 1] = "error";
    VoronoiColorModeEnum[VoronoiColorModeEnum["coverage"] = 2] = "coverage";
})(VoronoiColorModeEnum || (VoronoiColorModeEnum = {}));
var RelaxVoronoiModeEnum;
(function (RelaxVoronoiModeEnum) {
    RelaxVoronoiModeEnum[RelaxVoronoiModeEnum["cone"] = 0] = "cone";
    RelaxVoronoiModeEnum[RelaxVoronoiModeEnum["flood"] = 1] = "flood";
})(RelaxVoronoiModeEnum || (RelaxVoronoiModeEnum = {}));
var RelaxXCorrectionTypeEnum;
(function (RelaxXCorrectionTypeEnum) {
    RelaxXCorrectionTypeEnum[RelaxXCorrectionTypeEnum["force"] = 0] = "force";
    RelaxXCorrectionTypeEnum[RelaxXCorrectionTypeEnum["linearArea"] = 1] = "linearArea";
    RelaxXCorrectionTypeEnum[RelaxXCorrectionTypeEnum["circleArea"] = 2] = "circleArea";
})(RelaxXCorrectionTypeEnum || (RelaxXCorrectionTypeEnum = {}));
;
/**
Draws the plot with added data and parameters
Returns an Object with all the functions of a plot
*/
function plotter() {
    let densityPlot;
    let plotTime = Date.now();
    // plot Var
    let voronoiGL;
    let inputConfig;
    let plotParam;
    let hasColor;
    // all in sweep included, but accessible for convenience
    let xDomain;
    let yDomain;
    let inputData;
    let width;
    let height;
    let xAxisHeight;
    // axis scales
    let xAxisScale;
    let yAxisScale;
    let dotShown = true;
    let densShown = false;
    let axisShown = true;
    let firstUpdate = true;
    /*
        Class to put in all GUI functions
    */
    let guiFunctions;
    /*
        Object that the user can use for plot functions
    */
    let dotplotReturn;
    // helper for saving new dot rads
    let newRads;
    function chart(selection) {
        selection.each(function (circleData) {
            let pixelMap;
            let evalOutput = {
                plotsettings: inputConfig,
                history: {
                    stepRuntime: [],
                    SSE: [],
                    MSE: [],
                    SDM: [],
                    MDM: [],
                    SSM: [],
                    MSM: [],
                    SOD: [],
                    MOD: [],
                    SOP: [],
                    MOP: []
                },
                metrics: {
                    SSE: 0
                }
            };
            // define svg with data
            let svg = d3.select(this).selectAll("svg").data([circleData]);
            let transformHeight;
            let transformWidth;
            // height transformation for uniform placement
            if (isNaN(parseInt(document.getElementById(inputConfig.containerId).style.height))) {
                transformHeight = 0;
            }
            else {
                transformHeight = (parseInt(document.getElementById(inputConfig.containerId).style.height) - (height + inputConfig.margin + xAxisHeight)) / 2;
            }
            if (isNaN(parseInt(document.getElementById(inputConfig.containerId).style.width))) {
                transformWidth = 0;
            }
            else {
                transformWidth = (parseInt(document.getElementById(inputConfig.containerId).style.width) - (width + (2 * inputConfig.margin))) / 2;
            }
            // svg container
            let svgTwo = svg.enter().append("svg")
                .attr("id", "plot-" + inputConfig.containerId)
                .attr("width", width + (2 * inputConfig.margin))
                .attr("height", height + inputConfig.margin + xAxisHeight)
                .attr("transform", "translate(" + transformWidth + "," + transformHeight + ")");
            // Graph
            let g = svgTwo.append("g").attr("transform", "translate(" + inputConfig.margin + "," + inputConfig.margin + ")");
            voronoiGL = new VoronoiGL(inputConfig, g);
            // Define div for tooltip
            let div = d3.select(this).append("div")
                .attr("class", "tooltip")
                .style("position", "absolute")
                .style("text-align", "left")
                .style("width", "auto")
                .style("height", "auto")
                .style("padding", "3px")
                .style("font", "12px sans-serif")
                .style("background", "lightsteelblue")
                .style("border-radius", "5px")
                .style("pointer-events", "none")
                .style("opacity", 0);
            //Define filter for blur
            if (inputConfig.blur.edge >= 0) {
                let defs = svgTwo.append("defs");
                // .selectAll("filter")
                // .data((d: CircleData) => {return d;})
                circleData.forEach(circle => {
                    defs.append("filter")
                        .attr("id", "cicleBlur-" + circle.xPix + circle.yPix)
                        .attr("height", ((circle.radiusPix * inputConfig.blur.val) * 200) + "%")
                        .attr("y", (((circle.radiusPix * inputConfig.blur.val) * -100) + 50) + "%")
                        .append("feGaussianBlur")
                        .attr("class", "blurValues")
                        .attr("in", "SourceGraphic")
                        .attr("stdDeviation", "0 " + ((circle.radiusPix * inputConfig.blur.val) * circle.blur));
                });
            }
            // Translation of x/y-Values into Pixel
            let y = d3.scaleLinear()
                .range([height, 0])
                .domain(yDomain);
            let x = d3.scaleLinear()
                .range([0, width])
                .domain(xDomain);
            let xAxis = d3.axisBottom(x)
                .ticks(inputConfig.xTicks)
                .tickPadding(7)
                .tickSize(0);
            // x-Axis Label
            let xAxisLabelSVG = g.append("text")
                .attr("class", "graph label")
                .attr("transform", "translate(" + (width / 2) + "," + (height + xAxisHeight - 4) + ")")
                .style("font", "15px sans-serif")
                .style("text-anchor", "middle")
                .text(inputConfig.xLabel);
            // Add Axis to graph
            let xAxisSVG = g.append("g")
                .attr("class", "x-axis")
                .attr("transform", "translate(0," + height + ")")
                .style("font", "15px sans-serif")
                .call(xAxis);
            let xAxisDescSVG = xAxisSVG.selectAll("g");
            xAxisDescSVG.select("line")
                .attr("y2", 5);
            //.attr("y1", -height);
            // creates a group for the circles
            let circleGroups = g.append("g")
                .attr("class", "circle-group");
            // Object with reference to every html-circle
            let circlesD3Ref = {};
            // gives every circle its attributes and Style
            circleData.forEach((circle) => {
                drawDot(circle);
            });
            // creates density plot
            densityPlot = g.append("path")
                .attr("id", "densityPlot-" + inputConfig.containerId)
                .attr("fill", "none")
                .attr("opacity", "0")
                .attr("stroke", "#000")
                .attr("stroke-width", 1)
                .attr("stroke-linejoin", "round");
            // densityPlot = d3.select("#densityPlot-" + inputConfig.containerId)
            // draws density for the first time
            let densityReturn = quickDrawDens();
            plotTime = Date.now() - plotTime;
            inputConfig.extraInfo.plotRuntime = plotTime;
            guiFunctions = {
                nextRelaxingSteps: nextRelaxingSteps,
                redrawGraph: redrawGraph,
                redrawDensity: redrawDensity,
                updateXTicks: updateXTicks,
                updateDotColor: updateDotColor,
                updateDotRads: updateDotRads,
                updateVoronoi: updateVoronoi,
                printCircleError: printCircleError,
                exportLayoutToTxt: exportLayoutToTxt,
                saveInputconfig: saveInputconfig,
                copyVoronoiURL: copyVoronoiURL,
                savePlotSVG: savePlotSVG,
                getOverlap: getOverlap,
                toggleVoronoi: toggleVoronoi,
                toggleDots: toggleDots,
                toggleLowOpaDots: toggleLowOpaDots,
                toggleDens: toggleDens,
                toggleAxis: toggleAxis,
                toggleAxisFull: toggleAxisFull,
            };
            dotplotReturn = {
                func: guiFunctions,
                inputConfig: inputConfig,
                plotParam: plotParam,
            };
            /**
             *
             * Function Dump
             *
             */
            /** Deletes and redraws the whole graph, then returns settings for the new one */
            function redrawGraph() {
                if (firstUpdate) {
                    firstUpdate = false;
                    try {
                        // create new dotscaling based on the input of the GUI
                        inputConfig.dots.dotscaling = dotscaling[inputConfig.dots.dotscaling.name](inputConfig.dots.dotscaling.scaleInput, inputConfig.dots.dotscaling.oneDotMode);
                        svg.enter().selectAll("*").remove();
                        return newRelaxedPlot(inputData, inputConfig);
                    }
                    catch (error) {
                        console.warn(error);
                        firstUpdate = true;
                    }
                }
            }
            /** saves png of the plot */
            function savePlotSVG() {
                saveSvg(document.getElementById("plot-" + inputConfig.containerId), "dotplot.svg");
            }
            /** save a txt with infos for making a blue noise image */
            function exportLayoutToTxt() {
                _exportLayoutToTxt(inputConfig, circleData, plotParam);
                ;
            }
            /** return the added overlap of all circles */
            function getOverlap() {
                circleData.forEach(circle => {
                    circle.xPix *= inputConfig.relaxing.supSampFactor;
                    circle.yPix *= inputConfig.relaxing.supSampFactor;
                    circle.origXpix *= inputConfig.relaxing.supSampFactor;
                    circle.radiusPix *= inputConfig.relaxing.supSampFactor;
                });
                let output = voronoiGL.showOverlap(inputConfig, circleData, plotParam);
                circleData.forEach(circle => {
                    circle.xPix /= inputConfig.relaxing.supSampFactor;
                    circle.yPix /= inputConfig.relaxing.supSampFactor;
                    circle.origXpix /= inputConfig.relaxing.supSampFactor;
                    circle.radiusPix /= inputConfig.relaxing.supSampFactor;
                });
                console.log(output);
                return output;
            }
            /** save a json of the inputconfig (does not include functions) and evaluation */
            function saveInputconfig() {
                download("evalOutput.json", JSON.stringify(evalOutput, null, 2));
            }
            /** update the xTicks on the x-Axis */
            function updateXTicks() {
                xAxis = d3.axisBottom(x)
                    .ticks(inputConfig.xTicks)
                    .tickPadding(7)
                    .tickSize(5);
                xAxisSVG.call(xAxis);
            }
            /** show/hide Density curve */
            function toggleDens() {
                if (densShown) {
                    densityPlot.style("opacity", "0");
                }
                else {
                    densityPlot.style("opacity", "1");
                }
                densShown = !densShown;
            }
            /** show/hide Dots */
            function toggleDots() {
                if (dotShown) {
                    for (const index in circlesD3Ref) {
                        // if images are used deactivate them and even the second dot
                        if (circlesD3Ref[index].image != null)
                            circlesD3Ref[index].image.style("opacity", "0");
                        if (circlesD3Ref[index].colorCircle != null)
                            circlesD3Ref[index].colorCircle.style("opacity", "0");
                    }
                }
                else {
                    for (const index in circlesD3Ref) {
                        if (circlesD3Ref[index].image != null)
                            circlesD3Ref[index].image.style("opacity", "1");
                        if (circlesD3Ref[index].colorCircle != null)
                            circlesD3Ref[index].colorCircle.style("opacity", "1");
                    }
                }
                dotShown = !dotShown;
            }
            /** show/hide Density curve*/
            function toggleLowOpaDots() {
                if (dotShown) {
                    for (const index in circlesD3Ref) {
                        // if images are used deactivate them and even the second dot
                        if (circlesD3Ref[index].image != null)
                            circlesD3Ref[index].image.style("opacity", "0.5");
                        if (circlesD3Ref[index].colorCircle != null)
                            circlesD3Ref[index].colorCircle.style("opacity", "0.5");
                    }
                }
                else {
                    for (const index in circlesD3Ref) {
                        if (circlesD3Ref[index].image != null)
                            circlesD3Ref[index].image.style("opacity", "1");
                        if (circlesD3Ref[index].colorCircle != null)
                            circlesD3Ref[index].colorCircle.style("opacity", "1");
                    }
                }
                dotShown = !dotShown;
            }
            /** show/hide some x-axis visuals */
            function toggleAxis() {
                if (axisShown) {
                    xAxisDescSVG.style("opacity", "0");
                    xAxisLabelSVG.style("opacity", "0");
                }
                else {
                    xAxisDescSVG.style("opacity", "1");
                    xAxisLabelSVG.style("opacity", "1");
                }
                axisShown = !axisShown;
            }
            /** show/hide full x-Axis */
            function toggleAxisFull() {
                if (axisShown) {
                    xAxisDescSVG.style("opacity", "0");
                    xAxisLabelSVG.style("opacity", "0");
                    xAxisSVG.style("opacity", "0");
                }
                else {
                    xAxisDescSVG.style("opacity", "1");
                    xAxisLabelSVG.style("opacity", "1");
                    xAxisSVG.style("opacity", "1");
                }
                axisShown = !axisShown;
            }
            /** recalculate and redraw density curve and update dots */
            function redrawDensity() {
                densityReturn = quickDrawDens();
                updateDotRads();
            }
            /** adds a new dot to the plot */
            function drawDot(circle) {
                circlesD3Ref[circle.d3RefID] = {};
                // colored circle is drawn if we either just use no image, or if the image has a border
                if (!inputConfig.images.useImages || hasColor) {
                    circlesD3Ref[circle.d3RefID].colorCircle = circleGroups.append("circle")
                        .attr("class", "circles")
                        .attr("transform", "translate(" + (circle.xPix) + "," + (yAxisScale(0) - circle.yPix) + ")")
                        .attr("id", circle.d3RefID)
                        .attr("r", getPadRadFunct(inputConfig)(circle.radiusPix))
                        .style("filter", (() => {
                        if (circle.blur > 0 && inputConfig.blur.edge >= 0) {
                            return "url(#" + "cicleBlur-" + circle.xPix + circle.yPix + ")";
                        }
                        return null;
                    })())
                        .style("fill", getCircleColor(inputConfig, circle))
                        .style("stroke", (inputConfig.dots.border ? "black" : ""))
                        .style("opacity", "1")
                        .on("mouseenter", () => {
                        const tooltip = document.querySelector('.tooltip');
                        div.html(circle.desc);
                        //div.html(circle.desc + "<br/>next id: " + circle.nextID.id + "<br/>id: " + circle.id)
                        if (d3.event.pageX > (width / 2)) {
                            div.style("left", (d3.event.pageX - parseInt(getComputedStyle(tooltip).width) - 7) + "px");
                        }
                        else {
                            div.style("left", (d3.event.pageX + 7) + "px");
                        }
                        if (d3.event.pageY > (height / 2)) {
                            div.style("top", (d3.event.pageY - parseInt(getComputedStyle(tooltip).height) - 3) + "px");
                        }
                        else {
                            div.style("top", (d3.event.pageY - 3) + "px");
                        }
                        div.style("opacity", 1);
                    })
                        .on("mouseleave", () => { div.style("opacity", 0); });
                }
                if (inputConfig.images.useImages) {
                    // create new image object
                    circlesD3Ref[circle.d3RefID].image = circleGroups.append("image")
                        .attr("xlink:href", circle.URL)
                        .on("mouseenter", () => {
                        const tooltip = document.querySelector('.tooltip');
                        div.html(circle.desc);
                        //div.html(circle.desc + "<br/>next id: " + circle.nextID.id + "<br/>id: " + circle.id)
                        if (d3.event.pageX > (width / 2)) {
                            div.style("left", (d3.event.pageX - parseInt(getComputedStyle(tooltip).width) - 7) + "px");
                        }
                        else {
                            div.style("left", (d3.event.pageX + 7) + "px");
                        }
                        if (d3.event.pageY > (height / 2)) {
                            div.style("top", (d3.event.pageY - parseInt(getComputedStyle(tooltip).height) - 3) + "px");
                        }
                        else {
                            div.style("top", (d3.event.pageY - 3) + "px");
                        }
                        div.style("opacity", 1);
                    })
                        .on("mouseleave", () => { div.style("opacity", 0); });
                    // check if image needs to be smaller
                    if (hasColor) {
                        circlesD3Ref[circle.d3RefID].image
                            .attr("transform", "translate(" + (circle.xPix - getPadRadFunct(inputConfig)(circle.radiusPix * inputConfig.images.imageBorderPerc)) + "," + (yAxisScale(0) - circle.yPix - getPadRadFunct(inputConfig)(circle.radiusPix * inputConfig.images.imageBorderPerc)) + ")")
                            .attr("width", getPadRadFunct(inputConfig)(circle.radiusPix * inputConfig.images.imageBorderPerc) * 2)
                            .attr("height", getPadRadFunct(inputConfig)(circle.radiusPix * inputConfig.images.imageBorderPerc) * 2);
                    }
                    else {
                        circlesD3Ref[circle.d3RefID].image
                            .attr("transform", "translate(" + (circle.xPix - getPadRadFunct(inputConfig)(circle.radiusPix)) + "," + (yAxisScale(0) - circle.yPix - getPadRadFunct(inputConfig)(circle.radiusPix)) + ")")
                            .attr("width", getPadRadFunct(inputConfig)(circle.radiusPix) * 2)
                            .attr("height", getPadRadFunct(inputConfig)(circle.radiusPix) * 2);
                    }
                }
            }
            /** recalculate and redraw density curve */
            function quickDrawDens() {
                return calculateDrawDensity(inputConfig, inputData, circleData, getXdomSample(inputConfig.density.sampleRate, plotParam), densityPlot, plotParam);
            }
            /** update the dot radius depending on the current density */
            function updateDotRads() {
                if (inputConfig.dots.radiusMode != "kde") {
                    return;
                }
                let padRadFunct = getPadRadFunct(inputConfig);
                //circlesD3Ref
                let newRads = {};
                let circleID;
                let circle;
                circleData.forEach((circle, index) => {
                    circleID = circle.d3RefID;
                    // calc new Radius
                    circle.radiusPix = inputConfig.dots.dotscaling.scaleDensDiamDom(plotParam.kde(circle.origXdom), inputConfig.dots.dSingle) * plotParam.domainToPixel / 2;
                    // change optical circle
                    if (circlesD3Ref[circleID].colorCircle != null)
                        circlesD3Ref[circleID].colorCircle.attr("r", padRadFunct(circle.radiusPix));
                    if (inputConfig.images.useImages) {
                        if (hasColor) {
                            // with colored border
                            circlesD3Ref[circleID].image.attr("transform", "translate(" + (circle.xPix - padRadFunct(circle.radiusPix * inputConfig.images.imageBorderPerc)) + "," + (yAxisScale(0) - circle.yPix - padRadFunct(circle.radiusPix * inputConfig.images.imageBorderPerc)) + ")")
                                .attr("width", padRadFunct(circle.radiusPix * inputConfig.images.imageBorderPerc) * 2)
                                .attr("height", padRadFunct(circle.radiusPix * inputConfig.images.imageBorderPerc) * 2);
                        }
                        else {
                            // no colored border
                            circlesD3Ref[circleID].image.attr("transform", "translate(" + (circle.xPix - padRadFunct(circle.radiusPix)) + "," + (yAxisScale(0) - circle.yPix - padRadFunct(circle.radiusPix)) + ")")
                                .attr("width", padRadFunct(circle.radiusPix) * 2)
                                .attr("height", padRadFunct(circle.radiusPix) * 2);
                        }
                    }
                    // put on result object
                    newRads[index] = circle.radiusPix;
                });
            }
            /** update optical dot positions */
            function updateDotPosition() {
                let description;
                let padRad = getPadRadFunct(inputConfig);
                let circleID;
                circleData.forEach(circle => {
                    circleID = circle.d3RefID;
                    // images have slightly different positions
                    if (circlesD3Ref[circleID].colorCircle != null) {
                        circlesD3Ref[circleID].colorCircle.attr("transform", "translate(" + circle.xPix + "," + (yAxisScale(0) - circle.yPix) + ")")
                            .style("fill", getCircleColor(inputConfig, circle));
                    }
                    if (inputConfig.images.useImages) {
                        if (hasColor) {
                            circlesD3Ref[circleID].image.attr("transform", "translate(" + (circle.xPix - padRad(circle.radiusPix * inputConfig.images.imageBorderPerc)) + "," + (yAxisScale(0) - circle.yPix - padRad(circle.radiusPix * inputConfig.images.imageBorderPerc)) + ")");
                        }
                        else {
                            circlesD3Ref[circleID].image.attr("transform", "translate(" + (circle.xPix - padRad(circle.radiusPix)) + "," + (yAxisScale(0) - circle.yPix - padRad(circle.radiusPix)) + ")");
                        }
                    }
                });
            }
            /** update dot color */
            function updateDotColor() {
                let circleID;
                let circle;
                circleData.forEach(circle => {
                    circleID = circle.d3RefID;
                    if (circlesD3Ref[circleID].colorCircle != null) {
                        circlesD3Ref[circleID].colorCircle.style("fill", getCircleColor(inputConfig, circle));
                    }
                });
            }
            /**
                execute the relaxation process
                Dots are distributed below the density curve
            */
            async function nextRelaxingSteps() {
                let relaxStatus;
                let circleOne;
                let circleTwo;
                let relaxStep = 0;
                let stopError;
                // console.log("E" + EPSILON);
                evalOutput.metrics.totalRuntime = Date.now();
                let stepRuntime;
                let overlapStatus;
                let overlapDistance;
                let sumOverlapDiameter;
                // preparing circleData for relaxing, and afterwards changing back again
                circleData.forEach(circle => {
                    circle.xPix *= inputConfig.relaxing.supSampFactor;
                    circle.yPix *= inputConfig.relaxing.supSampFactor;
                    circle.origXpix *= inputConfig.relaxing.supSampFactor;
                    circle.radiusPix *= inputConfig.relaxing.supSampFactor;
                });
                // set last overlap to infinity, just to have a value
                // lastOverlap = Infinity;
                for (; relaxStep < inputConfig.relaxing.iter; relaxStep++) {
                    stepRuntime = Date.now();
                    relaxStatus = await relaxationStep(inputConfig, circleData, plotParam, voronoiGL, hasColor);
                    // total runtime
                    evalOutput.history.stepRuntime.push(Date.now() - stepRuntime);
                    if (inputConfig.debugMeasurements) {
                        overlapStatus = voronoiGL.showOverlap(inputConfig, circleData, plotParam);
                        // overlap error
                        sumOverlapDiameter = 0;
                        let smallestDistance;
                        for (let indxOne = 0; indxOne < circleData.length; indxOne++) {
                            circleOne = circleData[indxOne];
                            smallestDistance = Infinity;
                            for (let indxTwo = 0; indxTwo < circleData.length; indxTwo++) {
                                circleTwo = circleData[indxTwo];
                                if (indxOne === indxTwo)
                                    continue;
                                // distance from middle of dot 1 to outside of dot 2
                                overlapDistance = Math.max(euclidDist(circleOne, circleTwo) - getPadRadFunct(inputConfig)(circleTwo.radiusPix), 0);
                                // onlz take smallest distance, because if dot doesn|t overlap that, he won't overlap any
                                smallestDistance = (overlapDistance < smallestDistance) ? overlapDistance : smallestDistance;
                                // if circle is completely enveloped no need to look for others
                                if (smallestDistance <= 0)
                                    break;
                            }
                            // if dot 2 completely envelops dot one, error is max
                            if (smallestDistance <= 0) {
                                sumOverlapDiameter += 1;
                                // no overlaping of dots
                            }
                            else if (smallestDistance >= getPadRadFunct(inputConfig)(circleOne.radiusPix)) {
                                sumOverlapDiameter += 0;
                            }
                            else {
                                sumOverlapDiameter += 1 - (smallestDistance / getPadRadFunct(inputConfig)(circleOne.radiusPix));
                            }
                        }
                        // half the result
                        sumOverlapDiameter /= 2;
                        // placing error
                        evalOutput.history.SSE.push(relaxStatus.sumSquaredError);
                        evalOutput.history.MSE.push(relaxStatus.sumSquaredError / inputConfig.extraInfo.dotCount);
                        // movement
                        evalOutput.history.SDM.push(relaxStatus.sumDotMove);
                        evalOutput.history.MDM.push(relaxStatus.sumDotMove / inputConfig.extraInfo.dotCount);
                        // movement squared
                        evalOutput.history.SSM.push(relaxStatus.squaredSumDotMove);
                        evalOutput.history.MSM.push(relaxStatus.squaredSumDotMove / inputConfig.extraInfo.dotCount);
                        // overlap diameter percentages
                        evalOutput.history.SOD.push(sumOverlapDiameter);
                        evalOutput.history.MOD.push(sumOverlapDiameter / inputConfig.extraInfo.dotCount);
                        // overlap pixel
                        evalOutput.history.SOP.push(overlapStatus.SOP);
                        evalOutput.history.MOP.push(overlapStatus.MOP);
                    }
                    // end
                    // Stop condition: Error change small enough
                    // now MDM
                    stopError = relaxStatus.sumDotMove / inputConfig.extraInfo.dotCount;
                    if (relaxStep != 0 && stopError <= inputConfig.relaxing.stopThreshold) {
                        // console.log("relaxation early stop at step: " + (relaxStep + 1));
                        break;
                    }
                    // increase epsilon by fixed rate
                    //epsilon += 0.02
                }
                circleData.forEach(circle => {
                    circle.xPix /= inputConfig.relaxing.supSampFactor;
                    circle.yPix /= inputConfig.relaxing.supSampFactor;
                    circle.origXpix /= inputConfig.relaxing.supSampFactor;
                    circle.radiusPix /= inputConfig.relaxing.supSampFactor;
                });
                // total runtime
                evalOutput.metrics.relaxRuntime = d3.sum(evalOutput.history.stepRuntime);
                evalOutput.metrics.totalRuntime = Date.now() - evalOutput.metrics.totalRuntime;
                if (inputConfig.debugMeasurements) {
                    // placing error
                    evalOutput.metrics.SSE = relaxStatus.sumSquaredError;
                    evalOutput.metrics.MSE = relaxStatus.sumSquaredError / inputConfig.extraInfo.dotCount;
                    // movement
                    evalOutput.metrics.SDM = relaxStatus.sumDotMove;
                    evalOutput.metrics.MDM = relaxStatus.sumDotMove / inputConfig.extraInfo.dotCount;
                    // movement squared
                    evalOutput.metrics.SSM = relaxStatus.squaredSumDotMove;
                    evalOutput.metrics.MSM = relaxStatus.squaredSumDotMove / inputConfig.extraInfo.dotCount;
                    // overlap diameter percentages
                    evalOutput.metrics.SOD = sumOverlapDiameter;
                    evalOutput.metrics.MOD = sumOverlapDiameter / inputConfig.extraInfo.dotCount;
                    // overlap pixel
                    evalOutput.metrics.SOP = overlapStatus.SOP;
                    evalOutput.metrics.MOP = overlapStatus.MOP;
                }
                else {
                    evalOutput.metrics.SSE = null;
                    evalOutput.metrics.MSE = null;
                    // movement
                    evalOutput.metrics.SDM = null;
                    evalOutput.metrics.MDM = null;
                    // movement squared
                    evalOutput.metrics.SSM = null;
                    evalOutput.metrics.MSM = null;
                    // overlap diameter percentages
                    evalOutput.metrics.SOD = null;
                    evalOutput.metrics.MOD = null;
                    // overlap pixel
                    evalOutput.metrics.SOP = null;
                    evalOutput.metrics.MOP = null;
                }
                updateDotPosition();
                console.log("Relaxing Done");
            }
            function updateVoronoi() {
                circleData.forEach(circle => {
                    circle.xPix *= inputConfig.relaxing.supSampFactor;
                    circle.yPix *= inputConfig.relaxing.supSampFactor;
                    circle.radiusPix *= inputConfig.relaxing.supSampFactor;
                });
                voronoiGL.updateVoronoiImage(inputConfig, circleData, plotParam);
                circleData.forEach(circle => {
                    circle.xPix /= inputConfig.relaxing.supSampFactor;
                    circle.yPix /= inputConfig.relaxing.supSampFactor;
                    circle.radiusPix /= inputConfig.relaxing.supSampFactor;
                });
            }
            /** show/hide voronoi image */
            function toggleVoronoi() {
                if (voronoiGL.toggleVisibility()) {
                    updateVoronoi();
                }
            }
            /** copy voronoi as a data URL */
            function copyVoronoiURL() {
                console.log("Copied Voronoi URL to clipboard!");
                //window.open(voronoiGL.getDataURL());
                navigator.clipboard.writeText(voronoiGL.getDataURL());
            }
            /** log circle error on the console */
            function printCircleError() {
                let errorSum = 0;
                circleData.forEach(circle => {
                    errorSum += Math.pow(((circle.origXpix - circle.xPix) / circle.radiusPix), 2);
                });
                console.log("Summed Squared Error: " + (errorSum));
                console.log("Mean Squared Error: " + (errorSum / circleData.length));
            }
        });
    }
    // Setter
    chart.inputConfig = (input) => {
        inputConfig = input;
        return chart;
    };
    chart.inputData = (input) => {
        inputData = input;
        return chart;
    };
    chart.plotParam = (input) => {
        plotParam = input;
        xDomain = plotParam.xDomain;
        yDomain = plotParam.yDomain;
        xAxisScale = plotParam.xAxisScale;
        yAxisScale = plotParam.yAxisScale;
        width = plotParam.width;
        height = plotParam.height;
        xAxisHeight = plotParam.xAxisHeight;
        return chart;
    };
    chart.hasColor = (input) => {
        hasColor = input;
        return chart;
    };
    chart.dotplotReturn = () => {
        return dotplotReturn;
    };
    return chart;
}
function validateInput(inputConfig, inputData) {
    // error helpers
    let attributeMapType;
    let colorAttributeType;
    let helpArray;
    /** Basic input */
    if (Object.prototype.toString.call(inputData) != '[object Array]') {
        throw new Error("inputData must be an Array");
    }
    else if (inputData.length === 0) {
        throw new Error("inputData is empty");
    }
    else if (Object.prototype.toString.call(inputConfig.containerId) != '[object String]') {
        throw new Error("containerId must be a String");
    }
    else if (document.getElementById(inputConfig.containerId) === null) {
        throw new Error("containerId not found. Looked for: \"" + inputConfig.containerId + "\"");
    }
    else if (Object.prototype.toString.call(inputConfig.xAttribute) != '[object String]') {
        throw new Error("xAttribute must be a String");
    }
    else if (!(inputConfig.xAttribute in inputData[0])) {
        throw new Error("xAttribute not found in data. Looked for: \"" + inputConfig.xAttribute + "\"");
    }
    else if (Object.prototype.toString.call(inputConfig.xTicks) != '[object Number]') {
        throw new Error("xTicks must be a Number");
    }
    else if (inputConfig.xTicks < 0) {
        throw new Error("xTicks must be positive, is: \"" + inputConfig.xTicks + "\"");
    }
    else if (Object.prototype.toString.call(inputConfig.margin) != '[object Number]') {
        throw new Error("margin must be a Number");
    }
    else if (inputConfig.margin < 0) {
        throw new Error("margin must be positive, is: \"" + inputConfig.margin + "\"");
    }
    else if (Object.prototype.toString.call(inputConfig.randomSeed) != '[object Number]') {
        throw new Error("randomSeed must be a Number");
    }
    else if (Object.prototype.toString.call(inputConfig.debugMeasurements) != '[object Boolean]') {
        throw new Error("debugMeasurements must be a Boolean");
    }
    /** Dots Config */
    if (Object.prototype.toString.call(inputConfig.dots.dSingle) != '[object Number]') {
        throw new Error("dots.dSingle must be a Number");
    }
    else if (inputConfig.dots.dSingle <= 0) {
        throw new Error("dots.dSingle should be greater than 0, is: \"" + inputConfig.dots.dSingle + "\"");
    }
    else if (!getKeysFromEnum(RadiusModeEnum).includes(inputConfig.dots.radiusMode)) {
        throw new Error("dots.radiusMode has to be one of [" + getKeysFromEnum(RadiusModeEnum) + "] , is : \"" + inputConfig.dots.radiusMode + "\"");
    }
    else if (inputConfig.dots.dotscaling.name === undefined) {
        throw new Error("inputConfig.dots.dotscaling should only be set via the dotscaling class");
    }
    else if (Object.prototype.toString.call(inputConfig.dots.circlePadding) != '[object Number]') {
        throw new Error("dots.circlePadding must be a Number");
    }
    else if (inputConfig.dots.circlePadding < 0 || inputConfig.dots.circlePadding > 1) {
        throw new Error("dots.circlePadding should be within [0,1], is: \"" + inputConfig.dots.circlePadding + "\"");
    }
    /** Color Config */
    attributeMapType = Object.prototype.toString.call(inputConfig.color.attributeMap);
    colorAttributeType = Object.prototype.toString.call(inputConfig.color.attribute);
    if (colorAttributeType != '[object String]' && colorAttributeType != '[object Null]') {
        throw new Error("color.attribute must be a String or Null");
    }
    else if (!(inputConfig.color.attribute in inputData[0]) && inputConfig.color.attribute != "" && inputConfig.color.attribute != null) {
        throw new Error("color.attribute not found in data. Looked for: \"" + inputConfig.color.attribute + "\"");
    }
    else if (Object.prototype.toString.call(inputConfig.color.scale) != '[object Array]') {
        throw new Error("color.scale must be an Array");
    }
    else if (inputConfig.color.scale.length === 0) {
        throw new Error("color.scale should not be an empty array");
    }
    else if (attributeMapType != '[object Function]' && attributeMapType != '[object Null]') {
        throw new Error("color.attributeMap must be a Function or Null");
    }
    else if (Object.prototype.toString.call(inputConfig.color.differenceTolerance) != '[object Number]') {
        throw new Error("color.differenceTolerance must be a Number");
    }
    else if (!getKeysFromEnum(DotsColorModeEnum).includes(inputConfig.color.colorMode)) {
        throw new Error("color.colorMode has to be one of [" + getKeysFromEnum(DotsColorModeEnum) + "] , is : \"" + inputConfig.color.colorMode + "\"");
    }
    //validate positions and color if color is used
    if ((inputConfig.color.attribute in inputData[0])) {
        if (inputConfig.color.scale.length === 1) {
            // Only one color (no need for position)
            inputConfig.color.scale[0].position = 1;
            if (Object.prototype.toString.call(inputConfig.color.scale[0].color) != '[object String]') {
                throw new Error("color in color.scale must be a String");
            }
        }
        else {
            inputConfig.color.scale.forEach((item, index) => {
                if (Object.prototype.toString.call(item.color) != '[object String]') {
                    throw new Error("color in color.scale must be a String");
                }
                if (!("position" in item)) {
                    throw new Error("Position for color: \"" + item.color + "\" is missing");
                }
                else if (item.position < 0 || item.position > 1) {
                    throw new Error("Position for color: \"" + item.color + "\" must be within [0,1], but is: \"" + item.position + "\"");
                }
            });
        }
    }
    /** Aspect Config */
    if (Object.prototype.toString.call(inputConfig.aspect.ratio) != '[object Number]') {
        throw new Error("aspect.ratio must be a Number");
    }
    else if (inputConfig.density.kernel.name === undefined) {
        throw new Error("inputConfig.density.kernel should only be set via the kernel class");
    }
    else if (Object.prototype.toString.call(inputConfig.aspect.iter) != '[object Number]') {
        throw new Error("aspect.iter must be a Number");
    }
    else if (inputConfig.aspect.iter <= 0) {
        throw new Error("aspect.iter should be greater than 0, is: \"" + inputConfig.aspect.iter + "\"");
    }
    /** Density Config */
    if (Object.prototype.toString.call(inputConfig.density.bandwidth) != '[object Number]') {
        throw new Error("density.bandwidth must be a Number");
    }
    else if (inputConfig.density.bandwidth <= 0) {
        throw new Error("density.bandwidth should be greater than 0, is: \"" + inputConfig.density.bandwidth + "\"");
    }
    else if (Object.prototype.toString.call(inputConfig.density.sampleRate) != '[object Number]') {
        throw new Error("density.sampleRate must be a Number");
    }
    /** Relaxing Config */
    if (Object.prototype.toString.call(inputConfig.relaxing.iter) != '[object Number]') {
        throw new Error("relaxing.iter must be a Number");
    }
    else if (inputConfig.relaxing.iter <= 0) {
        throw new Error("relaxing.iter should be greater than 0, is: \"" + inputConfig.relaxing.iter + "\"");
    }
    else if (Object.prototype.toString.call(inputConfig.relaxing.supSampFactor) != '[object Number]') {
        throw new Error("relaxing.supSampFactor must be a Number");
    }
    else if (!getKeysFromEnum(VoronoiColorModeEnum).includes(inputConfig.relaxing.colorMode)) {
        throw new Error("relaxing.colorMode has to be one of [" + getKeysFromEnum(VoronoiColorModeEnum) + "] , is : \"" + inputConfig.relaxing.colorMode + "\"");
    }
    else if (!getKeysFromEnum(RelaxVoronoiModeEnum).includes(inputConfig.relaxing.voronoiMode)) {
        throw new Error("relaxing.colorMode has to be one of [" + getKeysFromEnum(RelaxVoronoiModeEnum) + "] , is : \"" + inputConfig.relaxing.voronoiMode + "\"");
    }
    else if (Object.prototype.toString.call(inputConfig.relaxing.errorScale) != '[object Number]') {
        throw new Error("relaxing.errorScale must be a Number");
    }
    else if (Object.prototype.toString.call(inputConfig.relaxing.xCorrection) != '[object Number]') {
        throw new Error("relaxing.xCorrection must be a Number");
    }
    else if (!getKeysFromEnum(RelaxXCorrectionTypeEnum).includes(inputConfig.relaxing.xCorrectionType)) {
        throw new Error("relaxing.colorMode has to be one of [" + getKeysFromEnum(RelaxXCorrectionTypeEnum) + "] , is : \"" + inputConfig.relaxing.xCorrectionType + "\"");
    }
    else if (Object.prototype.toString.call(inputConfig.relaxing.xOffsetWeight) != '[object Number]') {
        throw new Error("relaxing.xOffsetWeight must be a Number");
    }
    else if (Object.prototype.toString.call(inputConfig.relaxing.yOffsetWeight) != '[object Number]') {
        throw new Error("relaxing.yOffsetWeight must be a Number");
    }
    else if (Object.prototype.toString.call(inputConfig.relaxing.stopThreshold) != '[object Number]') {
        throw new Error("relaxing.stopThreshold must be a Number");
    }
    else if (Object.prototype.toString.call(inputConfig.relaxing.overlapUsePadding) != '[object Boolean]') {
        throw new Error("relaxing.overlapUsePadding must be a Boolean");
    }
    else if (Object.prototype.toString.call(inputConfig.relaxing.useWebGL) != '[object Boolean]') {
        throw new Error("relaxing.useWebGL must be a Boolean");
    }
    else if (Object.prototype.toString.call(inputConfig.relaxing.squichDots) != '[object Boolean]') {
        throw new Error("relaxing.squichDots must be a Boolean");
    }
    /** Images Config */
    if (inputConfig.images.useImages && inputConfig.images.attribute === null) {
        throw new Error("images.useImages is set to true, though no images.attribute was provided");
    }
    else if (inputConfig.images.useImages && !(inputConfig.images.attribute in inputData[0])) {
        throw new Error("images.attribute not found in data. Looked for: \"" + inputConfig.images.attribute + "\"");
    }
    /** Blur Config */
    if (Object.prototype.toString.call(inputConfig.blur.edge) != '[object Number]') {
        throw new Error("blur.edge must be a Number");
    }
    else if (Object.prototype.toString.call(inputConfig.blur.val) != '[object Number]') {
        throw new Error("blur.val must be a Number");
    }
    else if (Object.prototype.toString.call(inputConfig.blur.ramp) != '[object Number]') {
        throw new Error("blur.ramp must be a Number");
    }
    else if (inputConfig.blur.ramp < 0) {
        throw new Error("blur.ramp should be 0 or greater, is: \"" + inputConfig.blur.ramp + "\"");
    }
    else if (Object.prototype.toString.call(inputConfig.blur.gapDistance) != '[object Number]') {
        throw new Error("blur.gapDistance must be a Number");
    }
    /*
        get enum entries as array to simplify making sure only valid enum entries are used
    */
    function getKeysFromEnum(enumInput) {
        helpArray = Object.values(enumInput);
        // array has all names, then all indices. So we slice off indices
        return helpArray.slice(0, helpArray.length / 2);
    }
}
/**
Receives inputData and inputConfig as input.
Throws error if input contains a mistake
Initializes the doubleSweep and calculates everything necessary for graph drawing with d3
*/
async function newRelaxedPlot(inputData, inputConfig) {
    // is color active
    let hasColor;
    // result of the double Sweep and window size calculation
    let plotParam;
    // Circles in array
    let circleData;
    // chart to draw the plot
    let chart;
    // dotplot functions
    let dotPlot;
    // start of the output to be put into the output file
    inputConfig.extraInfo = {
        dotCount: inputData.length
    };
    // fill in standard values for all configs
    inputConfig = Object.assign({
        containerId: "div",
        xAttribute: "x",
        xTicks: 10,
        margin: 10,
        xLabel: inputConfig.xAttribute,
        randomSeed: 12345,
        studyActive: false,
        debugMeasurements: false
    }, inputConfig);
    // dot settings
    inputConfig.dots = Object.assign({
        dSingle: 1,
        radiusMode: "kde",
        dotscaling: dotscaling.root(0.3),
        circlePadding: 0.1,
        border: false
    }, inputConfig.dots);
    // color values
    inputConfig.color = Object.assign({
        attribute: null,
        scale: [{ color: "black", position: 1 }],
        attributeMap: null,
        differenceTolerance: 5,
        colorMode: "normal"
    }, inputConfig.color);
    inputConfig.aspect = Object.assign({
        // width / height
        ratio: -1,
        iter: 50
    }, inputConfig.aspect);
    inputConfig.blur = Object.assign({
        edge: -1,
        val: 1,
        ramp: 3,
        gapDistance: 2
    }, inputConfig.blur);
    // density attributes
    inputConfig.density = Object.assign({
        dSingleBandwidth: true,
        bandwidth: inputConfig.dots.dSingle
        // if 0 or smaller use pixel width
        ,
        sampleRate: -1,
        kernel: kernel.gaussian(),
        ballonballonEstimator: 1,
        useBoundary: true
        // TEMP VAR TODO
        // ,percent: 0
    }, inputConfig.density);
    // Balloon estimator attributes
    inputConfig.density.balloonEstimator = Object.assign({
        active: false,
        constant: 2
    }, inputConfig.density.balloonEstimator);
    // Relaxing config
    inputConfig.relaxing = Object.assign({
        iter: 200,
        stopThreshold: 0.003,
        supSampFactor: 4,
        colorMode: "normal",
        voronoiMode: "flood",
        useKDE: true,
        errorScale: 64,
        xCorrection: 0.3,
        xCorrectionType: "force"
        // weights for x and y direction offset during relaxing
        ,
        xOffsetWeight: 1,
        yOffsetWeight: 2
        // should the overlap use the padding
        ,
        overlapUsePadding: false,
        useWebGL: true,
        squichDots: true
    }, inputConfig.relaxing);
    // Images attributes
    inputConfig.images = Object.assign({
        attribute: inputConfig.color.attribute,
        useImages: false,
        imageBorderPerc: 0.8
    }, inputConfig.images);
    // xLabel setting
    if (inputConfig.xLabel === undefined) {
        inputConfig.xLabel = inputConfig.xAttribute;
    }
    /* Throw Errors */
    validateInput(inputConfig, inputData);
    // check if color is used
    hasColor = (inputConfig.color.attribute in inputData[0]);
    /* Flooring Integers*/
    inputConfig.xTicks = Math.floor(inputConfig.xTicks);
    inputConfig.blur.edge = Math.floor(inputConfig.blur.edge);
    inputConfig.blur.ramp = Math.floor(inputConfig.blur.ramp);
    inputConfig.aspect.iter = Math.floor(inputConfig.aspect.iter);
    // sort InputData according to the xAttribute (low to high)
    sortX(inputData, inputConfig.xAttribute);
    // doubleSweep and window size
    plotParam = createPlotDimension(inputConfig, inputData, hasColor, document.getElementById(inputConfig.containerId).style.height, document.getElementById(inputConfig.containerId).style.width);
    // create circle data
    circleData = createCircleData(inputConfig, inputData, hasColor, plotParam);
    // create graph for d3
    chart = plotter();
    chart.inputConfig(inputConfig)
        .inputData(inputData)
        .plotParam(plotParam)
        .hasColor(hasColor);
    // d3 draws graph with data
    d3.select("#" + inputConfig.containerId)
        .datum(circleData)
        .call(chart);
    // Returned object that represents the dotplot and all settings tied to it
    dotPlot = chart.dotplotReturn();
    // starter functions
    await dotPlot.func.nextRelaxingSteps();
    return dotPlot;
}
;
/**
Receives a filepath to a CSV file and the inputConfig as input.
Converts the content of the CSV file with d3 parsing to a java object.
Returns an arry with the data, or an error if data not foun
*/
async function parseFromDataPathAsync(filePath) {
    // use fetch for file-reading
    let response = await fetch(filePath);
    if (!response.ok) {
        throw new Error(`Could not fetch ${filePath}: ${response.status} - ${response.statusText}`);
    }
    let cvsText = await response.text();
    return parseFromCSVString(cvsText);
}
/**
Recieves a csvString
Converts the input to a Java object with d3 parsing.
saves numbers as numbers, not STrings
*/
function parseFromCSVString(csvString) {
    return d3.csvParse(csvString, (d) => {
        let numTest;
        // tests each object for numbers
        for (let attr in d) {
            numTest = d[attr];
            numTest = +numTest;
            if (!isNaN(numTest)) {
                d[attr] = numTest;
            }
        }
        return d;
    });
}
/**
    execute one relaxation step
    Includes tunnel swap, updating cells
    
*/
async function relaxationStep(inputConfig, circleData, plotParam, voronoiGl, hasColor) {
    let delaunay;
    // let currentTime: number = Date.now();
    tunnelSwap(inputConfig, circleData, hasColor);
    if (inputConfig.relaxing.useWebGL) {
        // get a pixelmap through WebGL
        return voronoiGl.updateCells(inputConfig, circleData, plotParam);
    }
    else {
        plotParam.supSampWidth = Math.floor(Math.floor(plotParam.width) * inputConfig.relaxing.supSampFactor);
        plotParam.supSampHeight = Math.floor(Math.floor(plotParam.height) * inputConfig.relaxing.supSampFactor);
        // delaunay creation without WebGL
        delaunay = d3.Delaunay.from(circleData, (circle) => circle.xPix, (circle) => plotParam.supSampHeight - (circle.yPix));
        // let voronoi = delaunay.voronoi([0,0,plotParam.supSampWidth,plotParam.supSampHeight]);
        // let render = delaunay.render();
        // let render = voronoi.render();
        // densityPlot.attr("d", render)
        return Promise.resolve(updateCells(inputConfig, circleData, plotParam, delaunay));
    }
}
/**
 *
 * @param inputConfig
 * @param circleData
 * @param hasColor
 *
 * Reduce dots blocking each other during relaxing by swapping dots.
 * Going through every dot and only check a small environment to find a swap partner
 * Every dot swaps once; with the best possible match
 *
 */
function tunnelSwap(inputConfig, circleData, hasColor) {
    let length = circleData.length;
    // sort the alreadz nearly sorted array
    circleData = insertionSort(circleData, length);
    // search for swap partners
    let swapCount = 0;
    let otherDot;
    const colorTolerance = Math.pow(inputConfig.color.differenceTolerance, 2);
    const useImages = inputConfig.images.useImages;
    for (let i = 1; i < length; i++) {
        let selfDot = circleData[i];
        let selfDistance = selfDot.xPix - selfDot.origXpix;
        // can't improve on perfection
        if (selfDistance == 0)
            continue;
        // get current error. we don't need exact error (only for comparison).
        // use radius instead of diameter (saves us multiplying by 2)
        let selfError = Math.pow(selfDistance / selfDot.radiusPix, 2);
        let bestError = Infinity;
        let bestSwapIndex = -1;
        // direction of swap search
        let direction = selfDistance > 0 ? -1 : 1;
        let limit = selfDot.origXpix - selfDistance;
        // for loop with calculating new self error and checking if it is smaller than out current self error.
        for (let j = i + direction; j >= 0 && j < length; j += direction) {
            otherDot = circleData[j];
            // stop if we run outside search range
            if ((selfDistance < 0 && otherDot.xPix > limit) || (selfDistance > 0 && otherDot.xPix < limit))
                break;
            // check for: same Index and if the dot class is equal or similar (no swap on different classes)
            // euclidian difference requires sum of squares and then root. we don't need exact value (only for comparison).
            // use square of distance and tolerance (saves us the root calculation).
            let colorDiff = Math.pow(selfDot.origColor.l - circleData[j].origColor.l, 2.0)
                + Math.pow(selfDot.origColor.a - circleData[j].origColor.a, 2.0)
                + Math.pow(selfDot.origColor.b - circleData[j].origColor.b, 2.0);
            if ((useImages && !hasColor && selfDot.URL != otherDot.URL) || (hasColor && colorDiff > colorTolerance))
                continue;
            // calculate new error in case of swap
            let otherError = Math.pow((otherDot.xPix - otherDot.origXpix) / otherDot.radiusPix, 2);
            let newOtherError = Math.pow((selfDot.xPix - otherDot.origXpix) / otherDot.radiusPix, 2);
            let newSelfError = Math.pow((otherDot.xPix - selfDot.origXpix) / selfDot.radiusPix, 2);
            let newError = newSelfError + newOtherError;
            if (
            // check whether it would improve the current situation
            newError < (selfError + otherError)
                // check whether it's the best we can do
                && newError < bestError) {
                bestError = newError;
                bestSwapIndex = j;
            }
        }
        if (bestSwapIndex >= 0) {
            swapCount++;
            // swap X
            let tempPos = selfDot.xPix;
            selfDot.xPix = circleData[bestSwapIndex].xPix;
            circleData[bestSwapIndex].xPix = tempPos;
            // swap Y
            tempPos = selfDot.yPix;
            selfDot.yPix = circleData[bestSwapIndex].yPix;
            circleData[bestSwapIndex].yPix = tempPos;
            // swap position in list
            circleData[i] = circleData[bestSwapIndex];
            circleData[bestSwapIndex] = selfDot;
            // we might have swapped with a dot that hasn't been looked at before.
            // do nto advance to the next index without taking another look at the new dot in the current index.
            i--;
        }
    }
}
/** update position of cells */
function updateCells(inputConfig, circleData, plotParam, delaunay) {
    // for each dot a moment
    let moments = {};
    let circlePixel = {};
    let pixelX;
    let pixelY;
    let density;
    let pointDist, originDist;
    let densityMultiplier;
    let nearestCircle;
    let newCirclePosPix = { x: 0, y: 0 };
    // vars for stop check
    let relaxStatus = {
        sumDotMove: 0,
        squaredSumDotMove: 0,
        sumSquaredError: 0
        // ,sumDiameterOverlap: 0
        // ,densityDeviation: 0
    };
    //let xDiff: number;
    //const MAX_X_PUSH = 1;
    let densValues = [];
    let pixel;
    for (let i = 0; i < plotParam.supSampWidth; i++) {
        // kde needs a domain value, and gives a domain value back
        densValues[i] = inputConfig.dots.dotscaling.scaleDensityDom(plotParam.kde(plotParam.xAxisScale.invert((i + 0.5) / inputConfig.relaxing.supSampFactor)), inputConfig.dots.dSingle) * plotParam.domainToPixel * inputConfig.relaxing.supSampFactor;
    }
    // iterate over all pixels
    for (let index = 0; index < plotParam.supSampHeight * plotParam.supSampWidth; index++) {
        // current pixel values
        pixelX = (index % plotParam.supSampWidth) + 0.5;
        pixelY = Math.floor(index / plotParam.supSampWidth) + 0.5;
        // get pixel from Delaunay
        pixel = { dotKey: delaunay.find(pixelX, plotParam.supSampHeight - pixelY) };
        nearestCircle = circleData[pixel.dotKey];
        pointDist = Math.sqrt(Math.pow(pixelX - nearestCircle.xPix, 2) + Math.pow(pixelY - nearestCircle.yPix, 2));
        originDist = nearestCircle.origXpix - pixelX;
        switch (inputConfig.relaxing.xCorrectionType) {
            case "linearArea":
                densityMultiplier = Math.max(0, (nearestCircle.radiusPix - Math.abs(originDist)) / nearestCircle.radiusPix);
            case "circleArea":
                densityMultiplier = kernel.circleArea().kernelFunction(originDist, nearestCircle.radiusPix);
            case "force":
            default:
                densityMultiplier = 1;
        }
        density = (pixelY > densValues[index % plotParam.supSampWidth]) ? 0 : densityMultiplier;
        if (moments[pixel.dotKey] === undefined) {
            moments[pixel.dotKey] = {
                moment00: density,
                moment01: pixelY * density,
                moment10: pixelX * density
            };
        }
        else {
            moments[pixel.dotKey].moment00 += density;
            moments[pixel.dotKey].moment01 += pixelY * density;
            moments[pixel.dotKey].moment10 += pixelX * density;
        }
        if (pointDist < nearestCircle.radiusPix * (1.0 - inputConfig.dots.circlePadding)) {
            if (nearestCircle === undefined) {
                circlePixel[pixel.dotKey] = density;
            }
            else {
                circlePixel[pixel.dotKey] += density;
            }
        }
    }
    ;
    let densityArray = [];
    let densityAverage;
    let lostMoments = 0;
    let overlapDistance;
    let circle;
    for (let index = 0; index < circleData.length; index++) {
        circle = circleData[index];
        if (moments[index] === undefined) {
            if (lostMoments < 100) {
                console.log("Undefined Moment from key " + index);
                lostMoments++;
            }
            continue;
        }
        if (moments[index].moment00 != 0) {
            newCirclePosPix.y = moments[index].moment01 / moments[index].moment00;
            if (inputConfig.relaxing.xCorrectionType != "force") {
                newCirclePosPix.x = (moments[index].moment10 / moments[index].moment00);
            }
            else {
                const correctPart = circle.origXpix * inputConfig.relaxing.xCorrection;
                const centroidPart = (moments[index].moment10 / moments[index].moment00) * (1.0 - inputConfig.relaxing.xCorrection);
                newCirclePosPix.x = centroidPart + correctPart;
            }
            // calculate movement of the circle
            relaxStatus.sumDotMove += Math.sqrt((circle.xPix - newCirclePosPix.x) * (circle.xPix - newCirclePosPix.x) + (circle.yPix - newCirclePosPix.y) * (circle.yPix - newCirclePosPix.y)) / circle.radiusPix;
            // relaxStatus.sumDotMove += Math.sqrt( (circle.xPix-newCirclePosPix.x)*(circle.xPix-newCirclePosPix.x) + (circle.yPix-newCirclePosPix.y)*(circle.yPix-newCirclePosPix.y) ) / getPadRadFunct(inputConfig)(circle.radiusPix);
            relaxStatus.squaredSumDotMove += relaxStatus.sumDotMove * relaxStatus.sumDotMove;
            // calculate error of new position
            circle.xPix = newCirclePosPix.x;
            circle.yPix = newCirclePosPix.y;
        }
        // Checks for the colorMode and recolors circles
        const currentDiff = (circle.xPix / inputConfig.relaxing.supSampFactor - circle.origXpix / inputConfig.relaxing.supSampFactor);
        if (currentDiff > 0) {
            circle.errorColor = "#" + (Math.min(Math.round(currentDiff * inputConfig.relaxing.errorScale), 255) << 16).toString(16).padStart(6, "0");
        }
        else {
            circle.errorColor = "#" + Math.min(Math.round(Math.abs(currentDiff * inputConfig.relaxing.errorScale)), 255).toString(16).padStart(6, "0");
        }
        density = circlePixel[index] / moments[index].moment00;
        densityArray.push(density);
        circle.coverageColor = "#" + (Math.min(Math.round(density * 255), 255) * 256 * 256).toString(16).padStart(6, "0");
        // placing error
        relaxStatus.sumSquaredError += Math.pow(((circle.origXpix - newCirclePosPix.x) / getPadRadFunct(inputConfig)(circle.radiusPix)), 2);
    }
    // densityAverage = d3.sum(densityArray)/circleData.size;
    // plot dens average if coverage color is activated
    if (inputConfig.relaxing.colorMode === "coverage") {
        console.log("Average Relative Density: " + d3.sum(densityArray) / circleData.length);
    }
    // // calculate the difference between average density and dnesity of each circle
    // densityArray.forEach(density => {
    //     stipplStatus.densityDeviation += (density - densityAverage) * (density - densityAverage)
    // });
    // returns stipplStatus for stop
    return relaxStatus;
}
class VoronoiGL {
    constructor(inputConfig, container) {
        this.pointDataFramebufferWidth = 0;
        this.pointTexWidth = 0;
        this.pointCount = 0;
        this.visible = false;
        this.canvas = document.createElement("canvas");
        this.canvas.id = "webgl-canvas-" + inputConfig.containerId;
        this.canvas.width = 0;
        this.canvas.height = 0;
        // start voronoi hidden
        this.voronoiImage = container.append("svg:image").style("opacity", "0");
        // Next, to make it easy to make changes, we remove any older
        // versions of the canvas when hitting "Run" - now you can
        // make changes and see them reflected when you press "Run"
        // or (cmd + enter):
        const existingCanvas = document.getElementById(this.canvas.id);
        if (existingCanvas && existingCanvas.parentElement) {
            existingCanvas.parentElement.removeChild(existingCanvas);
        }
        // Tell the canvas element that we will use WebGL to draw
        // inside the element (and not the default raster engine):
        this.gl = this.canvas.getContext("webgl2", { antialias: false });
        this.gl.disable(this.gl.BLEND);
        this.gl.disable(this.gl.SAMPLE_COVERAGE);
        this.gl.disable(this.gl.SAMPLE_ALPHA_TO_COVERAGE);
        this.gl.disable(this.gl.DITHER);
        this.gl.disable(this.gl.DEPTH_TEST);
        this.compileShaders();
        // Add the new canvas element into the bottom left
        // of the playground
        document.body.appendChild(this.canvas);
        this.canvas.style.visibility = "hidden";
        this.canvas.style.display = "none";
        this.ext_cbf = this.gl.getExtension("EXT_color_buffer_float");
        if (!this.ext_cbf) {
            console.log("need EXT_color_buffer_float");
        }
        this.rng = mulberry32(inputConfig.randomSeed);
    }
    /**
     * Small helper function to compile a shader and automatically print the info log
    */
    compileShaderWithInfo(shader, name) {
        this.gl.compileShader(shader);
        const infoLog = this.gl.getShaderInfoLog(shader);
        if (infoLog.length > 0) {
            console.log("Shader Compile log of \"" + name + "\":");
            console.log(infoLog);
        }
    }
    /**
     * Compiles all shaders and creates the necessary programs
    */
    compileShaders() {
        const seedingVS = this.gl.createShader(this.gl.VERTEX_SHADER);
        this.gl.shaderSource(seedingVS, `#version 300 es
            precision highp float;

            uniform sampler2D u_pointDataTex;
            uniform int u_pointTexWidth;
            uniform vec2 u_res;

            flat out int v_id;

            void main() {
                ivec2 pointSample = ivec2(gl_VertexID%u_pointTexWidth, gl_VertexID/u_pointTexWidth);
                vec2 pointPos = floor(texelFetch(u_pointDataTex, pointSample, 0).xy) + vec2(0.5, 0.5);
                gl_Position = vec4((pointPos/u_res)*2.0 - 1.0, 0.0, 1.0);
                gl_PointSize = 1.0;
                v_id = gl_VertexID;
            }
            `);
        this.compileShaderWithInfo(seedingVS, "seedingVS");
        const seedingFS = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(seedingFS, `#version 300 es
            precision highp float;

            flat in int v_id;
            out ivec2 o_color;

            void main() {
                o_color = ivec2(v_id, 0);
            }
            `);
        this.compileShaderWithInfo(seedingFS, "seedingFS");
        const fullQuadVS = this.gl.createShader(this.gl.VERTEX_SHADER);
        this.gl.shaderSource(fullQuadVS, `#version 300 es
            precision highp float;
            
            const vec2 pos[6] = vec2[](
                vec2(-1.0, -1.0),
                vec2(1.0, -1.0),
                vec2(1.0, 1.0),
                vec2(-1.0, -1.0),
                vec2(1.0, 1.0),
                vec2(-1.0, 1.0)
            );
            const vec2 tex[6] = vec2[](
                vec2(0.0, 0.0),
                vec2(1.0, 0.0),
                vec2(1.0, 1.0),
                vec2(0.0, 0.0),
                vec2(1.0, 1.0),
                vec2(0.0, 1.0)
            );

            out vec2 v_texCoords;

            void main() {
                gl_Position = vec4(pos[gl_VertexID], 0.0, 1.0);
                v_texCoords = tex[gl_VertexID];
            }
            `);
        this.compileShaderWithInfo(fullQuadVS, "fullQuadVS");
        const voronoiFS = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(voronoiFS, `#version 300 es
            precision highp float;
            precision highp int;
            precision highp isampler2D;

            in vec2 v_texCoords;

            uniform isampler2D u_lastStepTex;
            uniform sampler2D u_pointDataTex;
            uniform int u_pointTexWidth;

            uniform int u_jumpSize;
            uniform ivec2 u_res;

            layout(location = 0) out int o_voronoi;
            layout(location = 1) out int o_jumpFlood;

            // offset to all eight neighbours that need to be checked
            ivec2 directions[8] = ivec2[](ivec2(-1,-1), ivec2( 0,-1), ivec2( 1,-1),
                                          ivec2(-1, 0),               ivec2( 1, 0),
                                          ivec2(-1, 1), ivec2( 0, 1), ivec2( 1, 1));

            void main() {
                ivec2 pixelPos = ivec2(gl_FragCoord.xy);
                ivec2 originalId = texelFetch(u_lastStepTex, pixelPos, 0).xy;
                
                int minCellIndex = originalId.x;
                float minDistance = float(u_res.x*u_res.y);
                int idSource = -1;

                // use center as a basis if a valid id is present
                if(minCellIndex >= 0){
                    ivec2 pointSample = ivec2(minCellIndex%u_pointTexWidth, minCellIndex/u_pointTexWidth);
                    vec3 centerPoint = texelFetch(u_pointDataTex, pointSample, 0).xyz;
                    minDistance = length(gl_FragCoord.xy - centerPoint.xy) - centerPoint.z;
                }

                for (int i = 0; i < 8; i++) {
                    ivec2 neighbSample = pixelPos + directions[i] * u_jumpSize;
                    // check if point to check is still within our boundary
                    if (neighbSample.x >= 0 && neighbSample.x < u_res.x && neighbSample.y >= 0 && neighbSample.y < u_res.y) {
                        ivec2 neighbId = texelFetch(u_lastStepTex, neighbSample, 0).xy;

                        if(neighbId.x < 0) continue;

                        ivec2 pointSample = ivec2(neighbId.x%u_pointTexWidth, neighbId.x/u_pointTexWidth);
                        vec3 neighbPoint = texelFetch(u_pointDataTex, pointSample, 0).xyz;
                        // calc distance from current point to neighbour (with radius of the circle)
                        float neighbDist = length(gl_FragCoord.xy - neighbPoint.xy) - neighbPoint.z;
                        
                        // save smallest distance and corresponding id
                        if (neighbDist < minDistance) {
                            minDistance = neighbDist;
                            minCellIndex = neighbId.x;
                            idSource = i;
                        }
                    }
                }
                o_voronoi = minCellIndex;
                o_jumpFlood = idSource;
            }
            `);
        this.compileShaderWithInfo(voronoiFS, "voronoiFS");
        const visualizeFS = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(visualizeFS, `#version 300 es
            precision highp float;
            precision highp int;
            precision highp isampler2D;

            in vec2 v_texCoords;

            uniform isampler2D u_voronoiTex;
            uniform sampler2D u_pointDataTex;
            uniform sampler2D u_pointColTex;
            uniform int u_pointTexWidth;
            
            uniform sampler2D u_kdeTex;
            uniform int u_kdeTexWidth;
            uniform float u_lightEdges;

            out vec4 o_color;

            void main() {
                int id_right = texelFetch(u_voronoiTex, ivec2(gl_FragCoord.xy) + ivec2(1, 0), 0).x;
                int id_down = texelFetch(u_voronoiTex, ivec2(gl_FragCoord.xy) + ivec2(0, 1), 0).x;
                int id_left = texelFetch(u_voronoiTex, ivec2(gl_FragCoord.xy) + ivec2(-1, 0), 0).x;
                int id_up = texelFetch(u_voronoiTex, ivec2(gl_FragCoord.xy) + ivec2(0, -1), 0).x;
                ivec2 id_center = texelFetch(u_voronoiTex, ivec2(gl_FragCoord.xy), 0).xy;
                bool isBorder = id_center.x != id_right || id_center.x != id_down || id_center.x != id_left || id_center.x != id_up;

                ivec2 samplePos = ivec2(id_center.x%u_pointTexWidth, id_center.x/u_pointTexWidth);

                float kdeVal_center = texelFetch(u_kdeTex, ivec2(int(gl_FragCoord.x)%u_kdeTexWidth, int(gl_FragCoord.x)/u_kdeTexWidth), 0).r;
                float kdeVal_left = texelFetch(u_kdeTex, ivec2(int(gl_FragCoord.x-1.0)%u_kdeTexWidth, int(gl_FragCoord.x-1.0)/u_kdeTexWidth), 0).r;
                float kdeVal_right = texelFetch(u_kdeTex, ivec2(int(gl_FragCoord.x+1.0)%u_kdeTexWidth, int(gl_FragCoord.x+1.0)/u_kdeTexWidth), 0).r;

                if(gl_FragCoord.y > kdeVal_center) discard;
                isBorder = isBorder || int(gl_FragCoord.y) == int(kdeVal_center) || gl_FragCoord.y > kdeVal_left || gl_FragCoord.y > kdeVal_right;

                vec4 pointData = texelFetch(u_pointDataTex, samplePos, 0);
                vec3 normalColor = texelFetch(u_pointColTex, samplePos, 0).rgb;
                vec3 lightColor = (vec3(0.5, 0.5, 0.5) + normalColor * 0.5) * u_lightEdges;
                o_color = vec4(isBorder ? lightColor : normalColor, 1.0);
            }
            `);
        this.compileShaderWithInfo(visualizeFS, "visualizeFS");
        const momentumFS = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(momentumFS, `#version 300 es
            precision highp float;
            precision highp int;
            precision highp isampler2D;

            in vec2 v_texCoords;

            uniform isampler2D u_voronoiTex;
            uniform sampler2D u_pointDataTex;
            uniform int u_pointTexWidth;
            uniform sampler2D u_kdeTex;
            uniform int u_kdeTexWidth;
            uniform float u_circlePadding;

            out vec4 o_momentum;

            void main() {
                ivec2 pixelPos = ivec2(gl_FragCoord.xy);
                vec2 pixelCenter = vec2(pixelPos) + 0.5;

                float kdeVal = texelFetch(u_kdeTex, ivec2(pixelPos.x%u_kdeTexWidth, pixelPos.x/u_kdeTexWidth), 0).r;
                float density = (pixelCenter.y <= kdeVal) ? 1.0 : 0.0;

                int pointID = texelFetch(u_voronoiTex, pixelPos, 0).x;

                // only needed for debugging
                ivec2 pointSamplePos = ivec2(pointID%u_pointTexWidth, pointID/u_pointTexWidth);
                vec4 pointData = texelFetch(u_pointDataTex, pointSamplePos, 0);
                float inCircle = (length(pixelCenter - pointData.xy) < pointData.z*(1.0-u_circlePadding)) ? 1.0 : 0.0;

                o_momentum = vec4(density * vec3(1.0, pixelCenter.x, pixelCenter.y), inCircle);
            }
            `);
        this.compileShaderWithInfo(momentumFS, "momentumFS");
        const condenseFS = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(condenseFS, `#version 300 es
            precision highp float;
            precision highp int;
            precision highp isampler2D;

            in vec2 v_texCoords;

            uniform isampler2D u_jumpFloodTex;
            uniform sampler2D u_momentumTex;

            uniform int u_jumpSize;
            uniform ivec2 u_res;

            out vec4 o_momentum;

            ivec2 directions[8] = ivec2[](ivec2(-1,-1), ivec2( 0,-1), ivec2( 1,-1),
                                          ivec2(-1, 0),               ivec2( 1, 0),
                                          ivec2(-1, 1), ivec2( 0, 1), ivec2( 1, 1));

            void main() {
                ivec2 pixelPos = ivec2(gl_FragCoord.xy);
                vec4 selfMomentum = vec4(0, 0, 0, 0);
                int selfSource = texelFetch(u_jumpFloodTex, pixelPos, 0).x;

                // only carry over own momentum if there was no source this step (otherwise the source would take this data)
                if(selfSource < 0){
                    selfMomentum = texelFetch(u_momentumTex, pixelPos, 0);
                }

                // check neighbouring pixels if this pixel was their source and take their data
                for (int i = 0; i < 8; i++) {
                    ivec2 neighbSample = pixelPos + directions[i] * u_jumpSize;
                    // check if pixel is still within our boundary
                    if (neighbSample.x >= 0 && neighbSample.x < u_res.x && neighbSample.y >= 0 && neighbSample.y < u_res.y) {
                        int neighbSource = texelFetch(u_jumpFloodTex, neighbSample, 0).x;

                        if(neighbSource == (7-i)){
                            selfMomentum += texelFetch(u_momentumTex, neighbSample, 0);
                        }
                    }
                }
                o_momentum = selfMomentum;
            }
            `);
        this.compileShaderWithInfo(condenseFS, "condenseFS");
        const collectFS = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(collectFS, `#version 300 es
            precision highp float;
            precision highp int;

            in vec2 v_texCoords;

            uniform sampler2D u_momentumTex;
            uniform sampler2D u_pointDataTex;
            uniform float u_xCorrection;

            out vec4 o_pointData;

            void main() {
                ivec2 pointSamplePos = ivec2(gl_FragCoord.xy);
                vec4 pointData = texelFetch(u_pointDataTex, pointSamplePos, 0);
                ivec2 pixelSamplePos = ivec2(pointData.xy);
                vec4 pointMomentum = texelFetch(u_momentumTex, pixelSamplePos, 0);

                vec3 pointDataNew = pointMomentum.yzw / pointMomentum.x;
                pointDataNew.x = mix(pointDataNew.x, pointData.w, u_xCorrection);

                o_pointData = vec4(pointDataNew.xy, length(pointDataNew.xy - pointData.xy) / pointData.z, pointDataNew.z);
            }
            `);
        this.compileShaderWithInfo(collectFS, "collectFS");
        const overlapFS = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(overlapFS, `#version 300 es
            precision highp float;
            precision highp int;
            precision highp usampler2D;

            in vec2 v_texCoords;

            uniform sampler2D u_pointDataTex;
            uniform uint u_pointTexWidth;
            uniform uint u_pointCount;
            uniform float u_dotSizeScale;
            
            uniform sampler2D u_kdeTex;
            uniform int u_kdeTexWidth;

            out vec4 o_color;

            void main() {
                int pointsFound = 0;
                for(uint i = 0u; i < u_pointCount; i++){
                    ivec2 samplePos = ivec2(i%u_pointTexWidth, i/u_pointTexWidth);
                    vec4 pointData = texelFetch(u_pointDataTex, samplePos, 0);
                    if(length(gl_FragCoord.xy - pointData.xy) <= pointData.z*u_dotSizeScale)pointsFound++;
                }
                float kdeVal = texelFetch(u_kdeTex, ivec2(int(gl_FragCoord.x)%u_kdeTexWidth, int(gl_FragCoord.x)/u_kdeTexWidth), 0).r;
                float alpha = (gl_FragCoord.y <= kdeVal) ? 1.0f : 0.0f;
                o_color = pointsFound > 1 ? vec4(1.0, 0.0, 0.0, alpha) : vec4(1.0, 1.0, 1.0, alpha);
            }
            `);
        this.compileShaderWithInfo(overlapFS, "overlapFS");
        this.seedingShader = this.gl.createProgram();
        this.gl.attachShader(this.seedingShader, seedingVS);
        this.gl.attachShader(this.seedingShader, seedingFS);
        this.gl.linkProgram(this.seedingShader);
        this.voronoiShader = this.gl.createProgram();
        this.gl.attachShader(this.voronoiShader, fullQuadVS);
        this.gl.attachShader(this.voronoiShader, voronoiFS);
        this.gl.linkProgram(this.voronoiShader);
        this.visualizeShader = this.gl.createProgram();
        this.gl.attachShader(this.visualizeShader, fullQuadVS);
        this.gl.attachShader(this.visualizeShader, visualizeFS);
        this.gl.linkProgram(this.visualizeShader);
        this.momentumShader = this.gl.createProgram();
        this.gl.attachShader(this.momentumShader, fullQuadVS);
        this.gl.attachShader(this.momentumShader, momentumFS);
        this.gl.linkProgram(this.momentumShader);
        this.condenseShader = this.gl.createProgram();
        this.gl.attachShader(this.condenseShader, fullQuadVS);
        this.gl.attachShader(this.condenseShader, condenseFS);
        this.gl.linkProgram(this.condenseShader);
        this.collectShader = this.gl.createProgram();
        this.gl.attachShader(this.collectShader, fullQuadVS);
        this.gl.attachShader(this.collectShader, collectFS);
        this.gl.linkProgram(this.collectShader);
        this.overlapShader = this.gl.createProgram();
        this.gl.attachShader(this.overlapShader, fullQuadVS);
        this.gl.attachShader(this.overlapShader, overlapFS);
        this.gl.linkProgram(this.overlapShader);
    }
    /**
     * Toggles the visibility of the voronoi canvas
    */
    toggleVisibility() {
        this.visible = !this.visible;
        this.voronoiImage.style("opacity", (this.visible) ? "1" : "0");
        return this.visible;
    }
    /**
     * Applies texture settings which are used for most textures in this application to ensure proper reading of data values.
     * Parameters will be applied to the currently bound texture.
    */
    applyDefaultTexParameters() {
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_BASE_LEVEL, 0);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAX_LEVEL, 0);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
    }
    /**
     * Will recreate all framebuffers dependant on canvas size and their textures.
     * Should only be called when the canvas size changes.
    */
    updateFramebuffers(plotParam) {
        const width = plotParam.supSampWidth;
        const height = plotParam.supSampHeight;
        this.canvas.width = width;
        this.canvas.height = height;
        this.voronoiImage.attr("height", Math.ceil(plotParam.height))
            .attr("width", Math.ceil(plotParam.width));
        let ratio = 0;
        if (width > height) {
            ratio = width / height;
            this.ratioX = ratio, this.ratioY = 1.0;
        }
        else {
            ratio = height / width;
            this.ratioX = 1.0, this.ratioY = ratio;
        }
        // twice the length of diagonal of width and height
        const scaling = Math.sqrt(Math.pow(this.ratioX, 2) + Math.pow(this.ratioY, 2)) * 2;
        this.ratioX = scaling / this.ratioX;
        this.ratioY = scaling / this.ratioY;
        this.jumpFloodSteps = Math.floor(Math.log2(Math.max(this.canvas.width, this.canvas.height))) + 2; //add two more steps with n = 0
        if (this.jumpFloodTextures === undefined)
            this.jumpFloodTextures = [];
        for (let i = 0; i < this.jumpFloodSteps; i++) {
            if (this.jumpFloodTextures[i] === undefined)
                this.jumpFloodTextures[i] = this.gl.createTexture();
            this.gl.bindTexture(this.gl.TEXTURE_2D, this.jumpFloodTextures[i]);
            this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.R8I, width, height, 0, this.gl.RED_INTEGER, this.gl.BYTE, null);
            this.applyDefaultTexParameters();
        }
        if (this.voronoiTextures === undefined)
            this.voronoiTextures = [];
        if (this.voronoiFrameBuffers === undefined)
            this.voronoiFrameBuffers = [];
        if (this.voronoiTextures[0] === undefined)
            this.voronoiTextures[0] = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.voronoiTextures[0]);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.R32I, width, height, 0, this.gl.RED_INTEGER, this.gl.INT, null);
        this.applyDefaultTexParameters();
        if (this.voronoiFrameBuffers[0] === undefined)
            this.voronoiFrameBuffers[0] = this.gl.createFramebuffer();
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.voronoiFrameBuffers[0]);
        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, this.voronoiTextures[0], 0);
        this.gl.drawBuffers([this.gl.COLOR_ATTACHMENT0, this.gl.COLOR_ATTACHMENT1]);
        if (this.voronoiTextures[1] === undefined)
            this.voronoiTextures[1] = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.voronoiTextures[1]);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.R32I, width, height, 0, this.gl.RED_INTEGER, this.gl.INT, null);
        this.applyDefaultTexParameters();
        if (this.voronoiFrameBuffers[1] === undefined)
            this.voronoiFrameBuffers[1] = this.gl.createFramebuffer();
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.voronoiFrameBuffers[1]);
        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, this.voronoiTextures[1], 0);
        this.gl.drawBuffers([this.gl.COLOR_ATTACHMENT0, this.gl.COLOR_ATTACHMENT1]);
        if (this.momentumTextures === undefined)
            this.momentumTextures = [];
        if (this.momentumFrameBuffers === undefined)
            this.momentumFrameBuffers = [];
        if (this.momentumTextures[0] === undefined)
            this.momentumTextures[0] = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.momentumTextures[0]);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA32F, width, height, 0, this.gl.RGBA, this.gl.FLOAT, null);
        this.applyDefaultTexParameters();
        if (this.momentumFrameBuffers[0] === undefined)
            this.momentumFrameBuffers[0] = this.gl.createFramebuffer();
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.momentumFrameBuffers[0]);
        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, this.momentumTextures[0], 0);
        if (this.momentumTextures[1] === undefined)
            this.momentumTextures[1] = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.momentumTextures[1]);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA32F, width, height, 0, this.gl.RGBA, this.gl.FLOAT, null);
        this.applyDefaultTexParameters();
        if (this.momentumFrameBuffers[1] === undefined)
            this.momentumFrameBuffers[1] = this.gl.createFramebuffer();
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.momentumFrameBuffers[1]);
        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, this.momentumTextures[1], 0);
        this.gl.flush();
    }
    /**
     * Updates kde texture.
     * Should only be called when the canvas size changes.
     * Will create the texture if it is undefined.
    */
    updateKdeTexture(inputConfig, kde, plotParam) {
        this.kdeTexWidth = Math.ceil(Math.sqrt(this.canvas.width));
        const kdeData = new Float32Array(this.kdeTexWidth * this.kdeTexWidth);
        for (let i = 0; i < this.canvas.width; i++) {
            // kde needs a domain value, and gives a domain value back
            let kdeVal = inputConfig.dots.dotscaling.scaleDensityDom(kde(plotParam.xAxisScale.invert((i + 0.5) / inputConfig.relaxing.supSampFactor)), inputConfig.dots.dSingle);
            kdeData[i] = kdeVal * plotParam.domainToPixel * inputConfig.relaxing.supSampFactor;
        }
        if (this.kdeTexture === undefined) {
            this.kdeTexture = this.gl.createTexture();
            this.gl.bindTexture(this.gl.TEXTURE_2D, this.kdeTexture);
            this.applyDefaultTexParameters();
            this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.R32F, this.kdeTexWidth, this.kdeTexWidth, 0, this.gl.RED, this.gl.FLOAT, kdeData);
        }
        else {
            this.gl.bindTexture(this.gl.TEXTURE_2D, this.kdeTexture);
            this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.R32F, this.kdeTexWidth, this.kdeTexWidth, 0, this.gl.RED, this.gl.FLOAT, kdeData);
        }
        this.gl.flush();
    }
    /**
     * Will recreate the texture and framebuffer used for the updated point data.
     * Should only be called when the number of points changes.
     * Will take it's new size from pointTexWidth.
    */
    updatePointFramebuffer() {
        this.pointDataFramebufferWidth = this.pointTexWidth;
        if (this.pointDataNewTexture === undefined)
            this.pointDataNewTexture = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.pointDataNewTexture);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA32F, this.pointDataFramebufferWidth, this.pointDataFramebufferWidth, 0, this.gl.RGBA, this.gl.FLOAT, null);
        this.applyDefaultTexParameters();
        if (this.pointDataNewFramebuffer === undefined)
            this.pointDataNewFramebuffer = this.gl.createFramebuffer();
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.pointDataNewFramebuffer);
        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, this.pointDataNewTexture, 0);
        this.gl.flush();
    }
    /**
     * Updates point positions texture.
     * Will create the texture if it is undefined.
    */
    updatePointPosTexture(circleData) {
        if (this.pointDataTexture === undefined) {
            this.pointDataTexture = this.gl.createTexture();
            this.gl.bindTexture(this.gl.TEXTURE_2D, this.pointDataTexture);
            this.applyDefaultTexParameters();
        }
        else {
            this.gl.bindTexture(this.gl.TEXTURE_2D, this.pointDataTexture);
        }
        this.gl.flush();
        let sizeChanged = false;
        if (this.pointData === undefined || (this.pointData.length != this.pointTexWidth * this.pointTexWidth * 4)) {
            this.pointData = new Float32Array(this.pointTexWidth * this.pointTexWidth * 4);
            sizeChanged = true;
        }
        for (let i = 0; i < this.pointCount; i++) {
            this.pointData[i * 4] = circleData[i].xPix;
            this.pointData[i * 4 + 1] = circleData[i].yPix;
            this.pointData[i * 4 + 2] = circleData[i].radiusPix;
            this.pointData[i * 4 + 3] = circleData[i].origXpix;
        }
        if (sizeChanged) {
            this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA32F, this.pointTexWidth, this.pointTexWidth, 0, this.gl.RGBA, this.gl.FLOAT, this.pointData);
        }
        else {
            this.gl.texSubImage2D(this.gl.TEXTURE_2D, 0, 0, 0, this.pointTexWidth, this.pointTexWidth, this.gl.RGBA, this.gl.FLOAT, this.pointData);
        }
        this.gl.flush();
    }
    /**
     * Updates color texture based on the current settings of colorMode
     * Will create the texture if it is undefined.
    */
    updateColorTexture(inputConfig, circleData) {
        if (this.pointColorsTexture === undefined) {
            this.pointColorsTexture = this.gl.createTexture();
            this.gl.bindTexture(this.gl.TEXTURE_2D, this.pointColorsTexture);
            this.applyDefaultTexParameters();
        }
        else {
            this.gl.bindTexture(this.gl.TEXTURE_2D, this.pointColorsTexture);
        }
        this.gl.flush();
        let sizeChanged = false;
        if (this.pointColors === undefined || (this.pointColors.length != this.pointTexWidth * this.pointTexWidth * 3)) {
            this.pointColors = new Uint8Array(this.pointTexWidth * this.pointTexWidth * 3);
            sizeChanged = true;
        }
        for (let i = 0; i < this.pointCount; i++) {
            let pointColor;
            switch (inputConfig.relaxing.colorMode) {
                case "error":
                    pointColor = d3.rgb(circleData[i].errorColor);
                    break;
                case "coverage":
                    pointColor = d3.rgb(circleData[i].coverageColor);
                    break;
                case "normal":
                default:
                    if (inputConfig.images.useImages) {
                        pointColor = d3.rgb("#000000");
                    }
                    else {
                        pointColor = d3.rgb(circleData[i].origColor);
                    }
                    break;
            }
            this.pointColors[i * 3] = pointColor.r;
            this.pointColors[i * 3 + 1] = pointColor.g;
            this.pointColors[i * 3 + 2] = pointColor.b;
        }
        if (sizeChanged) {
            this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGB, this.pointTexWidth, this.pointTexWidth, 0, this.gl.RGB, this.gl.UNSIGNED_BYTE, this.pointColors);
        }
        else {
            this.gl.texSubImage2D(this.gl.TEXTURE_2D, 0, 0, 0, this.pointTexWidth, this.pointTexWidth, this.gl.RGB, this.gl.UNSIGNED_BYTE, this.pointColors);
        }
        this.gl.flush();
    }
    /**
     * Updates all textures and framebuffers used to hold data if they need to be updated.
     * For some textures this is the case when the canvas size or point count changes.
    */
    updateDataTextures(inputConfig, circleData, plotParam, updateColor) {
        plotParam.supSampHeight = Math.floor(Math.floor(plotParam.height) * inputConfig.relaxing.supSampFactor);
        plotParam.supSampWidth = Math.floor(Math.floor(plotParam.width) * inputConfig.relaxing.supSampFactor);
        this.pointCount = circleData.length;
        this.pointTexWidth = Math.ceil(Math.sqrt(this.pointCount));
        if (plotParam.supSampWidth != this.canvas.width || plotParam.supSampHeight != this.canvas.height || plotParam.updateTextures) {
            this.updateFramebuffers(plotParam);
            this.updateKdeTexture(inputConfig, plotParam.kde, plotParam);
            plotParam.updateTextures = false;
        }
        if (this.pointDataFramebufferWidth != this.pointTexWidth) {
            this.updatePointFramebuffer();
        }
        this.updatePointPosTexture(circleData);
        if (updateColor)
            this.updateColorTexture(inputConfig, circleData);
    }
    /**
     * Mostly taken from https://forum.babylonjs.com/t/speeding-up-readpixels/12739
    */
    clientWaitAsync(gl, sync, flags, interval_ms) {
        return new Promise(function (resolve, reject) {
            function test() {
                const res = gl.clientWaitSync(sync, flags, 0);
                if (res == gl.WAIT_FAILED) {
                    reject();
                    return;
                }
                if (res == gl.TIMEOUT_EXPIRED) {
                    setTimeout(test, interval_ms);
                    return;
                }
                resolve();
            }
            test();
        });
    }
    /**
     * Mostly taken from https://forum.babylonjs.com/t/speeding-up-readpixels/12739
    */
    async readPixelsAsync(w, h, format, type, dest) {
        if (this.readBuffer === undefined) {
            this.readBuffer = this.gl.createBuffer();
            this.gl.bindBuffer(this.gl.PIXEL_PACK_BUFFER, this.readBuffer);
            this.gl.bufferData(this.gl.PIXEL_PACK_BUFFER, dest.byteLength, this.gl.STREAM_READ);
        }
        else {
            this.gl.bindBuffer(this.gl.PIXEL_PACK_BUFFER, this.readBuffer);
        }
        this.gl.readPixels(0, 0, w, h, format, type, 0);
        this.gl.bindBuffer(this.gl.PIXEL_PACK_BUFFER, null);
        const sync = this.gl.fenceSync(this.gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
        this.gl.flush();
        await this.clientWaitAsync(this.gl, sync, 0, 5);
        this.gl.deleteSync(sync);
        this.gl.bindBuffer(this.gl.PIXEL_PACK_BUFFER, this.readBuffer);
        this.gl.getBufferSubData(this.gl.PIXEL_PACK_BUFFER, 0, dest);
        this.gl.bindBuffer(this.gl.PIXEL_PACK_BUFFER, null);
    }
    /**
     * Calculates a new voronoi diagram and directly uses it to update point positions stored in circleData.
    */
    async updateCells(inputConfig, circleData, plotParam) {
        this.updateDataTextures(inputConfig, circleData, plotParam, false);
        this.calculateVoronoi();
        this.momentumFromVoronoi(inputConfig);
        this.condenseMomentum();
        this.collectPointData(inputConfig);
        if (this.rawPointData === undefined || (this.rawPointData.length != this.pointTexWidth * this.pointTexWidth * 4)) {
            this.rawPointData = new Float32Array(this.pointTexWidth * this.pointTexWidth * 4);
        }
        await this.readPixelsAsync(this.pointTexWidth, this.pointTexWidth, this.gl.RGBA, this.gl.FLOAT, this.rawPointData);
        let relaxStatus = {
            sumDotMove: 0,
            squaredSumDotMove: 0,
            sumSquaredError: 0
        };
        for (let i = 0; i < this.pointCount; i++) {
            circleData[i].xPix = this.rawPointData[i * 4];
            circleData[i].yPix = this.rawPointData[i * 4 + 1];
            relaxStatus.sumDotMove += this.rawPointData[i * 4 + 2];
        }
        return Promise.resolve(relaxStatus);
    }
    /**
     * Calculates a new voronoi diagram and its visualization which can then be shown.
    */
    updateVoronoiImage(inputConfig, circleData, plotParam) {
        this.updateDataTextures(inputConfig, circleData, plotParam, true);
        this.calculateVoronoi();
        this.visualizeVoronoi(inputConfig);
        this.dataURL = this.canvas.toDataURL();
        this.voronoiImage.attr("xlink:href", this.dataURL);
    }
    /**
     * Calculates a new voronoi diagram using the jump-flood algorithm and stores all inbetween steps for later use.
    */
    calculateVoronoi() {
        let clearColor = new Int32Array([-1, -1, -1, -1]);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
        this.voronoiIndex = 0;
        this.gl.useProgram(this.seedingShader);
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.pointDataTexture);
        this.gl.uniform1i(this.gl.getUniformLocation(this.seedingShader, "u_pointDataTex"), 0);
        this.gl.uniform1i(this.gl.getUniformLocation(this.seedingShader, "u_pointTexWidth"), this.pointTexWidth);
        this.gl.uniform2f(this.gl.getUniformLocation(this.seedingShader, "u_res"), this.canvas.width, this.canvas.height);
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.voronoiFrameBuffers[this.voronoiIndex]);
        this.gl.drawBuffers([this.gl.COLOR_ATTACHMENT0]);
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        this.gl.clearBufferiv(this.gl.COLOR, 0, clearColor);
        this.gl.drawArrays(this.gl.POINTS, 0, this.pointCount);
        this.gl.drawBuffers([this.gl.COLOR_ATTACHMENT0, this.gl.COLOR_ATTACHMENT1]);
        this.gl.useProgram(this.voronoiShader);
        // point texture is still bound to slot 0
        this.gl.uniform1i(this.gl.getUniformLocation(this.voronoiShader, "u_pointDataTex"), 0);
        this.gl.activeTexture(this.gl.TEXTURE1);
        this.gl.uniform1i(this.gl.getUniformLocation(this.voronoiShader, "u_lastStepTex"), 1);
        this.gl.uniform1i(this.gl.getUniformLocation(this.voronoiShader, "u_pointTexWidth"), this.pointTexWidth);
        this.gl.uniform2i(this.gl.getUniformLocation(this.voronoiShader, "u_res"), this.canvas.width, this.canvas.height);
        let jumpSize = this.jumpFloodSteps - 2;
        for (let i = 0; i < this.jumpFloodSteps; i++) {
            this.gl.uniform1i(this.gl.getUniformLocation(this.voronoiShader, "u_jumpSize"), Math.pow(2, jumpSize));
            this.gl.bindTexture(this.gl.TEXTURE_2D, this.voronoiTextures[this.voronoiIndex]);
            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.voronoiFrameBuffers[1 - this.voronoiIndex]);
            this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT1, this.gl.TEXTURE_2D, this.jumpFloodTextures[i], 0);
            this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
            this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
            this.gl.flush();
            this.voronoiIndex = 1 - this.voronoiIndex;
            if (jumpSize > 0)
                jumpSize--;
        }
    }
    /**
     * Calculates the momentum of a previously generated voronoi diagram for every individual pixel.
    */
    momentumFromVoronoi(inputConfig) {
        this.gl.useProgram(this.momentumShader);
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.voronoiTextures[this.voronoiIndex]);
        this.gl.uniform1i(this.gl.getUniformLocation(this.momentumShader, "u_voronoiTex"), 0);
        this.gl.activeTexture(this.gl.TEXTURE1);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.pointDataTexture);
        this.gl.uniform1i(this.gl.getUniformLocation(this.momentumShader, "u_pointDataTex"), 1);
        this.gl.uniform1i(this.gl.getUniformLocation(this.momentumShader, "u_pointTexWidth"), this.pointTexWidth);
        this.gl.activeTexture(this.gl.TEXTURE2);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.kdeTexture);
        this.gl.uniform1i(this.gl.getUniformLocation(this.momentumShader, "u_kdeTex"), 2);
        this.gl.uniform1i(this.gl.getUniformLocation(this.momentumShader, "u_kdeTexWidth"), this.kdeTexWidth);
        this.gl.uniform1f(this.gl.getUniformLocation(this.momentumShader, "u_circlePadding"), inputConfig.dots.circlePadding);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.momentumFrameBuffers[0]);
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
        this.gl.flush();
    }
    /**
     * Condense the momentum from each pixel into the original voronoi seed positions using the previously stored information about the jump-flood steps.
    */
    condenseMomentum() {
        this.gl.useProgram(this.condenseShader);
        this.gl.uniform1i(this.gl.getUniformLocation(this.condenseShader, "u_jumpFloodTex"), 0);
        this.gl.uniform1i(this.gl.getUniformLocation(this.condenseShader, "u_momentumTex"), 1);
        this.gl.uniform2i(this.gl.getUniformLocation(this.condenseShader, "u_res"), this.canvas.width, this.canvas.height);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
        this.momentumIndex = 0;
        let clearColor = new Float32Array([0.0, 0.0, 0.0, 0.0]);
        let jumpSize = 0;
        for (let i = this.jumpFloodSteps - 1; i >= 0; i--) {
            this.gl.uniform1i(this.gl.getUniformLocation(this.condenseShader, "u_jumpSize"), Math.pow(2, jumpSize));
            this.gl.activeTexture(this.gl.TEXTURE0);
            this.gl.bindTexture(this.gl.TEXTURE_2D, this.jumpFloodTextures[i]);
            this.gl.activeTexture(this.gl.TEXTURE1);
            this.gl.bindTexture(this.gl.TEXTURE_2D, this.momentumTextures[this.momentumIndex]);
            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.momentumFrameBuffers[1 - this.momentumIndex]);
            this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
            this.gl.clearBufferfv(this.gl.COLOR, 0, clearColor);
            this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
            this.momentumIndex = 1 - this.momentumIndex;
            if (i < this.jumpFloodSteps - 1)
                jumpSize++;
        }
        this.gl.flush();
    }
    /**
     * Collect the new point data from the voronoi seed positions and store them in the pointDataTexture.
    */
    collectPointData(inputConfig) {
        this.gl.useProgram(this.collectShader);
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.momentumTextures[this.momentumIndex]);
        this.gl.uniform1i(this.gl.getUniformLocation(this.collectShader, "u_momentumTex"), 0);
        this.gl.activeTexture(this.gl.TEXTURE1);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.pointDataTexture);
        this.gl.uniform1i(this.gl.getUniformLocation(this.collectShader, "u_pointDataTex"), 1);
        this.gl.uniform1f(this.gl.getUniformLocation(this.collectShader, "u_xCorrection"), inputConfig.relaxing.xCorrection);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.pointDataNewFramebuffer);
        this.gl.viewport(0, 0, this.pointDataFramebufferWidth, this.pointDataFramebufferWidth);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
        this.gl.flush();
    }
    /**
     * Will visualize the current voronoi diagram so it can be shown to the user or saved.
    */
    visualizeVoronoi(inputConfig) {
        this.gl.useProgram(this.visualizeShader);
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.voronoiTextures[this.voronoiIndex]);
        this.gl.uniform1i(this.gl.getUniformLocation(this.visualizeShader, "u_voronoiTex"), 0);
        this.gl.activeTexture(this.gl.TEXTURE1);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.pointDataTexture);
        this.gl.uniform1i(this.gl.getUniformLocation(this.visualizeShader, "u_pointDataTex"), 1);
        this.gl.activeTexture(this.gl.TEXTURE2);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.pointColorsTexture);
        this.gl.uniform1i(this.gl.getUniformLocation(this.visualizeShader, "u_pointColTex"), 2);
        this.gl.uniform1i(this.gl.getUniformLocation(this.visualizeShader, "u_pointTexWidth"), this.pointTexWidth);
        this.gl.activeTexture(this.gl.TEXTURE3);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.kdeTexture);
        this.gl.uniform1i(this.gl.getUniformLocation(this.visualizeShader, "u_kdeTex"), 3);
        this.gl.uniform1i(this.gl.getUniformLocation(this.visualizeShader, "u_kdeTexWidth"), this.kdeTexWidth);
        this.gl.uniform1f(this.gl.getUniformLocation(this.visualizeShader, "u_lightEdges"), inputConfig.images.useImages ? 0.0 : 1.0);
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        this.gl.clearColor(0, 0, 0, 0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
        this.gl.flush();
    }
    /**
     * Will calculate the current overlap of the circles.
    */
    showOverlap(inputConfig, circleData, plotParam) {
        this.updateDataTextures(inputConfig, circleData, plotParam, false);
        this.gl.useProgram(this.overlapShader);
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.pointDataTexture);
        this.gl.uniform1i(this.gl.getUniformLocation(this.overlapShader, "u_pointDataTex"), 0);
        this.gl.uniform1ui(this.gl.getUniformLocation(this.overlapShader, "u_pointTexWidth"), this.pointTexWidth);
        this.gl.uniform1ui(this.gl.getUniformLocation(this.overlapShader, "u_pointCount"), this.pointCount);
        let paddingWidth = (inputConfig.relaxing.overlapUsePadding) ? 1.0 - inputConfig.dots.circlePadding : 1.0;
        this.gl.uniform1f(this.gl.getUniformLocation(this.overlapShader, "u_dotSizeScale"), paddingWidth);
        this.gl.activeTexture(this.gl.TEXTURE1);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.kdeTexture);
        this.gl.uniform1i(this.gl.getUniformLocation(this.overlapShader, "u_kdeTex"), 1);
        this.gl.uniform1i(this.gl.getUniformLocation(this.overlapShader, "u_kdeTexWidth"), this.kdeTexWidth);
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        this.gl.clearColor(0, 0, 0, 0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
        let data = new Uint8Array(this.canvas.width * this.canvas.height * 4);
        this.gl.readPixels(0, 0, this.canvas.width, this.canvas.height, this.gl.RGBA, this.gl.UNSIGNED_BYTE, data);
        let overlapCount = 0;
        let totalCount = 0;
        for (let i = 0; i < data.length; i += 4) {
            if (data[i + 3] == 255) { //check if pixel is not transparent
                totalCount++;
                if (data[i + 1] != 255) { //check if green value doesn't make it white
                    overlapCount++;
                }
            }
        }
        return {
            SOP: overlapCount,
            MOP: overlapCount / totalCount
        };
    }
    /**
     * Returns the data URL containing the latest visualization.
    */
    getDataURL() {
        return this.dataURL;
    }
    /*
        https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
        Mulberry32 is a simple generator with a 32-bit state, but is extremely fast and has good quality
        (author states it passes all tests of gjrand testing suite and has a full 232 period, but I haven't verified).
    */
    mulberry32(a) {
        return function () {
            var t = a += 0x6D2B79F5;
            t = Math.imul(t ^ t >>> 15, t | 1);
            t ^= t + Math.imul(t ^ t >>> 7, t | 61);
            return ((t ^ t >>> 14) >>> 0) / 4294967296;
        };
    }
}
/**
Receives inputData, inputConfig, hasColor, docHeight and the docWidth as input.
Calculates container width, height and aspectRatio.
Loops calculation of the doubleSweep function
and changing of dSingle value for custom aspectRatio.
*/
function createPlotDimension(inputConfig, inputData, hasColor, docHeight, docWidth) {
    // End height and weight
    let height;
    let width;
    // height of the xAxis in pixel (numbers and line)
    const X_AXIS_HEIGHT = 34;
    // given container Height and width
    let containerHeight;
    let containerWidth;
    let containerRatio;
    // helper for custom Ratio calculation
    let hasLowerBoundary = false;
    let lowerBoundary;
    let hasUpperBoundary = false;
    let upperBoundary;
    let heightDifference;
    let aspectRatioDifference;
    let bestResult = {
        dSingle: 0,
        aspectRatioDifference: -1
    };
    // Closness for calculated aspectRatio with custom aspectRatio
    const EPSILON = 0.001;
    // if after search for aspectratio the value is not good enough repeat whole process x times
    const REPEAT_AMOUNT = 1;
    // number of iterations in current run
    let iterIndex = 0;
    // number of the run for repeat check
    let runIndex = 0;
    // Domain variables
    let xDomain = [0, 0];
    let yDomain = [0, 0];
    let domainWidth;
    let heightToOne;
    // Axis scales
    let xAxisScale;
    let yAxisScale;
    // double-sweep variables
    let sweepResult;
    let columns;
    let highestColumn;
    let colorNames;
    let firstRound = true;
    let lastRound = false;
    let boundaryList;
    // array with xValues for KDE sampling
    let xDomSample;
    // helper plotParam with less entries
    let plotParamKDE;
    let kdeInput;
    let kde;
    // recompute density estimation
    let densMax;
    let sweepTime;
    /*prepare plot container width and height*/
    //if container has invalid height and width use domain width.
    if ((docWidth === "" && docHeight === "") ||
        (isNaN(parseInt(docWidth)) &&
            isNaN(parseInt(docHeight)))) {
        // send warning too
        containerWidth = inputData[(inputData.length - 1)][inputConfig.xAttribute] - inputData[0][inputConfig.xAttribute];
        console.warn("Neither valid height nor width was found. Used domain width of " + containerWidth + " as container width.");
    }
    else {
        // one can be NaN
        containerWidth = parseInt(docWidth);
        containerHeight = parseInt(docHeight);
    }
    //change container to custom aspectRatio (given sides are boundary)
    if (inputConfig.aspect.ratio > 0) {
        if ((containerWidth / containerHeight) > inputConfig.aspect.ratio || isNaN(containerWidth)) {
            containerHeight -= inputConfig.margin + X_AXIS_HEIGHT;
            // height stays, reduce width
            containerWidth = inputConfig.aspect.ratio * containerHeight;
        }
        else if ((containerWidth / containerHeight) < inputConfig.aspect.ratio || isNaN(containerHeight)) {
            containerWidth -= (2 * inputConfig.margin);
            // width stays, reduce height
            containerHeight = containerWidth / inputConfig.aspect.ratio;
        }
    }
    //substract padding and calculate current Container Ratio
    containerRatio = 1 / inputConfig.aspect.ratio;
    // If margin is too big graph can't be drawn
    if (containerHeight <= 0 || containerWidth <= 0) {
        throw new Error("A margin of " + inputConfig.margin + " is too big to draw a graph in the Container. Either increase container size or decrease margin!");
    }
    /* container for the plot is DONE */
    kdeInput = getKDEinputFromInputData(inputConfig, inputData);
    // get bounded KDE (and normal KDE) for domain width
    kde = getKDE(inputConfig, kdeInput, xDomSample);
    boundaryList = getBoundaryList(inputConfig, inputData, kde);
    if (inputConfig.density.useBoundary) {
        // pick original KDE or bounded KDE
        kde = getBoundedKDE(inputConfig, kdeInput, xDomSample, boundaryList);
    }
    /* Calculate xDomain from the boundaries */
    if (inputConfig.density.useBoundary) {
        xDomain[0] = boundaryList[0].xDom;
        xDomain[1] = boundaryList[boundaryList.length - 1].xDom;
    }
    else {
        xDomain[0] = inputData[0][inputConfig.xAttribute] - inputConfig.density.bandwidth;
        xDomain[1] = inputData[inputData.length - 1][inputConfig.xAttribute] + inputConfig.density.bandwidth;
    }
    xDomain = addPaddingToDomain(xDomain);
    domainWidth = xDomain[1] - xDomain[0];
    // plotParam excerpt to be put into xDomSample
    plotParamKDE = {
        xDomain: xDomain,
        xAxisScale: d3.scaleLinear()
            .range([0, 1])
            .domain(xDomain)
    };
    // get a sample of xDom values to calculate the highest point in the KDE.
    xDomSample = getXdomSample(inputConfig.density.sampleRate <= 0 ? containerWidth : inputConfig.density.sampleRate, plotParamKDE);
    densMax = Math.max(...getDiscreteDensity(inputConfig, kde, xDomSample).map((a) => { return a.densityDom; }));
    // loop for custom ratio calculating (only runs once with no custom aspectRatio)
    do {
        // check if last Round (with iterations and epsilon)
        if (inputConfig.aspect.ratio > 0) {
            // Last round is: enough iterations OR bestResult is below Epsilon level AND we have at least gotten one result
            lastRound = (iterIndex > inputConfig.aspect.iter) || (bestResult.aspectRatioDifference <= EPSILON && !(bestResult.aspectRatioDifference < 0));
        }
        if (lastRound) {
            // if iterations not enough
            if (inputConfig.aspect.ratio > 0) {
                // if user didn't give his own bandwidth
                if (inputConfig.density.dSingleBandwidth) {
                    inputConfig.density.bandwidth = bestResult.dSingle;
                }
                // use best dSingle
                inputConfig.dots.dSingle = bestResult.dSingle;
                //update xDomain because bandwidth changed
                if (inputConfig.density.useBoundary) {
                    xDomain[0] = boundaryList[0].xDom;
                    xDomain[1] = boundaryList[boundaryList.length - 1].xDom;
                }
                else {
                    xDomain[0] = inputData[0][inputConfig.xAttribute] - inputConfig.density.bandwidth;
                    xDomain[1] = inputData[inputData.length - 1][inputConfig.xAttribute] + inputConfig.density.bandwidth;
                }
                xDomain = addPaddingToDomain(xDomain);
                domainWidth = xDomain[1] - xDomain[0];
                // warn if iterations seem too few
                if ((!hasLowerBoundary || !hasUpperBoundary) && bestResult.aspectRatioDifference > EPSILON) {
                    console.warn(inputConfig.aspect.iter + " Iteration(s) might not be sufficient to get aspectRatio of: " + inputConfig.aspect.ratio);
                }
                // fixes changing plot during re-generation, by resetting the boundarys if diffrence is too small.
                if (bestResult.aspectRatioDifference > EPSILON && runIndex < REPEAT_AMOUNT) {
                    lastRound = false;
                    hasLowerBoundary = false;
                    hasUpperBoundary = false;
                    iterIndex = 0;
                    runIndex++;
                }
            }
        }
        // get bounded KDE (and normal KDE)
        kde = getKDE(inputConfig, kdeInput, xDomSample);
        boundaryList = getBoundaryList(inputConfig, inputData, kde);
        if (inputConfig.density.useBoundary) {
            // pick original KDE or bounded KDE
            kde = getBoundedKDE(inputConfig, kdeInput, xDomSample, boundaryList);
        }
        // highest density
        densMax = Math.max(...getDiscreteDensity(inputConfig, kde, xDomSample).map((a) => { return a.densityDom; }));
        sweepTime = Date.now();
        //SweepAlgo with output: columns, highestColumn, colorNames
        sweepResult = doubleSweep(inputConfig, inputData, (hasColor && firstRound), kde, densMax);
        columns = sweepResult.columns;
        highestColumn = sweepResult.highestColumn;
        sweepTime = Date.now() - sweepTime;
        inputConfig.extraInfo.sweepRuntime = sweepTime;
        // sweepResult.highestColumnHeightDom = densMax;
        if (hasColor && firstRound) {
            // save colorNames only in first Round
            colorNames = sweepResult.colorNames;
        }
        // first Round over
        firstRound = false;
        // Calculate current aspectratio of graph
        heightToOne = (1 / domainWidth) * sweepResult.highestPlotPointDom;
        //heightToOne = (1 / domainWidth) * dotscale.scaleDensity(kde(highestColumn));
        if (inputConfig.aspect.ratio > 0 && !lastRound) {
            //pseudo container created with, width, height and ratio
            width = containerWidth;
            height = (width * heightToOne);
            heightDifference = height - containerHeight;
            aspectRatioDifference = Math.abs((height / width) - containerRatio);
            // save best height difference and dSingle
            if (aspectRatioDifference < bestResult.aspectRatioDifference || bestResult.aspectRatioDifference < 0) {
                bestResult.aspectRatioDifference = aspectRatioDifference;
                bestResult.dSingle = inputConfig.dots.dSingle;
                // if user didn't give his own bandwidth
                if (inputConfig.density.dSingleBandwidth) {
                    inputConfig.density.bandwidth = bestResult.dSingle;
                }
                // update xDomain because bandwidth changed
                // maybe fixes diffrent plot gen problem if it comes up
                if (inputConfig.density.useBoundary) {
                    xDomain[0] = boundaryList[0].xDom;
                    xDomain[1] = boundaryList[boundaryList.length - 1].xDom;
                }
                else {
                    xDomain[0] = inputData[0][inputConfig.xAttribute] - inputConfig.density.bandwidth;
                    xDomain[1] = inputData[inputData.length - 1][inputConfig.xAttribute] + inputConfig.density.bandwidth;
                }
                xDomain = addPaddingToDomain(xDomain);
                domainWidth = xDomain[1] - xDomain[0];
            }
            //perfect fit
            if (heightDifference === 0) {
                break;
                //too small
            }
            else if (heightDifference < 0) {
                hasLowerBoundary = true;
                lowerBoundary = inputConfig.dots.dSingle;
                if (hasUpperBoundary) {
                    // arithm. middle between old and new dSingle
                    inputConfig.dots.dSingle = (upperBoundary + inputConfig.dots.dSingle) / 2;
                }
                else {
                    // double if height still didn't reach target value
                    inputConfig.dots.dSingle *= 2;
                }
                //too big
            }
            else if (heightDifference > 0) {
                hasUpperBoundary = true;
                upperBoundary = inputConfig.dots.dSingle;
                if (hasLowerBoundary) {
                    // arithm. middle between old and new dSingle
                    inputConfig.dots.dSingle = (lowerBoundary + inputConfig.dots.dSingle) / 2;
                }
                else {
                    // halve if height still didn't reach target value
                    inputConfig.dots.dSingle /= 2;
                }
            }
            iterIndex++;
        }
    } while (inputConfig.aspect.ratio > 0 && !lastRound);
    // dSingle found / already given
    // calculates height and width, so graph fits
    if (containerRatio === heightToOne) {
        // both are equal container
        width = containerWidth;
        height = containerHeight;
    }
    else if (containerRatio > heightToOne || isNaN(containerHeight)) {
        // width is equal container (or no height given)
        width = containerWidth;
        height = heightToOne * width;
        //console.log("height change");
        // if calculation error occured and graph doesn't fit, take other method
        if (Math.floor(height) > containerHeight) {
            //console.log("height change BAD");
            height = containerHeight;
            width = height / heightToOne;
        }
    }
    else {
        // height is equal container (or no width given)
        height = containerHeight;
        width = height / heightToOne;
        //console.log("width change");
        // if calculation error occured and graph doesn't fit, take other method
        if (Math.floor(width) > containerWidth) {
            //console.log("width change BAD");
            width = containerWidth;
            height = heightToOne * width;
        }
    }
    // standart density samplerate. Uses width in pixel as start.
    if (inputConfig.density.sampleRate <= 0) {
        inputConfig.density.sampleRate = width;
        //sampleRate = width * inputConfig.xTicksFactor;
    }
    ;
    /* Calculate yDomain. From pixel to domain value */
    yDomain = [0, (height * (domainWidth / width))];
    // axis scales:
    xAxisScale = d3.scaleLinear()
        .range([0, width])
        .domain(xDomain);
    yAxisScale = d3.scaleLinear()
        .range([height, 0])
        .domain(yDomain);
    return {
        height: height,
        width: width,
        xDomain: xDomain,
        xDomainWidth: domainWidth,
        yDomain: yDomain,
        xAxisScale: xAxisScale,
        yAxisScale: yAxisScale,
        columns: columns,
        colorNames: colorNames,
        domainToPixel: (width / domainWidth),
        xAxisHeight: X_AXIS_HEIGHT,
        boundaryList: boundaryList,
        kde: kde,
        updateTextures: true
    };
}
/**
Receives inputData, inputConfig and checkColor as input.
Performs the double sweep algorithm with already sorted data
Further details algorithm:
Nonlinear Dot Plots, Rodrigues and Weiskopf
*/
function doubleSweep(inputConfig, inputData, checkColor, kde, densMax) {
    // upscale data if neccecary
    let sweepData = upscaleSweepInput(inputConfig, inputData, false);
    // let olddSingle = inputConfig.dots.dSingle;
    // inputConfig.dots.dSingle = sweepData.dSingleSweep;
    // 1. right to left sweep (inputData is in DESCENDING order now)
    sweepData.inputDataSweep = [...sweepData.inputDataSweep].reverse();
    let columns = [];
    let colorNames = [];
    // column attributes
    let xPos = sweepData.inputDataSweep[0][inputConfig.xAttribute];
    let c = 0;
    let diameter;
    // helper for testing xAttribute
    let itemType;
    /* PART TWO*/
    // for height calculation later
    let highestColumn = 0;
    // to iterate through 
    let colIndex = 0;
    // overflow during combining
    let overflow = false;
    let cTemp;
    // inputConfig.dotscaling.scaleDensDiamDom(kde(dataPoint[inputConfig.xAttribute]), inputConfig.dSingle);
    let kdeHeightDom = 0;
    let highestPlotPointDom;
    sweepData.inputDataSweep.forEach((dataPoint, index) => {
        //extracts the different colorNames, only on the first sweep
        if (checkColor) {
            if (!colorNames.includes(dataPoint[inputConfig.color.attribute])) {
                colorNames.push(dataPoint[inputConfig.color.attribute]);
            }
        }
        //checks if xAttribute is always a number
        itemType = typeof dataPoint[inputConfig.xAttribute];
        if (itemType != 'number') {
            throw new Error("Value \"" + dataPoint[inputConfig.xAttribute] + "\" for xAtrribute  \"" + inputConfig.xAttribute + "\"  in the JSON-Object with Index \"" + index + "\" should be a number, is " + itemType);
        }
        else if (isNaN(dataPoint[inputConfig.xAttribute])) {
            throw new Error("Value \"" + dataPoint[inputConfig.xAttribute] + "\" for xAtrribute  \"" + inputConfig.xAttribute + "\"  in the JSON-Object with Index \"" + index + "\" should be a number, is NaN");
        }
        // current Item is always in Column
        c++;
        // modifies dSingle with given dotscale for the old column diameter
        diameter = inputConfig.dots.dotscaling.columnToDiamDom(c, sweepData.dSingleSweep);
        // last point in inputData check
        if (index < (sweepData.inputDataSweep.length - 1)) {
            // Point distance sufficient for new column
            if (Math.abs(nextX(index) - xPos) > diameter) {
                // save Column
                columns.push({
                    xPos: xPos,
                    c: c
                    // diameter only saved after second sweep
                    ,
                    colDiameterDom: -1
                    // start index of the column on inputData
                    ,
                    startIndex: -1
                });
                // reset var
                xPos = nextX(index);
                c = 0;
                diameter = sweepData.dSingleSweep;
            }
        }
        else {
            // save last column
            columns.push({
                xPos: xPos,
                c: c
                // diameter only saved after second sweep
                ,
                colDiameterDom: -1
                // start index of the column on inputData
                ,
                startIndex: -1
            });
        }
    });
    // reversing both arrays for left to right sweep
    columns.reverse();
    sweepData.inputDataSweep = [...sweepData.inputDataSweep].reverse();
    // 2. left to right sweep with combining (inputData is in ASCENDING order)
    xPos = sweepData.inputDataSweep[0][inputConfig.xAttribute];
    c = 0;
    // console.log([...columns]);
    sweepData.inputDataSweep.forEach((dataPoint, index) => {
        // current Item is always in Column
        c++;
        // modifies dSingle with given f
        diameter = inputConfig.dots.dotscaling.columnToDiamDom(c, sweepData.dSingleSweep);
        // last point in inputData check
        if (index < (sweepData.inputDataSweep.length - 1)) {
            // Point distance sufficient for new column
            if (Math.abs(nextX(index) - xPos) > diameter) {
                // combine both sweeps
                //xPos
                columns[colIndex].xPos = (columns[colIndex].xPos + xPos) / 2;
                // c
                cTemp = (columns[colIndex].c + c) / 2;
                // check if decimal for overflow
                if (cTemp % 1 != 0) {
                    if (overflow) {
                        columns[colIndex].c = Math.ceil(cTemp);
                        overflow = false;
                    }
                    else {
                        columns[colIndex].c = Math.floor(cTemp);
                        overflow = true;
                    }
                }
                else {
                    columns[colIndex].c = cTemp;
                }
                // calculate column diameter as an average diameter value
                columns[colIndex].colDiameterDom = inputConfig.dots.dotscaling.columnToDiamDom(columns[colIndex].c, sweepData.dSingleSweep);
                //save highest column
                if (columns[highestColumn].c < columns[colIndex].c) {
                    highestColumn = colIndex;
                }
                // start index of the column on inputData
                // Maybe rather go from the start and count up all prior c
                columns[colIndex].startIndex = index - columns[colIndex].c + 1;
                // reset var
                xPos = nextX(index);
                c = 0;
                diameter = sweepData.dSingleSweep;
                kdeHeightDom = 0;
                colIndex++;
            }
        }
        else {
            // finalize last column
            //xPos
            columns[colIndex].xPos = (columns[colIndex].xPos + xPos) / 2;
            // c
            cTemp = (columns[colIndex].c + c) / 2;
            if (overflow) {
                columns[colIndex].c = Math.ceil(cTemp);
            }
            else {
                columns[colIndex].c = cTemp;
            }
            // calculate column diameter as an average diameter value
            columns[colIndex].colDiameterDom = inputConfig.dots.dotscaling.columnToDiamDom(columns[colIndex].c, sweepData.dSingleSweep);
            //save highest column
            if (columns[highestColumn].c < columns[colIndex].c) {
                highestColumn = colIndex;
            }
            // start index of the column on inputData
            columns[colIndex].startIndex = index - columns[colIndex].c + 1;
        }
    });
    function nextX(index) {
        return sweepData.inputDataSweep[index + 1][inputConfig.xAttribute];
    }
    // upscale output back to normal
    columns = downscaleSweepOutput(columns, sweepData.upscaleFactor);
    // get height of the highest column in domain value
    switch (inputConfig.dots.radiusMode) {
        case "column":
            highestPlotPointDom = columns[highestColumn].colDiameterDom * columns[highestColumn].c;
            break;
        case "kde":
            if (inputConfig.relaxing.squichDots) {
                // Relax config puts dots under KDE, so just use KDE height
                highestPlotPointDom = densMax;
            }
            else {
                // calculate real height of plot
                for (let index = columns[highestColumn].startIndex; index < columns[highestColumn].startIndex + columns[highestColumn].c; index++) {
                    kdeHeightDom += inputConfig.dots.dotscaling.scaleDensDiamDom(kde(inputData[index][inputConfig.xAttribute]), inputConfig.dots.dSingle);
                }
                highestPlotPointDom = (densMax > kdeHeightDom) ? densMax : kdeHeightDom;
            }
            break;
        default:
            break;
    }
    let result = {
        columns: columns,
        highestColumn: highestColumn,
        highestPlotPointDom: highestPlotPointDom,
        colorNames: colorNames
    };
    return result;
}
/**
    Upscales data if dSingle smaller than 1
*/
function upscaleSweepInput(inputConfig, inputData, withUpscale = false) {
    // if dSingle bigger than 1 no upsaling neccecary
    if (inputConfig.dots.dSingle >= 1 || !withUpscale) {
        return {
            upscaleFactor: 1,
            dSingleSweep: inputConfig.dots.dSingle,
            inputDataSweep: inputData
        };
    }
    // factor to multiply dSingle with for upscaling
    let upscaleFactor = 1 / inputConfig.dots.dSingle;
    let inputDataSweep;
    // deep copy of the input data object
    inputDataSweep = inputData.map(obj => {
        let newObj = Object.assign({}, obj);
        newObj[inputConfig.xAttribute] *= upscaleFactor;
        return newObj;
    });
    return {
        upscaleFactor: upscaleFactor,
        dSingleSweep: 1,
        inputDataSweep: inputDataSweep
    };
}
/**
    revert upscaling
*/
function downscaleSweepOutput(columns, upscaleFactor) {
    if (upscaleFactor === 1) {
        return columns;
    }
    // downscale position and diameter
    let newColumn = columns.map(column => {
        let newColumn = Object.assign({}, column);
        newColumn.colDiameterDom /= upscaleFactor;
        newColumn.xPos /= upscaleFactor;
        return newColumn;
    });
    return newColumn;
}
/**
    creates the object for one circle
*/
function newSingleCircle(inputConfig, dataPoint, diameterDom, d3RefID, xDom, yPix, plotParam, blur, hasColor) {
    // density for calc of diameter
    let unscaledDens;
    let radiusPix;
    // color calc
    let color;
    // hover text of the circle
    let description;
    // from domain to pixel value
    radiusPix = diameterDom / 2 * plotParam.domainToPixel;
    // set color
    if (hasColor) {
        color = plotParam.colors[dataPoint[inputConfig.color.attribute]];
    }
    else {
        color = inputConfig.color.scale[0].color;
    }
    // set description
    description = JSON.stringify(dataPoint).replace(/{|}|"/g, "").replace(/,/g, "<br/>").replace(/:/g, ":&nbsp;");
    let url = undefined;
    if (inputConfig.images.useImages) {
        // url = getImageURL(dataPoint["FruitType"]);
        // url = getImageURL(dataPoint["Country"]);
        url = getImageURL(dataPoint[inputConfig.images.attribute]);
    }
    return {
        d3RefID: d3RefID,
        URL: url,
        origXdom: dataPoint[inputConfig.xAttribute],
        origXpix: plotParam.xAxisScale(dataPoint[inputConfig.xAttribute]),
        xPix: plotParam.xAxisScale(xDom)
        // yPix is bottom of the circle, to get middle point we add rad
        ,
        yPix: yPix + radiusPix,
        origColor: d3.lab(color)
        // for Relaxing colering
        ,
        errorColor: "#000000",
        coverageColor: "#000000"
        //, radiusDom: radiusPix
        ,
        radiusPix: radiusPix,
        desc: description,
        blur: blur
    };
}
/**
Receives inputData, inputConfig, hasColor and finalSweepResult as input.
Determines all necessary parameters for circles
The return value arrayy of circles
*/
function createCircleData(inputConfig, inputData, hasColor, plotParam) {
    const SUP_SAMP_MIN = 4;
    // data for drawing
    let circleData = [];
    let newCircle;
    // calculation helper
    let inputDataColumn;
    let spliceStart = 0;
    let columns = plotParam.columns;
    // color variables
    let colorNames = plotParam.colorNames;
    // Blur check variables
    let hasBlur;
    let edgeDistance;
    let colBlurFlag;
    let gapDistance;
    let gapCheckDistance;
    let biggerCol;
    let smallerCol;
    // bottom of new circle
    let yPix;
    // blur value
    let blur;
    // id of circle for d3 Reference
    let d3RefID = 0;
    let density;
    // diameter calc
    let unscaledDens;
    let diameterDom;
    // squash factor for one column, so that points stay under kde
    let ySquishFactor;
    let squishIndex = 0;
    let squishEndIndex = 0;
    // getting the smallest dot diam
    let smallestRadPix = Infinity;
    // finalize colors
    if (hasColor) {
        // Creates color map-object
        plotParam.colors = createColors(colorNames, inputConfig);
    }
    // for each column in the graph
    columns.forEach((oneColumn, columnIndex) => {
        // reset y for each column
        yPix = 0;
        // create array of points from one column
        inputDataColumn = inputData.slice(spliceStart, (spliceStart + oneColumn.c));
        // splice for jsonObjecs to get data from points
        spliceStart += oneColumn.c;
        // is column blurred
        if (columnIndex === (columns.length - 1)) {
            //last collumn
            hasBlur = false;
        }
        else {
            // picks the more narrow collumn
            if (columns[columnIndex].colDiameterDom >= columns[columnIndex + 1].colDiameterDom) {
                biggerCol = columnIndex;
                smallerCol = columnIndex + 1;
            }
            else {
                biggerCol = columnIndex + 1;
                smallerCol = columnIndex;
            }
            //neighbour-Check with smaller Collumn
            gapCheckDistance = (inputConfig.blur.gapDistance * columns[biggerCol].colDiameterDom);
            gapDistance = Math.abs(columns[biggerCol].xPos - columns[smallerCol].xPos) - ((columns[biggerCol].colDiameterDom / 2) + (columns[smallerCol].colDiameterDom / 2));
            if (gapCheckDistance > gapDistance) {
                // collision
                if (colBlurFlag && columnIndex != 0) {
                    hasBlur = true;
                }
                else {
                    hasBlur = false;
                }
                colBlurFlag = true;
            }
            else {
                // no collision
                hasBlur = false;
                colBlurFlag = false;
            }
        }
        ;
        // blurEdge too big
        if (oneColumn.c <= (inputConfig.blur.edge * 2) || (inputConfig.blur.edge < 0)) {
            hasBlur = false;
        }
        ;
        //sorts column alternating
        inputDataColumn = sortAlternating(inputDataColumn, inputConfig, hasColor);
        // for each point in a column
        inputDataColumn.forEach((dataPoint, pointindex) => {
            blur = -1;
            // set blur
            if (hasBlur) {
                if (pointindex >= inputConfig.blur.edge && pointindex <= (oneColumn.c - inputConfig.blur.edge - 1)) {
                    edgeDistance = Math.min(pointindex - (inputConfig.blur.edge - 1), (oneColumn.c - inputConfig.blur.edge) - pointindex);
                    if (edgeDistance >= (inputConfig.blur.ramp + 1)) {
                        blur = 1;
                    }
                    else {
                        blur = edgeDistance / (inputConfig.blur.ramp + 1);
                    }
                }
            }
            // calculate diameter in domain value
            switch (inputConfig.dots.radiusMode) {
                case "column":
                    diameterDom = inputConfig.dots.dotscaling.columnToDiamDom(oneColumn.c, inputConfig.dots.dSingle);
                    break;
                case "kde":
                    // dot diameter in pixel domain
                    diameterDom = inputConfig.dots.dotscaling.scaleDensDiamDom(plotParam.kde(dataPoint[inputConfig.xAttribute]), inputConfig.dots.dSingle);
                    break;
                default:
                    break;
            }
            newCircle = newSingleCircle(inputConfig, dataPoint, diameterDom, d3RefID++, oneColumn.xPos, yPix, plotParam, blur, hasColor);
            // set yValue according to a collumn for initial placement
            yPix += newCircle.radiusPix * 2;
            // console.log(newCircle);
            circleData.push(newCircle);
        });
        if (inputConfig.relaxing.squichDots) {
            density = inputConfig.dots.dotscaling.scaleDensityDom(plotParam.kde(oneColumn.xPos), inputConfig.dots.dSingle) * plotParam.domainToPixel;
            ySquishFactor = density / yPix;
            // iterates over circles of the current column to squash their y value below Density
            squishEndIndex += oneColumn.c;
            for (; squishIndex < squishEndIndex; squishIndex++) {
                circleData[squishIndex].yPix *= ySquishFactor;
                smallestRadPix = (smallestRadPix < circleData[squishIndex].radiusPix) ? smallestRadPix : circleData[squishIndex].radiusPix;
            }
        }
    });
    // set supersampling factor
    inputConfig.relaxing.supSampFactor = Math.max(SUP_SAMP_MIN, Math.ceil(1 / smallestRadPix));
    return circleData;
}
/**
Receives colorNames and inputConfig as input.
Checks custom color.attributeMap or creates a new one and
calculates the colors array from that mapping
*/
function createColors(colorNames, inputConfig) {
    createAttributeMap(colorNames, inputConfig);
    return createColorsObject(colorNames, inputConfig);
}
/**
Receives colorNames and inputConfig as input.
Throws error if colorNames is missing.
Sorts colorNames with either custom mapping or creates new one that
maps colorNames to normalized scale.
*/
function createAttributeMap(colorNames, inputConfig) {
    //no values for colorNames found
    if (colorNames.length === 0) {
        throw new Error("no values found for color.attribute: " + inputConfig.color.attribute);
    }
    ;
    if (inputConfig.color.attributeMap === null) {
        // no custom color.attributeMap
        let tempAttributeMap = (colorNames) => {
            if (colorNames.length === 1) {
                // no idea if important
                // console.warn("There is only one value type for the given color.attribute: \"" + inputConfig.color.attribute + "\". This means that setting no color.attribute at all might be prefarable.");
                return (value) => {
                    return 0;
                };
            }
            ;
            let currentType = "none";
            for (let value of colorNames) {
                if (currentType === "none") {
                    currentType = typeof value;
                }
                else if (currentType != typeof value) {
                    console.warn("Mixed types found for values in color.attribute \"" + inputConfig.color.attribute + "\". This can have unwanted effects on the automatic mapping");
                    break;
                }
            }
            ;
            if (currentType === "string") {
                //sort per String
                colorNames.sort((a, b) => { return a.toString().localeCompare(b); });
            }
            else {
                //numerical Sort
                colorNames.sort((a, b) => { return a - b; });
            }
            return (value) => {
                return colorNames.indexOf(value) / (colorNames.length - 1);
            };
        };
        inputConfig.color.attributeMap = tempAttributeMap(colorNames);
    }
    else {
        // check custom mapping
        colorNames.forEach((item, index) => {
            if (inputConfig.color.attributeMap(item) < 0 || inputConfig.color.attributeMap(item) > 1) {
                throw new Error("Color attribute: \"" + item + "\" is mapped to: " + inputConfig.color.attributeMap(item) + ", but should have been within [0,1]!");
            }
        });
        colorNames.sort((a, b) => { return inputConfig.color.attributeMap(a) - inputConfig.color.attributeMap(b); });
    }
}
/**
Receives colorNames and inputConfig as input.
Interpolates colors to simulate a color scale.
Returns the result as an object to map color to color name.
*/
function createColorsObject(colorNames, inputConfig) {
    // for color interpolation
    let colorInterpolation; //both colors
    let linearScale = d3.scaleLinear().range([0, 1]); //normalized to [0,1]
    let scaledAttr;
    // indexing
    let posIndex = 0;
    let firstIndex;
    let newestIndex;
    let colors = {};
    // sort colorScale by positions
    inputConfig.color.scale.sort((a, b) => { return a.position - b.position; });
    for (let attribute of colorNames) {
        //test for last and first color
        if (inputConfig.color.scale[0].position > inputConfig.color.attributeMap(attribute)) {
            colors[attribute] = inputConfig.color.scale[0].color;
            continue;
        }
        else if (inputConfig.color.scale[inputConfig.color.scale.length - 1].position < inputConfig.color.attributeMap(attribute)) {
            colors[attribute] = inputConfig.color.scale[inputConfig.color.scale.length - 1].color;
            continue;
        }
        // first color selection for interpolation
        while (inputConfig.color.scale[posIndex].position < inputConfig.color.attributeMap(attribute)) {
            firstIndex = posIndex;
            posIndex++;
        }
        //position equals attribute mapping or no color position prior
        if (inputConfig.color.scale[posIndex].position === inputConfig.color.attributeMap(attribute)) {
            newestIndex = posIndex;
            // no out of bounds plz
            if ((newestIndex + 1) != inputConfig.color.scale.length) {
                //always takes the last color if multiple have same position
                while (inputConfig.color.scale[newestIndex + 1].position === inputConfig.color.attributeMap(attribute)) {
                    newestIndex++;
                    if ((newestIndex + 1) === inputConfig.color.scale.length) {
                        break;
                    }
                }
            }
            colors[attribute] = inputConfig.color.scale[newestIndex].color;
            continue;
        }
        //first color is saved, second color is at posIndex. Interpolation can beginn
        colorInterpolation = d3.interpolate(inputConfig.color.scale[firstIndex].color, inputConfig.color.scale[posIndex].color);
        // normalize the color positions
        linearScale.domain([inputConfig.color.scale[firstIndex].position, inputConfig.color.scale[posIndex].position]);
        // scale the attribute position
        scaledAttr = linearScale(inputConfig.color.attributeMap(attribute));
        // get color from interpolation
        colors[attribute] = colorInterpolation(scaledAttr);
    }
    return colors;
}
/**
    Get color for the error of the circle
*/
function colorDisError(inputConfig, circle) {
    let placingError = circle.xPix - circle.origXpix;
    let relativeError = placingError / circle.radiusPix;
    return colorScalePicker((relativeError + 1) / 2);
}
/**
    Get color for the error of the circle position are supersampled
*/
function colorDisErrorSupSamp(inputConfig, circle) {
    let placingError = circle.xPix / inputConfig.relaxing.supSampFactor - circle.origXpix / inputConfig.relaxing.supSampFactor;
    let relativeError = placingError / circle.radiusPix;
    return colorScalePicker((relativeError + 1) / 2);
}
/**
    get a color
*/
function colorScalePicker(scalar) {
    let colors = d3.scaleLinear()
        .domain(getScalarDomain())
        .range(getCoolWarmScale());
    // clamp all scalars to scale
    colors.clamp(true);
    return colors(scalar);
}
/**
self made scalar domain for the Cool Warm scale
*/
function getScalarDomain() {
    return [0,
        0.00390625,
        0.0078125,
        0.01171875,
        0.015625,
        0.01953125,
        0.0234375,
        0.02734375,
        0.03125,
        0.03515625,
        0.0390625,
        0.04296875,
        0.046875,
        0.05078125,
        0.0546875,
        0.05859375,
        0.0625,
        0.06640625,
        0.0703125,
        0.07421875,
        0.078125,
        0.08203125,
        0.0859375,
        0.08984375,
        0.09375,
        0.09765625,
        0.1015625,
        0.10546875,
        0.109375,
        0.11328125,
        0.1171875,
        0.12109375,
        0.125,
        0.12890625,
        0.1328125,
        0.13671875,
        0.140625,
        0.14453125,
        0.1484375,
        0.15234375,
        0.15625,
        0.16015625,
        0.1640625,
        0.16796875,
        0.171875,
        0.17578125,
        0.1796875,
        0.18359375,
        0.1875,
        0.19140625,
        0.1953125,
        0.19921875,
        0.203125,
        0.20703125,
        0.2109375,
        0.21484375,
        0.21875,
        0.22265625,
        0.2265625,
        0.23046875,
        0.234375,
        0.23828125,
        0.2421875,
        0.24609375,
        0.25,
        0.25390625,
        0.2578125,
        0.26171875,
        0.265625,
        0.26953125,
        0.2734375,
        0.27734375,
        0.28125,
        0.28515625,
        0.2890625,
        0.29296875,
        0.296875,
        0.30078125,
        0.3046875,
        0.30859375,
        0.3125,
        0.31640625,
        0.3203125,
        0.32421875,
        0.328125,
        0.33203125,
        0.3359375,
        0.33984375,
        0.34375,
        0.34765625,
        0.3515625,
        0.35546875,
        0.359375,
        0.36328125,
        0.3671875,
        0.37109375,
        0.375,
        0.37890625,
        0.3828125,
        0.38671875,
        0.390625,
        0.39453125,
        0.3984375,
        0.40234375,
        0.40625,
        0.41015625,
        0.4140625,
        0.41796875,
        0.421875,
        0.42578125,
        0.4296875,
        0.43359375,
        0.4375,
        0.44140625,
        0.4453125,
        0.44921875,
        0.453125,
        0.45703125,
        0.4609375,
        0.46484375,
        0.46875,
        0.47265625,
        0.4765625,
        0.48046875,
        0.484375,
        0.48828125,
        0.4921875,
        0.49609375,
        0.5,
        0.50390625,
        0.5078125,
        0.51171875,
        0.515625,
        0.51953125,
        0.5234375,
        0.52734375,
        0.53125,
        0.53515625,
        0.5390625,
        0.54296875,
        0.546875,
        0.55078125,
        0.5546875,
        0.55859375,
        0.5625,
        0.56640625,
        0.5703125,
        0.57421875,
        0.578125,
        0.58203125,
        0.5859375,
        0.58984375,
        0.59375,
        0.59765625,
        0.6015625,
        0.60546875,
        0.609375,
        0.61328125,
        0.6171875,
        0.62109375,
        0.625,
        0.62890625,
        0.6328125,
        0.63671875,
        0.640625,
        0.64453125,
        0.6484375,
        0.65234375,
        0.65625,
        0.66015625,
        0.6640625,
        0.66796875,
        0.671875,
        0.67578125,
        0.6796875,
        0.68359375,
        0.6875,
        0.69140625,
        0.6953125,
        0.69921875,
        0.703125,
        0.70703125,
        0.7109375,
        0.71484375,
        0.71875,
        0.72265625,
        0.7265625,
        0.73046875,
        0.734375,
        0.73828125,
        0.7421875,
        0.74609375,
        0.75,
        0.75390625,
        0.7578125,
        0.76171875,
        0.765625,
        0.76953125,
        0.7734375,
        0.77734375,
        0.78125,
        0.78515625,
        0.7890625,
        0.79296875,
        0.796875,
        0.80078125,
        0.8046875,
        0.80859375,
        0.8125,
        0.81640625,
        0.8203125,
        0.82421875,
        0.828125,
        0.83203125,
        0.8359375,
        0.83984375,
        0.84375,
        0.84765625,
        0.8515625,
        0.85546875,
        0.859375,
        0.86328125,
        0.8671875,
        0.87109375,
        0.875,
        0.87890625,
        0.8828125,
        0.88671875,
        0.890625,
        0.89453125,
        0.8984375,
        0.90234375,
        0.90625,
        0.91015625,
        0.9140625,
        0.91796875,
        0.921875,
        0.92578125,
        0.9296875,
        0.93359375,
        0.9375,
        0.94140625,
        0.9453125,
        0.94921875,
        0.953125,
        0.95703125,
        0.9609375,
        0.96484375,
        0.96875,
        0.97265625,
        0.9765625,
        0.98046875,
        0.984375,
        0.98828125,
        0.9921875,
        0.99609375,
        1,
    ];
}
/**
    Cool Warm color scale
*/
function getCoolWarmScale() {
    return [
        "rgb(59, 76, 192)",
        "rgb(60, 78, 194)",
        "rgb(61, 80, 195)",
        "rgb(62, 81, 197)",
        "rgb(63, 83, 198)",
        "rgb(64, 85, 200)",
        "rgb(66, 87, 201)",
        "rgb(67, 88, 203)",
        "rgb(68, 90, 204)",
        "rgb(69, 92, 206)",
        "rgb(70, 93, 207)",
        "rgb(71, 95, 209)",
        "rgb(73, 97, 210)",
        "rgb(74, 99, 211)",
        "rgb(75, 100, 213)",
        "rgb(76, 102, 214)",
        "rgb(77, 104, 215)",
        "rgb(79, 105, 217)",
        "rgb(80, 107, 218)",
        "rgb(81, 109, 219)",
        "rgb(82, 110, 221)",
        "rgb(84, 112, 222)",
        "rgb(85, 114, 223)",
        "rgb(86, 115, 224)",
        "rgb(87, 117, 225)",
        "rgb(89, 119, 226)",
        "rgb(90, 120, 228)",
        "rgb(91, 122, 229)",
        "rgb(93, 123, 230)",
        "rgb(94, 125, 231)",
        "rgb(95, 127, 232)",
        "rgb(96, 128, 233)",
        "rgb(98, 130, 234)",
        "rgb(99, 131, 235)",
        "rgb(100, 133, 236)",
        "rgb(102, 135, 237)",
        "rgb(103, 136, 238)",
        "rgb(104, 138, 239)",
        "rgb(106, 139, 239)",
        "rgb(107, 141, 240)",
        "rgb(108, 142, 241)",
        "rgb(110, 144, 242)",
        "rgb(111, 145, 243)",
        "rgb(112, 147, 243)",
        "rgb(114, 148, 244)",
        "rgb(115, 150, 245)",
        "rgb(116, 151, 246)",
        "rgb(118, 153, 246)",
        "rgb(119, 154, 247)",
        "rgb(120, 156, 247)",
        "rgb(122, 157, 248)",
        "rgb(123, 158, 249)",
        "rgb(124, 160, 249)",
        "rgb(126, 161, 250)",
        "rgb(127, 163, 250)",
        "rgb(129, 164, 251)",
        "rgb(130, 165, 251)",
        "rgb(131, 167, 252)",
        "rgb(133, 168, 252)",
        "rgb(134, 169, 252)",
        "rgb(135, 171, 253)",
        "rgb(137, 172, 253)",
        "rgb(138, 173, 253)",
        "rgb(140, 174, 254)",
        "rgb(141, 176, 254)",
        "rgb(142, 177, 254)",
        "rgb(144, 178, 254)",
        "rgb(145, 179, 254)",
        "rgb(147, 181, 255)",
        "rgb(148, 182, 255)",
        "rgb(149, 183, 255)",
        "rgb(151, 184, 255)",
        "rgb(152, 185, 255)",
        "rgb(153, 186, 255)",
        "rgb(155, 187, 255)",
        "rgb(156, 188, 255)",
        "rgb(158, 190, 255)",
        "rgb(159, 191, 255)",
        "rgb(160, 192, 255)",
        "rgb(162, 193, 255)",
        "rgb(163, 194, 255)",
        "rgb(164, 195, 254)",
        "rgb(166, 196, 254)",
        "rgb(167, 197, 254)",
        "rgb(168, 198, 254)",
        "rgb(170, 199, 253)",
        "rgb(171, 199, 253)",
        "rgb(172, 200, 253)",
        "rgb(174, 201, 253)",
        "rgb(175, 202, 252)",
        "rgb(176, 203, 252)",
        "rgb(178, 204, 251)",
        "rgb(179, 205, 251)",
        "rgb(180, 205, 251)",
        "rgb(182, 206, 250)",
        "rgb(183, 207, 250)",
        "rgb(184, 208, 249)",
        "rgb(185, 208, 248)",
        "rgb(187, 209, 248)",
        "rgb(188, 210, 247)",
        "rgb(189, 210, 247)",
        "rgb(190, 211, 246)",
        "rgb(192, 212, 245)",
        "rgb(193, 212, 245)",
        "rgb(194, 213, 244)",
        "rgb(195, 213, 243)",
        "rgb(197, 214, 243)",
        "rgb(198, 214, 242)",
        "rgb(199, 215, 241)",
        "rgb(200, 215, 240)",
        "rgb(201, 216, 239)",
        "rgb(203, 216, 238)",
        "rgb(204, 217, 238)",
        "rgb(205, 217, 237)",
        "rgb(206, 217, 236)",
        "rgb(207, 218, 235)",
        "rgb(208, 218, 234)",
        "rgb(209, 219, 233)",
        "rgb(210, 219, 232)",
        "rgb(211, 219, 231)",
        "rgb(213, 219, 230)",
        "rgb(214, 220, 229)",
        "rgb(215, 220, 228)",
        "rgb(216, 220, 227)",
        "rgb(217, 220, 225)",
        "rgb(218, 220, 224)",
        "rgb(219, 220, 223)",
        "rgb(220, 221, 222)",
        "rgb(221, 221, 221)",
        "rgb(222, 220, 219)",
        "rgb(223, 220, 218)",
        "rgb(224, 219, 216)",
        "rgb(225, 219, 215)",
        "rgb(226, 218, 214)",
        "rgb(227, 218, 212)",
        "rgb(228, 217, 211)",
        "rgb(229, 216, 209)",
        "rgb(230, 216, 208)",
        "rgb(231, 215, 206)",
        "rgb(232, 215, 205)",
        "rgb(232, 214, 203)",
        "rgb(233, 213, 202)",
        "rgb(234, 212, 200)",
        "rgb(235, 212, 199)",
        "rgb(236, 211, 197)",
        "rgb(236, 210, 196)",
        "rgb(237, 209, 194)",
        "rgb(238, 209, 193)",
        "rgb(238, 208, 191)",
        "rgb(239, 207, 190)",
        "rgb(240, 206, 188)",
        "rgb(240, 205, 187)",
        "rgb(241, 204, 185)",
        "rgb(241, 203, 184)",
        "rgb(242, 202, 182)",
        "rgb(242, 201, 181)",
        "rgb(243, 200, 179)",
        "rgb(243, 199, 178)",
        "rgb(244, 198, 176)",
        "rgb(244, 197, 174)",
        "rgb(245, 196, 173)",
        "rgb(245, 195, 171)",
        "rgb(245, 194, 170)",
        "rgb(245, 193, 168)",
        "rgb(246, 192, 167)",
        "rgb(246, 191, 165)",
        "rgb(246, 190, 163)",
        "rgb(246, 188, 162)",
        "rgb(247, 187, 160)",
        "rgb(247, 186, 159)",
        "rgb(247, 185, 157)",
        "rgb(247, 184, 156)",
        "rgb(247, 182, 154)",
        "rgb(247, 181, 152)",
        "rgb(247, 180, 151)",
        "rgb(247, 178, 149)",
        "rgb(247, 177, 148)",
        "rgb(247, 176, 146)",
        "rgb(247, 174, 145)",
        "rgb(247, 173, 143)",
        "rgb(247, 172, 141)",
        "rgb(247, 170, 140)",
        "rgb(247, 169, 138)",
        "rgb(247, 167, 137)",
        "rgb(247, 166, 135)",
        "rgb(246, 164, 134)",
        "rgb(246, 163, 132)",
        "rgb(246, 161, 131)",
        "rgb(246, 160, 129)",
        "rgb(245, 158, 127)",
        "rgb(245, 157, 126)",
        "rgb(245, 155, 124)",
        "rgb(244, 154, 123)",
        "rgb(244, 152, 121)",
        "rgb(244, 151, 120)",
        "rgb(243, 149, 118)",
        "rgb(243, 147, 117)",
        "rgb(242, 146, 115)",
        "rgb(242, 144, 114)",
        "rgb(241, 142, 112)",
        "rgb(241, 141, 111)",
        "rgb(240, 139, 109)",
        "rgb(240, 137, 108)",
        "rgb(239, 136, 106)",
        "rgb(238, 134, 105)",
        "rgb(238, 132, 103)",
        "rgb(237, 130, 102)",
        "rgb(236, 129, 100)",
        "rgb(236, 127, 99)",
        "rgb(235, 125, 97)",
        "rgb(234, 123, 96)",
        "rgb(233, 121, 95)",
        "rgb(233, 120, 93)",
        "rgb(232, 118, 92)",
        "rgb(231, 116, 90)",
        "rgb(230, 114, 89)",
        "rgb(229, 112, 88)",
        "rgb(228, 110, 86)",
        "rgb(227, 108, 85)",
        "rgb(227, 106, 83)",
        "rgb(226, 104, 82)",
        "rgb(225, 102, 81)",
        "rgb(224, 100, 79)",
        "rgb(223, 98, 78)",
        "rgb(222, 96, 77)",
        "rgb(221, 94, 75)",
        "rgb(220, 92, 74)",
        "rgb(218, 90, 73)",
        "rgb(217, 88, 71)",
        "rgb(216, 86, 70)",
        "rgb(215, 84, 69)",
        "rgb(214, 82, 67)",
        "rgb(213, 80, 66)",
        "rgb(212, 78, 65)",
        "rgb(210, 75, 64)",
        "rgb(209, 73, 62)",
        "rgb(208, 71, 61)",
        "rgb(207, 69, 60)",
        "rgb(205, 66, 59)",
        "rgb(204, 64, 57)",
        "rgb(203, 62, 56)",
        "rgb(202, 59, 55)",
        "rgb(200, 57, 54)",
        "rgb(199, 54, 53)",
        "rgb(198, 51, 52)",
        "rgb(196, 49, 50)",
        "rgb(195, 46, 49)",
        "rgb(193, 43, 48)",
        "rgb(192, 40, 47)",
        "rgb(190, 37, 46)",
        "rgb(189, 34, 45)",
        "rgb(188, 30, 44)",
        "rgb(186, 26, 43)",
        "rgb(185, 22, 41)",
        "rgb(183, 17, 40)",
        "rgb(181, 11, 39)",
        "rgb(180, 4, 38)",
    ];
}
// helper for easy switch
let imageKeyword = "Faces";
// set the actual image list here
let imageList = getImageList();
// getter for easy selecting of new datasets
function getImageList() {
    switch (imageKeyword) {
        case "Faces":
            return getFaceImages();
        default:
            throw new Error("Keyword " + imageKeyword + " does not have an ImageList tied to it");
    }
}
/*
    get URL of image at given Index in the imageList
*/
function getImageURL(imageIndex) {
    // local server location
    let urlStart = `http://127.0.0.1:8080/examples/${imageKeyword}/`;
    return urlStart + imageList[imageIndex].fileName;
}
// help function to make a getImage function string
function createGetImages() {
    let text = "return {\n";
    for (let index = 0; index < 20; index++) {
        text += "\t," + index + ": {\n";
        text += "\t\tfileName: \"AvatarMaker" + index + "\"\n";
        text += "\t\t,order: 1\n";
        text += "\t}\n";
    }
    text = "}";
    console.log(text);
}
/** Helper functions to make adding new datasets easyer and not flood the Image getter too much */
function getFaceImages() {
    return {
        0: {
            fileName: "AvatarMaker0.png",
            order: 1
        },
        1: {
            fileName: "AvatarMaker1.png",
            order: 1
        },
        2: {
            fileName: "AvatarMaker2.png",
            order: 1
        },
        3: {
            fileName: "AvatarMaker3.png",
            order: 1
        },
        4: {
            fileName: "AvatarMaker4.png",
            order: 1
        },
        5: {
            fileName: "AvatarMaker5.png",
            order: 1
        },
        6: {
            fileName: "AvatarMaker6.png",
            order: 1
        },
        7: {
            fileName: "AvatarMaker7.png",
            order: 1
        },
        8: {
            fileName: "AvatarMaker8.png",
            order: 1
        },
        9: {
            fileName: "AvatarMaker9.png",
            order: 1
        },
        10: {
            fileName: "AvatarMaker10.png",
            order: 1
        },
        11: {
            fileName: "AvatarMaker11.png",
            order: 1
        },
        12: {
            fileName: "AvatarMaker12.png",
            order: 1
        },
        13: {
            fileName: "AvatarMaker13.png",
            order: 1
        },
        14: {
            fileName: "AvatarMaker14.png",
            order: 1
        },
        15: {
            fileName: "AvatarMaker15.png",
            order: 1
        },
        16: {
            fileName: "AvatarMaker16.png",
            order: 1
        },
        17: {
            fileName: "AvatarMaker17.png",
            order: 1
        },
        18: {
            fileName: "AvatarMaker18.png",
            order: 1
        },
        19: {
            fileName: "AvatarMaker19.png",
            order: 1
        }
    };
}
/* Sorting of Input Data */
/**
    Sorts inputData according to images
*/
function sortImage(inputDataSlice, inputConfig, rng) {
    // Sorts the input by image order  in __ASCENDING__ order
    function sortFunktionImage(a, b) {
        let sortHelp = imageList[a[inputConfig.images.attribute]].order - imageList[b[inputConfig.images.attribute]].order;
        // If both are equal randomize the switch
        if (rng() < 0.5) {
            return sortHelp === 0 ? -1 : sortHelp;
        }
        return sortHelp === 0 ? 1 : sortHelp;
    }
    ;
    inputDataSlice.sort(sortFunktionImage);
    return inputDataSlice;
}
/**

    Sorts inputData according to the x attribute in ascending order.
*/
function sortX(inputData, xAttribute) {
    // Sorts the input by xAttribute in __ASCENDING__ order
    function sortFunktionX(a, b) {
        let sortHelp = a[xAttribute] - b[xAttribute];
        // If both are equal don't switch (a 0 apparently switches them)
        return sortHelp === 0 ? -1 : sortHelp;
    }
    ;
    inputData.sort(sortFunktionX);
    return inputData;
}
/**
    Sorts the special input for a KDE
*/
function sortKDEinput(kdeInput) {
    // Sorts the input by xAttribute in __ASCENDING__ order
    function sortFunktionX(a, b) {
        let sortHelp = a.xDom - b.xDom;
        // If both are equal don't switch (a 0 apparently switches them)
        return sortHelp === 0 ? -1 : sortHelp;
    }
    ;
    kdeInput.sort(sortFunktionX);
    return kdeInput;
}
/**
The inputData is assumed to be a slice representing a column.
The column is divided into bins with independent sorting (e.g. different colors or Images)
Then each bin is sortet alternating: smallest, biggest, second-to-smallest, etc.
Receives inputData and inputConfig as input.
Returns inputData sorted for color but alternating in value within each bin
*/
function sortAlternating(inputDataSlice, inputConfig, hasColor) {
    // the array should be sorted by x already, so no need for extra sort
    //sortX(array, inputConfig.xAttribute);
    // get a blank dictionary
    let binCollection = {};
    let result = [];
    let mappedValue;
    let keys = [];
    // helper for alternating sort
    let a;
    let b;
    let binLength;
    let tempResult;
    // filling the bins with the data
    inputDataSlice.forEach(element => {
        // set grouping depending on if pics or colors are used
        if (hasColor) {
            mappedValue = inputConfig.color.attributeMap(element[inputConfig.color.attribute]);
        }
        else if (inputConfig.images.useImages) {
            mappedValue = imageList[element[inputConfig.images.attribute]].order;
        }
        else {
            // no color or image, so one big bin
            mappedValue = 1;
        }
        // chack if mapped value is already in array
        if (!(mappedValue in binCollection)) {
            // add entry to dictionary
            binCollection[mappedValue] = [element];
            // one of the keys
            keys.push(mappedValue);
        }
        else {
            // add the element to the array
            binCollection[mappedValue].push(element);
        }
    });
    // get the ascending order of keys
    keys.sort();
    // sort all entries of each bin in an alternative way
    for (const key of keys) {
        binLength = binCollection[key].length;
        tempResult = [];
        // iterate from both sides
        a = 0;
        b = binLength - 1;
        while (tempResult.length < binLength) {
            // Push the first element to start form the lowest
            tempResult.push(binCollection[key][a]);
            // skip a push if array has odd length
            if (a !== b) {
                tempResult.push(binCollection[key][b]);
            }
            a++;
            b--;
        }
        // push tempResult on final result
        result = result.concat(tempResult);
    }
    return result;
}
/**
Receives inputData and inputConfig as input.
Sorts inputData according to color.attributeMap mapping in ascending order.
*/
function sortColor(inputData, inputConfig, rng) {
    // Sorts the input by colorAttribute  in __ASCENDING__ order
    function sortFunktionColor(a, b) {
        let sortHelp = inputConfig.color.attributeMap(a[inputConfig.color.attribute]) - inputConfig.color.attributeMap(b[inputConfig.color.attribute]);
        // If both are equal randomize the switch
        if (rng() < 0.5) {
            return sortHelp === 0 ? -1 : sortHelp;
        }
        return sortHelp === 0 ? 1 : sortHelp;
    }
    ;
    inputData.sort(sortFunktionColor);
    return inputData;
}
/**
Seeded RNG
Mulberry32
*/
function mulberry32(a) {
    return function () {
        var t = a += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
}
/** adds an amount of padding to the given Domain */
function addPaddingToDomain(xDomain) {
    // padding that will be added to the Domain sides (as percentage of the domain width)
    const PADD_PERC = 0.005;
    let domainWidth = xDomain[1] - xDomain[0];
    let sideAbsol = domainWidth * PADD_PERC;
    // add bandwidth and percentage to Domain
    xDomain[0] -= sideAbsol;
    xDomain[1] += sideAbsol;
    return xDomain;
}
/**
Extra function for testing that takes a java object (ready to be used by the graph)
a decimal value (0,1] and a boolean that indicates randomness.
it gives out a split of the data at the given percentage
*/
function splitData(inputData, splitPerc, random = false) {
    if (Object.prototype.toString.call(inputData) != '[object Array]') {
        throw new Error("inputData must be an Array");
    }
    if (random) {
        return inputData.slice(0, (inputData.length * splitPerc));
    }
    return inputData.slice(0, (inputData.length * splitPerc));
}
// helper to easily create the object to be send as a message via Webworker
function makeWorkerInput(funcName, funcInput) {
    return { funcName: funcName, funcInput: funcInput };
}
/**
Function to streamline the search of a variable x, that gives a certain result of a function
Using boundaries, making the search area smaller each step

leftEvaluation can be a number or function
rightEvaluation has to be a function

can be seen as:
return x so that:
    leftEvaluation(x) ~= rightEvaluation(x)

set bigLeft_upX to true, if: Bigger left side -> have to increase x to equalize

*/
function boundarySearch(leftEvaluation, rightEvaluationFunc, bigLeft_upX, boundaries = {}, startValue) {
    // iteration max
    const MAX_ITERATION = 100;
    // accepted difference
    const EPSILON = 0.001;
    // if no startvalue is given, just set start to one. Not advised! Better calculate a good start
    let testValue = (isNaN(startValue)) ? 1 : startValue;
    let prevValue = -1;
    // left and right side of the equation we want to make true
    let leftSide;
    let rightSide;
    let leftSideBigger;
    let equationDifference;
    let absEquationDifference;
    let bestResult = {
        testValue: -1,
        absEquationDifference: -1
    };
    // if no boundaries for the value are given, use generic start
    boundaries = Object.assign({
        lowerBoundary: 0,
        hasUpperBoundary: false,
        upperBoundary: -1
    }, boundaries);
    // if leftEvaluation is a number, disguise it as a function
    let leftEvaluationFunc = (Object.prototype.toString.call(leftEvaluation) === '[object Number]') ? () => { return leftEvaluation; } : leftEvaluation;
    /* start of search */
    for (let index = 0; index < MAX_ITERATION; index++) {
        // if the value does not change (rounding probably) we stop
        if (prevValue === testValue) {
            break;
        }
        prevValue = testValue;
        // evaluate left side of equation
        leftSide = leftEvaluationFunc(testValue);
        // evaluate right side of equation
        rightSide = rightEvaluationFunc(testValue);
        // calc difference
        equationDifference = leftSide - rightSide;
        absEquationDifference = Math.abs(equationDifference);
        leftSideBigger = (equationDifference > 0);
        // save the best result
        if (absEquationDifference < bestResult.absEquationDifference || bestResult.absEquationDifference < 0) {
            bestResult.absEquationDifference = absEquationDifference;
            bestResult.testValue = testValue;
        }
        // difference small enough
        if (absEquationDifference <= EPSILON) {
            // console.log(testValue);
            break;
            // we increase the value depending on the bigger side, and the effect of a value change
        }
        else if (leftSideBigger == bigLeft_upX) {
            // we increase the value
            // update lower boundary
            boundaries.lowerBoundary = testValue;
            if (boundaries.hasUpperBoundary) {
                // arithm. middle between old and new boundary
                testValue = (boundaries.upperBoundary + boundaries.lowerBoundary) / 2;
            }
            else {
                // double if value still didn't reach target value
                testValue *= 2;
            }
        }
        else {
            // we decrease the value
            boundaries.hasUpperBoundary = true;
            boundaries.upperBoundary = testValue;
            // arithm. middle between old and new height (we always have a lower boundary at 0)
            testValue = (boundaries.lowerBoundary + boundaries.upperBoundary) / 2;
        }
    }
    return bestResult.testValue;
}
/**
    new search boundary for a boundary search
*/
function getNewSearchBoundary() {
    return {
        lowerBoundary: 0,
        hasUpperBoundary: false,
        upperBoundary: -1
    };
}
/**
    getting the color of a circlke depending on the colormode
*/
function getCircleColor(inputConfig, circle) {
    switch (inputConfig.color.colorMode) {
        case "normal":
            return circle.origColor;
        case "error":
            return colorDisError(inputConfig, circle);
        default:
            console.warn("The dot-colormode \"" + inputConfig.color.colorMode + "\" was not found!");
            return "#000000";
    }
}
/**
    returns a nice string to show time
*/
function msToTime(duration) {
    let milliseconds = Math.floor(duration % 1000), seconds = Math.floor((duration / 1000) % 60), minutes = Math.floor((duration / (1000 * 60)) % 60), hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    return hours + "h " + minutes + "m " + seconds + "s " + milliseconds + "ms ";
}
// insertion Sort on the current position
function insertionSort(circleData, size) {
    // backwards index for insertion
    let j;
    let tempCircle;
    for (let i = 1; i < size; i++) {
        j = i;
        while (j > 0 && circleData[j].xPix < circleData[j - 1].xPix) {
            // swap both circles in circleData
            tempCircle = circleData[j];
            circleData[j] = circleData[j - 1];
            circleData[j - 1] = tempCircle;
            j--;
        }
    }
    return circleData;
}
/**insertion Sort, but for the original, rather than current position*/
function insertionSortOriginal(circleData, size) {
    // backwards index for insertion
    let j;
    let tempCircle;
    for (let i = 1; i < size; i++) {
        j = i;
        // Maybe tempVar swap better
        while (j > 0 && circleData[j].origXdom < circleData[j - 1].origXdom) {
            // swap both circles in circleData
            tempCircle = circleData[j];
            circleData[j] = circleData[j - 1];
            circleData[j - 1] = tempCircle;
            j--;
        }
    }
    return circleData;
}
/** takes the inputconfig, Plotdim, and an xPix value and returns the densityDom */
function xPixToDensPix(inputConfig, plotParam, xPix) {
    return plotParam.yAxisScale(0) - plotParam.yAxisScale(inputConfig.dots.dotscaling.scaleDensityDom(plotParam.kde(xPix), inputConfig.dots.dSingle));
}
/** Since Inputdata is already sorted by x we just do a simple insertion */
function mergeInputData(inputConfig, inputData, newInputData) {
    let newData;
    let dataAdded;
    for (let newIndex = 0; newIndex < newInputData.length; newIndex++) {
        newData = newInputData[newIndex];
        dataAdded = false;
        for (let index = 0; index < inputData.length; index++) {
            // compare new data with current data
            if (newData[inputConfig.xAttribute] < inputData[index][inputConfig.xAttribute]) {
                // adds the new data to inputData
                inputData.splice(index, 0, newData);
                dataAdded = true;
                break;
            }
            ;
        }
        if (!dataAdded) {
            // add data at the end if bigger than all
            inputData.push(newData);
        }
    }
    return inputData;
}
function saveSvg(svgEl, name) {
    svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    var svgData = svgEl.outerHTML;
    var preface = '<?xml version="1.0" standalone="no"?>\r\n';
    var svgBlob = new Blob([preface, svgData], { type: "image/svg+xml;charset=utf-8" });
    var svgUrl = URL.createObjectURL(svgBlob);
    var downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = name;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}
/**
Calculates and draws the density of given data on points in xTicks, regarding to attribues in inputConfig. Also adds a new x value to bve considered in the calc, if it's not null
*/
function calculateDrawDensity(inputConfig, inputData, circleData, xDomSample, densityPlot, plotParam) {
    let kdeInput = getKDEinputFromCircleData(circleData);
    // Array with x-values and corresponding density
    let discreteDens;
    plotParam.kde = getKDE(inputConfig, kdeInput, xDomSample);
    plotParam.boundaryList = getBoundaryList(inputConfig, inputData, plotParam.kde);
    if (inputConfig.density.useBoundary) {
        // pick original KDE or bounded KDE
        plotParam.kde = getBoundedKDE(inputConfig, kdeInput, xDomSample, plotParam.boundaryList);
    }
    // recompute density estimation
    discreteDens = getDiscreteDensity(inputConfig, plotParam.kde, xDomSample);
    drawDensity(discreteDens, densityPlot, plotParam);
    return discreteDens;
}
/**
    input for KDE calculation from circleData
*/
function getKDEinputFromCircleData(circleData) {
    return circleData.map((circle) => {
        return { xDom: circle.origXdom, radiusPix: -1 };
    });
}
/**
    input for KDE calculation from inputData
*/
function getKDEinputFromInputData(inputConfig, inputData) {
    return inputData.map((dataObject) => {
        return { xDom: dataObject[inputConfig.xAttribute], radiusPix: -1 };
    });
}
/**
Computes density values at certain points, given by xTicks
*/
function getDiscreteDensity(inputConfig, kde, xDomSample) {
    return xDomSample.map((xDom) => {
        let densityDom = kde(xDom);
        // changes the density value depending on the non linear calculation
        densityDom = inputConfig.dots.dotscaling.scaleDensityDom(densityDom, inputConfig.dots.dSingle);
        // cut the density at the height so that the polygon will still work
        //if (densityDom > maxHeight) maxHeight = densityDom;
        // scaling of density
        return { xDom: xDom, densityDom: densityDom };
        //return [x, densityHeight];
    });
}
/**
    returns KDE calculator that can calc the dens for any point on the x-axis
 */
function getKDE(inputConfig, kdeInput, xDomSample = []) {
    return (xDom) => {
        let densityDom;
        densityDom = d3.sum(kdeInput.map(currentPoint => inputConfig.density.kernel.kernelFunction(xDom - currentPoint.xDom, inputConfig.density.bandwidth)));
        return densityDom;
    };
}
/** get KDE that watches for the boundary*/
function getBoundedKDE(inputConfig, kdeInput, xDomSample = [], boundaryList) {
    // dot ranges divided by a boundary are handled individually, so we split data into these parts
    let boundBox = [];
    let bondaryIndex = 1;
    let kdeCollection = [];
    kdeInput = sortKDEinput(kdeInput);
    for (const dot of kdeInput) {
        // split kde Input into bins split by bounary.
        // only look at right side of boundary
        if (dot.xDom > boundaryList[bondaryIndex].xDom) {
            // make next box
            kdeCollection.push(getKDE(inputConfig, boundBox, xDomSample));
            boundBox = [];
            bondaryIndex += 2;
        }
        boundBox.push(dot);
    }
    // make KDE with rest
    kdeCollection.push(getKDE(inputConfig, boundBox, xDomSample));
    return (xDom) => {
        let value;
        let leftBoundary;
        let rightBoundary;
        // finding the boundaries surrounding point
        let index;
        for (index = 0; index < boundaryList.length; index++) {
            if (boundaryList[index].xDom > xDom)
                break;
        }
        // xDom is more left or more right than data
        if (index === 0 || index >= boundaryList.length)
            return 0;
        leftBoundary = boundaryList[index - 1];
        rightBoundary = boundaryList[index];
        // xDom is within a gap of data
        if (leftBoundary.isRight)
            return 0;
        let leftDist = xDom - leftBoundary.xDom;
        let rightDist = rightBoundary.xDom - xDom;
        // get kde of that boundary Box
        let kdeIndex = Math.floor(index / 2);
        let kde = kdeCollection[kdeIndex];
        value = kde(xDom);
        // add the value otside of the boundary to the oringnal KDE
        if (leftDist < inputConfig.density.bandwidth)
            value += kde(leftBoundary.xDom - leftDist);
        if (rightDist < inputConfig.density.bandwidth)
            value += kde(rightBoundary.xDom + rightDist);
        //console.log(xDom + ": " + kde(xDom) + " " + value);
        return value;
    };
}
/**
callculates a complete new density and redraws the plot
and returns the used density
*/
function drawDensity(discreteDens, densityPlot, plotParam) {
    let line = d3.line()
        .curve(d3.curveLinear)
        .x((density) => { return plotParam.xAxisScale(density.xDom); })
        .y((density) => { return plotParam.yAxisScale(density.densityDom); });
    densityPlot
        // .datum(discreteDens.filter((x)=>{return (x.densityDom > 0)}))
        // .data(discreteDens)
        // .transition()
        // .duration(250)
        // .style("opacity", "0")
        // .style("stroke", "rgb(252, 14, 89)") // make red
        .attr("d", line(discreteDens));
}
/**
    creates a special version of ticks on the xAxis with the first and the last point def inside
*/
function getXdomSample(sampleRate, plotParamKDE) {
    //console.log(xDomain);
    let xTicks = [plotParamKDE.xDomain[0]];
    xTicks = xTicks.concat(plotParamKDE.xAxisScale.ticks(sampleRate));
    xTicks.push(plotParamKDE.xDomain[1]);
    return xTicks;
}
/**
returns a function to get the padded radius of a circle.
*/
function getPadRadFunct(inputConfig) {
    return (radius) => radius * (1 - inputConfig.dots.circlePadding);
}
/**returns the list of boundarys for density plotting*/
function getBoundaryList(inputConfig, inputData, kde) {
    let boundaries = [];
    let currentPoint;
    let nextPoint;
    let distance;
    let radiusDom;
    let currentRadiusDom;
    let nextRadiusDom;
    // first dot gives a left boundary
    radiusDom = inputConfig.dots.dotscaling.scaleDensDiamDom(kde(inputData[0][inputConfig.xAttribute]), inputConfig.dots.dSingle) / 2;
    boundaries.push({
        xDom: inputData[0][inputConfig.xAttribute] - radiusDom,
        isRight: false
    });
    for (let index = 0; index < inputData.length - 1; index++) {
        currentPoint = inputData[index][inputConfig.xAttribute];
        nextPoint = inputData[index + 1][inputConfig.xAttribute];
        distance = nextPoint - currentPoint;
        // Distance is big enough for boundaries
        if (distance > inputConfig.dots.dSingle) {
            currentRadiusDom = inputConfig.dots.dotscaling.scaleDensDiamDom(kde(currentPoint), inputConfig.dots.dSingle) / 2;
            nextRadiusDom = inputConfig.dots.dotscaling.scaleDensDiamDom(kde(nextPoint), inputConfig.dots.dSingle) / 2;
            // no boundary if circles collide with each other
            if ((currentRadiusDom + nextRadiusDom) > distance)
                continue;
            boundaries.push({
                xDom: currentPoint + currentRadiusDom,
                isRight: true
            });
            boundaries.push({
                xDom: nextPoint - nextRadiusDom,
                isRight: false
            });
        }
    }
    // last dot gives right boundary
    radiusDom = inputConfig.dots.dotscaling.scaleDensDiamDom(kde(inputData[inputData.length - 1][inputConfig.xAttribute]), inputConfig.dots.dSingle) / 2;
    boundaries.push({
        xDom: inputData[inputData.length - 1][inputConfig.xAttribute] + radiusDom,
        isRight: true
    });
    // inputData.reverse;
    // console.log(boundaries);
    return boundaries;
}
