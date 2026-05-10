import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const navItems = [
  { to: '/',       label: 'Panel',   icon: '📊' },
  { to: '/ovejas', label: 'Ovejas',  icon: '🐑' },
  { to: '/cabras', label: 'Cabras',  icon: '🐐' },
  { to: '/perfil', label: 'Perfil',  icon: '👤' },
]

export default function Navbar() {
  const { logout } = useAuth()
  const navigate   = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
    } catch {
      toast.error('Error al cerrar sesión')
    }
  }

  return (
    <>
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-primary text-white flex items-center justify-between px-4 h-14 shadow-md">
        <span className="font-bold text-lg">🐾 Ganadería</span>
        <button
          onClick={handleLogout}
          className="text-sm bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors"
        >
          Salir
        </button>
      </header>

      {/* Bottom nav (mobile-first) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 flex">
        {navItems.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center justify-center py-2 text-xs font-medium transition-colors
               ${isActive ? 'text-primary' : 'text-gray-500 hover:text-primary'}`
            }
          >
            <span className="text-xl">{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>
    </>
  )
}
