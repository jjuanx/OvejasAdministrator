import { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import FormField from '../components/FormField'
import toast from 'react-hot-toast'

const schema = Yup.object({
  nombre:    Yup.string().required('Obligatorio'),
  apellidos: Yup.string().required('Obligatorio'),
  telefono:  Yup.string().required('Obligatorio'),
  email:     Yup.string().email('Email inválido').required('Obligatorio'),
  password:  Yup.string().min(6, 'Mínimo 6 caracteres').required('Obligatorio'),
  confirm:   Yup.string().oneOf([Yup.ref('password')], 'Las contraseñas no coinciden').required('Obligatorio'),
})

export default function RegisterPage() {
  const { signup } = useAuth()
  const navigate   = useNavigate()
  const [err, setErr] = useState('')

  const handleSubmit = async (values, { setSubmitting }) => {
    setErr('')
    try {
      await signup({ nombre: values.nombre, apellidos: values.apellidos, email: values.email, password: values.password, telefono: values.telefono })
      toast.success('Cuenta creada. Puedes iniciar sesión.')
      navigate('/login')
    } catch (e) {
      setErr(e.message || 'Error al registrarse')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="text-5xl mb-2">🐾</div>
          <h1 className="text-2xl font-bold text-primary">Crear cuenta</h1>
        </div>

        <div className="card">
          <Formik
            initialValues={{ nombre: '', apellidos: '', telefono: '', email: '', password: '', confirm: '' }}
            validationSchema={schema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <FormField name="nombre"    label="Nombre"    placeholder="Juan" />
                <FormField name="apellidos" label="Apellidos" placeholder="García López" />
                <FormField name="telefono"  label="Teléfono"  type="tel" placeholder="+34 600 000 000" />
                <FormField name="email"     label="Email"     type="email" placeholder="tu@email.com" />
                <FormField name="password"  label="Contraseña" type="password" placeholder="••••••" />
                <FormField name="confirm"   label="Confirmar contraseña" type="password" placeholder="••••••" />

                {err && <p className="text-red-500 text-sm mb-3 text-center">{err}</p>}

                <button type="submit" disabled={isSubmitting} className="btn-primary w-full mt-2">
                  {isSubmitting ? 'Creando cuenta...' : 'Crear cuenta'}
                </button>
              </Form>
            )}
          </Formik>

          <p className="text-center text-sm text-gray-500 mt-4">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-secondary font-medium hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
