import { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import FormField from '../components/FormField'
import toast from 'react-hot-toast'

const schema = Yup.object({
  email:    Yup.string().email('Email inválido').required('Obligatorio'),
  password: Yup.string().min(6, 'Mínimo 6 caracteres').required('Obligatorio'),
})

export default function LoginPage() {
  const { login }  = useAuth()
  const navigate   = useNavigate()
  const [err, setErr] = useState('')

  const handleSubmit = async (values, { setSubmitting }) => {
    setErr('')
    try {
      await login(values.email, values.password)
      toast.success('¡Bienvenido!')
      navigate('/')
    } catch (e) {
      setErr(e.message || 'Error al iniciar sesión')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">🐾</div>
          <h1 className="text-3xl font-bold text-primary">Ganadería</h1>
          <p className="text-gray-500 text-sm mt-1">Gestión de ovejas y cabras</p>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-gray-800 mb-5">Iniciar sesión</h2>

          <Formik initialValues={{ email: '', password: '' }} validationSchema={schema} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form>
                <FormField name="email" label="Email" type="email" placeholder="tu@email.com" autoComplete="email" />
                <FormField name="password" label="Contraseña" type="password" placeholder="••••••" autoComplete="current-password" />

                {err && <p className="text-red-500 text-sm mb-3 text-center">{err}</p>}

                <button type="submit" disabled={isSubmitting} className="btn-primary w-full mt-2">
                  {isSubmitting ? 'Entrando...' : 'Entrar'}
                </button>
              </Form>
            )}
          </Formik>

          <p className="text-center text-sm text-gray-500 mt-4">
            ¿No tienes cuenta?{' '}
            <Link to="/register" className="text-secondary font-medium hover:underline">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
