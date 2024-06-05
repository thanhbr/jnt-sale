import React, {useContext} from 'react'
import moment from 'moment'
import ReactHTMLTableToExcel from 'Component/ReactHTMLTableToExcel'
import {ReportContext} from '../../Pages/Report/Warehouse'
import {displayNumber} from 'util/functionUtil'
import useGlobalContext from '../../containerContext/storeContext'


export default function ExcelStockInventory(props) {
  const [reportState, dispatchReportState] = useContext(ReportContext)
  const [GlobalState, GlobalDispatch] = useGlobalContext()

  const {
    total_value_warehouse,
    total_quantity_warehouse,
    total_value_purchase,
    total_quantity_purchase,
    total_value_orders,
    total_quantity_orders,
  } = reportState.stockInventory.page_obj
  const startDate = reportState.stockInventory.date.slice(0, 10)
  const endDate = reportState.stockInventory.date.slice(13, 23)
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
        filename="bao_cao_so_kho"
        sheet="bao_cao_so_kho"
        buttonText={<img src="/svg/excel.svg" />}
      />
      <table
        id="table-to-xls"
        className="waffle"
        cellspacing="0"
        cellpadding="0"
        style={{display: 'none'}}
      >
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
              BÁO CÁO SỔ KHO
            </td>
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
                direction: 'ltr',
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
              Mã vạch sản phẩm
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
              Mã sản phẩm / SKU
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
              Danh mục sản phẩm
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
              Nhập kho
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
              Xuất kho
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
              Tồn kho
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
              Kho hàng
            </td>
          </tr>
          <tr style={{height: '18px'}}>
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
            >
              Số lượng
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
            >
              Giá trị (VNĐ)
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
            >
              Số lượng
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
            >
              Giá trị (VNĐ)
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
            >
              Số lượng
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
            >
              Giá trị (VNĐ)
            </td>
          </tr>
          {reportState.stockInventory.dataGridExcel.map((item, index) => {
            return (
              <tr key={index} style={{height: '18px'}}>
                <td>{index + 1}</td>
                <td>{item.probar_code}</td>
                <td>{item.product_name}</td>
                <td>{item.product_model}</td>
                <td>{item.category_name}</td>
                <td>{displayNumber(item.quantity_purchase)}</td>
                <td>
                  {displayNumber(item.quantity_purchase * item.value_purchase)}
                </td>
                <td>{displayNumber(item.quantity_order)}</td>
                <td>{displayNumber(item.quantity_order * item.value_order)}</td>
                <td>{displayNumber(item.quantity_warehouse)}</td>
                <td>
                  {displayNumber(
                    item.quantity_warehouse * item.value_warehouse,
                  )}
                </td>
                <td>{item.warehouse_name}</td>
              </tr>
            )
          })}

          <tr style={{height: '32px'}}></tr>
          <tr style={{height: '18px'}}>
            <td
              style={{
                fontWeight: 'bold',
                color: '#000000',
                fontSize: '16pt',
              }}
              colSpan="3"
            >
              TỔNG SỐ LƯỢNG NHẬP KHO: {displayNumber(total_quantity_purchase)}
            </td>
            <td
              style={{
                fontWeight: 'bold',
                color: '#000000',
                fontSize: '16pt',
              }}
              colSpan="4"
            >
              TỔNG SỐ LƯỢNG XUẤT KHO: {displayNumber(total_quantity_orders)}
            </td>
            <td
              style={{
                fontWeight: 'bold',
                color: '#000000',
                fontSize: '16pt',
              }}
              colSpan="5"
            >
              TỔNG SỐ LƯỢNG TỒN KHO: {displayNumber(total_quantity_warehouse)}
            </td>
          </tr>

          <tr style={{height: '18px'}}>
            <td
              style={{
                fontWeight: 'bold',
                color: '#000000',
                fontSize: '16pt',
              }}
              colSpan="3"
            >
              TỔNG GIÁ TRỊ NHẬP KHO (VNĐ): {displayNumber(total_value_purchase)}
            </td>
            <td
              style={{
                fontWeight: 'bold',
                color: '#000000',
                fontSize: '16pt',
              }}
              colSpan="4"
            >
              TỔNG GIÁ TRỊ XUẤT KHO (VNĐ): {displayNumber(total_value_orders)}
            </td>
            <td
              style={{
                fontWeight: 'bold',
                color: '#000000',
                fontSize: '16pt',
              }}
              colSpan="5"
            >
              TỔNG GIÁ TRỊ TỒN KHO (VNĐ):{' '}
              {displayNumber(total_value_warehouse * total_quantity_warehouse)}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
