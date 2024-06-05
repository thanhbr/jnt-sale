import {NotificationBar} from 'common/notificationBar'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import useForControlCODTHead from 'Pages/ForControlCOD/Tab2/hooks/useForControlCODTHead'
import {ForControlCODContext} from 'Pages/ForControlCOD/Tab2/provider/_context'
import {useState} from 'react'
import {useContext} from 'react'
import {UpdateStatusFailedModal} from '../Table/_updateStatusFailedModal'
import {useTranslation} from "react-i18next";

export const ForControlCODNotifications = ({...props}) => {
  const {pageState} = useContext(ForControlCODContext)
  const notificationList = pageState.notifications.list

  const [shoudlOpenModal, setShouldOpenModal] = useState(false)

  const {notifications} = useForControlCODTHead()
  const { t } = useTranslation()

  if (notificationList.length <= 0) return <></>

  return (
    <div {...props} style={{marginTop: 2, marginBottom: 14}}>
      <NotificationBar
        type="danger"
        style={{marginBottom: 8}}
        onClose={notifications.delete}
      >
        {t("unable_to_update_order_status")} -{' '}
        <Text
          color={THEME_SEMANTICS.delivering}
          style={{cursor: 'pointer'}}
          onClick={() => setShouldOpenModal(true)}
        >
          {t("view_details")}
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
