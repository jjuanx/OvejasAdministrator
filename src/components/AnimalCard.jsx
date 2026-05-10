export default function AnimalCard({ animal, tipo, onPress, onDelete }) {
  const icon = tipo === 'oveja' ? '🐑' : '🐐'

  const estadoColor = {
    buena:   'text-teal font-semibold',
    regular: 'text-yellow-600 font-semibold',
    mala:    'text-red-600 font-semibold',
  }

  return (
    <div className="card flex items-center gap-3 cursor-pointer relative" onClick={onPress}>
      <div className="text-4xl">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-primary text-lg">ID: {animal.custom_id}</p>
        <p className="text-sm text-gray-600">
          Producción: <span className={estadoColor[animal.estado]}>{animal.estado}</span>
        </p>
        <p className="text-sm text-gray-600">
          Edad: <span className="font-medium">{animal.edad ?? '—'} años</span>
        </p>
      </div>
      <button
        onClick={e => { e.stopPropagation(); onDelete() }}
        className="p-2 rounded-full hover:bg-red-50 text-red-400 hover:text-red-600 transition-colors"
        aria-label="Eliminar"
      >
        🗑️
      </button>
    </div>
  )
}
