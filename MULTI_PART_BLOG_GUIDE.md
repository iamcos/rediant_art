# Multi-Part Blog Post System

This guide explains how to create comprehensive blog articles from multiple Telegram posts using the `#blog` hashtag system.

## Overview

The multi-part blog system allows you to:
- Create long-form articles from multiple Telegram posts
- Include images, videos, and Tribute products
- Automatically sequence and combine content
- Support both English and Russian content
- Maintain draft status until complete

## Hashtag System

### Basic Structure
```
#blog [blog_id] [part_number] [additional_tags]
```

### Examples

**Simple Multi-Part Blog:**
```
#blog #featured_1 #jewelry #new_collection
```

**Named Blog with Total Parts:**
```
#blog_my_collection #featured_1 #total_5 #jewelry #3dprinting
```

**Product Showcase Blog:**
```
#blog_product_showcase #part_2 #tribute.tg/product-123 #featured
```

## Usage Examples

### Example 1: Jewelry Collection Blog

**Post 1:**
```
Introducing our new Tribal Fusion Collection! ✨

This collection combines ancient tribal inspiration with modern 3D printing technology. Each piece tells a story of transformation and beauty.

#blog #featured_1 #jewelry #tribal #3dprinting #new_collection
```

**Post 2:**
```
[Image of facechain being worn]

The facechains in this collection feature intricate geometric patterns inspired by desert tribes. The central nosepiece echoes ancient markings while the chains create a modern, wearable art form.

#blog #featured_2 #jewelry #facechain #geometric
```

**Post 3:**
```
[Video of jewelry being made]

Watch the 3D printing process in action! Each piece starts as a digital design and becomes reality through precision laser cutting and hand-finishing.

#blog #featured_3 #jewelry #3dprinting #process #video
```

**Post 4:**
```
Featured products from the collection:

• Golden Desert Facechain - tribute.tg/golden-desert
• Silver Geometry Headchain - tribute.tg/silver-geometry  
• Bronze Tribal Earrings - tribute.tg/bronze-tribal

#blog #featured_4 #jewelry #products #tribute.tg/golden-desert #tribute.tg/silver-geometry #tribute.tg/bronze-tribal
```

**Post 5:**
```
The philosophy behind this collection:

"Every piece is a bridge between ancient wisdom and modern innovation. When you wear these pieces, you carry forward traditions that span millennia while expressing your unique contemporary style."

#blog #featured_5 #jewelry #philosophy #tradition #innovation
```

### Example 2: Process Documentation

**Post 1:**
```
Behind the Scenes: Creating a Custom Facechain

Today I'll show you the complete process from initial concept to finished piece.

#blog_process #part_1 #craftsmanship #behind_scenes
```

**Post 2:**
```
[Images of wax carving process]

Step 1: Hand-carving the wax model. This is where the magic begins - every curve, every detail is shaped by hand using traditional techniques.

#blog_process #part_2 #wax_carving #traditional #handmade
```

**Post 3:**
```
[Video of lost-wax casting]

Step 2: The lost-wax casting process. The wax model is encased in ceramic investment, then filled with molten metal after the wax is burned away.

#blog_process #part_3 #casting #fire #transformation
```

## Hashtag Reference

### Required Hashtags
- `#blog` - Marks the post as part of a multi-part blog
- `#featured_X` or `#part_X` - Specifies the part number

### Optional Hashtags
- `#blog_[name]` - Custom blog identifier
- `#total_X` - Specifies total number of parts
- `#featured` - Makes the blog post featured
- `#en` / `#ru` - Forces language (auto-detected otherwise)

### Content Type Hashtags
- `#text` - Text-only content
- `#images` - Image gallery
- `#video` - Video content
- `#product` - Product showcase
- `#mixed` - Mixed content types

### Category Hashtags
- `#jewelry` - Jewelry-related content
- `#process` - Making/creation process
- `#philosophy` - Brand philosophy
- `#tutorial` - How-to content
- `#showcase` - Product showcase

