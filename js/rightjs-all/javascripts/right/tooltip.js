/**
 * The tooltips feature for RightJS
 * See http://rightjs.org/ui/tooltips
 *
 * Copyright (C) 2009-2010 Nikolay Nemshilov
 */
var Tooltip = RightJS.Tooltip = function (h, b) {
    var i = b.$, l = b.$w, m = b.$uid, j = b.Element, d = new (function (a, c) {
        if (!c) {
            c = a;
            a = "DIV"
        }
        var f = new b.Wrapper(b.Element.Wrappers[a] || b.Element, {
            initialize: function (g, e) {
                this.key = g;
                var k = [{"class": "rui-" + g}];
                this instanceof b.Input || this instanceof b.Form || k.unshift(a);
                this.$super.apply(this, k);
                if (b.isString(e))e = b.$(e);
                if (e instanceof b.Element) {
                    this._ = e._;
                    if ("$listeners"in e)e.$listeners = e.$listeners;
                    e = {}
                }
                this.setOptions(e, this);
                return this
            }, setOptions: function (g, e) {
                e =
                    e || this;
                b.Options.setOptions.call(this, b.Object.merge(g, eval("(" + (e.get("data-" + this.key) || "{}") + ")")));
                return this
            }
        });
        f = new b.Wrapper(f, c);
        b.Observer.createShortcuts(f.prototype, f.EVENTS || []);
        return f
    })({
        extend: {
            version: "2.0.0",
            EVENTS: l("show hide"),
            Options: {
                cssRule: "[data-tooltip]",
                fxName: "fade",
                fxDuration: 400,
                delay: 400,
                move: true,
                idSuffix: "-tooltip"
            },
            current: null,
            instances: b([]),
            find: function (a) {
                if (a = a.find(d.Options.cssRule)) {
                    var c = m(a);
                    return d.instances[c] || (d.instances[c] = new d(a))
                }
            }
        }, initialize: function (a,
                                 c) {
            this.associate = a = i(a);
            this.$super("tooltip").setOptions(c, a).insert('<div class="rui-tooltip-arrow"></div><div class="rui-tooltip-container">' + (a.get("title") || a.get("alt")) + "</div>").on({
                mouseout: "stopEvent",
                mouseover: this._cancelTimer
            }).insertTo(h.body);
            a.has("id") && this.set("id", a.get("id") + this.options.idSuffix);
            a.set({title: "", alt: ""})
        }, hide: function () {
            this._cancelTimer();
            this._timer = b(function () {
                j.prototype.hide.call(this, this.options.fxName, {
                    duration: this.options.fxDuration, onFinish: b(function () {
                        if (d.current ===
                            this)d.current = null
                    }).bind(this)
                });
                this.fire("hide")
            }).bind(this).delay(100);
            return this
        }, show: function () {
            d.instances.each(function (a) {
                a && a !== this && a.hide()
            }, this);
            this._timer = b(function () {
                j.prototype.show.call(this.stop(), this.options.fxName, {duration: this.options.fxDuration});
                d.current = this.fire("show")
            }).bind(this).delay(this.options.delay);
            return d.current = this
        }, moveToEvent: function (a) {
            this._.style.left = a.pageX + "px";
            this._.style.top = a.pageY + "px";
            return this
        }, _cancelTimer: function (a) {
            a && a.stop();
            if (this._timer) {
                this._timer.cancel();
                this._timer = null
            }
        }
    });
    i(h).on({
        mouseover: function (a) {
            var c = d.current, f = d.find(a);
            if (f) {
                c && c !== f && c.hide();
                f.hidden() && f.show();
                f.moveToEvent(a)
            }
        }, mouseout: function (a) {
            var c = d.current;
            a = d.find(a);
            if (c && (!a || a === c))c.hide()
        }, mousemove: function (a) {
            var c = d.current;
            c && c.options.move && c.moveToEvent(a)
        }
    });
    h.write('<style type="text/css">div.rui-tooltip{display:none;position:absolute;z-index:99999;font-size:90%;margin-top:16pt;margin-left:5pt;color:#FFF;text-shadow:0 0 .2em #000;border:.3em solid rgba(255,255,255,0.2);background-color:rgba(25,25,25,0.92); *background-color:#000; *border:.3em solid #444;background-image:-webkit-gradient(linear,0% 0%,0% 100%,from(transparent) ,to(#000) );border-radius:.4em;-moz-border-radius:.4em;-webkit-border-radius:.4em;box-shadow:0 0 .4em #555;-moz-box-shadow:0 0 .4em #555;-webkit-box-shadow:0 0 .4em #555}div.rui-tooltip-container{margin:.4em .6em}</style>');
    return d
}(document, RightJS);
