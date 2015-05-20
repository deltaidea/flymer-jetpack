# Helper function, takes string and injects it as a script to the page context.
inject = ( content ) ->
	script = document.createElement "script"
	script.type = "text/javascript"
	script.textContent = content
	document.head.appendChild script

# Disable removing content on "/bin" page.
document.getElementById( "content" ).setAttribute "id", "nope-nope-nope"

# Allow Ctrl + V.
setTimeout ->
	inject "(window['reply-input'] || window['note-input']).onpaste = null"

# Show tag list if AdBlock blocks it.
document.getElementById( "trending-full" ).className =
	"trending block-long unselectable"
