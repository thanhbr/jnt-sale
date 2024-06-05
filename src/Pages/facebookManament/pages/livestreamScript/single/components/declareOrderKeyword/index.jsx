import useFacebookLiveStreamScriptSingle from '../../hooks/useFacebookLivestreamScriptSingle'
import {FacebookLivestreamScriptSingle_PricePolicySelect} from '../_pricePolicySelect'
import {FacebookLivestreamScriptSingle_ProductSearchInput} from '../_productSearchInput'
import {FacebookLivestreamScriptSingle_ProductTable} from '../_productTable'
import {FacebookLivestreamScriptSingle_WarehouseAutocomplete} from '../_warehouseAutocomplete'
import {StyledFacebookLivestreamScriptSingleDeclareOrderKeyword} from './_styled'

export const FacebookLivestreamScriptSingleDeclareOrderKeyword = ({
  ...props
}) => {
  const {data} = useFacebookLiveStreamScriptSingle()
  const {product} = data.form

  return (
    <StyledFacebookLivestreamScriptSingleDeclareOrderKeyword
      {...props}
      style={{paddingBottom: product.value.length > 0 ? 24 : 0}}
    >
      <div
        className="facebook-livestream-script-single-declare-livestream-keyword__group"
        style={{
          marginBottom: 24,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <FacebookLivestreamScriptSingle_WarehouseAutocomplete
          style={{width: 'calc(50% - 8px)'}}
        />
        <FacebookLivestreamScriptSingle_PricePolicySelect
          style={{width: 'calc(50% - 8px)'}}
        />
      </div>
      <div className="facebook-livestream-script-single-declare-livestream-keyword__group">
        <FacebookLivestreamScriptSingle_ProductSearchInput />
      </div>
      {product.value.length > 0 && (
        <div
          className="facebook-livestream-script-single-declare-livestream-keyword__group"
          data-size="lg"
        >
          <FacebookLivestreamScriptSingle_ProductTable />
        </div>
      )}
    </StyledFacebookLivestreamScriptSingleDeclareOrderKeyword>
  )
}
