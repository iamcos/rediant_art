#!/usr/bin/env python3
"""
Image Optimization Script for Rediant Website
Optimizes images for web performance while maintaining quality
"""

import os
from PIL import Image
import sys

def optimize_image(input_path, output_path, max_width=1200, quality=85):
    """
    Optimize an image for web use
    
    Args:
        input_path: Path to input image
        output_path: Path to save optimized image
        max_width: Maximum width for the image
        quality: JPEG quality (1-100)
    """
    try:
        with Image.open(input_path) as img:
            # Convert to RGB if necessary (for JPEG)
            if img.mode in ('RGBA', 'LA', 'P'):
                img = img.convert('RGB')
            
            # Calculate new dimensions maintaining aspect ratio
            if img.width > max_width:
                ratio = max_width / img.width
                new_height = int(img.height * ratio)
                img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
            
            # Save optimized image
            img.save(output_path, 'JPEG', quality=quality, optimize=True)
            
            # Get file sizes
            original_size = os.path.getsize(input_path)
            optimized_size = os.path.getsize(output_path)
            compression_ratio = (1 - optimized_size / original_size) * 100
            
            print(f"✅ Optimized: {os.path.basename(input_path)}")
            print(f"   Original: {original_size:,} bytes")
            print(f"   Optimized: {optimized_size:,} bytes")
            print(f"   Compression: {compression_ratio:.1f}%")
            print()
            
            return True
            
    except Exception as e:
        print(f"❌ Error optimizing {input_path}: {e}")
        return False

def optimize_all_images(photos_dir="photos", output_dir="photos/optimized"):
    """
    Optimize all images in the photos directory
    """
    if not os.path.exists(photos_dir):
        print(f"❌ Photos directory not found: {photos_dir}")
        return
    
    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)
    
    # Get all image files
    image_extensions = ('.jpg', '.jpeg', '.png', '.webp')
    image_files = [f for f in os.listdir(photos_dir) 
                   if f.lower().endswith(image_extensions)]
    
    if not image_files:
        print("❌ No image files found in photos directory")
        return
    
    print(f"🖼️  Found {len(image_files)} images to optimize")
    print(f"📁 Output directory: {output_dir}")
    print()
    
    optimized_count = 0
    
    for filename in image_files:
        input_path = os.path.join(photos_dir, filename)
        output_path = os.path.join(output_dir, filename)
        
        if optimize_image(input_path, output_path):
            optimized_count += 1
    
    print(f"🎉 Optimization complete!")
    print(f"✅ Successfully optimized {optimized_count}/{len(image_files)} images")
    print(f"📁 Optimized images saved to: {output_dir}")

def create_webp_versions(photos_dir="photos", output_dir="photos/webp"):
    """
    Create WebP versions of images for better compression
    """
    if not os.path.exists(photos_dir):
        print(f"❌ Photos directory not found: {photos_dir}")
        return
    
    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)
    
    # Get all image files
    image_extensions = ('.jpg', '.jpeg', '.png')
    image_files = [f for f in os.listdir(photos_dir) 
                   if f.lower().endswith(image_extensions)]
    
    if not image_files:
        print("❌ No image files found in photos directory")
        return
    
    print(f"🖼️  Creating WebP versions of {len(image_files)} images")
    print(f"📁 Output directory: {output_dir}")
    print()
    
    webp_count = 0
    
    for filename in image_files:
        input_path = os.path.join(photos_dir, filename)
        webp_filename = os.path.splitext(filename)[0] + '.webp'
        output_path = os.path.join(output_dir, webp_filename)
        
        try:
            with Image.open(input_path) as img:
                # Convert to RGB if necessary
                if img.mode in ('RGBA', 'LA', 'P'):
                    img = img.convert('RGB')
                
                # Save as WebP
                img.save(output_path, 'WebP', quality=85, optimize=True)
                
                # Get file sizes
                original_size = os.path.getsize(input_path)
                webp_size = os.path.getsize(output_path)
                compression_ratio = (1 - webp_size / original_size) * 100
                
                print(f"✅ WebP: {webp_filename}")
                print(f"   Original: {original_size:,} bytes")
                print(f"   WebP: {webp_size:,} bytes")
                print(f"   Compression: {compression_ratio:.1f}%")
                print()
                
                webp_count += 1
                
        except Exception as e:
            print(f"❌ Error creating WebP for {filename}: {e}")
    
    print(f"🎉 WebP conversion complete!")
    print(f"✅ Successfully created {webp_count}/{len(image_files)} WebP images")

if __name__ == "__main__":
    print("🚀 Rediant Image Optimizer")
    print("=" * 50)
    
    if len(sys.argv) > 1:
        command = sys.argv[1].lower()
        
        if command == "optimize":
            optimize_all_images()
        elif command == "webp":
            create_webp_versions()
        elif command == "both":
            optimize_all_images()
            print("\n" + "=" * 50)
            create_webp_versions()
        else:
            print("❌ Unknown command. Use: optimize, webp, or both")
    else:
        print("Usage: python image_optimizer.py [optimize|webp|both]")
        print()
        print("Commands:")
        print("  optimize - Create optimized JPEG versions")
        print("  webp     - Create WebP versions for better compression")
        print("  both     - Do both optimizations")
