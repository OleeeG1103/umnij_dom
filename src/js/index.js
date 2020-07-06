document.addEventListener("DOMContentLoaded", () => {
  const $recordBtn = document.getElementById("record");
  const $powerOffBtn = document.getElementById("power-off-btn");
  const $switchOffSystemBtn = document.getElementById("switch-off-system-btn");
  const $dontSwitchOffSystemBtn = document.getElementById("not-switch-off-system-btn");
  const $disconnectConferenceConfirmBtn = document.getElementById("disconnect-conference-confirm-btn");
  const $notDisconnectConferenceBtn = document.getElementById("not-disconnect-conference-btn");
  const $showInstructionsBtn = document.getElementById("show-instructions");
  const $topBtnBackContainer = document.getElementById("back-btn-container");
  const $topBtnBack = document.getElementById("back-btn");
  const $tvNav = document.getElementById("demonstration-tv");
  const $channelsMenu = document.querySelector(".channels-menu");
  const $conversationBlock = document.getElementById("conversation");
  const $meetingRoom = document.getElementById("meeting-room");
  const $instructionsScreen = document.getElementById("instructions-screen");
  const $switchOffSystemConfirmationScreen = document.getElementById("switch-off-system");
  const $disconnectConfirmScreen =  document.getElementById("disconnect-confirm-screen");
  const $dealPanel = $meetingRoom.querySelector("#room__deal-number");
  const $speedDeal = $meetingRoom.querySelector("#room__speed-deal");
  const $numberPanel = document.getElementById("number-panel")
  const $enablePanelBtn = document.getElementById("enable-panel");
  const $demonstrationTV = document.getElementById("demonstration-tv");
  const $appleTVMenuItem = document.getElementById("apple-tv");
  const $BKCMenuItem = document.getElementById("bkc");
  const $BKCMenuItemBtn = $BKCMenuItem.querySelector(".btn");
  const $TVMenuItem = document.getElementById("tv");
  const $appleTVMenuItemBtn = $appleTVMenuItem.querySelector(".btn");
  const $TVMenuItemBtn = $TVMenuItem.querySelector(".btn");
  const $appleTVoptions = $appleTVMenuItem.querySelectorAll(".menu-bkc__item");
  const $BKCoptions = $BKCMenuItem.querySelectorAll(".menu-bkc__item");
  // const $TVoptions = $TVMenuItem.querySelectorAll(".menu-bkc__item");
  const $openChannelsBtn = document.getElementById("open-channels-btn");
  const $callBtn = document.getElementById("call-btn");
  const $exitRoomBtn = document.getElementById("exit-room");
  const $disconnectConference = document.getElementById("disconnect-conference");
  const $microphoneControl = document.getElementById("microphone-control");
  const $microphoneControlText = document.getElementById("microphone-control-text");
  const $roomOpenKeyboard = document.getElementById("room__open-keyboard");
  const $btns = document.querySelectorAll(".btn");
  const $tooltips = document.querySelectorAll(".tooltip");

  // prevent hiding on click
  $tooltips.forEach(tooltip => tooltip.addEventListener("click", e => e.stopPropagation()));

  $enablePanelBtn && $enablePanelBtn.addEventListener("click", () => {
    $enablePanelBtn.remove();
    $demonstrationTV.classList.remove("d-none");
  });

  // touch
  $btns.forEach(btn => {
    btn.addEventListener("touchstart", event => btn.classList.add("btn--pressed"));
    btn.addEventListener("touchmove", event => btn.classList.contains("btn--pressed") && btn.classList.remove("btn--pressed"));
    btn.addEventListener("touchend", event => btn.classList.contains("btn--pressed") && btn.classList.remove("btn--pressed"));
    btn.addEventListener("touchcancel", event => btn.classList.contains("btn--pressed") && btn.classList.remove("btn--pressed"));
  });

  handleMenuOptionsClick($appleTVoptions);
  handleMenuOptionsClick($BKCoptions);

  toggleMenuTooltip($appleTVMenuItemBtn);
  // toggleMenuTooltip($BKCMenuItemBtn);
  toggleMenuTooltip($TVMenuItemBtn);

  $openChannelsBtn.addEventListener("click", () => {
    channelViewSwither($tvNav, $channelsMenu);
    $topBtnBackContainer.classList.add("d-block");
  });

  $topBtnBack.addEventListener("click", () => {
    hideAllBlocks();
    $tvNav.classList.remove("d-none");
    $topBtnBackContainer.classList.remove("d-block");
  })

  $BKCMenuItemBtn.addEventListener("click", () => {
    $tvNav.classList.add("d-none");
    $numberPanel.classList.remove("d-none");
    $topBtnBackContainer.classList.add("d-block");
  });

  $callBtn.addEventListener("click", () => {
    hideAllBlocks();
    $topBtnBackContainer.classList.remove("d-block");
    $meetingRoom.classList.remove("d-none");
  });

  $exitRoomBtn.addEventListener("click", () => {
    $meetingRoom.classList.add("d-none");
    $numberPanel.classList.remove("d-none");
    $topBtnBackContainer.classList.add("d-block");
  });

  $roomOpenKeyboard.addEventListener("click", () => {
    $speedDeal.classList.add("d-none");
    $dealPanel.classList.remove("d-md-none");
  });

  // temporary to show 4th screen
  $recordBtn.addEventListener("click", () => {
    const btnIcon = $recordBtn.querySelector("[*|href]:not([href])");
    // make it toggle
    btnIcon.getAttribute("xlink:href") === "./img/sprites/sprite-icons.svg#record_on"
      ? btnIcon.setAttribute("xlink:href", "./img/sprites/sprite-icons.svg#record_off")
      : btnIcon.setAttribute("xlink:href", "./img/sprites/sprite-icons.svg#record_on");
    hideAllBlocks();
    $conversationBlock.classList.remove("d-none");
  });

  $microphoneControl.addEventListener("click", () => {
    const controlIcon = $microphoneControl.querySelector("[*|href]:not([href])");

    if (controlIcon.getAttribute("xlink:href") === "./img/sprites/sprite-icons.svg#microphone") {
      $microphoneControlText.innerText = "Выключен";
      controlIcon.setAttribute("xlink:href", "./img/sprites/sprite-icons.svg#microphone_off");
    } else {
      $microphoneControlText.innerText = "Включен";
      controlIcon.setAttribute("xlink:href", "./img/sprites/sprite-icons.svg#microphone");
    }
  });

  $disconnectConference.addEventListener("click", () => {
    hideAllBlocks();
    $disconnectConfirmScreen.classList.remove("d-none");
  });

  $disconnectConferenceConfirmBtn.addEventListener("click", () => {
    hideAllBlocks();
    $tvNav.classList.remove("d-none");
  });

  $notDisconnectConferenceBtn.addEventListener("click", () => {
    hideAllBlocks();
    $conversationBlock.classList.remove("d-none");
  });

  $powerOffBtn.addEventListener("click", () => {
    hideAllBlocks();
    $switchOffSystemConfirmationScreen.classList.remove("d-none");
  });

  $switchOffSystemBtn.addEventListener("click", () => {
    hideAllBlocks();
    $enablePanelBtn.classList.remove("d-none");
  });

  $dontSwitchOffSystemBtn.addEventListener("click", () => {
    hideAllBlocks();
    $tvNav.classList.remove("d-none");
  });

  $showInstructionsBtn.addEventListener("click", () => {
    hideAllBlocks();
    $instructionsScreen.classList.remove("d-none");
  });

  function hideAllBlocks() {
    const allParentBlocks = document.querySelectorAll("main > *");
    allParentBlocks.forEach(block => !block.classList.contains("d-none") && block.classList.add("d-none"));
  }
});

// use to handle common back-btn in header - to switch between screens (you need routes for that or just use localStorage)
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

// menu tooltips - 2nd screen
function toggleMenuTooltip(el) {
  el && el.addEventListener("click", () => {
    el.classList.toggle("btn__active");
  });
  // hide tooltip on click outside
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
