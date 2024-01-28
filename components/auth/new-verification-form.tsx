"use client"

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react"
import CardWrapper from "./card-wrapper";
import { FormSuccess } from "../form-success";
import { FormError } from "../form-error";
import { newVerification } from "@/actions/new-verification";



const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      })
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className=" flex items-center justify-center h-full w-full bg-gradient-to-r from-sky-400 via-emerald-400 to-blue-800">
    <CardWrapper
    headerLabel="Confirming your verification"
    backButtonLabel="Back to login"
    backButtonHref="/auth/login"
  >
    <div className="flex items-center w-full justify-center">
      {!success && !error && (
        <p>Loading</p>
      )}
      <FormSuccess message={success} />
      {!success && (
        <FormError message={error} />
      )}
    </div>
      </CardWrapper>
    </div>
  )
}

export default NewVerificationForm