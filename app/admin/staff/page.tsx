'use client';

import { useAuth } from '@/lib/auth-context';
import { RoleGuard } from '@/components/role-guard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Hospital, Bell, ChevronLeft, UserPlus, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

function StaffManagementContent() {
  const { user, logout } = useAuth();

  const staff = [
    { id: 'ST001', name: 'Alice Johnson', role: 'Nurse', department: 'Cardiology', phone: '+1 555-2001', status: 'Active' },
    { id: 'ST002', name: 'Bob Martinez', role: 'Admin', department: 'Reception', phone: '+1 555-2002', status: 'Active' },
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
          <div className="flex-1"><h1 className="text-4xl font-bold">Staff Management</h1></div>
          <Button className="bg-pink-600 hover:bg-pink-700"><UserPlus className="h-5 w-5 mr-2" />Add Staff</Button>
        </div>
        <Card className="border-2">
          <CardContent className="pt-6">
            <Table>
              <TableHeader><TableRow><TableHead>ID</TableHead><TableHead>Name</TableHead><TableHead>Role</TableHead><TableHead>Department</TableHead><TableHead>Phone</TableHead><TableHead>Status</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
              <TableBody>
                {staff.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell>{s.id}</TableCell>
                    <TableCell>{s.name}</TableCell>
                    <TableCell><Badge variant="outline">{s.role}</Badge></TableCell>
                    <TableCell>{s.department}</TableCell>
                    <TableCell>{s.phone}</TableCell>
                    <TableCell><Badge className="bg-blue-100 text-blue-700">{s.status}</Badge></TableCell>
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

export default function StaffManagement() {
  return <RoleGuard allowedRole="admin"><StaffManagementContent /></RoleGuard>;
}
