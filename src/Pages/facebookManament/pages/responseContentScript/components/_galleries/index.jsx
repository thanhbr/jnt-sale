import {useState} from 'react'
import {CarouselModal} from '../detailDrawer'
import {StyledFacebookResponseContentScript_Galleries} from './_styled'

export const FacebookResponseContentScript_Galleries = ({list, ...props}) => {
  const [shouldOpenModal, setShouldOpenModal] = useState(false)

  return (
    <>
      <StyledFacebookResponseContentScript_Galleries {...props}>
        {list
          .filter((item, i) => i <= 3)
          .map((item, i) => (
            <div
              key={i}
              className="facebook-response-content-script-galleries__item"
              style={{cursor: 'pointer'}}
              onClick={() => setShouldOpenModal(true)}
            >
              <img
                className="facebook-response-content-script-galleries__image"
                src={item}
                alt={`image-${i + 1}`}
              />
              {list.length > 4 && i === 3 && (
                <div className="facebook-response-content-script-galleries__cover">
                  +{list.length - 3}
                </div>
              )}
            </div>
          ))}
      </StyledFacebookResponseContentScript_Galleries>
      {shouldOpenModal && (
        <CarouselModal
          config={{backdrop: true}}
          data={list.map((item, i) => ({id: `image-${i}`, name: i, url: item}))}
          onClose={() => setShouldOpenModal(false)}
        />
      )}
    </>
  )
}
