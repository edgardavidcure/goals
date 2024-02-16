import { Metadata } from 'next';
import { UserComponent } from '@/app/ui/dashboard/userDashboard';
export const metadata: Metadata = {
  title: 'User Dashboard',
};

export default async function Page({ params }: { params: { email: string } }) {
	
  return (
        <div>
           <UserComponent params={params}/>
        </div>
    )
}

