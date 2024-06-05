import React from 'react';
import styled from "styled-components";
import {Text} from "../../../../common/text";
import {THEME_SEMANTICS} from "../../../../common/theme/_semantics";
import useFilterCapitalAdjustment from "../../hooks/useFilterCapitalAdjustment";
import {PRICE_ADJUSTMENT_ICONS} from "../../interfaces/_icon";

const CapitalAdjustmentTag = ({...props}) => {
  const {dateTime, employeeCreate, tags} = useFilterCapitalAdjustment()

  return (
    <StyledCapitalAdjustmentTag {...props}>
      {!!dateTime?.activeValue && (
        <CATag
          onDelete={() => tags.filterTagDelete('date')}
        >
          Ngày tạo phiếu: {dateTime?.activeValue}
        </CATag>
      )}
      {employeeCreate?.activeValue?.length > 0 && (
        <CATag
          onDelete={() => tags.filterTagDelete('employee')}
        >
          Người tạo phiếu: {employeeCreate?.activeValue?.map(item => item.fullname).join(', ')}
        </CATag>
      )}
      {tags.shouldShowResetAll && (
        <Text
          as="b"
          color={THEME_SEMANTICS.delivering}
          lineHeight={28}
          style={{margin: '16px 0 12px 0', cursor: 'pointer'}}
          onClick={_ => tags.handleDeleteAll()}
        >
          Đặt lại mặc định
        </Text>
       )}
    </StyledCapitalAdjustmentTag>
  )
}

export default CapitalAdjustmentTag
const CATag = ({onDelete, ...props}) => {
  return (
    <StyledOrderTag {...props}>
      {props?.children && <Text>{props.children}</Text>}
      <div className="order-tag__delete" onClick={onDelete}>
        {PRICE_ADJUSTMENT_ICONS.x}
      </div>
    </StyledOrderTag>
  )
}

const StyledOrderTag = styled.li`
  position: relative;

  margin: 16px 12px 12px 0;
  padding: 4px 28px 4px 12px;

  display: inline-block;

  background: rgba(30, 154, 152, 0.16);
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


const StyledCapitalAdjustmentTag = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`
