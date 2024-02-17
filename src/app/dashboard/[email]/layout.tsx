import SideNav from '@/app/ui/dashboard/sidenav';
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full sticky top-0 flex-none md:w-fit">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto">{children}</div>
    </div>
  );
}