import {CategoryAutoComplete} from 'common/form/autoComplete/_categoryAutoComplete'
import {Option} from 'common/form/autoComplete/_option'
import { Text } from 'common/text'
import useCustomer from 'Pages/customer/useCustomer'
import { useTranslation } from 'react-i18next'

export const CustomerShippingStatus = () => {
  const {shippingStatus} = useCustomer()
  const {t} = useTranslation()
  return (
    <CategoryAutoComplete
      className={`customer-filter-form__input-wide customer-status${
        shippingStatus.value?.length ? ' placeholder-black' : ''
      }`}
      categoryList={[{name: 'Trạng thái đơn hàng', value: ''}]}
      categoryWidth={140}
      emptyMenu={shippingStatus.list.length <= 0}
      emptyText="Không tìm thấy trạng thái đơn hàng"
      multipleChoices={true}
      placeholder={
        shippingStatus.value?.length
          ? `Đã chọn ${shippingStatus.value.length}`
          : 'Chọn trạng thái đơn hàng'
      }
      readOnly
      // onChange={shippingStatus.onKeywordChange}
    >
      <div className="customer-filter-form__option-tabs">
        <div
          className="customer-filter-form__option-tab"
          data-active={shippingStatus.tab === 'all'}
          onClick={() =>
            shippingStatus.tab !== 'all' && shippingStatus.onTabChange('all')
          }
        >
          Tất cả
        </div>
        <div
          className="customer-filter-form__option-tab"
          data-active={shippingStatus.tab === 'checked'}
          onClick={() =>
            shippingStatus.tab !== 'checked' &&
            shippingStatus.onTabChange('checked')
          }
        >
          Đã chọn ({shippingStatus.value.length})
        </div>
      </div>

      {shippingStatus.list.length > 0 &&
        shippingStatus.list.map(item => (
          <Option
            key={item.id}
            className="customer-filter-form__option-text"
            checked={!!shippingStatus.value.find(find => find.id === item.id)}
            multipleChoices={true}
            onClick={() => shippingStatus.onChange(item)}
          >
            {item.name}
          </Option>
        ))}

      {shippingStatus.value.length > 0 && (
        <div className="customer-filter-form__uncheck">
          <Text
            color="#1E9A98"
            style={{cursor: 'pointer'}}
            onClick={shippingStatus.onClearValue}
          >{t('unselect_all')}</Text>
        </div>
      )}
    </CategoryAutoComplete>
  )
}
