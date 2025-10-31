'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { RoleGuard } from '@/components/role-guard';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Hospital, Bell, ChevronLeft, Search, UserPlus, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

function DoctorManagementContent() {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const doctors = [
    { id: 'DR001', name: 'Dr. Sarah Wilson', specialty: 'Cardiology', phone: '+1 555-1001', email: 'sarah@hospital.com', status: 'Active' },
    { id: 'DR002', name: 'Dr. Michael Chen', specialty: 'Neurology', phone: '+1 555-1002', email: 'michael@hospital.com', status: 'Active' },
    { id: 'DR003', name: 'Dr. Emily Brown', specialty: 'Pediatrics', phone: '+1 555-1003', email: 'emily@hospital.com', status: 'Active' },
  ];

  const filtered = doctors.filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.id.includes(searchQuery));

  return (
    <div className="min-h-screen bg-muted/30">
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2"><Hospital className="h-8 w-8 text-violet-600" /><span className="text-2xl font-bold">MediCare Admin</span></Link>
          <div className="flex items-center gap-4"><Button variant="ghost" size="icon"><Bell className="h-5 w-5" /></Button><Button onClick={logout} variant="outline">Logout</Button></div>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/admin/dashboard"><Button variant="ghost" size="icon"><ChevronLeft /></Button></Link>
          <div className="flex-1"><h1 className="text-4xl font-bold">Doctor Management</h1></div>
          <Button className="bg-green-600 hover:bg-green-700"><UserPlus className="h-5 w-5 mr-2" />Add Doctor</Button>
        </div>
        <Card className="border-2">
          <CardHeader>
            <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" /><Input placeholder="Search doctors..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" /></div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader><TableRow><TableHead>ID</TableHead><TableHead>Name</TableHead><TableHead>Specialty</TableHead><TableHead>Phone</TableHead><TableHead>Status</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
              <TableBody>
                {filtered.map((doctor) => (
                  <TableRow key={doctor.id}>
                    <TableCell className="font-medium">{doctor.id}</TableCell>
                    <TableCell>{doctor.name}</TableCell>
                    <TableCell><Badge variant="outline">{doctor.specialty}</Badge></TableCell>
                    <TableCell>{doctor.phone}</TableCell>
                    <TableCell><Badge className="bg-green-100 text-green-700">{doctor.status}</Badge></TableCell>
                    <TableCell><div className="flex gap-2"><Button size="sm" variant="ghost"><Edit className="h-4 w-4" /></Button><Button size="sm" variant="ghost"><Trash2 className="h-4 w-4 text-red-600" /></Button></div></TableCell>
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

export default function DoctorManagement() {
  return <RoleGuard allowedRole="admin"><DoctorManagementContent /></RoleGuard>;
}
