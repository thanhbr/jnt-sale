import {Input} from 'common/form/input'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import useFacebookLiveStreamScriptSingle from '../../hooks/useFacebookLivestreamScriptSingle'

export const FacecbookLivestreamScriptSingle_PackageNumber = ({...props}) => {
  const {data, shippingInfoMethods} = useFacebookLiveStreamScriptSingle()
  const {packageNumber} = data.form

  return (
    <Input
      {...props}
      value={packageNumber.value}
      onChange={e =>
        shippingInfoMethods.handlePackageNumberChange(
          e.target.value.toString().replace(/[^0-9]/g, ''),
        )
      }
      label={
        <>
          Số kiện hàng <Text color={THEME_SEMANTICS.failed}>*</Text>
        </>
      }
    />
  )
}
