import { useEffect, useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import { getAnimal } from '../api/animals'
import { createCria } from '../api/crias'
import FormField from '../components/FormField'
import Spinner from '../components/Spinner'
import toast from 'react-hot-toast'

export default function CreateCriaPage() {
  const { tipo, animalId } = useParams()
  const label    = tipo === 'ovejas' ? 'oveja' : 'cabra'
  const navigate = useNavigate()
  const [madre, setMadre] = useState(null)
  const [err,   setErr]   = useState('')

  useEffect(() => {
    getAnimal(animalId).then(setMadre).catch(e => toast.error(e.message))
  }, [animalId])

  const schema = Yup.object({
    custom_id:        Yup.number().typeError('Debe ser un número').positive().integer().nullable()
                        .transform((v, o) => o === '' ? null : v),
    fecha_nacimiento: Yup.date().required('Obligatorio')
                        .min(madre?.fecha_nacimiento || '1900-01-01', 'No puede ser anterior al nacimiento de la madre'),
    sexo:             Yup.string().oneOf(['macho', 'hembra']).required('Obligatorio'),
    viva:             Yup.boolean(),
  })

  const handleSubmit = async (values, { setSubmitting }) => {
    setErr('')
    try {
      await createCria({ ...values, animal_id: animalId })
      toast.success('Cría creada correctamente')
      navigate(`/${tipo}/${animalId}`)
    } catch (e) {
      setErr(e.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (!madre) return <Spinner />

  return (
    <div className="py-4">
      <h1 className="text-2xl font-bold text-primary mb-1">🐣 Nueva Cría</h1>
      <p className="text-gray-500 text-sm mb-5">
        {tipo === 'ovejas' ? 'Oveja' : 'Cabra'} madre ID: <strong>{madre.custom_id}</strong>
      </p>

      <div className="card">
        <Formik
          initialValues={{ custom_id: '', fecha_nacimiento: '', sexo: '', viva: true }}
          validationSchema={schema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form>
              <FormField name="custom_id" label="ID de la cría (opcional, dejar vacío = automático)" type="number" placeholder="Ej: 4567" />
              <FormField name="fecha_nacimiento" label="Fecha de nacimiento" type="date" />

              <div className="mb-4">
                <label className="label">Sexo</label>
                <div className="flex gap-2">
                  {['macho', 'hembra'].map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setFieldValue('sexo', s)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium border-2 transition-colors capitalize
                        ${values.sexo === s
                          ? 'bg-secondary text-white border-secondary'
                          : 'bg-white text-gray-600 border-gray-300 hover:border-secondary'}`}
                    >
                      {s === 'macho' ? '♂️ Macho' : '♀️ Hembra'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-5 flex items-center justify-between">
                <label className="label mb-0">¿Está viva?</label>
                <button
                  type="button"
                  onClick={() => setFieldValue('viva', !values.viva)}
                  className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors
                    ${values.viva ? 'bg-teal' : 'bg-gray-300'}`}
                >
                  <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform
                    ${values.viva ? 'translate-x-7' : 'translate-x-1'}`} />
                </button>
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
