import React, {useEffect, useRef, useState} from 'react';
import {UserRoleProvider} from "../provider/index";
import useUserRole from "../hooks/useUserRole";
import {Grid} from "@mui/material";
import {Text} from "../../../common/text";
import {THEME_SEMANTICS} from "../../../common/theme/_semantics";
import {Input} from "../../../common/form/input";
import styled from "styled-components";
import {Radio} from "../../../common/form/radio";
import {Checkbox} from "../../../common/form/checkbox";
import {USER_ROLE} from "../interfaces/~icon";
import {Button} from "../../../common/button";
import {ConfirmModal} from "../../../layouts/rightSightPopup/confirm";

export const UserRoleCreate = () => {
  const {provider, fetch, functions, value, validate} = useUserRole()
  const {state, dispatch} = provider
  const [shouldTransparent, setShouldTransparent] = useState('create-user-role__detail--btn-group-bottom')

  //
  useEffect(() => {
    fetch.userRole()
  }, [])


  const handleWrapperScroll = () => {
    const wrapper = document.querySelector('#content-wrap')
    if (!wrapper) return

    const clientHeight = wrapper.clientHeight
    const scrollHeight = wrapper.scrollHeight
    const scrollTop = wrapper.scrollTop
    setShouldTransparent(clientHeight + scrollTop > scrollHeight - 50 ? '' : 'create-user-role__detail--btn-group-bottom')
  }
  const btnRef = useRef(null)
  useEffect(() => {
    const wrapper = document.querySelector('#content-wrap')
    if (!wrapper) return
    wrapper.addEventListener('scroll', handleWrapperScroll)
    return () => wrapper.removeEventListener('scroll', handleWrapperScroll)
  }, [btnRef])

  return (
    <UserRoleProvider value={{ pageState: state, pageDispatch: dispatch }}>
      <StyledCreateUseRole>
        <div className={'create-user-role__header'}>
          <p className={'create-user-role__header--title'}>Chi tiết vai trò người dùng</p>
          <div className={'create-user-role__header--back'}
               onClick={() => functions.backToList()}
          >
            {USER_ROLE.back_header}
            <span>Quay lại danh sách</span>
          </div>
        </div>
        <Grid container className={'create-user-role__group-info'}>
          <Grid xs={6} sm={6} md={6} lg={6} item>
            <div style={{maxWidth: '48.875rem'}}>
              <Input
                label={
                  <>
                    Tên vai trò <Text color={THEME_SEMANTICS.failed}>*</Text>
                  </>
                }
                placeholder={'Nhập tên vai trò người dùng (VD: Nhóm admin; Nhóm kinh doanh, ...)'}
                maxLength={100}
                value={value.nameRole}
                validateText={validate?.errorName?.status ? validate?.errorName?.message : null}
                validateType={!validate.errorName?.status ? 'success' : 'danger'}
                onChange={e => functions.handleChangeName(e.target.value)}
                onBlur={() => validate.handleBlurName()}
              />
            </div>
          </Grid>
          <Grid xs={6} sm={6} md={6} lg={6} item>
            <div style={{maxWidth: '49.375rem', marginLeft: '4px'}}>
              <Input
                label={
                  <>
                    Ghi chú
                  </>
                }
                placeholder={'Nhập ghi chú...'}
                maxLength={255}
                value={value.noteRole}
                // validateText={validate?.errorFullName?.status ? validate?.errorFullName?.message : null}
                // validateType={!validate.errorFullName?.status ? 'success' : 'danger'}
                onChange={e => functions.handleChangeNote(e.target.value)}
                // onBlur={() => validate.onBlurFullName()}
              />
            </div>
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={12} item>
            <div className={'create-user-role__group-info--check-all'}
                 onClick={e => {
                   e.stopPropagation()
                   functions.handleClickAllPermission()
                 }}
            >
              <Checkbox checked={state.activeCheckAllPer} />
              <span>Được toàn quyền quản trị</span>
            </div>
          </Grid>
        </Grid>

        <Grid container>
          <Grid xs={12} sm={12} md={12} lg={12} item>
            <div>
              <Grid container>
                <Grid xs={3} sm={3} md={3} lg={3} item>
                  <StyledSidebarCreateUseRole>
                    {state.listPermission.map(item => (
                      <div className={'create-user-role__sidebar--group'}
                           onClick={() => functions.handleClickSidebarRole(item)}
                      >
                        <div className={`create-user-role__sidebar--item ${state.activeSidebar === item.module_id && 'create-user-role__sidebar--item-active'}`}>
                          <div className={'create-user-role__sidebar--item-group'}>
                            <Radio
                              checked={state.activeSidebar === item.module_id}
                              className={'create-user-role__sidebar--item-check-box'}
                              value={2}
                              style={{transform: 'translateY(2px)'}}
                            />
                            <Text className={'create-user-role__sidebar--item-span'}>
                              {item.module_name}
                            </Text>
                          </div>
                          <div className={'create-user-role__sidebar--item-icon-tick'}>
                            {value.showTick(item) && USER_ROLE.tick}
                          </div>
                        </div>
                        <hr style={{border: 'none', borderTop: '1px solid rgb(226 234 247 / 1)'}}/>
                      </div>
                    ))}
                  </StyledSidebarCreateUseRole>
                </Grid>

                { state.listFeatures.length !== 0 && (
                  <>
                    <Grid xs={9} sm={9} md={9} lg={9} item>
                      <StyledDetailCreateUseRole>
                        <Grid container className="create-user-info__group-role">
                          <Grid xs={12} sm={12} md={12} lg={12} item>
                            <div className={'create-user-role__detail--title'}>
                              <span>Chi tiết phân quyền</span>
                            </div>
                          </Grid>
                          <Grid xs={12} sm={12} md={12} lg={12} item>
                            <div className={'create-user-role__detail--list'}>
                              {state.listFeatures.map(feat => (
                                <>
                                  <div className={'create-user-role__detail--item'}
                                       onClick={() => functions.handleShowDetailRow(feat)}
                                  >
                                    <div className={'create-user-role__detail--item-title'}>
                                      <Checkbox
                                        checked={value.checkboxItemGroup(feat)}
                                        indeterminate={!value.checkboxItemGroupAll(feat)}
                                        onClick={e => {
                                          e.stopPropagation()
                                          !state.activeCheckAllPer && functions.handleClickCheckAllItem(feat)
                                        }}
                                        disabled={state.activeCheckAllPer}
                                      />
                                      <span>{feat.feature_name}</span>
                                    </div>
                                    {(value.listSubHeader(feat).length > 0 && !!!(state.featureActions.find(item => item.feature_code === feat.feature_code))) && (
                                      <p className={'create-user-role__detail--item-subtitle'}>Có quyền: {
                                        value.listSubHeader(feat).map((item, index) => (
                                          <>{item.title}{index !== value.listSubHeader(feat).length - 1 && ', '}</>
                                        ))
                                      }</p>
                                    )}
                                    <div className={'create-user-role__detail--item-icon'}>
                                      {!!!(state.featureActions.find(item => item.feature_code === feat.feature_code)) ? USER_ROLE.circle_down : USER_ROLE.circle_up}
                                    </div>
                                  </div>
                                  { state.featureActions.length !== 0 && (
                                    <>
                                      <Grid container>
                                        {state.featureActions.map(act => (
                                          <>
                                            {act.feature_code === feat.feature_code && (
                                              <>
                                                {act.feature_actions.map(ac => (
                                                  <Grid xs={6} sm={6} md={6} lg={6} item className={'create-user-role__detail--group-item-action'}>
                                                    <div className={'create-user-role__detail--item-action'}
                                                         onClick={() => functions.handleClickItemAction(feat, ac) }
                                                    >
                                                      <div style={{display: 'flex', marginTop: '10px'}}>
                                                        <Checkbox checked={value.checkboxItemAction(act, ac)}
                                                                  disabled={state.activeCheckAllPer}
                                                        />
                                                        <span>{ac.title}</span>
                                                      </div>
                                                    </div>
                                                  </Grid>
                                                ))}
                                              </>
                                            )}
                                          </>
                                        ))}
                                      </Grid>
                                    </>
                                  )}
                                </>
                              ))}
                            </div>
                          </Grid>
                        </Grid>
                      </StyledDetailCreateUseRole>
                      <StyledCreateUseRoleListBtn>
                        <div className={`create-user-role__detail--btn-group ${shouldTransparent}`}>
                          <Button appearance="ghost"
                                  onClick={() => functions.backToList()}
                                  className={'create-user-role__detail--btn-dismiss'}
                          >Hủy</Button>
                          <Button onClick={() => functions.handleSubmitUserRole()}
                                  className={'create-user-role__detail--btn-save'}
                          >Lưu</Button>
                        </div>
                      </StyledCreateUseRoleListBtn>
                    </Grid>
                  </>
                )}
              </Grid>
            </div>
          </Grid>
        </Grid>
      </StyledCreateUseRole>
      <ConfirmModal
        openModal={state.openModalConfirm}
        header={<p style={{fontWeight: '600', fontSize: '20px', marginBottom: '18px'}}>Xác nhận rời khỏi trang</p>}
        body={<p style={{fontWeight: '400', fontSize: '14px', marginBottom: '24px'}}>Một số thông tin đã thay đổi, bạn có chắc chắn muốn rời khỏi trang khi thay đổi chưa được lưu?</p>}
        footer={
          {
            cancel: {
              title: 'Huỷ'
            },
            acceptance: {
              title: 'Xác nhận'
            },
          }
        }
        footerProps= {{
          className : 'create-user-role__modal-confirm-list-btn'
        }}
        stylePopup={'create-user-role__modal-confirm'}
        closeModal={() => functions.closeModalRoleConfirm()}
        acceptance={() => functions.acceptanceModalRoleConfirm()}
      />
    </UserRoleProvider>
  )
}

