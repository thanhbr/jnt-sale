import { AlternativeAutoComplete } from '../../../../common/form/autoComplete/_alternativeAutoComplete'
import { Option } from '../../../../common/form/select/_option'
import { Text } from '../../../../common/text'
import styled from 'styled-components'
import { THEME_COLORS } from '../../../../common/theme/_colors'
import { useNavigate } from 'react-router-dom'
import { PATH } from '../../../../const/path'
import { useTranslation } from 'react-i18next'

export const TypeView = ({ ...props }) => {
  const nav = useNavigate()
  const {t} = useTranslation()
  return (
    <StyledReportType>
      <AlternativeAutoComplete
        className="order-filter-form__input-wide"
        // main input
        inputProps={{
          categoryList: [], // menu list in category dropdown
          categoryValue: { name: t('report__view_by'), value: '' }, // if not exist this value -> default category: categoryList[0]
          categoryWidth: 82,
          placeholder: t('report__view_by'),
          readOnly: true,
          value: props.page?.name,
          // onIconClick: () => source.onChange(null),
        }}
        hideSearchBar={true}
      >
        {PAGE_REPORT.map(page => (
          <Option className={'option-report-type'}
                  onClick={() => nav(page.href)}
                  data-active={props.page.value == page.value}>
            <Text as={'p'}>{t(page.name)}</Text>
          </Option>
        ))}
      </AlternativeAutoComplete>
    </StyledReportType>

  )
}

export const PAGE_REPORT = [
  {
    value: 'origin',
    href: PATH.REPORT_SALES_SHIPPING_DIFFERENCE,
    name: 'source_order'
  },
  {
    value: 'user',
    href: PATH.REPORT_SALES_SHIPPING_DIFFERENCE_EMPLOYEE,
    name: 'report__created_by'
  },
]

export const VIEW_TYPE = {
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