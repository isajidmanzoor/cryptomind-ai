export type Plan = "free" | "pro" | "elite";

export function hasAccess(plan: Plan, required: Plan) {
  const levels = {
    free: 0,
    pro: 1,
    elite: 2,
  };

  return levels[plan] >= levels[required];
}
