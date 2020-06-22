import jQuery from "jquery";

jQuery(function () {
  // твой код
});

document.addEventListener("DOMContentLoaded", () => {
  const openPanelBtn = document.getElementById("open-panel");

  openPanelBtn.addEventListener("click", () => {
    document.getElementById("nav-panel").classList.remove("hidden");
    openPanelBtn.remove();
  });
});

// svg sprites
function requireAll(r) {
  r.keys().forEach(r);
}

requireAll(require.context("../img/", true, /\.svg$/));
