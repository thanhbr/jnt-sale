import {THEME_COLORS} from 'common/theme/_colors'
import styled from 'styled-components'

export const StyledRadioButton = styled.div`
.radio-item {
  display: block;
  position: relative;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.radio-item-label{
  padding-left:28px;
  font-size:14px
}

.radio-item input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}
.radio-item .checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 18px;
  width: 18px;
  background-color: #F5F5FA;
  border-radius: 50%;
  border: 1px solid #DDDDE3;
  margin-top: 9px;
}
.radio-item:hover input ~ .checkmark {
  background-color: #F5F5FA;
}

.radio-item input:checked ~ .checkmark {
  border: 1px solid #1E9A98;
border-radius: 24px;
margin-top: 9px;
}
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}
.radio-item input:checked ~ .checkmark:after {
  display: block;
}
.radio-item .checkmark:after {
  top: 2px;
  left: 2px;
  width: 12px;
  height: 12px;
	border: 2px solid #1E9A98;
  border-radius: 24px;
	background: #1E9A98;
  
}
`
