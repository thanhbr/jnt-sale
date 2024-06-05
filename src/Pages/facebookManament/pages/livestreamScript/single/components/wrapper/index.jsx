import {useState} from 'react'
import {useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import useFacebookLiveStreamScriptSingle from '../../hooks/useFacebookLivestreamScriptSingle'
import {FacebookLivestreamScriptSingleBasicInfo} from '../basicInfo'
import {FacecbookLivestreamScriptSingleConfigAutoMenuSyntax} from '../configAutoMenuSyntax'
import {FacebookLivestreamScriptSingleConfirmLeavePageModal} from '../confirmLeavePageModal'
import {FacebookLivestreamScriptSingleDeclareOrderKeyword} from '../declareOrderKeyword'
import {FacebookLivestreamScriptSingleSection} from '../section'
import {FacecbookLivestreamScriptSingleShippingInfo} from '../shippingInfo'
import {StyledFacebookLivestreamScriptSingleWrapper} from './_styled'

export const FacebookLivestreamScriptSingleWrapper = ({...props}) => {
  const navigate = useNavigate()
  const params = useParams()
  const isCreatePage = params?.single === 'create'

  const {data, methods} = useFacebookLiveStreamScriptSingle()
  const {name, product, packageNumber} = data.form

  const cannotLeavePage = methods.handleCheckLeavePage()

  const [leavePageModal, setLeavePageModal] = useState(null)

  const handleLeavePage = e => {
    e.preventDefault()
    const anchor = e.target.closest('a')
    if (anchor) {
      const href = anchor.getAttribute('href')
      setLeavePageModal({
        onSubmit: () => {
          navigate(href)
          setLeavePageModal(null)
        },
      })
    }
  }

  useEffect(() => {
    const response = methods.getOriginData()
    if (!isCreatePage && response)
      response.then(res => {
        methods.getDetailData(params?.single, res)
      })
  }, [])

  useEffect(() => {
    if (cannotLeavePage) {
      const anchors = document.querySelectorAll('a')
      anchors.forEach(item => {
        item.addEventListener('click', handleLeavePage)
      })
      return () =>
        anchors.forEach(item => {
          item.removeEventListener('click', handleLeavePage)
        })
    }
  }, [cannotLeavePage])

  return (
    <>
      <StyledFacebookLivestreamScriptSingleWrapper {...props}>
        <FacebookLivestreamScriptSingleSection
          heading="Thông tin cơ bản"
          maxHeightExpand={190}
          active={!!name.value.trim()}
        >
          <FacebookLivestreamScriptSingleBasicInfo />
        </FacebookLivestreamScriptSingleSection>
        <FacebookLivestreamScriptSingleSection
          heading="Khai báo từ khoá đặt hàng"
          maxHeightExpand={515}
          active={
            product.value.length > 0 &&
            !product.value.find(item => item.tags.length <= 0)
          }
        >
          <FacebookLivestreamScriptSingleDeclareOrderKeyword />
        </FacebookLivestreamScriptSingleSection>
        <FacebookLivestreamScriptSingleSection
          heading="Cấu hình cú pháp lên đơn tự động"
          maxHeightExpand={315}
          active={true}
        >
          <FacecbookLivestreamScriptSingleConfigAutoMenuSyntax />
        </FacebookLivestreamScriptSingleSection>
        <FacebookLivestreamScriptSingleSection
          heading="Thiết lập thông tin vận chuyển mặc định"
          maxHeightExpand={800}
          active={packageNumber.value > 0}
          bodyStyle={{paddingBottom: 0}}
        >
          <FacecbookLivestreamScriptSingleShippingInfo />
        </FacebookLivestreamScriptSingleSection>
      </StyledFacebookLivestreamScriptSingleWrapper>
      {!!leavePageModal && (
        <FacebookLivestreamScriptSingleConfirmLeavePageModal
          onClose={() => setLeavePageModal(null)}
          onSubmit={leavePageModal?.onSubmit}
        />
      )}
    </>
  )
}
