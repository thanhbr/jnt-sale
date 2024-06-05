import {Input} from 'common/form/input'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import useFilterFacebookConversation from "../../hooks/useFilterFacebookConversation";

export const ConversationSearch = () => {
  const {data,methods} = useFilterFacebookConversation()
  const {filter} = data
  return (
    <Input
      className="order-filter-form__input-wide"
      icon={ORDER_ICONS.searchMd}
      placeholder="Tìm kiếm theo tin nhắn, họ tên, SĐT, ID bài viết, mã bình luận,..."
      value={filter.conversation?.keyword}
      onChange={methods?.handleKeywordChange}
      style={{
        background: '#EFF3FB',
        borderRadius: '6px',
      }}
    />
  )
}
