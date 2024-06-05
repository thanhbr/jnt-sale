import { Th } from 'layouts/tableLayout/_th'
import { Tr } from 'layouts/tableLayout/_tr'
import { useContext } from 'react'
import { formatMoney } from 'util/functionUtil'
import { DetailContext } from '..'
import {useTranslation} from "react-i18next";

export const DetailFooter = () => {
  const {total} = useContext(DetailContext)
  const {
    total_cod,
    total_codLimit,
    total_discount,
    total_freight,
    total_moneyBack,
    total_otherFees,
    total_returnFee,
    total_transferFees,
  } = total
    const { t } = useTranslation()
  return (
    <Tr type="tHead" style={{borderTop: 0}} className="for-controlCOD-table-detail__thead">
      <Th className="for-controlCOD-table-detail__cell">{t("totals_n")}</Th>
      <Th className="for-controlCOD-table-detail__cell">{formatMoney(total_cod)}</Th>
      <Th className="for-controlCOD-table-detail__cell">{formatMoney(total_freight)}</Th>
      <Th className="for-controlCOD-table-detail__cell">{formatMoney(total_codLimit)}</Th>
      <Th className="for-controlCOD-table-detail__cell">{formatMoney(total_returnFee)}</Th>
      <Th className="for-controlCOD-table-detail__cell">{formatMoney(total_transferFees)}</Th>
      <Th className="for-controlCOD-table-detail__cell" style={{fontWeight: '400'}}>{formatMoney(total_otherFees)}</Th>
      <Th className="for-controlCOD-table-detail__cell">{formatMoney(total_discount)}</Th>
      <Th className="for-controlCOD-table-detail__cell">{formatMoney(total_moneyBack)}</Th>
      <Th className="for-controlCOD-table-detail__cell"></Th>
      {/* {loading && <Loading />} */}
    </Tr>
  )
}
