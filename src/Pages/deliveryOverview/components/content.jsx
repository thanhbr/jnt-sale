import React from 'react';
import FilterShippingPartner from "./filter/shippingPartner";
import TabDeliveryOverview from "./tab";
import styled from "styled-components";

const Content = () => {
  return (
    <StyledDeliveryContentStatistics>
      <div className={'delivery-content-statistics'}>
        <TabDeliveryOverview />
      </div>
    </StyledDeliveryContentStatistics>
  );
};

export default Content;

export const StyledDeliveryContentStatistics = styled.div`
  .delivery-content-statistics {
    position: relative;
    
    &--filter {
      position: absolute;
      top: 0;
      right: 0;
      width: 24.5rem;
      .order-filter-form__input-wide{
        .alternative-auto-complete__menu{
              top:calc(100% + 4px) !important;
              bottom: unset;
          .alternative-auto-complete__menu-list{
            .order-filter-form__option-text{
               margin: 16px 0 !important;
               cursor: pointer !important;
            }
          .order-filter-form__option-text[data-active='true']{
            color:#E5101D!important;
          }
        }
      }
}
    }
  }
`