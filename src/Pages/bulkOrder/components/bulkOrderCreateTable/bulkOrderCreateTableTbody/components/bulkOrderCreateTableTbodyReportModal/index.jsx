import {Skeleton} from '@mui/material'
import {sendRequestAuth} from 'api/api'
import {Button} from 'common/button'
import {Text} from 'common/text'
import {Tooltip} from 'common/tooltip'
import config from 'config'
import {useEffect, useState} from 'react'
import {StyledBulkOrderCreateTableTbodyReportModal} from './_styled'

export const BulkOrderCreateTableTbodyReportModal = ({data, ...props}) => {
  const [reportList, setReportList] = useState([])

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const response = await sendRequestAuth(
        'get',
        `${config.API}/order/customer/report/detail?phone=${data.customer.phone}`,
      )

      if (!!response?.data?.success) {
        setReportList(
          Array.isArray(response?.data?.data) ? response.data.data : [],
        )
      }
      setIsLoading(false)
    }

    if (data?.customer?.phone) fetchData()
  }, [data?.customer?.phone])

  return (
    <StyledBulkOrderCreateTableTbodyReportModal
      {...props}
      onClick={data?.onClose}
    >
      <div
        className="bulk-order-create-table-tbody-report-modal__container"
        onClick={e => e.stopPropagation()}
      >
        <div className="bulk-order-create-table-tbody-report-modal__header">
          <Text as="h2" fontSize={20} lineHeight={28}>
            Lịch sử báo xấu khách hàng
          </Text>
        </div>
        <div className="bulk-order-create-table-tbody-report-modal__body">
          <div className="bulk-order-create-table-tbody-report-modal__tab-list">
            <div className="bulk-order-create-table-tbody-report-modal__table">
              <div className="bulk-order-create-table-tbody-report-modal__thead">
                <div className="bulk-order-create-table-tbody-report-modal__tr">
                  <div className="bulk-order-create-table-tbody-report-modal__th">
                    Shop cảnh báo
                  </div>
                  <div className="bulk-order-create-table-tbody-report-modal__th">
                    Ngày báo cáo
                  </div>
                  <div className="bulk-order-create-table-tbody-report-modal__th">
                    Nội dung cảnh báo
                  </div>
                </div>
              </div>
              <div className="bulk-order-create-table-tbody-report-modal__tbody">
                {isLoading
                  ? Array.from(Array(2), (e, i) => (
                      <ReportListPlaceholder key={i} />
                    ))
                  : reportList.map((item, i) => (
                      <div
                        key={i}
                        className="bulk-order-create-table-tbody-report-modal__tr"
                      >
                        <div className="bulk-order-create-table-tbody-report-modal__td">
                          {item?.shop || '---'}
                        </div>
                        <div className="bulk-order-create-table-tbody-report-modal__td">
                          {item?.dt_created
                            ? item.dt_created.split(' ')[0]
                              ? item.dt_created
                                  .split(' ')[0]
                                  .split('-')
                                  .reverse()
                                  .join('/')
                              : '---'
                            : '---'}
                        </div>
                        <div className="bulk-order-create-table-tbody-report-modal__td">
                          <Tooltip placement="left" title={item?.content}>
                            <div
                              className="--ellipsis"
                              style={{textAlign: 'right'}}
                            >
                              {item?.content}
                            </div>
                          </Tooltip>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
        <div className="bulk-order-create-table-tbody-report-modal__footer">
          <Button
            size="sm"
            appearance="ghost"
            style={{minWidth: 110}}
            onClick={data?.onClose}
          >
            Đóng
          </Button>
        </div>
      </div>
    </StyledBulkOrderCreateTableTbodyReportModal>
  )
}

const ReportListPlaceholder = ({...props}) => {
  return (
    <div {...props} className="bulk-order-create-table-tbody-report-modal__tr">
      {Array.from(Array(3), (e, i) => (
        <div key={i} className="bulk-order-create-table-tbody-report-modal__td">
          <Skeleton
            sx={{
              width: '100%',
              height: 33,
              background:
                'linear-gradient(0deg, rgba(244, 247, 252, 0.98), rgba(244, 247, 252, 0.98)), #00081D;',
            }}
          />
        </div>
      ))}
    </div>
  )
}
