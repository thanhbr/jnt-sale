import {NotificationBar} from 'common/notificationBar'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import useCodTHead from '../../hooks/useOrderTHead'
import {CodContext} from '../../provider/_context'
import {useState} from 'react'
import {useContext} from 'react'
import {UpdateStatusFailedModal} from '../codTable/_updateStatusFailedModal'

export const CodNotifications = ({...props}) => {
  const {pageState} = useContext(CodContext)
  const notificationListFail = pageState.notifications.listFail
  const notificationListSuccess = pageState.notifications.listSuccess

  const [shoudlOpenModal, setShouldOpenModal] = useState(false)

  const {notifications} = useCodTHead()

  if (notificationListFail.length <= 0) return <></>

  return (
    <div {...props} style={{marginTop: 2, marginBottom: 16}}>
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
          dataFail={notificationListFail}
          dataSuccess={notificationListSuccess}
          onClose={() => setShouldOpenModal(false)}
        />
      )}
    </div>
  )
}
