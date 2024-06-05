import React, {useContext} from 'react'
import moment from 'moment'
import ReactHTMLTableToExcel from 'Component/ReactHTMLTableToExcel'
import {displayNumber} from 'util/functionUtil'
import {SaleContext} from '../../Pages/Report/Sales'
import useGlobalContext from '../../containerContext/storeContext'

export default function ExcelByStaff(props) {
  const [saleState, dispatchSaleState] = useContext(SaleContext)
  const [GlobalState, GlobalDispatch] = useGlobalContext()

  const startDate = saleState.sale_by_employee.date.slice(0, 10)
  const endDate = saleState.sale_by_employee.date.slice(13, 23)
  const start_date = moment(startDate, 'DD/MM/YYYY').format('DD/MM/YYYY')
  const end_date = moment(endDate, 'DD/MM/YYYY').format('DD/MM/YYYY')
  const emptyArray = Array(11).fill({total_cod: 0, total_orders: 0})
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

  const res = saleState.sale_by_employee.dataGrid.reduce(
    (acc, cur) => {
      let cp = JSON.parse(JSON.stringify(acc.arr_status))

      cur.arr_status.forEach((item, index) => {
        cp[index].total_orders += item.total_orders
        cp[index].total_cod += item.total_cod
        cp[index].shipping_status_id = item.shipping_status_id
      })
      return {
        arr_status: cp,
        total_order: acc.total_order + cur.total_order,
        total_cod: acc.total_cod + cur.total_cod,
      }
    },
    {
      total_order: 0,
      total_cod: 0,
      arr_status: emptyArray,
    },
  )
  let percentTotal =
    ((res.arr_status[3].total_orders + res.arr_status[8].total_orders) /
      (res.total_order -
        (res.arr_status[9].total_orders + res.arr_status[7].total_orders))) *
    100

  percentTotal =
    res.total_order -
      (res.arr_status[9].total_orders + res.arr_status[7].total_orders) ===
    0
      ? 0
      : percentTotal
  const codAvgTotal =
    (res.arr_status[3].total_cod +
      res.arr_status[8].total_cod +
      res.arr_status[5].total_cod +
      res.arr_status[4].total_cod +
      res.arr_status[2].total_cod +
      res.arr_status[1].total_cod +
      res.arr_status[0].total_cod) /
    (res.arr_status[3].total_orders +
      res.arr_status[8].total_orders +
      res.arr_status[5].total_orders +
      res.arr_status[4].total_orders +
      res.arr_status[2].total_orders +
      res.arr_status[1].total_orders +
      res.arr_status[0].total_orders)
  return (
    <>
      <ReactHTMLTableToExcel
        id="test-table-xls-button"
        className="download-table-xls-button"
        table="table-to-xls"
        filename="bao_cao_ban_hang_theo_nhan_vien"
        sheet="bao_cao_ban_hang_theo_nhan_vien"
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
              colSpan="14"
            >
              BÁO CÁO BÁN HÀNG THEO NHÂN VIÊN CHỐT ĐƠN
            </td>
          </tr>
          <tr style={{height: '33px'}}>
            <td className="s13"></td>
            <td className="s16 softmerge">
              <div
                className="softmerge-inner"
                style={{width: '145px', left: '-61px'}}
              >
                Từ ngày: {start_date}
              </div>
            </td>
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
                style={{width: '145px', left: '-71px'}}
              >
                Đến ngày: {end_date}
              </div>
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
              Nhân viên
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
              Tất cả
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
              Đơn nháp
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
              Gửi giao hàng
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
              Đã lấy hàng
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
              Đang giao hàng
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
              Huỷ
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
              Chuyển hoàn
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
              Chuyển hoàn thành công
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
              Thành công
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
              Đã đối soát
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
              COD trung bình
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
              Tỉ lệ giao hàng thành công (%)
            </td>
          </tr>

          {saleState.sale_by_employee.dataGrid.map((item, index) => {
            let codAvg =
              (item.arr_status[8].total_cod +
                item.arr_status[6].total_cod +
                item.arr_status[5].total_cod +
                item.arr_status[4].total_cod +
                item.arr_status[3].total_cod +
                item.arr_status[2].total_cod +
                item.arr_status[1].total_cod +
                item.arr_status[0].total_cod) /
              (item.arr_status[8].total_orders +
                item.arr_status[6].total_orders +
                item.arr_status[5].total_orders +
                item.arr_status[4].total_orders +
                item.arr_status[3].total_orders +
                item.arr_status[2].total_orders +
                item.arr_status[1].total_orders +
                item.arr_status[0].total_orders)

            let denominator =
              item.arr_status[8].total_orders +
              item.arr_status[6].total_orders +
              item.arr_status[5].total_orders +
              item.arr_status[4].total_orders +
              item.arr_status[3].total_orders +
              item.arr_status[2].total_orders +
              item.arr_status[1].total_orders +
              item.arr_status[0].total_orders

            codAvg = denominator === 0 ? 0 : codAvg

            let percent =
              ((item.arr_status[3].total_orders +
                item.arr_status[8].total_orders) /
                (item.total_order -
                  (item.arr_status[9].total_orders +
                    item.arr_status[7].total_orders))) *
              100

            percent =
              item.arr_status.total_order -
                (item.arr_status[9].total_orders +
                  item.arr_status[7].total_orders) ===
              0
                ? 0
                : percent
            return (
              <tr key={index} style={{height: '18px'}}>
                <td>{index + 1}</td>
                <td>{item.fullname}</td>
                <td>
                  {displayNumber(item.total_order)}
                  <br />
                  {displayNumber(item.total_cod)}
                </td>
                <td>
                  {displayNumber(item.arr_status[9].total_orders)}
                  <br />
                  {displayNumber(item.arr_status[9].total_cod)}
                </td>
                <td>
                  {displayNumber(item.arr_status[0].total_orders)}
                  <br />
                  {displayNumber(item.arr_status[0].total_cod)}
                </td>
                <td>
                  {displayNumber(item.arr_status[1].total_orders)}
                  <br />
                  {displayNumber(item.arr_status[1].total_cod)}
                </td>
                <td>
                  {displayNumber(item.arr_status[2].total_orders)}
                  <br />
                  {displayNumber(item.arr_status[2].total_cod)}
                </td>
                <td>
                  {displayNumber(item.arr_status[7].total_orders)}
                  <br />
                  {displayNumber(item.arr_status[7].total_cod)}
                </td>
                <td>
                  {displayNumber(item.arr_status[4].total_orders)}
                  <br />
                  {displayNumber(item.arr_status[4].total_cod)}
                </td>
                <td>
                  {displayNumber(item.arr_status[5].total_orders)}
                  <br />
                  {displayNumber(item.arr_status[5].total_cod)}
                </td>
                <td>
                  {displayNumber(item.arr_status[3].total_orders)}
                  <br />
                  {displayNumber(item.arr_status[3].total_cod)}
                </td>
                <td>
                  {displayNumber(item.arr_status[8].total_orders)}
                  <br />
                  {displayNumber(item.arr_status[8].total_cod)}
                </td>
                <td>{displayNumber(codAvg.toFixed(0))}</td>
                <td>{percent.toFixed(2)}</td>
              </tr>
            )
          })}

          <tr style={{height: '18px'}}>
            <td
              style={{
                fontWeight: 'bold',
                color: '#000000',
                textAlign: 'center',
              }}
              colSpan="2"
            >
              Tổng:
            </td>
            <td
              style={{
                fontWeight: 'bold',
                color: '#000000',
                textAlign: 'center',
              }}
            >
              {displayNumber(res.total_order)}
              <br />
              {displayNumber(res.total_cod)}
            </td>
            <td
              style={{
                fontWeight: 'bold',
                color: '#000000',
                textAlign: 'center',
              }}
            >
              {displayNumber(res.arr_status[9].total_orders)}
              <br />
              {displayNumber(res.arr_status[9].total_cod)}
            </td>
            <td
              style={{
                fontWeight: 'bold',
                color: '#000000',
                textAlign: 'center',
              }}
            >
              {displayNumber(res.arr_status[0].total_orders)}
              <br />
              {displayNumber(res.arr_status[0].total_cod)}
            </td>
            <td
              style={{
                fontWeight: 'bold',
                color: '#000000',
                textAlign: 'center',
              }}
            >
              {displayNumber(res.arr_status[1].total_orders)}
              <br />
              {displayNumber(res.arr_status[1].total_cod)}
            </td>
            <td
              style={{
                fontWeight: 'bold',
                color: '#000000',
                textAlign: 'center',
              }}
            >
              {displayNumber(res.arr_status[2].total_orders)}
              <br />
              {displayNumber(res.arr_status[2].total_cod)}
            </td>
            <td
              style={{
                fontWeight: 'bold',
                color: '#000000',
                textAlign: 'center',
              }}
            >
              {displayNumber(res.arr_status[7].total_orders)}
              <br />
              {displayNumber(res.arr_status[7].total_cod)}
            </td>
            <td
              style={{
                fontWeight: 'bold',
                color: '#000000',
                textAlign: 'center',
              }}
            >
              {displayNumber(res.arr_status[4].total_orders)}
              <br />
              {displayNumber(res.arr_status[4].total_cod)}
            </td>
            <td
              style={{
                fontWeight: 'bold',
                color: '#000000',
                textAlign: 'center',
              }}
            >
              {displayNumber(res.arr_status[5].total_orders)}
              <br />
              {displayNumber(res.arr_status[5].total_cod)}
            </td>
            <td
              style={{
                fontWeight: 'bold',
                color: '#000000',
                textAlign: 'center',
              }}
            >
              {displayNumber(res.arr_status[3].total_orders)}
              <br />
              {displayNumber(res.arr_status[3].total_cod)}
            </td>
            <td
              style={{
                fontWeight: 'bold',
                color: '#000000',
                textAlign: 'center',
              }}
            >
              {displayNumber(res.arr_status[8].total_orders)}
              <br />
              {displayNumber(res.arr_status[8].total_cod)}
            </td>
            <td
              style={{
                fontWeight: 'bold',
                color: '#000000',
                textAlign: 'center',
              }}
            >
              {displayNumber(codAvgTotal.toFixed(0))}
            </td>
            <td
              style={{
                fontWeight: 'bold',
                color: '#000000',
                textAlign: 'center',
              }}
            >
              {percentTotal.toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
