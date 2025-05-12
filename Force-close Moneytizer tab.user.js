// ==UserScript==
// @name         Force-close Moneytizer tab
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Close Moneytizer tab even if not popup
// @match        *://us.themoneytizer.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    console.log("Forcing close in 3s...");
    setTimeout(() => {
        window.open('', '_self', ''); // Trick: "demote" current tab to closeable
        window.close(); // Now this should work
    }, 3000);
})();
