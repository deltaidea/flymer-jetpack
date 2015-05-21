(function() {
  var conversationId, inject, link, textarea, _i, _len, _ref, _ref1, _ref2, _ref3;

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

  textarea = window["reply-input"] || window["note-input"];

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

  _ref = document.querySelectorAll(".linkB");
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    link = _ref[_i];
    link.href = link.href.replace("#new", "&full=1#new");
  }

  conversationId = (_ref1 = (_ref2 = document.location.href.match(/c=(\d*)/)) != null ? _ref2[1] : void 0) != null ? _ref1 : "new-note";

  console.log(conversationId);

  document.addEventListener("keyup", function(e) {
    var _ref3;
    if ((_ref3 = e.target.id) === "reply-input" || _ref3 === "note-input") {
      return localStorage[conversationId] = e.target.value;
    }
  });

  if (textarea != null) {
    textarea.value = (_ref3 = localStorage[conversationId]) != null ? _ref3 : "";
  }

}).call(this);
