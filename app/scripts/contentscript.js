(function() {
  var inject;

  inject = function(content) {
    var script;
    if (typeof content === "function") {
      content = "(" + content + ")()";
    }
    script = document.createElement("script");
    script.type = "text/javascript";
    script.textContent = content;
    return document.head.appendChild(script);
  };

  document.getElementById("content").setAttribute("id", "nope-nope-nope");

  inject(function() {
    return setTimeout(function() {
      var _ref;
      return (_ref = window["reply-input"] || window["note-input"]) != null ? _ref.onpaste = null : void 0;
    }, 100);
  });

  inject(function() {
    return setTimeout(function() {
      return ["#trending-full", ".tlayout"].forEach(function(selector) {
        var el, _ref;
        el = document.querySelector(selector);
        if ((el != null ? (_ref = el.style) != null ? _ref.display : void 0 : void 0) === "none") {
          return el.style.setProperty("display", "block", "important");
        }
      });
    }, 100);
  });

}).call(this);
