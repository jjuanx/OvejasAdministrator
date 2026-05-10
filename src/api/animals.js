import { supabase } from '../lib/supabase'
import dayjs from 'dayjs'

// ── helpers ──────────────────────────────────────────────────────
function calcAge(fechaNacimiento) {
  if (!fechaNacimiento) return null
  return dayjs().diff(dayjs(fechaNacimiento), 'year')
}

function enrichAnimal(animal, crias = []) {
  const vivasCrias  = crias.filter(c => c.viva)
  const muertas = crias.filter(c => !c.viva)
  const fechas  = crias.map(c => dayjs(c.fecha_nacimiento))
  return {
    ...animal,
    edad: calcAge(animal.fecha_nacimiento),
    veces_parida: crias.length,
    crias_vivas: vivasCrias.length,
    crias_muertas: muertas.length,
    fecha_ultimo_parto: fechas.length
      ? fechas.sort((a, b) => b.valueOf() - a.valueOf())[0].format('YYYY-MM-DD')
      : null,
    crias,
  }
}

// ── CRUD ─────────────────────────────────────────────────────────

export async function getAnimals(tipo) {
  const { data: user } = await supabase.auth.getUser()
  if (!user.user) throw new Error('No autenticado')

  const { data, error } = await supabase
    .from('animals')
    .select('*, crias(*)')
    .eq('tipo', tipo)
    .eq('user_id', user.user.id)
    .order('custom_id', { ascending: true })

  if (error) throw error
  return (data || []).map(a => enrichAnimal(a, a.crias || []))
}

export async function getAnimal(id) {
  const { data, error } = await supabase
    .from('animals')
    .select('*, crias(*)')
    .eq('id', id)
    .single()

  if (error) throw error
  return enrichAnimal(data, data.crias || [])
}

export async function createAnimal({ tipo, custom_id, estado, fecha_nacimiento }) {
  const { data: user } = await supabase.auth.getUser()
  if (!user.user) throw new Error('No autenticado')

  // Verificar duplicado dentro del mismo usuario y tipo
  const { data: existing } = await supabase
    .from('animals')
    .select('id')
    .eq('user_id', user.user.id)
    .eq('tipo', tipo)
    .eq('custom_id', Number(custom_id))
    .maybeSingle()

  if (existing) throw new Error(`Ya existe una ${tipo} con el ID ${custom_id}`)

  const { data, error } = await supabase
    .from('animals')
    .insert({ tipo, custom_id: Number(custom_id), estado, fecha_nacimiento, user_id: user.user.id })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateAnimal(id, { estado, fecha_nacimiento }) {
  const { data, error } = await supabase
    .from('animals')
    .update({ estado, fecha_nacimiento, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteAnimal(id) {
  const { error } = await supabase.from('animals').delete().eq('id', id)
  if (error) throw error
}

export async function searchAnimalByCustomId(tipo, customId) {
  const { data: user } = await supabase.auth.getUser()
  if (!user.user) throw new Error('No autenticado')

  const { data, error } = await supabase
    .from('animals')
    .select('*, crias(*)')
    .eq('tipo', tipo)
    .eq('user_id', user.user.id)
    .eq('custom_id', Number(customId))
    .maybeSingle()

  if (error) throw error
  return data ? enrichAnimal(data, data.crias || []) : null
}

// ── Analytics ─────────────────────────────────────────────────────

export async function getResumen(tipo) {
  const { data: user } = await supabase.auth.getUser()
  if (!user.user) throw new Error('No autenticado')

  const { data: animals, error: ae } = await supabase
    .from('animals')
    .select('*, crias(*)')
    .eq('tipo', tipo)
    .eq('user_id', user.user.id)

  if (ae) throw ae

  const crias = (animals || []).flatMap(a => a.crias || [])

  const edadMedia =
    animals.length
      ? Math.round(
          (animals.reduce((s, a) => s + (calcAge(a.fecha_nacimiento) || 0), 0) /
            animals.length) * 10
        ) / 10
      : 0

  return {
    total: animals.length,
    totalCrias: crias.length,
    estados: {
      buena:   animals.filter(a => a.estado === 'buena').length,
      regular: animals.filter(a => a.estado === 'regular').length,
      mala:    animals.filter(a => a.estado === 'mala').length,
    },
    criasVivas:   crias.filter(c => c.viva).length,
    criasMuertas: crias.filter(c => !c.viva).length,
    edadMedia,
  }
}
