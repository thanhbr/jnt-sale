import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core'
import { Text } from 'common/text'
import { THEME_COLORS } from 'common/theme/_colors'
import { THEME_SEMANTICS } from 'common/theme/_semantics'
import useRow from 'Pages/ForControlCOD/Tab2/hooks/useRow'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {useTranslation} from "react-i18next";

export const RowTabDetailOrder = ({data, arrDetail, ...props}) => {
  const {row, cell} = useRow(data)
  const totalOrderQty = data?.order_detail?.reduce((prev, curr) => ({
    ...curr,
    quantity: parseInt(prev.quantity, 10) + parseInt(curr.quantity, 10),
  })).quantity
  const { t } = useTranslation()

  return (
    <StyledRowTabShipping {...props}>
      <div className="flex ">
        <div style={{marginBottom: 16}}>
          <Text
            color={THEME_COLORS.secondary_300}
            fontSize={16}
            fontWeight={600}
            lineHeight={22}
            style={{marginRight: 8, marginBottom: 8, display: 'block'}}
          >
            {t("order_information")}
          </Text>
          <Text
            color={THEME_COLORS.secondary_100}
            fontSize={14}
            fontWeight={600}
            lineHeight={22}
            style={{marginRight: 8, marginBottom: 16}}
          >
            {t("reference_order_id")}:
          </Text>
          <Text
            color={THEME_SEMANTICS.delivering}
            fontSize={14}
            fontWeight={600}
            lineHeight={22}
            style={{marginRight: '4.5rem', cursor: 'pointer'}}
          >
            <Link to={`/orders?search=${data?.order_id}`} target="_blank" className='tab-detail-order__link-hover'>{data?.order_id || '---'}</Link>
          </Text>
          {/* {!!data?.customer_id && (
          <Tooltip title="Sao chép mã vận đơn">
            <i style={{cursor: 'pointer'}} onClick={row.onCopyOrderCode}>
              {ForControlCOD_ICONS.copy03_x}
            </i>
          </Tooltip>
        )} */}
          <Text
            color={THEME_COLORS.secondary_100}
            fontSize={14}
            fontWeight={600}
            lineHeight={22}
            style={{marginRight: 8, marginBottom: 16}}
          >
            {t("unique_order_id")}:
          </Text>
          <Text
            color={THEME_SEMANTICS.secondary_100}
            fontSize={14}
            fontWeight={400}
            lineHeight={22}
            style={{marginRight: 8}}
          >
            {data?.order_code_of_shop || '---'}
          </Text>
        </div>
      </div>

      <Text
        color={THEME_COLORS.secondary_100}
        fontSize={16}
        fontWeight={600}
        lineHeight={22}
        style={{marginRight: 8}}
      >
        {t("product_info")}
      </Text>
      <Text color={THEME_COLORS.secondary_100} fontSize={14} lineHeight={20}>
        {Array.isArray(data?.order_detail)
          ? `(Tổng số lượng: ${totalOrderQty})`
          : ''}
      </Text>

      {!arrDetail && (
        <div className="row-tab-detail__inventory">
          <Text color={THEME_COLORS.secondary_100}
            fontSize={14}
            fontWeight={400}
            lineHeight={20}
          >
          {data?.item_details.map(x => x + ' ') || '---'}
          </Text>
        </div>
      )}
      {data?.order_detail?.length > 0 && (
        <div className="for-controlCOD-table__tab-detail-delivery">
          <TableContainer component={Paper}>
            <Table sx={{minWidth: 700}} aria-label="">
              <TableHead className="for-controlCOD-table__details-head">
                <TableRow>
                  <TableCell className="pd-id-details">
                    {t("product_sku")}
                  </TableCell>
                  <TableCell className="pd-name" align="left">
                    {t("product_page_product_name")}
                  </TableCell>
                  <TableCell className="unit-name" align="left">
                    {t("report__unit")}
                  </TableCell>
                  <TableCell className="quantity" align="left">
                    {t("quantity")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="for-controlCOD-table__details-body">
                {data?.order_detail?.map(item => (
                  <TableRow>
                    <TableCell>{item.product_model}</TableCell>
                    <TableCell>
                      <p className="pd-name-data">{item.product_name}</p>
                    </TableCell>
                    <TableCell align="left">{item.unit_name}</TableCell>
                    <TableCell align="left">{item.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </StyledRowTabShipping>
  )
}

const StyledRowTabShipping = styled.div`
  position: relative;
  .row-tab-detail__inventory {
    font-weight: 400;
    font-size: 14px;
    line-height: 140%;
    color: #00081d;

    margin-top: 1.375rem;
    padding-bottom: 0.625rem;

    background: #ffffff;
    border-bottom: 1px solid #e2eaf8;
  }

  .tab-detail-order__link-hover{
    color: #1A94FF;
    &:hover{
      color: #1373DB;
    }
  }
`
