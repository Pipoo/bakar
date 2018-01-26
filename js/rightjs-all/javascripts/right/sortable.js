/**
 * RightJS-UI Sortable v2.2.1
 * http://rightjs.org/ui/sortable
 *
 * Copyright (C) 2009-2012 Nikolay Nemshilov
 */
var Sortable = RightJS.Sortable = function (a, b) {
    function m(a) {
        j.current && j.current.finishDrag(a)
    }

    function l(a) {
        j.current && (a.preventDefault(), j.current.moveItem(a))
    }

    function k(a) {
        var b = a.find(j.Options.cssRule + ",*.rui-sortable");
        b && j.cast(b).startDrag(a)
    }

    function c(a, c) {
        c || (c = a, a = "DIV");
        var d = new b.Class(b.Element.Wrappers[a] || b.Element, {
            initialize: function (c, d) {
                this.key = c;
                var e = [{"class": "rui-" + c}];
                this instanceof b.Input || this instanceof b.Form || e.unshift(a), this.$super.apply(this, e), b.isString(d) && (d = b.$(d)), d instanceof b.Element && (this._ = d._, "$listeners"in d && (d.$listeners = d.$listeners), d = {}), this.setOptions(d, this);
                return b.Wrapper.Cache[b.$uid(this._)] = this
            }, setOptions: function (a, c) {
                c && (a = b.Object.merge(a, (new Function("return " + (c.get("data-" + this.key) || "{}")))())), a && b.Options.setOptions.call(this, b.Object.merge(this.options, a));
                return this
            }
        }), e = new b.Class(d, c);
        b.Observer.createShortcuts(e.prototype, e.EVENTS || b([]));
        return e
    }

    var d = b, e = b.$, f = b.$w, g = b.isString, h = b.isArray, i = b.Object, j = new c("UL", {
        extend: {
            version: "2.2.1",
            EVENTS: f("start change finish"),
            Options: {
                url: null,
                method: "put",
                Xhr: {},
                idParam: "id",
                posParam: "position",
                parseId: !0,
                dragClass: "dragging",
                accept: null,
                minLength: 1,
                itemCss: "li",
                handleCss: "li",
                cssRule: "*[data-sortable]"
            },
            current: !1,
            cast: function (a) {
                a = e(a._), a instanceof j || (a = new j(a));
                return a
            }
        }, initialize: function (a, b) {
            this.$super("sortable", a).setOptions(b).addClass("rui-sortable").on("finish", this._tryXhr).on("selectstart", "stopEvent")
        }, setOptions: function (a, b) {
            this.$super(a, b), a = this.options;
            var c = a.accept || [];
            h(c) || (c = [c]), a.accept = d([this].concat(c)).map(e).uniq();
            return this
        }, items: function () {
            return this.children(this.options.itemCss)
        }, startDrag: function (a) {
            if (this.items().length > this.options.minLength) {
                var b = a.find(this.options.itemCss), c = a.find(this.options.handleCss);
                b && c && (this._initDrag(b, a.position()), j.current = this, this.fire("start", this._evOpts(a)))
            }
        }, moveItem: function (a) {
            var b = a.position(), c = this.itemClone._.style, d = b.y - this.yRDiff, e = b.x - this.xRDiff, f = e + this.cloneWidth, g = d + this.cloneHeight;
            c.top = b.y - this.yDiff + "px", c.left = b.x - this.xDiff + "px";
            var h = this.suspects.first(function (a) {
                return (d > a.top && d < a.topHalf || g < a.bottom && g > a.topHalf) && (e > a.left && e < a.leftHalf || f < a.right && f > a.leftHalf)
            });
            h && (c = h.item, c.insert(this.item, c.prevSiblings().include(this.item) ? "after" : "before"), this._findSuspects(), this.fire("change", this._evOpts(a, c)))
        }, finishDrag: function (a) {
            this.itemClone && (this.itemClone.remove(), this.item.setStyle("visibility:visible")), j.current = !1, this.fire("finish", this._evOpts(a))
        }, _evOpts: function (a, b) {
            b = b || this.item;
            var c = j.cast(b.parent());
            return {list: c, item: b, event: a, index: c.items().indexOf(b)}
        }, _initDrag: function (a, b) {
            var c = this.dimensions(), d = a.dimensions(), e = a.clone().setStyle({
                margin: 0,
                zIndex: 9999,
                position: "absolute",
                top: "0px",
                left: "0px"
            }).addClass(this.options.dragClass).insertTo(this).setHeight(this.cloneHeight = d.height).setWidth(this.cloneWidth = d.width), f = e.position(), g = d.left - f.x, h = d.top - f.y;
            e.moveTo(g, h), this.item = a.setStyle("visibility:hidden"), this.itemClone = e, this.xDiff = b.x - g, this.yDiff = b.y - h, this.xRDiff = b.x - e.position().x, this.yRDiff = b.y - e.position().y, this._findSuspects()
        }, _findSuspects: function () {
            var a = this.suspects = d([]), b = this.item, c = this.itemClone;
            this.options.accept.each(function (d) {
                j.cast(d).items().each(function (d) {
                    if (d !== b && d !== c) {
                        var e = d.dimensions();
                        a.push({
                            item: d,
                            top: e.top,
                            left: e.left,
                            right: e.left + e.width,
                            bottom: e.top + e.height,
                            topHalf: e.top + e.height / 2,
                            leftHalf: e.left + e.width / 2
                        })
                    }
                })
            })
        }, _tryXhr: function (a) {
            if (this.options.url) {
                var c = d(this.options.url), e = {}, f = a.item, h = a.index + 1, j = i.merge({
                    method: this.options.method,
                    params: {}
                }, this.options.Xhr), k = f.get("id") || "";
                this.options.parseId && k && (k = (k.match(/\d+/) || [""])[0]), c.include("%{id}") ? c = c.replace("%{id}", k) : e[this.options.idParam] = k, e[this.options.posParam] = h, g(j.params) ? j.params += "&" + i.toQueryString(e) : j.params = i.merge(j.params, e), b.Xhr.load(c, j)
            }
        }
    });
    e(a).on({
        mousedown: k,
        touchstart: k,
        mousemove: l,
        touchmove: l,
        mouseup: m,
        touchend: m
    }), e(window).onBlur(function () {
        j.current && j.current.finishDrag()
    });
    var n = a.createElement("style"), o = a.createTextNode(".rui-sortable{user-select:none;-moz-user-select:none;-webkit-user-select:none}");
    n.type = "text/css", a.getElementsByTagName("head")[0].appendChild(n), n.styleSheet ? n.styleSheet.cssText = o.nodeValue : n.appendChild(o);
    return j
}(document, RightJS)