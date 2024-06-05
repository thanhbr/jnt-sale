import { usePosCustomer } from '../../../hooks/usePosCustomer'
import { Radio } from '../../../../../common/form/radio'
import { Text } from '../../../../../common/text'
import styled from 'styled-components'
import { THEME_COLORS } from '../../../../../common/theme/_colors'

export const CustomerGender = ({ ...props }) => {

  const { gender } = usePosCustomer()

  return (
    <StyledGender>
      <Text as="label" className="input__label" color={THEME_COLORS.gray_900}>&nbsp; </Text>
      <div className={'gender-content'}>
        {gender.list.length > 0 &&
        gender.list.map(item => (
          <div className={'item-gender'}>
            <Radio checked={gender.value?.value == item.value} onClick={() => gender.onGenderChange(item)}/>
            <Text>{item.name}</Text>
          </div>
        ))}
      </div>
    </StyledGender>
  )
}

const StyledGender = styled.div`
  .gender-content{
    display: flex;
    align-items: center;
  }
  .item-gender{
    display: flex;
    align-items: center;
    width: 50%;
    padding-left: 6px;
    div{
      margin-right: 14px;
    }
  }
`