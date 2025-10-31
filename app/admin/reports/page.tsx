'use client';

import { useAuth } from '@/lib/auth-context';
import { RoleGuard } from '@/components/role-guard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Hospital, Bell, ChevronLeft, BarChart3, TrendingUp, Users, DollarSign, Calendar, Download, Activity, PieChart } from 'lucide-react';
import Link from 'next/link';
import { LineChart, Line, BarChart, Bar, PieChart as RechartsPie, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function ReportsAnalyticsContent() {
  const { user, logout } = useAuth();

  const stats = [
    { label: 'Monthly Revenue', value: '$284,500', change: '+18.3%', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Total Patients', value: '2,847', change: '+12.5%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Appointments', value: '1,234', change: '+8.7%', icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 185000, expenses: 120000, profit: 65000 },
    { month: 'Feb', revenue: 195000, expenses: 125000, profit: 70000 },
    { month: 'Mar', revenue: 210000, expenses: 130000, profit: 80000 },
    { month: 'Apr', revenue: 225000, expenses: 135000, profit: 90000 },
    { month: 'May', revenue: 245000, expenses: 140000, profit: 105000 },
    { month: 'Jun', revenue: 260000, expenses: 145000, profit: 115000 },
    { month: 'Jul', revenue: 275000, expenses: 150000, profit: 125000 },
    { month: 'Aug', revenue: 284500, expenses: 155000, profit: 129500 },
  ];

  const departmentRevenue = [
    { name: 'Cardiology', value: 85000 },
    { name: 'Neurology', value: 72000 },
    { name: 'Pediatrics', value: 58000 },
    { name: 'Orthopedics', value: 45000 },
    { name: 'General', value: 24500 },
  ];

  const patientStats = [
    { month: 'Jan', outpatient: 450, inpatient: 120, emergency: 85 },
    { month: 'Feb', outpatient: 480, inpatient: 135, emergency: 92 },
    { month: 'Mar', outpatient: 520, inpatient: 145, emergency: 98 },
    { month: 'Apr', outpatient: 565, inpatient: 152, emergency: 105 },
    { month: 'May', outpatient: 590, inpatient: 168, emergency: 112 },
    { month: 'Jun', outpatient: 625, inpatient: 175, emergency: 120 },
    { month: 'Jul', outpatient: 660, inpatient: 188, emergency: 128 },
    { month: 'Aug', outpatient: 695, inpatient: 195, emergency: 135 },
  ];

  const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'];

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
          <div className="flex-1"><h1 className="text-4xl font-bold">Reports & Analytics</h1></div>
          <Button className="bg-violet-600 hover:bg-violet-700"><Download className="h-5 w-5 mr-2" />Export Report</Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {stats.map((stat, index) => (
            <Card key={index} className="border-2">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.bg}`}><stat.icon className={`h-6 w-6 ${stat.color}`} /></div>
                  <span className="text-sm text-green-600 flex items-center gap-1"><TrendingUp className="h-4 w-4" />{stat.change}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <h3 className="text-3xl font-bold">{stat.value}</h3>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-emerald-600" />
                Revenue Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                  <Area type="monotone" dataKey="revenue" stroke="#10b981" fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-blue-600" />
                Revenue by Department
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPie>
                  <Pie
                    data={departmentRevenue}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {departmentRevenue.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                </RechartsPie>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-purple-600" />
                Revenue vs Expenses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                  <Legend />
                  <Bar dataKey="revenue" fill="#10b981" name="Revenue" />
                  <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                Patient Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={patientStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="outpatient" stroke="#3b82f6" strokeWidth={2} name="Outpatient" />
                  <Line type="monotone" dataKey="inpatient" stroke="#10b981" strokeWidth={2} name="Inpatient" />
                  <Line type="monotone" dataKey="emergency" stroke="#f59e0b" strokeWidth={2} name="Emergency" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function ReportsAnalytics() {
  return <RoleGuard allowedRole="admin"><ReportsAnalyticsContent /></RoleGuard>;
}
