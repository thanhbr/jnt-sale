import {Th} from 'layouts/tableLayout/_th'
import {Tr} from 'layouts/tableLayout/_tr'
import {ForControlCOD_ICONS} from 'Pages/ForControlCOD/Tab1/interfaces/_icons'
import {useState} from 'react'
import useForControlCODFilterForm from '../../hooks/useForControlCODFilterForm'
import {useTranslation} from "react-i18next";

export const ForControlCODTHead = ({...props}) => {
  const {functions} = useForControlCODFilterForm()
  const [sortType, setSortType] = useState('')
  const [sortBy, setSortBy] = useState('')
  const { t } = useTranslation()

  return (
    <Tr {...props} type="tHead">
      <Th className="for-controlCOD-table__cell">{t("payment_period")}</Th>
      <Th className="for-controlCOD-table__cell">{t("payment_code")}</Th>
      <Th className="for-controlCOD-table__cell">
          {t("registration_date")}
        <span
          className="sort"
          onClick={() => {
            const sortTypeLocal = sortBy === 'paymentDate' ? '1' : sortType === '1' ? '-1' : '1'
            setSortType(sortTypeLocal)
            setSortBy('payDate')
            functions.applyFilterWithSort({
              sort_type: sortTypeLocal,
              sort_by: 'payDate',
            })
          }}
        >
          {ForControlCOD_ICONS.chevronUpDown}
        </span>
      </Th>
      <Th className="for-controlCOD-table__cell">
          {t("payment_date")}
        <span
          className="sort"
          onClick={() => {
            const sortTypeLocal = sortBy === 'payDate' ? '1' : sortType === '1' ? '-1' : '1'
            setSortType(sortTypeLocal)
            setSortBy('paymentDate')
            functions.applyFilterWithSort({
              sort_type: sortTypeLocal,
              sort_by: 'paymentDate',
            })
          }}
        >
          {ForControlCOD_ICONS.chevronUpDown}
        </span>
      </Th>
      <Th className="for-controlCOD-table__cell">{t("money_cod")}</Th>
      <Th className="for-controlCOD-table__cell">{t("fee_cod")}</Th>
      <Th className="for-controlCOD-table__cell">{t("money_for_control")}</Th>
    </Tr>
  )
}
