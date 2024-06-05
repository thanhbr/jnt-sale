import {Radio} from 'common/form/radio'
import {NotificationBar} from 'common/notificationBar'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import useFacebookLiveStreamScriptSingle from '../../hooks/useFacebookLivestreamScriptSingle'
import {StyledFacebookLivestreamScriptSingle_OrderTime} from './_styled'

export const FacebookLivestreamScriptSingle_OrderTime = ({...props}) => {
  const {data, configAutoMenuSyntaxMethods} =
    useFacebookLiveStreamScriptSingle()
  const {orderTime} = data.form

  return (
    <StyledFacebookLivestreamScriptSingle_OrderTime {...props}>
      <Text as="div" style={{marginBottom: 12}}>
        Thời điểm tạo đơn <Text color={THEME_SEMANTICS.failed}>*</Text>
      </Text>
      {orderTime.list.map(item => (
        <div
          key={item?.value}
          className="facebook-livestream-script-single-livestream-time__group"
        >
          <Radio
            checked={orderTime.value?.value === item?.value}
            onClick={() =>
              configAutoMenuSyntaxMethods.handleOrderTimeChange(item)
            }
          />
          <Text
            style={{
              margin: '0 8px',
              cursor: 'pointer',
            }}
            onClick={() =>
              configAutoMenuSyntaxMethods.handleOrderTimeChange(item)
            }
          >
            {item?.name}
          </Text>
        </div>
      ))}
      {[1, 2].includes(orderTime.value?.value) && (
        <NotificationBar>
          {orderTime.value?.value === 1 &&
            'Với lựa chọn này, hệ thống sẽ tự động gộp tất cả bình luận đúng cú pháp  của một khách hàng trong buổi livestream thành một đơn nháp duy nhất'}
          {orderTime.value?.value === 2 &&
            'Với lựa chọn này, mỗi bình luận đúng cú pháp trong buổi livestream sẽ được tạo thành một đơn nháp.'}
        </NotificationBar>
      )}
    </StyledFacebookLivestreamScriptSingle_OrderTime>
  )
}
