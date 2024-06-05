import {NotificationBar} from 'common/notificationBar'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {FacebookLivestreamScriptSingle_ConfigGroup} from '../configGroup'
import {FacebookLivestreamScriptSingle_Cod} from '../_cod'
import {FacecbookLivestreamScriptSingle_Height} from '../_height'
import {FacebookLivestreamScriptSingle_Insurance} from '../_insurance'
import {FacecbookLivestreamScriptSingle_Length} from '../_length'
import {FacebookLivestreamScriptSingle_OrderNote} from '../_orderNote'
import {FacecbookLivestreamScriptSingle_PackageNumber} from '../_packageNumber'
import {FacebookLivestreamScriptSingle_ShippingPartner} from '../_shippingPartner'
import {FacebookLivestreamScriptSingle_ShippingPoint} from '../_shippingPoint'
import {FacecbookLivestreamScriptSingle_Weight} from '../_weight'
import {FacecbookLivestreamScriptSingle_Width} from '../_width'
import {StyledFacecbookLivestreamScriptSingleShippingInfo} from './_styled'

export const FacecbookLivestreamScriptSingleShippingInfo = ({...props}) => {
  return (
    <StyledFacecbookLivestreamScriptSingleShippingInfo {...props}>
      <div className="facebook-livestream-script-single-shipping-info__group">
        <FacebookLivestreamScriptSingle_ShippingPoint />
      </div>
      <div className="facebook-livestream-script-single-shipping-info__group">
        <FacebookLivestreamScriptSingle_ShippingPartner />
      </div>
      <div
        className="facebook-livestream-script-single-shipping-info__group"
        data-size="lg"
      >
        <div style={{height: 1.2, background: '#EFF2F8'}}></div>
      </div>
      <div
        className="facebook-livestream-script-single-shipping-info__group"
        data-size="lg"
      >
        <Text as="b" color="#191D32">
          Thiết lập dữ liệu chung
        </Text>
      </div>
      <div className="facebook-livestream-script-single-shipping-info__group">
        <NotificationBar collapse={true}>
          Khi sử dụng thiết lập thiết lập dữ liệu chung: giá trị Tiền thu hộ và
          Bảo hiểm hàng hóa của các đơn hàng được tạo ra dựa trên kịch bản lên
          đơn tự động sẽ được áp dụng cùng một giá trị mà bạn khai báo tại đây.
          <br />
          Nếu không sử dụng thiết lập dữ liệu chung: giá trị Tiền thu hộ và Bảo
          hiểm hàng hóa của các đơn hàng được tạo ra dựa trên kịch bản lên đơn
          tự động sẽ được tính toán dựa trên giá trị của các sản phẩm trong đơn
          hàng.
        </NotificationBar>
      </div>
      <div
        className="facebook-livestream-script-single-shipping-info__group"
        style={{display: 'flex', justifyContent: 'space-between'}}
      >
        <FacebookLivestreamScriptSingle_Cod
          style={{width: 'calc(50% - 8px)'}}
        />
        <FacebookLivestreamScriptSingle_Insurance
          style={{width: 'calc(50% - 8px)'}}
        />
      </div>
      <div
        className="facebook-livestream-script-single-shipping-info__group"
        data-size="lg"
      >
        <Text as="b" color="#191D32">
          Thiết lập thông số mặc định khi tạo đơn{' '}
          <Text color={THEME_SEMANTICS.failed}>*</Text>
        </Text>
      </div>
      <div
        className="facebook-livestream-script-single-shipping-info__group"
        style={{marginBottom: 0}}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
          }}
        >
          <div style={{width: 'calc(50% - 8px)', marginBottom: 24}}>
            <FacecbookLivestreamScriptSingle_PackageNumber />
          </div>
          <div style={{width: 'calc(50% - 8px)', marginBottom: 24}}>
            <FacecbookLivestreamScriptSingle_Weight />
          </div>
          <div style={{width: 'calc(100%/3 - 12px)', marginBottom: 24}}>
            <FacecbookLivestreamScriptSingle_Length />
          </div>
          <div style={{width: 'calc(100%/3 - 12px)', marginBottom: 24}}>
            <FacecbookLivestreamScriptSingle_Width />
          </div>
          <div style={{width: 'calc(100%/3 - 12px)', marginBottom: 24}}>
            <FacecbookLivestreamScriptSingle_Height />
          </div>
          <div style={{width: '100%'}}>
            <FacebookLivestreamScriptSingle_OrderNote />
          </div>
        </div>
      </div>
      <div
        className="facebook-livestream-script-single-shipping-info__group"
        style={{marginBottom: 0}}
      >
        <FacebookLivestreamScriptSingle_ConfigGroup />
      </div>
    </StyledFacecbookLivestreamScriptSingleShippingInfo>
  )
}
