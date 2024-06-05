import React from 'react';
import {Tr} from "../../../../layouts/tableLayout/_tr";
import {Td} from "../../../../layouts/tableLayout/_td";
import {Tooltip as TooltipV2} from "../../../../common/tooltipv2";
import {Tooltip} from "../../../../common/tooltip";
import {Text} from "../../../../common/text";
import styled from "styled-components";
import {ICONS_FEEDBACK} from "../../interfaces/_icons";
import {fDateTimeSuffix} from "../../../../util/formatTime";
import {FEEDBACK_BODY_STATUS} from "../../interfaces/_contants";
import RowExtra from "./rowExtra";
import useFeedbackRow from "../../hooks/useFeedbackRow";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../const/display_name_menu";

const TrFeedback = ({key, data, ...props}) => {
  const {t} = useTranslation()

  const feedbackRow = useFeedbackRow(data)
  const {row, detail} = feedbackRow
  const status = FEEDBACK_BODY_STATUS.find(item => +item.id === +data.status)

  return (
    <StyledTBody>
      <Tr
        {...props}
        className="feedback-table__row"
        extra={
          <RowExtra
            id={detail?.id}
            active={row.shouldOpenDetail}
            data={detail?.active}
            rowData={data}
            status={status}
          />
        }
        data-active={row.shouldOpenDetail}
        onClick={row.onToggleDetail}
      >
        <Td className="feedback-table__cell feedback-table__cell-code" data-type="td">
          <div>
            <TooltipV2 className="feedback-tr-table__tooltipV2" title={data?.code} baseOn="width">
              <Text fontWeight={500} color={'#00081D'}>{data?.code}</Text>
            </TooltipV2>
          </div>
          <div style={{position: 'relative'}}>
            <Tooltip title={t(DISPLAY_NAME_MENU.FEEDBACK.DATE_SENT)} placement={'bottom'}>
              <span>{ICONS_FEEDBACK.clock}</span>
            </Tooltip>
            <Text color={'#7C88A6'}
                  fontSize={13}
                  style={{position: 'absolute', top: -2, left: 18}}
            >{!!data?.dt_created ? fDateTimeSuffix(data?.dt_created) : '---'}</Text>
          </div>
        </Td>
        <Td className="feedback-table__cell" data-type="td">
          <TooltipV2 className={'feedback-table_tooltip--2line'}
                   title={data?.title || '---'}
                   baseOn={'height'}>
            <Text>{data?.title || '---'}</Text>
          </TooltipV2>
        </Td>
        <Td className="feedback-table__cell" data-type="td">
          <TooltipV2 className={'feedback-table_tooltip--2line'}
                   title={data?.feedback_type_name || '---'}
                   baseOn={'height'}>
            <Text>{data?.feedback_type_name || '---'}</Text>
          </TooltipV2>
        </Td>
        <Td className="feedback-table__cell" data-type="td">
          <Text className={'feedback-table_tooltip--2line'}>{data?.feedback_content || '---'}</Text>
        </Td>
        <Td className="feedback-table__cell" data-type="td">
          {!!data?.file_attach
            ?
              <a href={`${data?.link_file_attach}`}
                 style={{color: '#1A94FF'}}
                 target={'_blank'}
              >
                <span style={{marginTop: 3}}>{ICONS_FEEDBACK.pin}</span>
                <Text color={'#1A94FF'}>{t(DISPLAY_NAME_MENU.FEEDBACK.SEE_ATTACHMENT)}</Text>
              </a>
            : '---'
          }
        </Td>
        <Td className="feedback-table__cell" data-type="td">
          <div style={{ background: status.background,
                        padding: '0 12px',
                        borderRadius: 4,
                        height: 24,
                        // width: status.width
              }}>
            <Text color={status.color} fontSize={12}>{t(status.title)}</Text>
          </div>
        </Td>
        <Td
          className="feedback-table__cell"
          data-menu="true"
          data-type="td"
          onClick={e => e.stopPropagation()}
        >
          <button
            className="feedback-table__detail-toggle"
            data-active={row.shouldOpenDetail}
            onClick={row.onToggleDetail}
          >
            {ICONS_FEEDBACK.up}
          </button>
        </Td>
      </Tr>
    </StyledTBody>
  )
}


