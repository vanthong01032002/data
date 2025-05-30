// ==UserScript==
// @name         Auto Click Claim on Captcha Success - OnlyFaucet (Enhanced)
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Tự động nhấn nút Claim khi captcha thành công trên onlyfaucet.com, trừ khi cần Shortlink trước đó.
// @author       Bạn
// @match        https://onlyfaucet.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const observer = new MutationObserver(() => {
        const msgDiv = document.querySelector('div[style*="min-height"]');
        const claimBtn = document.getElementById('subbutt');
        const shortlinkWarning = document.querySelector(
            'div.swal2-html-container#swal2-html-container'
        );

        const shortlinkMessageShown = shortlinkWarning &&
            shortlinkWarning.style.display !== 'none' &&
            shortlinkWarning.textContent.includes('You must complete at least 1 Shortlink to continue.');

        if (
            msgDiv &&
            /✓ Correct!/i.test(msgDiv.textContent) &&
            claimBtn &&
            !claimBtn.disabled &&
            !shortlinkMessageShown
        ) {
            console.log('[UserScript] CAPTCHA passed and no shortlink warning — clicking Claim button...');
            claimBtn.click();
        } else if (shortlinkMessageShown) {
            console.log('[UserScript] Shortlink requirement message found — skipping Claim button click.');
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true,
    });
})();
