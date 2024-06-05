import styled from 'styled-components'

export const StyledGridLayout = styled.div`
  &[data-model='container'] {
    max-width: 1360px;
    margin: 0 auto;
  }

  .grid-layout {
    &__container {
      width: calc(100% + 24px);
      margin: 0 -12px;

      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
    }

    &__column {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
    }

    &__section {
      margin: 0 12px 24px 12px;
      padding: 24px;
      padding-bottom: 0;

      border-radius: 8px;

      transition: all 0.25s;
    }

    &__section-header {
      position: relative;

      margin-bottom: 24px;
    }

    &__section-header-actions {
      position: absolute;
      top: 12px;
      right: 0px;

      display: flex;
      align-items: center;
      justify-content: flex-end;

      & > * {
        margin-left: 12px;
      }
    }
  }
`
