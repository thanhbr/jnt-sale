import {Skeleton} from '@mui/material'
import {sendRequestAuth} from 'api/api'
import {Button} from 'common/button'
import {Input} from 'common/form/input'
import {Textarea} from 'common/form/textarea'
import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {Tooltip} from 'common/tooltip'
import config from 'config'
import useGlobalContext from 'containerContext/storeContext'
import useAlert from 'hook/useAlert'
// import useOrderFilterForm from 'Pages/refactorOrder/hooks/useOrderFilterForm'
import {useEffect, useState} from 'react'
import styled from 'styled-components'
import useForControlCODFilterForm from '../../hooks/useForControlCODFilterForm'
import {useTranslation} from "react-i18next";

export const ReportCustomerModal = ({data, ...props}) => {
  const [state] = useGlobalContext()
  const { t } = useTranslation()

  const {showAlert} = useAlert()
  const {functions} = useForControlCODFilterForm()

  const [reportContent, setReportContent] = useState('')
  const [reportList, setReportList] = useState([])
  const [tab, setTab] = useState(data?.mode === 'view' ? 'list' : 'form')

  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const canSubmit = !!reportContent.trim()

  const handleSubmit = async () => {
    setIsSubmitting(true)

    const response = await sendRequestAuth(
      'post',
      `${config.API}/order/customer/report/add`,
      JSON.stringify({
        content: reportContent,
        customer_name: data.customer.name,
        customer_phone: data.customer.phone,
      }),
    )

    if (!!response?.data?.success) {
      functions.fetchUpdateData()

      showAlert({content: t("send_report_order_success"), type: 'success'})

      const date = new Date()
      const d = date.getDate()
      const m = date.getMonth()
      const y = date.getFullYear()

      const fakeData = {
        content: reportContent,
        dt_created: `${d > 9 ? d : `0${d}`}/${
          m + 1 > 9 ? m + 1 : `0${m + 1}/${y}`
        }`,
        name: state?.user?.fullname,
        phone: state?.shopInfo?.store_phone,
        shop: state?.shopInfo?.store_name,
        shop_id: state?.shopInfo?.shop_id,
      }

      setReportContent('')
      setReportList([
        fakeData,
        ...reportList.filter(item => item.shop_id !== state?.shopInfo?.shop_id),
      ])

      setIsSubmitting(false)

      if (data?.onClose) data.onClose()
    } else showAlert({content: t("send_report_order_fail"), type: 'danger'})
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const response = await sendRequestAuth(
        'get',
        `${config.API}/order/customer/report/detail?phone=${data.customer.phone}`,
      )

      if (!!response?.data?.success) {
        setReportList(
          Array.isArray(response?.data?.data) ? response.data.data : [],
        )
      }
      setIsLoading(false)
    }

    if (data?.customer?.phone) fetchData()
  }, [data?.customer?.phone])

  return (
    <StyledReportCustomerModal {...props} onClick={data?.onClose}>
      <div
        className="order-table__report-customer-modal__container"
        onClick={e => e.stopPropagation()}
      >
        <div className="order-table__report-customer-modal__header">
          <Text as="h2" fontSize={20} lineHeight={28}>
            {data?.mode !== 'view'
              ? t("report_customer")
              : t("history_report_customer")}
          </Text>
        </div>
        <div className="order-table__report-customer-modal__body">
          {data?.mode !== 'view' && (
            <div className="order-table__report-customer-modal__tabs">
              <div
                className="order-table__report-customer-modal__tab-item"
                data-active={tab === 'form'}
                onClick={() => tab !== 'form' && setTab('form')}
              >
                {t("report_customer")}
              </div>
              {reportList.length > 0 ? (
                <div
                  className="order-table__report-customer-modal__tab-item"
                  data-active={tab === 'list'}
                  onClick={() => tab !== 'list' && setTab('list')}
                >
                  {t("infor_report_customer")}
                </div>
              ) : (
                <div className="order-table__report-customer-modal__tab-item">
                  <Tooltip placement="bottom" title={t("no_find_report_customer")}>
                    <span>{t("infor_report_customer")}</span>
                  </Tooltip>
                </div>
              )}
            </div>
          )}
          {tab === 'form' && (
            <TabForm
              data={data}
              content={reportContent}
              onContentChange={setReportContent}
            />
          )}
          {tab === 'list' && <TabList list={reportList} loading={isLoading} />}
        </div>
        <div className="order-table__report-customer-modal__footer">
          <Button
            size="sm"
            appearance="ghost"
            style={{minWidth: 110}}
            onClick={data?.onClose}
          >
            {t("general_close")}
          </Button>
          {data?.mode !== 'view' && (
            <Button
              disabled={!canSubmit || isSubmitting}
              size="sm"
              style={{minWidth: 110, marginLeft: 8}}
              onClick={() => canSubmit && handleSubmit()}
            >
              {t("send_report_customer")}
            </Button>
          )}
        </div>
      </div>
    </StyledReportCustomerModal>
  )
}

