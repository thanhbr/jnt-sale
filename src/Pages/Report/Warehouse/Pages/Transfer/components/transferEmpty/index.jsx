import {Text} from 'common/text'
import useTransferFilterForm from 'Pages/Report/Warehouse/Pages/Transfer/hooks/useTransferFilterForm'
import { StyledTransferEmpty } from './_styled'
import { useTranslation } from 'react-i18next'

export const TransferEmpty = ({...props}) => {
  const {badge, search} = useTransferFilterForm()

  const shouldShowCreateBtn =
    badge.others <= 1 && !badge.advanced && !!!search.value
  const {t} = useTranslation()

  return (
    <StyledTransferEmpty {...props}>
      <img
        className="order-empty__banner"
        src="/img/report/report-empty.png"
        alt="empty"
      />
      <Text as="b" color="#7C88A6" style={{marginBottom: 16}}>
        {/*{shouldShowCreateBtn*/}
        {/*  ? 'Cửa hàng chưa có hoạt động chuyển kho nào'*/}
        {/*  : 'Không tìm thấy dữ liệu phù hợp'}*/}
        {shouldShowCreateBtn
          ? t('no_datas')
          : t('general_not_data_found')}
      </Text>
    </StyledTransferEmpty>
  )
}
