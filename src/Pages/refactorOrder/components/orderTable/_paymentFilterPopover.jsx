import {Popover} from '@mui/material'
import {Button} from 'common/button'
import {Checkbox} from 'common/form/checkbox'
import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import useOrderFilterForm from 'Pages/refactorOrder/hooks/useOrderFilterForm'
import {ORDER_TABLE_THEAD_PAYMENT_FILTER_LIST} from 'Pages/refactorOrder/interfaces/_constants'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import {useState} from 'react'
import styled from 'styled-components'

export const PaymentFilterPopover = ({...props}) => {
  const {payment} = useOrderFilterForm()

  const [anchorEl, setAnchorEl] = useState(null)
  const [checkedList, setCheckedList] = useState(
    ORDER_TABLE_THEAD_PAYMENT_FILTER_LIST.map(item => item?.value),
  )
  const [tmpCheckedList, setTmpCheckedList] = useState(
    ORDER_TABLE_THEAD_PAYMENT_FILTER_LIST.map(item => item?.value),
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
    payment.value.length < ORDER_TABLE_THEAD_PAYMENT_FILTER_LIST.length
  )

  const handleCheckboxChange = val =>
    setCheckedList(
      checkedList.includes(val)
        ? checkedList.filter(item => item !== val)
        : [...checkedList, val],
    )

  const handleChange = val => {
    setTmpCheckedList(Array.isArray(val) ? val : checkedList)
    payment.onChange(Array.isArray(val) ? val : checkedList)

    if (handleClose) handleClose()
  }

  const handleReset = () => {
    setCheckedList(
      ORDER_TABLE_THEAD_PAYMENT_FILTER_LIST.map(item => item?.value),
    )

    handleChange(ORDER_TABLE_THEAD_PAYMENT_FILTER_LIST.map(item => item?.value))
  }

  const onClose = () => {
    setCheckedList(tmpCheckedList)
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
          ? ORDER_ICONS.filterFunnel02_solid
          : ORDER_ICONS.filterFunnel02}
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
            {ORDER_TABLE_THEAD_PAYMENT_FILTER_LIST.map(item => (
              <li
                key={item.id}
                className="order-table__payment-filter-popover__list-item"
                onClick={() => handleCheckboxChange(item.value)}
              >
                <Checkbox checked={checkedList.includes(item?.value)} />
                <span style={{marginLeft: 10}}>{item.name}</span>
              </li>
            ))}
            <li className="order-table__payment-filter-popover__footer">
              <Text
                color={THEME_COLORS.primary_300}
                style={{cursor: 'pointer'}}
                onClick={handleReset}
              >
                Đặt lại
              </Text>
              <Button
                disabled={checkedList.length <= 0}
                size="xs"
                style={{minWidth: 85, marginLeft: 18, padding: '0 8px'}}
                onClick={handleChange}
              >
                Áp dụng
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
  padding: 8px 16px;

  .order-table__payment-filter-popover {
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
      justify-content: flex-end;
    }
  }
`
