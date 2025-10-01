// Simple Language Switcher - Just part of the menu
document.addEventListener('DOMContentLoaded', function() {
    // Simple language toggle function
    function toggleLanguage() {
        const currentPath = window.location.pathname;
        const currentFile = currentPath.split('/').pop() || 'index.html';
        
        if (currentPath.includes('/ru/')) {
            // Currently on Russian page, go to English
            window.location.href = `../${currentFile}`;
        } else {
            // Currently on English page, go to Russian
            window.location.href = `ru/${currentFile}`;
        }
    }
    
    // Add click event to language switcher
    const langBtn = document.querySelector('.lang-btn');
    if (langBtn) {
        langBtn.addEventListener('click', toggleLanguage);
    }
});
