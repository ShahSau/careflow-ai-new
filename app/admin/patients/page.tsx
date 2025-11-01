'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { RoleGuard } from '@/components/role-guard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Hospital, Bell, ChevronLeft, Search, UserPlus, Edit, Trash2, Eye } from 'lucide-react';
import Link from 'next/link';

function PatientManagementContent() {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  if (!user) return null;

  const patients = [
    { id: 'PT001', name: 'John Doe', age: 45, gender: 'Male', phone: '+1 555-0101', email: 'john@example.com', bloodType: 'O+', status: 'Active' },
    { id: 'PT002', name: 'Jane Smith', age: 32, gender: 'Female', phone: '+1 555-0102', email: 'jane@example.com', bloodType: 'A+', status: 'Active' },
    { id: 'PT003', name: 'Robert Johnson', age: 58, gender: 'Male', phone: '+1 555-0103', email: 'robert@example.com', bloodType: 'B+', status: 'Active' },
    { id: 'PT004', name: 'Emily Davis', age: 28, gender: 'Female', phone: '+1 555-0104', email: 'emily@example.com', bloodType: 'AB+', status: 'Inactive' },
  ];

  const filtered = patients.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.includes(searchQuery) ||
    p.email.includes(searchQuery)
  );

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
              <Button onClick={logout} variant="outline">Logout</Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/admin/dashboard"><Button variant="ghost" size="icon"><ChevronLeft className="h-5 w-5" /></Button></Link>
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">Patient Management</h1>
            <p className="text-muted-foreground text-lg">View, edit, and search patients</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700"><UserPlus className="h-5 w-5 mr-2" />Add Patient</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader><DialogTitle>Add New Patient</DialogTitle></DialogHeader>
              <div className="grid md:grid-cols-2 gap-4">
                <div><Label>Full Name</Label><Input placeholder="John Doe" /></div>
                <div><Label>Age</Label><Input type="number" placeholder="45" /></div>
                <div><Label>Gender</Label><Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem></SelectContent></Select></div>
                <div><Label>Blood Type</Label><Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="O+">O+</SelectItem><SelectItem value="A+">A+</SelectItem><SelectItem value="B+">B+</SelectItem><SelectItem value="AB+">AB+</SelectItem></SelectContent></Select></div>
                <div><Label>Phone</Label><Input placeholder="+1 555-0000" /></div>
                <div><Label>Email</Label><Input type="email" placeholder="email@example.com" /></div>
                <div className="md:col-span-2"><Label>Address</Label><Input placeholder="123 Main St" /></div>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => setDialogOpen(false)}>Add Patient</Button>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Search by name, ID, or email..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto"><Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Blood Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium">{patient.id}</TableCell>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{patient.age}</TableCell>
                    <TableCell>{patient.gender}</TableCell>
                    <TableCell>{patient.phone}</TableCell>
                    <TableCell><Badge variant="outline">{patient.bloodType}</Badge></TableCell>
                    <TableCell><Badge className={patient.status === 'Active' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}>{patient.status}</Badge></TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost"><Eye className="h-4 w-4" /></Button>
                        <Button size="sm" variant="ghost"><Edit className="h-4 w-4" /></Button>
                        <Button size="sm" variant="ghost"><Trash2 className="h-4 w-4 text-red-600" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table></div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function PatientManagement() {
  return <RoleGuard allowedRole="admin"><PatientManagementContent /></RoleGuard>;
}
