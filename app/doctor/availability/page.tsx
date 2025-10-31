'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { RoleGuard } from '@/components/role-guard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Hospital, Bell, ChevronLeft, Clock, Calendar } from 'lucide-react';
import Link from 'next/link';

function AvailabilityContent() {
  const { user, logout } = useAuth();
  const [schedule, setSchedule] = useState({
    monday: { enabled: true, start: '09:00', end: '17:00' },
    tuesday: { enabled: true, start: '09:00', end: '17:00' },
    wednesday: { enabled: true, start: '09:00', end: '17:00' },
    thursday: { enabled: true, start: '09:00', end: '17:00' },
    friday: { enabled: true, start: '09:00', end: '17:00' },
    saturday: { enabled: false, start: '09:00', end: '13:00' },
    sunday: { enabled: false, start: '09:00', end: '13:00' }
  });

  if (!user) return null;

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const timeOptions = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

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

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/doctor/dashboard"><Button variant="ghost" size="icon"><ChevronLeft className="h-5 w-5" /></Button></Link>
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">Availability Management</h1>
            <p className="text-muted-foreground text-lg">Set your working hours and leave</p>
          </div>
        </div>

        <Card className="border-2 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-6 w-6 text-blue-600" />
              Weekly Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {days.map((day) => (
              <div key={day} className="flex items-center gap-4 p-4 rounded-lg border">
                <div className="w-32">
                  <p className="font-semibold capitalize">{day}</p>
                </div>
                <Switch
                  checked={schedule[day as keyof typeof schedule].enabled}
                  onCheckedChange={(checked) => setSchedule({ ...schedule, [day]: { ...schedule[day as keyof typeof schedule], enabled: checked } })}
                />
                {schedule[day as keyof typeof schedule].enabled && (
                  <>
                    <Select value={schedule[day as keyof typeof schedule].start}>
                      <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                      <SelectContent>{timeOptions.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                    </Select>
                    <span>to</span>
                    <Select value={schedule[day as keyof typeof schedule].end}>
                      <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                      <SelectContent>{timeOptions.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                    </Select>
                  </>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-6 w-6 text-blue-600" />
              Leave Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-blue-50 dark:bg-blue-950">
                <div>
                  <p className="font-semibold">Annual Leave</p>
                  <p className="text-sm text-muted-foreground">12 days remaining</p>
                </div>
                <Button variant="outline">Request Leave</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline">Cancel</Button>
          <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
        </div>
      </div>
    </div>
  );
}

export default function Availability() {
  return <RoleGuard allowedRole="doctor"><AvailabilityContent /></RoleGuard>;
}
