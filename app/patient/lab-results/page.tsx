'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
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
  FileText,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronLeft,
  User,
  Download,
  Eye,
  Activity,
  Microscope,
  Heart,
  Droplet,
  TestTube
} from 'lucide-react';
import Link from 'next/link';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function PatientLabResultsPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    if (!user || user.role !== 'patient') {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) return null;

  const labResults = [
    {
      id: 1,
      testName: 'Complete Blood Count (CBC)',
      category: 'Hematology',
      orderedBy: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      testDate: '2025-10-25',
      resultDate: '2025-10-26',
      status: 'completed',
      result: 'Normal',
      urgency: 'routine',
      icon: Droplet,
      color: '#ef4444',
      details: [
        { parameter: 'White Blood Cells', value: '7.5', unit: 'K/uL', range: '4.5-11.0', status: 'normal' },
        { parameter: 'Red Blood Cells', value: '5.2', unit: 'M/uL', range: '4.5-5.9', status: 'normal' },
        { parameter: 'Hemoglobin', value: '15.2', unit: 'g/dL', range: '13.5-17.5', status: 'normal' },
        { parameter: 'Platelets', value: '250', unit: 'K/uL', range: '150-400', status: 'normal' }
      ]
    },
    {
      id: 2,
      testName: 'Lipid Panel',
      category: 'Chemistry',
      orderedBy: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      testDate: '2025-10-25',
      resultDate: '2025-10-26',
      status: 'completed',
      result: 'Borderline',
      urgency: 'routine',
      icon: Heart,
      color: '#f59e0b',
      details: [
        { parameter: 'Total Cholesterol', value: '210', unit: 'mg/dL', range: '<200', status: 'high' },
        { parameter: 'LDL Cholesterol', value: '135', unit: 'mg/dL', range: '<100', status: 'high' },
        { parameter: 'HDL Cholesterol', value: '52', unit: 'mg/dL', range: '>40', status: 'normal' },
        { parameter: 'Triglycerides', value: '115', unit: 'mg/dL', range: '<150', status: 'normal' }
      ]
    },
    {
      id: 3,
      testName: 'Comprehensive Metabolic Panel',
      category: 'Chemistry',
      orderedBy: 'Dr. Michael Chen',
      specialty: 'General Medicine',
      testDate: '2025-10-20',
      resultDate: '2025-10-21',
      status: 'completed',
      result: 'Normal',
      urgency: 'routine',
      icon: TestTube,
      color: '#8b5cf6',
      details: [
        { parameter: 'Glucose', value: '95', unit: 'mg/dL', range: '70-100', status: 'normal' },
        { parameter: 'BUN', value: '18', unit: 'mg/dL', range: '7-20', status: 'normal' },
        { parameter: 'Creatinine', value: '1.0', unit: 'mg/dL', range: '0.7-1.3', status: 'normal' },
        { parameter: 'Sodium', value: '140', unit: 'mEq/L', range: '136-145', status: 'normal' }
      ]
    },
    {
      id: 4,
      testName: 'Thyroid Function Test',
      category: 'Endocrinology',
      orderedBy: 'Dr. Michael Chen',
      specialty: 'General Medicine',
      testDate: '2025-10-18',
      resultDate: '2025-10-19',
      status: 'completed',
      result: 'Normal',
      urgency: 'routine',
      icon: Activity,
      color: '#10b981',
      details: [
        { parameter: 'TSH', value: '2.5', unit: 'mIU/L', range: '0.4-4.0', status: 'normal' },
        { parameter: 'T4', value: '8.0', unit: 'ug/dL', range: '5.0-12.0', status: 'normal' },
        { parameter: 'T3', value: '120', unit: 'ng/dL', range: '80-200', status: 'normal' }
      ]
    },
    {
      id: 5,
      testName: 'Urinalysis',
      category: 'Urinalysis',
      orderedBy: 'Dr. Michael Chen',
      specialty: 'General Medicine',
      testDate: '2025-10-15',
      resultDate: '2025-10-15',
      status: 'completed',
      result: 'Normal',
      urgency: 'routine',
      icon: Microscope,
      color: '#3b82f6',
      details: [
        { parameter: 'Color', value: 'Yellow', unit: '', range: 'Yellow', status: 'normal' },
        { parameter: 'pH', value: '6.0', unit: '', range: '4.5-8.0', status: 'normal' },
        { parameter: 'Protein', value: 'Negative', unit: '', range: 'Negative', status: 'normal' },
        { parameter: 'Glucose', value: 'Negative', unit: '', range: 'Negative', status: 'normal' }
      ]
    },
    {
      id: 6,
      testName: 'Hemoglobin A1C',
      category: 'Diabetes',
      orderedBy: 'Dr. Michael Chen',
      specialty: 'General Medicine',
      testDate: '2025-10-28',
      resultDate: null,
      status: 'pending',
      result: null,
      urgency: 'routine',
      icon: Droplet,
      color: '#06b6d4',
      details: []
    },
    {
      id: 7,
      testName: 'Vitamin D',
      category: 'Vitamins',
      orderedBy: 'Dr. Michael Chen',
      specialty: 'General Medicine',
      testDate: '2025-10-28',
      resultDate: null,
      status: 'processing',
      result: null,
      urgency: 'routine',
      icon: Activity,
      color: '#f97316',
      details: []
    },
  ];

  const filteredResults = labResults.filter(result => {
    const matchesSearch = result.testName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         result.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || result.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'processing':
        return <AlertCircle className="h-5 w-5 text-blue-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 text-green-700 border-green-300';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-300';
      case 'processing':
        return 'bg-blue-50 text-blue-700 border-blue-300';
      default:
        return '';
    }
  };

  const getResultColor = (result: string | null) => {
    if (!result) return '';
    switch (result.toLowerCase()) {
      case 'normal':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'borderline':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'abnormal':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return '';
    }
  };

  const getParameterStatus = (status: string) => {
    switch (status) {
      case 'normal':
        return <Badge className="bg-green-100 text-green-700 border-green-300">Normal</Badge>;
      case 'high':
        return <Badge className="bg-red-100 text-red-700 border-red-300">High</Badge>;
      case 'low':
        return <Badge className="bg-blue-100 text-blue-700 border-blue-300">Low</Badge>;
      default:
        return null;
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
              <h1 className="text-4xl font-bold mb-2">Lab Results</h1>
              <p className="text-muted-foreground text-lg">View your test results and medical reports</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by test name or category..."
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
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
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
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <p className="text-3xl font-bold text-green-700">
                      {labResults.filter(r => r.status === 'completed').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-500 bg-blue-50 dark:bg-blue-950">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                    <AlertCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Processing</p>
                    <p className="text-3xl font-bold text-blue-700">
                      {labResults.filter(r => r.status === 'processing').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pending</p>
                    <p className="text-3xl font-bold text-yellow-700">
                      {labResults.filter(r => r.status === 'pending').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        <div className="grid gap-6">
          {filteredResults.length === 0 ? (
            <Card className="p-12 text-center">
              <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No lab results found</h3>
              <p className="text-muted-foreground">
                {searchQuery || filterStatus !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'You have no lab results on record'}
              </p>
            </Card>
          ) : (
            filteredResults.map((result, index) => {
              const Icon = result.icon;
              return (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="border-2 hover:shadow-lg transition-all">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row gap-6">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="p-4 rounded-xl" style={{ backgroundColor: `${result.color}20` }}>
                            <Icon className="h-8 w-8" style={{ color: result.color }} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="text-2xl font-bold mb-1">{result.testName}</h3>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Badge variant="outline">{result.category}</Badge>
                                  <User className="h-4 w-4" />
                                  <span>{result.orderedBy}</span>
                                </div>
                              </div>
                              <Badge variant="outline" className={getStatusColor(result.status)}>
                                <span className="flex items-center gap-1">
                                  {getStatusIcon(result.status)}
                                  {result.status}
                                </span>
                              </Badge>
                            </div>

                            <div className="grid md:grid-cols-2 gap-3 mb-4">
                              <div className="flex items-center gap-2 text-sm">
                                <Calendar className="h-4 w-4 text-green-600" />
                                <span className="text-muted-foreground">Test Date: {result.testDate}</span>
                              </div>
                              {result.resultDate && (
                                <div className="flex items-center gap-2 text-sm">
                                  <Calendar className="h-4 w-4 text-green-600" />
                                  <span className="text-muted-foreground">Result Date: {result.resultDate}</span>
                                </div>
                              )}
                            </div>

                            {result.result && (
                              <div className="mb-4">
                                <Badge variant="outline" className={`${getResultColor(result.result)} text-base px-4 py-2`}>
                                  Overall Result: {result.result}
                                </Badge>
                              </div>
                            )}

                            {result.details.length > 0 && (
                              <div className="space-y-2">
                                <p className="text-sm font-semibold mb-2">Test Parameters:</p>
                                <div className="space-y-2">
                                  {result.details.map((detail, idx) => (
                                    <div
                                      key={idx}
                                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                                    >
                                      <div className="flex-1">
                                        <p className="text-sm font-medium">{detail.parameter}</p>
                                        <p className="text-xs text-muted-foreground">Normal Range: {detail.range}</p>
                                      </div>
                                      <div className="flex items-center gap-3">
                                        <p className="text-sm font-semibold">
                                          {detail.value} {detail.unit}
                                        </p>
                                        {getParameterStatus(detail.status)}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {result.status === 'pending' && (
                              <div className="mt-4 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-950 border border-yellow-300">
                                <p className="text-sm text-yellow-700">
                                  Test has been ordered and is waiting to be performed.
                                </p>
                              </div>
                            )}

                            {result.status === 'processing' && (
                              <div className="mt-4 p-3 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-300">
                                <p className="text-sm text-blue-700">
                                  Your sample is being processed. Results will be available soon.
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        {result.status === 'completed' && (
                          <div className="flex lg:flex-col gap-2 lg:w-40">
                            <Button variant="outline" className="flex-1 lg:w-full">
                              <Eye className="h-4 w-4 mr-2" />
                              View Full
                            </Button>
                            <Button variant="outline" className="flex-1 lg:w-full">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
