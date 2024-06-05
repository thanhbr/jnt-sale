import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {Tooltip} from 'common/tooltip'
import {Tooltip as TooltipV2} from 'common/tooltipv2'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

export const CellCustomer = ({name, phone, report,supplierCode, ...props}) => {
  return (
    <div {...props}>
      {name && (
        <Text
          color={THEME_SEMANTICS.delivering}
          fontSize={14}
          fontWeight={400}
          lineHeight={20}
          style={{display: 'flex'}}
        >
          <Link
            to={`/partner/suppliers?search=${supplierCode}`}
            target="_blank"
            className="row-tab-detail__link-hover"
            style={{display: 'block', color: '#1A94FF'}}
          >
            <TooltipV2 className="tooltipV2-name" title={name} baseOn="height">
              {name}
            </TooltipV2>
          </Link>
          {report ? (
            <Tooltip placement="bottom" title={`Đã báo xấu: ${report} lần`}>
              <StyledReportIcon onClick={e => e.stopPropagation()}>
                {ORDER_ICONS.alertTriangle}
              </StyledReportIcon>
            </Tooltip>
          ) : (
            <></>
          )}
        </Text>
      )}
      {phone && (
        <Text color="#7C88A6" fontSize={13} fontWeight={400} lineHeight={18}>
          {phone}
        </Text>
      )}
    </div>
  )
}

const StyledReportIcon = styled.i`
  width: 16px;
  height: 16px;
  margin-left: 4px;

  svg {
    width: 16px;
    height: 16px;

    transform: translateY(2px);

    cursor: pointer;
  }
`
