import React, {useContext} from 'react'
import moment from 'moment'
import ReactHTMLTableToExcel from 'Component/ReactHTMLTableToExcel'
import {SaleContext} from '../../Pages/Report/Sales'
import {displayNumber} from 'util/functionUtil'
import useGlobalContext from '../../containerContext/storeContext'

export default function ExcelByProduct(props) {
  const [saleState, dispatchSaleState] = useContext(SaleContext)
  const [GlobalState, GlobalDispatch] = useGlobalContext()
  const {meta} = saleState.sale_by_product
  const startDate = saleState.sale_by_product.date.slice(0, 10)
  const endDate = saleState.sale_by_product.date.slice(13, 23)
  const start_date = moment(startDate, 'DD/MM/YYYY').format('DD/MM/YYYY')
  const end_date = moment(endDate, 'DD/MM/YYYY').format('DD/MM/YYYY')
  const {
    store_name,
    store_address,
    ward_name,
    district_name,
    city_name,
    store_phone,
  } = GlobalState.shopInfo
  const masterAdd = [store_address, ward_name, district_name, city_name].filter(
    a => a,
  )

  let address = masterAdd.join(', ')

  return (
    <>
      <ReactHTMLTableToExcel
        id="test-table-xls-button"
        className="download-table-xls-button"
        table="table-to-xls"
        filename="bao_cao_ban_hang_theo_san_pham"
        sheet="bao_cao_ban_hang_theo_san_pham"
        buttonText={<img src="/svg/excel.svg" />}
      />
      <table
        id="table-to-xls"
        className="waffle"
        cellspacing="0"
        cellpadding="0"
        style={{display: 'none'}}
      >
        <thead></thead>
        <tbody>
          <tr style={{height: '21px'}}>
            <td className="s0"></td>
            <td className="s1">Tên cửa hàng: {store_name}</td>
          </tr>
          <tr style={{height: '21px'}}>
            <td className="s0"></td>
            <td className="s6 softmerge">
              <div
                className="softmerge-inner"
                style={{width: '58px', left: '-1px'}}
              >
                Địa chỉ: {address}
              </div>
            </td>
          </tr>
          <tr style={{height: '21px'}}>
            <td className="s0"></td>
            <td className="s1">Số điện thoại: {store_phone}</td>
          </tr>
          <tr style={{height: '21px'}}>
            <td className="s0"></td>
          </tr>
          <tr style={{height: '33px'}}>
            <td
              style={{
                backgroundColor: '#ffffff',
                textAlign: 'center',
                fontWeight: 'bold',
                color: '#ff0000',
                fontFamily: '"Times New Roman"',
                fontSize: '22pt',
                verticalAlign: 'middle',
                whiteSpace: 'nowrap',
                direction: 'ltr',
                padding: '0px 3px 0px 3px',
              }}
              colSpan="12"
            >
              BÁO CÁO DOANH THU BÁN HÀNG THEO SẢN PHẨM
            </td>
            <td className="s12"></td>
          </tr>
          <tr style={{height: '33px'}}>
            <td className="s13"></td>
            <td className="s13"></td>
            <td className="s14">
              <div
                className="softmerge-inner"
                style={{width: '445px', left: '-71px'}}
              />
            </td>
            <td className="s15">
              <div
                className="softmerge-inner"
                style={{width: '145px', left: '-71px'}}
              />
            </td>
            <td className="s16 softmerge">
              <div
                className="softmerge-inner"
                style={{width: '145px', left: '-61px'}}
              >
                Từ ngày: {start_date}
              </div>
            </td>
            <td className="s17">
              <div
                className="softmerge-inner"
                style={{width: '145px', left: '-71px'}}
              />
            </td>
            <td className="s16 softmerge">
              <div
                className="softmerge-inner"
                style={{width: '145px', left: '-71px'}}
              >
                Đến ngày: {end_date}
              </div>
            </td>
            <td className="s16">
              <div
                className="softmerge-inner"
                style={{width: '145px', left: '-71px'}}
              />
            </td>
            <td className="s18">
              <div
                className="softmerge-inner"
                style={{width: '145px', left: '-71px'}}
              />
            </td>
            <td className="s18">
              <div
                className="softmerge-inner"
                style={{width: '145px', left: '-71px'}}
              />
            </td>
            <td className="s18">
              <div
                className="softmerge-inner"
                style={{width: '145px', left: '-71px'}}
              />
            </td>
            <td className="s19">
              <div
                className="softmerge-inner"
                style={{width: '145px', left: '-71px'}}
              />
            </td>
            <td className="s20">
              <div
                className="softmerge-inner"
                style={{width: '145px', left: '-71px'}}
              />
            </td>
          </tr>
          <tr style={{height: '33px'}}>
            <td className="s21"></td>
            <td className="s21"></td>
            <td className="s22"></td>
            <td className="s23"></td>
            <td className="s23"></td>
            <td className="s21"></td>
            <td className="s23"></td>
            <td className="s24"></td>
            <td className="s25"></td>
            <td className="s25"></td>
            <td className="s25"></td>
            <td className="s26"></td>
            <td className="s27"></td>
          </tr>
          <tr style={{height: '21px'}}>
            <td
              style={{
                borderBottom: '1px SOLID #000000',
                borderRight: '1px SOLID #000000',
                backgroundColor: '#ffff00',
                textAlign: 'center',
                fontWeight: 'bold',
                color: '#000000',
                fontFamily: '"Times New Roman"',
                fontSize: '12pt',
                verticalAlign: 'middle',
                whiteSpace: 'nowrap',
                // direction: 'ltr',
                padding: '0px 3px 0px 3px',
              }}
              rowSpan="2"
            >
              STT
            </td>
            <td
              style={{
                borderBottom: '1px SOLID #000000',
                borderRight: '1px SOLID #000000',
                backgroundColor: '#ffff00',
                textAlign: 'center',
                fontWeight: 'bold',
                color: '#000000',
                fontFamily: '"Times New Roman"',
                fontSize: '13pt',
                verticalAlign: 'middle',
                whiteSpace: 'normal',
                overflow: 'hidden',
                wordWrap: 'break-word',
                direction: 'ltr',
                padding: '0px 3px 0px 3px',
              }}
              rowSpan="2"
            >
              Mã sản phẩm
            </td>
            <td
              style={{
                borderBottom: '1px SOLID #000000',
                borderRight: '1px SOLID #000000',
                backgroundColor: '#ffff00',
                textAlign: 'center',
                fontWeight: 'bold',
                color: '#000000',
                fontFamily: '"Times New Roman"',
                fontSize: '13pt',
                verticalAlign: 'middle',
                whiteSpace: 'normal',
                overflow: 'hidden',
                wordWrap: 'break-word',
                direction: 'ltr',
                padding: '0px 3px 0px 3px',
                width: '300px',
              }}
              rowSpan="2"
            >
              Tên sản phẩm
            </td>
            <td
              style={{
                borderBottom: '1px SOLID #000000',
                borderRight: '1px SOLID #000000',
                backgroundColor: '#ffff00',
                textAlign: 'center',
                fontWeight: 'bold',
                color: '#000000',
                fontFamily: '"Times New Roman"',
                fontSize: '13pt',
                verticalAlign: 'middle',
                whiteSpace: 'normal',
                overflow: 'hidden',
                wordWrap: 'break-word',
                direction: 'ltr',
                padding: '0px 3px 0px 3px',
              }}
              rowSpan="2"
            >
              Giá vốn hiện tại
            </td>
            <td
              style={{
                borderBottom: '1px SOLID #000000',
                borderRight: '1px SOLID #000000',
                backgroundColor: '#ffff00',
                textAlign: 'center',
                fontWeight: 'bold',
                color: '#000000',
                fontFamily: '"Times New Roman"',
                fontSize: '13pt',
                verticalAlign: 'middle',
                whiteSpace: 'normal',
                overflow: 'hidden',
                wordWrap: 'break-word',
                direction: 'ltr',
                padding: '0px 3px 0px 3px',
              }}
              rowSpan="2"
            >
              Giá bán
            </td>
            <td
              style={{
                borderBottom: '1px SOLID #000000',
                borderRight: '1px SOLID #000000',
                backgroundColor: '#ffff00',
                textAlign: 'center',
                fontWeight: 'bold',
                color: '#000000',
                fontFamily: '"Times New Roman"',
                fontSize: '13pt',
                verticalAlign: 'middle',
                whiteSpace: 'normal',
                overflow: 'hidden',
                wordWrap: 'break-word',
                direction: 'ltr',
                padding: '0px 3px 0px 3px',
              }}
              colSpan="2"
            >
              Tổng bán
            </td>
            <td
              style={{
                borderBottom: '1px SOLID #000000',
                borderRight: '1px SOLID #000000',
                backgroundColor: '#ffff00',
                textAlign: 'center',
                fontWeight: 'bold',
                color: '#000000',
                fontFamily: '"Times New Roman"',
                fontSize: '13pt',
                verticalAlign: 'middle',
                whiteSpace: 'normal',
                overflow: 'hidden',
                wordWrap: 'break-word',
                direction: 'ltr',
                padding: '0px 3px 0px 3px',
              }}
              rowSpan="2"
            >
              Doanh thu TCK
            </td>
            <td
              style={{
                borderBottom: '1px SOLID #000000',
                borderRight: '1px SOLID #000000',
                backgroundColor: '#ffff00',
                textAlign: 'center',
                fontWeight: 'bold',
                color: '#000000',
                fontFamily: '"Times New Roman"',
                fontSize: '13pt',
                verticalAlign: 'middle',
                whiteSpace: 'normal',
                overflow: 'hidden',
                wordWrap: 'break-word',
                direction: 'ltr',
                padding: '0px 3px 0px 3px',
              }}
              rowSpan="2"
            >
              Chiết khấu
            </td>
            <td
              style={{
                borderBottom: '1px SOLID #000000',
                borderRight: '1px SOLID #000000',
                backgroundColor: '#ffff00',
                textAlign: 'center',
                fontWeight: 'bold',
                color: '#000000',
                fontFamily: '"Times New Roman"',
                fontSize: '13pt',
                verticalAlign: 'middle',
                whiteSpace: 'normal',
                overflow: 'hidden',
                wordWrap: 'break-word',
                direction: 'ltr',
                padding: '0px 3px 0px 3px',
              }}
              rowSpan="2"
            >
              Doanh thu SCK
            </td>
            <td
              style={{
                borderBottom: '1px SOLID #000000',
                borderRight: '1px SOLID #000000',
                backgroundColor: '#ffff00',
                textAlign: 'center',
                fontWeight: 'bold',
                color: '#000000',
                fontFamily: '"Times New Roman"',
                fontSize: '13pt',
                verticalAlign: 'middle',
                whiteSpace: 'normal',
                overflow: 'hidden',
                wordWrap: 'break-word',
                direction: 'ltr',
                padding: '0px 3px 0px 3px',
              }}
              rowSpan="2"
            >
              Giá vốn
            </td>
            <td
              style={{
                borderBottom: '1px SOLID #000000',
                borderRight: '1px SOLID #000000',
                backgroundColor: '#ffff00',
                textAlign: 'center',
                fontWeight: 'bold',
                color: '#000000',
                fontFamily: '"Times New Roman"',
                fontSize: '13pt',
                verticalAlign: 'middle',
                whiteSpace: 'normal',
                overflow: 'hidden',
                wordWrap: 'break-word',
                direction: 'ltr',
                padding: '0px 3px 0px 3px',
              }}
              rowSpan="2"
            >
              Lợi nhuận
            </td>
            <td
              style={{
                borderBottom: '1px SOLID #000000',
                borderRight: '1px SOLID #000000',
                backgroundColor: '#ffff00',
                textAlign: 'center',
                fontWeight: 'bold',
                color: '#000000',
                fontFamily: '"Times New Roman"',
                fontSize: '13pt',
                verticalAlign: 'middle',
                whiteSpace: 'normal',
                overflow: 'hidden',
                wordWrap: 'break-word',
                direction: 'ltr',
                padding: '0px 3px 0px 3px',
              }}
              rowSpan="2"
            >
              Tỷ lệ thành công
              <br />
              (%)
            </td>
          </tr>
          <tr style={{height: '21px'}}>
            <td
              style={{
                borderBottom: '1px SOLID #000000',
                borderRight: '1px SOLID #000000',
                backgroundColor: '#ffff00',
                textAlign: 'center',
                fontWeight: 'bold',
                color: '#000000',
                fontFamily: '"Times New Roman"',
                fontSize: '13pt',
                verticalAlign: 'middle',
                whiteSpace: 'normal',
                overflow: 'hidden',
                wordWrap: 'break-word',
                direction: 'ltr',
                padding: '0px 3px 0px 3px',
                width: '145px',
              }}
            >
              Tổng số lượng
            </td>
            <td
              style={{
                borderBottom: '1px SOLID #000000',
                borderRight: '1px SOLID #000000',
                backgroundColor: '#ffff00',
                textAlign: 'center',
                fontWeight: 'bold',
                color: '#000000',
                fontFamily: '"Times New Roman"',
                fontSize: '13pt',
                verticalAlign: 'middle',
                whiteSpace: 'normal',
                overflow: 'hidden',
                wordWrap: 'break-word',
                direction: 'ltr',
                padding: '0px 3px 0px 3px',
                width: '145px',
              }}
            >
              Tổng giá trị
            </td>
          </tr>
          {saleState.sale_by_product.dataGridExcel.map((item, index) => (
            <tr key={index} style={{height: '18px'}}>
              <td>{index + 1}</td>
              <td>{item.product_model}</td>
              <td>{item.product_name}</td>
              <td>{displayNumber(item.cost_price)}</td>
              <td>{displayNumber(item.price)}</td>
              <td>{displayNumber(item.total_quantity)}</td>
              <td>{displayNumber(item.total_price)}</td>
              <td>{displayNumber(item.total_quantity * item.price)}</td>
              <td>{displayNumber(item.discount)}</td>
              <td>
                {displayNumber(
                  item.total_quantity * item.price - item.discount,
                )}
              </td>
              <td>{displayNumber(item.cost_price * item.total_quantity)}</td>
              <td>
                {displayNumber(
                  item.total_quantity * item.price -
                    item.discount -
                    item.cost_price * item.total_quantity,
                )}
              </td>
              <td>
                {displayNumber(
                  ((item.quantity_success / item.total_quantity) * 100).toFixed(
                    2,
                  ),
                )}
              </td>
            </tr>
          ))}

          <tr style={{height: '32px'}}>
            <td
              style={{
                backgroundColor: '#ffffff',
                textAlign: 'center',
                fontWeight: 'bold',
                color: '#000000',
                fontFamily: '"Times New Roman"',
                fontSize: '11pt',
                verticalAlign: 'middle',
                whiteSpace: 'nowrap',
                direction: 'ltr',
                padding: '0px 3px 0px 3px',
              }}
              colSpan="5"
            >
              Tổng
            </td>
            <td className="s34">{meta?.total_quantity}</td>
            <td className="s35">{displayNumber(meta?.total_value)}</td>
            <td className="s35">
              {displayNumber(meta?.revenue_before_discount)}
            </td>
            <td className="s35">{displayNumber(meta?.discount)}</td>
            <td className="s35">
              {displayNumber(meta?.revenue_after_discount)}
            </td>
            <td className="s36">{displayNumber(meta?.cost_price)}</td>
            <td className="s36">{displayNumber(meta?.profit)}</td>
            <td className="s12">
              {displayNumber(
                ((meta?.quantity_success / meta?.total_quantity) * 100).toFixed(
                  2,
                ),
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
