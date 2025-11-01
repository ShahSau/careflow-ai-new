'use client';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
import {
  Heart,
  Brain,
  Bone,
  Baby,
  Scan,
  Ambulance,
  Activity,
  Mail,
  Phone,
  Calendar,
  Award,
  CheckCircle2,
  User,
  Clock,
  Stethoscope,
  Users,
  Building2,
  Shield,
  Star,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { departments, doctors } from '@/data';

const iconMap: Record<string, React.ReactNode> = {
  Heart: <Heart className="h-20 w-20" />,
  Brain: <Brain className="h-20 w-20" />,
  Bone: <Bone className="h-20 w-20" />,
  Baby: <Baby className="h-20 w-20" />,
  Scan: <Scan className="h-20 w-20" />,
  Ambulance: <Ambulance className="h-20 w-20" />,
  Activity: <Activity className="h-20 w-20" />,
};

export default function DepartmentDetailPage({ params }: { params: { name: string } }) {
  const slug = params.name;

  const department = departments.find(d => d.slug === slug) || null;
  const departmentDoctors = department ? doctors.filter(d => d.department_id === department.id) : [];
  const headDoctor = department && department.head_doctor_id
    ? departmentDoctors.find(d => d.id === department.head_doctor_id) || null
    : null;

  if (!department) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <section className="py-20 px-4 pt-32">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Department Not Found</h1>
            <p className="text-muted-foreground mb-8">The department you are looking for does not exist.</p>
            <Link href="/departments">
              <Button>View All Departments</Button>
            </Link>
          </div>
        </section>
      </div>
    );
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div
        className="relative py-32 px-4 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${department.color}15 0%, ${department.color}05 100%)`
        }}
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-10" style={{ color: department.color }}>
            {iconMap[department.icon] || iconMap.Activity}
          </div>
          <div className="absolute bottom-10 left-10 opacity-50" style={{ color: department.color }}>
            {iconMap[department.icon] || iconMap.Activity}
          </div>
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="inline-block p-6 rounded-3xl mb-6 shadow-lg bg-white dark:bg-gray-800"
              style={{ boxShadow: `0 10px 40px ${department.color}30` }}
            >
              <div style={{ color: department.color }}>
                {iconMap[department.icon] || iconMap.Activity}
              </div>
            </motion.div>

            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              {department.name}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {department.description}
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <Badge
                variant="outline"
                className="px-6 py-3 text-base border-2 hover:scale-105 transition-transform cursor-pointer"
                style={{ borderColor: department.color, color: department.color }}
              >
                <Mail className="h-5 w-5 mr-2" />
                {department.contact_email}
              </Badge>
              <Badge
                variant="outline"
                className="px-6 py-3 text-base border-2 hover:scale-105 transition-transform cursor-pointer"
                style={{ borderColor: department.color, color: department.color }}
              >
                <Phone className="h-5 w-5 mr-2" />
                {department.contact_phone}
              </Badge>
            </div>
          </motion.div>
        </div>
      </div>

      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          >
            <motion.div variants={fadeInUp}>
              <Card className="text-center p-6 h-full border-2 hover:shadow-lg transition-all hover:scale-105">
                <div className="mb-4 flex justify-center" style={{ color: department.color }}>
                  <Users className="h-12 w-12" />
                </div>
                <h3 className="font-bold text-2xl mb-2">{departmentDoctors.length}</h3>
                <p className="text-sm text-muted-foreground">Expert Doctors</p>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="text-center p-6 h-full border-2 hover:shadow-lg transition-all hover:scale-105">
                <div className="mb-4 flex justify-center" style={{ color: department.color }}>
                  <Clock className="h-12 w-12" />
                </div>
                <h3 className="font-bold text-2xl mb-2">24/7</h3>
                <p className="text-sm text-muted-foreground">Emergency Care</p>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="text-center p-6 h-full border-2 hover:shadow-lg transition-all hover:scale-105">
                <div className="mb-4 flex justify-center" style={{ color: department.color }}>
                  <Star className="h-12 w-12" />
                </div>
                <h3 className="font-bold text-2xl mb-2">4.9/5</h3>
                <p className="text-sm text-muted-foreground">Patient Rating</p>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="text-center p-6 h-full border-2 hover:shadow-lg transition-all hover:scale-105">
                <div className="mb-4 flex justify-center" style={{ color: department.color }}>
                  <Building2 className="h-12 w-12" />
                </div>
                <h3 className="font-bold text-2xl mb-2">Modern</h3>
                <p className="text-sm text-muted-foreground">Facilities</p>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-4xl font-bold mb-8 text-center">Services We Offer</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 hover:shadow-lg transition-all border-l-4" style={{ borderLeftColor: department.color }}>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: `${department.color}20`, color: department.color }}>
                    <Stethoscope className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">Comprehensive Diagnosis</h3>
                    <p className="text-muted-foreground text-sm">
                      Advanced diagnostic services using state-of-the-art equipment and latest medical techniques.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-all border-l-4" style={{ borderLeftColor: department.color }}>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: `${department.color}20`, color: department.color }}>
                    <Shield className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">Preventive Care</h3>
                    <p className="text-muted-foreground text-sm">
                      Regular health screenings and preventive programs to maintain optimal health.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-all border-l-4" style={{ borderLeftColor: department.color }}>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: `${department.color}20`, color: department.color }}>
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">Treatment Plans</h3>
                    <p className="text-muted-foreground text-sm">
                      Personalized treatment strategies tailored to each patient&apos;s unique needs.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-all border-l-4" style={{ borderLeftColor: department.color }}>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: `${department.color}20`, color: department.color }}>
                    <Users className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">Follow-up Care</h3>
                    <p className="text-muted-foreground text-sm">
                      Continuous monitoring and support throughout your recovery journey.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {headDoctor && (
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold mb-8 text-center">Department Leadership</h2>
              <Card className="overflow-hidden border-2 hover:shadow-2xl transition-all" style={{ borderColor: department.color }}>
                <div className="grid md:grid-cols-[300px_1fr] gap-0">
                  <div
                    className="p-8 flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${department.color}20 0%, ${department.color}10 100%)` }}
                  >
                    <Avatar className="h-48 w-48 border-4 shadow-xl" style={{ borderColor: department.color }}>
                      <AvatarFallback className="text-5xl" style={{ backgroundColor: `${department.color}30`, color: department.color }}>
                        {headDoctor.first_name[0]}{headDoctor.last_name[0]}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  <CardContent className="p-8">
                    <Badge className="mb-4" style={{ backgroundColor: department.color }}>
                      Department Head
                    </Badge>
                    <h3 className="text-3xl font-bold mb-2">
                      Dr. {headDoctor.first_name} {headDoctor.last_name}
                    </h3>
                    <p className="text-xl font-semibold mb-4" style={{ color: department.color }}>
                      {headDoctor.specialization}
                    </p>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {headDoctor.bio}
                    </p>

                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                        <Award className="h-5 w-5 flex-shrink-0" style={{ color: department.color }} />
                        <div className="min-w-0">
                          <p className="text-xs text-muted-foreground">Qualification</p>
                          <p className="font-semibold text-sm truncate">{headDoctor.qualification}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                        <CheckCircle2 className="h-5 w-5 flex-shrink-0" style={{ color: department.color }} />
                        <div>
                          <p className="text-xs text-muted-foreground">Experience</p>
                          <p className="font-semibold text-sm">{headDoctor.experience_years} Years</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                        <Mail className="h-5 w-5 flex-shrink-0" style={{ color: department.color }} />
                        <div className="min-w-0">
                          <p className="text-xs text-muted-foreground">Email</p>
                          <p className="font-semibold text-sm truncate">{headDoctor.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                        <Phone className="h-5 w-5 flex-shrink-0" style={{ color: department.color }} />
                        <div>
                          <p className="text-xs text-muted-foreground">Phone</p>
                          <p className="font-semibold text-sm">{headDoctor.phone}</p>
                        </div>
                      </div>
                    </div>

                    <Button
                      size="lg"
                      className="w-full md:w-auto"
                      style={{ backgroundColor: department.color }}
                    >
                      <Calendar className="h-5 w-5 mr-2" />
                      Book Consultation
                    </Button>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      )}

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Our Medical Team</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Meet our team of highly qualified specialists dedicated to your health and wellbeing.
              </p>
            </div>

            {departmentDoctors.length === 0 ? (
              <Card className="p-12 text-center">
                <User className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No doctors available in this department at the moment.</p>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {departmentDoctors.map((doctor, index) => (
                  <motion.div
                    key={doctor.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-xl transition-all group border-2 hover:border-blue-500">
                      <CardHeader className="pb-4">
                        <div className="flex items-start gap-4 mb-4">
                          <Avatar className="h-20 w-20 border-2 group-hover:border-blue-500 transition-colors">
                            <AvatarFallback className="text-xl bg-blue-100 text-blue-700">
                              {doctor.first_name[0]}{doctor.last_name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <CardTitle className="text-xl mb-1 group-hover:text-blue-600 transition-colors">
                              Dr. {doctor.first_name} {doctor.last_name}
                            </CardTitle>
                            <CardDescription className="font-semibold text-blue-600 mb-2">
                              {doctor.specialization}
                            </CardDescription>
                            {doctor.is_available ? (
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Available
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">
                                Not Available
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                          {doctor.bio}
                        </p>

                        <div className="space-y-2.5">
                          <div className="flex items-center gap-2 text-sm p-2 rounded bg-muted/50">
                            <Award className="h-4 w-4 flex-shrink-0 text-blue-600" />
                            <span className="line-clamp-1 text-muted-foreground">{doctor.qualification}</span>
                          </div>

                          <div className="flex items-center gap-2 text-sm p-2 rounded bg-muted/50">
                            <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-blue-600" />
                            <span className="text-muted-foreground">{doctor.experience_years} years experience</span>
                          </div>

                          <div className="flex items-center gap-2 text-sm p-2 rounded bg-muted/50">
                            <Mail className="h-4 w-4 flex-shrink-0 text-blue-600" />
                            <span className="line-clamp-1 text-muted-foreground">{doctor.email}</span>
                          </div>

                          <div className="flex items-center gap-2 text-sm p-2 rounded bg-muted/50">
                            <Phone className="h-4 w-4 flex-shrink-0 text-blue-600" />
                            <span className="text-muted-foreground">{doctor.phone}</span>
                          </div>
                        </div>

                        <Button className="w-full bg-blue-600 hover:bg-blue-700 group-hover:shadow-lg transition-all">
                          <Calendar className="h-4 w-4 mr-2" />
                          Book Appointment
                          <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
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
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Need to Visit Another Department?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explore our other specialized medical departments and find the right care for your needs.
            </p>
            <Link href="/departments">
              <Button variant="outline" size="lg" className="group">
                <Building2 className="h-5 w-5 mr-2" />
                View All Departments
                <ChevronRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
