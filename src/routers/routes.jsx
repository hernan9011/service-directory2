import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Home} from "../pages/Home";
import {Login} from "../pages/Login";
import {Perfil} from "../pages/Perfil";
import PrivateRoute from "../components/PrivateRoute";

export function MyRoutes() {
  return (
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<PrivateRoute> <Home /> </PrivateRoute>} />
        <Route path="/perfil" element={<PrivateRoute> <Perfil/> </PrivateRoute>}/>
    </Routes>
  </BrowserRouter>);
}

  