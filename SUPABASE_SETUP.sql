-- ================================================================
--  GANADERÍA APP — Configuración de Supabase
--  Pega este SQL en: Supabase > SQL Editor > New Query > Run
-- ================================================================

-- ── 1. Tabla de animales (ovejas y cabras unificadas) ─────────────
CREATE TABLE IF NOT EXISTS animals (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  custom_id        INTEGER NOT NULL,
  tipo             TEXT NOT NULL CHECK (tipo IN ('oveja', 'cabra')),
  estado           TEXT NOT NULL CHECK (estado IN ('buena', 'regular', 'mala')) DEFAULT 'buena',
  fecha_nacimiento DATE NOT NULL,
  user_id          UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW(),

  -- Un mismo usuario no puede tener dos animales del mismo tipo con el mismo ID
  UNIQUE (user_id, tipo, custom_id)
);

-- ── 2. Tabla de crías ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS crias (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  custom_id        INTEGER,
  animal_id        UUID NOT NULL REFERENCES animals(id) ON DELETE CASCADE,
  fecha_nacimiento DATE NOT NULL,
  sexo             TEXT NOT NULL CHECK (sexo IN ('macho', 'hembra')),
  viva             BOOLEAN NOT NULL DEFAULT TRUE,
  user_id          UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ── 3. Índices para búsquedas rápidas ─────────────────────────────
CREATE INDEX IF NOT EXISTS idx_animals_user_tipo   ON animals (user_id, tipo);
CREATE INDEX IF NOT EXISTS idx_crias_animal_id     ON crias   (animal_id);
CREATE INDEX IF NOT EXISTS idx_crias_user_id       ON crias   (user_id);

-- ── 4. Row Level Security — cada usuario solo ve sus datos ─────────
ALTER TABLE animals ENABLE ROW LEVEL SECURITY;
ALTER TABLE crias   ENABLE ROW LEVEL SECURITY;

-- Animales: operaciones completas solo sobre los propios registros
CREATE POLICY "animals_select" ON animals FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "animals_insert" ON animals FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "animals_update" ON animals FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "animals_delete" ON animals FOR DELETE USING (auth.uid() = user_id);

-- Crías: operaciones completas solo sobre los propios registros
CREATE POLICY "crias_select" ON crias FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "crias_insert" ON crias FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "crias_update" ON crias FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "crias_delete" ON crias FOR DELETE USING (auth.uid() = user_id);

-- ── 5. Trigger: updated_at automático ─────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER animals_updated_at
  BEFORE UPDATE ON animals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE TRIGGER crias_updated_at
  BEFORE UPDATE ON crias
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
