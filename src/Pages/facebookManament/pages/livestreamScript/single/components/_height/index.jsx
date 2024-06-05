import {CategoryInput} from 'common/form/input/_categoryInput'
import useFacebookLiveStreamScriptSingle from '../../hooks/useFacebookLivestreamScriptSingle'

export const FacecbookLivestreamScriptSingle_Height = ({...props}) => {
  const {data, shippingInfoMethods} = useFacebookLiveStreamScriptSingle()
  const {height} = data.form

  const handleChange = val => {
    const regArray = val.split('.').map(item => item.replace(/[^0-9]/g, ''))
    const checkArray = regArray.map((item, i) =>
      i === 1
        ? `.${item === '' ? '' : Number(item || 0)}`
        : item === ''
        ? ''
        : Number(item || 0),
    )
    shippingInfoMethods.handleHeightChange(checkArray.join(''))
  }

  return (
    <CategoryInput
      {...props}
      categoryList={[]}
      categoryValue={{name: 'Cao', value: ''}}
      categoryWidth={50}
      validateText={data.validate.height ? <></> : ''}
      validateType="danger"
      value={height.value}
      onChange={handleChange}
    />
  )
}
