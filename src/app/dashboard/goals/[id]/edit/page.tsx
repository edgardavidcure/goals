import GoalEditForm from "@/app/ui/goalEditForm";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  return (
    <main>
      <GoalEditForm goalId={params.id} />
    </main>
  );
}
