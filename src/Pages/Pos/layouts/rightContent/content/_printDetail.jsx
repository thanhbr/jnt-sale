import React from 'react';
import {Text} from "../../../../../common/text";
import {fNumber} from "../../../../../util/formatNumber";
import usePosPayment from "../../../hooks/usePosPayment";

export const PrintDetail = () => {
  const {products, calc, printOrder} = usePosPayment()

  return (
    <div style={{ display: 'none' }}>
      <div id={'pos-order-detail-print'}>
        <div style={{ textAlign: 'center', margin: '24px 0' }}>
          <Text fontWeight={600} fontSize={24}>CHI TIẾT ĐƠN ĐẶT HÀNG</Text>
        </div>
        <table style={{ width: '100%' }}>
          <tbody style={{ width: '100%' }}>
          <tr style={{ width: '100%' }}>
            <td style={{ padding: '0 8px', textAlign: 'left', width: '20%' }}>
              <Text fontWeight={600}>{printOrder?.shopInfo?.store_name}</Text></td>
            <td style={{ padding: '0 8px', textAlign: 'left', width: '30%' }}>{products?.creator}</td>
            <td style={{ padding: '0 8px', textAlign: 'left', width: '25%' }}><Text fontWeight={600}>Mã đơn hàng</Text>
            </td>
            <td style={{ padding: '0 8px', textAlign: 'left', width: '25%' }}>
              <Text>{printOrder?.createdOrderID}</Text>
            </td>
          </tr>
          <tr style={{ width: '100%' }}>
            <td style={{ padding: '0 8px', textAlign: 'left', width: '20%' }}><Text fontWeight={600}>Địa chỉ</Text></td>
            <td style={{ padding: '0 8px', textAlign: 'left', width: '30%' }}>
              <Text>{printOrder?.customer?.data?.address || '---'}</Text>
            </td>
            <td style={{ padding: '0 8px', textAlign: 'left', width: '25%' }}><Text fontWeight={600}>Ngày tạo đơn</Text>
            </td>
            <td style={{
              padding: '0 8px',
              textAlign: 'left',
              width: '25%'
            }}><Text>{cellCodeOrderFormatDateTime()}</Text></td>
          </tr>
          <tr style={{ width: '100%' }}>
            <td style={{ padding: '0 8px', textAlign: 'left', width: '20%' }}>
              <Text fontWeight={600}>Điện thoại</Text>
            </td>
            <td style={{ padding: '0 8px', textAlign: 'left', width: '30%' }}>
              <Text>{printOrder?.customer?.data?.mobile || '---'}</Text>
              </td>
            <td style={{ padding: '0 8px', textAlign: 'left', width: '25%' }}>
              <Text fontWeight={600}>Người mua hàng</Text></td>
            <td style={{ padding: '0 8px', textAlign: 'left', width: '25%' }}>
              <Text>{printOrder?.customer?.data?.name || 'Khách lẻ'}</Text>
            </td>
          </tr>
          <tr style={{ width: '100%' }}>
            <td style={{ padding: '0 8px', textAlign: 'left', width: '20%' }}><Text fontWeight={600}>Email</Text>
            </td>
            <td style={{
              padding: '0 8px',
              textAlign: 'left',
              width: '30%'
            }}>{printOrder?.customer?.data?.email || '---'}</td>
            <td style={{ padding: '0 8px', textAlign: 'left', width: '25%' }}>
              <Text fontWeight={600}>Trạng thái đơn hàng</Text></td>
            <td style={{ padding: '0 8px', textAlign: 'left', width: '25%' }}>
              <Text>Bán tại cửa hàng</Text>
            </td>
          </tr>
          </tbody>
        </table>
        {
            <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: '16px' }}>
              <thead style={{ width: '100%' }}>
              <th style={{ border: '1px solid rgb(0, 8, 29)', padding: '8px', textAlign: 'center' }}><Text
                fontWeight={600}>Mã
                sản phẩm / SKU</Text></th>
              <th style={{ border: '1px solid rgb(0, 8, 29)', padding: '8px', textAlign: 'center' }}><Text
                fontWeight={600}>Tên
                sản phẩm</Text>
              </th>
              <th style={{ border: '1px solid rgb(0, 8, 29)', padding: '8px', textAlign: 'center' }}><Text
                fontWeight={600}>Đơn
                vị</Text></th>
              <th style={{ border: '1px solid rgb(0, 8, 29)', padding: '8px', textAlign: 'center' }}><Text
                fontWeight={600}>Số
                lượng</Text>
              </th>
              <th style={{ border: '1px solid rgb(0, 8, 29)', padding: '8px', textAlign: 'right' }}><Text
                fontWeight={600}>Đơn
                giá (VNĐ)</Text>
              </th>
              <th style={{ border: '1px solid rgb(0, 8, 29)', padding: '8px', textAlign: 'right' }}><Text
                fontWeight={600}>Giảm
                giá (VNĐ)</Text></th>
              <th style={{ border: '1px solid rgb(0, 8, 29)', padding: '8px', textAlign: 'right' }}><Text
                fontWeight={600}>Số
                tiền (VNĐ)</Text></th>
              </thead>
              <tbody style={{ width: '100%' }}>
              {products.length > 0 && products?.map((item, index) => (
                <tr key={index} style={{ width: '100%' }}>
                  <td style={{
                    border: '1px solid rgb(0, 8, 29)',
                    padding: '8px',
                    textAlign: 'center'
                  }}>{item?.data?.barcode}</td>
                  <td style={{
                    border: '1px solid rgb(0, 8, 29)',
                    padding: '8px',
                    textAlign: 'center'
                  }}>{item?.data?.product_name}</td>
                  <td style={{
                    border: '1px solid rgb(0, 8, 29)',
                    padding: '8px',
                    textAlign: 'center'
                  }}>{item?.data?.unit_name}</td>
                  <td
                    style={{
                      border: '1px solid rgb(0, 8, 29)',
                      padding: '8px',
                      textAlign: 'center'
                    }}>{item?.quantity}</td>
                  <td style={{
                    border: '1px solid rgb(0, 8, 29)',
                    padding: '8px',
                    textAlign: 'right'
                  }}>{fNumber(item?.price || 0)}</td>
                  <td
                    style={{
                      border: '1px solid rgb(0, 8, 29)',
                      padding: '8px',
                      textAlign: 'right'
                    }}>
                      {fNumber(item?.discountType === '%'
                            ? Math.floor((+item?.price || 0) * (+item?.discount || 0) / 100) * (+item?.quantity || 1)
                            : ((+item?.price || 0) - (+item?.discount || 0)) * (+item?.quantity || 1)
                      )}
                  </td>
                  <td style={{
                    border: '1px solid rgb(0, 8, 29)',
                    padding: '8px',
                    textAlign: 'right'
                  }}>{fNumber((item?.price - (item?.discountType === '%'
                                ? Math.floor((+item?.price || 0) * (+item?.discount || 0) / 100)
                                : (+item?.price || 0) - (+item?.discount || 0)
                              )) * (+item?.quantity || 1))}
                  </td>
                </tr>
              ))
              }
              </tbody>
            </table>
        }

        {
          <div style={{ textAlign: 'right', marginTop: '48px' }}>
            <Text fontWeight={600} style={{ marginRight: '48px' }}>Tổng tiền (VNĐ):</Text>
            <Text style={{ marginRight: '8px' }}>{fNumber(calc.guestMustPay)}</Text>
          </div>
        }
      </div>
     </div>
  )
}

const cellCodeOrderFormatDateTime = _ => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + '/' + dd + '/' + yyyy;
  return today
}