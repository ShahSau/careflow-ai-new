'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { RoleGuard } from '@/components/role-guard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import {
  Hospital,
  Bell,
  Search,
  Filter,
  Pill,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronLeft,
  User,
  Calendar,
  Download,
  RefreshCw,
  Archive,
  AlertTriangle
} from 'lucide-react';
import Link from 'next/link';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

function PatientPrescriptionsPageContent() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  if (!user) return null;

  const prescriptions = [
    {
      id: 1,
      medication: 'Lisinopril 10mg',
      prescribedBy: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      prescribedDate: '2025-10-15',
      expiryDate: '2026-01-15',
      dosage: 'Once daily',
      instructions: 'Take in the morning with or without food',
      quantity: '90 tablets',
      refills: 2,
      status: 'active',
      sideEffects: 'May cause dizziness, dry cough',
      warnings: 'Do not take with potassium supplements'
    },
    {
      id: 2,
      medication: 'Metformin 500mg',
      prescribedBy: 'Dr. Michael Chen',
      specialty: 'General Medicine',
      prescribedDate: '2025-09-20',
      expiryDate: '2025-12-20',
      dosage: 'Twice daily',
      instructions: 'Take with meals',
      quantity: '180 tablets',
      refills: 1,
      status: 'active',
      sideEffects: 'Nausea, diarrhea, upset stomach',
      warnings: 'Avoid alcohol consumption'
    },
    {
      id: 3,
      medication: 'Omeprazole 20mg',
      prescribedBy: 'Dr. Michael Chen',
      specialty: 'General Medicine',
      prescribedDate: '2025-10-01',
      expiryDate: '2025-11-01',
      dosage: 'Once daily',
      instructions: 'Take 30 minutes before breakfast',
      quantity: '30 capsules',
      refills: 0,
      status: 'expiring',
      sideEffects: 'Headache, stomach pain',
      warnings: 'May interact with certain antibiotics'
    },
    {
      id: 4,
      medication: 'Atorvastatin 40mg',
      prescribedBy: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      prescribedDate: '2025-08-10',
      expiryDate: '2025-11-10',
      dosage: 'Once daily at bedtime',
      instructions: 'Take in the evening',
      quantity: '90 tablets',
      refills: 3,
      status: 'active',
      sideEffects: 'Muscle pain, weakness',
      warnings: 'Avoid grapefruit juice'
    },
    {
      id: 5,
      medication: 'Amoxicillin 500mg',
      prescribedBy: 'Dr. Emily Rodriguez',
      specialty: 'General Medicine',
      prescribedDate: '2025-09-15',
      expiryDate: '2025-09-22',
      dosage: 'Three times daily',
      instructions: 'Take every 8 hours',
      quantity: '21 capsules',
      refills: 0,
      status: 'expired',
      sideEffects: 'Diarrhea, nausea',
      warnings: 'Complete full course'
    },
    {
      id: 6,
      medication: 'Albuterol Inhaler',
      prescribedBy: 'Dr. Robert Martinez',
      specialty: 'Pulmonology',
      prescribedDate: '2025-07-01',
      expiryDate: '2025-10-15',
      dosage: 'As needed',
      instructions: 'Use when experiencing shortness of breath',
      quantity: '1 inhaler (200 doses)',
      refills: 0,
      status: 'expired',
      sideEffects: 'Shakiness, nervousness',
      warnings: 'Do not exceed 12 puffs per day'
    },
  ];

  const filteredPrescriptions = prescriptions.filter(rx => {
    const matchesSearch = rx.medication.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         rx.prescribedBy.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || rx.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'expiring':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case 'expired':
        return <Archive className="h-5 w-5 text-gray-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-50 text-green-700 border-green-300';
      case 'expiring':
        return 'bg-yellow-50 text-yellow-700 border-yellow-300';
      case 'expired':
        return 'bg-gray-50 text-gray-700 border-gray-300';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <nav className="bg-white dark:bg-gray-900 border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
              <Hospital className="h-8 w-8 text-green-500" />
              <span className="text-2xl font-bold">MediCare</span>
            </Link>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button onClick={logout} variant="outline">Logout</Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <Link href="/patient/dashboard">
              <Button variant="ghost" size="icon">
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">My Prescriptions</h1>
              <p className="text-muted-foreground text-lg">View and manage your current and past prescriptions</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by medication or doctor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="md:w-48 h-12">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="expiring">Expiring Soon</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <Card className="border-2 border-green-500 bg-green-50 dark:bg-green-950">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Active</p>
                    <p className="text-3xl font-bold text-green-700">
                      {prescriptions.filter(p => p.status === 'active').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900">
                    <AlertCircle className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Expiring Soon</p>
                    <p className="text-3xl font-bold text-yellow-700">
                      {prescriptions.filter(p => p.status === 'expiring').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                    <Archive className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Expired</p>
                    <p className="text-3xl font-bold">
                      {prescriptions.filter(p => p.status === 'expired').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        <div className="grid gap-6">
          {filteredPrescriptions.length === 0 ? (
            <Card className="p-12 text-center">
              <Pill className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No prescriptions found</h3>
              <p className="text-muted-foreground">
                {searchQuery || filterStatus !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'You have no prescriptions on record'}
              </p>
            </Card>
          ) : (
            filteredPrescriptions.map((prescription, index) => (
              <motion.div
                key={prescription.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="border-2 hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="p-4 rounded-xl bg-green-100 dark:bg-green-900">
                          <Pill className="h-8 w-8 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-2xl font-bold mb-1">{prescription.medication}</h3>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <User className="h-4 w-4" />
                                <span>{prescription.prescribedBy} - {prescription.specialty}</span>
                              </div>
                            </div>
                            <Badge variant="outline" className={getStatusColor(prescription.status)}>
                              <span className="flex items-center gap-1">
                                {getStatusIcon(prescription.status)}
                                {prescription.status}
                              </span>
                            </Badge>
                          </div>

                          <div className="grid md:grid-cols-2 gap-3 mb-4">
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="h-4 w-4 text-green-600" />
                              <span className="font-medium">{prescription.dosage}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="h-4 w-4 text-green-600" />
                              <span className="text-muted-foreground">Prescribed: {prescription.prescribedDate}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                              <span className="text-muted-foreground">Refills: {prescription.refills} remaining</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="h-4 w-4 text-green-600" />
                              <span className="text-muted-foreground">Expires: {prescription.expiryDate}</span>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950">
                              <p className="text-sm font-medium mb-1 flex items-center gap-2">
                                <Pill className="h-4 w-4 text-blue-600" />
                                Instructions
                              </p>
                              <p className="text-sm text-muted-foreground">{prescription.instructions}</p>
                              <p className="text-sm text-muted-foreground mt-1">Quantity: {prescription.quantity}</p>
                            </div>

                            {prescription.status === 'expiring' && (
                              <div className="p-3 rounded-lg bg-yellow-50 dark:bg-yellow-950 border border-yellow-300">
                                <p className="text-sm font-medium flex items-center gap-2 text-yellow-700">
                                  <AlertTriangle className="h-4 w-4" />
                                  Expiring Soon
                                </p>
                                <p className="text-sm text-muted-foreground mt-1">
                                  This prescription will expire on {prescription.expiryDate}. Request a refill soon.
                                </p>
                              </div>
                            )}

                            <div className="grid md:grid-cols-2 gap-3">
                              <div className="p-3 rounded-lg bg-muted/50">
                                <p className="text-xs font-medium mb-1">Side Effects</p>
                                <p className="text-xs text-muted-foreground">{prescription.sideEffects}</p>
                              </div>
                              <div className="p-3 rounded-lg bg-muted/50">
                                <p className="text-xs font-medium mb-1">Warnings</p>
                                <p className="text-xs text-muted-foreground">{prescription.warnings}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex lg:flex-col gap-2 lg:w-40">
                        {prescription.status === 'active' || prescription.status === 'expiring' ? (
                          <>
                            <Button variant="outline" className="flex-1 lg:w-full">
                              <RefreshCw className="h-4 w-4 mr-2" />
                              Request Refill
                            </Button>
                            <Button variant="outline" className="flex-1 lg:w-full">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </>
                        ) : (
                          <Button variant="outline" className="flex-1 lg:w-full">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default function PatientPrescriptionsPage() {
  return (
    <RoleGuard allowedRole="patient">
      <PatientPrescriptionsPageContent />
    </RoleGuard>
  );
}
