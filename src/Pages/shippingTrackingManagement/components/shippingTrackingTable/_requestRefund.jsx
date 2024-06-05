import { Button } from 'common/button'
import { Text } from 'common/text'
import styled from 'styled-components'
import { Input } from '../../../../common/form/input'
import React from 'react'
import { Textarea } from '../../../../common/form/textarea'
import useSolvingProblem from '../../hooks/useSolvingProblem'
import useAlert from '../../../../hook/useAlert'
import { Checkbox } from '../../../../common/form/checkbox'
import { CategoryDatePicker } from '../../../../common/form/datePicker'

export const UpdateRequestRefund = ({ data, onClose, onSubmit, ...props }) => {

  const { showAlert } = useAlert()
  const { funcs, dataForm, pageData } = useSolvingProblem(onClose)
  const handleChange = (value) => {
    funcs.onChangeContentHandle(value)
  }
  return (
    <StyledRequestRefundModal {...props}>
      <div
        className="delivery-manager-table__update-status-failed-modal__container"
        onClick={e => e.stopPropagation()}
      >
        <div className="header-refund" style={{ marginBottom: 24 }}>
          <Text as="h2" fontSize={20} lineHeight={28}>
            Ghi nhận nội dung xử lý với khách
          </Text>
          <Text className={'header-billcode'}
                as="p" fontWeight={600}
                style={{ display: 'flex', alignItems: 'center' }}
                onClick={() => {
                  navigator.clipboard.writeText(data?.billcode)
                  showAlert({ content: 'Đã sao chép mã vận đơn', type: 'success', duration: 1000 })
                }
                }
          >
            Vận đơn &nbsp;
            <Text color={'#1A94FF'} fontWeight={600}>
              {data?.billcode ? `#${data?.billcode}` : ''} &nbsp;

            </Text>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_6827_313410)">
                <path
                  d="M5.3335 5.33301V3.46634C5.3335 2.7196 5.3335 2.34624 5.47882 2.06102C5.60665 1.81014 5.81063 1.60616 6.06151 1.47833C6.34672 1.33301 6.72009 1.33301 7.46683 1.33301H12.5335C13.2802 1.33301 13.6536 1.33301 13.9388 1.47833C14.1897 1.60616 14.3937 1.81014 14.5215 2.06102C14.6668 2.34624 14.6668 2.7196 14.6668 3.46634V8.53301C14.6668 9.27974 14.6668 9.65311 14.5215 9.93833C14.3937 10.1892 14.1897 10.3932 13.9388 10.521C13.6536 10.6663 13.2802 10.6663 12.5335 10.6663H10.6668M3.46683 14.6663H8.5335C9.28023 14.6663 9.6536 14.6663 9.93882 14.521C10.1897 14.3932 10.3937 14.1892 10.5215 13.9383C10.6668 13.6531 10.6668 13.2797 10.6668 12.533V7.46634C10.6668 6.7196 10.6668 6.34624 10.5215 6.06102C10.3937 5.81014 10.1897 5.60616 9.93882 5.47833C9.6536 5.33301 9.28023 5.33301 8.5335 5.33301H3.46683C2.72009 5.33301 2.34672 5.33301 2.06151 5.47833C1.81063 5.60616 1.60665 5.81014 1.47882 6.06102C1.3335 6.34624 1.3335 6.7196 1.3335 7.46634V12.533C1.3335 13.2797 1.3335 13.6531 1.47882 13.9383C1.60665 14.1892 1.81063 14.3932 2.06151 14.521C2.34672 14.6663 2.72009 14.6663 3.46683 14.6663Z"
                  stroke="#1A94FF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </g>
              <defs>
                <clipPath id="clip0_6827_313410">
                  <rect width="16" height="16" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </Text>
        </div>
        <div className="content-refund">
          <div className="customer-info flex">
            <Input
              label={
                <>
                  Khách hàng
                </>
              }
              value={data?.customer_name}
              disabled={true}
              style={{ marginRight: '1.5rem', width: '264px' }}
            />
            <Input
              label={
                <>
                  Số điện thoại
                </>
              }
              value={data?.customer_mobile}
              disabled={true}
              style={{ width: '264px' }}
            />
          </div>
          <div className={'customer-content-handle'}>
            <Textarea
              className={'textarea-delivery__note'}
              label={'Nội dung đã xử lý với khách hàng'}
              placeholder='Nhập Nội dung đã xử lý với khách hàng'
              {...props}
              value={dataForm.solvingContent?.note || ''}
              defaultValue={dataForm.solvingContent?.note}
              onChange={(e) => handleChange(e.target.value)}
              maxLength="256"
              style={{ resize: 'none' }}
              validateText={dataForm.solvingContent?.note?.length == 256 ? 'Nội dung đã xử lý với khách hàng không được vượt quá 255 ký tự' : ''}
              validateType={'danger'}
            ></Textarea>
          </div>
          <div className={'request-content-handle'}>
            <div className="request-content-handle__title" onClick={dataForm?.solvingContent?.problem_solving_action ? () => {} : funcs.handleShowSolvingContent} style={{cursor: 'pointer'}}>
              <Checkbox
                checked={dataForm?.solvingContent.solvingAction?.show || dataForm?.solvingContent?.problem_solving_action}
                disabled={dataForm?.solvingContent?.problem_solving_action}
                style={{ marginRight: '9px' }}/>
              <Text>Đề nghị giao lại (chỉ được gửi đề nghị 1 lần)</Text>
            </div>
            {(dataForm.solvingContent.solvingAction?.show || dataForm?.solvingContent?.problem_solving_action) &&
            <div className="content-request">
              <div className="content-request__item" style={{ alignItems: 'center', marginBottom: '24px' }}>
                <Text className={'content-request__item-label'}>Thời gian giao lại <Text color={'red'}>*</Text></Text>
                <div style={{ width: '71%', position: 'relative' }}>
                  <CategoryDatePicker onChange={funcs?.handleDateTimeSolving}
                                      onTab={false}
                                      datePickerProps={{
                                        placement: 'bottomEnd',
                                        editable: false,
                                        defaultValue: !!dataForm?.solvingContent?.solvingAction?.datetime?.value ? dataForm?.solvingContent?.solvingAction?.datetime?.value : new Date(),
                                        disabled: !!dataForm?.solvingContent?.problem_solving_action,
                                      }}
                                      inputProps={{
                                        editable: false,
                                      }}
                                      disabledTime='isBefore'
                                      className={`content-request__item-input ${pageData.validate?.timeSolving ? 'content-request__item-input-validate' : ''}`}
                                      style={{ zIndex: 999999, width: '100%' }}
                  />
                  {pageData.validate?.timeSolving &&
                  <Text color={'red'} style={{ position: 'absolute', bottom: '-21px', zIndex: 1 }}>Thời gian giao lại
                    không được để trống</Text>}
                </div>
              </div>
              <div className="content-request__item">
                <Text className={'content-request__item-label'}>Ghi chú</Text>
                <Textarea
                  className={'content-request__item-input'}
                  {...props}
                  value={dataForm?.solvingContent?.solvingAction?.remark}
                  defaultValue={dataForm?.solvingContent?.solvingAction?.remark}
                  onChange={(e) => funcs.handleRemarkSolving(e.target.value)}
                  maxLength="256"
                  disabled={dataForm?.solvingContent?.problem_solving_action}
                  style={{ resize: 'none' }}
                  validateText={dataForm.solvingContent?.note?.length == 256 ? 'Nội dung đã xử lý với khách hàng không được vượt quá 255 ký tự' : ''}
                  validateType={'danger'}
                ></Textarea>
              </div>
            </div>
            }
          </div>
        </div>
        <div className="delivery-manager-table__update-status-failed-modal__footer">
          <Button
            appearance="ghost"
            size="sm"
            style={{ minWidth: 110, marginRight: '0.5rem' }}
            onClick={onClose}
          >
            Hủy
          </Button>
          <Button
            size="sm"
            style={{ minWidth: 110 }}
            onClick={() => {
              if(dataForm.solvingContent.solvingAction?.show){
                funcs?.handleShowConfirm(true)
                funcs?.handleShowSolvingForm(false)
              }else{
                funcs?.solvingOrder(onClose)
              }
            }}
            disabled={pageData.validate?.timeSolving && dataForm.solvingContent.solvingAction?.show}
          >
            Lưu
          </Button>
        </div>
      </div>
    </StyledRequestRefundModal>
  )
}

const StyledRequestRefundModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;

  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(0, 0, 0, 0.25);

  .delivery-manager-table__update-status-failed-modal {
    &__container {
      max-width: 722px;
      padding: 24px;

      background: #ffffff;
      border-radius: 4px;
      box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
      .content-refund{
        margin-bottom: 2rem;
        .customer-info{
          margin-bottom: 1.5rem;
        }
      }
    }
  
    &__footer {
      display: flex;
      justify-content: flex-end;
    }
  }
  .header-billcode{
    :hover{
      cursor: pointer
    }
  }
  .request-content-handle{
    margin-top: 24px;
    &__title{
      display: flex;
      align-items: center;
      margin-bottom: 16px;
    }
  }
  .content-request{
    &__item{
      display: flex;
      &-label{
        width: 29%!important;
        padding-left: 28px;
      }
      &-input{
        width: 71%;
      }
    }
    
  }
`
