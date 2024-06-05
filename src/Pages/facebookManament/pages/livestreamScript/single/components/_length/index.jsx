import {CategoryInput} from 'common/form/input/_categoryInput'
import useFacebookLiveStreamScriptSingle from '../../hooks/useFacebookLivestreamScriptSingle'

export const FacecbookLivestreamScriptSingle_Length = ({...props}) => {
  const {data, shippingInfoMethods} = useFacebookLiveStreamScriptSingle()
  const {length} = data.form

  const handleChange = val => {
    const regArray = val.split('.').map(item => item.replace(/[^0-9]/g, ''))
    const checkArray = regArray.map((item, i) =>
      i === 1
        ? `.${item === '' ? '' : Number(item || 0)}`
        : item === ''
        ? ''
        : Number(item || 0),
    )
    shippingInfoMethods.handleLengthChange(checkArray.join(''))
  }

  return (
    <CategoryInput
      {...props}
      categoryList={[]}
      categoryValue={{name: 'Dài', value: ''}}
      categoryWidth={45}
      label="Kích thước (cm)"
      value={length.value}
      validateText={data.validate.lengthContent}
      validateType={data.validate.lengthType}
      onChange={handleChange}
      validateProps={{style: {width: '300%'}}}
    />
  )
}
