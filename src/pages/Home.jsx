
import styled from "styled-components";
import { useAuth } from "../contexts/useAuth";
export function Home() {
  const {currentUser,logOut} = useAuth();
  const cerrarSesión=async()=>{
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  }
 
  console.log(currentUser)

  return (
  <Container>
    <h1>Bienvenido </h1>
    <button onClick={cerrarSesión}>cerrar sesión</button>
  </Container>);
  }
const Container =styled.div`
  
`