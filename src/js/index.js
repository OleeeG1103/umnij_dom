import jQuery from "jquery";

jQuery(function () {
  // твой код
});

// svg sprites
function requireAll(r) {
  r.keys().forEach(r);
}

requireAll(require.context("../img/", true, /\.svg$/));
