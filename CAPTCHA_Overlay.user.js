// ==UserScript==
// @name         Auto Click "Solve with AI" Button
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Tự động click nút "🤖 Solve with AI" nếu nó tồn tại
// @author       Bạn
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  function clickSolveButton() {
    const button = document.querySelector('.ai-captcha-solve-btn');
    if (button) {
      console.log('Found Solve button, clicking...');
      button.click();
    } else {
      // Uncomment if you want logs when not found
      // console.log('Solve button not found.');
    }
  }

  // Check once every 500ms
  const interval = setInterval(clickSolveButton, 500);
})();
