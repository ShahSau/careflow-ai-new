import { departments } from '@/data';
import DepartmentDetailPage from './department-page';

export function generateStaticParams() {
  return departments.map((dept) => ({
    name: dept.slug,
  }));
}

export default function Page({ params }: { params: { name: string } }) {
  return <DepartmentDetailPage params={params} />;
}
