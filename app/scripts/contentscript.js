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

  setTimeout(function() {
    return inject(function() {
      return (window["reply-input"] || window["note-input"]).onpaste = null;
    });
  });

  document.getElementById("trending-full").className = "trending block-long unselectable";

}).call(this);
