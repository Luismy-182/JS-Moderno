import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthLayout from "./layout/AuthLayout"
import Login from "./paginas/Login";
import Registrar from "./paginas/Registrar";
import ConfirmarCuenta from "./paginas/ConfirmarCuenta";
import OlvidePassword from "./paginas/OlvidePassword";
import NuevoPassword from './paginas/NuevoPassword';
import { AuthProvider } from "./context/AuthProvider";


import RutaProtegida from "./paginas/RutaProtegida";
import AdministrarPacientes from "./paginas/AdministrarPacientes";


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="registrar" element={<Registrar />} />
            <Route path="confirmar-cuenta/:token" element={<ConfirmarCuenta />} />
            <Route path="olvide-password" element={<OlvidePassword />} />
            <Route path="olvide-password/:token" element={<NuevoPassword />} />
          </Route>

          <Route path="/admin" element={<RutaProtegida />}>
            <Route index element={<AdministrarPacientes />} />
          </Route>

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
