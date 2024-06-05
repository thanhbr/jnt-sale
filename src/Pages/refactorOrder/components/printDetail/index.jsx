import { Text } from '../../../../common/text'
import { useContext } from 'react'
import { OrderContext } from '../../provider/_context'
import { fNumber } from '../../../../util/formatNumber'

export const PrintOrderDetail = () => {
  const { pageState } = useContext(OrderContext)
  const { printDetail } = pageState
  let details = [printDetail?.details]
  if(+printDetail?.has_inventory != 1){
    if(printDetail?.details?.includes('\n')){
      details = printDetail?.details.split('\n')
    }
  }
  return (
    <div style={{ display: 'none' }}>
      <div id={'order-detail-print'}>
        <div style={{ textAlign: 'center', margin: '24px 0' }}>
          <Text fontWeight={600} fontSize={24}>CHI TIẾT ĐƠN ĐẶT HÀNG</Text>
        </div>
        <table style={{ width: '100%' }}>
          <tbody style={{ width: '100%' }}>
          <tr style={{ width: '100%' }}>
            <td style={{ padding: '0 8px', textAlign: 'left', width: '20%' }}><Text fontWeight={600}>Tên Người
              bán</Text></td>
            <td style={{ padding: '0 8px', textAlign: 'left', width: '30%' }}>{printDetail?.creator}</td>
            <td style={{ padding: '0 8px', textAlign: 'left', width: '25%' }}><Text fontWeight={600}>Mã đơn hàng</Text>
            </td>
            <td style={{ padding: '0 8px', textAlign: 'left', width: '25%' }}>{printDetail?.id}</td>
          </tr>
          <tr style={{ width: '100%' }}>
            <td style={{ padding: '0 8px', textAlign: 'left', width: '20%' }}><Text fontWeight={600}>Địa chỉ</Text></td>
            <td
              style={{ padding: '0 8px', textAlign: 'left', width: '30%' }}>{printDetail?.sender_address || '---'}</td>
            <td style={{ padding: '0 8px', textAlign: 'left', width: '25%' }}><Text fontWeight={600}>Ngày tạo đơn</Text>
            </td>
            <td style={{
              padding: '0 8px',
              textAlign: 'left',
              width: '25%'
            }}>{cellCodeOrderFormatDateTime(printDetail?.dt_created)}</td>
          </tr>
          <tr style={{ width: '100%' }}>
            <td style={{ padding: '0 8px', textAlign: 'left', width: '20%' }}><Text fontWeight={600}>Điện thoại</Text>
            </td>
            <td style={{ padding: '0 8px', textAlign: 'left', width: '30%' }}>{printDetail?.sender_phone || '---'}</td>
            <td style={{ padding: '0 8px', textAlign: 'left', width: '25%' }}><Text fontWeight={600}>Người mua
              hàng</Text></td>
            <td style={{ padding: '0 8px', textAlign: 'left', width: '25%' }}>{printDetail?.customer_name || '---'}</td>
          </tr>
          {
            +printDetail?.has_inventory == 1
              ?
              <>
                <tr style={{ width: '100%' }}>
                  <td style={{ padding: '0 8px', textAlign: 'left', width: '20%' }}><Text fontWeight={600}>Email</Text>
                  </td>
                  <td style={{
                    padding: '0 8px',
                    textAlign: 'left',
                    width: '30%'
                  }}>{printDetail?.sender_email || '---'}</td>
                  <td style={{ padding: '0 8px', textAlign: 'left', width: '25%' }}><Text fontWeight={600}>Kho xuất
                    hàng</Text></td>
                  <td style={{ padding: '0 8px', textAlign: 'left', width: '25%' }}>{printDetail?.warehouse_name}</td>
                </tr>
                <tr style={{ width: '100%' }}>
                  <td style={{ padding: '0 8px', textAlign: 'left', width: '20%' }}><Text fontWeight={600}></Text></td>
                  <td style={{ padding: '0 8px', textAlign: 'left', width: '30%' }}></td>
                  <td style={{ padding: '0 8px', textAlign: 'left', width: '25%' }}><Text fontWeight={600}>Trạng thái
                    đơn
                    hàng</Text></td>
                  <td style={{ padding: '0 8px', textAlign: 'left', width: '25%' }}><Text
                    color={'rgb(26, 148, 255)'}>{printDetail?.shipping_status_name}</Text></td>
                </tr>
              </>
              :
              <>
                <tr style={{ width: '100%' }}>
                  <td style={{ padding: '0 8px', textAlign: 'left', width: '20%' }}><Text fontWeight={600}>Email</Text>
                  </td>
                  <td style={{
                    padding: '0 8px',
                    textAlign: 'left',
                    width: '30%'
                  }}>{printDetail?.sender_email || '---'}</td>
                  <td style={{ padding: '0 8px', textAlign: 'left', width: '25%' }}><Text fontWeight={600}>Trạng thái
                    đơn
                    hàng</Text></td>
                  <td style={{ padding: '0 8px', textAlign: 'left', width: '25%' }}><Text
                    color={'rgb(26, 148, 255)'}>{printDetail?.shipping_status_name}</Text></td>
                </tr>
              </>
          }

          </tbody>
        </table>
        {
          +printDetail?.has_inventory == 1
            ?
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
              {!!printDetail?.order_details && printDetail.order_details.map((item) => (
                <tr style={{ width: '100%' }}>
                  <td style={{
                    border: '1px solid rgb(0, 8, 29)',
                    padding: '8px',
                    textAlign: 'center'
                  }}>{item?.product_model}</td>
                  <td style={{
                    border: '1px solid rgb(0, 8, 29)',
                    padding: '8px',
                    textAlign: 'center'
                  }}>{item?.product_name}</td>
                  <td style={{
                    border: '1px solid rgb(0, 8, 29)',
                    padding: '8px',
                    textAlign: 'center'
                  }}>{item?.unit_name}</td>
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
                  }}>{fNumber(item?.price)}</td>
                  <td
                    style={{
                      border: '1px solid rgb(0, 8, 29)',
                      padding: '8px',
                      textAlign: 'right'
                    }}>{fNumber(item?.discount)}</td>
                  <td style={{
                    border: '1px solid rgb(0, 8, 29)',
                    padding: '8px',
                    textAlign: 'right'
                  }}>{fNumber(item?.total_price)}</td>
                </tr>
              ))
              }
              </tbody>
            </table>
            :
            <div style={{
              marginTop: '32px',
              padding: '6px 8px',
              border: '1px solid #EFF2F8',
              borderRight: 'none',
              borderLeft: 'none'
            }}>
              <Text as={'p'} fontWeight={600} style={{ margin: 0 }}>Nội dung hàng hóa</Text>
              {
                details?.map((detail,index) => (<Text as={'p'} key={index} style={{ margin: 0 }}>{detail}</Text>))
              }
            </div>
        }

        {
          <div style={{ textAlign: 'right', marginTop: '48px' }}>
            <Text fontWeight={600} style={{ marginRight: '48px' }}>Tổng tiền (VNĐ):</Text>
            <Text style={{ marginRight: '8px' }}>{fNumber(printDetail?.total_amount)}</Text>
          </div>
        }
      </div>
    </div>
  )
}

const cellCodeOrderFormatDateTime = dateTimeParam => {
  const dateTimeSplit = dateTimeParam ? dateTimeParam.split(' ') : []
  const ymd = dateTimeSplit[0] ? dateTimeSplit[0].split('-') : []
  const dmy = `${ymd[2] || '--'}/${ymd[1] || '--'}/${ymd[0] || '--'}`
  return `${dmy}`.trim()
}