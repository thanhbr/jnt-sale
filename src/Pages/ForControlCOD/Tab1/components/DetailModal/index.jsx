import {sendRequestAuth} from 'api/api'
import {Button} from 'common/button'
import {Text} from 'common/text'
import config from 'config'
import {useEffect, useState} from 'react'
import styled from 'styled-components'
import {DetailFilter} from './Filter'
import {DetailBody} from './Table/Body'
import {DetailHeader} from './Table/Header'
import {createContext} from 'react'
import {TableLayout} from './TableLayout'
import useAlert from 'hook/useAlert'
import {ForControlCODExport} from './Export'
import {DetailFooter} from './Table/Footer'
import { formatDatetime } from 'common/form/datePicker/_functions'
import {useTranslation} from "react-i18next";

export const DetailContext = createContext()
const DetailProvider = DetailContext.Provider

export const DetailModal = ({onClose, data}) => {
  const [detailList, setDetailList] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation()
  const [total, setTotal] = useState({
    totals: 0,
    total_cod: 0,
    total_codLimit: 0,
    total_discount: 0,
    total_freight: 0,
    total_moneyBack: 0,
    total_otherFees: 0,
    total_returnFee: 0,
    total_transferFees: 0,
  })
  const [focusInputOnSuccess, setFocusInputOnSuccess] = useState(false)
  const [exportModalData, setExportModalData] = useState(null)
  const {showAlert} = useAlert()

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true)
      const response = await sendRequestAuth(
        'get',
        `${config.API}/cod/cod-details?pay_number=${data.payNumber}&search=`,
      )
      if (!!response?.data?.success) {
        const displayListData = Array.isArray(response?.data?.data?.cod_details)
          ? response.data.data?.cod_details
          : []
        setDetailList(displayListData)

        setTotal(prev => ({
          ...prev,
          totals: response.data.data?.totals,
          ...response.data.meta,
        }))
        setLoading(false)
      }
    }

    fetchDetail()
  }, [])

  const value = {
    data,
    detailList,
    setDetailList,
    search,
    setSearch,
    loading,
    setLoading,
    focusInputOnSuccess,
    setFocusInputOnSuccess,
    total,
    setTotal
  }

  const handleExportClick = async () => {
    if (total.totals <= 0)
      return showAlert({
        content: t("warning_for_control_cod"),
        type: 'info',
      })

    handleLargeExport(
      {
        pay_number: data.payNumber,
        search,
      },
      {total: total.totals},
    )
  }

  const handleLargeExport = (q, opt) =>
    setExportModalData({
      data: {
        query: q,
        total: opt?.total,
      },
      onClose: () => setExportModalData(null),
    })

  return (
    <DetailProvider value={value}>
      <StyledDetailModal>
        <div
          className="order-table__confirm-delete-modal__container"
          onClick={e => e.stopPropagation()}
        >
          <div className="order-table__confirm-delete-modal__header">
            <Text as="h2" fontSize={20} lineHeight={28}>
              {t("infor_payment_cod")}
            </Text>
            <Text color="#7C88A6">
              {t("payment_period")}:
              <span style={{fontWeight: '600'}}>
                {''}
                {data.payNumber}
              </span>{' '}
              | {t("payment_date")}:{' '}
              <span style={{fontWeight: '600'}}>{formatDatetime(data.paymentDate)}</span>
            </Text>
          </div>
          <div className="order-table__confirm-delete-modal__body">
            <TableLayout
              className="detail-layout"
              disabled={!loading}
              header={<DetailFilter />}
              table={{
                tHead: <DetailHeader />,
                tBody: <DetailBody />,
                tFooter: <DetailFooter />,
                scrollable: true,
              }}
            />
          </div>
          <div className="order-table__confirm-delete-modal__footer">
            <Button
              size="sm"
              appearance="ghost"
              style={{minWidth: 110}}
              onClick={onClose}
            >
              {t("general_close")}
            </Button>
            <Button
              size="sm"
              style={{minWidth: 110, marginLeft: 8}}
              onClick={handleExportClick}
            >
              {t("export_excel")}
            </Button>
          </div>
          {!!exportModalData && <ForControlCODExport data={exportModalData} />}
        </div>
      </StyledDetailModal>
    </DetailProvider>
  )
}

const StyledDetailModal = styled.div`
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

  .order-table__confirm-delete-modal {
    &__container {
      width: calc(100vw * 0.8125);
      max-height: 723px;
      height: 80%;
      padding: 24px;

      background: #ffffff;
      border-radius: 8px;
      box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);

      display: flex;
      flex-direction: column;
    }

    &__header {
      margin-bottom: 28px;
    }

    &__body {
      margin-bottom: 32px;
      flex: 1;
      overflow: hidden;
    }

    &__footer {
      display: flex;
      justify-content: flex-end;
    }
  }

  .detail-layout {
    height: 100%;
  }
`
