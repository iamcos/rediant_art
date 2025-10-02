SEO & AI Search Pack

Primary keywords: facechain, face chain jewelry, nose chain, bridge-of-nose jewelry, bohemian chain jewelry, head chain, body chain, laser-cut jewelry, modern tribal jewelry, unisex jewelry India, 3D printed jewelry, sustainable jewelry technology.

Secondary keywords: sacred geometry jewelry, calligraphic logo jewelry, conversation-starter jewelry, festival jewelry, metal 3D printing, additive manufacturing jewelry, artistic jewelry design.

Meta examples:

Home Title: Rediant — Facechains & Chain-Born Adornment | 3D Printed Artistic Jewelry

Home Description: Unisex facechains, headchains, bodychains, and ear assemblies. Ancient signs reimagined with modern 3D printing technology. Artistic jewelry designed to spark conversation.

Alt-text patterns:

alt="3D printed facechain with triangular filigree nosepiece and twin ear chains"

alt="laser-cut nose ornament with dotted border, Rediant design sketch"

alt="unisex head chain with central drop, silver finish, 3D printed"

alt="ear assemblies made from mixed metal shapes: feather, crescent, sun, additive manufacturing"

JSON-LD (Brand + CreativeWork + Organization)

{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Rediant",
  "url": "https://rediant.art",
  "logo": "https://rediant.art/assets/logo.png",
  "sameAs": ["https://instagram.com/rediant.art","https://tiktok.com/@rediant.art"],
  "brand": {
    "@type": "Brand",
    "name": "Rediant",
    "slogan": "Chain-born adornment for unforgettable faces"
  },
  "description": "Community-funded 3D printed jewelry combining ancient traditions with cutting-edge technology",
  "foundingDate": "2024",
  "areaServed": "Worldwide"
}


(Add Product schema when the shop launches.)

Style Guide (voice)

Voice: warm, direct, slightly bohemian; designer-maker energy.

Do say: clean, light, sharp, line, chain, curve, balance, modern, unisex, conversation.

Avoid: “exquisite,” “luxury,” “radiance/radiance-adjacent” clichés, and over-romantic fluff.

Taglines to rotate:

Chain-born adornment.

Ancient signs. Modern lines.

Made to be noticed.

Image Direction (for consistency)

Hero: contemporary artistic sketch beside a real facechain close-up.

Palette: silver/gold hardware, deep red accents (hair), charcoal background.

Composition: tight macro details + symmetrical straight-on portraits.

Alt text: follow patterns above for every image.

Headless CMS Mapping (future-proof)

Content types:

Post (title, slug, excerpt, body, coverImage, tags)

Piece (name, collection, materials, fit, images[])

GalleryImage (image, caption, alt)

Page (title, sections[])

Everything editable from iPhone via Sanity/Contentful web app.

Ready-to-Paste Snippets

Hero CTA buttons:

Explore Facechains → /collections/facechains

Read the Story → /about

Newsletter microcopy:
“New drops, behind-the-scenes, no spam.”

404 line:
“Wrong turn? Follow the chain back home.”

