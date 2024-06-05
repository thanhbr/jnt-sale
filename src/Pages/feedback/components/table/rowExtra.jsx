import React from 'react';
import {Text} from "../../../../common/text";
import {THEME_COLORS} from "../../../../common/theme/_colors";
import styled from "styled-components";
import {ICONS_FEEDBACK} from "../../interfaces/_icons";
import {fDateTimeSuffix} from "../../../../util/formatTime";
// import {Tooltip as TooltipV2} from "../../../../common/tooltipv2";
import {FEEDBACK_BODY_FILE} from "../../interfaces/_contants";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../const/display_name_menu";

const RowExtra = ({data, active, rowData, status, ...props}) => {
  const {t} = useTranslation()

  return (
    <StyledRowExtra {...props} data-active={active}>
      <div className="row-feedback-extra__container">
        <div className="row-feedback-extra__tabs">
            <div
              className="row-feedback-extra__tab"
              data-active={true}
              // data-active={item.value === activeTab}
              // onClick={() => setActiveTab(item.value)}
            >
              {t(DISPLAY_NAME_MENU.FEEDBACK.DETAIL)}
            </div>
        </div>
        <div className="feedback-extra__content">
          <div className="row-tab-detail__content">
            <div className="row-tab-detail__content--general">
              <Text
                as="h4"
                color={THEME_COLORS.secondary_100}
                fontSize={16}
                lineHeight={22}
                style={{marginBottom: 12}}
              >
                {t(DISPLAY_NAME_MENU.FEEDBACK.OF_YOUR)}
              </Text>
              <div style={{display: 'flex'}}>
                <div style={{marginRight: 50}}>
                  <Text
                    color="#7C88A6"
                    fontSize={14}
                    fontWeight={400}
                    lineHeight={20}
                    style={{display: 'block'}}
                  >
                    {t(DISPLAY_NAME_MENU.FEEDBACK.TYPE)}
                  </Text>
                  <Text
                    color={THEME_COLORS.secondary_100}
                    fontSize={14}
                    fontWeight={400}
                    lineHeight={20}
                    style={{textTransform: 'capitalize'}}
                  >
                    {data?.feedback_type_name || '---'}
                  </Text>
                  <Text
                    color="#7C88A6"
                    fontSize={14}
                    fontWeight={400}
                    lineHeight={20}
                    style={{display: 'block', marginTop: 12}}
                  >
                    {t(DISPLAY_NAME_MENU.FEEDBACK.ATTACHMENTS)}
                  </Text>
                  {!!data?.file_attach && !!data?.file_attach?.split('.')[1]
                    ? (
                      <a href={`${data?.link_file_attach}`}
                         style={{display: 'flex'}}
                         target={'_blank'}
                      >
                        <span style={{marginTop: 1, marginRight: 6}}>
                          {FEEDBACK_BODY_FILE.find(item => item.format === data?.file_attach?.split('.')[1])?.icon || ICONS_FEEDBACK.jpg}
                        </span>
                        {/*<TooltipV2 className={'feedback-table_tooltip--1line'}*/}
                        {/*           title={data?.file_attach}*/}
                        {/*           baseOn='height'*/}
                        {/*           placement='bottom'*/}
                        {/*>*/}
                          <Text color={'#1A94FF'}>{t(DISPLAY_NAME_MENU.FEEDBACK.SEE_ATTACHMENT)}</Text>
                        {/*</TooltipV2>*/}
                      </a>
                    )
                    : '---'
                  }
                </div>
              </div>
            </div>
            <div className="row-tab-detail__content--payment">
              <Text
                as="h4"
                color={THEME_COLORS.secondary_100}
                fontSize={16}
                lineHeight={22}
                style={{marginBottom: 12}}
              >
                {t(DISPLAY_NAME_MENU.FEEDBACK.CONTENT)}
              </Text>
              <div className={'row-tab-detail__content--note scroll-custom'}>
                <div className={'row-tab-detail__content--note-user'}>
                  <Text>{ICONS_FEEDBACK.user}</Text>
                  <div className={'row-tab-detail__content--note-script'}>
                    <Text fontWeight={600} as={'p'}>{data?.title || ''}</Text>
                    <Text color={'#7C88A6'} fontSize={12}>{t(DISPLAY_NAME_MENU.FEEDBACK.DATE)}: {!!data?.dt_created ? fDateTimeSuffix(data?.dt_created) : '---'}</Text>
                    <Text as={'p'} className={'row-tab-detail__content--note-script-detail scroll-custom'}>{data?.feedback_content || '---'}</Text>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {+status?.id !== 1 && (
            <div className="row-tab-detail__content">
              <div className="row-tab-detail__content--general">
                <Text
                  as="h4"
                  color={THEME_COLORS.secondary_100}
                  fontSize={16}
                  lineHeight={22}
                  style={{marginBottom: 12}}
                >
                  {t(DISPLAY_NAME_MENU.FEEDBACK.FROM_EVO)}
                </Text>
                <div style={{display: 'flex'}}>
                  <div style={{marginRight: 50}}>
                    <Text
                      color="#7C88A6"
                      fontSize={14}
                      fontWeight={400}
                      lineHeight={20}
                      style={{display: 'block'}}
                    >
                      {t(DISPLAY_NAME_MENU.FEEDBACK.PROCESS_STATUS)}
                    </Text>
                    <div style={{ background: status.background,
                      padding: '0 12px',
                      borderRadius: 4,
                      height: 24,
                      width: status.width
                    }}>
                      <Text color={status.color} fontSize={12}>{status.title}</Text>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row-tab-detail__content--payment">
                <Text
                  as="h4"
                  color={THEME_COLORS.secondary_100}
                  fontSize={16}
                  lineHeight={22}
                  style={{marginBottom: 12}}
                >
                  {t(DISPLAY_NAME_MENU.FEEDBACK.FEEDBACK_CONTENT)}
                </Text>
                <div className={'row-tab-detail__content--note'}>
                  <div className={'row-tab-detail__content--note-user'}>
                    <Text>{ICONS_FEEDBACK.upos}</Text>
                    <div className={'row-tab-detail__content--note-script'}>
                      <Text fontWeight={600} as={'p'}>{t(DISPLAY_NAME_MENU.FEEDBACK.ANSWER)} #{data?.code || ''}</Text>
                      <Text color={'#7C88A6'} fontSize={12}>{t(DISPLAY_NAME_MENU.FEEDBACK.DATE_FEEDBACK)}: {!!data?.dt_process ? fDateTimeSuffix(data?.dt_process) : '---'}</Text>
                      {!!!data?.note
                        ? <Text as={'p'} style={{marginTop: 21}}>{t(DISPLAY_NAME_MENU.FEEDBACK.CONTENT_HOTLINE)} <Text color={'rgba(26, 148, 255, 1)'}>1900 1511 ({t(DISPLAY_NAME_MENU.FEEDBACK.CLICK2)})</Text> {t(DISPLAY_NAME_MENU.FEEDBACK.CLICK3)}</Text>
                        : <Text as={'p'} className={'row-tab-detail__content--note-script-detail scroll-custom'}>{data?.note}</Text>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </StyledRowExtra>
  )
}

export default RowExtra

const StyledRowExtra = styled.div`
  // max-height: 0;

  overflow: hidden;

  transition: all 0.25s;

  &[data-active='true'] {
    //max-height: 176vh;
    padding: 4px 0 7px 0;
  }
  &[data-active='false'] {
    max-height: 0;
  }

  .row-feedback-extra {
    &__container {
      overflow: hidden;

      border-left: 4px solid #1e9a98;
      border-radius: 0 8px 8px 8px;
    }

    &__tabs {
      height: 36px;

      display: flex;
    }

    &__tab {
      margin-right: 4px;
      padding: 0 32px;

      display: flex;
      align-items: center;
      justify-content: center;

      background: #e2eaf8;
      border-radius: 8px 8px 0 0;

      color: ${THEME_COLORS.secondary_100};
      font-size: 14px;
      font-weight: 400;

      transition: all 0.25s;

      cursor: pointer;

      &:first-child {
        border-radius: 0 8px 0 0;
      }

      &[data-active='true'] {
        background: #fff;
      }
    }

    &__content {
      padding: 24px 36px 32px 36px;

      background: #fff;
      border-radius: 0 8px 0 0;
    }
  }
  .row-tab-detail {
    &__content {
      padding: 24px 36px;
      background: white;
      display: flex;
      &--general {
        width: 23.8%;
      }
      &--payment {
        width: 76.2%;
      }
      &--note {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 24px;
        gap: 12px;
        max-height: 216px;
        
        //width: 74.3125rem;
        
        background: #FFFFFF;
        border-radius: 8px;
        border: 1px solid rgb(207 207 207 / 80%);
        
        /* Inside auto layout */
        
        flex: none;
        order: 1;
        align-self: stretch;
        flex-grow: 0;
        
        &-user {
          display: flex;
        }
        &-script {
          margin-left: 12px;
          &-detail {
            margin-top: 21px;
            max-height: 100px;
            overflow: scroll;
            padding-right: 16.875rem;
            word-break: break-all;
          }
        }
      }
    }
  }
`
