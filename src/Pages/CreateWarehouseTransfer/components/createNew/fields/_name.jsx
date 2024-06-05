import {Input} from 'common/form/input'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import { actionTypes } from 'Pages/CreateWarehouseTransfer/provider/_actions'
import {WarehouseTransferContext} from 'Pages/CreateWarehouseTransfer/provider/_context'
import {useContext, useEffect, useState} from 'react'
import useInfo from '../../../hooks/useInfo'

const Name = ({...props}) => {
  const {state, dispatch} = useContext(WarehouseTransferContext)
  const {data, methods} = useInfo()
  const {name} = data
  const nameError = state.createModal.errors.find(x => x.field === 'warehouse_name')

  const [touch, setTouch] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = e => {
    dispatch({
      type: actionTypes.SET_CREATE_MODAL,
      payload: {
        errors: state.createModal.errors.filter(x => x.field !== 'warehouse_name')
      },
    })
    methods.onNameChange(e.target.value)
    setTouch(true)
  }

  useEffect(() => {
    let errMsg = ''

    if (touch && !name.value) errMsg = 'Tên kho không được bỏ trống.'
    else if (nameError) errMsg = nameError?.message
    else if (touch && name.value.length > 30)
      errMsg = 'Tên kho không được lớn hơn 30 ký tự.'

    setErrorMessage(errMsg)
  }, [touch, name.value, nameError])

  return (
    <>
      <Input
        {...props}
        label={
          <>
            Tên kho <Text color={THEME_SEMANTICS.failed}>*</Text>
          </>
        }
        validateText={errorMessage}
        validateType="danger"
        placeholder="Nhập tên kho"
        value={name.value}
        onChange={handleChange}
        onBlur={() => setTouch(true)}
      />
    </>
  )
}

export default Name
