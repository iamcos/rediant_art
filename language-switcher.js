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
    console.log('Language toggle clicked, current:', currentLanguage);
    
    // Toggle between EN and RU
    currentLanguage = currentLanguage === 'en' ? 'ru' : 'en';
    
    console.log('New language:', currentLanguage);
    
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
        const btnText = btn.textContent.trim();
        const isCurrentLang = (currentLanguage === 'en' && btnText.includes('EN')) || 
                             (currentLanguage === 'ru' && btnText.includes('RU'));
        
        if (isCurrentLang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function redirectToLanguage() {
    const currentPath = window.location.pathname;
    const currentFile = currentPath.split('/').pop() || 'index.html';
    
    console.log('Redirecting - currentPath:', currentPath, 'currentFile:', currentFile, 'targetLang:', currentLanguage);
    
    if (currentLanguage === 'ru') {
        // Redirect to Russian version
        if (!currentPath.includes('/ru/')) {
            const newUrl = `ru/${currentFile}`;
            console.log('Redirecting to:', newUrl);
            window.location.href = newUrl;
        }
    } else {
        // Redirect to English version
        if (currentPath.includes('/ru/')) {
            const newUrl = `../${currentFile}`;
            console.log('Redirecting to:', newUrl);
            window.location.href = newUrl;
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initLanguageSwitcher();
});

// Make functions globally available
window.toggleLanguage = toggleLanguage;
