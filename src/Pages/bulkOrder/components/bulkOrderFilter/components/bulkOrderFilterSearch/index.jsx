import {Input} from 'common/form/input'
import useBulkOrderFilter from 'Pages/bulkOrder/hooks/useBulkOrderFilter'
import {BULK_ORDER_ICONS} from 'Pages/bulkOrder/interface/_icons'

export const BulkOrderFilterSearch = ({...props}) => {
  const {search} = useBulkOrderFilter()

  return (
    <Input
      {...props}
      icon={BULK_ORDER_ICONS.searchMd}
      placeholder="Tìm kiếm theo tên file"
      value={search.data.value}
      onChange={search.methods.onChange}
    />
  )
}
