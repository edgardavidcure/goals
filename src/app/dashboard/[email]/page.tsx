import { UserComponent } from "@/app/ui/dashboard/userDashboard";
import { CardWrapper } from "@/app/ui/dashboard/cards";
import LatestGoals from "@/app/ui/dashboard/latest-goals";
import Footer from "@/app/ui/footer";
export default function Page({ params }: { params: { email: string } }) {
  return (
    <div className="flex flex-col m-5">
      <UserComponent params={params} />
      <div className="grid gap-6 justify-items-center content-center sm:grid-cols-2 lg:grid-cols-4">
        <CardWrapper params={params} />
      </div>
      <LatestGoals params={params} />
    </div>
  );
}
