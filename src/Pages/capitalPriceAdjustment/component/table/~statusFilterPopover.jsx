import React, {useState} from 'react';
import {Popover} from "@mui/material";
import {Checkbox} from "../../../../common/form/checkbox";
import {Text} from "../../../../common/text";
import {THEME_COLORS} from "../../../../common/theme/_colors";
import {Button} from "../../../../common/button";
import styled from "styled-components";
import {PRICE_ADJUSTMENT_TABLE_CELL_PAYMENT_TYPES} from "../../interfaces/_const";
import {PRICE_ADJUSTMENT_ICONS} from '../../interfaces/_icon'
import useFilterCapitalAdjustment from "../../hooks/useFilterCapitalAdjustment";

export const StatusFilterPopover = (...props) => {
  const {statusState, methods, filter} = useFilterCapitalAdjustment()

  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = e => {
    e.preventDefault()
    e.stopPropagation()
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => setAnchorEl(null)

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const shouldActiveIcon = !!(
    statusState?.activeValue?.length > 0 && statusState?.activeValue?.length < PRICE_ADJUSTMENT_TABLE_CELL_PAYMENT_TYPES?.length
  )

  const handleChange = _ => {
    if (handleClose) handleClose()
  }

  const handleReset = () => {
    methods?.handleRefreshStatus()
    handleChange(PRICE_ADJUSTMENT_TABLE_CELL_PAYMENT_TYPES.map(item => item?.value))
  }

  const onApply = () => {
    handleClose()
    filter?.applyOrderOtherFilter()
  }

  const onClose = () => {
    methods?.handleCheckboxChange()
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
          ? PRICE_ADJUSTMENT_ICONS.filterFunnel02_solid
          : PRICE_ADJUSTMENT_ICONS.filterFunnel02 }
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
          <StyledStatusFilterPopover {...props}>
            {PRICE_ADJUSTMENT_TABLE_CELL_PAYMENT_TYPES.map(item => (
              <li
                key={item.id}
                className="capital-adjustment-status-filter-popover__list-item"
                onClick={() => methods?.handleChangeStatus(item.id)}
              >
                <Checkbox
                  checked={!!statusState?.value?.find(it => +it === +item?.id)}
                />
                <Text style={{marginLeft: 10}}>{item.name}</Text>
              </li>
            ))}
            <li className="capital-adjustment-status-filter-popover__footer">
              <Text
                color={`${statusState?.value?.length === 3 ? '#666' : THEME_COLORS.primary_300 }`}
                style={{cursor: `${statusState?.value?.length === 3 ? 'not-allowed' : 'pointer'}`}}
                onClick={() => {
                  if(statusState?.value?.length === 3) return
                  handleReset()
                }}
              >
                Đặt lại
              </Text>
              <Button
                disabled={statusState?.value?.length <= 0}
                size="xxs"
                style={{width: 69, marginLeft: 18, padding: '0 8px', fontSize: 12}}
                onClick={onApply}
              >
                Áp dụng
              </Button>
            </li>
          </StyledStatusFilterPopover>
        </Popover>
      )}
    </>
  )
}

export default StatusFilterPopover

const StyledStatusFilterPopover = styled.ul`
  width: 172px;
  padding: 12px 12px 16px 12px;

  .capital-adjustment-status-filter-popover {
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
