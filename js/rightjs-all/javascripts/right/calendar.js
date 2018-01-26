/**
 * RightJS-UI Calendar v2.3.2
 * http://rightjs.org/ui/calendar
 *
 * Copyright (C) 2009-2012 Nikolay Nemshilov
 */
var Calendar = RightJS.Calendar = function (a, b, c) {
    function j(a) {
        return (a < 10 ? "0" : "") + a
    }

    function h(a, d, e) {
        var f = this.reAnchor || (this.reAnchor = new c.Element("div", {"class": "rui-re-anchor"})).insert(this), g = f.insertTo(a, "after").position(), h = a.dimensions(), i = this, j = b(a.getStyle("borderTopWidth")), k = b(a.getStyle("borderLeftWidth")), l = b(a.getStyle("borderRightWidth")), m = b(a.getStyle("borderBottomWidth")), n = h.top - g.y + j, o = h.left - g.x + k, p = h.width - k - l, q = h.height - j - m;
        i.setStyle("visibility:hidden").show(null), d === "right" ? o += p - i.size().x : n += q, i.moveTo(o, n), e && (d === "left" || d === "right" ? i.setHeight(q) : i.setWidth(p)), i.setStyle("visibility:visible").hide(null)
    }

    function g(a, b, d, e) {
        if (b === "hide" && a.visible() || b === "show" && a.hidden()) {
            c.Fx ? (a.___fx = !0, d === undefined && (d = a.options.fxName, e === undefined && (e = {
                duration: a.options.fxDuration,
                onFinish: function () {
                    a.___fx = !1, a.fire(b)
                }
            }, b === "hide" && (e.duration = (c.Fx.Durations[e.duration] || e.duration) / 2)))) : (a.___fx = !1, d || a.fire(b));
            return a.$super(d, e)
        }
        return a
    }

    function d(a, b) {
        b || (b = a, a = "DIV");
        var d = new c.Class(c.Element.Wrappers[a] || c.Element, {
            initialize: function (b, d) {
                this.key = b;
                var e = [{"class": "rui-" + b}];
                this instanceof c.Input || this instanceof c.Form || e.unshift(a), this.$super.apply(this, e), c.isString(d) && (d = c.$(d)), d instanceof c.Element && (this._ = d._, "$listeners"in d && (d.$listeners = d.$listeners), d = {}), this.setOptions(d, this);
                return c.Wrapper.Cache[c.$uid(this._)] = this
            }, setOptions: function (a, b) {
                b && (a = c.Object.merge(a, (new Function("return " + (b.get("data-" + this.key) || "{}")))())), a && c.Options.setOptions.call(this, c.Object.merge(this.options, a));
                return this
            }
        }), e = new c.Class(d, b);
        c.Observer.createShortcuts(e.prototype, e.EVENTS || c([]));
        return e
    }

    var e = new c.Class(c.Element, {
        initialize: function (a, b) {
            this.$super("div", b), this._.innerHTML = a, this.addClass("rui-button"), this.on("selectstart", "stopEvent")
        }, disable: function () {
            return this.addClass("rui-button-disabled")
        }, enable: function () {
            return this.removeClass("rui-button-disabled")
        }, disabled: function () {
            return this.hasClass("rui-button-disabled")
        }, enabled: function () {
            return !this.disabled()
        }, fire: function () {
            this.enabled() && this.$super.apply(this, arguments);
            return this
        }
    }), f = {
        show: function (a, b) {
            this.constructor.current = this;
            return g(this, "show", a, b)
        }, hide: function (a, b) {
            this.constructor.current = null;
            return g(this, "hide", a, b)
        }, showAt: function (a, b, d) {
            this.hide(null).shownAt = a = c.$(a), h.call(this, a, b, d);
            return this.show()
        }, toggleAt: function (a, b, c) {
            return this.hidden() ? this.showAt(a, b, c) : this.hide()
        }
    }, i = {
        assignTo: function (a, b) {
            a = c.$(a), b = c.$(b), b ? (b[this.key] = this, b.assignedInput = a) : a[this.key] = this;
            var d = c(function () {
                this.visible() && (!this.showAt || this.shownAt === a) && this.setValue(a.value())
            }).bind(this);
            a.on({keyup: d, change: d}), this.onChange(function () {
                (!this.showAt || this.shownAt === a) && a.setValue(this.getValue())
            });
            return this
        }
    }, k = c, l = c.$, m = c.$$, n = c.$w, o = c.$ext, p = c.$uid, q = c.isString, r = c.isArray, s = c.isFunction, t = c.Class, u = c.Element, v = c.Input, w = c.RegExp, x = c.Browser, y = new d({
        include: [f, i],
        extend: {
            version: "2.3.2",
            EVENTS: n("show hide change done"),
            Options: {
                format: "ISO",
                showTime: null,
                showButtons: !1,
                minDate: !1,
                maxDate: !1,
                fxName: "fade",
                fxDuration: "short",
                firstDay: 1,
                numberOfMonths: 1,
                timePeriod: 1,
                twentyFourHour: null,
                listYears: !1,
                hideOnPick: !1,
                update: null,
                trigger: null,
                highlight: null,
                cssRule: "*[data-calendar]"
            },
            Formats: {ISO: "%Y-%m-%d", POSIX: "%Y/%m/%d", EUR: "%d-%m-%Y", US: "%m/%d/%Y"},
            i18n: {
                Done: "Done",
                Now: "Now",
                NextMonth: "Next Month",
                PrevMonth: "Previous Month",
                NextYear: "Next Year",
                PrevYear: "Previous Year",
                dayNames: n("Sunday Monday Tuesday Wednesday Thursday Friday Saturday"),
                dayNamesShort: n("Sun Mon Tue Wed Thu Fri Sat"),
                dayNamesMin: n("Su Mo Tu We Th Fr Sa"),
                monthNames: n("January February March April May June July August September October November December"),
                monthNamesShort: n("Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec")
            },
            current: null,
            hideAll: function (a) {
                m("div.rui-calendar").each(function (b) {
                    b instanceof y && b !== a && b.visible() && !b.inlined() && b.hide()
                })
            }
        },
        initialize: function (a) {
            this.$super("calendar", a), this.addClass("rui-panel"), a = this.options, this.insert([this.swaps = new z(a), this.grid = new B(a)]), a.showTime && this.insert(this.timepicker = new C(a)), a.showButtons && this.insert(this.buttons = new D(a)), this.setDate(new Date).initEvents()
        },
        setDate: function (a, b) {
            if (a = this.parse(a)) {
                var c = this.options;
                c.minDate && c.minDate > a && (a = new Date(c.minDate)), c.maxDate && c.maxDate < a && (a = new Date(c.maxDate), a.setDate(a.getDate() - 1)), this._date = b ? new Date(this._date || this.date) : null, this.grid.setDate(this._date || a, a), (c.minDate || c.maxDate) && this.swaps.setDate(a), this.timepicker && !b && this.timepicker.setDate(a), a != this.date && this.fire("change", {date: this.date = a})
            }
            return this
        },
        getDate: function () {
            return this.date
        },
        setValue: function (a) {
            return this.setDate(a)
        },
        getValue: function (a) {
            return this.format(a)
        },
        insertTo: function (a, b) {
            this.addClass("rui-calendar-inline");
            return this.$super(a, b)
        },
        done: function () {
            this.inlined() || this.hide(), this.fire("done", {date: this.date})
        },
        inlined: function () {
            return this.hasClass("rui-calendar-inline")
        },
        setOptions: function (a) {
            a = a || {}, this.$super(a, l(a.trigger || a.update));
            var b = this.constructor, c = this.options;
            c.i18n = {};
            for (var d in b.i18n)c.i18n[d] = r(b.i18n[d]) ? b.i18n[d].clone() : b.i18n[d];
            o(c.i18n, a.i18n), c.dayNames = c.i18n.dayNamesMin, c.firstDay && c.dayNames.push(c.dayNames.shift()), r(c.numberOfMonths) || (c.numberOfMonths = [c.numberOfMonths, 1]), c.minDate && (c.minDate = this.parse(c.minDate)), c.maxDate && (c.maxDate = this.parse(c.maxDate), c.maxDate.setDate(c.maxDate.getDate() + 1)), c.format = k(b.Formats[c.format] || c.format).trim(), c.showTime === null && (c.showTime = c.format.search(/%[HkIl]/) > -1), c.twentyFourHour === null && (c.twentyFourHour = c.format.search(/%[Il]/) < 0), c.timePeriod > 60 && 12 % Math.ceil(c.timePeriod / 60) && (c.twentyFourHour = !0), c.update && this.assignTo(c.update, c.trigger), r(c.highlight) && (c.highlight = k(c.highlight).map(function (a) {
                return q(a) ? this.parse(a) : a
            }, this));
            return this
        },
        hideOthers: function () {
            y.hideAll(this);
            return this
        }
    }), z = new t(u, {
        initialize: function (a) {
            this.$super("div", {"class": "swaps"}), this.options = a;
            var b = a.i18n;
            this.insert([this.prevMonth = new e("&lsaquo;", {
                title: b.PrevMonth,
                "class": "prev-month"
            }), this.nextMonth = new e("&rsaquo;", {
                title: b.NextMonth,
                "class": "next-month"
            })]), a.listYears && this.insert([this.prevYear = new e("&laquo;", {
                title: b.PrevYear,
                "class": "prev-year"
            }), this.nextYear = new e("&raquo;", {
                title: b.NextYear,
                "class": "next-year"
            })]), this.buttons = k([this.prevMonth, this.nextMonth, this.prevYear, this.nextYear]).compact(), this.onClick(this.clicked)
        }, setDate: function (a) {
            var b = this.options, c = b.numberOfMonths[0] * b.numberOfMonths[1], d = !0, e = !0, f = !0, g = !0;
            if (b.minDate) {
                var h = new Date(a.getFullYear(), 0, 1, 0, 0, 0), i = new Date(b.minDate.getFullYear(), 0, 1, 0, 0, 0);
                d = h > i, h.setMonth(a.getMonth() - Math.ceil(c - c / 2)), i.setMonth(b.minDate.getMonth()), f = h >= i
            }
            if (b.maxDate) {
                var j = new Date(a), l = new Date(b.maxDate), m = k([j, l]);
                m.each(function (a) {
                    a.setDate(32), a.setMonth(a.getMonth() - 1), a.setDate(32 - a.getDate()), a.setHours(0), a.setMinutes(0), a.setSeconds(0), a.setMilliseconds(0)
                }), g = j < l, m.each("setMonth", 0), e = j < l
            }
            this.nextMonth[g ? "enable" : "disable"](), this.prevMonth[f ? "enable" : "disable"](), this.nextYear && (this.nextYear[e ? "enable" : "disable"](), this.prevYear[d ? "enable" : "disable"]())
        }, clicked: function (a) {
            var b = a.target;
            b && this.buttons.include(b) && (b.enabled() && this.fire(b.get("className").split(/\s+/)[0]))
        }
    }), A = new t(u, {
        initialize: function (a) {
            this.$super("table", {"class": "month"}), this.options = a, this.insert(this.caption = new u("caption")), this.insert("<thead><tr>" + a.dayNames.map(function (a) {
                return "<th>" + a + "</th>"
            }).join("") + "</tr></thead>"), this.days = [];
            var b = (new u("tbody")).insertTo(this), c, d, e;
            for (d = 0; d < 6; d++) {
                e = (new u("tr")).insertTo(b);
                for (c = 0; c < 7; c++)this.days.push((new u("td")).insertTo(e))
            }
            this.onClick(this.clicked)
        }, setDate: function (b, c) {
            b.setDate(32);
            var d = 32 - b.getDate();
            b.setMonth(b.getMonth() - 1);
            var e = Math.ceil(c.getTime() / 864e5), f = this.options, g = f.i18n, h = this.days;
            for (var i = 0, j = h.length - 1, k, l, m; i < 7; i++)k = h[i]._, l = h[j - i]._, m = h[j - i - 7]._, k.innerHTML = l.innerHTML = m.innerHTML = "", k.className = l.className = m.className = "blank";
            for (var i = 1, n = 0, o, p; i <= d; i++) {
                b.setDate(i);
                var q = b.getDay();
                f.firstDay === 1 && (q = q > 0 ? q - 1 : 6);
                if (i === 1 || q === 0)o = h.slice(n * 7, n * 7 + 7), n++;
                p = o[q]._, x.OLD ? (p.innerHTML = "", p.appendChild(a.createTextNode(i))) : p.innerHTML = "" + i, p.className = e === Math.ceil(b.getTime() / 864e5) ? "selected" : "";
                if (f.minDate && f.minDate > b || f.maxDate && f.maxDate < b)p.className = "disabled";
                r(f.highlight) && (f.highlight.first(function (a) {
                    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
                }) && (p.className += " highlighted")), o[q].date = new Date(b)
            }
            var s = (f.listYears ? g.monthNamesShort[b.getMonth()] + "," : g.monthNames[b.getMonth()]) + " " + b.getFullYear(), t = this.caption._;
            x.OLD ? (t.innerHTML = "", t.appendChild(a.createTextNode(s))) : t.innerHTML = s
        }, clicked: function (a) {
            var b = a.target, c = b.date;
            b && c && !b.hasClass("disabled") && !b.hasClass("blank") && (b.addClass("selected"), this.fire("date-set", {
                date: c.getDate(),
                month: c.getMonth(),
                year: c.getFullYear()
            }))
        }
    }), B = new t(u, {
        initialize: function (a) {
            this.$super("table", {"class": "grid"}), this.months = [];
            var b = (new u("tbody")).insertTo(this), c;
            for (var d = 0; d < a.numberOfMonths[1]; d++) {
                var e = (new u("tr")).insertTo(b);
                for (var f = 0; f < a.numberOfMonths[0]; f++)this.months.push(c = new A(a)), (new u("td")).insertTo(e).insert(c)
            }
        }, setDate: function (a, b) {
            var c = this.months, d = c.length;
            b = b || a;
            for (var e = -Math.ceil(d - d / 2) + 1, f = 0; e < Math.floor(d - d / 2) + 1; e++, f++) {
                var g = new Date(a);
                g.setDate(1), g.setMonth(a.getMonth() + e), c[f].setDate(g, b)
            }
        }
    }), C = new t(u, {
        initialize: function (a) {
            this.$super("div", {"class": "timepicker"}), this.options = a;
            var b = k(this.timeChanged).bind(this);
            this.insert([this.hours = (new u("select")).onChange(b), this.minutes = (new u("select")).onChange(b)]);
            var c = a.timePeriod < 60 ? a.timePeriod : 60, d = a.timePeriod < 60 ? 1 : Math.ceil(a.timePeriod / 60);
            for (var e = 0; e < 60; e++) {
                var f = j(e);
                e < 24 && e % d == 0 && (a.twentyFourHour ? this.hours.insert(new u("option", {
                    value: e,
                    html: f
                })) : e < 12 && this.hours.insert(new u("option", {
                    value: e,
                    html: e == 0 ? 12 : e
                }))), e % c == 0 && this.minutes.insert(new u("option", {value: e, html: f}))
            }
            a.twentyFourHour || (this.meridian = (new u("select")).onChange(b).insertTo(this), k(k(a.format).includes(/%P/) ? ["am", "pm"] : ["AM", "PM"]).each(function (a) {
                this.meridian.insert(new u("option", {value: a.toLowerCase(), html: a}))
            }, this))
        }, setDate: function (a) {
            var b = this.options, c = b.timePeriod < 60 ? a.getHours() : Math.round(a.getHours() / (b.timePeriod / 60)) * (b.timePeriod / 60), d = Math.round(a.getMinutes() / (b.timePeriod % 60)) * b.timePeriod;
            this.meridian && (this.meridian.setValue(c < 12 ? "am" : "pm"), c = c == 0 || c == 12 ? 12 : c > 12 ? c - 12 : c), this.hours.setValue(c), this.minutes.setValue(d)
        }, timeChanged: function (a) {
            a.stopPropagation();
            var c = b(this.hours.value()), d = b(this.minutes.value());
            this.meridian && (c == 12 && (c = 0), this.meridian.value() == "pm" && (c += 12)), this.fire("time-set", {
                hours: c,
                minutes: d
            })
        }
    }), D = new t(u, {
        initialize: function (a) {
            this.$super("div", {"class": "buttons"}), this.insert([(new e(a.i18n.Now, {"class": "now"})).onClick("fire", "now-clicked"), (new e(a.i18n.Done, {"class": "done"})).onClick("fire", "done-clicked")])
        }
    });
    y.include({
        parse: function (a) {
            var c;
            if (q(a) && a) {
                var d = w.escape(this.options.format), e = k(d.match(/%[a-z]/ig)).map("match", /[a-z]$/i).map("first").without("%"), f = new w("^" + d.replace(/%p/i, "(pm|PM|am|AM)").replace(/(%[a-z])/ig, "(.+?)") + "$"), g = k(a).trim().match(f);
                if (g) {
                    g.shift();
                    var h = null, i = null, j = null, l = null, m = null, n;
                    while (g.length) {
                        var o = g.shift(), p = e.shift();
                        if (p.toLowerCase() == "b")i = this.options.i18n[p == "b" ? "monthNamesShort" : "monthNames"].indexOf(o); else if (p.toLowerCase() == "p")n = o.toLowerCase(); else {
                            o = b(o, 10);
                            switch (p) {
                                case"d":
                                case"e":
                                    c = o;
                                    break;
                                case"m":
                                    i = o - 1;
                                    break;
                                case"y":
                                case"Y":
                                    h = o;
                                    break;
                                case"H":
                                case"k":
                                case"I":
                                case"l":
                                    j = o;
                                    break;
                                case"M":
                                    l = o;
                                    break;
                                case"S":
                                    m = o
                            }
                        }
                    }
                    n && (j = j == 12 ? 0 : j, j = n == "pm" ? j + 12 : j), c = new Date(h, i, c, j, l, m)
                }
            } else if (a instanceof Date || Date.parse(a))c = new Date(a);
            return !c || isNaN(c.getTime()) ? null : c
        }, format: function (a) {
            var b = this.options.i18n, c = this.date.getDay(), d = this.date.getMonth(), e = this.date.getDate(), f = this.date.getFullYear(), g = this.date.getHours(), h = this.date.getMinutes(), i = this.date.getSeconds(), k = g == 0 ? 12 : g < 13 ? g : g - 12, l = {
                a: b.dayNamesShort[c],
                A: b.dayNames[c],
                b: b.monthNamesShort[d],
                B: b.monthNames[d],
                d: j(e),
                e: "" + e,
                m: (d < 9 ? "0" : "") + (d + 1),
                y: ("" + f).substring(2, 4),
                Y: "" + f,
                H: j(g),
                k: "" + g,
                I: (g > 0 && (g < 10 || g > 12 && g < 22) ? "0" : "") + k,
                l: "" + k,
                p: g < 12 ? "AM" : "PM",
                P: g < 12 ? "am" : "pm",
                M: j(h),
                S: j(i),
                "%": "%"
            }, m = a || this.options.format;
            for (var n in l)m = m.replace("%" + n, l[n]);
            return m
        }
    }), y.include({
        initEvents: function () {
            var a = "_shiftDate", b = this._terminate;
            this.on({
                "prev-day": [a, {Date: -1}],
                "next-day": [a, {Date: 1}],
                "prev-week": [a, {Date: -7}],
                "next-week": [a, {Date: 7}],
                "prev-month": [a, {Month: -1}],
                "next-month": [a, {Month: 1}],
                "prev-year": [a, {FullYear: -1}],
                "next-year": [a, {FullYear: 1}],
                "date-set": this._changeDate,
                "time-set": this._changeTime,
                "now-clicked": this._setNow,
                "done-clicked": this.done,
                click: b,
                mousedown: b,
                focus: b,
                blur: b
            })
        }, _shiftDate: function (a) {
            var b = new Date(this.date), c = this.options;
            for (var d in a)b["set" + d](b["get" + d]() + a[d]);
            this.setDate(b)
        }, _changeDate: function (a) {
            var b = new Date(this.date);
            b.setDate(a.date), b.setMonth(a.month), b.setFullYear(a.year), this.setDate(b, !0), this.options.hideOnPick && this.done()
        }, _changeTime: function (a) {
            var b = new Date(this.date);
            b.setHours(a.hours), b.setMinutes(a.minutes), this.setDate(b)
        }, _setNow: function () {
            this.setDate(new Date)
        }, _terminate: function (a) {
            a.stopPropagation(), this._hide_delay && (this._hide_delay.cancel(), this._hide_delay = null)
        }
    }), l(a).on({
        focus: function (a) {
            var b = a.target instanceof v && a.target.get("type") == "text" ? a.target : null;
            y.hideAll(), b && (b.calendar || b.match(y.Options.cssRule)) && (b.calendar || new y({update: b})).setValue(b.value()).showAt(b)
        }, blur: function (a) {
            var b = a.target, c = b.calendar;
            c && (c._hide_delay = k(function () {
                c.hide()
            }).delay(200))
        }, click: function (a) {
            var b = a.target instanceof u ? a.target : null;
            if (b && (b.calendar || b.match(y.Options.cssRule))) {
                if (!(b instanceof v) || b.get("type") != "text")a.stop(), (b.calendar || new y({trigger: b})).hide(null).toggleAt(b.assignedInput)
            } else a.find("div.rui-calendar") || y.hideAll()
        }, keydown: function (a) {
            var b = y.current, c = ({
                27: "hide",
                37: "prev-day",
                39: "next-day",
                38: "prev-week",
                40: "next-week",
                33: "prev-month",
                34: "next-month",
                13: "done"
            })[a.keyCode];
            c && b && b.visible() && (a.stop(), s(b[c]) ? b[c]() : b.fire(c))
        }
    });
    var E = a.createElement("style"), F = a.createTextNode(".rui-panel{margin:0;padding:.5em;position:relative;background-color:#EEE;border:1px solid #BBB;border-radius:.3em;-moz-border-radius:.3em;-webkit-border-radius:.3em;box-shadow:.15em .3em .5em #BBB;-moz-box-shadow:.15em .3em .5em #BBB;-webkit-box-shadow:.15em .3em .5em #BBB;cursor:default} *.rui-button{display:inline-block; *display:inline; *zoom:1;height:1em;line-height:1em;margin:0;padding:.2em .5em;text-align:center;border:1px solid #CCC;border-radius:.2em;-moz-border-radius:.2em;-webkit-border-radius:.2em;cursor:pointer;color:#333;background-color:#FFF;user-select:none;-moz-user-select:none;-webkit-user-select:none} *.rui-button:hover{color:#111;border-color:#999;background-color:#DDD;box-shadow:#888 0 0 .1em;-moz-box-shadow:#888 0 0 .1em;-webkit-box-shadow:#888 0 0 .1em} *.rui-button:active{color:#000;border-color:#777;text-indent:1px;box-shadow:none;-moz-box-shadow:none;-webkit-box-shadow:none} *.rui-button-disabled, *.rui-button-disabled:hover, *.rui-button-disabled:active{color:#888;background:#DDD;border-color:#CCC;cursor:default;text-indent:0;box-shadow:none;-moz-box-shadow:none;-webkit-box-shadow:none}div.rui-re-anchor{margin:0;padding:0;background:none;border:none;float:none;display:inline;position:absolute;z-index:9999}div.rui-calendar .swaps,div.rui-calendar .grid,div.rui-calendar .timepicker,div.rui-calendar .buttons,div.rui-calendar table,div.rui-calendar table tr,div.rui-calendar table th,div.rui-calendar table td,div.rui-calendar table tbody,div.rui-calendar table thead,div.rui-calendar table caption{background:none;border:none;width:auto;height:auto;margin:0;padding:0}div.rui-calendar-inline{position:relative;display:inline-block; *display:inline; *zoom:1;box-shadow:none;-moz-box-shadow:none;-webkit-box-shadow:none}div.rui-calendar .swaps{position:relative}div.rui-calendar .swaps .rui-button{position:absolute;float:left;width:1em;padding:.15em .4em}div.rui-calendar .swaps .next-month{right:0em;_right:.5em}div.rui-calendar .swaps .prev-year{left:2.05em}div.rui-calendar .swaps .next-year{right:2.05em;_right:2.52em}div.rui-calendar .grid{border-spacing:0px;border-collapse:collapse;border-size:0}div.rui-calendar .grid td{vertical-align:top;padding-left:.4em}div.rui-calendar .grid>tbody>tr>td:first-child{padding:0}div.rui-calendar .month{margin-top:.2em;border-spacing:1px;border-collapse:separate}div.rui-calendar .month caption{text-align:center}div.rui-calendar .month th{color:#666;text-align:center}div.rui-calendar .month td{text-align:right;padding:.1em .3em;background-color:#FFF;border:1px solid #CCC;cursor:pointer;color:#555;border-radius:.2em;-moz-border-radius:.2em;-webkit-border-radius:.2em}div.rui-calendar .month td:hover{background-color:#CCC;border-color:#AAA;color:#000}div.rui-calendar .month td.blank{background:transparent;cursor:default;border:none}div.rui-calendar .month td.selected{background-color:#BBB;border-color:#AAA;color:#222;font-weight:bold;padding:.1em .2em}div.rui-calendar .month td.disabled{color:#888;background:#EEE;border-color:#CCC;cursor:default}div.rui-calendar .month td.highlighted{background-color:#DDD;border-color:#bbb;color:#111}div.rui-calendar .timepicker{border-top:1px solid #ccc;margin-top:.3em;padding-top:.5em;text-align:center}div.rui-calendar .timepicker select{margin:0 .4em}div.rui-calendar .buttons{position:relative;margin-top:.5em}div.rui-calendar .buttons div.rui-button{width:4em;padding:.25em .5em}div.rui-calendar .buttons .done{position:absolute;right:0em;top:0}");
    E.type = "text/css", a.getElementsByTagName("head")[0].appendChild(E), E.styleSheet ? E.styleSheet.cssText = F.nodeValue : E.appendChild(F);
    return y
}(document, parseInt, RightJS)