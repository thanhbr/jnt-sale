import React, {useContext, useState} from "react";
import styled from "styled-components";
import {Text} from "../../../../../../../common/text";
import {EXTRA_SORT} from "../../../interface/_constants";
import {FacebookLivestreamContext} from "../../../provider/_context";
import { facebookLiveStreamDetailActions as actions } from '../../../provider/_actions'
import useFacebookLiveStreamDetail from "../../../hooks/useFacebookLiveStreamDetail";
import useFilterFacebookLiveStreamDetail from "../../../hooks/useFilterFacebookLiveStreamDetail";
import {ICON_CONVERSATION} from "../../../interface/icon";
import {Tooltip} from "../../../../../../../common/tooltip";
import {THEME_COLORS} from "../../../../../../../common/theme/_colors";
const Index = ({...props})=>{
    const list = EXTRA_SORT
    const {state,dispatch} = useContext(FacebookLivestreamContext)
    const { data } = useFacebookLiveStreamDetail()
    const {methods,queries} = useFilterFacebookLiveStreamDetail()
    const { liveStream } = data
    const {display} = liveStream
    const [open,setOpen] = useState(false)
    const handleActive = (sort)=>{
        dispatch({type:actions.EXTRA_SORT_TITLE,payload:sort})
        switch (sort) {
            case list[0].name:
                methods.getListLiveStreamComment({...queries,order_by:'newest'})
                break;
                case list[1].name:
                    methods.getListLiveStreamComment({...queries,order_by:'unread',is_read:0})
                break;
                case list[2].name:
                    methods.getListLiveStreamComment({...queries,order_by:'reply'})
                break;
            default:
                break;

        }
    }
    const render_extra_sort = ()=>{
        return list?.map(item=>{
            return(
                <li
                    key={item.id}
                    className="extra-drop-down__selected-action-menu-item"
                    onClick={() => {
                        setOpen(false)
                        handleActive(item.name)
                    }}
                    data-active = {item.name === state.extraSort}
                >
                    {item.name}

                    <Tooltip title={item.tooltip} placement={'right'}>
                        {ICON_CONVERSATION.question}
                    </Tooltip>

                </li>
            )
        })
    }
    return(
        <StyleDropDown>
            <Text
                className="extra-drop-down__selected-action-toggle"
                size="xs"
                onClick={() => setOpen(true)}
            >
                {state.extraSort} {ICON_CONVERSATION.carat_down}

            </Text>
            {open && (
                <>
                    <div
                        className="extra-drop-down__selected-action-backdrop"
                        onClick={() => setOpen(false)}
                    ></div>
                    <ul className="extra-drop-down__selected-action-menu common-popover">
                        {render_extra_sort()}
                    </ul>
                </>
            )}
        </StyleDropDown>
    )
}
export default Index;
const StyleDropDown = styled.div`
width: 174px;
.extra-drop-down{
   &__selected-action-dropdown {
        position: relative;
        margin-left: 12px;
      }

      &__selected-action-toggle {
        width: 88px;
        padding: 0 !important;

        border-radius: 14px !important;
        cursor: pointer;
        font-size: 13px !important;
        font-weight: 500 !important;
        .svg{
          path{
          stroke: #000000;
          fill: #000000;
          }
        }
      }

      &__selected-action-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 11;

        width: 100vw;
        height: 100vh;
      }

      &__selected-action-menu {
        position: absolute;
        top: calc(20% + 4px);
        left: 5.5rem;
        z-index: 12;

        width: 170px;
        padding: 4px;

        background: #ffffff;
        border-radius: 6px;
        box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1) !important;
      }

      &__selected-action-menu-item {
        padding: 8px;
        color: #191d32;
        font-size: 13px;
        font-weight: 400;
        line-height: 20px;
        transition: color 0.25s;
        cursor: pointer;
        span{
          margin-left: 5px;
          svg{
            transform: translateY(2px);
          }
        }
        &:hover {
        color: ${THEME_COLORS.primary_300};
         
        }
        &[data-active = 'true']{
            color: #1e9a98;
        }
        
      }
}
  

`