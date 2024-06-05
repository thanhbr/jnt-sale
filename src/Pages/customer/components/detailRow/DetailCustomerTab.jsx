import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'
import { sendRequestAuth } from 'api/api'
import { Tooltip as TooltipV1 } from 'common/tooltip'
import { Tooltip } from 'common/tooltipv2'
import config from 'config'
import { CustomerContext } from 'Pages/customer'

import React, { useContext, useEffect } from 'react'
import {Text} from "../../../../common/text";

export const DetailCustomerTab = ({customer, hasOneRow}) => {
  const {state, dispatch} = useContext(CustomerContext)
  const {infoUser} = state
  useEffect(() => {
    const fetchData = async () => {
      const response = await sendRequestAuth('get', `${config.API}/customer/detail/${customer.id}`)
      if(response.data && response.data.success) {
        dispatch({type: 'SET_INFO_USER', payload: response.data.data})
      }
    }
    fetchData()
  }, [hasOneRow])

  return (
    <Grid container xs={12} sm={12} md={12}>
      <Grid sm={4} md={4} lg={4}>
        <label className="text-base font-bold pb-3 dc-tab-title">
          Thông tin khách hàng
        </label>
        <Grid sm={12} md={12} lg={12} className="dc-tab-flex">
          <Grid className="info-label" sm={6} md={6} lg={6}>
            <p className='title'>Tên khách hàng</p>
            <Tooltip placement="top-center" title={infoUser.customer_name} baseOn={'height'}>
              <span className="info-content">{infoUser.customer_name}</span>
            </Tooltip>
            <p className='title'>Giới tính</p>
            <p className="info-content">
              {infoUser.customer_sex === '1'
                ? 'Nam'
                : infoUser.customer_sex === '2'
                ? 'Nữ'
                : '---'}
            </p>
          </Grid>
        </Grid>
      </Grid>
      <Grid sm={4} md={4} lg={4}>
        <label className="text-base font-bold pb-3 dc-tab-title">
          Thông tin liên lạc
        </label>
        <Grid sm={12} md={12} lg={12} className="dc-tab-flex">
          <Grid className="info-label" sm={6} md={6} lg={6}>
            <p className='title'>Email</p>
            <p className="info-content">{infoUser?.customer_email|| '---'}</p>
            <p className='title'>Số điện thoại</p>
            <p className="info-content">{infoUser?.customer_mobile|| '---'}</p>
          </Grid>
        </Grid>
      </Grid>
      <Grid sm={3} md={4} lg={4}>
        <label className="text-base font-bold pb-3 dc-tab-title">
          Nhóm khách hàng
        </label>

        <Grid sm={12} md={12} lg={12} className="dc-tab-flex">
          <Grid className="info-label" sm={6} md={6} lg={6}>
            <p className='title'>Nhóm khách hàng</p>
            <p className="info-content">{infoUser?.group_name|| '---'}</p>
            <p className='title'>Chính sách giá</p>
            <p className="info-content">{infoUser?.price_policy|| '---'}</p>
          </Grid>
        </Grid>
      </Grid>
      <p className="title-address">Địa chỉ</p>
      <div className="table-address-customer">
        <TableContainer component={Paper}>
          <Table sx={{minWidth: 700}} aria-label="">
            <TableHead className='table-header'>
              <TableRow>
                <TableCell className="details-street">
                  Số nhà, tên đường
                </TableCell>
                <TableCell className="details-ward" align="left">
                  Phường/Xã
                </TableCell>
                <TableCell className="details-district" align="left">
                  Quận/Huyện
                </TableCell>
                <TableCell className="details-city" align="left">
                  Tỉnh/Thành Phố
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="info-address-customer">
              <TableRow>
                <TableCell className="details-street">
                  {!!!infoUser?.customer_short_address
                    ? '---'
                    : infoUser?.customer_short_address?.length < 60
                      ? infoUser?.customer_short_address || '---'
                      : <TooltipV1 placement="bottom-start"
                                   title={infoUser?.customer_short_address}
                      >
                        {infoUser?.customer_short_address?.substring(0, 60)+'...'}
                      </TooltipV1>
                  }
                </TableCell>
                <TableCell className="details-ward" align="left">
                  <p className="pd-name">{infoUser?.ward_name || '---'}</p>
                </TableCell>
                <TableCell className="details-district" align="left">{infoUser?.district_name || '---'}</TableCell>
                <TableCell className="details-city" align="left">{infoUser?.city_name || '---'}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        {!!infoUser?.customer_notes &&
        <div style={{marginTop: 12}}>
          <Text fontWeight={600}>Ghi chú khách hàng: </Text>
          <Text>{infoUser?.customer_notes}</Text>
        </div>
        }
      </div>
    </Grid>
  )
}
