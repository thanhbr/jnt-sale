import {NotificationBar} from 'common/notificationBar'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import useOrderTHead from 'Pages/refactorOrder/hooks/useOrderTHead'
import {OrderContext} from 'Pages/refactorOrder/provider/_context'
import {useState} from 'react'
import {useContext} from 'react'
import {UpdateStatusFailedModal} from '../orderTable/_updateStatusFailedModal'

export const OrderNotifications = ({...props}) => {
  const {pageState} = useContext(OrderContext)
  const notificationList = pageState.notifications.list

  const [shoudlOpenModal, setShouldOpenModal] = useState(false)

  const {notifications} = useOrderTHead()

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
        <UpdateStatusFailedModal
          data={notificationList}
          onClose={() => setShouldOpenModal(false)}
        />
      )}
    </div>
  )
}
