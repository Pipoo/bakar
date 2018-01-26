/**
 * jQuery-like interfaces v2.2.1
 * http://rightjs.org/plugins/jquerysh
 *
 * Copyright (C) 2009-2011 Nikolay Nemshilov
 */
(function (a) {
    function n(a, b, c, d) {
        typeof b === "function" && (d = c, c = b, b = undefined);
        return {url: a, data: b, success: c, dataType: d}
    }

    function m(a, b) {
        return l.ajax(h(n.apply(this, b), a))
    }

    var b = window.jQuery, c = window.$, d = a.$, e = a.$$, f = a.$E, g = a.$A, h = a.$ext, i = a.Xhr, j = a.Browser, k = a.Object;
    a.jQuerysh = {
        version: "2.2.1", collectionMethods: {
            live: function (a, b) {
                this.cssRule.on(a, b);
                return this
            }, die: function (a, b) {
                this.cssRule.stopObserving(a, b);
                return this
            }
        }
    };
    var l = function (b) {
        switch (typeof b) {
            case"string":
                var c = b[0], g = b.substr(1);
                if (c === "#" && /^[\w\-]+$/.test(g))return d(g);
                if (c === "<")return f("div", {html: b}).first();
                c = e(b), c.cssRule = a(b);
                return h(c, a.jQuerysh.collectionMethods);
            case"function":
                return d(document).onReady(b);
            default:
                return d(b)
        }
    };
    h(l, {
        browser: {webkit: j.WebKit, opera: j.Opera, msie: j.IE, mozilla: j.Gecko}, isFunction: function (b) {
            return a.isFunction(b)
        }, isArray: function (b) {
            return a.isArray(b)
        }, isPlainObject: function (b) {
            return a.isHash(b)
        }, isEmptyObject: function (a) {
            return k.empty(a)
        }, globalEval: function (b) {
            return a.$eval(b)
        }, makeArray: function (a) {
            return g(a)
        }, each: function (a, b) {
            return g(a, function (a, c) {
                b(c, a)
            })
        }, map: function (a) {
            return g(value).map(a)
        }, unique: function (a) {
            return g(a).uniq()
        }, merge: function (a, b) {
            return g(a).merge(b)
        }, extend: function () {
            return k.merge.apply(k, arguments)
        }, proxy: function (b, c) {
            return a(b).bind(c)
        }, noop: function () {
            return a(function () {
            })
        }, noConflict: function (a) {
            window.$ === jQuery && (window.$ = c), a && window.jQuery === jQuery && (window.jQuery = b);
            return l
        }
    }), a.Element.include({
        appendTo: function (a) {
            return this.insertTo(a)
        }, prepend: function (a) {
            return this.insert(a, "top")
        }, before: function (a) {
            return this.insert(a, "before")
        }, after: function (a) {
            return this.insert(a, "after")
        }, insertBefore: function (a) {
            return this.insertTo(a, "before")
        }, attr: function (a, b) {
            return b === undefined ? this.get(a) : this.set(a, b)
        }, css: function (a, b) {
            return typeof a === "string" && b === undefined ? this.getStyle(a) : this.setStyle(a, b)
        }, offset: function () {
            var a = this.position();
            return {left: a.x, top: a.y}
        }, width: function () {
            return this.size().x
        }, height: function () {
            return this.size().y
        }, scrollLeft: function () {
            return this.scrolls().x
        }, scrollTop: function () {
            return this.scrolls().y
        }, bind: function () {
            return this.on.apply(this, arguments)
        }, unbind: function () {
            return this.stopObserving.apply(this, arguments)
        }, trigger: function (a, b) {
            return this.fire(a, b)
        }, animate: function (a, b, c) {
            return this.morph(a, {duration: b, onFinish: c})
        }, fadeIn: function () {
            return this.fade("in")
        }, fadeOut: function () {
            return this.fade("out")
        }, slideDown: function () {
            return this.slide("in")
        }, slideUp: function () {
            return this.slide("out")
        }
    }), h(l, {
        param: function (a) {
            return k.toQueryString(a)
        }, ajax: function (a, b) {
            function d(a, c) {
                a(b.dataType === "json" ? c.json : c.text, c.successful() ? "success" : "error", c)
            }

            b = b || {}, typeof a === "string" ? b.url = a : b = a;
            var c = {};
            b.success && (c.onSuccess = function () {
                d(b.success, this)
            }), b.error && (c.onFailure = function () {
                d(b.error, this)
            }), b.complete && (c.onComplete = function () {
                d(b.complete, this)
            }), c.method = b.type, b.headers && (c.headers = b.headers), b.jsonp && (c.jsonp = b.jsonp), b.url.indexOf("callback=?") > 0 && (c.jsonp = !0, b.url = b.url.replace(/(\?|\&)callback=\?/, ""));
            return (new i(b.url, c)).send(b.data)
        }, get: function () {
            return m({type: "get"}, arguments)
        }, post: function (a, b, c, d) {
            return m({type: "post"}, arguments)
        }, getJSON: function (a, b, c) {
            return m({dataType: "json"}, arguments)
        }, getScript: function (a, b) {
            return m({dataType: "script"}, arguments)
        }
    }), i.include({
        success: function (a) {
            return this.on("success", a)
        }, error: function (a) {
            return this.on("failure", a)
        }, complete: function (a) {
            return this.on("complete", a)
        }
    }), window.$ = window.jQuery = l
})(RightJS)