import { supabase } from '../lib/supabase'

export async function getCriasByAnimalId(animalId) {
  const { data, error } = await supabase
    .from('crias')
    .select('*')
    .eq('animal_id', animalId)
    .order('created_at', { ascending: true })

  if (error) throw error
  return data || []
}

export async function getCria(id) {
  const { data, error } = await supabase
    .from('crias')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export async function createCria({ animal_id, custom_id, fecha_nacimiento, sexo, viva }) {
  const { data: user } = await supabase.auth.getUser()
  if (!user.user) throw new Error('No autenticado')

  const criaData = {
    animal_id,
    fecha_nacimiento,
    sexo,
    viva: viva ?? true,
    user_id: user.user.id,
  }

  if (custom_id) {
    const existing = await supabase
      .from('crias')
      .select('id')
      .eq('user_id', user.user.id)
      .eq('custom_id', Number(custom_id))
      .maybeSingle()

    if (existing.data) throw new Error(`Ya existe una cría con el ID ${custom_id}`)
    criaData.custom_id = Number(custom_id)
  }

  const { data, error } = await supabase
    .from('crias')
    .insert(criaData)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateCria(id, { fecha_nacimiento, sexo, viva }) {
  const { data, error } = await supabase
    .from('crias')
    .update({ fecha_nacimiento, sexo, viva, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteCria(id) {
  const { error } = await supabase.from('crias').delete().eq('id', id)
  if (error) throw error
}
