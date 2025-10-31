'use client';

import { useAuth } from '@/lib/auth-context';
import { RoleGuard } from '@/components/role-guard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Hospital, Bell, ChevronLeft, Bed } from 'lucide-react';
import Link from 'next/link';

function RoomManagementContent() {
  const { user, logout } = useAuth();

  const rooms = [
    { id: 'R101', type: 'ICU', beds: 4, occupied: 3, department: 'Cardiology', status: 'Available' },
    { id: 'R102', type: 'General', beds: 6, occupied: 6, department: 'General', status: 'Full' },
    { id: 'R103', type: 'Private', beds: 1, occupied: 0, department: 'VIP', status: 'Available' },
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
          <div className="flex-1"><h1 className="text-4xl font-bold">Room & Bed Management</h1></div>
          <Button className="bg-orange-600 hover:bg-orange-700"><Bed className="h-5 w-5 mr-2" />Add Room</Button>
        </div>
        <Card className="border-2">
          <CardContent className="pt-6">
            <Table>
              <TableHeader><TableRow><TableHead>Room</TableHead><TableHead>Type</TableHead><TableHead>Total Beds</TableHead><TableHead>Occupied</TableHead><TableHead>Available</TableHead><TableHead>Department</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
              <TableBody>
                {rooms.map((room) => (
                  <TableRow key={room.id}>
                    <TableCell className="font-medium">{room.id}</TableCell>
                    <TableCell><Badge variant="outline">{room.type}</Badge></TableCell>
                    <TableCell>{room.beds}</TableCell>
                    <TableCell>{room.occupied}</TableCell>
                    <TableCell className="font-bold text-green-600">{room.beds - room.occupied}</TableCell>
                    <TableCell>{room.department}</TableCell>
                    <TableCell><Badge className={room.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>{room.status}</Badge></TableCell>
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

export default function RoomManagement() {
  return <RoleGuard allowedRole="admin"><RoomManagementContent /></RoleGuard>;
}
