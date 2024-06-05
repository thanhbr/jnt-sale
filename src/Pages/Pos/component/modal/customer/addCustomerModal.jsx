import React from 'react'
import { Box, Modal } from '@mui/material'
import styled from 'styled-components'
import { Text } from '../../../../../common/text'
import { usePosCustomer } from '../../../hooks/usePosCustomer'
import { Tooltip } from '../../../../../common/tooltip'
import { POS_ICON } from '../../../constants/icons'
import { Input } from '../../../../../common/form/input'
import { THEME_SEMANTICS } from '../../../../../common/theme/_semantics'
import { PosCustomerInfoAddress } from './_address'
import { CustomerInfoProvince } from './_province'
import { CustomerInfoDistrict } from './_district'
import { CustomerInfoWard } from './_ward'
import { GroupCustomer } from './groupCustomer'
import { CustomerGender } from './_gender'

export const AddCustomerModal = () => {
  const { createCustomerModal, phone, fullName, code, email, note, methods } = usePosCustomer()

  const handleBlur = () =>
    phone.onValidate(
      phone.value.length > 0 && phone.value.length < 10 && !!phone.value.trim()
        ? false
        : true,
    )

  const handleChange = e => {
    const phoneValue = e.target.value
      .toString()
      .replace(/[^0-9]/g, '')
      .substring(0, 11)

    phone.onchange(phoneValue)

    if (phoneValue.length >= 10 || phoneValue.length <= 0)
      phone.onValidate(true)
  }
  return (
    <Modal open={createCustomerModal.open} onClose={() => methods.onDisplayCreate(false)}>
      <Box>
        <StyledModalPaymentMethod data-more={createCustomerModal.showMore}>
          <div className={'customer'}>
            <div className={'customer__header'}>
              <Text as={'p'} fontSize={20} fontWeight={600}>Thêm khách hàng</Text>
              <div className={'customer__header-cid'}>
                <Text style={{ marginRight: '5px' }}>Mã khách hàng</Text>
                <Tooltip style={{ display: 'flex' }}
                         title={'Trường hợp bạn không nhập mã khách hàng, Evoshop sẽ tự động sinh theo mã hệ thống.'}>{POS_ICON.question}</Tooltip>
                <Input style={{ marginLeft: '9px' }}
                       value={code.value}
                       onChange={e => code.onchange(e.target.value)}
                       placeholder={'Nhập mã khách hàng'}/>
              </div>
            </div>
            <div className={'customer-body'}>
              <div className="customer-body__row">
                <div className={'customer-body__row-field'}>
                  <Input
                    label={
                      <>
                        Họ và tên <Text color={THEME_SEMANTICS.failed}>*</Text>
                      </>
                    }
                    placeholder="Nhập tên khách hàng"
                    value={fullName.value}
                    onChange={e => fullName.onchange(e.target.value)}
                    validateText={createCustomerModal.form.validate?.fullName}
                    validateType="danger"
                  />
                </div>

                <div className={'customer-body__row-field'}>
                  <Input
                    label={
                      <>
                        Số điện thoại <Text color={THEME_SEMANTICS.failed}>*</Text>
                      </>
                    }
                    placeholder="Nhập số điện thoại"
                    value={phone.value}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    validateText={createCustomerModal.form.validate?.phone}
                    validateType="danger"
                  />
                </div>
              </div>
              <div className="customer-body__row">
                <PosCustomerInfoAddress/>
              </div>
              <div className="customer-body__row">
                <div className="customer-body__row-address">
                  <CustomerInfoProvince
                    className="customer-body__row-item"
                  />
                  <CustomerInfoDistrict
                    className="customer-body__row-item"
                  />
                  <CustomerInfoWard
                    className="customer-body__row-item"
                  />
                </div>
              </div>
              <div className="customer-body__row">
                <Text as={'a'} className={'customer-body__row-toggle'}
                      color={'#1A94FF'}
                      onClick={methods.onShowMore}
                      data-active={createCustomerModal.showMore}
                      fontWeight={600}>Mở rộng &nbsp; {POS_ICON.arrowDown}</Text>
              </div>
              {
                !!createCustomerModal.showMore && (
                  <>
                    <div className="customer-body__row">
                      <div className={'customer-body__row-field'}>
                        <GroupCustomer/>
                      </div>

                      <div className={'customer-body__row-field'}>
                        <CustomerGender/>
                      </div>
                    </div>
                    <div className="customer-body__row">
                      <div className={'customer-body__row-field'}>
                        <Input
                          label='Email'
                          placeholder="Nhập email"
                          value={email.value}
                          validateText={createCustomerModal.form.validate?.email}
                          validateType="danger"
                          onChange={e => email.onchange(e.target.value)}
                        />
                      </div>

                      <div className={'customer-body__row-field'}>
                        <Input
                          label='Ghi chú'
                          placeholder="Nhập ghi chú"
                          value={note.value}
                          validateText={createCustomerModal.form.validate?.note}
                          validateType="danger"
                          onChange={e => note.onchange(e.target.value)}
                        />
                      </div>
                    </div>
                  </>
                )
              }
            </div>
            <div className={'customer-footer'}>
              <button className={'customer-footer__button-close'} onClick={() => methods.onDisplayCreate(false)}>
                <Text>Hủy</Text>
              </button>
              <button className={'customer-footer__button-submit'} onClick={methods.onSubmitForm}>
                <Text fontWeight={600} color={'#ffffff'}>Lưu</Text>
              </button>
            </div>
          </div>
        </StyledModalPaymentMethod>
      </Box>
    </Modal>
  )
}

