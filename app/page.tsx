'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Activity,
  Calendar,
  Heart,
  Shield,
  Clock,
  Users,
  Stethoscope,
  CheckCircle,
  ArrowRight,
  Brain,
  Baby,
  Bone,
  Eye,
  Syringe,
  Pill,
  ClipboardList,
  Ambulance,
  HeartPulse,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const services = [
    {
      icon: Ambulance,
      title: 'Emergency Care',
      description: '24/7 emergency services with rapid response and specialized trauma care'
    },
    {
      icon: Syringe,
      title: 'Preventive Medicine',
      description: 'Comprehensive health screenings and vaccination programs'
    },
    {
      icon: HeartPulse,
      title: 'Advanced Diagnostics',
      description: 'State-of-the-art imaging and laboratory testing facilities'
    },
    {
      icon: ClipboardList,
      title: 'Consultation Services',
      description: 'Expert medical consultations across multiple specialties'
    },
    {
      icon: Pill,
      title: 'Pharmacy Services',
      description: 'In-house pharmacy with a wide range of medications'
    },
    {
      icon: Activity,
      title: 'Health Monitoring',
      description: 'Continuous patient monitoring and telehealth services'
    }
  ];

  const departments = [
    {
      icon: Heart,
      title: 'Cardiology',
      description: 'Comprehensive heart care with advanced cardiac procedures',
      color: 'bg-red-100 text-red-600'
    },
    {
      icon: Brain,
      title: 'Neurology',
      description: 'Expert treatment for neurological conditions and disorders',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: Baby,
      title: 'Pediatrics',
      description: 'Specialized care for infants, children, and adolescents',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Bone,
      title: 'Orthopedics',
      description: 'Advanced treatment for bone, joint, and muscle conditions',
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Patients Served' },
    { number: '200+', label: 'Expert Doctors' },
    { number: '15+', label: 'Departments' },
    { number: '98%', label: 'Satisfaction Rate' }
  ];

  const howItWorks = [
    {
      step: '1',
      title: 'Create Account',
      description: 'Register as a patient with your basic information'
    },
    {
      step: '2',
      title: 'Book Appointment',
      description: 'Choose your doctor and preferred time slot'
    },
    {
      step: '3',
      title: 'Get Treatment',
      description: 'Visit the hospital and receive quality healthcare'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <nav className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <Heart className="h-8 w-8 text-green-500 fill-green-500" />
              <span className="text-2xl font-bold text-gray-900">MediCare</span>
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-green-500 font-medium transition">
                Home
              </Link>
              <Link href="#services" className="text-gray-700 hover:text-green-500 font-medium transition">
                Services
              </Link>
              <Link href="#departments" className="text-gray-700 hover:text-green-500 font-medium transition">
                Departments
              </Link>
              <Link href="#contact" className="text-gray-700 hover:text-green-500 font-medium transition">
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
              <Link href="#services" className="block text-gray-700 hover:text-green-500 font-medium">
                Services
              </Link>
              <Link href="#departments" className="block text-gray-700 hover:text-green-500 font-medium">
                Departments
              </Link>
              <Link href="#contact" className="block text-gray-700 hover:text-green-500 font-medium">
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

      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeInUp}>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Your Health, Our <span className="text-green-500">Priority</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Experience world-class healthcare with our comprehensive hospital management system.
              Book appointments, consult with expert doctors, and manage your health journey seamlessly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 bg-green-500 hover:bg-green-600">
                  Book Appointment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 border-green-500 text-green-600 hover:bg-green-50">
                  Login as Staff
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-3xl p-8 shadow-2xl">
              <div className="bg-white rounded-2xl p-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Stethoscope className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Quick Consultation</p>
                    <p className="font-semibold text-gray-900">Available Now</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Activity className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Health Monitoring</p>
                    <p className="font-semibold text-gray-900">24/7 Tracking</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Calendar className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Next Appointment</p>
                    <p className="font-semibold text-gray-900">Easy Scheduling</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-green-500 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center"
              >
                <h3 className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</h3>
                <p className="text-green-100 text-sm md:text-base">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="services" className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive healthcare services tailored to your needs
          </p>
        </motion.div>

        <motion.div
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="border-2 hover:border-green-500 transition-all hover:shadow-lg h-full group">
                <CardContent className="p-6">
                  <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-500 transition">
                    <service.icon className="h-7 w-7 text-green-600 group-hover:text-white transition" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section id="departments" className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Departments</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              World-class specialists across multiple medical departments
            </p>
          </motion.div>

          <motion.div
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
          >
            {departments.map((dept, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="border-2 hover:border-green-500 transition-all hover:shadow-xl h-full group cursor-pointer">
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${dept.color}`}>
                      <dept.icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-xl mb-2">{dept.title}</CardTitle>
                    <CardDescription className="text-base">{dept.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center">
            <Button size="lg" variant="outline" className="border-green-500 text-green-600 hover:bg-green-50">
              View All Departments
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started with our simple three-step process
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {howItWorks.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <Card className="text-center h-full border-2">
                  <CardContent className="p-8">
                    <div className="bg-green-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="h-8 w-8 text-green-500" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-green-500 to-green-600 rounded-3xl p-12 text-center text-white"
        >
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-green-100 max-w-2xl mx-auto">
            Join thousands of patients who trust MediCare for their healthcare needs
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6 bg-white text-green-600 hover:bg-gray-100">
              Create Your Account
              <CheckCircle className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </section>

      <footer id="contact" className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-6 w-6 text-green-500 fill-green-500" />
                <span className="text-xl font-bold">MediCare</span>
              </div>
              <p className="text-gray-400">
                Your trusted partner in healthcare management and wellness.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/" className="hover:text-green-500 transition">Home</Link></li>
                <li><Link href="#services" className="hover:text-green-500 transition">Services</Link></li>
                <li><Link href="#departments" className="hover:text-green-500 transition">Departments</Link></li>
                <li><Link href="#contact" className="hover:text-green-500 transition">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">For Patients</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/register" className="hover:text-green-500 transition">Register</Link></li>
                <li><Link href="/login" className="hover:text-green-500 transition">Login</Link></li>
                <li><Link href="/appointments" className="hover:text-green-500 transition">Appointments</Link></li>
                <li><Link href="/faq" className="hover:text-green-500 transition">FAQ</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-gray-400">
                <li>123 Medical Center Drive</li>
                <li>City, State 12345</li>
                <li>Phone: (555) 123-4567</li>
                <li>Email: info@medicare.com</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 MediCare Hospital Management System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