const StyledCreateUseRole = styled.div`
  .create-user-role {  
    &__header--title {
      font-weight: 600;
      font-size: 24px;
      line-height: 140%;
    }
    &__header--back {
      position: relative;
      cursor: pointer;
      span {
        color: #1E9A98;
        position: absolute;
        top: 2px;
        left: 24px;
        font-size: 14px;
      }
    }
    &__group-info {
      margin-top: 8px;
      background: white;
      padding: 16px 24px;
      border-radius: 8px;
      
      &--check-all {
        margin-top: 18px;
        display: flex;
        cursor: pointer;
        max-width: 14.25rem;
        
        span {
          margin-left: 8px;
          font-weight: 400;
          font-size: 14px;
        }
      }
    }
  }
`

const StyledSidebarCreateUseRole = styled.div`
  background: white;
  margin-top: 16px;
  border-radius: 8px;
  max-width: 24.4375rem;
  max-height: 41.25rem;
  
  .create-user-role {
    &__sidebar--group {
      max-height: 3.75rem; 
      cursor: pointer;
    }
    &__sidebar--item {
      display: flex;   
      justify-content: space-between;
      max-height: 3.6875rem;
      
      &:hover {
        background: #F3F6FC;
      }
      &-active {
        background: #E2EAF8;
        .create-user-role__sidebar--item-span {
          font-weight: 600 !important;
        }
      }
      
      &-group {
        display: flex;   
        justify-content: space-between;
        
        input {
          width: 18px;
          height: 18px;
        }
      }
      
      &-icon-tick {
        margin: 1.3125rem .875rem;
      }
      
      &-check-box {
        margin: 1.3125rem 1.5625rem;
      }
      
      &-span {
        margin-top: 1.25rem;
      }
    }
  }
`

