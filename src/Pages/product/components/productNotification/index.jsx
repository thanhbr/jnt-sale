import {NotificationBar} from 'common/notificationBar'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {useState} from 'react'
import {useContext} from 'react'
import useProductFilterForm from "../../hooks/useProductFilterForm";
import {UpdateStatusFailedModal} from "../modal/notificationImport"
import {ProductContext} from "../../provider/~context";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../const/display_name_menu";
export const ProductNotifications = ({...props}) => {
  const { t } = useTranslation()
    const {pageState} = useContext(ProductContext)
    const notificationList = pageState.notifications.list
    const notificationTotal = pageState.notifications.total

    const [shoudlOpenModal, setShouldOpenModal] = useState(false)

    const {notifications} = useProductFilterForm()
    if (notificationList.length <= 0) return <></>

    return (
        <div {...props} style={{marginTop: 2, marginBottom: 14}}>
            <NotificationBar
                type="danger"
                style={{marginBottom: 8}}
                onClose={notifications.delete}
            >
                {t(DISPLAY_NAME_MENU.PRODUCT_PAGE.IMPORT_NOTIFY)} -{' '}
                <Text
                    color={THEME_SEMANTICS.delivering}
                    style={{cursor: 'pointer'}}
                    onClick={() => setShouldOpenModal(true)}
                >
                  {t(DISPLAY_NAME_MENU.GENERAL.VIEW_DETAIL)}
                </Text>
            </NotificationBar>
            {shoudlOpenModal && (
                <UpdateStatusFailedModal
                    data={notificationList}
                    total={notificationTotal}
                    onClose={() => setShouldOpenModal(false)}
                />
            )}
        </div>
    )
}
