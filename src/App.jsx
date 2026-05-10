import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Layout from './components/Layout'

import LoginPage       from './pages/LoginPage'
import RegisterPage    from './pages/RegisterPage'
import DashboardPage   from './pages/DashboardPage'
import AnimalsPage     from './pages/AnimalsPage'
import AnimalDetailPage  from './pages/AnimalDetailPage'
import CreateAnimalPage  from './pages/CreateAnimalPage'
import EditAnimalPage    from './pages/EditAnimalPage'
import CreateCriaPage    from './pages/CreateCriaPage'
import EditCriaPage      from './pages/EditCriaPage'
import ProfilePage       from './pages/ProfilePage'

function PrivateRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" replace />
}

function PublicRoute({ children }) {
  const { user } = useAuth()
  return !user ? children : <Navigate to="/" replace />
}

function AppRoutes() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login"    element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />

      {/* Rutas privadas */}
      <Route path="/" element={<PrivateRoute><Layout><DashboardPage /></Layout></PrivateRoute>} />
      <Route path="/perfil" element={<PrivateRoute><Layout><ProfilePage /></Layout></PrivateRoute>} />

      {/* Ovejas y Cabras — :tipo captura 'ovejas' o 'cabras' */}
      <Route path="/:tipo"                                     element={<PrivateRoute><Layout><AnimalsPage /></Layout></PrivateRoute>} />
      <Route path="/:tipo/crear"                               element={<PrivateRoute><Layout><CreateAnimalPage /></Layout></PrivateRoute>} />
      <Route path="/:tipo/:id"                                 element={<PrivateRoute><Layout><AnimalDetailPage /></Layout></PrivateRoute>} />
      <Route path="/:tipo/:id/editar"                          element={<PrivateRoute><Layout><EditAnimalPage /></Layout></PrivateRoute>} />
      <Route path="/:tipo/:animalId/crias/crear"               element={<PrivateRoute><Layout><CreateCriaPage /></Layout></PrivateRoute>} />
      <Route path="/:tipo/:animalId/crias/:criaId/editar"      element={<PrivateRoute><Layout><EditCriaPage /></Layout></PrivateRoute>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
