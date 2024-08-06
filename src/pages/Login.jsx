import { useEffect, useState } from "react";
import styled from "styled-components";
import astronauta from "../assets/astronauta.png";
import logogoogle from "../assets/logoogle.png";
import { useAuth } from '../contexts/useAuth';
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  const { currentUser, googleSignIn, register, login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [registrando, setRegistrando] = useState(false);

  const iniciarSesion = async () => {
    setLoading(true);
    try {
      await googleSignIn();
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
      setError("Error al iniciar sesión con Google");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/home");
    }
  }, [currentUser, navigate]);

  const functAutenticacion = async (e) => {
    e.preventDefault();
    setLoading(true);
    const correo = e.target.email.value;
    const contraseña = e.target.password.value;
    const nombre = e.target.nombre?.value;
    const apellido = e.target.apellido?.value;
    const fechaNacimiento = e.target.fechaNacimiento?.value;
    
    try {
      if (registrando) {
        await register(correo, contraseña, nombre, apellido, fechaNacimiento);
      } else {
        await login(correo, contraseña);
      }
    } catch (error) {
      setError("Error de autenticación. Verifique su correo y contraseña.");
    } finally {
      setLoading(false);
    }
  };

  return (
      <Container>
        <Section className="imgseccion">
          <Card>
            {!registrando && <img src={astronauta} alt="Astronauta" className="estilo-profile" />}
            <form onSubmit={functAutenticacion}>
              {registrando && (
                <>
                  <StyledInput type="text" placeholder="Nombre" id="nombre" />
                  <StyledInput type="text" placeholder="Apellido" id="apellido" />
                  <StyledInput type="date" placeholder="Fecha de Nacimiento" id="fechaNacimiento" />
                </>
              )}
              <StyledInput type="text" placeholder="Ingresar Email" id="email"/>
              <StyledInput type="password" placeholder="Ingresar Contraseña" id="password"/>
              <Button className="btnform" disabled={loading}>
                {registrando ? "Registrate" : "Inicia Sesión"}
              </Button>
            </form>
            {error && <Error>{error}</Error>}
            <h4>{registrando ? "Si ya tienes cuenta" : "No tienes cuenta"}
              <SwitchButton onClick={() => setRegistrando(!registrando)}>
                {registrando ? "Inicia sesión" : "Registrate"}
              </SwitchButton>
            </h4>
          </Card>
        </Section>
        <Section className="panelsesion">
          <h2>Iniciar sesión</h2>
          <GoogleButton onClick={iniciarSesion} disabled={loading}>
            <img src={logogoogle} alt="Google logo" />
            <span> Iniciar con Gmail</span>
          </GoogleButton>
        </Section>
      </Container>
  );
}


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 30px;
  background: radial-gradient(#fedd58, #ff4139);
  flex-direction: column-reverse;
  width: 100vw;

  @media (min-width: 64em) {
    flex-direction: row;
    .imgseccion {
      margin-top: 0;
    }
    .panelsesion {
      width: 50%;
    }
  }
`;

const Section = styled.section`
  &.imgseccion {
    background-color: white;
    border-radius: 15px;
    padding: 20px;
    display: flex;
    max-width: 500px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    gap: 35px;
    margin-top: 20px;
    box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.12);
  }

  &.panelsesion {
    display: flex;
    flex-direction: column;
    gap: 40px;
    height: 100%;
    justify-content: center;
    align-items: center;
    h2 {
      color: white;
      text-align: center;
      font-weight: 600;
      font-size: 52px;
    }
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;

  .estilo-profile {
    border-radius: 50%;
    height: 120px;
    width: 120px;
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;

const StyledInput = styled.input`
  background-color: #cccccc40;
  border-color: slategray;
  border-radius: 30px;
  width: 100%;
  padding: 15px;
  border-width: 0px;
  margin-bottom: 20px;
  font-size: 1rem;

  &:focus {
    outline: 1px solid cornflowerblue;
    box-shadow: 0 0 10px cornflowerblue;
  }

  &::placeholder {
    font-size: 1rem;
  }
`;

const Button = styled.button`
  background: #ff4139;
  border-color: slategray;
  border-radius: 30px;
  width: 50%;
  padding: 15px;
  border-width: 0px;
  margin-bottom: 20px;
  color: white;
  font-size: 1rem;
`;

const SwitchButton = styled.button`
  background-color: darkblue;
  border-radius: 30px;
  padding: 8px;
  border-width: 0px;
  color: white;
  font-size: 16px;
  margin-left: 1em;
`;

const Error = styled.p`
  font-size: 0.5em;
  color: red;
`;

const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  border-style: none;
  background-color: white;
  padding: 15px 30px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 22px;
  transition: all 0.25s ease;
  box-shadow: 0px 10px 20px 2px rgba(0, 0, 0, 0.12);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 20px 40px 0px rgb(0 0 0 / 10%);
    cursor: pointer;
  }

  img {
    width: 30px;
  }

  span {
    opacity: 0.8;
  }
`;