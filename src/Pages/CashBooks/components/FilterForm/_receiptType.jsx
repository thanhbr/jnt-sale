import {AlternativeAutoComplete} from 'common/form/autoComplete/_alternativeAutoComplete'
import {Option} from 'common/form/autoComplete/_option'
import {Text} from 'common/text'
import useFilterForm from 'Pages/CashBooks/hooks/useCashBooksFilterForm'
import { useTranslation } from 'react-i18next'

const PaymentTypeFilter = () => {
  const { t } = useTranslation()
  const {receiptType} = useFilterForm()

  return (
    <AlternativeAutoComplete
      className="order-filter-form__input-wide"
      // main input
      inputProps={{
        categoryList: receiptType.categoryList, // menu list in category dropdown
        categoryValue: receiptType.categoryValue, // if not exist this value -> default category: categoryList[0]
        categoryWidth: receiptType.categoryValue?.value === '0' ? 160 : 130,
        placeholder: t('cashbook_choose_receipt_type'),
        readOnly: true,
        value: receiptType.value?.name || '',
        onIconClick: receiptType.onInputReset,
      }}
      // menu
      menuProps={{
        empty: receiptType.list.length <= 0 ? t('cashbook_receipt_type_not_found') : '',
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: t('cashbook_search_receipt_type'),
        value: receiptType.keyword,
        onChange: receiptType.onKeywordChange,
      }}
    >
      {receiptType.categoryValue?.value === '0' ? (
        <>
          <Text fontWeight={600} style={{marginTop: '16px'}}>
            {t('receipts_voucher')}
          </Text>
          {receiptType.list
            ?.filter(item => item.type === '1')
            ?.map(item => (
              <Option
                style={{
                  fontSize: '14px',
                  paddingLeft: 10,
                  margin: '20px 8px',
                  cursor: ' pointer',
                }}
                key={item?.value}
                data-active={item.value === receiptType.value?.value}
                onClick={() => receiptType.onChange(item)}
              >
                {item?.name || '---'}
              </Option>
            ))}
          <Text
            fontWeight={600}
            style={{
              display: 'block',
            }}
          >
            {t('payment_voucher')}
          </Text>
          {receiptType.list
            ?.filter(item => item.type === '2')
            ?.map(item => (
              <Option
                style={{
                  fontSize: '14px',
                  paddingLeft: 10,
                  margin: '20px 8px',
                  cursor: ' pointer',
                }}
                key={item?.value}
                data-active={item.value === receiptType.value?.value}
                onClick={() => receiptType.onChange(item)}
              >
                {item?.name || '---'}
              </Option>
            ))}
        </>
      ) : (
        receiptType.list
          ?.filter(x => x.type === receiptType.categoryValue?.value)
          ?.map(item => (
            <Option
              key={item?.value}
              data-active={item.value === receiptType.value?.value}
              onClick={() => receiptType.onChange(item)}
              style={{
                fontSize: '14px',
                paddingLeft: 10,
                marginBottom: '20px',
                cursor: ' pointer',
              }}
            >
              {item?.name || '---'}
            </Option>
          ))
      )}
    </AlternativeAutoComplete>
  )
}

export default PaymentTypeFilter
