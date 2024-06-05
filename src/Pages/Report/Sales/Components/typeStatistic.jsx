import { AlternativeAutoComplete } from '../../../../common/form/autoComplete/_alternativeAutoComplete'
import { Option } from '../../../../common/form/select/_option'
import { Text } from '../../../../common/text'
import styled from 'styled-components'
import { THEME_COLORS } from '../../../../common/theme/_colors'
import useProductRevenueFilterForm from '../Pages/ProductRevenue/hooks/useProductRevenueFilterForm'
import { useTranslation } from 'react-i18next'

export const TypeStatistic = ({ ...props }) => {
  const {sortBy} = useProductRevenueFilterForm()
  const {t} = useTranslation()
  return (
    <StyledReportType>
      <AlternativeAutoComplete
        className="order-filter-form__input-wide"
        // main input
        inputProps={{
          categoryList: [], // menu list in category dropdown
          categoryValue: { name: t('report__statistic'), value: '' }, // if not exist this value -> default category: categoryList[0]
          categoryWidth: 125,
          placeholder: t('report__statistic'),
          readOnly: true,
          value: t(props.page?.name),
          // onIconClick: () => source.onChange(null),
        }}
        hideSearchBar={true}
      >
        {PAGE_REPORT.map(page => (
          <Option className={'option-report-type'}
                  onClick={() => sortBy?.onchange(page)}
                  data-active={sortBy?.value == page.value}>
            <Text as={'p'} href={page.href}>{t(page.name)}</Text>
          </Option>
        ))}
      </AlternativeAutoComplete>
    </StyledReportType>

  )
}

export const PAGE_REPORT = [
  {
    value: 'revenue_before_discount',
    name: 'report__revenue_before_discount'
  },
  {
    value: 'revenue_after_discount',
    name: 'report__revenue_after_discount'
  },
  {
    value: 'profit',
    name: 'report__profit'
  },
]

export const STATISTIC_TYPE = {
  revenue: 1,
  profit: 2,
}

const StyledReportType = styled.div`
  width: 25%;
  margin-bottom: 16px;
  .order-filter-form__input-wide{
    .alternative-auto-complete__menu-list{
      .option-report-type{
        min-height: 36px;
        display: flex;
        align-items: center;
        &[data-active='true'] {
          p{
            color: ${THEME_COLORS.primary_300}!important;
            cursor: default;
          }
        }
        &:hover{
          p{
            color: ${THEME_COLORS.primary_300}!important;
            cursor: pointer;
          }
        }
      }
    }
  }
`