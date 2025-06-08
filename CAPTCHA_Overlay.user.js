// ==UserScript==
// @name         Auto Click Verify Button
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Tự động click nút Verify nếu có Antibot và Upside solved
// @match        https://viefaucet.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function checkAndClick() {
        const elements = Array.from(document.querySelectorAll('.captcha-solver-info'));
        const texts = elements.map(el => el.textContent.trim());

        const hasAntibot = texts.some(text => text.includes("Antibot solved!"));
        const hasUpside = texts.some(text => text.includes("Upside solved!"));

        if (hasAntibot && hasUpside) {
            const verifyBtn = document.querySelector('button.el-button.el-button--primary.el-tooltip__trigger[aria-disabled="false"]');
            if (verifyBtn) {
                console.log('Tự động click nút Verify');
                verifyBtn.click();
            } else {
                console.log('Không tìm thấy nút Verify hoặc nút đang bị disabled');
            }
        } else {
            console.log('Chưa đủ điều kiện Antibot & Upside');
        }
    }

    // Kiểm tra mỗi 1s
    setInterval(checkAndClick, 1000);
})();
