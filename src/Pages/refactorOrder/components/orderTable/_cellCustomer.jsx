import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {Tooltip} from 'common/tooltip'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import styled from 'styled-components'

export const CellCustomer = ({
  id,
  name,
  phone,
  report,
  onReportClick,
  ...props
}) => {
  return (
    <div {...props}>
      {name && (
        <div>
          <Text
            as={!!phone ? "a" :"p"}
            href={phone ? `/partner-management/customer?keyword=${phone}` : '#'}
            target="_blank"
            color={!!phone ? THEME_SEMANTICS.delivering : ''}
            fontWeight={600}
            style={{cursor: 'pointer'}}
          >
            {name}{' '}
          </Text>
          {report ? (
            <Tooltip
              placement="bottom-start"
              title={`Đã báo xấu: ${report} lần`}
            >
              <StyledReportIcon
                onClick={e => {
                  e.stopPropagation()
                  if (onReportClick) onReportClick()
                }}
              >
                {ORDER_ICONS.alertTriangle}
              </StyledReportIcon>
            </Tooltip>
          ) : (
            <></>
          )}
        </div>
      )}
      {phone && (
        <Text color="#7C88A6" fontSize={13} lineHeight={18}>
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
