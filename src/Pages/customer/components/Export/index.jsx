import {CircularProgress} from '@mui/material'
import {sendRequestAuth} from 'api/api'
import axios from 'axios'
import { Button } from 'common/button'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import config from 'config'
import useAlert from 'hook/useAlert'
import {CustomerContext} from 'Pages/customer'
import {CUSTOMER_LIMIT_EXPORT} from 'Pages/customer/_constants'
import ConfirmModal from 'Pages/deliveryManagement/components/ConfirmModalDelivery'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import {numberWithCommas} from 'Pages/refactorOrder/utils/string'
import {useRef} from 'react'
import {useContext} from 'react'
import {useEffect} from 'react'
import {useState} from 'react'
import {StyledExport} from './_styled'

export const Export = ({data, ...props}) => {
  const buttonNumber = Math.ceil(data?.data?.total / CUSTOMER_LIMIT_EXPORT)

  const isAutoDownload = data?.data?.total < CUSTOMER_LIMIT_EXPORT
  const [exportStatusList, setExportStatusList] = useState(() =>
    Array.from(Array(buttonNumber), (e, i) => (isAutoDownload ? 2 : 0)),
  )
  const [cancelTokenList, setCancelTokentList] = useState(() =>
    Array.from(Array(buttonNumber), (e, i) => axios.CancelToken.source()),
  )
  const [confirm, setConfirm] = useState({})
  const [isClosing, setIsClosing] = useState(false)
  const {showAlert} = useAlert()

  const handleClosePopup = () => {
    setIsClosing(true)
    if (exportStatusList.includes(2))
      setConfirm({
        ...confirm,
        active: true,
        title: 'Ngừng xuất excel',
        content:
          'Hệ thống đang thực hiện xuất dữ liệu ra file excel, bạn có chắc chắn muốn ngừng quá trình này?',
        btnCancel: 'Ngừng xuất',
        btnAccept: 'Tiếp tục xuất',
        acceptStyle: 'accept',
        handleConfirm: () => setIsClosing(false),
        handleCancel: () => {
          exportStatusList.forEach(
            (s, i) => s === 2 && cancelTokenList[i].cancel(),
          )
          data?.onClose()
          showAlert({
            type: 'info',
            content: 'Đã ngừng quá trình xuất excel',
            duration: 3000,
          })
        },
      })
    else data?.onClose()
  }

  return (
    <StyledExport {...props} style={{visibility: confirm.active ? 'hidden' : 'visible'}}>
      <ConfirmModal confirm={confirm} setConfirm={setConfirm} />
      <div
        className="customer-export__container"
        onClick={e => e.stopPropagation()}
      >
        <div className="customer-export__header">
          <span className="customer-export__banner">{ORDER_ICONS.xlsx}</span>
          <Text as="h5" fontSize={18} fontWeight={700} lineHeight={22}>
            {numberWithCommas(data?.data?.total || 0)} khách hàng
          </Text>
          <Text color="#7C88A6" lineHeight={18}>
            cần xuất excel
          </Text>
        </div>
        <div className="customer-export__body">
          <div className="customer-export__list common-scrollbar">
            {Array.from(Array(buttonNumber), (e, i) => (
              <Item
                key={i}
                index={i}
                exportData={data}
                status={exportStatusList[i]}
                cancelToken={cancelTokenList[i]}
                isAutoDownload={isAutoDownload}
                isOnly={buttonNumber <= 1}
                isClosing={isClosing}
                onClose={data?.onClose}
                setExportStatus={setExportStatusList}
                setCancelTokentList={setCancelTokentList}
              />
            ))}
          </div>
        </div>
        <div className="customer-export__footer">
          <Button
            appearance="ghost"
            size="sm"
            style={{minWidth: 110}}
            onClick={handleClosePopup}
          >
            Đóng
          </Button>
        </div>
        <div className="customer-export__bg">
          <img src="/img/order/export-bg.png" alt="bg" />
        </div>
      </div>
    </StyledExport>
  )
}

const Item = ({
  index,
  exportData,
  isOnly,
  onClose,
  isAutoDownload,
  status,
  setExportStatus,
  cancelToken,
  isClosing,
  setCancelTokentList,
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
      per_page: CUSTOMER_LIMIT_EXPORT,
      start: numberWithCommas(index * CUSTOMER_LIMIT_EXPORT).replace(/,/g, ''),
    })) {
      queryString += `${i > 0 ? '&' : ''}${key}=${value}`
      i++
    }

    const response = await sendRequestAuth(
      'get',
      `${config.API}/customer/export-xlsx${queryString}`,
      null,
      currCancelToken.current?.token,
    )

    if (response?.data?.success) {
      
      linkRef.current.href = response?.data?.data?.url
      linkRef.current.download = response?.data?.data?.url.substr(
        response?.data?.data?.url.lastIndexOf('/') + 1,
      )
      // linkRef.current.click()

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
      className="customer-export__item"
      onClick={() => {
        if ([0, 1].includes(status)) {
          const newCancelToken = axios.CancelToken.source()
          currCancelToken.current = newCancelToken
          setCancelTokentList(prev => {
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

      <div className="customer-export__info">
        <Text as="b" style={{display: 'block'}}>
          Xuất dữ liệu từ {numberWithCommas(index * CUSTOMER_LIMIT_EXPORT + 1)}{' '}
          -{' '}
          {numberWithCommas(
            Math.min(
              (index + 1) * CUSTOMER_LIMIT_EXPORT,
              Number(exportData?.data?.total || 0),
            ),
          )}
        </Text>
        {statusText}
      </div>
      <div className="customer-export__action">
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
              stroke="#E5101D"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        {status === 2 && (
          <>
            <CircularProgress
              className="customer-export__loading"
              size={28}
              thickness={4}
            />
            <i className="customer-export__cancel">{ORDER_ICONS.xExcel}</i>
          </>
        )}
        {![1, 2].includes(status) && (
          <span className="customer-export__download">
            {ORDER_ICONS.export}
          </span>
        )}
      </div>
    </div>
  )
}
