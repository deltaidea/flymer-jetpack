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
    return (window["reply-input"] || window["note-input"] || {}).onpaste = null;
  });

  inject(function() {
    return ["#trending-full", ".tlayout"].forEach(function(selector) {
      var el;
      el = document.querySelector(selector);
      console.log(el);
      if (el && el.style.display === "none") {
        return el.style.setProperty("display", "block", "important");
      }
    });
  });

}).call(this);
