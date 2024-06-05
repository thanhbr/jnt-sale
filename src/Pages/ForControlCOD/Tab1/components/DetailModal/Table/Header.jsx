import { Th } from 'layouts/tableLayout/_th'
import { Tr } from 'layouts/tableLayout/_tr'
import {useTranslation} from "react-i18next";

export const DetailHeader = ({...props}) => {
    const { t } = useTranslation()
  return (
    <Tr {...props} type="tHead" style={{borderTop: 0}} className="for-controlCOD-table-detail__thead">
      <Th className="for-controlCOD-table-detail__cell">{t("billcode")}</Th>
      <Th className="for-controlCOD-table-detail__cell">{t("money_cod")}</Th>
      <Th className="for-controlCOD-table-detail__cell">{t("order_shipping")}</Th>
      <Th className="for-controlCOD-table-detail__cell">{t("fee_cod")}</Th>
      <Th className="for-controlCOD-table-detail__cell">{t("fee_refund")}</Th>
      <Th className="for-controlCOD-table-detail__cell">{t("fee_bank")}</Th>
      <Th className="for-controlCOD-table-detail__cell">{t("fee_other")}</Th>
      <Th className="for-controlCOD-table-detail__cell">{t("discount")}</Th>
      <Th className="for-controlCOD-table-detail__cell">{t("money_for_control")}</Th>
      <Th className="for-controlCOD-table-detail__cell">{t("note")}</Th>
      {/* {loading && <Loading />} */}
    </Tr>
  )
}
