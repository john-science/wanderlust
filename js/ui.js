/** Handle the various UI elements.
 */
 
 
/** Show the hidden help panel */
document.getElementById("help").addEventListener("click", function(e) {
  display_flag = document.getElementById("commands").style.display;
  if (display_flag === "none") {
    display_flag = "";
  } else {
    display_flag = "none";
  }
  document.getElementById("commands").style.display = display_flag;
});

