import AuthForm from '@/components/authForm'
import React from 'react'

const page = () => {
  const auth = 'signup'
  return (
    <AuthForm auth={auth} />
  )
}

export default page