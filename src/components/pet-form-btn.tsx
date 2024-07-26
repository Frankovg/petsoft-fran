import { ActionType } from '@/lib/types'
import { Button } from './ui/button'

const PetFormBtn = ({
  actionType
}: { actionType: ActionType }) => {

  return (
    <Button type='submit' className='mt-5 self-end'>
      {actionType === 'add' ? 'Add a new Pet' : 'Edit pet'}
    </Button>
  )
}

export default PetFormBtn
