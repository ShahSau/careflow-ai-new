'use client';

import { useAuth } from '@/lib/auth-context';
import { RoleGuard } from '@/components/role-guard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Hospital, Bell, ChevronLeft, Pill, TestTube } from 'lucide-react';
import Link from 'next/link';

function PatientDetailsContent({ params }: { params: { id: string } }) {
  const { user, logout } = useAuth();
  if (!user) return null;

  const patient = {
    id: params.id,
    name: 'John Doe',
    age: 45,
    gender: 'Male',
    bloodType: 'O+',
    allergies: ['Penicillin', 'Latex'],
    conditions: ['Hypertension', 'Type 2 Diabetes'],
    visits: [
      { date: '2025-10-25', type: 'Check-up', notes: 'Regular check-up, all vitals normal' },
      { date: '2025-09-15', type: 'Follow-up', notes: 'Medication adjustment' }
    ],
    prescriptions: [
      { medication: 'Lisinopril 10mg', dosage: 'Once daily', prescribed: '2025-10-15', status: 'active' }
    ],
    labResults: [
      { test: 'Blood Glucose', value: '110 mg/dL', date: '2025-10-20', status: 'Normal' }
    ]
  };

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
          <Link href="/doctor/patients"><Button variant="ghost" size="icon"><ChevronLeft className="h-5 w-5" /></Button></Link>
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">{patient.name}</h1>
            <p className="text-muted-foreground text-lg">Patient ID: {patient.id}</p>
          </div>
          <Link href={`/doctor/lab-orders?patient=${patient.id}`}>
            <Button variant="outline"><TestTube className="h-5 w-5 mr-2" />Order Lab Test</Button>
          </Link>
          <Link href={`/doctor/prescriptions?patient=${patient.id}`}>
            <Button className="bg-blue-600 hover:bg-blue-700"><Pill className="h-5 w-5 mr-2" />New Prescription</Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <Card><CardContent className="p-6"><div className="text-sm text-muted-foreground mb-1">Age</div><div className="text-2xl font-bold">{patient.age} years</div></CardContent></Card>
          <Card><CardContent className="p-6"><div className="text-sm text-muted-foreground mb-1">Gender</div><div className="text-2xl font-bold">{patient.gender}</div></CardContent></Card>
          <Card><CardContent className="p-6"><div className="text-sm text-muted-foreground mb-1">Blood Type</div><div className="text-2xl font-bold">{patient.bloodType}</div></CardContent></Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="history">Visit History</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="labs">Lab Results</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card><CardHeader><CardTitle>Allergies</CardTitle></CardHeader><CardContent>{patient.allergies.map(a => <Badge key={a} className="mr-2 bg-red-100 text-red-700">{a}</Badge>)}</CardContent></Card>
              <Card><CardHeader><CardTitle>Medical Conditions</CardTitle></CardHeader><CardContent>{patient.conditions.map(c => <Badge key={c} className="mr-2 bg-yellow-100 text-yellow-700">{c}</Badge>)}</CardContent></Card>
            </div>
          </TabsContent>

          <TabsContent value="history">
            <div className="space-y-4">
              {patient.visits.map((visit, i) => (
                <Card key={i}><CardContent className="p-6"><div className="flex justify-between mb-2"><h3 className="font-semibold">{visit.type}</h3><span className="text-sm text-muted-foreground">{visit.date}</span></div><p className="text-sm">{visit.notes}</p></CardContent></Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="prescriptions">
            <div className="space-y-4">
              {patient.prescriptions.map((rx, i) => (
                <Card key={i}><CardContent className="p-6"><div className="flex justify-between items-start"><div><h3 className="font-semibold text-lg">{rx.medication}</h3><p className="text-sm text-muted-foreground">{rx.dosage}</p><p className="text-xs text-muted-foreground mt-1">Prescribed: {rx.prescribed}</p></div><Badge className="bg-green-100 text-green-700">{rx.status}</Badge></div></CardContent></Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="labs">
            <div className="space-y-4">
              {patient.labResults.map((lab, i) => (
                <Card key={i}><CardContent className="p-6"><div className="flex justify-between items-start"><div><h3 className="font-semibold">{lab.test}</h3><p className="text-2xl font-bold mt-2">{lab.value}</p><p className="text-xs text-muted-foreground mt-1">{lab.date}</p></div><Badge className="bg-green-100 text-green-700">{lab.status}</Badge></div></CardContent></Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default function PatientDetailsClient({ params }: { params: { id: string } }) {
  return <RoleGuard allowedRole="doctor"><PatientDetailsContent params={params} /></RoleGuard>;
}
