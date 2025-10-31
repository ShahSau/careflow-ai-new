'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { RoleGuard } from '@/components/role-guard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Hospital, Bell, ChevronLeft, Pill, Plus } from 'lucide-react';
import Link from 'next/link';

function PrescriptionsContent() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  const prescriptions = [
    { id: 1, patient: 'John Doe', patientId: 'PT12345', medication: 'Lisinopril 10mg', dosage: 'Once daily', date: '2025-10-15', status: 'active', refills: 2 },
    { id: 2, patient: 'Jane Smith', patientId: 'PT12346', medication: 'Metformin 500mg', dosage: 'Twice daily', date: '2025-10-20', status: 'active', refills: 1 },
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
            <h1 className="text-4xl font-bold mb-2">Prescriptions</h1>
            <p className="text-muted-foreground text-lg">Create and manage prescriptions</p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700"><Plus className="h-5 w-5 mr-2" />New Prescription</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Create Prescription</DialogTitle></DialogHeader>
              <div className="space-y-4">
                <div><Label>Patient</Label><Select><SelectTrigger><SelectValue placeholder="Select patient" /></SelectTrigger><SelectContent><SelectItem value="PT12345">John Doe</SelectItem></SelectContent></Select></div>
                <div><Label>Medication</Label><Input placeholder="Medication name and strength" /></div>
                <div><Label>Dosage</Label><Input placeholder="e.g., Once daily" /></div>
                <div><Label>Duration</Label><Input placeholder="e.g., 30 days" /></div>
                <div><Label>Refills</Label><Input type="number" placeholder="Number of refills" /></div>
                <div><Label>Instructions</Label><Textarea placeholder="Special instructions..." /></div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => setIsOpen(false)}>Create Prescription</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {prescriptions.map((rx) => (
            <Card key={rx.id} className="border-2">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">{rx.medication}</h3>
                    <p className="text-sm text-muted-foreground">{rx.patient} ({rx.patientId})</p>
                    <div className="mt-3 space-y-1">
                      <p className="text-sm"><span className="font-medium">Dosage:</span> {rx.dosage}</p>
                      <p className="text-sm"><span className="font-medium">Prescribed:</span> {rx.date}</p>
                      <p className="text-sm"><span className="font-medium">Refills:</span> {rx.refills} remaining</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-green-300">{rx.status}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Prescriptions() {
  return <RoleGuard allowedRole="doctor"><PrescriptionsContent /></RoleGuard>;
}
