import {useState} from 'react'
import {FacebookLivestreamScript_FanpageLogoModal} from '../_fanpageLogoModal'
import {StyledFacebookLivestreamScript_FanpageLogoList} from './_styled'

export const FacebookLivestreamScript_FanpageLogoList = ({
  list,
  name,
  ...props
}) => {
  const [shouldOpenModal, setShouldOpenModal] = useState(false)

  return (
    <>
      <StyledFacebookLivestreamScript_FanpageLogoList
        {...props}
        onClick={() => setShouldOpenModal(true)}
      >
        {list
          .filter((item, i) => i < 4)
          .map((item, i) => (
            <div
              key={item?.page_id}
              className="facebook-livestream-script-fanpage-logo-list__item"
            >
              <img src={item?.page_avatar} alt={item?.page_name} />
              {list.length >= 5 && i === 3 && (
                <div className="facebook-livestream-script-fanpage-logo-list__cover">
                  +{list.length - 3}
                </div>
              )}
            </div>
          ))}
      </StyledFacebookLivestreamScript_FanpageLogoList>
      {shouldOpenModal && (
        <FacebookLivestreamScript_FanpageLogoModal
          list={list}
          name={name}
          onClose={() => setShouldOpenModal(false)}
        />
      )}
    </>
  )
}
