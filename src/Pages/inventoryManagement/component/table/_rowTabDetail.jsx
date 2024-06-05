import {Button} from 'common/button'
import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {useEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import {formatMoney} from '../../../../util/functionUtil'
import {useNavigate} from "react-router-dom";
import {
    INVENTORY_TABLE_ROW_EXTRA_TAB_DETAIL_FIGURE_LIST,
    INVENTORY_TABLE_ROW_EXTRA_TAB_DETAIL_HEADING_LIST, STATUS_INVENTORY
} from '../../interfaces/_const'
import {fDateTimeSuffix} from "../../../../util/formatTime";
import CheckBoxConsignment from "../../../../Component/CheckBoxConsignment/CheckBoxConsignment";
import {useInventoryConfirm} from "../../hook/useInventoryConfirm";
import {Tooltip} from "../../../../common/tooltipv2";

export const RowTabDetail = ({data, rowData, ...props}) => {
    const {row, detail} = rowData
    const navigate = useNavigate()
    const [exportUrl, setExportUrl] = useState('#')
    const exportLink = useRef()
    const {confirm} = useInventoryConfirm()
    const figureValueList = [
        {
            href: !!data?.user_created
                ? `/users?search=${data.phone_user_created}`
                : '#',
            value: data?.user_created
                || '---',
        },
        {
            href: !!data?.user_updated
                ? `/users?search=${data?.phone_user_updated}`
                : '#',
            value: data?.user_updated || '---',
        },
        {
            href: !!data?.user_balance
                ? `/users?search=${data?.phone_user_balance}`
                : '#',
            value: data?.user_balance || '---',
        },
        {value: data?.dt_created !== null? fDateTimeSuffix(data?.dt_created) : '---'},
        {value: data?.dt_updated !== null ?fDateTimeSuffix(data?.dt_updated) : '---'},
        {value: data?.dt_balance !== null ? fDateTimeSuffix(data?.dt_balance) : '---'},
    ]

    const figureList = INVENTORY_TABLE_ROW_EXTRA_TAB_DETAIL_FIGURE_LIST.map(
        (item, i) => ({...item, ...figureValueList[i]}),
    )

    const handleExportClick = () => {
        const exportURLData = row.onExportOrderExcel()
        exportURLData.then(res => {
            if (res && res !== '#') setExportUrl(res)
        })
    }

    useEffect(() => {
        if (exportUrl && exportUrl !== '#') {
            if (exportLink?.current) exportLink.current.click()
        }
    }, [exportUrl])

    return (
        <StyledRowTabDetail {...props}>
            <div className="row-tab-detail__content">
                {INVENTORY_TABLE_ROW_EXTRA_TAB_DETAIL_HEADING_LIST.map((item, i) => (
                    <div
                        key={i}
                        className="row-tab-detail__content-group"
                    >
                        <Text as="h4" fontSize={16} lineHeight={22}>
                            {item}
                        </Text>
                    </div>
                ))}
                {figureList.map(item => (
                    <div
                        key={item.id}
                        className="row-tab-detail__content-group"
                    >
                        <Text as="p" color="#7C88A6">
                            {item?.replaceName || item.label}
                        </Text>
                        <Text
                            as={item?.href !== "#" ? 'a' : undefined}
                            href={item?.href}
                            target="_blank"
                            color={item?.href !== "#" && item.color}
                        >
                            {item?.value}
                        </Text>
                    </div>
                ))}
                <div className='row-tab-detail__content-action'>
                    { +STATUS_INVENTORY.dang_kiem_kho?.status === +data.status &&  <Button className='row-tab-detail__content-group-btn' appearance="secondary" size="sm" onClick={() => navigate(`/warehouse/create/${data.id}`)}>
                        Sửa
                    </Button>}

                    <Button
                        appearance="secondary"
                        size="sm"
                        style={{margin: "0 8px"}}
                        onClick={handleExportClick}
                    >
                        Xuất Excel
                    </Button>
                    <a ref={exportLink} href={exportUrl} style={{display: 'none'}}></a>
                    { +STATUS_INVENTORY.dang_kiem_kho?.status === +data.status &&   <Button onClick={()=>confirm.openModal({label:'balance',id:data.id})}>Cân bằng kho</Button>}

                </div>
            </div>
            <div className="row-tab-detail__info-table">
                <div>
                    <Text as="b" fontSize={16} lineHeight={22}>
                        Thông tin sản phẩm{' '}
                    </Text>
                    <Text>
                        (SL sản phẩm kiểm:{' '}{Array.isArray(data?.item_details)
                        ? data.item_details.length
                        : '0'}
                        )
                    </Text>
                    <Text className={'row-tab-detail__info-devide'}></Text>
                    <Text>Kho kiểm hàng: </Text>
                    <Text as="b" lineHeight={22}>
                        {data?.warehouse_name || '---'}
                    </Text>
                </div>
                <div style={{display: 'flex'}}>
                    <CheckBoxConsignment
                        isChecked={detail?.diff == 1 ? true:false}
                        handleClick={e=>row?.check(e)}
                    />
                    <Text style={{marginLeft: 5}}>Chỉ xem những sản phẩm có chênh lệch</Text>
                </div>
            </div>
            {Array.isArray(data?.item_details) && data.item_details.length > 0 && (
                <div className="row-tab-detail__table">
                    <div className="row-tab-detail__thead">
                        <div className="row-tab-detail__tr">
                            <div className="row-tab-detail__th">Mã sản phẩm/SKU</div>
                            <div className="row-tab-detail__th">Tên sản phẩm</div>
                            <div className="row-tab-detail__th">Đơn vị</div>
                            <div className="row-tab-detail__th">Tồn trước kiểm</div>
                            <div className="row-tab-detail__th">SL thực tế</div>
                            <div className="row-tab-detail__th">Chênh lệch</div>
                            <div className="row-tab-detail__th">Lý do</div>
                        </div>
                    </div>
                    <div className="row-tab-detail__tbody">
                        {data?.item_details.map(item => (
                            <div key={item.id} className="row-tab-detail__tr">
                                <div
                                    className="row-tab-detail__td"
                                >
                                    <Tooltip className={'tooltip'} baseOn={'height'} title={item?.sku}>
                                        {item?.sku || '---'}
                                    </Tooltip>

                                </div>
                                <div
                                    className="row-tab-detail__td"
                                >
                                    <Tooltip className={'tooltip'} baseOn={'height'} title={item?.product_name_version}>
                                        <Text
                                            as={'a'}
                                            href={`/products?search=${item.barcode}`}
                                            target="_blank"
                                            style={{cursor:"pointer"}}
                                            color={THEME_SEMANTICS.delivering}
                                        >
                                            {item?.product_name_version || '---'}
                                        </Text>
                                    </Tooltip>


                                </div>
                                <div className="row-tab-detail__td">
                                    <Tooltip className={'tooltip'} baseOn={'height'} title={item?.unit_name}>
                                        {item?.unit_name || '---'}
                                    </Tooltip>

                                </div>
                                <div className="row-tab-detail__td">
                                    {item?.quantity
                                        ? Number(item.quantity) < 10
                                            ? `0${item.quantity}`
                                            : item.quantity
                                        : '---'}
                                </div>
                                <div className="row-tab-detail__td">
                                    <Text>
                                        {item?.quantity_after_adjustment
                                            ? Number(item.quantity_after_adjustment) < 10
                                                ? `0${item.quantity_after_adjustment}`
                                                : item.quantity_after_adjustment
                                            : '---'}
                                    </Text>
                                </div>
                                <div className="row-tab-detail__td">
                                    <Text>
                                        {Number(item?.quantity_after_adjustment || 0) - Number(item?.quantity || 0)}
                                    </Text>
                                </div>
                                <div className="row-tab-detail__td">
                                    <Tooltip className={'tooltip'} baseOn={'height'} title={item?.reason}>
                                        <Text>{item?.reason || '---'}</Text>
                                    </Tooltip>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {data?.note &&  <div className="row-tab-detail__result">
                <Tooltip className={'tooltip'} baseOn={'height'} title={data?.note}>
                    <Text fontWeight={600} color={THEME_COLORS.secondary_100}>Ghi chú:{' '}</Text>
                    <Text>{data?.note || '---'}</Text>
                </Tooltip>

            </div>}

        </StyledRowTabDetail>
    )
}

const StyledRowTabDetail = styled.div`
 .tooltip{
      display: -webkit-box;
      height: 100%;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  .row-tab-detail {
    &__result{
      .tooltip{
      display: -webkit-box;
      height: 100%;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
        }
    }
    &__content {
      position: relative;

      margin-bottom: 12px;

      display: flex;
      flex-wrap: wrap;
    }

    &__content-group {
      width: calc(100% / 3 - 12px);
      margin-bottom: 12px;
      margin-right: 12px;
      @media screen and (max-width: 1440px){
        width: calc(100% / 3 - 85px);
      }
    }
    &__content-action{
        position: absolute;
        top: 0;
        right: 0;
        @media screen and (max-width: 1440px){
          right: -10px;
        }
        @media screen and (max-width: 1366px){
          right: -27px;
        }
        @media screen and (max-width: 1280px){
            width: 21rem;
            right: -27px;
        }
    }
    &__content-group-btn{
      @media screen and (max-width: 1440px){
        margin-bottom: 1rem;
      }
      
    }
    &__info-table {
      margin-bottom: 12px;

      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &__info-devide{
      border-left : 1px solid rgb(124, 136, 166);
      margin: 0 8px;
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
      .row-tab-detail__tr {
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
         @media screen and (max-width: 1440px){
            width: 14%;
          } 
          @media screen and (max-width: 1366px){
            width: 17%;
          } 
          @media screen and (max-width: 1280px){
            width: 18%;
          }
      }
      &:nth-child(2) {
       width: 13%;
       @media screen and (max-width: 1366px){
              width: 15%;
        }
      }
      &:nth-child(3) {
           width: 6.5%;
           @media screen and (max-width: 1366px){
              width: 7.5%;
            } 
            @media screen and (max-width: 1280px){
              width: 8.5%;
            } 
      }
      &:nth-child(4) {
        width: 7.5%;
          text-align: center;
          @media screen and (max-width: 1440px){
            width: 12.5%;
          }
          @media screen and (max-width: 1366px){
            width: 14.5%;
          } 
          @media screen and (max-width: 1280px){
            width: 16.5%;
          }
      }
      &:nth-child(5) {
        width: 7.5%;
          text-align: center;
          @media screen and (max-width: 1440px){
            width: 9.5%;
          }
           @media screen and (max-width: 1366px){
            width: 11.5%;
          } 
          @media screen and (max-width: 1280px){
            width: 13.5%;
          }
      }
      &:nth-child(6) {
       width: 7.5%;
          text-align: center;
           @media screen and (max-width: 1440px){
            width: 10.5%;
          }
            @media screen and (max-width: 1366px){
            width: 12.5%;
          } 
          @media screen and (max-width: 1280px){
            width: 14.5%;
          }
      }
      &:nth-child(7) {
        width: 45%;
          @media screen and (max-width: 1440px){
            width: 39%;
          }
          @media screen and (max-width: 1280px){
            width: 31%;
          }
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
          @media screen and (max-width: 1440px){
            width: 14%;
          }
           @media screen and (max-width: 1366px){
            width: 17%;
          } 
          @media screen and (max-width: 1280px){
            width: 18%;
          }
      }
      &:nth-child(2) {
        width: 13%;

        color: ${THEME_SEMANTICS.delivering};
         @media screen and (max-width: 1366px){
              width: 15%;
        }
         @media screen and (max-width: 1280px){
            width: 14%;
          }
      }
      &:nth-child(3) {
          width: 6.5%;
           @media screen and (max-width: 1366px){
            width: 7.5%;
          }
           @media screen and (max-width: 1280px){
              width: 8.5%;
            } 
         
      }
      &:nth-child(4) {
        width: 7.5%;
          text-align: center;
           @media screen and (max-width: 1440px){
            width: 12.5%;
          }
           @media screen and (max-width: 1366px){
            width: 14.5%;
          } 
          @media screen and (max-width: 1280px){
            width: 16.5%;
          }
      }
      &:nth-child(5) {
        width: 7.5%;
          text-align: center;
           @media screen and (max-width: 1440px){
            width: 9.5%;
          }
           @media screen and (max-width: 1366px){
            width: 11.5%;
          } 
          @media screen and (max-width: 1280px){
            width: 13.5%;
          }
      }
      &:nth-child(6) {
      width: 7.5%;
          text-align: center;
            @media screen and (max-width: 1440px){
            width: 10.5%;
          }
            @media screen and (max-width: 1366px){
            width: 12.5%;
          } 
          @media screen and (max-width: 1280px){
            width: 14.5%;
          }
      }
      &:nth-child(7) {
        width: 45%;
         @media screen and (max-width: 1440px){
            width: 39%;
          }
          @media screen and (max-width: 1280px){
            width: 31%;
          }
          
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
`
