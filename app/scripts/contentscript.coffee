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

xhr.send()
