/**
 * RightJS-UI Tags v2.2.1
 * http://rightjs.org/ui/tags
 *
 * Copyright (C) 2011 Nikolay Nemshilov
 */
var Tags = RightJS.Tags = function (a) {
    function b(b, c) {
        c || (c = b, b = "DIV");
        var d = new a.Class(a.Element.Wrappers[b] || a.Element, {
            initialize: function (c, d) {
                this.key = c;
                var e = [{"class": "rui-" + c}];
                this instanceof a.Input || this instanceof a.Form || e.unshift(b), this.$super.apply(this, e), a.isString(d) && (d = a.$(d)), d instanceof a.Element && (this._ = d._, "$listeners"in d && (d.$listeners = d.$listeners), d = {}), this.setOptions(d, this);
                return a.Wrapper.Cache[a.$uid(this._)] = this
            }, setOptions: function (b, c) {
                c && (b = a.Object.merge(b, (new Function("return " + (c.get("data-" + this.key) || "{}")))())), b && a.Options.setOptions.call(this, a.Object.merge(this.options, b));
                return this
            }
        }), e = new a.Class(d, c);
        a.Observer.createShortcuts(e.prototype, e.EVENTS || a([]));
        return e
    }

    var c = a, d = a.$, e = a.$w, f = a.Class, g = a.Input, h = a.Element, i = new b("INPUT", {
        extend: {
            version: "2.2.1",
            EVENTS: e("add remove"),
            Options: {
                tags: [],
                vertical: !1,
                allowNew: !0,
                nocase: !0,
                autocomplete: !0,
                separator: ",",
                cssRule: "input[data-tags]"
            },
            rescan: function (a) {
                d(a || document).find(i.Options.cssRule).each(function (a) {
                    a instanceof i || (a = new i(a))
                })
            }
        }, initialize: function (b, e) {
            var f = c(c("" + d(b).get("data-tags")).trim());
            f.startsWith("[") && f.endsWith("]") && (e || (e = {}), e.tags = (new Function("return " + f))()), this.$super("tags", b).setOptions(e), a.Browser.OLD && this.setStyle({color: this.getStyle("backgroundColor")}), this.container = (new h("div", {"class": "rui-tags"})).insertTo(this, "after"), this.list = new i.List(this), this.input = new i.Input(this), this.completer = new i.Completer(this), this.onFocus(function () {
                this.input.focus()
            }), this.setValue(this._.value)
        }, setValue: function (a) {
            isString(a) && (a = c(a.split(this.options.separator)).map("trim").reject("blank")), this.options.tags = c(this.options.tags).merge(a), this.list.setTags(a);
            return this.$super(a.join(this.options.separator + " "))
        }
    });
    i.List = new f(h, {
        initialize: function (a) {
            function b(b) {
                return a.getStyle(b).replace(/[\d\.]+/, function (a) {
                    return parseFloat(a) * 2
                })
            }

            this.main = a, this.$super("ul", {"class": "list"}), this.insertTo(a.container), this.main.options.vertical && this.addClass("vertical"), this.setStyle({
                fontSize: a.getStyle("fontSize"),
                fontFamily: a.getStyle("fontFamily"),
                fontWeight: a.getStyle("fontWeight"),
                letterSpacing: a.getStyle("letterSpacing"),
                paddingTop: b("borderTopWidth"),
                paddingLeft: b("borderLeftWidth"),
                paddingRight: b("borderRightWidth"),
                paddingBottom: a.getStyle("borderBottomWidth")
            }), a.getStyle("fontSize") === "0em" && this.setStyle({fontSize: "1em"}), this.setWidth(a.size().x), this.reposition(!0), this.onClick(this._click)
        }, setTags: function (a) {
            a.uniq().each(this.clean().addTag, this);
            return this
        }, getTags: function () {
            return this.find("div.text").map("text")
        }, addTag: function (a) {
            this._allowed(a) && (this.append('<li><div class="text">' + c(a).trim() + '</div><div class="close">&times;</div></li>').reposition(), this.main.fire("add", {tag: a})), this.main._.value = this.getTags().join(this.main.options.separator + " ");
            return this
        }, removeLast: function () {
            var a = this.find("li").last();
            a && this._remove(a);
            return this
        }, reposition: function (a) {
            var b = this.size().y, c = this.main.size().y, d;
            if (b !== c || a === !0)this.main.setHeight(b), d = this._.style, d.top = "0px", d.left = "0px", b = this.position(), c = this.main.position(), d.top = c.y - b.y + "px", d.left = c.x - b.x + "px";
            return this
        }, _click: function (a) {
            a.target.hasClass("close") ? this._remove(a.target.parent()) : this.main.input.focus()
        }, _allowed: function (a) {
            var b = this.getTags(), c = this.main.options, d = !c.nocase;
            return !(d ? b.include(a) : b.map("toLowerCase").include(a.toLowerCase())) && (c.allowNew || (d ? b.include(a) : c.tags.map("toLowerCase").include(a.toLowerCase())))
        }, _remove: function (a) {
            var b = a.first("div.text").text();
            this.main.setValue(this.getTags().without(b)), this.main.fire("remove", {tag: b})
        }
    }), i.Input = new f(g, {
        initialize: function (a) {
            this.main = a, this.list = a.list, this.$super({
                type: "text",
                size: 1
            }), this.onKeydown(this._keydown), this.onKeyup(this._keyup), this.onBlur(this._blur), this.insertTo(a.list), this.meter = (new h("div", {
                "class": "meter",
                style: {whiteSpace: "nowrap", position: "absolute", left: "-99999em"}
            })).insertTo(this, "after")
        }, focus: function () {
            this.main.list.append(this, this.meter).reposition();
            return this.$super()
        }, reset: function () {
            this.remove(), this.meter.remove(), this.list.reposition(), this._.value = "";
            return this
        }, _keydown: function (a) {
            a.keyCode === 8 && this._.value === "" ? (this.list.removeLast(), this.focus()) : a.keyCode === 13 && a.preventDefault()
        }, _keyup: function (a) {
            c([9, 27, 37, 38, 39, 40, 13]).include(a.keyCode) || (this._.value.indexOf(this.main.options.separator) !== -1 ? (this._add(), this.focus()) : (this._resize(), this.main.completer.suggest(this._.value)))
        }, _blur: function (a) {
            this.main.completer.hidden() && this._.value !== "" && (this._add(), this.reset())
        }, _resize: function () {
            this.meter.html(this._.value + "xx"), this._.style.width = this.meter.size().x + "px", this.list.reposition()
        }, _add: function () {
            var a = this._.value.replace(this.main.options.separator, "");
            this._.value = "", /^\s*$/.test(a) || this.list.addTag(a), this.main.completer.visible() && this.main.completer.hide()
        }
    }), i.Completer = new f(h, {
        extend: {current: null}, initialize: function (a) {
            this.main = a, this.list = a.list, this.input = a.input, this.$super("ul", {"class": "completer"}), this.addClass("rui-dd-menu"), this.insertTo(a.container), this.onClick(this._click)
        }, suggest: function (a) {
            if (!/^\s*$/.test(a) && this.main.options.autocomplete) {
                var b = this._filter(this.main.options.tags, a);
                if (b.length !== 0) {
                    this.html(b.map(function (b) {
                        return "<li>" + b.replace(a, "<b>" + a + "</b>") + "</li>"
                    }).join("")), this.picked = !1;
                    return this.show()
                }
            }
            return this.hide()
        }, show: function () {
            var a = this.input.dimensions(), b = this._.style, c;
            b.display = "block", b.top = "0px", b.left = "0px", c = this.position(), b.left = a.left - c.x + "px", b.top = a.top - c.y + a.height + "px";
            return i.Completer.current = this
        }, hide: function () {
            this._.innerHTML = "", this._.style.display = "none", i.Completer.current = null;
            return this
        }, next: function () {
            var a = this.first(".current");
            a && (a = a.next()), a || (a = this.first()), a && a.radioClass("current");
            return this
        }, prev: function () {
            var a = this.first(".current");
            a && (a = a.prev()), a || (a = this.children().last()), a && a.radioClass("current");
            return this
        }, done: function () {
            var a = this.first(".current");
            a && (this.list.addTag(a.text()), this.input.reset().focus());
            return this.hide()
        }, _click: function (a) {
            var b = a.find("li");
            b && b.radioClass("current"), this.done()
        }, _filter: function (a, b) {
            var c = this.list.getTags(), d = this.main.options.nocase;
            d && (c = c.map("toLowerCase"), b = b.toLowerCase());
            return a.filter(function (a) {
                var e = d ? a.toLowerCase() : a;
                return e.indexOf(b) !== -1 && !c.include(e)
            })
        }
    }), d(document).on({
        ready: function () {
            i.rescan()
        }, keydown: function (a) {
            var b = i.Completer.current, c = {13: "done", 27: "hide", 38: "prev", 40: "next"};
            b !== null && a.keyCode in c && (a.stop(), b[c[a.keyCode]]())
        }, click: function (a) {
            i.Completer.current && i.Completer.current.hide()
        }
    });
    var j = document.createElement("style"), k = document.createTextNode("*.rui-dd-menu, *.rui-dd-menu li{margin:0;padding:0;border:none;background:none;list-style:none;font-weight:normal;float:none} *.rui-dd-menu{display:none;position:absolute;z-index:9999;background:white;border:1px solid #BBB;border-radius:.2em;-moz-border-radius:.2em;-webkit-border-radius:.2em;box-shadow:#DDD .2em .2em .4em;-moz-box-shadow:#DDD .2em .2em .4em;-webkit-box-shadow:#DDD .2em .2em .4em} *.rui-dd-menu li{padding:.2em .4em;border-top:none;border-bottom:none;cursor:pointer} *.rui-dd-menu li.current{background:#DDD} *.rui-dd-menu li:hover{background:#EEE}dl.rui-dd-menu dt{padding:.3em .5em;cursor:default;font-weight:bold;font-style:italic;color:#444;background:#EEE}dl.rui-dd-menu dd li{padding-left:1.5em}div.rui-tags,div.rui-tags ul.list,div.rui-tags ul.list *{position:static;top:auto;left:auto;right:auto;bottom:auto;float:none;margin:0;padding:0;border:none;background:none;display:block}input[data-tags],input.rui-tags{color:transparent;color:rgba(0,0,0,0)}div.rui-tags{position:absolute;display:inline}div.rui-tags ul.list{position:absolute;overflow:hidden;min-height:1.3em}div.rui-tags ul.list li{display:inline-block; *display:inline; *zoom:1;position:relative;cursor:default;margin-right:.1em;margin-bottom:.1em;padding:0 .5em;padding-right:1.1em;background:#ddd;border-radius:.2em;-moz-border-radius:.2em;-webkit-border-radius:.2em;vertical-align:top}div.rui-tags ul.list li div.text{position:inline}div.rui-tags ul.list li div.close{margin-left:.25em;cursor:pointer;font-family:Arial;font-weight:normal;opacity:0.5;position:absolute;right:.25em;top:0.04em}div.rui-tags ul.list li div.close:hover{opacity:1}div.rui-tags ul.vertical li{display:block}div.rui-tags ul.list input{width:auto;height:auto;display:inline-block; *display:inline; *zoom:1;width:1em;outline:none;vertical-align:top;font-family:inherit;font-size:inherit;font-weight:inherit;letter-spacing:inherit}");
    j.type = "text/css", document.getElementsByTagName("head")[0].appendChild(j), j.styleSheet ? j.styleSheet.cssText = k.nodeValue : j.appendChild(k);
    return i
}(RightJS)