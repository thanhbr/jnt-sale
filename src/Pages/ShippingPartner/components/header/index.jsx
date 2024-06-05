import {Breadcrumb} from 'common/breadcrumb'
import {PARTNER_BREADCRUMB} from 'Pages/ShippingPartner/interfaces/_constants'
import {StyledPartnerHeader} from './_styled'
import { useTranslation } from "react-i18next";


export const ShippingPartnerHeader = ({...props}) => {
  const { t } = useTranslation();
  return (
    <StyledPartnerHeader {...props}>
      <Breadcrumb links={PARTNER_BREADCRUMB} title={t("shipping_partner_pr")} />
    </StyledPartnerHeader>
  )
}
