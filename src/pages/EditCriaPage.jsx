import { useEffect, useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import { getCria, updateCria } from '../api/crias'
import FormField from '../components/FormField'
import Spinner from '../components/Spinner'
import toast from 'react-hot-toast'

const schema = Yup.object({
  fecha_nacimiento: Yup.date().required('Obligatorio'),
  sexo:             Yup.string().oneOf(['macho', 'hembra']).required('Obligatorio'),
  viva:             Yup.boolean(),
})

export default function EditCriaPage() {
  const { tipo, animalId, criaId } = useParams()
  const navigate = useNavigate()
  const [cria, setCria] = useState(null)
  const [err,  setErr]  = useState('')

  useEffect(() => {
    getCria(criaId).then(setCria).catch(e => toast.error(e.message))
  }, [criaId])

  const handleSubmit = async (values, { setSubmitting }) => {
    setErr('')
    try {
      await updateCria(criaId, values)
      toast.success('Cría actualizada')
      navigate(`/${tipo}/${animalId}`)
    } catch (e) {
      setErr(e.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (!cria) return <Spinner />

  return (
    <div className="py-4">
      <h1 className="text-2xl font-bold text-primary mb-5">✏️ Editar Cría {cria.custom_id ?? ''}</h1>

      <div className="card">
        <Formik
          initialValues={{ fecha_nacimiento: cria.fecha_nacimiento, sexo: cria.sexo, viva: cria.viva }}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form>
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
                {isSubmitting ? 'Guardando...' : '💾 Guardar cambios'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
