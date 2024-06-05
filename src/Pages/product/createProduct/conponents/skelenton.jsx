import Skeleton from '@mui/material/Skeleton'
import React from 'react'
import {Grid} from "@mui/material";

export const SkeletonProductBasic = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={12} md={12}>
          <Skeleton variant="text" width={200} height={34} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} style={{marginTop: 24}}>
          <Skeleton variant="regular" width={897} height={68} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} style={{marginTop: 24}}>
          <Skeleton variant="text" width={80} height={30} />
          <Skeleton variant="text" width={890} height={44} />
        </Grid>
        <Grid item xs={6} sm={6} md={6} style={{marginTop: 24}}>
          <Skeleton variant="text" width={80} height={30} />
          <Skeleton variant="text" width={440} height={44} />
        </Grid>
        <Grid item xs={6} sm={6} md={6} style={{marginTop: 24}}>
          <Skeleton variant="text" width={80} height={30} />
          <Skeleton variant="text" width={440} height={44} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} style={{marginTop: 24}}>
          <Skeleton variant="text" width={80} height={30} />
          <Skeleton variant="text" width={890} height={44} />
        </Grid>
      </Grid>
    </>
  )
}

export const SkeletonProductInfo = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={6} sm={6} md={6}>
          <Skeleton variant="text" width={172} height={34} />
        </Grid>
        <Grid item xs={6} sm={6} md={6}>
          <div style={{display: 'flex', justifyContent: 'end', marginRight: 7}}>
            <Skeleton variant="text" width={172} height={34} />
          </div>
        </Grid>
        <Grid item xs={6} sm={6} md={6} style={{marginTop: 24}}>
          <Skeleton variant="text" width={80} height={30} />
          <Skeleton variant="text" width={440} height={44} />
        </Grid>
        <Grid item xs={6} sm={6} md={6} style={{marginTop: 24}}>
          <Skeleton variant="text" width={80} height={30} />
          <Skeleton variant="text" width={440} height={44} />
        </Grid>
      </Grid>
    </>
  )
}

export const SkeletonProductVersion = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={12} md={12}>
          <Skeleton variant="text" width={172} height={34} />
        </Grid>
        <Grid item xs={6} sm={6} md={6} style={{marginTop: 24}}>
          <Skeleton variant="text" width={80} height={30} />
          <Skeleton variant="text" width={440} height={44} />
        </Grid>
        <Grid item xs={6} sm={6} md={6} style={{marginTop: 24}}>
          <Skeleton variant="text" width={80} height={30} />
          <Skeleton variant="text" width={440} height={44} />
        </Grid>
        <Grid item xs={6} sm={6} md={6} style={{marginTop: 24}}>
          <Skeleton variant="text" width={80} height={30} />
          <Skeleton variant="text" width={440} height={44} />
        </Grid>
        <Grid item xs={6} sm={6} md={6} style={{marginTop: 24}}>
          <Skeleton variant="text" width={80} height={30} />
          <Skeleton variant="text" width={440} height={44} />
        </Grid>
      </Grid>
    </>
  )
}



export const SkeletonProductExtraInfo = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} style={{margin: '12px 24px'}}>
          <Skeleton variant="text" width={143} height={34} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} style={{margin: '12px 24px'}}>
          <Skeleton variant="text" width={143} height={34} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} style={{margin: '12px 24px'}}>
          <Skeleton variant="text" width={143} height={34} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} style={{margin: '12px 24px'}}>
          <Skeleton variant="text" width={143} height={34} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} style={{margin: '12px 24px'}}>
          <Skeleton variant="text" width={143} height={34} />
        </Grid>
      </Grid>
    </>
  )
}