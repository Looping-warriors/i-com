import React from 'react'
import Main_post from "../Components/Main_post"
import { styled } from "styled-components"

const Main_page = () => {
  return (
    <>
    <Container>
        <Main_post/>
    </Container>
    </>
  )
}

export default Main_page;

const Container=styled.div`
  margin-top:10vh;
  background:black;
  display:grid;
  overflow:hidden;
  grid-template-columns:1fr 2fr 1fr;
  grid-row-gap:50px;
`