'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { RoleGuard } from '@/components/role-guard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Hospital, Bell, ChevronLeft, Pill, TestTube, Calendar, Clock, Activity } from 'lucide-react';
import Link from 'next/link';

function PatientDetailsContent({ params }: { params: { id: string } }) {
  const { user, logout } = useAuth();
  const [labDialogOpen, setLabDialogOpen] = useState(false);
  const [prescriptionDialogOpen, setPrescriptionDialogOpen] = useState(false);
  const [vitalsDialogOpen, setVitalsDialogOpen] = useState(false);
  const [bloodPressure, setBloodPressure] = useState('120/80');
  const [heartRate, setHeartRate] = useState('72');
  const [temperature, setTemperature] = useState('98.6');
  const [bloodSugar, setBloodSugar] = useState('110');

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
    ],
    appointments: [
      { id: 1, date: '2025-11-01', time: '9:00 AM', type: 'Check-up', status: 'upcoming', reason: 'Regular check-up' },
      { id: 2, date: '2025-10-25', time: '10:00 AM', type: 'Follow-up', status: 'completed', reason: 'Medication review' }
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
          <Button variant="outline" onClick={() => setVitalsDialogOpen(true)}>
            <Activity className="h-5 w-5 mr-2" />Update Vitals
          </Button>
          <Button variant="outline" onClick={() => setLabDialogOpen(true)}>
            <TestTube className="h-5 w-5 mr-2" />Order Lab Test
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setPrescriptionDialogOpen(true)}>
            <Pill className="h-5 w-5 mr-2" />New Prescription
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <Card><CardContent className="p-6"><div className="text-sm text-muted-foreground mb-1">Age</div><div className="text-2xl font-bold">{patient.age} years</div></CardContent></Card>
          <Card><CardContent className="p-6"><div className="text-sm text-muted-foreground mb-1">Gender</div><div className="text-2xl font-bold">{patient.gender}</div></CardContent></Card>
          <Card><CardContent className="p-6"><div className="text-sm text-muted-foreground mb-1">Blood Type</div><div className="text-2xl font-bold">{patient.bloodType}</div></CardContent></Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
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

          <TabsContent value="appointments">
            <div className="space-y-4">
              {patient.appointments.map((apt) => (
                <Card key={apt.id} className="border-2">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Calendar className="h-5 w-5 text-blue-600" />
                          <h3 className="font-semibold text-lg">{apt.type}</h3>
                          <Badge className={apt.status === 'upcoming' ? 'bg-blue-100 text-blue-700' : apt.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                            {apt.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{apt.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{apt.time}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{apt.reason}</p>
                        {apt.status === 'upcoming' && (
                          <div className="flex gap-2">
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              Confirm Appointment
                            </Button>
                            <Button size="sm" variant="outline">
                              Reschedule
                            </Button>
                            <Button size="sm" variant="ghost" className="text-red-600">
                              Cancel
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
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

        <Dialog open={labDialogOpen} onOpenChange={setLabDialogOpen}>
          <DialogContent>
            <DialogHeader><DialogTitle>Order Lab Test</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Patient</Label>
                <Input value={`${patient.name} (${patient.id})`} disabled />
              </div>
              <div>
                <Label>Test Type</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select test" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cbc">Complete Blood Count</SelectItem>
                    <SelectItem value="lipid">Lipid Panel</SelectItem>
                    <SelectItem value="glucose">Blood Glucose</SelectItem>
                    <SelectItem value="thyroid">Thyroid Function</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Priority</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select priority" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="routine">Routine</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="stat">STAT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Notes</Label>
                <Textarea placeholder="Additional instructions..." />
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => setLabDialogOpen(false)}>
                Submit Order
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={prescriptionDialogOpen} onOpenChange={setPrescriptionDialogOpen}>
          <DialogContent>
            <DialogHeader><DialogTitle>Create Prescription</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Patient</Label>
                <Input value={`${patient.name} (${patient.id})`} disabled />
              </div>
              <div>
                <Label>Medication</Label>
                <Input placeholder="Medication name and strength" />
              </div>
              <div>
                <Label>Dosage</Label>
                <Input placeholder="e.g., Once daily" />
              </div>
              <div>
                <Label>Duration</Label>
                <Input placeholder="e.g., 30 days" />
              </div>
              <div>
                <Label>Refills</Label>
                <Input type="number" placeholder="Number of refills" defaultValue="0" />
              </div>
              <div>
                <Label>Instructions</Label>
                <Textarea placeholder="Special instructions for the patient..." />
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => setPrescriptionDialogOpen(false)}>
                Create Prescription
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={vitalsDialogOpen} onOpenChange={setVitalsDialogOpen}>
          <DialogContent>
            <DialogHeader><DialogTitle>Update Patient Vitals</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Patient</Label>
                <Input value={`${patient.name} (${patient.id})`} disabled />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Blood Pressure (mmHg)</Label>
                  <Input
                    placeholder="120/80"
                    value={bloodPressure}
                    onChange={(e) => setBloodPressure(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Heart Rate (bpm)</Label>
                  <Input
                    type="number"
                    placeholder="72"
                    value={heartRate}
                    onChange={(e) => setHeartRate(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Temperature (°F)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="98.6"
                    value={temperature}
                    onChange={(e) => setTemperature(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Blood Sugar (mg/dL)</Label>
                  <Input
                    type="number"
                    placeholder="110"
                    value={bloodSugar}
                    onChange={(e) => setBloodSugar(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label>Notes</Label>
                <Textarea placeholder="Additional observations..." />
              </div>
              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => {
                  setVitalsDialogOpen(false);
                }}
              >
                Save Vitals
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default function PatientDetailsClient({ params }: { params: { id: string } }) {
  return <RoleGuard allowedRole="doctor"><PatientDetailsContent params={params} /></RoleGuard>;
}
