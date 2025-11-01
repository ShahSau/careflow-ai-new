'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Hospital,
  Users,
  Stethoscope,
  Calendar,
  Settings,
  Bell,
  UserPlus,
  Building2,
  Bed,
  Package,
  DollarSign,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Clock,
  Activity,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { RoleGuard } from '@/components/role-guard';
import Link from 'next/link';

function AdminDashboardContent() {
  const router = useRouter();
  const { user, logout } = useAuth();

  if (!user) return null;

  const stats = [
    { label: 'Total Patients', value: '2,847', change: '+12.5%', trend: 'up', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active Doctors', value: '156', change: '+3.2%', trend: 'up', icon: Stethoscope, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Appointments Today', value: '89', change: '-5.1%', trend: 'down', icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Revenue (MTD)', value: '$284,500', change: '+18.3%', trend: 'up', icon: DollarSign, color: 'text-blue-600', bg: 'bg-blue-50' },
  ];

  const quickStats = [
    { label: 'Available Beds', value: '45/120', icon: Bed, color: 'text-orange-600' },
    { label: 'Staff On Duty', value: '234', icon: UserPlus, color: 'text-indigo-600' },
    { label: 'Pending Bills', value: '67', icon: DollarSign, color: 'text-red-600' },
    { label: 'Low Stock Items', value: '12', icon: Package, color: 'text-yellow-600' },
  ];

  const recentActivities = [
    { type: 'patient', message: 'New patient registration: John Doe', time: '5 min ago', icon: UserPlus },
    { type: 'appointment', message: 'Appointment confirmed for Jane Smith', time: '12 min ago', icon: CheckCircle2 },
    { type: 'billing', message: 'Payment received: $2,450', time: '23 min ago', icon: DollarSign },
    { type: 'alert', message: 'Low stock alert: Surgical masks', time: '1 hour ago', icon: AlertCircle },
  ];

  const managementCards = [
    { title: 'Patient Management', desc: 'View, edit, and search patients', icon: Users, href: '/admin/patients', color: 'bg-blue-600' },
    { title: 'Doctor Management', desc: 'Manage doctor profiles and schedules', icon: Stethoscope, href: '/admin/doctors', color: 'bg-blue-600' },
    { title: 'Appointments', desc: 'View and reschedule appointments', icon: Calendar, href: '/admin/appointments', color: 'bg-purple-600' },
    { title: 'Departments', desc: 'Add and edit departments', icon: Building2, href: '/admin/departments', color: 'bg-indigo-600' },
    { title: 'Staff Management', desc: 'Manage nurses and admin staff', icon: UserPlus, href: '/admin/staff', color: 'bg-pink-600' },
    { title: 'Room & Beds', desc: 'Track room and bed availability', icon: Bed, href: '/admin/rooms', color: 'bg-orange-600' },
    { title: 'Inventory', desc: 'Medical supplies and equipment', icon: Package, href: '/admin/inventory', color: 'bg-cyan-600' },
    { title: 'Billing', desc: 'Generate bills and track payments', icon: DollarSign, href: '/admin/billing', color: 'bg-blue-600' },
    { title: 'Reports & Analytics', desc: 'Revenue and patient statistics', icon: BarChart3, href: '/admin/reports', color: 'bg-violet-600' },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <nav className="bg-white dark:bg-gray-900 border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
              <Hospital className="h-8 w-8 text-violet-600" />
              <span className="text-2xl font-bold">MediCare Admin</span>
            </Link>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon"><Bell className="h-5 w-5" /></Button>
              <Button variant="ghost" size="icon"><Settings className="h-5 w-5" /></Button>
              <Button onClick={logout} variant="outline">Logout</Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground text-lg">System overview and management</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                <Card className="border-2">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl ${stat.bg}`}>
                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                      <Badge variant="outline" className={stat.trend === 'up' ? 'bg-blue-50 text-blue-700' : 'bg-red-50 text-red-700'}>
                        {stat.trend === 'up' ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                        {stat.change}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <h3 className="text-3xl font-bold">{stat.value}</h3>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-4 gap-4 mb-8">
            {quickStats.map((stat, index) => (
              <Card key={index} className="border-2">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    <div>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                      <p className="text-xl font-bold">{stat.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Management Center</CardTitle>
                  <CardDescription>Access all system management tools</CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-3 gap-4">
                  {managementCards.map((card, index) => (
                    <Link key={index} href={card.href}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="p-4 rounded-lg border-2 hover:border-violet-300 hover:shadow-md transition-all cursor-pointer"
                      >
                        <div className={`p-3 rounded-lg ${card.color} w-fit mb-3`}>
                          <card.icon className="h-6 w-6 text-white" />
                        </div>
                        <h4 className="font-semibold mb-1">{card.title}</h4>
                        <p className="text-xs text-muted-foreground">{card.desc}</p>
                      </motion.div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Recent Activities
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0">
                      <div className="p-2 rounded-lg bg-muted">
                        <activity.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.message}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <Clock className="h-3 w-3" />
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-blue-600 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  System Status: Healthy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Server Status</span>
                    <Badge className="bg-blue-100 text-blue-700">Online</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Database</span>
                    <Badge className="bg-blue-100 text-blue-700">Connected</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Backup Status</span>
                    <Badge className="bg-blue-100 text-blue-700">Up to date</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle>Today's Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Total Appointments</span>
                  <span className="font-bold">89</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Completed</span>
                  <span className="font-bold text-blue-600">54</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Pending</span>
                  <span className="font-bold text-yellow-600">28</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Cancelled</span>
                  <span className="font-bold text-red-600">7</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/admin/patients">
                  <Button variant="outline" className="w-full justify-between">
                    Add New Patient
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/admin/doctors">
                  <Button variant="outline" className="w-full justify-between">
                    Add New Doctor
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/admin/reports">
                  <Button variant="outline" className="w-full justify-between">
                    View Reports
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <RoleGuard allowedRole="admin">
      <AdminDashboardContent />
    </RoleGuard>
  );
}
