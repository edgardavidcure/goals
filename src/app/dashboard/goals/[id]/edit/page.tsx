import GoalEditForm from '@/app/ui/goalEditForm';
// import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { notFound } from 'next/navigation';
import { useSession } from 'next-auth/react';


export default async function Page({params} : {params: {id: string}}) {
    const id = params.id
    
  return (
    <main>
      {/* <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      /> */}
      <GoalEditForm goalId={params.id}/>
    </main>
  );
}