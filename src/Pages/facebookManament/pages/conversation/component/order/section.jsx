import {Text} from 'common/text'
import styled from 'styled-components'

export const Section = ({heading, headerAction, ...props}) => {
  return (
    <Container {...props}>
      <Header>
        <Text as="h5" fontSize={15} lineHeight={21}>
          {heading}
        </Text>
        {headerAction && <HeaderAction>{headerAction}</HeaderAction>}
      </Header>
      {props?.children && <Content>{props.children}</Content>}
    </Container>
  )
}

const Container = styled.div`
  padding: 24px 24px 0 24px;
`

const Header = styled.div`
  position: relative;

  margin-bottom: 16px;
`

const HeaderAction = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  .collapse-action{
    &[data-expand='false'] {
        transform: rotate(180deg);
        transition: transform 0.25s;
      }
  }
`

const Content = styled.div``
