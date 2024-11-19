import {createGlobalStyle} from 'styled-components';

export default createGlobalStyle `
    *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;
    background-color: #ffffff;
    color: #000000;
  }
`