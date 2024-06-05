import {NotificationBar} from 'common/notificationBar'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import useBulkOrderCreateForm from 'Pages/bulkOrder/hooks/useBulkOrderCreateForm'
import {StyledBulkOrderCreateNotifications} from './_styled'

export const BulkOrderCreateNotifications = ({...props}) => {
  const {shippingPartner, properties} = useBulkOrderCreateForm()

  return (
    <StyledBulkOrderCreateNotifications {...props}>
      {shippingPartner.data.listOrigin.length <= 0 && !properties.loading && (
        <NotificationBar
          className="bulk-order-create-notifications__item"
          type="warning"
        >
          Dường như bạn chưa kết nối với đối tác vận chuyển nào. Hãy kết nối
          trước khi thực hiện lên đơn -{' '}
          <Text
            as="a"
            href="/shipping/shipping-partners"
            color={THEME_SEMANTICS.delivering}
          >
            Kết nối đối tác vận chuyển
          </Text>
        </NotificationBar>
      )}
    </StyledBulkOrderCreateNotifications>
  )
}
