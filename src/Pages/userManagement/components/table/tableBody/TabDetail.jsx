import { THEME_COLORS } from "common/theme/_colors";
import React from "react";
import styled from "styled-components";
import DetailTable from "../../detailTable/index"
const Index = ({active, data, rowData, ...props}) => {
    return (
        <StyledRowOrderExtra {...props} data-active={active}>
          {active && <div className="tab-detail__container">
                <div className="tab-detail__tabs">
                    <div
                        className="tab-detail__tab"
                    >
                        Chi tiết người dùng
                    </div>
                </div>
                <div className="tab-detail__content common-scrollbar">
                    <DetailTable 
                      active={active}
                      data={data}
                      rowData={rowData}
                     />
                </div>
            </div>}
        </StyledRowOrderExtra>
    )
}
export default Index
const StyledRowOrderExtra = styled.div`
  max-height: 0;

  overflow: hidden;

  transition: all 0.25s;

  &[data-active='true'] {
    max-height: 75vh;
    padding: 4px 0 7px 0;
  }

  .tab-detail {
    &__container {
      overflow: hidden;

      border-left: 4px solid #1e9a98;
      border-radius: 0px 8px 8px 8px;
    }

    &__tabs {
      height: 36px;

      display: flex;
    }

    &__tab {
      margin-right: 4px;
      padding: 0 32px;

      display: flex;
      align-items: center;
      justify-content: center;

      background: #fff;
      border-radius: 8px 8px 0px 0px;

      color: ${THEME_COLORS.secondary_100};
      font-size: 14px;
      font-weight: 400;

      transition: all 0.25s;

      cursor: pointer;

      &:first-child {
        border-radius: 0 8px 0px 0px;
      }

      &[data-active='true'] {
        background: #fff;
      }
    }

    &__content {
      max-height: 17.375rem;
      min-width: 102.25rem;
      padding: 24px 36px 32px 36px;

      overflow: hidden;

      background: #fff;
      border-radius: 0 8px 0 0;
    }
  }
  @media screen and (max-width : 1559px){
    .tab-detail{
      &__content {
        min-width: 0;
        max-height: 22.375rem;
      }
    }
  }
`