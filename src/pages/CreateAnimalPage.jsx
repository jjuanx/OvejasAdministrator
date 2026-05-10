import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import { createAnimal } from '../api/animals'
import FormField from '../components/FormField'
import toast from 'react-hot-toast'
import { useState } from 'react'

const schema = Yup.object({
  custom_id:        Yup.number().typeError('Debe ser un número').positive().integer().required('Obligatorio').max(9999999999),
  estado:           Yup.string().oneOf(['buena', 'regular', 'mala']).required('Obligatorio'),
  fecha_nacimiento: Yup.date().required('Obligatorio').max(new Date(), 'No puede ser futura'),
})

export default function CreateAnimalPage() {
  const { tipo } = useParams()
  const label    = tipo === 'ovejas' ? 'Oveja' : 'Cabra'
  const animalType = tipo === 'ovejas' ? 'oveja' : 'cabra'
  const navigate = useNavigate()
  const [err, setErr] = useState('')

  const handleSubmit = async (values, { setSubmitting }) => {
    setErr('')
    try {
      await createAnimal({ ...values, tipo: animalType })
      toast.success(`${label} creada correctamente`)
      navigate(`/${tipo}`)
    } catch (e) {
      setErr(e.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="py-4">
      <h1 className="text-2xl font-bold text-primary mb-5">
        {tipo === 'ovejas' ? '🐑' : '🐐'} Nueva {label}
      </h1>

      <div className="card">
        <Formik
          initialValues={{ custom_id: '', estado: '', fecha_nacimiento: '' }}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form>
              <FormField name="custom_id" label={`ID de la ${label.toLowerCase()} (número)`} type="number" placeholder="Ej: 1234" />
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
                {isSubmitting ? 'Guardando...' : '💾 Guardar'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
