import {Modal, Skeleton} from '@mui/material'
import {sendRequestAuth} from 'api/api'
import {Button} from 'common/button'
import {Input} from 'common/form/input'
import {Textarea} from 'common/form/textarea'
import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {Tooltip} from 'common/tooltip'
import config from 'config'
import useAlert from 'hook/useAlert'
import {useEffect, useState, useContext} from 'react'
import styled from 'styled-components'
import useFacebookConversationTags from '../../../hooks/useFacebookConversationTags'
import { FacebookConversationContext } from '../../../provider/_context'

export const ReportCustomerModal = ({openModal, closeModal, data, tags, ...props}) => {

  const [tab, setTab] = useState(data?.mode === 'view' ? 'list' : 'form') 
  const [reportContent, setReportContent] = useState('')
  const [reportList, setReportList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {showAlert} = useAlert()
  const { state, dispatch } = useContext(FacebookConversationContext)
  const { methods } = useFacebookConversationTags()

  const canSubmit = !!reportContent.trim()
  const handleSubmit = async () => {
    setIsSubmitting(true)
    const response = await sendRequestAuth(
      'post',
      `${config.API}/order/customer/report/add`,
      JSON.stringify({
        content: reportContent,
        customer_name: data.customer_name,
        customer_phone: data.customer_mobile,
      }),
    )

    if (!!response?.data?.success) {
      methods.handleTagsAction(tags)
      showAlert({content: 'Gửi báo xấu thành công', type: 'success'})
      handleCustomerReportStatus(data.customer_mobile)
      
      setIsSubmitting(false)

      if (closeModal) closeModal()
    } else showAlert({content: 'Gửi báo xấu thất bại', type: 'danger'})
  }
  const handleCustomerReportStatus = async (phone) => {
    const response = await sendRequestAuth(
      'post',
      `${config.API}/order/customer/report`,
      JSON.stringify({phone: [phone]}),
    )
    if (!!response?.data?.success && Array.isArray(response?.data?.data)) {
      dispatch({
        type: 'SET_CUSTOMER_TOTAL_REPORTS',
        payload:  response.data.data.length > 0 ? response.data.data[0].totals : 0
      })
      dispatch({
        type: 'SET_LIST_REPORT',
        payload:  response.data.data.length > 0 ? response.data.data : []
      })
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const response = await sendRequestAuth(
        'get',
        `${config.API}/order/customer/report/detail?phone=${data.customer_mobile}`,
      )

      if (!!response?.data?.success) {
        setReportList(
          Array.isArray(response?.data?.data) ? response.data.data : [],
        )
      }
      setIsLoading(false)
    }

    if (data?.customer_mobile) fetchData()
  }, [data?.customer_mobile])

  return (
    <Modal open={openModal}
    onClose={closeModal}>
    <StyledReportCustomerModal>
      <div
        className="fb-table-facebook__report-customer-modal__container"
      >
        <div className="fb-table-facebook__report-customer-modal__header">
          <Text as="h2" fontSize={19} lineHeight={28}>
          {data?.mode !== 'view'
              ? 'Báo xấu khách hàng'
              : 'Lịch sử báo xấu khách hàng'}
          </Text>
        </div>
        <div className="fb-table-facebook__report-customer-modal__body">
          {data?.mode !== 'view' && (
            <div className="fb-table-facebook__report-customer-modal__tabs">
              <div
                className="fb-table-facebook__report-customer-modal__tab-item"
                data-active={tab === 'form'}
                onClick={() => tab !== 'form' && setTab('form')}
              >
                Báo xấu khách hàng
              </div>
              {reportList.length > 0 ? (
                <div
                  className="fb-table-facebook__report-customer-modal__tab-item"
                  data-active={tab === 'list'}
                  onClick={() => tab !== 'list' && setTab('list')}
                >
                  Thông tin báo xấu
                </div>
              ) : (
                <div className="fb-table-facebook__report-customer-modal__tab-item">
                  <Tooltip placement="bottom" title="Chưa có thông tin báo xấu">
                    <span>Thông tin báo xấu</span>
                  </Tooltip>
                </div>
             )} 
            </div>
          )}
          {tab === 'form' && (
            <TabForm
              data={data}
              content={reportContent}
              onContentChange={setReportContent}
            />
          )}
          {tab === 'list' && <TabList list={reportList} loading={isLoading} />}
        </div>
        <div className="fb-table-facebook__report-customer-modal__footer">
          <Button
            size="sm"
            appearance="ghost"
            style={{minWidth: 110}}
            onClick={closeModal}
          >
            Đóng
          </Button>
          {data?.mode !== 'view' && (
            <Button
              disabled={!canSubmit || isSubmitting}
              size="sm"
              style={{minWidth: 110, marginLeft: 8}}
              onClick={() => canSubmit && handleSubmit()}
            >
              Gửi báo xấu
            </Button>
          )}
        </div>
      </div>
    </StyledReportCustomerModal>
    </Modal>
  )
}

