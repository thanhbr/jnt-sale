import {postData, sendRequestAuth} from 'api/api'
import {Button} from 'common/button'
import {Input} from 'common/form/input'
import {Textarea} from 'common/form/textarea'
import {Modal} from 'common/modal'
import {NotificationBar} from 'common/notificationBar'
import {Spinner} from 'common/spinner'
import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import config from 'config'
import useAlert from 'hook/useAlert'
import {FACEBOOK_ICONS} from 'Pages/facebookManament/interfaces/_icons'
import ArrayUtils from 'Pages/facebookManament/utils/array'
import {useEffect, useCallback} from 'react'
import {useRef, useState} from 'react'
import {
  StyledFacebookResponseContentScriptCarouselModal,
  StyledFacebookResponseContentScriptDetailDrawer,
} from './_styled'
import Slider from 'react-slick'
import { ICONS_CUSTOMER_INFOR } from 'Pages/facebookManament/pages/conversation/interface/icon'

const MAX_NUMBER_OF_IMAGES = 10

export const FacebookResponseContentScriptDetailDrawer = ({
  detail,
  exit,
  loading,
  modifiled,
  onClose,
  onExitToggle,
  onLoadingToggle,
  onModifiledToggle,
  onRefetch,
  ...props
}) => {
  const {showAlert} = useAlert()

  const defaultState = {
    shortName: detail?.data?.data?.title || '',
    content: detail?.data?.data?.message || '',
    images: detail?.data?.data?.image
      ? JSON.parse(detail.data.data.image).map((item, i) => ({
          id: i + 100,
          name: `image-${i}`,
          url: item,
        }))
      : [],
  }

  const [shortName, setShortName] = useState(defaultState.shortName)
  const [content, setContent] = useState(defaultState.content)
  const [images, setImages] = useState(defaultState.images)
  const [originImageIdList, setOriginImageIdList] = useState(
    defaultState.images.map(item => item.id),
  )
  const [imageFiles, setImageFiles] = useState([])

  const [validate, setValidate] = useState({
    shortName: '',
    content: '',
    images: {overload: false},
  })

  const [carouselModalData, setCarouselModalData] = useState(null)

  const handleImageFileChange = e => {
    const files = e.target.files
    let imageArr = []
    let count = 0
    for (let i = 0; i < files.length; i++) {
      if (count + images.length >= MAX_NUMBER_OF_IMAGES) {
        showAlert({
          type: 'danger',
          content: 'Chỉ được phép tải lên tối đa 10 ảnh',
        })
        break
      }
      const item = files[i]
      if (
        !['image/jpg', 'image/jpeg', 'image/png'].includes(
          item.type.toLowerCase(),
        )
      ) {
        showAlert({
          type: 'danger',
          content: 'Chỉ hỗ trợ các định dạng: .jpg, .jpeg, .png.',
        })
        break
      }
      if (item?.size <= 3000000) {
        imageArr.push({
          id: Math.random(),
          name: item?.name,
          url: window.URL.createObjectURL(item),
        })
        count++
      } else
        showAlert({
          type: 'danger',
          content: 'Ảnh tải lên không được vượt quá 3MB',
        })
    }

    setImages([...images, ...imageArr])
    setImageFiles([...files])
  }

  const handleImageDelete = id => {
    setImages(images.filter(item => item?.id !== id))
    setOriginImageIdList(originImageIdList.filter(item => item !== id))
  }

  const handleSubmit = () => {
    onLoadingToggle(true)

    const uploadResponse = handleUploadImage()
    uploadResponse.then(res => {
      const urlList = res.map(item => {
        if (
          item?.data?.success &&
          ArrayUtils.getQualifiedArray(item?.data?.data)[0]
        ) {
          return `${ArrayUtils.getQualifiedArray(item?.data?.data)[0]}`
        } else return ''
      })

      handleSendRequestSubmit(urlList)
    })
  }

  const handleSendRequestSubmit = async imgURLList => {
    const response = await sendRequestAuth(
      'post',
      detail?.type === 'detail'
        ? `${config.API}/fb/setting/sample-message/update/${detail?.data?.data?.id}`
        : `${config.API}/fb/setting/sample-message/create`,
      JSON.stringify({
        keyword: shortName.trim(),
        message: content.trim(),
        images: [
          ...images
            .filter(item => originImageIdList.includes(item?.id))
            .map(item => item?.url),
          ...imgURLList,
        ],
      }),
    )

    if (response?.data?.success) {
      showAlert({
        type: 'success',
        content:
          detail?.type === 'detail'
            ? 'Cập nhật mẫu nội dung phản hồi thành công'
            : 'Thêm mới mẫu nội dung phản hồi thành công',
      })
      if (onRefetch) onRefetch()
      if (onModifiledToggle) onModifiledToggle(false)
      if (onExitToggle) onExitToggle(false)
      if (onClose) onClose()
    } else {
      showAlert({
        type: 'danger',
        content:
          response?.data?.errors?.details[0]?.message ||
          'Cập nhật mẫu nội dung phản hồi thất bại',
      })
    }

    onLoadingToggle(false)
  }

  const handleUploadImage = async () => {
    let formDataList = []

    for (let i = 0; i < imageFiles.length; i++) {
      const formData = new FormData()
      formData.append('images[]', imageFiles[i])
      formDataList.push(formData)
    }

    const response = await Promise.all(
      formDataList.map(item =>
        postData(`${config.API}/fb/setting/sample-message/upload-img`, item),
      ),
    )

    return response
  }

  const handleValidate = () => {
    let check = true
    let currentValidate = {...validate}

    if (!shortName || !shortName.trim()) {
      currentValidate = {
        ...currentValidate,
        shortName: 'Từ viết tắt không được để trống',
      }
      check = false
    }
    if (!content || !content.trim()) {
      currentValidate = {
        ...currentValidate,
        content: 'Nội dung không được để trống',
      }
      check = false
    }

    setValidate({...currentValidate})

    if (check) handleSubmit()
  }

  useEffect(() => {
    if (
      shortName.trim() !== defaultState.shortName ||
      content.trim() !== defaultState.content ||
      JSON.stringify(images) !== JSON.stringify(defaultState.images)
    ) {
      if (onModifiledToggle) onModifiledToggle(true)
    }
  }, [shortName, content, images])

  return (
    <StyledFacebookResponseContentScriptDetailDrawer
      {...props}
      className={`common-scrollbar ${props?.className || ''}`}
    >
      <div className="facebook-response-content-script-detail-drawer__header">
        <Text as="h2" fontSize={19} lineHeight={28} style={{marginBottom: 16}}>
          Thông tin mẫu nội dung phản hồi
        </Text>
        <NotificationBar>
          <Text>
            Bạn có thể kết hợp nội dung mẫu với thẻ{' '}
            <Text as="b">{`{name}`}</Text> để tự động thay thế tên khách hàng.
          </Text>
        </NotificationBar>
      </div>
      <div className="facebook-response-content-script-detail-drawer__body">
        <div className="facebook-response-content-script-detail-drawer__input-group">
          <div
            className="facebook-response-content-script-detail-drawer__input-item"
            data-size="lg"
          >
            <ShortNameInput
              validateText={validate?.shortName}
              validateType="danger"
              value={shortName}
              onChange={e => setShortName(e.target.value.substring(0, 80))}
              onFocus={() => setValidate({...validate, shortName: ''})}
            />
          </div>
        </div>
        <div className="facebook-response-content-script-detail-drawer__input-group">
          <div
            className="facebook-response-content-script-detail-drawer__input-item"
            data-size="lg"
          >
            <ContentInput
              validateText={validate?.content}
              validateType="danger"
              value={content}
              onChange={e => {
                const newValue = e.target.value
                setValidate({
                  ...validate,
                  content:
                    newValue.length > 255 && !validate?.content
                      ? 'Nội dung không được vượt quá 255 kí tự'
                      : '',
                })
                setContent(newValue.substring(0, 255))
              }}
              onFocus={() => setValidate({...validate, content: ''})}
            />
          </div>
        </div>
        <Galleries
          data={images}
          validate={validate?.images}
          onChange={handleImageFileChange}
          onCreateClick={() =>
            setValidate({
              ...validate,
              images: {...validate.images, overload: false},
            })
          }
          onImageClick={index => setCarouselModalData({defaultIndex: index})}
          onImageDelete={imageId => handleImageDelete(imageId)}
        />
      </div>
      <div className="facebook-response-content-script-detail-drawer__footer">
        <Button
          appearance="ghost"
          style={{minWidth: 74}}
          onClick={() =>
            modifiled
              ? onExitToggle && onExitToggle(true)
              : onClose && onClose()
          }
        >
          Hủy
        </Button>
        <Button
          style={{minWidth: 110, marginLeft: 12}}
          onClick={handleValidate}
        >
          Lưu
        </Button>
      </div>
      {!!carouselModalData && (
        <CarouselModal
          config={carouselModalData}
          data={images}
          onClose={() => setCarouselModalData(null)}
        />
      )}
      {loading && <LoadingModal type={detail?.type} />}
      {exit && (
        <ConfirmModal
          onClose={() => onExitToggle && onExitToggle(false)}
          onSubmit={() => {
            if (onModifiledToggle) onModifiledToggle(false)
            if (onExitToggle) onExitToggle(false)
            if (onClose) onClose()
          }}
        />
      )}
    </StyledFacebookResponseContentScriptDetailDrawer>
  )
}

