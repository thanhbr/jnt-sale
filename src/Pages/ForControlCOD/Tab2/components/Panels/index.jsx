import forControlCODFilterForm from 'Pages/ForControlCOD/Tab2/hooks/useForControlCODFilterForm'
import { ForControlCODContext } from 'Pages/ForControlCOD/Tab2/provider/_context'
import { useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ForControlCODPanel } from './ForControlCODPanel'
import { StyledForControlCODPanels } from './_styled'
import { convertDateTimeToApiFormat } from 'common/form/datePicker/_functions'
import { sendRequestAuth } from 'api/api'
import config from 'config'
import { orderActions } from '../../provider/_reducer'
import {useTranslation} from "react-i18next";

export const ForControlCODPanels = ({...props}) => {
  const {pageState, pageDispatch} = useContext(ForControlCODContext)
  const {filter, panels, table} = pageState
  const { functions, queries } = forControlCODFilterForm()
  const [active, setActive] = useState('3')
  const [canFetch, setCanFetch] = useState(true)
  const [searchParams] = useSearchParams()
  const { t } = useTranslation()

  const handleChangeType = (codeType) => {
    pageDispatch({type: 'SET_LOADING', payload: false})
    functions.fetchForControlCODByFilter({...queries, code_type: codeType})
    pageDispatch({type: 'SET_CODE_TYPE', payload: codeType})
  }

  useEffect(() => {
    const dateTimeValue = filter?.dateTime?.activeValue?.value
    if (dateTimeValue && canFetch) {
      const splitDate = dateTimeValue.split(' - ')
      const querySearch = searchParams.get('search') || ''
      const startDate = querySearch
        ? ''
        : convertDateTimeToApiFormat(splitDate[0]).split(' ')[0]
      const endDate = querySearch
        ? ''
        : convertDateTimeToApiFormat(splitDate[1]).split(' ')[0]

      const fetchData = async () => {
        const response = await sendRequestAuth(
          'get',
          `${config.API}/cod/cod-total?code_type=3&date_type=0&start_date=${startDate}&end_date=${endDate}`,
        )
        
        if (!!response?.data?.success) {
          setCanFetch(false)
          pageDispatch({
            type: orderActions.PANELS_UPDATE,
            payload: {
              panels: {
                unpaidSum: response?.data?.data[1]?.unpaidSum || 0,
                count_order_unpaidSum: response?.data?.data[1]?.count_order || 0,
                signpaidSum: response?.data?.data[2]?.signpaidSum || 0,
                count_order_signpaidSum: response?.data?.data[2]?.count_order || 0,
              },
            },
          })
        }
      }

      fetchData()
    }
  }, [])

  return (
    <StyledForControlCODPanels {...props}>
      <div className="for-control-cod-panels">
        <ForControlCODPanel
          className={`order-panels__item ${pageState.code_type === '3' ? 'active3' : ''}`}
          currency="₫"
          title={t("sended_order")}
          value={panels.signpaidSum}
          orderNumb={panels.count_order_signpaidSum}
          titleTooltip={
            t("list_order_delivery_success_and_settlement_preparation")
          }
          onClick={() => handleChangeType('3')}
        />

        <ForControlCODPanel
          className={`order-panels__item ${pageState.code_type === '2' ? 'active2' : ''}`}
          currency="₫"
          title={t("no_sended_order")}
          value={panels.unpaidSum}
          orderNumb={panels.count_order_unpaidSum}
          titleTooltip={t("list_order_shipping")}
          onClick={() => handleChangeType('2')}
        />
      </div>
    </StyledForControlCODPanels>
  )
}

