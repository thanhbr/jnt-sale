import React, { useState } from 'react'
import {Box, Tab} from '@material-ui/core'
import {TabContext, TabList, TabPanel} from '@material-ui/lab'
import cls from 'clsx'
import { useForm } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment, { now } from 'moment'
import toast from '../../Toast/index'
import 'react-toastify/dist/ReactToastify.css'

import css from './index.module.scss'
import {postData} from '../../../api/api'
import { getUrlUpdateProfile, getUrlChangePassword } from '../../../api/url'
import { replaceAllCustom, UposLogFunc } from '../../../util/functionUtil'
import useGlobalContext from '../../../containerContext/storeContext'
import {USER_PROFILE, TAB_USER_PROFILE} from '../../Icons'
import {checkPasswordVN} from '../../../util/checkPasswordVN'
import ModalConfirm from '../../ModalConfirm'
import {CustomToolTip} from '../../tooltip/CustomTooltip'
import {Button} from '../../../common/button/index'
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../const/display_name_menu";

const Index = ({...prop}) => {
  const {t} = useTranslation()
  const [update, setUpdate] = useState(true)
  const [disabled, setDisabled] = useState(false)
  const [fieldPass, setFieldPass] = useState(false)
  const [passDisabled, setPassDisabled] = useState(false)
  const [passCurrent, setPassCurrent] = useState(true)
  const [passNew, setPassNew] = useState(true)
  const [passConfirm, setPassConfirm] = useState(true)
  const {userProfile, tab, isUpdate} = prop
  const [value, setValueC] = useState(tab)
  const [gender, setGender] = useState('')
  const [view, setView] = useState(false)
  const [startDate, setStartDate] = useState(() => {
    return userProfile.birthday === null ? null : new Date(userProfile.birthday)
  })
  const [, dispatch] = useGlobalContext()
  const [confirm, setConfirm] = useState(false)
  const [swat, setSwat] = useState(false)

  const handleTab = (event, newValue) => {
    if(!update && view) {
      setConfirm(true)
      setSwat(true)
    } else {
      setValueC(newValue)
      setUpdate(true)
      setFieldPass(false)
      setDisabled(false)
      setPassDisabled(false)
    }
  }
  const { register, handleSubmit, formState: { errors }, watch, reset, setValue, getValues, setError } = useForm({
    mode: 'all',
    defaultValues: {
      fullname: userProfile.fullname,
      email: userProfile.email,
      address: userProfile.address,
    },
  })
  const dataReset = {
    // eslint-disable-next-line no-undef
    fullname: _.cloneDeep(userProfile.fullname),
    // eslint-disable-next-line no-undef
    email: _.cloneDeep(userProfile.email),
    // eslint-disable-next-line no-undef
    address:  _.cloneDeep(userProfile.address),
  }
  const passReset = {
    // eslint-disable-next-line no-undef
    password: _.cloneDeep(''),
    // eslint-disable-next-line no-undef
    new_password: _.cloneDeep(''),
    // eslint-disable-next-line no-undef
    confirm_password:  _.cloneDeep(''),
  }
  const onUpdateProfile = data => {
    setUpdate(true)
    setDisabled(false)
    setConfirm(false)
    isUpdate(false)
    setView(false)
    if(startDate) {
      data.birthday = moment(startDate).format('YYYY-MM-DD')
    } else {
      data.birthday = null
      setStartDate(null)
    }

    const dataPost = JSON.stringify(data)
    const url = getUrlUpdateProfile()
    postData(url, dataPost)
      .then(res => {
        if (res.data && res.data.success) {
          dispatch({ type: 'UPDATE_USER', payload: data })
          toast.success({ title: t(DISPLAY_NAME_MENU.GENERAL.USER_PROFILE_SUCCESS_UPDATE_ACCOUNT) })
        }
      })
      .catch(e => {
        UposLogFunc(`ERROR UPDATE PROFILE: ${e.message}`)
      })
  }
  const onUpdatePassword = data => {
    reset(passReset)
    const dataPost = JSON.stringify(data)
    const url = getUrlChangePassword()
    isUpdate(false)
    postData(url, dataPost)
      .then(res => {
        if (res.data && res.data.success) {
          toast.success({ title: t(DISPLAY_NAME_MENU.GENERAL.USER_PROFILE_SUCCESS_UPDATE_PASSWORD) })
          setFieldPass(false)
          setPassDisabled(false)
        } else {
          if(res.data.errors[0].code === 6034) {
            // code: error password
            reset({
              type: "type",
              password: data.password,
              new_password: data.new_password,
              confirm_password: data.confirm_password,
            })
            setError('password', { type: 'invalid', message: t(DISPLAY_NAME_MENU.VALIDATE.INVALID.ERROR_PASS) }, { shouldFocus: true })
          } else {
            toast.error({ title: res.data.errors[0].message })
          }
          setFieldPass(true)
        }
      })
      .catch(e => {
        UposLogFunc(`ERROR CHANGE PASSWORD: ${e.message}`)
      })
  }
  const handleConfirm = confirm => {
    setConfirm(false)
    if(confirm) {
      reset(dataReset)
      setDisabled(false)
      setUpdate(true)

      setPassDisabled(false)
      setFieldPass(false)
      setView(false)
      isUpdate(false)

      if(swat) setValueC('password')
    } else {
      setView(true)
    }
  }
  return (
    <>
      <Box sx={{width: '100%', typography: 'body1'}}>
        <TabContext value={value}>
          <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
            <TabList
              onChange={handleTab}
              TabIndicatorProps={{style: {background: '#2BB8A9'}}}
              className={cls(css.tab_list)}
            >
              <Tab
                value="user"
                label={t(DISPLAY_NAME_MENU.GENERAL.USER_PROFILE)}
                icon={TAB_USER_PROFILE.user}
                className={`${cls(css.tab)} ${
                  value === 'user' ? cls(css.selected) : ''
                }`}
              />
              <Tab
                value="password"
                label={t(DISPLAY_NAME_MENU.GENERAL.USER_PROFILE_TAB_PASS)}
                icon={TAB_USER_PROFILE.pass}
                className={`${cls(css.tab)} ${
                  value === 'password' ? cls(css.selected) : ''
                }`}
              />
            </TabList>
          </Box>
          <TabPanel value="user">
            <div className={cls(css.detail)}>
              {update ? (
                <div className={cls(css.case)}>
                  <div className={cls(css.account, css.gen)}>
                    <p className={cls(css.panel)}>{t(DISPLAY_NAME_MENU.GENERAL.USER_NAME)}</p>
                    <CustomToolTip title={
                      <p>{userProfile.fullname}</p>
                    } arrow >
                      <p className={cls(css.fullname)}>{userProfile.fullname}</p>
                    </CustomToolTip>
                    <button
                      onClick={() => {
                        setUpdate(false)
                        setDisabled(true)
                        setGender(userProfile.gender)
                      }}
                      disabled={disabled}
                      className={`${cls(css.update)} ${!disabled || cls(css.disabled)}`}
                    >
                      {t(DISPLAY_NAME_MENU.GENERAL.UPDATE)}
                    </button>
                  </div>
                  <div className={cls(css.phone, css.gen)}>
                    <p className={cls(css.panel)}>{t(DISPLAY_NAME_MENU.GENERAL.PHONE)}</p>
                    <p className={cls(css.phone)}>{userProfile.phone}</p>
                  </div>
                  <div className={cls(css.email, css.gen)}>
                    <p className={cls(css.panel)}>Email</p>
                    <CustomToolTip title={
                      <p>{userProfile.email}</p>
                    } arrow >
                      <p>{userProfile.email}</p>
                    </CustomToolTip>
                  </div>
                  <div className={cls(css.address, css.gen)}>
                    <p className={cls(css.panel)}>{t(DISPLAY_NAME_MENU.GENERAL.ADDRESS)}</p>
                    <CustomToolTip title={
                      <p>{userProfile.address}</p>
                    } arrow >
                      <p>{userProfile.address}</p>
                    </CustomToolTip>
                  </div>
                  <div className={cls(css.dob, css.gen)}>
                    <p className={cls(css.panel)}>{t(DISPLAY_NAME_MENU.GENERAL.DOB)}</p>
                    {userProfile.birthday !== null ? (
                      <p>{`${userProfile.birthday.split('-')[2]}/${userProfile.birthday.split('-')[1]}/${userProfile.birthday.split('-')[0]}`}</p>
                    ) : ''}
                  </div>
                  <div className={cls(css.gender, css.gen)}>
                    <p className={cls(css.panel)}>{t(DISPLAY_NAME_MENU.GENERAL.GENDER)}</p>
                    <p>{userProfile.gender === '1' ? t(DISPLAY_NAME_MENU.GENERAL.MALE) : userProfile.gender === '2' ? t(DISPLAY_NAME_MENU.GENERAL.FEMALE) : 'Khác'}</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onUpdateProfile)}>
                  <div className={cls(css.edit)}>
                    <div className={cls(css.account, css.gen)}>
                      <label className={cls(css.panel)}
                             htmlFor={'lb_name'}
                      >{t(DISPLAY_NAME_MENU.GENERAL.USER_NAME)}</label>
                      <div className={cls(css.ntd)}>
                        <input
                          id={'lb_name'}
                          placeholder={t(DISPLAY_NAME_MENU.GENERAL.USER_PROFILE_ENTER_NAME)}
                          maxLength={100}
                          autoComplete={'off'}
                          style={{ borderBottom: errors.fullname ? '1px solid var(--plum-color)' : '' }}
                          {...register('fullname', {
                            required: t(DISPLAY_NAME_MENU.VALIDATE.EMPTY.USER_NAME),
                            onChange: () => {
                              setView(true)
                              isUpdate(true)
                            },
                          })}
                        />
                        {errors.fullname && <span className={cls(css.errors)}>{errors.fullname.message}</span>}
                      </div>
                    </div>
                    <div className={cls(css.phone, css.gen)}>
                      <p className={cls(css.panel)}>{t(DISPLAY_NAME_MENU.GENERAL.PHONE)}</p>
                      <div className={cls(css.ntd)}>
                        <input disabled={true}
                               value={userProfile.phone}
                               style={{cursor: 'not-allowed', color: 'var(--dismiss-color)', background: 'white'}}/>
                      </div>
                    </div>
                    <div className={cls(css.email, css.gen)}>
                      <label className={cls(css.panel)}
                             htmlFor={'lb_email'}
                      >Email</label>
                      <div className={cls(css.ntd)}>
                        <input
                          id={'lb_email'}
                          maxLength={50}
                          autoComplete={'off'}
                          style={{ borderBottom: errors.email ? '1px solid var(--plum-color)' : '' }}
                          placeholder={t(DISPLAY_NAME_MENU.GENERAL.USER_PROFILE_ENTER_EMAIL)}
                          {...register("email", {
                            required: t(DISPLAY_NAME_MENU.VALIDATE.EMPTY.EMAIL),
                            pattern: {
                              value:
                                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                              message: t(DISPLAY_NAME_MENU.VALIDATE.INVALID.EMAIL),
                            },
                            onChange: () => {
                              setView(true)
                              isUpdate(true)
                            },
                          })}
                        />
                        {errors.email && <span className={cls(css.errors)}>{errors.email.message}</span>}
                      </div>
                    </div>
                    <div className={cls(css.address, css.gen)}>
                      <label className={cls(css.panel)}
                             htmlFor={'lb_address'}
                      >{DISPLAY_NAME_MENU.GENERAL.ADDRESS}</label>
                      <div className={cls(css.ntd)}>
                        <input
                          id={'lb_address'}
                          maxLength={255}
                          autoComplete={'off'}
                          placeholder={t(DISPLAY_NAME_MENU.GENERAL.USER_PROFILE_ENTER_ADDRESS)}
                          style={{ borderBottom: errors.address ? '1px solid var(--plum-color)' : '' }}
                          {...register("address", {
                            onChange: () => {
                              setView(true)
                              isUpdate(true)
                            },
                          })}
                        />
                        {errors.address && <span className={cls(css.errors)}>{errors.address.message}</span>}
                      </div>
                    </div>
                    <div className={cls(css.dob, css.gen)}>
                      <label className={cls(css.panel)}
                             htmlFor={'lb_date'}
                      >{t(DISPLAY_NAME_MENU.GENERAL.DOB)}</label>
                      <div className={cls(css.ntd)}>
                        <DatePicker id={'lb_date'}
                                    selected={startDate}
                                    onChange={(date) => {
                                      setStartDate(date)
                                      setView(true)
                                      isUpdate(true)
                                    }}
                                    minDate={new Date('01-01-1900')}
                                    maxDate={new Date(now()  - (24*60*60*1000))}
                                    dateFormat="dd/MM/yyyy"
                        />
                      </div>
                      <div className={cls(css.icon)}>
                      </div>
                    </div>
                    <div className={cls(css.gender, css.gen)}>
                      <p className={cls(css.panel)}>{t(DISPLAY_NAME_MENU.GENERAL.GENDER)}</p>
                      <div className={cls(css.grp_gender)}>
                        <div className={cls(css.item_gender)}>
                          <input type={'radio'}
                                 id={'g_male'}
                                 value={'1'}
                                 checked={gender === '1'}
                                 {...register("gender")}
                                 onChange={() => {
                                   setGender('1')
                                   setView(true)
                                   isUpdate(true)
                                 }}
                          />
                          <label htmlFor={'g_male'}>{t(DISPLAY_NAME_MENU.GENERAL.MALE)}</label>
                        </div>
                        <div className={cls(css.item_gender)}>
                          <input type={'radio'}
                                 id={'g_female'}
                                 value={'2'}
                                 checked={gender === '2'}
                                 {...register("gender")}
                                 onChange={() => {
                                   setGender('2')
                                   setView(true)
                                   isUpdate(true)
                                 }}
                          />
                          <label htmlFor={'g_female'}>{t(DISPLAY_NAME_MENU.GENERAL.FEMALE)}</label>
                        </div>
                      </div>
                    </div>
                    <div className={cls(css.action)}>
                      <hr  className={cls(css.line)}/>
                      <button
                        type={'button'}
                        className={cls(css.dismiss)}
                        onClick={() => {
                          if(view) {
                            setConfirm(true)
                          } else {
                            setUpdate(true)
                            setDisabled(false)
                          }
                        }}
                      >
                        {t(DISPLAY_NAME_MENU.GENERAL.CANCEL)}
                      </button>
                      <Button
                        className={cls(css.save)}
                        type={'submit'}
                      >
                        {t(DISPLAY_NAME_MENU.GENERAL.UPDATE)}
                      </Button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </TabPanel>
          <TabPanel value="password">
            <div className={cls(css.change)}>
              <button
                disabled={disabled}
                className={`${cls(css.p_update)} ${!passDisabled || cls(css.disabled)}`}
                onClick={() => {
                  setPassDisabled(true)
                  setFieldPass(true)
                }}
              >
                {t(DISPLAY_NAME_MENU.GENERAL.CHANGE_PASSWORD)}
              </button>
              <div className={cls(css.wire)}>
                <img src={'/img/iconMenu/light_bulb.svg'} alt={'light'}/>
                <div className={cls(css.para)}>
                <span>{t(DISPLAY_NAME_MENU.GENERAL.USER_PROFILE_SUBTITLE_PASS)}</span>
                </div>
              </div>
              { fieldPass && (
                <div className={cls(css.in_hide)}>
                  <form onSubmit={handleSubmit(onUpdatePassword)}>
                    <div className={cls(css.grp)}>
                      <div className={cls(css.lock)}>
                        <label htmlFor={'lb_current_pass'}
                               className={cls(css.panel)}
                        >{t(DISPLAY_NAME_MENU.GENERAL.USER_PROFILE_CURRENT_PASS)}</label>
                      </div>
                      <div className={cls(css.press)}>
                        <input type={passCurrent ? 'password' : 'text'}
                               id={'lb_current_pass'}
                               style={{ borderBottom: errors.password ? '1px solid var(--plum-color)' : '' }}
                               {...register('password', {
                                 required: t(DISPLAY_NAME_MENU.VALIDATE.EMPTY.CURRENT_PASS),
                                 minLength: {
                                   value: 6,
                                   message: t(DISPLAY_NAME_MENU.VALIDATE.INVALID.CURRENT_PASS_MIN_6),
                                 },
                                 maxLength: {
                                   value: 50,
                                   message: t(DISPLAY_NAME_MENU.VALIDATE.INVALID.NEW_PASS_MAX_50),
                                 },
                                 validate: {
                                   checkStr: v => checkPasswordVN(v) && t(DISPLAY_NAME_MENU.VALIDATE.INVALID.CHARACTER_PASSWORD),
                                 },
                                 onChange: () => {
                                   setValue('password', replaceAllCustom(getValues('password'),' ', ''))
                                   isUpdate(true)
                                 },
                               })}
                        />
                        {(errors.password)  && <span className={cls(css.errors)}>{errors.password.message}</span>}
                        <div className={cls(css.toggle_eye)}
                             onClick={() =>  setPassCurrent(!passCurrent) } >
                          {passCurrent ? USER_PROFILE.not_eye : USER_PROFILE.eye}
                        </div>
                      </div>
                    </div>
                    <div className={cls(css.grp)}>
                      <div className={cls(css.lock)}>
                        <label htmlFor={'lb_new_pass'}
                               className={cls(css.panel)}
                        >{t(DISPLAY_NAME_MENU.GENERAL.USER_PROFILE_NEW_PASS)}</label>
                      </div>
                      <div className={cls(css.press)}>
                        <input type={passNew ? 'password' : 'text'}
                               id={'lb_new_pass'}
                               style={{ borderBottom: errors.new_password ? '1px solid var(--plum-color)' : '' }}
                               {...register('new_password', {
                                 required: t(DISPLAY_NAME_MENU.VALIDATE.EMPTY.NEW_PASS),
                                 minLength: {
                                   value: 6,
                                   message: t(DISPLAY_NAME_MENU.VALIDATE.INVALID.NEW_PASS_MIN_6),
                                 },
                                 maxLength: {
                                   value: 50,
                                   message: t(DISPLAY_NAME_MENU.VALIDATE.INVALID.NEW_PASS_MAX_50),
                                 },
                                 validate: {
                                   checkStr: v => checkPasswordVN(v) && t(DISPLAY_NAME_MENU.VALIDATE.INVALID.CHARACTER_PASSWORD),
                                 },
                                 onChange: () => {
                                   setValue('new_password', replaceAllCustom(getValues('new_password'),' ', ''))
                                   isUpdate(true)
                                 },
                               })}
                        />
                        {errors.new_password && <span className={cls(css.errors)}>{errors.new_password.message}</span>}
                        <div className={cls(css.toggle_eye)}
                             onClick={() =>  setPassNew(!passNew) } >
                          {passNew ? USER_PROFILE.not_eye : USER_PROFILE.eye}
                        </div>
                      </div>
                    </div>
                    <div className={cls(css.grp)}>
                      <div className={cls(css.lock)}>
                        <label htmlFor={'lb_confirm'}
                               className={cls(css.panel)}
                        >{t(DISPLAY_NAME_MENU.GENERAL.USER_PROFILE_CURRENT_PASS)}</label>
                      </div>
                      <div className={cls(css.press)}>
                        <input type={passConfirm ? 'password' : 'text'}
                               id={'lb_confirm'}
                               style={{ borderBottom: errors.confirm_password ? '1px solid var(--plum-color)' : '' }}
                               {...register('confirm_password', {
                                 required: t(DISPLAY_NAME_MENU.VALIDATE.EMPTY.CONFIRM_PASS),
                                 minLength: {
                                   value: 6,
                                   message: t(DISPLAY_NAME_MENU.VALIDATE.INVALID.CONFIRM_PASS_MIN_6),
                                 },
                                 maxLength: {
                                   value: 50,
                                   message: t(DISPLAY_NAME_MENU.VALIDATE.INVALID.CONFIRM_PASS_MAX_50),
                                 },
                                 validate: {
                                   checkStr: v => checkPasswordVN(v) && t(DISPLAY_NAME_MENU.VALIDATE.INVALID.CHARACTER_PASSWORD),
                                   confirm: v => v === watch('new_password') || t(DISPLAY_NAME_MENU.VALIDATE.INVALID.NOT_MATCH_PASSWORD),
                                 },
                                 onChange: () => {
                                   setValue('confirm_password', replaceAllCustom(getValues('confirm_password'),' ', ''))
                                   isUpdate(true)
                                 },
                               })}
                        />
                        {errors.confirm_password && <span className={cls(css.errors)}>{errors.confirm_password.message}</span>}
                        <div className={cls(css.toggle_eye)}
                             onClick={() =>  setPassConfirm(!passConfirm) } >
                          {passConfirm ? USER_PROFILE.not_eye : USER_PROFILE.eye}
                        </div>
                      </div>
                    </div>
                    <div className={cls(css.action)}>
                      <hr />
                      <button
                        type={'button'}
                        className={cls(css.dismiss)}
                        onClick={() => {
                          setConfirm(true)
                        }}
                      >
                        {t(DISPLAY_NAME_MENU.GENERAL.CANCEL)}
                      </button>
                      <Button
                        className={cls(css.save)}
                        type={'submit'}
                      >
                        {t(DISPLAY_NAME_MENU.GENERAL.CHANGE_PASSWORD)}
                      </Button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </TabPanel>
        </TabContext>
      </Box>
      {confirm && <ModalConfirm txtConfirm={t(DISPLAY_NAME_MENU.GENERAL.CONFIRM)} handleConfirm={handleConfirm}/>}
    </>
  )
}
export default Index