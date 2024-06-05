import {Button} from 'common/button'
import {Text} from 'common/text'
import {StyledDeliveryDownCOD} from './_styled'
import {Input} from 'common/form/input'
import {useContext, useState} from 'react'
import {sendRequestAuth} from 'api/api'
import config from 'config'
import {THEME_COLORS} from 'common/theme/_colors'
import {formatMoney} from 'util/functionUtil'
import { fNumber } from 'util/formatNumber'
import useAlert from 'hook/useAlert'
import { DeliveryContext } from 'Pages/deliveryManagement/provider/_context'
import { orderActions } from 'Pages/deliveryManagement/provider/_reducer'
import { useTranslation } from 'react-i18next'

export const DeliveryDownCOD = ({curValue, billCode, ...props}) => {
  const { t, i18n } = useTranslation()
  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const {showAlert} = useAlert()
  const { pageState, pageDispatch } = useContext(DeliveryContext) 

  const handleUpdateCOD = async () => {
    let newList = pageState.table.display.list
    const res = await sendRequestAuth(
      'post',
      `${config.API}/delivery/down-cod/${billCode}`,
      {cod: value},
    )
    if (res?.data.success) {

      const findIndex = newList.findIndex(item => item?.billcode === billCode)
      const newItem = newList.find(item => item?.billcode === billCode)
      newItem.down_cod_status = Number(newItem.down_cod_status)+ 1
      newItem.cod = value.replace(',', '')

      if (findIndex !== -1) newList[findIndex] = newItem
      pageDispatch({
        type: orderActions.TABLE_DISPLAY_DATA_UPDATE,
        payload: {
          display: {
            list: newList
          },
        }
      });

      showAlert({content: t('update_cod_success'), type: 'success'})
      props.refreshOrderDetails()
      props.onClose()
    } else {
      setError(res?.data.message)
    }
  }

  return (
    <StyledDeliveryDownCOD {...props}>
      <div className="delivery-down-COD__container">
        <div className="delivery-down-COD__header">
          <Text
            as="h5"
            fontSize={20}
            fontWeight={600}
            lineHeight={22}
            style={{marginRight: 6}}
          >
            {t('edit_cod_order')}
          </Text>
          <Text color="#E5101D" fontSize={20} fontWeight={600}>
            #{billCode}
          </Text>
        </div>
        <div className="delivery-down-COD__body">
          <div className="delivery-down-COD__list common-scrollbar">
            <Text
              color="#7C88A6"
              fontSize={14}
              lineHeight={22}
              style={{display: 'block', marginBottom: 12}}
            >
              {t('current_value')}
            </Text>
            <Text
              color={THEME_COLORS.secondary_100}
              fontSize={16}
              lineHeight={22}
              style={{marginBottom: 12}}
            >
              {formatMoney(curValue)}
            </Text>
          </div>
          <div className="delivery-down-COD__list common-scrollbar">
            {' '}
            <Text
              color="#7C88A6"
              fontSize={14}
              lineHeight={22}
              style={{marginBottom: 12}}
            >
              {t('adjusted_cod_value')}
            </Text>
            <div className="delivery-down-COD__style-input">
              <Input
                style={{width: '276px', marginTop: '4px'}}
                className={error ? 'border-error' : 'input__input'}
                placeholder={'Nhập giá trị COD điều chỉnh '}
                autoComplete={'false'}
                value={value}
                onChange={e => {
                  setValue(fNumber(e.target.value))
                  setError('')
                }}
              />
              <span className="delivery-down-COD__icon-price">&#8363;</span>
            </div>
            <Text color="#FF424E" lineHeight={18} fontSize={12}>
              {error}
            </Text>
          </div>
        </div>
        <div className="delivery-down-COD__note">
          <div style={{margin: '3px 18px 0 0'}}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M7.99613 16C12.3809 16 16 12.3791 16 8C16 3.62089 12.3731 0 7.9884 0C3.61141 0 0 3.62089 0 8C0 12.3791 3.61914 16 7.99613 16ZM7.81054 9.59381C7.30788 9.59381 7.02948 9.3617 7.02948 8.89749V8.81238C7.02948 8.08511 7.44708 7.67505 8.01933 7.27273C8.69985 6.80077 9.03238 6.54545 9.03238 6.05029C9.03238 5.51644 8.62252 5.16054 7.9884 5.16054C7.52441 5.16054 7.18415 5.39265 6.92895 5.78723C6.68149 6.06576 6.56549 6.30561 6.1015 6.30561C5.72257 6.30561 5.41324 6.05803 5.41324 5.67118C5.41324 5.51644 5.44418 5.37718 5.49831 5.23791C5.7535 4.47969 6.68149 3.86074 8.06573 3.86074C9.50411 3.86074 10.7182 4.62669 10.7182 5.97292C10.7182 6.90135 10.2078 7.36557 9.40358 7.88395C8.89319 8.21663 8.59932 8.49516 8.57612 8.91296C8.57612 8.93617 8.56839 8.97486 8.56839 9.0058C8.54519 9.33849 8.25906 9.59381 7.81054 9.59381ZM7.8028 12.0696C7.27695 12.0696 6.84389 11.6905 6.84389 11.1799C6.84389 10.6692 7.26921 10.2901 7.8028 10.2901C8.32866 10.2901 8.75399 10.6692 8.75399 11.1799C8.75399 11.6983 8.32093 12.0696 7.8028 12.0696Z"
                fill="#1A94FF"
              />
            </svg>
          </div>
          <div>
            <Text as="h4" fontSize={14} lineHeight={22}>
              {t('note')}:
            </Text>
            <ul type="disc">
              <li>
                <div>&bull; </div><div style={{marginLeft: '8px'}}>{t('max_cod_adjustment')} {' '}
                <span style={{color: '#E5101D', fontWeight: 600}}>
                 {t('max_cod_adjustment_value')}  {' '}
                </span>
                {t('cod_adjustment_condition')}
                </div>
              </li>
              <li><div>&bull; </div><div style={{marginLeft: '8px'}}> {t('cod_adjustment_limitation')} &gt; {t('cod_adjustment_limitation1')} &lt; {t('cod_adjustment_limitation2')}</div></li>
            </ul>
          </div>
        </div>
        <div className="delivery-down-COD__footer">
          <Button
            appearance="ghost"
            size="sm"
            style={{minWidth: 110, marginRight: 8}}
            onClick={props.onClose}
          >
            {t('close')}
          </Button>
          <Button
            disabled={!value}
            onClick={handleUpdateCOD}
            className="delivery-down-COD__btn-update-cod"
          >
            {t('update_cod')}
          </Button>
        </div>
      </div>
    </StyledDeliveryDownCOD>
  )
}
