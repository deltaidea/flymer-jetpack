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

# This is the textarea on this page if there is one.
textarea = window["reply-input"] or window["note-input"]

# Allow Ctrl + V.
inject ->
	setTimeout ->
		# This will be injected into another scope, so can't use
		# the `textarea` variable.
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
for link in document.querySelectorAll ".linkB"
	link.href = link.href.replace "#new", "&full=1#new"

# Auto-save drafts.
conversationId = document.location.href.match( /c=(\d*)/ )?[ 1 ] ? "new-note"

document.addEventListener "keyup", ( e ) ->
	if e.target.id in [ "reply-input", "note-input" ]
		localStorage[ conversationId ] = e.target.value

# Use a saved draft if there is one.
textarea?.value = localStorage[ conversationId ] ? ""
