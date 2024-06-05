import { AlternativeAutoComplete } from '../../../../common/form/autoComplete/_alternativeAutoComplete'
import { Option } from '../../../../common/form/select/_option'
import { Text } from '../../../../common/text'
import { PATH } from '../../../../const/path'
import styled from 'styled-components'
import { THEME_COLORS } from '../../../../common/theme/_colors'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const TypeReport = ({ ...props }) => {
  const nav = useNavigate()
  const {t} = useTranslation()
  return (
    <StyledReportType>
      <div {...props}>
        <AlternativeAutoComplete
          className="order-filter-form__input-wide"
          // main input
          inputProps={{
            categoryList: [], // menu list in category dropdown
            categoryValue: { name: t('type_report'), value: '' }, // if not exist this value -> default category: categoryList[0]
            categoryWidth: 100,
            placeholder: '',
            readOnly: true,
            value: t(props.page?.name),
            // onIconClick: () => source.onChange(null),
          }}
          hideSearchBar={true}
        >
          {PAGE_REPORT.map(page => (
            <Option className={'option-report-type'}
                    onClick={() => nav(page.href)}
                    data-active={props.page.type == page.value}>
              <Text as={'a'} href={page.href}>{t(page.name)}</Text>
            </Option>
          ))}
        </AlternativeAutoComplete>
      </div>
    </StyledReportType>

  )
}

export const PAGE_REPORT = [
  {
    value: 1,
    href: PATH.REPORT_SALES_EMPLOYEE,
    name: 'follow_employee'
  },
  {
    value: 2,
    href: PATH.REPORT_SALES_ORDER_ORIGIN,
    name: 'follow_order_origin'
  },
  {
    value: 3,
    href: PATH.REPORT_SALES_LOCATION,
    name: 'follow_area'
  },
  {
    value: 4,
    href: PATH.REPORT_SALES_CUSTOMER,
    name: 'follow_customer'
  },
]

export const PAGE_TYPE = {
  employee: 1,
  orderOrigin: 2,
  location: 3,
  customer: 4,
}

const StyledReportType = styled.div`
  width: 392px;
  margin-bottom: 16px;
  .order-filter-form__input-wide{
    .alternative-auto-complete__menu-list{
      .option-report-type{
        min-height: 36px;
        display: flex;
        align-items: center;
        &[data-active='true'] {
          a{
            color: ${THEME_COLORS.primary_300}!important;
            cursor: default;
          }
        }
        &:hover{
          a{
            color: ${THEME_COLORS.primary_300}!important;
            cursor: pointer;
          }
        }
      }
    }
  }
`