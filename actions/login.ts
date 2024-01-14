"use server"

import { getUserByEmail } from "@/data/user";
import { LoginSchema } from "@/schemas";
import * as z from "zod"

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null,
) => { 
  
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) { 
    return {error: "Invalid fields"};
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email)

  if (!existingUser || !existingUser.email || !existingUser.password) { 
    return {error: "Email does not exist"};
  }


  return {success: "Email sent!"}

  
}