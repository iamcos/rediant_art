#!/usr/bin/env python3
import os
import re

def remove_navigation_from_file(file_path):
    """Remove navigation section from an Astro file"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Pattern to match the entire navigation section
    nav_pattern = r'  <!-- Navigation -->.*?</nav>\s*\n'
    
    # Remove the navigation section
    new_content = re.sub(nav_pattern, '', content, flags=re.DOTALL)
    
    # Write back to file
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"Removed navigation from {file_path}")

def main():
    # List of pages to fix
    pages = [
        'src/pages/index.astro',
        'src/pages/about.astro', 
        'src/pages/collections.astro',
        'src/pages/contact.astro',
        'src/pages/crowdfunding.astro',
        'src/pages/3d-printing.astro',
        'src/pages/journal.astro',
        'src/pages/order.astro',
        'src/pages/subscription.astro'
    ]
    
    for page in pages:
        if os.path.exists(page):
            remove_navigation_from_file(page)
        else:
            print(f"File not found: {page}")

if __name__ == "__main__":
    main()

