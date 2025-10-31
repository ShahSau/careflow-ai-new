'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { RoleGuard } from '@/components/role-guard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import {
  Hospital,
  Calendar,
  Bell,
  Search,
  Filter,
  Stethoscope,
  Clock,
  CalendarClock,
  Plus,
  ChevronLeft,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

function PatientAppointmentsPageContent() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    department: '',
    doctor: '',
    date: '',
    time: '',
    reason: ''
  });

  if (!user) return null;

  const allAppointments = [
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      date: '2025-11-05',
      time: '10:00 AM',
      type: 'Check-up',
      status: 'confirmed',
      location: 'Building A, Floor 3, Room 301',
      phone: '+1 (555) 123-4567',
      email: 'sarah.johnson@medicare.com',
      reason: 'Regular heart health check-up'
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      specialty: 'General Medicine',
      date: '2025-11-12',
      time: '2:30 PM',
      type: 'Follow-up',
      status: 'pending',
      location: 'Building B, Floor 2, Room 205',
      phone: '+1 (555) 123-4568',
      email: 'michael.chen@medicare.com',
      reason: 'Follow-up on blood test results'
    },
    {
      id: 3,
      doctor: 'Dr. Emily Rodriguez',
      specialty: 'Dermatology',
      date: '2025-11-20',
      time: '11:00 AM',
      type: 'Consultation',
      status: 'confirmed',
      location: 'Building A, Floor 2, Room 210',
      phone: '+1 (555) 123-4569',
      email: 'emily.rodriguez@medicare.com',
      reason: 'Skin condition consultation'
    },
    {
      id: 4,
      doctor: 'Dr. James Wilson',
      specialty: 'Orthopedics',
      date: '2025-10-28',
      time: '9:00 AM',
      type: 'Check-up',
      status: 'completed',
      location: 'Building C, Floor 1, Room 105',
      phone: '+1 (555) 123-4570',
      email: 'james.wilson@medicare.com',
      reason: 'Knee pain assessment'
    },
    {
      id: 5,
      doctor: 'Dr. Lisa Anderson',
      specialty: 'Ophthalmology',
      date: '2025-10-15',
      time: '3:00 PM',
      type: 'Eye Exam',
      status: 'completed',
      location: 'Building A, Floor 1, Room 110',
      phone: '+1 (555) 123-4571',
      email: 'lisa.anderson@medicare.com',
      reason: 'Annual eye examination'
    },
    {
      id: 6,
      doctor: 'Dr. Robert Martinez',
      specialty: 'ENT',
      date: '2025-10-05',
      time: '1:30 PM',
      type: 'Consultation',
      status: 'cancelled',
      location: 'Building B, Floor 3, Room 315',
      phone: '+1 (555) 123-4572',
      email: 'robert.martinez@medicare.com',
      reason: 'Hearing problem consultation'
    },
  ];

  const filteredAppointments = allAppointments.filter(apt => {
    const matchesSearch = apt.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         apt.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || apt.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDialogOpen(false);
    setFormData({ department: '', doctor: '', date: '', time: '', reason: '' });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'pending':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-blue-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-50 text-green-700 border-green-300';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-300';
      case 'cancelled':
        return 'bg-red-50 text-red-700 border-red-300';
      case 'completed':
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
          <div className="flex items-center gap-4 mb-6">
            <Link href="/patient/dashboard">
              <Button variant="ghost" size="icon">
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">My Appointments</h1>
              <p className="text-muted-foreground text-lg">Manage all your appointments in one place</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-5 w-5 mr-2" />
                  New Appointment
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl">Schedule New Appointment</DialogTitle>
                  <DialogDescription>
                    Fill in the details below to book your appointment
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department *</Label>
                    <Select
                      value={formData.department}
                      onValueChange={(value) => setFormData({ ...formData, department: value })}
                      required
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cardiology">Cardiology</SelectItem>
                        <SelectItem value="general">General Medicine</SelectItem>
                        <SelectItem value="dermatology">Dermatology</SelectItem>
                        <SelectItem value="orthopedics">Orthopedics</SelectItem>
                        <SelectItem value="ophthalmology">Ophthalmology</SelectItem>
                        <SelectItem value="ent">ENT</SelectItem>
                        <SelectItem value="pediatrics">Pediatrics</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="doctor">Preferred Doctor *</Label>
                    <Select
                      value={formData.doctor}
                      onValueChange={(value) => setFormData({ ...formData, doctor: value })}
                      required
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select doctor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dr-johnson">Dr. Sarah Johnson</SelectItem>
                        <SelectItem value="dr-chen">Dr. Michael Chen</SelectItem>
                        <SelectItem value="dr-rodriguez">Dr. Emily Rodriguez</SelectItem>
                        <SelectItem value="dr-wilson">Dr. James Wilson</SelectItem>
                        <SelectItem value="dr-anderson">Dr. Lisa Anderson</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Appointment Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        required
                        className="h-12"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="time">Preferred Time *</Label>
                      <Select
                        value={formData.time}
                        onValueChange={(value) => setFormData({ ...formData, time: value })}
                        required
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="09:00">9:00 AM</SelectItem>
                          <SelectItem value="10:00">10:00 AM</SelectItem>
                          <SelectItem value="11:00">11:00 AM</SelectItem>
                          <SelectItem value="14:00">2:00 PM</SelectItem>
                          <SelectItem value="15:00">3:00 PM</SelectItem>
                          <SelectItem value="16:00">4:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reason">Reason for Visit *</Label>
                    <Textarea
                      id="reason"
                      placeholder="Please describe the reason for your appointment..."
                      value={formData.reason}
                      onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                      required
                      rows={4}
                      className="resize-none"
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700 h-12">
                      <Calendar className="h-5 w-5 mr-2" />
                      Book Appointment
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                      className="h-12"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by doctor or specialty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="md:w-48 h-12">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        <div className="grid gap-6">
          {filteredAppointments.length === 0 ? (
            <Card className="p-12 text-center">
              <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No appointments found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery || filterStatus !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'You haven\'t scheduled any appointments yet'}
              </p>
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={() => setIsDialogOpen(true)}
              >
                <Plus className="h-5 w-5 mr-2" />
                Schedule Your First Appointment
              </Button>
            </Card>
          ) : (
            filteredAppointments.map((appointment, index) => (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="border-2 hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="p-4 rounded-xl bg-green-100 dark:bg-green-900">
                          <Stethoscope className="h-8 w-8 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-2xl font-bold mb-1">{appointment.doctor}</h3>
                              <p className="text-muted-foreground">{appointment.specialty}</p>
                            </div>
                            <Badge variant="outline" className={getStatusColor(appointment.status)}>
                              <span className="flex items-center gap-1">
                                {getStatusIcon(appointment.status)}
                                {appointment.status}
                              </span>
                            </Badge>
                          </div>

                          <div className="grid md:grid-cols-2 gap-3 mb-4">
                            <div className="flex items-center gap-2 text-sm">
                              <CalendarClock className="h-4 w-4 text-green-600" />
                              <span className="font-medium">{appointment.date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="h-4 w-4 text-green-600" />
                              <span className="font-medium">{appointment.time}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="h-4 w-4 text-green-600" />
                              <span className="text-muted-foreground">{appointment.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Badge variant="outline">{appointment.type}</Badge>
                            </div>
                          </div>

                          <div className="p-3 rounded-lg bg-muted/50 mb-4">
                            <p className="text-sm font-medium mb-1">Reason for visit:</p>
                            <p className="text-sm text-muted-foreground">{appointment.reason}</p>
                          </div>

                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4" />
                              <span>{appointment.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4" />
                              <span>{appointment.email}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex lg:flex-col gap-2 lg:w-40">
                        {appointment.status === 'confirmed' || appointment.status === 'pending' ? (
                          <>
                            <Button variant="outline" className="flex-1 lg:w-full">
                              Reschedule
                            </Button>
                            <Button variant="ghost" className="flex-1 lg:w-full text-red-600 hover:text-red-700 hover:bg-red-50">
                              Cancel
                            </Button>
                          </>
                        ) : appointment.status === 'completed' ? (
                          <Button variant="outline" className="flex-1 lg:w-full">
                            View Details
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            className="flex-1 lg:w-full"
                            onClick={() => setIsDialogOpen(true)}
                          >
                            Rebook
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default function PatientAppointmentsPage() {
  return (
    <RoleGuard allowedRole="patient">
      <PatientAppointmentsPageContent />
    </RoleGuard>
  );
}
