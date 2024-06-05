import {Button} from 'common/button'
import {Input} from 'common/form/input'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import useOrderSingleCustomerInfo from 'Pages/orderSingle/hooks/useOrderSingleCustomerInfo'
import {ORDER_SINGLE_ICONS} from 'Pages/orderSingle/interface/_icons'
import styled from 'styled-components'

export const OrderSingleCustomerInfoAddress = ({...props}) => {
  const {data,errorSeparate, properties, methods} = useOrderSingleCustomerInfo()
  const {address} = data

  return (
    <StyledSuggestAddressSearchList>
    <Input
      {...props}
      className="order-address-infor"
      dropdown={ () => (
        <div>
          {data?.suggestAddress?.length > 0 &&
          <div className="suggest-search-list">
            {data.suggestAddress.map(item => (
              <Item
                key={item?.value}
                data={item}
                onClick={() => {methods.onSuggestAddressValidate(item)}}
              />
            ))}
          </div>}
          </div>
        )
      }
      button={
        <Button
          disabled={!properties.canSplitAddress}
          icon={ORDER_SINGLE_ICONS.target}
          onClick={(e) => methods.onAddressSplit(address.value)}
        >
          Tách
        </Button>
      }
      label={
        <>
          Địa chỉ đầy đủ <Text color={THEME_SEMANTICS.failed}>*</Text>
        </>
      }
      placeholder="Số nhà, tên đường, phường/xã, thôn/xóm, bệnh viện,.."
      value={address.value}
      onChange={e => methods.onAddressChange(e.target.value)}
      validateText={errorSeparate ? "evoshop chưa nhận diện được địa chỉ này, hãy kiểm tra lại hoặc tự chọn địa chỉ ở bên dưới bạn nhé!" : props.validate?.address}
      validateType="danger"
    />
    </StyledSuggestAddressSearchList>
  )
}
const Item = ({data, ...props}) => {

  return (
    <div
      {...props}
      className={`suggest-search-list__item ${props?.className || ''}`}
    >
      <div className="suggest-search-list__info">
        <div className="suggest-search-list__name">
          {data?.suggest}, {data?.ward_name} ,{data?.district_name}, {data?.city_name}
        </div>
        <div className="suggest-search-list__name_sm">
          {data?.ward_name}/{data?.district_name}/{data?.city_name}
        </div>
      </div>
    </div>
  )
}
const StyledSuggestAddressSearchList = styled.div`
  .suggest-search-list{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding:16px;

    &__info {
      &:hover {
        cursor: pointer;
      }
    }

    &__item {
      gap: 2px;
      isolation: isolate;
      
      width: 571px;
      height: 55px;
    }
    &__name {
      font-weight: 500;
      font-size: 14px;
      line-height: 140%;
      color: #00081D;
      
      &_sm {
        font-weight: 400;
        font-size: 12px;
        line-height: 140%;
        color: #7C88A6;
      }
    }
  }
  .order-address-infor {
    .input__dropdown {
      padding: 0px
    }
  }
`