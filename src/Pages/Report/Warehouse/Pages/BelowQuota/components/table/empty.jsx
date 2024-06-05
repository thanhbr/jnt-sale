import {Text} from "../../../../../../../common/text";
import styled from "styled-components";
import React from "react";
import useFilter from "../../hooks/useFilter";
import { useTranslation } from 'react-i18next'

const Empty = () => {
  const {t} = useTranslation()
  const {shouldShowCreateBtn} = useFilter()
  return (
    <StyledEmpty>
      <img src={`/img/bulks-order/empty.png`}
           alt={'empty'}
      />
      <Text color={'#7C88A6'}
            fontWeight={600}
            style={{marginTop: 16}}
      >
        {shouldShowCreateBtn
          ? t('no_datas')
          : t('general_not_data_found')}
      </Text>
    </StyledEmpty>
  )
}

export default Empty

export const StyledEmpty = styled.div`
  min-height: calc(100vh - 320px);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: #fff;

  .receipt-empty__banner {
    width: 133px;
    height: 133px;
    margin-bottom: 16px;

    object-fit: contain;
    object-position: center;
  }
  .receipt-empty__create {
    width: 205px;
  }
`
