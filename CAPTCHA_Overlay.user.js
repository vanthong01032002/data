// ==UserScript==
// @name         Redirect on Shortlink Message
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Redirect to Google if "You must complete at least 1 Shortlink to continue." appears
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function checkAndRedirect() {
        const targetDiv = document.evaluate(
            '//div[text()="You must complete at least 1 Shortlink to continue."]',
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        ).singleNodeValue;

        if (targetDiv) {
            window.location.href = "https://www.google.com";
        }
    }

    // Run check after page load
    window.addEventListener('load', () => {
        // Delay to allow page to fully render dynamic content
        setTimeout(checkAndRedirect, 1500);
    });
})();
