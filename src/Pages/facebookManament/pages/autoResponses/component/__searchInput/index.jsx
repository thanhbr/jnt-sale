import {Input} from 'common/form/input'
import {FACEBOOK_ICONS} from 'Pages/facebookManament/interfaces/_icons'
import useFacebookAutoResponsesFilter from '../../hooks/useFacebookAutoResponsesFilter'

export const FacebookAutoResponse__SearchInput = ({...props}) => {
  const {data,methods} = useFacebookAutoResponsesFilter()
  return (
    <Input
      placeholder="Tìm kiếm theo tên kịch bản"
      icon={FACEBOOK_ICONS.search}
      {...props}
      value={data?.filter?.keyword}
      onChange={ e => methods.onchangeKeyword(e.target.value)}
    />
  )
}
