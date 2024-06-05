import {Button} from 'common/button'
import {Text} from 'common/text'
import UsePartSignFilterForm from 'Pages/partSign/hooks/usePartSignFilterForm'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import {StyledOrderEmpty} from './_styled'
import {useTranslation} from "react-i18next";

export const PartSignEmpty = ({...props}) => {
  const {badge, search, dateTime} = UsePartSignFilterForm()
    const { t } = useTranslation()
  const shouldShowCreateBtn =
    badge.others <= 1 &&
    +!badge.advanced &&
    +!!!search.value &&
    +!!!dateTime.activeValue.value
  return (
    <StyledOrderEmpty {...props}>
      <img
        className="order-empty__banner"
        src="/img/partSign/partSign-empty.png"
        alt="empty"
      />

      <Text
        as="b"
        color="#7C88A6"
        fontSize={14}
        lineHeight={20}
        style={{marginBottom: 16}}
      >
        {shouldShowCreateBtn
          ? t("you_dont_have_sign_1_part")
          : t("no_matching_data")}
      </Text>
      {/* {shouldShowCreateBtn && (
        <Button href={'/orders/create'} icon={ORDER_ICONS.plus}>Tạo mới đơn hàng</Button>
      )} */}
    </StyledOrderEmpty>
  )
}
