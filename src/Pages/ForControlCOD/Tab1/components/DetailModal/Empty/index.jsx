import { Text } from 'common/text'
import { StyledOrderEmpty } from './_styled'
import {useTranslation} from "react-i18next";

export const ForControlCODEmpty = ({...props}) => {
    const { t } = useTranslation()
  return (
    <StyledOrderEmpty {...props}>
      <img
        className="order-empty__banner"
        src="/img/order/order-empty.png"
        alt="empty"
      />
      <Text as="b" color="#7C88A6" style={{marginBottom: 16}}>
        {t("find_no_data")}
      </Text>
    </StyledOrderEmpty>
  )
}
