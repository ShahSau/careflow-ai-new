'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { RoleGuard } from '@/components/role-guard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { Hospital, Bell, ChevronLeft, Search, Filter, User, Mail, Phone, Calendar } from 'lucide-react';
import Link from 'next/link';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

function PatientsListContent() {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  if (!user) return null;

  const patients = [
    { id: 'PT12345', name: 'John Doe', age: 45, gender: 'Male', lastVisit: '2025-10-25', status: 'active', phone: '+1 (555) 123-4567', email: 'john@example.com' },
    { id: 'PT12346', name: 'Jane Smith', age: 32, gender: 'Female', lastVisit: '2025-10-28', status: 'active', phone: '+1 (555) 123-4568', email: 'jane@example.com' },
    { id: 'PT12347', name: 'Robert Johnson', age: 58, gender: 'Male', lastVisit: '2025-10-30', status: 'active', phone: '+1 (555) 123-4569', email: 'robert@example.com' },
  ];

  const filtered = patients.filter(p =>
    (p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.includes(searchQuery)) &&
    (filterStatus === 'all' || p.status === filterStatus)
  );

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
            <h1 className="text-4xl font-bold mb-2">Patient List</h1>
            <p className="text-muted-foreground text-lg">Manage your assigned patients</p>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Search patients..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 h-12" />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-48 h-12"><Filter className="h-4 w-4 mr-2" /><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4">
          {filtered.map((patient, index) => (
            <motion.div key={patient.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
              <Card className="border-2 hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-4 rounded-xl bg-blue-100 dark:bg-blue-900">
                      <User className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-2xl font-bold">{patient.name}</h3>
                          <p className="text-sm text-muted-foreground">{patient.id}</p>
                        </div>
                        <Badge className="bg-blue-100 text-blue-700 border-blue-300">{patient.status}</Badge>
                      </div>
                      <div className="grid md:grid-cols-2 gap-3 mb-4">
                        <div className="text-sm"><span className="text-muted-foreground">Age:</span> {patient.age} years</div>
                        <div className="text-sm"><span className="text-muted-foreground">Gender:</span> {patient.gender}</div>
                        <div className="flex items-center gap-2 text-sm"><Phone className="h-4 w-4" />{patient.phone}</div>
                        <div className="flex items-center gap-2 text-sm"><Mail className="h-4 w-4" />{patient.email}</div>
                        <div className="flex items-center gap-2 text-sm"><Calendar className="h-4 w-4" />Last visit: {patient.lastVisit}</div>
                      </div>
                      <Link href={`/doctor/patients/${patient.id}`}>
                        <Button className="bg-blue-600 hover:bg-blue-700">View Details</Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PatientsList() {
  return <RoleGuard allowedRole="doctor"><PatientsListContent /></RoleGuard>;
}
