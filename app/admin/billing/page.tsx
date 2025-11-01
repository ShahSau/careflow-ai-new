'use client';

import { useAuth } from '@/lib/auth-context';
import { RoleGuard } from '@/components/role-guard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Hospital, Bell, ChevronLeft, DollarSign, FileText } from 'lucide-react';
import Link from 'next/link';

function BillingManagementContent() {
  const { user, logout } = useAuth();

  const bills = [
    { id: 'BIL001', patient: 'John Doe', amount: 2500, date: '2025-10-30', status: 'Paid' },
    { id: 'BIL002', patient: 'Jane Smith', amount: 1800, date: '2025-10-31', status: 'Pending' },
    { id: 'BIL003', patient: 'Robert Johnson', amount: 3200, date: '2025-10-31', status: 'Overdue' },
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
          <div className="flex-1"><h1 className="text-4xl font-bold">Billing Management</h1></div>
          <Button className="bg-emerald-600 hover:bg-emerald-700"><FileText className="h-5 w-5 mr-2" />Generate Bill</Button>
        </div>
        <Card className="border-2">
          <CardContent className="pt-6">
            <Table>
              <TableHeader><TableRow><TableHead>Bill ID</TableHead><TableHead>Patient</TableHead><TableHead>Amount</TableHead><TableHead>Date</TableHead><TableHead>Status</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
              <TableBody>
                {bills.map((bill) => (
                  <TableRow key={bill.id}>
                    <TableCell>{bill.id}</TableCell>
                    <TableCell>{bill.patient}</TableCell>
                    <TableCell className="font-bold">${bill.amount}</TableCell>
                    <TableCell>{bill.date}</TableCell>
                    <TableCell><Badge className={bill.status === 'Paid' ? 'bg-blue-100 text-blue-700' : bill.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}>{bill.status}</Badge></TableCell>
                    <TableCell><Button size="sm" variant="outline"><DollarSign className="h-4 w-4 mr-1" />Process</Button></TableCell>
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

export default function BillingManagement() {
  return <RoleGuard allowedRole="admin"><BillingManagementContent /></RoleGuard>;
}
