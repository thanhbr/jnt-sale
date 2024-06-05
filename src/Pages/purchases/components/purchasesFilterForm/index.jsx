import { sendRequestAuth } from 'api/api'
import { Button } from 'common/button'
import config from 'config'
import purchasesFilterForm from 'Pages/purchases/hooks/useFilter'
import { PURCHASES_ICONS } from 'Pages/purchases/interfaces/_icons'
import { PurchasesContext } from 'Pages/purchases/provider/_context'
import { actionTypes } from 'Pages/purchases/provider/_reducer'
import {transformOriginData, transformPaymentMethodData, transformWarehouseData} from 'Pages/purchases/utils/transform'
import { memo, useContext, useEffect, useState } from 'react'
import { PurchasesTags } from '../purchasesTags'
import { FilterDateTime } from './_filterDateTime'
import { FilterSupplier } from './_filterSupplier'
import { FilterWarehouse } from './_filterWarehouse'
import { Search } from './_search'
import { StyledOrderFilterForm } from './_styled'
import ArrayUtils from "../../utils/array";
import { useTranslation } from 'react-i18next'

export const PurchasesFilterForm = memo(({...props}) => {
  const {badge, canSubmitOtherFilter, functions} = purchasesFilterForm()
  const {t} = useTranslation()
  const {pageState, pageDispatch} = useContext(PurchasesContext)
  const {loading} = pageState.table
  const [shouldCollapse, setShouldCollapse] = useState(false)

  const collectOriginData = data => {
    const fields = ['supplierData', 'warehouseData']
    let collections = {}

    fields.forEach((item, i) => {
      const obj = {}
      obj[item] = data[i]?.status === 200 ? data[i]?.data?.data : []

      collections = {...collections, ...obj}
    })
    pageDispatch({
      type: actionTypes.FILTER_ORIGIN_DATA_UPDATE,
      payload: transformOriginData(collections),
    })

    const vendorListData = ArrayUtils.getQualifiedArray(
      data[0]?.data?.data,
    ).map(transformPaymentMethodData)
    const warehouseListData = ArrayUtils.getQualifiedArray(
      data[1]?.data?.data,
    ).map(transformWarehouseData)
    pageDispatch({
      type: 'FORM_GENERAL_INFO_VENDOR_UPDATE',
      payload: {
        list: vendorListData || [],
        page: 1,
        total: data[0]?.data?.meta?.total || 0,
      },
    })
    pageDispatch({
      type: 'FORM_GENERAL_INFO_WAREHOUSE_UPDATE',
      payload: {
        list: warehouseListData || [],
        page: 1,
        total: data[1]?.data?.meta?.total || 0,
        value: warehouseListData.find(item => item?.data?.is_main == 1)
      },
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await Promise.all([
        sendRequestAuth('get', `${config.API}/supplier/suppliers?status=1`),
        sendRequestAuth(
          'get',
          `${config.API}/warehouse/warehouses?status=1&is_purchase=1&per_page=5000&start=0`,
        ),
      ])

      collectOriginData(response)
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (pageState.filter.isApplyFilter) {
      pageDispatch({type: 'TOGGLE_APPLY_FILTER', payload: false})
      functions.applyPurchasesOtherFilter()
    }
  }, [pageState.filter.isApplyFilter])

  return (
    <StyledOrderFilterForm {...props}>
      <div className="order-filter-form__group">
        <Search />
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
          icon={PURCHASES_ICONS.filterFunnel02}
          size="md-"
          onClick={() => setShouldCollapse(!shouldCollapse)}
        >
          {t('general_other_filters')}
        </Button>
        {shouldCollapse && (
          <Button
            appearance="secondary"
            size="md-"
            disabled={!canSubmitOtherFilter || !loading}
            onClick={() =>
              canSubmitOtherFilter && functions.applyPurchasesOtherFilter()
            }
          >
            {t('general_apply')}
          </Button>
        )}
      </div>
      <div
        className="order-filter-form__group order-filter-form__collapse"
        data-collapse={shouldCollapse}
      >
        <FilterDateTime />
        <FilterSupplier />
        <FilterWarehouse />
      </div>
      <div className="order-filter-form__group" style={{marginBottom: 4}}>
        <PurchasesTags />
      </div>
    </StyledOrderFilterForm>
  )
})
