import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function SimpleBackdrop({...props}) {
  const classes = useStyles();
  const {status = false, customeClassName = ""} = props;
  const handleClose = () => {
    // setOpen(false);
  };
  const handleToggle = () => {
    // setOpen(!open);
  };

  return (
    <div>
      <Backdrop className={`${classes.backdrop} ${customeClassName}`} open={status} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}