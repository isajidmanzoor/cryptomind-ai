import { supabase } from "../../lib/supabase";

export async function savePortfolio(userId: string, coins: any) {
  const { data, error } = await supabase.from("portfolio").insert([
    {
      user_id: userId,
      coins,
    },
  ]);

  if (error) throw error;
  return data;
}

export async function getPortfolio(userId: string) {
  const { data, error } = await supabase
    .from("portfolio")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;
  return data;
}
