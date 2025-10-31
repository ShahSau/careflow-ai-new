'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Heart,
  Brain,
  Bone,
  Baby,
  Scan,
  Ambulance,
  Activity,
  ArrowRight,
  Phone,
  Mail,
  Building2
} from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { departments } from '@/data';

const iconMap: Record<string, React.ReactNode> = {
  Heart: <Heart className="h-10 w-10" />,
  Brain: <Brain className="h-10 w-10" />,
  Bone: <Bone className="h-10 w-10" />,
  Baby: <Baby className="h-10 w-10" />,
  Scan: <Scan className="h-10 w-10" />,
  Ambulance: <Ambulance className="h-10 w-10" />,
  Activity: <Activity className="h-10 w-10" />,
};

export default function DepartmentsPage() {
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navbar />

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block p-4 bg-green-100 rounded-full mb-6">
              <Building2 className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Our <span className="text-green-500">Medical Departments</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Explore our comprehensive range of specialized medical departments, each staffed with expert physicians
              and equipped with state-of-the-art facilities to provide you with the best possible care.
            </p>
          </motion.div>

          <motion.div
            variants={staggerChildren}
            initial="initial"
            animate="animate"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          >
            {departments.map((dept, index) => (
              <motion.div key={dept.id} variants={fadeInUp}>
                <Link href={`/department/${dept.slug}`}>
                  <Card className="h-full border-2 hover:border-green-500 transition-all hover:shadow-2xl group cursor-pointer overflow-hidden">
                    <div
                      className="h-2"
                      style={{ backgroundColor: dept.color }}
                    />
                    <CardHeader className="pb-4">
                      <div
                        className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                        style={{
                          backgroundColor: `${dept.color}15`,
                          color: dept.color
                        }}
                      >
                        {iconMap[dept.icon] || iconMap.Activity}
                      </div>
                      <CardTitle className="text-2xl mb-2 group-hover:text-green-600 transition-colors">
                        {dept.name}
                      </CardTitle>
                      <CardDescription className="text-base leading-relaxed min-h-[60px]">
                        {dept.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="truncate">{dept.contact_phone}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Mail className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="truncate">{dept.contact_email}</span>
                      </div>
                      <Button
                        className="w-full mt-4 bg-green-500 hover:bg-green-600 group-hover:shadow-lg transition-all"
                      >
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-green-50 to-white">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-12 shadow-xl border-2 border-green-100 text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Need Help Choosing a Department?
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Our patient care coordinators are available to help you find the right specialist
              for your healthcare needs. Contact us for personalized assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#contact">
                <Button size="lg" className="bg-green-500 hover:bg-green-600">
                  <Phone className="mr-2 h-5 w-5" />
                  Contact Us
                </Button>
              </Link>
              <Link href="/register">
                <Button size="lg" variant="outline" className="border-green-500 text-green-600 hover:bg-green-50">
                  Book Appointment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
