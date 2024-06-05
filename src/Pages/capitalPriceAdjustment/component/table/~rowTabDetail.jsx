import React from 'react';
import styled from "styled-components";
import {Grid} from "@mui/material";
import {Text} from "../../../../common/text";
import {fDateTimeSuffix} from "../../../../util/formatTime";
import {Tooltip} from "../../../../common/tooltip";
import {PRICE_ADJUSTMENT_TABLE_CELL_PAYMENT_TYPES} from "../../interfaces/_const";
import {Button} from "../../../../common/button";
import {fNumber} from "../../../../util/formatNumber";

const RowTabDetail = ({data, rowData, onEdit, onAdjust, ...props}) => {
  return (
    <StyledRowTabDetail {...props}>
      <Grid container className="capital-adjustment-row-extra--wrapper">
        <Grid item xs={4} sm={4} md={4} lg={4} >
          <Text fontSize={16} fontWeight={600}>Thông tin chung</Text>
          <div className="capital-adjustment-row-extra--item">
            <Text color={'#7C88A6'}>Ngày điều chỉnh giá:</Text>
            <Text>{!!data?.dt_adjustment ? fDateTimeSuffix(data?.dt_adjustment) : '---'}</Text>
          </div>
          <div className="capital-adjustment-row-extra--item">
            <Text color={'#7C88A6'}>Ngày cập nhật:</Text>
            <Text>{!!data?.dt_updated ? fDateTimeSuffix(data?.dt_updated) : '---'}</Text>
          </div>
        </Grid>
        <Grid item xs={4} sm={4} md={4} lg={4} style={{marginTop: 24}}>
          <div className="capital-adjustment-row-extra--item">
            <Text color={'#7C88A6'}>Người tạo phiếu:</Text>
            <Text>{data?.fullname || '---'}</Text>
          </div>
          {!!data?.note && (
            <div className="capital-adjustment-row-extra--item">
              <Text color={'#7C88A6'}>Ghi chú:</Text>
              {data?.note?.length <= 164
                ? <Text>{data?.note}</Text>
                : <Tooltip
                  placement="bottom"
                  title={data?.note}
                >
                  <Text>{data?.note?.substring(0, 164)+'...'}
                  </Text>
                </Tooltip>
              }
            </div>
          )}
        </Grid>
        <Grid item xs={4} sm={4} md={4} lg={4} style={{marginTop: 24, position: 'relative'}}>
          <div className="capital-adjustment-row-extra--item"
               style={{marginLeft: 24}}
          >
            <Text color={'#7C88A6'}>Trạng thái phiếu:</Text>
            <Text
              fontSize={12}
              fontWeight={500}
              color={`${+rowData?.status === 1 ? '#FC820A' : +rowData?.status === 2 ? '#00AB56' : '#7C88A6'}`}
              style={{background: `${+rowData?.status === 1 ? '#FFF5EB' : +rowData?.status === 2 ? '#E5FFF2' : '#EFF3FB'}`, padding: '2px 13px', borderRadius: 4}}
            >
              {PRICE_ADJUSTMENT_TABLE_CELL_PAYMENT_TYPES?.find(item => +item.id === +rowData?.status)?.name  || '---'}
            </Text>
          </div>
          <div className="capital-adjustment-row-extra--group-btn">
            {+rowData?.status === 1 && (
              <>
                <Button
                  appearance={'secondary'}
                  size={'sm'}
                  onClick={onEdit}
                >Sửa</Button>
                <Button
                  size={'sm'}
                  onClick={onAdjust}
                >
                  Điều chỉnh giá
                </Button>
              </>
            )}
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} >
          <div className={'capital-adjustment-row-extra__table'}>
            <Text className={'capital-adjustment-row-extra__table--title'}>Thông tin sản phẩm điều chỉnh giá vốn </Text>
            <Text fontSize={16}>(Tổng số: {data?.product_item?.length || 0})</Text>
            <div>
              <div className={'capital-adjustment-row-extra__thead'}>
                <div className={'capital-adjustment-row-extra__thead--tr'}>Mã sản phẩm/SKU</div>
                <div className={'capital-adjustment-row-extra__thead--tr'}>Tên sản phẩm</div>
                <div className={'capital-adjustment-row-extra__thead--tr'}>Giá vốn trước điều chỉnh</div>
                <div className={'capital-adjustment-row-extra__thead--tr'}>Giá vốn sau điều chỉnh</div>
                <div className={'capital-adjustment-row-extra__thead--tr'}>Chênh lệch</div>
              </div>
              <div className={'capital-adjustment-row-extra__tbody'}>
                {data?.product_item?.map(item => (
                  <div key={item.product_id_details} className={'capital-adjustment-row-extra__tbody--tr'}>
                    <div className={'capital-adjustment-row-extra__tbody--td'}>{item?.product_model}</div>
                    <div className={'capital-adjustment-row-extra__tbody--td'}>
                      {item?.product_name?.length <= 90
                        ? <Text
                            as={'a'}
                            href={`/products?search=${item?.product_name}`}
                            target={'_blank'} color={'#1A94FF'} >{item?.product_name}
                          </Text>
                        : <Tooltip
                            placement="bottom-start"
                            title={item?.product_name}
                          >
                            <Text
                              as={'a'}
                              href={`/products?search=${item?.product_name}`}
                              target={'_blank'} color={'#1A94FF'} >{item?.product_name?.substring(0, 90)+' ...'}
                            </Text>
                          </Tooltip>
                      }
                    </div>
                    <div className={'capital-adjustment-row-extra__tbody--td'}>{fNumber(item?.cost_price || 0)} ₫</div>
                    <div className={'capital-adjustment-row-extra__tbody--td'}>{fNumber(item?.after_adjustment || 0)} ₫</div>
                    <div className={'capital-adjustment-row-extra__tbody--td'}>
                      <Text color={`${+item?.cost_price < +item.after_adjustment ? '#00AB56' : '#FF424E'}`}>
                        {+item.cost_price < +item.after_adjustment ? '+' : '-'}{fNumber(item.difference)} ₫
                      </Text>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </StyledRowTabDetail>
  )
}

export default RowTabDetail


const StyledRowTabDetail = styled.div`
  .capital-adjustment-row-extra {
    &--item {
      margin-top: 12px;
      display: grid;
    }
    &--group-btn {
      position: absolute;
      top: -24px;
      right: 0;
      
      button[data-size='sm'] {
        padding: 0 14px;
      }
      button:first-child {
        width: 55px;
        font-weight: 400;
      }
      button:nth-child(2) {
        margin-left: 8px;
        font-weight: 400;
        width: 120px;
      }
    }
    
    &__table {
      background: white;
      padding: 12px 0 24px 0;
      &--title {
        font-weight: 600 !important;
        font-size: 16px !important;
        line-height: 140% !important;
        color: #00081D !important;
      }
    }
    
    &__thead {
      background: #F7F9FD;
      border-width: 1px 1px 1px 1px;
      border-style: solid;
      border-color: #E2EAF8;
      
      border-radius: 8px 8px 0 0;
      display: flex;
      padding: 13px 0;
      margin-top: 12px;
      
      &--tr:nth-child(1) {
        width: 11.25rem;
        margin-left: 24px;
        font-weight: 600;
        font-size: 14px;
      } 
      &--tr:nth-child(2) {
        width: 44rem;
        margin-left: 24px;
        font-weight: 600;
        font-size: 14px;
      } 
      &--tr:nth-child(3) {
        width: 11.25rem;
        margin-left: 24px;
        font-weight: 600;
        font-size: 14px;
        text-align: end;
      } 
      &--tr:nth-child(4) {
        width: 11.25rem;
        margin-left: 24px;
        font-weight: 600;
        font-size: 14px;
        text-align: end;
      } 
      &--tr:nth-child(5) {
        width: 11.25rem;
        margin: 0 24px;
        font-weight: 600;
        font-size: 14px;
        text-align: end;
      } 
    }
    
    &__tbody {
      &--tr {
        background: #FFFFFF;
        border-width: 0 1px 1px 1px;
        border-style: solid;
        border-color: #E2EAF8;
        display: flex;
        padding: 19px 0 20px 0;
      }
      
      &--td:nth-child(1) {
        width: 11.25rem;
        margin-left: 24px;
        font-size: 14px;
      } 
      &--td:nth-child(2) {
        width: 44rem;
        margin-left: 24px;
        font-size: 14px;
      } 
      &--td:nth-child(3) {
        width: 11.25rem;
        margin-left: 24px;
        font-size: 14px;
        text-align: end;
      } 
      &--td:nth-child(4) {
        width: 11.25rem;
        margin-left: 24px;
        font-size: 14px;
        text-align: end;
      } 
      &--td:nth-child(5) {
        width: 11.25rem;
        margin: 0 24px;
        font-size: 14px;
        text-align: end;
      } 
      
      &--tr:last-child {
        border-radius: 0 0 8px 8px;
      }
    }
  }
`
