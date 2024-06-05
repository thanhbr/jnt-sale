import {Popover} from '@mui/material'
import {Button} from 'common/button'
import {Checkbox} from 'common/form/checkbox'
import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import {useContext, useEffect, useState} from 'react'
import styled from 'styled-components'
import {useSupplierManagementAction} from "../../../provider/_reducer";
import {ICON_PAYMENT} from "../../../interfaces/_icon"
export const TableHeaderFilter = ({list, context, name, onSubmit, ...props}) => {
    const {pageState, pageDispatch} = useContext(context)
    const currFilter = pageState.filter[name]
    const [anchorEl, setAnchorEl] = useState(null)
    const [checkedList, setCheckedList] = useState(
        list.map(item => item?.value),
    )
    const [tmpCheckedList, setTmpCheckedList] = useState(
        list.map(item => item?.value),
    )
    const [shouldReset, setShouldReset] = useState(checkedList.length < list.length)

    useEffect(() => {
        if (checkedList.length < list.length) setShouldReset(true)
        else setShouldReset(false)
    }, [checkedList])

    const handleClick = e => {
        e.preventDefault()
        e.stopPropagation()
        setAnchorEl(e.currentTarget)
    }

    const handleClose = () => setAnchorEl(null)

    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined

    const shouldActiveIcon = !!(
        checkedList?.length > 0 &&
        checkedList?.length < list.length
    )

    const handleCheckboxChange = val =>
        setCheckedList(
            checkedList.includes(val)
                ? checkedList.filter(item => item !== val)
                : [...checkedList, val],
        )

    const handleSubmit = val => {
        const checkList = Array.isArray(val) ? val : checkedList
        const findIndex = pageState?.origin_list.filter(item=> {
            const index = checkList.find(find=> +find === +item.payment_status)
            if(!!index) return item
        })
        // console.log(findIndex)
        pageDispatch({type:useSupplierManagementAction.PURCHASE_LIST,payload:findIndex})

        if (handleClose) handleClose()
    }

    const handleReset = () => {
        if (!shouldReset) return
        setCheckedList(
            list.map(item => item?.value),
        )

        handleSubmit(list.map(item => item?.value))
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
                style={{cursor: 'pointer'}}
            >
                {shouldActiveIcon
                    ? ICON_PAYMENT.filterFunnel02_solid
                    : ICON_PAYMENT.filterFunnel02}
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
                        {list.map(item => (
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
                                color={shouldReset ? THEME_COLORS.primary_300 : THEME_COLORS.secondary_900}
                                style={{cursor: shouldReset ? 'pointer' : 'no-drop'}}
                                onClick={handleReset}
                            >
                                Đặt lại
                            </Text>
                            <Button
                                disabled={checkedList.length <= 0}
                                size="xs"
                                style={{minWidth: 85, marginLeft: 18, padding: '0 8px'}}
                                onClick={handleSubmit}
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
  width: 176px;
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
