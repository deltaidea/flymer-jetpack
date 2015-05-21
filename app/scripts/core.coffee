###*
# @param {string} name
# @return {?}
###

d = (name) ->
  query = name.substring(1, name.length)

  ###*
  # @param {Object} results
  # @return {?}
  ###

  makeArray = (results) ->

    ###* @type {Array} ###

    ret = []
    if !results
      return ret
    if 'undefined' == typeof results.length
      return [ results ]

    ###* @type {number} ###

    i = 0
    l = results.length
    while i < l
      ret.push results[i]
      i++
    ret

  switch name.charAt(0)
    when '#'
      return document.getElementById(query)
    when '.'
      return makeArray(document.getElementsByClassName(query))
    else
      return makeArray(document.getElementsByTagName(name))
  return

if @top.location != @location

  ###* @type {(Location|null)} ###

  @top.location = @location

###* @type {function (this:Window, string): (MediaQueryList|null)} ###

window.matchMedia = window.matchMedia or ((doc) ->
  bool = undefined

  ###* @type {element} ###

  docelem = doc.documentElement

  ###* @type {(Node|null)} ###

  refNode = docelem.firstElementChild or docelem.firstChild

  ###* @type {element} ###

  fakeBody = doc.createElement('body')

  ###* @type {element} ###

  div = doc.createElement('div')
  div.id = 'mq-test-1'
  div.style.cssText = 'position:absolute;top:-100em'
  fakeBody.style.background = 'none'
  fakeBody.appendChild(div)
  (q) ->
    div.innerHTML = '&shy;<style media="' + q + '"> #mq-test-1 { width: 42px; }</style>'
    docelem.insertBefore(fakeBody, refNode)
    bool = 42 == div.offsetWidth
    docelem.removeChild(fakeBody)

      matches: bool
      media: q

)(document)
((win) ->
  respond = {}

  ###*
  # @return {undefined}
  ###

  callMedia = ->
    applyMedia true
    return

  if win.va = respond

    respond.update = (->
    )

    respond.ia = win.matchMedia and win.matchMedia('only all').matches
    !respond.ia

    aux = undefined
    resizeDefer = undefined
    ret = undefined

    ###* @type {HTMLDocument} ###

    doc = win.document

    ###* @type {element} ###

    docelem = doc.documentElement

    ###* @type {Array} ###

    tags = []

    ###* @type {Array} ###

    rules = []

    ###* @type {Array} ###

    nodes = []
    parsedSheets = {}
    head = doc.getElementsByTagName('head')[0] or docelem
    F = doc.getElementsByTagName('base')[0]
    links = head.getElementsByTagName('link')

    ###* @type {Array} ###

    requestQueue = []

    ###*
    # @return {undefined}
    ###

    ripCSS = ->

      ###* @type {number} ###

      index = 0
      while links.length > index
        sheet = links[index]
        href = sheet.href
        media = sheet.media
        r = sheet.rel and 'stylesheet' == sheet.rel.toLowerCase()
        if href
          if r
            if !parsedSheets[href]
              if sheet.styleSheet and sheet.styleSheet.ka
                translate sheet.styleSheet.ka, href, media

                ###* @type {boolean} ###

                parsedSheets[href] = true
              else
                if !/^([a-zA-Z:]*\/\/)/.test(href) and !F or href.replace(RegExp.$1, '').split('/')[0] == win.location.host
                  requestQueue.push
                    href: href
                    media: media
        index++
      makeRequests()
      return

    ###*
    # @return {undefined}
    ###

    makeRequests = ->
      if requestQueue.length
        thisRequest = requestQueue.shift()
        ajax thisRequest.href, (styles) ->
          translate styles, thisRequest.href, thisRequest.media

          ###* @type {boolean} ###

          parsedSheets[thisRequest.href] = true
          win.setTimeout (->
            makeRequests()
            return
          ), 0
          return
      return

    ###*
    # @param {string} styles
    # @param {string} href
    # @param {(number|string)} media
    # @return {undefined}
    ###

    translate = (styles, href, media) ->
      includes = styles.match(/@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi)
      ql = includes and includes.length or 0

      ###*
      # @param {string} css
      # @return {?}
      ###

      repUrls = (css) ->
        css.replace /(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g, '$1' + href + '$2$3'

      href = href.substring(0, href.lastIndexOf('/'))
      useMedia = !ql and media
      if href.length
        href += '/'
      if useMedia

        ###* @type {number} ###

        ql = 1

      ###* @type {number} ###

      f = 0
      while ql > f
        fullq = undefined
        part = undefined
        rawParams = undefined
        len = undefined
        if useMedia

          ###* @type {(number|string)} ###

          fullq = media
          rules.push repUrls(styles)
        else
          fullq = includes[f].match(/@media *([^\{]+)\{([\S\s]+?)$/) and RegExp.$1
          rules.push RegExp.$2 and repUrls(RegExp.$2)
        rawParams = fullq.split(',')
        len = rawParams.length

        ###* @type {number} ###

        i = 0
        while len > i
          part = rawParams[i]
          tags.push
            media: part.split('(')[0].match(/(only\s+)?([a-zA-Z]+)\s?/) and RegExp.$2 or 'all'
            rules: rules.length - 1
            da: -1 < part.indexOf('(')
            ja: part.match(/\(\s*min\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/) and parseFloat(RegExp.$1) + (RegExp.$2 or '')
            ha: part.match(/\(\s*max\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/) and parseFloat(RegExp.$1) + (RegExp.$2 or '')
          i++
        f++
      applyMedia()
      return

    ###*
    # @return {?}
    ###

    getemValue = ->
      style = undefined

      ###* @type {element} ###

      container = doc.createElement('div')

      ###* @type {(HTMLElement|null)} ###

      body = doc.body

      ###* @type {boolean} ###

      fakeUsed = false
      container.style.cssText = 'position:absolute;font-size:1em;width:1em'
      body or body = fakeUsed = doc.createElement('body')
      body.style.background = 'none'

      body.appendChild(container)
      docelem.insertBefore(body, docelem.firstChild)
      style = container.offsetWidth
      if fakeUsed then docelem.removeChild(body) else body.removeChild(container)
      ret = parseFloat(style)

    ###*
    # @param {Object} options
    # @return {?}
    ###

    applyMedia = (options) ->

      ###* @type {number} ###

      styleBlocks = docelem.clientWidth

      ###* @type {number} ###

      counter = 'CSS1Compat' == doc.compatMode and styleBlocks or doc.body.clientWidth or styleBlocks
      styleBlocks = {}
      lastLink = links[links.length - 1]

      ###* @type {number} ###

      max = (new Date).getTime()
      if options and aux and 30 > max - aux
        return win.clearTimeout(resizeDefer)
        resizeDefer = win.setTimeout(applyMedia, 30)
        undefined

      ###* @type {number} ###

      aux = max
      tag = undefined
      for tag of tags
        if tags.hasOwnProperty(tag)
          options = tags[tag]
          max = options.ja
          fontSize = options.ha

          ###* @type {boolean} ###

          a = null == max

          ###* @type {boolean} ###

          b = null == fontSize
          if max

            ###* @type {number} ###

            max = parseFloat(max) * (if -1 < max.indexOf('em') then ret or getemValue() else 1)
          if fontSize

            ###* @type {number} ###

            fontSize = parseFloat(fontSize) * (if -1 < fontSize.indexOf('em') then ret or getemValue() else 1)
          if !(options.da and (a and b or !(a or counter >= max) or !(b or fontSize >= counter)))
            if !styleBlocks[options.media]

              ###* @type {Array} ###

              styleBlocks[options.media] = []
            styleBlocks[options.media].push rules[options.rules]
      i = undefined
      for i of nodes
        if nodes.hasOwnProperty(i)
          if nodes[i]
            if nodes[i].parentNode == head
              head.removeChild nodes[i]
      k = undefined
      for k of styleBlocks
        if styleBlocks.hasOwnProperty(k)

          ###* @type {element} ###

          tag = doc.createElement('style')
          i = styleBlocks[k].join('\n')

          ###* @type {string} ###

          tag.type = 'text/css'

          ###* @type {string} ###

          tag.media = k
          head.insertBefore tag, lastLink.nextSibling
          if tag.styleSheet
            tag.styleSheet.cssText = i
          else
            tag.appendChild doc.createTextNode(i)
          nodes.push tag
      return

    ###*
    # @param {?} url
    # @param {Function} callback
    # @return {undefined}
    ###

    ajax = (url, callback) ->
      req = xmlHttp()
      if req
        req.open 'GeT', url, true

        ###*
        # @return {undefined}
        ###

        req.onreadystatechange = ->
          if !(4 != req.readyState)
            if !(200 != req.status and 304 != req.status)
              callback req.responseText
          return

        if 4 != req.readyState
          req.send null
      return

    xmlHttp = do ->

      ###* @type {boolean} ###

      b = false
      try

        ###* @type {XMLHttpRequest} ###

        b = new (win.XMLHttpRequest)
      catch a

        ###* @type {ActiveXObject} ###

        b = new (win.ActiveXObject)('Microsoft.XMLHTTP')
      ->
        b
    ripCSS()

    ###* @type {function (): undefined} ###

    respond.update = ripCSS
    if win.addEventListener
      win.addEventListener 'resize', callMedia, false
    else
      if win.attachEvent
        win.attachEvent 'onresize', callMedia
  return
) this
if !window.getComputedStyle

  ###*
  # @param {(element|null)} element
  # @return {(CSSStyleDeclaration|null)}
  ###

  window.getComputedStyle = (element) ->

    ###*
    # @param {string} text
    # @return {?}
    ###

    @getPropertyValue = (text) ->

      ###* @type {RegExp} ###

      cx = /(\-([a-z]){1})/g
      if 'float' == text

        ###* @type {string} ###

        text = 'styleFloat'
      if cx.test(text)
        text = text.replace(cx, (dataAndEvents, deepDataAndEvents, letter) ->
          letter.toUpperCase()
        )
      if (text = element.currentStyle[text]) then text else null

    this

if !document.getElementsByClassName

  ###*
  # @param {string} e
  # @return {NodeList}
  ###

  document.getElementsByClassName = (e) ->

    ###* @type {HTMLDocument} ###

    t = document
    ii = undefined

    ###* @type {Array} ###

    ret = []
    if t.querySelectorAll
      return t.querySelectorAll('.' + e)

    ###* @type {NodeList} ###

    t = t.getElementsByTagName('*')

    ###* @type {RegExp} ###

    e = RegExp('(^|\\s)' + e + '(\\s|$)')

    ###* @type {number} ###

    ii = 0
    while ii < t.length
      if e.test(t[ii].className)
        ret.push t[ii]
      ii++
    ret

if !String::trim

  ###*
  # @return {string}
  ###

  String::trim = ->
    @replace /^\s+|\s+$/g, ''

if !Date.now

  ###*
  # @return {number}
  ###

  Date.now = ->
    +new Date

if !Function::bind

  ###*
  # @param {(Object|null|undefined)} oThis
  # @return {Function}
  ###

  Function::bind = (oThis) ->

    ###*
    # @return {?}
    ###

    fBound = ->
      fToBind.apply (if this instanceof fNOP and oThis then this else oThis), args.concat(Array::slice.call(arguments))

    ###*
    # @return {undefined}
    ###

    fNOP = ->

    if 'function' != typeof this
      throw new Typeerror('Function.prototype.bind - what is trying to be bound is not callable')

    ###* @type {Array.<?>} ###

    args = Array::slice.call(arguments, 1)

    ###* @type {Function} ###

    fToBind = this
    fNOP.prototype = @prototype
    fBound.prototype = new fNOP
    fBound

B = if B then B else {}
B.N = do ->

  ###* @type {Array} ###

  spec = []

  ###* @type {boolean} ###

  known = false

  ###* @type {boolean} ###

  done = false
  valueAccessor = undefined
  (func) ->

    ###*
    # @return {undefined}
    ###

    poll = ->
      try
        root.doScroll 'left'
      catch b
        setTimeout poll, 50
        return
      init 'poll'
      return

    ###*
    # @param {event} e
    # @return {undefined}
    ###

    init = (e) ->
      if 'readystatechange' != e.type or 'complete' == doc.readyState
        if (if 'load' == e.type then win else doc)[rem](pre + e.type, init, false)
          !done and (done = true)

          while valueAccessor = spec.shift()
            valueAccessor()
      return

    if done
      return func()

    ###* @type {Window} ###

    win = window

    ###* @type {boolean} ###

    G = true

    ###* @type {Document} ###

    doc = win.document

    ###* @type {element} ###

    root = doc.documentElement

    ###* @type {string} ###

    add = if doc.addEventListener then 'addEventListener' else 'attachEvent'

    ###* @type {string} ###

    rem = if doc.addEventListener then 'removeEventListener' else 'detachEvent'

    ###* @type {string} ###

    pre = if doc.addEventListener then '' else 'on'
    if 'complete' == doc.readyState
      func()
    else
      if spec.push(func)
        !known and (known = true)

        if doc.createEventObject and root.doScroll
          try

            ###* @type {boolean} ###

            G = !win.frameElement
          catch I
          if G
            poll()
        doc[add] pre + 'DOMContentLoaded', init, false
        doc[add] pre + 'readystatechange', init, false
        win[add] pre + 'load', init, false
    return
B.event =
  add: if 'undefined' != typeof addEventListener then ((element, event, fn) ->
    element.addEventListener event, fn, false
    return
  ) else ((element, event, fn) ->
    element.attachEvent 'on' + event, fn
    return
  )
  remove: if 'undefined' != typeof removeEventListener then ((d, e, action) ->
    d.removeEventListener e, action, false
    return
  ) else ((o, e, listener) ->
    o.detachEvent 'on' + e, listener
    return
  )
  u: if 'undefined' != typeof addEventListener then ((arg) ->
    arg.target
  ) else ((ast) ->
    ast.srcElement
  )
  prEventDefault: if 'undefined' != typeof addEventListener then ((ast) ->
    ast.prEventDefault()
    return
  ) else ((ast) ->

    ###* @type {boolean} ###

    ast.returnValue = false
    return
  )
  oa: (e) ->

    ###* @type {boolean} ###

    e.cancelBubble = true
    if 'undefined' != typeof e.stopPropagation
      e.stopPropagation()
    return
  isSupported: do ->
    TAGNAMES =
      select: 'input'
      change: 'input'
      submit: 'form'
      reset: 'form'
      error: 'img'
      load: 'img'
      abort: 'img'
    (eventName) ->

      ###* @type {element} ###

      el = document.createElement(TAGNAMES[eventName] or 'div')

      ###* @type {string} ###

      eventName = 'on' + eventName

      ###* @type {boolean} ###

      isSupported = eventName of el
      if !isSupported
        el.setAttribute eventName, 'return;'

        ###* @type {boolean} ###

        isSupported = 'function' == typeof el[eventName]
      isSupported
B.V =
  fa: 20
  aa:
    X: '{"error":{"type":"tech","message":"Произошла ошибка. Проверьте соединение или попробуйте позже."}}'
    ma: '{"error":{"type":"tech","message":"Произошла ошибка. Перезагрузите страницу или попробуйте позже."}}'
  o: (codeSegments) ->
    if codeSegments and @o.hasOwnProperty('r')
      return @o.D
    if 'undefined' != typeof XMLHttpRequest
      return @o.D = new XMLHttpRequest
      @o.D

    ###* @type {Array} ###

    codeSegments = [
      'MSXML2.XmlHttp.6.0'
      'MSXML2.XmlHttp.3.0'
      'MSXML2.XMLHTTP'
      'Microsoft.XMLHTTP'
    ]

    ###* @type {number} ###

    i = 0
    while i < codeSegments.length
      try
        return @o.D = new ActiveXObject(codeSegments[i])
        @o.D

      catch a
      i++
    alert 'Your browser does not support XmlHttp'
    null
  qa: ->
    if @o.hasOwnProperty('r')
      return @o.D.abort()
    return
  I: (type, target, body, $, value) ->
    xmlhttp = @o()
    tref = undefined
    evt = @aa
    target = target.substr(0, (window.location.protocol + window.location.hostname).length + 6) + '/' + target.substr((window.location.protocol + window.location.hostname).length + 11)

    ###* @type {string} ###

    target = target + (if 0 < target.indexOf('?') then '&' else '?') + 'ts=' + Date.now()
    xmlhttp.open type, target
    if value
      xmlhttp.setRequestHeader 'Content-Type', value

    ###*
    # @return {undefined}
    ###

    xmlhttp.onreadystatechange = ->
      if 4 == xmlhttp.readyState
        sjax_status = xmlhttp.status
        clearTimeout tref
        if 200 <= sjax_status and 300 > sjax_status or 304 == sjax_status
          $ xmlhttp.responseText
        else
          if 0 == sjax_status
            $ evt.X
          else
            $ evt.ma
      return

    xmlhttp.send body

    ###* @type {number} ###

    tref = setTimeout((->
      xmlhttp.abort()
      return
    ), 1e3 * @fa)
    return
  S: (elements, options) ->
    @I 'GeT', elements, null, options
    return
  ca: (els) ->

    ###* @type {Array} ###

    tagNameArr = []
    els = els.elements

    ###* @type {number} ###

    i = 0
    len = els.length
    el = undefined
    while i < len
      if el = els[i]
        !el.disabled and el.name

        if el.type == 'radio' or el.type == 'checkbox'
          if !el.checked
            i++
            continue
        tagNameArr.push encodeURIComponent(el.name) + '=' + encodeURIComponent(el.value)
      i++
    tagNameArr.join '&'
  h: (value, s, code) ->
    @I 'POST', value, @ca(s), code, 'application/x-www-form-urlencoded'
    return
  ta: (existing, action, jQuery) ->
    @I 'POST', existing, action, jQuery
    return
B.cookie =
  enabled: ->
    if navigator.cookieenabled
      return true

    ###* @type {string} ###

    document.cookie = 'cookietest=1'

    ###* @type {boolean} ###

    results = -1 != document.cookie.indexOf('cookietest=')
    @$ 'cookietest'
    results
  set: (key, value, expires) ->
    if expires

      ###* @type {Date} ###

      date = new Date
      date.setTime date.getTime() + 1e3 * expires

      ###* @type {string} ###

      expires = '; expires=' + date.toGMTString()
    else

      ###* @type {string} ###

      expires = ''

    ###* @type {string} ###

    value = encodeURIComponent(value)

    ###* @type {string} ###

    document.cookie = key + '=' + value + expires + '; path=/'
    return
  get: (regex) ->

    ###* @type {null} ###

    value = null

    ###* @type {Array.<string>} ###

    codeSegments = document.cookie.split(';')

    ###* @type {RegExp} ###

    regex = RegExp('^\\s*' + regex + '=\\s*(.*?)\\s*$')
    match = undefined

    ###* @type {number} ###

    i = 0
    while i < codeSegments.length
      if match = codeSegments[i].match(regex)

        ###* @type {string} ###

        value = decodeURIComponent(match[1])
        break
      i++
    value
  $: (n) ->

    ###* @type {string} ###

    document.cookie = n + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT'
    return
B.style =
  v: (n, key) ->
    n.className.match RegExp('(\\s|^)' + key + '(\\s|$)')
  d: (a, key) ->
    if !@v(a, key)
      a.className += if '' == a.className then key else ' ' + key
    return
  b: (d, key) ->
    if @v(d, key)
      d.className = d.className.replace(RegExp('(\\s|^)' + key + '(\\s|$)'), ' ').trim()
    return
  xa: (d, storageKey) ->
    if @v(d, storageKey)
      @b d, storageKey
    else
      @d d, storageKey
    return
  set: (ps, helper) ->
    key = undefined
    for key of helper
      ps.style[key] = helper[key]
    return
  get: (elem, name) ->
    window.getComputedStyle(elem, null).getPropertyValue name
B.G =
  w: (url) ->
    if window.location.href != url

      ###* @type {string} ###

      window.location = url
    else
      window.location.reload()
    return
  ea: (libraryName, fncCallback) ->

    ###* @type {element} ###

    script = document.createElement('script')

    ###* @type {string} ###

    script.type = 'text/javascript'
    if script.readyState

      ###*
      # @return {undefined}
      ###

      script.onreadystatechange = ->
        if 'loaded' == script.readyState or 'complete' == script.readyState

          ###* @type {null} ###

          script.onreadystatechange = null
          fncCallback()
        return

    else

      ###*
      # @return {undefined}
      ###

      script.onload = ->
        fncCallback()
        return

    ###* @type {Object} ###

    script.src = libraryName
    document.getElementsByTagName('head')[0].appendChild script
    return
  t: (t) ->
    loop
      if 'form' == t.nodeName.toLowerCase()
        return t
      unless t = t.parentNode
        break
    null
  sa: (keys) ->

    ###* @type {Array} ###

    rv = []
    if !keys
      return rv
    if 'undefined' == typeof keys.length
      return [ keys ]

    ###* @type {number} ###

    i = 0
    il = keys.length
    while i < il
      rv.push keys[i]
      i++
    rv
  J: (attribute, one, values) ->
    if !values

      ###* @type {Array} ###

      values = if B.event.isSupported('input') then [
        'keyup'
        'input'
      ] else [
        'keyup'
        'change'
      ]

    ###* @type {number} ###

    i = 0
    valuesLen = values.length
    while i < valuesLen
      B.event.add attribute, values[i], one
      i++
    return
  ba: (msg) ->

    ###* @type {element} ###

    logger = document.createElement('div')
    logger.appendChild document.createTextNode(msg)
    logger.innerHTML
  L: (cls) ->
    /^([_A-Za-z0-9-])+(\.[_A-Za-z0-9-]+)*@([A-Za-z0-9-]+)(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,4})$/.test cls
  U: (d) ->

    ###* @type {Object} ###

    @l = d
    @Z = if (d = B.style.get(@l, 'height')) then parseInt(d) else @l.clientHeight

    ###*
    # @return {undefined}
    ###

    @refresh = ->
      maxlength = @l.getAttribute('maxlength')
      if maxlength
        if @l.value.length > maxlength
          @l.value = @l.value.substr(0, maxlength)
      @s.value = @l.value

      ###* @type {string} ###

      @l.style.height = Math.max(@s.scrollHeight, @Z) + 'px'
      return

    @s = @l.cloneNode(false)

    ###* @type {string} ###

    @s.id = @s.name = 's-' + @l.id

    ###* @type {boolean} ###

    @s.disabled = true
    B.style.set @s,
      overflowY: 'hidden'
      position: 'absolute'
      top: '0'
      height: '0'
      visibility: 'hidden'
      zIndex: '-10000'
    @l.parentNode.appendChild @s

    ###* @type {string} ###

    @l.style.overflowY = 'hidden'
    B.G.J @l, @refresh.bind(this)
    return
do ->

  ###* @type {boolean} ###

  step = true

  ###* @type {null} ###

  item = null
  ((dataAndEvents) ->

    ###* @type {function (this:*): string} ###

    getClass = {}.toString
    isProperty = undefined
    foreach = undefined
    undef = undefined
    isLoader = 'function' == typeof define and define.ra
    JSON3 = 'object' == typeof exports and exports

    ###*
    # @param {string} name
    # @return {?}
    ###

    has = (name) ->
      if 'bug-string-char-index' == name
        return 'a' != 'a'[0]
      value = undefined

      ###* @type {boolean} ###

      json_parse = 'json' == name
      if json_parse or 'json-stringify' == name or 'json-parse' == name
        if 'json-stringify' == name or json_parse
          stringify = JSON3.stringify
          stringifySupported = 'function' == typeof stringify and isextended
          if stringifySupported

            ###* @type {function (): ?} ###

            (value = ->
              1
            ).toJSON = value
            try

              ###* @type {boolean} ###

              stringifySupported = '0' == stringify(0) and '0' == stringify(new Number) and '""' == stringify(new String) and stringify(getClass) == undef and stringify(undef) == undef and stringify() == undef and '1' == stringify(value) and '[1]' == stringify([ value ]) and '[null]' == stringify([ undef ]) and 'null' == stringify(item) and '[null,null,null]' == stringify([
                undef
                getClass
                item
              ]) and '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}' == stringify(M: [
                value
                step
                false
                item
                '\x00\b\n\f\r\t'
              ]) and '1' == stringify(item, value) and '[\n 1,\n 2\n]' == stringify([
                1
                2
              ], item, 1) and '"-271821-04-20T00:00:00.000Z"' == stringify(new Date(-864e13)) and '"+275760-09-13T00:00:00.000Z"' == stringify(new Date(864e13)) and '"-000001-01-01T00:00:00.000Z"' == stringify(new Date(-621987552e5)) and '"1969-12-31T23:59:59.999Z"' == stringify(new Date(-1))
            catch l

              ###* @type {boolean} ###

              stringifySupported = false
          if !json_parse
            return stringifySupported
        if 'json-parse' == name or json_parse
          name = JSON3.parse
          if 'function' == typeof name
            try
              if 0 == name('0') and !name(false)
                value = name('{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}')

                ###* @type {boolean} ###

                parseSupported = 5 == value.M.length and 1 == value.M[0]
                if parseSupported
                  try

                    ###* @type {boolean} ###

                    parseSupported = !name('"\t"')
                  catch s
                  if parseSupported
                    try

                      ###* @type {boolean} ###

                      parseSupported = 1 != name('01')
                    catch t
            catch n

              ###* @type {boolean} ###

              parseSupported = false
          if !json_parse
            return parseSupported
        return stringifySupported and parseSupported
      return

    if JSON3 or isLoader
      if 'object' == typeof JSON and JSON
        if JSON3

          ###* @type {function (this:JSONType, *, (Array.<string>|function (string, *): *|null)=, (number|string)=): string} ###

          JSON3.stringify = JSON.stringify

          ###* @type {function (this:JSONType, string, function (string, *): *=): *} ###

          JSON3.parse = JSON.parse
        else

          ###* @type {JSONType} ###

          JSON3 = JSON
      else
        if isLoader
          JSON3 = dataAndEvents.JSON = {}
    else
      JSON3 = dataAndEvents.JSON or (dataAndEvents.JSON = {})

    ###* @type {Date} ###

    isextended = new Date(-0xc782b5b800cec)
    try

      ###* @type {boolean} ###

      isextended = -109252 == isextended.getUTCFullYear() and 0 == isextended.getUTCMonth() and 1 == isextended.getUTCDate() and 10 == isextended.getUTCHours() and 37 == isextended.getUTCMinutes() and 6 == isextended.getUTCSeconds() and 708 == isextended.getUTCMilliseconds()
    catch L
    if !has('json')
      charIndexBuggy = has('bug-string-char-index')
      if !isextended

        ###* @type {function (*): number} ###

        floor = Math.floor

        ###* @type {Array} ###

        clt = [
          0
          31
          59
          90
          120
          151
          181
          212
          243
          273
          304
          334
        ]

        ###*
        # @param {number} n
        # @param {number} value
        # @return {?}
        ###

        pad = (n, value) ->
          clt[value] + 365 * (n - 1970) + floor((n - 1969 + (value = +(1 < value))) / 4) - floor((n - 1901 + value) / 100) + floor((n - 1601 + value) / 400)

      if !(isProperty = {}.hasOwnProperty)

        ###*
        # @param {string} key
        # @return {?}
        ###

        isProperty = (key) ->
          obj = {}
          constructor = undefined
          obj.__proto__ = item
          obj.__proto__ = toString: 1
          if obj.toString != getClass

            ###*
            # @param {boolean} key
            # @return {?}
            ###

            isProperty = (key) ->
              original = @__proto__

              ###* @type {boolean} ###

              key = key of @__proto__ = item
              this
              @__proto__ = original
              key

          else

            ###* @type {(Function|null)} ###

            constructor = obj.constructor

            ###*
            # @param {string} key
            # @return {?}
            ###

            isProperty = (key) ->
              parent = (@constructor or constructor).prototype
              key of this and !(key of parent and @[key] == parent[key])

          ###* @type {null} ###

          obj = item
          isProperty.call this, key

      collection =
        'boolean': 1
        ua: 1
        wa: 1
        ya: 1

      ###*
      # @param {?} object
      # @param {Function} callback
      # @return {undefined}
      ###

      foreach = (object, callback) ->

        ###* @type {number} ###

        foreach = 0
        Properties = undefined
        members = undefined
        property = undefined

        ###* @type {number} ###

        Properties = ->

          ###* @type {number} ###

          @valueOf = 0
          return

        Properties::valueOf = 0
        members = new Properties
        for property of members
          if isProperty.call(members, property)
            foreach++

        ###* @type {null} ###

        Properties = members = item
        if foreach

          ###* @type {function (?, Function): undefined} ###

          foreach = if 2 == foreach then ((object, callback) ->
            members = {}

            ###* @type {boolean} ###

            prototype = '[object Function]' == getClass.call(object)
            property = undefined
            for property of object
              if !(prototype and 'prototype' == property)
                if !isProperty.call(members, property)
                  if members[property] = 1
                    if isProperty.call(object, property)
                      callback property
            return
          ) else ((object, callback) ->

            ###* @type {boolean} ###

            prototype = '[object Function]' == getClass.call(object)
            property = undefined
            isConstructor = undefined
            for property of object
              if !(prototype and 'prototype' == property)
                if ! !isProperty.call(object, property)
                  if !(isConstructor = 'constructor' == property)
                    callback property
            if isConstructor or isProperty.call(object, property = 'constructor')
              callback property
            return
          )
        else

          ###* @type {Array.<string>} ###

          members = 'valueOf toString toLocaleString propertyIsenumerable isPrototypeOf hasOwnProperty constructor'.split(' ')

          ###*
          # @param {?} object
          # @param {Function} callback
          # @return {undefined}
          ###

          foreach = (object, callback) ->

            ###* @type {boolean} ###

            length = '[object Function]' == getClass.call(object)
            property = undefined
            method = undefined
            if method = !length
              if method = 'function' != typeof object.constructor

                ###* @type {string} ###

                method = typeof object.hasOwnProperty

                ###* @type {boolean} ###

                method = if 'object' == method then ! !object.hasOwnProperty else !collection[method]
            method = if method then object.hasOwnProperty else isProperty
            for property of object
              if !(length and 'prototype' == property)
                if ! !method.call(object, property)
                  callback property
            length = members.length
            while property = members[--length]
              method.call(object, property) and callback(property)
            return

        foreach object, callback
        return

      if !has('json-stringify')
        chrTable =
          92: '\\\\'
          34: '\"'
          8: '\\b'
          12: '\\f'
          10: '\\n'
          13: '\\r'
          9: '\\t'

        ###*
        # @param {number} opt_attributes
        # @param {number} value
        # @return {?}
        ###

        toPaddedString = (opt_attributes, value) ->
          ('000000' + (value or 0)).slice -opt_attributes

        ###*
        # @param {string} value
        # @return {?}
        ###

        quote = (value) ->

          ###* @type {string} ###

          result = '"'

          ###* @type {number} ###

          index = 0
          length = value.length
          isLarge = 10 < length and charIndexBuggy
          symbols = undefined
          if isLarge
            symbols = value.split('')
          while index < length
            i = value.charCodeAt(index)
            switch i
              when 8
                result += chrTable[i]
              when 9
                result += chrTable[i]
              when 10
                result += chrTable[i]
              when 12
                result += chrTable[i]
              when 13
                result += chrTable[i]
              when 34
                result += chrTable[i]
              when 92
                result += chrTable[i]
              else
                if 32 > i
                  result += '\\u00' + toPaddedString(2, i.toString(16))
                  break
                result += if isLarge then symbols[index] else if charIndexBuggy then value.charAt(index) else value[index]
            index++
          result + '"'

        ###*
        # @param {number} property
        # @param {string} object
        # @param {Function} callback
        # @param {number} properties
        # @param {boolean} whitespace
        # @param {string} indentation
        # @param {Array} stack
        # @return {?}
        ###

        serialize = (property, object, callback, properties, whitespace, indentation, stack) ->
          value = object[property]
          element = undefined
          width = undefined
          date = undefined
          minutes = undefined
          hours = undefined
          udataCur = undefined
          pdataOld = undefined
          results = undefined
          hasMembers = undefined
          try
            value = object[property]
          catch D
          if 'object' == typeof value and value
            if element = getClass.call(value)
              '[object Date]' != element or isProperty.call(value, 'toJSON')

              if 'function' == typeof value.toJSON
                if '[object Number]' != element and '[object String]' != element and '[object Array]' != element or isProperty.call(value, 'toJSON')
                  value = value.toJSON(property)
            else
              if value > -1 / 0 and value < 1 / 0
                if pad

                  ###* @type {number} ###

                  date = floor(value / 864e5)

                  ###* @type {number} ###

                  element = floor(date / 365.2425) + 1970 - 1
                  while pad(element + 1, 0) <= date
                    element++

                  ###* @type {number} ###

                  width = floor((date - pad(element, 0)) / 30.42)
                  while pad(element, width + 1) <= date
                    width++

                  ###* @type {number} ###

                  date = 1 + date - pad(element, width)

                  ###* @type {number} ###

                  minutes = (value % 864e5 + 864e5) % 864e5

                  ###* @type {number} ###

                  hours = floor(minutes / 36e5) % 24

                  ###* @type {number} ###

                  udataCur = floor(minutes / 6e4) % 60

                  ###* @type {number} ###

                  pdataOld = floor(minutes / 1e3) % 60
                  minutes %= 1e3
                else
                  element = value.getUTCFullYear()
                  width = value.getUTCMonth()
                  date = value.getUTCDate()
                  hours = value.getUTCHours()
                  udataCur = value.getUTCMinutes()
                  pdataOld = value.getUTCSeconds()
                  minutes = value.getUTCMilliseconds()

                ###* @type {string} ###

                value = (if 0 >= element or 1e4 <= element then (if 0 > element then '-' else '+') + toPaddedString(6, if 0 > element then -element else element) else toPaddedString(4, element)) + '-' + toPaddedString(2, width + 1) + '-' + toPaddedString(2, date) + 'T' + toPaddedString(2, hours) + ':' + toPaddedString(2, udataCur) + ':' + toPaddedString(2, pdataOld) + '.' + toPaddedString(3, minutes) + 'Z'
              else

                ###* @type {null} ###

                value = item
          if callback
            value = callback.call(object, property, value)
          if value == item
            return 'null'

          ###* @type {string} ###

          element = getClass.call(value)
          if '[object Boolean]' == element
            return '' + value
          if '[object Number]' == element
            return if value > -1 / 0 and value < 1 / 0 then '' + value else 'null'
          if '[object String]' == element
            return quote('' + value)
          if 'object' == typeof value
            property = stack.length
            while property--
              if stack[property] == value
                throw Typeerror()
            stack.push value

            ###* @type {Array} ###

            results = []

            ###* @type {string} ###

            object = indentation
            indentation += whitespace
            if '[object Array]' == element

              ###* @type {number} ###

              width = 0
              property = value.length
              while width < property
                element = serialize(width, value, callback, properties, whitespace, indentation, stack)
                results.push if element == undef then 'null' else element
                hasMembers or (hasMembers = step)
                width++

              ###* @type {string} ###

              property = if hasMembers then (if whitespace then '[\n' + indentation + results.join(',\n' + indentation) + '\n' + object + ']' else '[' + results.join(',') + ']') else '[]'
            else
              foreach properties or value, (property) ->
                element = serialize(property, value, callback, properties, whitespace, indentation, stack)
                if element != undef
                  results.push quote(property) + ':' + (if whitespace then ' ' else '') + element
                if !hasMembers

                  ###* @type {boolean} ###

                  hasMembers = step
                return

              ###* @type {string} ###

              property = if hasMembers then (if whitespace then '{\n' + indentation + results.join(',\n' + indentation) + '\n' + object + '}' else '{' + results.join(',') + '}') else '{}'
            stack.pop()
            return property
          return

        ###*
        # @param {?} source
        # @param {(Function|string)} a
        # @param {string} width
        # @return {?}
        ###

        JSON3.stringify = (source, a, width) ->
          whitespace = undefined
          restoreScript = undefined
          properties = undefined
          if 'function' == typeof a or 'object' == typeof a and a
            if '[object Function]' == getClass.call(a)

              ###* @type {(Function|string)} ###

              restoreScript = a
            else
              if '[object Array]' == getClass.call(a)
                properties = {}

                ###* @type {number} ###

                ai = 0
                al = a.length
                value = undefined
                while ai < al
                  value = a[ai++]
                  ('[object String]' == getClass.call(value) or '[object Number]' == getClass.call(value)) and (properties[value] = 1)
          if width
            if '[object Number]' == getClass.call(width)
              if 0 < (width -= width % 1)

                ###* @type {string} ###

                whitespace = ''
                if 10 < width

                  ###* @type {number} ###

                  width = 10
                while whitespace.length < width
                  whitespace += ' '
            else
              if '[object String]' == getClass.call(width)
                whitespace = if 10 >= width.length then width else width.slice(0, 10)
          value = '': source
          serialize '', value, restoreScript, properties, whitespace, '', []

      if !has('json-parse')

        ###* @type {function (...[number]): string} ###

        from = String.fromCharCode
        SIMPLE_ESCAPE_SEQUENCES =
          92: '\\'
          34: '"'
          47: '/'
          98: '\b'
          116: '\t'
          110: '\n'
          102: '\f'
          114: '\r'
        i = undefined
        path = undefined

        ###*
        # @return {undefined}
        ###

        abort = ->

          ###* @type {null} ###

          i = path = item
          throw Syntaxerror()
          return

        ###*
        # @return {?}
        ###

        lex = ->
          template = path
          len = template.length
          result = undefined
          match = undefined
          j = undefined
          n = undefined
          character = undefined
          while i < len
            switch character = template.charCodeAt(i)

              when 9
                i++
              when 10
                i++
              when 13
                i++
              when 32
                i++
              when 123
                return result = if charIndexBuggy then template.charAt(i) else template[i]
                i++
                result

              when 125
                return result = if charIndexBuggy then template.charAt(i) else template[i]
                i++
                result

              when 91
                return result = if charIndexBuggy then template.charAt(i) else template[i]
                i++
                result

              when 93
                return result = if charIndexBuggy then template.charAt(i) else template[i]
                i++
                result

              when 58
                return result = if charIndexBuggy then template.charAt(i) else template[i]
                i++
                result

              when 44
                return result = if charIndexBuggy then template.charAt(i) else template[i]
                i++
                result

              when 34

                ###* @type {string} ###

                result = '@'
                i++
                while i < len
                  if character = template.charCodeAt(i)
                    32 > character

                    abort()
                  else
                    if 92 == character
                      switch character = template.charCodeAt(++i)

                        when 92
                          result += SIMPLE_ESCAPE_SEQUENCES[character]
                          i++
                        when 34
                          result += SIMPLE_ESCAPE_SEQUENCES[character]
                          i++
                        when 47
                          result += SIMPLE_ESCAPE_SEQUENCES[character]
                          i++
                        when 98
                          result += SIMPLE_ESCAPE_SEQUENCES[character]
                          i++
                        when 116
                          result += SIMPLE_ESCAPE_SEQUENCES[character]
                          i++
                        when 110
                          result += SIMPLE_ESCAPE_SEQUENCES[character]
                          i++
                        when 102
                          result += SIMPLE_ESCAPE_SEQUENCES[character]
                          i++
                        when 114
                          result += SIMPLE_ESCAPE_SEQUENCES[character]
                          i++
                        when 117

                          ###* @type {number} ###

                          match = ++i
                          j = i + 4
                          while i < j
                            character = template.charCodeAt(i)
                            if !(48 <= character and 57 >= character)
                              if !(97 <= character and 102 >= character)
                                if !(65 <= character and 70 >= character)
                                  abort()
                            i++
                          result += from('0x' + template.slice(match, i))
                        else
                          abort()
                    else
                      if 34 == character
                        break
                      character = template.charCodeAt(i)
                      match = i
                      while 32 <= character and 92 != character and 34 != character
                        character = template.charCodeAt(++i)
                      result += template.slice(match, i)
                if 34 == template.charCodeAt(i)
                  return i++
                  result

                abort()
              else
                match = i
                if 45 == character

                  ###* @type {boolean} ###

                  n = step
                  character = template.charCodeAt(++i)
                if 48 <= character and 57 >= character
                  if 48 == character
                    if character = template.charCodeAt(i + 1)
                      48 <= character and 57 >= character

                      abort()
                  while i < len and 48 <= template.charCodeAt(i) and 57 >= template.charCodeAt(i)
                    i++
                  character = template.charCodeAt(i)
                  if 46 == template.charCodeAt(i)

                    ###* @type {number} ###

                    j = ++i
                    while j < len and  48 <= template.charCodeAt(j) and 57 >= template.charCodeAt(j)
                      j++
                    character = template.charCodeAt(j)
                    if j == i
                      abort()

                    ###* @type {number} ###

                    i = j
                  character = template.charCodeAt(i)
                  if 101 == character or 69 == character
                    character = template.charCodeAt(++i)
                    if !(43 != character and 45 != character)
                      i++

                    ###* @type {(null|number)} ###

                    j = i
                    while j < len and
                    48 <= template.charCodeAt(j) and 57 >= template.charCodeAt(j)
                      j++
                    character = template.charCodeAt(j)
                    if j == i
                      abort()

                    ###* @type {(null|number)} ###

                    i = j
                  return +template.slice(match, i)
                if n
                  abort()
                if 'true' == template.slice(i, i + 4)
                  return i += 4
                  step

                if 'false' == template.slice(i, i + 5)
                  return i += 5
                  false

                if 'null' == template.slice(i, i + 4)
                  return i += 4
                  item

                abort()
          '$'

        ###*
        # @param {string} value
        # @return {?}
        ###

        get = (value) ->
          results = undefined
          n = undefined
          if '$' == value
            abort()
          if 'string' == typeof value
            if '@' == (if charIndexBuggy then value.charAt(0) else value[0])
              return value.slice(1)
            if '[' == value

              ###* @type {Array} ###

              results = []
              loop
                value = lex()
                if ']' == value
                  break
                if n
                  if ',' == value
                    value = lex()
                    if ']' == value
                      abort()
                  else
                    abort()
                if ',' == value
                  abort()
                results.push get(value)
                n or (n = step)
              return results
            if '{' == value
              results = {}
              loop
                value = lex()
                if '}' == value
                  break
                if n
                  if ',' == value
                    value = lex()
                    if '}' == value
                      abort()
                  else
                    abort()
                if !(',' != value and 'string' == typeof value and '@' == (if charIndexBuggy then value.charAt(0) else value[0]) and ':' == lex())
                  abort()
                results[value.slice(1)] = get(lex())
                n or (n = step)
              return results
            abort()
          value

        ###*
        # @param {Object} source
        # @param {string} property
        # @param {Function} element
        # @return {undefined}
        ###

        update = (source, property, element) ->
          element = walk(source, property, element)
          if element == undef
            delete source[property]
          else

            ###* @type {Function} ###

            source[property] = element
          return

        ###*
        # @param {Object} source
        # @param {string} property
        # @param {Function} callback
        # @return {?}
        ###

        walk = (source, property, callback) ->
          value = source[property]
          length = undefined
          if 'object' == typeof value and value
            if '[object Array]' == getClass.call(value)
              length = value.length
              while length--
                update value, length, callback
            else
              foreach value, (property) ->
                update value, property, callback
                return
          callback.call source, property, value

        ###*
        # @param {Object} v02
        # @param {Function} callback
        # @return {?}
        ###

        JSON3.parse = (v02, callback) ->
          result = undefined
          value = undefined

          ###* @type {number} ###

          i = 0

          ###* @type {string} ###

          path = '' + v02
          result = get(lex())
          if '$' != lex()
            abort()

          ###* @type {null} ###

          i = path = item
          value = '': result
          if callback and '[object Function]' == getClass.call(callback) then walk(value, '', callback) else result

    if isLoader
      define ->
        JSON3
    return
  ) this
  return
do ->

  ###* @type {HTMLDocument} ###

  doc = document
  data = {}
  target = B.G
  self = B.style
  exports = B.V
  event = B.event
  throttledUpdate = B.N
  config = B.cookie

  ###* @type {string} ###

  ###*
  # @return {undefined}
  ###

  initialize = ->
    failuresLink = d('#note-input')

    ###*
    # @param {element} container
    # @param {element} el
    # @return {?}
    ###

    initialize = (container, el) ->
      (e) ->
        tag = container.innerHTML.replace(/<[^>]*>|\s+/g, '')
        txt = el.value.trim()
        if self.v(el, 'invalid')

          ###* @type {string} ###

          txt = ''
          self.b el, 'invalid'
        txt = txt.replace(/\s*#[_0-9a-z\u0430-\u044f]+/gi, '')
        el.focus()

        ###* @type {string} ###

        el.value = if txt then txt + ' ' + tag + ' ' else tag + ' '
        callback el
        event.prEventDefault e
        return

    if failuresLink
      m = d('#trending-full')
      i = d('#trending-mob')
      if m
        if i
          i.innerHTML = m.innerHTML
      m = d('.trnd')

      ###* @type {number} ###

      i = 0
      n = m.length
      while i < n
        event.add m[i], 'click', initialize(m[i], failuresLink)
        i++
    return

  ###*
  # @return {undefined}
  ###

  buildDeck = ->
    event.add document, 'keydown', (e) ->
      if 13 == e.keyCode
        t = event.u(e)
        if 'textarea' != t.nodeName.toLowerCase() and (t = target.t(t))
          return event.prEventDefault(e)
          cb(t)
          false

      return
    return

  ###*
  # @return {undefined}
  ###

  add = ->
    values = d('.placeholder')

    ###*
    # @param {element} name
    # @param {?} obj
    # @return {?}
    ###

    func = (name, obj) ->
      ->
        if name.value
          debug obj
        else
          i obj
        return

    ###*
    # @param {element} o
    # @param {?} url
    # @return {?}
    ###

    callback = (o, url) ->
      ->
        if o.value
          debug url
        return

    if values

      ###* @type {number} ###

      i = 0
      valuesLen = values.length
      name = undefined
      while i < valuesLen
        name = d('#' + values[i].htmlFor)
        setTimeout callback(name, values[i]), 100
        target.J name, func(name, values[i])
        event.add name, 'focus', func(name, values[i])
        i++
    return

  ###*
  # @return {undefined}
  ###

  addEvent = ->

    ###* @type {Array} ###

    context = [
      d('#menu-replies')
      d('#link-replies')
      d('#next-reply')
    ]

    ###* @type {number} ###

    i = 0

    ###* @type {number} ###

    j = context.length

    ###*
    # @param {StyleSheet} a
    # @return {?}
    ###

    fn = (a) ->
      (e) ->
        parts = a.href.split('#')
        if parts[0] == window.location.href.split('#')[0]
          event.prEventDefault e

          ###* @type {string} ###

          window.location = parts[0] + (if window.location.search then '&' else '?') + 'go=1' + (if parts[1] then '#' + parts[1] else '')
        return

    while i < j
      if context[i]
        event.add context[i], 'click', fn(context[i])
      i++
    return

  ###*
  # @return {undefined}
  ###

  handler = ->
    element = d('.focused')[0]
    if element
      element.focus()
      container = d('#reply-input')
      token = d('#new')
      if container
        if token
          if element == container
            event.add token, 'focus', ->
              container.focus()
              return
    return

  ###*
  # @param {string} elem
  # @return {undefined}
  ###

  next = (elem) ->
    show()
    runTest()
    init()
    values = d('.autosize')
    if 'undefined' == typeof values.length

      ###* @type {Array} ###

      values = [ values ]

    ###* @type {number} ###

    i = 0
    valuesLen = values.length
    while i < valuesLen
      self.b values[i], 'autosize'
      new (target.U)(values[i])
      i++
    test()
    fn elem
    return

  ###*
  # @return {undefined}
  ###

  test = ->
    e = d('#burnit')
    that = d('#burn-cancel')

    ###*
    # @param {?} e
    # @return {?}
    ###

    next = (e) ->
      ->
        debug d('#reply')
        i d('#burn-box')
        debug d('#burnit-show')
        i d('#burnit-cancel')
        d('#reply-input').blur()
        e.onclick = complete(e)
        false

    ###*
    # @param {?} e
    # @return {?}
    ###

    complete = (e) ->
      ->
        debug d('#burn-box')
        i d('#reply')
        debug d('#burnit-cancel')
        i d('#burnit-show')
        e.onclick = next(e)
        obj = d('#reply-input')
        id = undefined
        id = obj.value

        ###* @type {string} ###

        obj.value = ''
        obj.focus()
        obj.value = id
        false

    if e
      e.onclick = next(e)
      that.onclick = complete(e)
    return

  ###*
  # @return {undefined}
  ###

  f = ->
    timeout = d('#next')
    if timeout
      if timeout.offsetHeight
        event.add document, 'keydown', update
    return

  ###*
  # @param {(Function|string)} data
  # @return {undefined}
  ###

  apply = (data) ->
    if !data

      ###* @type {string} ###

      data = 'launch'
    flush data
    i d('#next')
    f()
    return

  ###*
  # @param {string} type
  # @return {undefined}
  ###

  flush = (type) ->
    if !type

      ###* @type {string} ###

      type = 'default'
    if 'bin' == type or 'launch' == type

      ###* @type {string} ###

      data.next.P = type
    if 'default' == type
      type = data.next.P
    else
      if 'reply' == data.next.O
        return

    ###* @type {string} ###

    data.next.O = type
    switch type
      when 'reply'
        debug d('#next-bin')
        debug d('#next-launch')
        i d('#next-reply')
      when 'launch'
        debug d('#next-bin')
        debug d('#next-reply')
        i d('#next-launch')
      when 'bin'
        debug d('#next-reply')
        debug d('#next-launch')
        i d('#next-bin')
    return

  ###*
  # @return {undefined}
  ###

  setup = ->
    token = d('#note-input')

    ###*
    # @param {Object} e
    # @return {undefined}
    ###

    init = (e) ->
      if 17 == e.keyCode
        if init.q
          if 500 > Date.now() - (init.q)
            token.value += '#'
            callback event.u(e)

            ###* @type {number} ###

            init.q = 0
          else

            ###* @type {number} ###

            init.q = Date.now()
        else

          ###* @type {number} ###

          init.q = Date.now()
      else

        ###* @type {number} ###

        init.q = 0
      return

    if token
      event.add token, 'keyup', init
    return

  ###*
  # @param {element} element
  # @return {undefined}
  ###

  callback = (element) ->
    if element

      ###* @type {null} ###

      evt = null
      if document.createEventObject
        evt = document.createEventObject()
        element.fireEvent 'onkeyup', evt
      else

        ###* @type {(event|null)} ###

        evt = document.createEvent('KeyboardEvent')
        evt.initEvent 'keyup', true, true
        element.dispatchEvent evt
    return

  ###*
  # @param {Object} e
  # @return {undefined}
  ###

  update = (e) ->
    el = d('#next')
    if (e.ctrlKey or e.metaKey) and 13 == e.keyCode and el and el.offsetHeight
      e = el.firstChild
      loop
        if e.offsetHeight
          if e.href
            event.remove document, 'keydown', update
            window.location = e.href
        unless e = e.nextSibling
          break
    return

  ###*
  # @param {?} string
  # @return {?}
  ###

  quote = (string) ->
    target.ba(string).trim().replace /\n/g, '<br>'

  ###*
  # @return {undefined}
  ###

  submit = ->

    ###* @type {string} ###

    url = encodeURIComponent(location.pathname.substr(1) + location.search + location.hash.replace('#', '[]'))

    ###* @type {string} ###

    window.location = '/login?ret=' + url
    return

  ###*
  # @param {?} options
  # @param {?} deepDataAndEvents
  # @return {undefined}
  ###

  value = (options, deepDataAndEvents) ->
    start options, data.H, deepDataAndEvents
    build options
    return

  ###*
  # @param {string} val
  # @return {undefined}
  ###

  fn = (val) ->
    if !val

      ###* @type {string} ###

      val = location.pathname.substr(1)
    if '' == val

      ###* @type {string} ###

      val = 'index'

    ###* @type {string} ###

    data.R = val
    return

  ###*
  # @param {?} src
  # @return {undefined}
  ###

  debug = (src) ->
    if src
      if 'undefined' == typeof src.length

        ###* @type {Array} ###

        src = [ src ]

      ###* @type {number} ###

      j = 0
      l2 = src.length
      while j < l2
        self.d src[j], 'hide'
        j++
    return

  ###*
  # @param {?} obj
  # @return {undefined}
  ###

  i = (obj) ->
    if obj
      if 'undefined' == typeof obj.length

        ###* @type {Array} ###

        obj = [ obj ]

      ###* @type {number} ###

      i = 0
      l = obj.length
      while i < l
        self.b obj[i], 'hide'
        i++
    return

  ###*
  # @return {undefined}
  ###

  runTest = ->
    elems = d('.np')

    ###*
    # @param {Object} p
    # @param {error} options
    # @return {?}
    ###

    init = (p, options) ->
      done = options.onsubmit
      ->
        if 'function' != typeof done or done() then (if 'np' of p and !start(options, 'np', Date.now()) and p.np != p.value then false else true) else false

    ###*
    # @param {element} input
    # @return {?}
    ###

    fn = (input) ->
      ->
        maxlength = input.getAttribute('maxlength')
        cnl = input.value.length
        if maxlength
          if cnl > maxlength
            input.value = input.value.substr(0, maxlength)
        input.np = input.value
        return

    if 'undefined' == typeof elems.length

      ###* @type {Array} ###

      elems = [ elems ]

    ###* @type {number} ###

    i = 0
    length = elems.length
    result = undefined
    while i < length

      ###* @type {string} ###

      elems[i].np = ''
      result = target.t(elems[i])
      result.onsubmit = init(elems[i], result)

      ###* @type {function (): ?} ###

      elems[i].ondrop = elems[i].onpaste = elems[i].oncontextmenu = emptyHandler
      result = fn(elems[i])
      target.J elems[i], result
      setInterval result, 1e3
      self.b elems[i], 'np'
      i++
    return

  ###*
  # @return {undefined}
  ###

  init = ->
    items = d('.ks')

    ###*
    # @param {Object} e
    # @return {undefined}
    ###

    click = (e) ->
      if e.ctrlKey or e.metaKey
        if 13 == e.keyCode
          event.oa e
          event.prEventDefault e
          e = target.t(event.u(e))
          cb e
      return

    ###*
    # @param {element} key
    # @return {?}
    ###

    fn = (key) ->
      (e) ->
        if key.offsetHeight
          if e.ctrlKey or e.metaKey
            if 13 == e.keyCode
              cb target.t(key)
        else
          event.remove document, 'keydown', listener
        return

    if 'undefined' == typeof items.length

      ###* @type {Array} ###

      items = [ items ]
    if 1 == items.length
      if items[0]
        if items[0].offsetHeight
          event.add document, 'keydown', fn(items[0])

    ###* @type {number} ###

    i = 0
    valuesLen = items.length
    while i < valuesLen
      event.add items[i], 'keydown', click
      self.b items[i], 'ks'
      i++
    return

  ###*
  # @return {undefined}
  ###

  load = ->
    node = d('.ad-unit')[0]
    if node

      ###*
      # @param {string} text
      # @return {undefined}
      ###

      load = (text) ->
        if '' != text

          ###* @type {string} ###

          d('#content').innerHTML = text
        return

      if 0 == node.offsetHeight

        ###* @type {string} ###

        d('#content').innerHTML = ''
        exports.S window.location.protocol + '//' + window.location.host + '/request/ab', load
    return

  ###*
  # @return {undefined}
  ###

  show = ->
    values = d('.form-submit')

    ###*
    # @param {Object} key
    # @return {undefined}
    ###

    fn = (key) ->
      key = event.u(key)
      cb target.t(key)
      return

    ###*
    # @param {Object} e
    # @return {?}
    ###

    callback = (e) ->
      evt = event.u(e)
      event.prEventDefault e
      cb evt
      false

    if 'undefined' == typeof values.length

      ###* @type {Array} ###

      values = [ values ]

    ###* @type {number} ###

    i = 0
    valuesLen = values.length
    while i < valuesLen

      ###* @type {function (): ?} ###

      values[i].onclick = emptyHandler
      event.add values[i], 'click', fn
      event.add target.t(values[i]), 'submit', callback
      self.b values[i], 'form-submit'
      i++
    return

  ###*
  # @param {Object} options
  # @return {undefined}
  ###

  build = (options) ->
    file = options.elements[data.H]
    if file
      input = file.value

      ###* @type {number} ###

      hash = 0
      il = input.length
      if 0 != il

        ###* @type {number} ###

        i = 0
        character = undefined
        while i < il
          character = input.charCodeAt(i)
          hash = (hash << 5) - hash + character
          hash &= hash
          i++
      start options, data.Y, hash
      config.set data.H, file.value
    return

  ###*
  # @param {Object} options
  # @return {undefined}
  ###

  cb = (options) ->
    if !options.e
      if !('function' == typeof options.onsubmit and !options.onsubmit())
        build options
        if data.forms[options.id]
          data.forms[options.id].submit()
        else
          options.submit()
    return

  ###*
  # @param {Object} options
  # @param {string} id
  # @param {number} value
  # @return {undefined}
  ###

  start = (options, id, value) ->
    if options.elements[id]

      ###* @type {number} ###

      options.elements[id].value = value
    else

      ###* @type {element} ###

      elem = doc.createElement('input')

      ###* @type {string} ###

      elem.type = 'hidden'

      ###* @type {string} ###

      elem.name = id

      ###* @type {number} ###

      elem.value = value
      options.appendChild elem
    return

  ###*
  # @return {?}
  ###

  emptyHandler = ->
    false

  data.name = 'Flymer'

  ###* @type {string} ###

  data.H = 'fkey'

  ###* @type {string} ###

  data.Y = 'dkey'

  ###* @type {string} ###

  data.R = ''
  data.r = refresh: 'Произошла ошибка. Попробуйте перезагрузить страницу.'
  data.next =
    P: 'launch'
    O: ''
  data.forms = {}
  data.forms.newpass =
    g: 'newpass'
    f: 'newpass-box'
    form: null
    a: null
    submit: ->
      @form = d('#' + @g)
      @a = d('#' + @f)
      debug d('#newpass-error')
      if @m()

        ###* @type {boolean} ###

        @form.e = true
        self.d @form, 'invisible'
        self.d @a, 'loading'
        exports.h @form.action, @form, @c.bind(this)
      return
    m: ->
      current = d('#np-pass')
      if current.value
        if !/^[A-Za-z0-9_!@#$%^&*()+:;,.?<>\/-]+$/.test(current.value)
          return current.value = ''
          @n()
          false

        if 6 > current.value.length or 20 < current.value.length
          return @n()
          false

      else
        return current.focus()
        false

      true
    c: (a) ->
      try

        ###* @type {*} ###

        a = JSON.parse(a)
        if 'object' != typeof a
          throw 1
        if a.error
          e = a.error
          switch e.type
            when 'redirect'
              return target.w(e.message)
            when 'expired'
              return @k(e.message)
            when 'input'
              return @A()
            else
              return @A(e.message)
        if !a.ok
          throw 1
      catch c
        return @A(data.r.refresh)
      self.b @a, 'loading'

      ###* @type {string} ###

      @form.innerHTML = ''
      a = d('#newpass-confirm')
      a.innerHTML = a.getAttribute('data-msg')
      i a
      i d('#next')
      f()
      return
    A: (msg) ->
      r = d('#npe-msg')
      i r
      msg = msg or r.getAttribute('data-msg')

      ###* @type {string} ###

      r.innerHTML = msg
      i d('#newpass-error')

      ###* @type {boolean} ###

      @form.e = false
      self.b @form, 'invisible'
      self.b @a, 'loading'
      d('#np-pass').focus()
      return
    n: ->
      i d('#newpass-error')
      r = d('#npe-msg')
      r.innerHTML = r.getAttribute('data-msg')
      i r
      d('#np-pass').focus()
      return
    k: (deepDataAndEvents) ->
      if !add.j
        value @form, deepDataAndEvents
        exports.h @form.action, @form, @c.bind(this)

        ###* @type {number} ###

        add.j = 1
      return
  data.forms.lostpass =
    g: 'lostpass'
    f: 'lostpass-box'
    form: null
    a: null
    submit: ->
      @form = d('#' + @g)
      @a = d('#' + @f)
      debug d('#lostpass-error')
      if @m()

        ###* @type {boolean} ###

        @form.e = true
        self.d @form, 'invisible'
        self.d @a, 'loading'
        exports.h @form.action, @form, @c.bind(this)
      return
    m: ->
      input = d('#lp-email')
      if input.value.trim() then (if target.L(input.value.trim()) then true else input.focus()
      d('#lpe-msg').innerHTML = d('#lpe-msg').getAttribute('data-msg')
      i(d('#lostpass-error'))
      i(d('#lpe-msg'))
      false
      ) else input.focus()
      false
    c: (a) ->
      try

        ###* @type {*} ###

        a = JSON.parse(a)
        if 'object' != typeof a
          throw 1
        if a.error
          e = a.error
          switch e.type
            when 'redirect'
              return target.w(e.message)
            when 'expired'
              return @k(e.message)
            else
              return @A(e.message)
        if !a.ok
          throw 1
      catch c
        return @A(data.r.refresh)
      self.b @a, 'loading'

      ###* @type {string} ###

      @form.innerHTML = ''
      a = d('#lostpass-confirm')
      a.innerHTML = a.getAttribute('data-msg')
      i a
      return
    A: (name) ->
      key = d('#lpe-msg')
      i key

      ###* @type {string} ###

      key.innerHTML = name
      i d('#lostpass-error')

      ###* @type {boolean} ###

      @form.e = false
      self.b @form, 'invisible'
      self.b @a, 'loading'
      d('#lp-email').focus()
      return
    k: (deepDataAndEvents) ->
      if !add.j
        value @form, deepDataAndEvents
        exports.h @form.action, @form, @c.bind(this)

        ###* @type {number} ###

        add.j = 1
      return
  data.forms.login =
    g: 'login'
    f: 'login-box'
    form: null
    a: null
    submit: ->
      @form = d('#' + @g)
      @a = d('#' + @f)
      debug d('#login-error')
      if @m()

        ###* @type {boolean} ###

        @form.e = true
        self.d @form, 'invisible'
        self.d @a, 'loading'
        exports.h @form.action, @form, @c.bind(this)
      return
    m: ->

      ###* @type {boolean} ###

      res = true
      input = d('#l-email')
      textfield = d('#l-pass')
      if !textfield.value
        textfield.focus()

        ###* @type {boolean} ###

        res = false
      if !input.value.trim()

        ###* @type {string} ###

        input.value = ''
        input.focus()

        ###* @type {boolean} ###

        res = false
      res
    c: (a) ->
      try

        ###* @type {*} ###

        a = JSON.parse(a)
        if 'object' != typeof a
          throw 1
        if a.error
          e = a.error
          switch e.type
            when 'redirect'
              return target.w(e.message)
            when 'tech'
              return @i(e.message)
            when 'input'
              return @n(e.message)
            when 'expired'
              return @k(e.message)
          return
        if !a.ok
          throw 1
      catch c
        return @i(data.r.refresh)
      a = @form.getAttribute('data-goto') or '/'
      target.w a
      return
    i: (e) ->
      debug d('#le-input')
      a = d('#le-tech')
      i a

      ###* @type {string} ###

      a.innerHTML = e
      i d('#login-error')

      ###* @type {boolean} ###

      @form.e = false
      self.b @form, 'invisible'
      self.b @a, 'loading'
      return
    n: ->
      debug d('#le-tech')
      r = d('#le-input')
      i r
      r.innerHTML = r.getAttribute('data-msg')
      i d('#login-error')

      ###* @type {boolean} ###

      @form.e = false
      self.b @form, 'invisible'
      self.b @a, 'loading'
      return
    k: (deepDataAndEvents) ->
      if !add.j
        value @form, deepDataAndEvents
        exports.h @form.action, @form, @c.bind(this)

        ###* @type {number} ###

        add.j = 1
      return
  data.forms.signup =
    g: 'signup'
    f: 'signup-box'
    form: null
    a: null
    submit: ->
      @form = d('#' + @g)
      @a = d('#' + @f)
      @K()
      if @m()

        ###* @type {boolean} ###

        @form.e = true
        self.d @form, 'invisible'
        self.d @a, 'loading'
        exports.h @form.action, @form, @c.bind(this)
      return
    m: ->

      ###* @type {Array} ###

      req = []

      ###* @type {boolean} ###

      b = false
      input = d('#s-email')
      current = d('#s-pass')
      filter = d('#s-agree')
      if !current.value
        current.focus()

        ###* @type {boolean} ###

        b = true
      else
        if !/^[A-Za-z0-9_!@#$%^&*()+:;,.?<>\/-]+$/.test(current.value)

          ###* @type {string} ###

          current.value = ''
          current.focus()
          req.push 'pass'
        else
          if 6 > current.value.length or 20 < current.value.length
            current.focus()
            req.push 'pass'
      if input.value.trim()
        if !target.L(input.value.trim())
          input.focus()
          req.push 'email'
      else
        input.focus()

        ###* @type {boolean} ###

        b = true
      if !b
        if !filter.checked
          req.push 'agree'
      if 0 < req.length
        @K(req)
        false
      else if b then false else true
    K: (v) ->
      debug [
        d('#se-email')
        d('#se-pass')
        d('#se-agree')
        d('#se-tech')
      ]
      if v and v.length
        i d('#signup-error')

        ###* @type {number} ###

        x = 0
        pad = v.length
        c = undefined
        while x < pad
          c = d('#se-' + v[x])
          c.innerHTML = c.getAttribute('data-msg')
          i c
          x++
      else
        debug d('#signup-error')
      return
    c: (a) ->
      try

        ###* @type {*} ###

        a = JSON.parse(a)
        if 'object' != typeof a
          throw 1
        if a.error
          e = a.error
          switch e.type
            when 'redirect'
              return target.w(e.message)
            when 'tech'
              return @i(e.message)
            when 'input'
              return @n(e.message)
            when 'expired'
              return @k(e.message)
          return
        if !a.ok
          throw 1
      catch c
        return @i(data.r.refresh)
      self.b @a, 'loading'

      ###* @type {string} ###

      @form.innerHTML = ''
      a = d('#signup-confirm')
      a.innerHTML = a.getAttribute('data-msg')
      i a
      return
    i: (e) ->
      a = d('#se-tech')
      i a

      ###* @type {string} ###

      a.innerHTML = e
      i d('#signup-error')

      ###* @type {boolean} ###

      @form.e = false
      self.b @form, 'invisible'
      self.b @a, 'loading'
      return
    n: (event) ->
      @K event

      ###* @type {boolean} ###

      @form.e = false
      self.b @form, 'invisible'
      self.b @a, 'loading'
      return
    k: (deepDataAndEvents) ->
      if !add.j
        value @form, deepDataAndEvents
        exports.h @form.action, @form, @c.bind(this)

        ###* @type {number} ###

        add.j = 1
      return
  data.forms.launch =
    g: 'launch'
    f: 'launch-box'
    C: 'note-input'
    form: null
    a: null
    Q: ''
    submit: ->
      @form = d('#' + @g)
      @a = d('#' + @f)
      input = d('#' + @C)
      value = input.value.trim()
      if value == @Q or '' == value
        input.focus()

        ###* @type {string} ###

        input.value = ''
      else

        ###* @type {boolean} ###

        @form.e = true
        input.blur()
        self.d @form, 'invisible'
        self.d @a, 'loading'
        exports.h @form.action, @form, @c.bind(this)
      return
    c: (a) ->
      try

        ###* @type {*} ###

        a = JSON.parse(a)
        if 'object' != typeof a
          throw 1
        callers.B()
        if a.error
          callers.p a.replies
          e = a.error
          switch e.type
            when 'redirect'
              return target.w(e.message)
            when 'auth'
              return submit()
            when 'tech'
              return @i(e.message)
            when 'input'
              return @n(e.message)
            when 'system'
              return @F(e.message, e.mode)
            when 'expired'
              return @k(e.message)
          return
        if !a.html
          throw 1
      catch c
        return @i(data.r.refresh)
      d('#current').innerHTML = a.html
      debug d('#trending-mob')
      d('#reply-input').focus()
      next 'catch'
      callers.p a.replies
      return
    i: (e) ->
      a = d('#error')

      ###* @type {string} ###

      a.innerHTML = e

      ###* @type {string} ###

      a.className = 'tech-message'

      ###* @type {boolean} ###

      @form.e = false
      self.b @form, 'invisible'
      self.b @a, 'loading'
      return
    n: (r) ->
      e = d('#' + @C)
      debug d('#error')

      ###* @type {boolean} ###

      @form.e = false
      self.b @form, 'invisible'
      self.b @a, 'loading'
      self.d e, 'invalid'

      ###* @type {string} ###

      e.value = '\n' + r
      @Q = r

      ###*
      # @return {undefined}
      ###

      e.onfocus = ->

        ###* @type {string} ###

        @value = ''
        self.b this, 'invalid'

        ###* @type {null} ###

        @onfocus = null
        return

      return
    F: (e, value) ->
      a = d('#error')
      a.innerHTML = e

      ###* @type {string} ###

      a.className = 'system-message'
      debug d('#current')
      apply value
      return
    k: (deepDataAndEvents) ->
      if !add.j
        value @form, deepDataAndEvents
        exports.h @form.action, @form, @c.bind(this)

        ###* @type {number} ###

        add.j = 1
      return
  data.forms.reply =
    g: 'reply'
    f: 'reply-box'
    C: 'reply-input'
    form: null
    a: null
    submit: ->
      @form = d('#' + @g)
      @a = d('#' + @f)
      input = d('#' + @C)
      if input.value.trim()

        ###* @type {boolean} ###

        @form.e = true
        input.blur()
        self.d @form, 'invisible'
        self.d @a, 'loading'
        exports.h @form.action, @form, @c.bind(this)
      else
        input.focus()

        ###* @type {string} ###

        input.value = ''
      return
    c: (a) ->
      try

        ###* @type {*} ###

        a = JSON.parse(a)
        if 'object' != typeof a
          throw 1
        callers.B()
        if a.error
          callers.p a.replies
          h = a.error
          switch h.type
            when 'auth'
              return submit()
            when 'tech'
              return @i(h.message)
            when 'system'
              return @F(h.message)
            when 'input'
              return @n(h.message)
            when 'expired'
              return @k(h.message)
          return
        if !a.ok
          throw 1
      catch c
        return @i(data.r.refresh)
      h = d('#current').parentNode.offsetHeight
      if a['catch']
        i d('#tab-catch')
        setTimeout (->
          debug d('#tab-catch')
          return
        ), 3e4
      n = quote(d('#' + @C).value)
      b = d('#myReply')
      b.innerHTML = n
      i b
      apply 'launch'

      ###* @type {number} ###

      n = d('#current').parentNode.offsetHeight - (@a.offsetHeight)
      h -= n
      if 0 < h

        ###* @type {element} ###

        n = document.createElement('div')

        ###* @type {string} ###

        n.id = 'spacer'

        ###* @type {string} ###

        n.style.visibility = 'hidden'

        ###* @type {string} ###

        n.style.height = h + 'px'
        d('#current').parentNode.appendChild n
      debug @a
      fn 'view'
      callers.p a.replies
      return
    i: (obj) ->
      elem = d('#reply-error')

      ###* @type {string} ###

      elem.innerHTML = obj

      ###* @type {string} ###

      elem.className = 'tech-message'

      ###* @type {boolean} ###

      @form.e = false
      self.b @form, 'invisible'
      self.b @a, 'loading'
      return
    F: (e) ->
      a = d('#error')
      a.innerHTML = e

      ###* @type {string} ###

      a.className = 'system-message'
      debug d('#current')
      apply 'launch'
      return
    n: (content) ->
      elem = d('#reply-error')
      elem.innerHTML = content

      ###* @type {string} ###

      elem.className = 'input-message'

      ###* @type {boolean} ###

      @form.e = false
      self.b @form, 'invisible'
      self.b @a, 'loading'
      return
    k: (deepDataAndEvents) ->
      if !add.j
        value @form, deepDataAndEvents
        exports.h @form.action, @form, @c.bind(this)

        ###* @type {number} ###

        add.j = 1
      return
  data.forms['catch'] =
    g: 'catch'
    f: 'tab-catch'
    form: null
    a: null
    submit: ->
      event.remove document, 'keydown', update
      @form = d('#' + @g)
      @a = d('#' + @f)

      ###* @type {boolean} ###

      @form.e = true
      self.d @form, 'invisible'
      self.d @a, 'loading'
      exports.h @form.action, @form, @c.bind(this)
      return
    c: (a) ->
      debug @a
      self.b @form, 'invisible'
      self.b @a, 'loading'

      ###* @type {boolean} ###

      @form.e = false
      window.scroll 0, 0
      try

        ###* @type {*} ###

        a = JSON.parse(a)
        if 'object' != typeof a
          throw 1
        callers.B()
        if a.error
          callers.p a.replies
          e = a.error
          switch e.type
            when 'auth'
              return submit()
            when 'system'
              return @F(e.message)
          return
        if !a.html
          throw 1
      catch c
        return
      if d('#spacer')
        d('#spacer').parentNode.removeChild d('#spacer')
      debug d('#next')
      d('#current').innerHTML = a.html
      d('#reply-input').focus()
      next 'catch'
      callers.p a.replies
      return
    F: (e) ->
      debug d('#current')
      a = d('#error')

      ###* @type {string} ###

      a.innerHTML = e

      ###* @type {string} ###

      a.className = 'system-message'
      apply 'launch'
      return
  data.forms.contact =
    g: 'contact'
    f: 'contact-box'
    form: null
    a: null
    submit: ->
      @form = d('#' + @g)
      @a = d('#' + @f)
      if @m()

        ###* @type {boolean} ###

        @form.e = true
        self.d @form, 'invisible'
        self.d @a, 'loading'
        exports.h @form.action, @form, @c.bind(this)
      return
    m: ->

      ###* @type {boolean} ###

      res = true
      err = d('#cname')
      _this = d('#cemail')
      comment = d('#cmessage')

      ###*
      # @param {undefined} value
      # @return {undefined}
      ###

      callback = (value) ->

        ###*
        # @param {element} d
        # @return {undefined}
        ###

        callback = (d) ->
          d = event.u(d)
          self.b d, 'invalid'
          event.remove d, 'focus', callback
          return

        self.d value, 'invalid'
        event.add value, 'focus', callback
        return

      if !err.value.trim().length
        callback err

        ###* @type {boolean} ###

        res = false
      if !target.L(_this.value.trim())
        callback _this

        ###* @type {boolean} ###

        res = false
      if 10 > comment.value.trim().length
        callback comment

        ###* @type {boolean} ###

        res = false
      res
    c: (a) ->
      try

        ###* @type {*} ###

        a = JSON.parse(a)
        if 'object' != typeof a
          throw 1
        if a.error
          e = a.error
          switch e.type
            when 'tech'
              return @i(e.message)
            when 'expired'
              return @k(e.message)
          return
        if !a.ok
          throw 1
      catch c
        return @i(data.r.refresh)
      debug d('#error')
      debug @a

      ###* @type {string} ###

      @a.innerHTML = ''
      i d('#confirm')
      f()
      return
    i: (e) ->
      a = d('#error')

      ###* @type {string} ###

      a.innerHTML = e

      ###* @type {string} ###

      a.className = 'tech-message'

      ###* @type {boolean} ###

      @form.e = false
      self.b @form, 'invisible'
      self.b @a, 'loading'
      return
    k: (deepDataAndEvents) ->
      if !add.j
        value @form, deepDataAndEvents
        exports.h @form.action, @form, @c.bind(this)

        ###* @type {number} ###

        add.j = 1
      return
  data.forms.burn =
    g: 'burn'
    f: 'reply-box'
    form: null
    a: null
    submit: ->
      @form = d('#' + @g)
      @a = d('#' + @f)
      if @m()

        ###* @type {boolean} ###

        @form.e = true
        self.d @form, 'invisible'
        debug d('burnit')
        self.d @a, 'loading'
        exports.h @form.action, @form, @c.bind(this)
      return
    m: ->
      siblings = @form.elements.vtype

      ###* @type {number} ###

      j = 0
      while j < siblings.length
        if siblings[j].checked
          return true
        j++
      i d('#burn-hint')
      false
    c: (a) ->
      try

        ###* @type {*} ###

        a = JSON.parse(a)
        if 'object' != typeof a
          throw 1
        callers.B()
        if a.error
          callers.p a.replies
          h = a.error
          switch h.type
            when 'auth'
              return submit()
            when 'tech'
              return @i(h.message)
            when 'expired'
              return @k(h.message)
          return
        if !a.ok
          throw 1
      catch c
        return @i(data.r.refresh)
      h = d('#current').parentNode.offsetHeight
      i d('#burn-result')
      apply 'launch'

      ###* @type {number} ###

      p = d('#current').parentNode.offsetHeight - (@a.offsetHeight)

      ###* @type {number} ###

      h = h - p
      if 0 < h

        ###* @type {element} ###

        p = document.createElement('div')

        ###* @type {string} ###

        p.id = 'spacer'

        ###* @type {string} ###

        p.style.visibility = 'hidden'

        ###* @type {string} ###

        p.style.height = h + 'px'
        d('#current').parentNode.appendChild p
      debug @a
      fn 'view'
      callers.p a.replies
      return
    i: (obj) ->
      elem = d('#burn-error')

      ###* @type {string} ###

      elem.innerHTML = obj

      ###* @type {string} ###

      elem.className = 'tech-message'

      ###* @type {boolean} ###

      @form.e = false
      self.b @form, 'invisible'
      self.b @a, 'loading'
      return
    k: (deepDataAndEvents) ->
      if !add.j
        value @form, deepDataAndEvents
        exports.h @form.action, @form, @c.bind(this)

        ###* @type {number} ###

        add.j = 1
      return
  callers =
    ga: 14
    q: null
    B: ->
      if d('#tab-replies') or d('#menu-replies') or d('#next-reply')
        if null != @q
          clearTimeout @q

        ###* @type {number} ###

        @interval = 5

        ###* @type {number} ###

        @count = 0
        @T()
      return
    T: ->
      if @interval

        ###* @type {number} ###

        @q = setTimeout(@la.bind(this), 1e3 * @interval)
      return
    la: ->
      @count++
      exports.S window.location.protocol + '//' + window.location.host + '/request/repcount?c=' + @count, @W.bind(this)
      return
    W: (a) ->
      try

        ###* @type {*} ###

        a = JSON.parse(a)
        if a.error
          if 'auth' == a.error.type
            submit()
        else
          @p a.replies
          @pa()
          if @count < @ga
            @T()
      catch b
      return
    p: (obj) ->
      if obj

        ###* @type {string} ###

        title = document.title.replace(/^\(\d+\)\s/, '')
        if 0 < obj.num
          debug d('#menu-launch')
          if d('#tab-replies')
            i d('#tab-replies')
            d('#link-replies').innerHTML = obj.html
            d('#link-replies').href = obj.url
          if d('#menu-replies')
            d('#menu-replies').innerHTML = obj.html
            d('#menu-replies').href = obj.url
            i d('#menu-replies')
          if d('#next')
            d('#next-reply').href = obj.url
            flush 'reply'

          ###* @type {string} ###

          document.title = '(' + obj.num + ') ' + title
        else

          ###* @type {boolean} ###

          obj = !self.v(d('#menu-replies'), 'hide')
          debug d('#tab-replies')
          debug d('#menu-replies')
          if d('#next')
            flush 'default'
          name = data.R
          if obj
            if 'index' != name
              i d('#menu-launch')

          ###* @type {string} ###

          document.title = title
      return
    pa: ->

      ###* @type {number} ###

      @interval = if 6 > @count then 10 else 2 * @interval
      return
  throttledUpdate ->
    data.na = self.v(d('body')[0], 'in')
    if 'localhost' == location.hostname or 'file:' == location.protocol

      ###* @type {string} ###

      d('body')[0].innerHTML = ''
    li = d('#nosupport')
    if !event.isSupported('keyup') or window.operamini

      ###* @type {string} ###

      li.innerHTML = (if window.operamini then '<b>Opera Mini</b>' else 'Данный браузер') + ' не отвечает минимальным требованиям ' + data.name + '. Используйте другой браузер.'

      ###* @type {string} ###

      li.style.display = 'block'
    f()
    next()
    handler()
    buildDeck()
    if data.na
      setTimeout load, 1e3
      callers.B()
      addEvent()
      setup()
      initialize()
    else
      add()
    return
  return
window.CORe = B
B.addDOMLoadEvent = B.N
B.utils = B.G

###* @type {function (Object, ?): undefined} ###

B.G.loadScript = B.G.ea

# ---
# generated by js2coffee 2.0.4
