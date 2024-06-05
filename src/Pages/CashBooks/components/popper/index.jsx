import * as React from 'react';
import Popover from '@mui/material/Popover';
import { Button } from 'common/button'
import './index.scss'
import { CASHBOOKS_ICONS } from '../../interfaces/_icons'
import { Link } from 'react-router-dom'

export default function BasicPopover({ ...props }) {
  const { disabled } = props
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button
        appearance={props.item?.appearance}
        icon={CASHBOOKS_ICONS.chevron_left}
        onClick={handleClick}
        aria-describedby={id}
        variant="contained"
        iconPosition="back"
        disabled={disabled}
      >
        {props.item?.name}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        sx={{
          color: 'success.dark',
          display: 'inline',
          fontWeight: 'bold',
          mx: 0.5,
          fontSize: 14,
          top: 4
        }}
      >
        <ul className="common-popover__selected-action-menu">
          {props.item?.items.map((item, index) => (
            <li
              className="common-popover__selected-action-menu-item"
              key={index}
            >
              <Link disabled={disabled} to={item.url}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </Popover>
    </div>
  );
}