const TabForm = ({data, content, onContentChange, ...props}) => {
  
  return (
    <div className="fb-table-facebook__report-customer-modal__tab-form">
      <div className="fb-table-facebook__report-customer-modal__input-group">
        <Input
          className="fb-table-facebook__report-customer-modal__input-item"
          label="Tên khách hàng"
          disabled={true}
          value={data?.customer_name}
        />
        <Input
          className="fb-table-facebook__report-customer-modal__input-item"
          label="Số điện thoại"
          disabled={data.customer_mobile ? true : false}
          value={data.customer_mobile}
        />
        <Textarea
          className="fb-table-facebook__report-customer-modal__textarea-item"
          label={
            <>
              Nội dung <span style={{color: THEME_SEMANTICS.failed}}>*</span>
            </>
          }
          placeholder="Nhập nội dung báo xấu khách hàng"
          value={content}
          onChange={e => onContentChange(e.target.value)}
        />
      </div>
    </div>
  )
}
const TabList = ({list, loading}) => {
  return (
    <div className="fb-table-facebook__report-customer-modal__tab-list">
      <div className="fb-table-facebook__report-customer-modal__table">
        <div className="fb-table-facebook__report-customer-modal__thead">
          <div className="fb-table-facebook__report-customer-modal__tr">
            <div className="fb-table-facebook__report-customer-modal__th">
              Shop cảnh báo
            </div>
            <div className="fb-table-facebook__report-customer-modal__th">
              Ngày báo cáo
            </div>
            <div className="fb-table-facebook__report-customer-modal__th">
              Nội dung cảnh báo
            </div>
          </div>
        </div>
        <div className="fb-table-facebook__report-customer-modal__tbody">
          {loading
            ? Array.from(Array(2), (e, i) => <ReportListPlaceholder key={i} />)
            : list.map((item, i) => (
                <div key={i} className="fb-table-facebook__report-customer-modal__tr">
                  <div className="fb-table-facebook__report-customer-modal__td">
                    {item?.shop || '---'}
                  </div>
                  <div className="fb-table-facebook__report-customer-modal__td">
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
                  <div className="fb-table-facebook__report-customer-modal__td">
                    <Tooltip placement="left" title={item?.content}>
                      <div className="--ellipsis" style={{textAlign: 'right'}}>
                        {item?.content}
                      </div>
                    </Tooltip>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  )
}
const StyledReportCustomerModal = styled.div`
position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

.fb-table-facebook__report-customer-modal {
  &__container {
    width: 600px;
    padding: 24px;

    background: #ffffff;
    border-radius: 8px;
    box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
  }

  &__header {
    margin-bottom: 16px;
  }

  &__tabs {
    margin-bottom: 24px;

    display: flex;
  }

  &__tab-item {
    height: 32px;
    margin-right: 24px;

    border-bottom: 1px solid transparent;

    transition: border 0.25s;

    color: ${THEME_COLORS.secondary_100};
    font-size: 13px;
    line-height: 32px;

    cursor: pointer;

    &[data-active='true'] {
      border-color: ${THEME_COLORS.primary_300};

      cursor: default;
    }
  }

  &__input-group {
    width: calc(100% + 24px);
    margin: 0 -12px;

    display: flex;
    flex-wrap: wrap;
  }

  &__input-item {
    width: calc(50% - 24px);
    margin: 0 12px 24px 12px;
  }

  &__textarea-item {
    width: calc(100% - 24px);
    margin: 0 12px 24px 12px;
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
  }

  &__tab-list {
    margin-bottom: 32px;
  }

  &__table {
    position: relative;
    max-height: 200px;

    overflow: auto;

    border: 1px solid #e2eaf8;
    border-radius: 8px;
  }

  &__thead {
    position: sticky;
    top: 0;

    background: #f7f9fd;
  }

  &__tr {
    display: flex;
  }

  &__th {
    min-height: 44px;
    padding: 12px;

    color: ${THEME_COLORS.secondary_100};
    font-size: 13px;
    font-weight: 600;
    line-height: 20px;

    &:nth-child(1) {
      padding-left: 24px;

      flex: 1;
    }

    &:nth-child(2) {
      width: 125px;
    }

    &:nth-child(3) {
      padding-right: 24px;

      flex: 1;

      text-align: right;
    }
  }

  &__td {
    min-height: 56px;
    padding: 18px 12px;

    display: flex;
    align-items: center;

    border-top: 1px solid #e2eaf8;

    color: ${THEME_COLORS.secondary_100};
    font-size: 13px;
    line-height: 20px;

    &:nth-child(1) {
      padding-left: 24px;

      flex: 1;
    }

    &:nth-child(2) {
      width: 125px;
    }

    &:nth-child(3) {
      padding-right: 24px;

      flex: 1;

      justify-content: flex-end;
    }

    .--ellipsis {
      max-width: 100%;
      max-height: 40px;

      display: -webkit-box;
      overflow: hidden;

      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
  }
}
`
