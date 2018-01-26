﻿(function (p, A, f) {
    var G = f("html"), m = f(p), n = f(A), b = f.fancybox = function () {
        b.open.apply(this, arguments)
    }, F = navigator.userAgent.match(/msie/i), s = null, q = void 0 !== A.createTouch, v = function (a) {
        return a && a.hasOwnProperty && a instanceof f
    }, o = function (a) {
        return a && "string" === f.type(a)
    }, C = function (a) {
        return o(a) && 0 < a.indexOf("%")
    }, k = function (a, d) {
        var e = parseInt(a, 10) || 0;
        d && C(a) && (e *= b.getViewport()[d] / 100);
        return Math.ceil(e)
    }, t = function (a, b) {
        return k(a, b) + "px"
    };
    f.extend(b, {
        version: "2.1.5",
        defaults: {
            padding: 15,
            margin: 20,
            width: 800,
            height: 600,
            minWidth: 100,
            minHeight: 100,
            maxWidth: 9999,
            maxHeight: 9999,
            pixelRatio: 1,
            autoSize: !0,
            autoHeight: !1,
            autoWidth: !1,
            autoResize: !0,
            autoCenter: !q,
            fitToView: !0,
            aspectRatio: !1,
            topRatio: 0.5,
            leftRatio: 0.5,
            scrolling: "auto",
            wrapCSS: "",
            arrows: !0,
            closeBtn: !0,
            closeClick: !1,
            nextClick: !1,
            mouseWheel: !0,
            autoPlay: !1,
            playSpeed: 3E3,
            preload: 3,
            modal: !1,
            loop: !0,
            ajax: {dataType: "html", headers: {"X-fancyBox": !0}},
            iframe: {scrolling: "auto", preload: !0},
            swf: {wmode: "transparent", allowfullscreen: "true", allowscriptaccess: "always"},
            keys: {
                next: {13: "left", 34: "up", 39: "left", 40: "up"},
                prev: {8: "right", 33: "down", 37: "right", 38: "down"},
                close: [27],
                play: [32],
                toggle: [70]
            },
            direction: {next: "left", prev: "right"},
            scrollOutside: !0,
            index: 0,
            type: null,
            href: null,
            content: null,
            title: null,
            tpl: {
                wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
                image: '<img class="fancybox-image" src="{href}" alt="" />',
                iframe: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' +
                (F ? ' allowtransparency="true"' : "") + "></iframe>",
                error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
                closeBtn: '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
                next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
                prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
            },
            openEffect: "fade",
            openSpeed: 250,
            openEasing: "swing",
            openOpacity: !0,
            openMethod: "zoomIn",
            closeEffect: "fade",
            closeSpeed: 250,
            closeEasing: "swing",
            closeOpacity: !0,
            closeMethod: "zoomOut",
            nextEffect: "elastic",
            nextSpeed: 250,
            nextEasing: "swing",
            nextMethod: "changeIn",
            prevEffect: "elastic",
            prevSpeed: 250,
            prevEasing: "swing",
            prevMethod: "changeOut",
            helpers: {overlay: !0, title: !0},
            onCancel: f.noop,
            beforeLoad: f.noop,
            afterLoad: f.noop,
            beforeShow: f.noop,
            afterShow: f.noop,
            beforeChange: f.noop,
            beforeClose: f.noop,
            afterClose: f.noop
        },
        group: {},
        opts: {},
        previous: null,
        coming: null,
        current: null,
        isActive: !1,
        isOpen: !1,
        isOpened: !1,
        wrap: null,
        skin: null,
        outer: null,
        inner: null,
        player: {timer: null, isActive: !1},
        ajaxLoad: null,
        imgPreload: null,
        transitions: {},
        helpers: {},
        open: function (a, d) {
            if (a && (f.isPlainObject(d) || (d = {}), !1 !== b.close(!0)))return f.isArray(a) || (a = v(a) ? f(a).get() : [a]), f.each(a, function (e, c) {
                var j = {}, g, h, i, l, k;
                "object" === f.type(c) && (c.nodeType && (c = f(c)), v(c) ? (j = {
                    href: c.data("fancybox-href") || c.attr("href"),
                    title: c.data("fancybox-title") || c.attr("title"),
                    isDom: !0,
                    element: c
                }, f.metadata && f.extend(!0, j,
                    c.metadata())) : j = c);
                g = d.href || j.href || (o(c) ? c : null);
                h = void 0 !== d.title ? d.title : j.title || "";
                l = (i = d.content || j.content) ? "html" : d.type || j.type;
                !l && j.isDom && (l = c.data("fancybox-type"), l || (l = (l = c.prop("class").match(/fancybox\.(\w+)/)) ? l[1] : null));
                if (o(g) && (l || (b.isImage(g) ? l = "image" : b.isSWF(g) ? l = "swf" : "#" === g.charAt(0) ? l = "inline" : o(c) && (l = "html", i = c)), "ajax" === l))k = g.split(/\s+/, 2), g = k.shift(), k = k.shift();
                i || ("inline" === l ? g ? i = f(o(g) ? g.replace(/.*(?=#[^\s]+$)/, "") : g) : j.isDom && (i = c) : "html" === l ? i = g : !l &&
                (!g && j.isDom) && (l = "inline", i = c));
                f.extend(j, {href: g, type: l, content: i, title: h, selector: k});
                a[e] = j
            }), b.opts = f.extend(!0, {}, b.defaults, d), void 0 !== d.keys && (b.opts.keys = d.keys ? f.extend({}, b.defaults.keys, d.keys) : !1), b.group = a, b._start(b.opts.index)
        },
        cancel: function () {
            var a = b.coming;
            a && !1 !== b.trigger("onCancel") && (b.hideLoading(), b.ajaxLoad && b.ajaxLoad.abort(), b.ajaxLoad = null, b.imgPreload && (b.imgPreload.onload = b.imgPreload.onerror = null), a.wrap && a.wrap.stop(!0, !0).trigger("onReset").remove(), b.coming = null,
            b.current || b._afterZoomOut(a))
        },
        close: function (a) {
            b.cancel();
            !1 !== b.trigger("beforeClose") && (b.unbindEvents(), b.isActive && (!b.isOpen || !0 === a ? (f(".fancybox-wrap").stop(!0).trigger("onReset").remove(), b._afterZoomOut()) : (b.isOpen = b.isOpened = !1, b.isClosing = !0, f(".fancybox-item, .fancybox-nav").remove(), b.wrap.stop(!0, !0).removeClass("fancybox-opened"), b.transitions[b.current.closeMethod]())))
        },
        play: function (a) {
            var d = function () {
                clearTimeout(b.player.timer)
            }, e = function () {
                d();
                b.current && b.player.isActive &&
                (b.player.timer = setTimeout(b.next, b.current.playSpeed))
            }, c = function () {
                d();
                n.unbind(".player");
                b.player.isActive = !1;
                b.trigger("onPlayEnd")
            };
            if (!0 === a || !b.player.isActive && !1 !== a) {
                if (b.current && (b.current.loop || b.current.index < b.group.length - 1))b.player.isActive = !0, n.bind({
                    "onCancel.player beforeClose.player": c,
                    "onUpdate.player": e,
                    "beforeLoad.player": d
                }), e(), b.trigger("onPlayStart")
            } else c()
        },
        next: function (a) {
            var d = b.current;
            d && (o(a) || (a = d.direction.next), b.jumpto(d.index + 1, a, "next"))
        },
        prev: function (a) {
            var d =
                b.current;
            d && (o(a) || (a = d.direction.prev), b.jumpto(d.index - 1, a, "prev"))
        },
        jumpto: function (a, d, e) {
            var c = b.current;
            if (c && (a = k(a), b.direction = d || c.direction[a >= c.index ? "next" : "prev"], b.router = e || "jumpto", c.loop && (0 > a && (a = c.group.length + a % c.group.length), a %= c.group.length), void 0 !== c.group[a]))b.cancel(), b._start(a)
        },
        reposition: function (a, d) {
            var e = b.current, c = e ? e.wrap : null, j;
            c && (j = b._getPosition(d), a && "scroll" === a.type ? (delete j.position, c.stop(!0, !0).animate(j, 200)) : (c.css(j), e.pos = f.extend({}, e.dim, j)))
        },
        update: function (a) {
            var d = a && a.type, e = !d || "orientationchange" === d;
            e && (clearTimeout(s), s = null);
            b.isOpen && !s && (s = setTimeout(function () {
                var c = b.current;
                if (c && !b.isClosing) {
                    b.wrap.removeClass("fancybox-tmp");
                    (e || d === "load" || d === "resize" && c.autoResize) && b._setDimension();
                    d === "scroll" && c.canShrink || b.reposition(a);
                    b.trigger("onUpdate");
                    s = null
                }
            }, e && !q ? 0 : 300))
        },
        toggle: function (a) {
            b.isOpen && (b.current.fitToView = "boolean" === f.type(a) ? a : !b.current.fitToView, q && (b.wrap.removeAttr("style").addClass("fancybox-tmp"),
                b.trigger("onUpdate")), b.update())
        },
        hideLoading: function () {
            n.unbind(".loading");
            f("#fancybox-loading").remove()
        },
        showLoading: function () {
            var a, d;
            b.hideLoading();
            a = f('<div id="fancybox-loading"><div></div></div>').click(b.cancel).appendTo("body");
            n.bind("keydown.loading", function (a) {
                if (27 === (a.which || a.keyCode))a.preventDefault(), b.cancel()
            });
            b.defaults.fixed || (d = b.getViewport(), a.css({
                position: "absolute",
                top: 0.5 * d.h + d.y,
                left: 0.5 * d.w + d.x
            }))
        },
        getViewport: function () {
            var a = b.current && b.current.locked || !1, d = {x: m.scrollLeft(), y: m.scrollTop()};
            a ? (d.w = a[0].clientWidth, d.h = a[0].clientHeight) : (d.w = q && p.innerWidth ? p.innerWidth : m.width(), d.h = q && p.innerHeight ? p.innerHeight : m.height());
            return d
        },
        unbindEvents: function () {
            b.wrap && v(b.wrap) && b.wrap.unbind(".fb");
            n.unbind(".fb");
            m.unbind(".fb")
        },
        bindEvents: function () {
            var a = b.current, d;
            a && (m.bind("orientationchange.fb" + (q ? "" : " resize.fb") + (a.autoCenter && !a.locked ? " scroll.fb" : ""), b.update), (d = a.keys) && n.bind("keydown.fb", function (e) {
                var c = e.which || e.keyCode, j =
                    e.target || e.srcElement;
                if (27 === c && b.coming)return !1;
                !e.ctrlKey && (!e.altKey && !e.shiftKey && !e.metaKey && (!j || !j.type && !f(j).is("[contenteditable]"))) && f.each(d, function (d, j) {
                    if (1 < a.group.length && void 0 !== j[c])return b[d](j[c]), e.preventDefault(), !1;
                    if (-1 < f.inArray(c, j))return b[d](), e.preventDefault(), !1
                })
            }), f.fn.mousewheel && a.mouseWheel && b.wrap.bind("mousewheel.fb", function (d, c, j, g) {
                for (var h = f(d.target || null), i = !1; h.length && !i && !h.is(".fancybox-skin") && !h.is(".fancybox-wrap");)i = h[0] && !(h[0].style.overflow &&
                "hidden" === h[0].style.overflow) && (h[0].clientWidth && h[0].scrollWidth > h[0].clientWidth || h[0].clientHeight && h[0].scrollHeight > h[0].clientHeight), h = f(h).parent();
                if (0 !== c && !i && 1 < b.group.length && !a.canShrink) {
                    if (0 < g || 0 < j)b.prev(0 < g ? "down" : "left"); else if (0 > g || 0 > j)b.next(0 > g ? "up" : "right");
                    d.preventDefault()
                }
            }))
        },
        trigger: function (a, d) {
            var e, c = d || b.coming || b.current;
            if (c) {
                f.isFunction(c[a]) && (e = c[a].apply(c, Array.prototype.slice.call(arguments, 1)));
                if (!1 === e)return !1;
                c.helpers && f.each(c.helpers, function (d,
                                                         e) {
                    if (e && b.helpers[d] && f.isFunction(b.helpers[d][a]))b.helpers[d][a](f.extend(!0, {}, b.helpers[d].defaults, e), c)
                });
                n.trigger(a)
            }
        },
        isImage: function (a) {
            return o(a) && a.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i)
        },
        isSWF: function (a) {
            return o(a) && a.match(/\.(swf)((\?|#).*)?$/i)
        },
        _start: function (a) {
            var d = {}, e, c, a = k(a);
            e = b.group[a] || null;
            if (!e)return !1;
            d = f.extend(!0, {}, b.opts, e);
            e = d.margin;
            c = d.padding;
            "number" === f.type(e) && (d.margin = [e, e, e, e]);
            "number" === f.type(c) && (d.padding =
                [c, c, c, c]);
            d.modal && f.extend(!0, d, {
                closeBtn: !1,
                closeClick: !1,
                nextClick: !1,
                arrows: !1,
                mouseWheel: !1,
                keys: null,
                helpers: {overlay: {closeClick: !1}}
            });
            d.autoSize && (d.autoWidth = d.autoHeight = !0);
            "auto" === d.width && (d.autoWidth = !0);
            "auto" === d.height && (d.autoHeight = !0);
            d.group = b.group;
            d.index = a;
            b.coming = d;
            if (!1 === b.trigger("beforeLoad"))b.coming = null; else {
                c = d.type;
                e = d.href;
                if (!c)return b.coming = null, b.current && b.router && "jumpto" !== b.router ? (b.current.index = a, b[b.router](b.direction)) : !1;
                b.isActive = !0;
                if ("image" ===
                    c || "swf" === c)d.autoHeight = d.autoWidth = !1, d.scrolling = "visible";
                "image" === c && (d.aspectRatio = !0);
                "iframe" === c && q && (d.scrolling = "scroll");
                d.wrap = f(d.tpl.wrap).addClass("fancybox-" + (q ? "mobile" : "desktop") + " fancybox-type-" + c + " fancybox-tmp " + d.wrapCSS).appendTo(d.parent || "body");
                f.extend(d, {
                    skin: f(".fancybox-skin", d.wrap),
                    outer: f(".fancybox-outer", d.wrap),
                    inner: f(".fancybox-inner", d.wrap)
                });
                f.each(["Top", "Right", "Bottom", "Left"], function (a, b) {
                    d.skin.css("padding" + b, t(d.padding[a]))
                });
                b.trigger("onReady");
                if ("inline" === c || "html" === c) {
                    if (!d.content || !d.content.length)return b._error("content")
                } else if (!e)return b._error("href");
                "image" === c ? b._loadImage() : "ajax" === c ? b._loadAjax() : "iframe" === c ? b._loadIframe() : b._afterLoad()
            }
        },
        _error: function (a) {
            f.extend(b.coming, {
                type: "html",
                autoWidth: !0,
                autoHeight: !0,
                minWidth: 0,
                minHeight: 0,
                scrolling: "no",
                hasError: a,
                content: b.coming.tpl.error
            });
            b._afterLoad()
        },
        _loadImage: function () {
            var a = b.imgPreload = new Image;
            a.onload = function () {
                this.onload = this.onerror = null;
                b.coming.width =
                    this.width / b.opts.pixelRatio;
                b.coming.height = this.height / b.opts.pixelRatio;
                b._afterLoad()
            };
            a.onerror = function () {
                this.onload = this.onerror = null;
                b._error("image")
            };
            a.src = b.coming.href;
            !0 !== a.complete && b.showLoading()
        },
        _loadAjax: function () {
            var a = b.coming;
            b.showLoading();
            b.ajaxLoad = f.ajax(f.extend({}, a.ajax, {
                url: a.href, error: function (a, e) {
                    b.coming && "abort" !== e ? b._error("ajax", a) : b.hideLoading()
                }, success: function (d, e) {
                    "success" === e && (a.content = d, b._afterLoad())
                }
            }))
        },
        _loadIframe: function () {
            var a = b.coming,
                d = f(a.tpl.iframe.replace(/\{rnd\}/g, (new Date).getTime())).attr("scrolling", q ? "auto" : a.iframe.scrolling).attr("src", a.href);
            f(a.wrap).bind("onReset", function () {
                try {
                    f(this).find("iframe").hide().attr("src", "//about:blank").end().empty()
                } catch (a) {
                }
            });
            a.iframe.preload && (b.showLoading(), d.one("load", function () {
                f(this).data("ready", 1);
                q || f(this).bind("load.fb", b.update);
                f(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show();
                b._afterLoad()
            }));
            a.content = d.appendTo(a.inner);
            a.iframe.preload ||
            b._afterLoad()
        },
        _preloadImages: function () {
            var a = b.group, d = b.current, e = a.length, c = d.preload ? Math.min(d.preload, e - 1) : 0, f, g;
            for (g = 1; g <= c; g += 1)f = a[(d.index + g) % e], "image" === f.type && f.href && ((new Image).src = f.href)
        },
        _afterLoad: function () {
            var a = b.coming, d = b.current, e, c, j, g, h;
            b.hideLoading();
            if (a && !1 !== b.isActive)if (!1 === b.trigger("afterLoad", a, d))a.wrap.stop(!0).trigger("onReset").remove(), b.coming = null; else {
                d && (b.trigger("beforeChange", d), d.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove());
                b.unbindEvents();
                e = a.content;
                c = a.type;
                j = a.scrolling;
                f.extend(b, {wrap: a.wrap, skin: a.skin, outer: a.outer, inner: a.inner, current: a, previous: d});
                g = a.href;
                switch (c) {
                    case "inline":
                    case "ajax":
                    case "html":
                        a.selector ? e = f("<div>").html(e).find(a.selector) : v(e) && (e.data("fancybox-placeholder") || e.data("fancybox-placeholder", f('<div class="fancybox-placeholder"></div>').insertAfter(e).hide()), e = e.show().detach(), a.wrap.bind("onReset", function () {
                            f(this).find(e).length && e.hide().replaceAll(e.data("fancybox-placeholder")).data("fancybox-placeholder",
                                false)
                        }));
                        break;
                    case "image":
                        e = a.tpl.image.replace("{href}", g);
                        break;
                    case "swf":
                        e = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + g + '"></param>', h = "", f.each(a.swf, function (a, b) {
                            e = e + ('<param name="' + a + '" value="' + b + '"></param>');
                            h = h + (" " + a + '="' + b + '"')
                        }), e += '<embed src="' + g + '" type="application/x-shockwave-flash" width="100%" height="100%"' + h + "></embed></object>"
                }
                (!v(e) || !e.parent().is(a.inner)) && a.inner.append(e);
                b.trigger("beforeShow");
                a.inner.css("overflow", "yes" === j ? "scroll" : "no" === j ? "hidden" : j);
                b._setDimension();
                b.reposition();
                b.isOpen = !1;
                b.coming = null;
                b.bindEvents();
                if (b.isOpened) {
                    if (d.prevMethod)b.transitions[d.prevMethod]()
                } else f(".fancybox-wrap").not(a.wrap).stop(!0).trigger("onReset").remove();
                b.transitions[b.isOpened ? a.nextMethod : a.openMethod]();
                b._preloadImages()
            }
        },
        _setDimension: function () {
            var a = b.getViewport(), d = 0, e = !1, c = !1, e = b.wrap, j = b.skin, g = b.inner, h = b.current, c = h.width, i = h.height, l = h.minWidth,
                r = h.minHeight, m = h.maxWidth, n = h.maxHeight, q = h.scrolling, o = h.scrollOutside ? h.scrollbarWidth : 0, u = h.margin, w = k(u[1] + u[3]), p = k(u[0] + u[2]), v, x, s, z, y, D, A, B, E;
            e.add(j).add(g).width("auto").height("auto").removeClass("fancybox-tmp");
            u = k(j.outerWidth(!0) - j.width());
            v = k(j.outerHeight(!0) - j.height());
            x = w + u;
            s = p + v;
            z = C(c) ? (a.w - x) * k(c) / 100 : c;
            y = C(i) ? (a.h - s) * k(i) / 100 : i;
            if ("iframe" === h.type) {
                if (E = h.content, h.autoHeight && 1 === E.data("ready"))try {
                    E[0].contentWindow.document.location && (g.width(z).height(9999), D = E.contents().find("body"),
                    o && D.css("overflow-x", "hidden"), y = D.outerHeight(!0))
                } catch (F) {
                }
            } else if (h.autoWidth || h.autoHeight)g.addClass("fancybox-tmp"), h.autoWidth || g.width(z), h.autoHeight || g.height(y), h.autoWidth && (z = g.width()), h.autoHeight && (y = g.height()), g.removeClass("fancybox-tmp");
            c = k(z);
            i = k(y);
            B = z / y;
            l = k(C(l) ? k(l, "w") - x : l);
            m = k(C(m) ? k(m, "w") - x : m);
            r = k(C(r) ? k(r, "h") - s : r);
            n = k(C(n) ? k(n, "h") - s : n);
            D = m;
            A = n;
            h.fitToView && (m = Math.min(a.w - x, m), n = Math.min(a.h - s, n));
            x = a.w - w;
            p = a.h - p;
            if (h.aspectRatio) {
                if (c > m && (c = m, i = k(c / B)), i > n && (i =
                        n, c = k(i * B)), c < l && (c = l, i = k(c / B)), i < r)i = r, c = k(i * B)
            } else c = Math.max(l, Math.min(c, m)), h.autoHeight && "iframe" !== h.type && (g.width(c), i = g.height()), i = Math.max(r, Math.min(i, n));
            if (h.fitToView)if (g.width(c).height(i), e.width(c + u), a = e.width(), w = e.height(), h.aspectRatio)for (; (a > x || w > p) && (c > l && i > r) && !(19 < d++);)i = Math.max(r, Math.min(n, i - 10)), c = k(i * B), c < l && (c = l, i = k(c / B)), c > m && (c = m, i = k(c / B)), g.width(c).height(i), e.width(c + u), a = e.width(), w = e.height(); else c = Math.max(l, Math.min(c, c - (a - x))), i = Math.max(r, Math.min(i,
                i - (w - p)));
            o && ("auto" === q && i < y && c + u + o < x) && (c += o);
            g.width(c).height(i);
            e.width(c + u);
            a = e.width();
            w = e.height();
            e = (a > x || w > p) && c > l && i > r;
            c = h.aspectRatio ? c < D && i < A && c < z && i < y : (c < D || i < A) && (c < z || i < y);
            f.extend(h, {
                dim: {width: t(a), height: t(w)},
                origWidth: z,
                origHeight: y,
                canShrink: e,
                canExpand: c,
                wPadding: u,
                hPadding: v,
                wrapSpace: w - j.outerHeight(!0),
                skinSpace: j.height() - i
            });
            !E && (h.autoHeight && i > r && i < n && !c) && g.height("auto")
        },
        _getPosition: function (a) {
            var d = b.current, e = b.getViewport(), c = d.margin, f = b.wrap.width() + c[1] + c[3],
                g = b.wrap.height() + c[0] + c[2], c = {position: "absolute", top: c[0], left: c[3]};
            d.autoCenter && d.fixed && !a && g <= e.h && f <= e.w ? c.position = "fixed" : d.locked || (c.top += e.y, c.left += e.x);
            c.top = t(Math.max(c.top, c.top + (e.h - g) * d.topRatio));
            c.left = t(Math.max(c.left, c.left + (e.w - f) * d.leftRatio));
            return c
        },
        _afterZoomIn: function () {
            var a = b.current;
            a && ((b.isOpen = b.isOpened = !0, b.wrap.css("overflow", "visible").addClass("fancybox-opened"), b.update(), (a.closeClick || a.nextClick && 1 < b.group.length) && b.inner.css("cursor", "pointer").bind("click.fb",
                function (d) {
                    !f(d.target).is("a") && !f(d.target).parent().is("a") && (d.preventDefault(), b[a.closeClick ? "close" : "next"]())
                }), a.closeBtn && f(a.tpl.closeBtn).appendTo(b.skin).bind("click.fb", function (a) {
                a.preventDefault();
                b.close()
            }), a.arrows && 1 < b.group.length && ((a.loop || 0 < a.index) && f(a.tpl.prev).appendTo(b.outer).bind("click.fb", b.prev), (a.loop || a.index < b.group.length - 1) && f(a.tpl.next).appendTo(b.outer).bind("click.fb", b.next)), b.trigger("afterShow"), !a.loop && a.index === a.group.length - 1) ? b.play(!1) : b.opts.autoPlay && !b.player.isActive && (b.opts.autoPlay = !1, b.play()))
        },
        _afterZoomOut: function (a) {
            a = a || b.current;
            f(".fancybox-wrap").trigger("onReset").remove();
            f.extend(b, {
                group: {},
                opts: {},
                router: !1,
                current: null,
                isActive: !1,
                isOpened: !1,
                isOpen: !1,
                isClosing: !1,
                wrap: null,
                skin: null,
                outer: null,
                inner: null
            });
            b.trigger("afterClose", a)
        }
    });
    b.transitions = {
        getOrigPosition: function () {
            var a = b.current, d = a.element, e = a.orig, c = {}, f = 50, g = 50, h = a.hPadding, i = a.wPadding, l = b.getViewport();
            !e && (a.isDom && d.is(":visible")) && (e = d.find("img:first"),
            e.length || (e = d));
            v(e) ? (c = e.offset(), e.is("img") && (f = e.outerWidth(), g = e.outerHeight())) : (c.top = l.y + (l.h - g) * a.topRatio, c.left = l.x + (l.w - f) * a.leftRatio);
            if ("fixed" === b.wrap.css("position") || a.locked)c.top -= l.y, c.left -= l.x;
            return c = {
                top: t(c.top - h * a.topRatio),
                left: t(c.left - i * a.leftRatio),
                width: t(f + i),
                height: t(g + h)
            }
        }, step: function (a, d) {
            var e, c, f = d.prop;
            c = b.current;
            var g = c.wrapSpace, h = c.skinSpace;
            if ("width" === f || "height" === f)e = d.end === d.start ? 1 : (a - d.start) / (d.end - d.start), b.isClosing && (e = 1 - e), c = "width" ===
            f ? c.wPadding : c.hPadding, c = a - c, b.skin[f](k("width" === f ? c : c - g * e)), b.inner[f](k("width" === f ? c : c - g * e - h * e))
        }, zoomIn: function () {
            var a = b.current, d = a.pos, e = a.openEffect, c = "elastic" === e, j = f.extend({opacity: 1}, d);
            delete j.position;
            c ? (d = this.getOrigPosition(), a.openOpacity && (d.opacity = 0.1)) : "fade" === e && (d.opacity = 0.1);
            b.wrap.css(d).animate(j, {
                duration: "none" === e ? 0 : a.openSpeed,
                easing: a.openEasing,
                step: c ? this.step : null,
                complete: b._afterZoomIn
            })
        }, zoomOut: function () {
            var a = b.current, d = a.closeEffect, e = "elastic" ===
                d, c = {opacity: 0.1};
            e && (c = this.getOrigPosition(), a.closeOpacity && (c.opacity = 0.1));
            b.wrap.animate(c, {
                duration: "none" === d ? 0 : a.closeSpeed,
                easing: a.closeEasing,
                step: e ? this.step : null,
                complete: b._afterZoomOut
            })
        }, changeIn: function () {
            var a = b.current, d = a.nextEffect, e = a.pos, c = {opacity: 1}, f = b.direction, g;
            e.opacity = 0.1;
            "elastic" === d && (g = "down" === f || "up" === f ? "top" : "left", "down" === f || "right" === f ? (e[g] = t(k(e[g]) - 200), c[g] = "+=200px") : (e[g] = t(k(e[g]) + 200), c[g] = "-=200px"));
            "none" === d ? b._afterZoomIn() : b.wrap.css(e).animate(c,
                {duration: a.nextSpeed, easing: a.nextEasing, complete: b._afterZoomIn})
        }, changeOut: function () {
            var a = b.previous, d = a.prevEffect, e = {opacity: 0.1}, c = b.direction;
            "elastic" === d && (e["down" === c || "up" === c ? "top" : "left"] = ("up" === c || "left" === c ? "-" : "+") + "=200px");
            a.wrap.animate(e, {
                duration: "none" === d ? 0 : a.prevSpeed, easing: a.prevEasing, complete: function () {
                    f(this).trigger("onReset").remove()
                }
            })
        }
    };
    b.helpers.overlay = {
        defaults: {closeClick: !0, speedOut: 200, showEarly: !0, css: {}, locked: !q, fixed: !0},
        overlay: null,
        fixed: !1,
        el: f("html"),
        create: function (a) {
            a = f.extend({}, this.defaults, a);
            this.overlay && this.close();
            this.overlay = f('<div class="fancybox-overlay"></div>').appendTo(b.coming ? b.coming.parent : a.parent);
            this.fixed = !1;
            a.fixed && b.defaults.fixed && (this.overlay.addClass("fancybox-overlay-fixed"), this.fixed = !0)
        },
        open: function (a) {
            var d = this, a = f.extend({}, this.defaults, a);
            this.overlay ? this.overlay.unbind(".overlay").width("auto").height("auto") : this.create(a);
            this.fixed || (m.bind("resize.overlay", f.proxy(this.update, this)), this.update());
            a.closeClick && this.overlay.bind("click.overlay", function (a) {
                if (f(a.target).hasClass("fancybox-overlay")) {
                    b.isActive ? b.close() : d.close();
                    return false
                }
            });
            this.overlay.css(a.css).show()
        },
        close: function () {
            var a, b;
            m.unbind("resize.overlay");
            this.el.hasClass("fancybox-lock") && (f(".fancybox-margin").removeClass("fancybox-margin"), a = m.scrollTop(), b = m.scrollLeft(), this.el.removeClass("fancybox-lock"), m.scrollTop(a).scrollLeft(b));
            f(".fancybox-overlay").remove().hide();
            f.extend(this, {overlay: null, fixed: !1})
        },
        update: function () {
            var a = "100%", b;
            this.overlay.width(a).height("100%");
            F ? (b = Math.max(A.documentElement.offsetWidth, A.body.offsetWidth), n.width() > b && (a = n.width())) : n.width() > m.width() && (a = n.width());
            this.overlay.width(a).height(n.height())
        },
        onReady: function (a, b) {
            var e = this.overlay;
            f(".fancybox-overlay").stop(!0, !0);
            e || this.create(a);
            a.locked && (this.fixed && b.fixed) && (e || (this.margin = n.height() > m.height() ? f("html").css("margin-right").replace("px", "") : !1), b.locked = this.overlay.append(b.wrap), b.fixed = !1);
            !0 === a.showEarly && this.beforeShow.apply(this, arguments)
        },
        beforeShow: function (a, b) {
            var e, c;
            b.locked && (!1 !== this.margin && (f("*").filter(function () {
                return "fixed" === f(this).css("position") && !f(this).hasClass("fancybox-overlay") && !f(this).hasClass("fancybox-wrap")
            }).addClass("fancybox-margin"), this.el.addClass("fancybox-margin")), e = m.scrollTop(), c = m.scrollLeft(), this.el.addClass("fancybox-lock"), m.scrollTop(e).scrollLeft(c));
            this.open(a)
        },
        onUpdate: function () {
            this.fixed || this.update()
        },
        afterClose: function (a) {
            this.overlay && !b.coming && this.overlay.fadeOut(a.speedOut, f.proxy(this.close, this))
        }
    };
    b.helpers.title = {
        defaults: {type: "float", position: "bottom"}, beforeShow: function (a) {
            var d = b.current, e = d.title, c = a.type;
            f.isFunction(e) && (e = e.call(d.element, d));
            if (o(e) && "" !== f.trim(e)) {
                d = f('<div class="fancybox-title fancybox-title-' + c + '-wrap">' + e + "</div>");
                switch (c) {
                    case "inside":
                        c = b.skin;
                        break;
                    case "outside":
                        c = b.wrap;
                        break;
                    case "over":
                        c = b.inner;
                        break;
                    default:
                        c = b.skin, d.appendTo("body"), F && d.width(d.width()), d.wrapInner('<span class="child"></span>'),
                            b.current.margin[2] += Math.abs(k(d.css("margin-bottom")))
                }
                d["top" === a.position ? "prependTo" : "appendTo"](c)
            }
        }
    };
    f.fn.fancybox = function (a) {
        var d, e = f(this), c = this.selector || "", j = function (g) {
                var h = f(this).blur(), i = d, j, k;
                !g.ctrlKey && (!g.altKey && !g.shiftKey && !g.metaKey) && !h.is(".fancybox-wrap") && (j = a.groupAttr || "data-fancybox-group", k = h.attr(j), k || (j = "rel", k = h.get(0)[j]), k && ("" !== k && "nofollow" !== k) && (h = c.length ? f(c) : e, h = h.filter("[" + j + '="' + k + '"]'), i = h.index(this)), a.index = i, !1 !== b.open(h, a) && g.preventDefault())
            },
            a = a || {};
        d = a.index || 0;
        !c || !1 === a.live ? e.unbind("click.fb-start").bind("click.fb-start", j) : n.undelegate(c, "click.fb-start").delegate(c + ":not('.fancybox-item, .fancybox-nav')", "click.fb-start", j);
        this.filter("[data-fancybox-start=1]").trigger("click");
        return this
    };
    n.ready(function () {
        var a, d;
        void 0 === f.scrollbarWidth && (f.scrollbarWidth = function () {
            var a = f('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"), b = a.children(), b = b.innerWidth() - b.height(99).innerWidth();
            a.remove();
            return b
        });
        void 0 === f.support.fixedPosition && (f.support.fixedPosition = function () {
            var a = f('<div style="position:fixed;top:20px;"></div>').appendTo("body"), b = a[0].offsetTop === 20 || a[0].offsetTop === 15;
            a.remove();
            return b
        }());
        f.extend(b.defaults, {scrollbarWidth: f.scrollbarWidth(), fixed: f.support.fixedPosition, parent: f("body")});
        a = f(p).width();
        G.addClass("fancybox-lock-test");
        d = f(p).width();
        G.removeClass("fancybox-lock-test");
        f("<style type='text/css'>.fancybox-margin{margin-right:" + (d - a) + "px;}</style>").appendTo("head")
    })
})(window,
    document, jQuery);