import {sendRequestAuth} from 'api/api'
import {Button} from 'common/button'
import config from 'config'
import useTransferFilterForm from 'Pages/Report/Warehouse/Pages/Transfer/hooks/useTransferFilterForm'
import {ORDER_ICONS} from 'Pages/Report/Warehouse/Pages/Transfer/interfaces/_icons'
import {TransferContext} from 'Pages/Report/Warehouse/Pages/Transfer/provider/_context'
import {transferActions} from 'Pages/Report/Warehouse/Pages/Transfer/provider/_reducer'
import {transformOriginData} from 'Pages/Report/Warehouse/Pages/Transfer/utils/transform'
import {memo, useContext, useEffect, useReducer, useState} from 'react'
import {TransferTags} from '../transferTags'
import {TransferDateTime} from './_transferDateTime'
import {TransferSearch} from './_transferSearch'
import {TransferWarehouse} from './_transferWarehouse'
import {StyledTransferFilterForm} from './_styled'
import { ReceiveWarehouse } from './_receiveWarehouse'
import { useTranslation } from 'react-i18next'

export const TransferFilterForm = memo(({...props}) => {
  const {badge, canSubmitOtherFilter, functions} = useTransferFilterForm()
  const {t} = useTranslation()
  const {pageDispatch} = useContext(TransferContext)

  const [shouldCollapse, setShouldCollapse] = useState(false)

  const collectOriginData = data => {
    const fields = [
      'warehouseListData',
    ]
    let collections = {}

    fields.forEach((item, i) => {
      const obj = {}
      obj[item] = data[i]?.status === 200 ? data[i]?.data?.data : []

      collections = {...collections, ...obj}
    })

    const originData = transformOriginData(collections)

    originData?.source?.list?.unshift({
      value: 'unknown',
      name: t('report__unknown'),
    })

    pageDispatch({
      type: transferActions.FILTER_ORIGIN_DATA_UPDATE,
      payload: originData,
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await Promise.all([
        sendRequestAuth('get', `${config.API}/warehouse/warehouses?per_page=9999999&start=0`),
        sendRequestAuth('get', `${config.API}/supplier/suppliers?status=1`),
      ])

      collectOriginData(response)
    }

    fetchData()
  }, [])

  return (
    <StyledTransferFilterForm {...props}>
      <div className="import-filter-form__group">
        <TransferSearch />
        <Button
          appearance="secondary"
          badge={
            badge.others > 0
              ? badge.others > 9
                ? '9+'
                : badge.others
              : undefined
          }
          badgeType="danger"
          icon={ORDER_ICONS.filterFunnel02}
          size="md-"
          onClick={() => setShouldCollapse(!shouldCollapse)}
        >
          {t('general_other_filters')}
        </Button>
        {shouldCollapse && (
          <Button
            appearance="secondary"
            disabled={!canSubmitOtherFilter}
            size="md-"
            onClick={() =>
              canSubmitOtherFilter && functions.applyTransferOtherFilter()
            }
          >
            {t('general_apply')}
          </Button>
        )}
      </div>
      <div
        className="import-filter-form__group import-filter-form__collapse"
        data-collapse={shouldCollapse}
      >
        <TransferDateTime />
        <TransferWarehouse />
        <ReceiveWarehouse />
      </div>
      <div className="import-filter-form__group" style={{marginBottom: 4}}>
        <TransferTags />
      </div>
    </StyledTransferFilterForm>
  )
})
