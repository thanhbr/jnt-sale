import useFilterReportInventory from "../hooks/useFilterReportInventory";
import React from "react";
import {fNumber} from "../../../../../../util/formatNumber";

export const Template = () => {
  const {panels, displayList} = useFilterReportInventory()

  return (
    <div style={{display: 'none'}}>
      <div id={'print-report-inventory'}>
        <div style={{textAlign: 'center', fontWeight: 600, fontSize: 18, marginBottom: 24}}>Báo cáo tồn kho</div>
        <div style={{display: 'flex'}}>
          <div style={{borderRadius: 4, border: '1px solid #7C88A6', width: '50%', height: 70, marginRight: 16, padding: '2px 24px', lineHeight: 1}}>
            <p style={{fontWeight: 500}}>SỐ LƯỢNG TỒN KHO</p>
            <p style={{fontWeight: 600, marginTop: -8}}>{fNumber(panels?.totalQuantity)}</p>
          </div>
          <div style={{borderRadius: 4, border: '1px solid #7C88A6', width: '50%', height: 70, padding: '2px 24px', lineHeight: 1}}>
            <p style={{fontWeight: 500}}>GIÁ TRỊ TỒN KHO</p>
            <p style={{fontWeight: 600, marginTop: -8}}>{fNumber(panels?.totalAmount)}</p>
          </div>
        </div>
        <div style={{marginTop: 24}}>
          <table style={{ borderCollapse: 'collapse', pageBreakInside: 'auto', width: '100%' }}>
            <thead style={{ width: '100%', display: 'table-header-group' }}>
              <tr style={{border: '1px solid #7C88A6', borderBottom: 'none', display: 'flex', pageBreakInside: 'avoid', pageBreakAfter: 'auto'}}>
                <th style={{fontWeight: 600, borderRight: '1px solid #7C88A6', width: '5%', height: 50, display: 'flex', fontSize: 14}}>
                  <div style={{margin: 'auto'}}>
                    STT
                  </div>
                </th>
                <th style={{fontWeight: 600, borderRight: '1px solid #7C88A6', width: '25%', height: 50, display: 'flex', fontSize: 14}}>
                  <div style={{margin: 'auto'}}>
                    Tên sản phẩm
                  </div>
                </th>
                <th style={{fontWeight: 600, borderRight: '1px solid #7C88A6', width: '15%', height: 50, display: 'flex', fontSize: 14}}>
                  <div style={{margin: 'auto'}}>
                    Mã sản phẩm/ SKU
                  </div>
                </th>
                <th style={{fontWeight: 600, borderRight: '1px solid #7C88A6', width: '15%', height: 50, display: 'flex', fontSize: 14}}>
                  <div style={{margin: 'auto'}}>
                    Danh mục sản phẩm
                  </div>
                </th>
                <th style={{fontWeight: 600, borderRight: '1px solid #7C88A6', width: '15%', height: 50, textAlign: 'end', fontSize: 14}}>
                  <div style={{margin: '16px 4px 0 0'}}>
                    Giá vốn (VNĐ)
                  </div>
                </th>
                <th style={{fontWeight: 600, borderRight: '1px solid #7C88A6', width: '10%', height: 50, textAlign: 'end', fontSize: 14}}>
                  <div style={{marginTop: 8}}>
                    Số lượng tồn kho
                  </div>
                </th>
                <th style={{fontWeight: 600, width: '15%', height: 50, textAlign: 'end', fontSize: 14}}>
                  <div style={{margin: '8px 4px 0 0'}}>
                    Giá trị tồn kho (VNĐ)
                  </div>
                </th>
              </tr>
            </thead>
            <tbody style={{ width: '100%' }}>
              {displayList?.list?.map((item, index) => (
                <tr key={item?.id} style={{border: '1px solid #7C88A6', borderBottom: 'none',display: 'flex', pageBreakInside: 'avoid', pageBreakAfter: 'auto'}}>
                  <td style={{borderRight: '1px solid #7C88A6', width: '5%', minHeight: 50, textAlign: 'center'}}>
                    <div style={{marginTop: 8}}>
                      {index + 1}
                    </div>
                  </td>
                  <td style={{borderRight: '1px solid #7C88A6', width: '25%', minHeight: 50}}>
                    <div style={{margin: '8px 0 8px 8px', overflow: 'hidden', wordBreak: 'break-all'}}>
                      <span>{item?.product_name}</span>
                    </div>
                  </td>
                  <td style={{borderRight: '1px solid #7C88A6', width: '15%', minHeight: 50}}>
                    <div style={{margin: '8px 0 8px 8px', overflow: 'hidden', wordBreak: 'break-all'}}>
                      <span>{item?.sku}</span>
                    </div>
                  </td>
                  <td style={{borderRight: '1px solid #7C88A6', width: '15%', minHeight: 50}}>
                    <div style={{margin: '8px 0 8px 8px', overflow: 'hidden', wordBreak: 'break-all'}}>
                      <span>{item?.category_name}</span>
                    </div>
                  </td>
                  <td style={{borderRight: '1px solid #7C88A6', width: '15%', minHeight: 50, textAlign: 'end'}}>
                    <div style={{margin: '8px 4px 8px 0', overflow: 'hidden', wordBreak: 'break-all'}}>
                      <span>{fNumber(item?.cost_price)}</span>
                    </div>
                  </td>
                  <td style={{borderRight: '1px solid #7C88A6', width: '10%', minHeight: 50, textAlign: 'end'}}>
                    <div style={{margin: '8px 4px 8px 0', overflow: 'hidden', wordBreak: 'break-all'}}>
                      <span>{item?.warehouse_quantity}</span>
                    </div>
                  </td>
                  <td style={{width: '15%', height: 50, textAlign: 'end'}}>
                    <div style={{margin: '8px 2px 8px 0', overflow: 'hidden', wordBreak: 'break-all'}}>
                      <span>{fNumber((+item?.cost_price || 0) * (+item?.warehouse_quantity || 0))}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{borderTop: '1px solid #7C88A6'}}></div>
        </div>
      </div>
    </div>
  )
}

export default Template

