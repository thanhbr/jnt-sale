import {Button} from 'common/button'
import {Checkbox} from 'common/form/checkbox'
import {Modal} from 'common/modal'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {useState} from 'react'
import {StyledFacebookLivestreamScriptSingle_FanpageLogoModal} from './_styled'

export const FacebookLivestreamScriptSingle_FanpageLogoModal = ({
  defaultValue,
  list,
  onClose,
  onSubmit,
  ...props
}) => {
  const [checkedList, setCheckedList] = useState(defaultValue || [])

  const handleCheckboxAllToggle = () =>
    setCheckedList(checkedList.length < list.length ? [...list] : [])

  const handleCheckboxItemToggle = data => {
    const find = checkedList.find(item => item?.value === data?.value)
    setCheckedList(
      !!find
        ? checkedList.filter(item => item?.value !== data?.value)
        : [...checkedList, data],
    )
  }

  return (
    <Modal
      title="Danh sách các trang áp dụng"
      actions={[
        <Button
          appearance="ghost"
          size="sm"
          style={{minWidth: 110}}
          onClick={onClose}
        >
          Hủy
        </Button>,
        <Button
          size="sm"
          style={{minWidth: 110, marginLeft: 8}}
          onClick={() => {
            if (onSubmit) onSubmit(checkedList)
            if (onClose) onClose()
          }}
        >
          Chọn
        </Button>,
      ]}
      width={480}
      onClose={onClose}
    >
      <StyledFacebookLivestreamScriptSingle_FanpageLogoModal {...props}>
        <div className="facebook-livestream-script-single-fanpage-logo-modal__header">
          <div style={{display: 'flex', alignItems: 'center'}}>
            <Checkbox
              checked={checkedList.length > 0}
              indeterminate={checkedList.length < list.length}
              onClick={handleCheckboxAllToggle}
            />
            <Text
              as="b"
              style={{marginLeft: 16, cursor: 'pointer'}}
              onClick={handleCheckboxAllToggle}
            >
              Chọn tất cả
            </Text>
          </div>
          <Text>
            Đã chọn{' '}
            <Text color={THEME_SEMANTICS.delivering}>
              {checkedList.length}/{list.length}
            </Text>{' '}
            trang
          </Text>
        </div>
        <div className="facebook-livestream-script-single-fanpage-logo-modal__list common-scrollbar">
          {list.map(item => (
            <div
              key={item?.value}
              className="facebook-livestream-script-single-fanpage-logo-modal__item"
              onClick={() => handleCheckboxItemToggle(item)}
            >
              <Checkbox
                checked={
                  !!checkedList.find(find => find?.value === item?.value)
                }
              />
              <img
                className="facebook-livestream-script-single-fanpage-logo-modal__image"
                src={item?.data?.page_avatar}
                alt={item?.name}
              />
              <Text style={{flex: 1}}>{item?.name}</Text>
            </div>
          ))}
        </div>
      </StyledFacebookLivestreamScriptSingle_FanpageLogoModal>
    </Modal>
  )
}
