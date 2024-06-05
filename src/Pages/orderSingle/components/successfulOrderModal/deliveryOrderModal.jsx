import {Button} from 'common/button'
import {Text} from 'common/text'
import {StyledOrderCreatePrintModal} from './_styled'
import {ORDER_SINGLE_ICONS} from '../../interface/_icons'
import * as React from 'react'
import {Popper} from '../../../../common/popper'
import {sendRequestAuth} from '../../../../api/api'
import config from '../../../../config'
import {ORDER_SINGLE_CONSTANTS} from '../../interface/_constants'
import {useContext, useState} from 'react'
import {OrderSingleContext} from '../../provider/_context'
import useOrderSingle from '../../hooks/useOrderSingle'
import {SuccessfulOrder} from "./index";
import { useNavigate } from 'react-router-dom'

export const DeliveryOrderModal = ({data, setModal, ...props}) => {
  const {state, dispatch} = useContext(OrderSingleContext)
  const {methods} = useOrderSingle()
  const [dataOrder, setDataOrder] = useState()

  const isAllFailed = !data?.success
  const handlePrint = async pageSize => {
    dispatch({type: 'UPDATE_LOADING', payload: true})
    const response = await sendRequestAuth(
      'post',
      pageSize?.value === 'others'
        ? `${config.API}/order/print-partner`
        : `${config.API}/order/print-upos`,
      JSON.stringify(
        pageSize?.value === 'others'
          ? {
              order_id: [data?.meta?.insert_id],
              print_type: data?.meta?.print_partner,
            }
          : {
              order_id: [data?.meta?.insert_id],
              print_type: 'shipment',
              print_size: pageSize?.value,
            },
      ),
    )

    if (response?.data?.success) {
      dispatch({type: 'UPDATE_LOADING', payload: false})
      if (pageSize?.value === 'others') {
        window.open(response?.data?.data?.url)
      } else {
        // in
        let frame = document.createElement('iframe')
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
        frameDoc.document.write(response?.data?.data)
        frameDoc.document.close()
        window.frames.frame.focus()
        setTimeout(function () {
          window.frames.frame.print()
          document.body.removeChild(frame)
        }, 1500)

        return true
      }
    }
    dispatch({type: 'UPDATE_LOADING', payload: false})
  }
  const createDraftOrder = opt => {
    const response = methods.onSubmit(opt)
    response.then(res => {
      if (!!res?.data) setDataOrder({...res.data, ...opt})
    })
  }

  const scrollToTop = () => {
    const wrapper = document.querySelector('#content-wrap')
    wrapper.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const nav = useNavigate()

  return (
    <StyledOrderCreatePrintModal {...props}>
      <div
        className="order-create-print-modal__container"
        data-success={!isAllFailed}
        onClick={e => e.stopPropagation()}
      >
        <div className="order-create-print-modal__header">
          <Text as="h2" fontSize={20} lineHeight={28}>
            {isAllFailed
              ? state.form.shippingInfo.isStorePickUp
                ? 'Tạo đơn nhận tại cửa hàng thất bại'
                : 'Gửi đơn giao hàng thất bại'
              : ''}
          </Text>
        </div>
        <div className="order-create-print-modal__body">
          {isAllFailed ? (
            <div>
              {state.form.shippingInfo.isStorePickUp ? (
                <Text as="p" style={{marginBottom: '24px'}}>
                  Đơn hàng của bạn đang gặp các vấn đề dưới đây, bạn cần kiểm
                  tra và điều chỉnh để có thể tạo đơn hàng?
                </Text>
              ) : (
                <Text as="p" style={{marginBottom: '24px'}}>
                  Đơn hàng của bạn đang gặp các vấn đề dưới đây, bạn có muốn{' '}
                  <Text as="span" fontWeight={600}>
                    Lưu đơn hàng nháp{' '}
                  </Text>{' '}
                  để điều chỉnh sau?
                </Text>
              )}
              {!!data?.errors?.details?.length ? (
                <div className="content-error">
                  {(data?.errors?.details?.map((item, index) => {
                    if (item?.str_replace?.product_model)
                      item.message = item.message.replace(
                        '{product_model}',
                        item?.str_replace?.product_model,
                      )
                    return (
                      <Text
                        as="p"
                        style={{display: 'flex', alignItems: 'center'}}
                        key={index}
                      >
                        {ORDER_SINGLE_ICONS.errorCircle} {item?.message}
                      </Text>
                    )
                  }))}
                </div>
              ) : (
                <div className="content-error">
                  <Text
                    as="p"
                    style={{display: 'flex', alignItems: 'center'}}
                  >
                    {ORDER_SINGLE_ICONS.errorCircle} {data?.errors?.details?.message}
                  </Text>
                </div>
              )}
            </div>
          ) : (
            <div style={{textAlign: 'center'}}>
              <Text
                className="success-banner"
                as="p"
                style={{marginBottom: '24px', width: 'auto'}}
              >
                {ORDER_SINGLE_ICONS.success}
              </Text>
              <div className="content-success ">
                <Text
                  as="p"
                  fontSize={'20px'}
                  lineHeight={'140%'}
                  fontWeight={600}
                  style={{marginBottom: '16px', width: 'auto'}}
                >
                  {state.form.shippingInfo.isStorePickUp
                    ? 'Tạo đơn nhận tại cửa hàng thành công'
                    : 'Gửi đơn giao hàng thành công'}
                </Text>
                <Button
                  appearance="secondary"
                  size="md"
                  style={{minWidth: 110, marginRight: '8px'}}
                  onClick={() => {
                    dispatch({type: 'RESET_FORM_CUSTOMER_INFO'})
                    methods.onFetchOrigin()
                    scrollToTop()
                    setModal(null)
                  }}
                >
                  Tạo đơn tương tự
                </Button>
                <Button
                  appearance="secondary"
                  size="md"
                  style={{minWidth: 110, marginRight: '8px'}}
                  onClick={() => {
                    methods.onResetFormData()
                    methods.onFetchOrigin()
                    scrollToTop()
                    setModal(null)
                  }}
                >
                  Tạo đơn mới
                </Button>
                <Popper
                  placement="bottom-start"
                  style={{
                    height: '36px',
                    marginBottom: '24px',
                    textAlign: 'left',
                  }}
                  renderPopper={({onClose}) => (
                    <ul
                      className="order-popover__selected-action-menu-item"
                      style={{width: '167px'}}
                    >
                      {ORDER_SINGLE_CONSTANTS.printModal.pageSize.list.map(
                        (item, index) => {
                          if (item.value !== 'others' || (item.value === 'others' && !!data?.meta?.print_partner))
                            return (
                              <li
                                className="order-popover__selected-action-menu-item"
                                onClick={() => {
                                  onClose()
                                  handlePrint(item)
                                }}
                                key={index}
                              >
                                {item.name}
                              </li>
                          )}
                      )}
                    </ul>
                  )}
                >
                  {!state.form.shippingInfo.isStorePickUp && (
                    <Button
                      size="md"
                      style={{minWidth: 110}}
                      icon={ORDER_SINGLE_ICONS.dropdown}
                      variant="contained"
                      iconPosition="back"
                    >
                      In đơn hàng
                    </Button>
                  )}
                </Popper>
              </div>
              <Text style={{marginLeft: 12}}>
                Bạn muốn điều chỉnh lại mẫu in evoshop?
                <Text as={'a'}
                      target={'_blank'}
                      color={'#1A94FF'}
                      href={'/print-template?search=shipment'}
                > Thiết lập mẫu in</Text>
              </Text>
              <Text
                as={'p'}
                color={'#1A94FF'}
                fontSize={'14px'}
                className={'back-to-orders'}
                style={{cursor: 'pointer', width: '100%!important'}}
                onClick={() => {
                  methods.onResetFormData()
                  nav('/orders')
                }}
              >
                Trở lại danh sách
              </Text>
            </div>
          )}
        </div>
        <div className="order-create-print-modal__footer">
          {isAllFailed && (
            <>
              {' '}
              <Button
                appearance="ghost"
                size="sm"
                style={{minWidth: 110, marginRight: '8px'}}
                onClick={() => setModal(null)}
              >
                Đóng
              </Button>
              {!state.form.shippingInfo.isStorePickUp && (
                <Button
                  size="sm"
                  style={{minWidth: 110}}
                  onClick={() => createDraftOrder({is_draft: 1})}
                >
                  Lưu đơn nháp
                </Button>
              )}
            </>
          )}
        </div>
      </div>
      {dataOrder && <SuccessfulOrder data={dataOrder} />}
    </StyledOrderCreatePrintModal>
  )
}
