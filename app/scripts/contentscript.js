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
    var newPage, page, script;
    page = document.implementation.createHTMLDocument("");
    page.documentElement.innerHTML = this.responseText;
    newPage = document.importNode(page.documentElement, true);
    script = newPage.querySelector("script[src^='/js/core.js']");
    if (script != null) {
      script.setAttribute("src", chrome.extension.getURL("/scripts/core.js"));
    }
    document.replaceChild(newPage, document.documentElement);
    return page = null;
  };

  xhr.send();

}).call(this);
