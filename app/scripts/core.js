if (this.top.location !== this.location) {
  /** @type {(Location|null)} */
  this.top.location = this.location;
}
/** @type {function (this:Window, string): (MediaQueryList|null)} */
window.matchMedia = window.matchMedia || function(doc) {
  var bool;
  /** @type {Element} */
  var docElem = doc.documentElement;
  /** @type {(Node|null)} */
  var refNode = docElem.firstElementChild || docElem.firstChild;
  /** @type {Element} */
  var fakeBody = doc.createElement("body");
  /** @type {Element} */
  var div = doc.createElement("div");
  return div.id = "mq-test-1", div.style.cssText = "position:absolute;top:-100em", fakeBody.style.background = "none", fakeBody.appendChild(div), function(q) {
    return div.innerHTML = '&shy;<style media="' + q + '"> #mq-test-1 { width: 42px; }</style>', docElem.insertBefore(fakeBody, refNode), bool = 42 === div.offsetWidth, docElem.removeChild(fakeBody), {
      matches : bool,
      media : q
    };
  };
}(document);
(function(win) {
  /**
   * @return {undefined}
   */
  function callMedia() {
    applyMedia(true);
  }
  var respond = {};
  if (win.va = respond, respond.update = function() {
  }, respond.ia = win.matchMedia && win.matchMedia("only all").matches, !respond.ia) {
    var aux;
    var resizeDefer;
    var ret;
    /** @type {HTMLDocument} */
    var doc = win.document;
    /** @type {Element} */
    var docElem = doc.documentElement;
    /** @type {Array} */
    var tags = [];
    /** @type {Array} */
    var rules = [];
    /** @type {Array} */
    var nodes = [];
    var parsedSheets = {};
    var head = doc.getElementsByTagName("head")[0] || docElem;
    var F = doc.getElementsByTagName("base")[0];
    var links = head.getElementsByTagName("link");
    /** @type {Array} */
    var requestQueue = [];
    /**
     * @return {undefined}
     */
    var ripCSS = function() {
      /** @type {number} */
      var index = 0;
      for (;links.length > index;index++) {
        var sheet = links[index];
        var href = sheet.href;
        var media = sheet.media;
        var r = sheet.rel && "stylesheet" === sheet.rel.toLowerCase();
        if (href) {
          if (r) {
            if (!parsedSheets[href]) {
              if (sheet.styleSheet && sheet.styleSheet.ka) {
                translate(sheet.styleSheet.ka, href, media);
                /** @type {boolean} */
                parsedSheets[href] = true;
              } else {
                if (!/^([a-zA-Z:]*\/\/)/.test(href) && !F || href.replace(RegExp.$1, "").split("/")[0] === win.location.host) {
                  requestQueue.push({
                    href : href,
                    media : media
                  });
                }
              }
            }
          }
        }
      }
      makeRequests();
    };
    /**
     * @return {undefined}
     */
    var makeRequests = function() {
      if (requestQueue.length) {
        var thisRequest = requestQueue.shift();
        ajax(thisRequest.href, function(styles) {
          translate(styles, thisRequest.href, thisRequest.media);
          /** @type {boolean} */
          parsedSheets[thisRequest.href] = true;
          win.setTimeout(function() {
            makeRequests();
          }, 0);
        });
      }
    };
    /**
     * @param {string} styles
     * @param {string} href
     * @param {(number|string)} media
     * @return {undefined}
     */
    var translate = function(styles, href, media) {
      /**
       * @param {string} css
       * @return {?}
       */
      function repUrls(css) {
        return css.replace(/(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g, "$1" + href + "$2$3");
      }
      var includes = styles.match(/@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi);
      var ql = includes && includes.length || 0;
      href = href.substring(0, href.lastIndexOf("/"));
      var useMedia = !ql && media;
      if (href.length) {
        href += "/";
      }
      if (useMedia) {
        /** @type {number} */
        ql = 1;
      }
      /** @type {number} */
      var f = 0;
      for (;ql > f;f++) {
        var fullq;
        var part;
        var rawParams;
        var len;
        if (useMedia) {
          /** @type {(number|string)} */
          fullq = media;
          rules.push(repUrls(styles));
        } else {
          fullq = includes[f].match(/@media *([^\{]+)\{([\S\s]+?)$/) && RegExp.$1;
          rules.push(RegExp.$2 && repUrls(RegExp.$2));
        }
        rawParams = fullq.split(",");
        len = rawParams.length;
        /** @type {number} */
        var i = 0;
        for (;len > i;i++) {
          part = rawParams[i];
          tags.push({
            media : part.split("(")[0].match(/(only\s+)?([a-zA-Z]+)\s?/) && RegExp.$2 || "all",
            rules : rules.length - 1,
            da : -1 < part.indexOf("("),
            ja : part.match(/\(\s*min\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/) && parseFloat(RegExp.$1) + (RegExp.$2 || ""),
            ha : part.match(/\(\s*max\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/) && parseFloat(RegExp.$1) + (RegExp.$2 || "")
          });
        }
      }
      applyMedia();
    };
    /**
     * @return {?}
     */
    var getEmValue = function() {
      var style;
      /** @type {Element} */
      var container = doc.createElement("div");
      /** @type {(HTMLElement|null)} */
      var body = doc.body;
      /** @type {boolean} */
      var fakeUsed = false;
      return container.style.cssText = "position:absolute;font-size:1em;width:1em", body || (body = fakeUsed = doc.createElement("body"), body.style.background = "none"), body.appendChild(container), docElem.insertBefore(body, docElem.firstChild), style = container.offsetWidth, fakeUsed ? docElem.removeChild(body) : body.removeChild(container), ret = parseFloat(style);
    };
    /**
     * @param {Object} options
     * @return {?}
     */
    var applyMedia = function(options) {
      /** @type {number} */
      var styleBlocks = docElem.clientWidth;
      /** @type {number} */
      var counter = "CSS1Compat" === doc.compatMode && styleBlocks || (doc.body.clientWidth || styleBlocks);
      styleBlocks = {};
      var lastLink = links[links.length - 1];
      /** @type {number} */
      var max = (new Date).getTime();
      if (options && (aux && 30 > max - aux)) {
        return win.clearTimeout(resizeDefer), resizeDefer = win.setTimeout(applyMedia, 30), void 0;
      }
      /** @type {number} */
      aux = max;
      var tag;
      for (tag in tags) {
        if (tags.hasOwnProperty(tag)) {
          options = tags[tag];
          max = options.ja;
          var fontSize = options.ha;
          /** @type {boolean} */
          var a = null === max;
          /** @type {boolean} */
          var b = null === fontSize;
          if (max) {
            /** @type {number} */
            max = parseFloat(max) * (-1 < max.indexOf("em") ? ret || getEmValue() : 1);
          }
          if (fontSize) {
            /** @type {number} */
            fontSize = parseFloat(fontSize) * (-1 < fontSize.indexOf("em") ? ret || getEmValue() : 1);
          }
          if (!(options.da && (a && b || (!(a || counter >= max) || !(b || fontSize >= counter))))) {
            if (!styleBlocks[options.media]) {
              /** @type {Array} */
              styleBlocks[options.media] = [];
            }
            styleBlocks[options.media].push(rules[options.rules]);
          }
        }
      }
      var i;
      for (i in nodes) {
        if (nodes.hasOwnProperty(i)) {
          if (nodes[i]) {
            if (nodes[i].parentNode === head) {
              head.removeChild(nodes[i]);
            }
          }
        }
      }
      var k;
      for (k in styleBlocks) {
        if (styleBlocks.hasOwnProperty(k)) {
          /** @type {Element} */
          tag = doc.createElement("style");
          i = styleBlocks[k].join("\n");
          /** @type {string} */
          tag.type = "text/css";
          /** @type {string} */
          tag.media = k;
          head.insertBefore(tag, lastLink.nextSibling);
          if (tag.styleSheet) {
            tag.styleSheet.cssText = i;
          } else {
            tag.appendChild(doc.createTextNode(i));
          }
          nodes.push(tag);
        }
      }
    };
    /**
     * @param {?} url
     * @param {Function} callback
     * @return {undefined}
     */
    var ajax = function(url, callback) {
      var req = xmlHttp();
      if (req) {
        req.open("GET", url, true);
        /**
         * @return {undefined}
         */
        req.onreadystatechange = function() {
          if (!(4 !== req.readyState)) {
            if (!(200 !== req.status && 304 !== req.status)) {
              callback(req.responseText);
            }
          }
        };
        if (4 !== req.readyState) {
          req.send(null);
        }
      }
    };
    var xmlHttp = function() {
      /** @type {boolean} */
      var b = false;
      try {
        /** @type {XMLHttpRequest} */
        b = new win.XMLHttpRequest;
      } catch (a) {
        /** @type {ActiveXObject} */
        b = new win.ActiveXObject("Microsoft.XMLHTTP");
      }
      return function() {
        return b;
      };
    }();
    ripCSS();
    /** @type {function (): undefined} */
    respond.update = ripCSS;
    if (win.addEventListener) {
      win.addEventListener("resize", callMedia, false);
    } else {
      if (win.attachEvent) {
        win.attachEvent("onresize", callMedia);
      }
    }
  }
})(this);
if (!window.getComputedStyle) {
  /**
   * @param {(Element|null)} element
   * @return {(CSSStyleDeclaration|null)}
   */
  window.getComputedStyle = function(element) {
    /**
     * @param {string} text
     * @return {?}
     */
    this.getPropertyValue = function(text) {
      /** @type {RegExp} */
      var cx = /(\-([a-z]){1})/g;
      if ("float" == text) {
        /** @type {string} */
        text = "styleFloat";
      }
      if (cx.test(text)) {
        text = text.replace(cx, function(dataAndEvents, deepDataAndEvents, letter) {
          return letter.toUpperCase();
        });
      }
      return(text = element.currentStyle[text]) ? text : null;
    };
    return this;
  };
}
if (!document.getElementsByClassName) {
  /**
   * @param {string} e
   * @return {NodeList}
   */
  document.getElementsByClassName = function(e) {
    /** @type {HTMLDocument} */
    var t = document;
    var ii;
    /** @type {Array} */
    var ret = [];
    if (t.querySelectorAll) {
      return t.querySelectorAll("." + e);
    }
    /** @type {NodeList} */
    t = t.getElementsByTagName("*");
    /** @type {RegExp} */
    e = RegExp("(^|\\s)" + e + "(\\s|$)");
    /** @type {number} */
    ii = 0;
    for (;ii < t.length;ii++) {
      if (e.test(t[ii].className)) {
        ret.push(t[ii]);
      }
    }
    return ret;
  };
}
if (!String.prototype.trim) {
  /**
   * @return {string}
   */
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, "");
  };
}
if (!Date.now) {
  /**
   * @return {number}
   */
  Date.now = function() {
    return+new Date;
  };
}
if (!Function.prototype.bind) {
  /**
   * @param {(Object|null|undefined)} oThis
   * @return {Function}
   */
  Function.prototype.bind = function(oThis) {
    /**
     * @return {?}
     */
    function fBound() {
      return fToBind.apply(this instanceof fNOP && oThis ? this : oThis, args.concat(Array.prototype.slice.call(arguments)));
    }
    /**
     * @return {undefined}
     */
    function fNOP() {
    }
    if ("function" !== typeof this) {
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }
    /** @type {Array.<?>} */
    var args = Array.prototype.slice.call(arguments, 1);
    /** @type {Function} */
    var fToBind = this;
    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP;
    return fBound;
  };
}
/**
 * @param {string} name
 * @return {?}
 */
function d(name) {
  /**
   * @param {Object} results
   * @return {?}
   */
  function makeArray(results) {
    /** @type {Array} */
    var ret = [];
    if (!results) {
      return ret;
    }
    if ("undefined" === typeof results.length) {
      return[results];
    }
    /** @type {number} */
    var i = 0;
    var l = results.length;
    for (;i < l;i++) {
      ret.push(results[i]);
    }
    return ret;
  }
  var query = name.substring(1, name.length);
  switch(name.charAt(0)) {
    case "#":
      return document.getElementById(query);
    case ".":
      return makeArray(document.getElementsByClassName(query));
    default:
      return makeArray(document.getElementsByTagName(name));
  }
}
var B = B ? B : {};
B.N = function() {
  /** @type {Array} */
  var spec = [];
  /** @type {boolean} */
  var known = false;
  /** @type {boolean} */
  var done = false;
  var valueAccessor;
  return function(func) {
    /**
     * @return {undefined}
     */
    function poll() {
      try {
        root.doScroll("left");
      } catch (b) {
        setTimeout(poll, 50);
        return;
      }
      init("poll");
    }
    /**
     * @param {Event} e
     * @return {undefined}
     */
    function init(e) {
      if ("readystatechange" != e.type || "complete" == doc.readyState) {
        if (("load" == e.type ? win : doc)[rem](pre + e.type, init, false), !done && (done = true)) {
          for (;valueAccessor = spec.shift();) {
            valueAccessor();
          }
        }
      }
    }
    if (done) {
      return func();
    }
    /** @type {Window} */
    var win = window;
    /** @type {boolean} */
    var G = true;
    /** @type {Document} */
    var doc = win.document;
    /** @type {Element} */
    var root = doc.documentElement;
    /** @type {string} */
    var add = doc.addEventListener ? "addEventListener" : "attachEvent";
    /** @type {string} */
    var rem = doc.addEventListener ? "removeEventListener" : "detachEvent";
    /** @type {string} */
    var pre = doc.addEventListener ? "" : "on";
    if ("complete" == doc.readyState) {
      func();
    } else {
      if (spec.push(func), !known && (known = true)) {
        if (doc.createEventObject && root.doScroll) {
          try {
            /** @type {boolean} */
            G = !win.frameElement;
          } catch (I) {
          }
          if (G) {
            poll();
          }
        }
        doc[add](pre + "DOMContentLoaded", init, false);
        doc[add](pre + "readystatechange", init, false);
        win[add](pre + "load", init, false);
      }
    }
  };
}();
B.event = {
  /** @type {function (HTMLElement, string, Function): undefined} */
  add : "undefined" !== typeof addEventListener ? function(element, event, fn) {
    element.addEventListener(event, fn, false);
  } : function(element, event, fn) {
    element.attachEvent("on" + event, fn);
  },
  /** @type {function (Element, string, Function): undefined} */
  remove : "undefined" !== typeof removeEventListener ? function(d, e, action) {
    d.removeEventListener(e, action, false);
  } : function(o, e, listener) {
    o.detachEvent("on" + e, listener);
  },
  /** @type {function (Object): ?} */
  u : "undefined" !== typeof addEventListener ? function(arg) {
    return arg.target;
  } : function(ast) {
    return ast.srcElement;
  },
  /** @type {function (Object): undefined} */
  preventDefault : "undefined" !== typeof addEventListener ? function(ast) {
    ast.preventDefault();
  } : function(ast) {
    /** @type {boolean} */
    ast.returnValue = false;
  },
  /**
   * @param {Object} e
   * @return {undefined}
   */
  oa : function(e) {
    /** @type {boolean} */
    e.cancelBubble = true;
    if ("undefined" !== typeof e.stopPropagation) {
      e.stopPropagation();
    }
  },
  isSupported : function() {
    var TAGNAMES = {
      select : "input",
      change : "input",
      submit : "form",
      reset : "form",
      error : "img",
      load : "img",
      abort : "img"
    };
    return function(eventName) {
      /** @type {Element} */
      var el = document.createElement(TAGNAMES[eventName] || "div");
      /** @type {string} */
      eventName = "on" + eventName;
      /** @type {boolean} */
      var isSupported = eventName in el;
      if (!isSupported) {
        el.setAttribute(eventName, "return;");
        /** @type {boolean} */
        isSupported = "function" == typeof el[eventName];
      }
      return isSupported;
    };
  }()
};
B.V = {
  fa : 20,
  aa : {
    X : '{"error":{"type":"tech","message":"\u041f\u0440\u043e\u0438\u0437\u043e\u0448\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0430. \u041f\u0440\u043e\u0432\u0435\u0440\u044c\u0442\u0435 \u0441\u043e\u0435\u0434\u0438\u043d\u0435\u043d\u0438\u0435 \u0438\u043b\u0438 \u043f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u043f\u043e\u0437\u0436\u0435."}}',
    ma : '{"error":{"type":"tech","message":"\u041f\u0440\u043e\u0438\u0437\u043e\u0448\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0430. \u041f\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0443 \u0438\u043b\u0438 \u043f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u043f\u043e\u0437\u0436\u0435."}}'
  },
  /**
   * @param {Object} codeSegments
   * @return {?}
   */
  o : function(codeSegments) {
    if (codeSegments && this.o.hasOwnProperty("r")) {
      return this.o.D;
    }
    if ("undefined" !== typeof XMLHttpRequest) {
      return this.o.D = new XMLHttpRequest, this.o.D;
    }
    /** @type {Array} */
    codeSegments = ["MSXML2.XmlHttp.6.0", "MSXML2.XmlHttp.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"];
    /** @type {number} */
    var i = 0;
    for (;i < codeSegments.length;i++) {
      try {
        return this.o.D = new ActiveXObject(codeSegments[i]), this.o.D;
      } catch (a) {
      }
    }
    alert("Your browser does not support XmlHttp");
    return null;
  },
  /**
   * @return {?}
   */
  qa : function() {
    if (this.o.hasOwnProperty("r")) {
      return this.o.D.abort();
    }
  },
  /**
   * @param {string} type
   * @param {string} target
   * @param {?} body
   * @param {Function} $
   * @param {string} value
   * @return {undefined}
   */
  I : function(type, target, body, $, value) {
    var xmlhttp = this.o();
    var tref;
    var evt = this.aa;
    target = target.substr(0, (window.location.protocol + window.location.hostname).length + 6) + "/" + target.substr((window.location.protocol + window.location.hostname).length + 11);
    /** @type {string} */
    target = target + (0 < target.indexOf("?") ? "&" : "?") + "ts=" + Date.now();
    xmlhttp.open(type, target);
    if (value) {
      xmlhttp.setRequestHeader("Content-Type", value);
    }
    /**
     * @return {undefined}
     */
    xmlhttp.onreadystatechange = function() {
      if (4 === xmlhttp.readyState) {
        var sjax_status = xmlhttp.status;
        clearTimeout(tref);
        if (200 <= sjax_status && 300 > sjax_status || 304 === sjax_status) {
          $(xmlhttp.responseText);
        } else {
          if (0 === sjax_status) {
            $(evt.X);
          } else {
            $(evt.ma);
          }
        }
      }
    };
    xmlhttp.send(body);
    /** @type {number} */
    tref = setTimeout(function() {
      xmlhttp.abort();
    }, 1E3 * this.fa);
  },
  /**
   * @param {string} elements
   * @param {Function} options
   * @return {undefined}
   */
  S : function(elements, options) {
    this.I("GET", elements, null, options);
  },
  /**
   * @param {Object} els
   * @return {?}
   */
  ca : function(els) {
    /** @type {Array} */
    var tagNameArr = [];
    els = els.elements;
    /** @type {number} */
    var i = 0;
    var len = els.length;
    var el;
    for (;i < len;i++) {
      if (el = els[i], !el.disabled && el.name) {
        switch(el.type) {
          case "radio":
          ;
          case "checkbox":
            if (!el.checked) {
              continue;
            }
          ;
        }
        tagNameArr.push(encodeURIComponent(el.name) + "=" + encodeURIComponent(el.value));
      }
    }
    return tagNameArr.join("&");
  },
  /**
   * @param {?} value
   * @param {?} s
   * @param {Function} code
   * @return {undefined}
   */
  h : function(value, s, code) {
    this.I("POST", value, this.ca(s), code, "application/x-www-form-urlencoded");
  },
  /**
   * @param {string} existing
   * @param {?} action
   * @param {Function} jQuery
   * @return {undefined}
   */
  ta : function(existing, action, jQuery) {
    this.I("POST", existing, action, jQuery);
  }
};
B.cookie = {
  /**
   * @return {?}
   */
  enabled : function() {
    if (navigator.cookieEnabled) {
      return true;
    }
    /** @type {string} */
    document.cookie = "cookietest=1";
    /** @type {boolean} */
    var results = -1 != document.cookie.indexOf("cookietest=");
    this.$("cookietest");
    return results;
  },
  /**
   * @param {string} key
   * @param {string} value
   * @param {(Function|string)} expires
   * @return {undefined}
   */
  set : function(key, value, expires) {
    if (expires) {
      /** @type {Date} */
      var date = new Date;
      date.setTime(date.getTime() + 1E3 * expires);
      /** @type {string} */
      expires = "; expires=" + date.toGMTString();
    } else {
      /** @type {string} */
      expires = "";
    }
    /** @type {string} */
    value = encodeURIComponent(value);
    /** @type {string} */
    document.cookie = key + "=" + value + expires + "; path=/";
  },
  /**
   * @param {RegExp} regex
   * @return {?}
   */
  get : function(regex) {
    /** @type {null} */
    var value = null;
    /** @type {Array.<string>} */
    var codeSegments = document.cookie.split(";");
    /** @type {RegExp} */
    regex = RegExp("^\\s*" + regex + "=\\s*(.*?)\\s*$");
    var match;
    /** @type {number} */
    var i = 0;
    for (;i < codeSegments.length;i++) {
      if (match = codeSegments[i].match(regex)) {
        /** @type {string} */
        value = decodeURIComponent(match[1]);
        break;
      }
    }
    return value;
  },
  /**
   * @param {string} n
   * @return {undefined}
   */
  $ : function(n) {
    /** @type {string} */
    document.cookie = n + "=; expires=Thu, 01-Jan-1970 00:00:01 GMT";
  }
};
B.style = {
  /**
   * @param {Element} n
   * @param {string} key
   * @return {?}
   */
  v : function(n, key) {
    return n.className.match(RegExp("(\\s|^)" + key + "(\\s|$)"));
  },
  /**
   * @param {?} a
   * @param {string} key
   * @return {undefined}
   */
  d : function(a, key) {
    if (!this.v(a, key)) {
      a.className += "" === a.className ? key : " " + key;
    }
  },
  /**
   * @param {?} d
   * @param {string} key
   * @return {undefined}
   */
  b : function(d, key) {
    if (this.v(d, key)) {
      d.className = d.className.replace(RegExp("(\\s|^)" + key + "(\\s|$)"), " ").trim();
    }
  },
  /**
   * @param {Element} d
   * @param {string} storageKey
   * @return {undefined}
   */
  xa : function(d, storageKey) {
    if (this.v(d, storageKey)) {
      this.b(d, storageKey);
    } else {
      this.d(d, storageKey);
    }
  },
  /**
   * @param {Element} ps
   * @param {Object} helper
   * @return {undefined}
   */
  set : function(ps, helper) {
    var key;
    for (key in helper) {
      ps.style[key] = helper[key];
    }
  },
  /**
   * @param {Element} elem
   * @param {string} name
   * @return {?}
   */
  get : function(elem, name) {
    return window.getComputedStyle(elem, null).getPropertyValue(name);
  }
};
B.G = {
  /**
   * @param {string} url
   * @return {undefined}
   */
  w : function(url) {
    if (window.location.href != url) {
      /** @type {string} */
      window.location = url;
    } else {
      window.location.reload();
    }
  },
  /**
   * @param {Object} libraryName
   * @param {?} fncCallback
   * @return {undefined}
   */
  ea : function(libraryName, fncCallback) {
    /** @type {Element} */
    var script = document.createElement("script");
    /** @type {string} */
    script.type = "text/javascript";
    if (script.readyState) {
      /**
       * @return {undefined}
       */
      script.onreadystatechange = function() {
        if ("loaded" == script.readyState || "complete" == script.readyState) {
          /** @type {null} */
          script.onreadystatechange = null;
          fncCallback();
        }
      };
    } else {
      /**
       * @return {undefined}
       */
      script.onload = function() {
        fncCallback();
      };
    }
    /** @type {Object} */
    script.src = libraryName;
    document.getElementsByTagName("head")[0].appendChild(script);
  },
  /**
   * @param {Node} t
   * @return {?}
   */
  t : function(t) {
    do {
      if ("form" === t.nodeName.toLowerCase()) {
        return t;
      }
    } while (t = t.parentNode);
    return null;
  },
  /**
   * @param {Array} keys
   * @return {?}
   */
  sa : function(keys) {
    /** @type {Array} */
    var rv = [];
    if (!keys) {
      return rv;
    }
    if ("undefined" === typeof keys.length) {
      return[keys];
    }
    /** @type {number} */
    var i = 0;
    var il = keys.length;
    for (;i < il;i++) {
      rv.push(keys[i]);
    }
    return rv;
  },
  /**
   * @param {string} attribute
   * @param {Function} one
   * @param {Object} values
   * @return {undefined}
   */
  J : function(attribute, one, values) {
    if (!values) {
      /** @type {Array} */
      values = B.event.isSupported("input") ? ["keyup", "input"] : ["keyup", "change"];
    }
    /** @type {number} */
    var i = 0;
    var valuesLen = values.length;
    for (;i < valuesLen;i++) {
      B.event.add(attribute, values[i], one);
    }
  },
  /**
   * @param {?} msg
   * @return {?}
   */
  ba : function(msg) {
    /** @type {Element} */
    var logger = document.createElement("div");
    logger.appendChild(document.createTextNode(msg));
    return logger.innerHTML;
  },
  /**
   * @param {?} cls
   * @return {?}
   */
  L : function(cls) {
    return/^([_A-Za-z0-9-])+(\.[_A-Za-z0-9-]+)*@([A-Za-z0-9-]+)(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,4})$/.test(cls);
  },
  /**
   * @param {Object} d
   * @return {undefined}
   */
  U : function(d) {
    /** @type {Object} */
    this.l = d;
    this.Z = (d = B.style.get(this.l, "height")) ? parseInt(d) : this.l.clientHeight;
    /**
     * @return {undefined}
     */
    this.refresh = function() {
      var maxlength = this.l.getAttribute("maxlength");
      if (maxlength) {
        if (this.l.value.length > maxlength) {
          this.l.value = this.l.value.substr(0, maxlength);
        }
      }
      this.s.value = this.l.value;
      /** @type {string} */
      this.l.style.height = Math.max(this.s.scrollHeight, this.Z) + "px";
    };
    this.s = this.l.cloneNode(false);
    /** @type {string} */
    this.s.id = this.s.name = "s-" + this.l.id;
    /** @type {boolean} */
    this.s.disabled = true;
    B.style.set(this.s, {
      overflowY : "hidden",
      position : "absolute",
      top : "0",
      height : "0",
      visibility : "hidden",
      zIndex : "-10000"
    });
    this.l.parentNode.appendChild(this.s);
    /** @type {string} */
    this.l.style.overflowY = "hidden";
    B.G.J(this.l, this.refresh.bind(this));
  }
};
(function() {
  /** @type {boolean} */
  var step = true;
  /** @type {null} */
  var item = null;
  (function(dataAndEvents) {
    /**
     * @param {string} name
     * @return {?}
     */
    function has(name) {
      if ("bug-string-char-index" == name) {
        return "a" != "a"[0];
      }
      var value;
      /** @type {boolean} */
      var json_parse = "json" == name;
      if (json_parse || ("json-stringify" == name || "json-parse" == name)) {
        if ("json-stringify" == name || json_parse) {
          var stringify = JSON3.stringify;
          var stringifySupported = "function" == typeof stringify && isExtended;
          if (stringifySupported) {
            /** @type {function (): ?} */
            (value = function() {
              return 1;
            }).toJSON = value;
            try {
              /** @type {boolean} */
              stringifySupported = "0" === stringify(0) && ("0" === stringify(new Number) && ('""' == stringify(new String) && (stringify(getClass) === undef && (stringify(undef) === undef && (stringify() === undef && ("1" === stringify(value) && ("[1]" == stringify([value]) && ("[null]" == stringify([undef]) && ("null" == stringify(item) && ("[null,null,null]" == stringify([undef, getClass, item]) && ('{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}' == stringify({
                M : [value, step, false, item, "\x00\b\n\f\r\t"]
              }) && ("1" === stringify(item, value) && ("[\n 1,\n 2\n]" == stringify([1, 2], item, 1) && ('"-271821-04-20T00:00:00.000Z"' == stringify(new Date(-864E13)) && ('"+275760-09-13T00:00:00.000Z"' == stringify(new Date(864E13)) && ('"-000001-01-01T00:00:00.000Z"' == stringify(new Date(-621987552E5)) && '"1969-12-31T23:59:59.999Z"' == stringify(new Date(-1))))))))))))))))));
            } catch (l) {
              /** @type {boolean} */
              stringifySupported = false;
            }
          }
          if (!json_parse) {
            return stringifySupported;
          }
        }
        if ("json-parse" == name || json_parse) {
          name = JSON3.parse;
          if ("function" == typeof name) {
            try {
              if (0 === name("0") && !name(false)) {
                value = name('{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}');
                /** @type {boolean} */
                var parseSupported = 5 == value.M.length && 1 === value.M[0];
                if (parseSupported) {
                  try {
                    /** @type {boolean} */
                    parseSupported = !name('"\t"');
                  } catch (s) {
                  }
                  if (parseSupported) {
                    try {
                      /** @type {boolean} */
                      parseSupported = 1 !== name("01");
                    } catch (t) {
                    }
                  }
                }
              }
            } catch (n) {
              /** @type {boolean} */
              parseSupported = false;
            }
          }
          if (!json_parse) {
            return parseSupported;
          }
        }
        return stringifySupported && parseSupported;
      }
    }
    /** @type {function (this:*): string} */
    var getClass = {}.toString;
    var isProperty;
    var forEach;
    var undef;
    var isLoader = "function" === typeof define && define.ra;
    var JSON3 = "object" == typeof exports && exports;
    if (JSON3 || isLoader) {
      if ("object" == typeof JSON && JSON) {
        if (JSON3) {
          /** @type {function (this:JSONType, *, (Array.<string>|function (string, *): *|null)=, (number|string)=): string} */
          JSON3.stringify = JSON.stringify;
          /** @type {function (this:JSONType, string, function (string, *): *=): *} */
          JSON3.parse = JSON.parse;
        } else {
          /** @type {JSONType} */
          JSON3 = JSON;
        }
      } else {
        if (isLoader) {
          JSON3 = dataAndEvents.JSON = {};
        }
      }
    } else {
      JSON3 = dataAndEvents.JSON || (dataAndEvents.JSON = {});
    }
    /** @type {Date} */
    var isExtended = new Date(-0xc782b5b800cec);
    try {
      /** @type {boolean} */
      isExtended = -109252 == isExtended.getUTCFullYear() && (0 === isExtended.getUTCMonth() && (1 === isExtended.getUTCDate() && (10 == isExtended.getUTCHours() && (37 == isExtended.getUTCMinutes() && (6 == isExtended.getUTCSeconds() && 708 == isExtended.getUTCMilliseconds())))));
    } catch (L) {
    }
    if (!has("json")) {
      var charIndexBuggy = has("bug-string-char-index");
      if (!isExtended) {
        /** @type {function (*): number} */
        var floor = Math.floor;
        /** @type {Array} */
        var clt = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
        /**
         * @param {number} n
         * @param {number} value
         * @return {?}
         */
        var pad = function(n, value) {
          return clt[value] + 365 * (n - 1970) + floor((n - 1969 + (value = +(1 < value))) / 4) - floor((n - 1901 + value) / 100) + floor((n - 1601 + value) / 400);
        };
      }
      if (!(isProperty = {}.hasOwnProperty)) {
        /**
         * @param {string} key
         * @return {?}
         */
        isProperty = function(key) {
          var obj = {};
          var constructor;
          if ((obj.__proto__ = item, obj.__proto__ = {
            toString : 1
          }, obj).toString != getClass) {
            /**
             * @param {boolean} key
             * @return {?}
             */
            isProperty = function(key) {
              var original = this.__proto__;
              /** @type {boolean} */
              key = key in (this.__proto__ = item, this);
              this.__proto__ = original;
              return key;
            };
          } else {
            /** @type {(Function|null)} */
            constructor = obj.constructor;
            /**
             * @param {string} key
             * @return {?}
             */
            isProperty = function(key) {
              var parent = (this.constructor || constructor).prototype;
              return key in this && !(key in parent && this[key] === parent[key]);
            };
          }
          /** @type {null} */
          obj = item;
          return isProperty.call(this, key);
        };
      }
      var collection = {
        "boolean" : 1,
        ua : 1,
        wa : 1,
        ya : 1
      };
      /**
       * @param {?} object
       * @param {Function} callback
       * @return {undefined}
       */
      forEach = function(object, callback) {
        /** @type {number} */
        var forEach = 0;
        var Properties;
        var members;
        var property;
        /** @type {number} */
        (Properties = function() {
          /** @type {number} */
          this.valueOf = 0;
        }).prototype.valueOf = 0;
        members = new Properties;
        for (property in members) {
          if (isProperty.call(members, property)) {
            forEach++;
          }
        }
        /** @type {null} */
        Properties = members = item;
        if (forEach) {
          /** @type {function (?, Function): undefined} */
          forEach = 2 == forEach ? function(object, callback) {
            var members = {};
            /** @type {boolean} */
            var prototype = "[object Function]" == getClass.call(object);
            var property;
            for (property in object) {
              if (!(prototype && "prototype" == property)) {
                if (!isProperty.call(members, property)) {
                  if (members[property] = 1) {
                    if (isProperty.call(object, property)) {
                      callback(property);
                    }
                  }
                }
              }
            }
          } : function(object, callback) {
            /** @type {boolean} */
            var prototype = "[object Function]" == getClass.call(object);
            var property;
            var isConstructor;
            for (property in object) {
              if (!(prototype && "prototype" == property)) {
                if (!!isProperty.call(object, property)) {
                  if (!(isConstructor = "constructor" === property)) {
                    callback(property);
                  }
                }
              }
            }
            if (isConstructor || isProperty.call(object, property = "constructor")) {
              callback(property);
            }
          };
        } else {
          /** @type {Array.<string>} */
          members = "valueOf toString toLocaleString propertyIsEnumerable isPrototypeOf hasOwnProperty constructor".split(" ");
          /**
           * @param {?} object
           * @param {Function} callback
           * @return {undefined}
           */
          forEach = function(object, callback) {
            /** @type {boolean} */
            var length = "[object Function]" == getClass.call(object);
            var property;
            var method;
            if (method = !length) {
              if (method = "function" != typeof object.constructor) {
                /** @type {string} */
                method = typeof object.hasOwnProperty;
                /** @type {boolean} */
                method = "object" == method ? !!object.hasOwnProperty : !collection[method];
              }
            }
            method = method ? object.hasOwnProperty : isProperty;
            for (property in object) {
              if (!(length && "prototype" == property)) {
                if (!!method.call(object, property)) {
                  callback(property);
                }
              }
            }
            length = members.length;
            for (;property = members[--length];method.call(object, property) && callback(property)) {
            }
          };
        }
        forEach(object, callback);
      };
      if (!has("json-stringify")) {
        var chrTable = {
          92 : "\\\\",
          34 : '\\"',
          8 : "\\b",
          12 : "\\f",
          10 : "\\n",
          13 : "\\r",
          9 : "\\t"
        };
        /**
         * @param {number} opt_attributes
         * @param {number} value
         * @return {?}
         */
        var toPaddedString = function(opt_attributes, value) {
          return("000000" + (value || 0)).slice(-opt_attributes);
        };
        /**
         * @param {string} value
         * @return {?}
         */
        var quote = function(value) {
          /** @type {string} */
          var result = '"';
          /** @type {number} */
          var index = 0;
          var length = value.length;
          var isLarge = 10 < length && charIndexBuggy;
          var symbols;
          if (isLarge) {
            symbols = value.split("");
          }
          for (;index < length;index++) {
            var i = value.charCodeAt(index);
            switch(i) {
              case 8:
              ;
              case 9:
              ;
              case 10:
              ;
              case 12:
              ;
              case 13:
              ;
              case 34:
              ;
              case 92:
                result += chrTable[i];
                break;
              default:
                if (32 > i) {
                  result += "\\u00" + toPaddedString(2, i.toString(16));
                  break;
                }
                result += isLarge ? symbols[index] : charIndexBuggy ? value.charAt(index) : value[index];
            }
          }
          return result + '"';
        };
        /**
         * @param {number} property
         * @param {string} object
         * @param {Function} callback
         * @param {number} properties
         * @param {boolean} whitespace
         * @param {string} indentation
         * @param {Array} stack
         * @return {?}
         */
        var serialize = function(property, object, callback, properties, whitespace, indentation, stack) {
          var value = object[property];
          var element;
          var width;
          var date;
          var minutes;
          var hours;
          var udataCur;
          var pdataOld;
          var results;
          var hasMembers;
          try {
            value = object[property];
          } catch (D) {
          }
          if ("object" == typeof value && value) {
            if (element = getClass.call(value), "[object Date]" != element || isProperty.call(value, "toJSON")) {
              if ("function" == typeof value.toJSON) {
                if ("[object Number]" != element && ("[object String]" != element && "[object Array]" != element) || isProperty.call(value, "toJSON")) {
                  value = value.toJSON(property);
                }
              }
            } else {
              if (value > -1 / 0 && value < 1 / 0) {
                if (pad) {
                  /** @type {number} */
                  date = floor(value / 864E5);
                  /** @type {number} */
                  element = floor(date / 365.2425) + 1970 - 1;
                  for (;pad(element + 1, 0) <= date;element++) {
                  }
                  /** @type {number} */
                  width = floor((date - pad(element, 0)) / 30.42);
                  for (;pad(element, width + 1) <= date;width++) {
                  }
                  /** @type {number} */
                  date = 1 + date - pad(element, width);
                  /** @type {number} */
                  minutes = (value % 864E5 + 864E5) % 864E5;
                  /** @type {number} */
                  hours = floor(minutes / 36E5) % 24;
                  /** @type {number} */
                  udataCur = floor(minutes / 6E4) % 60;
                  /** @type {number} */
                  pdataOld = floor(minutes / 1E3) % 60;
                  minutes %= 1E3;
                } else {
                  element = value.getUTCFullYear();
                  width = value.getUTCMonth();
                  date = value.getUTCDate();
                  hours = value.getUTCHours();
                  udataCur = value.getUTCMinutes();
                  pdataOld = value.getUTCSeconds();
                  minutes = value.getUTCMilliseconds();
                }
                /** @type {string} */
                value = (0 >= element || 1E4 <= element ? (0 > element ? "-" : "+") + toPaddedString(6, 0 > element ? -element : element) : toPaddedString(4, element)) + "-" + toPaddedString(2, width + 1) + "-" + toPaddedString(2, date) + "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, udataCur) + ":" + toPaddedString(2, pdataOld) + "." + toPaddedString(3, minutes) + "Z";
              } else {
                /** @type {null} */
                value = item;
              }
            }
          }
          if (callback) {
            value = callback.call(object, property, value);
          }
          if (value === item) {
            return "null";
          }
          /** @type {string} */
          element = getClass.call(value);
          if ("[object Boolean]" == element) {
            return "" + value;
          }
          if ("[object Number]" == element) {
            return value > -1 / 0 && value < 1 / 0 ? "" + value : "null";
          }
          if ("[object String]" == element) {
            return quote("" + value);
          }
          if ("object" == typeof value) {
            property = stack.length;
            for (;property--;) {
              if (stack[property] === value) {
                throw TypeError();
              }
            }
            stack.push(value);
            /** @type {Array} */
            results = [];
            /** @type {string} */
            object = indentation;
            indentation += whitespace;
            if ("[object Array]" == element) {
              /** @type {number} */
              width = 0;
              property = value.length;
              for (;width < property;hasMembers || (hasMembers = step), width++) {
                element = serialize(width, value, callback, properties, whitespace, indentation, stack);
                results.push(element === undef ? "null" : element);
              }
              /** @type {string} */
              property = hasMembers ? whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + object + "]" : "[" + results.join(",") + "]" : "[]";
            } else {
              forEach(properties || value, function(property) {
                var element = serialize(property, value, callback, properties, whitespace, indentation, stack);
                if (element !== undef) {
                  results.push(quote(property) + ":" + (whitespace ? " " : "") + element);
                }
                if (!hasMembers) {
                  /** @type {boolean} */
                  hasMembers = step;
                }
              });
              /** @type {string} */
              property = hasMembers ? whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + object + "}" : "{" + results.join(",") + "}" : "{}";
            }
            stack.pop();
            return property;
          }
        };
        /**
         * @param {?} source
         * @param {(Function|string)} a
         * @param {string} width
         * @return {?}
         */
        JSON3.stringify = function(source, a, width) {
          var whitespace;
          var restoreScript;
          var properties;
          if ("function" == typeof a || "object" == typeof a && a) {
            if ("[object Function]" == getClass.call(a)) {
              /** @type {(Function|string)} */
              restoreScript = a;
            } else {
              if ("[object Array]" == getClass.call(a)) {
                properties = {};
                /** @type {number} */
                var ai = 0;
                var al = a.length;
                var value;
                for (;ai < al;value = a[ai++], ("[object String]" == getClass.call(value) || "[object Number]" == getClass.call(value)) && (properties[value] = 1)) {
                }
              }
            }
          }
          if (width) {
            if ("[object Number]" == getClass.call(width)) {
              if (0 < (width -= width % 1)) {
                /** @type {string} */
                whitespace = "";
                if (10 < width) {
                  /** @type {number} */
                  width = 10;
                }
                for (;whitespace.length < width;whitespace += " ") {
                }
              }
            } else {
              if ("[object String]" == getClass.call(width)) {
                whitespace = 10 >= width.length ? width : width.slice(0, 10);
              }
            }
          }
          return serialize("", (value = {}, value[""] = source, value), restoreScript, properties, whitespace, "", []);
        };
      }
      if (!has("json-parse")) {
        /** @type {function (...[number]): string} */
        var from = String.fromCharCode;
        var SIMPLE_ESCAPE_SEQUENCES = {
          92 : "\\",
          34 : '"',
          47 : "/",
          98 : "\b",
          116 : "\t",
          110 : "\n",
          102 : "\f",
          114 : "\r"
        };
        var i;
        var path;
        /**
         * @return {undefined}
         */
        var abort = function() {
          /** @type {null} */
          i = path = item;
          throw SyntaxError();
        };
        /**
         * @return {?}
         */
        var lex = function() {
          var template = path;
          var len = template.length;
          var result;
          var match;
          var j;
          var n;
          var character;
          for (;i < len;) {
            switch(character = template.charCodeAt(i), character) {
              case 9:
              ;
              case 10:
              ;
              case 13:
              ;
              case 32:
                i++;
                break;
              case 123:
              ;
              case 125:
              ;
              case 91:
              ;
              case 93:
              ;
              case 58:
              ;
              case 44:
                return result = charIndexBuggy ? template.charAt(i) : template[i], i++, result;
              case 34:
                /** @type {string} */
                result = "@";
                i++;
                for (;i < len;) {
                  if (character = template.charCodeAt(i), 32 > character) {
                    abort();
                  } else {
                    if (92 == character) {
                      switch(character = template.charCodeAt(++i), character) {
                        case 92:
                        ;
                        case 34:
                        ;
                        case 47:
                        ;
                        case 98:
                        ;
                        case 116:
                        ;
                        case 110:
                        ;
                        case 102:
                        ;
                        case 114:
                          result += SIMPLE_ESCAPE_SEQUENCES[character];
                          i++;
                          break;
                        case 117:
                          /** @type {number} */
                          match = ++i;
                          j = i + 4;
                          for (;i < j;i++) {
                            character = template.charCodeAt(i);
                            if (!(48 <= character && 57 >= character)) {
                              if (!(97 <= character && 102 >= character)) {
                                if (!(65 <= character && 70 >= character)) {
                                  abort();
                                }
                              }
                            }
                          }
                          result += from("0x" + template.slice(match, i));
                          break;
                        default:
                          abort();
                      }
                    } else {
                      if (34 == character) {
                        break;
                      }
                      character = template.charCodeAt(i);
                      match = i;
                      for (;32 <= character && (92 != character && 34 != character);) {
                        character = template.charCodeAt(++i);
                      }
                      result += template.slice(match, i);
                    }
                  }
                }
                if (34 == template.charCodeAt(i)) {
                  return i++, result;
                }
                abort();
              default:
                match = i;
                if (45 == character) {
                  /** @type {boolean} */
                  n = step;
                  character = template.charCodeAt(++i);
                }
                if (48 <= character && 57 >= character) {
                  if (48 == character) {
                    if (character = template.charCodeAt(i + 1), 48 <= character && 57 >= character) {
                      abort();
                    }
                  }
                  for (;i < len && (character = template.charCodeAt(i), 48 <= character && 57 >= character);i++) {
                  }
                  if (46 == template.charCodeAt(i)) {
                    /** @type {number} */
                    j = ++i;
                    for (;j < len && (character = template.charCodeAt(j), 48 <= character && 57 >= character);j++) {
                    }
                    if (j == i) {
                      abort();
                    }
                    /** @type {number} */
                    i = j;
                  }
                  character = template.charCodeAt(i);
                  if (101 == character || 69 == character) {
                    character = template.charCodeAt(++i);
                    if (!(43 != character && 45 != character)) {
                      i++;
                    }
                    /** @type {(null|number)} */
                    j = i;
                    for (;j < len && (character = template.charCodeAt(j), 48 <= character && 57 >= character);j++) {
                    }
                    if (j == i) {
                      abort();
                    }
                    /** @type {(null|number)} */
                    i = j;
                  }
                  return+template.slice(match, i);
                }
                if (n) {
                  abort();
                }
                if ("true" == template.slice(i, i + 4)) {
                  return i += 4, step;
                }
                if ("false" == template.slice(i, i + 5)) {
                  return i += 5, false;
                }
                if ("null" == template.slice(i, i + 4)) {
                  return i += 4, item;
                }
                abort();
            }
          }
          return "$";
        };
        /**
         * @param {string} value
         * @return {?}
         */
        var get = function(value) {
          var results;
          var n;
          if ("$" == value) {
            abort();
          }
          if ("string" == typeof value) {
            if ("@" == (charIndexBuggy ? value.charAt(0) : value[0])) {
              return value.slice(1);
            }
            if ("[" == value) {
              /** @type {Array} */
              results = [];
              for (;;n || (n = step)) {
                value = lex();
                if ("]" == value) {
                  break;
                }
                if (n) {
                  if ("," == value) {
                    value = lex();
                    if ("]" == value) {
                      abort();
                    }
                  } else {
                    abort();
                  }
                }
                if ("," == value) {
                  abort();
                }
                results.push(get(value));
              }
              return results;
            }
            if ("{" == value) {
              results = {};
              for (;;n || (n = step)) {
                value = lex();
                if ("}" == value) {
                  break;
                }
                if (n) {
                  if ("," == value) {
                    value = lex();
                    if ("}" == value) {
                      abort();
                    }
                  } else {
                    abort();
                  }
                }
                if (!("," != value && ("string" == typeof value && ("@" == (charIndexBuggy ? value.charAt(0) : value[0]) && ":" == lex())))) {
                  abort();
                }
                results[value.slice(1)] = get(lex());
              }
              return results;
            }
            abort();
          }
          return value;
        };
        /**
         * @param {Object} source
         * @param {string} property
         * @param {Function} element
         * @return {undefined}
         */
        var update = function(source, property, element) {
          element = walk(source, property, element);
          if (element === undef) {
            delete source[property];
          } else {
            /** @type {Function} */
            source[property] = element;
          }
        };
        /**
         * @param {Object} source
         * @param {string} property
         * @param {Function} callback
         * @return {?}
         */
        var walk = function(source, property, callback) {
          var value = source[property];
          var length;
          if ("object" == typeof value && value) {
            if ("[object Array]" == getClass.call(value)) {
              length = value.length;
              for (;length--;) {
                update(value, length, callback);
              }
            } else {
              forEach(value, function(property) {
                update(value, property, callback);
              });
            }
          }
          return callback.call(source, property, value);
        };
        /**
         * @param {Object} v02
         * @param {Function} callback
         * @return {?}
         */
        JSON3.parse = function(v02, callback) {
          var result;
          var value;
          /** @type {number} */
          i = 0;
          /** @type {string} */
          path = "" + v02;
          result = get(lex());
          if ("$" != lex()) {
            abort();
          }
          /** @type {null} */
          i = path = item;
          return callback && "[object Function]" == getClass.call(callback) ? walk((value = {}, value[""] = result, value), "", callback) : result;
        };
      }
    }
    if (isLoader) {
      define(function() {
        return JSON3;
      });
    }
  })(this);
})();
(function() {
  /**
   * @return {undefined}
   */
  function initialize() {
    /**
     * @param {Element} container
     * @param {Element} el
     * @return {?}
     */
    function initialize(container, el) {
      return function(e) {
        tag = container.innerHTML.replace(/<[^>]*>|\s+/g, "");
        txt = el.value.trim();
        if (self.v(el, "invalid")) {
          /** @type {string} */
          txt = "";
          self.b(el, "invalid");
        }
        txt = txt.replace(/\s*#[_0-9a-z\u0430-\u044f]+/gi, "");
        el.focus();
        /** @type {string} */
        el.value = txt ? txt + " " + tag + " " : tag + " ";
        callback(el);
        event.preventDefault(e);
      };
    }
    var failuresLink = d("#note-input");
    if (failuresLink) {
      var m = d("#trending-full");
      var i = d("#trending-mob");
      if (m) {
        if (i) {
          i.innerHTML = m.innerHTML;
        }
      }
      m = d(".trnd");
      /** @type {number} */
      i = 0;
      var n = m.length;
      for (;i < n;i++) {
        event.add(m[i], "click", initialize(m[i], failuresLink));
      }
    }
  }
  /**
   * @return {undefined}
   */
  function buildDeck() {
    event.add(document, "keydown", function(e) {
      if (13 === e.keyCode) {
        var t = event.u(e);
        if ("textarea" !== t.nodeName.toLowerCase() && (t = target.t(t))) {
          return event.preventDefault(e), cb(t), false;
        }
      }
    });
  }
  /**
   * @return {undefined}
   */
  function add() {
    /**
     * @param {Element} name
     * @param {?} obj
     * @return {?}
     */
    function func(name, obj) {
      return function() {
        if (name.value) {
          debug(obj);
        } else {
          i(obj);
        }
      };
    }
    /**
     * @param {Element} o
     * @param {?} url
     * @return {?}
     */
    function callback(o, url) {
      return function() {
        if (o.value) {
          debug(url);
        }
      };
    }
    var values = d(".placeholder");
    if (values) {
      /** @type {number} */
      var i = 0;
      var valuesLen = values.length;
      var name;
      for (;i < valuesLen;i++) {
        name = d("#" + values[i].htmlFor);
        setTimeout(callback(name, values[i]), 100);
        target.J(name, func(name, values[i]));
        event.add(name, "focus", func(name, values[i]));
      }
    }
  }
  /**
   * @return {undefined}
   */
  function addEvent() {
    /**
     * @param {StyleSheet} a
     * @return {?}
     */
    function fn(a) {
      return function(e) {
        var parts = a.href.split("#");
        if (parts[0] === window.location.href.split("#")[0]) {
          event.preventDefault(e);
          /** @type {string} */
          window.location = parts[0] + (window.location.search ? "&" : "?") + "go=1" + (parts[1] ? "#" + parts[1] : "");
        }
      };
    }
    /** @type {Array} */
    var context = [d("#menu-replies"), d("#link-replies"), d("#next-reply")];
    /** @type {number} */
    var i = 0;
    /** @type {number} */
    var j = context.length;
    for (;i < j;i++) {
      if (context[i]) {
        event.add(context[i], "click", fn(context[i]));
      }
    }
  }
  /**
   * @return {undefined}
   */
  function handler() {
    var element = d(".focused")[0];
    if (element) {
      element.focus();
      var container = d("#reply-input");
      var token = d("#new");
      if (container) {
        if (token) {
          if (element === container) {
            event.add(token, "focus", function() {
              container.focus();
            });
          }
        }
      }
    }
  }
  /**
   * @param {string} elem
   * @return {undefined}
   */
  function next(elem) {
    show();
    runTest();
    init();
    var values = d(".autosize");
    if ("undefined" === typeof values.length) {
      /** @type {Array} */
      values = [values];
    }
    /** @type {number} */
    var i = 0;
    var valuesLen = values.length;
    for (;i < valuesLen;i++) {
      self.b(values[i], "autosize");
      new target.U(values[i]);
    }
    test();
    fn(elem);
  }
  /**
   * @return {undefined}
   */
  function test() {
    /**
     * @param {?} e
     * @return {?}
     */
    function next(e) {
      return function() {
        debug(d("#reply"));
        i(d("#burn-box"));
        debug(d("#burnit-show"));
        i(d("#burnit-cancel"));
        d("#reply-input").blur();
        e.onclick = complete(e);
        return false;
      };
    }
    /**
     * @param {?} e
     * @return {?}
     */
    function complete(e) {
      return function() {
        debug(d("#burn-box"));
        i(d("#reply"));
        debug(d("#burnit-cancel"));
        i(d("#burnit-show"));
        e.onclick = next(e);
        var obj = d("#reply-input");
        var id;
        id = obj.value;
        /** @type {string} */
        obj.value = "";
        obj.focus();
        obj.value = id;
        return false;
      };
    }
    var e = d("#burnit");
    var that = d("#burn-cancel");
    if (e) {
      e.onclick = next(e);
      that.onclick = complete(e);
    }
  }
  /**
   * @return {undefined}
   */
  function f() {
    var timeout = d("#next");
    if (timeout) {
      if (timeout.offsetHeight) {
        event.add(document, "keydown", update);
      }
    }
  }
  /**
   * @param {(Function|string)} data
   * @return {undefined}
   */
  function apply(data) {
    if (!data) {
      /** @type {string} */
      data = "launch";
    }
    flush(data);
    i(d("#next"));
    f();
  }
  /**
   * @param {string} type
   * @return {undefined}
   */
  function flush(type) {
    if (!type) {
      /** @type {string} */
      type = "default";
    }
    if ("bin" === type || "launch" === type) {
      /** @type {string} */
      data.next.P = type;
    }
    if ("default" === type) {
      type = data.next.P;
    } else {
      if ("reply" === data.next.O) {
        return;
      }
    }
    /** @type {string} */
    data.next.O = type;
    switch(type) {
      case "reply":
        debug(d("#next-bin"));
        debug(d("#next-launch"));
        i(d("#next-reply"));
        break;
      case "launch":
        debug(d("#next-bin"));
        debug(d("#next-reply"));
        i(d("#next-launch"));
        break;
      case "bin":
        debug(d("#next-reply"));
        debug(d("#next-launch"));
        i(d("#next-bin"));
    }
  }
  /**
   * @return {undefined}
   */
  function setup() {
    /**
     * @param {Object} e
     * @return {undefined}
     */
    function init(e) {
      if (17 === e.keyCode) {
        if (init.q) {
          if (500 > Date.now() - init.q) {
            token.value += "#";
            callback(event.u(e));
            /** @type {number} */
            init.q = 0;
          } else {
            /** @type {number} */
            init.q = Date.now();
          }
        } else {
          /** @type {number} */
          init.q = Date.now();
        }
      } else {
        /** @type {number} */
        init.q = 0;
      }
    }
    var token = d("#note-input");
    if (token) {
      event.add(token, "keyup", init);
    }
  }
  /**
   * @param {Element} element
   * @return {undefined}
   */
  function callback(element) {
    if (element) {
      /** @type {null} */
      var evt = null;
      if (document.createEventObject) {
        evt = document.createEventObject();
        element.fireEvent("onkeyup", evt);
      } else {
        /** @type {(Event|null)} */
        evt = document.createEvent("KeyboardEvent");
        evt.initEvent("keyup", true, true);
        element.dispatchEvent(evt);
      }
    }
  }
  /**
   * @param {Object} e
   * @return {undefined}
   */
  function update(e) {
    var el = d("#next");
    if ((e.ctrlKey || e.metaKey) && (13 === e.keyCode && (el && el.offsetHeight))) {
      e = el.firstChild;
      do {
        if (e.offsetHeight) {
          if (e.href) {
            event.remove(document, "keydown", update);
            window.location = e.href;
          }
        }
      } while (e = e.nextSibling);
    }
  }
  /**
   * @param {?} string
   * @return {?}
   */
  function quote(string) {
    return target.ba(string).trim().replace(/\n/g, "<br>");
  }
  /**
   * @return {undefined}
   */
  function submit() {
    /** @type {string} */
    var url = encodeURIComponent(location.pathname.substr(1) + location.search + location.hash.replace("#", "[]"));
    /** @type {string} */
    window.location = "/login?ret=" + url;
  }
  /**
   * @param {?} options
   * @param {?} deepDataAndEvents
   * @return {undefined}
   */
  function value(options, deepDataAndEvents) {
    start(options, data.H, deepDataAndEvents);
    build(options);
  }
  /**
   * @param {string} val
   * @return {undefined}
   */
  function fn(val) {
    if (!val) {
      /** @type {string} */
      val = location.pathname.substr(1);
    }
    if ("" === val) {
      /** @type {string} */
      val = "index";
    }
    /** @type {string} */
    data.R = val;
  }
  /**
   * @param {?} src
   * @return {undefined}
   */
  function debug(src) {
    if (src) {
      if ("undefined" === typeof src.length) {
        /** @type {Array} */
        src = [src];
      }
      /** @type {number} */
      var j = 0;
      var l2 = src.length;
      for (;j < l2;j++) {
        self.d(src[j], "hide");
      }
    }
  }
  /**
   * @param {?} obj
   * @return {undefined}
   */
  function i(obj) {
    if (obj) {
      if ("undefined" === typeof obj.length) {
        /** @type {Array} */
        obj = [obj];
      }
      /** @type {number} */
      var i = 0;
      var l = obj.length;
      for (;i < l;i++) {
        self.b(obj[i], "hide");
      }
    }
  }
  /**
   * @return {undefined}
   */
  function runTest() {
    /**
     * @param {Object} p
     * @param {Error} options
     * @return {?}
     */
    function init(p, options) {
      var done = options.onsubmit;
      return function() {
        return "function" !== typeof done || done() ? "np" in p && (!start(options, "np", Date.now()) && p.np !== p.value) ? false : true : false;
      };
    }
    /**
     * @param {Element} input
     * @return {?}
     */
    function fn(input) {
      return function() {
        var maxlength = input.getAttribute("maxlength");
        var cnl = input.value.length;
        if (maxlength) {
          if (cnl > maxlength) {
            input.value = input.value.substr(0, maxlength);
          }
        }
        input.np = input.value;
      };
    }
    var elems = d(".np");
    if ("undefined" === typeof elems.length) {
      /** @type {Array} */
      elems = [elems];
    }
    /** @type {number} */
    var i = 0;
    var length = elems.length;
    var result;
    for (;i < length;i++) {
      /** @type {string} */
      elems[i].np = "";
      result = target.t(elems[i]);
      result.onsubmit = init(elems[i], result);
      /** @type {function (): ?} */
      elems[i].ondrop = elems[i].onpaste = elems[i].oncontextmenu = emptyHandler;
      result = fn(elems[i]);
      target.J(elems[i], result);
      setInterval(result, 1E3);
      self.b(elems[i], "np");
    }
  }
  /**
   * @return {undefined}
   */
  function init() {
    /**
     * @param {Object} e
     * @return {undefined}
     */
    function click(e) {
      if (e.ctrlKey || e.metaKey) {
        if (13 === e.keyCode) {
          event.oa(e);
          event.preventDefault(e);
          e = target.t(event.u(e));
          cb(e);
        }
      }
    }
    /**
     * @param {Element} key
     * @return {?}
     */
    function fn(key) {
      return function listener(e) {
        if (key.offsetHeight) {
          if (e.ctrlKey || e.metaKey) {
            if (13 === e.keyCode) {
              cb(target.t(key));
            }
          }
        } else {
          event.remove(document, "keydown", listener);
        }
      };
    }
    var items = d(".ks");
    if ("undefined" === typeof items.length) {
      /** @type {Array} */
      items = [items];
    }
    if (1 === items.length) {
      if (items[0]) {
        if (items[0].offsetHeight) {
          event.add(document, "keydown", fn(items[0]));
        }
      }
    }
    /** @type {number} */
    var i = 0;
    var valuesLen = items.length;
    for (;i < valuesLen;i++) {
      event.add(items[i], "keydown", click);
      self.b(items[i], "ks");
    }
  }
  /**
   * @return {undefined}
   */
  function load() {
    var node = d(".ad-unit")[0];
    if (node) {
      /**
       * @param {string} text
       * @return {undefined}
       */
      var load = function(text) {
        if ("" !== text) {
          /** @type {string} */
          d("#content").innerHTML = text;
        }
      };
      if (0 === node.offsetHeight) {
        /** @type {string} */
        d("#content").innerHTML = "";
        exports.S(window.location.protocol + "//" + window.location.host + "/request/ab", load);
      }
    }
  }
  /**
   * @return {undefined}
   */
  function show() {
    /**
     * @param {Object} key
     * @return {undefined}
     */
    function fn(key) {
      key = event.u(key);
      cb(target.t(key));
    }
    /**
     * @param {Object} e
     * @return {?}
     */
    function callback(e) {
      var evt = event.u(e);
      event.preventDefault(e);
      cb(evt);
      return false;
    }
    var values = d(".form-submit");
    if ("undefined" === typeof values.length) {
      /** @type {Array} */
      values = [values];
    }
    /** @type {number} */
    var i = 0;
    var valuesLen = values.length;
    for (;i < valuesLen;i++) {
      /** @type {function (): ?} */
      values[i].onclick = emptyHandler;
      event.add(values[i], "click", fn);
      event.add(target.t(values[i]), "submit", callback);
      self.b(values[i], "form-submit");
    }
  }
  /**
   * @param {Object} options
   * @return {undefined}
   */
  function build(options) {
    var file = options.elements[data.H];
    if (file) {
      var input = file.value;
      /** @type {number} */
      var hash = 0;
      var il = input.length;
      if (0 !== il) {
        /** @type {number} */
        var i = 0;
        var character;
        for (;i < il;i++) {
          character = input.charCodeAt(i);
          hash = (hash << 5) - hash + character;
          hash &= hash;
        }
      }
      start(options, data.Y, hash);
      config.set(data.H, file.value);
    }
  }
  /**
   * @param {Object} options
   * @return {undefined}
   */
  function cb(options) {
    if (!options.e) {
      if (!("function" === typeof options.onsubmit && !options.onsubmit())) {
        build(options);
        if (data.forms[options.id]) {
          data.forms[options.id].submit();
        } else {
          options.submit();
        }
      }
    }
  }
  /**
   * @param {Object} options
   * @param {string} id
   * @param {number} value
   * @return {undefined}
   */
  function start(options, id, value) {
    if (options.elements[id]) {
      /** @type {number} */
      options.elements[id].value = value;
    } else {
      /** @type {Element} */
      var elem = doc.createElement("input");
      /** @type {string} */
      elem.type = "hidden";
      /** @type {string} */
      elem.name = id;
      /** @type {number} */
      elem.value = value;
      options.appendChild(elem);
    }
  }
  /**
   * @return {?}
   */
  function emptyHandler() {
    return false;
  }
  /** @type {HTMLDocument} */
  var doc = document;
  var data = {};
  var target = B.G;
  var self = B.style;
  var exports = B.V;
  var event = B.event;
  var throttledUpdate = B.N;
  var config = B.cookie;
  /** @type {string} */
  data.name = "Flymer";
  /** @type {string} */
  data.H = "fkey";
  /** @type {string} */
  data.Y = "dkey";
  /** @type {string} */
  data.R = "";
  data.r = {
    refresh : "\u041f\u0440\u043e\u0438\u0437\u043e\u0448\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0430. \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u043f\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0443."
  };
  data.next = {
    P : "launch",
    O : ""
  };
  data.forms = {};
  data.forms.newpass = {
    g : "newpass",
    f : "newpass-box",
    form : null,
    a : null,
    /**
     * @return {undefined}
     */
    submit : function() {
      this.form = d("#" + this.g);
      this.a = d("#" + this.f);
      debug(d("#newpass-error"));
      if (this.m()) {
        /** @type {boolean} */
        this.form.e = true;
        self.d(this.form, "invisible");
        self.d(this.a, "loading");
        exports.h(this.form.action, this.form, this.c.bind(this));
      }
    },
    /**
     * @return {?}
     */
    m : function() {
      var current = d("#np-pass");
      if (current.value) {
        if (!/^[A-Za-z0-9_!@#$%^&*()+:;,.?<>\/-]+$/.test(current.value)) {
          return current.value = "", this.n(), false;
        }
        if (6 > current.value.length || 20 < current.value.length) {
          return this.n(), false;
        }
      } else {
        return current.focus(), false;
      }
      return true;
    },
    /**
     * @param {Object} a
     * @return {?}
     */
    c : function(a) {
      try {
        /** @type {*} */
        a = JSON.parse(a);
        if ("object" !== typeof a) {
          throw 1;
        }
        if (a.error) {
          var e = a.error;
          switch(e.type) {
            case "redirect":
              return target.w(e.message);
            case "expired":
              return this.k(e.message);
            case "input":
              return this.A();
            default:
              return this.A(e.message);
          }
        }
        if (!a.ok) {
          throw 1;
        }
      } catch (c) {
        return this.A(data.r.refresh);
      }
      self.b(this.a, "loading");
      /** @type {string} */
      this.form.innerHTML = "";
      a = d("#newpass-confirm");
      a.innerHTML = a.getAttribute("data-msg");
      i(a);
      i(d("#next"));
      f();
    },
    /**
     * @param {string} msg
     * @return {undefined}
     */
    A : function(msg) {
      var r = d("#npe-msg");
      i(r);
      msg = msg || r.getAttribute("data-msg");
      /** @type {string} */
      r.innerHTML = msg;
      i(d("#newpass-error"));
      /** @type {boolean} */
      this.form.e = false;
      self.b(this.form, "invisible");
      self.b(this.a, "loading");
      d("#np-pass").focus();
    },
    /**
     * @return {undefined}
     */
    n : function() {
      i(d("#newpass-error"));
      var r = d("#npe-msg");
      r.innerHTML = r.getAttribute("data-msg");
      i(r);
      d("#np-pass").focus();
    },
    /**
     * @param {?} deepDataAndEvents
     * @return {undefined}
     */
    k : function add(deepDataAndEvents) {
      if (!add.j) {
        value(this.form, deepDataAndEvents);
        exports.h(this.form.action, this.form, this.c.bind(this));
        /** @type {number} */
        add.j = 1;
      }
    }
  };
  data.forms.lostpass = {
    g : "lostpass",
    f : "lostpass-box",
    form : null,
    a : null,
    /**
     * @return {undefined}
     */
    submit : function() {
      this.form = d("#" + this.g);
      this.a = d("#" + this.f);
      debug(d("#lostpass-error"));
      if (this.m()) {
        /** @type {boolean} */
        this.form.e = true;
        self.d(this.form, "invisible");
        self.d(this.a, "loading");
        exports.h(this.form.action, this.form, this.c.bind(this));
      }
    },
    /**
     * @return {?}
     */
    m : function() {
      var input = d("#lp-email");
      return input.value.trim() ? target.L(input.value.trim()) ? true : (input.focus(), d("#lpe-msg").innerHTML = d("#lpe-msg").getAttribute("data-msg"), i(d("#lostpass-error")), i(d("#lpe-msg")), false) : (input.focus(), false);
    },
    /**
     * @param {Object} a
     * @return {?}
     */
    c : function(a) {
      try {
        /** @type {*} */
        a = JSON.parse(a);
        if ("object" !== typeof a) {
          throw 1;
        }
        if (a.error) {
          var e = a.error;
          switch(e.type) {
            case "redirect":
              return target.w(e.message);
            case "expired":
              return this.k(e.message);
            default:
              return this.A(e.message);
          }
        }
        if (!a.ok) {
          throw 1;
        }
      } catch (c) {
        return this.A(data.r.refresh);
      }
      self.b(this.a, "loading");
      /** @type {string} */
      this.form.innerHTML = "";
      a = d("#lostpass-confirm");
      a.innerHTML = a.getAttribute("data-msg");
      i(a);
    },
    /**
     * @param {string} name
     * @return {undefined}
     */
    A : function(name) {
      var key = d("#lpe-msg");
      i(key);
      /** @type {string} */
      key.innerHTML = name;
      i(d("#lostpass-error"));
      /** @type {boolean} */
      this.form.e = false;
      self.b(this.form, "invisible");
      self.b(this.a, "loading");
      d("#lp-email").focus();
    },
    /**
     * @param {?} deepDataAndEvents
     * @return {undefined}
     */
    k : function add(deepDataAndEvents) {
      if (!add.j) {
        value(this.form, deepDataAndEvents);
        exports.h(this.form.action, this.form, this.c.bind(this));
        /** @type {number} */
        add.j = 1;
      }
    }
  };
  data.forms.login = {
    g : "login",
    f : "login-box",
    form : null,
    a : null,
    /**
     * @return {undefined}
     */
    submit : function() {
      this.form = d("#" + this.g);
      this.a = d("#" + this.f);
      debug(d("#login-error"));
      if (this.m()) {
        /** @type {boolean} */
        this.form.e = true;
        self.d(this.form, "invisible");
        self.d(this.a, "loading");
        exports.h(this.form.action, this.form, this.c.bind(this));
      }
    },
    /**
     * @return {?}
     */
    m : function() {
      /** @type {boolean} */
      var res = true;
      var input = d("#l-email");
      var textfield = d("#l-pass");
      if (!textfield.value) {
        textfield.focus();
        /** @type {boolean} */
        res = false;
      }
      if (!input.value.trim()) {
        /** @type {string} */
        input.value = "";
        input.focus();
        /** @type {boolean} */
        res = false;
      }
      return res;
    },
    /**
     * @param {Object} a
     * @return {?}
     */
    c : function(a) {
      try {
        /** @type {*} */
        a = JSON.parse(a);
        if ("object" !== typeof a) {
          throw 1;
        }
        if (a.error) {
          var e = a.error;
          switch(e.type) {
            case "redirect":
              return target.w(e.message);
            case "tech":
              return this.i(e.message);
            case "input":
              return this.n(e.message);
            case "expired":
              return this.k(e.message);
          }
          return;
        }
        if (!a.ok) {
          throw 1;
        }
      } catch (c) {
        return this.i(data.r.refresh);
      }
      a = this.form.getAttribute("data-goto") || "/";
      target.w(a);
    },
    /**
     * @param {string} e
     * @return {undefined}
     */
    i : function(e) {
      debug(d("#le-input"));
      var a = d("#le-tech");
      i(a);
      /** @type {string} */
      a.innerHTML = e;
      i(d("#login-error"));
      /** @type {boolean} */
      this.form.e = false;
      self.b(this.form, "invisible");
      self.b(this.a, "loading");
    },
    /**
     * @return {undefined}
     */
    n : function() {
      debug(d("#le-tech"));
      var r = d("#le-input");
      i(r);
      r.innerHTML = r.getAttribute("data-msg");
      i(d("#login-error"));
      /** @type {boolean} */
      this.form.e = false;
      self.b(this.form, "invisible");
      self.b(this.a, "loading");
    },
    /**
     * @param {?} deepDataAndEvents
     * @return {undefined}
     */
    k : function add(deepDataAndEvents) {
      if (!add.j) {
        value(this.form, deepDataAndEvents);
        exports.h(this.form.action, this.form, this.c.bind(this));
        /** @type {number} */
        add.j = 1;
      }
    }
  };
  data.forms.signup = {
    g : "signup",
    f : "signup-box",
    form : null,
    a : null,
    /**
     * @return {undefined}
     */
    submit : function() {
      this.form = d("#" + this.g);
      this.a = d("#" + this.f);
      this.K();
      if (this.m()) {
        /** @type {boolean} */
        this.form.e = true;
        self.d(this.form, "invisible");
        self.d(this.a, "loading");
        exports.h(this.form.action, this.form, this.c.bind(this));
      }
    },
    /**
     * @return {?}
     */
    m : function() {
      /** @type {Array} */
      var req = [];
      /** @type {boolean} */
      var b = false;
      var input = d("#s-email");
      var current = d("#s-pass");
      var filter = d("#s-agree");
      if (!current.value) {
        current.focus();
        /** @type {boolean} */
        b = true;
      } else {
        if (!/^[A-Za-z0-9_!@#$%^&*()+:;,.?<>\/-]+$/.test(current.value)) {
          /** @type {string} */
          current.value = "";
          current.focus();
          req.push("pass");
        } else {
          if (6 > current.value.length || 20 < current.value.length) {
            current.focus();
            req.push("pass");
          }
        }
      }
      if (input.value.trim()) {
        if (!target.L(input.value.trim())) {
          input.focus();
          req.push("email");
        }
      } else {
        input.focus();
        /** @type {boolean} */
        b = true;
      }
      if (!b) {
        if (!filter.checked) {
          req.push("agree");
        }
      }
      return 0 < req.length ? (this.K(req), false) : b ? false : true;
    },
    /**
     * @param {number} v
     * @return {undefined}
     */
    K : function(v) {
      debug([d("#se-email"), d("#se-pass"), d("#se-agree"), d("#se-tech")]);
      if (v && v.length) {
        i(d("#signup-error"));
        /** @type {number} */
        var x = 0;
        var pad = v.length;
        var c;
        for (;x < pad;x++) {
          c = d("#se-" + v[x]);
          c.innerHTML = c.getAttribute("data-msg");
          i(c);
        }
      } else {
        debug(d("#signup-error"));
      }
    },
    /**
     * @param {Object} a
     * @return {?}
     */
    c : function(a) {
      try {
        /** @type {*} */
        a = JSON.parse(a);
        if ("object" !== typeof a) {
          throw 1;
        }
        if (a.error) {
          var e = a.error;
          switch(e.type) {
            case "redirect":
              return target.w(e.message);
            case "tech":
              return this.i(e.message);
            case "input":
              return this.n(e.message);
            case "expired":
              return this.k(e.message);
          }
          return;
        }
        if (!a.ok) {
          throw 1;
        }
      } catch (c) {
        return this.i(data.r.refresh);
      }
      self.b(this.a, "loading");
      /** @type {string} */
      this.form.innerHTML = "";
      a = d("#signup-confirm");
      a.innerHTML = a.getAttribute("data-msg");
      i(a);
    },
    /**
     * @param {string} e
     * @return {undefined}
     */
    i : function(e) {
      var a = d("#se-tech");
      i(a);
      /** @type {string} */
      a.innerHTML = e;
      i(d("#signup-error"));
      /** @type {boolean} */
      this.form.e = false;
      self.b(this.form, "invisible");
      self.b(this.a, "loading");
    },
    /**
     * @param {?} event
     * @return {undefined}
     */
    n : function(event) {
      this.K(event);
      /** @type {boolean} */
      this.form.e = false;
      self.b(this.form, "invisible");
      self.b(this.a, "loading");
    },
    /**
     * @param {?} deepDataAndEvents
     * @return {undefined}
     */
    k : function add(deepDataAndEvents) {
      if (!add.j) {
        value(this.form, deepDataAndEvents);
        exports.h(this.form.action, this.form, this.c.bind(this));
        /** @type {number} */
        add.j = 1;
      }
    }
  };
  data.forms.launch = {
    g : "launch",
    f : "launch-box",
    C : "note-input",
    form : null,
    a : null,
    Q : "",
    /**
     * @return {undefined}
     */
    submit : function() {
      this.form = d("#" + this.g);
      this.a = d("#" + this.f);
      var input = d("#" + this.C);
      var value = input.value.trim();
      if (value === this.Q || "" === value) {
        input.focus();
        /** @type {string} */
        input.value = "";
      } else {
        /** @type {boolean} */
        this.form.e = true;
        input.blur();
        self.d(this.form, "invisible");
        self.d(this.a, "loading");
        exports.h(this.form.action, this.form, this.c.bind(this));
      }
    },
    /**
     * @param {Object} a
     * @return {?}
     */
    c : function(a) {
      try {
        /** @type {*} */
        a = JSON.parse(a);
        if ("object" !== typeof a) {
          throw 1;
        }
        callers.B();
        if (a.error) {
          callers.p(a.replies);
          var e = a.error;
          switch(e.type) {
            case "redirect":
              return target.w(e.message);
            case "auth":
              return submit();
            case "tech":
              return this.i(e.message);
            case "input":
              return this.n(e.message);
            case "system":
              return this.F(e.message, e.mode);
            case "expired":
              return this.k(e.message);
          }
          return;
        }
        if (!a.html) {
          throw 1;
        }
      } catch (c) {
        return this.i(data.r.refresh);
      }
      d("#current").innerHTML = a.html;
      debug(d("#trending-mob"));
      d("#reply-input").focus();
      next("catch");
      callers.p(a.replies);
    },
    /**
     * @param {string} e
     * @return {undefined}
     */
    i : function(e) {
      var a = d("#error");
      /** @type {string} */
      a.innerHTML = e;
      /** @type {string} */
      a.className = "tech-message";
      /** @type {boolean} */
      this.form.e = false;
      self.b(this.form, "invisible");
      self.b(this.a, "loading");
    },
    /**
     * @param {?} r
     * @return {undefined}
     */
    n : function(r) {
      var e = d("#" + this.C);
      debug(d("#error"));
      /** @type {boolean} */
      this.form.e = false;
      self.b(this.form, "invisible");
      self.b(this.a, "loading");
      self.d(e, "invalid");
      /** @type {string} */
      e.value = "\n" + r;
      this.Q = r;
      /**
       * @return {undefined}
       */
      e.onfocus = function() {
        /** @type {string} */
        this.value = "";
        self.b(this, "invalid");
        /** @type {null} */
        this.onfocus = null;
      };
    },
    /**
     * @param {?} e
     * @param {(Function|string)} value
     * @return {undefined}
     */
    F : function(e, value) {
      var a = d("#error");
      a.innerHTML = e;
      /** @type {string} */
      a.className = "system-message";
      debug(d("#current"));
      apply(value);
    },
    /**
     * @param {?} deepDataAndEvents
     * @return {undefined}
     */
    k : function add(deepDataAndEvents) {
      if (!add.j) {
        value(this.form, deepDataAndEvents);
        exports.h(this.form.action, this.form, this.c.bind(this));
        /** @type {number} */
        add.j = 1;
      }
    }
  };
  data.forms.reply = {
    g : "reply",
    f : "reply-box",
    C : "reply-input",
    form : null,
    a : null,
    /**
     * @return {undefined}
     */
    submit : function() {
      this.form = d("#" + this.g);
      this.a = d("#" + this.f);
      var input = d("#" + this.C);
      if (input.value.trim()) {
        /** @type {boolean} */
        this.form.e = true;
        input.blur();
        self.d(this.form, "invisible");
        self.d(this.a, "loading");
        exports.h(this.form.action, this.form, this.c.bind(this));
      } else {
        input.focus();
        /** @type {string} */
        input.value = "";
      }
    },
    /**
     * @param {Object} a
     * @return {?}
     */
    c : function(a) {
      try {
        /** @type {*} */
        a = JSON.parse(a);
        if ("object" !== typeof a) {
          throw 1;
        }
        callers.B();
        if (a.error) {
          callers.p(a.replies);
          var h = a.error;
          switch(h.type) {
            case "auth":
              return submit();
            case "tech":
              return this.i(h.message);
            case "system":
              return this.F(h.message);
            case "input":
              return this.n(h.message);
            case "expired":
              return this.k(h.message);
          }
          return;
        }
        if (!a.ok) {
          throw 1;
        }
      } catch (c) {
        return this.i(data.r.refresh);
      }
      h = d("#current").parentNode.offsetHeight;
      if (a["catch"]) {
        i(d("#tab-catch"));
        setTimeout(function() {
          debug(d("#tab-catch"));
        }, 3E4);
      }
      var n = quote(d("#" + this.C).value);
      var b = d("#myReply");
      b.innerHTML = n;
      i(b);
      apply("launch");
      /** @type {number} */
      n = d("#current").parentNode.offsetHeight - this.a.offsetHeight;
      h -= n;
      if (0 < h) {
        /** @type {Element} */
        n = document.createElement("div");
        /** @type {string} */
        n.id = "spacer";
        /** @type {string} */
        n.style.visibility = "hidden";
        /** @type {string} */
        n.style.height = h + "px";
        d("#current").parentNode.appendChild(n);
      }
      debug(this.a);
      fn("view");
      callers.p(a.replies);
    },
    /**
     * @param {string} obj
     * @return {undefined}
     */
    i : function(obj) {
      var elem = d("#reply-error");
      /** @type {string} */
      elem.innerHTML = obj;
      /** @type {string} */
      elem.className = "tech-message";
      /** @type {boolean} */
      this.form.e = false;
      self.b(this.form, "invisible");
      self.b(this.a, "loading");
    },
    /**
     * @param {?} e
     * @return {undefined}
     */
    F : function(e) {
      var a = d("#error");
      a.innerHTML = e;
      /** @type {string} */
      a.className = "system-message";
      debug(d("#current"));
      apply("launch");
    },
    /**
     * @param {?} content
     * @return {undefined}
     */
    n : function(content) {
      var elem = d("#reply-error");
      elem.innerHTML = content;
      /** @type {string} */
      elem.className = "input-message";
      /** @type {boolean} */
      this.form.e = false;
      self.b(this.form, "invisible");
      self.b(this.a, "loading");
    },
    /**
     * @param {?} deepDataAndEvents
     * @return {undefined}
     */
    k : function add(deepDataAndEvents) {
      if (!add.j) {
        value(this.form, deepDataAndEvents);
        exports.h(this.form.action, this.form, this.c.bind(this));
        /** @type {number} */
        add.j = 1;
      }
    }
  };
  data.forms["catch"] = {
    g : "catch",
    f : "tab-catch",
    form : null,
    a : null,
    /**
     * @return {undefined}
     */
    submit : function() {
      event.remove(document, "keydown", update);
      this.form = d("#" + this.g);
      this.a = d("#" + this.f);
      /** @type {boolean} */
      this.form.e = true;
      self.d(this.form, "invisible");
      self.d(this.a, "loading");
      exports.h(this.form.action, this.form, this.c.bind(this));
    },
    /**
     * @param {Object} a
     * @return {?}
     */
    c : function(a) {
      debug(this.a);
      self.b(this.form, "invisible");
      self.b(this.a, "loading");
      /** @type {boolean} */
      this.form.e = false;
      window.scroll(0, 0);
      try {
        /** @type {*} */
        a = JSON.parse(a);
        if ("object" !== typeof a) {
          throw 1;
        }
        callers.B();
        if (a.error) {
          callers.p(a.replies);
          var e = a.error;
          switch(e.type) {
            case "auth":
              return submit();
            case "system":
              return this.F(e.message);
          }
          return;
        }
        if (!a.html) {
          throw 1;
        }
      } catch (c) {
        return;
      }
      if (d("#spacer")) {
        d("#spacer").parentNode.removeChild(d("#spacer"));
      }
      debug(d("#next"));
      d("#current").innerHTML = a.html;
      d("#reply-input").focus();
      next("catch");
      callers.p(a.replies);
    },
    /**
     * @param {string} e
     * @return {undefined}
     */
    F : function(e) {
      debug(d("#current"));
      var a = d("#error");
      /** @type {string} */
      a.innerHTML = e;
      /** @type {string} */
      a.className = "system-message";
      apply("launch");
    }
  };
  data.forms.contact = {
    g : "contact",
    f : "contact-box",
    form : null,
    a : null,
    /**
     * @return {undefined}
     */
    submit : function() {
      this.form = d("#" + this.g);
      this.a = d("#" + this.f);
      if (this.m()) {
        /** @type {boolean} */
        this.form.e = true;
        self.d(this.form, "invisible");
        self.d(this.a, "loading");
        exports.h(this.form.action, this.form, this.c.bind(this));
      }
    },
    /**
     * @return {?}
     */
    m : function() {
      /**
       * @param {undefined} value
       * @return {undefined}
       */
      function callback(value) {
        /**
         * @param {Element} d
         * @return {undefined}
         */
        function callback(d) {
          d = event.u(d);
          self.b(d, "invalid");
          event.remove(d, "focus", callback);
        }
        self.d(value, "invalid");
        event.add(value, "focus", callback);
      }
      /** @type {boolean} */
      var res = true;
      var err = d("#cname");
      var _this = d("#cemail");
      var comment = d("#cmessage");
      if (!err.value.trim().length) {
        callback(err);
        /** @type {boolean} */
        res = false;
      }
      if (!target.L(_this.value.trim())) {
        callback(_this);
        /** @type {boolean} */
        res = false;
      }
      if (10 > comment.value.trim().length) {
        callback(comment);
        /** @type {boolean} */
        res = false;
      }
      return res;
    },
    /**
     * @param {Object} a
     * @return {?}
     */
    c : function(a) {
      try {
        /** @type {*} */
        a = JSON.parse(a);
        if ("object" !== typeof a) {
          throw 1;
        }
        if (a.error) {
          var e = a.error;
          switch(e.type) {
            case "tech":
              return this.i(e.message);
            case "expired":
              return this.k(e.message);
          }
          return;
        }
        if (!a.ok) {
          throw 1;
        }
      } catch (c) {
        return this.i(data.r.refresh);
      }
      debug(d("#error"));
      debug(this.a);
      /** @type {string} */
      this.a.innerHTML = "";
      i(d("#confirm"));
      f();
    },
    /**
     * @param {string} e
     * @return {undefined}
     */
    i : function(e) {
      var a = d("#error");
      /** @type {string} */
      a.innerHTML = e;
      /** @type {string} */
      a.className = "tech-message";
      /** @type {boolean} */
      this.form.e = false;
      self.b(this.form, "invisible");
      self.b(this.a, "loading");
    },
    /**
     * @param {?} deepDataAndEvents
     * @return {undefined}
     */
    k : function add(deepDataAndEvents) {
      if (!add.j) {
        value(this.form, deepDataAndEvents);
        exports.h(this.form.action, this.form, this.c.bind(this));
        /** @type {number} */
        add.j = 1;
      }
    }
  };
  data.forms.burn = {
    g : "burn",
    f : "reply-box",
    form : null,
    a : null,
    /**
     * @return {undefined}
     */
    submit : function() {
      this.form = d("#" + this.g);
      this.a = d("#" + this.f);
      if (this.m()) {
        /** @type {boolean} */
        this.form.e = true;
        self.d(this.form, "invisible");
        debug(d("burnit"));
        self.d(this.a, "loading");
        exports.h(this.form.action, this.form, this.c.bind(this));
      }
    },
    /**
     * @return {?}
     */
    m : function() {
      var siblings = this.form.elements.vtype;
      /** @type {number} */
      var j = 0;
      for (;j < siblings.length;j++) {
        if (siblings[j].checked) {
          return true;
        }
      }
      i(d("#burn-hint"));
      return false;
    },
    /**
     * @param {Object} a
     * @return {?}
     */
    c : function(a) {
      try {
        /** @type {*} */
        a = JSON.parse(a);
        if ("object" !== typeof a) {
          throw 1;
        }
        callers.B();
        if (a.error) {
          callers.p(a.replies);
          var h = a.error;
          switch(h.type) {
            case "auth":
              return submit();
            case "tech":
              return this.i(h.message);
            case "expired":
              return this.k(h.message);
          }
          return;
        }
        if (!a.ok) {
          throw 1;
        }
      } catch (c) {
        return this.i(data.r.refresh);
      }
      h = d("#current").parentNode.offsetHeight;
      i(d("#burn-result"));
      apply("launch");
      /** @type {number} */
      var p = d("#current").parentNode.offsetHeight - this.a.offsetHeight;
      /** @type {number} */
      h = h - p;
      if (0 < h) {
        /** @type {Element} */
        p = document.createElement("div");
        /** @type {string} */
        p.id = "spacer";
        /** @type {string} */
        p.style.visibility = "hidden";
        /** @type {string} */
        p.style.height = h + "px";
        d("#current").parentNode.appendChild(p);
      }
      debug(this.a);
      fn("view");
      callers.p(a.replies);
    },
    /**
     * @param {string} obj
     * @return {undefined}
     */
    i : function(obj) {
      var elem = d("#burn-error");
      /** @type {string} */
      elem.innerHTML = obj;
      /** @type {string} */
      elem.className = "tech-message";
      /** @type {boolean} */
      this.form.e = false;
      self.b(this.form, "invisible");
      self.b(this.a, "loading");
    },
    /**
     * @param {?} deepDataAndEvents
     * @return {undefined}
     */
    k : function add(deepDataAndEvents) {
      if (!add.j) {
        value(this.form, deepDataAndEvents);
        exports.h(this.form.action, this.form, this.c.bind(this));
        /** @type {number} */
        add.j = 1;
      }
    }
  };
  var callers = {
    ga : 14,
    q : null,
    /**
     * @return {undefined}
     */
    B : function() {
      if (d("#tab-replies") || (d("#menu-replies") || d("#next-reply"))) {
        if (null !== this.q) {
          clearTimeout(this.q);
        }
        /** @type {number} */
        this.interval = 5;
        /** @type {number} */
        this.count = 0;
        this.T();
      }
    },
    /**
     * @return {undefined}
     */
    T : function() {
      if (this.interval) {
        /** @type {number} */
        this.q = setTimeout(this.la.bind(this), 1E3 * this.interval);
      }
    },
    /**
     * @return {undefined}
     */
    la : function() {
      this.count++;
      exports.S(window.location.protocol + "//" + window.location.host + "/request/repcount?c=" + this.count, this.W.bind(this));
    },
    /**
     * @param {Object} a
     * @return {undefined}
     */
    W : function(a) {
      try {
        /** @type {*} */
        a = JSON.parse(a);
        if (a.error) {
          if ("auth" === a.error.type) {
            submit();
          }
        } else {
          this.p(a.replies);
          this.pa();
          if (this.count < this.ga) {
            this.T();
          }
        }
      } catch (b) {
      }
    },
    /**
     * @param {?} obj
     * @return {undefined}
     */
    p : function(obj) {
      if (obj) {
        /** @type {string} */
        var title = document.title.replace(/^\(\d+\)\s/, "");
        if (0 < obj.num) {
          debug(d("#menu-launch"));
          if (d("#tab-replies")) {
            i(d("#tab-replies"));
            d("#link-replies").innerHTML = obj.html;
            d("#link-replies").href = obj.url;
          }
          if (d("#menu-replies")) {
            d("#menu-replies").innerHTML = obj.html;
            d("#menu-replies").href = obj.url;
            i(d("#menu-replies"));
          }
          if (d("#next")) {
            d("#next-reply").href = obj.url;
            flush("reply");
          }
          /** @type {string} */
          document.title = "(" + obj.num + ") " + title;
        } else {
          /** @type {boolean} */
          obj = !self.v(d("#menu-replies"), "hide");
          debug(d("#tab-replies"));
          debug(d("#menu-replies"));
          if (d("#next")) {
            flush("default");
          }
          var name = data.R;
          if (obj) {
            if ("index" !== name) {
              i(d("#menu-launch"));
            }
          }
          /** @type {string} */
          document.title = title;
        }
      }
    },
    /**
     * @return {undefined}
     */
    pa : function() {
      /** @type {number} */
      this.interval = 6 > this.count ? 10 : 2 * this.interval;
    }
  };
  throttledUpdate(function() {
    data.na = self.v(d("body")[0], "in");
    if ("localhost" === location.hostname || "file:" === location.protocol) {
      /** @type {string} */
      d("body")[0].innerHTML = "";
    }
    var li = d("#nosupport");
    if (!event.isSupported("keyup") || window.operamini) {
      /** @type {string} */
      li.innerHTML = (window.operamini ? "<b>Opera Mini</b>" : "\u0414\u0430\u043d\u043d\u044b\u0439 \u0431\u0440\u0430\u0443\u0437\u0435\u0440") + " \u043d\u0435 \u043e\u0442\u0432\u0435\u0447\u0430\u0435\u0442 \u043c\u0438\u043d\u0438\u043c\u0430\u043b\u044c\u043d\u044b\u043c \u0442\u0440\u0435\u0431\u043e\u0432\u0430\u043d\u0438\u044f\u043c " + data.name + ". \u0418\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0439\u0442\u0435 \u0434\u0440\u0443\u0433\u043e\u0439 \u0431\u0440\u0430\u0443\u0437\u0435\u0440.";
      /** @type {string} */
      li.style.display = "block";
    }
    f();
    next();
    handler();
    buildDeck();
    if (data.na) {
      setTimeout(load, 1E3);
      callers.B();
      addEvent();
      setup();
      initialize();
    } else {
      add();
    }
  });
})();
window.CORE = B;
B.addDOMLoadEvent = B.N;
B.utils = B.G;
/** @type {function (Object, ?): undefined} */
B.G.loadScript = B.G.ea;
