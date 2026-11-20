import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

import Footer from '../../components/Footer'
import Header from '../../components/Header'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  main {
    flex: 1;
  }
`

export default function UserLayout() {
  return (
    <Wrapper>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </Wrapper>
  )
}
