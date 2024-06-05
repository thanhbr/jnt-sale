import {Input} from 'common/form/input'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import useFilterFacebookLiveStreamDetail from '../../hooks/useFilterFacebookLiveStreamDetail'

export const ConversationSearch = () => {
  const {data,methods} = useFilterFacebookLiveStreamDetail()
  const {filter} = data
  return (
    <Input
      className="order-filter-form__input-wide"
      icon={ORDER_ICONS.searchMd}
      placeholder="Tìm kiếm theo nội dung/mã bình luận, tên/SĐT khách hàng"
      value={filter.liveStream?.keyword}
      onChange={methods?.handleKeywordChange}
      style={{
        background: '#EFF3FB',
        borderRadius: '6px',
      }}
    />
  )
}
