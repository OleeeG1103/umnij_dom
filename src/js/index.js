document.addEventListener("DOMContentLoaded", () => {
  const $topBtnBackContainer = document.getElementById("back-btn-container");
  const $topBtnBack = document.getElementById("back-btn");
  const $tvNav = document.getElementById("demonstration-tv");
  const $channelsMenu = document.querySelector(".channels-menu");
  const enablePanelBtn = document.getElementById("enable-panel");
  const $demonstrationTV = document.getElementById("demonstration-tv");
  const $appleTVMenuItem = document.getElementById("apple-tv");
  const $BKCMenuItem = document.getElementById("bkc");
  const $TVMenuItem = document.getElementById("tv");
  const $appleTVMenuItemBtn = $appleTVMenuItem.querySelector(".btn");
  const $BKCMenuItemBtn = $BKCMenuItem.querySelector(".btn");
  const $TVMenuItemBtn = $TVMenuItem.querySelector(".btn");
  const $appleTVoptions = $appleTVMenuItem.querySelectorAll(".menu-bkc__item");
  const $BKCoptions = $BKCMenuItem.querySelectorAll(".menu-bkc__item");
  const $TVoptions = $TVMenuItem.querySelectorAll(".menu-bkc__item");
  const $openChannelsBtn = document.getElementById("open-channels-btn");
  const btns = document.querySelectorAll(".btn");
  const $tooltips = document.querySelectorAll(".tooltip");

  // prevent hiding on click
  $tooltips.forEach(tooltip => tooltip.addEventListener("click", e => e.stopPropagation()));

  enablePanelBtn && enablePanelBtn.addEventListener("click", () => {
    enablePanelBtn.remove();
    $demonstrationTV.classList.remove("d-none");
  });

  // touch
  btns.forEach(btn => {
    btn.addEventListener("touchstart", event => btn.classList.add("btn--pressed"));
    btn.addEventListener("touchmove", event => btn.classList.contains("btn--pressed") && btn.classList.remove("btn--pressed"));
    btn.addEventListener("touchend", event => btn.classList.contains("btn--pressed") && btn.classList.remove("btn--pressed"));
    btn.addEventListener("touchcancel", event => btn.classList.contains("btn--pressed") && btn.classList.remove("btn--pressed"));
  });

  handleMenuOptionsClick($appleTVoptions);
  handleMenuOptionsClick($BKCoptions);

  toggleMenuTooltip($appleTVMenuItemBtn);
  toggleMenuTooltip($BKCMenuItemBtn);
  toggleMenuTooltip($TVMenuItemBtn);

  $openChannelsBtn.addEventListener("click", () => {
    channelViewSwither($tvNav, $channelsMenu);
    $topBtnBackContainer.classList.add("d-block");
  });

  $topBtnBack.addEventListener("click", () => {
    handleBack($tvNav, $channelsMenu);
    $topBtnBackContainer.classList.remove("d-block");
  })

});

function handleBack(prev, cur) {
  cur.classList.add("d-none");
  prev.classList.remove("d-none");
}

function channelViewSwither(tvNav, channelsMenu) {
  tvNav.classList.add("d-none");
  channelsMenu.classList.remove("d-none");
}

function clearCheckedTVOptionsOnTooltipHide(elems) {
  elems.forEach(active => {
    active.classList.remove("active");
  });
}

function handleMenuOptionsClick(options) {
  options.forEach(option => {
    option.addEventListener("click", () => {
      option.classList.toggle("active");
    });
  });
}

function toggleMenuTooltip(el) {
  el && el.addEventListener("click", () => {
    el.classList.toggle("btn__active");
  });
  window.addEventListener('click', (e) => {
    if (!el.contains(e.target)) {
      el.classList.remove("btn__active");
      const activeOptions = el.closest(".tv-nav__item").querySelectorAll(".active");
      activeOptions && clearCheckedTVOptionsOnTooltipHide(activeOptions);
    }
  });
}

// svg sprites
function requireAll(r) {
  r.keys().forEach(r);
}

requireAll(require.context("../img/", true, /\.svg$/));
