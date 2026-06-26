import { hasAccess, Plan } from "@/lib/plan";

export default function Protected({
  userPlan,
  required,
  children,
}: {
  userPlan: Plan;
  required: Plan;
  children: React.ReactNode;
}) {
  if (!hasAccess(userPlan, required)) {
    return (
      <div className="p-6 border border-red-500 text-red-400">
        Upgrade required to access this feature
      </div>
    );
  }

  return <>{children}</>;
}
