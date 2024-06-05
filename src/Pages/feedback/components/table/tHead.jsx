import React from 'react';
import {Tr} from "../../../../layouts/tableLayout/_tr";
import {Th} from "../../../../layouts/tableLayout/_th";
import styled from "styled-components";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../const/display_name_menu";

const THead = ({...props}) => {
  const {t} = useTranslation()
  return (
      <StyledTHead>
        <Tr {...props} type="tHead">
          <Th className="feedback-table__cell--code">{t(DISPLAY_NAME_MENU.FEEDBACK.CODE)}</Th>
          <Th className="feedback-table__cell--title">{t(DISPLAY_NAME_MENU.GENERAL.TITLE)}</Th>
          <Th className="feedback-table__cell--type">{t(DISPLAY_NAME_MENU.FEEDBACK.TYPE)}</Th>
          <Th className="feedback-table__cell--note">{t(DISPLAY_NAME_MENU.FEEDBACK.CONTENT)}</Th>
          <Th className="feedback-table__cell--file">{t(DISPLAY_NAME_MENU.FEEDBACK.ATTACHMENTS)}</Th>
          <Th className="feedback-table__cell--status">{t(DISPLAY_NAME_MENU.FEEDBACK.PROCESS_STATUS)}</Th>
          <Th
            className="feedback-table__cell"
            style={{display: 'flex'}}
          />
        </Tr>
      </StyledTHead>
  )
}

export default THead


export const StyledTHead = styled.div`
  .tr__container{
    height: 44px;
  }
  .feedback-table {
    &__cell {
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
      &--code {
        width: 10.625rem;
        padding-left: 16px;
      }
      &--title {
        width: 14.375rem;
      }
      &--type {
        width: 15.625rem;
      }
      &--note {
        width: 31.5rem;
        flex: 1;
      }
      &--file {
        width: 18.75rem;
      }
      &--status {
        width: 8.125rem;
        text-align: center;
      }
      

      @media screen and (max-width: 1440px) {
        &--code {
          width: 11.625rem;
          padding-left: 16px;
        }
        &--title {
          width: 11.375rem;
        }
        &--type {
          width: 13.625rem;
        }
        &--note {
          width: 31.5rem;
          flex: 1;
        }
        &--file {
          width: 15.75rem;
        }
        &--status {
          width: 12.125rem !important;
        }
    }
    
    &__selected {
      &-action-dropdown {
        margin-left: 12px;
        border-radius: 60px;
      }
      &-action-toggle {
        border-radius: 60px;
        background: #2BB8A9;
        border: none;
        width: 88px;
        padding: 0 8px;
      }
      

  &-action-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 11;

    width: 100vw;
    height: 100vh;
  }

  &-action-menu {
    position: absolute;
    top: 40px;
    left: 15%;
    z-index: 12;

    width: 201px;
    padding: 4px;

    background: #ffffff;
    border-radius: 6px;
    box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
  }

  &-action-menu-item {
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
  }
`