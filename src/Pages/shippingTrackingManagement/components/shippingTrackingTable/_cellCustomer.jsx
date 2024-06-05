import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {Tooltip} from 'common/tooltip'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import styled from 'styled-components'

export const CellCustomer = ({name, phone, report, ...props}) => {
  return (
    <div {...props}>
      {name && (
        <Text
          color={THEME_SEMANTICS.delivering}
          fontSize={14}
          fontWeight={600}
          lineHeight={20}
          style={{display: 'block'}}
        >
          {name}{' '}
          {report ? (
            <Tooltip
              placement="bottom"
              title={`Đã báo xấu: ${report} lần`}
            >
              <StyledReportIcon onClick={(e) => e.stopPropagation()}>{ORDER_ICONS.alertTriangle}</StyledReportIcon>
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
