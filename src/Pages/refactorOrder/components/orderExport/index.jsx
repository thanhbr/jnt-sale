import {CircularProgress} from '@mui/material'
import {sendRequestAuth} from 'api/api'
import {Button} from 'common/button'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import config from 'config'
import {ORDER_LIMIT_EXPORT} from 'Pages/refactorOrder/interfaces/_constants'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import {numberWithCommas} from 'Pages/refactorOrder/utils/string'
import {useRef} from 'react'
import {useEffect} from 'react'
import {useState} from 'react'
import {StyledOrderExport} from './_styled'

export const OrderExport = ({data, ...props}) => {
  const buttonNumber = Math.ceil(data?.data?.total / ORDER_LIMIT_EXPORT)

  return (
    <StyledOrderExport {...props}>
      <div className="order-export__container">
        <div className="order-export__header">
          <span className="order-export__banner">{ORDER_ICONS.xlsx}</span>
          <Text as="h5" fontSize={18} fontWeight={700} lineHeight={22}>
            {numberWithCommas(data?.data?.total || 0)} đơn hàng
          </Text>
          <Text color="#7C88A6" lineHeight={18}>
            cần xuất excel
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
            Đóng
          </Button>
        </div>
        <div className="order-export__bg">
          <img src="/img/order/export-bg.png" alt="bg" />
        </div>
      </div>
    </StyledOrderExport>
  )
}

const Item = ({data, exportData, isOnly, onClose}) => {
  const [status, setStatus] = useState(0)
  const [prevent, setPrevent] = useState(false)

  const link = useRef()

  const container = useRef(null)

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
      per_page: ORDER_LIMIT_EXPORT,
      start: numberWithCommas(data * ORDER_LIMIT_EXPORT).replace(/,/g, ''),
    })) {
      queryString += `${i > 0 ? '&' : ''}${key}=${value}`
      i++
    }

    const response = await sendRequestAuth(
      'get',
      `${config.API}/order/export-orders-xlsx${queryString}`,
    )

    if (!!response?.data?.success) {
      if (container?.current) {
        const statusContainer = container.current.getAttribute('data-status')

        if (statusContainer !== '3') {
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
        <Text as="b" style={{display: 'block'}}>
          Xuất dữ liệu từ {numberWithCommas(data * ORDER_LIMIT_EXPORT + 1)} -{' '}
          {numberWithCommas(
            Math.min(
              (data + 1) * ORDER_LIMIT_EXPORT,
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
              stroke="#1A94FF"
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
