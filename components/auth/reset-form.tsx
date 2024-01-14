"use client"
import * as z from "zod"
import React, { startTransition, useState, useTransition } from 'react'
import CardWrapper from './card-wrapper'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { useForm } from 'react-hook-form';
import { ResetSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { Button } from "../ui/button";
import { reset } from "@/actions/reset";
import { useRouter } from "next/navigation";

const ResetForm = () => {

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, setTransition] = useTransition();
  const router = useRouter()

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    }
  })

  const onSubmit = (values: z.infer<typeof ResetSchema>) => { 
    setError("");
    setSuccess("");

    startTransition(() => { 
      reset(values)
        .then((data) => { 
          if (data?.error) { 
            form.reset()
            setError(data.error)
          }
          if (data?.success) {
            setSuccess(data.success);
          }
        })
    })
    
  }

  return (
    <div className=' flex items-center justify-center h-full bg-gradient-to-tr   from-sky-400 via-rose-400 to-blue-800'>
      <CardWrapper
          headerLabel="Forgot your password?"
          backButtonLabel="Back to login"
          backButtonHref="/auth/login"
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" space-y-6"
          >
            <div className=" space-x-4">
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
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button
              disabled={isPending}
              className="w-full"
              type="submit"
            >
              Send reset email
            </Button>
          </form> 
        </Form>
      </CardWrapper>
    </div>
  )
}

export default ResetForm