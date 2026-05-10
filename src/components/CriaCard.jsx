export default function CriaCard({ cria, onEdit, onDelete }) {
  const icon = cria.sexo === 'macho' ? '♂️' : '♀️'

  return (
    <div className="card relative">
      <button
        onClick={onDelete}
        className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-red-50 text-red-400 hover:text-red-600 transition-colors text-lg"
        aria-label="Eliminar cría"
      >
        🗑️
      </button>

      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">{icon}</span>
        <div>
          <p className="font-bold text-secondary">
            Cría {cria.custom_id != null ? `#${cria.custom_id}` : ''}
          </p>
          {!cria.viva && (
            <span className="inline-block bg-red-100 text-red-600 text-xs font-semibold px-2 py-0.5 rounded-full">
              Fallecida
            </span>
          )}
        </div>
      </div>

      <p className="text-sm text-gray-600">Fecha nacimiento: <span className="font-medium">{cria.fecha_nacimiento}</span></p>
      <p className="text-sm text-gray-600">Sexo: <span className="font-medium capitalize">{cria.sexo}</span></p>

      <button
        onClick={onEdit}
        className="mt-3 w-full btn-teal text-sm py-2"
      >
        ✏️ Editar Cría
      </button>
    </div>
  )
}
