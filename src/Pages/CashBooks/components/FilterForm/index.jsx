import { sendRequestAuth } from 'api/api'
import { Button } from 'common/button'
import config from 'config'
import cashBooksFilterForm from 'Pages/CashBooks/hooks/useCashBooksFilterForm'
import { CASHBOOKS_ICONS } from 'Pages/CashBooks/interfaces/_icons'
import { CashBooksContext } from 'Pages/CashBooks/provider/_context'
import { actions } from 'Pages/CashBooks/provider/_reducer'
import { transformOriginData } from 'Pages/CashBooks/utils/transform'
import { memo, useContext, useEffect, useState } from 'react'
import { CashBooksTags } from '../Tags'
import { CashBooksDateTime } from './_cashBooksDateTime'
import { CashBooksSearch } from './_cashBooksSearch'
import PaymentMethodFilter from './_paymentMethod'
import PaymentTypeFilter from './_receiptType'
import { StyledCashBooksFilterForm } from './_styled'
import { useTranslation } from 'react-i18next'

export const CashBooksFilterForm = memo(({ ...props }) => {
  const { t } = useTranslation()
  const { badge, canSubmitOtherFilter, functions } = cashBooksFilterForm()

  const { pageState, pageDispatch } = useContext(CashBooksContext)
  const { loading } = pageState.table
  const [shouldCollapse, setShouldCollapse] = useState(false)

  const collectOriginData = data => {
    const fields = [
      'paymentMethod',
      'receiptType',
    ]
    let collections = {}

    fields.forEach((item, i) => {
      const obj = {}
      obj[item] = data[i]?.status === 200 ? data[i]?.data?.data : []

      collections = { ...collections, ...obj }
    })

    pageDispatch({
      type: actions.FILTER_ORIGIN_DATA_UPDATE,
      payload: transformOriginData(collections),
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await Promise.all([
        sendRequestAuth('get', `${config.API}/payment/payment-method?keyword&status&per_page=5000&start=0`),
        sendRequestAuth('get', `${config.API}/cashbook/list-type?type=&keyword=&status=&per_page=5000&start=0`),
      ])
      
      collectOriginData(response)
    }

    fetchData()
  }, [])

  return (
    <StyledCashBooksFilterForm {...props}>
      <div className="order-filter-form__group">
        <CashBooksSearch/>
        <Button
          disabled={!loading}
          appearance="secondary"
          badge={
            badge.others > 0
              ? badge.others > 9
              ? '9+'
              : badge.others
              : undefined
          }
          badgeType="danger"
          icon={CASHBOOKS_ICONS.filterFunnel02}
          size="md-"
          onClick={() => setShouldCollapse(!shouldCollapse)}
        >
          {t('other_filters')}
        </Button>
        {shouldCollapse && (
          <Button
            appearance="secondary"
            size="md-"
            disabled={!canSubmitOtherFilter || !loading}
            onClick={() =>
              canSubmitOtherFilter && functions.applyCashBooksOtherFilter()
            }
          >
            {t('apply')}
          </Button>
        )}
      </div>
      <div
        className="order-filter-form__group order-filter-form__collapse"
        data-collapse={shouldCollapse}
      >
        <CashBooksDateTime/>
        <PaymentTypeFilter />
        <PaymentMethodFilter />
      </div>
      <div className="order-filter-form__group" style={{ marginBottom: 4 }}>
        <CashBooksTags/>
      </div>
    </StyledCashBooksFilterForm>
  )
})
