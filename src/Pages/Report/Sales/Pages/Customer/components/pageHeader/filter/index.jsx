import { PAGE_TYPE, TypeReport } from '../../../../../Components/typeReport'
import { QuantityEmployee } from '../../customerFilterForm/_quantityEmployee'
import { useTranslation } from 'react-i18next'

export const FilterHeader = () => {
  const {t} = useTranslation()

  return (
    <div style={{display: 'flex', alignItems: 'center'}}>
      <TypeReport page={{type: PAGE_TYPE.customer, name: t('follow_customer')}}/>
      <QuantityEmployee/>
    </div>
  )
}