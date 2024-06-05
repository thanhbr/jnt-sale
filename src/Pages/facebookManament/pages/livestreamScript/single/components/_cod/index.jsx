import {CurrencyInput} from 'common/form/input/_currencyInput'
import {Switch} from 'common/switch'
import {Text} from 'common/text'
import {useEffect} from 'react'
import {useState} from 'react'
import useFacebookLiveStreamScriptSingle from '../../hooks/useFacebookLivestreamScriptSingle'

export const FacebookLivestreamScriptSingle_Cod = ({...props}) => {
  const {data, shippingInfoMethods} = useFacebookLiveStreamScriptSingle()
  const {cod} = data.form

  const [triggerDefault, setTriggerDefault] = useState(true)

  useEffect(() => {
    setTriggerDefault(!triggerDefault)
  }, [cod.valueOrigin])

  return (
    <div
      {...props}
      style={{position: 'relative', userSelect: 'none', ...props?.style}}
    >
      <Switch
        checked={!cod.disabled}
        style={{position: 'absolute', top: 0, right: 0, zIndex: 2}}
        onClick={shippingInfoMethods.handleCodDisabledToggle}
      />
      <CurrencyInput
        label="Tiền thu hộ"
        placeholder="Nhập giá trị thu hộ"
        defaultValue={cod.value}
        disabled={cod.disabled}
        triggerDefault={triggerDefault}
        style={{zIndex: 1}}
        onChange={val => shippingInfoMethods.handleCodChange(val)}
        icon={
          <Text
            as="u"
            color="#7C88A6"
            style={{width: '100%', display: 'block', textAlign: 'center'}}
          >
            đ
          </Text>
        }
      />
    </div>
  )
}
