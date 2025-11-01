'use client';

import { Navbar } from '@/components/navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import {
  Stethoscope,
  Activity,
  Syringe,
  HeartPulse,
  Microscope,
  Ambulance,
  Baby,
  Pill,
  Brain,
  Bone,
  Eye,
  Ear,
  TestTube,
  Calendar,
  ChevronRight,
  Clock,
  Shield,
  Users,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    id: 1,
    title: 'Emergency Care',
    description: '24/7 emergency medical services with rapid response teams, advanced trauma care, and immediate stabilization for critical conditions.',
    icon: Ambulance,
    color: '#dc2626',
    features: ['24/7 Availability', 'Rapid Response', 'Advanced Life Support', 'Trauma Specialists']
  },
  {
    id: 2,
    title: 'Diagnostic Services',
    description: 'Comprehensive diagnostic testing including X-ray, CT scan, MRI, ultrasound, and advanced imaging technologies.',
    icon: Microscope,
    color: '#3b82f6',
    features: ['X-ray & CT Scan', 'MRI Imaging', 'Ultrasound', 'Digital Imaging']
  },
  {
    id: 3,
    title: 'Laboratory Services',
    description: 'State-of-the-art laboratory with comprehensive blood work, pathology, microbiology, and diagnostic testing.',
    icon: TestTube,
    color: '#8b5cf6',
    features: ['Blood Tests', 'Pathology', 'Microbiology', 'Quick Results']
  },
  {
    id: 4,
    title: 'Surgical Services',
    description: 'Advanced surgical procedures with modern operating rooms, minimally invasive techniques, and expert surgical teams.',
    icon: Activity,
    color: '#ef4444',
    features: ['General Surgery', 'Minimally Invasive', 'Day Surgery', 'Expert Surgeons']
  },
  {
    id: 5,
    title: 'Cardiology Services',
    description: 'Comprehensive heart care including diagnostics, treatment, cardiac rehabilitation, and preventive cardiology programs.',
    icon: HeartPulse,
    color: '#f43f5e',
    features: ['ECG & Echo', 'Angiography', 'Cardiac Rehab', 'Heart Monitoring']
  },
  {
    id: 6,
    title: 'Neurology Services',
    description: 'Expert neurological care for brain and nervous system disorders with advanced diagnostic and treatment options.',
    icon: Brain,
    color: '#8b5cf6',
    features: ['Brain Imaging', 'EEG Testing', 'Stroke Care', 'Neurosurgery']
  },
  {
    id: 7,
    title: 'Orthopedic Services',
    description: 'Complete bone and joint care including sports medicine, joint replacement, and rehabilitation services.',
    icon: Bone,
    color: '#f59e0b',
    features: ['Joint Replacement', 'Sports Medicine', 'Fracture Care', 'Rehabilitation']
  },
  {
    id: 8,
    title: 'Pediatric Care',
    description: 'Specialized healthcare for children from infancy through adolescence with child-friendly facilities.',
    icon: Baby,
    color: '#06b6d4',
    features: ['Well-Child Visits', 'Vaccinations', 'Growth Monitoring', 'Pediatric Emergency']
  },
  {
    id: 9,
    title: 'Pharmacy Services',
    description: 'Full-service pharmacy with prescription medications, over-the-counter products, and medication counseling.',
    icon: Pill,
    color: '#10b981',
    features: ['Prescription Filling', 'Medication Counseling', 'Home Delivery', '24/7 Access']
  },
  {
    id: 10,
    title: 'Ophthalmology',
    description: 'Complete eye care services including vision testing, eye surgery, and treatment of eye conditions.',
    icon: Eye,
    color: '#0ea5e9',
    features: ['Vision Testing', 'Eye Surgery', 'Contact Lenses', 'Glaucoma Care']
  },
  {
    id: 11,
    title: 'ENT Services',
    description: 'Ear, nose, and throat care with advanced diagnostic and treatment options for all ENT conditions.',
    icon: Ear,
    color: '#f97316',
    features: ['Hearing Tests', 'Sinus Treatment', 'Throat Surgery', 'Allergy Testing']
  },
  {
    id: 12,
    title: 'Vaccination Services',
    description: 'Comprehensive immunization programs for all ages including routine vaccinations and travel vaccines.',
    icon: Syringe,
    color: '#14b8a6',
    features: ['Child Vaccines', 'Adult Immunization', 'Travel Vaccines', 'Flu Shots']
  },
];

const whyChooseUs = [
  {
    icon: Shield,
    title: 'Quality Care',
    description: 'Board-certified physicians and healthcare professionals committed to excellence'
  },
  {
    icon: Clock,
    title: '24/7 Availability',
    description: 'Round-the-clock emergency services and critical care facilities'
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Multidisciplinary team of specialists working together for your health'
  },
  {
    icon: Stethoscope,
    title: 'Modern Equipment',
    description: 'State-of-the-art medical technology and advanced diagnostic tools'
  },
];

export default function ServicesPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="py-32 px-4 bg-gradient-to-br from-blue-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-6 px-6 py-2 text-base bg-blue-600">Our Services</Badge>
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Comprehensive Medical Services
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We offer a complete range of medical services with state-of-the-art facilities and experienced healthcare professionals dedicated to your wellbeing.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  variants={fadeInUp}
                  custom={index}
                >
                  <Card className="h-full hover:shadow-xl transition-all group border-2 hover:scale-105">
                    <CardHeader>
                      <div
                        className="mb-4 inline-block p-4 rounded-2xl group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: `${service.color}20` }}
                      >
                        <Icon className="h-10 w-10" style={{ color: service.color }} />
                      </div>
                      <CardTitle className="text-2xl mb-2 group-hover:text-blue-600 transition-colors">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-blue-600 flex-shrink-0" />
                            <span className="text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <Button
                        className="w-full group-hover:shadow-lg transition-all"
                        style={{ backgroundColor: service.color }}
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Book Appointment
                        <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Why Choose Our Services?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We are committed to providing exceptional healthcare services with compassion and excellence.
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="text-center p-6 h-full hover:shadow-lg transition-all hover:scale-105">
                    <div className="mb-4 flex justify-center">
                      <div className="p-4 rounded-2xl bg-blue-100 dark:bg-blue-900">
                        <Icon className="h-8 w-8 text-blue-600" />
                      </div>
                    </div>
                    <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 md:p-12 text-center border-2 border-blue-500 bg-gradient-to-br from-blue-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Book an appointment today and experience world-class healthcare services. Our team is ready to assist you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    <Calendar className="h-5 w-5 mr-2" />
                    Book Appointment
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline">
                    Contact Us
                    <ChevronRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
