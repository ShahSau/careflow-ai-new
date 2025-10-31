'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { RoleGuard } from '@/components/role-guard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { Hospital, Bell, ChevronLeft, Search, Calendar, Clock, User, MapPin, Phone, Filter } from 'lucide-react';
import Link from 'next/link';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function AppointmentsContent() {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  if (!user) return null;

  const appointments = [
    {
      id: 1,
      patient: 'John Doe',
      patientId: 'PT12345',
      date: '2025-10-31',
      time: '9:00 AM',
      duration: '30 min',
      type: 'Check-up',
      status: 'confirmed',
      location: 'Room 301',
      phone: '+1 (555) 123-4567',
      reason: 'Regular health check-up'
    },
    {
      id: 2,
      patient: 'Jane Smith',
      patientId: 'PT12346',
      date: '2025-10-31',
      time: '10:00 AM',
      duration: '20 min',
      type: 'Follow-up',
      status: 'confirmed',
      location: 'Room 301',
      phone: '+1 (555) 123-4568',
      reason: 'Follow-up on medication'
    },
    {
      id: 3,
      patient: 'Robert Johnson',
      patientId: 'PT12347',
      date: '2025-10-31',
      time: '11:00 AM',
      duration: '30 min',
      type: 'Consultation',
      status: 'waiting',
      location: 'Room 301',
      phone: '+1 (555) 123-4569',
      reason: 'Chest pain consultation'
    },
    {
      id: 4,
      patient: 'Emily Davis',
      patientId: 'PT12348',
      date: '2025-11-01',
      time: '9:30 AM',
      duration: '15 min',
      type: 'Review',
      status: 'upcoming',
      location: 'Room 301',
      phone: '+1 (555) 123-4570',
      reason: 'Lab results review'
    },
    {
      id: 5,
      patient: 'Michael Brown',
      patientId: 'PT12349',
      date: '2025-11-01',
      time: '2:00 PM',
      duration: '45 min',
      type: 'Initial Consultation',
      status: 'upcoming',
      location: 'Room 301',
      phone: '+1 (555) 123-4571',
      reason: 'New patient consultation'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-50 text-green-700 border-green-300';
      case 'waiting':
        return 'bg-yellow-50 text-yellow-700 border-yellow-300';
      case 'upcoming':
        return 'bg-blue-50 text-blue-700 border-blue-300';
      case 'completed':
        return 'bg-gray-50 text-gray-700 border-gray-300';
      case 'cancelled':
        return 'bg-red-50 text-red-700 border-red-300';
      default:
        return '';
    }
  };

  const filtered = appointments.filter(apt =>
    (apt.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
     apt.patientId.includes(searchQuery)) &&
    (filterStatus === 'all' || apt.status === filterStatus)
  );

  const upcomingAppointments = filtered.filter(apt => apt.status === 'upcoming');
  const confirmedAppointments = filtered.filter(apt => apt.status === 'confirmed' || apt.status === 'waiting');
  const completedAppointments = filtered.filter(apt => apt.status === 'completed');

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
              <Button variant="ghost" size="icon"><Bell className="h-5 w-5" /></Button>
              <Button onClick={logout} variant="outline">Logout</Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/doctor/dashboard">
            <Button variant="ghost" size="icon"><ChevronLeft className="h-5 w-5" /></Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">Appointments</h1>
            <p className="text-muted-foreground text-lg">Manage all your appointments</p>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by patient name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-48 h-12">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="waiting">Waiting</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming ({upcomingAppointments.length})</TabsTrigger>
            <TabsTrigger value="confirmed">Today ({confirmedAppointments.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedAppointments.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            <div className="space-y-4">
              {upcomingAppointments.map((appointment, index) => (
                <motion.div
                  key={appointment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="border-2 hover:shadow-lg transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
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
                          <div className="grid md:grid-cols-2 gap-3 text-sm mb-3">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-blue-600" />
                              <span>{appointment.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-blue-600" />
                              <span>{appointment.time} ({appointment.duration})</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-blue-600" />
                              <span>{appointment.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-blue-600" />
                              <span>{appointment.phone}</span>
                            </div>
                          </div>
                          <div className="mb-3">
                            <Badge variant="outline">{appointment.type}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{appointment.reason}</p>
                          <div className="flex gap-2">
                            <Link href={`/doctor/patients/${appointment.patientId}`}>
                              <Button size="sm" variant="outline">View Patient</Button>
                            </Link>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              Confirm Appointment
                            </Button>
                            <Button size="sm" variant="outline">Reschedule</Button>
                            <Button size="sm" variant="ghost" className="text-red-600">Cancel</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
              {upcomingAppointments.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">No upcoming appointments</h3>
                    <p className="text-muted-foreground">All appointments are confirmed or completed</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="confirmed">
            <div className="space-y-4">
              {confirmedAppointments.map((appointment, index) => (
                <motion.div
                  key={appointment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="border-2 hover:shadow-lg transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
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
                          <div className="grid md:grid-cols-2 gap-3 text-sm mb-3">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-blue-600" />
                              <span>{appointment.time} ({appointment.duration})</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-blue-600" />
                              <span>{appointment.location}</span>
                            </div>
                          </div>
                          <div className="mb-3">
                            <Badge variant="outline">{appointment.type}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{appointment.reason}</p>
                          <div className="flex gap-2">
                            <Link href={`/doctor/patients/${appointment.patientId}`}>
                              <Button size="sm" variant="outline">View Patient</Button>
                            </Link>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                              Start Consultation
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
              {confirmedAppointments.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">No appointments today</h3>
                    <p className="text-muted-foreground">You have no confirmed appointments for today</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <Card>
              <CardContent className="p-12 text-center">
                <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No completed appointments</h3>
                <p className="text-muted-foreground">Completed appointments will appear here</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default function Appointments() {
  return <RoleGuard allowedRole="doctor"><AppointmentsContent /></RoleGuard>;
}
