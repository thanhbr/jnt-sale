import {Input} from 'common/form/input'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {Tooltip} from 'common/tooltip'
import useOrderSingleCustomerInfo from 'Pages/orderSingle/hooks/useOrderSingleCustomerInfo'
import {ORDER_SINGLE_ICONS} from 'Pages/orderSingle/interface/_icons'
import {useState} from 'react'
import {OrderSingleCustomerModal} from '../../customerModal'

export const OrderSingleCustomerInfoFullName = ({...props}) => {
  const {data, properties, methods} = useOrderSingleCustomerInfo()
  const {fullName} = data

  const [shouldOpenCustomerModal, setShouldOpenCustomerModal] = useState(false)

  const handleCustomerModalClose = () => {
    setShouldOpenCustomerModal(false)
    methods.onFullNameListReset()
  }

  return (
    <>
      <Input
        {...props}
        icon={
          <Tooltip placement="bottom" title="Chọn khách hàng">
            <i>{ORDER_SINGLE_ICONS.contactBook}</i>
          </Tooltip>
        }
        label={
          <>
            Họ và tên <Text color={THEME_SEMANTICS.failed}>*</Text>
          </>
        }
        placeholder="Nhập tên khách hàng"
        value={fullName.value}
        onChange={e => methods.onFullNameChange(e.target.value)}
        onIconClick={() => setShouldOpenCustomerModal(true)}
        validateText={props.validate?.fullName}
        validateType="danger"
      />
      {shouldOpenCustomerModal && (
        <OrderSingleCustomerModal
          fetching={properties.isPhoneListLoading}
          list={fullName.list}
          loading={fullName.loading}
          onClose={handleCustomerModalClose}
          onLoadMore={methods.onFullNameFetchMoreCustomerList}
          onSelect={methods.onPhoneChange}
          inputProps={{
            value: fullName.keyword,
            onChange: e => methods.onFullNameKeywordChange(e.target.value),
          }}
        />
      )}
    </>
  )
}
