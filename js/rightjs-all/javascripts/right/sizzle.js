/**
 * Sizzle Engine Support v2.2.0
 * http://rightjs.org/plugins/sizzle
 *
 * Copyright (C) 2009-2011 Nikolay Nemshilov
 */
RightJS.Sizzle = {version: "2.2.0"}, function () {
    function p(a, b, c, d, e, g) {
        for (var h = 0, i = d.length; h < i; h++) {
            var j = d[h];
            if (j) {
                j = j[a];
                var k = !1;
                while (j) {
                    if (j.sizcache === c) {
                        k = d[j.sizset];
                        break
                    }
                    if (j.nodeType === 1) {
                        g || (j.sizcache = c, j.sizset = h);
                        if (typeof b !== "string") {
                            if (j === b) {
                                k = !0;
                                break
                            }
                        } else if (f.filter(b, [j]).length > 0) {
                            k = j;
                            break
                        }
                    }
                    j = j[a]
                }
                d[h] = k
            }
        }
    }

    function o(a, b, c, d, e, f) {
        for (var g = 0, h = d.length; g < h; g++) {
            var i = d[g];
            if (i) {
                i = i[a];
                var j = !1;
                while (i) {
                    if (i.sizcache === c) {
                        j = d[i.sizset];
                        break
                    }
                    i.nodeType === 1 && !f && (i.sizcache = c, i.sizset = g);
                    if (i.nodeName.toLowerCase() === b) {
                        j = i;
                        break
                    }
                    i = i[a]
                }
                d[g] = j
            }
        }
    }

    var a = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g, b = 0, c = Object.prototype.toString, d = !1, e = !0;
    [0, 0].sort(function () {
        e = !1;
        return 0
    });
    var f = function (b, d, e, i) {
        e = e || [], d = d || document;
        var j = d;
        if (d.nodeType !== 1 && d.nodeType !== 9)return [];
        if (!b || typeof b !== "string")return e;
        var l = [], m, n, o, p, r = !0, s = f.isXML(d), t = b, u, v, w, x;
        do {
            a.exec(""), m = a.exec(t);
            if (m) {
                t = m[3], l.push(m[1]);
                if (m[2]) {
                    p = m[3];
                    break
                }
            }
        } while (m);
        if (l.length > 1 && h.exec(b))if (l.length === 2 && g.relative[l[0]])n = q(l[0] + l[1], d); else {
            n = g.relative[l[0]] ? [d] : f(l.shift(), d);
            while (l.length)b = l.shift(), g.relative[b] && (b += l.shift()), n = q(b, n)
        } else {
            !i && l.length > 1 && d.nodeType === 9 && !s && g.match.ID.test(l[0]) && !g.match.ID.test(l[l.length - 1]) && (u = f.find(l.shift(), d, s), d = u.expr ? f.filter(u.expr, u.set)[0] : u.set[0]);
            if (d) {
                u = i ? {
                    expr: l.pop(),
                    set: k(i)
                } : f.find(l.pop(), l.length === 1 && (l[0] === "~" || l[0] === "+") && d.parentNode ? d.parentNode : d, s), n = u.expr ? f.filter(u.expr, u.set) : u.set, l.length > 0 ? o = k(n) : r = !1;
                while (l.length)v = l.pop(), w = v, g.relative[v] ? w = l.pop() : v = "", w == null && (w = d), g.relative[v](o, w, s)
            } else o = l = []
        }
        o || (o = n), o || f.error(v || b);
        if (c.call(o) === "[object Array]")if (r)if (d && d.nodeType === 1)for (x = 0; o[x] != null; x++)o[x] && (o[x] === !0 || o[x].nodeType === 1 && f.contains(d, o[x])) && e.push(n[x]); else for (x = 0; o[x] != null; x++)o[x] && o[x].nodeType === 1 && e.push(n[x]); else e.push.apply(e, o); else k(o, e);
        p && (f(p, j, e, i), f.uniqueSort(e));
        return e
    };
    f.uniqueSort = function (a) {
        if (m) {
            d = e, a.sort(m);
            if (d)for (var b = 1; b < a.length; b++)a[b] === a[b - 1] && a.splice(b--, 1)
        }
        return a
    }, f.matches = function (a, b) {
        return f(a, null, null, b)
    }, f.find = function (a, b, c) {
        var d;
        if (!a)return [];
        for (var e = 0, f = g.order.length; e < f; e++) {
            var h = g.order[e], i;
            if (i = g.leftMatch[h].exec(a)) {
                var j = i[1];
                i.splice(1, 1);
                if (j.substr(j.length - 1) !== "\\") {
                    i[1] = (i[1] || "").replace(/\\/g, ""), d = g.find[h](i, b, c);
                    if (d != null) {
                        a = a.replace(g.match[h], "");
                        break
                    }
                }
            }
        }
        d || (d = b.getElementsByTagName("*"));
        return {set: d, expr: a}
    }, f.filter = function (a, b, c, d) {
        var e = a, h = [], i = b, j, k, l = b && b[0] && f.isXML(b[0]);
        while (a && b.length) {
            for (var m in g.filter)if ((j = g.leftMatch[m].exec(a)) != null && j[2]) {
                var n = g.filter[m], o, p, q = j[1];
                k = !1, j.splice(1, 1);
                if (q.substr(q.length - 1) === "\\")continue;
                i === h && (h = []);
                if (g.preFilter[m]) {
                    j = g.preFilter[m](j, i, c, h, d, l);
                    if (j) {
                        if (j === !0)continue
                    } else k = o = !0
                }
                if (j)for (var r = 0; (p = i[r]) != null; r++)if (p) {
                    o = n(p, j, r, i);
                    var s = d ^ !!o;
                    c && o != null ? s ? k = !0 : i[r] = !1 : s && (h.push(p), k = !0)
                }
                if (o !== undefined) {
                    c || (i = h), a = a.replace(g.match[m], "");
                    if (!k)return [];
                    break
                }
            }
            if (a === e)if (k == null)f.error(a); else break;
            e = a
        }
        return i
    }, f.error = function (a) {
        throw"Syntax error, unrecognized expression: " + a
    };
    var g = f.selectors = {
        order: ["ID", "NAME", "TAG"],
        match: {
            ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
            CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
            NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
            ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
            TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
            CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+\-]*)\))?/,
            POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
            PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
        },
        leftMatch: {},
        attrMap: {"class": "className", "for": "htmlFor"},
        attrHandle: {
            href: function (a) {
                return a.getAttribute("href")
            }
        },
        relative: {
            "+": function (a, b) {
                var c = typeof b === "string", d = c && !/\W/.test(b), e = c && !d;
                d && (b = b.toLowerCase());
                for (var g = 0, h = a.length, i; g < h; g++)if (i = a[g]) {
                    while ((i = i.previousSibling) && i.nodeType !== 1) {
                    }
                    a[g] = e || i && i.nodeName.toLowerCase() === b ? i || !1 : i === b
                }
                e && f.filter(b, a, !0)
            }, ">": function (a, b) {
                var c = typeof b === "string", d, e = 0, g = a.length;
                if (c && !/\W/.test(b)) {
                    b = b.toLowerCase();
                    for (; e < g; e++) {
                        d = a[e];
                        if (d) {
                            var h = d.parentNode;
                            a[e] = h.nodeName.toLowerCase() === b ? h : !1
                        }
                    }
                } else {
                    for (; e < g; e++)d = a[e], d && (a[e] = c ? d.parentNode : d.parentNode === b);
                    c && f.filter(b, a, !0)
                }
            }, "": function (a, c, d) {
                var e = b++, f = p, g;
                typeof c === "string" && !/\W/.test(c) && (c = c.toLowerCase(), g = c, f = o), f("parentNode", c, e, a, g, d)
            }, "~": function (a, c, d) {
                var e = b++, f = p, g;
                typeof c === "string" && !/\W/.test(c) && (c = c.toLowerCase(), g = c, f = o), f("previousSibling", c, e, a, g, d)
            }
        },
        find: {
            ID: function (a, b, c) {
                if (typeof b.getElementById !== "undefined" && !c) {
                    var d = b.getElementById(a[1]);
                    return d && d.parentNode ? [d] : []
                }
            }, NAME: function (a, b) {
                if (typeof b.getElementsByName !== "undefined") {
                    var c = [], d = b.getElementsByName(a[1]);
                    for (var e = 0, f = d.length; e < f; e++)d[e].getAttribute("name") === a[1] && c.push(d[e]);
                    return c.length === 0 ? null : c
                }
            }, TAG: function (a, b) {
                return b.getElementsByTagName(a[1])
            }
        },
        preFilter: {
            CLASS: function (a, b, c, d, e, f) {
                a = " " + a[1].replace(/\\/g, "") + " ";
                if (f)return a;
                for (var g = 0, h; (h = b[g]) != null; g++)h && (e ^ (h.className && (" " + h.className + " ").replace(/[\t\n]/g, " ").indexOf(a) >= 0) ? c || d.push(h) : c && (b[g] = !1));
                return !1
            }, ID: function (a) {
                return a[1].replace(/\\/g, "")
            }, TAG: function (a, b) {
                return a[1].toLowerCase()
            }, CHILD: function (a) {
                if (a[1] === "nth") {
                    var c = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(a[2] === "even" && "2n" || a[2] === "odd" && "2n+1" || !/\D/.test(a[2]) && "0n+" + a[2] || a[2]);
                    a[2] = c[1] + (c[2] || 1) - 0, a[3] = c[3] - 0
                }
                a[0] = b++;
                return a
            }, ATTR: function (a, b, c, d, e, f) {
                var h = a[1].replace(/\\/g, "");
                !f && g.attrMap[h] && (a[1] = g.attrMap[h]), a[2] === "~=" && (a[4] = " " + a[4] + " ");
                return a
            }, PSEUDO: function (b, c, d, e, h) {
                if (b[1] === "not")if ((a.exec(b[3]) || "").length > 1 || /^\w/.test(b[3]))b[3] = f(b[3], null, null, c); else {
                    var i = f.filter(b[3], c, d, !0 ^ h);
                    d || e.push.apply(e, i);
                    return !1
                } else if (g.match.POS.test(b[0]) || g.match.CHILD.test(b[0]))return !0;
                return b
            }, POS: function (a) {
                a.unshift(!0);
                return a
            }
        },
        filters: {
            enabled: function (a) {
                return a.disabled === !1 && a.type !== "hidden"
            }, disabled: function (a) {
                return a.disabled === !0
            }, checked: function (a) {
                return a.checked === !0
            }, selected: function (a) {
                a.parentNode.selectedIndex;
                return a.selected === !0
            }, parent: function (a) {
                return !!a.firstChild
            }, empty: function (a) {
                return !a.firstChild
            }, has: function (a, b, c) {
                return !!f(c[3], a).length
            }, header: function (a) {
                return /h\d/i.test(a.nodeName)
            }, text: function (a) {
                return "text" === a.type
            }, radio: function (a) {
                return "radio" === a.type
            }, checkbox: function (a) {
                return "checkbox" === a.type
            }, file: function (a) {
                return "file" === a.type
            }, password: function (a) {
                return "password" === a.type
            }, submit: function (a) {
                return "submit" === a.type
            }, image: function (a) {
                return "image" === a.type
            }, reset: function (a) {
                return "reset" === a.type
            }, button: function (a) {
                return "button" === a.type || a.nodeName.toLowerCase() === "button"
            }, input: function (a) {
                return /input|select|textarea|button/i.test(a.nodeName)
            }
        },
        setFilters: {
            first: function (a, b) {
                return b === 0
            }, last: function (a, b, c, d) {
                return b === d.length - 1
            }, even: function (a, b) {
                return b % 2 === 0
            }, odd: function (a, b) {
                return b % 2 === 1
            }, lt: function (a, b, c) {
                return b < c[3] - 0
            }, gt: function (a, b, c) {
                return b > c[3] - 0
            }, nth: function (a, b, c) {
                return c[3] - 0 === b
            }, eq: function (a, b, c) {
                return c[3] - 0 === b
            }
        },
        filter: {
            PSEUDO: function (a, b, c, d) {
                var e = b[1], h = g.filters[e];
                if (h)return h(a, c, b, d);
                if (e === "contains")return (a.textContent || a.innerText || f.getText([a]) || "").indexOf(b[3]) >= 0;
                if (e === "not") {
                    var i = b[3];
                    for (var j = 0, k = i.length; j < k; j++)if (i[j] === a)return !1;
                    return !0
                }
                f.error("Syntax error, unrecognized expression: " + e)
            }, CHILD: function (a, b) {
                var c = b[1], d = a;
                switch (c) {
                    case"only":
                    case"first":
                        while (d = d.previousSibling)if (d.nodeType === 1)return !1;
                        if (c === "first")return !0;
                        d = a;
                    case"last":
                        while (d = d.nextSibling)if (d.nodeType === 1)return !1;
                        return !0;
                    case"nth":
                        var e = b[2], f = b[3];
                        if (e === 1 && f === 0)return !0;
                        var g = b[0], h = a.parentNode;
                        if (h && (h.sizcache !== g || !a.nodeIndex)) {
                            var i = 0;
                            for (d = h.firstChild; d; d = d.nextSibling)d.nodeType === 1 && (d.nodeIndex = ++i);
                            h.sizcache = g
                        }
                        var j = a.nodeIndex - f;
                        return e === 0 ? j === 0 : j % e === 0 && j / e >= 0
                }
            }, ID: function (a, b) {
                return a.nodeType === 1 && a.getAttribute("id") === b
            }, TAG: function (a, b) {
                return b === "*" && a.nodeType === 1 || a.nodeName.toLowerCase() === b
            }, CLASS: function (a, b) {
                return (" " + (a.className || a.getAttribute("class")) + " ").indexOf(b) > -1
            }, ATTR: function (a, b) {
                var c = b[1], d = g.attrHandle[c] ? g.attrHandle[c](a) : a[c] != null ? a[c] : a.getAttribute(c), e = d + "", f = b[2], h = b[4];
                return d == null ? f === "!=" : f === "=" ? e === h : f === "*=" ? e.indexOf(h) >= 0 : f === "~=" ? (" " + e + " ").indexOf(h) >= 0 : h ? f === "!=" ? e !== h : f === "^=" ? e.indexOf(h) === 0 : f === "$=" ? e.substr(e.length - h.length) === h : f === "|=" ? e === h || e.substr(0, h.length + 1) === h + "-" : !1 : e && d !== !1
            }, POS: function (a, b, c, d) {
                var e = b[2], f = g.setFilters[e];
                if (f)return f(a, c, b, d)
            }
        }
    }, h = g.match.POS, i = function (a, b) {
        return "\\" + (b - 0 + 1)
    };
    for (var j in g.match)g.match[j] = new RegExp(g.match[j].source + /(?![^\[]*\])(?![^\(]*\))/.source), g.leftMatch[j] = new RegExp(/(^(?:.|\r|\n)*?)/.source + g.match[j].source.replace(/\\(\d+)/g, i));
    var k = function (a, b) {
        a = Array.prototype.slice.call(a, 0);
        if (b) {
            b.push.apply(b, a);
            return b
        }
        return a
    };
    try {
        Array.prototype.slice.call(document.documentElement.childNodes, 0)[0].nodeType
    } catch (l) {
        k = function (a, b) {
            var d = b || [], e = 0;
            if (c.call(a) === "[object Array]")Array.prototype.push.apply(d, a); else if (typeof a.length === "number")for (var f = a.length; e < f; e++)d.push(a[e]); else for (; a[e]; e++)d.push(a[e]);
            return d
        }
    }
    var m, n;
    document.documentElement.compareDocumentPosition ? m = function (a, b) {
        if (a === b) {
            d = !0;
            return 0
        }
        if (!a.compareDocumentPosition || !b.compareDocumentPosition)return a.compareDocumentPosition ? -1 : 1;
        return a.compareDocumentPosition(b) & 4 ? -1 : 1
    } : (m = function (a, b) {
        var c = [], e = [], f = a.parentNode, g = b.parentNode, h = f, i, j;
        if (a === b) {
            d = !0;
            return 0
        }
        if (f === g)return n(a, b);
        if (!f)return -1;
        if (!g)return 1;
        while (h)c.unshift(h), h = h.parentNode;
        h = g;
        while (h)e.unshift(h), h = h.parentNode;
        i = c.length, j = e.length;
        for (var k = 0; k < i && k < j; k++)if (c[k] !== e[k])return n(c[k], e[k]);
        return k === i ? n(a, e[k], -1) : n(c[k], b, 1)
    }, n = function (a, b, c) {
        if (a === b)return c;
        var d = a.nextSibling;
        while (d) {
            if (d === b)return -1;
            d = d.nextSibling
        }
        return 1
    }), f.getText = function (a) {
        var b = "", c;
        for (var d = 0; a[d]; d++)c = a[d], c.nodeType === 3 || c.nodeType === 4 ? b += c.nodeValue : c.nodeType !== 8 && (b += f.getText(c.childNodes));
        return b
    }, function () {
        var a = document.createElement("div"), b = "script" + (new Date).getTime();
        a.innerHTML = "<a name='" + b + "'/>";
        var c = document.documentElement;
        c.insertBefore(a, c.firstChild), document.getElementById(b) && (g.find.ID = function (a, b, c) {
            if (typeof b.getElementById !== "undefined" && !c) {
                var d = b.getElementById(a[1]);
                return d ? d.id === a[1] || typeof d.getAttributeNode !== "undefined" && d.getAttributeNode("id").nodeValue === a[1] ? [d] : undefined : []
            }
        }, g.filter.ID = function (a, b) {
            var c = typeof a.getAttributeNode !== "undefined" && a.getAttributeNode("id");
            return a.nodeType === 1 && c && c.nodeValue === b
        }), c.removeChild(a), c = a = null
    }(), function () {
        var a = document.createElement("div");
        a.appendChild(document.createComment("")), a.getElementsByTagName("*").length > 0 && (g.find.TAG = function (a, b) {
            var c = b.getElementsByTagName(a[1]);
            if (a[1] === "*") {
                var d = [];
                for (var e = 0; c[e]; e++)c[e].nodeType === 1 && d.push(c[e]);
                c = d
            }
            return c
        }), a.innerHTML = "<a href='#'></a>", a.firstChild && typeof a.firstChild.getAttribute !== "undefined" && a.firstChild.getAttribute("href") !== "#" && (g.attrHandle.href = function (a) {
            return a.getAttribute("href", 2)
        }), a = null
    }(), document.querySelectorAll && function () {
        var a = f, b = document.createElement("div");
        b.innerHTML = "<p class='TEST'></p>";
        if (!b.querySelectorAll || b.querySelectorAll(".TEST").length !== 0) {
            f = function (b, c, d, e) {
                c = c || document;
                if (!e && c.nodeType === 9 && !f.isXML(c))try {
                    return k(c.querySelectorAll(b), d)
                } catch (g) {
                }
                return a(b, c, d, e)
            };
            for (var c in a)f[c] = a[c];
            b = null
        }
    }(), function () {
        var a = document.createElement("div");
        a.innerHTML = "<div class='test e'></div><div class='test'></div>";
        if (a.getElementsByClassName && a.getElementsByClassName("e").length !== 0) {
            a.lastChild.className = "e";
            if (a.getElementsByClassName("e").length === 1)return;
            g.order.splice(1, 0, "CLASS"), g.find.CLASS = function (a, b, c) {
                if (typeof b.getElementsByClassName !== "undefined" && !c)return b.getElementsByClassName(a[1])
            }, a = null
        }
    }(), f.contains = document.compareDocumentPosition ? function (a, b) {
        return !!(a.compareDocumentPosition(b) & 16)
    } : function (a, b) {
        return a !== b && (a.contains ? a.contains(b) : !0)
    }, f.isXML = function (a) {
        var b = (a ? a.ownerDocument || a : 0).documentElement;
        return b ? b.nodeName !== "HTML" : !1
    };
    var q = function (a, b) {
        var c = [], d = "", e, h = b.nodeType ? [b] : b;
        while (e = g.match.PSEUDO.exec(a))d += e[0], a = a.replace(g.match.PSEUDO, "");
        a = g.relative[a] ? a + "*" : a;
        for (var i = 0, j = h.length; i < j; i++)f(a, h[i], c);
        return f.filter(d, c)
    };
    window.Sizzle = f
}(), RightJS([RightJS.Document, RightJS.Element]).each("include", {
    first: function (a) {
        return this.find(a)[0]
    }, find: function (a) {
        return RightJS(Sizzle(a, this._)).map(RightJS.$)
    }
})