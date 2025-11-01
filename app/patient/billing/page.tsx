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
  CreditCard,
  Calendar,
  CheckCircle2,
  Clock,
  XCircle,
  ChevronLeft,
  Download,
  Eye,
  DollarSign,
  Receipt,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

function PatientBillingPageContent() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  if (!user) return null;

  const bills = [
    {
      id: 1,
      invoiceNumber: 'INV-2025-001',
      description: 'Cardiology Consultation',
      date: '2025-10-25',
      dueDate: '2025-11-25',
      amount: 250.00,
      paid: 250.00,
      balance: 0,
      status: 'paid',
      paymentDate: '2025-10-26',
      paymentMethod: 'Credit Card',
      items: [
        { service: 'Doctor Consultation', quantity: 1, rate: 150.00, amount: 150.00 },
        { service: 'ECG Test', quantity: 1, rate: 100.00, amount: 100.00 }
      ]
    },
    {
      id: 2,
      invoiceNumber: 'INV-2025-002',
      description: 'Lab Tests - Complete Blood Count',
      date: '2025-10-25',
      dueDate: '2025-11-25',
      amount: 180.00,
      paid: 180.00,
      balance: 0,
      status: 'paid',
      paymentDate: '2025-10-27',
      paymentMethod: 'Insurance',
      items: [
        { service: 'Complete Blood Count', quantity: 1, rate: 80.00, amount: 80.00 },
        { service: 'Lipid Panel', quantity: 1, rate: 70.00, amount: 70.00 },
        { service: 'Lab Processing Fee', quantity: 1, rate: 30.00, amount: 30.00 }
      ]
    },
    {
      id: 3,
      invoiceNumber: 'INV-2025-003',
      description: 'General Check-up',
      date: '2025-10-20',
      dueDate: '2025-11-20',
      amount: 200.00,
      paid: 200.00,
      balance: 0,
      status: 'paid',
      paymentDate: '2025-10-22',
      paymentMethod: 'Debit Card',
      items: [
        { service: 'Physical Examination', quantity: 1, rate: 120.00, amount: 120.00 },
        { service: 'Blood Pressure Test', quantity: 1, rate: 40.00, amount: 40.00 },
        { service: 'Consultation Fee', quantity: 1, rate: 40.00, amount: 40.00 }
      ]
    },
    {
      id: 4,
      invoiceNumber: 'INV-2025-004',
      description: 'Orthopedic Consultation & X-Ray',
      date: '2025-10-28',
      dueDate: '2025-11-28',
      amount: 450.00,
      paid: 150.00,
      balance: 300.00,
      status: 'partial',
      paymentDate: '2025-10-29',
      paymentMethod: 'Credit Card',
      items: [
        { service: 'Specialist Consultation', quantity: 1, rate: 200.00, amount: 200.00 },
        { service: 'X-Ray Imaging', quantity: 2, rate: 100.00, amount: 200.00 },
        { service: 'Radiology Reading Fee', quantity: 1, rate: 50.00, amount: 50.00 }
      ]
    },
    {
      id: 5,
      invoiceNumber: 'INV-2025-005',
      description: 'Dermatology Consultation',
      date: '2025-10-30',
      dueDate: '2025-11-30',
      amount: 175.00,
      paid: 0,
      balance: 175.00,
      status: 'pending',
      paymentDate: null,
      paymentMethod: null,
      items: [
        { service: 'Dermatologist Consultation', quantity: 1, rate: 150.00, amount: 150.00 },
        { service: 'Skin Biopsy', quantity: 1, rate: 25.00, amount: 25.00 }
      ]
    },
    {
      id: 6,
      invoiceNumber: 'INV-2025-006',
      description: 'Emergency Room Visit',
      date: '2025-09-15',
      dueDate: '2025-10-15',
      amount: 850.00,
      paid: 0,
      balance: 850.00,
      status: 'overdue',
      paymentDate: null,
      paymentMethod: null,
      items: [
        { service: 'Emergency Room Fee', quantity: 1, rate: 500.00, amount: 500.00 },
        { service: 'CT Scan', quantity: 1, rate: 250.00, amount: 250.00 },
        { service: 'Medications', quantity: 1, rate: 100.00, amount: 100.00 }
      ]
    },
  ];

  const totalBalance = bills.reduce((sum, bill) => sum + bill.balance, 0);
  const totalPaid = bills.reduce((sum, bill) => sum + bill.paid, 0);
  const totalAmount = bills.reduce((sum, bill) => sum + bill.amount, 0);

  const filteredBills = bills.filter(bill => {
    const matchesSearch = bill.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bill.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || bill.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle2 className="h-5 w-5 text-blue-600" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'partial':
        return <AlertCircle className="h-5 w-5 text-blue-600" />;
      case 'overdue':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-blue-50 text-blue-700 border-blue-300';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-300';
      case 'partial':
        return 'bg-blue-50 text-blue-700 border-blue-300';
      case 'overdue':
        return 'bg-red-50 text-red-700 border-red-300';
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
              <Hospital className="h-8 w-8 text-blue-500" />
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
              <h1 className="text-4xl font-bold mb-2">Billing & Payments</h1>
              <p className="text-muted-foreground text-lg">Manage your bills and payment history</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by invoice number or description..."
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
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="partial">Partially Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <Card className="border-2">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                    <Receipt className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Billed</p>
                    <p className="text-2xl font-bold">${totalAmount.toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-500 bg-blue-50 dark:bg-blue-950">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                    <CheckCircle2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Paid</p>
                    <p className="text-2xl font-bold text-blue-700">${totalPaid.toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900">
                    <DollarSign className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Balance Due</p>
                    <p className="text-2xl font-bold text-yellow-700">${totalBalance.toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-500 bg-red-50 dark:bg-red-950">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Overdue</p>
                    <p className="text-2xl font-bold text-red-700">
                      {bills.filter(b => b.status === 'overdue').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        <div className="grid gap-6">
          {filteredBills.length === 0 ? (
            <Card className="p-12 text-center">
              <Receipt className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No bills found</h3>
              <p className="text-muted-foreground">
                {searchQuery || filterStatus !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'You have no bills on record'}
              </p>
            </Card>
          ) : (
            filteredBills.map((bill, index) => (
              <motion.div
                key={bill.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="border-2 hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="p-4 rounded-xl bg-blue-100 dark:bg-blue-900">
                            <Receipt className="h-8 w-8 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold mb-1">{bill.invoiceNumber}</h3>
                            <p className="text-muted-foreground mb-2">{bill.description}</p>
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4 text-blue-600" />
                                <span className="text-muted-foreground">Issued: {bill.date}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4 text-blue-600" />
                                <span className="text-muted-foreground">Due: {bill.dueDate}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline" className={getStatusColor(bill.status)}>
                          <span className="flex items-center gap-1">
                            {getStatusIcon(bill.status)}
                            {bill.status}
                          </span>
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm font-medium pb-2 border-b">
                          <span>Service</span>
                          <div className="flex gap-12">
                            <span className="w-16 text-center">Qty</span>
                            <span className="w-20 text-right">Rate</span>
                            <span className="w-20 text-right">Amount</span>
                          </div>
                        </div>
                        {bill.items.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between text-sm py-2 hover:bg-muted/50 rounded px-2">
                            <span className="text-muted-foreground">{item.service}</span>
                            <div className="flex gap-12">
                              <span className="w-16 text-center">{item.quantity}</span>
                              <span className="w-20 text-right">${item.rate.toFixed(2)}</span>
                              <span className="w-20 text-right font-medium">${item.amount.toFixed(2)}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 pt-4 border-t">
                        <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950">
                          <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
                          <p className="text-2xl font-bold">${bill.amount.toFixed(2)}</p>
                        </div>
                        <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950">
                          <p className="text-sm text-muted-foreground mb-1">Amount Paid</p>
                          <p className="text-2xl font-bold text-blue-700">${bill.paid.toFixed(2)}</p>
                        </div>
                        <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-950">
                          <p className="text-sm text-muted-foreground mb-1">Balance Due</p>
                          <p className="text-2xl font-bold text-yellow-700">${bill.balance.toFixed(2)}</p>
                        </div>
                      </div>

                      {bill.paymentDate && (
                        <div className="p-3 rounded-lg bg-muted/50">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4 text-blue-600" />
                              <span className="font-medium">Payment Received</span>
                            </div>
                            <div className="flex items-center gap-4 text-muted-foreground">
                              <span>{bill.paymentDate}</span>
                              <span>via {bill.paymentMethod}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {bill.status === 'overdue' && (
                        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950 border border-red-300">
                          <p className="text-sm font-medium flex items-center gap-2 text-red-700">
                            <AlertCircle className="h-4 w-4" />
                            Payment Overdue
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            This bill is past due. Please make a payment to avoid late fees.
                          </p>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2">
                        {bill.balance > 0 && (
                          <Button className="bg-blue-600 hover:bg-blue-700">
                            <CreditCard className="h-4 w-4 mr-2" />
                            Pay Now ${bill.balance.toFixed(2)}
                          </Button>
                        )}
                        <Button variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Download Invoice
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>

        {totalBalance > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8"
          >
            <Card className="border-2 border-blue-500 bg-blue-50 dark:bg-blue-950">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1">Total Outstanding Balance</h3>
                    <p className="text-muted-foreground">Pay your outstanding balance in full</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-3xl font-bold text-blue-700">${totalBalance.toFixed(2)}</p>
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Pay Full Balance
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function PatientBillingPage() {
  return (
    <RoleGuard allowedRole="patient">
      <PatientBillingPageContent />
    </RoleGuard>
  );
}
