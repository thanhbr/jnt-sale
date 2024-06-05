import {sendRequestAuth} from 'api/api'
import {Button} from 'common/button'
import config from 'config'
import {transformOriginData} from 'Pages/Report/Warehouse/Pages/Import/utils/transform'
import {memo, useContext, useEffect, useReducer, useState} from 'react'
import {ImportTags} from '../importTags'
import {ImportDateTime} from './_importDateTime'
import {ImportSearch} from './_importSearch'
import {ImportWarehouse} from './_importWarehouse'
import {StyledImportFilterForm} from './_styled'
import useImportFilterForm from "../../hooks/useImportFilterForm";
import {ImportExportContext} from "../../provider/_context";
import {importExportActions} from "../../provider/_reducer";
import {ORDER_ICONS} from "../../interfaces/_icons"
import FilterGroupProduct from "./~filterGroupProduct";
import { useTranslation } from 'react-i18next'
export const ImportFilterForm = memo(({...props}) => {
  const {badge, canSubmitOtherFilter, functions} = useImportFilterForm()
  const {t} = useTranslation()
  const {pageDispatch} = useContext(ImportExportContext)

  const [shouldCollapse, setShouldCollapse] = useState(false)

  const collectOriginData = data => {
    const fields = [
      'warehouseListData',
      'supplierData'
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
      name: t('no-source-order'),
    })

    pageDispatch({
      type: importExportActions.FILTER_ORIGIN_DATA_UPDATE,
      payload: originData,
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await Promise.all([
        sendRequestAuth('get', `${config.API}/warehouse/warehouses?per_page=9999999&start=0`),
      ])

      collectOriginData(response)
    }

    fetchData()
  }, [])

  return (
    <StyledImportFilterForm {...props}>
      <div className="import-filter-form__group">
        <ImportSearch />
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
              canSubmitOtherFilter && functions.applyImportOtherFilter()
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
        <ImportDateTime />
        <ImportWarehouse />
        <FilterGroupProduct />
      </div>
      <div className="import-filter-form__group" style={{marginBottom: 4}}>
        <ImportTags />
      </div>
    </StyledImportFilterForm>
  )
})
