import {Radio} from 'common/form/radio'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import useFacebookLiveStreamScriptSingle from '../../hooks/useFacebookLivestreamScriptSingle'

export const FacebookLivestreamScriptSingle_OrderConfirm = ({...props}) => {
  const {data, configAutoMenuSyntaxMethods} =
    useFacebookLiveStreamScriptSingle()
  const {orderConfirm} = data.form

  return (
    <div {...props}>
      <Text as="div" style={{marginBottom: 12}}>
        Gửi tin nhắn xác nhận đơn hàng{' '}
        <Text color={THEME_SEMANTICS.failed}>*</Text>
      </Text>
      <div style={{display: 'flex'}}>
        <Radio
          checked={orderConfirm.value}
          onClick={() =>
            configAutoMenuSyntaxMethods.handleOrderConfirmToggle(true)
          }
        />
        <Text
          style={{marginLeft: 8, marginRight: 40, cursor: 'pointer'}}
          onClick={() =>
            configAutoMenuSyntaxMethods.handleOrderConfirmToggle(true)
          }
        >
          Có
        </Text>
        <Radio
          checked={!orderConfirm.value}
          onClick={() =>
            configAutoMenuSyntaxMethods.handleOrderConfirmToggle(false)
          }
        />
        <Text
          style={{marginLeft: 8, cursor: 'pointer'}}
          onClick={() =>
            configAutoMenuSyntaxMethods.handleOrderConfirmToggle(false)
          }
        >
          Không
        </Text>
      </div>
    </div>
  )
}
