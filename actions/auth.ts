'use server';

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { ensureUserExists } from "@/lib/users";

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

export async function login(data: z.infer<typeof FormSchema>) {
  const supabase = await createClient();

  const { error, data: authData } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error: error.message };
  }

  if (authData.user) {
    await ensureUserExists(authData.user);
  }

  return { success: true };
}

export async function signup(data: z.infer<typeof FormSchema>) {
  const supabase = await createClient();

  const { error, data: authData } = await supabase.auth.signUp(data);

  if (error) {
    return { error: error.message };
  }
  
  if (authData.user) {
    await ensureUserExists(authData.user);
  }

  return { success: true };
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/login');
}
