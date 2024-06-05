import React, { useEffect, useState} from "react";
import {Td} from "../../../../layouts/tableLayout/_td";
import {Text} from "../../../../common/text";
import {Tr} from "../../../../layouts/tableLayout/_tr";
import CheckBoxConsignment from "../../../../Component/CheckBoxConsignment/CheckBoxConsignment";
import {Button} from "../../../../common/button";
import {ORDER_ICONS} from "../../../refactorOrder/interfaces/_icons";
import {TABLE_HEADER} from "../../interfaces/~contants";
import useTableBody from "../../hooks/useTableBody";
import styled from "styled-components";

const Index = () => {
  const [open, setOpen] = useState(false)
  const { value, functions } = useTableBody()

  const show = () => {
    return TABLE_HEADER?.map((item, index) => {
      return (
        <Td key={index} className={`payment-method-table_header-` + item.class + ` payment-method-table_header-height`} >
          <Text fontWeight={600}>
            {item.name}
          </Text>
        </Td>
      )
    })
  }
  useEffect(() => {
    window.addEventListener('click', function (e) {
      const isPopup = document.getElementById('payment-method-table_header__selected')?.contains(e.target)
      const isBtn = document.getElementById('payment-method-table_header__selected-action-toggle')?.contains(e.target)
      if (!isPopup && !isBtn){
        setOpen(false)
      }
    })
    return function cleanupListener() {
      window.removeEventListener('click', () => {})
    }
  }, [])

  return (
    <StyledPaymentMethodHeader>
      <div className={'payment-method-table_header'}>
        <Tr type="tHead">
          <Td className="payment-method-table_header-checkbox payment-method-table_header-height">
            <CheckBoxConsignment
              minus={value?.isCheckAll}
              isChecked={value?.isCheckAll}
              handleClick={functions.toggleAll}
            />
          </Td>
          {value?.checkedPayment?.length === 0 ?
            <>
              {show()}
            </>
            : <Td className="payment-method-table_header__cell" data-selected="true" data-type="th">
              <Text as="b">
                {value?.checkedPayment?.length > 9
                  ? value?.checkedPayment?.length
                  : `0${value?.checkedPayment?.length}`}{' '} phương thức thanh toán được chọn
              </Text>
              <div className="payment-method-table_header__selected-action-dropdown">
                <Button
                  className="payment-method-table_header__selected-action-toggle"
                  size="xs"
                  id={'payment-method-table_header__selected-action-toggle'}
                  onClick={() => setOpen(true)}
                >
                  Thao tác {ORDER_ICONS.caretRight}
                </Button>
                {open && (
                  <>
                    <ul className="payment-method-table_header__selected-action-menu common-popover" id={'payment-method-table_header__selected'}>
                      <li
                        className="payment-method-table_header__selected-action-menu-item"
                        onClick={() =>{
                          setOpen(false)
                          functions.handleToggleActive(true)
                        } }
                      >
                        Kích hoạt
                      </li>
                      <li
                        className="payment-method-table_header__selected-action-menu-item"
                        onClick={() =>{
                          setOpen(false)
                          functions.handleToggleActive(false)
                        }}
                      >
                        Ngưng kích hoạt
                      </li>
                    </ul>
                  </>
                )}
              </div>
            </Td>
          }

        </Tr>
      </div>
    </StyledPaymentMethodHeader>

  )
}
export default Index;

export const StyledPaymentMethodHeader = styled.div`
  .payment-method-table {
    &_header-full-name {
      width: 78rem;
      flex: 1;
    }
    &_header-status {
      display: flex;
      justify-content: center;
      width: 17.875rem;
    }
    &_header__selected-action-dropdown {
      position: relative;
      margin-left: 12px;
    }
    &_header__selected-action-toggle {
      width: 88px;
      padding: 0px !important;
      border: 1px solid #2BB8A9;
      border-radius: 14px !important;
      font-size: 14px !important;
      font-weight: 500 !important;
      background: #2BB8A9;
    }
    &_header__selected-action-menu.common-popover {
      position: absolute;
      top: calc(100% + 4px);
      left: 0px;
      z-index: 12;
      width: 201px;
      padding: 8px;
      background: rgb(255, 255, 255);
      border-radius: 6px;
      box-shadow: rgb(0 0 0 / 10%) 2px 4px 10px !important;
    }
    &_header__selected-action-menu-item {
      padding: 6px 8px;
      color: rgb(25, 29, 50);
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      transition: color 0.25s ease 0s;
      cursor: pointer;
    }
    &_header__selected-action-menu-item:hover {
      color: #1e9a98;
    }
  }
`