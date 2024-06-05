import {CircularProgress} from '@mui/material'
import {StyledSpinner} from './_styled'

export const Spinner = ({size = 32, thickness = 3, ...props}) => {
  return (
    <StyledSpinner {...props}>
      <CircularProgress size={size} thickness={thickness} />
    </StyledSpinner>
  )
}
