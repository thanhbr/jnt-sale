import React, {useEffect, useRef} from 'react';
import {Grid} from "@mui/material";

import {Text} from "../../../../common/text";
import {THEME_SEMANTICS} from "../../../../common/theme/_semantics";
import {Input} from "../../../../common/form/input";
import {Radio} from "../../../../common/form/radio";
import {Textarea} from "../../../../common/form/textarea";
import {USER_ICON} from "../../icon/icon";
import useCreateUserManagement from "../../hooks/useCreateUserManagement";
import {CategoryDatePicker} from "../../../../common/form/datePicker";

const UserInfor = ({...props}) => {
  const {functions, valueForm, validate} = useCreateUserManagement()
  const datepickerRef = useRef(null)

  useEffect(() => {
    const calendarTitle = document.getElementsByClassName('rs-calendar-table-cell-content')
    for (let i = 0; i < calendarTitle.length; i++) {
      calendarTitle[i].removeAttribute('title')
    }
    window.addEventListener('mouseover', function (e) {
      for (let i= 0; i < calendarTitle.length; i++) {
        calendarTitle[i].removeAttribute('title')
      }
    })
    return function cleanupListener() {
      window.removeEventListener('mouseover', () => {})
    }
  }, [])

  return (
    <>
      <Grid container className="create-user-info__group-role">
        <Grid xs={12} sm={12} md={12} lg={12} item>
          <div className="create-user-info__form-group create-user-info__form-group--full-name">
            <Input
              {...props}
              label={
                <>
                  Họ tên <Text color={THEME_SEMANTICS.failed}>*</Text>
                </>
              }
              placeholder="Nhập họ tên"
              maxLength={100}
              value={valueForm.fullName}
              validateText={validate?.errorFullName?.status ? validate?.errorFullName?.message : null}
              validateType={!validate.errorFullName?.status ? 'success' : 'danger'}
              onChange={e => functions.onChangeFullName(e.target.value)}
              onBlur={() => validate.onBlurFullName()}
            />
          </div>
        </Grid>
        <Grid xs={6} sm={6} md={6} lg={6} item>
          <div className="create-user-info__form-group create-user-info__form-group-double">
              <Input
                {...props}
                label={
                  <>
                    Điện thoại <Text color={THEME_SEMANTICS.failed}>*</Text>
                  </>
                }
                placeholder="Nhập số điện thoại"
                value={valueForm.phone}
                maxLength={11}
                validateText={validate?.errorPhone?.status ? validate?.errorPhone?.message : null}
                validateType={!validate?.errorPhone?.status ? 'success' : 'danger'}
                onChange={e => functions.onChangePhone(e.target.value)}
                onBlur={() => validate.onBlurPhone()}
              />
          </div>
        </Grid>
        <Grid xs={6} sm={6} md={6} lg={6} item>
          <div className="create-user-info__form-group create-user-info__form-group-double create-user-info__form-group-double--right">
            <Input
              {...props}
              label={
                <>
                  Email
                </>
              }
              placeholder="Nhập email"
              value={valueForm.email}
              validateText={validate?.errorEmail?.status ? validate?.errorEmail?.message : null}
              validateType={!validate?.errorEmail?.status ? 'success' : 'danger'}
              maxLength={100}
              onChange={e => functions.onChangeEmail(e.target.value)}
              onBlur={() => validate.onBlurEmail()}
            />
          </div>
        </Grid>
        <Grid xs={6} sm={6} md={6} lg={6} item>
          <div className="create-user-info__form-group create-user-info__form-group--birthday create-user-info__form-group-double">
            <Text style={{marginBottom: 8}}>Ngày sinh</Text>
            <CategoryDatePicker
              onChange={date => functions.onChangeDOBNew(date)}
              format={'dd/MM/yyyy'}
              disabledTime={'isAfter'}
            />
            <i onClick={() => {
              const datepickerElement = datepickerRef.current
              datepickerElement.setFocus(true)
            }}>{USER_ICON.calendar}</i>
          </div>
        </Grid>
        <Grid xs={6} sm={6} md={6} lg={6} item>
          <div className="create-user-info__form-group create-user-info__form-group--gender create-user-info__form-group-double create-user-info__form-group-double--right">
            <div
              className="create-user-info__form-input create-user-info__form-radio"
              onClick={() => functions.onChangeGender(1)}
              data-size="xl"
            >
              <Radio
                checked={valueForm.gender === 1}
                name="product-info"
                value={1}
                style={{transform: 'translateY(2px)'}}
              />
              <Text style={{marginLeft: 14, marginTop: 1}}>
                Nam
              </Text>
            </div>
            <div
              className="create-user-info__form-input create-user-info__form-radio"
              data-size="xl"
              onClick={() => functions.onChangeGender(2)}
            >
              <Radio
                checked={valueForm.gender === 2}
                name="product-info"
                value={2}
                style={{transform: 'translateY(2px)'}}
              />
              <Text style={{marginLeft: 14, marginTop: 1}}>
                Nữ
              </Text>
            </div>
          </div>
        </Grid>
        <Grid xs={12} sm={12} md={12} lg={12} item>
          <div className="create-user-info__form-group">
            <Input
              {...props}
              label={
                <>
                  Địa chỉ
                </>
              }
              placeholder="Nhập địa chỉ"
              value={valueForm.address}
              maxLength={255}
              onChange={e => functions.onChangeAddress(e.target.value)}
              onBlur={() => validate?.onBlurAddress(valueForm.address)}
            />
          </div>
        </Grid>
        <Grid xs={12} sm={12} md={12} lg={12} item>
          <div className="create-user-info__form-group create-user-info__form-group--note">
          <Text style={{marginBottom: 8}}>Ghi chú</Text>
          <Textarea
            placeholder="Nhập ghi chú"
            value={valueForm.note}
            style={{minHeight: '68px !important'}}
            onChange={e => functions.onChangeNote(e.target.value)}
            onBlur={() => validate.onBlurNote()}
            validateText={validate?.errorNote?.status ? validate?.errorNote?.message : null}
            validateType={!validate.errorNote?.status ? 'success' : 'danger'}
          />
      </div>
        </Grid>
      </Grid>
    </>
  );
};

export default UserInfor;