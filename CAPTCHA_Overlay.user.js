// ==UserScript==
// @name         Responsive CAPTCHA Overlay Focus (Dark Overlay)
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  Focus on CAPTCHA with dark overlay, scale it responsively and hide banners
// @author       You
// @copyright    2025, You (https://openuserjs.org/users/You)
// @license      MIT
// @match        *://*/*
// @grant        none
// @homepage     https://example.com/
// @updateURL    https://openuserjs.org/meta/You/Responsive_CAPTCHA_Overlay_Focus.meta.js
// @downloadURL  https://openuserjs.org/install/You/Responsive_CAPTCHA_Overlay_Focus.user.js
// @supportURL   https://openuserjs.org/scripts/You/Responsive_CAPTCHA_Overlay_Focus/issues
// @setupURL     https://openuserjs.org/install/You/Responsive_CAPTCHA_Overlay_Focus.user.js
// ==/UserScript==

(function () {
    'use strict';

    window.addEventListener('load', function () {
        const center = document.querySelector('center');

        if (center) {
            // Tạo lớp phủ màu đen nhạt
            const overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100vw';
            overlay.style.height = '100vh';
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'; // Màu đen nhạt (opacity 0.7)
            overlay.style.display = 'flex';
            overlay.style.alignItems = 'center';
            overlay.style.justifyContent = 'center';
            overlay.style.zIndex = '9998'; // dưới CAPTCHA

            document.body.appendChild(overlay);

            // Đưa CAPTCHA vào giữa và làm nổi bật
            center.style.zIndex = '9999';
            center.style.position = 'fixed';
            center.style.top = '50%';
            center.style.left = '50%';
            center.style.transform = 'translate(-50%, -50%)';
            center.style.background = '#fff';
            center.style.padding = '20px';
            center.style.borderRadius = '10px';
            center.style.boxShadow = '0 0 30px rgba(255,255,255,0.2)';
            center.style.display = 'flex';
            center.style.flexDirection = 'column';
            center.style.alignItems = 'center';

            const captchaBox = center.querySelector('div[data-ref]');
            if (captchaBox) {
                captchaBox.style.transform = 'scale(2.0)';
                captchaBox.style.transformOrigin = 'top center';
            }

            const canvas = center.querySelector('canvas');
            if (canvas) {
                canvas.style.width = '100%';
                canvas.style.maxWidth = '540px';
                canvas.style.height = 'auto';
            }
        }

        // Ẩn banner nếu có
        const bannerContainer = document.getElementById('banner-container');
        if (bannerContainer) {
            bannerContainer.style.display = 'none';
        }
    });
})();
