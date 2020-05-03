/** Add a handler that accepts any keystroke or mouse action to wipe the screen,
removes the intro UI elements,
add the game UI elements,
and initializes the game.
*/

/** Event Handler for Starting a New Game */
window.addEventListener('keydown', function start(event) {
	window.removeEventListener("keydown", start);
	document.getElementById("intro").remove();
	document.getElementById("header").style.display = "";
	document.getElementById("footer").style.display = "";
	Game.init();
	UI.gameplay();
	Footer.draw();
});
