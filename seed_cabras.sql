-- ================================================================
--  SEED: 60 cabras (IDs 2829307 – 2829366, nacidas 01/05/2025)
--
--  ANTES DE EJECUTAR:
--  1. Ve a Supabase > Authentication > Users
--  2. Copia tu UUID de usuario
--  3. Reemplaza '<TU_USER_ID>' por ese UUID en el bloque DO de abajo
--
--  Pega este script en: Supabase > SQL Editor > New Query > Run
-- ================================================================

DO $$
DECLARE
  v_user_id UUID := '67304d1d-1beb-4f5c-851c-9479e41bd281';  -- ← pega aquí tu UUID
BEGIN
  INSERT INTO animals (id, custom_id, tipo, estado, fecha_nacimiento, user_id)
  VALUES
    (gen_random_uuid(), 2829307, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829308, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829309, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829310, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829311, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829312, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829313, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829314, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829315, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829316, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829317, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829318, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829319, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829320, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829321, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829322, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829323, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829324, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829325, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829326, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829327, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829328, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829329, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829330, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829331, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829332, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829333, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829334, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829335, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829336, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829337, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829338, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829339, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829340, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829341, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829342, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829343, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829344, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829345, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829346, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829347, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829348, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829349, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829350, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829351, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829352, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829353, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829354, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829355, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829356, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829357, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829358, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829359, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829360, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829361, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829362, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829363, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829364, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829365, 'cabra', 'buena', '2025-05-01', v_user_id),
    (gen_random_uuid(), 2829366, 'cabra', 'buena', '2025-05-01', v_user_id);
END $$;
