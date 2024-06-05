import { Popover } from '@mui/material'
import { THEME_COLORS } from 'common/theme/_colors'
import { EMPLOYEE_TABLE_THEAD_STATISTIC_FILTER_LIST } from '../../interfaces/_constants'
import { useState } from 'react'
import styled from 'styled-components'
import { DELIVERY_ICONS } from '../../interfaces/_icons'
import useOrderOriginFilterForm from '../../hooks/useOrderOriginFilterForm'
import { useTranslation } from 'react-i18next'

export const StatisticFilterPopover = ({ ...props }) => {
  const { sortBy } = useOrderOriginFilterForm()
  const {t} = useTranslation()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = e => {
    e.preventDefault()
    e.stopPropagation()
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => setAnchorEl(null)

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const handleChange = val => {
    sortBy.onChange(val)

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
        {DELIVERY_ICONS.arrowDownUp}
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
            {EMPLOYEE_TABLE_THEAD_STATISTIC_FILTER_LIST.map(item => (
              <li
                key={item.id}
                className="order-table__sortBy-filter-popover__list-item"
                onClick={sortBy?.value == item.value ? () => {} : () => handleChange(item.value)}
              >
                <span style={{ marginLeft: 10 }}>{t(item.name)}</span>
                {sortBy?.value == item.value && DELIVERY_ICONS.circleActive}
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