export const StyledModalPaymentMethod = styled.div`
  width: 800px;
  height: 422px;
  background: #fff;
  border-radius: 8px;
  
  margin: auto;
  margin-top: 110px;
  padding: 24px;
  position: relative;
  @media screen and (max-height: 700px){
    margin-top: 22px;
  }
  &[data-more=true]{
    height: 578px;
  }
  .customer{
    &__header{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
      div{
        display: flex;
        align-items: center;
      }
    }
    &-body{
      &__row{
        display: flex;
        align-items: center;
        margin-bottom: 16px;
        &-field{
          width: calc(50% - 8px);
          &:first-child{
            margin-right: 16px;
          }
        }
        &-address{
          display: flex;
          align-items: end;
          width: 100%;
        }
        &-item{
          width: calc(33.33% - 10.67px);
          margin-right: 16px;
          &:last-child{
            margin-right: 0;
          }
        }
        &-toggle{
          display: flex;
          align-items: center;
          cursor: pointer;
          &:focus {
            color: #1A94FF !important;
            
            & svg g path {
              fill: #1A94FF !important;
            }
          }
          
          &[data-active=true]{
            svg{
              transform: rotate(180deg);
            }
          }
        }
      }
    }
    &-footer{
      display: flex;
      align-items: center;
      justify-content: end;
      margin-top: 24px;
      button:focus {
        border: 1px solid #1A94FF;
      }
      &__button-close{
        width: 110px;
        text-align: center;
        padding: 6px 0px;
        border: 1px solid #EBEEF5;
        border-radius: 6px;
        background: white;
        cursor: pointer;
        :hover{
          color: #1A94FF!important;
        }
      }
      &__button-submit{
        width: 110px;
        text-align: center;
        padding: 6px 0px;
        background: #1A94FF;
        border-radius: 6px;
        border: none;
        margin-left: 8px;
        cursor: pointer;
        :hover{
          background: #46a3f5;
          border-color: #46a3f5;
        }
      }
    }
  }
    
  .body-group-keyboard{
    margin-top: 24px;
    .body-title{
      margin-bottom: 14px;
      &:last-child{
        margin-bottom: 0;
      }
    }
    .body-keyboard-shortcut{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
      &:last-child{
        margin-bottom: 0;
      }
      &__text{
        width: 80%!important;
      }
      &__icon{
        height: 24px;
        padding: 3px 5px;
        text-align: center;
        background: #F4F6F6;
        border-radius: 4px;
        font-weight: 600!important;
      }
    }
  }
`