const ShortNameInput = ({...props}) => {
  return (
    <Input
      {...props}
      label={
        props?.label || (
          <>
            Từ viết tắt <Text color={THEME_SEMANTICS.failed}>*</Text>
          </>
        )
      }
      placeholder={props?.placeholder || 'Nhập từ viết tắt'}
    />
  )
}

const ContentInput = ({...props}) => {
  return (
    <Textarea
      {...props}
      label={
        props?.label || (
          <>
            Nội dung <Text color={THEME_SEMANTICS.failed}>*</Text>
          </>
        )
      }
      placeholder={props?.placeholder || 'Nhập nội dung phản hồi'}
    />
  )
}

const Galleries = ({
  data,
  validate,
  onChange,
  onCreateClick,
  onImageClick,
  onImageDelete,
  ...props
}) => {
  const inputFileRef = useRef(null)

  return (
    <div
      {...props}
      className={`facebook-response-content-script-detail-drawer__galleries ${
        props?.className || ''
      }`}
    >
      <Text>Đính kèm ảnh</Text>
      <Text
        as="p"
        color={validate?.overload ? THEME_SEMANTICS.failed : '#7C88A6'}
      >
        Tải tối đa {MAX_NUMBER_OF_IMAGES} ảnh, mỗi ảnh không quá 3MB.
      </Text>
      <Text as="p" color="#7C88A6">
        Hỗ trợ các định dạng: .jpg, .jpeg, .png.
      </Text>
      <div className="facebook-response-content-script-detail-drawer__galleries-list">
        {data.map((item, i) => (
          <div
            key={item?.id}
            className="facebook-response-content-script-detail-drawer__galleries-item"
            onClick={() => onImageClick && onImageClick(i)}
          >
            <img
              className="facebook-response-content-script-detail-drawer__galleries-background"
              src={item?.url}
              alt={item?.name}
            />
            <div
              className="facebook-response-content-script-detail-drawer__galleries-delete"
              onClick={e => {
                e.stopPropagation()
                if (onImageDelete) onImageDelete(item?.id)
              }}
            >
              {FACEBOOK_ICONS.x}
            </div>
          </div>
        ))}
        {data.length < MAX_NUMBER_OF_IMAGES && (
          <>
            <div
              className="facebook-response-content-script-detail-drawer__galleries-create"
              onDrop={e => {
                e.preventDefault()
                onChange(e)
              }}
              onClick={() => {
                if (onCreateClick) onCreateClick()
                if (inputFileRef?.current) {
                  inputFileRef.current.value = ''
                  inputFileRef.current.click()
                }
              }}
            >
              {
                <svg
                  width="19"
                  height="18"
                  viewBox="0 0 19 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.5 3.74997V14.25"
                    stroke="#C8CBD4"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.25 8.99997H14.75"
                    stroke="#C8CBD4"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              <Text color={THEME_COLORS.primary_300} style={{display: 'block'}}>
                Tải ảnh
              </Text>
              <Text color="#c8cbd4" style={{display: 'block'}}>
                {data.length}/{MAX_NUMBER_OF_IMAGES}
              </Text>
            </div>
            <input
              ref={inputFileRef}
              accept="image/png, image/jpeg, image/jpg"
              type="file"
              multiple={true}
              style={{display: 'none'}}
              onChange={onChange}
            />
          </>
        )}
      </div>
    </div>
  )
}

export const CarouselModal = ({config, data, onClose}) => {
  const [activeIndex, setActiveIndex] = useState(config?.defaultIndex || 0)

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    variableWidth: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true
  }

  const sliderRef = useRef()
  const containerSlide = useRef()
  const scroll = useCallback(
    y => {
      if (y > 0) {
        return sliderRef?.current?.slickNext() /// ? <- using description below
      } else {
        return sliderRef?.current?.slickPrev()
      }
    },
    [sliderRef]
  )
  useEffect(() => {
    containerSlide.current.addEventListener("wheel", e => {
      scroll(e.deltaY);
    });
    return () => {
      containerSlide.current?.removeEventListener("wheel", scroll, true);
    };
  }, [scroll]);

  return (
    <Modal
      closeIcon={true}
      containerProps={{
        style: {
          width: window.screen.width < 1400 ? 740 : 841,
          padding: '15px 0',
        },
      }}
      style={{
        background: config?.backdrop ? 'rgba(0, 0, 0, 0.25)' : 'transparent',
      }}
      onClose={onClose}
    >
      <StyledFacebookResponseContentScriptCarouselModal>
        <div className="facebook-response-content-script-carousel-modal__container">
          <div className="facebook-response-content-script-carousel-modal__slides">
            {data.map((item, i) => (
              <div
                key={item?.id}
                className="facebook-response-content-script-carousel-modal__slide"
                style={{left: `${(i - activeIndex) * 100}%`}}
              >
                <img src={item?.url} alt={item?.name} />
              </div>
            ))}
          </div>
          <div className="facebook-response-content-script-carousel-modal__arrows">
            <div
              className="facebook-response-content-script-carousel-modal__arrow"
              data-arrow="prev"
              data-disabled={activeIndex <= 0}
              onClick={() => {activeIndex > 0 && setActiveIndex(activeIndex - 1)
                sliderRef?.current?.slickPrev()
              }}
            >
              {FACEBOOK_ICONS.chevronDown}
            </div>
            <div
              className="facebook-response-content-script-carousel-modal__arrow"
              data-arrow="next"
              data-disabled={activeIndex >= data.length - 1}
              onClick={() =>{
                activeIndex < data.length - 1 && setActiveIndex(activeIndex + 1)
                sliderRef?.current?.slickNext()}
              }
            >
              {FACEBOOK_ICONS.chevronDown}
            </div>
          </div>
        </div>
        <div className="facebook-response-content-script-carousel-modal__indicators"
        ref={containerSlide}
        >
        <Slider {...settings} ref={sliderRef}>
          {data.map((item, i) => (
            <div
              key={item?.id}
              className="facebook-response-content-script-carousel-modal__indicator"
              data-active={i === activeIndex}
              style={{cursor: i === activeIndex ? 'default' : 'pointer'}}
              onClick={() => i !== activeIndex && setActiveIndex(i)}
            >
              <img src={item?.url} alt={item?.name} />
            </div>
          ))}
          </Slider>
        </div>
      </StyledFacebookResponseContentScriptCarouselModal>
    </Modal>
  )
}

const ConfirmModal = ({onClose, onSubmit}) => {
  return (
    <Modal
      title="Xác nhận rời khỏi trang"
      width={480}
      style={{background: 'transparent'}}
      actions={[
        <Button
          appearance="ghost"
          size="sm"
          style={{minWidth: 110}}
          onClick={onClose}
        >
          Hủy
        </Button>,
        <Button
          size="sm"
          style={{minWidth: 110, marginLeft: 8}}
          onClick={onSubmit}
        >
          Xác nhận
        </Button>,
      ]}
    >
      <Text>
        Một số thông tin đã thay đổi, bạn có chắc chắn muốn rời khỏi trang khi
        thay đổi chưa được lưu?
      </Text>
    </Modal>
  )
}

const LoadingModal = ({type}) => {
  return (
    <Modal
      title={
        type === 'detail'
          ? 'Cập nhật mẫu nội dung phản hồi'
          : 'Thêm mới mẫu nội dung phản hồi'
      }
      width={480}
      style={{background: 'transparent'}}
    >
      <div
        style={{
          minHeight: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Spinner size={48} thickness={4} />
      </div>
    </Modal>
  )
}
