import type { APIRoute } from 'astro';

/**
 * API endpoint to demonstrate multi-part blog post examples
 * This is for documentation and testing purposes
 */

export const GET: APIRoute = async () => {
  const examples = {
    "jewelry_collection": {
      title: "Tribal Fusion Collection Blog",
      description: "Example of creating a jewelry collection blog post",
      parts: [
        {
          part: 1,
          content: "Introducing our new Tribal Fusion Collection! ✨\n\nThis collection combines ancient tribal inspiration with modern 3D printing technology. Each piece tells a story of transformation and beauty.",
          hashtags: ["#blog", "#featured_1", "#jewelry", "#tribal", "#3dprinting", "#new_collection"],
          type: "text"
        },
        {
          part: 2,
          content: "The facechains in this collection feature intricate geometric patterns inspired by desert tribes. The central nosepiece echoes ancient markings while the chains create a modern, wearable art form.",
          hashtags: ["#blog", "#featured_2", "#jewelry", "#facechain", "#geometric"],
          type: "images"
        },
        {
          part: 3,
          content: "Watch the 3D printing process in action! Each piece starts as a digital design and becomes reality through precision laser cutting and hand-finishing.",
          hashtags: ["#blog", "#featured_3", "#jewelry", "#3dprinting", "#process", "#video"],
          type: "video"
        },
        {
          part: 4,
          content: "Featured products from the collection:\n\n• Golden Desert Facechain - tribute.tg/golden-desert\n• Silver Geometry Headchain - tribute.tg/silver-geometry\n• Bronze Tribal Earrings - tribute.tg/bronze-tribal",
          hashtags: ["#blog", "#featured_4", "#jewelry", "#products", "#tribute.tg/golden-desert", "#tribute.tg/silver-geometry", "#tribute.tg/bronze-tribal"],
          type: "product"
        },
        {
          part: 5,
          content: "The philosophy behind this collection:\n\n\"Every piece is a bridge between ancient wisdom and modern innovation. When you wear these pieces, you carry forward traditions that span millennia while expressing your unique contemporary style.\"",
          hashtags: ["#blog", "#featured_5", "#jewelry", "#philosophy", "#tradition", "#innovation"],
          type: "text"
        }
      ]
    },
    "process_documentation": {
      title: "Behind the Scenes: Creating a Custom Facechain",
      description: "Example of documenting a jewelry creation process",
      parts: [
        {
          part: 1,
          content: "Behind the Scenes: Creating a Custom Facechain\n\nToday I'll show you the complete process from initial concept to finished piece.",
          hashtags: ["#blog_process", "#part_1", "#craftsmanship", "#behind_scenes"],
          type: "text"
        },
        {
          part: 2,
          content: "Step 1: Hand-carving the wax model. This is where the magic begins - every curve, every detail is shaped by hand using traditional techniques.",
          hashtags: ["#blog_process", "#part_2", "#wax_carving", "#traditional", "#handmade"],
          type: "images"
        },
        {
          part: 3,
          content: "Step 2: The lost-wax casting process. The wax model is encased in ceramic investment, then filled with molten metal after the wax is burned away.",
          hashtags: ["#blog_process", "#part_3", "#casting", "#fire", "#transformation"],
          type: "video"
        }
      ]
    },
    "product_showcase": {
      title: "New Collection Product Showcase",
      description: "Example of showcasing products with Tribute integration",
      parts: [
        {
          part: 1,
          content: "Introducing our latest collection! Each piece is crafted with precision and artistic vision.",
          hashtags: ["#blog_showcase", "#part_1", "#jewelry", "#new_collection"],
          type: "text"
        },
        {
          part: 2,
          content: "Featured products:\n\n• Golden Desert Facechain - tribute.tg/golden-desert\n• Silver Geometry Headchain - tribute.tg/silver-geometry",
          hashtags: ["#blog_showcase", "#part_2", "#products", "#tribute.tg/golden-desert", "#tribute.tg/silver-geometry"],
          type: "product"
        }
      ]
    }
  };

  return new Response(JSON.stringify(examples), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
