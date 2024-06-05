import {Button} from 'common/button'
import {Skeleton} from '@mui/material'
import {SHIPPING_ICONS} from 'Pages/shippingTracking/_icons'

export const RightLoading = ({...props}) => {
  return (
    <>
      <div className='boxTracking__header'>
        <div className='boxTracking__header__tracking'>
          <p>Mã vận đơn: </p>
          <Skeleton
            variant="text"
            sx={{
              width: 240,
              height: 19,
              background: 'linear-gradient(0deg, rgba(244, 247, 252, 0.98), rgba(244, 247, 252, 0.98)), #00081D;',
            }}
          />
        </div>
        <div className='boxTracking__header__actions'>
          <div className='boxTracking__header__action-item'>
            <Button
              size='sm'
              appearance={'primary'}
              icon={SHIPPING_ICONS.refresh}
            >
              Làm mới hành trình
            </Button>
          </div>
          <div className='boxTracking__header__action-item'>
          <Button
            size='sm'
            appearance={'secondary'}
            icon={SHIPPING_ICONS.arrowLeft}
            data-disabled={'true'}
            disabled = 'disabled'
          />
          </div>
          <div className='boxTracking__header__action-item'>
            <Button
              size='sm'
              appearance={'secondary'}
              icon={SHIPPING_ICONS.arrowRight}
              data-disabled={'true'}
              disabled = 'disabled'
            />
          </div>
        </div>
      </div>
      <div className='boxTracking__table'>
        <div className="row-tab-detail__table">
          <div className="row-tab-detail__thead">
            <div className="row-tab-detail__tr">
              {Array.from(Array(5), (e, i) => (
                <div className="row-tab-detail__th">
                  <Skeleton
                    variant="text"
                    sx={{
                      width: '100%',
                      height: 20,
                      background:
                        'linear-gradient(0deg, rgba(244, 247, 252, 0.98), rgba(244, 247, 252, 0.98)), #00081D;',
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="row-tab-detail__tbody">
            <div className="row-tab-detail__tr">
              {Array.from(Array(5), (e, i) => (
                <div className="row-tab-detail__td">
                  <Skeleton
                    variant="text"
                    sx={{
                      width: '100%',
                      height: 20,
                      background:
                        'linear-gradient(0deg, rgba(244, 247, 252, 0.98), rgba(244, 247, 252, 0.98)), #00081D;',
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='boxTracking__tracking'>
        <div className='boxTracking__tracking__title'>
          <Skeleton
            variant="text"
            sx={{
              width: 130,
              height: 23,
              background: 'linear-gradient(0deg, rgba(244, 247, 252, 0.98), rgba(244, 247, 252, 0.98)), #00081D;',
            }}
          />
        </div>
        <div className='boxTracking__tracking__trackings'>
          <div className="row-tab-history__list">
            {Array.from(Array(3), (e, i) => (
              <div key={i} className="row-tab-history__item">
                <div className="row-tab-history__bullet">
                  <div></div>
                </div>
                <div>
                  <Skeleton
                    variant="text"
                    sx={{
                      width: 450,
                      height: 22,
                      background: 'linear-gradient(0deg, rgba(244, 247, 252, 0.98), rgba(244, 247, 252, 0.98)), #00081D;',
                    }}
                  />
                  <div className="row-tab-history__content">
                    <p style={{margin: '0 10px 0 0'}}>
                      <Skeleton
                        variant="text"
                        sx={{
                          width: 20,
                          height: 24,
                          background: 'linear-gradient(0deg, rgba(244, 247, 252, 0.98), rgba(244, 247, 252, 0.98)), #00081D;',
                        }}
                      />
                    </p>
                    <Skeleton
                      variant="text"
                      sx={{
                        width: 130,
                        height: 24,
                        background: 'linear-gradient(0deg, rgba(244, 247, 252, 0.98), rgba(244, 247, 252, 0.98)), #00081D;',
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}