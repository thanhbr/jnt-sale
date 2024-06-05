import React, {useState} from 'react';
import {Popover} from "@mui/material";
import {Checkbox} from "../../../../common/form/checkbox";
import {Text} from "../../../../common/text";
import {THEME_COLORS} from "../../../../common/theme/_colors";
import {Button} from "../../../../common/button";
import styled from "styled-components";
import {PAYMENT_MANAGEMENT_ICONS} from '../../interfaces/icon'
import usePaymentManagementFilter from "../../hooks/usePaymentManagementFilter";
import {PAYMENT_MANAGEMENT_TABLE_THEAD_STATUS_FILTER_LIST} from "../../interfaces/_const";

const StatusFilterPopover = ({...props}) => {
    const {filter, methods} = usePaymentManagementFilter()
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
        filter?.status?.length > 0 && filter?.status?.length < PAYMENT_MANAGEMENT_TABLE_THEAD_STATUS_FILTER_LIST?.length
    )

    const handleChange = val => {
        if (handleClose) handleClose()
    }

    const handleReset = () => {
        methods?.applyStatusFilter(null)
        methods?.handleRefreshStatus()
        handleChange(PAYMENT_MANAGEMENT_TABLE_THEAD_STATUS_FILTER_LIST.map(item => item?.value))
    }

    const onApply = () => {
        handleClose()
        methods?.applyStatusFilter()
    }

    const onClose = () => {
        // functions?.handleCheckboxChange(tmpCheckedList)
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
                    ? PAYMENT_MANAGEMENT_ICONS.filterFunnel02_solid
                    : PAYMENT_MANAGEMENT_ICONS.filterFunnel02 }
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
                        {PAYMENT_MANAGEMENT_TABLE_THEAD_STATUS_FILTER_LIST.map(item => (
                            <li
                                key={item.id}
                                className="giveback-product-table-facebook__payment-filter-popover__list-item"
                                onClick={() => methods?.handleChangeStatus(item.id)}
                            >
                                <Checkbox
                                    checked={!!filter?.status?.find(it => +it === +item?.id)}
                                />
                                <Text style={{marginLeft: 10}}>{item.name}</Text>
                            </li>
                        ))}
                        <li className="giveback-product-table-facebook__payment-filter-popover__footer">
                            <Text
                                color={`${filter?.status?.length === 2 ? '#666' : THEME_COLORS.primary_300 }`}
                                style={{cursor: `${filter?.status?.length === 2 ? 'not-allowed' : 'pointer'}`}}
                                onClick={() => {
                                    if(filter?.status?.length === 2) return
                                    handleReset()
                                }}
                            >
                                Đặt lại
                            </Text>
                            <Button
                                disabled={filter?.status?.length <= 0}
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
  padding: 10px 12px 16px 12px;

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
