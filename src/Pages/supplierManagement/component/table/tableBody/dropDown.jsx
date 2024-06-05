import { Text } from "common/text";
import { ICONS } from "Pages/customer/_icons";
import React, { useEffect, useRef, useState,useContext } from "react";

import "./index.scss"
import { Popover } from "@material-ui/core";
import { ORDER_ICONS } from "Pages/refactorOrder/interfaces/_icons";
import { THEME_SEMANTICS } from "common/theme/_semantics";
import { THEME_COLORS } from "common/theme/_colors";
import styled from "styled-components";
import {SupplierManagement} from "../../../provider/_context";
import {useSupplierManagementAction} from "../../../provider/_reducer";
import {SUPPLIER_ACTION_DROP_DOWN} from "../../../interfaces/_const";
const Index = ({onActionClick, ...props }) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const { pageState, pageDispatch } = useContext(SupplierManagement)
    const {dataRow, id_user}=props
    const handleClick = e => {
        e.preventDefault()
        e.stopPropagation()
        setAnchorEl(e.currentTarget)
        pageDispatch({type:useSupplierManagementAction.GET_ID_SUPPLIER,payload:dataRow?.supplier_id})
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined

    const actionList = SUPPLIER_ACTION_DROP_DOWN
    const handleItemClick = type => {
        onActionClick(type)
        handleClose()
    }
    const show = ()=>{
            return actionList.map(item => (
                <>
                    <li
                        key={item.supplier_id}
                        className="row-menu-popover__item"
                        data-danger={item?.isDanger}
                        onClick={(e) =>{
                            e.stopPropagation()
                            handleItemClick(item.action)
                        }}
                    >
                        {item.icon} <span>{item.name}</span>
                    </li>
                </>
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
                {open ? <>{ICONS.manipulation_hover}</>: <>{ORDER_ICONS.manipulation}</>}

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
export default Index
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