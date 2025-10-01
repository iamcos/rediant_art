// Design Switcher for Rediant Website
// 10 Alternative Design Versions

const designVersions = {
    'original': {
        name: 'Original Gold',
        description: 'Classic Rediant with gold accents',
        primary: '#D4AF37',
        secondary: '#2C2C2C',
        accent: '#F5F5F5',
        background: '#FFFFFF',
        text: '#333333'
    },
    'midnight': {
        name: 'Midnight Elegance',
        description: 'Dark theme with silver accents',
        primary: '#C0C0C0',
        secondary: '#1A1A1A',
        accent: '#2A2A2A',
        background: '#0F0F0F',
        text: '#FFFFFF'
    },
    'rose': {
        name: 'Rose Gold',
        description: 'Warm rose gold with soft tones',
        primary: '#E8B4B8',
        secondary: '#8B4B5C',
        accent: '#F7E7E8',
        background: '#FEFEFE',
        text: '#4A4A4A'
    },
    'ocean': {
        name: 'Ocean Depths',
        description: 'Deep blue with teal highlights',
        primary: '#4A90E2',
        secondary: '#1E3A8A',
        accent: '#E0F2FE',
        background: '#FFFFFF',
        text: '#1E293B'
    },
    'forest': {
        name: 'Forest Mystique',
        description: 'Rich greens with earth tones',
        primary: '#10B981',
        secondary: '#064E3B',
        accent: '#ECFDF5',
        background: '#FFFFFF',
        text: '#1F2937'
    },
    'sunset': {
        name: 'Sunset Glow',
        description: 'Warm oranges and purples',
        primary: '#F59E0B',
        secondary: '#7C2D12',
        accent: '#FEF3C7',
        background: '#FFFFFF',
        text: '#374151'
    },
    'lavender': {
        name: 'Lavender Dreams',
        description: 'Soft purple with silver',
        primary: '#A78BFA',
        secondary: '#5B21B6',
        accent: '#F3F4F6',
        background: '#FFFFFF',
        text: '#4B5563'
    },
    'crimson': {
        name: 'Crimson Passion',
        description: 'Deep red with gold accents',
        primary: '#DC2626',
        secondary: '#7F1D1D',
        accent: '#FEF2F2',
        background: '#FFFFFF',
        text: '#1F2937'
    },
    'minimal': {
        name: 'Minimal Monochrome',
        description: 'Pure black and white',
        primary: '#000000',
        secondary: '#6B7280',
        accent: '#F9FAFB',
        background: '#FFFFFF',
        text: '#111827'
    },
    'cosmic': {
        name: 'Cosmic Purple',
        description: 'Deep purple with cosmic vibes',
        primary: '#8B5CF6',
        secondary: '#4C1D95',
        accent: '#1F2937',
        background: '#0F0F23',
        text: '#E5E7EB'
    }
};

let currentDesign = 'original';

function applyDesign(designKey) {
    const design = designVersions[designKey];
    if (!design) return;
    
    const root = document.documentElement;
    
    // Apply CSS custom properties
    root.style.setProperty('--primary-gold', design.primary);
    root.style.setProperty('--charcoal', design.secondary);
    root.style.setProperty('--warm-neutral', design.accent);
    root.style.setProperty('--background-color', design.background);
    root.style.setProperty('--text-color', design.text);
    
    // Update body background
    document.body.style.backgroundColor = design.background;
    document.body.style.color = design.text;
    
    // Update current design
    currentDesign = designKey;
    
    // Update switcher UI
    updateSwitcherUI();
    
    // Save preference
    localStorage.setItem('rediant-design', designKey);
}

function createDesignSwitcher() {
    // Create switcher container
    const switcher = document.createElement('div');
    switcher.id = 'design-switcher';
    switcher.innerHTML = `
        <div class="switcher-header">
            <h4>Design Themes</h4>
            <button class="switcher-toggle" onclick="toggleSwitcher()">🎨</button>
        </div>
        <div class="switcher-content" id="switcher-content">
            <div class="current-design">
                <span class="design-name">${designVersions[currentDesign].name}</span>
                <span class="design-desc">${designVersions[currentDesign].description}</span>
            </div>
            <div class="design-grid">
                ${Object.entries(designVersions).map(([key, design]) => `
                    <div class="design-option ${key === currentDesign ? 'active' : ''}" 
                         onclick="applyDesign('${key}')" 
                         data-design="${key}">
                        <div class="design-preview" style="background: linear-gradient(135deg, ${design.primary}, ${design.secondary})"></div>
                        <div class="design-info">
                            <span class="design-name">${design.name}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    document.body.appendChild(switcher);
}

function updateSwitcherUI() {
    const currentDesignEl = document.querySelector('.current-design .design-name');
    const currentDescEl = document.querySelector('.current-design .design-desc');
    const designOptions = document.querySelectorAll('.design-option');
    
    if (currentDesignEl) currentDesignEl.textContent = designVersions[currentDesign].name;
    if (currentDescEl) currentDescEl.textContent = designVersions[currentDesign].description;
    
    designOptions.forEach(option => {
        option.classList.toggle('active', option.dataset.design === currentDesign);
    });
}

function toggleSwitcher() {
    const content = document.getElementById('switcher-content');
    const toggle = document.querySelector('.switcher-toggle');
    
    if (content.style.display === 'none' || content.style.display === '') {
        content.style.display = 'block';
        toggle.textContent = '✕';
    } else {
        content.style.display = 'none';
        toggle.textContent = '🎨';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Load saved design preference
    const savedDesign = localStorage.getItem('rediant-design') || 'original';
    applyDesign(savedDesign);
    
    // Create switcher
    createDesignSwitcher();
    
    // Hide content initially
    document.getElementById('switcher-content').style.display = 'none';
});

// Make functions globally available
window.applyDesign = applyDesign;
window.toggleSwitcher = toggleSwitcher;
