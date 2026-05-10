import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { getResumen } from '../api/animals'
import DonutChart from '../components/DonutChart'
import Spinner from '../components/Spinner'
import toast from 'react-hot-toast'

function StatCard({ title, value, unit }) {
  return (
    <div className="card text-center">
      <p className="text-gray-500 text-sm mb-1">{title}</p>
      <p className="text-4xl font-bold text-primary">
        {value} {unit && <span className="text-lg font-normal text-gray-500">{unit}</span>}
      </p>
    </div>
  )
}

export default function DashboardPage() {
  const { user } = useAuth()
  const [ovejas, setOvejas] = useState(null)
  const [cabras, setCabras] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const [o, c] = await Promise.all([getResumen('oveja'), getResumen('cabra')])
        setOvejas(o)
        setCabras(c)
      } catch (e) {
        toast.error(`Error cargando datos: ${e.message}`)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const nombre = user?.user_metadata?.nombre || user?.email || 'Usuario'

  if (loading) return <Spinner />

  return (
    <div className="py-4">
      <h1 className="text-2xl font-bold text-primary mb-1">Hola, {nombre} 👋</h1>
      <p className="text-gray-500 text-sm mb-5">Resumen de tu ganado</p>

      {/* Ovejas */}
      <h2 className="text-lg font-bold text-gray-700 mb-3">🐑 Ovejas</h2>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <StatCard title="Total ovejas"   value={ovejas?.total ?? 0} />
        <StatCard title="Total crías"    value={ovejas?.totalCrias ?? 0} />
        <StatCard title="Edad media"     value={ovejas?.edadMedia ?? 0} unit="años" />
      </div>
      <div className="card mb-2">
        <p className="text-sm font-semibold text-gray-600 mb-3 text-center">Estado del rebaño</p>
        <DonutChart data={[
          { label: 'Buena',   value: ovejas?.estados?.buena   ?? 0 },
          { label: 'Regular', value: ovejas?.estados?.regular ?? 0 },
          { label: 'Mala',    value: ovejas?.estados?.mala    ?? 0 },
        ]} />
      </div>
      <div className="card mb-6">
        <p className="text-sm font-semibold text-gray-600 mb-3 text-center">Estado de las crías (ovejas)</p>
        <DonutChart data={[
          { label: 'Viva',   value: ovejas?.criasVivas   ?? 0 },
          { label: 'Muerta', value: ovejas?.criasMuertas ?? 0 },
        ]} />
      </div>

      {/* Cabras */}
      <h2 className="text-lg font-bold text-gray-700 mb-3">🐐 Cabras</h2>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <StatCard title="Total cabras"   value={cabras?.total ?? 0} />
        <StatCard title="Total crías"    value={cabras?.totalCrias ?? 0} />
        <StatCard title="Edad media"     value={cabras?.edadMedia ?? 0} unit="años" />
      </div>
      <div className="card mb-2">
        <p className="text-sm font-semibold text-gray-600 mb-3 text-center">Estado del rebaño</p>
        <DonutChart data={[
          { label: 'Buena',   value: cabras?.estados?.buena   ?? 0 },
          { label: 'Regular', value: cabras?.estados?.regular ?? 0 },
          { label: 'Mala',    value: cabras?.estados?.mala    ?? 0 },
        ]} />
      </div>
      <div className="card">
        <p className="text-sm font-semibold text-gray-600 mb-3 text-center">Estado de las crías (cabras)</p>
        <DonutChart data={[
          { label: 'Viva',   value: cabras?.criasVivas   ?? 0 },
          { label: 'Muerta', value: cabras?.criasMuertas ?? 0 },
        ]} />
      </div>
    </div>
  )
}
