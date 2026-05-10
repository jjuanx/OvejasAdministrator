import { useEffect, useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import { getAnimal, updateAnimal } from '../api/animals'
import FormField from '../components/FormField'
import Spinner from '../components/Spinner'
import toast from 'react-hot-toast'

const schema = Yup.object({
  estado:           Yup.string().oneOf(['buena', 'regular', 'mala']).required('Obligatorio'),
  fecha_nacimiento: Yup.date().required('Obligatorio').max(new Date(), 'No puede ser futura'),
})

export default function EditAnimalPage() {
  const { tipo, id } = useParams()
  const label    = tipo === 'ovejas' ? 'Oveja' : 'Cabra'
  const navigate = useNavigate()
  const [animal, setAnimal] = useState(null)
  const [err, setErr]       = useState('')

  useEffect(() => {
    getAnimal(id).then(setAnimal).catch(e => toast.error(e.message))
  }, [id])

  const handleSubmit = async (values, { setSubmitting }) => {
    setErr('')
    try {
      await updateAnimal(id, values)
      toast.success(`${label} actualizada`)
      navigate(`/${tipo}/${id}`)
    } catch (e) {
      setErr(e.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (!animal) return <Spinner />

  return (
    <div className="py-4">
      <h1 className="text-2xl font-bold text-primary mb-5">
        ✏️ Editar {label} ID {animal.custom_id}
      </h1>

      <div className="card">
        <Formik
          initialValues={{ estado: animal.estado, fecha_nacimiento: animal.fecha_nacimiento }}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form>
              <FormField name="fecha_nacimiento" label="Fecha de nacimiento" type="date" />

              <div className="mb-4">
                <label className="label">Producción de leche</label>
                <div className="flex gap-2">
                  {['buena', 'regular', 'mala'].map(e => (
                    <button
                      key={e}
                      type="button"
                      onClick={() => setFieldValue('estado', e)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium border-2 transition-colors capitalize
                        ${values.estado === e
                          ? 'bg-primary text-white border-primary'
                          : 'bg-white text-gray-600 border-gray-300 hover:border-primary'}`}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </div>

              {err && <p className="text-red-500 text-sm mb-3">{err}</p>}

              <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
                {isSubmitting ? 'Guardando...' : '💾 Guardar cambios'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
