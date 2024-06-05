import {sendRequestAuth} from 'api/api'
import {Popper} from 'common/popper'
import {Text} from 'common/text'
import config from 'config'
import useAlert from 'hook/useAlert'
import {FACEBOOK_ICONS} from 'Pages/facebookManament/interfaces/_icons'
import {useState} from 'react'
import useFacebookLiveStreamScript from '../../hooks/useFacecbookLivestreamScript'
import {FacebookLivestreamScriptConfirmDeleteModal} from '../confirmDeleteModal'
import {StyledFacebookLivestreamScript_RowMenu} from './_styled'

export const FacebookLivestreamScript_RowMenu = ({data}) => {
  const {showAlert} = useAlert()

  const {methods} = useFacebookLiveStreamScript()

  const [shouldOpenConfirmModal, setShoudlOpenConfirmModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const actions = [
    {
      id: 1,
      name: 'Chỉnh sửa',
      icon: FACEBOOK_ICONS.edit05,
      href: `/facebook/livestream-scripts/${data?.id}`,
      onClick: null,
    },
    {
      id: 2,
      name: 'Xóa',
      type: 'danger',
      icon: FACEBOOK_ICONS.trash,
      onClick: () => setShoudlOpenConfirmModal(true),
    },
  ]

  const handleDelete = async () => {
    setIsLoading(true)
    const response = await sendRequestAuth(
      'delete',
      `${config.API}/fb/setting/order-script/delete/${data?.id}`,
    )

    if (response?.data?.success) {
      methods.getScripts()
      showAlert({
        type: 'success',
        content: 'Đã xoá kịch bản lên đơn tự động thành công',
      })
      setShoudlOpenConfirmModal(false)
    } else
      showAlert({
        type: 'danger',
        content: 'Đã xoá kịch bản lên đơn tự động thất bại',
      })

    setIsLoading(false)
  }

  return (
    <>
      <Popper
        placement="left-start"
        renderPopper={({onClose}) => (
          <StyledFacebookLivestreamScript_RowMenu>
            {actions.map(item => (
              <Text
                as={item?.href ? 'a' : 'div'}
                key={item?.id}
                className="facebook-livestream-script-row-menu__item"
                href={item?.href}
                data-type={item?.type}
                onClick={() => {
                  if (onClose) onClose()
                  if (item?.onClick) item.onClick()
                }}
              >
                <i className="facebook-livestream-script-row-menu__icon">
                  {item?.icon}
                </i>
                <span>{item?.name}</span>
              </Text>
            ))}
          </StyledFacebookLivestreamScript_RowMenu>
        )}
      >
        <i style={{cursor: 'pointer'}}>{FACEBOOK_ICONS.manipulation}</i>
      </Popper>
      {shouldOpenConfirmModal && (
        <FacebookLivestreamScriptConfirmDeleteModal
          loading={isLoading}
          onClose={() => setShoudlOpenConfirmModal(false)}
          onSubmit={handleDelete}
        />
      )}
    </>
  )
}
