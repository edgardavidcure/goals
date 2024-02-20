import SideNav from '@/app/ui/dashboard/sidenav';
import Footer from '../ui/footer';
export default function Layout({ children }: { children: React.ReactNode }) {
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