import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Rediant — Facechains & Chain-Born Adornment | 3D Printed Artistic Jewelry</title>
        <meta
          name="description"
          content="Unisex facechains, headchains, bodychains, and ear assemblies. Ancient signs reimagined with modern 3D printing technology. Artistic jewelry designed to spark conversation."
        />
        <meta name="keywords" content="facechain, face chain jewelry, nose chain, bridge-of-nose jewelry, bohemian chain jewelry, head chain, body chain, laser-cut jewelry, modern tribal jewelry, unisex jewelry, 3D printed jewelry, sustainable jewelry technology" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Rediant",
              "url": "https://rediant.art",
              "logo": "https://rediant.art/assets/logo.png",
              "sameAs": [
                "https://instagram.com/rediant.art",
                "https://tiktok.com/@rediant.art"
              ],
              "brand": {
                "@type": "Brand",
                "name": "Rediant",
                "slogan": "Chain-born adornment for unforgettable faces"
              },
              "description": "Community-funded 3D printed jewelry combining ancient traditions with cutting-edge technology",
              "foundingDate": "2024",
              "areaServed": "Worldwide"
            })
          }}
        />
      </Head>

      <main className="min-h-screen bg-neutral-50 text-gray-900">
        <header className="p-6 flex justify-between items-center border-b border-gray-200">
          <h1 className="text-2xl font-bold">Rediant</h1>
          <nav className="space-x-4">
            <Link href="/collections">Collections</Link>
            <Link href="/about">About</Link>
            <Link href="/journal">Journal</Link>
            <Link href="/3d-printing">3D Printing</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </header>

        <section className="p-12 text-center bg-gradient-to-b from-red-50 to-white">
          <h2 className="text-4xl font-bold mb-4">
            Chain-born adornment for unforgettable faces
          </h2>
          <p className="max-w-2xl mx-auto text-lg mb-6">
            Facechains, headchains, bodychains, and ear assemblies crafted from
            modern 3D printing technology and ancient ideas. Community-funded artistic jewelry designed to draw eyes—and start conversations.
          </p>
          <div className="space-x-4">
            <Link
              href="/collections/facechains"
              className="bg-black text-white px-6 py-3 rounded-xl"
            >
              Explore Facechains
            </Link>
            <Link
              href="/order"
              className="bg-red-600 text-white px-6 py-3 rounded-xl"
            >
              Order Custom Jewelry
            </Link>
          </div>
        </section>

        <section className="p-12 grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-xl font-semibold mb-2">Facechains</h3>
            <p>Bridge-of-nose ornaments with ear-to-ear symmetry, 3D printed with precision.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Assemblies</h3>
            <p>Earrings built from mixed metal pieces you'll never see twice, crafted through additive manufacturing.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Head & Body Chains</h3>
            <p>Lightweight drape, strong presence, sustainable 3D printed materials.</p>
          </div>
        </section>

        <section className="p-12 bg-gradient-to-r from-blue-50 to-purple-50 text-center">
          <h3 className="text-2xl font-semibold mb-4">Community-Funded Innovation</h3>
          <p className="max-w-2xl mx-auto mb-6">
            Support our vision of combining ancient traditions with cutting-edge 3D printing technology. 
            Every contribution helps us push the boundaries of artistic jewelry.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h4 className="font-semibold mb-2">🎨 Project Aurora</h4>
              <p className="text-sm mb-3">Advanced 3D Printing Studio</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: '65%'}}></div>
              </div>
              <p className="text-xs text-gray-600">1.6/2.5 BTC raised</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h4 className="font-semibold mb-2">🌟 Project Solstice</h4>
              <p className="text-sm mb-3">Sacred Geometry Collection</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{width: '45%'}}></div>
              </div>
              <p className="text-xs text-gray-600">0.8/1.8 BTC raised</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h4 className="font-semibold mb-2">🚀 Project Phoenix</h4>
              <p className="text-sm mb-3">Brand Expansion</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div className="bg-green-600 h-2 rounded-full" style={{width: '25%'}}></div>
              </div>
              <p className="text-xs text-gray-600">0.8/3.2 BTC raised</p>
            </div>
          </div>
          <Link
            href="/subscription"
            className="inline-block mt-6 bg-black text-white px-8 py-3 rounded-xl"
          >
            Subscribe to Updates
          </Link>
        </section>

        <section className="p-12 bg-neutral-100 text-center">
          <h3 className="text-2xl font-semibold mb-4">Get launch updates + early drops</h3>
          <form className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Your email"
              className="flex-grow border border-gray-300 p-3 rounded-l-xl"
            />
            <button className="bg-black text-white px-6 rounded-r-xl">
              Join
            </button>
          </form>
        </section>

        <footer className="p-6 text-center border-t border-gray-200">
          <p>© {new Date().getFullYear()} Rediant. All rights reserved.</p>
          <p className="text-sm text-gray-600 mt-2">
            Community-funded artistic jewelry | 3D Printed Innovation | BTC: bc1qrediantartfuture2024
          </p>
        </footer>
      </main>
    </div>
  );
}
