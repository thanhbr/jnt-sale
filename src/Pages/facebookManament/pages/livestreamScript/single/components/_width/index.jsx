import {CategoryInput} from 'common/form/input/_categoryInput'
import useFacebookLiveStreamScriptSingle from '../../hooks/useFacebookLivestreamScriptSingle'

export const FacecbookLivestreamScriptSingle_Width = ({...props}) => {
  const {data, shippingInfoMethods} = useFacebookLiveStreamScriptSingle()
  const {width} = data.form

  const handleChange = val => {
    const regArray = val.split('.').map(item => item.replace(/[^0-9]/g, ''))
    const checkArray = regArray.map((item, i) =>
      i === 1
        ? `.${item === '' ? '' : Number(item || 0)}`
        : item === ''
        ? ''
        : Number(item || 0),
    )
    shippingInfoMethods.handleWidthChange(checkArray.join(''))
  }

  return (
    <CategoryInput
      {...props}
      categoryList={[]}
      categoryValue={{name: 'Rộng', value: ''}}
      categoryWidth={55}
      validateText={data.validate.width ? <></> : ''}
      validateType="danger"
      value={width.value}
      onChange={handleChange}
    />
  )
}
