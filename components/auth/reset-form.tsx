"use client"

import React, { useState } from 'react'
import CardWrapper from './card-wrapper'

const ResetForm = () => {

  const [error, setError] = useState<string | undefined>("");
  const [succes, setSucces] = useState<string | undefined>("");
  return (
    <div className=' flex items-center justify-center h-full bg-gradient-to-tr from-sky-400 to-blue-800'>
      <CardWrapper
          headerLabel="Forgot your password?"
          backButtonLabel="Back to login"
          backButtonHref="/auth/login"
      >
        
      </CardWrapper>
    </div>
  )
}

export default ResetForm