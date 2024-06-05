import useOrderSingleCustomerInfo from 'Pages/orderSingle/hooks/useOrderSingleCustomerInfo'
import ArrayUtils from 'Pages/orderSingle/utils/array'
import {OrderSingleCustomerInfoActions as Actions} from './_actions'
import {OrderSingleCustomerInfoAddress as Address} from './_address'
import {OrderSingleCustomerInfoDistrict as District} from './_district'
import {OrderSingleCustomerInfoFullName as FullName} from './_fullName'
import {OrderSingleCustomerInfoPhone as Phone} from './_phone'
import {OrderSingleCustomerInfoProvince as Province} from './_province'
import {StyledOrderSingleCustomerInfo} from './_styled'
import {OrderSingleCustomerInfoWard as Ward} from './_ward'
import {useContext} from 'react'
import {OrderSingleContext} from '../../../provider/_context'
import {Checkbox} from "../../../../../common/form/checkbox"
import {Text} from "../../../../../common/text"

export const OrderSingleCustomerInfo = ({...props}) => {
  const {data, updateAddress, methods} = useOrderSingleCustomerInfo()
  const {state} = useContext(OrderSingleContext)

  return (
    <StyledOrderSingleCustomerInfo {...props}>
      {(!!data?.phone?.detail ||
        ArrayUtils.getQualifiedArray(data?.phone?.report).length > 0) && (
        <div className="order-single-customer-info__corner">
          <Actions />
        </div>
      )}
      <div className="order-single-customer-info__form-group">
        <div className="order-single-customer-info__form-input">
          <Phone validate={state.validate} />
        </div>
        <div className="order-single-customer-info__form-input">
          <FullName validate={state.validate} />
        </div>
        <div className="order-single-customer-info__form-input" data-size="xl">
          <Address validate={state.validate} />
        </div>
        <div className="order-single-customer-info__form-input" data-size="xl">
          <div className="order-single-customer-info__form-input-list">
            <Province
              className="order-single-customer-info__form-input-item"
              validate={state.validate}
            />
            <District
              className="order-single-customer-info__form-input-item"
              validate={state.validate}
            />
            <Ward
              className="order-single-customer-info__form-input-item"
              validate={state.validate}
            />
          </div>
        </div>
        {updateAddress?.open && (
          <div className="order-single-customer-info__form-input" data-size="xl" >
            <div style={{display: 'flex', cursor: 'pointer'}}
                 onClick={() => methods?.onCheckUpdateAddress()}
            >
              <Checkbox checked={updateAddress.check} />
              <Text style={{marginLeft: 8}}>Cập nhật thông tin địa chỉ của khách hàng theo địa chỉ này</Text>
            </div>
          </div>
        )}
      </div>
    </StyledOrderSingleCustomerInfo>
  )
}
