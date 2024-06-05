import {StyledCustom} from "./styledCustom";

export const CustomLayout = (
  {
    actions,
    ...props
  }
) => {
  return (
    <StyledCustom>
      <div className={'pos-layout'}>
        {props.children}
      </div>
    </StyledCustom>
  )

}