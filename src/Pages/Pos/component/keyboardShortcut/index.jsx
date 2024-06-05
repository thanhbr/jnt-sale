import styled from 'styled-components'
import { POS_ICON } from '../../constants/icons'
import { Text } from '../../../../common/text'
import { usePosQuickProduct } from '../../hooks/usePosQuickProduct'
import KeyboardShortcutModal from '../modal/keyboardShortcutModal'

export const KeyboardShortCut = () => {
  const { modalShortcut } = usePosQuickProduct()
  return (
    <>
      <StyleShortcut data-active={modalShortcut.shortcut}
                     onClick={() => modalShortcut.onClickShortcut(!modalShortcut.shortcut)}>
        {POS_ICON.shortcut}
        <Text>Phím tắt</Text>
      </StyleShortcut>
      <KeyboardShortcutModal/>
    </>
  )
}

const StyleShortcut = styled.div`
  background: #FFFFFF;
  border: 1px solid #EBEEF5;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 12px;
  cursor: pointer;
  svg{
    margin-right: 4px;
  }
  :hover{
    border: 1px solid #1A94FF;
    svg{
      path{
        stroke: #1A94FF;
        &[clip-rule="evenodd"]{
          fill: #1A94FF;
        }
      }
      rect{
        fill: #1A94FF;
      }
    }
    span{
      color: #1A94FF!important;
    }
  }
  &[data-active=true]{
    border: 1px solid #1A94FF;
    svg{
      path{
        stroke: #1A94FF;
        &[clip-rule="evenodd"]{
          fill: #1A94FF;
        }
      }
      rect{
        fill: #1A94FF;
      }
    }
    span{
      color: #1A94FF!important;
    }
  }
`