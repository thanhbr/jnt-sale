import React from 'react'
import { Grid } from '@mui/material'
import { Text } from '../../../../../common/text'
import { ContactList } from './_contactList'
import { Button } from '../../../../../common/button'
import { POS_ICON } from '../../../constants/icons'
import { usePosCustomer } from '../../../hooks/usePosCustomer'
import { AddCustomerModal } from '../../../component/modal/customer/addCustomerModal'
import { Input } from './_input'
import { Tooltip } from '../../../../../common/tooltip'
import usePosPayment from '../../../hooks/usePosPayment'

const Customer = ({ active, ...props }) => {
  const { customer, methods, customerActive, orderHasSent } = usePosCustomer()
  const { activeOrderCustomer } = usePosPayment()
  return (
    <Grid xs={12} sm={12} md={12} lg={12} item
          style={{ opacity: !!active ? 1 : 0, position: !!active ? '' : 'absolute' }}>
      <div style={{ display: 'flex', marginBottom: 16, position: 'relative' }}>
        <Input
          className={'input-customer'}
          {...props}
          dropdown={activeOrderCustomer.tab !== 'guest' ? ({ onClose }) => (
              <ContactList
                data={customer?.list}
                onClose={onClose}
                onSelect={customer.onItemChange}
              />
            )
            : false
          }
          placeholder="Nhập số điện thoại/Tên khách hàng"
          validateText={(!!customerActive?.data && !!!customerActive?.data?.id && orderHasSent) && '  '}
          validateType="danger"
          value={customer.keyword}
          // onBlur={handleBlur}
          onChange={e => customer.onSearch(e.target.value)}
          dropdownProps={{
            canLoadMore: !customer.loadingMore,
            onLoadMore: customer.onLoadMore,
          }}
          refType={'customer'}
          style={{ flex: 1, marginRight: 10, height: 40, background: 'transparent' }}
        />

        <Text style={{ position: 'absolute', right: 60, top: 8 }}>{POS_ICON.ct_searchMD}</Text>
        <Tooltip title={'Thêm mới khách hàng'}>
          <Button className={'btn__create-customer'} style={{ width: 40, height: 40, padding: '8px 0' }}
                  onClick={() => methods.onDisplayCreate(true)}>
            {POS_ICON.plus}
          </Button>
        </Tooltip>
        <AddCustomerModal/>
      </div>
    </Grid>
  )
}

export default Customer