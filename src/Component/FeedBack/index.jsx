import React, {useState, useRef} from 'react'
import { useForm } from 'react-hook-form'
import { Box, Modal } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

import cls from 'clsx'
import css from './index.module.scss'
import useGlobalContext from '../../containerContext/storeContext'
import {FEED_BACK_ICONS} from './_icons'
import toast from '../Toast'
import { getUrlFeedbackCreate } from '../../api/url'
import { postData } from '../../api/api'
import { UposLogFunc } from '../../util/functionUtil'
import { bytesToMegaBytes } from '../../util/formatMB'
import {Button} from '../../common/button'
import {useLocation, useNavigate} from 'react-router-dom';
import {Text} from "../../common/text";
import {FEEDBACK_BODY_FILE} from "../../Pages/feedback/interfaces/_contants";
import {ICONS_FEEDBACK} from "../../Pages/feedback/interfaces/_icons";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../const/display_name_menu";

const Index = () => {
  const {t} = useTranslation()

  const { register, handleSubmit, formState: { errors }, setError, reset, getValues, setValue } = useForm({
    mode: 'all'})
  const [state, dispatch] = useGlobalContext()
  const [confirm, setConfirm] = useState(false)
  const [bolUpdate, setBolUpdate] = useState(false)
  const [aniModalClose, setAniModalClose] = useState(false)
  const [file, setFile] = useState([])
  const [image, setImage] = useState([])
  const [type, setType] = useState('')
  const [titleTooltip, setTitlleToolip] = useState('Chọn loại góp ý')
  const [selectOption, setSelectOption] = useState(false)
  const form = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()
  const formatFile = ['doc', 'docx', 'xls', 'xlsx', 'jpg', 'jpeg', 'png', 'gif']

  const onFeedBack = () => {
    if(getValues('title')?.trim()?.length === 0 || getValues('feedback_content')?.trim()?.length === 0) {
      if(getValues('feedback_content')?.trim()?.length === 0) setError("feedback_content", { type: "focus" })
      if(getValues('title')?.trim()?.length === 0) setError("title", { type: "focus" }, { shouldFocus: true })
    } else {
      setAniModalClose(true)
      setTimeout(() => {
        dispatch({type: 'SET_SHOW_FEED_BACK'})
        setAniModalClose(false)
      }, 300)
      const dataPost = new FormData(form.current)
      if(image) dataPost.append('image', image)
      const url = getUrlFeedbackCreate()

      postData(url, dataPost)
        .then(res => {
          if (res.data && res.data.success) {
            toast.success({ title: t(DISPLAY_NAME_MENU.FEEDBACK.THANK) })
            setFile([])
            setType('')
            reset()

            if(location.pathname === '/feedback') {
              navigate(`/feedback?create=${res?.data?.meta?.insert_id}`)
            }
          } else {
            toast.error({ title: t(DISPLAY_NAME_MENU.FEEDBACK.SEND_FAILED) })
          }
        })
        .catch(e => {
          UposLogFunc(`ERROR CREATE FEEDBACK: ${e.message}`)
        })
    }
  }

  const hiddenFileInput = useRef(null)
  const handleClick = () => hiddenFileInput.current.click()

  const handleChange = e => {
    if(e.target.files[0].size < 2000000 && !!formatFile?.find(item => item === e.target.files[0].name?.split('.')[1])) {
      setFile(() => [
        e.target.files[0].name,
        e.target.files[0].size
      ])
      setBolUpdate(true)
      setImage(e.target.files[0])
    } else {
      if(e.target.files[0].size >= 2000000) {
        toast.error({ title: t(DISPLAY_NAME_MENU.FEEDBACK.FILE_MAX_2MB) })
      } else {
        toast.error({ title: t(DISPLAY_NAME_MENU.FEEDBACK.INVALID_FILE) })
      }
      setFile([])
      e.target.value = ''
    }
  }

  return (
    <>
      <Modal
        open={state.showFeedBack}
        onClose={() => {
          if(!bolUpdate) {
            setAniModalClose(true)
            setTimeout(() => {
              dispatch({type: 'SET_SHOW_FEED_BACK'})
              setAniModalClose(false)
            }, 300)
          } else {
            setConfirm(true)
          }
        }}
      >
        <Box className={`${cls(css.box_modal)} ${aniModalClose && cls(css.modal_custom)}`}>
          <div className={cls(css.dismiss)}
               onClick={() => {
                 if(!bolUpdate) {
                   setAniModalClose(true)
                   setTimeout(() => {
                     dispatch({type: 'SET_SHOW_FEED_BACK'})
                     setAniModalClose(false)
                   }, 300)
                 } else {
                   setConfirm(true)
                 }
               }}
          >
            {FEED_BACK_ICONS.dismiss}
          </div>
          <div className={cls(css.wrapper)}>
            <form ref={form} onSubmit={handleSubmit(onFeedBack)} >
              <div>
                <p className={cls(css.title)}>{t(DISPLAY_NAME_MENU.FEEDBACK.TO_EVO)}</p>
                <p className={cls(css.sub__title)}>{t(DISPLAY_NAME_MENU.FEEDBACK.TO_EVO_SUBTITLE)}</p>
              </div>
              <div className={cls(css.form)}>
                <p className={cls(css.head)}>{t(DISPLAY_NAME_MENU.FEEDBACK.OF_YOUR)}</p >
                  <div className={cls(css.group)}>
                    <div className={cls(css.name, css.start)}>
                      <label htmlFor={'lb_fb_title'}>{t(DISPLAY_NAME_MENU.GENERAL.TITLE)} {FEED_BACK_ICONS.star}</label>
                      <input
                        id={'lb_fb_title'}
                        defaultValue={''}
                        className={`${errors.title ? cls(css.input_error) : cls(css.input_success)}`}
                        {...register("title", {
                          required: true,
                          maxLength: 50,
                          onChange: () => setBolUpdate(true)
                        })}
                        placeholder={t(DISPLAY_NAME_MENU.FEEDBACK.ENTER_TITLE)}
                        maxLength={51}
                        onBlur={e => {
                          if(e.target.value?.trim()?.length === 0) setError("title")
                        }}
                      />
                      {errors.title &&
                        <span className={cls(css.error)}>
                          {errors.title.type === 'maxLength'
                            ? t(DISPLAY_NAME_MENU.FEEDBACK.MAX_TITLE_50)
                            : t(DISPLAY_NAME_MENU.FEEDBACK.EMPTY_TITLE)
                          }

                        </span>
                      }
                    </div>
                    <div className={cls(css.type, css.start)}>
                      <label htmlFor={'lb_fb_type'}>{t(DISPLAY_NAME_MENU.FEEDBACK.TYPE)}</label>
                        <Select
                          className={`${cls(css.select)} ${selectOption && cls(css.selected)}`}
                          value={type}
                          displayEmpty
                          {...register("feedback_type", {
                            onChange: (e) => {
                              setBolUpdate(true)
                              setType(e.target.value)
                            }
                          })}
                        >
                          <MenuItem className={'fb-default-option-value'} value={''} onClick={() => setTitlleToolip(`- ${t(DISPLAY_NAME_MENU.FEEDBACK.SELECT_TYPE)} -`)}>{t(DISPLAY_NAME_MENU.FEEDBACK.SELECT_TYPE)}</MenuItem>
                          <MenuItem value={1} onClick={() => {
                            setTitlleToolip(t(DISPLAY_NAME_MENU.FEEDBACK.SYSTEM_ERROR))
                            setSelectOption(true)
                          }}>{t(DISPLAY_NAME_MENU.FEEDBACK.SYSTEM_ERROR)}</MenuItem>
                          <MenuItem value={2} onClick={() => {
                            setTitlleToolip(t(DISPLAY_NAME_MENU.FEEDBACK.ADD_FEAT))
                            setSelectOption(true)
                          }}>{t(DISPLAY_NAME_MENU.FEEDBACK.ADD_FEAT)}</MenuItem>
                          <MenuItem value={3} onClick={() => {
                            setTitlleToolip(t(DISPLAY_NAME_MENU.FEEDBACK.REQUEST_SOFTWARE))
                            setSelectOption(true)
                          }}>{t(DISPLAY_NAME_MENU.FEEDBACK.REQUEST_SOFTWARE)}</MenuItem>
                          <MenuItem value={4} onClick={() => {
                            setTitlleToolip(t(DISPLAY_NAME_MENU.FEEDBACK.REQUEST_SYSTEM))
                            setSelectOption(true)
                          }}>{t(DISPLAY_NAME_MENU.FEEDBACK.REQUEST_SYSTEM)}</MenuItem>
                        </Select>
                    </div>
                  </div>
                  <div className={cls(css.desc)}>
                    <label htmlFor={'lb_fb_desc'}>{t(DISPLAY_NAME_MENU.FEEDBACK.CONTENT)} {FEED_BACK_ICONS.star}</label>
                    <textarea
                      id={'lb_fb_desc'}
                      defaultValue={''}
                      className={`${errors.feedback_content ? cls(css.input_error) : cls(css.input_success)}`}
                      {...register("feedback_content", {
                        required: true,
                        onChange: () => setBolUpdate(true)
                      })}
                      placeholder={t(DISPLAY_NAME_MENU.FEEDBACK.ENTER_CONTENT)}
                      onBlur={e => {
                        if(e.target.value?.trim()?.length === 0) setError("feedback_content")
                      }}
                    >
                    </textarea>
                    {errors.feedback_content && <span className={cls(css.error)}>{t(DISPLAY_NAME_MENU.FEEDBACK.EMPTY_CONTENT)}</span> }
                  </div>
                  <div className={cls(css.grp_file)}
                       onClick={handleClick}
                  >
                    <div className={cls(css.display)}>
                      <div>
                        {FEED_BACK_ICONS.cloud}
                      </div>
                      <label>{t(DISPLAY_NAME_MENU.FEEDBACK.ATTACHMENTS)}</label>
                      <p className={cls(css.note)}>(.doc, .docx, .xls, .xlsx, .jpg, .jpeg, .png, .gif => {t(DISPLAY_NAME_MENU.FEEDBACK.MAX_2MB)})</p>
                    </div>
                    <div className={cls(css.group_btn_file)}>
                      <Button className={cls(css.btn_file)}
                              variant="contained"
                              type={'button'}
                      >{t(DISPLAY_NAME_MENU.GENERAL.SELECT_FILE)}</Button>
                    </div>
                    <input type={'file'}
                           className={cls(css.file)}
                           accept={'.doc, .docx, .xls, .xlsx, .jpg, .jpeg, .png, .gif, .pdf'}
                           ref={hiddenFileInput}
                           onChange={handleChange}
                    />
                  </div>
                  { file[0]  &&
                    <div className={cls(css.file_desc)}>
                      <div className={cls(css.file_info)}>
                        {FEEDBACK_BODY_FILE.find(item => item.format === file[0]?.split('.')[1])?.icon || ICONS_FEEDBACK.jpg}
                        <div className={cls(css.file_title)}>
                          <p className={`${cls(css.f_name)} three_dot`}>{file[0]}</p>
                          <p className={cls(css.f_size)}>{bytesToMegaBytes(file[1]).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <span onClick={() => {
                        setFile([])
                        hiddenFileInput.current.value = ''
                      }}>{FEED_BACK_ICONS.remove}</span>
                    </div>
                  }
              </div>
              <hr className={cls(css.line)} />
              <div className={cls(css.foot)}>
                <p onClick={() => {
                  navigate('/feedback')
                  setAniModalClose(true)
                  setTimeout(() => {
                    dispatch({type: 'SET_SHOW_FEED_BACK'})
                    setAniModalClose(false)
                  }, 300)
                }}>{t(DISPLAY_NAME_MENU.FEEDBACK.SEE_ALL)}</p>
                <div>
                  <button className={cls(css.cancel)}
                          onClick={() => {
                            if(!bolUpdate) {
                              setAniModalClose(true)
                              setTimeout(() => {
                                dispatch({type: 'SET_SHOW_FEED_BACK'})
                                setAniModalClose(false)
                              }, 300)
                            } else {
                              setConfirm(true)
                            }
                          }}
                          type={'button'}
                  >{t(DISPLAY_NAME_MENU.GENERAL.CANCEL)}</button>
                  <Button className={cls(css.save)}
                          type={'submit'}
                  >{t(DISPLAY_NAME_MENU.FEEDBACK.SEND)}</Button>
                </div>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
      <Modal
        open={confirm}
        onClose={() => {
          setConfirm(false)
        }}
        className={cls(css.modal_confirm)}
      >
        <Box className={cls(css.box_confirm)}>
          <div>
            <Text as={'p'} fontSize={20} fontWeight={600}>{t(DISPLAY_NAME_MENU.GENERAL.CONFIRM_LEAVING)}</Text>
            <Text as={'p'} style={{marginTop: 24}}>{t(DISPLAY_NAME_MENU.GENERAL.CONFIRM_LEAVING_CONTENT)}</Text>
            <div className={cls(css.grp_btn)}>
              <Button className={cls(css.dismiss)}
                      appearance={'ghost'}
                      onClick={() => {
                        setConfirm(false)
                      }}
                      type={'button'}
              >
                {t(DISPLAY_NAME_MENU.GENERAL.CLOSE)}
              </Button>
              <Button className={cls(css.save)}
                      onClick={() => {
                        reset()
                        setFile([])
                        setConfirm(false)
                        setAniModalClose(true)
                        setTimeout(() => {
                          dispatch({type: 'SET_SHOW_FEED_BACK'})
                          setBolUpdate(false)
                          setAniModalClose(false)
                        }, 300)
                      }}
                      type={'button'}
              >{t(DISPLAY_NAME_MENU.GENERAL.CONFIRM)}
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default Index