// Language Switcher for Rediant Website
// Toggles between EN/RU and remembers choice

let currentLanguage = 'en';

function initLanguageSwitcher() {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('rediant-language') || 'en';
    currentLanguage = savedLanguage;
    
    // Update all language switchers on the page
    updateLanguageSwitchers();
}

function toggleLanguage() {
    // Toggle between EN and RU
    currentLanguage = currentLanguage === 'en' ? 'ru' : 'en';
    
    // Save preference
    localStorage.setItem('rediant-language', currentLanguage);
    
    // Update switchers
    updateLanguageSwitchers();
    
    // Redirect to appropriate language version
    redirectToLanguage();
}

function updateLanguageSwitchers() {
    const switchers = document.querySelectorAll('.language-switcher .lang-btn');
    
    switchers.forEach(btn => {
        if (btn.textContent.trim() === currentLanguage.toUpperCase()) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function redirectToLanguage() {
    const currentPath = window.location.pathname;
    const currentFile = currentPath.split('/').pop() || 'index.html';
    
    if (currentLanguage === 'ru') {
        // Redirect to Russian version
        if (!currentPath.includes('/ru/')) {
            window.location.href = `ru/${currentFile}`;
        }
    } else {
        // Redirect to English version
        if (currentPath.includes('/ru/')) {
            window.location.href = `../${currentFile}`;
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initLanguageSwitcher();
});

// Make functions globally available
window.toggleLanguage = toggleLanguage;
