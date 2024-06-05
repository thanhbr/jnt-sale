import {NotificationBar} from 'common/notificationBar'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import useShippingTrackingTHead from 'Pages/shippingTrackingManagement/hooks/useShippingTrackingTHead'
import {ShippingTrackingContext} from 'Pages/shippingTrackingManagement/provider/_context'
import {useState} from 'react'
import {useContext} from 'react'
import {UpdateRequestRefund} from '../shippingTrackingTable/_requestRefund'

export const ShippingTrackingNotifications = ({...props}) => {
  const {pageState} = useContext(ShippingTrackingContext)
  const notificationList = pageState.notifications.list

  const [shoudlOpenModal, setShouldOpenModal] = useState(false)

  const {notifications} = useShippingTrackingTHead()

  if (notificationList.length <= 0) return <></>

  return (
    <div {...props} style={{marginTop: 2, marginBottom: 14}}>
      <NotificationBar
        type="danger"
        style={{marginBottom: 8}}
        onClose={notifications.delete}
      >
        Một số đơn hàng không thể cập nhập được trạng thái -{' '}
        <Text
          color={THEME_SEMANTICS.delivering}
          style={{cursor: 'pointer'}}
          onClick={() => setShouldOpenModal(true)}
        >
          Xem chi tiết
        </Text>
      </NotificationBar>
      {shoudlOpenModal && (
        <UpdateRequestRefund
          data={notificationList}
          onClose={() => setShouldOpenModal(false)}
        />
      )}
    </div>
  )
}
