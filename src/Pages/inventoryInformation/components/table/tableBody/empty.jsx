import React from 'react';
import styled from "styled-components";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../../const/display_name_menu";

const EmptyInventory = () => {
  const {t} = useTranslation()
  return (
    <StyledEmptyInventoryInformation>
      <div className={'inventory-info-empty-wrapper'}>
        <div>
          <img src={'/img/warehouse/info/empty.png'} alt={'empty-inventory'}/>
          <p style={{marginLeft: -32}}>{t(DISPLAY_NAME_MENU.GENERAL.NOT_DATA_FOUND)}</p>
        </div>
      </div>
    </StyledEmptyInventoryInformation>
  );
};

export default EmptyInventory;


export const StyledEmptyInventoryInformation = styled.div`
  .inventory-info-empty-wrapper {
    background: white;
    display: flex;
    justify-content: center;
    padding: 168px 0 318px 0;
    
    p {
      font-weight: 600;
      font-size: 14px;
      line-height: 140%;
      text-align: center;
      color: #7C88A6;
    }
  }
`
