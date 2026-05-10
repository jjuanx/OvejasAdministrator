import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getAnimals, deleteAnimal, searchAnimalByCustomId } from '../api/animals'
import AnimalCard from '../components/AnimalCard'
import DeleteModal from '../components/DeleteModal'
import Spinner from '../components/Spinner'
import toast from 'react-hot-toast'

export default function AnimalsPage() {
  const { tipo } = useParams()   // 'ovejas' | 'cabras'
  const animalType = tipo === 'ovejas' ? 'oveja' : 'cabra'
  const label      = tipo === 'ovejas' ? 'Oveja'  : 'Cabra'
  const icon       = tipo === 'ovejas' ? '🐑'     : '🐐'
  const navigate   = useNavigate()

  const [animals, setAnimals]     = useState([])
  const [loading, setLoading]     = useState(true)
  const [toDelete, setToDelete]   = useState(null)
  const [search, setSearch]       = useState('')
  const [searching, setSearching] = useState(false)

  const load = async () => {
    try {
      setLoading(true)
      const data = await getAnimals(animalType)
      setAnimals(data)
    } catch (e) {
      toast.error(`Error: ${e.message}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [tipo])

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!search.trim()) { load(); return }
    setSearching(true)
    try {
      const result = await searchAnimalByCustomId(animalType, search.trim())
      if (result) {
        navigate(`/${tipo}/${result.id}`)
      } else {
        toast.error(`No se encontró ninguna ${label.toLowerCase()} con ID ${search}`)
      }
    } catch (e) {
      toast.error(e.message)
    } finally {
      setSearching(false)
    }
  }

  const confirmDelete = async () => {
    try {
      await deleteAnimal(toDelete.id)
      toast.success(`${label} eliminada`)
      setToDelete(null)
      load()
    } catch (e) {
      toast.error(`Error: ${e.message}`)
      setToDelete(null)
    }
  }

  if (loading) return <Spinner />

  return (
    <div className="py-4">
      <h1 className="text-2xl font-bold text-primary mb-4">{icon} {tipo === 'ovejas' ? 'Ovejas' : 'Cabras'}</h1>

      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          className="input-field flex-1"
          placeholder={`Buscar por ID de ${label.toLowerCase()}...`}
          value={search}
          onChange={e => setSearch(e.target.value)}
          type="number"
        />
        <button type="submit" disabled={searching} className="btn-secondary px-4">
          🔍
        </button>
      </form>

      {/* Add button */}
      <button
        onClick={() => navigate(`/${tipo}/crear`)}
        className="btn-teal w-full mb-5 flex items-center justify-center gap-2"
      >
        <span className="text-lg">＋</span> Añadir {label}
      </button>

      {/* List */}
      {animals.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-3">{icon}</div>
          <p>No hay {tipo} todavía.</p>
        </div>
      ) : (
        animals.map(animal => (
          <AnimalCard
            key={animal.id}
            animal={animal}
            tipo={animalType}
            onPress={() => navigate(`/${tipo}/${animal.id}`)}
            onDelete={() => setToDelete(animal)}
          />
        ))
      )}

      <DeleteModal
        isOpen={toDelete !== null}
        title={`Eliminar ${label} ID ${toDelete?.custom_id}`}
        description={`Esta acción eliminará la ${label.toLowerCase()} y todas sus crías. No se puede deshacer.`}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  )
}
