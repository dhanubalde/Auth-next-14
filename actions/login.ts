"use server"

import { getUserByEmail } from "@/data/user";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import * as z from "zod"

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null,
) => { 
  
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) { 
    return {error: "Invalid fields"};
  }

  const { email, password  } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser || !existingUser.email || !existingUser.password) { 
    return {error: "Email does not exist"};
  }


  // if all credentials are valid then redirect to /settings
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) { 
    if (error instanceof AuthError) { 
      switch (error.type) { 
        case "CredentialsSignin":
          return { error: "Invalid credentials!" }
        default: 
          return { error: "Something went wrong!"}
      }
    }
    throw error;
  } 

}