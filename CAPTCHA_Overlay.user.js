// ==UserScript==
// @name         Auto Redirect on Modal Header
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Redirect if a specific modal header exists
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Function to check the modal existence
    function checkModalAndRedirect() {
        const modalHeader = document.querySelector('div.modal-header.text-center[style*="background-color: blue"][style*="color: white"][style*="padding: 10px;"]');
        const modalTitle = document.querySelector('#adformModalLabel');

        if (modalHeader && modalTitle && modalTitle.textContent.includes('Click the button below to continue')) {
            window.location.href = 'https://onlyfaucet.com/faucet/currency/usdt';
        }
    }

    // Wait for the DOM to load
    window.addEventListener('load', () => {
        setTimeout(checkModalAndRedirect, 1000); // Delay to ensure content is rendered
    });

    // Also observe DOM changes (in case content is injected dynamically)
    const observer = new MutationObserver(checkModalAndRedirect);
    observer.observe(document.body, { childList: true, subtree: true });
})();
