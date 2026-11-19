import { createGlobalStyle } from 'styled-components';
const styled = { createGlobalStyle };
export const GlobalStyles = styled.createGlobalStyle `
  :root {
    --Background: #080808;
    --white: #fff;
    --light-gray: #dcdcdc;
    --link-color: #bdbdbd;
    --green: #390711;
    --emerald: #c9a16b;
    --burgundy: #390711;
    --gold: #c9a16b;
    --navbar-underline: rgba(201, 164, 92, .55);
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    -webkit-font-smoothing: antialiased;
  }

  html,
  body {
    max-width: 100vw;
    overflow-x: hidden;
    font-family: 'SF Pro Display', sans-serif;
    background-color: var(--Background);
    color: var(--white);
    scroll-snap-type: y mandatory;

    &::-webkit-scrollbar {
      width: 0.5rem;
      border-radius: 0.5rem;
      &-thumb {
        background: var(--link-color);
        border-radius: 0.5rem;
      }

      &-track {
        background: var(--Background);
      }
    }
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  .parallax {
    overflow: hidden;
    margin: 0;
    white-space: nowrap;
    display: flex;
    flex-wrap: nowrap;
  }

  .parallax .scroller {
    display: flex;
    white-space: nowrap;
    display: flex;
    flex-wrap: nowrap;
  }

  .scroller span {
    display: block;
    margin-right: 5rem;
  }

`;
