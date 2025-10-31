'use client';

import { useAuth } from '@/lib/auth-context';
import { RoleGuard } from '@/components/role-guard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Hospital, Bell, ChevronLeft, Package, Edit } from 'lucide-react';
import Link from 'next/link';

function InventoryManagementContent() {
  const { user, logout } = useAuth();

  const inventory = [
    { id: 'INV001', item: 'Surgical Masks', quantity: 150, minStock: 100, category: 'PPE', status: 'In Stock' },
    { id: 'INV002', item: 'Gloves', quantity: 45, minStock: 200, category: 'PPE', status: 'Low Stock' },
    { id: 'INV003', item: 'Syringes', quantity: 500, minStock: 300, category: 'Medical', status: 'In Stock' },
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
          <div className="flex-1"><h1 className="text-4xl font-bold">Inventory Management</h1></div>
          <Button className="bg-cyan-600 hover:bg-cyan-700"><Package className="h-5 w-5 mr-2" />Add Item</Button>
        </div>
        <Card className="border-2">
          <CardContent className="pt-6">
            <Table>
              <TableHeader><TableRow><TableHead>Item ID</TableHead><TableHead>Item Name</TableHead><TableHead>Quantity</TableHead><TableHead>Min Stock</TableHead><TableHead>Category</TableHead><TableHead>Status</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
              <TableBody>
                {inventory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell className="font-medium">{item.item}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.minStock}</TableCell>
                    <TableCell><Badge variant="outline">{item.category}</Badge></TableCell>
                    <TableCell><Badge className={item.status === 'In Stock' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>{item.status}</Badge></TableCell>
                    <TableCell><Button size="sm" variant="ghost"><Edit className="h-4 w-4" /></Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function InventoryManagement() {
  return <RoleGuard allowedRole="admin"><InventoryManagementContent /></RoleGuard>;
}
