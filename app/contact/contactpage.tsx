'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Building2,
  Calendar,
  MessageSquare,
  Ambulance
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+1 (555) 123-4567', '+1 (555) 123-4568'],
      color: '#10b981'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@medicare.com', 'support@medicare.com'],
      color: '#3b82f6'
    },
    {
      icon: MapPin,
      title: 'Address',
      details: ['123 Healthcare Boulevard', 'Medical District, NY 10001'],
      color: '#f59e0b'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: ['Mon - Fri: 8:00 AM - 8:00 PM', 'Sat - Sun: 9:00 AM - 5:00 PM'],
      color: '#8b5cf6'
    },
  ];

  const quickLinks = [
    {
      icon: Calendar,
      title: 'Book Appointment',
      description: 'Schedule a visit with our specialists',
      color: '#10b981'
    },
    {
      icon: Ambulance,
      title: 'Emergency',
      description: '24/7 emergency services available',
      color: '#dc2626'
    },
    {
      icon: MessageSquare,
      title: 'Patient Portal',
      description: 'Access your medical records online',
      color: '#3b82f6'
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="py-32 px-4 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-6 px-6 py-2 text-base bg-green-600">Get In Touch</Badge>
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Have questions? We&apos;re here to help. Reach out to us and we&apos;ll get back to you as soon as possible.
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
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {contactInfo.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="h-full text-center p-6 hover:shadow-xl transition-all hover:scale-105 border-2">
                    <div className="mb-4 flex justify-center">
                      <div className="p-4 rounded-2xl" style={{ backgroundColor: `${item.color}20` }}>
                        <Icon className="h-8 w-8" style={{ color: item.color }} />
                      </div>
                    </div>
                    <h3 className="font-bold text-xl mb-3">{item.title}</h3>
                    {item.details.map((detail, idx) => (
                      <p key={idx} className="text-sm text-muted-foreground mb-1">
                        {detail}
                      </p>
                    ))}
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full border-2">
                <CardHeader>
                  <CardTitle className="text-3xl">Send Us a Message</CardTitle>
                  <CardDescription className="text-base">
                    Fill out the form below and our team will get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {submitted ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="inline-block p-4 rounded-full bg-green-100 dark:bg-green-900 mb-4">
                        <CheckCircle2 className="h-16 w-16 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                      <p className="text-muted-foreground">
                        Thank you for contacting us. We&apos;ll get back to you soon.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="h-12"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="h-12"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            value={formData.phone}
                            onChange={handleChange}
                            className="h-12"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject *</Label>
                        <Select
                          value={formData.subject}
                          onValueChange={(value) => setFormData({ ...formData, subject: value })}
                          required
                        >
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="appointment">Book an Appointment</SelectItem>
                            <SelectItem value="inquiry">General Inquiry</SelectItem>
                            <SelectItem value="feedback">Feedback</SelectItem>
                            <SelectItem value="complaint">Complaint</SelectItem>
                            <SelectItem value="emergency">Emergency</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Tell us how we can help you..."
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={6}
                          className="resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        <Send className="h-5 w-5 mr-2" />
                        Send Message
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-2xl">Our Location</CardTitle>
                  <CardDescription>
                    Visit us at our main facility in the heart of the medical district
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
                      <div className="text-center p-8">
                        <MapPin className="h-16 w-16 mx-auto mb-4 text-green-600" />
                        <p className="text-lg font-semibold">Medicare Hospital</p>
                        <p className="text-sm text-muted-foreground">123 Healthcare Boulevard</p>
                        <p className="text-sm text-muted-foreground">Medical District, NY 10001</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <Building2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-sm">Main Building</p>
                        <p className="text-sm text-muted-foreground">
                          Ground Floor to 5th Floor - All Departments
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <Ambulance className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-sm">Emergency Entrance</p>
                        <p className="text-sm text-muted-foreground">
                          24/7 Access - East Side of Building
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-2xl">Quick Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {quickLinks.map((link, index) => {
                    const Icon = link.icon;
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-4 rounded-lg border-2 hover:shadow-lg transition-all cursor-pointer hover:scale-105"
                      >
                        <div className="p-3 rounded-xl" style={{ backgroundColor: `${link.color}20` }}>
                          <Icon className="h-6 w-6" style={{ color: link.color }} />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold">{link.title}</p>
                          <p className="text-sm text-muted-foreground">{link.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Emergency Services</h2>
            <p className="text-lg text-muted-foreground mb-6">
              For medical emergencies, please call our emergency hotline or visit our emergency department immediately.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-red-600 hover:bg-red-700">
                <Phone className="h-5 w-5 mr-2" />
                Call Emergency: 911
              </Button>
              <Button size="lg" variant="outline">
                <Ambulance className="h-5 w-5 mr-2" />
                Emergency Department
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
