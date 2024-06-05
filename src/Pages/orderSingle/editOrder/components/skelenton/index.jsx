import Skeleton from '@mui/material/Skeleton'
import React from 'react'
import {Grid} from "@mui/material";

export const SkeletonOrderCustomer = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={12} md={12}>
          <Skeleton variant="text" width={440} height={34} />
        </Grid>
        <Grid item xs={6} sm={6} md={6} style={{marginTop: 24}}>
          <Skeleton variant="text" width={80} height={20} />
          <Skeleton variant="text" width={440} height={34} />
        </Grid>
        <Grid item xs={6} sm={6} md={6} style={{marginTop: 24}}>
          <Skeleton variant="text" width={80} height={20} />
          <Skeleton variant="text" width={440} height={34} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} style={{marginTop: 24}}>
          <Skeleton variant="text" width={80} height={20} />
          <Skeleton variant="text" width={890} height={34} />
        </Grid>
        <Grid item xs={4} sm={4} md={4} style={{marginTop: 24}}>
          <Skeleton variant="text" width={80} height={20} />
          <Skeleton variant="text" width={288} height={34} />
        </Grid>
        <Grid item xs={4} sm={4} md={4} style={{marginTop: 44}}>
          <Skeleton variant="text" width={288} height={34} />
        </Grid>
        <Grid item xs={4} sm={4} md={4} style={{marginTop: 44}}>
          <Skeleton variant="text" width={288} height={34} />
        </Grid>
      </Grid>
    </>
  )
}

export const SkeletonOrderProductInfo = () => {
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
        <Grid item xs={3} sm={3} md={3} style={{margin: '24px 0'}}>
          <Skeleton variant="text" width={212} height={34} />
        </Grid>
        <Grid item xs={9} sm={9} md={9} style={{margin: '24px 0'}}>
          <Skeleton variant="text" width={668} height={34} />
        </Grid>
      </Grid>
    </>
  )
}

export const SkeletonOrderShippingInfo = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={6} sm={6} md={6}>
          <Skeleton variant="text" width={172} height={34} />
          <Skeleton variant="text" width={212} height={34} />
        </Grid>
        <Grid item xs={6} sm={6} md={6}>
          <div style={{display: 'flex', justifyContent: 'end', marginRight: 7}}>
            <Skeleton variant="text" width={20} height={34} />
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={12} style={{margin: '24px 0'}}>
          <Grid container>
            <Grid item xs={6} sm={6} md={6}>
              <Grid container>
                <Grid item xs={6} sm={6} md={6}>
                  <Skeleton variant="text" width={80} height={20} />
                  <Skeleton variant="text" width={210} height={34} />
                </Grid>
                <Grid item xs={6} sm={6} md={6}>
                  <Skeleton variant="text" width={80} height={20} />
                  <Skeleton variant="text" width={210} height={34} />
                </Grid>
                <Grid item xs={4} sm={4} md={4} style={{marginTop: 24}}>
                  <Skeleton variant="text" width={80} height={20} />
                  <Skeleton variant="text" width={134} height={34} />
                </Grid>
                <Grid item xs={4} sm={4} md={4} style={{marginTop: 44}}>
                  <Skeleton variant="text" width={134} height={34} />
                </Grid>
                <Grid item xs={4} sm={4} md={4} style={{marginTop: 44}}>
                  <Skeleton variant="text" width={134} height={34} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
              <Skeleton variant="text" width={106} height={20} />
              <Skeleton variant="regular" width={440} height={105} />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Skeleton variant="text" width={172} height={25} />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Grid container>
                <Grid item xs={4} sm={4} md={4}>
                  <div style={{display: 'flex'}}>
                    <Skeleton variant="text" width={20} height={34} style={{margin: '18px 12px 12px 0'}} />
                    <Skeleton variant="text" width={40} height={68} />
                    <div style={{margin: '12px'}}>
                      <Skeleton variant="text" width={77} height={20} />
                      <Skeleton variant="text" width={100} height={20} />
                    </div>
                  </div>
                </Grid>
                <Grid item xs={4} sm={4} md={4}>
                  <div style={{margin: '12px', paddingLeft: '3rem'}}>
                    <Skeleton variant="text" width={77} height={20} />
                    <Skeleton variant="text" width={100} height={20} />
                  </div>
                </Grid>
                <Grid item xs={4} sm={4} md={4}>
                  <div style={{margin: '12px', paddingLeft: '3rem', display: 'flex'}}>
                    <Skeleton variant="text" width={220} height={20}  style={{margin: '0 12px'}} />
                    <Skeleton variant="text" width={20} height={20} />
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}



export const SkeletonOrderExtraInfo = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={12} md={12}>
          <Skeleton variant="text" width={143} height={34} />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Skeleton variant="text" width={80} height={20} style={{marginTop: 24}} />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Skeleton variant="text" width={343} height={34} />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Skeleton variant="text" width={80} height={20} style={{marginTop: 24}} />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Skeleton variant="text" width={343} height={34} />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Grid container>
            <Grid item xs={6} sm={6} md={6} style={{marginTop: 24}}>
              <Skeleton variant="text" width={80} height={20} />
              <Skeleton variant="text" width={164} height={34} />
            </Grid>
            <Grid item xs={6} sm={6} md={6} style={{marginTop: 24}}>
              <Skeleton variant="text" width={80} height={20} />
              <Skeleton variant="text" width={164} height={34} />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12} style={{marginTop: 24}}>
            <Skeleton variant="text" width={104} height={34} />
            <Skeleton variant="regular" width={343} height={68} />
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}