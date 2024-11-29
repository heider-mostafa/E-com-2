'use client'

import Image from "next/image"
import { Star, Clock } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'
import { useCart } from '../contexts/CartContext'
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export function ProductCard({ product }) {
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const handleAddToCart = () => {
    if (product.soldOut) return;
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1
    })
    toast({
      title: "Added to cart",
      description: `${product.name} added to your cart.`,
    })
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: product.id * 0.1 }}
      className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
    >
      <Link href={`/product/${product.id}`}>
        <div className="relative">
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-64 object-cover"
          />
          {product.soldOut ? (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">Sold Out</span>
            </div>
          ) : (
            <Badge className="absolute top-2 left-2">Selling Out Quickly!</Badge>
          )}
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold mb-2">
            {product.name.split('(')[0].trim()}
          </h3>
        </Link>
        <div className="flex justify-between items-center mb-2">
          {product.price !== null ? (
            <p className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</p>
          ) : (
            <p className="text-xl font-semibold text-gray-500">Out of Stock</p>
          )}
          <div className="flex items-center">
            <Star className="text-yellow-400 w-4 h-4 mr-1" />
            <span>{product.rating}</span>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-4">{product.reviews} reviews • {product.sold} sold</p>
        <div className="flex items-center justify-between">
          <Button 
            className="w-full" 
            onClick={handleAddToCart}
            disabled={product.soldOut}
          >
            {product.soldOut ? 'Sold Out' : 'Add to Cart'}
          </Button>
        </div>
      </div>
      {!product.soldOut && (
        <div className="bg-red-100 text-red-800 p-2 text-center text-sm font-semibold">
          <Clock className="inline-block w-4 h-4 mr-1" />
          Limited Time Offer
        </div>
      )}
    </motion.div>
  )
}

