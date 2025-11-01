'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Heart,
  Activity,
  Stethoscope,
  Eye,
  Users,
  Headphones,
  Monitor,
  Star,
  ArrowRight,
  Menu,
  X,
  CheckCircle,
  Calendar
} from 'lucide-react';
import { useState } from 'react';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const services = [
    { name: 'Angioplasty', description: 'Minimally invasive procedure to open blocked arteries.', icon: Heart },
    { name: 'Cardiology', description: 'Comprehensive heart care and advanced cardiovascular treatments.', icon: Activity },
    { name: 'Dental', description: 'Complete oral care from routine checkups to advanced procedures.', icon: Stethoscope },
    { name: 'Eye Care', description: 'Advanced eye examinations and vision correction services.', icon: Eye },
    { name: 'Endocrinology', description: 'Specialized care for hormonal and metabolic disorders.', icon: Star }
  ];

  const whyChooseUs = [
    { title: '24/7 Medical consultation', description: 'Round-the-clock access to medical experts for urgent care.', icon: Monitor },
    { title: 'Industry experts', description: 'Our team comprises the best medical professionals in their fields.', icon: Users },
    { title: 'Healthcare support', description: 'Comprehensive support services for all your healthcare needs.', icon: Headphones },
    { title: 'Online sessions', description: 'Connect with doctors remotely through our secure telemedicine platform.', icon: Monitor }
  ];

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full ml-1"></div>
              </div>
              <span className="text-xl font-semibold text-gray-900">Care.co</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition">Home</Link>
              <Link href="/services" className="text-gray-700 hover:text-blue-600 font-medium transition">Service</Link>
              <Link href="/departments" className="text-gray-700 hover:text-blue-600 font-medium transition">About us</Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition">Find a Doctor</Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition">Contact</Link>
            </div>

            <div className="hidden md:flex">
              <Link href="/register">
                <Button className="bg-gray-900 hover:bg-gray-800 text-white px-6">Sign up</Button>
              </Link>
            </div>

            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-3">
              <Link href="/" className="block text-gray-700">Home</Link>
              <Link href="/services" className="block text-gray-700">Service</Link>
              <Link href="/departments" className="block text-gray-700">About us</Link>
              <Link href="/contact" className="block text-gray-700">Contact</Link>
              <Link href="/register"><Button className="w-full">Sign up</Button></Link>
            </div>
          )}
        </div>
      </nav>

      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  We follow a <span className="inline-flex items-center"><Heart className="h-10 w-10 text-cyan-300 mx-2" /></span> holistic approach to <span className="text-purple-300">health care.</span>
                </h1>
                <Link href="/register">
                  <Button size="lg" className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-4 text-lg">
                    Make an Appointment →
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm">Take the discount for the first visit of ophthalmologist</p>
                    <div className="bg-white/20 p-2 rounded-lg">
                      <span className="text-xs">→</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-5xl font-bold mb-1">20%</div>
                      <div className="bg-gray-900 text-white px-3 py-1 rounded-full text-xs inline-block">$</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-10 h-10 bg-purple-300 rounded-full"></div>
                          <div>
                            <p className="text-xs font-semibold">Dr. Darlene Robin</p>
                            <p className="text-xs opacity-80">Dental Specialist</p>
                            <div className="flex items-center mt-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs ml-1">5.0 • 50+ reviews</span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center space-x-2">
                          <div className="bg-green-500 px-2 py-1 rounded text-xs">Online</div>
                          <div className="bg-white/30 px-2 py-1 rounded-full flex items-center space-x-1">
                            <div className="w-1 h-1 bg-white rounded-full"></div>
                            <div className="w-1 h-1 bg-white rounded-full"></div>
                            <div className="w-1 h-1 bg-white rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 flex flex-col justify-center items-center">
                  <div className="text-4xl font-bold mb-2">500+</div>
                  <p className="text-sm text-center opacity-90">Expert Doctors</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 h-full">
                <img
                  src="https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Doctor with patient"
                  className="rounded-xl w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src="https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Doctor in medical office"
                className="rounded-3xl w-full h-full object-cover shadow-2xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-between"
            >
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Proud to be one of the nation's best
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  For 10 years in a row U.S. News & World Report has named us as one of the best public hospitals in the nation.
                </p>
                <Link href="/register">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                    About us
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <img
                  src="https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Medical device"
                  className="rounded-2xl w-full h-40 object-cover shadow-lg"
                />
                <img
                  src="https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Stethoscope"
                  className="rounded-2xl w-full h-40 object-cover shadow-lg"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-20">
        <div className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 md:mb-0">Our medical services</h2>
            <Link href="/services">
              <Button variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50">
                View All Services →
              </Button>
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {services.slice(0, 2).map((service, index) => (
              <Card key={index} className="border-2 hover:border-blue-500 transition-all hover:shadow-lg group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{service.name}</h3>
                    <div className="bg-blue-50 p-3 rounded-xl group-hover:bg-blue-500 transition">
                      <service.icon className="h-6 w-6 text-blue-600 group-hover:text-white" />
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <Button variant="ghost" className="text-blue-600 px-0 hover:bg-transparent">
                    Book more →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(2, 5).map((service, index) => (
              <Card key={index + 2} className="border-2 hover:border-blue-500 transition-all hover:shadow-lg group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{service.name}</h3>
                    <div className="bg-blue-50 p-3 rounded-xl group-hover:bg-blue-500 transition">
                      <service.icon className="h-6 w-6 text-blue-600 group-hover:text-white" />
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <Button variant="ghost" className="text-blue-600 px-0 hover:bg-transparent">
                    Book more →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-gray-900 mb-12">Why choose us</h2>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            {whyChooseUs.slice(0, 2).map((item, index) => (
              <Card key={index} className="border-2 hover:border-blue-500 transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-50 p-3 rounded-xl flex-shrink-0">
                      <item.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex items-center">
            <img
              src="https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Medical team"
              className="rounded-3xl w-full h-full object-cover shadow-xl"
            />
          </div>

          <div className="space-y-6">
            {whyChooseUs.slice(2, 4).map((item, index) => (
              <Card key={index + 2} className="border-2 hover:border-blue-500 transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-50 p-3 rounded-xl flex-shrink-0">
                      <item.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-green-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-green-100">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Book Your Appointment Today</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Take the first step towards better health. Our online appointment system makes it easy to schedule consultations with our expert medical team at your convenience.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Choose from available specialists</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Select your preferred time slot</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Receive instant confirmation</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Manage appointments anytime</span>
                  </li>
                </ul>
                <Link href="/register">
                  <Button size="lg" className="w-full bg-green-500 hover:bg-green-600">
                    Get Started Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Card className="border-2 border-green-100 hover:border-green-500 transition">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <Calendar className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Easy Scheduling</CardTitle>
                      <CardDescription>Book appointments in minutes</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card className="border-2 border-green-100 hover:border-green-500 transition">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <Stethoscope className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Expert Care</CardTitle>
                      <CardDescription>Qualified medical professionals</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card className="border-2 border-green-100 hover:border-green-500 transition">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <Activity className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Health Tracking</CardTitle>
                      <CardDescription>Monitor your wellness journey</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full ml-1"></div>
                </div>
                <span className="text-xl font-bold">Care.co</span>
              </div>
              <p className="text-gray-400">Your trusted partner in healthcare management.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/" className="hover:text-blue-500 transition">Home</Link></li>
                <li><Link href="/services" className="hover:text-blue-500 transition">Services</Link></li>
                <li><Link href="/departments" className="hover:text-blue-500 transition">About</Link></li>
                <li><Link href="/contact" className="hover:text-blue-500 transition">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">For Patients</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/register" className="hover:text-blue-500 transition">Register</Link></li>
                <li><Link href="/login" className="hover:text-blue-500 transition">Login</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>123 Medical Center</li>
                <li>Phone: (555) 123-4567</li>
                <li>info@care.co</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Care.co. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
