import React, {useContext, useEffect, useRef, useState} from 'react';
import {PageHeader} from "../../../layouts/pageHeader";
import {GIVEBACK_PRODUCT_HEADER_ACTIONS, GIVEBACK_PRODUCT_HEADER_BREADCRUMB} from "../interfaces/contants";
import {GiveBackProductContext} from "../provider/context";
import styled from "styled-components";
import useHeaderGivebackProduct from "../hooks/useHeaderGivebackProduct";
import ModalSelectedOrder from "./modal/modalSelectedOrder";
import {GivebackProductExport} from "./export/givebackProductExport";
import toast from "../../../Component/Toast";
import ModalConfirmRefundProduct from "./modal/modalConfirmRefundProduct";
import ModalConfirmPayment from "./modal/modalConfirmPayment";
import {convertDateTimeToApiFormat} from "../../../common/form/datePicker/_functions";
import {Modal} from "../../../common/modal";
import {Text} from "../../../common/text";
import {Button} from "../../../common/button";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../const/display_name_menu";

const HeaderInventoryInfo = () => {
  const {t} = useTranslation()
  const {pageState, pageDispatch} = useContext(GiveBackProductContext)
  const { functions } = useHeaderGivebackProduct()
  const [exportUrl, setExportUrl] = useState('#')
  const [exportModalData, setExportModalData] = useState(null)
  const [debounceExportClick, setDebounceExportClick] = useState(true)
  const [confirmClose, setConfirmClose] = useState(false)
  const exportLink = useRef()
  const exporting = pageState?.exports?.exporting

  const handleExportClick = () => {
    if(debounceExportClick) {
      setDebounceExportClick(false)
      setTimeout(() => setDebounceExportClick(true), 1000)

      const selectedList = pageState?.table?.pagination?.totalItems
      if(!!!selectedList || +selectedList === 0) {
        toast.info(t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.EXPORT_ERROR_NOTIFY))
        return
      }

      let queryString = '?'
      let i = 0
      for (const [key, value] of Object.entries({
        // ...queries,
        keyword: pageState?.filter?.search?.value || '',
        per_page: '',
        start: '',
      })) {
        queryString += `${i > 0 ? '&' : ''}${key}=${value}`
        i++
      }

      handleLargeExport(
        {
          // ...queries,
          keyword: pageState?.filter?.search?.value || '',
          start_date: !!pageState?.filter?.dateTime?.start ? convertDateTimeToApiFormat(pageState?.filter?.dateTime?.start) : '',
          end_date: !!pageState?.filter?.dateTime?.end ? convertDateTimeToApiFormat(pageState?.filter?.dateTime?.end) : '',
          status: pageState?.filter?.receivingState ?.value?.id || '',
          payment_status: pageState?.filter ?.payment?.value?.join(',') || '',
          warehouse_id: pageState?.filter?.warehouse?.value?.id || '',
          per_page: 5000,
          start: 0,
        },
        {total: selectedList},
      )
    }
  }

  const handleLargeExport = (q, opt) => {
    setExportModalData({
      data: {
        query: q,
        total: opt?.total || pageState.panels.orderTotal,
      },
      onClose: () => {
        exporting && setConfirmClose(true)
        setExportModalData(null)
      },
    })
  }

  const actions = [
    () => functions.refresh(),
    handleExportClick,
    () => functions.handleToggleModalOrder()
  ]

  useEffect(() => {
    if (exportUrl && exportUrl !== '#') {
      if (exportLink?.current) exportLink.current.click()
    }
  }, [exportUrl])

  const handleCloseConfirm = _ => {
    // pageDispatch({type: giveBackProductActions.SET_EXPORTING_HEADER, payload: true})
    toast.info(t(DISPLAY_NAME_MENU.GENERAL.EXCEL_EXPORT_STOP))
    setConfirmClose(false)
  }

  const handleAcceptConfirm = _ => {
    setConfirmClose(false)
    handleExportClick()
  }

  return (
    <StyledHeaderGivebackProduct>
      <div className={'header-giveback-product'}>
        <PageHeader
          actions={GIVEBACK_PRODUCT_HEADER_ACTIONS.map((item, i) => ({
            ...item,
            onClick: actions[i],
            // props: {
            //   disabled: i === 1 && !canExport,
            // },
          }))}
          breadcrumbLinks={GIVEBACK_PRODUCT_HEADER_BREADCRUMB}
          breadcrumbTitle={t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.MANAGEMENT)}
        />
        <a ref={exportLink} href={exportUrl} style={{display: 'none'}}> </a>

        {!!exportModalData && <GivebackProductExport data={exportModalData}/>}
        {confirmClose && <ModalClose onClose={handleCloseConfirm} onAccept={handleAcceptConfirm}/>}
      </div>
      {pageState?.modal?.order?.open && <ModalSelectedOrder />}
      {pageState?.modal?.refundPayment?.open &&
        <ModalConfirmPayment data={pageState?.modal?.refundPayment?.data}
                             payment={pageState?.modal?.refundPayment?.payment}
                             onClose={_ => functions?.onCloseConfirmPayment()}
                             handleSubmit={_ => functions?.onSubmitConfirmPayment()}
                             handleChangeAmount={amount => functions?.onChangeAmount(amount)}
                             handleChangePayment={payment => functions?.onChangePayment(payment)}
        />}
      {pageState?.modal?.confirmRefund?.open && <ModalConfirmRefundProduct /> }
    </StyledHeaderGivebackProduct>
  )
}

export const ModalClose = ({onClose, onAccept, ...props}) => {
  const {t} = useTranslation()
  return (
    <Modal width={480}>
      <Text fontSize={20} fontWeight={600}>{t(DISPLAY_NAME_MENU.GENERAL.STOP_EXPORTING_EXCEL)}</Text>
      <div style={{marginTop: 31}}>
        <Text>{t(DISPLAY_NAME_MENU.GENERAL.SYSTEM_EXPORTING_EXCEL_YOU_WANT_STOP)}</Text>
      </div>
      <div style={{marginTop: 32, textAlign: 'end'}}>
        <Button appearance={'ghost'}
                style={{marginRight: 8, minWidth: 101, padding: 0}}
                size={'sm'}
                onClick={onClose}
        >
          {t(DISPLAY_NAME_MENU.GENERAL.STOP_EXPORTING_EXCEL)}</Button>
        <Button size={'sm'}
                style={{minWidth: 112}}
                onClick={onAccept}
        >{t(DISPLAY_NAME_MENU.GENERAL.CONTINUE_EXPORT)}</Button>
      </div>
    </Modal>
  )
}

export default HeaderInventoryInfo


const StyledHeaderGivebackProduct = styled.div`
  .header-giveback-product {
    .page-header__action-item button[data-appearance="primary"] {
      padding: 0 13px;
    }
  }
`
