import {AddressSeparationToolContext} from 'Pages/addressSeparationTool'
import {actions} from 'Pages/addressSeparationTool/_reducer'
import {useContext} from 'react'
import {ConfirmTheFileHasBeenFiledModal} from './modals/confirmFiled'
import {ImportAddressSeparatorFileModal} from './modals/importAddress'

export const MODAL_ID = {
  confirmTheFileHasBeenFiled: 'confirm-the-file-has-been-filed',
  importAddressSeparatorFile: 'import-address-separator-file',
}

export const AddressModalPicker = () => {
  const {pageState, pageDispatch} = useContext(AddressSeparationToolContext)
  const {modal} = pageState

  const handleCloseModal = () => pageDispatch({type: actions.MODAL_CLOSE})

  return (
    <>
      <ConfirmTheFileHasBeenFiledModal
        open={modal?.id === MODAL_ID.confirmTheFileHasBeenFiled}
        onClose={() => handleCloseModal()}
      />
      <ImportAddressSeparatorFileModal
        open={modal?.id === MODAL_ID.importAddressSeparatorFile}
        onClose={() => handleCloseModal()}
      />
    </>
  )
}
