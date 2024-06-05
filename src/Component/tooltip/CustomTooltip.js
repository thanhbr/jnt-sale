import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
export  const CustomToolTip = styled(({ className, ...props }) => (
    <Tooltip {...props}  classes={{ popper: className }} arrow={true} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "rgba(0, 31, 62, 0.95)",
      opacity:'100%',
      fontSize: '13px'
    },
    [`& .${tooltipClasses.arrow}`]: {
      "&:before": {
        border: "1px solid rgba(0, 31, 62, 0.95)",
      },
      color: 'rgba(0, 31, 62, 0.95)',
    },
  }));