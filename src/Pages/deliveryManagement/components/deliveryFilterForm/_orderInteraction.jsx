import {Tooltip} from 'common/tooltip'
import useFilterForm from 'Pages/deliveryManagement/hooks/useDeliveryFilterForm'
import {useRef} from 'react'
import {CategoryInput} from '../../../../common/form/input/_categoryInput'
import {useTranslation} from 'react-i18next'

export const OrderInteraction = () => {
  const {t} = useTranslation()
  const {downtime} = useFilterForm()
  const ref = useRef()
  return (
    <>
      <CategoryInput
        className={'order-filter-form__input-wide'}
        categoryList={[]}
        categoryValue={{
          name: t('interaction_stop_time'),
          value: '',
          icon: <Icon />,
        }}
        categoryWidth={270}
        placeholder={t('number_of_days')}
        value={downtime?.value || ''}
        onChange={downtime?.onChange}
        style={{position: 'relative'}}
      />
    </>
  )
}
const Icon = () => {
  const {t} = useTranslation()
  return (
    <span className="order-filter-form__tooltip">
      <Tooltip placement="center" title={t('order_list_filter')}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z"
            stroke="#808089"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          ' +
          <path
            d="M8 12.667C8.48325 12.667 8.875 12.2752 8.875 11.792C8.875 11.3087 8.48325 10.917 8 10.917C7.51675 10.917 7.125 11.3087 7.125 11.792C7.125 12.2752 7.51675 12.667 8 12.667Z"
            fill="#808089"
          />
          ' +
          <path
            d="M7.99967 9.16667V8.58333C8.40348 8.58333 8.79821 8.46359 9.13396 8.23925C9.46971 8.01491 9.7314 7.69605 9.88593 7.32298C10.0405 6.94991 10.0809 6.5394 10.0021 6.14336C9.92333 5.74731 9.72888 5.38352 9.44335 5.09799C9.15782 4.81246 8.79403 4.61801 8.39798 4.53923C8.00194 4.46045 7.59143 4.50088 7.21836 4.65541C6.8453 4.80994 6.52643 5.07163 6.30209 5.40738C6.07775 5.74313 5.95801 6.13786 5.95801 6.54167"
            stroke="#808089"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          ' +
        </svg>
      </Tooltip>
    </span>
  )
}
