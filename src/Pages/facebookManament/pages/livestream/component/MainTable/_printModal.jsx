import {sendRequestAuth} from 'api/api'
import {Button} from 'common/button'
import {Text} from 'common/text'
import config from 'config'
import {ORDER_TABLE_ROW_EXTRA_TAB_SHIPPING_PRINT_DATA} from 'Pages/refactorOrder/interfaces/_constants'
import {useState} from 'react'
import styled from 'styled-components'

export const PrintModal = ({data, onClose, ...props}) => {
  const [loadingList, setLoadingList] = useState([])

  const handlePrint = async opt => {
    setLoadingList([...loadingList, opt?.id])

    if (opt?.type === 'evoshop') {
      const response = await sendRequestAuth(
        'post',
        `${config.API}/order/print-upos`,
        JSON.stringify({
          order_id: [data?.id],
          print_size: opt?.size,
          print_type: 'shipment',
        }),
      )

      if (response?.data?.success) {
        const content = getTemplatePrint(response?.data?.data[0] || '')

        const frame = document.createElement('iframe')
        frame.name = 'frame'
        frame.style.position = 'absolute'
        frame.style.top = '-1000000px'

        document.body.appendChild(frame)

        const frameDoc = frame.contentWindow
          ? frame.contentWindow
          : frame.contentDocument.document
          ? frame.contentDocument.document
          : frame.contentDocument
        frameDoc.document.open()
        frameDoc.document.write(content)
        frameDoc.document.close()

        window.frames.frame.focus()
        setTimeout(function () {
          window.frames.frame.print()
          document.body.removeChild(frame)

          setLoadingList(loadingList.filter(item => item?.id !== opt?.id))
        }, 1500)

        return true
      }
    } else if (opt?.type === 'others' && !!data?.print_partner) {
      const response = await sendRequestAuth(
        'post',
        `${config.API}/order/print-partner`,
        JSON.stringify({
          order_id: [data?.id],
          print_type: data?.print_partner,
        }),
      )

      if (!!response?.data?.success) window.open(response?.data?.data?.url)
      setLoadingList(loadingList.filter(item => item?.id !== opt?.id))
    }
  }

  const getTemplatePrint = content => `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body>${content}</body>
    </html>
  `

  return (
    <StyledPrintModal {...props} onClick={onClose}>
      <div
        className="livestream-table-facebook__print-modal__container"
        onClick={e => e.stopPropagation()}
      >
        <div className="livestream-table-facebook__print-modal__header">
          <Text as="h2" fontSize={19} lineHeight={28}>
            In vận đơn
          </Text>
        </div>
        <div className="livestream-table-facebook__print-modal__body">
          <Text as="p" lineHeight={18} style={{marginBottom: 16}}>
            Nhấp chọn từng nút để in theo mẫu tương ứng.
          </Text>
          <div className="livestream-table-facebook__print-modal__btn-list">
            {ORDER_TABLE_ROW_EXTRA_TAB_SHIPPING_PRINT_DATA.map(item => (
              <Button
                key={item.id}
                className="livestream-table-facebook__print-modal__btn"
                disabled={
                  (item?.type === 'others' && !data?.print_partner) ||
                  loadingList.includes(item.id)
                }
                size="sm"
                onClick={() => handlePrint(item)}
              >
                {item.name}
              </Button>
            ))}
          </div>
        </div>
        <div className="livestream-table-facebook__print-modal__footer">
          <Button
            size="sm"
            appearance="ghost"
            style={{minWidth: 110}}
            onClick={onClose}
          >
            Đóng
          </Button>
        </div>
      </div>
    </StyledPrintModal>
  )
}

const StyledPrintModal = styled.div`
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

  .livestream-table-facebook__print-modal {
    &__container {
      width: 720px;
      padding: 24px;

      background: #ffffff;
      border-radius: 8px;
      box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
    }

    &__header {
      margin-bottom: 24px;
    }

    &__footer {
      margin-top: 16px;

      display: flex;
      justify-content: flex-end;
    }

    &__btn-list {
      width: calc(100% + 12px);
      margin: 0 -6px;

      display: flex;
      flex-wrap: wrap;
    }

    &__btn {
      margin: 0 8px 16px 8px;

      flex: 1;
    }
  }
`