## Tribute Product Integration

### Adding Products
Include Tribute product URLs in your posts:
```
Check out this amazing piece: tribute.tg/golden-desert
```

### Product Features
- Automatic product information fetching
- Price and availability display
- Product image integration
- Direct purchase links
- Stock status indicators

### Example with Products
```
New collection is here! ✨

Featured pieces:
• Golden Desert Facechain - tribute.tg/golden-desert
• Silver Geometry Headchain - tribute.tg/silver-geometry

#blog #featured_1 #jewelry #tribute.tg/golden-desert #tribute.tg/silver-geometry
```

## Blog Post Lifecycle

### 1. Draft Creation
- First post with `#blog` creates a draft
- Subsequent posts add parts to the draft
- Status: `draft`

### 2. Part Addition
- Each new post adds a part
- Parts are automatically sequenced
- Status: `draft`

### 3. Completion
- Blog is complete when:
  - All specified parts are added (`#total_X`)
  - OR minimum 3 parts are added
- Status: `complete`

### 4. Publishing
- Complete blogs are automatically published
- Markdown file created in `src/content/articles/`
- Status: `published`

## Generated Blog Structure

### Frontmatter
```yaml
---
title: "Your Blog Title"
description: "Auto-generated description"
author: "Svetlana (Mizyre)"
date: "2024-01-15"
featured: true
tags: ["jewelry", "3dprinting", "innovation"]
lang: "en"
source: "telegram-multipart"
blogId: "blog"
totalParts: 5
---
```

### Content Structure
```markdown
# Your Blog Title

## Part 1
Your first post content here...

### Images
![Image](/images/telegram-123456.jpg)

### Videos
<video controls>
  <source src="/videos/telegram-video-123456.mp4" type="video/mp4">
</video>

### Featured Products
- [View Product](tribute.tg/golden-desert)

---

## Part 2
Your second post content here...

---
```

## API Endpoints

### Check Blog Status
```bash
GET /api/blog-status?blogId=blog_my_collection
```

### List All Drafts
```bash
GET /api/blog-status
```

### Force Publish
```bash
POST /api/blog-status
{
  "action": "force-publish",
  "blogId": "blog_my_collection"
}
```

## Best Practices

### Content Planning
1. **Plan your parts** - Think about the story flow
2. **Use consistent hashtags** - Keep the same blog ID
3. **Include variety** - Mix text, images, videos, products
4. **Sequence logically** - Build your narrative

### Hashtag Strategy
1. **Use descriptive blog IDs** - `#blog_jewelry_process` vs `#blog`
2. **Specify total parts** - `#total_5` helps with completion
3. **Add relevant tags** - For categorization and SEO
4. **Force language when needed** - `#en` or `#ru`

### Content Quality
1. **Write engaging content** - Each part should add value
2. **Include visual elements** - Images and videos enhance posts
3. **Link to products** - Drive sales with Tribute integration
4. **Tell a story** - Build narrative across parts

## Troubleshooting

### Blog Not Completing
- Check that all parts use the same blog ID
- Verify part numbers are sequential
- Use `#total_X` to specify completion

### Missing Content
- Ensure images/videos are properly attached
- Check that Tribute URLs are correct
- Verify hashtags are properly formatted

### Language Issues
- Use `#en` or `#ru` to force language
- Check for Cyrillic characters in Russian posts
- Ensure consistent language across parts

## Advanced Features

### Custom Blog IDs
```
#blog_jewelry_process #part_1 #total_3
#blog_jewelry_process #part_2
#blog_jewelry_process #part_3
```

### Mixed Content Types
```
#blog #featured_1 #text #philosophy
#blog #featured_2 #images #jewelry
#blog #featured_3 #video #process
#blog #featured_4 #product #tribute.tg/golden-desert
```

### Featured Posts
```
#blog #featured_1 #featured #jewelry #new_collection
```

This system gives you complete control over creating rich, multi-media blog posts directly from your Telegram channel!









