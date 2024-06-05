import { Th } from 'layouts/tableLayout/_th'
import { Tr } from 'layouts/tableLayout/_tr'
import {useTranslation} from "react-i18next";

export const ForControlCODTHead = ({...props}) => {
    const { t } = useTranslation()
  return (
    <Tr {...props} type="tHead">
        <Th className="for-controlCOD-table2__cell">{t("order_id")}</Th>
        <Th className="for-controlCOD-table2__cell">{t("billcode")}</Th>
        <Th className="for-controlCOD-table2__cell">{t('name_product')}</Th>
        <Th className="for-controlCOD-table2__cell">{t("geter_pay")}</Th>
        <Th className="for-controlCOD-table2__cell">{t("Address")}</Th>
        <Th className="for-controlCOD-table2__cell">{t("order_sent_date")}</Th>
        <Th className="for-controlCOD-table2__cell">{t("money_cod")}</Th>
      {/* {loading && <Loading />} */}
    </Tr>
  )
}
