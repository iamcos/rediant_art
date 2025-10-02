#!/usr/bin/env node

/**
 * Script to fetch products from Tribute API
 * Usage: node scripts/fetch-products.js
 * 
 * Make sure to set TRIBUTE_API_KEY environment variable:
 * export TRIBUTE_API_KEY=your_api_key_here
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function fetchTributeProducts() {
  const apiKey = process.env.TRIBUTE_API_KEY;
  
  if (!apiKey) {
    console.error('❌ TRIBUTE_API_KEY environment variable is required');
    console.log('💡 Set it with: export TRIBUTE_API_KEY=your_api_key_here');
    process.exit(1);
  }

  try {
    console.log('🔄 Fetching products from Tribute API...');
    
    const response = await fetch('https://tribute.tg/api/v1/products?type=physical&page=1&size=100', {
      headers: { 
        'Api-Key': apiKey,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const products = data.rows || [];
    
    console.log(`✅ Successfully fetched ${products.length} products from Tribute`);
    
    // Display products
    if (products.length > 0) {
      console.log('\n📦 PRODUCTS:');
      products.forEach((product, index) => {
        console.log(`\n${index + 1}. ${product.name}`);
        console.log(`   ID: ${product.id}`);
        console.log(`   Price: ${product.amount / 100} ${product.currency.toUpperCase()}`);
        console.log(`   Description: ${product.description || 'No description'}`);
        console.log(`   Image: ${product.imageUrl || 'No image'}`);
        console.log(`   Link: ${product.link || 'No link'}`);
        console.log(`   Available: ${product.available !== false ? 'Yes' : 'No'}`);
      });
    } else {
      console.log('📭 No products found in your Tribute account');
    }
    
    // Save products to JSON file for reference
    const outputPath = path.join(process.cwd(), 'products.json');
    fs.writeFileSync(outputPath, JSON.stringify(products, null, 2));
    console.log(`\n💾 Products saved to: ${outputPath}`);
    
    return products;
    
  } catch (error) {
    console.error('❌ Error fetching products:', error.message);
    process.exit(1);
  }
}

// Run the script
fetchTributeProducts();
