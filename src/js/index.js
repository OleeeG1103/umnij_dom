import jQuery from "jquery";

jQuery(function () {
  // твой код
});

document.addEventListener("DOMContentLoaded", () => {
  const openPanelBtn = document.getElementById("open-panel");
  const btns = document.querySelectorAll(".btn");

  openPanelBtn && openPanelBtn.addEventListener("click", () => {
    document.getElementById("nav-panel").classList.remove("hidden");
    openPanelBtn.remove();
  });

  btns.forEach(btn => {
    btn.addEventListener("touchstart", event => btn.classList.add("btn--pressed"));
    btn.addEventListener("touchend touchcancel", event => btn.classList.remove("btn--pressed"));
  })
});

// svg sprites
function requireAll(r) {
  r.keys().forEach(r);
}

requireAll(require.context("../img/", true, /\.svg$/));
