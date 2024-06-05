import React from 'react';
import {SkeletonProductPage} from "./~productPlaceHolder";
import {Td} from "../../../../layouts/tableLayout/_td";
import {Checkbox} from "../../../../common/form/checkbox";
import {Text} from "../../../../common/text";
import {Tr} from "../../../../layouts/tableLayout/_tr";
import useProductTbody from "../../hooks/useProductTbody";
import {Switch} from "../../../customer/components/switch";
import {ORDER_ICONS} from "../../../refactorOrder/interfaces/_icons";
import {RowMenuPopover} from "./~rowMenuPopover";
import ProductEmpty from "./~productEmpty";
import useProductRow from "../../hooks/useProductRow";
import RowProductExtra from "./~rowProductExtra";
import {useNavigate} from "react-router-dom";
import ConfirmProductStatus from "../modal/confirmProductStatus";
import RemoveProduct from "../modal/removeProduct";
import ConfirmProductDetailStatus from "../modal/confirmProductDetailStatus";
import ReactImageFallback from "react-image-fallback";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../const/display_name_menu";

const ProductTBody = () => {
  const {displayList, modal} = useProductTbody()

  return (
    <>
      {displayList?.loading ? (
        <SkeletonProductPage />
      ) : displayList?.list?.length > 0 ? (
        <>
          {displayList?.list?.map(item => <ProductTr key={item.id} data={item}/> )}
        </>
      ) : <ProductEmpty />}
      {modal?.confirmProductStatus || modal?.confirmProductGroup ? <ConfirmProductStatus /> : ''}
      {modal?.confirmProductDetail ? <ConfirmProductDetailStatus /> : ''}
      {modal?.confirmRemoveProduct && <RemoveProduct />}
    </>
  )
}

const formatDateTime = date => {
  if(!!date) {
    const fdate = date?.split(' ')
    const dmy = fdate[0]?.split('-')
    const hms = fdate[1]?.split(':')
    return `${dmy[2]}/${dmy[1]}/${dmy[0]} ${hms[0]}:${hms[1]}`
  }
  return date
}

const ProductTr = ({data, ...props}) => {
  const { t } = useTranslation()
  const productRow = useProductRow(data)
  const {row, detail, functions} = productRow
  const dataPrint = detail?.listID?.join(',')

  const navigate = useNavigate()
  const handleActionApply = action => {
    switch (action) {
      case 'edit':
        navigate(`/product/edit/${data?.id}/${data?.total_version}`)
        break
      case 'remove':
        functions.handleRemoveProduct(data)
        break
      case 'print':
        if(!!dataPrint) {
          navigate(`/product/print-barcode/${dataPrint}`)
        } else {
          functions.handlePrint()
        }
        break
      default: break
    }
  }

  return (
    <>
        <Tr
          className="product-table__row"
          extra={
            <RowProductExtra
              id={detail?.id}
              active={row.shouldOpenDetail}
              data={detail?.active}
              rowData={productRow}
            />
          }
          data-active={row.shouldOpenDetail}
          onClick={row.onToggleDetail}
        >
          <Td className="product-table__cell" data-type="td" style={{padding: '12px 18px'}}>
            <Checkbox
              checked={row.isSelected}
              onClick={e => {
                e.stopPropagation()
                row.onCheckboxChange()
              }}
            />
          </Td>
          <Td className="product-table__cell" data-type="td" style={{width: '61%'}}>
            <div style={{height: 44, width: 44, textAlign: 'center', borderRadius: 4}}>
              <ReactImageFallback
                className="order-single-product-table__thumbnail"
                src={data?.image_thumb}
                fallbackImage='/img/product/default-product-thumbnail.png'
                alt={data?.name || 'thumbnail'}
                style={{height: '100%'}}
              />
              {/*<img src={!!data?.image_thumb ? data?.image_thumb : '/img/product/default-product-thumbnail.png'}*/}
              {/*     alt={'image'}*/}
              {/*     style={{height: '100%'}}*/}
              {/*/>*/}
            </div>
            <Text style={{marginLeft: 12}}>{data?.product_name}</Text>
          </Td>
          <Td className="product-table__cell" data-type="td" style={{width: '17%'}}>
            <Text>{formatDateTime(data?.dt_created)}</Text>
          </Td>
          <Td className="product-table__cell" data-type="td" style={{width: '11%'}}>
            <div style={{display: 'block', textAlign: 'center'}}>
              <div><Text>{data?.warehouse_quantity}</Text></div>
              <div>
                <Text style={{color: '#7C88A6', fontSize: 13}}>
                  ({data?.total_version} {t(DISPLAY_NAME_MENU.GENERAL.VERSION)}{(+data?.total_version > 1 && t(DISPLAY_NAME_MENU.GENERAL.VERSION) === 'version')  && 's'})
                </Text>
              </div>
            </div>
          </Td>
          <Td className="product-table__cell" data-type="td">
            <Switch checked={+data?.status === 1}
                    onChange={e => {
                      e.stopPropagation()
                      functions.handleChangeProductStatus(data)
                    }}
            />
          </Td>
          <Td
            className="order-table__cell"
            data-menu="true"
            data-type="td"
            onClick={e => e.stopPropagation()}
            style={{width: '5%'}}
          >
            <button
              className="order-table__detail-toggle"
              data-active={row.shouldOpenDetail}
              onClick={row.onToggleDetail}
            >
              {ORDER_ICONS.up}
            </button>
            <RowMenuPopover
              id={data.id}
              // inventory={codeOrder.haveInventory}
              // shippingStatus={row.data.shipping_status_id}
              dataOrder={data}
              onActionClick={handleActionApply}
            />
          </Td>
        </Tr>
    </>
  )
}

export default ProductTBody;