import { createGlobalStyle } from 'styled-components'

import { standardTheme } from './theme'

// mantido para os componentes que importam as cores direto
export const theme = standardTheme

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
