(function() {
  var xhr;

  window.stop();

  document.documentElement.innerHTML = "";

  xhr = new XMLHttpRequest;

  xhr.open("GET", window.location.href, true);

  xhr.onerror = function() {
    return document.documentElement.innerHTML = "Error!";
  };

  xhr.onload = function() {
    var conversationId, link, newPage, page, script, textarea, _i, _len, _ref, _ref1, _ref2, _ref3;
    page = document.implementation.createHTMLDocument("");
    page.documentElement.innerHTML = this.responseText;
    newPage = document.importNode(page.documentElement, true);
    script = newPage.querySelector("script[src^='/js/core.js']");
    if (script != null) {
      script.setAttribute("src", chrome.extension.getURL("/scripts/core.js"));
    }
    document.replaceChild(newPage, document.documentElement);
    page = null;
    document.getElementById("content").setAttribute("id", "nope-nope-nope");
    textarea = window["reply-input"] || window["note-input"];
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
    return textarea != null ? textarea.value = (_ref3 = localStorage[conversationId]) != null ? _ref3 : "" : void 0;
  };

  xhr.send();

}).call(this);
