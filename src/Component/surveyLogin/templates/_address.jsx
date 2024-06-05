import {Button} from 'common/button'
import {Input} from 'common/form/input'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import UseSurveyLogin from '../hooks/index'
import useSurveyLoginContext from '../hooks/_context'
import {ORDER_SINGLE_ICONS} from 'Pages/orderSingle/interface/_icons'
import { Satellite } from '@material-ui/icons'

export const InfoAddress = ({...props}) => {
  const [state, dispatch]= useSurveyLoginContext();
  const {address,properties, methods} = UseSurveyLogin()

  return (
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
          Địa chỉ đầy đủ <Text color={THEME_SEMANTICS.failed}>*</Text>
        </>
      }
      placeholder="Số nhà, tên đường, phường/xã, thôn/xóm, bệnh viện,.."
      value={address.value}
      validateText={state.dataUpdate.address == '' ? "Vui lòng nhập địa chỉ" :""}
      validateType="danger"
      onBlur={(e) =>{
        methods.onAddressChange(e.target.value)
        dispatch({type: 'SET_ADDRESS_UPDATE', payload: e.target.value})
      }}
      onChange={e => {
        methods.onAddressChange(e.target.value)
        dispatch({type: 'SET_ADDRESS_UPDATE', payload: e.target.value})
      }}
      onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }}
    />
  )
}
