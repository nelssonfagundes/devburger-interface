import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

import SideMenu from '../../components/SideMenu'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 260px 1fr;
  min-height: 100vh;
  background: ${({ theme }) => theme.light};

  main {
    padding: 30px clamp(16px, 4vw, 40px);
    overflow-x: auto;
  }

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`

export default function AdminLayout() {
  return (
    <Wrapper>
      <SideMenu />
      <main>
        <Outlet />
      </main>
    </Wrapper>
  )
}