const TabForm = ({data, content, onContentChange}) => {
  const { t } = useTranslation()
  return (
    <div className="order-table__report-customer-moda__tab-form">
      <div className="order-table__report-customer-modal__input-group">
        <Input
          className="order-table__report-customer-modal__input-item"
          label={t("customer_name_n")}
          disabled={true}
          value={data?.customer?.name}
        />
        <Input
          className="order-table__report-customer-modal__input-item"
          label={t("phone")}
          disabled={true}
          value={data?.customer?.phone}
        />
        <Textarea
          className="order-table__report-customer-modal__textarea-item"
          label={
            <>
              {t("content")} <span style={{color: THEME_SEMANTICS.failed}}>*</span>
            </>
          }
          placeholder={t("enter_content_report_customer")}
          value={content}
          onChange={e => onContentChange(e.target.value)}
        />
      </div>
    </div>
  )
}

const TabList = ({list, loading}) => {
  const { t } = useTranslation()
  return (
    <div className="order-table__report-customer-modal__tab-list">
      <div className="order-table__report-customer-modal__table">
        <div className="order-table__report-customer-modal__thead">
          <div className="order-table__report-customer-modal__tr">
            <div className="order-table__report-customer-modal__th">
              {t("shop_warning")}
            </div>
            <div className="order-table__report-customer-modal__th">
              {t("date_report")}
            </div>
            <div className="order-table__report-customer-modal__th">
              {t("content_report")}
            </div>
          </div>
        </div>
        <div className="order-table__report-customer-modal__tbody">
          {loading
            ? Array.from(Array(2), (e, i) => <ReportListPlaceholder key={i} />)
            : list.map((item, i) => (
                <div key={i} className="order-table__report-customer-modal__tr">
                  <div className="order-table__report-customer-modal__td">
                    {item?.shop || '---'}
                  </div>
                  <div className="order-table__report-customer-modal__td">
                    {item?.dt_created
                      ? item.dt_created.split(' ')[0]
                        ? item.dt_created
                            .split(' ')[0]
                            .split('-')
                            .reverse()
                            .join('/')
                        : '---'
                      : '---'}
                  </div>
                  <div className="order-table__report-customer-modal__td">
                    <Tooltip placement="left" title={item?.content}>
                      <div className="--ellipsis" style={{textAlign: 'right'}}>
                        {item?.content}
                      </div>
                    </Tooltip>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  )
}

const ReportListPlaceholder = ({...props}) => {
  return (
    <div {...props} className="order-table__report-customer-modal__tr">
      {Array.from(Array(3), (e, i) => (
        <div key={i} className="order-table__report-customer-modal__td">
          <Skeleton
            sx={{
              width: '100%',
              height: 33,
              background:
                'linear-gradient(0deg, rgba(244, 247, 252, 0.98), rgba(244, 247, 252, 0.98)), #00081D;',
            }}
          />
        </div>
      ))}
    </div>
  )
}

const StyledReportCustomerModal = styled.div`
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

  .order-table__report-customer-modal {
    &__container {
      width: 600px;
      padding: 24px;

      background: #ffffff;
      border-radius: 8px;
      box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
    }

    &__header {
      margin-bottom: 16px;
    }

    &__tabs {
      margin-bottom: 24px;

      display: flex;
    }

    &__tab-item {
      height: 32px;
      margin-right: 24px;

      border-bottom: 1px solid transparent;

      transition: border 0.25s;

      color: ${THEME_COLORS.secondary_100};
      font-size: 14px;
      line-height: 32px;

      cursor: pointer;

      &[data-active='true'] {
        border-color: ${THEME_COLORS.primary_300};

        cursor: default;
      }
    }

    &__input-group {
      width: calc(100% + 24px);
      margin: 0 -12px;

      display: flex;
      flex-wrap: wrap;
    }

    &__input-item {
      width: calc(50% - 24px);
      margin: 0 12px 24px 12px;
    }

    &__textarea-item {
      width: calc(100% - 24px);
      margin: 0 12px 24px 12px;
    }

    &__footer {
      display: flex;
      justify-content: flex-end;
    }

    &__tab-list {
      margin-bottom: 32px;
    }

    &__table {
      position: relative;
      max-height: 200px;

      overflow: auto;

      border: 1px solid #e2eaf8;
      border-radius: 8px;
    }

    &__thead {
      position: sticky;
      top: 0;

      background: #f7f9fd;
    }

    &__tr {
      display: flex;
    }

    &__th {
      min-height: 44px;
      padding: 12px;

      color: ${THEME_COLORS.secondary_100};
      font-size: 14px;
      font-weight: 600;
      line-height: 20px;

      &:nth-child(1) {
        padding-left: 24px;

        flex: 1;
      }

      &:nth-child(2) {
        width: 125px;
      }

      &:nth-child(3) {
        padding-right: 24px;

        flex: 1;

        text-align: right;
      }
    }

    &__td {
      min-height: 56px;
      padding: 18px 12px;

      display: flex;
      align-items: center;

      border-top: 1px solid #e2eaf8;

      color: ${THEME_COLORS.secondary_100};
      font-size: 14px;
      line-height: 20px;

      &:nth-child(1) {
        padding-left: 24px;

        flex: 1;
      }

      &:nth-child(2) {
        width: 125px;
      }

      &:nth-child(3) {
        padding-right: 24px;

        flex: 1;

        justify-content: flex-end;
      }

      .--ellipsis {
        max-width: 100%;
        max-height: 40px;

        display: -webkit-box;
        overflow: hidden;

        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
    }
  }
`
