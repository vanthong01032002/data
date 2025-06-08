// ==UserScript==
// @name         Auto Click Verify Button (with delay)
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Tự động click nút Verify nếu có Antibot và Upside solved, chờ 3s trước khi nhấn
// @match        https://viefaucet.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let clicked = false; // Để tránh click nhiều lần

    function checkAndClick() {
        if (clicked) return; // Nếu đã click rồi thì thôi

        const elements = Array.from(document.querySelectorAll('.captcha-solver-info'));
        const texts = elements.map(el => el.textContent.trim());

        const hasAntibot = texts.some(text => text.includes("Antibot solved!"));
        const hasUpside = texts.some(text => text.includes("Upside solved!"));

        if (hasAntibot && hasUpside) {
            const verifyBtn = document.querySelector('button.el-button.el-button--primary.el-tooltip__trigger[aria-disabled="false"]');
            if (verifyBtn) {
                console.log('Đã đủ điều kiện, sẽ chờ 3s rồi click nút Verify');
                clicked = true; // đánh dấu đã bắt đầu đợi để click

                setTimeout(() => {
                    console.log('Tự động click nút Verify sau 3s');
                    verifyBtn.click();
                }, 3000);
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
