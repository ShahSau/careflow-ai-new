'use client';

import { useAuth } from '@/lib/auth-context';
import { RoleGuard } from '@/components/role-guard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Hospital, Bell, ChevronLeft, BarChart3, TrendingUp, Users, DollarSign, Calendar, Download } from 'lucide-react';
import Link from 'next/link';

function ReportsAnalyticsContent() {
  const { user, logout } = useAuth();

  const stats = [
    { label: 'Monthly Revenue', value: '$284,500', change: '+18.3%', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Total Patients', value: '2,847', change: '+12.5%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Appointments', value: '1,234', change: '+8.7%', icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

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
        <Card className="border-2">
          <CardHeader><CardTitle className="flex items-center gap-2"><BarChart3 className="h-5 w-5" />Revenue Analytics</CardTitle></CardHeader>
          <CardContent><div className="h-64 flex items-center justify-center text-muted-foreground">Chart visualization area</div></CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function ReportsAnalytics() {
  return <RoleGuard allowedRole="admin"><ReportsAnalyticsContent /></RoleGuard>;
}
