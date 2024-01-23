"use client"

import { useSearchParams } from "next/navigation";
import { useCallback, useState } from "react"




const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const onSubmit = useCallback(() => {
    if (success || error) return
    
    if (!token) { 
      setError("Missing token!");
      return;
    }

  },[token,success,error ])

  return (
    <div>NewVerificationForm</div>
  )
}

export default NewVerificationForm