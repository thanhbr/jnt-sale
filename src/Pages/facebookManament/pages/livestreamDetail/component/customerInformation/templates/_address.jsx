import {Button} from 'common/button'
import {Input} from 'common/form/input'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import useFacebookCustomerInfor from '../../../hooks/useFacebookCustomerInfor'
import {ORDER_SINGLE_ICONS} from 'Pages/orderSingle/interface/_icons'
import { FacebookLivestreamContext } from '../../../provider/_context'
import { useContext,useState } from 'react'
import styled from 'styled-components'

export const InfoAddress = ({...props}) => {
  const {state, dispatch}= useContext(FacebookLivestreamContext)
  const { methods} =  useFacebookCustomerInfor()
  const [isLoading, setLoading] =useState(false)

  return (
    <StyledSuggestAddressSearchList>
    <Input
      className="cus-address-infor"
      dropdown={ () => (
        <div>
          {state.detail.customerInfor.suggestAddress.length > 0 &&
          <div className="suggest-search-list">
            {state.detail.customerInfor.suggestAddress.map(item => (
              <Item
                key={item?.value}
                data={item}
                onClick={() => {methods.onSuggestAddressSplit(item)}}
              />
            ))}
          </div>}
          </div>
        )
      }
      button={
        <Button
          icon={ORDER_SINGLE_ICONS.target}
          onClick={e => {methods.onAddressSplit(state.detail.customerInfor.list.customer_address)}}
        >
          Tách
        </Button>
      }
      label={
        <>
          Địa chỉ <Text color={THEME_SEMANTICS.failed}>*</Text>
        </>
      }
      placeholder="Nhập địa chỉ"
      value={state.detail.customerInfor.list.customer_address ? state.detail.customerInfor.list.customer_address :'' }
      validateText={
        state.detail.customerInfor.errorSeparate || state.detail.customerInfor?.isNotEnoughCustomerInfo && !state.detail.customerInfor.list.customer_address ? " " :""}
      validateType="danger"
      onClick={e=>{dispatch({
        type: 'SET_CUSTOMER_SUGGEST_ADDRESS',
        payload:[],
      })}}
      onChange={e => {
        methods.onAddressChange(e.target.value)
      }}
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
      font-size: 13px;
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
  .cus-address-infor {
    .input__dropdown {
      padding: 0px
    }
  }

 
`
