import {sendRequestAuth} from 'api/api'
import {convertDateTimeToApiFormat} from 'common/form/datePicker/_functions'
import {Text} from 'common/text'
import config from 'config'
import {CashBooksContext} from 'Pages/CashBooks/provider/_context'
import {OrderContext} from 'Pages/refactorOrder/provider/_context'
import {orderActions} from 'Pages/refactorOrder/provider/_reducer'
import {useContext, useEffect, useState} from 'react'
import {useSearchParams} from 'react-router-dom'
import {CashBooksPanel} from './CashBooksPanel'
import {StyledCashBooksPanels} from './_styled'
import { useTranslation } from 'react-i18next'

export const CashBooksPanels = ({...props}) => {
  const { t } = useTranslation()
  const {pageState, pageDispatch} = useContext(CashBooksContext)
  const {filter, panels, table} = pageState
  const [canFetch, setCanFetch] = useState(true)
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const dateTimeValue = filter?.dateTime?.activeValue?.value
    if (dateTimeValue && canFetch) {
      const splitDate = dateTimeValue.split(' - ')
      const querySearch = searchParams.get('search') || ''
      const startDate = querySearch
        ? ''
        : convertDateTimeToApiFormat(splitDate[0])
      const endDate = querySearch
        ? ''
        : convertDateTimeToApiFormat(splitDate[1])
      const fetchData = async () => {
        const response = await sendRequestAuth(
          'get',
          `${config.API}/cashbook/total-list?keyword=${querySearch}&date_type=sended&start_date=${startDate}&end_date=${endDate}&payment_method_id=&receipt_type=&receipt_type_id&per_page=${table.pagination.amount}&start=${table.pagination.active}`,
        )

        if (!!response?.data?.success) {
          setCanFetch(false)
          pageDispatch({
            type: orderActions.PANELS_UPDATE,
            payload: {
              pagination: {
                totalItems: response?.data?.data?.total || 0,
              },
              panels: {
                total_beginning: response?.data?.data?.total_beginning || 0,
                total_payment: response?.data?.data?.total_payment || 0,
                total_receipt: response?.data?.data?.total_receipt || 0,
              },
            },
          })
        }
      }

      fetchData()
    }
  }, [filter?.dateTime?.activeValue?.value])

  return (
    <StyledCashBooksPanels {...props}>
      <CashBooksPanel
        className="order-panels__item"
        currency="₫"
        title={t('cashbook_starting_balance')}
        value={panels.total_beginning}
        titleTooltip={
          <Text color={'#ffffff'} fontSize={13}>
            <Text
              as={'p'}
              fontSize={13}
              color={'#ffffff'}
              style={{marginBottom: '8px'}}
            >
              {t('cashbook_date_balance')}{' '}
              <b>{t('cashbook_before')} {t('cashbook_filter_time')}</b>
            </Text>
            <Text as={'p'} color={'#ffffff'} fontSize={13}>
              <b>{t('example')}:</b>:{t('cashbook_date_filtered')} -&gt; {t('cashbook_starting_balance_date')}
            </Text>
          </Text>
        }
      />
      +
      <CashBooksPanel
        className="order-panels__item"
        currency="₫"
        title={t('cashbook_total_revenue_period')}
        value={panels.total_receipt}
        titleTooltip={
          <Text color={'#ffffff'} fontSize={13}>
            <Text
              as={'p'}
              fontSize={13}
              color={'#ffffff'}
              style={{marginBottom: '8px'}}
            >
              {t('cashbook_revenue_filtered_period')} <b>{t('cashbook_filter_time')}</b>
            </Text>
            <Text as={'p'} color={'#ffffff'} fontSize={13}>
              <b>{t('example')}:</b> T{t('cashbook_date_filtered')}  -&gt; {t('cashbook_total_revenue')}
            </Text>
          </Text>
        }
      />
      -
      <CashBooksPanel
        className="order-panels__item"
        currency="₫"
        title={t('cashbook_total_expenses_period')}
        value={panels.total_payment}
        titleTooltip={
          <Text color={'#ffffff'} fontSize={13}>
            <Text
              as={'p'}
              fontSize={13}
              color={'#ffffff'}
              style={{marginBottom: '8px'}}
            >
              {t('cashbook_expenses_filtered_period')}{' '}
              <b>{t('cashbook_filter_time')}</b>
            </Text>
            <Text as={'p'} color={'#ffffff'} fontSize={13}>
              <b>{t('example')}:</b>{t('cashbook_filtered_period')} -&gt; {t('cashbook_total_expenses')}
            </Text>
          </Text>
        }
      />
      =
      <CashBooksPanel
        className="order-panels__item"
        currency="₫"
        title={t('cashbook_ending_balance')}
        value={
          panels.total_beginning + panels.total_receipt - panels.total_payment
        }
        titleTooltip={
          <Text color={'#ffffff'} fontSize={13}>
            <Text
              as={'p'}
              fontSize={13}
              color={'#ffffff'}
              style={{marginBottom: '8px'}}
            >
              {t('cashbook_ending_balance_date')} {t('cashbook_filter_time')}
              <br></br>
              {t('cashbook_ending_balance_calculation')}
            </Text>
            <Text as={'p'} color={'#ffffff'} fontSize={13}>
              <b>{t('example')}:</b> {t('cashbook_filtered_period')} -&gt; {t('cashbook_end_balance_text')}
            </Text>
          </Text>
        }
      />
    </StyledCashBooksPanels>
  )
}
