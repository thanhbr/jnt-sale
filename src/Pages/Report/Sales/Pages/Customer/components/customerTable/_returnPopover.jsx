import { Popover } from '@mui/material'
import { THEME_COLORS } from 'common/theme/_colors'
import {
  CUSTOMER_TABLE_THEAD_RETURN_FILTER_LIST,
  CUSTOMER_TABLE_THEAD_SUCCESS_FILTER_LIST
} from '../../interfaces/_constants'
import { useState } from 'react'
import styled from 'styled-components'
import { REPORT_SALE_ICONS } from '../../../../interfaces/_icons'
import useCustomerFilterForm from '../../hooks/useCustomerFilterForm'
import { useTranslation } from 'react-i18next'

export const ReturnFilterPopover = ({ ...props }) => {
  const { sortBy, sortType } = useCustomerFilterForm()
  const {t} = useTranslation()
  const listStatus = props.sortType == 4 ? CUSTOMER_TABLE_THEAD_SUCCESS_FILTER_LIST : CUSTOMER_TABLE_THEAD_RETURN_FILTER_LIST
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = e => {
    e.preventDefault()
    e.stopPropagation()
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => setAnchorEl(null)

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const handleChange = (val, type) => {
    sortBy.onChange(val, type)

    if (handleClose) handleClose()
  }

  const onClose = () => {
    if (handleClose) handleClose()
  }

  return (
    <>
      <i
        style={{
          display: 'flex',
          cursor: 'pointer'
        }}
        aria-describedby={id}
        onClick={handleClick}
      >
        {REPORT_SALE_ICONS.arrowDownUp}
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
          sx={{top: '8px'}}
        >
          <StyledPaymentFilterPopover {...props}>
            {listStatus.map(item => (
              <li
                key={item.id}
                className="order-table__sortBy-filter-popover__list-item"
                onClick={(sortBy?.value == item.value && sortType == props.sortType)? () => {} : () => handleChange(item.value, props.sortType)}
              >
                <span style={{ marginLeft: 10 }}>{t(item.name)}</span>
                {sortBy?.value == item.value && sortType == props.sortType && REPORT_SALE_ICONS.circleActive}
              </li>
            ))}
          </StyledPaymentFilterPopover>
        </Popover>
      )}
    </>
  )
}

const StyledPaymentFilterPopover = styled.ul`
  width: 172px;
  padding: 8px;

  .order-table__sortBy-filter-popover {
    &__list-item {
      height: 40px;

      display: flex;
      align-items: center;
      justify-content: space-between;

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
