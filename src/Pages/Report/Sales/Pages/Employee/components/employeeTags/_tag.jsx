import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import styled from 'styled-components'

export const EmployeeTag = ({onDelete, ...props}) => {
  return (
    <StyledEmployeeTag {...props}>
      {props?.children && (
        <Text
          color={THEME_COLORS.secondary_100}
          fontSize={14}
          fontWeight={400}
          lineHeight={20}
        >
          {props.children}
        </Text>
      )}
      <div className="order-tag__delete" onClick={onDelete}>
        {ORDER_ICONS.x}
      </div>
    </StyledEmployeeTag>
  )
}

const StyledEmployeeTag = styled.li`
  position: relative;

  margin: 0 12px 12px 0;
  padding: 4px 28px 4px 12px;

  display: inline-block;

  background: rgba(229, 16, 29, 0.1);
  border-radius: 6px;

  .order-tag {
    &__delete {
      position: absolute;
      top: 6px;
      right: 8px;

      width: 16px;
      height: 16px;

      border-radius: 6px;

      transition: all 0.25s;

      cursor: pointer;

      &:hover {
        background: ${THEME_SEMANTICS.failed};

        svg {
          color: #fff;

          path[stroke] {
            stroke: #fff;
          }

          path[fill] {
            fill: #fff;
          }
        }
      }
    }
  }
`
