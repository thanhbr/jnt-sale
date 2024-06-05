import { Popover } from '@mui/material'
import { THEME_COLORS } from 'common/theme/_colors'
import { THEME_SEMANTICS } from 'common/theme/_semantics'
import {
  PURCHASES_TABLE_ROW_MENU_POPOVER,
  STATUS_PAYMENT,
  STATUS_WAREHOUSE
} from 'Pages/purchases/interfaces/_constants'
import { PURCHASES_ICONS } from 'Pages/purchases/interfaces/_icons'
import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

export const RowMenuPopover = ({ onActionClick, ...props }) => {
  const {t} = useTranslation()
  const [actionList, setActionList] = useState(PURCHASES_TABLE_ROW_MENU_POPOVER)
  const [anchorEl, setAnchorEl] = useState(null)
  const handleClick = e => {
    e.preventDefault()
    e.stopPropagation()
    setAnchorEl(e.currentTarget)
  }
  const handleItemClick = (key, id) => {
    onActionClick(key, id)
    handleClose()
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  useEffect(() => {
    let actionListOrigin = [...PURCHASES_TABLE_ROW_MENU_POPOVER]

    if (+props.item?.warehouse_status !== STATUS_WAREHOUSE.chua_nhap_Kho.status) {
      actionListOrigin = actionListOrigin.filter(i => i.id != 1)
    }
    if(
      (+props.item?.warehouse_status == STATUS_WAREHOUSE.chua_nhap_Kho.status && +props.item?.payment_status == STATUS_PAYMENT.chua_thanh_toan.status)
      || (+props.item?.warehouse_status == STATUS_WAREHOUSE.hoan_tra_toan_bo.status && (+props.item?.payment_status == STATUS_PAYMENT.chua_thanh_toan.status || +props.item?.payment_status == STATUS_PAYMENT.hoan_tien_toan_bo.status))
    ){
      actionListOrigin = actionListOrigin.filter(i => i.id != 3)
    }

    if(+props.item?.warehouse_status != STATUS_WAREHOUSE.chua_nhap_Kho.status){
      actionListOrigin = actionListOrigin.filter(i => i.id != 4)
    }

    if(
      +props.item?.warehouse_status != STATUS_WAREHOUSE.chua_nhap_Kho.status || +props.item?.payment_status != STATUS_PAYMENT.chua_thanh_toan.status
      ){
      actionListOrigin = actionListOrigin.filter(i => i.id != 5)
    }

    setActionList(actionListOrigin)
  }, [props.item?.warehouse_status, props.item?.payment_status, props.item?.id])

  return (
    <>
      <StyledIconToggle
        // aria-describedby={id}
        variant="contained"
        style={{ cursor: 'pointer', display: actionList.length > 0 ? 'block' : 'none' }}
        onClick={handleClick}
      >
        {PURCHASES_ICONS.manipulation}
      </StyledIconToggle>
      <Popover
        id={id}
        className="common-popover"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <StyledRowMenuPopover>
          {actionList.map((item, key) => {
            return (
              <li
                key={item.id}
                className="row-menu-popover__item"
                data-danger={item?.isDanger}
                onClick={() => handleItemClick(item.id, props.item?.id)}
              >
                {item.icon} <span>{t(item.name)}</span>
              </li>
            )
          })}
        </StyledRowMenuPopover>
      </Popover>
    </>
  )
}

const StyledRowMenuPopover = styled.ul`
  width: 180px;
  padding: 8px;

  .row-menu-popover {
    &__item {
      height: 36px;

      display: flex;
      align-items: center;

      color: #00081d;
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;

      transition: color 0.25s;

      cursor: pointer;

      &[data-danger='true'] {
        &:hover {
          color: ${THEME_SEMANTICS.failed};

          svg {
            color: ${THEME_SEMANTICS.failed};

            path[stroke] {
              stroke: ${THEME_SEMANTICS.failed};
            }

            path[fill] {
              fill: ${THEME_SEMANTICS.failed};
            }
          }
        }
      }

      &:hover {
        color: ${THEME_COLORS.primary_300};

        svg {
          color: ${THEME_COLORS.primary_300};

          path[stroke] {
            stroke: ${THEME_COLORS.primary_300};
          }

          path[fill] {
            fill: ${THEME_COLORS.primary_300};
          }
        }
      }

      svg {
        width: 18px;
        height: 18px;

        margin-right: 10px;
      }
    }
  }
`

const StyledIconToggle = styled.i`
  position: relative;
  z-index: 1;
  height: 24px;

  &:hover {
    svg {
      color: ${THEME_COLORS.primary_300};

      path[stroke] {
        stroke: ${THEME_COLORS.primary_300};
      }

      path[fill] {
        fill: ${THEME_COLORS.primary_300};
      }
    }
  }
`
