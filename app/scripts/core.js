(function() {
  var B, conversationId, link, _i, _len, _ref, _ref1, _ref2, _ref3, _ref4;

  _ref = document.querySelectorAll(".linkB");
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    link = _ref[_i];
    link.href = link.href.replace("#new", "&full=1#new");
  }

  conversationId = (_ref1 = (_ref2 = document.location.href.match(/c=(\d*)/)) != null ? _ref2[1] : void 0) != null ? _ref1 : "new-note";

  document.addEventListener("keyup", function(e) {
    var _ref3;
    if ((_ref3 = e.target.id) === "reply-input" || _ref3 === "note-input") {
      return localStorage[conversationId] = e.target.value;
    }
  });

  if ((_ref3 = window["reply-input"] || window["note-input"]) != null) {
    _ref3.value = (_ref4 = localStorage[conversationId]) != null ? _ref4 : "";
  }

  if (this.top.location !== this.location) {

    /** @type {(Location|null)} */
    this.top.location = this.location;
  }


  /** @type {function (this:Window, string): (MediaQueryList|null)} */

  window.matchMedia = window.matchMedia || (function(doc) {
    var bool, div, docelem, fakeBody, refNode;
    bool = void 0;

    /** @type {element} */
    docelem = doc.documentElement;

    /** @type {(Node|null)} */
    refNode = docelem.firstElementChild || docelem.firstChild;

    /** @type {element} */
    fakeBody = doc.createElement('body');

    /** @type {element} */
    div = doc.createElement('div');
    div.id = 'mq-test-1';
    div.style.cssText = 'position:absolute;top:-100em';
    fakeBody.style.background = 'none';
    fakeBody.appendChild(div);
    return function(q) {
      div.innerHTML = '&shy;<style media="' + q + '"> #mq-test-1 { width: 42px; }</style>';
      docelem.insertBefore(fakeBody, refNode);
      bool = 42 === div.offsetWidth;
      return docelem.removeChild(fakeBody)({
        matches: bool,
        media: q
      });
    };
  })(document);

  (function(win) {
    var F, ajax, applyMedia, aux, callMedia, doc, docelem, getemValue, head, links, makeRequests, nodes, parsedSheets, requestQueue, resizeDefer, respond, ret, ripCSS, rules, tags, translate, xmlHttp;
    respond = {};

    /**
    	 * @return {undefined}
     */
    callMedia = function() {
      applyMedia(true);
    };
    if (win.va = respond) {
      respond.update = (function() {});
      respond.ia = win.matchMedia && win.matchMedia('only all').matches;
      !respond.ia;
      aux = void 0;
      resizeDefer = void 0;
      ret = void 0;

      /** @type {HTMLDocument} */
      doc = win.document;

      /** @type {element} */
      docelem = doc.documentElement;

      /** @type {Array} */
      tags = [];

      /** @type {Array} */
      rules = [];

      /** @type {Array} */
      nodes = [];
      parsedSheets = {};
      head = doc.getElementsByTagName('head')[0] || docelem;
      F = doc.getElementsByTagName('base')[0];
      links = head.getElementsByTagName('link');

      /** @type {Array} */
      requestQueue = [];

      /**
      		 * @return {undefined}
       */
      ripCSS = function() {

        /** @type {number} */
        var href, index, media, r, sheet;
        index = 0;
        while (links.length > index) {
          sheet = links[index];
          href = sheet.href;
          media = sheet.media;
          r = sheet.rel && 'stylesheet' === sheet.rel.toLowerCase();
          if (href) {
            if (r) {
              if (!parsedSheets[href]) {
                if (sheet.styleSheet && sheet.styleSheet.ka) {
                  translate(sheet.styleSheet.ka, href, media);

                  /** @type {boolean} */
                  parsedSheets[href] = true;
                } else {
                  if (!/^([a-zA-Z:]*\/\/)/.test(href) && !F || href.replace(RegExp.$1, '').split('/')[0] === win.location.host) {
                    requestQueue.push({
                      href: href,
                      media: media
                    });
                  }
                }
              }
            }
          }
          index++;
        }
        makeRequests();
      };

      /**
      		 * @return {undefined}
       */
      makeRequests = function() {
        var thisRequest;
        if (requestQueue.length) {
          thisRequest = requestQueue.shift();
          ajax(thisRequest.href, function(styles) {
            translate(styles, thisRequest.href, thisRequest.media);

            /** @type {boolean} */
            parsedSheets[thisRequest.href] = true;
            win.setTimeout((function() {
              makeRequests();
            }), 0);
          });
        }
      };

      /**
      		 * @param {string} styles
      		 * @param {string} href
      		 * @param {(number|string)} media
      		 * @return {undefined}
       */
      translate = function(styles, href, media) {
        var f, fullq, i, includes, len, part, ql, rawParams, repUrls, useMedia;
        includes = styles.match(/@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi);
        ql = includes && includes.length || 0;

        /**
        			 * @param {string} css
        			 * @return {?}
         */
        repUrls = function(css) {
          return css.replace(/(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g, '$1' + href + '$2$3');
        };
        href = href.substring(0, href.lastIndexOf('/'));
        useMedia = !ql && media;
        if (href.length) {
          href += '/';
        }
        if (useMedia) {

          /** @type {number} */
          ql = 1;
        }

        /** @type {number} */
        f = 0;
        while (ql > f) {
          fullq = void 0;
          part = void 0;
          rawParams = void 0;
          len = void 0;
          if (useMedia) {

            /** @type {(number|string)} */
            fullq = media;
            rules.push(repUrls(styles));
          } else {
            fullq = includes[f].match(/@media *([^\{]+)\{([\S\s]+?)$/) && RegExp.$1;
            rules.push(RegExp.$2 && repUrls(RegExp.$2));
          }
          rawParams = fullq.split(',');
          len = rawParams.length;

          /** @type {number} */
          i = 0;
          while (len > i) {
            part = rawParams[i];
            tags.push({
              media: part.split('(')[0].match(/(only\s+)?([a-zA-Z]+)\s?/) && RegExp.$2 || 'all',
              rules: rules.length - 1,
              da: -1 < part.indexOf('('),
              ja: part.match(/\(\s*min\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/) && parseFloat(RegExp.$1) + (RegExp.$2 || ''),
              ha: part.match(/\(\s*max\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/) && parseFloat(RegExp.$1) + (RegExp.$2 || '')
            });
            i++;
          }
          f++;
        }
        applyMedia();
      };

      /**
      		 * @return {?}
       */
      getemValue = function() {
        var body, container, fakeUsed, style;
        style = void 0;

        /** @type {element} */
        container = doc.createElement('div');

        /** @type {(HTMLElement|null)} */
        body = doc.body;

        /** @type {boolean} */
        fakeUsed = false;
        container.style.cssText = 'position:absolute;font-size:1em;width:1em';
        body || (body = fakeUsed = doc.createElement('body'));
        body.style.background = 'none';
        body.appendChild(container);
        docelem.insertBefore(body, docelem.firstChild);
        style = container.offsetWidth;
        if (fakeUsed) {
          docelem.removeChild(body);
        } else {
          body.removeChild(container);
        }
        return ret = parseFloat(style);
      };

      /**
      		 * @param {Object} options
      		 * @return {?}
       */
      applyMedia = function(options) {

        /** @type {number} */
        var a, b, counter, fontSize, i, k, lastLink, max, styleBlocks, tag;
        styleBlocks = docelem.clientWidth;

        /** @type {number} */
        counter = 'CSS1Compat' === doc.compatMode && styleBlocks || doc.body.clientWidth || styleBlocks;
        styleBlocks = {};
        lastLink = links[links.length - 1];

        /** @type {number} */
        max = (new Date).getTime();
        if (options && aux && 30 > max - aux) {
          return win.clearTimeout(resizeDefer);
          resizeDefer = win.setTimeout(applyMedia, 30);
          void 0;
        }

        /** @type {number} */
        aux = max;
        tag = void 0;
        for (tag in tags) {
          if (tags.hasOwnProperty(tag)) {
            options = tags[tag];
            max = options.ja;
            fontSize = options.ha;

            /** @type {boolean} */
            a = null === max;

            /** @type {boolean} */
            b = null === fontSize;
            if (max) {

              /** @type {number} */
              max = parseFloat(max) * (-1 < max.indexOf('em') ? ret || getemValue() : 1);
            }
            if (fontSize) {

              /** @type {number} */
              fontSize = parseFloat(fontSize) * (-1 < fontSize.indexOf('em') ? ret || getemValue() : 1);
            }
            if (!(options.da && (a && b || !(a || counter >= max) || !(b || fontSize >= counter)))) {
              if (!styleBlocks[options.media]) {

                /** @type {Array} */
                styleBlocks[options.media] = [];
              }
              styleBlocks[options.media].push(rules[options.rules]);
            }
          }
        }
        i = void 0;
        for (i in nodes) {
          if (nodes.hasOwnProperty(i)) {
            if (nodes[i]) {
              if (nodes[i].parentNode === head) {
                head.removeChild(nodes[i]);
              }
            }
          }
        }
        k = void 0;
        for (k in styleBlocks) {
          if (styleBlocks.hasOwnProperty(k)) {

            /** @type {element} */
            tag = doc.createElement('style');
            i = styleBlocks[k].join('\n');

            /** @type {string} */
            tag.type = 'text/css';

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
      ajax = function(url, callback) {
        var req;
        req = xmlHttp();
        if (req) {
          req.open('GeT', url, true);

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
      xmlHttp = (function() {

        /** @type {boolean} */
        var a, b;
        b = false;
        try {

          /** @type {XMLHttpRequest} */
          b = new win.XMLHttpRequest;
        } catch (_error) {
          a = _error;

          /** @type {ActiveXObject} */
          b = new win.ActiveXObject('Microsoft.XMLHTTP');
        }
        return function() {
          return b;
        };
      })();
      ripCSS();

      /** @type {function (): undefined} */
      respond.update = ripCSS;
      if (win.addEventListener) {
        win.addEventListener('resize', callMedia, false);
      } else {
        if (win.attachEvent) {
          win.attachEvent('onresize', callMedia);
        }
      }
    }
  })(this);

  if (!window.getComputedStyle) {

    /**
    	 * @param {(element|null)} element
    	 * @return {(CSSStyleDeclaration|null)}
     */
    window.getComputedStyle = function(element) {

      /**
      		 * @param {string} text
      		 * @return {?}
       */
      this.getPropertyValue = function(text) {

        /** @type {RegExp} */
        var cx;
        cx = /(\-([a-z]){1})/g;
        if ('float' === text) {

          /** @type {string} */
          text = 'styleFloat';
        }
        if (cx.test(text)) {
          text = text.replace(cx, function(dataAndEvents, deepDataAndEvents, letter) {
            return letter.toUpperCase();
          });
        }
        if ((text = element.currentStyle[text])) {
          return text;
        } else {
          return null;
        }
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
      var ii, ret, t;
      t = document;
      ii = void 0;

      /** @type {Array} */
      ret = [];
      if (t.querySelectorAll) {
        return t.querySelectorAll('.' + e);
      }

      /** @type {NodeList} */
      t = t.getElementsByTagName('*');

      /** @type {RegExp} */
      e = RegExp('(^|\\s)' + e + '(\\s|$)');

      /** @type {number} */
      ii = 0;
      while (ii < t.length) {
        if (e.test(t[ii].className)) {
          ret.push(t[ii]);
        }
        ii++;
      }
      return ret;
    };
  }

  if (!String.prototype.trim) {

    /**
    	 * @return {string}
     */
    String.prototype.trim = function() {
      return this.replace(/^\s+|\s+$/g, '');
    };
  }

  if (!Date.now) {

    /**
    	 * @return {number}
     */
    Date.now = function() {
      return +(new Date);
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
      var args, fBound, fNOP, fToBind;
      fBound = function() {
        return fToBind.apply((this instanceof fNOP && oThis ? this : oThis), args.concat(Array.prototype.slice.call(arguments)));
      };

      /**
      		 * @return {undefined}
       */
      fNOP = function() {};
      if ('function' !== typeof this) {
        throw new Typeerror('Function.prototype.bind - what is trying to be bound is not callable');
      }

      /** @type {Array.<?>} */
      args = Array.prototype.slice.call(arguments, 1);

      /** @type {Function} */
      fToBind = this;
      fNOP.prototype = this.prototype;
      fBound.prototype = new fNOP;
      return fBound;
    };
  }

  B = B ? B : {};

  B.N = (function() {

    /** @type {Array} */
    var done, known, spec, valueAccessor;
    spec = [];

    /** @type {boolean} */
    known = false;

    /** @type {boolean} */
    done = false;
    valueAccessor = void 0;
    return function(func) {

      /**
      		 * @return {undefined}
       */
      var G, I, add, doc, init, poll, pre, rem, root, win;
      poll = function() {
        var b;
        try {
          root.doScroll('left');
        } catch (_error) {
          b = _error;
          setTimeout(poll, 50);
          return;
        }
        init('poll');
      };

      /**
      		 * @param {event} e
      		 * @return {undefined}
       */
      init = function(e) {
        if ('readystatechange' !== e.type || 'complete' === doc.readyState) {
          if (('load' === e.type ? win : doc)[rem](pre + e.type, init, false)) {
            !done && (done = true);
            while (valueAccessor = spec.shift()) {
              valueAccessor();
            }
          }
        }
      };
      if (done) {
        return func();
      }

      /** @type {Window} */
      win = window;

      /** @type {boolean} */
      G = true;

      /** @type {Document} */
      doc = win.document;

      /** @type {element} */
      root = doc.documentElement;

      /** @type {string} */
      add = doc.addEventListener ? 'addEventListener' : 'attachEvent';

      /** @type {string} */
      rem = doc.addEventListener ? 'removeEventListener' : 'detachEvent';

      /** @type {string} */
      pre = doc.addEventListener ? '' : 'on';
      if ('complete' === doc.readyState) {
        func();
      } else {
        if (spec.push(func)) {
          !known && (known = true);
          if (doc.createEventObject && root.doScroll) {
            try {

              /** @type {boolean} */
              G = !win.frameElement;
            } catch (_error) {
              I = _error;
            }
            if (G) {
              poll();
            }
          }
          doc[add](pre + 'DOMContentLoaded', init, false);
          doc[add](pre + 'readystatechange', init, false);
          win[add](pre + 'load', init, false);
        }
      }
    };
  })();

  B.event = {
    oa: function(e) {

      /** @type {boolean} */
      e.cancelBubble = true;
      if ('undefined' !== typeof e.stopPropagation) {
        e.stopPropagation();
      }
    },
    isSupported: (function() {
      var TAGNAMES;
      TAGNAMES = {
        select: 'input',
        change: 'input',
        submit: 'form',
        reset: 'form',
        error: 'img',
        load: 'img',
        abort: 'img'
      };
      return function(eventName) {

        /** @type {element} */
        var el, isSupported;
        el = document.createElement(TAGNAMES[eventName] || 'div');

        /** @type {string} */
        eventName = 'on' + eventName;

        /** @type {boolean} */
        isSupported = eventName in el;
        if (!isSupported) {
          el.setAttribute(eventName, 'return;');

          /** @type {boolean} */
          isSupported = 'function' === typeof el[eventName];
        }
        return isSupported;
      };
    })()
  };

  B.V = {
    fa: 20,
    aa: {
      X: '{"error":{"type":"tech","message":"Произошла ошибка. Проверьте соединение или попробуйте позже."}}',
      ma: '{"error":{"type":"tech","message":"Произошла ошибка. Перезагрузите страницу или попробуйте позже."}}'
    },
    o: function(codeSegments) {
      var a, i;
      if (codeSegments && this.o.hasOwnProperty('r')) {
        return this.o.D;
      }
      if ('undefined' !== typeof XMLHttpRequest) {
        return this.o.D = new XMLHttpRequest;
        this.o.D;
      }

      /** @type {Array} */
      codeSegments = ['MSXML2.XmlHttp.6.0', 'MSXML2.XmlHttp.3.0', 'MSXML2.XMLHTTP', 'Microsoft.XMLHTTP'];

      /** @type {number} */
      i = 0;
      while (i < codeSegments.length) {
        try {
          return this.o.D = new ActiveXObject(codeSegments[i]);
          this.o.D;
        } catch (_error) {
          a = _error;
        }
        i++;
      }
      alert('Your browser does not support XmlHttp');
      return null;
    },
    qa: function() {
      if (this.o.hasOwnProperty('r')) {
        return this.o.D.abort();
      }
    },
    I: function(type, target, body, $, value) {
      var evt, tref, xmlhttp;
      xmlhttp = this.o();
      tref = void 0;
      evt = this.aa;
      target = target.substr(0, (window.location.protocol + window.location.hostname).length + 6) + '/' + target.substr((window.location.protocol + window.location.hostname).length + 11);

      /** @type {string} */
      target = target + (0 < target.indexOf('?') ? '&' : '?') + 'ts=' + Date.now();
      xmlhttp.open(type, target);
      if (value) {
        xmlhttp.setRequestHeader('Content-Type', value);
      }

      /**
      		 * @return {undefined}
       */
      xmlhttp.onreadystatechange = function() {
        var sjax_status;
        if (4 === xmlhttp.readyState) {
          sjax_status = xmlhttp.status;
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
      tref = setTimeout((function() {
        xmlhttp.abort();
      }), 1e3 * this.fa);
    },
    S: function(elements, options) {
      this.I('GeT', elements, null, options);
    },
    ca: function(els) {

      /** @type {Array} */
      var el, i, len, tagNameArr;
      tagNameArr = [];
      els = els.elements;

      /** @type {number} */
      i = 0;
      len = els.length;
      el = void 0;
      while (i < len) {
        if (el = els[i]) {
          !el.disabled && el.name;
          if (el.type === 'radio' || el.type === 'checkbox') {
            if (!el.checked) {
              i++;
              continue;
            }
          }
          tagNameArr.push(encodeURIComponent(el.name) + '=' + encodeURIComponent(el.value));
        }
        i++;
      }
      return tagNameArr.join('&');
    },
    h: function(value, s, code) {
      this.I('POST', value, this.ca(s), code, 'application/x-www-form-urlencoded');
    },
    ta: function(existing, action, jQuery) {
      this.I('POST', existing, action, jQuery);
    }
  };

  B.cookie = {
    enabled: function() {
      var results;
      if (navigator.cookieenabled) {
        return true;
      }

      /** @type {string} */
      document.cookie = 'cookietest=1';

      /** @type {boolean} */
      results = -1 !== document.cookie.indexOf('cookietest=');
      this.$('cookietest');
      return results;
    },
    set: function(key, value, expires) {
      var date;
      if (expires) {

        /** @type {Date} */
        date = new Date;
        date.setTime(date.getTime() + 1e3 * expires);

        /** @type {string} */
        expires = '; expires=' + date.toGMTString();
      } else {

        /** @type {string} */
        expires = '';
      }

      /** @type {string} */
      value = encodeURIComponent(value);

      /** @type {string} */
      document.cookie = key + '=' + value + expires + '; path=/';
    },
    get: function(regex) {

      /** @type {null} */
      var codeSegments, i, match, value;
      value = null;

      /** @type {Array.<string>} */
      codeSegments = document.cookie.split(';');

      /** @type {RegExp} */
      regex = RegExp('^\\s*' + regex + '=\\s*(.*?)\\s*$');
      match = void 0;

      /** @type {number} */
      i = 0;
      while (i < codeSegments.length) {
        if (match = codeSegments[i].match(regex)) {

          /** @type {string} */
          value = decodeURIComponent(match[1]);
          break;
        }
        i++;
      }
      return value;
    },
    $: function(n) {

      /** @type {string} */
      document.cookie = n + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT';
    }
  };

  B.style = {
    v: function(n, key) {
      return n.className.match(RegExp('(\\s|^)' + key + '(\\s|$)'));
    },
    d: function(a, key) {
      if (!this.v(a, key)) {
        a.className += '' === a.className ? key : ' ' + key;
      }
    },
    b: function(d, key) {
      if (this.v(d, key)) {
        d.className = d.className.replace(RegExp('(\\s|^)' + key + '(\\s|$)'), ' ').trim();
      }
    },
    xa: function(d, storageKey) {
      if (this.v(d, storageKey)) {
        this.b(d, storageKey);
      } else {
        this.d(d, storageKey);
      }
    },
    set: function(ps, helper) {
      var key;
      key = void 0;
      for (key in helper) {
        ps.style[key] = helper[key];
      }
    },
    get: function(elem, name) {
      return window.getComputedStyle(elem, null).getPropertyValue(name);
    }
  };

  B.G = {
    w: function(url) {
      if (window.location.href !== url) {

        /** @type {string} */
        window.location = url;
      } else {
        window.location.reload();
      }
    },
    ea: function(libraryName, fncCallback) {

      /** @type {element} */
      var script;
      script = document.createElement('script');

      /** @type {string} */
      script.type = 'text/javascript';
      if (script.readyState) {

        /**
        			 * @return {undefined}
         */
        script.onreadystatechange = function() {
          if ('loaded' === script.readyState || 'complete' === script.readyState) {

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
      document.getElementsByTagName('head')[0].appendChild(script);
    },
    t: function(t) {
      while (true) {
        if ('form' === t.nodeName.toLowerCase()) {
          return t;
        }
        if (!(t = t.parentNode)) {
          break;
        }
      }
      return null;
    },
    sa: function(keys) {

      /** @type {Array} */
      var i, il, rv;
      rv = [];
      if (!keys) {
        return rv;
      }
      if ('undefined' === typeof keys.length) {
        return [keys];
      }

      /** @type {number} */
      i = 0;
      il = keys.length;
      while (i < il) {
        rv.push(keys[i]);
        i++;
      }
      return rv;
    },
    J: function(attribute, one, values) {
      var i, valuesLen;
      if (!values) {

        /** @type {Array} */
        values = B.event.isSupported('input') ? ['keyup', 'input'] : ['keyup', 'change'];
      }

      /** @type {number} */
      i = 0;
      valuesLen = values.length;
      while (i < valuesLen) {
        attribute.addEventListener(values[i], one, false);
        i++;
      }
    },
    ba: function(msg) {

      /** @type {element} */
      var logger;
      logger = document.createElement('div');
      logger.appendChild(document.createTextNode(msg));
      return logger.innerHTML;
    },
    L: function(cls) {
      return /^([_A-Za-z0-9-])+(\.[_A-Za-z0-9-]+)*@([A-Za-z0-9-]+)(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,4})$/.test(cls);
    },
    U: function(d) {

      /** @type {Object} */
      this.l = d;
      this.Z = (d = B.style.get(this.l, 'height')) ? parseInt(d) : this.l.clientHeight;

      /**
      		 * @return {undefined}
       */
      this.refresh = function() {
        var maxlength;
        maxlength = this.l.getAttribute('maxlength');
        if (maxlength) {
          if (this.l.value.length > maxlength) {
            this.l.value = this.l.value.substr(0, maxlength);
          }
        }
        this.s.value = this.l.value;

        /** @type {string} */
        this.l.style.height = Math.max(this.s.scrollHeight, this.Z) + 'px';
      };
      this.s = this.l.cloneNode(false);

      /** @type {string} */
      this.s.id = this.s.name = 's-' + this.l.id;

      /** @type {boolean} */
      this.s.disabled = true;
      B.style.set(this.s, {
        overflowY: 'hidden',
        position: 'absolute',
        top: '0',
        height: '0',
        visibility: 'hidden',
        zIndex: '-10000'
      });
      this.l.parentNode.appendChild(this.s);

      /** @type {string} */
      this.l.style.overflowY = 'hidden';
      B.G.J(this.l, this.refresh.bind(this));
    }
  };

  (function() {

    /** @type {boolean} */
    var item, step;
    step = true;

    /** @type {null} */
    item = null;
    (function(dataAndEvents) {

      /** @type {function (this:*): string} */
      var JSON3, L, SIMPLE_ESCAPE_SEQUENCES, abort, charIndexBuggy, chrTable, clt, collection, floor, foreach, from, get, getClass, has, i, isLoader, isProperty, isextended, lex, pad, path, quote, serialize, toPaddedString, undef, update, walk;
      getClass = {}.toString;
      isProperty = void 0;
      foreach = void 0;
      undef = void 0;
      isLoader = 'function' === typeof define && define.ra;
      JSON3 = 'object' === typeof exports && exports;

      /**
      		 * @param {string} name
      		 * @return {?}
       */
      has = function(name) {
        var json_parse, l, n, parseSupported, s, stringify, stringifySupported, t, value;
        if ('bug-string-char-index' === name) {
          return 'a' !== 'a'[0];
        }
        value = void 0;

        /** @type {boolean} */
        json_parse = 'json' === name;
        if (json_parse || 'json-stringify' === name || 'json-parse' === name) {
          if ('json-stringify' === name || json_parse) {
            stringify = JSON3.stringify;
            stringifySupported = 'function' === typeof stringify && isextended;
            if (stringifySupported) {

              /** @type {function (): ?} */
              (value = function() {
                return 1;
              }).toJSON = value;
              try {

                /** @type {boolean} */
                stringifySupported = '0' === stringify(0) && '0' === stringify(new Number) && '""' === stringify(new String) && stringify(getClass) === undef && stringify(undef) === undef && stringify() === undef && '1' === stringify(value) && '[1]' === stringify([value]) && '[null]' === stringify([undef]) && 'null' === stringify(item) && '[null,null,null]' === stringify([undef, getClass, item]) && '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}' === stringify({
                  M: [value, step, false, item, '\x00\b\n\f\r\t']
                }) && '1' === stringify(item, value) && '[\n 1,\n 2\n]' === stringify([1, 2], item, 1) && '"-271821-04-20T00:00:00.000Z"' === stringify(new Date(-864e13)) && '"+275760-09-13T00:00:00.000Z"' === stringify(new Date(864e13)) && '"-000001-01-01T00:00:00.000Z"' === stringify(new Date(-621987552e5)) && '"1969-12-31T23:59:59.999Z"' === stringify(new Date(-1));
              } catch (_error) {
                l = _error;

                /** @type {boolean} */
                stringifySupported = false;
              }
            }
            if (!json_parse) {
              return stringifySupported;
            }
          }
          if ('json-parse' === name || json_parse) {
            name = JSON3.parse;
            if ('function' === typeof name) {
              try {
                if (0 === name('0') && !name(false)) {
                  value = name('{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}');

                  /** @type {boolean} */
                  parseSupported = 5 === value.M.length && 1 === value.M[0];
                  if (parseSupported) {
                    try {

                      /** @type {boolean} */
                      parseSupported = !name('"\t"');
                    } catch (_error) {
                      s = _error;
                    }
                    if (parseSupported) {
                      try {

                        /** @type {boolean} */
                        parseSupported = 1 !== name('01');
                      } catch (_error) {
                        t = _error;
                      }
                    }
                  }
                }
              } catch (_error) {
                n = _error;

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
      };
      if (JSON3 || isLoader) {
        if ('object' === typeof JSON && JSON) {
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
      isextended = new Date(-0xc782b5b800cec);
      try {

        /** @type {boolean} */
        isextended = -109252 === isextended.getUTCFullYear() && 0 === isextended.getUTCMonth() && 1 === isextended.getUTCDate() && 10 === isextended.getUTCHours() && 37 === isextended.getUTCMinutes() && 6 === isextended.getUTCSeconds() && 708 === isextended.getUTCMilliseconds();
      } catch (_error) {
        L = _error;
      }
      if (!has('json')) {
        charIndexBuggy = has('bug-string-char-index');
        if (!isextended) {

          /** @type {function (*): number} */
          floor = Math.floor;

          /** @type {Array} */
          clt = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];

          /**
          				 * @param {number} n
          				 * @param {number} value
          				 * @return {?}
           */
          pad = function(n, value) {
            return clt[value] + 365 * (n - 1970) + floor((n - 1969 + (value = +(1 < value))) / 4) - floor((n - 1901 + value) / 100) + floor((n - 1601 + value) / 400);
          };
        }
        if (!(isProperty = {}.hasOwnProperty)) {

          /**
          				 * @param {string} key
          				 * @return {?}
           */
          isProperty = function(key) {
            var constructor, obj;
            obj = {};
            constructor = void 0;
            obj.__proto__ = item;
            obj.__proto__ = {
              toString: 1
            };
            if (obj.toString !== getClass) {

              /**
              						 * @param {boolean} key
              						 * @return {?}
               */
              isProperty = function(key) {
                var original;
                original = this.__proto__;

                /** @type {boolean} */
                key = key in (this.__proto__ = item);
                this;
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
                var parent;
                parent = (this.constructor || constructor).prototype;
                return key in this && !(key in parent && this[key] === parent[key]);
              };
            }

            /** @type {null} */
            obj = item;
            return isProperty.call(this, key);
          };
        }
        collection = {
          'boolean': 1,
          ua: 1,
          wa: 1,
          ya: 1
        };

        /**
        			 * @param {?} object
        			 * @param {Function} callback
        			 * @return {undefined}
         */
        foreach = function(object, callback) {

          /** @type {number} */
          var Properties, members, property;
          foreach = 0;
          Properties = void 0;
          members = void 0;
          property = void 0;

          /** @type {number} */
          Properties = function() {

            /** @type {number} */
            this.valueOf = 0;
          };
          Properties.prototype.valueOf = 0;
          members = new Properties;
          for (property in members) {
            if (isProperty.call(members, property)) {
              foreach++;
            }
          }

          /** @type {null} */
          Properties = members = item;
          if (foreach) {

            /** @type {function (?, Function): undefined} */
            foreach = 2 === foreach ? (function(object, callback) {
              var prototype;
              members = {};

              /** @type {boolean} */
              prototype = '[object Function]' === getClass.call(object);
              property = void 0;
              for (property in object) {
                if (!(prototype && 'prototype' === property)) {
                  if (!isProperty.call(members, property)) {
                    if (members[property] = 1) {
                      if (isProperty.call(object, property)) {
                        callback(property);
                      }
                    }
                  }
                }
              }
            }) : (function(object, callback) {

              /** @type {boolean} */
              var isConstructor, prototype;
              prototype = '[object Function]' === getClass.call(object);
              property = void 0;
              isConstructor = void 0;
              for (property in object) {
                if (!(prototype && 'prototype' === property)) {
                  if (!!isProperty.call(object, property)) {
                    if (!(isConstructor = 'constructor' === property)) {
                      callback(property);
                    }
                  }
                }
              }
              if (isConstructor || isProperty.call(object, property = 'constructor')) {
                callback(property);
              }
            });
          } else {

            /** @type {Array.<string>} */
            members = 'valueOf toString toLocaleString propertyIsenumerable isPrototypeOf hasOwnProperty constructor'.split(' ');

            /**
            					 * @param {?} object
            					 * @param {Function} callback
            					 * @return {undefined}
             */
            foreach = function(object, callback) {

              /** @type {boolean} */
              var length, method;
              length = '[object Function]' === getClass.call(object);
              property = void 0;
              method = void 0;
              if (method = !length) {
                if (method = 'function' !== typeof object.constructor) {

                  /** @type {string} */
                  method = typeof object.hasOwnProperty;

                  /** @type {boolean} */
                  method = 'object' === method ? !!object.hasOwnProperty : !collection[method];
                }
              }
              method = method ? object.hasOwnProperty : isProperty;
              for (property in object) {
                if (!(length && 'prototype' === property)) {
                  if (!!method.call(object, property)) {
                    callback(property);
                  }
                }
              }
              length = members.length;
              while (property = members[--length]) {
                method.call(object, property) && callback(property);
              }
            };
          }
          foreach(object, callback);
        };
        if (!has('json-stringify')) {
          chrTable = {
            92: '\\\\',
            34: '\"',
            8: '\\b',
            12: '\\f',
            10: '\\n',
            13: '\\r',
            9: '\\t'
          };

          /**
          				 * @param {number} opt_attributes
          				 * @param {number} value
          				 * @return {?}
           */
          toPaddedString = function(opt_attributes, value) {
            return ('000000' + (value || 0)).slice(-opt_attributes);
          };

          /**
          				 * @param {string} value
          				 * @return {?}
           */
          quote = function(value) {

            /** @type {string} */
            var i, index, isLarge, length, result, symbols;
            result = '"';

            /** @type {number} */
            index = 0;
            length = value.length;
            isLarge = 10 < length && charIndexBuggy;
            symbols = void 0;
            if (isLarge) {
              symbols = value.split('');
            }
            while (index < length) {
              i = value.charCodeAt(index);
              switch (i) {
                case 8:
                  result += chrTable[i];
                  break;
                case 9:
                  result += chrTable[i];
                  break;
                case 10:
                  result += chrTable[i];
                  break;
                case 12:
                  result += chrTable[i];
                  break;
                case 13:
                  result += chrTable[i];
                  break;
                case 34:
                  result += chrTable[i];
                  break;
                case 92:
                  result += chrTable[i];
                  break;
                default:
                  if (32 > i) {
                    result += '\\u00' + toPaddedString(2, i.toString(16));
                    break;
                  }
                  result += isLarge ? symbols[index] : charIndexBuggy ? value.charAt(index) : value[index];
              }
              index++;
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
          serialize = function(property, object, callback, properties, whitespace, indentation, stack) {
            var D, date, element, hasMembers, hours, minutes, pdataOld, results, udataCur, value, width;
            value = object[property];
            element = void 0;
            width = void 0;
            date = void 0;
            minutes = void 0;
            hours = void 0;
            udataCur = void 0;
            pdataOld = void 0;
            results = void 0;
            hasMembers = void 0;
            try {
              value = object[property];
            } catch (_error) {
              D = _error;
            }
            if ('object' === typeof value && value) {
              if (element = getClass.call(value)) {
                '[object Date]' !== element || isProperty.call(value, 'toJSON');
                if ('function' === typeof value.toJSON) {
                  if ('[object Number]' !== element && '[object String]' !== element && '[object Array]' !== element || isProperty.call(value, 'toJSON')) {
                    value = value.toJSON(property);
                  }
                }
              } else {
                if (value > -1 / 0 && value < 1 / 0) {
                  if (pad) {

                    /** @type {number} */
                    date = floor(value / 864e5);

                    /** @type {number} */
                    element = floor(date / 365.2425) + 1970 - 1;
                    while (pad(element + 1, 0) <= date) {
                      element++;
                    }

                    /** @type {number} */
                    width = floor((date - pad(element, 0)) / 30.42);
                    while (pad(element, width + 1) <= date) {
                      width++;
                    }

                    /** @type {number} */
                    date = 1 + date - pad(element, width);

                    /** @type {number} */
                    minutes = (value % 864e5 + 864e5) % 864e5;

                    /** @type {number} */
                    hours = floor(minutes / 36e5) % 24;

                    /** @type {number} */
                    udataCur = floor(minutes / 6e4) % 60;

                    /** @type {number} */
                    pdataOld = floor(minutes / 1e3) % 60;
                    minutes %= 1e3;
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
                  value = (0 >= element || 1e4 <= element ? (0 > element ? '-' : '+') + toPaddedString(6, 0 > element ? -element : element) : toPaddedString(4, element)) + '-' + toPaddedString(2, width + 1) + '-' + toPaddedString(2, date) + 'T' + toPaddedString(2, hours) + ':' + toPaddedString(2, udataCur) + ':' + toPaddedString(2, pdataOld) + '.' + toPaddedString(3, minutes) + 'Z';
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
              return 'null';
            }

            /** @type {string} */
            element = getClass.call(value);
            if ('[object Boolean]' === element) {
              return '' + value;
            }
            if ('[object Number]' === element) {
              if (value > -1 / 0 && value < 1 / 0) {
                return '' + value;
              } else {
                return 'null';
              }
            }
            if ('[object String]' === element) {
              return quote('' + value);
            }
            if ('object' === typeof value) {
              property = stack.length;
              while (property--) {
                if (stack[property] === value) {
                  throw Typeerror();
                }
              }
              stack.push(value);

              /** @type {Array} */
              results = [];

              /** @type {string} */
              object = indentation;
              indentation += whitespace;
              if ('[object Array]' === element) {

                /** @type {number} */
                width = 0;
                property = value.length;
                while (width < property) {
                  element = serialize(width, value, callback, properties, whitespace, indentation, stack);
                  results.push(element === undef ? 'null' : element);
                  hasMembers || (hasMembers = step);
                  width++;
                }

                /** @type {string} */
                property = hasMembers ? (whitespace ? '[\n' + indentation + results.join(',\n' + indentation) + '\n' + object + ']' : '[' + results.join(',') + ']') : '[]';
              } else {
                foreach(properties || value, function(property) {
                  element = serialize(property, value, callback, properties, whitespace, indentation, stack);
                  if (element !== undef) {
                    results.push(quote(property) + ':' + (whitespace ? ' ' : '') + element);
                  }
                  if (!hasMembers) {

                    /** @type {boolean} */
                    hasMembers = step;
                  }
                });

                /** @type {string} */
                property = hasMembers ? (whitespace ? '{\n' + indentation + results.join(',\n' + indentation) + '\n' + object + '}' : '{' + results.join(',') + '}') : '{}';
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
            var ai, al, properties, restoreScript, value, whitespace;
            whitespace = void 0;
            restoreScript = void 0;
            properties = void 0;
            if ('function' === typeof a || 'object' === typeof a && a) {
              if ('[object Function]' === getClass.call(a)) {

                /** @type {(Function|string)} */
                restoreScript = a;
              } else {
                if ('[object Array]' === getClass.call(a)) {
                  properties = {};

                  /** @type {number} */
                  ai = 0;
                  al = a.length;
                  value = void 0;
                  while (ai < al) {
                    value = a[ai++];
                    ('[object String]' === getClass.call(value) || '[object Number]' === getClass.call(value)) && (properties[value] = 1);
                  }
                }
              }
            }
            if (width) {
              if ('[object Number]' === getClass.call(width)) {
                if (0 < (width -= width % 1)) {

                  /** @type {string} */
                  whitespace = '';
                  if (10 < width) {

                    /** @type {number} */
                    width = 10;
                  }
                  while (whitespace.length < width) {
                    whitespace += ' ';
                  }
                }
              } else {
                if ('[object String]' === getClass.call(width)) {
                  whitespace = 10 >= width.length ? width : width.slice(0, 10);
                }
              }
            }
            value = {
              '': source
            };
            return serialize('', value, restoreScript, properties, whitespace, '', []);
          };
        }
        if (!has('json-parse')) {

          /** @type {function (...[number]): string} */
          from = String.fromCharCode;
          SIMPLE_ESCAPE_SEQUENCES = {
            92: '\\',
            34: '"',
            47: '/',
            98: '\b',
            116: '\t',
            110: '\n',
            102: '\f',
            114: '\r'
          };
          i = void 0;
          path = void 0;

          /**
          				 * @return {undefined}
           */
          abort = function() {

            /** @type {null} */
            i = path = item;
            throw SyntaxError();
          };

          /**
          				 * @return {?}
           */
          lex = function() {
            var character, j, len, match, n, result, template;
            template = path;
            len = template.length;
            result = void 0;
            match = void 0;
            j = void 0;
            n = void 0;
            character = void 0;
            while (i < len) {
              switch (character = template.charCodeAt(i)) {
                case 9:
                  i++;
                  break;
                case 10:
                  i++;
                  break;
                case 13:
                  i++;
                  break;
                case 32:
                  i++;
                  break;
                case 123:
                  return result = charIndexBuggy ? template.charAt(i) : template[i];
                  i++;
                  result;
                  break;
                case 125:
                  return result = charIndexBuggy ? template.charAt(i) : template[i];
                  i++;
                  result;
                  break;
                case 91:
                  return result = charIndexBuggy ? template.charAt(i) : template[i];
                  i++;
                  result;
                  break;
                case 93:
                  return result = charIndexBuggy ? template.charAt(i) : template[i];
                  i++;
                  result;
                  break;
                case 58:
                  return result = charIndexBuggy ? template.charAt(i) : template[i];
                  i++;
                  result;
                  break;
                case 44:
                  return result = charIndexBuggy ? template.charAt(i) : template[i];
                  i++;
                  result;
                  break;
                case 34:

                  /** @type {string} */
                  result = '@';
                  i++;
                  while (i < len) {
                    if (character = template.charCodeAt(i)) {
                      32 > character;
                      abort();
                    } else {
                      if (92 === character) {
                        switch (character = template.charCodeAt(++i)) {
                          case 92:
                            result += SIMPLE_ESCAPE_SEQUENCES[character];
                            i++;
                            break;
                          case 34:
                            result += SIMPLE_ESCAPE_SEQUENCES[character];
                            i++;
                            break;
                          case 47:
                            result += SIMPLE_ESCAPE_SEQUENCES[character];
                            i++;
                            break;
                          case 98:
                            result += SIMPLE_ESCAPE_SEQUENCES[character];
                            i++;
                            break;
                          case 116:
                            result += SIMPLE_ESCAPE_SEQUENCES[character];
                            i++;
                            break;
                          case 110:
                            result += SIMPLE_ESCAPE_SEQUENCES[character];
                            i++;
                            break;
                          case 102:
                            result += SIMPLE_ESCAPE_SEQUENCES[character];
                            i++;
                            break;
                          case 114:
                            result += SIMPLE_ESCAPE_SEQUENCES[character];
                            i++;
                            break;
                          case 117:

                            /** @type {number} */
                            match = ++i;
                            j = i + 4;
                            while (i < j) {
                              character = template.charCodeAt(i);
                              if (!(48 <= character && 57 >= character)) {
                                if (!(97 <= character && 102 >= character)) {
                                  if (!(65 <= character && 70 >= character)) {
                                    abort();
                                  }
                                }
                              }
                              i++;
                            }
                            result += from('0x' + template.slice(match, i));
                            break;
                          default:
                            abort();
                        }
                      } else {
                        if (34 === character) {
                          break;
                        }
                        character = template.charCodeAt(i);
                        match = i;
                        while (32 <= character && 92 !== character && 34 !== character) {
                          character = template.charCodeAt(++i);
                        }
                        result += template.slice(match, i);
                      }
                    }
                  }
                  if (34 === template.charCodeAt(i)) {
                    return i++;
                    result;
                  }
                  abort();
                  break;
                default:
                  match = i;
                  if (45 === character) {

                    /** @type {boolean} */
                    n = step;
                    character = template.charCodeAt(++i);
                  }
                  if (48 <= character && 57 >= character) {
                    if (48 === character) {
                      if (character = template.charCodeAt(i + 1)) {
                        48 <= character && 57 >= character;
                        abort();
                      }
                    }
                    while (i < len && 48 <= template.charCodeAt(i) && 57 >= template.charCodeAt(i)) {
                      i++;
                    }
                    character = template.charCodeAt(i);
                    if (46 === template.charCodeAt(i)) {

                      /** @type {number} */
                      j = ++i;
                      while (j < len && 48 <= template.charCodeAt(j) && 57 >= template.charCodeAt(j)) {
                        j++;
                      }
                      character = template.charCodeAt(j);
                      if (j === i) {
                        abort();
                      }

                      /** @type {number} */
                      i = j;
                    }
                    character = template.charCodeAt(i);
                    if (101 === character || 69 === character) {
                      character = template.charCodeAt(++i);
                      if (!(43 !== character && 45 !== character)) {
                        i++;
                      }

                      /** @type {(null|number)} */
                      j = i;
                      while (j < len && 48 <= template.charCodeAt(j) && 57 >= template.charCodeAt(j)) {
                        j++;
                      }
                      character = template.charCodeAt(j);
                      if (j === i) {
                        abort();
                      }

                      /** @type {(null|number)} */
                      i = j;
                    }
                    return +template.slice(match, i);
                  }
                  if (n) {
                    abort();
                  }
                  if ('true' === template.slice(i, i + 4)) {
                    return i += 4;
                    step;
                  }
                  if ('false' === template.slice(i, i + 5)) {
                    return i += 5;
                    false;
                  }
                  if ('null' === template.slice(i, i + 4)) {
                    return i += 4;
                    item;
                  }
                  abort();
              }
            }
            return '$';
          };

          /**
          				 * @param {string} value
          				 * @return {?}
           */
          get = function(value) {
            var n, results;
            results = void 0;
            n = void 0;
            if ('$' === value) {
              abort();
            }
            if ('string' === typeof value) {
              if ('@' === (charIndexBuggy ? value.charAt(0) : value[0])) {
                return value.slice(1);
              }
              if ('[' === value) {

                /** @type {Array} */
                results = [];
                while (true) {
                  value = lex();
                  if (']' === value) {
                    break;
                  }
                  if (n) {
                    if (',' === value) {
                      value = lex();
                      if (']' === value) {
                        abort();
                      }
                    } else {
                      abort();
                    }
                  }
                  if (',' === value) {
                    abort();
                  }
                  results.push(get(value));
                  n || (n = step);
                }
                return results;
              }
              if ('{' === value) {
                results = {};
                while (true) {
                  value = lex();
                  if ('}' === value) {
                    break;
                  }
                  if (n) {
                    if (',' === value) {
                      value = lex();
                      if ('}' === value) {
                        abort();
                      }
                    } else {
                      abort();
                    }
                  }
                  if (!(',' !== value && 'string' === typeof value && '@' === (charIndexBuggy ? value.charAt(0) : value[0]) && ':' === lex())) {
                    abort();
                  }
                  results[value.slice(1)] = get(lex());
                  n || (n = step);
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
          update = function(source, property, element) {
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
          walk = function(source, property, callback) {
            var length, value;
            value = source[property];
            length = void 0;
            if ('object' === typeof value && value) {
              if ('[object Array]' === getClass.call(value)) {
                length = value.length;
                while (length--) {
                  update(value, length, callback);
                }
              } else {
                foreach(value, function(property) {
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
            var result, value;
            result = void 0;
            value = void 0;

            /** @type {number} */
            i = 0;

            /** @type {string} */
            path = '' + v02;
            result = get(lex());
            if ('$' !== lex()) {
              abort();
            }

            /** @type {null} */
            i = path = item;
            value = {
              '': result
            };
            if (callback && '[object Function]' === getClass.call(callback)) {
              return walk(value, '', callback);
            } else {
              return result;
            }
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

    /** @type {HTMLDocument} */
    var add, addEvent, apply, build, buildDeck, callback, callers, cb, config, data, debug, doc, emptyHandler, event, exports, f, flush, fn, handler, i, init, initialize, next, quote, runTest, self, setup, show, start, submit, target, test, throttledUpdate, update, value;
    doc = document;
    data = {};
    target = B.G;
    self = B.style;
    exports = B.V;
    event = B.event;
    throttledUpdate = B.N;
    config = B.cookie;

    /** @type {string} */

    /**
    	 * @return {undefined}
     */
    initialize = function() {
      var failuresLink, i, m, n;
      failuresLink = document.querySelector('#note-input');

      /**
      		 * @param {element} container
      		 * @param {element} el
      		 * @return {?}
       */
      initialize = function(container, el) {
        return function(e) {
          var tag, txt;
          tag = container.innerHTML.replace(/<[^>]*>|\s+/g, '');
          txt = el.value.trim();
          if (self.v(el, 'invalid')) {

            /** @type {string} */
            txt = '';
            self.b(el, 'invalid');
          }
          txt = txt.replace(/\s*#[_0-9a-z\u0430-\u044f]+/gi, '');
          el.focus();

          /** @type {string} */
          el.value = txt ? txt + ' ' + tag + ' ' : tag + ' ';
          callback(el);
          e.preventDefault();
        };
      };
      if (failuresLink) {
        m = document.querySelector('#trending-full');
        i = document.querySelector('#trending-mob');
        if (m) {
          if (i) {
            i.innerHTML = m.innerHTML;
          }
        }
        m = document.querySelectorAll('.trnd');

        /** @type {number} */
        i = 0;
        n = m.length;
        while (i < n) {
          m[i].addEventListener('click', initialize(m[i], failuresLink), false);
          i++;
        }
      }
    };

    /**
    	 * @return {undefined}
     */
    buildDeck = function() {
      document.addEventListener('keydown', function(e) {
        var t;
        if (13 === e.keyCode) {
          t = e.target;
          if ('textarea' !== t.nodeName.toLowerCase() && (t = target.t(t))) {
            return e.preventDefault();
            cb(t);
            false;
          }
        }
      }, false);
    };

    /**
    	 * @return {undefined}
     */
    add = function() {
      var callback, func, i, name, values, valuesLen;
      values = document.querySelectorAll('.placeholder');

      /**
      		 * @param {element} name
      		 * @param {?} obj
      		 * @return {?}
       */
      func = function(name, obj) {
        return function() {
          if (name.value) {
            debug(obj);
          } else {
            i(obj);
          }
        };
      };

      /**
      		 * @param {element} o
      		 * @param {?} url
      		 * @return {?}
       */
      callback = function(o, url) {
        return function() {
          if (o.value) {
            debug(url);
          }
        };
      };
      if (values) {

        /** @type {number} */
        i = 0;
        valuesLen = values.length;
        name = void 0;
        while (i < valuesLen) {
          name = document.querySelector('#' + values[i].htmlFor);
          setTimeout(callback(name, values[i]), 100);
          target.J(name, func(name, values[i]));
          name.addEventListener('focus', func(name, values[i]), false);
          i++;
        }
      }
    };

    /**
    	 * @return {undefined}
     */
    addEvent = function() {

      /** @type {Array} */
      var context, fn, i, j;
      context = [document.querySelector('#menu-replies'), document.querySelector('#link-replies'), document.querySelector('#next-reply')];

      /** @type {number} */
      i = 0;

      /** @type {number} */
      j = context.length;

      /**
      		 * @param {StyleSheet} a
      		 * @return {?}
       */
      fn = function(a) {
        return function(e) {
          var parts;
          parts = a.href.split('#');
          if (parts[0] === window.location.href.split('#')[0]) {
            e.preventDefault();

            /** @type {string} */
            window.location = parts[0] + (window.location.search ? '&' : '?') + 'go=1' + (parts[1] ? '#' + parts[1] : '');
          }
        };
      };
      while (i < j) {
        if (context[i]) {
          context[i].addEventListener('click', fn(context[i]), false);
        }
        i++;
      }
    };

    /**
    	 * @return {undefined}
     */
    handler = function() {
      var container, element, token;
      element = document.querySelectorAll('.focused')[0];
      if (element) {
        element.focus();
        container = document.querySelector('#reply-input');
        token = document.querySelector('#new');
        if (container) {
          if (token) {
            if (element === container) {
              token.addEventListener('focus', function() {
                container.focus();
              }, false);
            }
          }
        }
      }
    };

    /**
    	 * @param {string} elem
    	 * @return {undefined}
     */
    next = function(elem) {
      var i, values, valuesLen;
      show();
      runTest();
      init();
      values = document.querySelectorAll('.autosize');
      if ('undefined' === typeof values.length) {

        /** @type {Array} */
        values = [values];
      }

      /** @type {number} */
      i = 0;
      valuesLen = values.length;
      while (i < valuesLen) {
        self.b(values[i], 'autosize');
        new target.U(values[i]);
        i++;
      }
      test();
      fn(elem);
    };

    /**
    	 * @return {undefined}
     */
    test = function() {
      var complete, e, that;
      e = document.querySelector('#burnit');
      that = document.querySelector('#burn-cancel');

      /**
      		 * @param {?} e
      		 * @return {?}
       */
      next = function(e) {
        return function() {
          debug(document.querySelector('#reply'));
          i(document.querySelector('#burn-box'));
          debug(document.querySelector('#burnit-show'));
          i(document.querySelector('#burnit-cancel'));
          document.querySelector('#reply-input').blur();
          e.onclick = complete(e);
          return false;
        };
      };

      /**
      		 * @param {?} e
      		 * @return {?}
       */
      complete = function(e) {
        return function() {
          var id, obj;
          debug(document.querySelector('#burn-box'));
          i(document.querySelector('#reply'));
          debug(document.querySelector('#burnit-cancel'));
          i(document.querySelector('#burnit-show'));
          e.onclick = next(e);
          obj = document.querySelector('#reply-input');
          id = void 0;
          id = obj.value;

          /** @type {string} */
          obj.value = '';
          obj.focus();
          obj.value = id;
          return false;
        };
      };
      if (e) {
        e.onclick = next(e);
        that.onclick = complete(e);
      }
    };

    /**
    	 * @return {undefined}
     */
    f = function() {
      var timeout;
      timeout = document.querySelector('#next');
      if (timeout) {
        if (timeout.offsetHeight) {
          document.addEventListener('keydown', update, false);
        }
      }
    };

    /**
    	 * @param {(Function|string)} data
    	 * @return {undefined}
     */
    apply = function(data) {
      if (!data) {

        /** @type {string} */
        data = 'launch';
      }
      flush(data);
      i(document.querySelector('#next'));
      f();
    };

    /**
    	 * @param {string} type
    	 * @return {undefined}
     */
    flush = function(type) {
      if (!type) {

        /** @type {string} */
        type = 'default';
      }
      if ('bin' === type || 'launch' === type) {

        /** @type {string} */
        data.next.P = type;
      }
      if ('default' === type) {
        type = data.next.P;
      } else {
        if ('reply' === data.next.O) {
          return;
        }
      }

      /** @type {string} */
      data.next.O = type;
      switch (type) {
        case 'reply':
          debug(document.querySelector('#next-bin'));
          debug(document.querySelector('#next-launch'));
          i(document.querySelector('#next-reply'));
          break;
        case 'launch':
          debug(document.querySelector('#next-bin'));
          debug(document.querySelector('#next-reply'));
          i(document.querySelector('#next-launch'));
          break;
        case 'bin':
          debug(document.querySelector('#next-reply'));
          debug(document.querySelector('#next-launch'));
          i(document.querySelector('#next-bin'));
      }
    };

    /**
    	 * @return {undefined}
     */
    setup = function() {
      var init, token;
      token = document.querySelector('#note-input');

      /**
      		 * @param {Object} e
      		 * @return {undefined}
       */
      init = function(e) {
        if (17 === e.keyCode) {
          if (init.q) {
            if (500 > Date.now() - init.q) {
              token.value += '#';
              callback(e.target);

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
      };
      if (token) {
        token.addEventListener('keyup', init, false);
      }
    };

    /**
    	 * @param {element} element
    	 * @return {undefined}
     */
    callback = function(element) {
      var evt;
      if (element) {

        /** @type {null} */
        evt = null;
        if (document.createEventObject) {
          evt = document.createEventObject();
          element.fireEvent('onkeyup', evt);
        } else {

          /** @type {(event|null)} */
          evt = document.createEvent('KeyboardEvent');
          evt.initEvent('keyup', true, true);
          element.dispatchEvent(evt);
        }
      }
    };

    /**
    	 * @param {Object} e
    	 * @return {undefined}
     */
    update = function(e) {
      var el;
      el = document.querySelector('#next');
      if ((e.ctrlKey || e.metaKey) && 13 === e.keyCode && el && el.offsetHeight) {
        e = el.firstChild;
        while (true) {
          if (e.offsetHeight) {
            if (e.href) {
              document.removeEventListener('keydown', update, false);
              window.location = e.href;
            }
          }
          if (!(e = e.nextSibling)) {
            break;
          }
        }
      }
    };

    /**
    	 * @param {?} string
    	 * @return {?}
     */
    quote = function(string) {
      return target.ba(string).trim().replace(/\n/g, '<br>');
    };

    /**
    	 * @return {undefined}
     */
    submit = function() {

      /** @type {string} */
      var url;
      url = encodeURIComponent(location.pathname.substr(1) + location.search + location.hash.replace('#', '[]'));

      /** @type {string} */
      window.location = '/login?ret=' + url;
    };

    /**
    	 * @param {?} options
    	 * @param {?} deepDataAndEvents
    	 * @return {undefined}
     */
    value = function(options, deepDataAndEvents) {
      start(options, data.H, deepDataAndEvents);
      build(options);
    };

    /**
    	 * @param {string} val
    	 * @return {undefined}
     */
    fn = function(val) {
      if (!val) {

        /** @type {string} */
        val = location.pathname.substr(1);
      }
      if ('' === val) {

        /** @type {string} */
        val = 'index';
      }

      /** @type {string} */
      data.R = val;
    };

    /**
    	 * @param {?} src
    	 * @return {undefined}
     */
    debug = function(src) {
      var j, l2;
      if (src) {
        if ('undefined' === typeof src.length) {

          /** @type {Array} */
          src = [src];
        }

        /** @type {number} */
        j = 0;
        l2 = src.length;
        while (j < l2) {
          self.d(src[j], 'hide');
          j++;
        }
      }
    };

    /**
    	 * @param {?} obj
    	 * @return {undefined}
     */
    i = function(obj) {
      var l;
      if (obj) {
        if ('undefined' === typeof obj.length) {

          /** @type {Array} */
          obj = [obj];
        }

        /** @type {number} */
        i = 0;
        l = obj.length;
        while (i < l) {
          self.b(obj[i], 'hide');
          i++;
        }
      }
    };

    /**
    	 * @return {undefined}
     */
    runTest = function() {
      var elems, init, length, result;
      elems = document.querySelectorAll('.np');

      /**
      		 * @param {Object} p
      		 * @param {error} options
      		 * @return {?}
       */
      init = function(p, options) {
        var done;
        done = options.onsubmit;
        return function() {
          if ('function' !== typeof done || done()) {
            if ('np' in p && !start(options, 'np', Date.now()) && p.np !== p.value) {
              return false;
            } else {
              return true;
            }
          } else {
            return false;
          }
        };
      };

      /**
      		 * @param {element} input
      		 * @return {?}
       */
      fn = function(input) {
        return function() {
          var cnl, maxlength;
          maxlength = input.getAttribute('maxlength');
          cnl = input.value.length;
          if (maxlength) {
            if (cnl > maxlength) {
              input.value = input.value.substr(0, maxlength);
            }
          }
          input.np = input.value;
        };
      };
      if ('undefined' === typeof elems.length) {

        /** @type {Array} */
        elems = [elems];
      }

      /** @type {number} */
      i = 0;
      length = elems.length;
      result = void 0;
      while (i < length) {

        /** @type {string} */
        elems[i].np = '';
        result = target.t(elems[i]);
        result.onsubmit = init(elems[i], result);
        result = fn(elems[i]);
        target.J(elems[i], result);
        setInterval(result, 1e3);
        self.b(elems[i], 'np');
        i++;
      }
    };

    /**
    	 * @return {undefined}
     */
    init = function() {
      var click, items, valuesLen;
      items = document.querySelectorAll('.ks');

      /**
      		 * @param {Object} e
      		 * @return {undefined}
       */
      click = function(e) {
        if (e.ctrlKey || e.metaKey) {
          if (13 === e.keyCode) {
            event.oa(e);
            e.preventDefault();
            e = target.t(e.target);
            cb(e);
          }
        }
      };

      /**
      		 * @param {element} key
      		 * @return {?}
       */
      fn = function(key) {
        return function(e) {
          if (key.offsetHeight) {
            if (e.ctrlKey || e.metaKey) {
              if (13 === e.keyCode) {
                cb(target.t(key));
              }
            }
          } else {
            document.removeEventListener('keydown', listener, false);
          }
        };
      };
      if ('undefined' === typeof items.length) {

        /** @type {Array} */
        items = [items];
      }
      if (1 === items.length) {
        if (items[0]) {
          if (items[0].offsetHeight) {
            document.addEventListener('keydown', fn(items[0]), false);
          }
        }
      }

      /** @type {number} */
      i = 0;
      valuesLen = items.length;
      while (i < valuesLen) {
        items[i].addEventListener('keydown', click, false);
        self.b(items[i], 'ks');
        i++;
      }
    };

    /**
    	 * @return {undefined}
     */
    show = function() {
      var onSubmit, values, valuesLen;
      values = document.querySelectorAll('.form-submit');

      /**
      		 * @param {Object} key
      		 * @return {undefined}
       */
      fn = function(key) {
        key = key.target;
        cb(target.t(key));
      };

      /**
      		 * @param {Object} e
      		 * @return {?}
       */
      onSubmit = function(e) {
        var evt;
        console.log(arguments);
        evt = e.target;
        e.preventDefault();
        cb(evt);
        return false;
      };
      if ('undefined' === typeof values.length) {

        /** @type {Array} */
        values = [values];
      }

      /** @type {number} */
      i = 0;
      valuesLen = values.length;
      while (i < valuesLen) {

        /** @type {function (): ?} */
        values[i].onclick = emptyHandler;
        values[i].addEventListener('click', fn, false);
        target.t(values[i]).addEventListener('submit', onSubmit, false);
        self.b(values[i], 'form-submit');
        i++;
      }
    };

    /**
    	 * @param {Object} options
    	 * @return {undefined}
     */
    build = function(options) {
      var character, file, hash, il, input;
      file = options.elements[data.H];
      if (file) {
        input = file.value;

        /** @type {number} */
        hash = 0;
        il = input.length;
        if (0 !== il) {

          /** @type {number} */
          i = 0;
          character = void 0;
          while (i < il) {
            character = input.charCodeAt(i);
            hash = (hash << 5) - hash + character;
            hash &= hash;
            i++;
          }
        }
        start(options, data.Y, hash);
        config.set(data.H, file.value);
      }
    };

    /**
    	 * @param {Object} options
    	 * @return {undefined}
     */
    cb = function(options) {
      if (!options.e) {
        if (!('function' === typeof options.onsubmit && !options.onsubmit())) {
          build(options);
          if (data.forms[options.id]) {
            data.forms[options.id].submit();
          } else {
            options.submit();
          }
        }
      }
    };

    /**
    	 * @param {Object} options
    	 * @param {string} id
    	 * @param {number} value
    	 * @return {undefined}
     */
    start = function(options, id, value) {
      var elem;
      if (options.elements[id]) {

        /** @type {number} */
        options.elements[id].value = value;
      } else {

        /** @type {element} */
        elem = doc.createElement('input');

        /** @type {string} */
        elem.type = 'hidden';

        /** @type {string} */
        elem.name = id;

        /** @type {number} */
        elem.value = value;
        options.appendChild(elem);
      }
    };

    /**
    	 * @return {?}
     */
    emptyHandler = function() {
      return false;
    };
    data.name = 'Flymer';

    /** @type {string} */
    data.H = 'fkey';

    /** @type {string} */
    data.Y = 'dkey';

    /** @type {string} */
    data.R = '';
    data.r = {
      refresh: 'Произошла ошибка. Попробуйте перезагрузить страницу.'
    };
    data.next = {
      P: 'launch',
      O: ''
    };
    data.forms = {};
    data.forms.newpass = {
      g: 'newpass',
      f: 'newpass-box',
      form: null,
      a: null,
      submit: function() {
        this.form = document.querySelector('#' + this.g);
        this.a = document.querySelector('#' + this.f);
        debug(document.querySelector('#newpass-error'));
        if (this.m()) {

          /** @type {boolean} */
          this.form.e = true;
          self.d(this.form, 'invisible');
          self.d(this.a, 'loading');
          exports.h(this.form.action, this.form, this.c.bind(this));
        }
      },
      m: function() {
        var current;
        current = document.querySelector('#np-pass');
        if (current.value) {
          if (!/^[A-Za-z0-9_!@#$%^&*()+:;,.?<>\/-]+$/.test(current.value)) {
            return current.value = '';
            this.n();
            false;
          }
          if (6 > current.value.length || 20 < current.value.length) {
            return this.n();
            false;
          }
        } else {
          return current.focus();
          false;
        }
        return true;
      },
      c: function(a) {
        var c, e;
        try {

          /** @type {*} */
          a = JSON.parse(a);
          if ('object' !== typeof a) {
            throw 1;
          }
          if (a.error) {
            e = a.error;
            switch (e.type) {
              case 'redirect':
                return target.w(e.message);
              case 'expired':
                return this.k(e.message);
              case 'input':
                return this.A();
              default:
                return this.A(e.message);
            }
          }
          if (!a.ok) {
            throw 1;
          }
        } catch (_error) {
          c = _error;
          return this.A(data.r.refresh);
        }
        self.b(this.a, 'loading');

        /** @type {string} */
        this.form.innerHTML = '';
        a = document.querySelector('#newpass-confirm');
        a.innerHTML = a.getAttribute('data-msg');
        i(a);
        i(document.querySelector('#next'));
        f();
      },
      A: function(msg) {
        var r;
        r = document.querySelector('#npe-msg');
        i(r);
        msg = msg || r.getAttribute('data-msg');

        /** @type {string} */
        r.innerHTML = msg;
        i(document.querySelector('#newpass-error'));

        /** @type {boolean} */
        this.form.e = false;
        self.b(this.form, 'invisible');
        self.b(this.a, 'loading');
        document.querySelector('#np-pass').focus();
      },
      n: function() {
        var r;
        i(document.querySelector('#newpass-error'));
        r = document.querySelector('#npe-msg');
        r.innerHTML = r.getAttribute('data-msg');
        i(r);
        document.querySelector('#np-pass').focus();
      },
      k: function(deepDataAndEvents) {
        if (!add.j) {
          value(this.form, deepDataAndEvents);
          exports.h(this.form.action, this.form, this.c.bind(this));

          /** @type {number} */
          add.j = 1;
        }
      }
    };
    data.forms.lostpass = {
      g: 'lostpass',
      f: 'lostpass-box',
      form: null,
      a: null,
      submit: function() {
        this.form = document.querySelector('#' + this.g);
        this.a = document.querySelector('#' + this.f);
        debug(document.querySelector('#lostpass-error'));
        if (this.m()) {

          /** @type {boolean} */
          this.form.e = true;
          self.d(this.form, 'invisible');
          self.d(this.a, 'loading');
          exports.h(this.form.action, this.form, this.c.bind(this));
        }
      },
      m: function() {
        var input;
        input = document.querySelector('#lp-email');
        if (input.value.trim()) {
          if (target.L(input.value.trim())) {
            true;
          } else {
            input.focus();
          }
          document.querySelector('#lpe-msg').innerHTML = document.querySelector('#lpe-msg').getAttribute('data-msg');
          i(document.querySelector('#lostpass-error'));
          i(document.querySelector('#lpe-msg'));
          false;
        } else {
          input.focus();
        }
        return false;
      },
      c: function(a) {
        var c, e;
        try {

          /** @type {*} */
          a = JSON.parse(a);
          if ('object' !== typeof a) {
            throw 1;
          }
          if (a.error) {
            e = a.error;
            switch (e.type) {
              case 'redirect':
                return target.w(e.message);
              case 'expired':
                return this.k(e.message);
              default:
                return this.A(e.message);
            }
          }
          if (!a.ok) {
            throw 1;
          }
        } catch (_error) {
          c = _error;
          return this.A(data.r.refresh);
        }
        self.b(this.a, 'loading');

        /** @type {string} */
        this.form.innerHTML = '';
        a = document.querySelector('#lostpass-confirm');
        a.innerHTML = a.getAttribute('data-msg');
        i(a);
      },
      A: function(name) {
        var key;
        key = document.querySelector('#lpe-msg');
        i(key);

        /** @type {string} */
        key.innerHTML = name;
        i(document.querySelector('#lostpass-error'));

        /** @type {boolean} */
        this.form.e = false;
        self.b(this.form, 'invisible');
        self.b(this.a, 'loading');
        document.querySelector('#lp-email').focus();
      },
      k: function(deepDataAndEvents) {
        if (!add.j) {
          value(this.form, deepDataAndEvents);
          exports.h(this.form.action, this.form, this.c.bind(this));

          /** @type {number} */
          add.j = 1;
        }
      }
    };
    data.forms.login = {
      g: 'login',
      f: 'login-box',
      form: null,
      a: null,
      submit: function() {
        this.form = document.querySelector('#' + this.g);
        this.a = document.querySelector('#' + this.f);
        debug(document.querySelector('#login-error'));
        if (this.m()) {

          /** @type {boolean} */
          this.form.e = true;
          self.d(this.form, 'invisible');
          self.d(this.a, 'loading');
          exports.h(this.form.action, this.form, this.c.bind(this));
        }
      },
      m: function() {

        /** @type {boolean} */
        var input, res, textfield;
        res = true;
        input = document.querySelector('#l-email');
        textfield = document.querySelector('#l-pass');
        if (!textfield.value) {
          textfield.focus();

          /** @type {boolean} */
          res = false;
        }
        if (!input.value.trim()) {

          /** @type {string} */
          input.value = '';
          input.focus();

          /** @type {boolean} */
          res = false;
        }
        return res;
      },
      c: function(a) {
        var c, e;
        try {

          /** @type {*} */
          a = JSON.parse(a);
          if ('object' !== typeof a) {
            throw 1;
          }
          if (a.error) {
            e = a.error;
            switch (e.type) {
              case 'redirect':
                return target.w(e.message);
              case 'tech':
                return this.i(e.message);
              case 'input':
                return this.n(e.message);
              case 'expired':
                return this.k(e.message);
            }
            return;
          }
          if (!a.ok) {
            throw 1;
          }
        } catch (_error) {
          c = _error;
          return this.i(data.r.refresh);
        }
        a = this.form.getAttribute('data-goto') || '/';
        target.w(a);
      },
      i: function(e) {
        var a;
        debug(document.querySelector('#le-input'));
        a = document.querySelector('#le-tech');
        i(a);

        /** @type {string} */
        a.innerHTML = e;
        i(document.querySelector('#login-error'));

        /** @type {boolean} */
        this.form.e = false;
        self.b(this.form, 'invisible');
        self.b(this.a, 'loading');
      },
      n: function() {
        var r;
        debug(document.querySelector('#le-tech'));
        r = document.querySelector('#le-input');
        i(r);
        r.innerHTML = r.getAttribute('data-msg');
        i(document.querySelector('#login-error'));

        /** @type {boolean} */
        this.form.e = false;
        self.b(this.form, 'invisible');
        self.b(this.a, 'loading');
      },
      k: function(deepDataAndEvents) {
        if (!add.j) {
          value(this.form, deepDataAndEvents);
          exports.h(this.form.action, this.form, this.c.bind(this));

          /** @type {number} */
          add.j = 1;
        }
      }
    };
    data.forms.signup = {
      g: 'signup',
      f: 'signup-box',
      form: null,
      a: null,
      submit: function() {
        this.form = document.querySelector('#' + this.g);
        this.a = document.querySelector('#' + this.f);
        this.K();
        if (this.m()) {

          /** @type {boolean} */
          this.form.e = true;
          self.d(this.form, 'invisible');
          self.d(this.a, 'loading');
          exports.h(this.form.action, this.form, this.c.bind(this));
        }
      },
      m: function() {

        /** @type {Array} */
        var b, current, filter, input, req;
        req = [];

        /** @type {boolean} */
        b = false;
        input = document.querySelector('#s-email');
        current = document.querySelector('#s-pass');
        filter = document.querySelector('#s-agree');
        if (!current.value) {
          current.focus();

          /** @type {boolean} */
          b = true;
        } else {
          if (!/^[A-Za-z0-9_!@#$%^&*()+:;,.?<>\/-]+$/.test(current.value)) {

            /** @type {string} */
            current.value = '';
            current.focus();
            req.push('pass');
          } else {
            if (6 > current.value.length || 20 < current.value.length) {
              current.focus();
              req.push('pass');
            }
          }
        }
        if (input.value.trim()) {
          if (!target.L(input.value.trim())) {
            input.focus();
            req.push('email');
          }
        } else {
          input.focus();

          /** @type {boolean} */
          b = true;
        }
        if (!b) {
          if (!filter.checked) {
            req.push('agree');
          }
        }
        if (0 < req.length) {
          this.K(req);
          return false;
        } else if (b) {
          return false;
        } else {
          return true;
        }
      },
      K: function(v) {
        var c, pad, x;
        debug([document.querySelector('#se-email'), document.querySelector('#se-pass'), document.querySelector('#se-agree'), document.querySelector('#se-tech')]);
        if (v && v.length) {
          i(document.querySelector('#signup-error'));

          /** @type {number} */
          x = 0;
          pad = v.length;
          c = void 0;
          while (x < pad) {
            c = document.querySelector('#se-' + v[x]);
            c.innerHTML = c.getAttribute('data-msg');
            i(c);
            x++;
          }
        } else {
          debug(document.querySelector('#signup-error'));
        }
      },
      c: function(a) {
        var c, e;
        try {

          /** @type {*} */
          a = JSON.parse(a);
          if ('object' !== typeof a) {
            throw 1;
          }
          if (a.error) {
            e = a.error;
            switch (e.type) {
              case 'redirect':
                return target.w(e.message);
              case 'tech':
                return this.i(e.message);
              case 'input':
                return this.n(e.message);
              case 'expired':
                return this.k(e.message);
            }
            return;
          }
          if (!a.ok) {
            throw 1;
          }
        } catch (_error) {
          c = _error;
          return this.i(data.r.refresh);
        }
        self.b(this.a, 'loading');

        /** @type {string} */
        this.form.innerHTML = '';
        a = document.querySelector('#signup-confirm');
        a.innerHTML = a.getAttribute('data-msg');
        i(a);
      },
      i: function(e) {
        var a;
        a = document.querySelector('#se-tech');
        i(a);

        /** @type {string} */
        a.innerHTML = e;
        i(document.querySelector('#signup-error'));

        /** @type {boolean} */
        this.form.e = false;
        self.b(this.form, 'invisible');
        self.b(this.a, 'loading');
      },
      n: function(event) {
        this.K(event);

        /** @type {boolean} */
        this.form.e = false;
        self.b(this.form, 'invisible');
        self.b(this.a, 'loading');
      },
      k: function(deepDataAndEvents) {
        if (!add.j) {
          value(this.form, deepDataAndEvents);
          exports.h(this.form.action, this.form, this.c.bind(this));

          /** @type {number} */
          add.j = 1;
        }
      }
    };
    data.forms.launch = {
      g: 'launch',
      f: 'launch-box',
      C: 'note-input',
      form: null,
      a: null,
      Q: '',
      submit: function() {
        var input;
        this.form = document.querySelector('#' + this.g);
        this.a = document.querySelector('#' + this.f);
        input = document.querySelector('#' + this.C);
        value = input.value.trim();
        if (value === this.Q || '' === value) {
          input.focus();

          /** @type {string} */
          input.value = '';
        } else {

          /** @type {boolean} */
          this.form.e = true;
          input.blur();
          self.d(this.form, 'invisible');
          self.d(this.a, 'loading');
          exports.h(this.form.action, this.form, this.c.bind(this));
        }
      },
      c: function(a) {
        var c, e;
        try {

          /** @type {*} */
          a = JSON.parse(a);
          if ('object' !== typeof a) {
            throw 1;
          }
          callers.B();
          if (a.error) {
            callers.p(a.replies);
            e = a.error;
            switch (e.type) {
              case 'redirect':
                return target.w(e.message);
              case 'auth':
                return submit();
              case 'tech':
                return this.i(e.message);
              case 'input':
                return this.n(e.message);
              case 'system':
                return this.F(e.message, e.mode);
              case 'expired':
                return this.k(e.message);
            }
            return;
          }
          if (!a.html) {
            throw 1;
          }
        } catch (_error) {
          c = _error;
          return this.i(data.r.refresh);
        }
        document.querySelector('#current').innerHTML = a.html;
        debug(document.querySelector('#trending-mob'));
        document.querySelector('#reply-input').focus();
        next('catch');
        callers.p(a.replies);
      },
      i: function(e) {
        var a;
        a = document.querySelector('#error');

        /** @type {string} */
        a.innerHTML = e;

        /** @type {string} */
        a.className = 'tech-message';

        /** @type {boolean} */
        this.form.e = false;
        self.b(this.form, 'invisible');
        self.b(this.a, 'loading');
      },
      n: function(r) {
        var e;
        e = document.querySelector('#' + this.C);
        debug(document.querySelector('#error'));

        /** @type {boolean} */
        this.form.e = false;
        self.b(this.form, 'invisible');
        self.b(this.a, 'loading');
        self.d(e, 'invalid');

        /** @type {string} */
        e.value = '\n' + r;
        this.Q = r;

        /**
        			 * @return {undefined}
         */
        e.onfocus = function() {

          /** @type {string} */
          this.value = '';
          self.b(this, 'invalid');

          /** @type {null} */
          this.onfocus = null;
        };
      },
      F: function(e, value) {
        var a;
        a = document.querySelector('#error');
        a.innerHTML = e;

        /** @type {string} */
        a.className = 'system-message';
        debug(document.querySelector('#current'));
        apply(value);
      },
      k: function(deepDataAndEvents) {
        if (!add.j) {
          value(this.form, deepDataAndEvents);
          exports.h(this.form.action, this.form, this.c.bind(this));

          /** @type {number} */
          add.j = 1;
        }
      }
    };
    data.forms.reply = {
      g: 'reply',
      f: 'reply-box',
      C: 'reply-input',
      form: null,
      a: null,
      submit: function() {
        var input;
        this.form = document.querySelector('#' + this.g);
        this.a = document.querySelector('#' + this.f);
        input = document.querySelector('#' + this.C);
        if (input.value.trim()) {

          /** @type {boolean} */
          this.form.e = true;
          input.blur();
          self.d(this.form, 'invisible');
          self.d(this.a, 'loading');
          exports.h(this.form.action, this.form, this.c.bind(this));
        } else {
          input.focus();

          /** @type {string} */
          input.value = '';
        }
      },
      c: function(a) {
        var b, c, h, n;
        try {

          /** @type {*} */
          a = JSON.parse(a);
          if ('object' !== typeof a) {
            throw 1;
          }
          callers.B();
          if (a.error) {
            callers.p(a.replies);
            h = a.error;
            switch (h.type) {
              case 'auth':
                return submit();
              case 'tech':
                return this.i(h.message);
              case 'system':
                return this.F(h.message);
              case 'input':
                return this.n(h.message);
              case 'expired':
                return this.k(h.message);
            }
            return;
          }
          if (!a.ok) {
            throw 1;
          }
        } catch (_error) {
          c = _error;
          return this.i(data.r.refresh);
        }
        h = document.querySelector('#current').parentNode.offsetHeight;
        if (a['catch']) {
          i(document.querySelector('#tab-catch'));
          setTimeout((function() {
            debug(document.querySelector('#tab-catch'));
          }), 3e4);
        }
        n = quote(document.querySelector('#' + this.C).value);
        b = document.querySelector('#myReply');
        b.innerHTML = n;
        i(b);
        apply('launch');

        /** @type {number} */
        n = document.querySelector('#current').parentNode.offsetHeight - this.a.offsetHeight;
        h -= n;
        if (0 < h) {

          /** @type {element} */
          n = document.createElement('div');

          /** @type {string} */
          n.id = 'spacer';

          /** @type {string} */
          n.style.visibility = 'hidden';

          /** @type {string} */
          n.style.height = h + 'px';
          document.querySelector('#current').parentNode.appendChild(n);
        }
        debug(this.a);
        fn('view');
        callers.p(a.replies);
      },
      i: function(obj) {
        var elem;
        elem = document.querySelector('#reply-error');

        /** @type {string} */
        elem.innerHTML = obj;

        /** @type {string} */
        elem.className = 'tech-message';

        /** @type {boolean} */
        this.form.e = false;
        self.b(this.form, 'invisible');
        self.b(this.a, 'loading');
      },
      F: function(e) {
        var a;
        a = document.querySelector('#error');
        a.innerHTML = e;

        /** @type {string} */
        a.className = 'system-message';
        debug(document.querySelector('#current'));
        apply('launch');
      },
      n: function(content) {
        var elem;
        elem = document.querySelector('#reply-error');
        elem.innerHTML = content;

        /** @type {string} */
        elem.className = 'input-message';

        /** @type {boolean} */
        this.form.e = false;
        self.b(this.form, 'invisible');
        self.b(this.a, 'loading');
      },
      k: function(deepDataAndEvents) {
        if (!add.j) {
          value(this.form, deepDataAndEvents);
          exports.h(this.form.action, this.form, this.c.bind(this));

          /** @type {number} */
          add.j = 1;
        }
      }
    };
    data.forms['catch'] = {
      g: 'catch',
      f: 'tab-catch',
      form: null,
      a: null,
      submit: function() {
        document.removeEventListener('keydown', update, false);
        this.form = document.querySelector('#' + this.g);
        this.a = document.querySelector('#' + this.f);

        /** @type {boolean} */
        this.form.e = true;
        self.d(this.form, 'invisible');
        self.d(this.a, 'loading');
        exports.h(this.form.action, this.form, this.c.bind(this));
      },
      c: function(a) {
        var c, e;
        debug(this.a);
        self.b(this.form, 'invisible');
        self.b(this.a, 'loading');

        /** @type {boolean} */
        this.form.e = false;
        window.scroll(0, 0);
        try {

          /** @type {*} */
          a = JSON.parse(a);
          if ('object' !== typeof a) {
            throw 1;
          }
          callers.B();
          if (a.error) {
            callers.p(a.replies);
            e = a.error;
            switch (e.type) {
              case 'auth':
                return submit();
              case 'system':
                return this.F(e.message);
            }
            return;
          }
          if (!a.html) {
            throw 1;
          }
        } catch (_error) {
          c = _error;
          return;
        }
        if (document.querySelector('#spacer')) {
          document.querySelector('#spacer').parentNode.removeChild(document.querySelector('#spacer'));
        }
        debug(document.querySelector('#next'));
        document.querySelector('#current').innerHTML = a.html;
        document.querySelector('#reply-input').focus();
        next('catch');
        callers.p(a.replies);
      },
      F: function(e) {
        var a;
        debug(document.querySelector('#current'));
        a = document.querySelector('#error');

        /** @type {string} */
        a.innerHTML = e;

        /** @type {string} */
        a.className = 'system-message';
        apply('launch');
      }
    };
    data.forms.contact = {
      g: 'contact',
      f: 'contact-box',
      form: null,
      a: null,
      submit: function() {
        this.form = document.querySelector('#' + this.g);
        this.a = document.querySelector('#' + this.f);
        if (this.m()) {

          /** @type {boolean} */
          this.form.e = true;
          self.d(this.form, 'invisible');
          self.d(this.a, 'loading');
          exports.h(this.form.action, this.form, this.c.bind(this));
        }
      },
      m: function() {

        /** @type {boolean} */
        var comment, err, res, _this;
        res = true;
        err = document.querySelector('#cname');
        _this = document.querySelector('#cemail');
        comment = document.querySelector('#cmessage');

        /**
        			 * @param {undefined} value
        			 * @return {undefined}
         */
        callback = function(value) {

          /**
          				 * @param {element} d
          				 * @return {undefined}
           */
          callback = function(d) {
            d = d.target;
            self.b(d, 'invalid');
            d.removeEventListener('focus', callback, false);
          };
          self.d(value, 'invalid');
          value.addEventListener('focus', callback, false);
        };
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
      c: function(a) {
        var c, e;
        try {

          /** @type {*} */
          a = JSON.parse(a);
          if ('object' !== typeof a) {
            throw 1;
          }
          if (a.error) {
            e = a.error;
            switch (e.type) {
              case 'tech':
                return this.i(e.message);
              case 'expired':
                return this.k(e.message);
            }
            return;
          }
          if (!a.ok) {
            throw 1;
          }
        } catch (_error) {
          c = _error;
          return this.i(data.r.refresh);
        }
        debug(document.querySelector('#error'));
        debug(this.a);

        /** @type {string} */
        this.a.innerHTML = '';
        i(document.querySelector('#confirm'));
        f();
      },
      i: function(e) {
        var a;
        a = document.querySelector('#error');

        /** @type {string} */
        a.innerHTML = e;

        /** @type {string} */
        a.className = 'tech-message';

        /** @type {boolean} */
        this.form.e = false;
        self.b(this.form, 'invisible');
        self.b(this.a, 'loading');
      },
      k: function(deepDataAndEvents) {
        if (!add.j) {
          value(this.form, deepDataAndEvents);
          exports.h(this.form.action, this.form, this.c.bind(this));

          /** @type {number} */
          add.j = 1;
        }
      }
    };
    data.forms.burn = {
      g: 'burn',
      f: 'reply-box',
      form: null,
      a: null,
      submit: function() {
        this.form = document.querySelector('#' + this.g);
        this.a = document.querySelector('#' + this.f);
        if (this.m()) {

          /** @type {boolean} */
          this.form.e = true;
          self.d(this.form, 'invisible');
          debug(document.querySelectorAll('burnit'));
          self.d(this.a, 'loading');
          exports.h(this.form.action, this.form, this.c.bind(this));
        }
      },
      m: function() {
        var j, siblings;
        siblings = this.form.elements.vtype;

        /** @type {number} */
        j = 0;
        while (j < siblings.length) {
          if (siblings[j].checked) {
            return true;
          }
          j++;
        }
        i(document.querySelector('#burn-hint'));
        return false;
      },
      c: function(a) {
        var c, h, p;
        try {

          /** @type {*} */
          a = JSON.parse(a);
          if ('object' !== typeof a) {
            throw 1;
          }
          callers.B();
          if (a.error) {
            callers.p(a.replies);
            h = a.error;
            switch (h.type) {
              case 'auth':
                return submit();
              case 'tech':
                return this.i(h.message);
              case 'expired':
                return this.k(h.message);
            }
            return;
          }
          if (!a.ok) {
            throw 1;
          }
        } catch (_error) {
          c = _error;
          return this.i(data.r.refresh);
        }
        h = document.querySelector('#current').parentNode.offsetHeight;
        i(document.querySelector('#burn-result'));
        apply('launch');

        /** @type {number} */
        p = document.querySelector('#current').parentNode.offsetHeight - this.a.offsetHeight;

        /** @type {number} */
        h = h - p;
        if (0 < h) {

          /** @type {element} */
          p = document.createElement('div');

          /** @type {string} */
          p.id = 'spacer';

          /** @type {string} */
          p.style.visibility = 'hidden';

          /** @type {string} */
          p.style.height = h + 'px';
          document.querySelector('#current').parentNode.appendChild(p);
        }
        debug(this.a);
        fn('view');
        callers.p(a.replies);
      },
      i: function(obj) {
        var elem;
        elem = document.querySelector('#burn-error');

        /** @type {string} */
        elem.innerHTML = obj;

        /** @type {string} */
        elem.className = 'tech-message';

        /** @type {boolean} */
        this.form.e = false;
        self.b(this.form, 'invisible');
        self.b(this.a, 'loading');
      },
      k: function(deepDataAndEvents) {
        if (!add.j) {
          value(this.form, deepDataAndEvents);
          exports.h(this.form.action, this.form, this.c.bind(this));

          /** @type {number} */
          add.j = 1;
        }
      }
    };
    callers = {
      ga: 14,
      q: null,
      B: function() {
        if (document.querySelector('#tab-replies') || document.querySelector('#menu-replies') || document.querySelector('#next-reply')) {
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
      T: function() {
        if (this.interval) {

          /** @type {number} */
          this.q = setTimeout(this.la.bind(this), 1e3 * this.interval);
        }
      },
      la: function() {
        this.count++;
        exports.S(window.location.protocol + '//' + window.location.host + '/request/repcount?c=' + this.count, this.W.bind(this));
      },
      W: function(a) {
        var b;
        try {

          /** @type {*} */
          a = JSON.parse(a);
          if (a.error) {
            if ('auth' === a.error.type) {
              submit();
            }
          } else {
            this.p(a.replies);
            this.pa();
            if (this.count < this.ga) {
              this.T();
            }
          }
        } catch (_error) {
          b = _error;
        }
      },
      p: function(obj) {
        var name, title;
        if (obj) {

          /** @type {string} */
          title = document.title.replace(/^\(\d+\)\s/, '');
          if (0 < obj.num) {
            debug(document.querySelector('#menu-launch'));
            if (document.querySelector('#tab-replies')) {
              i(document.querySelector('#tab-replies'));
              document.querySelector('#link-replies').innerHTML = obj.html;
              document.querySelector('#link-replies').href = obj.url;
            }
            if (document.querySelector('#menu-replies')) {
              document.querySelector('#menu-replies').innerHTML = obj.html;
              document.querySelector('#menu-replies').href = obj.url;
              i(document.querySelector('#menu-replies'));
            }
            if (document.querySelector('#next')) {
              document.querySelector('#next-reply').href = obj.url;
              flush('reply');
            }

            /** @type {string} */
            document.title = '(' + obj.num + ') ' + title;
          } else {

            /** @type {boolean} */
            obj = !self.v(document.querySelector('#menu-replies'), 'hide');
            debug(document.querySelector('#tab-replies'));
            debug(document.querySelector('#menu-replies'));
            if (document.querySelector('#next')) {
              flush('default');
            }
            name = data.R;
            if (obj) {
              if ('index' !== name) {
                i(document.querySelector('#menu-launch'));
              }
            }

            /** @type {string} */
            document.title = title;
          }
        }
      },
      pa: function() {

        /** @type {number} */
        this.interval = 6 > this.count ? 10 : 2 * this.interval;
      }
    };
    throttledUpdate(function() {
      var li;
      data.na = self.v(document.querySelectorAll('body')[0], 'in');
      if ('localhost' === location.hostname || 'file:' === location.protocol) {

        /** @type {string} */
        document.querySelectorAll('body')[0].innerHTML = '';
      }
      li = document.querySelector('#nosupport');
      if (!event.isSupported('keyup') || window.operamini) {

        /** @type {string} */
        li.innerHTML = (window.operamini ? '<b>Opera Mini</b>' : 'Данный браузер') + ' не отвечает минимальным требованиям ' + data.name + '. Используйте другой браузер.';

        /** @type {string} */
        li.style.display = 'block';
      }
      f();
      next();
      handler();
      buildDeck();
      if (data.na) {
        callers.B();
        addEvent();
        setup();
        initialize();
      } else {
        add();
      }
    });
  })();

  window.CORe = B;

  B.addDOMLoadEvent = B.N;

  B.utils = B.G;


  /** @type {function (Object, ?): undefined} */

  B.G.loadScript = B.G.ea;

}).call(this);
