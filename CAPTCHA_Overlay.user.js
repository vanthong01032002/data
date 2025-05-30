// ==UserScript==
// @name         Remove Overlay and Block Click Redirect - OnlyFaucet
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Xóa lớp phủ và ngăn sự kiện click gây chuyển tab trên onlyfaucet.com
// @author       Bạn
// @match        https://onlyfaucet.com/faucet/currency/usdt
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Hàm xóa lớp phủ và ngăn click
    function removeOverlayAndBlockClick() {
        const el = document.getElementById('pop-body-12321');
        if (el) el.remove();

        document.onclick = function(e) {
            e.stopPropagation();
            e.preventDefault();
        };

        document.body.onclick = function(e) {
            e.stopPropagation();
            e.preventDefault();
        };
    }

    // Chạy ngay lập tức
    removeOverlayAndBlockClick();

    // Chạy lặp để chặn nếu nó bị tạo lại sau đó
    setInterval(removeOverlayAndBlockClick, 500);
})();
