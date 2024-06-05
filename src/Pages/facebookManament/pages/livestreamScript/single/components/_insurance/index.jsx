import {CurrencyInput} from 'common/form/input/_currencyInput'
import {Switch} from 'common/switch'
import {Text} from 'common/text'
import {useEffect} from 'react'
import {useState} from 'react'
import useFacebookLiveStreamScriptSingle from '../../hooks/useFacebookLivestreamScriptSingle'

export const FacebookLivestreamScriptSingle_Insurance = ({...props}) => {
  const {data, shippingInfoMethods} = useFacebookLiveStreamScriptSingle()
  const {insurance} = data.form

  const [triggerDefault, setTriggerDefault] = useState(true)

  useEffect(() => {
    setTriggerDefault(!triggerDefault)
  }, [insurance.valueOrigin])

  return (
    <div
      {...props}
      style={{position: 'relative', userSelect: 'none', ...props?.style}}
    >
      <Switch
        checked={!insurance.disabled}
        style={{position: 'absolute', top: 0, right: 0, zIndex: 2}}
        onClick={shippingInfoMethods.handleInsuranceDisabledToggle}
      />
      <CurrencyInput
        label="Bảo hiểm hàng hóa"
        placeholder="Nhập giá trị bảo hiểm"
        defaultValue={insurance.value}
        disabled={insurance.disabled}
        triggerDefault={triggerDefault}
        style={{zIndex: 1}}
        onChange={val => shippingInfoMethods.handleInsuranceChange(val)}
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
