import { THEME_COLORS } from "common/theme/_colors";
import React, {useState} from "react";
import styled from "styled-components";
import DetailTable from "./detailTable"
import HistorySupplier from "./historySupplier"
import {TAB_SUPPLIER_DETAIL} from "../../../interfaces/_const";
const Index = ({active, data, rowData,history, ...props}) => {
    const [currentTab,setCurrentTab] = useState(TAB_SUPPLIER_DETAIL[0]?.value)
    const render_tab = ()=>{
       return TAB_SUPPLIER_DETAIL?.map((item,index)=>{
            return(
                <div
                    key={item.id}
                    className="supplier-management__tab"
                    data-active={item.value === currentTab}
                    onClick={()=>{
                        setCurrentTab(item.value)
                    }}
                >
                    {item.name}
                </div>
            )
        })
    }
    return (
        <StyledRowOrderExtra {...props} data-active={active}>
          {active && <div className="supplier-management__container">
                <div className="supplier-management__tabs">

                    {render_tab()}
                </div>
                <div className="supplier-management__content common-scrollbar">
                    {currentTab === 'supplierDetails' && <DetailTable
                        active={active}
                        data={data}
                        rowData={rowData}
                    /> }
                    {
                        currentTab === 'supplierHistory' && <HistorySupplier
                            data={history}
                            rowData={rowData}
                        />
                    }
                </div>
            </div>}
        </StyledRowOrderExtra>
    )
}
export default Index
const StyledRowOrderExtra = styled.div`
  overflow: hidden;

  transition: all 0.25s;

  &[data-active='true'] {
    // max-height: 176vh;
    padding: 4px 0 7px 0;
  }

  .supplier-management {
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

      background: #e2eaf8;
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
      padding: 24px 36px 32px 36px;
      background: #fff;
      border-radius: 0 8px 0 0;
    }
  }
`