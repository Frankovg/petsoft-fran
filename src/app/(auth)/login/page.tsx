import AuthForm from '@/components/auth-form'
import H1 from '@/components/h1'
import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <main>
      <H1 className='text-center mb-5'>Log In</H1>

      <AuthForm type='logIn' />

      <p className='mt-6 text-sm text-zinc-500'>
        No account yet?{' '}
        <Link href='/signup'>
          Sign up
        </Link>
      </p>
    </main>
  )
}

export default Page
