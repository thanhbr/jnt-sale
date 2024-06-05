import React, {useContext} from 'react'
import ReactHTMLTableToExcel from 'Component/ReactHTMLTableToExcel'
import {ReportContext} from '../../Pages/Report/Warehouse'
import {displayNumber} from 'util/functionUtil'
import useGlobalContext from '../../containerContext/storeContext'

export default function ExcelLowQuantity(props) {
  const [reportState, dispatchReportState] = useContext(ReportContext)
  const [GlobalState, GlobalDispatch] = useGlobalContext()
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
        filename="bao_cao_duoi_dinh_muc"
        sheet="bao_cao_duoi_dinh_muc"
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
              colSpan="8"
            >
              BÁO CÁO DƯỚI ĐỊNH MỨC
            </td>
          </tr>
          <tr style={{height: '33px'}}>
            <td className="s13"></td>
            <td className="s16 softmerge">
              <div
                className="softmerge-inner"
                style={{width: '145px', left: '-61px'}}
              ></div>
            </td>
            <td className="s14">
              <div
                className="softmerge-inner"
                style={{width: '445px', left: '-71px'}}
              />
            </td>
            <td className="s16 softmerge">
              <div
                className="softmerge-inner"
                style={{width: '145px', left: '-71px'}}
              ></div>
            </td>

            <td className="s17">
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
            >
              Mã vạch
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
            >
              Số lượng tồn kho
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
              Danh Sách Kho
            </td>
          </tr>
          {reportState.lowQuantity.dataGridExcel.map((item, index) => (
            <tr key={index} style={{height: '18px'}}>
              <td>{index + 1}</td>
              <td>{item.probar_code}</td>
              <td>{item.product_name}</td>
              <td>{item.product_model}</td>
              <td>{displayNumber(item.whp_quantity)}</td>
              <td>{item.warehouse_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
