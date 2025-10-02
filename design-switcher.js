// Design Switcher for Rediant Art Website
// Allows users to switch between 5 different design styles

class DesignSwitcher {
    constructor() {
        this.currentStyle = localStorage.getItem('rediant-design-style') || 'classic';
        this.styles = {
            classic: {
                name: 'Classic Gold',
                description: 'Original elegant design with gold accents',
                cssFile: 'styles.css'
            },
            minimalist: {
                name: 'Minimalist Elegance',
                description: 'Clean, uncluttered layout with ample white space',
                cssFile: 'styles-minimalist.css'
            },
            modern: {
                name: 'Modern Chic',
                description: 'Contemporary design with bold fonts and dynamic layouts',
                cssFile: 'styles-modern.css'
            },
            vintage: {
                name: 'Vintage Glamour',
                description: 'Classic elements with ornate borders and warm colors',
                cssFile: 'styles-vintage.css'
            },
            artistic: {
                name: 'Artistic Flair',
                description: 'Creative layout with unique typography and vibrant colors',
                cssFile: 'styles-artistic.css'
            },
            luxury: {
                name: 'Luxurious Boutique',
                description: 'Opulent design with rich colors and elegant fonts',
                cssFile: 'styles-luxury.css'
            }
        };
        
        this.init();
    }
    
    init() {
        this.createStyleSwitcher();
        this.loadStyle(this.currentStyle);
        this.bindEvents();
    }
    
    createStyleSwitcher() {
        // Create the style switcher menu
        const switcherHTML = `
            <div class="design-switcher">
                <div class="switcher-toggle">
                    <span class="switcher-icon">🎨</span>
                    <span class="switcher-text">Design</span>
                </div>
                <div class="switcher-menu">
        <div class="switcher-header">
                        <h3>Choose Your Style</h3>
                        <button class="switcher-close">×</button>
        </div>
                    <div class="switcher-options">
                        ${Object.entries(this.styles).map(([key, style]) => `
                            <div class="switcher-option ${key === this.currentStyle ? 'active' : ''}" data-style="${key}">
                                <div class="option-preview" style="background: ${this.getPreviewColor(key)}"></div>
                                <div class="option-info">
                                    <h4>${style.name}</h4>
                                    <p>${style.description}</p>
            </div>
                                <div class="option-check">✓</div>
                        </div>
                        `).join('')}
                    </div>
                </div>
        </div>
    `;
        
        // Insert the switcher into the page
        document.body.insertAdjacentHTML('beforeend', switcherHTML);
        
        // Add CSS for the switcher
        this.addSwitcherCSS();
    }
    
    addSwitcherCSS() {
        const css = `
            .design-switcher {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                font-family: var(--font-body, 'Inter', sans-serif);
            }
            
            .switcher-toggle {
                background: var(--primary-gold, #D4AF37);
                color: white;
                padding: 12px 16px;
                border-radius: 8px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                transition: all 0.3s ease;
                font-weight: 600;
            }
            
            .switcher-toggle:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
            }
            
            .switcher-icon {
                font-size: 18px;
            }
            
            .switcher-menu {
                position: absolute;
                top: 100%;
                right: 0;
                width: 350px;
                background: white;
                border-radius: 12px;
                box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
                margin-top: 8px;
                opacity: 0;
                visibility: hidden;
                transform: translateY(-10px);
                transition: all 0.3s ease;
                border: 1px solid rgba(0, 0, 0, 0.1);
            }
            
            .switcher-menu.active {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }
            
            .switcher-header {
                padding: 20px;
                border-bottom: 1px solid #eee;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .switcher-header h3 {
                margin: 0;
                color: var(--charcoal, #2C2C2C);
                font-size: 18px;
                font-weight: 600;
            }
            
            .switcher-close {
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #999;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.2s ease;
            }
            
            .switcher-close:hover {
                background: #f5f5f5;
                color: #666;
            }
            
            .switcher-options {
                padding: 10px;
                max-height: 400px;
                overflow-y: auto;
            }
            
            .switcher-option {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 12px;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.2s ease;
                position: relative;
            }
            
            .switcher-option:hover {
                background: #f8f9fa;
            }
            
            .switcher-option.active {
                background: rgba(212, 175, 55, 0.1);
                border: 2px solid var(--primary-gold, #D4AF37);
            }
            
            .option-preview {
                width: 40px;
                height: 40px;
                border-radius: 6px;
                border: 2px solid #ddd;
                flex-shrink: 0;
            }
            
            .option-info {
                flex: 1;
            }
            
            .option-info h4 {
                margin: 0 0 4px 0;
                font-size: 14px;
                font-weight: 600;
                color: var(--charcoal, #2C2C2C);
            }
            
            .option-info p {
                margin: 0;
                font-size: 12px;
                color: #666;
                line-height: 1.4;
            }
            
            .option-check {
                color: var(--primary-gold, #D4AF37);
                font-weight: bold;
                opacity: 0;
                transition: opacity 0.2s ease;
            }
            
            .switcher-option.active .option-check {
                opacity: 1;
            }
            
            @media (max-width: 768px) {
                .design-switcher {
                    top: 10px;
                    right: 10px;
                }
                
                .switcher-menu {
                    width: 300px;
                    right: -50px;
                }
                
                .switcher-toggle {
                    padding: 10px 12px;
                }
                
                .switcher-text {
                    display: none;
                }
            }
        `;
        
        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
    }
    
