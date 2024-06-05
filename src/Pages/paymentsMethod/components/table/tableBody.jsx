import React, {useContext} from "react";
import {Tr} from "../../../../layouts/tableLayout/_tr";
import {Td} from "../../../../layouts/tableLayout/_td";
import {Text} from "../../../../common/text";
import {PaymentMethodContext} from "../../provider/~context";
import useTableBody from "../../hooks/useTableBody";
import styled from "styled-components";
import {Tooltip} from "../../../../common/tooltip";
import {Checkbox} from "../../../../common/form/checkbox";
import Row from "../../components/table/row";
import {PAYMENT_METHOD_ICONS} from "../../interfaces/~icon";
import Skeleton from "../skeleton"
import Empty from "../../../userManagement/components/empty/index"

const Index = () => {
  const { pageState,  } = useContext(PaymentMethodContext)
  const { functions, value } = useTableBody()

  const show = () => {
    if (!pageState?.loading && pageState?.list_payment_method?.length > 0) return pageState?.list_payment_method?.map((item, index) => {
      return (
        <StyledPaymentMethodBody>
          <Tr key={item?.id} className={`payment-method-table__body-row ${item?.is_active === '1' && 'payment-method-table__body-row--default'}`}
          >
            <Td className='payment-method-table__body-checkbox' onClick={e => e.stopPropagation()}>
              <Checkbox
                checked={value.checkedPayment.includes(item.id)}
                onClick={e => {
                  e.stopPropagation()
                  item?.is_active !== '1' && functions.toggleItem(item?.id)
                }}
                disabled={item?.is_active === '1'}
              />
            </Td>
            <Td className='payment-method-table__body-name' onClick={() => item?.is_active !== '1' && functions.toggleItem(item?.id)}>
              <Text>{item?.name || ''}</Text>
              {item?.is_active === '1' && (
                <>
                  <Tooltip placement="bottom-start" title={'Phương thức thanh toán mặc định'} className={'tt-payment-method--default'}>
                    <span
                      style={{
                        marginLeft: 6,
                        display: 'inline-block',
                        transform: 'translateY(2px)',
                      }}
                    >
                      {PAYMENT_METHOD_ICONS.tick}
                    </span>
                  </Tooltip>
                </>
              )}
            </Td>
            <Td className='payment-method-table__body-status'>
              {item?.is_active !== '1' && (
                <input type={'checkbox'}
                       checked={!!!value.isCheckStatus[item.id] ? item?.status === '1' : value.isCheckStatus[item.id] === '1'}
                       onChange={() => item?.is_active !== '1' && functions.toggleActive(item.id, item?.is_active)}
                />
              )}
            </Td>
            <Td
              className={"payment-method-table__cell"}
              data-menu="true"
              data-type="td"
              onClick={e => e.stopPropagation()}
            >
              <Row
                dataRow={item}
                index={index}
              />
            </Td>
          </Tr>
        </StyledPaymentMethodBody>

      )
    })
    else if(pageState?.loading) return <Skeleton numb={20} />
    else return <Empty/>
  }
  return (
    <div className={'payment-method-table_body'}>
      {show()}
    </div>
  )
}
export default Index;


export const StyledPaymentMethodBody = styled.div`
  .payment-method-table {
    &_header-checkbox {
      width: 3.75rem;
    }
    &__body-row--default:hover .tr__container {
      background: white;
    }
    &__body-checkbox {
      .checkbox__input {
        width: 18px;
        height: 18px;
      }
    }
    &__body-name {
      width: 78rem;
      flex: 1;
    }
    &__body-status {
      display: flex;
      justify-content: center;
      width: 17.875rem;
      
      input[type="checkbox"] {
        position: relative;
        width: 2.125rem !important;
        height: 1.25rem !important;
        -webkit-appearance: none;
        background: #c6c6c6;
        outline: none;
        border-radius: 1.25rem;
        transition: 0.7s;
        cursor: pointer;
        margin-left: 80px;
      }
      
      span {
        cursor: pointer;  
      }
      
      input:checked[type="checkbox"] {
         background: #00AB56;
        //background: rgb(123 201 200 / 80%);
        //cursor: not-allowed;
        // &:hover {
        //   background: rgb(123 201 200 / 80%);
        // }
      }
      
      input[type="checkbox"]:before {
        content: '';
        position: absolute;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        top: .1rem;
        left: 0;
        background: #ffffff;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        transition: .5s;
      }
      input:checked[type="checkbox"]:before {
        left: 1rem
      }
    }
    &__cell {
      padding: 12px 24px;
    }
 }
`