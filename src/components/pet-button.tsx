'use client'

import { PlusIcon } from "@radix-ui/react-icons"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import PetForm from './pet-form'
import { useState } from "react"
import { flushSync } from "react-dom"

type PetButtonProps = {
  actionType: 'edit' | 'checkout' | 'add',
  disabled?: boolean,
  children?: React.ReactNode,
  onClick?: VoidFunction,
}

const PetButton = ({
  actionType,
  disabled,
  children,
  onClick,
}: PetButtonProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false)

  if (actionType === 'checkout') {
    return (
      <Button variant='secondary' disabled={disabled} onClick={onClick}>
        {children}
      </Button>
    )
  }

  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
      <DialogTrigger asChild>
        {actionType === 'add' ? (
          <Button size='icon'>
            <PlusIcon className="h-6 w-6" />
          </Button>
        ) : (
          <Button variant='secondary'>
            {children}
          </Button>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {actionType === 'add' ? 'Add a new pet' : 'Edit pet'}
          </DialogTitle>
        </DialogHeader>

        <PetForm actionType={actionType} onFormSubmission={() => {
          flushSync(() => {
            setIsFormOpen(false) // To ensure the dialog closes after the form submission
          })
        }}
        />
      </DialogContent>
    </Dialog>
  )
}

export default PetButton
