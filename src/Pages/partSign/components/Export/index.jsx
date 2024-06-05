import {CircularProgress} from '@mui/material'
import {sendRequestAuth} from 'api/api'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import config from 'config'
import {LIMIT_EXPORT} from 'Pages/partSign/interfaces/_constants'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import {numberWithCommas} from 'Pages/refactorOrder/utils/string'
import {useRef} from 'react'
import {useEffect} from 'react'
import {useState} from 'react'
import {StyledExport} from './_styled'
import {Button} from 'common/button'
import axios from 'axios'
import useAlert from 'hook/useAlert'
import ConfirmModal from 'Pages/deliveryManagement/components/ConfirmModalDelivery'
import {useTranslation} from "react-i18next";

export const Export = ({data, ...props}) => {
  const buttonNumber = Math.ceil(data?.data?.total / LIMIT_EXPORT)

  const isAutoDownload = data?.data?.total < LIMIT_EXPORT
  const [exportStatusList, setExportStatusList] = useState(() =>
    Array.from(Array(buttonNumber), (e, i) => (isAutoDownload ? 2 : 0)),
  )
  const [cancelTokenList, setCancelTokenList] = useState(() =>
    Array.from(Array(buttonNumber), (e, i) => axios.CancelToken.source()),
  )
  const [confirm, setConfirm] = useState({})
  const [isClosing, setIsClosing] = useState(false)
  const {showAlert} = useAlert()
  const { t } = useTranslation()

  const handleClosePopup = () => {
    setIsClosing(true)
    if (exportStatusList.includes(2))
      setConfirm({
        ...confirm,
        active: true,
        title: t("general_stop_exporting_excel"),
        content:
          t("general_system_exporting_excel_you_want_stop"),
        btnCancel: t("general_stop_exporting"),
        btnAccept: t("general_continue_export"),
        acceptStyle: 'accept',
        handleConfirm: () => setIsClosing(false),
        handleCancel: () => {
          exportStatusList.forEach(
            (s, i) => s === 2 && cancelTokenList[i].cancel(),
          )
          data?.onClose()
          showAlert({
            type: 'info',
            content: t("general_excel_export_stop"),
            duration: 3000,
          })
        },
      })
    else data?.onClose()
  }

  return (
    <StyledExport
      {...props}
      style={{visibility: confirm.active ? 'hidden' : 'visible'}}
    >
      <ConfirmModal confirm={confirm} setConfirm={setConfirm} />
      <div
        className="partSign-export__container"
        onClick={e => e.stopPropagation()}
      >
        <div className="partSign-export__header">
          <span className="partSign-export__banner">{ORDER_ICONS.xlsx}</span>
          <Text as="h5" fontSize={18} fontWeight={700} lineHeight={22}>
            {numberWithCommas(data?.data?.total || 0)} {t("order_sign_1_part")}
          </Text>
          <Text color="#7C88A6" lineHeight={18}>
            {t("need_to_export_excel")}
          </Text>
        </div>
        <div className="partSign-export__body">
          <div className="partSign-export__list common-scrollbar">
            {Array.from(Array(buttonNumber), (e, i) => (
              <Item
                key={i}
                index={i}
                status={exportStatusList[i]}
                cancelToken={cancelTokenList[i]}
                isAutoDownload={isAutoDownload}
                exportData={data}
                isOnly={buttonNumber <= 1}
                isClosing={isClosing}
                onClose={data?.onClose}
                setExportStatus={setExportStatusList}
                setCancelTokenList={setCancelTokenList}
              />
            ))}
          </div>
        </div>
        <div className="partSign-export__footer">
          <Button
            appearance="ghost"
            style={{
              marginRight: 8,
              width: '110px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            className=""
            onClick={handleClosePopup}
          >
            {t("general_close")}
          </Button>
        </div>
        <div className="partSign-export__bg">
          <img src="/img/order/export-bg.png" alt="bg" />
        </div>
      </div>
    </StyledExport>
  )
}

const Item = ({
  index,
  exportData,
  isAutoDownload,
  status,
  setExportStatus,
  cancelToken,
  isClosing,
  setCancelTokenList,
}) => {
  const [prevStatus, setPrevStatus] = useState(0)
  const [url, setURL] = useState('')
  const container = useRef(null)
  const linkRef = useRef(null)
  const currCancelToken = useRef(cancelToken || null)

  const statusText =
    status === 1 ? (
      <Text color={THEME_SEMANTICS.delivered} fontSize={12} lineHeight={17}>
        Đã xuất file
      </Text>
    ) : status === 2 ? (
      <Text color="#7C88A6" fontSize={12} lineHeight={17}>
        Đang xử lý dữ liệu...
      </Text>
    ) : status === 3 ? (
      <Text color="#7C88A6" fontSize={12} lineHeight={17}>
        Đang huỷ...
      </Text>
    ) : (
      <Text color={THEME_SEMANTICS.failed} fontSize={12} lineHeight={17}>
        Chưa xuất file
      </Text>
    )

  const handleExport = async () => {
    let queryString = '?'
    let i = 0
    for (const [key, value] of Object.entries({
      ...exportData?.data?.query,
      per_page: LIMIT_EXPORT,
      start: numberWithCommas(index * LIMIT_EXPORT).replace(/,/g, ''),
    })) {
      queryString += `${i > 0 ? '&' : ''}${key}=${value}`
      i++
    }

    const response = await sendRequestAuth(
      'get',
      `${config.API}/order/partsign/export-xlsx${queryString}`,
      null,
      currCancelToken.current?.token,
    )

    if (response?.data?.success) {
      
      linkRef.current.href = response?.data?.data?.url
      linkRef.current.download = response?.data?.data?.url.substr(
        response?.data?.data?.url.lastIndexOf('/') + 1,
      )
      
      setURL(response?.data?.data?.url)
    }
  }

  useEffect(() => {
    if (!isClosing && url !== '' && status === 2) {
      linkRef.current.click()

      setExportStatus(prev => {
        prev[index] = 1
        return [...prev]
      })

      setURL('')
    }
  }, [isClosing, url, status])

  const handleCancel = () => {
    setExportStatus(prev => {
      prev[index] = prevStatus
      return [...prev]
    })
    currCancelToken.current.cancel()
  }

  useEffect(() => {
    if (isAutoDownload) {
      handleExport()
    }
  }, [isAutoDownload])

  return (
    <div
      ref={container}
      data-status={status}
      className="partSign-export__item"
      onClick={() => {
        if ([0, 1].includes(status)) {
          const newCancelToken = axios.CancelToken.source()
          currCancelToken.current = newCancelToken
          setCancelTokenList(prev => {
            prev[index] = newCancelToken
            return [...prev]
          })
          setPrevStatus(status)
          setExportStatus(prev => {
            prev[index] = 2
            return [...prev]
          })
          handleExport()
        } else handleCancel()
      }}
    >
      <a ref={linkRef} style={{display: 'none'}}></a>

      <div className="partSign-export__info">
        <Text as="b" style={{display: 'block'}}>
          Xuất dữ liệu từ {numberWithCommas(index * LIMIT_EXPORT + 1)} -{' '}
          {numberWithCommas(
            Math.min(
              (index + 1) * LIMIT_EXPORT,
              Number(exportData?.data?.total || 0),
            ),
          )}
        </Text>
        {statusText}
      </div>
      <div className="partSign-export__action">
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
              className="partSign-export__loading"
              size={28}
              thickness={4}
            />
            <i className="partSign-export__cancel">{ORDER_ICONS.xExcel}</i>
          </>
        )}
        {[0, 3].includes(status) && (
          <span
            className={
              `partSign-export__download` +
              (status === 3 ? ' disable_download' : '')
            }
          >
            {ORDER_ICONS.export}
          </span>
        )}
      </div>
    </div>
  )
}
