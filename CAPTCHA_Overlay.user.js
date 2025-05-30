// ==UserScript==
// @name         Reload on Block Page
// @namespace    Violentmonkey Scripts
// @version      1.0
// @description  Reload page if "Sorry, you have been blocked" message appears
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  function checkBlockedMessage() {
    const blockedElement = document.querySelector('h1[data-translate="block_headline"]');
    if (blockedElement && blockedElement.textContent.includes("Sorry, you have been blocked")) {
      console.log("Blocked message detected. Reloading page...");
      location.reload();
    }
  }

  // Run once after page load
  window.addEventListener('load', () => {
    checkBlockedMessage();

    // Also observe DOM changes in case the element appears after load
    const observer = new MutationObserver(checkBlockedMessage);
    observer.observe(document.body, { childList: true, subtree: true });
  });
})();
