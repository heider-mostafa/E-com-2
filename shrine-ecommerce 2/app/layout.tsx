import { Inter } from 'next/font/google'
import './globals.css'
import { ShoppingCart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { CartProvider } from './contexts/CartContext'
import CartIcon from './components/CartIcon'
import Link from 'next/link'
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'TikTok Dropshipping Store',
  description: 'Trending products from TikTok',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}

function Header() {
  const router = useRouter()

  const handleAboutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (window.location.pathname !== '/') {
      router.push('/')
      setTimeout(() => {
        const aboutSection = document.getElementById('about-us')
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    } else {
      const aboutSection = document.getElementById('about-us')
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-3xl font-black uppercase text-pink-600 tracking-widest hover:text-pink-700 transition-colors duration-300 transform hover:scale-105">Rovi</Link>
        <nav className="flex items-center">
          <ul className="flex space-x-4 mr-4">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/products" className="hover:underline">Products</Link></li>
            <li><a href="#about-us" className="hover:underline" onClick={handleAboutClick}>About</a></li>
          </ul>
          <CartIcon />
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <>
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold italic text-white tracking-wider mb-4">Stay Updated with Rovi</h2>
            <p className="mb-6">Be the first to know about new products and exclusive offers!</p>
            <form className="flex gap-2">
              <Input type="email" placeholder="Your email" className="flex-grow" />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
      </section>
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping</Link></li>
                <li><Link href="/returns" className="hover:text-white transition-colors">Returns</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">TikTok</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li>Email: rovi@gmx.com</li>
              </ul>
            </div>
            <div id="about-us">
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p>At Rovi, we believe every swipe of gloss tells a story. Our mission is to empower you to feel confident, bold, and beautiful with high-quality lip products that deliver stunning color, lasting shine, and nourishing care. We're passionate about creating products that not only look amazing but also make you feel amazing—because you deserve it.

From soft, everyday shades to bold, statement-making hues, our collection is designed to match your vibe and celebrate your unique beauty. Join us on this journey to shine brighter, one gloss at a time. 💖✨</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
            © 2023 TikTok Trends Store. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  )
}

