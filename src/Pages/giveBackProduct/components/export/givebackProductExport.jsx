import React, {useContext, useEffect, useRef, useState} from 'react';
import {ORDER_ICONS} from "../../../refactorOrder/interfaces/_icons";
import {Text} from "../../../../common/text";
import {numberWithCommas} from "../../../refactorOrder/utils/string";
import {Button} from "../../../../common/button";
import {THEME_SEMANTICS} from "../../../../common/theme/_semantics";
import {sendRequestAuth} from "../../../../api/api";
import config from "../../../../config";
import {CircularProgress} from "@mui/material";
import {GIVEBACK_PRODUCT_LIMIT_EXPORT} from "../../interfaces/contants";
import styled from "styled-components";
import {THEME_COLORS} from "../../../../common/theme/_colors";
import toast from "../../../../Component/Toast";
import {GiveBackProductContext} from "../../provider/context";
import {giveBackProductActions} from "../../provider/~reducer";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../const/display_name_menu";

export const GivebackProductExport = ({data, ...props}) => {
  const {t} = useTranslation()
  const buttonNumber = Math.ceil(data?.data?.total / GIVEBACK_PRODUCT_LIMIT_EXPORT)

  return (
    <StyledGivebackProductExport {...props}>
      <div className="order-export__container">
        <div className="order-export__header">
          <span className="order-export__banner">{ORDER_ICONS.xlsx}</span>
          <Text className="order-export__header--text" as="h5" fontSize={18} fontWeight={700} lineHeight={22}>
            {numberWithCommas(data?.data?.total || 0)} {t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.HOME)}
          </Text>
          <Text color="#7C88A6" lineHeight={18}>
            {t(DISPLAY_NAME_MENU.GENERAL.NEED_EXPORT_EXCEL)}
          </Text>
        </div>
        <div className="order-export__body">
          <div className="order-export__list common-scrollbar">
            {Array.from(Array(buttonNumber), (e, i) => (
              <Item
                key={i}
                data={i}
                exportData={data}
                isOnly={buttonNumber <= 1}
                onClose={data?.onClose}
              />
            ))}
          </div>
        </div>
        <div className="order-export__footer">
          <Button
            appearance="ghost"
            size="sm"
            style={{minWidth: 110}}
            onClick={data?.onClose}
          >
            {t(DISPLAY_NAME_MENU.GENERAL.CLOSE)}
          </Button>
        </div>
        <div className="order-export__bg">
          <img src="/img/order/export-bg.png" alt="bg" />
        </div>
      </div>
    </StyledGivebackProductExport>
  )
}

