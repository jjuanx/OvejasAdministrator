# 🐾 Ganadería App

Aplicación web para gestionar ovejas y cabras con sus crías. Funciona en iPhone a través de Safari y se puede desplegar gratis en Vercel.

## Stack tecnológico

| Capa | Tecnología | Plan gratuito |
|------|-----------|--------------|
| Frontend | React + Vite + Tailwind CSS | — |
| Base de datos + Auth | Supabase (PostgreSQL) | ✅ 500 MB, auth ilimitado |
| Despliegue | Vercel | ✅ Proyectos personales gratis |

---

## Paso 1 — Configurar Supabase (5 min)

1. Ve a [supabase.com](https://supabase.com) → **Start your project** → crea cuenta gratis
2. Crea un nuevo proyecto (elige la región más cercana, ej. "West EU")
3. Ve a **SQL Editor** → **New Query** → pega el contenido de `SUPABASE_SETUP.sql` → clic **Run**
4. Ve a **Project Settings** → **API**:
   - Copia `Project URL` → será `VITE_SUPABASE_URL`
   - Copia `anon public key` → será `VITE_SUPABASE_ANON_KEY`
5. (Opcional) En **Authentication** → **Email** → desactiva "Confirm email" si no quieres validar emails

---

## Paso 2 — Ejecutar en local (Mac M3)

```bash
cd GanaderiaApp

# Instalar dependencias
npm install

# Crear archivo de entorno
cp .env.example .env
# Edita .env con tus claves de Supabase

# Arrancar en desarrollo
npm run dev
# Abre http://localhost:5173
```

---

## Paso 3 — Desplegar en Vercel (gratis, accesible desde iPhone)

```bash
# Instalar Vercel CLI (solo la primera vez)
npm install -g vercel

# Desplegar
vercel

# Seguir los pasos del asistente:
# - ¿Link a proyecto existente? No
# - Nombre: ganaderia-app (o el que quieras)
# - Directorio: ./  (raíz)
# - Build command: npm run build
# - Output dir: dist
```

Cuando te pida variables de entorno, añade:
```
VITE_SUPABASE_URL      = https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY = tu-anon-key
```

O puedes hacerlo desde la web: **vercel.com** → tu proyecto → **Settings** → **Environment Variables**

**Vercel te dará una URL tipo `https://ganaderia-app.vercel.app`** — ábrela en el iPhone.

### Añadir a la pantalla de inicio del iPhone (PWA)
1. Abre la URL en **Safari** (debe ser Safari, no Chrome)
2. Toca el botón de **compartir** (cuadrado con flecha)
3. Selecciona **"Añadir a pantalla de inicio"**
4. La app aparece como un icono en tu iPhone, sin barra de navegador

---

## Funcionalidades

- ✅ **Autenticación** — Registro, inicio/cierre de sesión
- ✅ **Ovejas** — CRUD completo con ID personalizado, fecha nacimiento, producción de leche
- ✅ **Cabras** — Idénticas funcionalidades que ovejas
- ✅ **Crías** — Para cada oveja/cabra: añadir, editar (sexo, fecha, viva/muerta), eliminar
- ✅ **Dashboard** — Estadísticas con gráficos donut: total animales, crías, edades, estados
- ✅ **Búsqueda** — Por ID numérico en la lista de ovejas/cabras
- ✅ **Perfil** — Editar nombre, apellidos y teléfono

---

## Estructura del proyecto

```
src/
├── api/
│   ├── animals.js      # CRUD ovejas + cabras + analytics
│   └── crias.js        # CRUD crías
├── components/
│   ├── AnimalCard.jsx
│   ├── CriaCard.jsx
│   ├── DeleteModal.jsx
│   ├── DonutChart.jsx
│   ├── FormField.jsx
│   ├── Layout.jsx
│   ├── Navbar.jsx
│   └── Spinner.jsx
├── context/
│   └── AuthContext.jsx
├── lib/
│   └── supabase.js
└── pages/
    ├── LoginPage.jsx
    ├── RegisterPage.jsx
    ├── DashboardPage.jsx
    ├── AnimalsPage.jsx      # Lista ovejas o cabras (reutilizada)
    ├── AnimalDetailPage.jsx # Detalle con crías
    ├── CreateAnimalPage.jsx
    ├── EditAnimalPage.jsx
    ├── CreateCriaPage.jsx
    ├── EditCriaPage.jsx
    └── ProfilePage.jsx
```
# OvejasAdministrator
