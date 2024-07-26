import AuthForm from '@/components/auth-form'
import H1 from '@/components/h1'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <main>
      <H1 className='text-center mb-5'>Sing Up</H1>

      <AuthForm type='signUp' />

      <p className='mt-6 text-sm text-zinc-500'>
        Already have an account?{' '}
        <Link href='/login'>
          Log in
        </Link>
      </p>
    </main>
  )
}

export default page
