'use client'
import SideNav from '@/app/ui/dashboard/sidenav';
import Footer from '../ui/footer';
import { useRouter } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';
export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: session } = useSession();

  // Check if there is no session (user is not authenticated)
  if (!session) {
    // Redirect to the login page or show a redirect component
    if (typeof window === 'undefined') {
      // Use server-side redirect
      router.push('/api/redirect'); // Redirect to the login page or your custom redirect page
    } else {
      // Use client-side redirect as a fallback
      signIn()// Redirect to the login page or your custom redirect page
    }
    return null; // Prevent rendering the layout until the redirect happens
  }
      return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          <div className="w-full flex-none md:w-fit">
            <SideNav />
          </div>
          <div className="flex flex-col p-6 md:overflow-y-auto justify-between h-svh w-full">
            {children} 
            <Footer/>
          </div>
        </div>
      );
    }
  
  
