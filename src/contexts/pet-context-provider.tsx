'use client'

import { addPet, deletePet, editPet } from "@/actions/actions"
import { PetEssentials } from "@/lib/types"
import { Pet } from "@prisma/client"
import { createContext, useState } from "react"
import { useOptimistic } from "react"
import { toast } from "sonner"

type PetContextProviderProps = {
  data: Pet[],
  children: React.ReactNode,
}

type TPetContext = {
  pets: Pet[],
  selectedPetId: Pet['id'] | null,
  handleChangeSelectedPetId: (id: Pet['id']) => void,
  selectedPet: Pet | undefined,
  numberOfPets: number,
  handleCheckoutPet: (id: Pet['id']) => Promise<void>,
  handleAddPet: (newPet: PetEssentials) => Promise<void>,
  handleEditPet: (petId: Pet['id'], newPetData: PetEssentials) => Promise<void>,
}

export const PetContext = createContext<TPetContext | null>(null)

const PetContextProvider = ({ data, children }: PetContextProviderProps) => {
  // Optimistic UI -> to update automatically the UI (it works as a state)
  const [optimisticPets, setOptimisticPets] = useOptimistic(
    data,
    (prev, { action, payload }) => {
      switch (action) {
        case "add":
          return [...prev, { ...payload, id: Math.random().toString() }]
        case "edit":
          return prev.map(pet => {
            if (pet.id === payload.id) {
              return { ...pet, ...payload.newPetData }
            }
            return pet
          })
        case "delete":
          return prev.filter(pet => pet.id !== payload)
        default:
          return prev
      }
    }
  )
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null)

  const selectedPet = optimisticPets.find(pet => pet.id === selectedPetId)
  const numberOfPets = optimisticPets.length

  const handleAddPet = async (newPet: PetEssentials) => {
    setOptimisticPets({ action: "add", payload: newPet })
    const error = await addPet(newPet)
    if (error) {
      toast.warning(error.message)
      return
    }
  }

  const handleEditPet = async (petId: Pet['id'], newPetData: PetEssentials) => {
    setOptimisticPets({ action: "edit", payload: { id: petId, newPetData } })
    const error = await editPet(petId, newPetData)
    if (error) {
      toast.warning(error.message)
      return
    }
  }

  const handleCheckoutPet = async (petId: Pet['id']) => {
    setOptimisticPets({ action: "delete", payload: petId })
    const error = await deletePet(petId)
    if (error) {
      toast.warning(error.message)
      return
    }
    setSelectedPetId(null)
  }

  const handleChangeSelectedPetId = (id: Pet['id']) => {
    setSelectedPetId(id)
  }

  return (
    <PetContext.Provider value={{
      pets: optimisticPets,
      selectedPetId,
      handleChangeSelectedPetId,
      selectedPet,
      numberOfPets,
      handleCheckoutPet,
      handleAddPet,
      handleEditPet,
    }}>
      {children}
    </PetContext.Provider>
  )
}

export default PetContextProvider