const StyledDetailCreateUseRole = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  margin: 16px 0 36px 6px;
  max-width: 76.3125rem;
  min-height: 41.25rem;
  
  .create-user-role__detail {
    &--title span{
      font-weight: 600;
      font-size: 18px;
      color: #00081D;
      line-height: 140%;
      width: 9.625rem;
      padding: 2px 1px 2px 0;
    }
    
    &--list {
      margin-top: 16px;
    }
    
    &--item {
      position: relative;
      cursor: pointer;
      background: rgb(247 249 253);
      padding: 12px 16px;
      min-height: 44px;
      border-top: 1px solid rgb(234 240 249);
      border-bottom: 1px solid rgb(234 240 249);
    
      span {
        margin-left: 24px;
        font-weight: 600;
        font-size: 14px;
        color: #00081D;
      }
    }
    
    &--item-title {
      display: flex;
    }
    &--item-subtitle {
      font-weight: 400;
      font-size: 13px;
      line-height: 140%;
      color: #7C88A6;
      margin-left: 42px;
      
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      max-width: 63rem;
    }
    &--item-icon {
      position: absolute;
      right: 1rem;
      top: .75rem;
    }
    &--item-action {
      display: flex;
      padding: 16px;
      min-height: 66px;
      border-bottom: 1px solid rgb(234 240 249);
      cursor: pointer;
      span {
        margin-left: 24px;
        font-weight: 400;
        font-size: 14px;
        color: #00081D;
      }
    }
  } 
`

const StyledCreateUseRoleListBtn = styled.div`
  .create-user-role__detail {
    &--btn-group {
      margin: 36px 0 0 6px;
      position: fixed;
      bottom: 0;
      right: 0;
      width: calc(100% - 39.6875rem);
      height: 54px;
      padding: 0px 32px;
      // background: rgb(255, 255, 255);
    }
    &--btn-group-bottom {
      width: calc(100% - 13.6875rem);
      background: white;
      padding: 0 28.125rem;
    }
    &--btn-dismiss {
      margin-top: 8px;
      width: 74px;
      height: 36px;
    }
    &--btn-save {
      margin-left: 12px;
      margin-top: 8px;
      width: 110px;
      height: 36px;
    }
  }
  /*MEDIA 1520 */
  @media screen and (max-width: 1520px) {
    .create-user-role__detail--btn-group {
      width: calc(100% - 33.5rem);
    }
    .create-user-role__detail--btn-group-bottom {
      width: calc(100% - 13.6875rem);
      background: white;
      padding: 0 22rem;
    }
  }
  
  @media screen and (max-width: 1440px) {
    .create-user-role__detail--btn-group {
      width: calc(100% - 32rem);
    }
    .create-user-role__detail--btn-group-bottom {
      width: calc(100% - 13.6875rem);
      background: white;
      padding: 0 20.5rem;
    }
  }
  
  @media screen and (max-width: 1366px) {
    .create-user-role__detail--btn-group {
      width: calc(100% - 38.5rem);
    }
    .create-user-role__detail--btn-group-bottom {
      width: calc(100% - 13.6875rem);
      background: white;
      padding: 0 27.5rem;
    }
  }
  
  @media screen and (max-width: 1280px) {
    .create-user-role__detail--btn-group {
      width: calc(100% - 37rem);
    }
    .create-user-role__detail--btn-group-bottom {
      width: calc(100% - 13.6875rem);
      background: white;
      padding: 0 26rem;
    }
  }
`