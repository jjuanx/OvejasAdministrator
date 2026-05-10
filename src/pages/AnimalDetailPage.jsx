import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getAnimal } from '../api/animals'
import { deleteCria } from '../api/crias'
import CriaCard from '../components/CriaCard'
import DeleteModal from '../components/DeleteModal'
import Spinner from '../components/Spinner'
import toast from 'react-hot-toast'

export default function AnimalDetailPage() {
  const { tipo, id } = useParams()
  const animalType = tipo === 'ovejas' ? 'oveja' : 'cabra'
  const label      = tipo === 'ovejas' ? 'Oveja'  : 'Cabra'
  const icon       = tipo === 'ovejas' ? '🐑'     : '🐐'
  const navigate   = useNavigate()

  const [animal,    setAnimal]    = useState(null)
  const [toDelete,  setToDelete]  = useState(null)
  const [loading,   setLoading]   = useState(true)

  const load = async () => {
    try {
      setLoading(true)
      const data = await getAnimal(id)
      setAnimal(data)
    } catch (e) {
      toast.error(`Error: ${e.message}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [id])

  const confirmDeleteCria = async () => {
    try {
      await deleteCria(toDelete.id)
      toast.success('Cría eliminada')
      setToDelete(null)
      load()
    } catch (e) {
      toast.error(`Error: ${e.message}`)
      setToDelete(null)
    }
  }

  const estadoColor = {
    buena:   'bg-teal/10 text-teal font-semibold',
    regular: 'bg-yellow-50 text-yellow-700 font-semibold',
    mala:    'bg-red-50 text-red-700 font-semibold',
  }

  if (loading) return <Spinner />
  if (!animal) return null

  return (
    <div className="py-4">
      {/* Header card */}
      <div className="card bg-primary text-white mb-5">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-5xl">{icon}</span>
          <div>
            <p className="text-sm opacity-75">{label}</p>
            <h1 className="text-3xl font-bold">ID: {animal.custom_id}</h1>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-y-2 text-sm">
          <div>
            <p className="opacity-75">Edad</p>
            <p className="font-semibold">{animal.edad ?? '—'} años</p>
          </div>
          <div>
            <p className="opacity-75">Nacimiento</p>
            <p className="font-semibold">{animal.fecha_nacimiento}</p>
          </div>
          <div>
            <p className="opacity-75">Producción leche</p>
            <p className="font-semibold capitalize">{animal.estado}</p>
          </div>
          <div>
            <p className="opacity-75">Veces parida</p>
            <p className="font-semibold">{animal.veces_parida}</p>
          </div>
          <div>
            <p className="opacity-75">Último parto</p>
            <p className="font-semibold">{animal.fecha_ultimo_parto ?? '—'}</p>
          </div>
          <div>
            <p className="opacity-75">Crías vivas / muertas</p>
            <p className="font-semibold">{animal.crias_vivas} / {animal.crias_muertas}</p>
          </div>
        </div>

        <button
          onClick={() => navigate(`/${tipo}/${id}/editar`)}
          className="mt-4 w-full bg-white/20 hover:bg-white/30 text-white rounded-lg py-2 text-sm font-medium transition-colors"
        >
          ✏️ Editar {label}
        </button>
      </div>

      {/* Añadir cría */}
      <button
        onClick={() => navigate(`/${tipo}/${id}/crias/crear`)}
        className="btn-teal w-full mb-5 flex items-center justify-center gap-2"
      >
        <span className="text-lg">＋</span> Añadir Cría
      </button>

      {/* Crías */}
      <h2 className="text-lg font-bold text-gray-700 mb-3">Crías ({animal.crias?.length ?? 0})</h2>

      {(!animal.crias || animal.crias.length === 0) ? (
        <div className="text-center py-10 text-gray-400">
          <p className="text-3xl mb-2">🐣</p>
          <p>Esta {label.toLowerCase()} no tiene crías todavía.</p>
        </div>
      ) : (
        animal.crias.map(cria => (
          <CriaCard
            key={cria.id}
            cria={cria}
            onEdit={() => navigate(`/${tipo}/${id}/crias/${cria.id}/editar`)}
            onDelete={() => setToDelete(cria)}
          />
        ))
      )}

      <DeleteModal
        isOpen={toDelete !== null}
        title={`Eliminar cría ${toDelete?.custom_id ?? ''}`}
        description="Esta acción eliminará la cría permanentemente."
        onConfirm={confirmDeleteCria}
        onCancel={() => setToDelete(null)}
      />
    </div>
  )
}
