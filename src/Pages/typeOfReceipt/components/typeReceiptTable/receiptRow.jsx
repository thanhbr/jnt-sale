import React, {useState} from "react";
import {Popover} from "@material-ui/core";
import styled from "styled-components";
import {THEME_SEMANTICS} from "../../../../common/theme/_semantics";
import {THEME_COLORS} from "../../../../common/theme/_colors";
import {TYPE_RECEIPT_ROW_ACTION} from "../../interfaces/_contants";
import {ICONS_TYPE_OF_RECEIPT} from "../../interfaces/_icons";

const ReceiptRow = ({onActionClick, dataRow, ...props }) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = e => {
    e.preventDefault()
    e.stopPropagation()
    setAnchorEl(e.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }


  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const actionListReceipt = TYPE_RECEIPT_ROW_ACTION
  const handleItemClick = type => {
    onActionClick(type)
    handleClose()
  }
  const show = () => {
      return actionListReceipt.map(item => (
        +dataRow.is_default === 1 && +item?.id === 2
          ? ''
          : <li
              key={item.id}
              className="row-menu-popover__item"
              data-danger={+item?.id === 2}
              onClick={(e) =>{
                e.stopPropagation()
                handleItemClick(item.action)
              }}
            >
              {item.icon} <span>{item.name}</span>
            </li>
      ))
  }

  return (
    <>
      <StyledIconToggle
        aria-describedby={id}
        variant="contained"
        style={{cursor: 'pointer'}}
        onClick={handleClick}
      >
        {open ? <>{ICONS_TYPE_OF_RECEIPT.manipulation_hover}</>: <>{ICONS_TYPE_OF_RECEIPT.manipulation}</>}

      </StyledIconToggle>
      {open && (
        <Popover
          id={id}
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
            {show()}
          </StyledRowMenuPopover>
        </Popover>
      )}
    </>
  )
}
export default ReceiptRow

const StyledRowMenuPopover = styled.ul`
  width: 180px;
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