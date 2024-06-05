import {TransferContext} from 'Pages/Report/Warehouse/Pages/Transfer/provider/_context'
import {useContext} from 'react'
import {TransferPanel} from './_transferPanel'
import {StyledTransferPanels} from './_styled'
import { useTranslation } from 'react-i18next'

export const TransferPanels = ({...props}) => {
  const {pageState, pageDispatch} = useContext(TransferContext)
  const {panels} = pageState
  const {t} = useTranslation()
  return (
    <StyledTransferPanels {...props} id={'panel-purchase'}>
      <TransferPanel
        className="import-panels__item"
        title={t('transfer_quantity')}
        value={panels.total_quantity}
      />
      <TransferPanel
        className="import-panels__item"
        currency="₫"
        title={t('transfer_value')}
        value={panels.total_amount}
      />
    </StyledTransferPanels>
  )
}
