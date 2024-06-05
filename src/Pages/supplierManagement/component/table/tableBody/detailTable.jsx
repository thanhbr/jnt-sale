import { Box, Collapse, Tab } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { Button } from "common/button";
import { Text } from "common/text";
import { THEME_COLORS } from "common/theme/_colors";
import { THEME_SEMANTICS } from "common/theme/_semantics";
import Skeleton from "../skeletonDetailRow/index"
import React, { useContext } from "react";
import styled from "styled-components";
import { Tooltip } from "common/tooltipv2";
import {SupplierManagement} from "../../../provider/_context";
import {DETAIL_TABLE_FIGURE_LIST, DETAIL_TABLE_HEADING_LIST} from "../../../interfaces/_const";
const Index = ({ active, data, rowData, ...props }) => {
    const { pageState, pageDispatch } = useContext(SupplierManagement)
    const figureValueList = [
        {
            value: data?.supplier_name_alias || '---',class:''
        },
        {
            value: data?.address || '---',class:''
        },
        {
            value: data?.people_contact || '---',class:''
        },
        { value: !!data?.email ? (
                <Tooltip placement='top-center'  title={data.email}  baseOn="width" className='tooltip_email'>
                    <Text>
                        {data.email}
                    </Text>
                </Tooltip>
            ) : '---',class:'tooltip_email' },

        { value: data?.mobile || '---',class:'' },
        { value: data?.details || '---' ,class:'supplier-management-detail__tooltip_detail'},
    ]

    const figureList = DETAIL_TABLE_FIGURE_LIST.map(
        (item, i) => ({ ...item, ...figureValueList[i] }),
    )
    const load = pageState.loading_detail

    return (
        <StyledRowTabDetail {...props}>
            {load ?
                <div className="supplier-management-detail__content">
                    {DETAIL_TABLE_HEADING_LIST.map((item, i) => (
                        <div key={i} className="supplier-management-detail__content-group">
                            <Text as="h4" fontSize={16} lineHeight={22}>
                                {item}
                            </Text>
                        </div>
                    ))}
                    {figureList.map(item =>
                        <div key={item.id} className="supplier-management-detail__content-group">
                            <Text as="p" color="#7C88A6">
                                {item.label}
                            </Text>
                            <Tooltip  baseOn={'height'} placement='top-center' title={item.value} className={item.class !== ''?item.class:'tooltip_v2'}>
                                <Text
                                    //  as={item?.href && 'a'}
                                    //  to={item?.href}
                                >
                                    {item.value}
                                </Text>
                            </Tooltip>

                        </div>

                    )}
                </div>
                : <Skeleton numb={5} />
            }
            {/*<Skeleton numb={4} />*/}
        </StyledRowTabDetail>

    )
}
export default Index
const StyledRowTabDetail = styled.div`
  .supplier-management-detail {
    &__content {
      position: relative;

      margin-bottom: 12px;

      display: flex;
      flex-wrap: wrap;
    }

    &__content-group {
      width: calc(67% / 2 - 12px);
      margin-bottom: 12px;
      margin-right: 12px;
 
      .tooltip_v2 {
        display:-webkit-box;
        max-width: 31.875rem;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .supplier-management-detail__tooltip_detail{
          display: -webkit-box;
          max-height: 100%;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
      }
      .tooltip_email {
        max-width: 18.75rem;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }
     }

    &__info-table {
      margin-bottom: 12px;

      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__inventory {
      min-height: 40px;
      margin-bottom: 12px;
      padding: 10px 0;

      display: flex;
      align-items: center;

      border-bottom: 1px solid #e2eaf8;

      color: ${THEME_COLORS.secondary_100};
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
    }

    &__table {
      margin-bottom: 12px;

      overflow: hidden;

      border: 1px solid #e2eaf8;
      border-radius: 8px;
    }

    &__thead {
      .detail-table-user__tr {
        background: #f7f9fd;
      }
    }

    &__tr {
      display: flex;
    }

    &__th {
      min-height: 44px;
      padding: 12px;

      color: ${THEME_COLORS.secondary_100};
      font-size: 14px;
      font-weight: 600;
      line-height: 20px;

      &:nth-child(1) {
        width: 13%;
      }
      &:nth-child(2) {
        flex: 1;
      }
      &:nth-child(3) {
        width: 7%;
      }
      &:nth-child(4) {
        width: 7%;
      }
      &:nth-child(5) {
        width: 13%;

        text-align: right;
      }
      &:nth-child(6) {
        width: 13%;

        text-align: right;
      }
      &:nth-child(7) {
        width: 13%;

        text-align: right;
      }
    }

    &__td {
      min-height: 56px;
      padding: 18px 12px;

      border-top: 1px solid #e2eaf8;

      color: ${THEME_COLORS.secondary_100};
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;

      &:nth-child(1) {
        width: 13%;
      }
      &:nth-child(2) {
        flex: 1;

        color: ${THEME_SEMANTICS.delivering};
      }
      &:nth-child(3) {
        width: 7%;
      }
      &:nth-child(4) {
        width: 7%;
      }
      &:nth-child(5) {
        width: 13%;

        text-align: right;
      }
      &:nth-child(6) {
        width: 13%;

        text-align: right;
      }
      &:nth-child(7) {
        width: 13%;

        text-align: right;
      }
    }

    &__result-item {
      margin-bottom: 8px;

      display: flex;

      color: ${THEME_COLORS.secondary_100};
      font-size: 14px;
      line-height: 20px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__result-label {
      padding: 0 12px;

      flex: 1;

      text-align: right;
    }

    &__result-value {
      width: 13%;
      padding: 0 12px;

      text-align: right;
    }
  }
  @media screen and (max-width:1559px){
   .detail-table-user{
    &__content-group {
      width: calc(84% / 3 - 12px);
    }
   }
`