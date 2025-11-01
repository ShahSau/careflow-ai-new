'use client';

import { useAuth } from '@/lib/auth-context';
import { RoleGuard } from '@/components/role-guard';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Hospital, Bell, ChevronLeft, Calendar } from 'lucide-react';
import Link from 'next/link';

function AppointmentManagementContent() {
  const { user, logout } = useAuth();

  const appointments = [
    { id: 'APT001', patient: 'John Doe', doctor: 'Dr. Sarah Wilson', date: '2025-10-31', time: '09:00 AM', status: 'Confirmed' },
    { id: 'APT002', patient: 'Jane Smith', doctor: 'Dr. Michael Chen', date: '2025-10-31', time: '10:00 AM', status: 'Pending' },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2"><Hospital className="h-8 w-8 text-violet-600" /><span className="text-2xl font-bold">MediCare Admin</span></Link>
          <div className="flex gap-4"><Button variant="ghost" size="icon"><Bell className="h-5 w-5" /></Button><Button onClick={logout} variant="outline">Logout</Button></div>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/admin/dashboard"><Button variant="ghost" size="icon"><ChevronLeft /></Button></Link>
          <h1 className="text-4xl font-bold">Appointment Management</h1>
        </div>
        <Card className="border-2">
          <CardContent className="pt-6">
            <Table>
              <TableHeader><TableRow><TableHead>ID</TableHead><TableHead>Patient</TableHead><TableHead>Doctor</TableHead><TableHead>Date</TableHead><TableHead>Time</TableHead><TableHead>Status</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
              <TableBody>
                {appointments.map((apt) => (
                  <TableRow key={apt.id}>
                    <TableCell>{apt.id}</TableCell>
                    <TableCell>{apt.patient}</TableCell>
                    <TableCell>{apt.doctor}</TableCell>
                    <TableCell>{apt.date}</TableCell>
                    <TableCell>{apt.time}</TableCell>
                    <TableCell><Badge className={apt.status === 'Confirmed' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}>{apt.status}</Badge></TableCell>
                    <TableCell><Button size="sm" variant="outline">Reschedule</Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function AppointmentManagement() {
  return <RoleGuard allowedRole="admin"><AppointmentManagementContent /></RoleGuard>;
}
