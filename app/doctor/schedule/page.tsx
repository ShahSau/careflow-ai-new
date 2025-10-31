'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { RoleGuard } from '@/components/role-guard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import {
  Hospital,
  Bell,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  User,
  MapPin,
  Phone,
  Filter
} from 'lucide-react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function DoctorScheduleContent() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'day' | 'week' | 'month'>('week');

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
      status: 'confirmed',
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
      status: 'confirmed',
      location: 'Room 301',
      phone: '+1 (555) 123-4571',
      reason: 'New patient consultation'
    },
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-50 text-green-700 border-green-300';
      case 'waiting':
        return 'bg-yellow-50 text-yellow-700 border-yellow-300';
      case 'completed':
        return 'bg-blue-50 text-blue-700 border-blue-300';
      case 'cancelled':
        return 'bg-red-50 text-red-700 border-red-300';
      default:
        return '';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (view === 'day') {
      newDate.setDate(currentDate.getDate() + (direction === 'next' ? 1 : -1));
    } else if (view === 'week') {
      newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
    } else {
      newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1));
    }
    setCurrentDate(newDate);
  };

  const getWeekDates = () => {
    const week = [];
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      week.push(date);
    }
    return week;
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
          <div className="flex items-center gap-4 mb-6">
            <Link href="/doctor/dashboard">
              <Button variant="ghost" size="icon">
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">My Schedule</h1>
              <p className="text-muted-foreground text-lg">Manage your appointments and availability</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" onClick={() => navigateDate('prev')}>
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="min-w-[200px] text-center">
                <h2 className="text-xl font-semibold">{formatDate(currentDate)}</h2>
              </div>
              <Button variant="outline" size="icon" onClick={() => navigateDate('next')}>
                <ChevronRight className="h-5 w-5" />
              </Button>
              <Button variant="outline" onClick={() => setCurrentDate(new Date())}>
                Today
              </Button>
            </div>

            <Tabs value={view} onValueChange={(v) => setView(v as any)} className="w-auto">
              <TabsList>
                <TabsTrigger value="day">Day</TabsTrigger>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </motion.div>

        {view === 'day' && (
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-6 w-6 text-blue-600" />
                Daily Schedule
              </CardTitle>
              <CardDescription>Appointments for {formatDate(currentDate)}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {appointments
                  .filter(apt => apt.date === currentDate.toISOString().split('T')[0])
                  .map((appointment, index) => (
                    <motion.div
                      key={appointment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 rounded-lg border-2 hover:shadow-md transition-all"
                    >
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
                          <div className="grid grid-cols-2 gap-3 text-sm mb-3">
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
                            <Badge variant="outline">{appointment.type}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{appointment.reason}</p>
                          <div className="flex gap-2">
                            <Link href={`/doctor/patients/${appointment.patientId}`}>
                              <Button size="sm" variant="outline">View Patient</Button>
                            </Link>
                            <Button size="sm" variant="outline">Reschedule</Button>
                            <Button size="sm" variant="ghost" className="text-red-600">Cancel</Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                {appointments.filter(apt => apt.date === currentDate.toISOString().split('T')[0]).length === 0 && (
                  <div className="text-center py-12">
                    <CalendarIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">No appointments scheduled</h3>
                    <p className="text-muted-foreground">You have no appointments for this day</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {view === 'week' && (
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-6 w-6 text-blue-600" />
                Weekly Schedule
              </CardTitle>
              <CardDescription>Week view of your appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <div className="min-w-[800px]">
                  <div className="grid grid-cols-8 gap-2 mb-4">
                    <div className="text-sm font-medium"></div>
                    {getWeekDates().map((date, index) => (
                      <div key={index} className="text-center p-2 rounded-lg bg-muted">
                        <div className="text-xs text-muted-foreground">{weekDays[date.getDay()]}</div>
                        <div className="text-lg font-semibold">{date.getDate()}</div>
                      </div>
                    ))}
                  </div>
                  {timeSlots.map((time) => (
                    <div key={time} className="grid grid-cols-8 gap-2 mb-2">
                      <div className="text-sm text-muted-foreground py-2">{time}</div>
                      {getWeekDates().map((date, index) => {
                        const dayAppointments = appointments.filter(apt => {
                          const aptDate = new Date(apt.date);
                          return aptDate.toDateString() === date.toDateString() &&
                                 apt.time.includes(time.split(':')[0]);
                        });

                        return (
                          <div key={index} className="min-h-[60px] p-1">
                            {dayAppointments.map((apt) => (
                              <div
                                key={apt.id}
                                className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900 border border-blue-300 text-xs mb-1 cursor-pointer hover:shadow-md transition-all"
                              >
                                <div className="font-semibold truncate">{apt.patient}</div>
                                <div className="text-muted-foreground truncate">{apt.type}</div>
                              </div>
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {view === 'month' && (
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-6 w-6 text-blue-600" />
                Monthly Schedule
              </CardTitle>
              <CardDescription>Month view of your appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {weekDays.map((day) => (
                  <div key={day} className="text-center p-2 font-semibold text-sm">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 35 }, (_, i) => {
                  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
                  const startingDayOfWeek = firstDay.getDay();
                  const dayNumber = i - startingDayOfWeek + 1;
                  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

                  if (dayNumber > 0 && dayNumber <= daysInMonth) {
                    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), dayNumber);
                    const dateString = date.toISOString().split('T')[0];
                    const dayAppointments = appointments.filter(apt => apt.date === dateString);

                    return (
                      <div
                        key={i}
                        className="min-h-[100px] p-2 border-2 rounded-lg hover:shadow-md transition-all cursor-pointer"
                      >
                        <div className="font-semibold text-sm mb-1">{dayNumber}</div>
                        <div className="space-y-1">
                          {dayAppointments.slice(0, 2).map((apt) => (
                            <div
                              key={apt.id}
                              className="text-xs p-1 rounded bg-blue-100 dark:bg-blue-900 truncate"
                            >
                              {apt.time.split(' ')[0]} {apt.patient.split(' ')[0]}
                            </div>
                          ))}
                          {dayAppointments.length > 2 && (
                            <div className="text-xs text-muted-foreground">
                              +{dayAppointments.length - 2} more
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  }
                  return <div key={i} className="min-h-[100px] p-2 bg-muted/30" />;
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default function DoctorSchedule() {
  return (
    <RoleGuard allowedRole="doctor">
      <DoctorScheduleContent />
    </RoleGuard>
  );
}
