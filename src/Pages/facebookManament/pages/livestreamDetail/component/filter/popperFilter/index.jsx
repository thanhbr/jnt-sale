import { Popover } from '@mui/material'

export const PopperFilter = ({onActionClick,anchorEl,onClose,title, ...props}) => {

  const handleItemClick = (key, data) => {
    onActionClick(key, data)
    onClose()
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return(
    <Popover
      id={id}
      className="common-popover"
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      placement={'right'}
      sx={{left: '48px'}}
    >
      {props?.children}
    </Popover>
  )
}
