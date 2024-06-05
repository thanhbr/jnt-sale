import * as React from 'react';
import Popover from '@mui/material/Popover';
import { Button } from 'common/button'
import './index.scss'
import { DELIVERY_ICONS } from '../../interfaces/_icons'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function BasicPopover({ ...props }) {
  const {t} = useTranslation()
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
        icon={DELIVERY_ICONS.chevron_left}
        onClick={handleClick}
        aria-describedby={id}
        variant="contained"
        iconPosition="back"
        disabled={disabled}
      >
        {t(props.item?.name)}
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
              <Link disabled={disabled} to={item.url}>{t(item.name)}</Link>
            </li>
          ))}
        </ul>
      </Popover>
    </div>
  );
}