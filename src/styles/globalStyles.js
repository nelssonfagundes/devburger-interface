import { createGlobalStyle } from 'styled-components'

export const theme = {
  purple: '#9758a6',
  purpleDark: '#6f357c',
  green: '#5c9d2b',
  dark: '#1f1f1f',
  darker: '#121212',
  light: '#f0f0f0',
  white: '#ffffff',
  gray: '#9a9a9d',
}

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    outline: none;
  }

  body {
    background: ${theme.light};
    -webkit-font-smoothing: antialiased;
  }

  button, a {
    cursor: pointer;
  }

  /* notificações no estilo do projeto */
  .Toastify__toast--success { background: ${theme.green}; }
  .Toastify__toast--error { background: #d64545; }
  .Toastify__toast--info { background: ${theme.purple}; }
`
