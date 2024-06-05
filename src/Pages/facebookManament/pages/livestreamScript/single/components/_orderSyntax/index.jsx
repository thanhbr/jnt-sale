import {Checkbox} from 'common/form/checkbox'
import {NotificationBar} from 'common/notificationBar'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {Tooltip} from 'common/tooltip'
import {FACEBOOK_ICONS} from 'Pages/facebookManament/interfaces/_icons'
import useFacebookLiveStreamScriptSingle from '../../hooks/useFacebookLivestreamScriptSingle'
import {StyledFacebookLivestreamScriptSingle_OrderSyntax} from './_styled'

export const FacebookLivestreamScriptSingle_OrderSyntax = ({...props}) => {
  const {data, configAutoMenuSyntaxMethods} =
    useFacebookLiveStreamScriptSingle()
  const {orderSyntax} = data.form
  return (
    <StyledFacebookLivestreamScriptSingle_OrderSyntax {...props}>
      <Text as="div" style={{marginBottom: 12}}>
        Cú pháp tạo đơn <Text color={THEME_SEMANTICS.failed}>*</Text>
      </Text>
      {orderSyntax.list.map(item => (
        <div
          key={item?.value}
          className="facebook-livestream-script-single-livestream-syntax__group"
        >
          <Checkbox
            checked={
              !!orderSyntax.value.find(find => find?.value === item?.value)
            }
            disabled={item?.data?.disabled}
            onClick={() =>
              !item?.data?.disabled &&
              configAutoMenuSyntaxMethods.handleOrderSyntaxChange(item)
            }
          />
          <Text
            style={{
              margin: '0 8px',
              cursor: item?.data?.disabled ? 'no-drop' : 'pointer',
            }}
            onClick={() =>
              !item?.data?.disabled &&
              configAutoMenuSyntaxMethods.handleOrderSyntaxChange(item)
            }
          >
            {item?.name}
          </Text>
          {item?.data?.tooltip && (
            <Tooltip
              className="alert-address"
              placement="bottom-start"
              title={<div style={{maxWidth: 433}}>{item?.data?.tooltip}</div>}
            >
              <i
                style={{
                  display: 'inline-block',
                  transform: 'translateY(3px)',
                }}
              >
                {FACEBOOK_ICONS.question01}
              </i>
            </Tooltip>
          )}
        </div>
      ))}
      <NotificationBar>
        {!!orderSyntax.value.find(item => item?.value === 2)
          ? 'Với lựa chọn này, hệ thống sẽ tự động tạo đơn nháp đối với bình luận chứa một trong những từ khóa được khai báo và số điện thoại'
          : 'Với lựa chọn này, hệ thống sẽ tự động tạo đơn nháp đối với bình luận chứa một trong những từ khóa được khai báo'}
      </NotificationBar>
    </StyledFacebookLivestreamScriptSingle_OrderSyntax>
  )
}
