"use client"
import * as z from "zod"
import {  useSearchParams } from "next/navigation"
import { useState, useTransition } from "react";
import { useForm} from "react-hook-form"
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import CardWrapper from "./card-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { login } from "@/actions/login";



const LoginForm = () => {
  
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? `Email Already in use with different 'Providers'` : "";

  const [showTwoFactor, setShowTwoFactor] = useState(false)
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();


  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

  
    startTransition(() => {

      login(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            form.reset()
            setError(data.error);
          }
          if (data?.success) {
            setSuccess(data.success);
          }
          
        
        })
        .catch(() => setError("Something wnt wrong"))
    });


   }
  return (
    <div className=" flex items-center justify-center h-full w-full bg-gradient-to-r from-sky-400 via-emerald-400 to-blue-800">
    <CardWrapper
      headerLabel="Welcome Back"
      backButtonLabel="Don't have an account"
      backButtonHref="/auth/register"
      showSocial
    >
        <Form {...form}>
          <form
            className=" space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className=" space-y-4">
              {showTwoFactor && (
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Two Factor Code</FormLabel>
                      <FormControl>
                        <Input
                        {...field}
                        disabled={isPending}
                        placeholder="123456"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}

              {!showTwoFactor && (
                <>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="john.doe@example.com"
                            type="email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="******"
                            type="password"
                          />
                        </FormControl>
                        <Button
                          size="sm"
                          variant="link"
                          asChild
                          className="px-0 font-normal"
                        >
                          <Link href="/auth/reset">
                            Forgot password?
                          </Link>
                        </Button>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>
            <FormError message={error || urlError} />
            <FormSuccess message={success} />
          <Button
            disabled={isPending}
            type="submit"
            className="w-full"
          >
            {showTwoFactor ? "Confirm" : "Login"}
          </Button>
          </form>
        </Form>
      </CardWrapper>
      </div>
  )
}

export default LoginForm