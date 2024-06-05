import React from 'react';
import {Grid} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

const TBodySkeleton = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} style={{marginTop: 12}}>
          <Skeleton variant="text" width={890} height={44} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} style={{marginTop: 12}}>
          <Skeleton variant="text" width={890} height={44} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} style={{marginTop: 12}}>
          <Skeleton variant="text" width={890} height={44} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} style={{marginTop: 12}}>
          <Skeleton variant="text" width={890} height={44} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} style={{marginTop: 12}}>
          <Skeleton variant="text" width={890} height={44} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} style={{marginTop: 12}}>
          <Skeleton variant="text" width={890} height={44} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} style={{marginTop: 12}}>
          <Skeleton variant="text" width={890} height={44} />
        </Grid>
      </Grid>
    </>
  )
}

export default TBodySkeleton;