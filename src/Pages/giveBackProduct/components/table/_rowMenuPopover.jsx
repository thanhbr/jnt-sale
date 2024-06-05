import {useState} from "react";
import {Popover} from "@mui/material";
import {Tooltip} from "../../../../common/tooltip";
import styled from "styled-components";
import {THEME_SEMANTICS} from "../../../../common/theme/_semantics";
import {THEME_COLORS} from "../../../../common/theme/_colors";
import {GIVEBACK_PRODUCT_ICONS} from "../../interfaces/icon";
import {GIVEBACK_PRODUCT_TABLE_ROW_MENU_POPOVER} from "../../interfaces/contants";
import {useTranslation} from "react-i18next";

export const RowMenuPopover = ({
                                 id,
                                 dataOrder,
                                 onActionClick,
                               }) => {
  const {t} = useTranslation()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = e => {
    e.preventDefault()
    e.stopPropagation()
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => setAnchorEl(null)

  const open = Boolean(anchorEl)
  const idData = open ? id : undefined

  // const actionList = GIVEBACK_PRODUCT_TABLE_ROW_MENU_POPOVER.filter(item => {
  //   return item[inventory ? 'inventoryStatus' : 'noInventoryStatus'].includes(shippingStatus)
  // })
  const actionList = GIVEBACK_PRODUCT_TABLE_ROW_MENU_POPOVER

  const handleItemClick = type => {
    onActionClick(type)
    handleClose()
  }

  return (
    <>
      <StyledIconToggle
        aria-describedby={idData}
        variant="contained"
        style={{cursor: 'pointer'}}
        onClick={handleClick}
      >
        {GIVEBACK_PRODUCT_ICONS.manipulation}
      </StyledIconToggle>
      {open && actionList.length > 0 && (
        <Popover
          id={idData}
          className="common-popover"
          open={true}
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
            {actionList.map(item => (
              <>
                {/*
                dataOrder?.payment_status
                 1: Đã hoàn tiền
                 2: Hoàn tiền 1 phần
                 3: Chưa hoàn tiền
                */}
                {(([2, 3].includes(+dataOrder?.payment_status) && item?.id === 1)
                    || (+dataOrder?.status === 2 && [1, 2, 3].includes(+dataOrder?.payment_status) && item?.id === 2)) ? (
                  <Tooltip
                    placement="left"
                    title={!!item?.isDeveloping ? 'Tính năng đang phát triển' : ''}
                  >
                    <li
                      key={item.id}
                      className="row-menu-popover__item"
                      data-danger={item?.isDanger}
                      onClick={() => handleItemClick(item.action)}
                    >
                      {item.icon} <span>{t(item.name)}</span>
                    </li>
                  </Tooltip>
                ) :  null}
              </>
            ))}
          </StyledRowMenuPopover>
        </Popover>
      )}
    </>
  )
}

const StyledRowMenuPopover = styled.ul`
  width: 230px;
  padding: 8px 12px;

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
