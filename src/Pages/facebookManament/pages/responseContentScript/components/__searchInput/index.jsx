import {Input} from 'common/form/input'
import {FACEBOOK_ICONS} from 'Pages/facebookManament/interfaces/_icons'

export const FacebookResponseContentScript__SearchInput = ({...props}) => {
  return (
    <Input
      placeholder="Tìm kiếm theo từ viết tắt/nội dung phản hồi"
      icon={FACEBOOK_ICONS.search}
      {...props}
    />
  )
}
