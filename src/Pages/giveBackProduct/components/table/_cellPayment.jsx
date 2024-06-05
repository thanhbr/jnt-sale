import React from 'react';
import {Tooltip} from "../../../../common/tooltip";
import styled from "styled-components";
import {THEME_SEMANTICS} from "../../../../common/theme/_semantics";
import {GIVEBACK_PRODUCT_TABLE_CELL_PAYMENT_TYPES} from "../../interfaces/contants";
import {formatMoney} from "../../../../util/functionUtil";
import {Text} from "../../../../common/text";
import {useTranslation} from "react-i18next";

export const CellPayment = ({money, status, ...props}) => {
  const {t} = useTranslation()
  const selectedType = ['success', 'danger', 'warning'].find((item, index) => index === +status - 1)

  return (
    <StyledWrapperCellPayment>
      <div className={`wrapper-${selectedType} wrapper-cell-payment`}>
        <Tooltip title={t(GIVEBACK_PRODUCT_TABLE_CELL_PAYMENT_TYPES[selectedType])}>
          <StyledCellPayment {...props} data-type={selectedType} />
        </Tooltip>
        <Text>{formatMoney(money)}</Text>
      </div>
    </StyledWrapperCellPayment>
  )
}

const StyledWrapperCellPayment = styled.div`
  .wrapper-cell-payment {
    width: 8.75rem;
    display: flex;
    justify-content: space-between;
    padding: 0 8px;
    border-radius: 4px;
  }
  .wrapper-danger {
    background: #FFEBEC;
  }
  .wrapper-success {
    background: #EFFBF4;
  }
  .wrapper-warning {
    background: #FFF5EB;
  }
`

const StyledCellPayment = styled.div`
  width: 14px;
  height: 14px;

  overflow: hidden;

  border-radius: 50%;
  margin-top: 3px;

  cursor: pointer;

  &[data-type='danger'] {
    background: ${THEME_SEMANTICS.failed};
  }

  &[data-type='success'] {
    background: ${THEME_SEMANTICS.delivered};
  }

  &[data-type='warning'] {
    position: relative;

    border: 1px solid ${THEME_SEMANTICS.preparing};

    &::before {
      position: absolute;
      top: 0;
      left: 0;

      width: 50%;
      height: 100%;

      background: ${THEME_SEMANTICS.preparing};

      content: '';
    }
  }
`
