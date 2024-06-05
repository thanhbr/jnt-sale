import {FacebookLivestreamScriptSingle_OrderConfirm} from '../_orderConfirm'
import {FacebookLivestreamScriptSingle_OrderSyntax} from '../_orderSyntax'
import {FacebookLivestreamScriptSingle_OrderTime} from '../_orderTime'
import {StyledFacecbookLivestreamScriptSingleConfigAutoMenuSyntax} from './_styled'

export const FacecbookLivestreamScriptSingleConfigAutoMenuSyntax = ({
  ...props
}) => {
  return (
    <StyledFacecbookLivestreamScriptSingleConfigAutoMenuSyntax {...props}>
      <div className="facebook-livestream-script-single-config-auto-menu-syntax__group">
        <FacebookLivestreamScriptSingle_OrderSyntax />
      </div>
      <div className="facebook-livestream-script-single-config-auto-menu-syntax__group">
        <FacebookLivestreamScriptSingle_OrderTime />
      </div>
      <div className="facebook-livestream-script-single-config-auto-menu-syntax__group">
        <FacebookLivestreamScriptSingle_OrderConfirm />
      </div>
    </StyledFacecbookLivestreamScriptSingleConfigAutoMenuSyntax>
  )
}
