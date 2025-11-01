'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { RoleGuard } from '@/components/role-guard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Hospital, Bell, ChevronLeft, TestTube, Plus } from 'lucide-react';
import Link from 'next/link';

function LabOrdersContent() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  const orders = [
    { id: 1, patient: 'John Doe', patientId: 'PT12345', test: 'Complete Blood Count', date: '2025-10-31', status: 'pending' },
    { id: 2, patient: 'Jane Smith', patientId: 'PT12346', test: 'Lipid Panel', date: '2025-10-30', status: 'completed', result: 'Normal' },
  ];

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
          <Link href="/doctor/dashboard"><Button variant="ghost" size="icon"><ChevronLeft className="h-5 w-5" /></Button></Link>
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">Lab Orders</h1>
            <p className="text-muted-foreground text-lg">Order and manage lab tests</p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700"><Plus className="h-5 w-5 mr-2" />New Lab Order</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Order Lab Test</DialogTitle></DialogHeader>
              <div className="space-y-4">
                <div><Label>Patient</Label><Select><SelectTrigger><SelectValue placeholder="Select patient" /></SelectTrigger><SelectContent><SelectItem value="PT12345">John Doe</SelectItem></SelectContent></Select></div>
                <div><Label>Test Type</Label><Select><SelectTrigger><SelectValue placeholder="Select test" /></SelectTrigger><SelectContent><SelectItem value="cbc">Complete Blood Count</SelectItem><SelectItem value="lipid">Lipid Panel</SelectItem></SelectContent></Select></div>
                <div><Label>Notes</Label><Textarea placeholder="Additional instructions..." /></div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => setIsOpen(false)}>Submit Order</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {orders.map((order) => (
            <Card key={order.id} className="border-2">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold">{order.test}</h3>
                    <p className="text-sm text-muted-foreground">{order.patient} ({order.patientId})</p>
                    <p className="text-sm text-muted-foreground">Date: {order.date}</p>
                  </div>
                  <Badge className={order.status === 'completed' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}>{order.status}</Badge>
                </div>
                {order.result && <div className="mt-4"><Badge className="bg-blue-100 text-blue-700">Result: {order.result}</Badge></div>}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LabOrders() {
  return <RoleGuard allowedRole="doctor"><LabOrdersContent /></RoleGuard>;
}
