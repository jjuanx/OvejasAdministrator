import { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import FormField from '../components/FormField'
import toast from 'react-hot-toast'

const schema = Yup.object({
  nombre:    Yup.string().required('Obligatorio'),
  apellidos: Yup.string().required('Obligatorio'),
  telefono:  Yup.string(),
})

export default function ProfilePage() {
  const { user, updateProfile, logout } = useAuth()
  const navigate = useNavigate()
  const [err, setErr] = useState('')

  const meta = user?.user_metadata || {}

  const handleSubmit = async (values, { setSubmitting }) => {
    setErr('')
    try {
      await updateProfile(values)
      toast.success('Perfil actualizado')
    } catch (e) {
      setErr(e.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
    } catch (e) {
      toast.error(e.message)
    }
  }

  return (
    <div className="py-4">
      <h1 className="text-2xl font-bold text-primary mb-5">👤 Perfil</h1>

      <div className="card mb-4">
        <p className="text-xs text-gray-400 mb-1">Email</p>
        <p className="font-medium text-gray-800">{user?.email}</p>
      </div>

      <div className="card mb-5">
        <h2 className="font-bold text-gray-700 mb-4">Editar datos</h2>
        <Formik
          initialValues={{ nombre: meta.nombre || '', apellidos: meta.apellidos || '', telefono: meta.telefono || '' }}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <FormField name="nombre"    label="Nombre"    placeholder="Juan" />
              <FormField name="apellidos" label="Apellidos" placeholder="García" />
              <FormField name="telefono"  label="Teléfono"  type="tel" placeholder="+34 600 000 000" />
              {err && <p className="text-red-500 text-sm mb-3">{err}</p>}
              <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
                {isSubmitting ? 'Guardando...' : '💾 Guardar cambios'}
              </button>
            </Form>
          )}
        </Formik>
      </div>

      <button onClick={handleLogout} className="btn-danger w-full">
        🚪 Cerrar sesión
      </button>
    </div>
  )
}
