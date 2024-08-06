import styled from "styled-components";
import { AuthProvider } from './contexts/AuthContext';
import { MyRoutes } from "./routers/routes";

export default function App() {
  return (
    <AuthProvider>
      <Container>
        <MyRoutes />
      </Container>
    </AuthProvider>
  );
}
const Container = styled.div`
  max-width: 100vw;
  min-height: 100vh;
  display: flex;
`;
