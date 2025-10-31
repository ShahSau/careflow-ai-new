'use client';

import { useAuth } from '@/lib/auth-context';
import { RoleGuard } from '@/components/role-guard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Hospital, Bell, ChevronLeft, Building2, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

function DepartmentManagementContent() {
  const { user, logout } = useAuth();

  const departments = [
    { id: 1, name: 'Cardiology', head: 'Dr. Sarah Wilson', staff: 15, beds: 30 },
    { id: 2, name: 'Neurology', head: 'Dr. Michael Chen', staff: 12, beds: 25 },
    { id: 3, name: 'Pediatrics', head: 'Dr. Emily Brown', staff: 18, beds: 35 },
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
          <div className="flex-1"><h1 className="text-4xl font-bold">Department Management</h1></div>
          <Button className="bg-indigo-600 hover:bg-indigo-700"><Building2 className="h-5 w-5 mr-2" />Add Department</Button>
        </div>
        <Card className="border-2">
          <CardContent className="pt-6">
            <Table>
              <TableHeader><TableRow><TableHead>Department</TableHead><TableHead>Head</TableHead><TableHead>Staff</TableHead><TableHead>Beds</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
              <TableBody>
                {departments.map((dept) => (
                  <TableRow key={dept.id}>
                    <TableCell className="font-medium">{dept.name}</TableCell>
                    <TableCell>{dept.head}</TableCell>
                    <TableCell>{dept.staff}</TableCell>
                    <TableCell>{dept.beds}</TableCell>
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

export default function DepartmentManagement() {
  return <RoleGuard allowedRole="admin"><DepartmentManagementContent /></RoleGuard>;
}
