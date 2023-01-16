import './App.css'
//Index pages
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import Home from "../pages/home";
//INCIO USERS
import Users from "../pages/users";
import CreateUser from "../components/Dashboard/Content/Users/CreateUser"
import EditUser from "../components/Dashboard/Content/Users/EditUser"
import DeleteUser from "../components/Dashboard/Content/Users/DeleteUser"
//FIN USERS
import ProtectedRoutes from './ProtectedRoutes'
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
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App
