import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {ORDER_ICONS} from 'Pages/Report/Warehouse/Pages/Import/interfaces/_icons'
import styled from 'styled-components'

export const ImportTag = ({onDelete, ...props}) => {
  return (
    <StyledImportTag {...props}>
      {props?.children && <Text>{props.children}</Text>}
      <div className="import-tag__delete" onClick={onDelete}>
        {ORDER_ICONS.x}
      </div>
    </StyledImportTag>
  )
}

const StyledImportTag = styled.li`
  position: relative;

  margin: 0 12px 12px 0;
  padding: 4px 28px 4px 12px;

  display: inline-block;

  background: rgba(229, 16, 29, 0.1);
  border-radius: 6px;

  .import-tag {
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
