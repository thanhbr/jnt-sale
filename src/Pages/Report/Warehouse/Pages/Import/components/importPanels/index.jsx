import {ImportContext} from 'Pages/Report/Warehouse/Pages/Import/provider/_context'
import {useContext} from 'react'
import {ImportPanel} from './_importPanel'
import {StyledImportPanels} from './_styled'
import { useTranslation } from 'react-i18next'

export const ImportPanels = ({...props}) => {
  const {pageState, pageDispatch} = useContext(ImportContext)
  const {panels} = pageState
  const {t} = useTranslation()

  return (
    <StyledImportPanels {...props}>
      <ImportPanel
        className="import-panels__item"
        title={t('quantity_received')}
        value={panels.importTotal}
      />
      <ImportPanel
        className="import-panels__item"
        currency="₫"
        title={t('value_received')}
        value={panels.importValueTotal}
      />
      <ImportPanel
        className="import-panels__item"
        currency="₫"
        title={t('value_paid')}
        titleTooltip={t('value_paid_tooltip')}
        value={panels.paymentTotal}
      />
      <ImportPanel
        className="import-panels__item"
        currency="₫"
        title={t('debt')}
        titleTooltip={t('report_debt_tooltip')}
        value={panels.debtsTotal}
      />
    </StyledImportPanels>
  )
}
