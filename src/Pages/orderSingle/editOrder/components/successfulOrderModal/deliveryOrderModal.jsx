import {useContext, useState} from "react";
import {OrderSingleContext} from "../../../provider/_context";
import useEditOrderSingle from "../../../hooks/useEditOrderSingle";
import {sendRequestAuth} from "../../../../../api/api";
import config from "../../../../../config";
import {StyledOrderCreatePrintModal} from "./_styled";
import {Text} from "../../../../../common/text";
import {ORDER_SINGLE_ICONS} from "../../../interface/_icons";
import {Button} from "../../../../../common/button";
import {Popper} from "../../../../../common/popper";
import {ORDER_SINGLE_CONSTANTS} from "../../../interface/_constants";
import * as React from "react";

export const DeliveryEditOrderModal = ({data, setModal, ...props}) => {
  const {state, dispatch} = useContext(OrderSingleContext)
  const {methods} = useEditOrderSingle()
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
                ? 'Tạo đơn nhận tại cửa hàng thất bại!'
                : 'Gửi đơn giao hàng thất bại!'
              : ''}
          </Text>
        </div>
        <div className="order-create-print-modal__body">
          {isAllFailed ? (
            <>
              <div>
              {state?.form?.shippingInfo?.isStorePickUp ? (
                <Text as="p" style={{marginBottom: '24px'}}>
                  Đơn hàng của bạn đang gặp các vấn đề dưới đây, bạn cần kiểm
                  tra và điều chỉnh để có thể tạo đơn hàng?
                </Text>
              ) : (
                <></>
                // <Text as="p" style={{marginBottom: '24px'}}>
                //   Đơn hàng của bạn đang gặp các vấn đề dưới đây, bạn có muốn{' '}
                //   <Text as="span" fontWeight={600}>
                //     Lưu đơn hàng nháp{' '}
                //   </Text>{' '}
                //   để điều chỉnh sau?
                // </Text>
              )}
                {!!!data?.errors ? (
                    <div className="content-error">
                      <Text
                        as="p"
                        style={{display: 'flex', alignItems: 'center'}}
                      >
                        {ORDER_SINGLE_ICONS.errorCircle} {!!data?.error_message ? data?.error_message : 'Vui lòng kiểm tra đầy đủ thông tin!'}
                      </Text>
                    </div>
                  ) : !!data?.errors?.details?.length ? (
                      <div className="content-error">
                        {data?.errors?.details?.map((item, index) => {
                          return (
                            <div style={{display: 'flex'}}>
                              <span style={{marginRight: '11px'}}>{ORDER_SINGLE_ICONS.errorCircle}</span>
                              <Text
                                as="p"
                                style={{display: 'flex', alignItems: 'center'}}
                                key={index}
                              >{item?.message}</Text>
                            </div>
                          )
                        })}
                      </div>
                  ) : !!!data?.errors?.details ? (
                      <div className="content-error">
                        <Text
                          as="p"
                          style={{display: 'flex', alignItems: 'center'}}
                        >
                          {ORDER_SINGLE_ICONS.errorCircle} {data?.errors?.message}
                        </Text>
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
            </>
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
                  style={{marginBottom: '24px', width: 'auto'}}
                >
                  {state.form.shippingInfo.isStorePickUp
                    ? 'Tạo đơn nhận tại cửa hàng thành công'
                    : 'Gửi đơn giao hàng thành công'}
                </Text>
                <Button
                  appearance="secondary"
                  size="md"
                  style={{marginRight: '8px', width: '8.9375rem'}}
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
                  style={{marginRight: '8px', width: '7rem'}}
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
                      style={{width: '7.75rem'}}
                      icon={ORDER_SINGLE_ICONS.dropdown}
                      variant="contained"
                      iconPosition="back"
                    >
                      In đơn hàng
                    </Button>
                  )}
                </Popper>
              </div>
              <Text
                as={'a'}
                href={'/orders'}
                color={'#1A94FF'}
                fontSize={'14px'}
                className={'back-to-orders'}
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
                style={{width: 110, marginRight: '8px', padding: 0}}
                onClick={() => setModal(null)}
              >
                Hủy
              </Button>
              {/*{!state.form.shippingInfo.isStorePickUp && (*/}
              {/*  <Button*/}
              {/*    size="sm"*/}
              {/*    style={{width: 110, padding: 0}}*/}
              {/*    onClick={() => createDraftOrder({is_draft: 1})}*/}
              {/*  >*/}
              {/*    Lưu đơn nháp*/}
              {/*  </Button>*/}
              {/*)}*/}
            </>
          )}
        </div>
      </div>
    </StyledOrderCreatePrintModal>
  )
}