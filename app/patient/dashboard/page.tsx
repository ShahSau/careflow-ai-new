'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
import {
  Hospital,
  Calendar,
  FileText,
  Activity,
  Bell,
  Settings,
  Clock,
  CheckCircle2,
  Stethoscope,
  Pill,
  Heart,
  TrendingUp,
  Download,
  Plus,
  ChevronRight,
  CalendarClock,
  FileCheck,
  CreditCard,
  DollarSign
} from 'lucide-react';
import Link from 'next/link';

export default function PatientDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== 'patient') {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) return null;

  const upcomingAppointments = [
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      date: '2025-11-05',
      time: '10:00 AM',
      type: 'Check-up',
      status: 'confirmed'
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      specialty: 'General Medicine',
      date: '2025-11-12',
      time: '2:30 PM',
      type: 'Follow-up',
      status: 'pending'
    },
  ];

  const recentTests = [
    {
      id: 1,
      name: 'Blood Test - Complete Blood Count',
      date: '2025-10-25',
      status: 'completed',
      result: 'Normal'
    },
    {
      id: 2,
      name: 'X-Ray - Chest',
      date: '2025-10-20',
      status: 'completed',
      result: 'Normal'
    },
    {
      id: 3,
      name: 'ECG',
      date: '2025-10-28',
      status: 'pending',
      result: null
    },
  ];

  const prescriptions = [
    {
      id: 1,
      medication: 'Lisinopril 10mg',
      doctor: 'Dr. Sarah Johnson',
      dosage: 'Once daily',
      duration: '30 days',
      refills: 2,
      status: 'active'
    },
    {
      id: 2,
      medication: 'Metformin 500mg',
      doctor: 'Dr. Michael Chen',
      dosage: 'Twice daily',
      duration: '60 days',
      refills: 1,
      status: 'active'
    },
  ];

  const healthMetrics = [
    {
      icon: Heart,
      label: 'Blood Pressure',
      value: '120/80',
      unit: 'mmHg',
      status: 'normal',
      color: '#10b981'
    },
    {
      icon: Activity,
      label: 'Heart Rate',
      value: '72',
      unit: 'bpm',
      status: 'normal',
      color: '#3b82f6'
    },
    {
      icon: TrendingUp,
      label: 'Blood Sugar',
      value: '95',
      unit: 'mg/dL',
      status: 'normal',
      color: '#8b5cf6'
    },
    {
      icon: Activity,
      label: 'Temperature',
      value: '98.6',
      unit: '°F',
      status: 'normal',
      color: '#f59e0b'
    },
  ];

  const recentActivity = [
    { icon: Calendar, text: 'Appointment booked with Dr. Sarah Johnson', time: '2 hours ago' },
    { icon: FileText, text: 'Lab results uploaded - Blood Test', time: '1 day ago' },
    { icon: Pill, text: 'Prescription refilled - Lisinopril', time: '3 days ago' },
    { icon: CheckCircle2, text: 'Health check-up completed', time: '5 days ago' },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <nav className="bg-white dark:bg-gray-900 border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
              <Hospital className="h-8 w-8 text-green-500" />
              <span className="text-2xl font-bold">MediCare</span>
            </Link>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button onClick={logout} variant="outline">Logout</Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">Welcome back, {user.firstName}!</h1>
              <p className="text-muted-foreground text-lg">Here&apos;s your health overview for today</p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/patient/appointments">
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-5 w-5 mr-2" />
                  Book Appointment
                </Button>
              </Link>
              <Button variant="outline">
                <Settings className="h-5 w-5 mr-2" />
                Settings
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-lg bg-white dark:bg-gray-900 border">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-xl bg-green-100 text-green-700">
                {user.firstName[0]}{user.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{user.firstName} {user.lastName}</h3>
              <p className="text-sm text-muted-foreground">Patient ID: PT{Math.floor(Math.random() * 100000)}</p>
            </div>
            <Badge className="bg-green-100 text-green-700 border-green-300">Active Patient</Badge>
          </div>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {healthMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card key={index} className="border-2 hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-xl" style={{ backgroundColor: `${metric.color}20` }}>
                      <Icon className="h-6 w-6" style={{ color: metric.color }} />
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
                      {metric.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
                  <p className="text-3xl font-bold">
                    {metric.value} <span className="text-lg text-muted-foreground">{metric.unit}</span>
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="lg:col-span-2"
          >
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Calendar className="h-6 w-6 text-green-600" />
                    Upcoming Appointments
                  </CardTitle>
                  <Link href="/patient/appointments">
                    <Button variant="ghost" size="sm">
                      View All
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </div>
                <CardDescription>Your scheduled appointments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-start gap-4 p-4 rounded-lg border-2 hover:shadow-md transition-all"
                  >
                    <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900">
                      <Stethoscope className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-lg">{appointment.doctor}</h4>
                          <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            appointment.status === 'confirmed'
                              ? 'bg-green-50 text-green-700 border-green-300'
                              : 'bg-yellow-50 text-yellow-700 border-yellow-300'
                          }
                        >
                          {appointment.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <CalendarClock className="h-4 w-4" />
                          {appointment.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {appointment.time}
                        </div>
                        <Badge variant="outline">{appointment.type}</Badge>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline">Reschedule</Button>
                        <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                <Link href="/patient/appointments">
                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Schedule New Appointment
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Activity className="h-5 w-5 text-green-600" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => {
                    const Icon = activity.icon;
                    return (
                      <div key={index} className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-muted">
                          <Icon className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{activity.text}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <FileText className="h-6 w-6 text-green-600" />
                    Lab Results
                  </CardTitle>
                  <Link href="/patient/lab-results">
                    <Button variant="ghost" size="sm">
                      View All
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </div>
                <CardDescription>Recent test results and reports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentTests.map((test) => (
                  <div
                    key={test.id}
                    className="flex items-center justify-between p-4 rounded-lg border hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${test.status === 'completed' ? 'bg-green-100 dark:bg-green-900' : 'bg-yellow-100 dark:bg-yellow-900'}`}>
                        <FileCheck className={`h-5 w-5 ${test.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}`} />
                      </div>
                      <div>
                        <p className="font-semibold">{test.name}</p>
                        <p className="text-sm text-muted-foreground">{test.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {test.result ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
                          {test.result}
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">
                          Pending
                        </Badge>
                      )}
                      {test.status === 'completed' && (
                        <Button variant="ghost" size="sm" className="mt-2">
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Pill className="h-6 w-6 text-green-600" />
                    Active Prescriptions
                  </CardTitle>
                  <Link href="/patient/prescriptions">
                    <Button variant="ghost" size="sm">
                      View All
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </div>
                <CardDescription>Your current medications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {prescriptions.map((prescription) => (
                  <div
                    key={prescription.id}
                    className="p-4 rounded-lg border hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-lg">{prescription.medication}</h4>
                        <p className="text-sm text-muted-foreground">Prescribed by {prescription.doctor}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-700 border-green-300">
                        {prescription.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {prescription.dosage}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4" />
                        {prescription.refills} refills left
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      Request Refill
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="mt-6"
        >
          <Card className="border-2 border-green-500 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-xl bg-green-100 dark:bg-green-900">
                    <CreditCard className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Billing & Payments</h3>
                    <p className="text-muted-foreground">View your bills and payment history</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground mb-1">Outstanding Balance</p>
                    <p className="text-2xl font-bold text-green-700">$475.00</p>
                  </div>
                  <Link href="/patient/billing">
                    <Button className="bg-green-600 hover:bg-green-700">
                      <DollarSign className="h-5 w-5 mr-2" />
                      View Billing
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
