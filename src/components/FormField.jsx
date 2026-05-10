import { useField } from 'formik'

export default function FormField({ label, ...props }) {
  const [field, meta] = useField(props)

  return (
    <div className="mb-4">
      {label && <label className="label">{label}</label>}
      <input {...field} {...props} className="input-field" />
      {meta.touched && meta.error && (
        <p className="error-text">{meta.error}</p>
      )}
    </div>
  )
}
