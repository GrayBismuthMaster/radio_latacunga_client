import './App.css'
//Index pages
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import Home from "../pages/home";
//INICIO USERS
import Users from "../pages/users";
import CreateUser from "../pages/Users/CreateUser"
import EditUser from "../pages/Users/EditUser"
import DeleteUser from "../pages/Users/DeleteUser"
//FIN USERS
//INICIO SOLICITUDES
import Solicitudes from "../pages/solicitudes";
import CreateSolicitud from "../pages/Solicitudes/CreateSolicitud"
import EditSolicitud from "../pages/Solicitudes/EditSolicitud"
import DeleteSolicitud from "../pages/Solicitudes/DeleteSolicitud"
//FIN SOLICITUDES

//INICIO EQUIPOS
import Equipos from "../pages/equipos";
import CreateEquipo from "../pages/Equipos/CreateEquipo"
import EditEquipo from "../pages/Equipos/EditEquipo"
import DeleteEquipo from "../pages/Equipos/DeleteEquipo"
//FIN EQUIPOS
//INICIO COMPONENTES
import Componentes from "../pages/componentes";
import CreateComponente from "../pages/Componentes/CreateComponente"
import EditComponente from "../pages/Componentes/EditComponente"
import DeleteComponente from "../pages/Componentes/DeleteComponente"
//FIN COMPONENTES

//INICIO MANTENIMIENTOS
import Mantenimientos from "../pages/mantenimientos";
import CreateMantenimiento from "../pages/Mantenimientos/CreateMantenimiento"
import EditMantenimiento from "../pages/Mantenimientos/EditMantenimiento"
import DeleteMantenimiento from "../pages/Mantenimientos/DeleteMantenimiento"
//FIN MANTENIMIENTOS
//INICIO TRABAJOS NO RUTINARIOS
import TrabajosNoRutinarios from "../pages/trabajosNoRutinarios";
import CreateTrabajoNoRutinario from "../pages/TrabajosNoRutinarios/CreateTrabajoNoRutinario"
import EditTrabajoNoRutinario from "../pages/TrabajosNoRutinarios/EditTrabajoNoRutinario"
import DeleteTrabajoNoRutinario from "../pages/TrabajosNoRutinarios/DeleteTrabajoNoRutinario"
//FIN TRABAJOS NO RUTINARIOS
//INICIO CALENDARIO
import Calendario from '../pages/Calendario/Index';
//FIN CALENDARIO
import ProtectedRoutes from './ProtectedRoutes'

//USER ROLE
import Profile from '../pages/Profile/Profile';
//END USER ROLE
import ReadMantenimientosList from '../pages/Mantenimientos/ReadMantenimientosList';
function App() {
  return (
    <>
      <Router> 
              {/* PUBLIC ROUTES */}
        <Routes>
          <Route path="/" element={<Login />}/>
              {/* PRIVATE ROUTES */}
          <Route element={<ProtectedRoutes/>}>  
                <Route path="/home" element={<Home/>}/>
                <Route path="/users/*" element={<Users/>}>
                  <Route path="new" element={<CreateUser/>}/>
                  <Route path='edit' element={<EditUser/>}/>
                  <Route path="delete" element={<DeleteUser/>}/>
                </Route>
                <Route path="/solicitudes/*" element={<Solicitudes/>}>
                  <Route path="new" element={<CreateSolicitud/>}/>
                  <Route path='edit' element={<EditSolicitud/>}/>
                  <Route path="delete" element={<DeleteSolicitud/>}/>
                </Route>
                <Route path="/equipos/*" element={<Equipos/>}>
                  <Route path="new" element={<CreateEquipo/>}/>
                  <Route path='edit' element={<EditEquipo/>}/>
                  <Route path="delete" element={<DeleteEquipo/>}/>
                </Route>
                <Route path="/componentes/*" element={<Componentes/>}>
                  <Route path="new" element={<CreateComponente/>}/>
                  <Route path='edit' element={<EditComponente/>}/>
                  <Route path="delete" element={<DeleteComponente/>}/>
                </Route>
                <Route path="/mantenimientos/*" element={<Mantenimientos/>}>
                  <Route path="show" element={<ReadMantenimientosList/>}/>
                  <Route path="new" element={<CreateMantenimiento/>}/>
                  <Route path='edit' element={<EditMantenimiento/>}/>
                  <Route path="delete" element={<DeleteMantenimiento/>}/>
                </Route>
                <Route path="/trabajosNoRutinarios/*" element={<TrabajosNoRutinarios/>}>
                  <Route path="new" element={<CreateTrabajoNoRutinario/>}/>
                  <Route path='edit' element={<EditTrabajoNoRutinario/>}/>
                  <Route path="delete" element={<DeleteTrabajoNoRutinario/>}/>
                </Route>
                {/* CALENDARIO  */}
                <Route path="/calendario" element = {<Calendario/>} />
                {/* FIN CALENDARIO  */}
                <Route path="/profile" element={<Profile/>}/>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App
