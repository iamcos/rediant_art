# Styling Conventions

## Tailwind CSS First (90% of styling)
```astro
<!-- Use Tailwind classes for layout and styling -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
  <div class="bg-white rounded-lg shadow-lg p-4">
    <img src="/images/jewelry.webp" alt="Jewelry piece" class="w-full h-64 object-cover rounded-md">
  </div>
</div>
```

## Custom CSS (10% - animations only)
```css
/* src/styles/global.css - Only for animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.jewelry-reveal {
  animation: fadeIn 0.6s ease-out;
}
```

## Responsive Design
- **Mobile First**: Start with mobile styles, use `sm:`, `md:`, `lg:` breakpoints
- **Grid Layouts**: Use `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- **Typography**: Use `text-sm md:text-base lg:text-lg` for responsive text

## Bilingual Styling
```css
/* Language-specific styles */
[lang="ru"] .en-only { display: none; }
[lang="en"] .ru-only { display: none; }

/* RTL support for Russian if needed */
[lang="ru"] {
  direction: ltr; /* Keep LTR for jewelry gallery */
}
```

## Color System
- **Primary**: `#D4AF37` (gold) - use `text-primary`, `bg-primary`
- **Secondary**: `#2C2C2C` (charcoal) - use `text-secondary`, `bg-secondary`
- **Accent**: `#F5F5F5` (warm neutral) - use `text-accent`, `bg-accent`

## Typography
- **Headings**: `font-playfair` (Playfair Display serif)
- **Body**: `font-inter` (Inter sans-serif)
- **Responsive**: `text-sm md:text-base lg:text-lg`

## Image Styling
```astro
<!-- Jewelry photos with proper styling -->
<img 
  src="/images/jewelry.webp" 
  alt="Diamond facechain from Rediant collection"
  class="w-full h-64 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
  loading="lazy"
/>
```

## Component Styling
```astro
<!-- Product cards with consistent styling -->
<div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
  <div class="aspect-square mb-4">
    <img src={product.image} alt={product.alt} class="w-full h-full object-cover rounded-md">
  </div>
  <h3 class="text-lg font-playfair text-secondary mb-2">{product.title}</h3>
  <p class="text-primary font-semibold">{product.price}</p>
</div>
```

## Layout Patterns
```astro
<!-- Container with consistent spacing -->
<div class="container mx-auto px-4 py-8">
  <!-- Content -->
</div>

<!-- Grid layouts for jewelry galleries -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Grid items -->
</div>

<!-- Flex layouts for navigation -->
<nav class="flex items-center justify-between py-4">
  <!-- Navigation items -->
</nav>
```

## Interactive Elements
```astro
<!-- Hover effects for jewelry pieces -->
<div class="group cursor-pointer">
  <img class="group-hover:scale-105 transition-transform duration-300" />
  <div class="group-hover:opacity-100 opacity-0 transition-opacity duration-300">
    <!-- Overlay content -->
  </div>
</div>
```

## AI Suggestions
- Suggest Tailwind classes for jewelry gallery layouts
- Recommend `loading="lazy"` for images
- Use `object-cover` for jewelry photos
- Implement `hover:scale-105` for interactive elements
- Propose responsive breakpoints for mobile/tablet/desktop
- Suggest color combinations using the brand palette
- Recommend typography hierarchy with Playfair Display and Inter

## Performance Considerations
- Use `loading="lazy"` for images below the fold
- Implement `object-cover` for consistent image aspect ratios
- Use CSS transforms instead of changing layout properties
- Minimize custom CSS, prefer Tailwind utilities
- Use `transition-*` classes for smooth animations
