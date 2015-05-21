# Helper function, takes code and injects it to the page context.
inject = ( content ) ->
	if typeof content is "function"
		content = "(" + content + ")()"
	script = document.createElement "script"
	script.type = "text/javascript"
	script.textContent = content
	document.head.appendChild script

# Disable removing content on "/bin" page.
document.getElementById( "content" ).setAttribute "id", "nope-nope-nope"

# Allow Ctrl + V.
inject ->
	setTimeout ->
		( window["reply-input"] or window["note-input"] )?.onpaste = null
	, 100

# Show these tags if AdBlock blocks them.
inject ->
	setTimeout ->
		[ "#trending-full", ".tlayout" ].forEach ( selector ) ->
			el = document.querySelector selector
			if el?.style?.display is "none"
				el.style.setProperty "display", "block", "important"
	, 100

# Show full message history by default.
for conversationLink in document.querySelectorAll ".linkB"
	conversationLink.href += "&full=1"
