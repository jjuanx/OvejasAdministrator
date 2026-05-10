export default function DeleteModal({ isOpen, title, description, onConfirm, onCancel }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{title || '¿Eliminar?'}</h3>
        {description && <p className="text-sm text-gray-600 mb-5">{description}</p>}
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 btn-secondary">
            Cancelar
          </button>
          <button onClick={onConfirm} className="flex-1 btn-danger">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}
