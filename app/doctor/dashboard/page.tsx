'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { RoleGuard } from '@/components/role-guard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
import {
  Hospital,
  Calendar,
  Bell,
  Settings,
  Users,
  Clock,
  CheckCircle2,
  AlertCircle,
  ClipboardList,
  FileText,
  Activity,
  TrendingUp,
  ChevronRight,
  User,
  Pill,
  TestTube,
  CalendarClock,
  UserCheck,
  Stethoscope
} from 'lucide-react';
import Link from 'next/link';

function DoctorDashboardContent() {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) return null;

  const todayAppointments = [
    {
      id: 1,
      patient: 'John Doe',
      patientId: 'PT12345',
      time: '9:00 AM',
      type: 'Check-up',
      status: 'confirmed',
      duration: '30 min',
      reason: 'Regular health check-up'
    },
    {
      id: 2,
      patient: 'Jane Smith',
      patientId: 'PT12346',
      time: '10:00 AM',
      type: 'Follow-up',
      status: 'confirmed',
      duration: '20 min',
      reason: 'Follow-up on blood pressure medication'
    },
    {
      id: 3,
      patient: 'Robert Johnson',
      patientId: 'PT12347',
      time: '11:00 AM',
      type: 'Consultation',
      status: 'waiting',
      duration: '30 min',
      reason: 'Chest pain consultation'
    },
    {
      id: 4,
      patient: 'Emily Davis',
      patientId: 'PT12348',
      time: '2:00 PM',
      type: 'Review',
      status: 'upcoming',
      duration: '15 min',
      reason: 'Lab results review'
    },
  ];

  const patientQueue = [
    {
      id: 1,
      patient: 'Robert Johnson',
      patientId: 'PT12347',
      waitTime: '15 min',
      status: 'waiting',
      priority: 'normal'
    },
    {
      id: 2,
      patient: 'Michael Brown',
      patientId: 'PT12349',
      waitTime: '8 min',
      status: 'waiting',
      priority: 'urgent'
    },
  ];

  const stats = [
    {
      icon: Users,
      label: 'Total Patients',
      value: '142',
      change: '+12 this month',
      color: '#3b82f6'
    },
    {
      icon: Calendar,
      label: "Today's Appointments",
      value: '8',
      change: '4 completed',
      color: '#10b981'
    },
    {
      icon: Clock,
      label: 'Pending Reviews',
      value: '23',
      change: 'Lab results & prescriptions',
      color: '#f59e0b'
    },
    {
      icon: Activity,
      label: 'Patient Satisfaction',
      value: '4.8',
      change: 'Based on 95 reviews',
      color: '#8b5cf6'
    },
  ];

  const recentActivity = [
    { icon: FileText, text: 'Lab results uploaded for John Doe', time: '10 min ago' },
    { icon: Pill, text: 'Prescription created for Jane Smith', time: '45 min ago' },
    { icon: Calendar, text: 'Appointment scheduled with Emily Davis', time: '1 hour ago' },
    { icon: CheckCircle2, text: 'Health check-up completed', time: '2 hours ago' },
  ];

  const pendingTasks = [
    { id: 1, task: 'Review lab results for 5 patients', priority: 'high', dueTime: 'Today' },
    { id: 2, task: 'Complete patient notes from morning appointments', priority: 'medium', dueTime: 'Today' },
    { id: 3, task: 'Approve prescription refills (3 pending)', priority: 'medium', dueTime: 'Today' },
    { id: 4, task: 'Update availability for next week', priority: 'low', dueTime: 'This week' },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-50 text-green-700 border-green-300';
      case 'waiting':
        return 'bg-yellow-50 text-yellow-700 border-yellow-300';
      case 'upcoming':
        return 'bg-blue-50 text-blue-700 border-blue-300';
      default:
        return '';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-50 text-red-700 border-red-300';
      case 'high':
        return 'bg-orange-50 text-orange-700 border-orange-300';
      case 'medium':
        return 'bg-yellow-50 text-yellow-700 border-yellow-300';
      case 'low':
        return 'bg-blue-50 text-blue-700 border-blue-300';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <nav className="bg-white dark:bg-gray-900 border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
              <Hospital className="h-8 w-8 text-blue-600" />
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
              <h1 className="text-4xl font-bold mb-2">Welcome back, Dr. {user.name.split(' ').pop()}!</h1>
              <p className="text-muted-foreground text-lg">Here's your schedule for today</p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/doctor/schedule">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Calendar className="h-5 w-5 mr-2" />
                  View Schedule
                </Button>
              </Link>
              <Link href="/doctor/availability">
                <Button variant="outline">
                  <Settings className="h-5 w-5 mr-2" />
                  Availability
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-lg bg-white dark:bg-gray-900 border">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-xl bg-blue-100 text-blue-700">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{user.name}</h3>
              <p className="text-sm text-muted-foreground">Cardiology Specialist • MediCare Hospital</p>
            </div>
            <Badge className="bg-blue-100 text-blue-700 border-blue-300">On Duty</Badge>
          </div>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="border-2 hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-xl" style={{ backgroundColor: `${stat.color}20` }}>
                      <Icon className="h-6 w-6" style={{ color: stat.color }} />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold mb-1">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
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
                    <CalendarClock className="h-6 w-6 text-blue-600" />
                    Today's Appointments
                  </CardTitle>
                  <Link href="/doctor/schedule">
                    <Button variant="ghost" size="sm">
                      View All
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </div>
                <CardDescription>Your scheduled appointments for today</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {todayAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-start gap-4 p-4 rounded-lg border-2 hover:shadow-md transition-all"
                  >
                    <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-lg">{appointment.patient}</h4>
                          <p className="text-sm text-muted-foreground">{appointment.patientId}</p>
                        </div>
                        <Badge variant="outline" className={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {appointment.time}
                        </div>
                        <Badge variant="outline">{appointment.type}</Badge>
                        <span>{appointment.duration}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{appointment.reason}</p>
                      <div className="flex gap-2">
                        <Link href={`/doctor/patients/${appointment.patientId}`}>
                          <Button size="sm" variant="outline">View Patient</Button>
                        </Link>
                        {appointment.status === 'waiting' && (
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            Start Consultation
                          </Button>
                        )}
                      </div>
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
            className="space-y-6"
          >
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-blue-600" />
                  Patient Queue
                </CardTitle>
                <CardDescription>Patients waiting</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {patientQueue.map((patient) => (
                    <div
                      key={patient.id}
                      className="p-4 rounded-lg border-2 hover:shadow-md transition-all"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{patient.patient}</h4>
                          <p className="text-xs text-muted-foreground">{patient.patientId}</p>
                        </div>
                        <Badge variant="outline" className={getPriorityColor(patient.priority)}>
                          {patient.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>Waiting: {patient.waitTime}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-600" />
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
                          <Icon className="h-4 w-4 text-blue-600" />
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
                    <ClipboardList className="h-6 w-6 text-blue-600" />
                    Pending Tasks
                  </CardTitle>
                </div>
                <CardDescription>Tasks requiring your attention</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {pendingTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-4 rounded-lg border hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`w-2 h-2 rounded-full ${
                        task.priority === 'high' ? 'bg-red-500' :
                        task.priority === 'medium' ? 'bg-yellow-500' :
                        'bg-blue-500'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{task.task}</p>
                        <p className="text-xs text-muted-foreground">Due: {task.dueTime}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
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
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Stethoscope className="h-6 w-6 text-blue-600" />
                  Quick Actions
                </CardTitle>
                <CardDescription>Common tasks and actions</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3">
                <Link href="/doctor/patients">
                  <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                    <Users className="h-6 w-6" />
                    <span className="text-sm">Patient List</span>
                  </Button>
                </Link>
                <Link href="/doctor/lab-orders">
                  <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                    <TestTube className="h-6 w-6" />
                    <span className="text-sm">Lab Orders</span>
                  </Button>
                </Link>
                <Link href="/doctor/prescriptions">
                  <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                    <Pill className="h-6 w-6" />
                    <span className="text-sm">Prescriptions</span>
                  </Button>
                </Link>
                <Link href="/doctor/schedule">
                  <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                    <Calendar className="h-6 w-6" />
                    <span className="text-sm">My Schedule</span>
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function DoctorDashboard() {
  return (
    <RoleGuard allowedRole="doctor">
      <DoctorDashboardContent />
    </RoleGuard>
  );
}
