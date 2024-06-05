import {Input} from 'common/form/input'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import useOrderSingleCustomerInfo from 'Pages/orderSingle/hooks/useOrderSingleCustomerInfo'
import {useState} from 'react'
import {OrderSingleContactList} from '../../contactList'

export const OrderSingleCustomerInfoPhone = ({...props}) => {
  const {data, properties, validate, methods} = useOrderSingleCustomerInfo()
  const {phone} = data

  const [canLoadMore, setCanLoadMore] = useState(true)

  const handleBlur = () =>
    methods.onPhoneValidate(
      phone.value.length > 0 && phone.value.length < 10 && !!phone.value.trim()
        ? false
        : true,
    )

  const handleChange = e => {
    const phoneValue = e.target.value
      .toString()
      .replace(/[^0-9]/g, '')
      .substring(0, 11)

    methods.onPhoneChange(phoneValue)

    if (phoneValue.length >= 10 || phoneValue.length <= 0)
      methods.onPhoneValidate(true)
  }

  const handleDropdownLoadMore = () => {
    if (!canLoadMore || properties.isPhoneListLoading) return

    setCanLoadMore(false)

    const response = methods.onPhoneLoadmore()
    if (response) response.then(() => setCanLoadMore(true))
    else setCanLoadMore(true)
  }

  return (
    <Input
      {...props}
      dropdown={
        phone.list.length > 0
          ? ({onClose}) => (
              <OrderSingleContactList
                data={phone.list}
                isExistOriginData={methods.onPhoneCheckExistData()}
                isLoading={properties.isPhoneListLoading}
                isLoadMore={!canLoadMore}
                value={phone.value}
                onClose={onClose}
                onSelect={methods.onPhoneChange}
              />
            )
          : undefined
      }
      label={
        <>
          Điện thoại <Text color={THEME_SEMANTICS.failed}>*</Text>
        </>
      }
      placeholder="Nhập số điện thoại khách hàng"
      validateText={validate.phone || props.validate?.phone}
      validateType="danger"
      value={phone.value}
      onBlur={handleBlur}
      onChange={handleChange}
      dropdownProps={{
        canLoadMore,
        onLoadMore: handleDropdownLoadMore,
      }}
    />
  )
}
