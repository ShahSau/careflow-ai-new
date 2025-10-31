'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Heart, Menu, X } from 'lucide-react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="border-b bg-white/95 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <Heart className="h-8 w-8 text-green-500 fill-green-500" />
              <span className="text-2xl font-bold text-gray-900">MediCare</span>
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-green-500 font-medium transition">
              Home
            </Link>
            <Link href="/#services" className="text-gray-700 hover:text-green-500 font-medium transition">
              Services
            </Link>
            <Link href="/departments" className="text-gray-700 hover:text-green-500 font-medium transition">
              Departments
            </Link>
            <Link href="/#contact" className="text-gray-700 hover:text-green-500 font-medium transition">
              Contact
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex items-center space-x-4"
          >
            <Link href="/login">
              <Button variant="ghost" size="lg">Login</Button>
            </Link>
            <Link href="/register">
              <Button size="lg" className="bg-green-500 hover:bg-green-600">Get Started</Button>
            </Link>
          </motion.div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden pb-4 space-y-3"
          >
            <Link href="/" className="block text-gray-700 hover:text-green-500 font-medium">
              Home
            </Link>
            <Link href="/#services" className="block text-gray-700 hover:text-green-500 font-medium">
              Services
            </Link>
            <Link href="/departments" className="block text-gray-700 hover:text-green-500 font-medium">
              Departments
            </Link>
            <Link href="/#contact" className="block text-gray-700 hover:text-green-500 font-medium">
              Contact
            </Link>
            <div className="pt-2 space-y-2">
              <Link href="/login" className="block">
                <Button variant="ghost" size="lg" className="w-full">Login</Button>
              </Link>
              <Link href="/register" className="block">
                <Button size="lg" className="w-full bg-green-500 hover:bg-green-600">Get Started</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
