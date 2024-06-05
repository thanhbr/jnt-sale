import {AlternativeAutoComplete} from 'common/form/autoComplete/_alternativeAutoComplete'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {BulkOrderSingleOption} from 'Pages/bulkOrder/components/bulkOrderSingleOption'
import useBulkOrderCreateForm from 'Pages/bulkOrder/hooks/useBulkOrderCreateForm'
import {BULK_ORDER_ICONS} from 'Pages/bulkOrder/interface/_icons'

export const BulkOrderCreateFormShippingPartner = ({...props}) => {
  const {shippingPartner} = useBulkOrderCreateForm()
  const {data, methods} = shippingPartner

  return (
    <AlternativeAutoComplete
      {...props}
      // main input
      inputProps={{
        categoryList: [], // menu list in category dropdown
        categoryValue: {name: 'Đối tác vận chuyển', value: ''}, // if not exist this value -> default category: categoryList[0]
        categoryWidth: 140,
        placeholder: 'Chọn đối tác vận chuyển',
        readOnly: true,
        value: data.value?.name || '',
      }}
      // menu
      menuProps={{
        empty: data.list.length <= 0 ? 'Không tìm thấy đối tác vận chuyển' : '',
        children:
          data.listOrigin.length <= 0 ? (
            <ul
              className="alternative-auto-complete__menu common-scrollbar"
              style={{padding: '24px 20px'}}
            >
              <BulkOrderSingleOption
                style={{minHeight: 20, marginBottom: 24, pointerEvents: 'none'}}
              >
                <Text color="#151624">Bạn chưa kết nối đơn vị vận chuyển</Text>
              </BulkOrderSingleOption>
              <BulkOrderSingleOption style={{minHeight: 20}}>
                {BULK_ORDER_ICONS.plus}
                <Text
                  as="a"
                  href="/shipping/shipping-partners"
                  color={THEME_SEMANTICS.delivering}
                  fontWeight={600}
                  style={{marginLeft: 4}}
                >
                  Kết nối đơn vị vận chuyển
                </Text>
              </BulkOrderSingleOption>
            </ul>
          ) : undefined,
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: 'Tìm kiếm đối tác vận chuyển',
        value: data.keyword,
        onChange: methods.onKeywordChange,
      }}
    >
      {data.listOrigin.length > 0 &&
        data.list.map(item => item?.value == 1 ? (
          <BulkOrderSingleOption
            key={item?.value}
            data-active={item.value === data.value?.value}
            onClick={() => methods.onChange(item)}
          >
            {item?.name || '---'}
          </BulkOrderSingleOption>
        ) : '')}
    </AlternativeAutoComplete>
  )
}