const Item = ({data, exportData, isOnly, onClose}) => {
  const {t} = useTranslation()
  const {pageState, pageDispatch} = useContext(GiveBackProductContext)
  const [status, setStatus] = useState(0)
  const [prevent, setPrevent] = useState(false)

  const link = useRef()

  const container = useRef(null)

  const statusText =
    status === 1 ? (
      <Text color={THEME_SEMANTICS.delivered} fontSize={12} lineHeight={17}>
        {t(DISPLAY_NAME_MENU.GENERAL.EXPORTED_FILE)}
      </Text>
    ) : status === 2 ? (
      <Text color="#7C88A6" fontSize={12} lineHeight={17}>
        {t(DISPLAY_NAME_MENU.GENERAL.PROCESSING_DATA)}
      </Text>
    ) : (
      <Text color={THEME_SEMANTICS.failed} fontSize={12} lineHeight={17}>
        {t(DISPLAY_NAME_MENU.GENERAL.NOT_EXPORTED_FILE_YET)}
      </Text>
    )

  const handleExport = async () => {
    let queryString = '?'
    let i = 0
    for (const [key, value] of Object.entries({
      ...exportData?.data?.query,
      per_page: GIVEBACK_PRODUCT_LIMIT_EXPORT,
      start: numberWithCommas(data * GIVEBACK_PRODUCT_LIMIT_EXPORT).replace(/,/g, ''),
    })) {
      queryString += `${i > 0 ? '&' : ''}${key}=${value}`
      i++
    }

    const response = await sendRequestAuth(
      'get',
      `${config.API}/order/return/export-xlsx${queryString}`,
    )

    pageDispatch({type: giveBackProductActions.SET_EXPORTING_HEADER, payload: true})
    if (!!response?.data?.success) {
      if (container?.current) {
        const statusContainer = container.current.getAttribute('data-status')

        if (statusContainer !== '3') {
          pageDispatch({type: giveBackProductActions.SET_EXPORTING_HEADER, payload: false})
          toast.success(t(DISPLAY_NAME_MENU.GENERAL.EXPORT_EXCEL_SUCCESS))
          setStatus(1)
          const link = document.createElement('a')
          link.href = response?.data?.data?.url
          link.download = response?.data?.data?.url.substr(
            response?.data?.data?.url.lastIndexOf('/') + 1,
          )
          link.click()
        } else setStatus(0)
      }
    }
  }

  const handleCancel = () => setStatus(3)

  useEffect(() => {
    if (isOnly && container?.current) container.current.click()
  }, [isOnly])

  return (
    <div
      ref={container}
      className="order-export__item"
      data-status={status}
      onClick={() => {
        if ([0, 1].includes(status)) {
          setStatus(2)
          handleExport()
        } else handleCancel()
      }}
    >
      {!prevent && <a ref={link} style={{display: 'none'}} />}
      <div className="order-export__info">
        <Text as="b" style={{display: 'block'}} className="order-export__info--text">
          {t(DISPLAY_NAME_MENU.GENERAL.EXPORT_EXCEL_FROM)} {numberWithCommas(data * GIVEBACK_PRODUCT_LIMIT_EXPORT + 1)} -{' '}
          {numberWithCommas(
            Math.min(
              (data + 1) * GIVEBACK_PRODUCT_LIMIT_EXPORT,
              Number(exportData?.data?.total || 0),
            ),
          )}
        </Text>
        {statusText}
      </div>
      <div className="order-export__action">
        {status === 1 && (
          <svg
            width="14"
            height="11"
            viewBox="0 0 14 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              cursor: 'pointer',
            }}
          >
            <path
              d="M13 1.375L4.75 9.625L1 5.875"
              stroke="#1E9A98"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        {status === 2 && (
          <>
            <CircularProgress
              className="order-export__loading"
              size={28}
              thickness={4}
            />
            <i className="order-export__cancel">{ORDER_ICONS.xExcel}</i>
          </>
        )}
        {![1, 2].includes(status) && (
          <span className="order-export__download">{ORDER_ICONS.export}</span>
        )}
      </div>
    </div>
  )
}

const StyledGivebackProductExport = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;

  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(0, 0, 0, 0.25);

  .order-export {
    &__container {
      position: relative;

      width: 480px;
      padding: 24px 10px 24px 24px;

      overflow: hidden;

      background: #ffffff;
      border-radius: 8px;
      box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
    }

    &__bg {
      position: absolute;
      top: -38px;
      left: 13px;

      width: calc(100% - 26px);
      height: 172px;

      img {
        width: 100%;
        height: 100%;

        object-fit: contain;
        object-position: center;
      }
    }

    &__header {
      margin-bottom: 24px;
      padding-top: 8px;

      display: flex;
      flex-direction: column;
      align-items: center;

      text-align: center;
      &--text {
        text-transform: lowercase;
      }
    }

    &__body {
      margin-bottom: 24px;
    }

    &__footer {
      display: flex;
      justify-content: flex-end;
    }

    &__banner {
      margin-bottom: 12px;

      svg {
        width: 44px;
        height: 44px;
      }
    }

    &__list {
      max-height: 276px;
      padding-right: 8px;

      overflow: auto;
    }

    &__item {
      padding: 12px 16px;

      display: flex;
      align-items: center;

      border-radius: 6px;

      transition: background 0.25s;

      &:hover {
        background: linear-gradient(
            0deg,
            rgba(244, 247, 252, 0.6),
            rgba(244, 247, 252, 0.6)
          ),
          #ffffff;

        .order-export__cancel {
          display: block;
        }
      }
    }

    &__info {
      flex: 1;
    }

    &__action {
      position: relative;

      width: 28px;
      height: 28px;
      margin-left: 24px;

      &::before {
        position: absolute;
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;

        border: 3px solid #f0f3f9;
        border-radius: 50%;

        content: '';
      }
    }

    &__loading {
      color: ${THEME_COLORS.primary_300}!important;
    }

    &__download {
      position: absolute;
      top: 50%;
      left: 50%;

      padding-top: 2px;

      transform: translate(-50%, -50%);

      cursor: pointer;
    }

    &__cancel {
      position: absolute;
      top: 50%;
      left: 50%;

      transform: translate(-50%, -50%);

      display: none;
    }
  }
  .order-export__info--text:first-letter {
    text-transform: uppercase;
  }
`