export default TrFeedback


export const StyledTBody = styled.div`
.tooltip_select {
  display: -webkit-box;
  height: 100%;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.feedback-table {
  &_tooltip {
      width: 100%;
      padding: 0;
      overflow: hidden;
      position: relative;
      display: inline-block;
      margin: 0 5px;
      text-decoration: none;
      text-overflow: ellipsis;
      white-space: nowrap;
      
      &--2line {
        display: -webkit-box;
        height: 100%;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      &--1line {
        display: -webkit-box;
        height: 100%;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-word;
      }
    }
  &__loading {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;

    width: 100vw;
    height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;

    background: rgba(0, 0, 0, 0.25);

    img {
      width: 80px;
      height: 80px;
    }
  }

  &__row {
    background: transparent !important;
    &:hover {
      .feedback-table__detail-toggle {
        display: block;
      }
    }
  }

  &__cell {
    cursor: pointer;
    &-code {
      display: block;
      padding-left: 16px;
    }
    
    &[data-menu='true'] {
      position: relative;
    }

    &[data-type='th'] {
      &[data-selected='true'] {
        display: flex;
        flex: 1;
        align-items: center;
      }
    }
    &:nth-child(1) {
      width: 10.625rem;
    }

    &:nth-child(2) {
      width: 14.375rem;
    }

    &:nth-child(3) {
      width: 15.625rem;
    }

    &:nth-child(4) {
      width: 31.5rem;
      flex: 1;
      word-break: break-all;
    }

    &:nth-child(5) {
      width: 18.75rem;
      a {
        color: #1A94FF;
        display: flex;
      }
    }

    &:nth-child(6) {
      width: 8.125rem;
      display: flex;
      justify-content: center;
    }

    &:nth-child(8) {
      display: flex;
      justify-content: end;
      margin-right: 6px;
    }
    
    @media screen and (max-width: 1440px) {
      &:nth-child(1) {
        width: 11.625rem;
      }
      &:nth-child(2) {
        width: 11.375rem;
      }
      &:nth-child(3) {
        width: 13.625rem;
      }
      &:nth-child(5) {
        width: 15.625rem;
      }
      &:nth-child(6) {
        width: 12.125rem;
      }
    }
  }

  &__detail-toggle {
    position: absolute;
    top: 50%;
    right: 24px;

    width: 20px;
    height: 20px !important;
    display: none;

    background: transparent;
    border: none;
    border-radius: 12px !important;

    font-size: 12px !important;
    line-height: 24px !important;

    transform: translateY(-50%) rotate(180deg);

    cursor: pointer;

    &[data-active='true'] {
      display: block !important;

      transform: translateY(-50%) rotate(0deg);
    }

    //@media screen and (max-width: 1599px) {
    //  display: none !important;
    //}
  }

  &__selected-action-dropdown {
    position: relative;

    margin-left: 12px;
  }

  &__selected-action-toggle {
    width: 88px;
    padding: 0 !important;

    border-radius: 14px !important;

    font-size: 14px !important;
    font-weight: 500 !important;
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
    top: calc(100% + 4px);
    left: 0;
    z-index: 12;

    width: 150px;
    padding: 8px;

    background: #ffffff;
    border-radius: 6px;
    box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
  }

  &__selected-action-menu-item {
    padding: 8px;

    color: #191d32;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;

    transition: color 0.25s;

    cursor: pointer;

    &:hover {
      color: #1e9a98;
    }
  }
}

.tab-detail-order {
  &__link-hover {
    color: #1A94FF;

    &:hover {
      color: #1373DB;
    }
  }
}
.feedback-tr-table__tooltipV2 {
  width: 100%;
  padding: 0;
  overflow: hidden;
  position: relative;
  display: inline-block;
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
}
`
