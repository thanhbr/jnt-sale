import { Button } from "common/button";
import { Text } from "common/text";
import { THEME_COLORS } from "common/theme/_colors";
import Skeleton from "../skeletonDetailRow/index"
import React, {useContext, useEffect, useState} from "react";
import styled from "styled-components";
import { Tooltip } from "common/tooltipv2";
import {SupplierManagement} from "../../../provider/_context";
import {ORDER_PAGE} from "../../../../../Component/Icons";
import SearchDateSupplier from "../../searchDate/index"
import {formatMoney} from "../../../../../util/functionUtil";
import {PAYMENT_STATUS, PURCHASE_TABLE_HEADER} from "../../../interfaces/_const";
import {useSupplierHistory} from "../../../hook/useSupplierHistory";
import {fDateTimeSuffix} from "../../../../../util/formatTime";
import {StatusPaymentLabel} from "./_statusInfo";
import {PURCHASES_TABLE_THEAD_PAYMENT_FILTER_LIST} from "../../../../purchases/interfaces/_constants";
import {TableHeaderFilter} from "./_historySupplierFilter";
const Index = ({  data, rowData, ...props }) => {
    const { pageState, pageDispatch } = useContext(SupplierManagement)
    const [keyword, setKeyword] = useState('')
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const load = pageState.loading_detail
    const purchase_total = pageState.purchase_total
    const purchase_list = pageState.purchase_list
    const origin_list = pageState.origin_list
    const {handleApplyFilter, handleRefesh} = useSupplierHistory()
    const [isOrderEmpty, setIsOrderEmpty] = useState(
        keyword === '' &&
        startDate === null &&
        endDate === null
    )
    const [query,setQuery] = useState()
    useEffect(()=>{
        const queries = {
            keyword: keyword.trim() || '',
            start_date:startDate || '',
            end_date:endDate || '',
            per_page: 20,
            start: 0,
        }
        setQuery(queries)
    },[keyword,startDate,endDate])
    const total_purchase= [
        {id:1, label:'Tổng giá trị hàng nhập',value:formatMoney(purchase_total?.grand_totals_amount)},
        {id:2,label:'Tổng tiền đã thanh toán',value:formatMoney(purchase_total?.totals_amount)},
        {id:3,label:'Công nợ',value:formatMoney(purchase_total?.totals_debt)}
    ];

    const render_total = ()=>{
        return total_purchase?.map((item,index)=>{
            return(
                <div className={'supplier-management-total_content'}>
                    <Text
                        as={'p'}
                        color={'#7C88A6'}
                    >{item.label}</Text>
                    <Text
                        as={'p'}
                        fontWeight={600}
                        fontSize={16}
                    >{item.value}</Text>
                </div>
            )
        })
    }
    const render_table_header =()=>{
        return  PURCHASE_TABLE_HEADER?.map(item=>{
            return(
                <div key={item.id} className={item.class}>
                    <Text fontWeight={600}>{item.label}</Text>
                </div>
            )
        })
    }
    const render_table_body = ()=>{
        return data?.map(item=>{
            return(
                <div className={'supplier-management-table-body'} >
                    <div className={"supplier-management_purchase-code-head"}>
                        <Text
                            color={THEME_COLORS.blue_500}
                            as={'a'}
                            href={`/purchases?search=${item.invoice_no}`}
                            target={'_blank'}
                        >{item.invoice_no}</Text>
                    </div>
                    <div  className={"supplier-management_purchase-date-head"}>
                        <Text>
                            {fDateTimeSuffix(item.purchase_date)}
                        </Text>
                    </div>
                    <div   className={"supplier-management_purchase-total-head"}>
                        <Text>
                            {item.total_quantity}
                        </Text>
                    </div>
                    <div  className={"supplier-management_purchase-empty-head"}>
                        <Text>
                            {item.quantity_not_warehouse}
                        </Text>
                    </div>
                    <div  className={"supplier-management_purchase-supplier-head"}>
                        <Text>
                            {formatMoney(item.grand_total_amount)}
                        </Text>
                    </div>
                    <div className={"supplier-management_purchase-status-head"}>
                        <StatusPaymentLabel status={item.payment_status} payment={formatMoney(item.grand_total_amount)}/>
                    </div>
                </div>

            )
        })
    }
    return (
        <StyledRowTabDetail {...props}>
            <div className="purchase_history">
                {origin_list?.length > 0 && (
                    <>
                    <div className="keyword-filter">
                        <div className="input-search">
                            <input
                                type="text"
                                placeholder="Tìm kiếm theo mã phiếu nhập hàng"
                                onChange={e => setKeyword(e.target.value)}
                                value={keyword}
                            />
                            {ORDER_PAGE.search}
                        </div>
                        <div className="input-date-calendar">
                            <SearchDateSupplier
                                startDate={startDate}
                                endDate={endDate}
                                setEndDate={setEndDate}
                                setStartDate={setStartDate}
                            />
                        </div>
                        <div className="input-group">
                            <div className="input-reset" onClick={()=>{
                                handleRefesh(pageState.detailActive.supplier_id)
                                setEndDate(null)
                                setStartDate(null)
                                setKeyword('')
                            }}>
                                Đặt lại mặc định
                            </div>
                            <div className="input-btn" onClick={()=>{
                                handleApplyFilter(query,pageState.detailActive.supplier_id)
                            }}>
                                Áp dụng
                            </div>
                        </div>
                    </div>
                { purchase_list?.length == 0 &&
                    <div className={'supplier-management-total_group-not-found'}>
                        <img src={'/img/supplier/nofoundsupplier.png'}/>
                        <Text
                            className={'supplier-management-total_group-not-found-txt'}
                            as={'p'}
                            color={'#7C88A6'}
                        >Không tìm thấy dữ liệu phù hợp</Text>
                    </div>
                }
                </>
                )}
                {purchase_list?.length > 0 && <div  className={'supplier-management-total_group'}>
                    {render_total()}
                </div>}
                {!load && <Skeleton numb={4} />}
                {load && purchase_list?.length > 0 && (
                    <div className={'supplier-management-table-purchase'}>
                        <Text fontWeight={600} fontSize={16} >Nội dung nhập hàng</Text>
                        <Text> (Tổng số lượng: {pageState.purchase_meta?.totals})</Text>
                        <div className={'supplier-management-table-detail'}>
                            <div className={'supplier-management-table-header'}>
                                {render_table_header()}
                                <div className={'supplier-management_purchase-status-head'}>
                                    <Text fontWeight={600}>Đã thanh toán</Text>
                                    <TableHeaderFilter
                                        context={SupplierManagement}
                                        name='payment_status'
                                        list={PURCHASES_TABLE_THEAD_PAYMENT_FILTER_LIST}
                                    />
                                </div>
                            </div>
                            <div  className={'supplier-management-common_scroll-table'}>
                                {render_table_body()}
                            </div>

                        </div>
                    </div>

                )}

                {load && origin_list?.length <= 0 && (
                    <div className="no-image-data">
                        <div className="img">
                            <img src={'/img/supplier/emptydetail.png'} alt="no-image-data" />
                        </div>
                        <div className="text">
                            <p>{isOrderEmpty ? 'Chưa có giao dịch nhập hàng nào' : 'Không tìm thấy giao dịch nhập hàng phù hợp'}</p>
                        </div>
                    </div>
                )}
            </div>

        </StyledRowTabDetail>

    )
}
export default Index
const StyledRowTabDetail = styled.div`
  .purchase_history {
  .supplier-management{
     &-total_group-not-found{
        text-align: center;
        height: 260px;
        padding-top: 37px;
      }
      &-total_group-not-found-txt{
        width: 100% !important;
      }
    &-total_group{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }
    &-total_content{
      width: 514px;
      height: 62px;
      border: 1px solid #EBEEF5;
      border-radius: 6px;
      text-align: center ;
      padding-top: 5px;
      @media screen and (max-width: 1440px){
        width: 100%;
      }
      p{
        width: 100% !important;
      }
    }
    &-common_scroll-table{
      max-height: 300px;
      overflow: auto;
    }
    &-table-detail{
      border-radius: 8px;
      background: #E2EAF8;
      margin-top: 12px;
    }
    &-table-header{
      display: flex;
      height: 44px;
      align-items: center;
    }
    &-table-body{
      display: flex;
      height: 56px;
      background: #ffffff;
      border: 1px solid #E2EAF8;
      align-items: center;
    }
    &-table-purchase{
      margin-top: 16px;
       .table-layout__table{
          margin-top: 12px;
          border-radius: 8px;
          .table-layout__table-t-body{
                     
          }
       }
    }
    &_purchase-code-head{
      width: 40.625rem;
      flex: 1;
      margin-left: 24px;
      @media screen and (max-width :1440px){
            margin-left: 24px;
      }
      @media screen and (max-width :1366px){
            margin-left: 12px;
      }
    }
    &_purchase-date-head{
      width:8.125rem;
      margin-left: 24px;
      @media screen and (max-width :1440px){
             margin-left: 12px;
      }
      @media screen and (max-width :1366px){
            width: 9.125rem;
             margin-left: 12px;
      }
    }
    &_purchase-supplier-head{
      width: 8.125rem;
      margin-left: 24px;
      text-align: right;
       @media screen and (max-width :1440px){
             margin-left: 12px;
      }
      @media screen and (max-width :1366px){
            width: 9.125rem;
             margin-left: 12px;
      }
     
    }
    &_purchase-paid-head{
       width: 8.125rem;
       margin-left: 24px;
       text-align: right;
       rgin-left: 12px;
     
     
    }
    &_purchase-total-head{
      width: 7.7%;
      margin-left: 24px;
      text-align: right;
       @media screen and (max-width :1440px){
            width: 12%;
             margin-left: 12px;
      }
       @media screen and (max-width :1280px){
            margin-left: 0px;
      }
    }
    &_purchase-empty-head{
      width: 7.7%;
      margin-left: 24px;
      text-align: right;
       @media screen and (max-width :1440px){
            width: 13%;
             margin-left: 12px;
      }
      @media screen and (max-width :1280px){
            margin-left: 0px;
      }
    }
    &_purchase-status-head{
      width: 11.875rem;
      margin-right: 24px;
      margin-left: 24px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: right;
       @media screen and (max-width :1440px){
            width: 12.6%;
      }
       @media screen and (max-width :1366px){
            width: 13.6%;
             margin-left: 12px;
      }
      @media screen and (max-width :1280px){
            width: 14.6%;
      }
    }
  }
.keyword-filter {
        display: grid;
        align-items: center;
        grid-template-columns: repeat(3,1fr);
        width: 100%;
        background: #FFFFFF;
        font-weight: 400;
        font-size: 14px;
        line-height: 140%;
        margin-bottom: 1rem;
        input {
            padding: 0.4rem 2.8rem 0.4rem 0.7rem;
            border: 1px solid #EBEEF5;
            border-radius: 6px;
        }

        .filter__action-btn {
            margin-left: 0.75rem;
        }

        .input-search {
            width: 100%;
            max-width:32.125rem;
            margin-right: 1rem;
            position: relative;

            svg {
                position: absolute;
                right: 0.875rem;
                top: .45rem;
            }

            input {
                width: 100%;
                height: 34px;

                &:hover {
                    border-color: #E5101D;
                }

                &:focus {
                    border-color: #E5101D;
                }
            }
        }

        .input-date-calendar {
            width: 100%;
            max-width: 514px;
            margin-right: 1rem;
            position: relative;
            max-height: 34px;
            height: 100%;
            z-index: 1;
            svg {
                position: absolute;
                right: 0.2rem;
                top: -0.1rem;

                @media (max-width: 1440px) {
                    right: 0.1rem;
                    top: 0.1rem;
                }
            }
            .rs-btn-default{
              max-height: 34px;
            }
        }

        .input-status {
            width: 100%;
            max-width: 32.125rem;

            position: relative;

            .category-input__menu-toggle {
                width: 145px !important;
            }
        }

        .input-group {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            max-width: 514px;
            .input-reset {
                font-weight: 400;
                font-size: 14px;
                line-height: 140%;
                color: #1A94FF;

                margin-right: 1.25rem;
                cursor: pointer;
            }

            .input-btn {
                display: flex;
                align-items: center;
                justify-content: center;

                width: 85px;
                height: 32px;

                background: #E5101D;
                border-radius: 6px;

                font-weight: 600;
                font-size: 14px;
                line-height: 140%;
                color: #FFFFFF;

                cursor: pointer;

                &:hover {
                    background: rgba(255, 0, 0, 0.6);
                }
            }
        }


    }
        .customer-status {
            input {
                // pointer-events: none;
            }
        }

        .placeholder-black {
            input {
                &::placeholder {
                    color: #00081D;
                }
            }
        }

        .table {
            max-height: 348px;
            overflow-y: auto;

            background: #F7F9FD;
            border-width: 1px 1px 0px 1px;
            border-style: solid;
            border-color: #E2EAF8;
            border-radius: 8px 8px 0px 0px;

            .table_purchase_history {
                height: 44px;
            }

            td {
                font-weight: 600;
                font-size: 14px;
                line-height: 140%;
                color: #00081D;
            }

            .table_id {
                width: 300px;
            }

            .table_bill {
                width: 360px;
            }

            .table_date {
                width: 360px;
            }

            .table_price {
                width: 260px;
            }

            .table_status {
                width: 344px;
            }

            .table_content {
                height: 56px;
                background: #FFFFFF;
                border: 1px solid #E2EAF8;
                border-left: none;
                border-right: none;

                .table_id {
                    font-weight: 400;
                    font-size: 14px;
                    line-height: 140%;
                    color: #1A94FF;
                    cursor: pointer;

                    a {
                        color: #1A94FF;
                    }
                }

                .table_bill {
                    font-weight: 400;
                    font-size: 14px;
                    line-height: 140%;
                    color: #1A94FF;
                    cursor: pointer;
                }

                .table_date {
                    font-weight: 400;
                    font-size: 14px;
                    line-height: 140%;
                    color: #00081D;
                }

                .table_price {
                    font-weight: 400;
                    font-size: 14px;
                    line-height: 140%;
                    color: #00081D;
                }
            }
        }

        .no-image-data {
            margin: 3rem 0 5.5rem;

            .img {
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .text {
                display: flex;
                align-items: center;
                justify-content: center;

                font-weight: 500;
                font-size: 14px;
                line-height: 140%;
                text-align: center;
                color: #7C88A6;
            }
        }

        $bgGreen: #00AB56;

        .colorStatusGray {
            width: 76px;
            color: #7C88A6;
            background-color: #EFF3FB;
            border-radius: 4px;
            padding: 0.1875rem 0.75rem;

            font-family: 'SF Pro Display';
            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            line-height: 150%;
            color: #7C88A6;

            margin: 0 auto;
        }

        .colorStatusOrange {
            width: 115px;
            color: #FC820A;
            background-color: #FFF5EB;
            border-radius: 4px;
            padding: 0.1875rem 0.75rem;

            font-family: 'SF Pro Display';
            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            line-height: 150%;

            margin: 0 auto;
        }

        .colorStatusOranges {
            width: 115px;
            color: #FC820A;
            background-color: #FFF5EB;
            border-radius: 4px;
            padding: 0.1875rem 0.75rem;

            font-family: 'SF Pro Display';
            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            line-height: 150%;

            margin: 0 auto;
        }

        .colorStatusBlue {
            width: 121px;
            color: #1A94FF;
            background-color: #EBF5FF;
            border-radius: 4px;
            padding: 0.1875rem 0.75rem;

            font-family: 'SF Pro Display';
            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            line-height: 150%;

            margin: 0 auto;
        }

        .colorStatusRed {
            width: 100px;
            color: #FF424E;
            background-color: #FFEBEC;
            border-radius: 4px;
            padding: 0.1875rem 0.75rem;

            font-family: 'SF Pro Display';
            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            line-height: 150%;

            margin: 0 auto;
        }

        .colorStatusGreen {
            width: 142px;
            color: $bgGreen;
            background-color: #EBFFF5;
            border-radius: 4px;
            padding: 0.1875rem 0.75rem;

            font-family: 'SF Pro Display';
            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            line-height: 150%;

            margin: 0 auto;
        }

        .colorStatusReds {
            width: 101px;
            border-radius: 4px;
            background: #FFEBEB;
            padding: 0.1875rem 0.75rem;

            font-family: 'SF Pro Display';
            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            line-height: 150%;
            color: #FF7471;

            margin: 0 auto;
        }

        .colorStatusGreens {
            width: 142px;
            color: #33CC70;
            background: #EFFBF4;
            border-radius: 4px;
            padding: 0.1875rem 0.75rem;

            font-family: 'SF Pro Display';
            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            line-height: 150%;

            margin: 0 auto;
        }

        .colorStatusRedd {
            width: 46px;
            border-radius: 4px;
            background: #FCEEEF;
            padding: 0.1875rem 0.75rem;

            font-family: 'SF Pro Display';
            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            line-height: 150%;
            color: #D93843;

            margin: 0 auto;
        }

        .colorStatusBlues {
            width: 117px;
            border-radius: 4px;
            background: #EBF8FE;
            padding: 0.1875rem 0.75rem;

            font-family: 'SF Pro Display';
            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            line-height: 150%;
            color: #1BACF9;

            margin: 0 auto;
        }

        .colorStatusDarkGreen {
            width: 85px;
            border-radius: 4px;
            background: #EBFFF4;
            padding: 0.1875rem 0.75rem;

            font-family: 'SF Pro Display';
            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            line-height: 150%;
            color: #007D3A;

            margin: 0 auto;
        }

        .colorStatusDarkGreens {
            width: 160px;
            border-radius: 4px;
            background: #EBFFF9;
            padding: 0.1875rem 0.75rem;

            font-family: 'SF Pro Display';
            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            line-height: 150%;
            color: #007B56;

            margin: 0 auto;
        }
    }
`