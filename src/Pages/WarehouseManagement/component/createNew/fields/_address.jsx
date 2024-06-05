import { Button } from 'common/button'
import { Input } from 'common/form/input'
import { Text } from 'common/text'
import { THEME_SEMANTICS } from 'common/theme/_semantics'
import { ORDER_SINGLE_ICONS } from 'Pages/orderSingle/interface/_icons'
import { useEffect, useState } from 'react'
import useInfo from '../../../hooks/useInfo'

const Address = ({ ...props }) => {
  const { data, properties, methods } = useInfo()
  const { address } = data

  const [touch, setTouch] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let errMsg = ''
    if (touch && !address.value) errMsg = 'Địa chỉ không được để trống.'
    setErrorMessage(errMsg)
  }, [touch, address.value])

  return (
    <>
      <Input
        {...props}
        button={
          <Button
            disabled={!properties.canSplitAddress}
            icon={ORDER_SINGLE_ICONS.target}
            onClick={methods.onAddressSplit}
          >
            Tách
          </Button>
        }
        label={
          <>
            Địa chỉ <Text color={THEME_SEMANTICS.failed}>*</Text>
          </>
        }
        validateText={properties.errorSeparate ? "evoshop chưa nhận diện được địa chỉ này, hãy kiểm tra lại hoặc tự chọn địa chỉ ở bên dưới bạn nhé!" : errorMessage}
        validateType="danger"
        placeholder="Số nhà, tên đường, phường/xã, thôn/xóm, bệnh viện,.."
        value={address.value}
        onChange={e => methods.onAddressChange(e.target.value)}
        onBlur={() => setTouch(true)}
      />
{/* 
      {touch && !address.value && (
        <p className="units-manage-error">Địa chỉ không được để trống.</p>
      )} */}
    </>
  )
}

export default Address