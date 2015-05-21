# Replace `/js/core.js` script with our own version with deeply integrated
# changes.
window.stop()

document.documentElement.innerHTML = ""

xhr = new XMLHttpRequest
xhr.open "GET", window.location.href, true

xhr.onerror = ->
	document.documentElement.innerHTML = "Error!"

xhr.onload = ->
	page = document.implementation.createHTMLDocument ""
	page.documentElement.innerHTML = this.responseText

	newPage = document.importNode page.documentElement, true

	script = newPage.querySelector "script[src^='/js/core.js']"
	script?.setAttribute "src", chrome.extension.getURL "/scripts/core.js"

	document.replaceChild newPage, document.documentElement
	page = null

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

xhr.send()
