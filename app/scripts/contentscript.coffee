# Helper function, takes string and injects it as a script to the page context.
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
	( window["reply-input"] or window["note-input"] or {} ).onpaste = null

# Show these tags if AdBlock blocks them.
inject ->
	[ "#trending-full", ".tlayout" ].forEach ( selector ) ->
		el = document.querySelector selector
		console.log el
		if el and el.style.display is "none"
			el.style.setProperty "display", "block", "important"
