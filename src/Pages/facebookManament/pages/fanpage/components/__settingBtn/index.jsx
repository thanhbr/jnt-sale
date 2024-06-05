import {Text} from 'common/text'
import {Tooltip} from 'common/tooltip'
import {FACEBOOK_ICONS} from 'Pages/facebookManament/interfaces/_icons'
import {StyledFacebookFanpage__SettingBtn} from './_styled'
import {useNavigate} from 'react-router-dom'
import useGlobalContext from '../../../../../../containerContext/storeContext'
import useFacebookFanpage from '../../hooks/useFacebookFanpage'
import useAlert from 'hook/useAlert'

export const FacebookFanpage__SettingBtn = ({...props}) => {
  const [, GlobalDispatch] = useGlobalContext()

  const {showAlert} = useAlert()
  const {methods} = useFacebookFanpage()

  const nav = useNavigate()

  const goToSetting = () => {
    const check = methods.handleCheckExistPermission()

    if (check) {
      GlobalDispatch({
        type: 'UPDATE_CHANGE_STATUS',
        payload: {
          status: false,
        },
      })
      nav('/facebook/conversation-stickers')
    } else
      showAlert({
        type: 'danger',
        content:
          'Bạn cần có quyền quản trị ít nhất 1 trang trước khi thực hiện cấu hình',
      })
  }

  return (
    <Tooltip placement="bottom" title="Cấu hình">
      <StyledFacebookFanpage__SettingBtn {...props}>
        <Text as="p" onClick={goToSetting}>
          {FACEBOOK_ICONS.gearSix}
        </Text>
      </StyledFacebookFanpage__SettingBtn>
    </Tooltip>
  )
}
