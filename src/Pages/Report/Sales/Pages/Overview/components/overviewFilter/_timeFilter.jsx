import useOverviewFilter from '../../hooks/useOverviewFilter'
import { AlternativeAutoComplete } from '../../../../../../../common/form/autoComplete/_alternativeAutoComplete'
import styled from 'styled-components'
import { Text } from '../../../../../../../common/text'
import { ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES } from '../../interfaces/_constants'
import { useTranslation } from 'react-i18next'
export const TimeFilter = () => {
  const { dateTime,pageState } = useOverviewFilter()
  const {t} = useTranslation()
  return (
    <AlternativeAutoComplete
      className="order-filter-form__input-wide"
      // main input
      inputProps={{
        categoryList: ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES, // menu list in category dropdown
        categoryWidth: 148,
        placeholder: '',
        readOnly: true,
        value: t(dateTime?.label) || '',
        disabled:  pageState.loading
      }}
      // menu
      // search input in dropdown menu
      searchInputProps={{
        onChange: dateTime.onTypeChange,
        disabled: pageState.loading
      }}
      hideSearchBar={true}
    >

      <ContentDateTime/>
    </AlternativeAutoComplete>
  )
}

const ContentDateTime = () => {
  const { dateTime } = useOverviewFilter()
  const {t} = useTranslation()
  return (
    <StyledContent>
      <div className={'datetime-header'}>
        <Text as={'p'} fontSize={12} color={'#ffffff'}>{t('time_period')}</Text>
        <Text as={'p'} fontSize={16} fontWeight={600} color={'#ffffff'}>{dateTime?.value}</Text>
      </div>
      <div className={'datetime-content'}>
        <div className={'datetime-content__row'}>
          {dateTime.option.map(item => (
            <Text as={'p'}
                  className={'datetime-content__row-option'}
                  onClick={() => dateTime.onChange(item)}
                  data-active={dateTime.active == item.value}
            >{t(item.label)}</Text>
          ))}
        </div>
      </div>

      <div className={'datetime-footer'}>
        <Text as={'p'} color={'#1E9A98'} style={{cursor: 'pointer'}} onClick={() => dateTime.onReset(dateTime.type)}> {t('reset_default')} </Text>
      </div>
    </StyledContent>
  )
}

const StyledContent = styled.div`

.datetime-header{
  background: #1E9A98;
  border-radius: 6px 6px 0px 0px;
  margin: 0 -20px;
  padding: 12px 16px;
}
.datetime-content{
  margin: 16px -4px;
  &__row{
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    &-option{
      width: calc(50% - 4px)!important;
      margin-left: 4px;
      padding: 8px 16px;
      border: 1px solid #EBEEF5;
      border-radius: 4px;
      cursor: pointer;
      margin-bottom: 8px;
      &:nth-child(1){
        margin-left: 0;
        margin-right: 4px;
      }
      &:nth-child(3){
        margin-left: 0;
        margin-right: 4px;
      }
      &:nth-child(5){
        margin-left: 0;
        margin-right: 4px;
      }
      &:hover{
        border: 1px solid #1E9A98;
        color: #1E9A98!important;
      }
      &[data-active='true']{
        border: 1px solid #1E9A98;
        color: #1E9A98!important;
      }
    }
  }
}
.datetime-footer{
  margin: 0 -4px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
}


`