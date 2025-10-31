import PatientDetailsClient from './patient-details-client';

export function generateStaticParams() {
  return [
    { id: 'PT12345' },
    { id: 'PT12346' },
    { id: 'PT12347' }
  ];
}

export default function PatientDetails({ params }: { params: { id: string } }) {
  return <PatientDetailsClient params={params} />;
}
