import {TabContext, TabList, TabPanel} from '@material-ui/lab'
import {memo, useState} from 'react'
import {DetailCustomerTab} from './DetailCustomerTab.jsx'
import {PurchaseHistory} from './PurchaseHistory.jsx'
import {CUSTOMER_DETAIL_TAB} from '../../_constants'
import './index.scss'

const {TableRow, TableCell, Collapse, Box, Tab} = require('@material-ui/core')

export function Detail({hasOneRow, openDetail, customer}) {
  const [valueTabs, setValueTabs] = useState(
    CUSTOMER_DETAIL_TAB.customer_detail,
  )
  const handleChange = (event, newValue) => {
    setValueTabs(newValue)
  }
  return (
    <TableRow className="content-detail">
      <TableCell style={{padding: 0}} colSpan={12}>
        <div className="bd-green">
          <Collapse in={openDetail || hasOneRow} timeout="auto" unmountOnExit>
            <TabContext value={valueTabs}>
              <Box
                sx={{borderBottom: 1, borderColor: 'divider'}}
                className="header-tabs"
              >
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                  indicatorColor="none"
                >
                  <Tab
                    label="Chi tiết khách hàng"
                    value={CUSTOMER_DETAIL_TAB.customer_detail}
                    className="tab-detail"
                  />
                  <Tab
                    label="Lịch sử mua hàng"
                    value={CUSTOMER_DETAIL_TAB.purchase_history}
                    className="tab-detail-time"
                  />
                </TabList>
              </Box>
              <TabPanel value={CUSTOMER_DETAIL_TAB.customer_detail}>
                <DetailCustomerTab customer={customer} hasOneRow={hasOneRow}/>
              </TabPanel>
              <TabPanel value={CUSTOMER_DETAIL_TAB.purchase_history}>
                <PurchaseHistory customerId={customer.id}/>
              </TabPanel>
            </TabContext>
          </Collapse>
        </div>
      </TableCell>
    </TableRow>
  )
}

export default memo(Detail)
