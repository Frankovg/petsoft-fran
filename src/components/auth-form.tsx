'use client'

import React from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { logIn, signUp } from '@/actions/actions'
import AuthFormBtn from './auth-form-btn'
import { useFormState } from 'react-dom'

type AuthFormProps = {
  type: 'logIn' | 'signUp',
}

const AuthForm = ({ type }: AuthFormProps) => {
  const [signUpError, dispatchSignUp] = useFormState(signUp, undefined)
  const [logInError, dispatchLogIn] = useFormState(logIn, undefined)

  return (
    <form action={type === 'logIn' ? dispatchLogIn : dispatchSignUp} >
      <div className='space-y-1'>
        <Label htmlFor='email'>Email</Label>
        <Input
          required
          maxLength={100}
          id='email'
          name='email'
          type='email'
        />
      </div>

      <div className='mb-4 mt-2 space-y-1'>
        <Label htmlFor='password'>Password</Label>
        <Input
          required
          maxLength={100}
          id='password'
          name='password'
          type='password'
        />
      </div>

      <AuthFormBtn type={type} />

      {signUpError && <p className='text-red-500 text-sm mt-2'>{signUpError.message}</p>}
      {logInError && <p className='text-red-500 text-sm mt-2'>{logInError.message}</p>}
    </form>
  )
}

export default AuthForm