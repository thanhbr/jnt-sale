import React, {useState} from 'react';
import {Popover} from "@mui/material";
import {Text} from "../../../../common/text";
import {THEME_COLORS} from "../../../../common/theme/_colors";
import {Button} from "../../../../common/button";
import styled from "styled-components";
import {GIVEBACK_PRODUCT_ICONS} from "../../interfaces/icon";
import {GIVEBACK_PRODUCT_TABLE_THEAD_PAYMENT_FILTER_LIST} from "../../interfaces/contants";
import {Checkbox} from "../../../../common/form/checkbox";
import useTableGiveBackProduct from "../../hooks/useTableGiveBackProduct";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../const/display_name_menu";

export const PaymentFilterPopover = (...props) => {
  const {t} = useTranslation()
  const {payment, checkedList, functions} = useTableGiveBackProduct()

  const [anchorEl, setAnchorEl] = useState(null)
  const [tmpCheckedList, setTmpCheckedList] = useState(
    GIVEBACK_PRODUCT_TABLE_THEAD_PAYMENT_FILTER_LIST.map(item => item?.value),
  )

  const handleClick = e => {
    e.preventDefault()
    e.stopPropagation()
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => setAnchorEl(null)

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const shouldActiveIcon = !!(
    Array.isArray(payment?.value) &&
    checkedList?.length < GIVEBACK_PRODUCT_TABLE_THEAD_PAYMENT_FILTER_LIST?.length
  )

  const handleChange = val => {
    setTmpCheckedList(Array.isArray(val) ? val : checkedList)
    payment.onChange(Array.isArray(val) ? val : checkedList)

    if (handleClose) handleClose()
  }

  const handleReset = () => {
    functions?.handleCheckboxChange(
      GIVEBACK_PRODUCT_TABLE_THEAD_PAYMENT_FILTER_LIST.map(item => item?.value), 'reset'
    )

    handleChange(GIVEBACK_PRODUCT_TABLE_THEAD_PAYMENT_FILTER_LIST.map(item => item?.value))
  }

  const onClose = () => {
    functions?.handleCheckboxChange(tmpCheckedList)
    if (handleClose) handleClose()
  }

  return (
    <>
      <i
        aria-describedby={id}
        data-active={shouldActiveIcon}
        onClick={handleClick}
      >
        {shouldActiveIcon
          ? GIVEBACK_PRODUCT_ICONS.filterFunnel02_solid
          : GIVEBACK_PRODUCT_ICONS.filterFunnel02 }
      </i>
      {open && (
        <Popover
          id={id}
          className="common-popover"
          open={true}
          anchorEl={anchorEl}
          onClose={onClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <StyledPaymentFilterPopover {...props}>
            {GIVEBACK_PRODUCT_TABLE_THEAD_PAYMENT_FILTER_LIST.map(item => (
              <li
                key={item.id}
                className="giveback-product-table-facebook__payment-filter-popover__list-item"
                onClick={() => functions?.handleCheckboxChange(item.value)}
              >
                <Checkbox checked={checkedList.includes(item?.value)} />
                <span style={{marginLeft: 10}}>{t(item.name)}</span>
              </li>
            ))}
            <li className="giveback-product-table-facebook__payment-filter-popover__footer">
              <Text
                color={THEME_COLORS.primary_300}
                style={{cursor: 'pointer'}}
                onClick={handleReset}
              >
                {t(DISPLAY_NAME_MENU.GENERAL.RESET)}
              </Text>
              <Button
                disabled={checkedList?.length <= 0}
                size="xxs"
                style={{width: 69, marginLeft: 18, padding: '0 8px', fontSize: 12}}
                onClick={_ => handleChange()}
              >
                {t(DISPLAY_NAME_MENU.GENERAL.APPLY)}
              </Button>
            </li>
          </StyledPaymentFilterPopover>
        </Popover>
      )}
    </>
  )
}

const StyledPaymentFilterPopover = styled.ul`
  width: 172px;
  padding: 14px 16px;

  .giveback-product-table-facebook__payment-filter-popover {
    &__list-item {
      height: 40px;

      display: flex;
      align-items: center;

      color: #191d32;
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;

      cursor: pointer;

      &:hover {
        color: ${THEME_COLORS.primary_300};
      }
    }

    &__footer {
      margin-top: 10px;

      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
`
