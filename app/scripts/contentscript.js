(function() {
  var injectScript, xhr;

  injectScript = function(filename) {
    var script;
    script = document.createElement("script");
    script.src = chrome.extension.getURL(filename);
    return document.head.appendChild(script);
  };

  window.stop();

  document.documentElement.innerHTML = "";

  xhr = new XMLHttpRequest;

  xhr.open("GET", window.location.href, true);

  xhr.onerror = function() {
    return document.documentElement.innerHTML = "Error!";
  };

  xhr.onload = function() {
    var newPage, page, script;
    page = document.implementation.createHTMLDocument("");
    page.documentElement.innerHTML = this.responseText;
    newPage = document.importNode(page.documentElement, true);
    script = newPage.querySelector("script[src^='/js/core.js']");
    if (script != null) {
      script.src = "";
    }
    document.replaceChild(newPage, document.documentElement);
    page = null;
    injectScript("scripts/conversation.js");
    return injectScript("scripts/core.js");
  };

  xhr.send();

}).call(this);
