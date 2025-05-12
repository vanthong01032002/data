// ==UserScript==
// @name         Smart Redirect on Suspicious Pages
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Redirects to Google Drive if invalid visit, specific logos, texts or links are detected.
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const redirectURL = "https://drive.google.com/drive/folders/1u2kltassidbwCyvtiWWWkflN4PUSxb6P?usp=sharing";

    const suspiciousTexts = [
        "It has been detected that you have an invalid",
        "Maqal"
    ];

    const suspiciousImageSubstrings = [
        "logo (1).png"
    ];

    const suspiciousLinkHrefs = [
        "category.php?id=3", // CryptoCurrency Trading
        "category.php?id=2"  // Crypto Wallet And Platforms
    ];

    function checkAndRedirect() {
        // Kiểm tra <h1> chứa từ khóa nghi ngờ
        const h1List = document.querySelectorAll('h1');
        for (let h1 of h1List) {
            const text = h1.textContent.replace(/\u00A0/g, ' ').trim();
            if (suspiciousTexts.some(keyword => text.includes(keyword))) {
                console.log("🔁 Redirect: phát hiện thông báo trong <h1>");
                window.location.href = redirectURL;
                return;
            }
        }

        // Kiểm tra hình ảnh logo đáng ngờ
        const imgList = document.querySelectorAll('img');
        for (let img of imgList) {
            if (suspiciousImageSubstrings.some(sub => img.src.includes(sub))) {
                console.log("🔁 Redirect: phát hiện logo nghi ngờ");
                window.location.href = redirectURL;
                return;
            }
        }

        // Kiểm tra chữ thường trong trang
        const bodyText = document.body.innerText;
        if (suspiciousTexts.some(text => bodyText.includes(text))) {
            console.log("🔁 Redirect: phát hiện từ khóa trong nội dung");
            window.location.href = redirectURL;
            return;
        }

        // Kiểm tra các liên kết đáng ngờ
        const linkList = document.querySelectorAll('a');
        for (let link of linkList) {
            if (suspiciousLinkHrefs.some(href => link.href.includes(href))) {
                console.log("🔁 Redirect: phát hiện link nghi ngờ");
                window.location.href = redirectURL;
                return;
            }
        }
    }

    // Kiểm tra ngay khi load
    checkAndRedirect();

    // Theo dõi thay đổi DOM vì nội dung có thể load sau
    const observer = new MutationObserver(() => checkAndRedirect());
    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });
})();
