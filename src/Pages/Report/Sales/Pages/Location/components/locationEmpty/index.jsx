import {Button} from 'common/button'
import {Text} from 'common/text'
import UseLocationFilterForm from 'Pages/Report/Sales/Pages/Location/hooks/useLocationFilterForm'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import {StyledOrderEmpty} from './_styled'
import { useTranslation } from 'react-i18next'

export const LocationEmpty = ({...props}) => {
  const {badge, dateTime} = UseLocationFilterForm()
  const {t} = useTranslation()

  const shouldShowCreateBtn =
    badge.others < 1 &&
    !!!dateTime.activeValue.value

  return (
    <StyledOrderEmpty {...props}>
      <img
        className="order-empty__banner"
        src="/img/report/report-empty.png"
        alt="empty"
      />
      <Text as="b" color="#7C88A6" style={{marginBottom: 16}}>
        {shouldShowCreateBtn
          ? t('you_havent_order')
          : t('find_no_data')}
      </Text>
      {shouldShowCreateBtn && (
        <Button href={'/orders/create'} icon={ORDER_ICONS.plus}>
          {t('create_new_order')}
        </Button>
      )}
    </StyledOrderEmpty>
  )
}
