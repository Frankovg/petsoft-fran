'use client'

import React from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { usePetContext } from '@/lib/hooks'
import PetFormBtn from './pet-form-btn'
import { ActionType } from '@/lib/types'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { DEFAULT_PET_IMAGE } from '@/lib/constants'
import { TPetForm, petFormSchema } from '@/lib/validations'

type PetFormProps = {
  actionType: ActionType,
  onFormSubmission: VoidFunction
}

const PetForm = ({ actionType, onFormSubmission }: PetFormProps) => {
  const { selectedPet, handleAddPet, handleEditPet } = usePetContext()

  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<TPetForm>({
    resolver: zodResolver(petFormSchema),
    defaultValues: actionType === 'edit'
      ? {
        name: selectedPet?.name,
        ownerName: selectedPet?.ownerName,
        imageUrl: selectedPet?.imageUrl,
        age: selectedPet?.age,
        notes: selectedPet?.notes,
      } : undefined
  })

  return (
    <form
      className='flex flex-col'
      action={async () => {
        const result = await trigger()
        if (!result) return

        onFormSubmission()

        const petData = getValues()
        petData.imageUrl = petData.imageUrl || DEFAULT_PET_IMAGE

        if (actionType === 'add') {
          await handleAddPet(petData)
        } else if (actionType === 'edit') {
          await handleEditPet(selectedPet!.id, petData)
        }
      }}
    >
      <div className='space-y-3'>
        <div className='space-y-1'>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            {...register('name')}
          />
          {errors.name && <span className='text-red-500'>{errors.name.message}</span>}
        </div>

        <div className='space-y-1'>
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input
            id="ownerName"
            {...register('ownerName')}
          />
          {errors.ownerName && <span className='text-red-500'>{errors.ownerName.message}</span>}
        </div>

        <div className='space-y-1'>
          <Label htmlFor="imageUrl">Image Url</Label>
          <Input
            id="imageUrl"
            {...register('imageUrl')}
          />
          {errors.imageUrl && <span className='text-red-500'>{errors.imageUrl.message}</span>}
        </div>

        <div className='space-y-1'>
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            {...register('age')}
          />
          {errors.age && <span className='text-red-500'>{errors.age.message}</span>}
        </div>

        <div className='space-y-1'>
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            {...register('notes')}
          />
          {errors.notes && <span className='text-red-500'>{errors.notes.message}</span>}
        </div>
      </div>

      <PetFormBtn actionType={actionType} />
    </form>
  )
}

export default PetForm
