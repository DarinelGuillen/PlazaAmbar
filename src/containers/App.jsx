import { useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import UserContext from '../contexts/UserContext';
import AdminContext from '../contexts/AdminContext';
import ProtectedParentRoute from './ProtectedParentRoute';
import ProtectedParentRouteAdmin from './ProtectedParentRouteAdmin';
import Login from "../pages/Login"
import Landing from '../pages/Landing';
import General from '../pages/General';
import Admin from '../pages/Admin';
import CommonUser from '../pages/CommonUser';
function App() {
  const [isLoged, setIsLoged] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  return (
      <BrowserRouter>
        <UserContext.Provider value={{isLoged, setIsLoged}}>
        <AdminContext.Provider value={{ isAdmin, setIsAdmin}}>
          
          <Routes>
            <Route path="/" element={<Landing/>}/>
            <Route path="/Login" element={<Login/>}/>
              <Route element={<ProtectedParentRoute isLoged={isLoged}/>}>
                  <Route path="/General" element={<General/>}/>
                  <Route path="/CommonUser" element={<CommonUser/>}/>
              </Route>
              <Route element={<ProtectedParentRouteAdmin isLoged={isAdmin}/>}>
                  <Route path="/Admin" element={<Admin/>}/>
              </Route>

          </Routes>

        </AdminContext.Provider>
        </UserContext.Provider>

      </BrowserRouter>
);
}

export default App;