    getPreviewColor(styleKey) {
        const colors = {
            classic: 'linear-gradient(45deg, #D4AF37, #C0C0C0)',
            minimalist: 'linear-gradient(45deg, #ffffff, #f8f9fa)',
            modern: 'linear-gradient(45deg, #2C2C2C, #4A90E2)',
            vintage: 'linear-gradient(45deg, #8B4513, #D2691E)',
            artistic: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
            luxury: 'linear-gradient(45deg, #8B0000, #D4AF37)'
        };
        return colors[styleKey] || colors.classic;
    }
    
    bindEvents() {
        const toggle = document.querySelector('.switcher-toggle');
        const menu = document.querySelector('.switcher-menu');
        const close = document.querySelector('.switcher-close');
        const options = document.querySelectorAll('.switcher-option');
        
        // Toggle menu
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            menu.classList.toggle('active');
        });
        
        // Close menu
        close.addEventListener('click', () => {
            menu.classList.remove('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.design-switcher')) {
                menu.classList.remove('active');
            }
        });
        
        // Handle style selection
        options.forEach(option => {
            option.addEventListener('click', () => {
                const styleKey = option.dataset.style;
                this.switchStyle(styleKey);
                menu.classList.remove('active');
            });
        });
        
        // Handle keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && menu.classList.contains('active')) {
                menu.classList.remove('active');
            }
        });
    }
    
    switchStyle(styleKey) {
        if (this.styles[styleKey]) {
            this.currentStyle = styleKey;
            this.loadStyle(styleKey);
            this.updateActiveOption(styleKey);
            localStorage.setItem('rediant-design-style', styleKey);
            
            // Show notification
            this.showNotification(`Switched to ${this.styles[styleKey].name}`);
        }
    }
    
    loadStyle(styleKey) {
        const style = this.styles[styleKey];
        if (!style) return;
        
        // Remove existing style links
        const existingLinks = document.querySelectorAll('link[data-design-style]');
        existingLinks.forEach(link => link.remove());
        
        // Add new style link
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = style.cssFile;
        link.setAttribute('data-design-style', styleKey);
        document.head.appendChild(link);
        
        // Add body class for style-specific styling
        document.body.className = document.body.className.replace(/design-\w+/g, '');
        document.body.classList.add(`design-${styleKey}`);
    }
    
    updateActiveOption(styleKey) {
        const options = document.querySelectorAll('.switcher-option');
        options.forEach(option => {
            option.classList.remove('active');
            if (option.dataset.style === styleKey) {
                option.classList.add('active');
            }
        });
    }
    
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'style-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: var(--primary-gold, #D4AF37);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-weight: 600;
            z-index: 10001;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize the design switcher when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DesignSwitcher();
});