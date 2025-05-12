// ==UserScript==
// @name         Adlink and Google Drive Cookie Cleaner with Fingerprint Spoofing
// @match        https://drive.google.com/drive/folders/*
// @match        https://drive.google.com/drive/*
// @match        https://adlink.click/*
// @match        https://drive.google.com/*
//
// @grant        GM_openInTab
// ==/UserScript==

(function () {
    'use strict';

    // Danh sách 5 URL để chọn ngẫu nhiên
    const redirectUrls = [
        'https://link.adlink.click/tool5',
        'https://link.adlink.click/tool4',
        'https://link.adlink.click/tool3',
        'https://link.adlink.click/tool2',
        'https://link.adlink.click/tool1'
    ];

    // Danh sách User-Agent giả mạo
    const userAgents = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
        'Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/116.0',
        'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'
    ];

    // Danh sách ngôn ngữ giả mạo
    const languages = ['en-US', 'fr-FR', 'de-DE', 'ja-JP', 'es-ES'];

    // Danh sách múi giờ giả mạo
    const timezones = ['America/New_York', 'Europe/London', 'Asia/Tokyo', 'Australia/Sydney', 'America/Los_Angeles'];

    function logAndToast(msg, type = "info", persistent = false) {
        const now = new Date();
        const time = now.toLocaleTimeString('vi-VN');
        const date = now.toLocaleDateString('vi-VN');
        const fullMsg = `[${time} ${date}] ${msg}`;
        console.log("[AdlinkGoogleDriveCleaner]", fullMsg);

        const toast = document.createElement('div');
        toast.className = 'claim-status-gdrive';
        toast.setAttribute('data-gdrive-toast', type);
        toast.textContent = msg;

        Object.assign(toast.style, {
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: type === "error" ? '#e74c3c' : type === "success" ? '#27ae60' : '#333',
            color: '#fff',
            padding: '16px 24px',
            borderRadius: '12px',
            zIndex: '99999',
            fontSize: '18px',
            fontWeight: 'bold',
            opacity: '0',
            maxWidth: '90%',
            textAlign: 'center',
            boxShadow: '0 0 12px rgba(0,0,0,0.4)',
            transition: 'opacity 0.4s ease'
        });

        document.body.appendChild(toast);
        requestAnimationFrame(() => (toast.style.opacity = '1'));

        if (!persistent) {
            setTimeout(() => {
                toast.style.opacity = '0';
                setTimeout(() => toast.remove(), 600);
            }, 10000);
        }
    }

    // Hàm chọn ngẫu nhiên từ mảng
    function getRandomItem(array) {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }

    // Hàm giả mạo thông số trình duyệt
    function spoofBrowserProfile() {
        try {
            // Giả mạo User-Agent
            const newUserAgent = getRandomItem(userAgents);
            Object.defineProperty(navigator, 'userAgent', {
                value: newUserAgent,
                writable: false
            });
            logAndToast(`🕵️ Giả mạo User-Agent: ${newUserAgent}`, "info");
            console.log("User-Agent mới:", newUserAgent);

            // Giả mạo ngôn ngữ
            const newLanguage = getRandomItem(languages);
            Object.defineProperty(navigator, 'language', {
                value: newLanguage,
                writable: false
            });
            logAndToast(`🕵️ Giả mạo ngôn ngữ: ${newLanguage}`, "info");
            console.log("Ngôn ngữ mới:", newLanguage);

            // Giả mạo múi giờ
            const newTimezone = getRandomItem(timezones);
            const originalDateTimeFormat = Intl.DateTimeFormat;
            Intl.DateTimeFormat = function (...args) {
                return new originalDateTimeFormat(args[0], { ...args[1], timeZone: newTimezone });
            };
            logAndToast(`🕵️ Giả mạo múi giờ: ${newTimezone}`, "info");
            console.log("Múi giờ mới:", newTimezone);

            // Thêm nhiễu vào Canvas để làm lệch fingerprint
            const originalGetContext = HTMLCanvasElement.prototype.getContext;
            HTMLCanvasElement.prototype.getContext = function (...args) {
                const context = originalGetContext.apply(this, args);
                if (args[0] === '2d') {
                    const originalFillRect = context.fillRect;
                    context.fillRect = function (x, y, w, h) {
                        const noise = Math.random() * 0.1; // Thêm nhiễu nhỏ
                        originalFillRect.call(this, x + noise, y + noise, w, h);
                    };
                }
                return context;
            };
            logAndToast("🕵️ Thêm nhiễu vào Canvas để làm lệch fingerprint", "info");
            console.log("Đã thêm nhiễu vào Canvas.");

        } catch (err) {
            logAndToast(`❌ Lỗi khi giả mạo thông số trình duyệt: ${err.message}`, "error", true);
            console.error("Lỗi giả mạo thông số:", err);
        }
    }

    // Hàm kiểm tra xem trang có phải là Google Drive hoặc Adlink không
    function isTargetPage() {
        const url = window.location.href.toLowerCase();
        // Kiểm tra Google Drive
        const isDriveUrl = url.includes('drive.google.com/file') ||
                          url.includes('drive.google.com/drive/folders') ||
                          url.includes('drive.google.com/drive/');
        const hasDriveContent = document.body.innerText.includes('Google Drive') ||
                               document.querySelector('img[alt="Google Drive"]') ||
                               document.querySelector('a[href*="drive.google.com"]');
        const isGoogleDrive = isDriveUrl || hasDriveContent;

        // Kiểm tra Adlink
        const isAdlinkUrl = url.includes('adlink.click/');
        const hasAdlinkContent = document.body.innerText.toLowerCase().includes('adlink') ||
                                document.querySelector('a[href*="adlink.click"]');
        const isAdlink = isAdlinkUrl || hasAdlinkContent;

        console.log("Kiểm tra trang - Google Drive (URL:", isDriveUrl, "Nội dung:", hasDriveContent, "), Adlink (URL:", isAdlinkUrl, "Nội dung:", hasAdlinkContent, ")");
        return isGoogleDrive || isAdlink;
    }

    // Hàm xử lý xóa cookies, đóng tab extension, và chuyển hướng ngẫu nhiên
    async function handleTargetPage() {
        if (!isTargetPage()) {
            logAndToast("ℹ️ Không phải trang Google Drive hoặc Adlink, bỏ qua.", "info");
            console.log("Không phải trang Google Drive hoặc Adlink, thoát hàm.");
            return;
        }

        logAndToast("✅ Phát hiện trang Google Drive hoặc Adlink, bắt đầu xử lý...", "success");
        console.log("Trang Google Drive hoặc Adlink được phát hiện, tiến hành giả mạo, xóa cookies và chuyển hướng.");

        // Giả mạo thông số trình duyệt trước khi xử lý
        spoofBrowserProfile();

        try {
            // Thử mở tab Chrome extension để xóa cookies
            logAndToast("🌐 Đang mở tab Chrome extension để xóa cookies...", "info");
            console.log("Thử gọi GM_openInTab cho extension...");
            let extensionTab = GM_openInTab("chrome-extension://mgoonafpjjmdppppgfepaemphaliedkj/delete.html", { active: true, insert: true });

            // Kiểm tra nếu GM_openInTab thất bại
            if (!extensionTab) {
                logAndToast("⚠️ Lần 1: Không mở được tab Chrome extension! Thử lại lần 2...", "warning", true);
                console.log("Lần 1 GM_openInTab thất bại, thử lại...");
                await new Promise(resolve => setTimeout(resolve, 2000)); // Chờ 2 giây trước khi thử lại
                extensionTab = GM_openInTab("chrome-extension://mgoonafpjjmdppppgfepaemphaliedkj/delete.html", { active: true, insert: true });
                if (!extensionTab) {
                    logAndToast("❌ Lần 2: Không mở được tab Chrome extension! Kiểm tra quyền GM_openInTab hoặc bật pop-up.", "error", true);
                    throw new Error("Không thể mở tab extension sau 2 lần thử");
                }
            }

            // Chờ 3 giây để đảm bảo cookies được xóa
            logAndToast("⏳ Đợi 3 giây để xóa cookies...", "info");
            await new Promise(resolve => setTimeout(resolve, 3000));

            // Đóng tab extension
            logAndToast("🗑️ Đang đóng tab Chrome extension...", "info");
            console.log("Đóng tab extension...");
            if (extensionTab && typeof extensionTab.close === 'function') {
                extensionTab.close();
                console.log("Tab extension đã được đóng.");
            } else {
                logAndToast("⚠️ Không thể đóng tab extension tự động, có thể tab không do script mở.", "warning");
                console.log("Không thể đóng tab extension, tab không được quản lý bởi script.");
            }

            // Chuyển hướng đến URL ngẫu nhiên
            const randomUrl = getRandomItem(redirectUrls);
            logAndToast(`🔗 Đang chuyển hướng đến URL ngẫu nhiên: ${randomUrl}`, "success");
            console.log("Thực hiện chuyển hướng đến", randomUrl);
            window.location.href = randomUrl;
        } catch (err) {
            logAndToast(`❌ Lỗi khi mở extension hoặc chuyển hướng: ${err.message}`, "error", true);
            console.error("Lỗi chi tiết:", err);
            // Cơ chế dự phòng: Chuyển hướng đến URL ngẫu nhiên
            const randomUrl = getRandomItem(redirectUrls);
            logAndToast(`🔄 Thử chuyển hướng trực tiếp đến URL ngẫu nhiên: ${randomUrl}`, "warning");
            window.location.href = randomUrl;
        }
    }

    // Chạy hàm xử lý
    handleTargetPage();
})();